import { CircleCheck, Info } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { bem } from '@/utils/bem'
import { ToastContext, type ToastType } from './ToastContext'
import styles from './Toast.module.scss'

const b = bem(styles, 'toast')

const VISIBLE_MS = 4000
const EXIT_MS = 300

interface ToastItem {
  id: number
  message: string
  type: ToastType
  leaving: boolean
}

/** Provides `useToast()` and renders a polite live region announced by screen readers. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())

  const schedule = useCallback((fn: () => void, ms: number) => {
    const timer = setTimeout(() => {
      timers.current.delete(timer)
      fn()
    }, ms)
    timers.current.add(timer)
  }, [])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const showToast = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = nextId.current++
      setToasts((list) => [...list, { id, message, type, leaving: false }])

      schedule(() => {
        setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
        schedule(() => setToasts((list) => list.filter((t) => t.id !== id)), EXIT_MS)
      }, VISIBLE_MS)
    },
    [schedule],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={b('region')} role="status" aria-live="polite">
        {toasts.map(({ id, message, type, leaving }) => (
          <div key={id} className={b(null, [type, leaving && 'leaving'])}>
            {type === 'success' ? (
              <CircleCheck className={b('icon')} aria-hidden="true" />
            ) : (
              <Info className={b('icon')} aria-hidden="true" />
            )}
            <span>{message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
