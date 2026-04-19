export interface Project {
  slug: string;
  title: string;
  /** Platform label shown on card chip, e.g. "Desktop", "iOS" */
  type: string;
  /** Product category label, e.g. "AI Support", "B2B Commerce" */
  category: string;
  /** One-sentence description for case study hero */
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    slug: 'ai-support',
    title: 'AI Support',
    type: 'Desktop',
    category: 'AI Support',
    description: 'Redesigning the support experience with AI-powered triage, real-time suggestions, and agent assist for a global SaaS platform.',
    tags: ['AI', 'Enterprise', 'Design System', 'Support'],
  },
  {
    slug: 'add-purchase-order-flow',
    title: 'Add Purchase Order Flow',
    type: 'Desktop',
    category: 'B2B Commerce',
    description: 'Streamlining the purchase order creation flow for procurement teams handling thousands of SKUs across multiple vendors.',
    tags: ['B2B', 'Commerce', 'Flow Design', 'Enterprise'],
  },
  {
    slug: 'archi',
    title: 'Archi',
    type: 'Mobile',
    category: 'Architecture',
    description: 'A mobile app that helps architects and interior designers capture, annotate, and share spatial concepts on-site.',
    tags: ['Mobile', 'Architecture', 'Spatial', 'iOS'],
  },
  {
    slug: 'portal',
    title: 'Portal',
    type: 'Desktop',
    category: 'Developer Tools',
    description: 'A unified developer portal consolidating API docs, sandbox environments, and team access controls into a single cohesive experience.',
    tags: ['Developer Tools', 'B2B', 'Information Architecture'],
  },
  {
    slug: 'unity',
    title: 'Unity',
    type: 'Desktop',
    category: 'Gaming',
    description: "Redesigning Unity's content marketplace to surface relevant assets and plugins for teams at every stage of game development.",
    tags: ['Gaming', 'Marketplace', 'Content Discovery'],
  },
  {
    slug: 'attention-ios',
    title: 'Attention iOS',
    type: 'iOS',
    category: 'Productivity',
    description: 'A focus and attention management app for iOS that uses ambient cues and smart scheduling to protect deep work sessions.',
    tags: ['iOS', 'Productivity', 'Wellbeing', 'Focus'],
  },
  {
    slug: 'ai-code-reader',
    title: 'AI Code Reader',
    type: 'Desktop',
    category: 'AI Tools',
    description: 'An AI-powered code comprehension tool that explains, annotates, and summarises complex codebases for non-engineering stakeholders.',
    tags: ['AI', 'Developer Tools', 'Accessibility', 'Code'],
  },
  {
    slug: 'event-finder',
    title: 'Event Finder',
    type: 'Mobile',
    category: 'Consumer',
    description: 'A location-aware event discovery app that personalises recommendations based on social graph, past attendance, and real-time context.',
    tags: ['Consumer', 'Mobile', 'Personalisation', 'Events'],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
