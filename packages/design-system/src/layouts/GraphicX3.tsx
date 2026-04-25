import { Image } from '../components/Image';

export interface GraphicX3Image {
  src?: string;
  alt?: string;
  caption?: string;
}

export interface GraphicX3Props {
  images: [GraphicX3Image, GraphicX3Image, GraphicX3Image];
}

/** Three equal images with optional caption text above each column */
export function GraphicX3({ images }: GraphicX3Props) {
  return (
    <section className="ds-graphic ds-graphic--x3">
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
