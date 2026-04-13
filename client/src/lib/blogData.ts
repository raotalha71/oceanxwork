export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  heroImage: string;
  publishDate: string;
  readTime: string;
  metaDescription: string;
  faqs: Array<{ q: string; a: string }>;
  relatedProduct?: string;
};

const HERO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663160055787/e87X8f5qPTseU7B2sdQ9t9/SantoriniHero_6bf4b807.webp";

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-inflatable-pool-bars-increase-fnb-revenue",
    title: "How Inflatable Pool Bars Increase Resort F&B Revenue",
    excerpt:
      "A practical framework for estimating incremental beverage and snack revenue from deployable pool bar activations.",
    content: `## Why resorts are adopting deployable bar formats\nA premium deployable bar helps convert passive pool traffic into high-value dwell time and direct spend.\n\n## Core assumptions\n- Baseline guest volume per day\n- Average spend uplift with closer service\n- Number of activation days\n\n## Quick model\n| Metric | Value |\n|---|---|\n| Daily guests engaged | 120 |\n| Incremental spend per guest | 8 |\n| Daily uplift | 960 |\n\n## Implementation tips\n- Start with one pilot zone\n- Track spend before/after activation\n- Add sponsor branding to unlock secondary revenue`,
    category: "Business",
    tags: ["Revenue", "Hospitality", "Pool Bar"],
    heroImage: HERO,
    publishDate: "2026-02-02",
    readTime: "6 min",
    metaDescription: "How to estimate F&B uplift from deployable Oceanex pool bar activations.",
    faqs: [
      {
        q: "What is a realistic first-month KPI?",
        a: "Track daily beverage revenue uplift against the same weekday baseline from the previous month.",
      },
      {
        q: "Should I run all-day activations?",
        a: "Start with peak windows and expand as staffing and demand stabilize.",
      },
    ],
    relatedProduct: "Santorini Pool Bar",
  },
  {
    slug: "trade-buyers-guide-oceanex-collections",
    title: "Trade Buyer Guide: Choosing the Right Oceanex Collection",
    excerpt:
      "A concise decision framework for distributors, agents, and operators comparing pool, event, and themed collections.",
    content: `## Start with venue profile\nMap each venue to primary use case: resort pool, high-volume event, or themed campaign.\n\n## Match by operating model\n- Resort-led recurring activation\n- Event-led mobility and speed\n- Seasonal themed demand\n\n## Procurement checklist\n- Deployment team size\n- Storage and transport workflow\n- Branding requirements\n- Lead-time tolerance`,
    category: "Buying Guide",
    tags: ["Trade", "Procurement", "Collections"],
    heroImage: HERO,
    publishDate: "2026-01-19",
    readTime: "5 min",
    metaDescription: "How trade buyers can choose the right Oceanex collection for their market.",
    faqs: [
      {
        q: "Do I need different products for resort and event channels?",
        a: "Often yes. Demand patterns and service throughput requirements differ significantly by channel.",
      },
      {
        q: "When should we request custom branding?",
        a: "As early as possible, because artwork approvals affect total lead time.",
      },
    ],
    relatedProduct: "Long Bar",
  },
  {
    slug: "world-cup-fan-zone-bar-playbook",
    title: "World Cup Fan Zone Bar Playbook",
    excerpt:
      "Operational guidance for planning high-throughput fan zone service with branded deployable bars.",
    content: `## Fan zone planning priorities\nThroughput, queue control, and fast replenishment are the three constraints that determine event profitability.\n\n## Layout essentials\n- Service frontage facing peak footfall\n- Clear ingress/egress lanes\n- Sponsor-visible branding zones\n\n## Staffing pattern\nRun a staggered rotation with one service lead, one replenishment support, and one queue marshal in peak windows.`,
    category: "Events",
    tags: ["World Cup", "Events", "Operations"],
    heroImage: HERO,
    publishDate: "2025-12-12",
    readTime: "7 min",
    metaDescription: "Fan zone operations guidance for World Cup campaign teams.",
    faqs: [
      {
        q: "How early should setup begin?",
        a: "Aim for full setup and systems check at least 90 minutes before gates open.",
      },
      {
        q: "Can one structure serve multiple concepts?",
        a: "Yes. Many operators rotate bar, sampling, and sponsor-led activations by event schedule.",
      },
    ],
    relatedProduct: "World Cup Event Bar",
  },
];
