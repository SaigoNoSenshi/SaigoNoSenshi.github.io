import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowDown, GitBranch } from 'lucide-react'
import { profile } from '../content'
import DecryptedText from './fx/DecryptedText'
import { Reveal } from './ui'

const Threads = lazy(() => import('./fx/Threads').catch(() => ({ default: () => null })))

// The threads are the signal: many lines carrying one wave, converging as they travel right.
function Backdrop() {
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 250)
    return () => clearTimeout(id)
  }, [])
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div className="hero-lines absolute inset-0" />
      {ready && !reduce && (
        <Suspense fallback={null}>
          <Threads color="#2DD4BF" accentColor="#60A5FA" amplitude={1.5} distance={0.38} lineCount={64} thickness={0.7} brightness={1.1} angle={-8} enableMouseInteraction />
        </Suspense>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-shell via-shell/75 to-transparent max-md:via-shell/90 max-md:to-shell/70" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-shell to-transparent" />
    </div>
  )
}

export default function Hero() {
  const { name, title, pitch, links } = profile
  return (
    <section id="top" aria-labelledby="top-title" className="relative isolate overflow-hidden">
      <Backdrop />
      <div className="wrap flex min-h-[calc(100svh-4rem)] items-center py-16">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-sm text-teal md:text-base">{title}</p>
          </Reveal>
          <h1 id="top-title" className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6.25rem]">
            <DecryptedText text={name} animateOn="view" sequential speed={55} revealDirection="start" scrambleColor="var(--color-teal)" />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-fg md:text-xl">{pitch}</p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                See my work
                <ArrowDown size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitBranch size={18} strokeWidth={1.75} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
