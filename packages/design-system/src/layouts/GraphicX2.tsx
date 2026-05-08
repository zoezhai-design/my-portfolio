import { Image } from '../components/Image';

export interface GraphicX2Image {
  src?: string;
  alt?: string;
  label?: string;
  body?: string;
}

export interface GraphicX2Section {
  label?: string;
  body?: string;
}

export interface GraphicX2Props {
  /** Image 1 spans 2 of 4 columns; Image 2 spans 1 column. */
  images: [GraphicX2Image, GraphicX2Image];
  /** Optional right text panel (col 4): growing section at top. */
  section1?: GraphicX2Section;
  /** Optional right text panel (col 4): body text pinned to bottom. */
  section2?: { body: string };
}

/**
 * 4-column grid: image1 (2 cols) · image2 (1 col) · text panel (1 col).
 * Per-image text uses bordered label style. Text panel mirrors X1's right panel.
 */
export function GraphicX2({ images, section1, section2 }: GraphicX2Props) {
  return (
    <section className="ds-graphic ds-graphic--x2">
      <div className="ds-graphic__content">
        {/* Image 1 — spans 2 columns */}
        <div className="ds-graphic__col ds-graphic__col--wide">
          {(images[0].label || images[0].body) && (
            <div className="ds-graphic__section">
              {images[0].label && <div className="ds-graphic__section-label">{images[0].label}</div>}
              {images[0].body  && <div className="ds-graphic__section-body">{images[0].body}</div>}
            </div>
          )}
          <Image src={images[0].src} alt={images[0].alt} />
        </div>

        {/* Image 2 — 1 column */}
        <div className="ds-graphic__col">
          {(images[1].label || images[1].body) && (
            <div className="ds-graphic__section">
              {images[1].label && <div className="ds-graphic__section-label">{images[1].label}</div>}
              {images[1].body  && <div className="ds-graphic__section-body">{images[1].body}</div>}
            </div>
          )}
          <Image src={images[1].src} alt={images[1].alt} />
        </div>

        {/* Right text panel — col 4 */}
        {(section1 || section2) && (
          <div className="ds-graphic__text">
            {section1 && (
              <div className="ds-graphic__section ds-graphic__section--grow">
                {section1.label && <div className="ds-graphic__section-label">{section1.label}</div>}
                {section1.body  && <div className="ds-graphic__section-body">{section1.body}</div>}
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
