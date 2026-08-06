import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
// Keeps a zoomed page from allocating an unreasonable canvas on mobile.
const MAX_CANVAS_EDGE = 4096;

const clampScale = (value) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));

const pinchDistance = (touches) =>
  Math.hypot(
    touches[0].clientX - touches[1].clientX,
    touches[0].clientY - touches[1].clientY
  );

/**
 * A full-screen PDF reader. Pages are laid out at their true aspect
 * ratio before anything is drawn, so nothing jumps as they arrive, and
 * only the pages near the viewport are rendered.
 *
 * Zoom is two-stage: the CSS width follows the gesture immediately so it
 * stays responsive, then the canvas is redrawn at the settled scale so
 * the type is sharp rather than a stretched bitmap.
 */
const PdfViewer = ({ file, title, onClose }) => {
  const scrollRef = useRef(null);
  const pageRefs = useRef([]);
  const renderedAt = useRef(new Map());
  const renderTasks = useRef(new Map());
  const docRef = useRef(null);
  // v6 puts destroy() on the loading task, not on the document proxy.
  const loadingRef = useRef(null);

  const [pages, setPages] = useState([]);
  const [status, setStatus] = useState("loading");
  const [scale, setScale] = useState(1);
  const [current, setCurrent] = useState(1);
  const [fitWidth, setFitWidth] = useState(0);

  // The gesture handlers are bound once, so they read the live scale
  // from here rather than closing over a stale one.
  const scaleRef = useRef(1);
  scaleRef.current = scale;

  // Where a zoom was aimed, so the point under the fingers (or the
  // cursor) stays put instead of the page sliding away from it.
  const anchor = useRef(null);

  const zoomTo = useCallback((next, at) => {
    const node = scrollRef.current;
    if (node && at) {
      anchor.current = {
        x: at.x,
        y: at.y,
        scale: scaleRef.current,
        left: node.scrollLeft,
        top: node.scrollTop,
      };
    }
    setScale(clampScale(next));
  }, []);

  useLayoutEffect(() => {
    const node = scrollRef.current;
    const from = anchor.current;
    if (!node || !from) return;

    const ratio = scale / from.scale;
    node.scrollLeft = (from.left + from.x) * ratio - from.x;
    node.scrollTop = (from.top + from.y) * ratio - from.y;
    anchor.current = null;
  }, [scale]);

  // ---------------------------------------------------------------- load
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        const worker = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

        // v6 wants the parameter object; a bare URL string is rejected.
        const loading = pdfjs.getDocument({ url: file });
        loadingRef.current = loading;

        const doc = await loading.promise;
        if (cancelled) {
          loading.destroy();
          return;
        }
        docRef.current = doc;

        // One pass for the page sizes, so the whole document can be laid
        // out before a single page has been drawn.
        const sizes = [];
        for (let n = 1; n <= doc.numPages; n += 1) {
          const page = await doc.getPage(n); // eslint-disable-line no-await-in-loop
          const { width, height } = page.getViewport({ scale: 1 });
          sizes.push({ width, height });
        }

        if (cancelled) return;
        setPages(sizes);
        setStatus("ready");
      } catch (error) {
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      renderTasks.current.forEach((task) => task.cancel());
      renderTasks.current.clear();
      loadingRef.current?.destroy();
      loadingRef.current = null;
      docRef.current = null;
    };
  }, [file]);

  // ------------------------------------------------------- measure column
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    const measure = () => {
      const style = getComputedStyle(node);
      const inset =
        parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      setFitWidth(Math.max(0, node.clientWidth - inset));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // ------------------------------------------------------------- rendering
  const renderPage = useCallback(
    async (index) => {
      const doc = docRef.current;
      const canvas = pageRefs.current[index]?.querySelector("canvas");
      const size = pages[index];
      if (!doc || !canvas || !size || !fitWidth) return;

      const cssWidth = fitWidth * scale;
      if (renderedAt.current.get(index) === cssWidth) return;

      renderTasks.current.get(index)?.cancel();

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const base = cssWidth / size.width;
      const capped = Math.min(
        base * dpr,
        MAX_CANVAS_EDGE / size.width,
        MAX_CANVAS_EDGE / size.height
      );

      const page = await doc.getPage(index + 1);
      const viewport = page.getViewport({ scale: capped });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      const task = page.render({
        canvasContext: canvas.getContext("2d", { alpha: false }),
        viewport,
      });
      renderTasks.current.set(index, task);

      try {
        await task.promise;
        renderedAt.current.set(index, cssWidth);
      } catch {
        // Superseded by a newer render; nothing to do.
      }
    },
    [pages, scale, fitWidth]
  );

  // Draw whatever is near the viewport, and redraw it when zoom settles.
  useEffect(() => {
    if (status !== "ready" || !fitWidth) return undefined;

    const node = scrollRef.current;
    let frame = 0;
    let timer = 0;

    const drawVisible = () => {
      const top = node.scrollTop - node.clientHeight;
      const bottom = node.scrollTop + node.clientHeight * 2;

      pageRefs.current.forEach((el, index) => {
        if (!el) return;
        if (el.offsetTop + el.offsetHeight >= top && el.offsetTop <= bottom) {
          renderPage(index);
        }
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        drawVisible();

        // Whichever page covers the middle of the viewport is the one
        // being read.
        const middle = node.scrollTop + node.clientHeight / 2;
        const index = pageRefs.current.findIndex(
          (el) => el && el.offsetTop + el.offsetHeight >= middle
        );
        setCurrent(index === -1 ? pageRefs.current.length : index + 1);
      });
    };

    timer = window.setTimeout(drawVisible, 120);
    node.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      node.removeEventListener("scroll", onScroll);
    };
  }, [status, fitWidth, renderPage]);

  // ------------------------------------------------------------- gestures
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return undefined;

    let pinch = null;

    const localPoint = (clientX, clientY) => {
      const box = node.getBoundingClientRect();
      return { x: clientX - box.left, y: clientY - box.top };
    };

    // Trackpad pinch and ctrl+wheel arrive as a wheel event.
    const onWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      zoomTo(
        scaleRef.current * (1 - event.deltaY * 0.01),
        localPoint(event.clientX, event.clientY)
      );
    };

    const onTouchStart = (event) => {
      if (event.touches.length !== 2) return;
      pinch = {
        distance: pinchDistance(event.touches),
        scale: scaleRef.current,
      };
    };

    const onTouchMove = (event) => {
      if (!pinch || event.touches.length !== 2) return;
      // touch-action keeps the browser off two-finger zoom, so this is
      // the only thing scaling the page.
      event.preventDefault();

      const [a, b] = event.touches;
      const ratio = pinchDistance(event.touches) / pinch.distance;
      zoomTo(
        pinch.scale * ratio,
        localPoint((a.clientX + b.clientX) / 2, (a.clientY + b.clientY) / 2)
      );
    };

    const onTouchEnd = (event) => {
      if (event.touches.length < 2) pinch = null;
    };

    node.addEventListener("wheel", onWheel, { passive: false });
    node.addEventListener("touchstart", onTouchStart, { passive: true });
    node.addEventListener("touchmove", onTouchMove, { passive: false });
    node.addEventListener("touchend", onTouchEnd, { passive: true });
    node.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      node.removeEventListener("wheel", onWheel);
      node.removeEventListener("touchstart", onTouchStart);
      node.removeEventListener("touchmove", onTouchMove);
      node.removeEventListener("touchend", onTouchEnd);
      node.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [zoomTo]);

  // ------------------------------------------------- close, keys, history
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if ((event.ctrlKey || event.metaKey) && (event.key === "=" || event.key === "+")) {
        event.preventDefault();
        setScale((value) => clampScale(value * 1.25));
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "-") {
        event.preventDefault();
        setScale((value) => clampScale(value / 1.25));
      }
      if (event.key === "0" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setScale(1);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // Button zoom aims at the middle of what is on screen.
  const zoomBy = (factor) => {
    const node = scrollRef.current;
    zoomTo(
      scale * factor,
      node ? { x: node.clientWidth / 2, y: node.clientHeight / 2 } : null
    );
  };

  return createPortal(
    <div className="pdf" role="dialog" aria-modal="true" aria-label={title}>
      <div className="pdf__bar">
        <span className="pdf__title">{title}</span>

        <span className="pdf__count">
          {status === "ready" ? `${current} / ${pages.length}` : ""}
        </span>

        <div className="pdf__tools">
          <button type="button" onClick={() => zoomBy(1 / 1.25)} aria-label="Zoom out">
            −
          </button>
          <button type="button" onClick={() => setScale(1)} className="pdf__reset">
            {Math.round(scale * 100)}%
          </button>
          <button type="button" onClick={() => zoomBy(1.25)} aria-label="Zoom in">
            +
          </button>
          <a href={file} download className="pdf__download" aria-label="Download">
            <span className="pdf__wide">Download</span>
            <span className="pdf__narrow" aria-hidden="true">↓</span>
          </a>
          <button type="button" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>
      </div>

      <div className="pdf__scroll" ref={scrollRef}>
        {status === "loading" && <p className="pdf__message">Loading…</p>}

        {status === "error" && (
          <p className="pdf__message">
            This document could not be displayed.{" "}
            <a href={file} target="_blank" rel="noreferrer">
              Open it directly
            </a>
            .
          </p>
        )}

        {pages.map((size, index) => (
          <div
            key={index}
            className="pdf__page"
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            style={{
              width: fitWidth ? `${fitWidth * scale}px` : undefined,
              height: fitWidth
                ? `${(fitWidth * scale * size.height) / size.width}px`
                : undefined,
            }}
          >
            <canvas />
          </div>
        ))}
      </div>
    </div>,
    document.body
  );
};

export default PdfViewer;
