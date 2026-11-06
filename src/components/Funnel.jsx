import { useId, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { funnel } from '../content'
import { Reveal, Section, usePauseOffscreen } from './ui'

// Desktop coordinates are percentages of the container width (viewBox 1000), so the SVG lines meet
// the HTML bands, whose widths are set in the same percentages.
const sourceX = (i) => ((i + 0.5) / funnel.sources.length) * 1000
const spread = (n, left, right) => Array.from({ length: n }, (_, i) => left + ((i + 0.5) / n) * (right - left))
const pair = (from, to) => from.map((x, i) => [x, to[i]])

const desktop = {
  a: pair(funnel.sources.map((_, i) => sourceX(i)), spread(funnel.sources.length, 100, 900)),
  b: pair(spread(5, 100, 900), spread(5, 190, 810)),
  c: pair(spread(3, 190, 810), spread(3, 260, 740)),
}
const mobile = {
  a: [[40, 90], [150, 150], [260, 210]],
  b: [[70, 80], [150, 150], [230, 220]],
  c: [[60, 80], [150, 150], [240, 220]],
}

function Connector({ lines, w, h, className }) {
  const reduce = useReducedMotion()
  const arrow = useId()
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`mx-auto w-full ${className}`} aria-hidden="true">
      <defs>
        <marker id={arrow} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M1 1 L9 5 L1 9" fill="none" stroke="#5EEAD4" strokeOpacity="0.8" strokeWidth="1.5" />
        </marker>
      </defs>
      {lines.map(([x1, x2], i) => {
        const d = `M${x1} 0 C${x1} ${h / 2} ${x2} ${h / 2} ${x2} ${h - 3}`
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="#5EEAD4" strokeOpacity="0.3" strokeWidth="1" vectorEffect="non-scaling-stroke" markerEnd={`url(#${arrow})`} />
            {!reduce && (
              <circle r={w > 500 ? 3.5 : 3} fill="#F5B544">
                <animateMotion path={d} dur="3.2s" begin={`${-((i * 0.83) % 3.2)}s`} repeatCount="indefinite" />
              </circle>
            )}
          </g>
        )
      })}
    </svg>
  )
}

function Flow({ name }) {
  return (
    <>
      <Connector lines={desktop[name]} w={1000} h={name === 'a' ? 110 : 80} className="hidden lg:block" />
      <Connector lines={mobile[name]} w={300} h={56} className="block max-w-xs lg:hidden" />
    </>
  )
}

export default function Funnel() {
  const ref = useRef(null)
  usePauseOffscreen(ref)
  return (
    <Section id="flow" title="From data to outcomes">
      <Reveal className="mt-12">
        <figure ref={ref} className="relative isolate">
          <figcaption className="sr-only">Data flows from sources into a warehouse, then to AI agents and apps, then to outcomes.</figcaption>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 hidden bg-gradient-to-b from-primary/10 to-transparent lg:block"
            style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%, 22% 100%)' }}
          />
          <p className="mono-label mb-3 text-center">Sources</p>
          <ul className="flex flex-wrap justify-center gap-2 lg:grid lg:grid-cols-7 lg:gap-0">
            {funnel.sources.map((s) => (
              <li key={s} className="lg:px-1">
                <span className="flex min-h-12 items-center justify-center rounded-xl border border-hairline bg-surface px-3 py-2 text-center text-sm leading-snug text-fg lg:h-full lg:px-2">
                  {s}
                </span>
              </li>
            ))}
          </ul>
          <Flow name="a" />
          <div className="mx-auto rounded-2xl border border-primary/30 bg-surface px-5 py-5 text-center lg:w-[80%]">
            <p className="font-heading text-lg font-semibold">{funnel.warehouse.label}</p>
            <p className="mt-1 text-sm text-muted">{funnel.warehouse.detail}</p>
          </div>
          <Flow name="b" />
          <div className="mx-auto w-[92%] rounded-2xl border border-primary/30 bg-surface px-5 py-5 text-center lg:w-[62%]">
            <p className="font-heading text-lg font-semibold">{funnel.agents.label}</p>
            <p className="mt-1 text-sm text-muted">{funnel.agents.detail}</p>
          </div>
          <Flow name="c" />
          <ul className="mx-auto flex w-[84%] flex-col gap-2 lg:grid lg:w-[48%] lg:grid-cols-3">
            {funnel.outcomes.map((o) => (
              <li
                key={o}
                className="flex min-h-12 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-center text-sm font-medium leading-snug text-primary"
              >
                {o}
              </li>
            ))}
          </ul>
        </figure>
      </Reveal>
    </Section>
  )
}
