import type { ReactNode } from 'react'
import { bem, cx } from '@/utils/bem'
import styles from './Badge.module.scss'

const b = bem(styles, 'badge')

interface BadgeProps {
  children: ReactNode
  /** Leading icon (decorative). */
  icon?: ReactNode
  /** Pulsing status dot, e.g. "available for work". */
  pulse?: boolean
  className?: string
}

/** Rounded pill label with accent tint (hero status, section eyebrow). */
export function Badge({ children, icon, pulse = false, className }: BadgeProps) {
  return (
    <span className={cx(b(), className)}>
      {pulse && <span className={b('dot')} aria-hidden="true" />}
      {icon && (
        <span className={b('icon')} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
