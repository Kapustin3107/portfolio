import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useMotionAnimation } from '@/hooks/useMotionAnimation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { bem } from '@/utils/bem'
import styles from './HeroBackground.module.scss'

const b = bem(styles, 'hero-bg')

type ShapeType = 'diamond' | 'ring' | 'cross' | 'triangle' | 'square'
type ShapeTone = 'primary' | 'secondary' | 'purple'
type Layer = 'mid' | 'front'

interface Shape {
  type: ShapeType
  tone: ShapeTone
  layer: Layer
  /** Position in % of the hero, size in px. */
  top: number
  left: number
  size: number
  /** Hide on small screens to keep the text area clean. */
  desktopOnly?: boolean
}

// Shapes sit mostly along the edges so they never compete with the text.
const SHAPES: Shape[] = [
  { type: 'diamond', tone: 'primary', layer: 'front', top: 14, left: 5, size: 28 },
  { type: 'ring', tone: 'secondary', layer: 'mid', top: 70, left: 3, size: 44 },
  { type: 'cross', tone: 'purple', layer: 'mid', top: 7, left: 46, size: 18 },
  { type: 'triangle', tone: 'primary', layer: 'front', top: 84, left: 38, size: 26, desktopOnly: true },
  { type: 'square', tone: 'secondary', layer: 'front', top: 62, left: 53, size: 20, desktopOnly: true },
  { type: 'ring', tone: 'primary', layer: 'front', top: 16, left: 88, size: 22 },
  { type: 'diamond', tone: 'purple', layer: 'mid', top: 86, left: 92, size: 34 },
  { type: 'cross', tone: 'secondary', layer: 'front', top: 42, left: 96, size: 16, desktopOnly: true },
  { type: 'ring', tone: 'purple', layer: 'mid', top: 92, left: 66, size: 14 },
]

// Max offset in px for the mouse parallax; deeper layers move more.
const DEPTH: Record<'back' | Layer, number> = { back: 12, mid: 24, front: 42 }

function ShapeIcon({ type }: { type: ShapeType }) {
  const paths: Record<ShapeType, ReactNode> = {
    diamond: <path d="M12 2 22 12 12 22 2 12Z" />,
    ring: <circle cx="12" cy="12" r="9" />,
    cross: <path d="M12 3v18M3 12h18" />,
    triangle: <path d="M12 3 21 20H3Z" />,
    square: <rect x="4" y="4" width="16" height="16" rx="2" />,
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      {paths[type]}
    </svg>
  )
}

function ShapeLayer({ layer }: { layer: Layer }) {
  return (
    <div className={b('layer')} data-depth={DEPTH[layer]}>
      {SHAPES.filter((shape) => shape.layer === layer).map((shape, index) => (
        <span
          key={`${shape.type}-${index}`}
          className={b('shape', [shape.tone, shape.desktopOnly && 'desktop-only'])}
          style={{ top: `${shape.top}%`, left: `${shape.left}%`, '--shape-size': `${shape.size}px` } as CSSProperties}
          data-shape
        >
          <ShapeIcon type={shape.type} />
        </span>
      ))}
    </div>
  )
}

/**
 * Decorative animated geometry behind the hero:
 * perspective grid, drifting glow orbs, floating shapes and mouse parallax.
 * Fully static with prefers-reduced-motion; paused while off-screen.
 */
export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useMotionAnimation(ref, ({ reduceMotion, isDesktop }) => {
    const root = ref.current
    if (reduceMotion || !root) return

    const loops: gsap.core.Animation[] = []
    const shapes = gsap.utils.toArray<HTMLElement>('[data-shape]')

    // Entrance
    gsap.from(shapes, { autoAlpha: 0, scale: 0.4, duration: 1, ease: 'back.out(1.7)', stagger: 0.06, delay: 0.4 })

    // Floating: each shape gets its own period, height and rotation.
    shapes.forEach((shape) => {
      loops.push(
        gsap.to(shape, {
          y: gsap.utils.random(-28, -10),
          rotation: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(4, 8),
          delay: gsap.utils.random(0, 2),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }),
      )
    })

    // Orbs drift on a slow Lissajous path (different x / y periods) and breathe.
    gsap.utils.toArray<HTMLElement>('[data-orb]').forEach((orb, index) => {
      const range = 40 + index * 15
      loops.push(
        gsap.to(orb, { x: range, duration: 9 + index * 2, ease: 'sine.inOut', repeat: -1, yoyo: true }),
        gsap.to(orb, { y: range * 0.7, duration: 7 + index * 2, ease: 'sine.inOut', repeat: -1, yoyo: true }),
        gsap.to(orb, { scale: 1.15, opacity: 0.7, duration: 5 + index, ease: 'sine.inOut', repeat: -1, yoyo: true }),
      )
    })

    // Save CPU/GPU: pause infinite loops while the hero is out of view.
    ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: ({ isActive }) => loops.forEach((loop) => loop.paused(!isActive)),
    })

    // Mouse parallax — desktop with a precise pointer only.
    if (!isDesktop || !window.matchMedia('(pointer: fine)').matches) return

    const layers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((layer) => ({
      depth: Number(layer.dataset.depth),
      x: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3.out' }),
      y: gsap.quickTo(layer, 'y', { duration: 1.2, ease: 'power3.out' }),
    }))

    const onPointerMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5
      const ny = event.clientY / window.innerHeight - 0.5
      layers.forEach(({ depth, x, y }) => {
        x(-nx * depth)
        y(-ny * depth)
      })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  })

  return (
    <div ref={ref} className={b()} aria-hidden="true">
      <div className={b('grid-wrapper')}>
        <div className={b('grid')} />
      </div>

      <div className={b('layer')} data-depth={DEPTH.back}>
        <div className={b('orb', 'primary')} data-orb />
        <div className={b('orb', 'secondary')} data-orb />
        <div className={b('orb', 'purple')} data-orb />
      </div>

      <ShapeLayer layer="mid" />
      <ShapeLayer layer="front" />
    </div>
  )
}
