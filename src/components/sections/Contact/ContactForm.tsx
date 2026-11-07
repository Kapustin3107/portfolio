import { Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/common/Button'
import { useToast } from '@/components/common/Toast'
import { bem } from '@/utils/bem'
import styles from './ContactForm.module.scss'

const b = bem(styles, 'contact-form')

const SUBJECTS = [
  { value: 'hiring', label: 'Job opportunity (Lead / Senior)' },
  { value: 'markup', label: 'Markup from Figma designs' },
  { value: 'design-system', label: 'Design system / UI library' },
  { value: 'audit', label: 'Markup, accessibility & Core Web Vitals audit' },
]

/**
 * Accessible contact form: explicit labels, native validation, required markers.
 * TODO: connect a real endpoint (GitLab Pages is static — e.g. Formspree / Web3Forms).
 */
export function ContactForm() {
  const { showToast } = useToast()
  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const name = String(new FormData(form).get('name') ?? '').trim()

    setSubmitting(true)
    // Placeholder for the network request.
    await new Promise((resolve) => setTimeout(resolve, 400))
    setSubmitting(false)

    showToast(`Thank you, ${name}! Your message has been sent.`, 'success')
    form.reset()
  }

  return (
    <form className={b()} onSubmit={onSubmit} aria-label="Contact form">
      <div className={b('row')}>
        <div className={b('field')}>
          <label htmlFor="contact-name" className={b('label')}>
            Your name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            className={b('control')}
            placeholder="Jane Smith"
            autoComplete="name"
            required
          />
        </div>

        <div className={b('field')}>
          <label htmlFor="contact-email" className={b('label')}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            className={b('control')}
            placeholder="jane@company.com"
            autoComplete="email"
            inputMode="email"
            required
          />
        </div>
      </div>

      <div className={b('field')}>
        <label htmlFor="contact-subject" className={b('label')}>
          Topic
        </label>
        <select id="contact-subject" name="subject" className={b('control', 'select')} defaultValue="hiring">
          {SUBJECTS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className={b('field')}>
        <label htmlFor="contact-message" className={b('label')}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          className={b('control')}
          placeholder="Tell me about the role, task or project..."
          required
        />
      </div>

      <p className={b('hint')}>
        <span aria-hidden="true">*</span> Required fields
      </p>

      <Button type="submit" size="lg" fullWidth disabled={isSubmitting} className={b('submit')}>
        {isSubmitting ? 'Sending…' : 'Send message'}
        <Send aria-hidden="true" className={b('submit-icon')} />
      </Button>
    </form>
  )
}
