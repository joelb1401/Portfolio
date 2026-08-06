import React from "react";

/**
 * Prizes and awards, listed under the course line. Each carries an
 * optional date and an optional line of explanation. Renders nothing
 * when there are none, so an education without prizes leaves no gap.
 */
const Prizes = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="prizes">
      <span className="field-label">Prizes</span>

      <ul className="prizes__list">
        {items.map((prize) => (
          <li key={prize.name}>
            <div className="prizes__row">
              <span>{prize.name}</span>
              {prize.date && <span className="prizes__date">{prize.date}</span>}
            </div>

            {prize.description && (
              <p className="prizes__text">{prize.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Prizes;
