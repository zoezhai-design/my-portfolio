import { Image } from '../components/Image';

export interface GraphicX3Image {
  src?: string;
  alt?: string;
  label?: string;
}

export interface GraphicX3Props {
  images: [GraphicX3Image, GraphicX3Image, GraphicX3Image];
}

/** Three equal images, each with an optional label header */
export function GraphicX3({ images }: GraphicX3Props) {
  return (
    <section className="ds-graphic ds-graphic--x3">
      <div className="ds-graphic__content">
        <div className="ds-graphic__labels">
          {images.map((img, i) => (
            <div key={i} className="ds-graphic__label-cell">
              {img.label && <span className="ds-graphic__label">{img.label}</span>}
            </div>
          ))}
        </div>
        <div className="ds-graphic__images">
          {images.map((img, i) => (
            <div key={i} className="ds-graphic__image">
              <Image src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
