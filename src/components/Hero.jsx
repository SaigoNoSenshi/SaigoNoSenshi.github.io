import { useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowDown, BadgeCheck, Briefcase, GitBranch, Mail, MapPin } from 'lucide-react'
import { profile } from '../content'
import { Reveal, usePauseOffscreen } from './ui'

const nodes = [
  [60, 90], [40, 220], [80, 350],
  [210, 60], [230, 170], [200, 290], [240, 390],
  [370, 120], [390, 250], [360, 360],
  [480, 200],
]
const edges = [[0, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [7, 10], [8, 10], [9, 10]]
const flowing = [0, 3, 5, 8, 10, 13]

const edgePath = ([a, b]) => `M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`

function DataGraph() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  usePauseOffscreen(ref)
  return (
    <div ref={ref} aria-hidden="true">
      <svg viewBox="0 0 520 440" className="mx-auto w-full max-w-sm lg:max-w-none">
        {edges.map((e, i) => (
          <path key={i} d={edgePath(e)} stroke="#5EEAD4" strokeOpacity="0.22" strokeWidth="1" fill="none" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 10 ? 9 : 5} fill={i === 10 ? '#5EEAD4' : '#11151B'} stroke="#5EEAD4" strokeOpacity={i === 10 ? 1 : 0.6} />
        ))}
        {!reduce &&
          flowing.map((i, k) => (
            <circle key={i} r="3" fill="#F5B544">
              <animateMotion path={edgePath(edges[i])} dur="3.4s" begin={`${-k * 0.9}s`} repeatCount="indefinite" />
            </circle>
          ))}
      </svg>
    </div>
  )
}

export default function Hero() {
  const { name, title, pitch, location, links } = profile
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="glow glow-teal" />
        <div className="glow glow-amber" />
        <div className="grain" />
      </div>
      <div className="wrap grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <h1 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">{name}</h1>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-5 font-mono text-sm text-primary md:text-base">{title}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-fg/90 md:text-xl">{pitch}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} strokeWidth={1.75} aria-hidden="true" />
              {location}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                See my work
                <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitBranch size={18} strokeWidth={1.75} aria-hidden="true" />
                GitHub
              </a>
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn" title="LinkedIn">
                <Briefcase size={18} strokeWidth={1.75} />
              </a>
              <a href={links.credentials} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="Credentials" title="Credentials">
                <BadgeCheck size={18} strokeWidth={1.75} />
              </a>
              <a href={`mailto:${links.email}`} className="icon-link" aria-label="Email" title="Email">
                <Mail size={18} strokeWidth={1.75} />
              </a>
            </div>
          </Reveal>
        </div>
        <DataGraph />
      </div>
    </section>
  )
}
