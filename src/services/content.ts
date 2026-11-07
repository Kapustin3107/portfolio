/**
 * Content access layer.
 * Today it reads bundled JSON; later it can be swapped for Markdown files
 * managed by Decap CMS without touching the components.
 */
import postsData from '@/content/blog/posts.json'
import projectsData from '@/content/portfolio/projects.json'

export type Tone = 'primary' | 'secondary' | 'purple' | 'amber' | 'neutral'

export type ProjectCategory = 'react' | 'markup' | 'personal'

export interface Project {
  slug: string
  title: string
  /** Where / when, e.g. "BrainRocket · 2024 — Present" */
  context?: string
  category: ProjectCategory
  featured: boolean
  summary: string
  description: string
  highlights: string[]
  image: { src: string; alt: string }
  badges: { label: string; tone: Tone }[]
  tags: string[]
  links: {
    repo?: { provider: 'github' | 'gitlab'; url: string }
    demo?: string
  }
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  /** ISO date, e.g. 2026-10-12 */
  date: string
  /** Minutes */
  readingTime: number
  tags: string[]
  tone: Tone
}

export const PROJECT_CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All projects' },
  { value: 'markup', label: 'Markup & design systems' },
  { value: 'react', label: 'React apps' },
  { value: 'personal', label: 'Personal' },
]

const projects = projectsData as Project[]
const posts = (postsData as BlogPost[]).toSorted((a, b) => b.date.localeCompare(a.date))

export function getProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(limit = 3): Project[] {
  return projects.filter((project) => project.featured).slice(0, limit)
}

export function getLatestPosts(limit = 3): BlogPost[] {
  return posts.slice(0, limit)
}
