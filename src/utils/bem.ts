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
 * In dev, a class missing from the module is logged once via console.debug (often a typo).
 */

type Styles = Readonly<Record<string, string>>
type Modifiers = string | ReadonlyArray<string | false | null | undefined> | Record<string, unknown>

// Each missing class is reported once, not on every render.
const reported = new Set<string>()

function resolve(styles: Styles, name: string): string | undefined {
  const value = styles[name]
  if (value === undefined && import.meta.env.DEV && !reported.has(name)) {
    reported.add(name)
    console.debug(`[bem] "${name}" has no styles in its CSS module (fine if intentional, check for typos).`)
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
