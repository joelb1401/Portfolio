import React from "react";

import Reveal from "./Reveal";
import Section from "./Section";
import { experiences } from "../constants";

const Experience = () => (
  <Section id="work">
    {experiences.map((experience, index) => (
      <Reveal
        key={`${experience.company_name}-${experience.title}`}
        className="entry row"
        delay={Math.min(index, 3) * 60}
      >
        <div className="entry__aside">
          {experience.icon && (
            <img
              className="entry__logo"
              src={experience.icon}
              alt=""
              width="36"
              height="36"
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="entry__date">{experience.date}</span>
        </div>

        <div className="entry__body">
          <h3 className="entry__title">
            {experience.href ? (
              <a className="entry__jump" href={experience.href}>
                {experience.title}
              </a>
            ) : (
              experience.title
            )}
          </h3>
          <p className="entry__meta">{experience.company_name}</p>

          {experience.points?.length > 0 && (
            <ul className="entry__points">
              {experience.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    ))}
  </Section>
);

export default Experience;
