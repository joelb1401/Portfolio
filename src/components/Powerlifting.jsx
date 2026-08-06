import React from "react";

import Flag, { drawnFlags } from "./Flag";
import Reveal from "./Reveal";
import Section from "./Section";
import { powerlifting } from "../constants";

const Powerlifting = () => (
  <Section id="powerlifting">
    {powerlifting.map((meet, index) => (
      <Reveal
        key={meet.competition}
        className="entry row"
        delay={Math.min(index, 3) * 60}
      >
        <div className="entry__aside">
          {meet.icon ? (
            <img
              className="entry__logo"
              src={meet.icon}
              alt=""
              loading="lazy"
              decoding="async"
            />
          ) : (
            drawnFlags.has(meet.flag) && (
              <Flag of={meet.flag} title={meet.competition} />
            )
          )}
          <span className="entry__date">{meet.date}</span>
        </div>

        <div className="entry__body">
          <h3 className="entry__title">{meet.competition}</h3>
          <p className="entry__meta">{meet.result}</p>
        </div>
      </Reveal>
    ))}
  </Section>
);

export default Powerlifting;
