import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
// During prerender/SSG assume reduced motion so markup is never hidden.
const getServerSnapshot = () => true

/** Reactive `prefers-reduced-motion` flag for non-GSAP logic (e.g. autoplay, smooth scroll). */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
