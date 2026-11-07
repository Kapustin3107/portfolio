import { Send } from 'lucide-react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { Badge } from '@/components/common/Badge'
import { SectionHeader } from '@/components/common/SectionHeader'
import { SocialIcon } from '@/components/common/SocialIcon'
import { site } from '@/content/site'
import { bem } from '@/utils/bem'
import { ContactForm } from './ContactForm'
import styles from './Contact.module.scss'

const b = bem(styles, 'contact')

export function Contact() {
  return (
    <section id="contact" className={b()} aria-labelledby="contact-title">
      <div className={b('inner')}>
        <SectionHeader
          titleId="contact-title"
          layout="center"
          badge={<Badge icon={<Send />}>Get in touch</Badge>}
          title="Let's work together"
          description="Open to Lead / Senior roles, markup projects and UI audits. Fill in the form or reach out via email or LinkedIn."
        />

        <ScrollReveal className={b('card')}>
          <ContactForm />
        </ScrollReveal>

        <ul className={b('links')} role="list" aria-label="Contacts">
          {site.contacts.map(({ icon, label, href }) => {
            const isExternal = href.startsWith('http')
            return (
              <li key={href}>
                <a
                  href={href}
                  className={b('link')}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <SocialIcon name={icon} size={18} className={b('link-icon')} />
                  {label}
                  {isExternal && <span className="visually-hidden"> (opens in a new tab)</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
