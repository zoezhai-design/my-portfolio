import { Nav } from '@my-portfolio/design-system';
import { projects } from '@/data/projects';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyPage({ params }: PageProps) {
  return (
    <>
      <Nav />
      <h1>{params.slug}</h1>
    </>
  );
}
