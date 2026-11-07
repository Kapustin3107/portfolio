import type { ReactNode } from 'react'
import type { Tone } from '@/services/content'
import { bem, cx } from '@/utils/bem'
import styles from './Tag.module.scss'

const b = bem(styles, 'tag')

interface TagProps {
  children: ReactNode
  tone?: Tone
  /** `solid` is opaque — for placing on top of images. */
  appearance?: 'soft' | 'solid'
  className?: string
}

/** Small mono label: tech stack chips, metric badges on images. */
export function Tag({ children, tone = 'neutral', appearance = 'soft', className }: TagProps) {
  return <span className={cx(b(null, [tone, appearance]), className)}>{children}</span>
}
