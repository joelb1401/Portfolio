import React from "react";

import Reveal from "./Reveal";
import { navLinks } from "../constants";

/**
 * A numbered section: the number sits in the left margin column, the
 * title in the text column, with a rule spanning both. Numbers and
 * titles come from navLinks so the menu can never drift out of step.
 */
const Section = ({ id, intro, children }) => {
  const nav = navLinks.find((link) => link.id === id);

  return (
    <section className="section" id={id}>
      <Reveal className="section__head row">
        <span className="section__num">{nav?.number ? `${nav.number}.` : ""}</span>
        <h2 className="section__title">{nav?.title}</h2>
        <hr className="rule" />
      </Reveal>

      {intro && (
        <Reveal className="row" delay={80}>
          <div className="section__intro col-main">{intro}</div>
        </Reveal>
      )}

      {children && <div className="section__body">{children}</div>}
    </section>
  );
};

export default Section;
