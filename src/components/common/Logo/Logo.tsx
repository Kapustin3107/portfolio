import { Link } from 'react-router-dom'
import { site } from '@/content/site'
import { bem } from '@/utils/bem'
import styles from './Logo.module.scss'

const b = bem(styles, 'logo')

export function Logo() {
  return (
    // Accessible name = visible text ("markup.lab Frontend Markup Lead"), so voice control works.
    <Link to="/" className={b()}>
      <span className={b('mark')} aria-hidden="true">
        &lt;/&gt;
      </span>
      <span className={b('text')}>
        <span className={b('name')}>{site.brand}</span>
        <span className={b('role')}>{site.role}</span>
      </span>
    </Link>
  )
}
