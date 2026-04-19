import { Chip } from './Chip';

export interface CardProps {
  title: string;
  category: string;
  type: string;
  href?: string;
  imageSrc?: string;
}

export function Card({ title, category, type, href, imageSrc }: CardProps) {
  const face = (
    <div className="ds-card-wrap">
      {/* Front — surface bg, title + chips bottom-left */}
      <div className="ds-card-front">
        <div className="ds-card-chips">
          <Chip label={type} />
          <Chip label={category} />
        </div>
        <h2 className="ds-card-title">{title}</h2>
      </div>

      {/* Back — full-bleed image, fades in on hover */}
      <div className="ds-card-back">
        {imageSrc
          ? <img src={imageSrc} alt={title} className="ds-card-image" />
          : <div className="ds-card-image-placeholder" />}
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="ds-card-link">{face}</a>;
  }
  return face;
}
