import { useRef, type ElementType, type ReactNode } from 'react'
import { useMotionAnimation } from '@/hooks/useMotionAnimation'
import { gsap } from '@/lib/gsap'
import { bem, cx } from '@/utils/bem'
import styles from './ScrollReveal.module.scss'

const b = bem(styles, 'scroll-reveal')

interface ScrollRevealProps {
  children: ReactNode
  /** Semantic wrapper element (section, article, li, ...). */
  as?: ElementType
  className?: string
  /** Vertical offset in px the content travels from. */
  y?: number
  delay?: number
  /** Animate direct children one after another. */
  stagger?: number
}

/**
 * Fades and slides content in when it enters the viewport.
 * With reduced motion enabled the content is rendered statically.
 */
export function ScrollReveal({
  children,
  as: Tag = 'div',
  className,
  y = 40,
  delay = 0,
  stagger,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useMotionAnimation(ref, ({ reduceMotion }) => {
    const root = ref.current
    if (reduceMotion || !root) return

    const targets = stagger ? Array.from(root.children) : root

    gsap.from(targets, {
      autoAlpha: 0,
      y,
      delay,
      stagger,
      scrollTrigger: {
        trigger: root,
        start: 'top 85%',
        once: true,
      },
    })
  })

  return (
    <Tag ref={ref} className={cx(b(), className)}>
      {children}
    </Tag>
  )
}
