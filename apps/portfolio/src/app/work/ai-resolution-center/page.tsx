import {
  CaseStudyNav,
  CaseStudyHeader,
  GraphicX1,
  GraphicX2,
  GraphicX3,
  GraphicX4,
  DiagramX1,
  TextX1,
  TextX2,
  TextX4,
} from '@my-portfolio/design-system';
import { NavHistoryButtons } from '@/components/NavHistoryButtons';
import content from '../../../../content/ai-resolution-center.content.json';

export const metadata = {
  title: 'AI Enterprise Support — Zoe Zhai',
  description:
    'Inverting the enterprise support model — AI as an always-accessible floating layer, human agents reserved for the support centre.',
};

const BASE = '/projects/ai-resolution-center';

function img(filename: string) {
  return filename ? `${BASE}/${filename}` : undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderBlock(block: any, index: number) {
  switch (block.block) {
    case 'GraphicLayoutX1':
      return (
        <GraphicX1
          key={index}
          imageSrc={img(block.image)}
          imageAlt={block.alt ?? ''}
          section1={block.section1}
          section2={block.section2}
        />
      );

    case 'GraphicLayoutX2': {
      const [a, b] = block.items ?? [];
      return (
        <GraphicX2
          key={index}
          images={[
            { src: img(a?.image), alt: a?.alt ?? '', label: a?.label, body: a?.body },
            { src: img(b?.image), alt: b?.alt ?? '', label: b?.label, body: b?.body },
          ]}
        />
      );
    }

    case 'GraphicLayoutX3': {
      const [a, b, c] = block.items ?? [];
      return (
        <GraphicX3
          key={index}
          images={[
            { src: img(a?.image), alt: a?.alt ?? '', label: a?.label, body: a?.body },
            { src: img(b?.image), alt: b?.alt ?? '', label: b?.label, body: b?.body },
            { src: img(c?.image), alt: c?.alt ?? '', label: c?.label, body: c?.body },
          ]}
          section1={block.section1}
          section2={block.section2}
        />
      );
    }

    case 'GraphicLayoutX4': {
      const [a, b, c, d] = block.items ?? [];
      return (
        <GraphicX4
          key={index}
          images={[
            { src: img(a?.image), alt: a?.alt ?? '', label: a?.label, body: a?.body },
            { src: img(b?.image), alt: b?.alt ?? '', label: b?.label, body: b?.body },
            { src: img(c?.image), alt: c?.alt ?? '', label: c?.label, body: c?.body },
            { src: img(d?.image), alt: d?.alt ?? '', label: d?.label, body: d?.body },
          ]}
        />
      );
    }

    case 'DiagramX1':
      return (
        <DiagramX1
          key={index}
          imageSrc={img(block.image)}
          imageAlt={block.alt ?? ''}
          caption={block.caption}
        />
      );

    case 'TextX1':
      return <TextX1 key={index} title={block.title} body={block.body} />;

    case 'TextX2': {
      const [s1, s2] = block.sections ?? [];
      return (
        <TextX2
          key={index}
          title={block.title}
          sections={[
            { subtitle: s1?.subtitle, body: s1?.body },
            { subtitle: s2?.subtitle, body: s2?.body },
          ]}
        />
      );
    }

    case 'TextX4': {
      const [c1, c2, c3, c4] = block.columns ?? [];
      return (
        <TextX4
          key={index}
          title={block.title}
          columns={[
            { subtitle: c1?.subtitle, body: c1?.body },
            { subtitle: c2?.subtitle, body: c2?.body },
            { subtitle: c3?.subtitle, body: c3?.body },
            { subtitle: c4?.subtitle, body: c4?.body },
          ]}
        />
      );
    }

    default:
      return null;
  }
}

const { project, blocks } = content;

export default function AiResolutionCenterPage() {
  return (
    <main className="ds-case-study">
      <CaseStudyNav historyButtons={<NavHistoryButtons />} />

      <CaseStudyHeader
        projectNumber="1.0"
        title={project.title}
        description="Inverting the enterprise support model — AI as an always-accessible floating layer, human agents reserved for the support centre, tickets resolved faster with less escalation."
        projectType={project.category}
        client={project.team}
        date={project.year}
        impactText={project.impact.join(' ')}
        team={{
          role: project.role,
          org: project.team,
        }}
      />

      {blocks.map((block, i) => renderBlock(block, i))}
    </main>
  );
}
