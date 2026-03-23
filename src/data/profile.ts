export type LinkItem = { label: string; href: string }

export type Project = {
  title: string
  description: string
  tags: string[]
  href: string
  hrefLabel: string
}

export type ExperienceItem = {
  company: string
  role: string
  timeframe: string
  description: string
}

export type SkillMeter = {
  label: string
  value: number
}

export type Profile = {
  name: string
  role: string
  location: string
  email: string
  summary: string
  about: string[]
  links: LinkItem[]
  projects: Project[]
  skills: {
    meters: SkillMeter[]
    chips: string[]
  }
  experience: ExperienceItem[]
  education: string[]
  languages: string[]
  cvDownloadHref: string
}

export const profile: Profile = {
  name: 'Ishak Šaćirbegović',
  role: 'Junior Web Developer',
  location: 'Sarajevo, Bosnia and Herzegovina',
  email: 'i.sacirbey@gmail.com',
  summary:
    'Junior Web Developer with hands-on experience building and deploying real-world web applications and webshops. Strong background in frontend development, UI/UX design, and collaborative team environments.',
  about: [
    'I enjoy building clean, responsive interfaces that feel fast and intentional.',
    'My workflow blends frontend implementation with planning, structured data handling, and iterative UI improvements.',
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/ishaksacirbey' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ishaksacirbey' },
    { label: 'Una Rafting Adventures', href: 'https://www.unaadventure.com/' },
    { label: 'Una Pirates Rafting', href: 'https://www.unapiratesrafting.com/' },
  ],
  projects: [
    {
      title: 'FuelFIT',
      description:
        'Fitness & nutrition web application focused on workout tracking and nutrition awareness. Built with HTML/CSS/JavaScript and structured for responsive usability.',
      tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      href: 'https://github.com/ishaksacirbey',
      hrefLabel: 'Project on GitHub',
    },
    {
      title: 'PI “Bihać” Website',
      description:
        'School website built with a team. Emphasis on easy-to-edit content and an approachable structure for extracurricular activities.',
      tags: ['Teamwork', 'Frontend', 'Content UX'],
      href: 'https://github.com/ishaksacirbey',
      hrefLabel: 'More work',
    },
    {
      title: 'Dalga Design Webshop',
      description:
        'A fully functional webshop for a local clothing brand. Focused on boosting sales, digital credibility, and a smooth online shopping experience.',
      tags: ['Webshop', 'Frontend', 'E-commerce UX'],
      href: 'https://github.com/ishaksacirbey',
      hrefLabel: 'More work',
    },
  ],
  skills: {
    // Values are adjustable; they’re used to drive the animated meters.
    meters: [
      { label: 'JavaScript', value: 85 },
      { label: 'HTML & CSS', value: 88 },
      { label: 'React', value: 70 },
      { label: 'UI/UX + Figma', value: 72 },
      { label: 'SQL (MySQL/PostgreSQL)', value: 62 },
      { label: 'Git & GitHub', value: 78 },
      { label: 'Docker (basic)', value: 45 },
      { label: 'Linux', value: 60 },
    ],
    chips: [
      'Responsive layouts',
      'Clean UI',
      'Structured data handling',
      'Team collaboration',
      'Problem solving',
      'Accessible interactions',
    ],
  },
  experience: [
    {
      company: 'FuelFIT',
      role: 'Frontend / Web Developer',
      timeframe: '2025',
      description:
        'Developed a web-based fitness application for workout tracking and nutrition awareness. Designed a modern, user-friendly interface and implemented responsive layouts with structured data handling.',
    },
    {
      company: 'PI General Secondary Education “Bihać” Website',
      role: 'Web Developer',
      timeframe: '2023',
      description:
        'Collaborated with a five-member team to design a website for school needs. Created content-focused pages for extracurricular activities and improved our ability to work effectively in a team.',
    },
    {
      company: '“Dalga Design” Website',
      role: 'Web Developer',
      timeframe: '2023',
      description:
        'Designed and launched a fully functional webshop for a family-owned brand. Focused on sales, digital visibility, and improving online credibility.',
    },
    {
      company: 'Little Green Place Apartments',
      role: 'Social Media Manager',
      timeframe: '2023',
      description:
        'Led social media for a hospitality business using design skills to attract tourists. Built an understanding of content algorithms for better reach and engagement.',
    },
    {
      company: 'River Rafting Guide',
      role: 'Seasonal Employee',
      timeframe: '2019–2023',
      description:
        'Seasonally employed as a rafting guide with international participants. Improved communication, time-management, and safety practices while managing gear and ensuring participant security.',
    },
  ],
  education: [
    'Faculty of Electrical Engineering, University of Sarajevo — Data Science and Artificial Intelligence (2025 – Present)',
    'Technical University of Graz — Software Engineering and Management (2023 – 2025)',
    'PI General Secondary Education “Bihać” — Informatics & Computer Science (2019–2023)',
  ],
  languages: ['Bosnian (Native)', 'English (Fluent)', 'German (B1.2 level)'],
  cvDownloadHref: '/resume.pdf',
}

