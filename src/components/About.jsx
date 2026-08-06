import React from "react";

import Reveal from "./Reveal";

/**
 * The abstract runs untitled straight under the masthead rule, flush
 * with the name rather than indented into the text column, so it reads
 * as the opening of the paper rather than as its first section.
 */
const About = () => (
  <Reveal as="section" className="abstract" id="about">
    <p>
      I'm a skilled mathematician with a particular interest in probability and its
      applications. With an overall degree average of 87%, a high first-class, I graduated top of my class
      and was selected as the winner of the F H Jackson prize for the top student in pure
      mathematics. More recently, my interests have covered percolation and network
      theory, which was the topic of my bachelor's thesis, and machine learning (deep
      2BSDE method), which was the topic of a summer research internship project.
    </p>
    <p>
      Outside of mathematics, I am a powerlifter at international level, competing for
      England at the 2026 Commonwealth Championships held in Canada.
    </p>
    <p>
      I have also built <span className="arbor-word">Arbor</span> — an app that helps keep
      track of reading, research and learning:
    </p>
  </Reveal>
);

export default About;
