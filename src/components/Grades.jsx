import React from "react";

/**
 * Subjects against their grades, ruled like a table in a paper. Renders
 * nothing at all when there is nothing to list, so an entry without
 * grades leaves no gap behind it.
 */
const Grades = ({ label, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="grades">
      {label && <span className="field-label">{label}</span>}

      <dl className="grades__list">
        {items.map((item) => (
          <React.Fragment key={item.name}>
            <dt>
              {item.href ? (
                <a className="grades__link" href={item.href}>
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </dt>
            <dd>{item.grade}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};

export default Grades;
