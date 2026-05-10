import { Image } from '../components/Image';

export interface DiagramX1Props {
  imageSrc?: string;
  imageAlt?: string;
  /** Caption text pinned to the bottom of col 4 */
  caption?: string;
}

/**
 * 4-column grid: image (cols 1–3) · caption pinned to bottom of col 4.
 * Caption uses Label/L: 12px semibold, normal text color.
 */
export function DiagramX1({ imageSrc, imageAlt = '', caption }: DiagramX1Props) {
  return (
    <section className="ds-diagram ds-diagram--x1">
      <div className="ds-diagram__content">
        <div className="ds-diagram__image">
          <Image src={imageSrc} alt={imageAlt} />
        </div>
        <div className="ds-diagram__caption-col">
          {caption && <p className="ds-diagram__caption">{caption}</p>}
        </div>
      </div>
    </section>
  );
}
