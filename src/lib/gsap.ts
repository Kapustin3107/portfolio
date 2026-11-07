/**
 * Single place where GSAP plugins are registered.
 * Always import gsap / ScrollTrigger / useGSAP from here, never from 'gsap' directly,
 * so plugins are registered exactly once.
 */
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

/** Media-query conditions shared by all animations (use with gsap.matchMedia()). */
export const MOTION_QUERIES = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  isDesktop: '(min-width: 1024px)',
} as const

export type MotionConditions = {
  [K in keyof typeof MOTION_QUERIES]: boolean
}

export { gsap, ScrollTrigger, useGSAP }
