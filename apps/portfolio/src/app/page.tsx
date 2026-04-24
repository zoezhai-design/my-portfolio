import { CaseStudyNav, HomeGrid } from '@my-portfolio/design-system';
import { projects } from '@/data/projects';

export default function HomePage() {
  const items = projects.slice(0, 8).map((p, i) => ({
    number:      String(i + 1).padStart(2, '0'),
    title:       p.title,
    type:        p.type,
    category:    p.category,
    description: p.description,
    href:        `/work/${p.slug}`,
    imageSrc:    undefined, // swap in real images per project
  }));

  return (
    <main>
      <CaseStudyNav />
      <HomeGrid items={items} />
    </main>
  );
}
