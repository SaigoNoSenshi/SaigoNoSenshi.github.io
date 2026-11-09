import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Bot, Check, Database } from 'lucide-react'
import { funnel } from '../content'
import { Section, usePauseOffscreen } from './ui'

const { sources, warehouse, agents, outcomes } = funnel

const curve = ([x1, y1], [x2, y2]) => {
  const xm = (x1 + x2) / 2
  return `M${x1} ${y1} C${xm} ${y1} ${xm} ${y2} ${x2} ${y2}`
}

// Paths in svg coordinates. The svg starts on the rail, so x = 0 is the rail itself.
function measure(box, nodes) {
  const at = (key, side) => {
    const r = nodes[key].getBoundingClientRect()
    const x = side === 'l' ? r.left : side === 'r' ? r.right : (r.left + r.right) / 2
    const y = side === 't' ? r.top : side === 'b' ? r.bottom : (r.top + r.bottom) / 2
    return [x - box.left, y - box.top]
  }
  const wh = at('wh', 'l')
  const ag = at('ag', 'r')
  const yBus = box.height - 18
  return {
    fanIn: sources.map((_, i) => curve(at(`s${i}`, 'r'), wh)),
    mid: `M${at('wh', 'b').join(' ')} V${at('ag', 't')[1]}`,
    fanOut: outcomes.map((_, j) => curve(ag, at(`o${j}`, 'l'))),
    back: outcomes.map((_, j) => {
      const [x, y] = at(`o${j}`, 'r')
      return `M${x} ${y} H${x + 14} V${yBus} H0`
    }),
    merge: yBus,
  }
}

function Packets({ paths, dur }) {
  return paths.map((d, k) => (
    <circle key={d} r="3" fill="var(--color-amber)">
      <animateMotion path={d} dur={dur} begin={`${-k * 0.55}s`} repeatCount="indefinite" />
    </circle>
  ))
}

// Desktop only: the rail fans out into the sources, they converge on the warehouse, the agents fan out
// into the outcomes, and the outcomes return to the rail. Below lg the rail itself is the trunk (ticks).
function Connectors({ figRef, nodes }) {
  const svgRef = useRef(null)
  const reduce = useReducedMotion()
  const [p, setP] = useState(null)
  const { scrollYProgress } = useScroll({ target: figRef, offset: ['start 0.9', 'end 0.9'] })
  const drawIn = useTransform(scrollYProgress, [0, 0.35], [0, 1])
  const drawMid = useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
  const drawOut = useTransform(scrollYProgress, [0.5, 0.75], [0, 1])
  const drawBack = useTransform(scrollYProgress, [0.75, 1], [0, 1])
  const live = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  useEffect(() => {
    const run = () => setP(measure(svgRef.current.getBoundingClientRect(), nodes.current))
    run()
    const ro = new ResizeObserver(run)
    ro.observe(figRef.current)
    document.fonts.ready.then(run)
    return () => ro.disconnect()
  }, [figRef, nodes])

  const line = (d, len, key) => (
    <motion.path key={key} d={d} fill="none" stroke="var(--color-teal)" strokeOpacity="0.5" strokeWidth="1.5" style={{ pathLength: reduce ? 1 : len }} />
  )
  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-0 hidden h-full overflow-visible lg:block"
      style={{ left: 'calc(var(--rail-inset) - var(--pl))', width: 'calc(100% + var(--pl) - var(--rail-inset))' }}
    >
      {p && (
        <>
          {p.fanIn.map((d) => line(d, drawIn, d))}
          {line(p.mid, drawMid, 'mid')}
          {p.fanOut.map((d) => line(d, drawOut, d))}
          {p.back.map((d) => line(d, drawBack, d))}
          <circle cx="0" cy={p.merge} r="4.5" fill="var(--color-shell)" stroke="var(--color-teal)" strokeWidth="1.5" />
          {!reduce && (
            <motion.g style={{ opacity: live }}>
              <Packets paths={p.fanIn} dur="3.6s" />
              <Packets paths={p.fanOut} dur="3s" />
              <Packets paths={p.back} dur="5s" />
            </motion.g>
          )}
        </>
      )}
    </svg>
  )
}

export default function Funnel() {
  const figRef = useRef(null)
  const nodes = useRef({})
  const bind = (key) => (el) => {
    nodes.current[key] = el
  }
  usePauseOffscreen(figRef)

  return (
    <Section id="flow" title="From data to outcomes">
      <figure ref={figRef} className="relative mt-12 pb-16">
        <figcaption className="sr-only">Data flows from sources into a warehouse, then to AI agents and apps, then to outcomes.</figcaption>
        <Connectors figRef={figRef} nodes={nodes} />
        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-x-24">
          <div>
            <p className="mono-label mb-3">Sources</p>
            <ul className="grid gap-2">
              {sources.map((s, i) => (
                <li key={s} ref={bind(`s${i}`)} className="tick flex min-h-10 items-center gap-2.5 rounded-md border border-line bg-raised px-3 font-mono text-sm">
                  <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-blue" />
                  <span className="min-w-0 truncate" title={s}>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-10">
            <div ref={bind('wh')} className="tick panel border-teal/50 p-5 shadow-[0_0_32px_-8px_rgb(45_212_191/0.35)] lg:before:hidden">
              <Database size={22} strokeWidth={1.75} className="text-teal" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-semibold">{warehouse.label}</p>
              <p className="mt-1 text-sm text-muted">{warehouse.detail}</p>
            </div>
            <div ref={bind('ag')} className="tick panel border-blue/50 p-5 lg:before:hidden">
              <Bot size={22} strokeWidth={1.75} className="text-blue" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-semibold">{agents.label}</p>
              <p className="mt-1 text-sm text-muted">{agents.detail}</p>
            </div>
          </div>
          <div>
            <p className="mono-label mb-3">Outcomes</p>
            <ul className="grid gap-3">
              {outcomes.map((o, j) => (
                <li key={o} ref={bind(`o${j}`)} className="tick flex items-center gap-3 rounded-md border border-line bg-raised px-3 py-3.5 lg:before:hidden">
                  <Check size={18} strokeWidth={2} className="shrink-0 text-ok" aria-hidden="true" />
                  <span className="font-display text-lg font-semibold leading-snug">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </figure>
    </Section>
  )
}
