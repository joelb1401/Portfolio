import React from "react";

import MontyFigure from "./MontyFigure";
import ProjectEntry from "./ProjectEntry";
import Section from "./Section";
import { projects, sectionNumber } from "../constants";

const liveFigures = { monty: <MontyFigure /> };

const Works = () => (
  <Section id="projects">
    {projects.map((project, index) => (
      <ProjectEntry
        key={project.name}
        number={`${sectionNumber("projects")}.${index + 1}`}
        delay={Math.min(index, 3) * 60}
        figure={liveFigures[project.live]}
        {...project}
      />
    ))}
  </Section>
);

export default Works;
