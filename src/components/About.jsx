import { MapPin } from 'lucide-react'
import { howIWork, profile } from '../content'
import Portrait from './Portrait'
import { Reveal, Section } from './ui'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <div className="mx-auto w-full max-w-[17rem] lg:mx-0">
            <Portrait />
            <p className="mt-4 flex items-start gap-2 font-mono text-xs leading-relaxed text-muted">
              <MapPin size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
        </Reveal>
        <div className="min-w-0">
          <Reveal>
            <p className="max-w-[60ch] text-xl leading-relaxed text-fg/90 md:text-2xl md:leading-relaxed">{profile.summary}</p>
          </Reveal>
          <Reveal>
            <h3 className="mono-label mt-14">How I work</h3>
          </Reveal>
          <ol className="mt-4 border-t border-line">
            {howIWork.map((h, i) => (
              <li key={h.title}>
                <Reveal>
                  <div className="grid gap-x-6 gap-y-1 border-b border-line py-6 sm:grid-cols-[3rem_minmax(0,1fr)]">
                    <span className="font-mono text-sm text-amber">{String(i + 1).padStart(2, '0')}</span>
                    <div className="min-w-0">
                      <h4 className="font-display text-xl font-bold leading-snug">{h.title}</h4>
                      <p className="mt-2 max-w-[62ch] leading-relaxed text-muted">{h.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
