import React from "react";

import scrollToTop from "./scrollToTop";

/** Closes the page off, rather than leaving the reader at the bottom. */
const BackToTop = () => (
  <div className="to-top">
    <a className="to-top__button" href="#home" onClick={scrollToTop}>
      <span className="to-top__arrow" aria-hidden="true">
        ↑
      </span>
      Back to top
    </a>
  </div>
);

export default BackToTop;
