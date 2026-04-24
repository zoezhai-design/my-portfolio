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
        projectNumber="01"
        title={project.title}
        description={project.description}
        labels={[
          { name: 'Type',   value: project.type },
          { name: 'Date',   value: '2024' },
          { name: 'Impact', value: '+32% task completion rate' },
          { name: 'Team',   value: '1 PM · 2 Eng · 1 Researcher' },
        ]}
      >
        <p className="ds-cs-body">
          This case study documents the end-to-end design process — from initial discovery
          and problem framing through to iterative prototyping, usability testing,
          and final handoff. The outcome is a system that scales across teams and surfaces
          the right information at the right moment.
        </p>
      </CaseStudyHeader>

      {/* ── Graphic X1 — hero image + context labels ────────── */}
      <GraphicX1 imageSrc="" imageAlt="Hero screenshot">
        <div className="ds-cs-side-labels">
          <div className="ds-cs-side-label">
            <span className="ds-cs-side-label__name">Platform</span>
            <span className="ds-cs-side-label__value">{project.type}</span>
          </div>
          <div className="ds-cs-side-label">
            <span className="ds-cs-side-label__name">Scope</span>
            <span className="ds-cs-side-label__value">End-to-end product design</span>
          </div>
        </div>
      </GraphicX1>

      {/* ── Graphic X2 — two equal shots ────────────────────── */}
      <GraphicX2
        images={[
          { src: '', alt: 'Before state' },
          { src: '', alt: 'After state' },
        ]}
      />

      {/* ── Graphic X3 — three annotated screens ────────────── */}
      <GraphicX3
        images={[
          { src: '', alt: 'Discovery', label: 'Discovery' },
          { src: '', alt: 'Exploration', label: 'Exploration' },
          { src: '', alt: 'Final design', label: 'Final design' },
        ]}
      />

      {/* ── Graphic X4 — four detail shots ──────────────────── */}
      <GraphicX4
        images={[
          { src: '', alt: 'Component A', label: 'Component A' },
          { src: '', alt: 'Component B', label: 'Component B' },
          { src: '', alt: 'Component C', label: 'Component C' },
          { src: '', alt: 'Component D', label: 'Component D' },
        ]}
      />
    </main>
  );
}
