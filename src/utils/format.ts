import { site } from '@/content/site'

const dateFormatter = new Intl.DateTimeFormat(site.locale, {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** 2026-10-12 -> "October 12, 2026" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(`${isoDate}T00:00:00`))
}

/** Builds a WebP srcset for Unsplash images. */
export function unsplashSrcSet(src: string, widths: number[] = [400, 800, 1200]): string {
  return widths.map((w) => `${unsplashUrl(src, w)} ${w}w`).join(', ')
}

export function unsplashUrl(src: string, width: number): string {
  return `${src}?auto=format&fm=webp&fit=crop&w=${width}&q=75`
}

const monthFormatter = new Intl.DateTimeFormat(site.locale, { month: 'long', year: 'numeric' })

/** 2026-05 -> "May 2026" */
export function formatMonth(isoMonth: string): string {
  return monthFormatter.format(new Date(`${isoMonth}-01T00:00:00`))
}
