import React, { lazy, Suspense, useCallback, useEffect, useState } from "react";

// pdf.js is heavy and most visitors never open a document, so it only
// arrives when someone actually asks to read one.
const PdfViewer = lazy(() => import("./PdfViewer"));

/**
 * The read buttons under an entry. Each opens its document in the
 * reader rather than handing the visitor a file to download.
 *
 * Opening pushes a history entry so a phone's back gesture closes the
 * reader instead of leaving the site. That is done here, in the event
 * handlers, rather than in the reader's effects — an effect that
 * navigates on cleanup fights StrictMode's double invocation and closes
 * the reader the instant it opens.
 */
const DocumentButtons = ({ documents }) => {
  const [open, setOpen] = useState(null);

  const show = (index) => {
    // Carry the router's own state across, or its history bookkeeping
    // is wiped out by this entry.
    window.history.pushState(
      { ...window.history.state, pdfViewer: true },
      ""
    );
    setOpen(index);
  };

  const close = useCallback(() => {
    setOpen(null);
    if (window.history.state?.pdfViewer) window.history.back();
  }, []);

  useEffect(() => {
    if (open === null) return undefined;

    const onPopState = () => setOpen(null);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [open]);

  if (!documents || documents.length === 0) return null;

  return (
    <>
      <p className="documents">
        {documents.map((document, index) => (
          <button
            key={document.label}
            type="button"
            className="documents__button"
            onClick={() => show(index)}
          >
            {document.label}
          </button>
        ))}
      </p>

      {open !== null && (
        <Suspense fallback={null}>
          <PdfViewer
            file={documents[open].file}
            title={documents[open].title ?? documents[open].label}
            onClose={close}
          />
        </Suspense>
      )}
    </>
  );
};

export default DocumentButtons;
