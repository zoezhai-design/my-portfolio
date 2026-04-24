import type { CSSProperties } from 'react';
import { Chip } from '../components/Chip';

export interface HomeGridItem {
  number: string;
  title: string;
  type: string;
  category: string;
  description: string;
  href: string;
  imageSrc?: string;
}

export interface HomeGridProps {
  items: HomeGridItem[];
}

function HomeCard({ item }: { item: HomeGridItem }) {
  const style = item.imageSrc
    ? ({ '--home-card-bg': `url(${item.imageSrc})` } as CSSProperties)
    : undefined;

  return (
    <a href={item.href} className="home-card" style={style}>
      {/* Full-bleed image layer — fades out on hover */}
      <div className="home-card__bg" />
      {/* Solid surface overlay — fades in on hover */}
      <div className="home-card__overlay" />
      {/* Content — flex-end anchors everything to the bottom */}
      <div className="home-card__content">
        <h2 className="home-card__title">{item.title}</h2>
        {/* Meta: chips + description — collapse to 0 height, fade in on hover */}
        <div className="home-card__meta">
          <div className="home-card__meta-inner">
            <div className="home-card__chips">
              <Chip label={item.type} />
              <Chip label={item.category} />
            </div>
            <p className="home-card__desc">{item.description}</p>
          </div>
        </div>
      </div>
    </a>
  );
}

/**
 * Three-row masonry grid — matches Figma "Home" layout block (257:1768).
 * Expects exactly 8 items.
 *
 * Row 1 — [large ~3/4 width] [small ~1/4]
 * Row 2 — [third] [third] [third]
 * Row 3 — [quarter] [half] [quarter]
 */
export function HomeGrid({ items }: HomeGridProps) {
  const [c1, c2, c3, c4, c5, c6, c7, c8] = items;
  return (
    <div className="home-grid">
      <div className="home-grid__row home-grid__row--r1">
        {c1 && <HomeCard item={c1} />}
        {c2 && <HomeCard item={c2} />}
      </div>
      <div className="home-grid__row home-grid__row--r2">
        {c3 && <HomeCard item={c3} />}
        {c4 && <HomeCard item={c4} />}
        {c5 && <HomeCard item={c5} />}
      </div>
      <div className="home-grid__row home-grid__row--r3">
        {c6 && <HomeCard item={c6} />}
        {c7 && <HomeCard item={c7} />}
        {c8 && <HomeCard item={c8} />}
      </div>
    </div>
  );
}
