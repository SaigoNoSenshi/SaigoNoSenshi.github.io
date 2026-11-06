import { useEffect } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function Reveal({ children, delay = 0, className }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...(reduce ? {} : { transform: 'translateY(12px)' }) }}
      whileInView={{ opacity: 1, ...(reduce ? {} : { transform: 'translateY(0px)' }) }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

export function Section({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 id={`${id}-title`} className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
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
      el.querySelectorAll('svg').forEach((svg) =>
        entry.isIntersecting ? svg.unpauseAnimations() : svg.pauseAnimations(),
      )
    })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
}
