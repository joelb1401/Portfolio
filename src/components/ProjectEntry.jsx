import React from "react";

import Collapsible from "./Collapsible";
import DocumentButtons from "./DocumentButtons";
import Reveal from "./Reveal";

const formatLink = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * A numbered subsection with its thumbnail set as a margin figure.
 * Everything but the name is optional: an entry with no figure, no
 * keywords, no link or no documents simply doesn't lay them out.
 * `figure` swaps the thumbnail for a live one where an entry has
 * something worth running rather than showing.
 */
const ProjectEntry = ({
  id,
  number,
  name,
  meta,
  description,
  tags,
  image,
  source_code_link,
  documents,
  figure,
  delay = 0,
}) => {
  // An abstract runs to several paragraphs; a project blurb is one.
  const paragraphs = Array.isArray(description) ? description : [description];

  return (
    <Reveal className="entry row" delay={delay} id={id}>
      {/* Always present, so the body keeps the text column even when
          there is nothing to put in the margin. */}
      <div className="entry__aside">
        {figure ??
          (image && (
            <figure className="entry__figure">
              <img src={image} alt={name} loading="lazy" decoding="async" />
            </figure>
          ))}
      </div>

      <div className="entry__body">
        <h3 className="entry__title">
          <span className="entry__num">{number}</span>
          {name}
        </h3>

        {meta && <p className="entry__meta">{meta}</p>}

        {paragraphs.filter(Boolean).length > 0 && (
          <Collapsible>
            {paragraphs.filter(Boolean).map((paragraph) => (
              <p className="entry__text" key={paragraph.slice(0, 40)}>
                {paragraph}
              </p>
            ))}
          </Collapsible>
        )}

        {tags?.length > 0 && (
          <p className="entry__keywords">Keywords: {tags.join(", ")}.</p>
        )}

        <DocumentButtons documents={documents} />

        {source_code_link && (
          <a
            className="entry__link"
            href={source_code_link}
            target="_blank"
            rel="noreferrer"
          >
            {formatLink(source_code_link)}
          </a>
        )}
      </div>
    </Reveal>
  );
};

export default ProjectEntry;
