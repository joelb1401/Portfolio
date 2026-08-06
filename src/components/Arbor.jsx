import React from "react";

import Reveal from "./Reveal";

const TREE_URL = "https://arbor-lime.vercel.app/u/joelb";
const HOME_URL = "https://arbor-lime.vercel.app/";

/**
 * Arbor's mark, copied from the app so the geometry and the stepped
 * opacities down the branches match exactly.
 */
const ArborMark = () => (
  <svg
    className="arbor__mark"
    viewBox="0 0 24 24"
    fill="none"
    role="img"
    aria-label="Arbor"
  >
    <line x1="12" y1="7" x2="6" y2="14.5" stroke="#c8962e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="12" y1="7" x2="18" y2="14.5" stroke="#c8962e" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    <line x1="6" y1="17" x2="10" y2="21" stroke="#c8962e" strokeWidth="1.5" strokeLinecap="round" opacity="0.38" />
    <circle cx="12" cy="5" r="2.5" fill="#c8962e" />
    <circle cx="6" cy="16" r="2" fill="#c8962e" opacity="0.75" />
    <circle cx="18" cy="16" r="2" fill="#c8962e" opacity="0.75" />
    <circle cx="10" cy="22" r="1.4" fill="#c8962e" opacity="0.48" />
  </svg>
);

/**
 * A band for Arbor, set in Arbor's own palette and type rather than the
 * paper's, so it reads as the app itself bound into the page — laid out
 * like one of its document cards, down to the 10px corners and the
 * accent stripe on the left edge.
 */
const Arbor = () => (
  <Reveal as="section" className="arbor" aria-label="Arbor">
    <div className="arbor__card">
      <ArborMark />

      <div className="arbor__body">
        <p className="arbor__name">Arbor</p>
        <p className="arbor__blurb">
          Turns a reading list into a knowledge tree. Upload papers and lecture notes,
          add prerequisites and parents, and see the citations running between them.
        </p>
      </div>

      <div className="arbor__actions">
        <a
          className="arbor__button arbor__button--accent"
          href={TREE_URL}
          target="_blank"
          rel="noreferrer"
        >
          See my knowledge tree
        </a>
        <a
          className="arbor__button"
          href={HOME_URL}
          target="_blank"
          rel="noreferrer"
        >
          Try it out and create an account
        </a>
      </div>
    </div>
  </Reveal>
);

export default Arbor;
