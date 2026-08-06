/**
 * The Home link and the button at the foot of the page both mean the
 * very top, not the top of the first section, so neither can be a plain
 * anchor — the masthead sits below the page's own top padding.
 */
const scrollToTop = (event) => {
  event?.preventDefault();

  const smooth = !(
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
};

export default scrollToTop;
