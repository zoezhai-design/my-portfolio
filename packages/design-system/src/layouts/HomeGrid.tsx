import { Card } from '../components/Card';

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
        {c1 && <Card title={c1.title} type={c1.type} category={c1.category} description={c1.description} href={c1.href} imageSrc={c1.imageSrc} />}
        {c2 && <Card title={c2.title} type={c2.type} category={c2.category} description={c2.description} href={c2.href} imageSrc={c2.imageSrc} />}
      </div>
      <div className="home-grid__row home-grid__row--r2">
        {c3 && <Card title={c3.title} type={c3.type} category={c3.category} description={c3.description} href={c3.href} imageSrc={c3.imageSrc} />}
        {c4 && <Card title={c4.title} type={c4.type} category={c4.category} description={c4.description} href={c4.href} imageSrc={c4.imageSrc} />}
        {c5 && <Card title={c5.title} type={c5.type} category={c5.category} description={c5.description} href={c5.href} imageSrc={c5.imageSrc} />}
      </div>
      <div className="home-grid__row home-grid__row--r3">
        {c6 && <Card title={c6.title} type={c6.type} category={c6.category} description={c6.description} href={c6.href} imageSrc={c6.imageSrc} />}
        {c7 && <Card title={c7.title} type={c7.type} category={c7.category} description={c7.description} href={c7.href} imageSrc={c7.imageSrc} />}
        {c8 && <Card title={c8.title} type={c8.type} category={c8.category} description={c8.description} href={c8.href} imageSrc={c8.imageSrc} />}
      </div>
    </div>
  );
}
