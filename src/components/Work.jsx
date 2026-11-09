import { useState } from 'react'
import { Boxes, ExternalLink } from 'lucide-react'
import { profile, projects } from '../content'
import { CardSpotlight } from './fx/CardSpotlight'
import { Reveal, Section } from './ui'

const filters = [
  ['all', 'All'],
  ['work', 'Built at work'],
  ['personal', 'Personal'],
]
const kindLabel = { work: 'Built at work', personal: 'Personal' }
// Wide / narrow alternate down the page: 7+5, 5+7, 7+5.
const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7', 'lg:col-span-7', 'lg:col-span-5']

const featured = projects.filter((p) => p.featured)
const rest = projects.filter((p) => !p.featured)
const repoUrl = (repo) => `${profile.links.github}/${repo}`
const linkClass = 'text-link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium'

function Links({ p }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Live <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
      {p.public ? (
        <a href={repoUrl(p.repo)} target="_blank" rel="noopener noreferrer" className={linkClass}>
          Code <ExternalLink size={14} strokeWidth={1.75} aria-hidden="true" />
        </a>
      ) : (
        <span className="inline-flex min-h-11 items-center text-sm text-muted">Code on request</span>
      )}
    </div>
  )
}

// What the project connects: each stack item runs into one bus that feeds the project node. An amber packet crosses the link.
function Schematic({ stack }) {
  return (
    <div className="mt-6 flex items-center">
      <ul aria-label="Stack" className="min-w-0">
        {stack.map((s) => (
          <li
            key={s}
            className="relative py-1 pr-7 before:absolute before:right-0 before:top-0 before:h-full before:w-px before:bg-teal/50 after:absolute after:right-0 after:top-1/2 after:h-px after:w-7 after:bg-teal/50 first:before:top-1/2 first:before:h-1/2 last:before:h-1/2"
          >
            <span className="block break-words rounded border border-line bg-shell px-2.5 py-1.5 font-mono text-xs">
              {s}
            </span>
          </li>
        ))}
      </ul>
      <span aria-hidden="true" className="relative h-px w-8 shrink-0 overflow-hidden bg-teal/50">
        <span className="packet absolute -top-px left-0 h-[3px] w-2 rounded bg-amber" />
      </span>
      <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-lg border border-teal/50 bg-teal/10 text-teal">
        <Boxes size={20} strokeWidth={1.75} />
      </span>
    </div>
  )
}

function Panel({ p, i }) {
  return (
    <li className={spans[i]}>
      <Reveal className="h-full" delay={(i % 2) * 0.06}>
        <CardSpotlight className="panel h-full overflow-hidden">
          <article className="relative z-10 flex h-full flex-col p-6 md:p-7">
            <p className="mono-label flex items-center gap-2.5">
              <span className="font-medium text-amber">{String(i + 1).padStart(2, '0')}</span>
              <span aria-hidden="true" className="size-1.5 rounded-full bg-ok" />
              {kindLabel[p.kind]}
            </p>
            <h3 className={`mt-4 font-display font-bold leading-[1.1] tracking-tight ${i % 3 === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{p.name}</h3>
            <p className="mt-3 max-w-[60ch] leading-relaxed text-muted">{p.summary}</p>
            <Schematic stack={p.stack} />
            <div className="mt-auto pt-4">
              <Links p={p} />
            </div>
          </article>
        </CardSpotlight>
      </Reveal>
    </li>
  )
}

function IndexRow({ p }) {
  return (
    <li className="grid items-baseline gap-x-6 gap-y-1 border-b border-line py-3.5 last:border-b-0 md:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)_minmax(0,1.1fr)_minmax(0,9.5rem)]">
      <p className="min-w-0 font-display text-base font-semibold leading-snug">{p.name}</p>
      <p className="min-w-0 text-sm leading-relaxed text-muted">
        {p.summary}
      </p>
      <p className="min-w-0 font-mono text-xs text-muted">
        {p.stack.join(' · ')}
      </p>
      <p className="flex min-w-0 flex-wrap items-center gap-x-4 text-xs md:justify-end">
        <span className="font-mono text-muted">{kindLabel[p.kind]}</span>
        {p.live && (
          <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 min-w-11 items-center font-medium md:min-h-6 md:min-w-6">
            Live
          </a>
        )}
        {p.public && (
          <a href={repoUrl(p.repo)} target="_blank" rel="noopener noreferrer" className="text-link inline-flex min-h-11 min-w-11 items-center font-medium md:min-h-6 md:min-w-6">
            Code
          </a>
        )}
      </p>
    </li>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('all')
  const shown = rest.filter((p) => filter === 'all' || p.kind === filter)

  return (
    <Section id="work" title="Work">
      <Reveal>
        <p className="mt-4 max-w-[65ch] text-muted">Work projects are cleaned copies: company names, people, credentials and data removed.</p>
      </Reveal>
      <ol aria-label="Featured projects" className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-12">
        {featured.map((p, i) => (
          <Panel key={p.name} p={p} i={i} />
        ))}
      </ol>

      <div className="mt-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-b border-line pb-3">
        <h3 className="font-display text-2xl font-bold tracking-tight">More projects</h3>
        <div role="group" aria-label="Filter projects" className="flex gap-1">
          {filters.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
              className={`min-h-11 rounded-md px-3 text-sm font-medium transition-colors duration-150 ${filter === key ? 'bg-teal text-shell' : 'text-muted hover:text-fg'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-3 font-mono text-xs text-muted" aria-live="polite">
        Showing {shown.length} of {rest.length}
      </p>
      <ul className="mt-2">
        {shown.map((p) => (
          <IndexRow key={p.name} p={p} />
        ))}
      </ul>
    </Section>
  )
}
