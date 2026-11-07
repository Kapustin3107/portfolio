import { bem } from '@/utils/bem'
import styles from './SkipLink.module.scss'

const b = bem(styles, 'skip-link')

/** First focusable element: lets keyboard users jump over the header. */
export function SkipLink({ targetId = 'main-content' }: { targetId?: string }) {
  return (
    <a href={`#${targetId}`} className={b()}>
      Skip to main content
    </a>
  )
}
