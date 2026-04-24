export interface GraphicX4Image {
  src?: string;
  alt?: string;
  label?: string;
}

export interface GraphicX4Props {
  images: [GraphicX4Image, GraphicX4Image, GraphicX4Image, GraphicX4Image];
}

/** Four equal images, each with an optional label header */
export function GraphicX4({ images }: GraphicX4Props) {
  return (
    <section className="ds-graphic ds-graphic--x4">
      <div className="ds-graphic__content">
        {/* Label row */}
        <div className="ds-graphic__labels">
          {images.map((img, i) => (
            <div key={i} className="ds-graphic__label-cell">
              {img.label && <span className="ds-graphic__label">{img.label}</span>}
            </div>
          ))}
        </div>
        {/* Image row */}
        <div className="ds-graphic__images">
          {images.map((img, i) => (
            <div key={i} className="ds-graphic__image">
              {img.src
                ? <img src={img.src} alt={img.alt ?? ''} className="ds-graphic__img" />
                : <div className="ds-graphic__placeholder" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
