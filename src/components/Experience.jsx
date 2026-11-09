import { experience } from '../content'
import { Reveal, Section } from './ui'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="mt-12 border-t border-line">
        {experience.map((e) => {
          const current = e.period.includes('Present')
          return (
            <li key={e.role + e.org}>
              <Reveal>
                <div className="tick grid gap-x-10 gap-y-4 border-b border-line py-8 before:top-[2.6rem] md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 font-mono text-sm text-amber">
                      {current && <span aria-hidden="true" className="led size-2 rounded-full bg-ok" />}
                      {e.period}
                    </p>
                    <p className="mt-2 font-medium">{e.org}</p>
                    {e.orgNote && <p className="mt-1 text-sm leading-relaxed text-muted">{e.orgNote}</p>}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`font-display font-bold leading-snug tracking-tight ${current ? 'text-2xl md:text-3xl' : 'text-xl'}`}>{e.role}</h3>
                    <ul className="mt-4 max-w-[68ch] space-y-3 leading-relaxed text-muted">
                      {e.points.map((pt) => (
                        <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-teal/60">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
