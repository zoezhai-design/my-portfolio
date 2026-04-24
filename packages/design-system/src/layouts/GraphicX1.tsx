import type { ReactNode } from 'react';

export interface GraphicX1Props {
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}

/** One large image (left, 60%) + text panel (right, 40%) */
export function GraphicX1({ imageSrc, imageAlt = '', children }: GraphicX1Props) {
  return (
    <section className="ds-graphic ds-graphic--x1">
      <div className="ds-graphic__content">
        <div className="ds-graphic__image ds-graphic__image--large">
          {imageSrc
            ? <img src={imageSrc} alt={imageAlt} className="ds-graphic__img" />
            : <div className="ds-graphic__placeholder" />}
        </div>
        <div className="ds-graphic__text">
          {children}
        </div>
      </div>
    </section>
  );
}
