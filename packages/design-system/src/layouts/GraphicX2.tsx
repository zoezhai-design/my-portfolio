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

/** Two equal columns — each with a label/body text section above an image */
export function GraphicX2({ images }: GraphicX2Props) {
  return (
    <section className="ds-graphic ds-graphic--x2">
      <div className="ds-graphic__content">
        {images.map((img, i) => (
          <div key={i} className="ds-graphic__col">
            {(img.label || img.body) && (
              <div className="ds-graphic__section">
                {img.label && <div className="ds-graphic__section-label">{img.label}</div>}
                {img.body  && <div className="ds-graphic__section-body">{img.body}</div>}
              </div>
            )}
            <div className="ds-graphic__image ds-graphic__image--tall">
              <Image src={img.src} alt={img.alt} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
