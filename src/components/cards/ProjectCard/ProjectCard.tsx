import { ArrowRight, SquareArrowOutUpRight } from 'lucide-react'
import { SocialIcon } from '@/components/common/SocialIcon'
import { Tag } from '@/components/common/Tag'
import type { Project } from '@/services/content'
import { bem } from '@/utils/bem'
import { unsplashSrcSet, unsplashUrl } from '@/utils/format'
import styles from './ProjectCard.module.scss'

const b = bem(styles, 'project-card')

const REPO_LABEL = { github: 'GitHub', gitlab: 'GitLab' } as const

interface ProjectCardProps {
  project: Project
  onOpenDetails: (project: Project) => void
}

export function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  const { slug, title, context, summary, image, badges, tags, links } = project
  const titleId = `project-${slug}-title`

  return (
    <article className={b()} aria-labelledby={titleId}>
      <div className={b('media')}>
        <img
          className={b('image')}
          src={unsplashUrl(image.src, 800)}
          srcSet={unsplashSrcSet(image.src)}
          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
          alt={image.alt}
          width={800}
          height={520}
          loading="lazy"
          decoding="async"
        />
        <ul className={b('badges')} role="list" aria-label="Key metrics">
          {badges.map((badge) => (
            <li key={badge.label}>
              <Tag tone={badge.tone} appearance="solid">
                {badge.label}
              </Tag>
            </li>
          ))}
        </ul>
      </div>

      <div className={b('body')}>
        {context && <p className={b('context')}>{context}</p>}
        <h3 id={titleId} className={b('title')}>
          {title}
        </h3>
        <p className={b('summary')}>{summary}</p>
        <ul className={b('tags')} role="list" aria-label="Technologies">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>

      <footer className={b('footer')}>
        <button type="button" className={b('details')} onClick={() => onOpenDetails(project)} aria-haspopup="dialog">
          Details<span className="visually-hidden"> about {title}</span>
          <ArrowRight aria-hidden="true" />
        </button>

        <div className={b('links')}>
          {links.repo && (
            <a
              href={links.repo.url}
              className={b('link')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title}: source code on ${REPO_LABEL[links.repo.provider]} (opens in a new tab)`}
            >
              <SocialIcon name={links.repo.provider} size={18} />
            </a>
          )}
          {links.demo && (
            <a
              href={links.demo}
              className={b('link')}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title}: live demo (opens in a new tab)`}
            >
              <SquareArrowOutUpRight size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </footer>
    </article>
  )
}
