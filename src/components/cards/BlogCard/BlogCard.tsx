import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { BlogPost } from '@/services/content'
import { bem } from '@/utils/bem'
import { formatDate } from '@/utils/format'
import styles from './BlogCard.module.scss'

const b = bem(styles, 'blog-card')

export function BlogCard({ post }: { post: BlogPost }) {
  const { slug, title, excerpt, date, readingTime, tags, tone } = post

  return (
    <article className={b()}>
      <div className={b('meta')}>
        <span className={b('tags', tone)}>{tags.map((tag) => `#${tag}`).join(' ')}</span>
        <span className={b('reading-time')}>
          <Clock aria-hidden="true" />
          {readingTime} min read
        </span>
      </div>

      <h3 className={b('title')}>
        {/* Stretched link: the whole card is clickable, but only the title is announced. */}
        <Link to={`/blog/${slug}`} className={b('link')}>
          {title}
        </Link>
      </h3>

      <p className={b('excerpt')}>{excerpt}</p>

      <div className={b('footer')}>
        <time dateTime={date}>{formatDate(date)}</time>
        <span className={b('more')} aria-hidden="true">
          Read →
        </span>
      </div>
    </article>
  )
}
