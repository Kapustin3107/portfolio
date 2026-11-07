import { useRef } from 'react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { useMotionAnimation } from '@/hooks/useMotionAnimation'
import { gsap } from '@/lib/gsap'
import { bem } from '@/utils/bem'
import styles from './Home.module.scss'

const b = bem(styles, 'home')

/** Temporary placeholder that verifies the SCSS/BEM + GSAP setup. */
export function Home() {
  const scope = useRef<HTMLElement>(null)

  useMotionAnimation(scope, ({ reduceMotion }) => {
    if (reduceMotion) return

    gsap.from('[data-animate="reveal"]', {
      autoAlpha: 0,
      y: 24,
      stagger: 0.12,
    })
  })

  return (
    <main id="main-content" className={b()} ref={scope}>
      <section className={b('hero')} aria-labelledby="home-title">
        <p className={b('eyebrow')} data-animate="reveal">
          Frontend Developer
        </p>
        <h1 id="home-title" className={b('title')} data-animate="reveal">
          Portfolio <span className={b('title', 'accent')}>in progress</span>
        </h1>
        <p className={b('lead')} data-animate="reveal">
          React · SCSS Modules (BEM) · GSAP ScrollTrigger · Accessibility
        </p>
      </section>

      <ScrollReveal as="section" className={b('section')} stagger={0.15}>
        <h2 className={b('section-title')}>Coming soon</h2>
        <p className={b('text')}>Projects, blog and contact form.</p>
      </ScrollReveal>
    </main>
  )
}
