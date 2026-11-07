import { Menu, Send, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { Navigation } from '@/components/common/Navigation'
import { ThemeToggle } from '@/components/common/ThemeToggle'
import { site } from '@/content/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { bem } from '@/utils/bem'
import styles from './Header.module.scss'

const b = bem(styles, 'header')

const MENU_ID = 'mobile-menu'
const DESKTOP_QUERY = '(min-width: 1024px)'
const SECTION_IDS = site.nav.map((item) => item.sectionId)

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const activeId = useActiveSection(SECTION_IDS, pathname === '/')

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Close on Escape (returning focus to the toggle) and when switching to desktop.
  useEffect(() => {
    if (!isMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onBreakpoint = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false)

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [isMenuOpen])

  return (
    <header className={b()}>
      <div className={b('inner')}>
        <Logo />

        <Navigation
          items={site.nav}
          activeId={activeId}
          variant="desktop"
          label="Main navigation"
          className={b('nav')}
        />

        <div className={b('actions')}>
          <ThemeToggle />

          <Button to={{ pathname: '/', hash: '#contact' }} className={b('cta')}>
            <Send aria-hidden="true" />
            Get in touch
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className={b('menu-toggle')}
            aria-expanded={isMenuOpen}
            aria-controls={MENU_ID}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id={MENU_ID} className={b('drawer', { open: isMenuOpen })} hidden={!isMenuOpen}>
        <Navigation
          items={site.nav}
          activeId={activeId}
          variant="mobile"
          label="Mobile navigation"
          onNavigate={closeMenu}
        />
        <Button to={{ pathname: '/', hash: '#contact' }} size="lg" fullWidth onClick={closeMenu}>
          Contact me
        </Button>
      </div>
    </header>
  )
}
