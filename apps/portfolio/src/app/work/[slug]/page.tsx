import {
  CaseStudyNav,
  CaseStudyHeader,
  GraphicX1,
  GraphicX2,
  GraphicX3,
  GraphicX4,
} from '@my-portfolio/design-system';
import { NavHistoryButtons } from '@/components/NavHistoryButtons';
import { projects, getProjectBySlug } from '@/data/projects';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function CaseStudyPage({ params }: PageProps) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <main className="ds-case-study">
      {/* ── Nav ─────────────────────────────────────────────── */}
      <CaseStudyNav historyButtons={<NavHistoryButtons />} />

      {/* ── Header ──────────────────────────────────────────── */}
      <CaseStudyHeader
        projectNumber="1.0"
        title={project.title}
        description={project.description}
        projectType={project.type}
        client={project.type}
        date="2024"
        impactText="+32% task completion rate across all user segments"
        team={{
          role: 'Senior Product Designer',
          collaboration: ['Tianxu Zhang', 'Scott So', 'David Boddy'],
          org: 'Global supply team',
        }}
      />

      {/* ── Graphic X1 — hero image + context labels ────────── */}
      <GraphicX1
        imageSrc=""
        imageAlt="Hero screenshot"
        sections={[
          { label: 'Platform', body: project.type },
          { label: 'Scope', body: 'End-to-end product design' },
        ]}
      />

      {/* ── Graphic X2 — two equal columns with label/body + image ── */}
      <GraphicX2
        images={[
          { src: '', alt: 'Before state', label: 'Before', body: 'The original experience before redesign.' },
          { src: '', alt: 'After state',  label: 'After',  body: 'The redesigned experience post-launch.' },
        ]}
      />

      {/* ── Graphic X3 — three annotated screens ────────────── */}
      <GraphicX3
        images={[
          { src: '', alt: 'Discovery',    caption: 'Discovery' },
          { src: '', alt: 'Exploration',  caption: 'Exploration' },
          { src: '', alt: 'Final design', caption: 'Final design' },
        ]}
      />

      {/* ── Graphic X4 — four detail shots ──────────────────── */}
      <GraphicX4
        images={[
          { src: '', alt: 'Component A', caption: 'Component A' },
          { src: '', alt: 'Component B', caption: 'Component B' },
          { src: '', alt: 'Component C', caption: 'Component C' },
          { src: '', alt: 'Component D', caption: 'Component D' },
        ]}
      />
    </main>
  );
}
