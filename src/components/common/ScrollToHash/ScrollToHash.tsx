import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Router helper: scrolls to `#hash` targets after navigation (react-router does not)
 * and moves focus there so screen-reader and keyboard users land in the right place.
 * Without a hash, a route change scrolls to the top.
 */
export function ScrollToHash() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return

    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
    // Respects `scroll-behavior` from CSS, i.e. instant with reduced motion.
    target.scrollIntoView()
  }, [pathname, hash, key])

  return null
}
