export type BlogPost = {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string[]
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'designing-minimal-ui',
    title: 'Designing Minimal UI That Still Feels Alive',
    date: '2026-03-23',
    excerpt:
      'A quick checklist for building minimal interfaces that remain clear, accessible, and animation-friendly.',
    tags: ['UI/UX', 'Frontend', 'Animation'],
    content: [
      'Minimal UI is not “empty UI”. It’s about choosing the few elements that communicate the most.',
      'Motion should support meaning: transitions can explain state changes, while scroll reveals can guide attention without overwhelming the user.',
      'Always respect reduced motion settings and keep interaction feedback consistent across components.',
    ],
  },
  {
    slug: 'frontend-workflow',
    title: 'My Frontend Workflow: From Structure to Polish',
    date: '2026-03-10',
    excerpt:
      'How I go from requirements to responsive layouts using structured data, iterative UI, and practical problem-solving.',
    tags: ['Workflow', 'React', 'Responsiveness'],
    content: [
      'I start with structure: components, data shape, and responsive behavior.',
      'Then I move to polish: spacing, typography rhythm, and interactive feedback.',
      'Finally I refine with edge cases (mobile sizes, long text, and accessibility).',
    ],
  },
]

