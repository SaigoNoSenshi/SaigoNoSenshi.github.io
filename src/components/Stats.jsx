import { stats } from '../content'
import { NumberTicker } from './fx/NumberTicker'
import { Reveal } from './ui'

// "95%+" -> 95 and "%+": the number ticks, the suffix stays.
const split = (value) => {
  const n = parseFloat(value)
  return [n, value.slice(String(n).length)]
}

export default function Stats() {
  return (
    <section id="stats" aria-label="Impact" className="relative py-8 md:py-12">
      <div className="wrap">
        <dl className="border-y border-line">
          {stats.map((s, i) => {
            const [n, suffix] = split(s.value)
            return (
              <Reveal key={s.value} delay={i * 0.04} className="tick group grid items-baseline gap-x-8 gap-y-1 border-b border-line py-5 last:border-b-0 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:py-6">
                  <dt className="font-display text-5xl font-bold leading-none tracking-tight text-fg md:text-7xl">
                    <span className="sr-only">{s.value}</span>
                    <span aria-hidden="true">
                      <NumberTicker value={n} delay={i * 0.08} />
                      <span className="text-teal">{suffix}</span>
                    </span>
                  </dt>
                  <dd className="max-w-[55ch] text-base leading-relaxed text-muted md:text-lg">{s.label}</dd>
              </Reveal>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
