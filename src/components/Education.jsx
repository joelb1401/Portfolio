import React from "react";

import Grades from "./Grades";
import Prizes from "./Prizes";
import Reveal from "./Reveal";
import Section from "./Section";
import StudyYear from "./StudyYear";
import { education } from "../constants";

const gradesLabel = (type) =>
  type === "university" ? "Notable modules" : "Subjects";

// A course with no grade yet must not be left with a dangling separator.
const metaLine = (item) => [item.course, item.grades].filter(Boolean).join(" · ");

const Education = () => (
  <Section id="education">
    {education.map((item, index) => (
      <Reveal
        key={`${item.school}-${item.course ?? item.date}`}
        className="entry row"
        delay={Math.min(index, 3) * 60}
      >
        <div className="entry__aside">
          <img
            className="entry__logo"
            src={item.icon}
            alt=""
            width="36"
            height="36"
            loading="lazy"
            decoding="async"
          />
          <span className="entry__date">{item.date}</span>
        </div>

        <div className="entry__body">
          <h3 className="entry__title">{item.school}</h3>
          {metaLine(item) && <p className="entry__meta">{metaLine(item)}</p>}

          <Prizes items={item.prizes} />

          {item.points?.length > 0 && (
            <ul className="entry__points">
              {item.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          )}

          <Grades label={gradesLabel(item.type)} items={item.subjects} />

          {item.years?.length > 0 && (
            <div className="years">
              {item.years.map((year) => (
                <StudyYear
                  key={year.name}
                  gradesLabel={gradesLabel(item.type)}
                  {...year}
                />
              ))}
            </div>
          )}
        </div>
      </Reveal>
    ))}
  </Section>
);

export default Education;
