import React, { useId } from "react";

/** Which standards are drawn here; anything else has no plate to frame. */
export const drawnFlags = new Set(["uk", "england"]);

/**
 * The standard flown at a competition, drawn rather than photographed so
 * it stays sharp at any size and costs nothing to load. An unknown flag
 * renders nothing, leaving the margin empty rather than broken.
 */
const Flag = ({ of, title }) => {
  const id = useId().replace(/:/g, "");

  if (of === "uk") {
    return (
      <svg className="flag" viewBox="0 0 60 30" role="img" aria-label={title}>
        <clipPath id={`${id}-frame`}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        {/* Half of each diagonal, so the red saltire counterchanges. */}
        <clipPath id={`${id}-half`}>
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
        </clipPath>
        <g clipPath={`url(#${id}-frame)`}>
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path
            d="M0,0 L60,30 M60,0 L0,30"
            clipPath={`url(#${id}-half)`}
            stroke="#c8102e"
            strokeWidth="4"
          />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
        </g>
      </svg>
    );
  }

  if (of === "england") {
    return (
      <svg className="flag" viewBox="0 0 60 36" role="img" aria-label={title}>
        <rect width="60" height="36" fill="#fff" />
        <path d="M30,0 v36 M0,18 h60" stroke="#ce1124" strokeWidth="7.2" />
      </svg>
    );
  }

  return null;
};

export default Flag;
