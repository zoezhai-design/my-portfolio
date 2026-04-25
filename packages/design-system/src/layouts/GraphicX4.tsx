import { Image } from '../components/Image';

export interface GraphicX4Image {
  src?: string;
  alt?: string;
  caption?: string;
}

export interface GraphicX4Props {
  images: [GraphicX4Image, GraphicX4Image, GraphicX4Image, GraphicX4Image];
}

/** Four equal images with optional caption text above each column */
export function GraphicX4({ images }: GraphicX4Props) {
  return (
    <section className="ds-graphic ds-graphic--x4">
      <div className="ds-graphic__content">
        {images.some((img) => img.caption) && (
          <div className="ds-graphic__captions">
            {images.map((img, i) => (
              <div key={i} className="ds-graphic__caption-cell">
                {img.caption && <p className="ds-graphic__caption">{img.caption}</p>}
              </div>
            ))}
          </div>
        )}
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
