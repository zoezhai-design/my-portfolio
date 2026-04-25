import type { CSSProperties } from 'react';
import { Chip } from './Chip';

export interface CardProps {
  title: string;
  type: string;
  category: string;
  description?: string;
  href?: string;
  imageSrc?: string;
}

/**
 * Overview Card — matches Figma "Overview Card" component set (143:11).
 *
 * Default: full-bleed project image (opacity 0.9) with white title at bottom.
 * Hover:   image fades out → solid surface bg reveals, chips + description
 *          expand below the title via grid 0fr→1fr (title slides up).
 */
export function Card({ title, type, category, description, href, imageSrc }: CardProps) {
  const style = imageSrc
    ? ({ '--card-bg': `url(${imageSrc})` } as CSSProperties)
    : undefined;

  const card = (
    <div className="ds-card" style={style}>
      {/* Image layer — opacity 0.9, fades out on hover */}
      <div className="ds-card__bg" />
      {/* Surface overlay — fades in on hover, covers image */}
      <div className="ds-card__overlay" />
      {/* Content — flex-end: title at bottom, meta expands below */}
      <div className="ds-card__content">
        <h2 className="ds-card__title">{title}</h2>
        <div className="ds-card__meta">
          <div className="ds-card__meta-inner">
            <div className="ds-card__chips">
              <Chip label={type} />
              <Chip label={category} />
            </div>
            {description && <p className="ds-card__desc">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  if (href) return <a href={href} className="ds-card-link">{card}</a>;
  return card;
}
