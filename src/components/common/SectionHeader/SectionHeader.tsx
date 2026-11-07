import type { ReactNode } from 'react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { bem, cx } from '@/utils/bem'
import styles from './SectionHeader.module.scss'

const b = bem(styles, 'section-header')

interface SectionHeaderProps {
  /** id for the <h2>, referenced by the section's aria-labelledby. */
  titleId: string
  title: string
  /** Small uppercase label above the title. */
  eyebrow?: string
  /** Replaces the eyebrow with custom content (e.g. a Badge). */
  badge?: ReactNode
  description?: ReactNode
  /** `split` — title left, aside content right (desktop). `center` — stacked, centered. */
  layout?: 'split' | 'center'
  /** Extra content on the right in `split` layout (filters, etc.). */
  aside?: ReactNode
  className?: string
}

export function SectionHeader({
  titleId,
  title,
  eyebrow,
  badge,
  description,
  layout = 'split',
  aside,
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cx(b(null, layout), className)}>
      <div className={b('heading')}>
        {badge ?? (eyebrow && <p className={b('eyebrow')}>{eyebrow}</p>)}
        <h2 id={titleId} className={b('title')}>
          {title}
        </h2>
        {layout === 'center' && description && <p className={b('description')}>{description}</p>}
      </div>

      {layout === 'split' && description && <p className={b('description')}>{description}</p>}
      {aside}
    </ScrollReveal>
  )
}
