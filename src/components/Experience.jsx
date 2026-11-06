import { experience } from '../content'
import { Reveal, Section } from './ui'

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="mt-12 ml-2 border-l border-hairline md:ml-3">
        {experience.map((e) => {
          const current = e.period.includes('Present')
          return (
            <li key={e.role + e.org} className="relative pb-12 pl-7 last:pb-0 md:pl-10">
              <span
                aria-hidden="true"
                className={`absolute -left-[6px] top-2 size-[11px] rounded-full border-2 ${current ? 'border-primary bg-primary shadow-[0_0_0_4px_rgb(94_234_212/0.18)]' : 'border-hairline bg-bg'}`}
              />
              <Reveal>
                <div className={current ? 'card border-primary/40 p-6 md:p-8' : 'pt-0.5'}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-heading text-xl font-semibold leading-snug">{e.role}</h3>
                    {current && <span className="chip border-primary/40 text-primary">Current</span>}
                  </div>
                  <p className="mt-2 text-fg/90">{e.org}</p>
                  {e.orgNote && <p className="mt-1 max-w-[65ch] text-sm text-muted">{e.orgNote}</p>}
                  <p className="mt-2 font-mono text-sm text-amber">{e.period}</p>
                  <ul className="mt-5 max-w-[65ch] space-y-3 text-[0.9375rem] leading-relaxed text-muted">
                    {e.points.map((pt) => (
                      <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-primary/60">
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
