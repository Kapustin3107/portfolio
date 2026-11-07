import { useEffect, useMemo, useState } from 'react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { ProjectCard } from '@/components/cards/ProjectCard'
import { SectionHeader } from '@/components/common/SectionHeader'
import { ScrollTrigger } from '@/lib/gsap'
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from '@/services/content'
import { bem } from '@/utils/bem'
import { ProjectModal } from './ProjectModal'
import styles from './ProjectList.module.scss'

const b = bem(styles, 'project-list')

type Filter = ProjectCategory | 'all'

interface ProjectListProps {
  projects: Project[]
  id?: string
  eyebrow?: string
  title?: string
}


export function ProjectList({
  projects,
  id = 'portfolio',
  eyebrow = 'Featured work',
  title = 'Portfolio & Projects',
}: ProjectListProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((project) => project.category === filter)),
    [projects, filter],
  )

  // Page height changed — recalculate ScrollTrigger positions (progress bar, reveals).
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [visible])

  const titleId = `${id}-title`
  const countLabel = `Showing ${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`

  return (
    <section id={id} className={b()} aria-labelledby={titleId}>
      <div className={b('inner')}>
        <SectionHeader
          titleId={titleId}
          eyebrow={eyebrow}
          title={title}
          aside={
            <div className={b('filters')} role="group" aria-label="Filter projects by category">
              {PROJECT_CATEGORIES.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className={b('filter', { active: filter === value })}
                  aria-pressed={filter === value}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          }
        />

        <p className="visually-hidden" role="status">
          {countLabel}
        </p>

        {visible.length > 0 ? (
          <ul className={b('grid')} role="list">
            {visible.map((project) => (
              <ScrollReveal as="li" key={project.slug} className={b('item')}>
                <ProjectCard project={project} onOpenDetails={setSelected} />
              </ScrollReveal>
            ))}
          </ul>
        ) : (
          <p className={b('empty')}>No projects in this category yet.</p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
