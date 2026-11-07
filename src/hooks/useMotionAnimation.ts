import type { RefObject } from 'react'
import { gsap, MOTION_QUERIES, useGSAP, type MotionConditions } from '@/lib/gsap'

type AnimationSetup = (conditions: MotionConditions) => void | (() => void)

interface Options {
  /** Re-run the animation when these values change. */
  dependencies?: unknown[]
  /** Fully revert and rebuild on dependency change (default: true). */
  revertOnUpdate?: boolean
}

/**
 * Centralized GSAP hook for components.
 *
 * - Scopes selector text to `scope` (e.g. `gsap.from('.hero__title', ...)` only
 *   matches inside the component), so BEM classes never leak between components.
 * - Wraps everything in gsap.matchMedia(): tweens and ScrollTriggers are
 *   automatically reverted on unmount, on dependency change and whenever
 *   media conditions (reduced motion, breakpoint) change.
 * - The setup callback receives `{ motionOk, reduceMotion, isDesktop }`;
 *   return early when `reduceMotion` is true to keep content static.
 *
 * Because CSS Modules hash class names, pass refs or `[data-animate]`
 * attributes rather than raw class selectors.
 */
export function useMotionAnimation(
  scope: RefObject<HTMLElement | null>,
  setup: AnimationSetup,
  { dependencies = [], revertOnUpdate = true }: Options = {},
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MOTION_QUERIES, (context) => {
        return setup(context.conditions as MotionConditions)
      })

      return () => mm.revert()
    },
    { scope, dependencies, revertOnUpdate },
  )
}
