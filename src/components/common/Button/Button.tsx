import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { bem, cx } from '@/utils/bem'
import styles from './Button.module.scss'

const b = bem(styles, 'button')

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  /** Square button that only contains an icon — requires aria-label. */
  iconOnly?: boolean
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

type AsButton = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & { to?: never; href?: never }
type AsAnchor = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> & { href: string; to?: never }
type AsLink = BaseProps & Omit<LinkProps, 'className'> & { href?: never }

export type ButtonProps = AsButton | AsAnchor | AsLink

/**
 * Renders a <button>, an external <a href> or a router <Link to>,
 * all sharing the same visual variants.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', iconOnly = false, fullWidth = false, className, children, ...rest } = props

  const classes = cx(b(null, [variant, size, iconOnly && 'icon-only', fullWidth && 'full-width']), className)

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<AsLink, keyof BaseProps>)}>
        {children}
      </Link>
    )
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as Omit<AsAnchor, keyof BaseProps>)}>
        {children}
      </a>
    )
  }

  const { type = 'button', ...buttonProps } = rest as Omit<AsButton, keyof BaseProps>
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
