import React from "react";

import Grades from "./Grades";

/**
 * One year of a degree: a dissertation set beside that year's notable
 * modules. The two columns only appear when there are two things to put
 * in them — a year with modules alone gets the width to itself rather
 * than an empty half.
 */
const StudyYear = ({
  name,
  average,
  dissertation,
  modules,
  note,
  gradesLabel = "Notable modules",
}) => {
  const hasModules = modules && modules.length > 0;
  if (!average && !dissertation && !hasModules && !note) return null;

  const split = Boolean(dissertation) && hasModules;

  return (
    <div className="year">
      <h4 className="year__title">
        {name}
        {average && <span className="year__average">{average} average</span>}
      </h4>

      {(dissertation || hasModules) && (
        <div className={`year__cols${split ? " year__cols--split" : ""}`}>
          {dissertation && (
            <div className="year__dissertation">
              <span className="field-label">Dissertation</span>
              <p className="year__dissertation-title">{dissertation.title}</p>
              {dissertation.description && (
                <p className="year__text">{dissertation.description}</p>
              )}
            </div>
          )}

          <Grades label={gradesLabel} items={modules} />
        </div>
      )}

      {note && <p className="year__note">{note}</p>}
    </div>
  );
};

export default StudyYear;
