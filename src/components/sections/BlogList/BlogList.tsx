import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { BlogCard } from '@/components/cards/BlogCard'
import { SectionHeader } from '@/components/common/SectionHeader'
import type { BlogPost } from '@/services/content'
import { bem } from '@/utils/bem'
import styles from './BlogList.module.scss'

const b = bem(styles, 'blog-list')

interface BlogListProps {
  posts: BlogPost[]
  id?: string
}

export function BlogList({ posts, id = 'blog' }: BlogListProps) {
  const titleId = `${id}-title`

  return (
    <section id={id} className={b()} aria-labelledby={titleId}>
      <div className={b('inner')}>
        <SectionHeader
          titleId={titleId}
          eyebrow="Articles & guides"
          title="Tech Blog"
          description="Notes on markup, Core Web Vitals optimization and best practices for GSAP and React."
        />

        <ul className={b('grid')} role="list">
          {posts.map((post) => (
            <ScrollReveal as="li" key={post.slug}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
