import { useState } from 'react'
import { motion } from 'motion/react'
import { ExternalLink } from 'lucide-react'
import { profile, projects } from '../content'
import { Reveal, Section } from './ui'

const filters = [
  ['all', 'All'],
  ['work', 'Built at work'],
  ['personal', 'Personal'],
]

const repoUrl = (repo) => `${profile.links.github}/${repo}`
const linkClass = 'text-link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium'

function ProjectCard({ p }) {
  return (
    <article className={`card flex h-full flex-col ${p.featured ? 'border-t-primary/40 bg-gradient-to-b from-primary/[0.07] to-surface p-7' : 'p-6'}`}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={`font-heading font-semibold leading-snug ${p.featured ? 'text-xl' : 'text-lg'}`}>{p.name}</h3>
        <span className="mono-label mt-1 shrink-0">{p.kind === 'work' ? 'Work' : 'Personal'}</span>
      </div>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{p.summary}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <li key={s} className="chip">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 pt-4">
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
          <span className="inline-flex min-h-11 items-center text-sm text-muted">Code available on request</span>
        )}
      </div>
    </article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('all')
  const shown = projects.filter((p) => filter === 'all' || p.kind === filter)
  const featured = shown.filter((p) => p.featured)
  const rest = shown.filter((p) => !p.featured)

  return (
    <Section id="work" title="Work">
      <Reveal>
        <p className="mt-4 max-w-[65ch] text-muted">
          Work projects are cleaned copies: company names, people, credentials and data removed.
        </p>
      </Reveal>
      <div role="group" aria-label="Filter projects" className="mt-8 flex gap-1 border-b border-hairline">
        {filters.map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filter === key}
            onClick={() => setFilter(key)}
            className={`relative min-h-11 min-w-11 px-3 text-sm font-medium transition-colors duration-150 sm:px-4 ${filter === key ? 'text-fg' : 'text-muted hover:text-fg'}`}
          >
            {label}
            {filter === key && (
              <motion.span
                layoutId="work-tab"
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
              />
            )}
          </button>
        ))}
      </div>
      <div key={filter} className="mt-8 space-y-4">
        <ul className="grid gap-4 lg:grid-cols-6">
          {featured.map((p, i) => (
            <li key={p.name} className={p.kind === 'work' ? 'lg:col-span-2' : 'lg:col-span-3'}>
              <Reveal delay={i * 0.05} className="h-full">
                <ProjectCard p={p} />
              </Reveal>
            </li>
          ))}
        </ul>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <li key={p.name}>
              <Reveal delay={(i % 3) * 0.05} className="h-full">
                <ProjectCard p={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
