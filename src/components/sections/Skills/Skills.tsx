import { BookOpen, GraduationCap, Languages } from 'lucide-react'
import type { ReactNode } from 'react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Tag } from '@/components/common/Tag'
import { courses, education, languages, skills, type Credential } from '@/content/resume'
import { bem } from '@/utils/bem'
import styles from './Skills.module.scss'

const b = bem(styles, 'skills')

function InfoCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <ScrollReveal as="li" className={b('card')}>
      <h3 className={b('card-title')}>
        <span className={b('card-icon')} aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      {children}
    </ScrollReveal>
  )
}

function CredentialList({ items }: { items: Credential[] }) {
  return (
    <ul className={b('credentials')} role="list">
      {items.map(({ title, issuer, period }) => (
        <li key={title} className={b('credential')}>
          <p className={b('credential-title')}>{title}</p>
          <p className={b('credential-meta')}>
            {issuer} · {period}
          </p>
        </li>
      ))}
    </ul>
  )
}

export function Skills() {
  return (
    <section id="skills" className={b()} aria-labelledby="skills-title">
      <div className={b('inner')}>
        <SectionHeader
          titleId="skills-title"
          eyebrow="Stack"
          title="Skills & Technologies"
          description="The tools I use every day to build accessible, high-performance interfaces."
        />

        <ul className={b('grid')} role="list">
          {skills.map((group) => (
            <ScrollReveal as="li" key={group.title} className={b('card')}>
              <h3 className={b('card-title')}>{group.title}</h3>
              <ul className={b('tags')} role="list">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </ul>

        <ul className={b('grid', 'secondary')} role="list">
          <InfoCard icon={<GraduationCap />} title="Education">
            <CredentialList items={education} />
          </InfoCard>

          <InfoCard icon={<BookOpen />} title="Courses & Certifications">
            <CredentialList items={courses} />
          </InfoCard>

          <InfoCard icon={<Languages />} title="Languages">
            <dl className={b('languages')}>
              {languages.map(({ name, level }) => (
                <div key={name} className={b('language')}>
                  <dt className={b('language-name')}>{name}</dt>
                  <dd className={b('language-level')}>{level}</dd>
                </div>
              ))}
            </dl>
          </InfoCard>
        </ul>
      </div>
    </section>
  )
}
