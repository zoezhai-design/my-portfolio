import { Image } from '../components/Image';

export interface GraphicX2Image {
  src?: string;
  alt?: string;
  label?: string;
  body?: string;
}

export interface GraphicX2Props {
  images: [GraphicX2Image, GraphicX2Image];
}

/**
 * 4-column grid, 2 rows:
 * Row 1 — text 1 (col 1) · text 2 (cols 3–4)
 * Row 2 — image 1 (cols 1–2) · image 2 (cols 3–4)
 */
export function GraphicX2({ images }: GraphicX2Props) {
  return (
    <section className="ds-graphic ds-graphic--x2">
      <div className="ds-graphic__content">
        {/* Row 1: text labels */}
        <div className="ds-graphic__section">
          {images[0].label && <div className="ds-graphic__section-label">{images[0].label}</div>}
          {images[0].body  && <div className="ds-graphic__section-body">{images[0].body}</div>}
        </div>
        <div className="ds-graphic__section">
          {images[1].label && <div className="ds-graphic__section-label">{images[1].label}</div>}
          {images[1].body  && <div className="ds-graphic__section-body">{images[1].body}</div>}
        </div>
        {/* Row 2: images */}
        <Image src={images[0].src} alt={images[0].alt} />
        <Image src={images[1].src} alt={images[1].alt} />
      </div>
    </section>
  );
}
