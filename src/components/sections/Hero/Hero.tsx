import { ArrowRight, Download, Mail } from 'lucide-react'
import { useRef } from 'react'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { site } from '@/content/site'
import { useMotionAnimation } from '@/hooks/useMotionAnimation'
import { gsap } from '@/lib/gsap'
import { bem } from '@/utils/bem'
import { HeroBackground } from './HeroBackground'
import { HeroMetricsCard } from './HeroMetricsCard'
import styles from './Hero.module.scss'

const b = bem(styles, 'hero')

const METRICS = [
  { value: '5+ years', label: 'Commercial experience', tone: 'primary' },
  { value: 'Lead', label: 'Frontend markup team', tone: 'secondary' },
  { value: 'a11y · CWV', label: 'Accessibility & performance', tone: 'neutral' },
] as const

export function Hero() {
  const scope = useRef<HTMLElement>(null)

  useMotionAnimation(scope, ({ reduceMotion }) => {
    if (reduceMotion) return

    // Entrance: text content first, then the metrics card and its items.
    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      // Start at opacity 0.01, not 0: fully transparent text is not counted as painted,
      // which would delay Largest Contentful Paint until the animation ends.
      .from('[data-animate="hero-item"]', { opacity: 0.01, y: 30, duration: 0.7, stagger: 0.1 })
      .from('[data-animate="hero-window"]', { autoAlpha: 0, y: 40, scale: 0.97, duration: 0.9 }, '-=0.5')
      .from('[data-animate="metric"]', { autoAlpha: 0, y: 12, duration: 0.5, stagger: 0.08 }, '-=0.5')

    // Scroll parallax: the background geometry moves slower than the content.
    // fromTo with an explicit start resets any stale inline transform (e.g. after HMR).
    gsap.fromTo(
      '[data-animate="hero-bg"]',
      { x: 0, y: 0, xPercent: 0, yPercent: 0 },
      {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true },
      },
    )
  })

  return (
    <section id="home" ref={scope} className={b()} aria-labelledby="hero-title">
      <div className={b('background')} data-animate="hero-bg">
        <HeroBackground />
      </div>

      <div className={b('inner')}>
        <div className={b('content')}>
          <div data-animate="hero-item">
            <Badge pulse>
              {site.role} @ BrainRocket · {site.location}
            </Badge>
          </div>

          <h1 id="hero-title" className={b('title')} data-animate="hero-item">
            {site.author}{' '}
            <span className={b('title-accent')}>Frontend Developer</span>
          </h1>

          <p className={b('lead')} data-animate="hero-item">
            5+ years of commercial experience in <strong>advanced HTML/CSS markup</strong>, pixel-perfect layout
            implementation and <strong>Core Web Vitals optimization</strong>. I evolve design systems and bridge design
            and engineering to deliver clean, accessible (
            <abbr className={b('abbr')} title="accessibility">
              a11y
            </abbr>
            ), responsive and fast user interfaces.
          </p>

          <dl className={b('metrics')} data-animate="hero-item">
            {METRICS.map(({ value, label, tone }) => (
              <div key={label} className={b('metric')}>
                <dt className={b('metric-label')}>{label}</dt>
                <dd className={b('metric-value', tone)}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={b('actions')} data-animate="hero-item">
            <Button to={{ pathname: '/', hash: '#experience' }} size="lg">
              My experience
              <ArrowRight aria-hidden="true" className={b('arrow')} />
            </Button>
            <Button to={{ pathname: '/', hash: '#contact' }} variant="secondary" size="lg">
              <Mail aria-hidden="true" />
              Get in touch
            </Button>
            {site.cvUrl && (
              <Button
                href={`${import.meta.env.BASE_URL}${site.cvUrl.replace(/^\//, '')}`}
                download
                variant="outline"
                size="lg"
                iconOnly
                aria-label="Download CV (PDF)"
                title="Download CV"
              >
                <Download aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        <div className={b('preview')} data-animate="hero-window">
          <HeroMetricsCard />
        </div>
      </div>
    </section>
  )
}
