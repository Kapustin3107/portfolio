import { MapPin } from 'lucide-react'
import { ScrollReveal } from '@/components/animated/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { experience, type Role } from '@/content/resume'
import { bem } from '@/utils/bem'
import { formatMonth } from '@/utils/format'
import styles from './Experience.module.scss'

const b = bem(styles, 'experience')

function Period({ start, end }: Pick<Role, 'start' | 'end'>) {
  return (
    <p className={b('period')}>
      <time dateTime={start}>{formatMonth(start)}</time>
      {' — '}
      {end ? <time dateTime={end}>{formatMonth(end)}</time> : 'Present'}
    </p>
  )
}

export function Experience() {
  return (
    <section id="experience" className={b()} aria-labelledby="experience-title">
      <div className={b('inner')}>
        <SectionHeader
          titleId="experience-title"
          eyebrow="Career"
          title="Work Experience"
          description="From web development to leading markup teams: design systems, accessibility and UI performance."
        />

        <ol className={b('timeline')} role="list">
          {experience.map((job) => (
            <ScrollReveal as="li" key={job.company} className={b('job')}>
              <article aria-labelledby={`job-${job.company}`}>
                <header className={b('job-header')}>
                  <h3 id={`job-${job.company}`} className={b('company')}>
                    {job.company}
                  </h3>
                  <p className={b('location')}>
                    <MapPin aria-hidden="true" />
                    {job.location}
                  </p>
                </header>

                <ol className={b('roles')} role="list">
                  {job.roles.map((role) => {
                    const isCurrent = role.end === null
                    return (
                      <li key={role.title} className={b('role', { current: isCurrent })}>
                        <div className={b('role-header')}>
                          <h4 className={b('role-title')}>
                            {role.title}
                            {isCurrent && <span className={b('current-badge')}>Current</span>}
                          </h4>
                          <Period start={role.start} end={role.end} />
                        </div>
                        <ul className={b('achievements')}>
                          {role.achievements.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </li>
                    )
                  })}
                </ol>
              </article>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
