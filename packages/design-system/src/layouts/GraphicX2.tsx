import { Image } from '../components/Image';

export interface GraphicX2Image {
  src?: string;
  alt?: string;
}

export interface GraphicX2Props {
  images: [GraphicX2Image, GraphicX2Image];
}

/** Two equal images side by side */
export function GraphicX2({ images }: GraphicX2Props) {
  return (
    <section className="ds-graphic ds-graphic--x2">
      <div className="ds-graphic__content">
        {images.map((img, i) => (
          <div key={i} className="ds-graphic__image">
            <Image src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}
