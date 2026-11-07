/**
 * BEM helper for CSS Modules.
 *
 * Maps BEM names onto hashed CSS Module class names, so components
 * never build class strings by hand:
 *
 *   import styles from './PortfolioCard.module.scss'
 *   const b = bem(styles, 'portfolio-card')
 *
 *   b()                                  // .portfolio-card
 *   b(null, { featured: true })          // .portfolio-card .portfolio-card--featured
 *   b('title')                           // .portfolio-card__title
 *   b('title', { featured: isFeatured }) // .portfolio-card__title [.portfolio-card__title--featured]
 *   b('title', 'large')                  // .portfolio-card__title .portfolio-card__title--large
 *
 * In dev, a missing class logs a warning (usually a typo in TSX or SCSS).
 */

type Styles = Readonly<Record<string, string>>
type Modifiers = string | ReadonlyArray<string | false | null | undefined> | Record<string, unknown>

function resolve(styles: Styles, name: string): string | undefined {
  const value = styles[name]
  if (value === undefined && import.meta.env.DEV) {
    console.warn(`[bem] Class "${name}" is not defined in the CSS module.`)
  }
  return value
}

function modifierNames(modifiers: Modifiers | undefined): string[] {
  if (!modifiers) return []
  if (typeof modifiers === 'string') return [modifiers]
  if (Array.isArray(modifiers)) return modifiers.filter((m): m is string => Boolean(m))
  return Object.entries(modifiers)
    .filter(([, enabled]) => Boolean(enabled))
    .map(([name]) => name)
}

export function bem(styles: Styles, block: string) {
  return (element?: string | null, modifiers?: Modifiers): string => {
    const base = element ? `${block}__${element}` : block
    const classes = [resolve(styles, base)]

    for (const modifier of modifierNames(modifiers)) {
      classes.push(resolve(styles, `${base}--${modifier}`))
    }

    return classes.filter(Boolean).join(' ')
  }
}

/** Joins class names, skipping falsy values. Useful for merging external `className` props. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
