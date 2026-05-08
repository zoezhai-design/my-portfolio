import {
  CaseStudyNav,
  CaseStudyHeader,
  GraphicX4,
} from '@my-portfolio/design-system';
import { NavHistoryButtons } from '@/components/NavHistoryButtons';

export const metadata = {
  title: 'AI Enterprise Support — Zoe Zhai',
  description:
    'Inverting the enterprise support model — AI as an always-accessible floating layer, human agents reserved for the support centre.',
};

const BASE = '/projects/ai-resolution-center';

export default function AiResolutionCenterPage() {
  return (
    <main className="ds-case-study">
      <CaseStudyNav historyButtons={<NavHistoryButtons />} />

      <CaseStudyHeader
        projectNumber="1.0"
        title="AI Enterprise Support"
        description="Inverting the enterprise support model — AI as an always-accessible floating layer, human agents reserved for the support centre, tickets resolved faster with less escalation."
        projectType="Marketplace Product"
        client="Global Supply"
        date="2025 Q4"
        impactText="Reduced average response time by 67%. First-contact resolution up from 38% to 71%. AI resolved 65% of tickets without human escalation."
        team={{
          role: 'Senior Product Designer',
          org: 'Global Supply',
        }}
      />

      {/* GraphicLayoutX4 — four diagram frames with body text above */}
      <GraphicX4
        images={[
          {
            src: `${BASE}/diagram-01.png`,
            alt: 'Current state — enterprise support interface',
            label: 'Step 1 · Current State',
            body: 'Enterprise support interfaces like Shopify lead with AI to cut costs and bury human access — a reasonable tradeoff for consumer products, but dangerous for enterprise where unresolved tickets mean real revenue loss.',
          },
          {
            src: `${BASE}/diagram-02.png`,
            alt: 'Rethinking the landscape — inverted support model',
            label: 'Rethinking the Landscape',
            body: 'By inverting the model — making AI the always-accessible floating layer and gating human agents exclusively to the support centre — we reduce cost, increase response speed, and ensure AI operates with the domain context it needs.',
          },
          {
            src: `${BASE}/diagram-03.png`,
            alt: 'AI as a plugin — in-context help across product pages',
            label: 'AI as a Plugin',
            body: 'Extending the AI floating chat beyond the support centre into every core product page means help is delivered in-context, at the exact moment a user encounters friction.',
          },
          {
            src: `${BASE}/diagram-04.png`,
            alt: 'Ticket management — persistent side panel',
            label: 'Ticket Management',
            body: 'Enterprise users juggle many concurrent tickets opened and monitored by different people, so surfacing a persistent side panel of ticket cards gives teams instant visibility and fast context-switching without losing their place.',
          },
        ]}
      />
    </main>
  );
}
