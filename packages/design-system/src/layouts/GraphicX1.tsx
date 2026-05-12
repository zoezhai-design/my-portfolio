import { Image } from '../components/Image';

export interface GraphicX1Props {
  imageSrc?: string;
  imageAlt?: string;
  /** Label title — rendered with border-bottom above body */
  label?: string;
  /** Body text */
  body?: string;
}

/** 4-column grid: image spans cols 1–3, text panel in col 4 (label + body). */
export function GraphicX1({ imageSrc, imageAlt = '', label, body }: GraphicX1Props) {
  return (
    <section className="ds-graphic ds-graphic--x1">
      <div className="ds-graphic__content">
        <div className="ds-graphic__image">
          <Image src={imageSrc} alt={imageAlt} />
        </div>
        {(label || body) && (
          <div className="ds-graphic__text">
            <div className="ds-graphic__section">
              {label && <div className="ds-graphic__section-label">{label}</div>}
              {body  && <div className="ds-graphic__section-body">{body}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
