import { Link } from 'react-router-dom'
import type { NavItem } from '@/content/site'
import { bem, cx } from '@/utils/bem'
import styles from './Navigation.module.scss'

const b = bem(styles, 'navigation')

interface NavigationProps {
  items: readonly NavItem[]
  activeId: string | null
  /** `desktop` — inline row, `mobile` — stacked list inside the drawer. */
  variant: 'desktop' | 'mobile'
  label: string
  onNavigate?: () => void
  className?: string
}

export function Navigation({ items, activeId, variant, label, onNavigate, className }: NavigationProps) {
  return (
    <nav className={cx(b(null, variant), className)} aria-label={label}>
      <ul className={b('list')} role="list">
        {items.map(({ label: itemLabel, sectionId }) => {
          const isActive = activeId === sectionId
          return (
            <li key={sectionId}>
              <Link
                to={{ pathname: '/', hash: `#${sectionId}` }}
                className={b('link', { active: isActive })}
                aria-current={isActive ? 'location' : undefined}
                onClick={onNavigate}
              >
                {itemLabel}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
