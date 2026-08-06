import React, { useEffect, useState } from "react";

import { navLinks } from "../constants";
import scrollToTop from "./scrollToTop";

/**
 * A fixed index in the left margin. The tick beside the section you are
 * reading lengthens, and the titles open when the rail is hovered, so
 * the collapsed state costs almost no width. Replaces the menu button
 * once the margin is wide enough to hold it (see .rail in index.css).
 */
const SectionRail = () => {
  const [active, setActive] = useState(navLinks[0].id);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      // Resting at the top is Home. The abstract begins high enough on
      // the page that it would otherwise claim the mark immediately.
      if (window.scrollY < 2) {
        setActive(navLinks[0].id);
        return;
      }

      // Whichever section has crossed the upper third of the viewport is
      // the one being read.
      const line = window.innerHeight * 0.35;
      let current = navLinks[0].id;

      navLinks.forEach((nav) => {
        const node = document.getElementById(nav.id);
        if (node && node.getBoundingClientRect().top <= line) current = nav.id;
      });

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="rail" aria-label="Sections">
      <ul>
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            className={`rail__item${active === nav.id ? " is-active" : ""}`}
          >
            <a
              href={`#${nav.id}`}
              aria-current={active === nav.id ? "true" : undefined}
              onClick={nav.id === "home" ? scrollToTop : undefined}
            >
              <span className="rail__tick" aria-hidden="true" />
              <span className="rail__num" aria-hidden="true">
                {nav.number}
              </span>
              <span className="rail__title">{nav.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SectionRail;
