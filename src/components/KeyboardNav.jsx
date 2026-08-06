import React, { useEffect } from "react";

import { navLinks } from "../constants";

const isTypingTarget = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName));

/**
 * Number keys jump between sections: 0 for the abstract, then one key
 * per numbered section. Renders nothing — it is only a key binding.
 */
const KeyboardNav = () => {
  useEffect(() => {
    const jumpTo = (nav) => {
      // The abstract runs straight off the masthead, so its anchor is
      // really the top of the page.
      if (nav.id === navLinks[0].id) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      document.getElementById(nav.id)?.scrollIntoView({ behavior: "smooth" });
    };

    const onKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;

      const nav =
        event.key === "0"
          ? navLinks[0]
          : navLinks.find((link) => link.number === event.key);

      if (!nav) return;

      event.preventDefault();
      jumpTo(nav);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
};

export default KeyboardNav;
