export interface ImageProps {
  src?: string;
  alt?: string;
}

/**
 * Image — matches Figma "Image" component set (257:1921).
 * Fills its container; shows a placeholder when no src is provided.
 */
export function Image({ src, alt = '' }: ImageProps) {
  return (
    <div className="ds-image">
      {src
        ? <img src={src} alt={alt} className="ds-image__img" />
        : <div className="ds-image__placeholder" />}
    </div>
  );
}
