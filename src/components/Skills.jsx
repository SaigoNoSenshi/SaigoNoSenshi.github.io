import { Award } from 'lucide-react'
import { certifications, education, skills } from '../content'
import { Reveal, Section } from './ui'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="mt-10 divide-y divide-hairline border-y border-hairline">
        {Object.entries(skills).map(([group, items]) => (
          <Reveal key={group}>
            <div className="grid gap-3 py-5 md:grid-cols-[13rem_1fr] md:gap-8">
              <dt className="font-heading text-base font-semibold">{group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      <Reveal>
        <h3 className="mt-16 font-heading text-2xl font-semibold tracking-tight">Certifications</h3>
      </Reveal>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <li key={c.name}>
            <Reveal delay={(i % 3) * 0.05} className="h-full">
              <div className="card flex h-full items-start gap-3 p-5">
                <Award size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-[0.9375rem] font-medium leading-snug">{c.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{c.issuer}</p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <h3 className="mt-16 font-heading text-2xl font-semibold tracking-tight">Education</h3>
        <p className="mt-4 text-fg/90">
          {education.degree}, {education.school}
        </p>
        <p className="mt-1 font-mono text-sm text-muted">
          {education.period} · {education.note}
        </p>
      </Reveal>
    </Section>
  )
}
