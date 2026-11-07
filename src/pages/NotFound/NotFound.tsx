import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { bem } from '@/utils/bem'
import styles from './NotFound.module.scss'

const b = bem(styles, 'not-found')

export function NotFound() {
  return (
    <section className={b()} aria-labelledby="not-found-title">
      <p className={b('code')}>404</p>
      <h1 id="not-found-title" className={b('title')}>
        Page not found
      </h1>
      <p className={b('text')}>It may still be in progress, or the link is outdated.</p>
      <Button to="/" size="lg">
        Back to home
        <ArrowRight aria-hidden="true" />
      </Button>
    </section>
  )
}
