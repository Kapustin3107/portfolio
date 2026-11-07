import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { bem } from '@/utils/bem'
import styles from './ThemeToggle.module.scss'

const b = bem(styles, 'theme-toggle')

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={b()}
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <Moon className={b('icon')} aria-hidden="true" />
      ) : (
        <Sun className={b('icon', 'sun')} aria-hidden="true" />
      )}
    </button>
  )
}
