import { useRef } from 'react'
import { useMotionAnimation } from '@/hooks/useMotionAnimation'
import { gsap } from '@/lib/gsap'
import { bem } from '@/utils/bem'
import styles from './ScrollProgress.module.scss'

const b = bem(styles, 'scroll-progress')

/** Thin bar at the top of the viewport that fills as the page is scrolled. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useMotionAnimation(barRef, ({ reduceMotion }) => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        // Smoothing is motion — with reduced motion the bar follows the scroll 1:1.
        scrub: reduceMotion ? true : 0.3,
      },
    })
  })

  return <div ref={barRef} className={b()} aria-hidden="true" />
}
