import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

// The branch is the rail's connection into a section: a node on the rail and a run to the heading.
function Branch() {
  const reduce = useReducedMotion()
  const lit = { backgroundColor: 'var(--color-teal)', boxShadow: '0 0 10px rgb(45 212 191 / 0.7)' }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-4 top-4 md:top-[1.65rem]">
      <motion.span
        className="absolute -left-[4px] -top-[4px] size-[9px] rounded-full border border-line bg-shell"
        initial={false}
        whileInView={reduce ? undefined : lit}
        viewport={{ once: true, margin: '0px 0px -30% 0px' }}
        style={reduce ? lit : undefined}
      />
      <motion.span
        className="absolute left-[5px] top-0 h-px w-[calc(var(--pl)-var(--rail-inset)-5px-0.5rem)] origin-left bg-teal/60"
        initial={reduce ? false : { transform: 'scaleX(0)' }}
        whileInView={{ transform: 'scaleX(1)' }}
        viewport={{ once: true, margin: '0px 0px -30% 0px' }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      />
    </div>
  )
}

export function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative py-20 md:py-28">
      <div className="wrap relative">
        <Branch />
        <Reveal>
          <h2 id={`${id}-title`} className="font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

// SMIL keeps running offscreen; pause it so the page costs nothing while the graphic is not in view.
export function usePauseOffscreen(ref) {
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([entry]) => {
      el.querySelectorAll('svg').forEach((svg) => (entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations()))
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
