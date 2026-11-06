import { howIWork, profile } from '../content'
import { Reveal, Section } from './ui'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="max-w-[65ch] text-xl leading-relaxed text-fg/90">{profile.summary}</p>
        </Reveal>
        <div>
          <Reveal>
            <h3 className="mono-label mb-4">How I work</h3>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {howIWork.map((h, i) => (
              <li key={h.title}>
                <Reveal delay={i * 0.05} className="h-full">
                  <article className="card h-full p-6">
                    <h4 className="font-heading text-lg font-semibold leading-snug">{h.title}</h4>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{h.body}</p>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
