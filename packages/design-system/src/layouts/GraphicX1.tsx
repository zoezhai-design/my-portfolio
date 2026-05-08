import { Image } from '../components/Image';

export interface GraphicX1Section {
  label?: string;
  body: string;
}

export interface GraphicX1Props {
  imageSrc?: string;
  imageAlt?: string;
  /** Section 1 — label + body, fills top of text panel */
  section1?: GraphicX1Section;
  /** Section 2 — body only, pinned to bottom of text panel */
  section2?: GraphicX1Section;
}

/** Equal halves: image left, text panel right.
 *  Text panel: section1 (label+body, flex-1) on top, section2 (body only) at bottom. */
export function GraphicX1({ imageSrc, imageAlt = '', section1, section2 }: GraphicX1Props) {
  return (
    <section className="ds-graphic ds-graphic--x1">
      <div className="ds-graphic__content">
        <div className="ds-graphic__image ds-graphic__image--half">
          <Image src={imageSrc} alt={imageAlt} />
        </div>
        {(section1 || section2) && (
          <div className="ds-graphic__text">
            {section1 && (
              <div className="ds-graphic__section ds-graphic__section--grow">
                {section1.label && (
                  <div className="ds-graphic__section-label">{section1.label}</div>
                )}
                <div className="ds-graphic__section-body">{section1.body}</div>
              </div>
            )}
            {section2 && (
              <div className="ds-graphic__section">
                <div className="ds-graphic__section-body">{section2.body}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
