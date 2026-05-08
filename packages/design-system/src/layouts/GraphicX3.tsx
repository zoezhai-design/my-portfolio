import { Image } from '../components/Image';

export interface GraphicX3Image {
  src?: string;
  alt?: string;
  label?: string;
  body?: string;
}

export interface GraphicX3Section {
  label?: string;
  body?: string;
}

export interface GraphicX3Props {
  images: [GraphicX3Image, GraphicX3Image, GraphicX3Image];
  /** Optional right text panel (col 4): growing section at top. */
  section1?: GraphicX3Section;
  /** Optional right text panel (col 4): body text pinned to bottom. */
  section2?: { body: string };
}

/**
 * 4-column grid: 3 image cols (1 col each) · text panel (1 col).
 * Per-image text uses no-border stacked label/body style.
 */
export function GraphicX3({ images, section1, section2 }: GraphicX3Props) {
  return (
    <section className="ds-graphic ds-graphic--x3">
      <div className="ds-graphic__content">
        {images.map((img, i) => (
          <div key={i} className="ds-graphic__col">
            {(img.label || img.body) && (
              <div className="ds-graphic__item-text">
                {img.label && <p className="ds-graphic__item-label">{img.label}</p>}
                {img.body  && <p className="ds-graphic__item-body">{img.body}</p>}
              </div>
            )}
            <Image src={img.src} alt={img.alt} />
          </div>
        ))}

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
