import React from "react";

import Reveal from "./Reveal";

/**
 * The abstract runs untitled straight under the masthead rule, flush
 * with the name rather than indented into the text column, so it reads
 * as the opening of the paper rather than as its first section.
 *
 * Phrases that the page goes on to cover are linked to the entry that
 * covers them, so the abstract works as a contents page as well.
 */
const About = () => (
  <Reveal as="section" className="abstract" id="about">
    <p>
      I'm a skilled mathematician with a particular interest in probability and its
      applications. With an overall{" "}
      <a className="abstract__link" href="#bsc-degree">
        degree average of 87%
      </a>
      , a high first-class, I graduated top of my class and was selected as the winner of
      the F H Jackson prize for the top student in pure mathematics. More recently, my
      interests have covered{" "}
      <a className="abstract__link" href="#bsc-project">
        percolation and network theory
      </a>
      , which was the topic of my bachelor's thesis, and{" "}
      <a className="abstract__link" href="#samba-project">
        machine learning (deep 2BSDE method)
      </a>
      , which was the topic of a summer research internship project.
    </p>
    <p>
      Outside of mathematics, I am a{" "}
      <a className="abstract__link" href="#powerlifting">
        powerlifter at international level
      </a>
      , competing for England at the 2026 Commonwealth Championships held in Canada.
    </p>
    <p>
      I have also built <span className="arbor-word">Arbor</span> — an app that helps keep
      track of reading, research and learning:
    </p>
  </Reveal>
);

export default About;
