import { certifications, education, skills } from '../content'
import { Reveal, Section } from './ui'

// Ordered the way data moves: where it lives, where it is stored, how it is read, what acts on it, what people use.
const order = ['Platforms', 'Cloud & data', 'Analytics', 'Agents & automation', 'AI & LLMs', 'Apps']

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="mt-12 border-b border-line">
        {order.map((group, i) => (
          <Reveal key={group}>
            <div className="tick grid border-t border-line md:grid-cols-[13rem_minmax(0,1fr)]">
              <h3 className="flex items-center gap-3 px-1 py-3 font-display text-lg font-bold md:py-0">
                <span className="font-mono text-xs font-medium text-amber">{String(i + 1).padStart(2, '0')}</span>
                {group}
              </h3>
              <ul className="flex flex-wrap gap-px bg-line md:border-l md:border-line">
                {skills[group].map((s) => (
                  <li key={s} className="flex min-h-11 grow basis-[9.5rem] items-center bg-shell px-3 py-2 font-mono text-xs leading-snug">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <h3 className="mt-20 font-display text-2xl font-bold tracking-tight">Certifications</h3>
      </Reveal>
      <ul className="mt-6 gap-x-12 border-t border-line md:columns-2">
        {certifications.map((c) => (
          <li key={c.name} className="flex break-inside-avoid items-baseline justify-between gap-4 border-b border-line py-3">
            <span className="min-w-0 font-medium leading-snug">{c.name}</span>
            <span className="shrink-0 font-mono text-xs text-muted">{c.issuer}</span>
          </li>
        ))}
      </ul>

      <Reveal>
        <h3 className="mt-16 font-display text-2xl font-bold tracking-tight">Education</h3>
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
