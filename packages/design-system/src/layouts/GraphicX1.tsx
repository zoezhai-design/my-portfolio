import { Image } from '../components/Image';

export interface GraphicX1Section {
  label: string;
  body: string;
}

export interface GraphicX1Props {
  imageSrc?: string;
  imageAlt?: string;
  sections?: [GraphicX1Section, GraphicX1Section];
}

/** Large image (left ~60%) + two labeled body sections (right) */
export function GraphicX1({ imageSrc, imageAlt = '', sections }: GraphicX1Props) {
  return (
    <section className="ds-graphic ds-graphic--x1">
      <div className="ds-graphic__content">
        <div className="ds-graphic__image ds-graphic__image--large">
          <Image src={imageSrc} alt={imageAlt} />
        </div>
        {sections && (
          <div className="ds-graphic__text">
            <div className="ds-graphic__section ds-graphic__section--grow">
              <div className="ds-graphic__section-label">{sections[0].label}</div>
              <div className="ds-graphic__section-body">{sections[0].body}</div>
            </div>
            <div className="ds-graphic__section">
              <div className="ds-graphic__section-label">{sections[1].label}</div>
              <div className="ds-graphic__section-body">{sections[1].body}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
