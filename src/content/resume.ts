/**
 * Resume data (source: Yurii_Kapustin.pdf).
 * Dates use ISO year-month format: '2026-05'. `end: null` means "present".
 */

export interface Role {
  title: string
  start: string
  end: string | null
  achievements: string[]
}

export interface Job {
  company: string
  location: string
  roles: Role[]
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Credential {
  title: string
  issuer: string
  period: string
}

export const summary =
  'Results-driven Frontend Markup Lead and Specialist with over 5 years of commercial experience specializing in advanced HTML/CSS markup, pixel-perfect layout implementation, and web performance optimization. Proven expertise in leading markup development, driving UI/UX quality, optimizing Core Web Vitals, and evolving scalable design systems. Adept at bridging design and engineering to deliver clean, accessible, responsive, and high-performance user interfaces.'

export const experience: Job[] = [
  {
    company: 'BrainRocket',
    location: 'Limassol, Cyprus / Valencia, Spain',
    roles: [
      {
        title: 'Frontend Markup Lead',
        start: '2026-05',
        end: null,
        achievements: [
          'Leading a team of frontend markup developers, setting architectural standards, and driving best practices for code quality and maintainability.',
          'Overseeing UI quality assurance, accessibility compliance, and performance optimization across company projects.',
          'Driving the evolution of company-wide design systems and reusable component libraries to streamline development workflows between design and engineering.',
          'Mentoring team members, conducting code reviews, and aligning technical execution with product goals.',
        ],
      },
      {
        title: 'Frontend Markup Developer',
        start: '2024-07',
        end: '2026-05',
        achievements: [
          'Developed responsive, accessible, and high-performance frontend interfaces for complex web applications.',
          'Maintained and scaled reusable UI component libraries in close collaboration with UI/UX and product teams.',
          'Integrated design systems and translated intricate Figma mockups into clean, semantic, and performant code.',
          'Optimized web applications for cross-browser compatibility and rendering performance.',
        ],
      },
    ],
  },
  {
    company: 'Together Networks',
    location: 'Zaporizhzhia, Ukraine',
    roles: [
      {
        title: 'Web Developer',
        start: '2021-09',
        end: '2024-07',
        achievements: [
          'Built and maintained modern web interfaces, ensuring high standards of markup, styling, and cross-browser consistency.',
          'Collaborated with backend developers to integrate REST APIs and ensure seamless data flow.',
          'Improved page load speeds and overall frontend performance through code refactoring and modern optimization techniques.',
        ],
      },
    ],
  },
]

export const skills: SkillGroup[] = [
  {
    title: 'Languages & Core',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'Semantic HTML', 'CSS3', 'Sass / Less', 'Tailwind CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    items: ['React', 'Next.js', 'Angular (basic)', 'jQuery'],
  },
  {
    title: 'Architecture & Performance',
    items: [
      'Component-Driven Development',
      'Design Systems',
      'Core Web Vitals',
      'Cross-Browser Compatibility',
      'Accessibility (a11y)',
    ],
  },
  {
    title: 'Tools & Workflow',
    items: ['Git', 'Vite', 'Webpack', 'Figma', 'REST APIs', 'Agile / Scrum'],
  },
]

export const education: Credential[] = [
  { title: "Master's Degree in Marketing", issuer: 'Institute of Economics and Information Technologies', period: '2005 – 2010' },
  { title: "Bachelor's Degree in Economics", issuer: 'Institute of Economics and Information Technologies', period: '2005 – 2010' },
]

export const courses: Credential[] = [
  { title: 'HTML Academy Markup Lvl 1 & Lvl 2', issuer: 'HTML Academy', period: '2019 – 2020' },
  { title: 'PPC Marketing Course', issuer: 'Noosphere Academy', period: '2021' },
]

export const languages = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'Russian', level: 'Native' },
  { name: 'English', level: 'Advanced' },
]
