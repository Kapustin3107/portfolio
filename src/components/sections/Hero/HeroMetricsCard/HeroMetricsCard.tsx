import { bem } from '@/utils/bem'
import styles from './HeroMetricsCard.module.scss'

const b = bem(styles, 'metrics-card')

const METRICS = [
  { value: '100%', label: 'Lighthouse Score' },
  { value: '0.0', label: 'Layout Shift (CLS)' },
  { value: 'WCAG AA', label: 'Accessibility (a11y)' },
  { value: 'BEM / SCSS', label: 'Isolated Architecture' },
]

/** Hero preview: quality metrics of the delivered interfaces. */
export function HeroMetricsCard() {
  return (
    <aside className={b()} aria-labelledby="metrics-card-status">
      <div className={b('header')}>
        <p id="metrics-card-status" className={b('status')}>
          <span className={b('status-dot')} aria-hidden="true" />
          Production Ready
        </p>
        <span className={b('version')}>v2.0 / 2026</span>
      </div>

      <dl className={b('grid')}>
        {METRICS.map(({ value, label }) => (
          <div key={label} className={b('item')} data-animate="metric">
            <dt className={b('label')}>{label}</dt>
            <dd className={b('value')}>{value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
