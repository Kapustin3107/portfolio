import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { bem } from '@/utils/bem'
import styles from './Modal.module.scss'

const b = bem(styles, 'modal')

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the heading inside `children` — used as the dialog's accessible name. */
  labelledBy: string
  children: ReactNode
}

/**
 * Accessible modal built on the native <dialog>:
 * focus trap, Escape to close, inert background and focus restoration come for free.
 */
export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={b()}
      aria-labelledby={labelledBy}
      onClose={onClose}
      // Click on the backdrop (outside the panel) closes the dialog.
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className={b('panel')}>
        <button type="button" className={b('close')} onClick={onClose} aria-label="Close dialog">
          <X aria-hidden="true" />
        </button>
        {children}
      </div>
    </dialog>
  )
}
