// Source: https://magicui.design/r/number-ticker.json | Licence: MIT | Adapted for jp-portfolio | Copyright and licence text: design/THIRD_PARTY_LICENSES.md
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

const format = (n) => Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n)

// Counts up once when scrolled into view; with reduced motion it renders the final value at once.
export function NumberTicker({ value, delay = 0, className = '', ...props }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 40, stiffness: 120 })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (reduce || !isInView) return
    const timer = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, isInView, delay, value, reduce])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) ref.current.textContent = format(Math.round(latest))
      }),
    [springValue],
  )

  return (
    <span ref={ref} className={`inline-block tabular-nums ${className}`} {...props}>
      {format(reduce ? value : 0)}
    </span>
  )
}
