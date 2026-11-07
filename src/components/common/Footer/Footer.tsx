import { Zap } from 'lucide-react'
import { site } from '@/content/site'
import { bem } from '@/utils/bem'
import styles from './Footer.module.scss'

const b = bem(styles, 'footer')
const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className={b()}>
      <div className={b('inner')}>
        <p className={b('copyright')}>
          © {YEAR} {site.author} · {site.location}. Built with React, SCSS (BEM) & GSAP.
        </p>

        <ul className={b('badges')} role="list">
          <li className={b('badge', 'accent')}>
            <Zap aria-hidden="true" />
            GitHub Pages Ready
          </li>
          <li className={b('badge')}>WCAG 2.1 AA Compliant</li>
        </ul>
      </div>
    </footer>
  )
}
