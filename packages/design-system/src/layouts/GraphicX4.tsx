import { Image } from '../components/Image';

export interface GraphicX4Image {
  src?: string;
  alt?: string;
  label?: string;
  body?: string;
}

export interface GraphicX4Props {
  images: [GraphicX4Image, GraphicX4Image, GraphicX4Image, GraphicX4Image];
}

/**
 * 4-column grid, 2 rows:
 * Row 1 — label + body text for each column
 * Row 2 — image for each column
 */
export function GraphicX4({ images }: GraphicX4Props) {
  return (
    <section className="ds-graphic ds-graphic--x4">
      <div className="ds-graphic__content">
        {/* Row 1: text labels */}
        {images.map((img, i) => (
          <div key={`text-${i}`} className="ds-graphic__item-text">
            {img.label && <p className="ds-graphic__item-label">{img.label}</p>}
            {img.body  && <p className="ds-graphic__item-body">{img.body}</p>}
          </div>
        ))}
        {/* Row 2: images */}
        {images.map((img, i) => (
          <Image key={`img-${i}`} src={img.src} alt={img.alt} />
        ))}
      </div>
    </section>
  );
}
