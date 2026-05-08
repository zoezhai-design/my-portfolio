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

/** Four equal columns — label + body text above each image */
export function GraphicX4({ images }: GraphicX4Props) {
  return (
    <section className="ds-graphic ds-graphic--x4">
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
      </div>
    </section>
  );
}
