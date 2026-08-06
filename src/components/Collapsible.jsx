import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const DURATION = 380;
const EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fractional, unlike offsetHeight, so the animation lands on exactly the
// height the resting layout gives rather than a rounded pixel near it.
const heightOf = (node) => node.getBoundingClientRect().height;

/**
 * Clamps its children to a few lines, with a control to roll them open.
 *
 * The clamp is only worn at rest, where it supplies the ellipsis. While
 * the height animates it is taken off, so the text sits in ordinary
 * block layout the whole way and is uncovered from the top down, like
 * unrolling a scroll. Both heights are measured before the run by
 * flipping the class without letting it paint, so each direction ends
 * exactly where the resting layout would put it.
 */
const Collapsible = ({ children, lines = 5, label = "Extend" }) => {
  const bodyRef = useRef(null);
  const pending = useRef(null);

  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [clipped, setClipped] = useState(false);

  // Only offer the control when something is actually hidden.
  useEffect(() => {
    const node = bodyRef.current;
    if (!node) return undefined;

    const measure = () => {
      if (open || animating) return;
      setClipped(node.scrollHeight - node.clientHeight > 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [children, open, animating]);

  const toggle = useCallback(() => {
    const node = bodyRef.current;
    if (!node) return;

    // Whatever height is on screen right now, mid-animation or not.
    const from = heightOf(node);

    // Drop any running animation before measuring, or the inline height
    // would be read back instead of the natural one.
    node.style.transition = "";
    node.style.height = "";

    node.classList.toggle("is-clamped");
    const to = heightOf(node);
    node.classList.toggle("is-clamped");

    pending.current = { from, to };
    setOpen((value) => !value);
    setAnimating(true);
  }, []);

  useLayoutEffect(() => {
    const node = bodyRef.current;
    const run = pending.current;
    if (!node || !run) return undefined;
    pending.current = null;

    if (prefersReducedMotion() || Math.abs(run.from - run.to) < 0.5) {
      setAnimating(false);
      return undefined;
    }

    node.style.overflow = "hidden";
    node.style.height = `${run.from}px`;
    node.getBoundingClientRect(); // flush the start height before easing off it
    node.style.transition = `height ${DURATION}ms ${EASING}`;
    node.style.height = `${run.to}px`;

    let timer = 0;

    // Hand back to the resting layout, but only by flipping state — the
    // inline height is cleared in the effect below, after the clamp has
    // gone back on. Clearing it here would uncover the full text for a
    // frame before the class landed, which reads as a jump.
    const finish = (event) => {
      if (event && (event.target !== node || event.propertyName !== "height")) return;
      window.clearTimeout(timer);
      node.removeEventListener("transitionend", finish);
      setAnimating(false);
    };

    node.addEventListener("transitionend", finish);
    // In case the transition never fires — a hidden tab, say.
    timer = window.setTimeout(finish, DURATION + 120);

    return () => {
      window.clearTimeout(timer);
      node.removeEventListener("transitionend", finish);
    };
  }, [open, animating]);

  // Runs in the same commit that reapplies the clamp, so the handover
  // from the animated height to the natural one is never painted.
  useLayoutEffect(() => {
    const node = bodyRef.current;
    if (!node || animating) return;

    node.style.height = "";
    node.style.overflow = "";
    node.style.transition = "";
  }, [animating]);

  return (
    <div className="collapsible">
      <div
        ref={bodyRef}
        className={`collapsible__body${open || animating ? "" : " is-clamped"}`}
        style={{ "--clamp-lines": lines }}
      >
        {children}
      </div>

      {(clipped || open) && (
        <button
          type="button"
          className={`collapsible__toggle${open ? " is-open" : ""}`}
          onClick={toggle}
          aria-expanded={open}
        >
          <span className="collapsible__arrow" aria-hidden="true">
            ▾
          </span>
          {open ? "Collapse" : label}
        </button>
      )}
    </div>
  );
};

export default Collapsible;
