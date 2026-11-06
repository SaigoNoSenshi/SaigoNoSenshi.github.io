import { useEffect, useRef } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import { stats } from '../content'

function Stat({ value, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduce = useReducedMotion()
  const [, num, suffix] = value.match(/^(\d+)(.*)$/)

  useEffect(() => {
    if (reduce || !inView) return
    const controls = animate(0, Number(num), {
      duration: 1.2,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => {
        ref.current.textContent = Math.round(v) + suffix
      },
    })
    return () => controls.stop()
  }, [inView, reduce, num, suffix])

  return (
    <>
      <dt ref={ref} className="font-mono text-4xl font-medium tabular-nums text-amber md:text-5xl">
        {reduce ? value : `0${suffix}`}
      </dt>
      <dd className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted">{label}</dd>
    </>
  )
}

export default function Stats() {
  return (
    <section aria-label="Impact" className="border-y border-hairline bg-surface/60">
      <dl className="wrap grid divide-y divide-hairline sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
        {stats.map((s, i) => (
          <div key={s.value} className={`px-1 py-6 sm:px-6 lg:py-8 ${i === stats.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
            <Stat {...s} />
          </div>
        ))}
      </dl>
    </section>
  )
}
