import React, { useEffect, useRef, useState } from "react";

import { navLinks } from "../constants";
import scrollToTop from "./scrollToTop";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [open]);

  return (
    <nav className="menu" ref={ref}>
      <button
        type="button"
        className="menu__toggle"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <ul className="menu__panel">
          {navLinks.map((nav) => (
            <li key={nav.id} className="menu__item">
              <a
                href={`#${nav.id}`}
                onClick={(event) => {
                  if (nav.id === "home") scrollToTop(event);
                  setOpen(false);
                }}
              >
                <span className="menu__num">{nav.number ? `${nav.number}.` : ""}</span>
                <span>{nav.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Menu;
