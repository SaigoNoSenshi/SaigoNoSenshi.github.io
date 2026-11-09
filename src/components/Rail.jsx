import { useEffect, useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))

// Amber packet; `lag` springs trail the scroll-linked lead so the packets read as travelling, not stuck to the page.
function Packet({ y, size, opacity }) {
  const transform = useMotionTemplate`translate3d(0, ${y}px, 0)`
  return (
    <motion.span
      className="absolute top-0 rounded-full bg-amber"
      style={{ transform, width: size, height: size, left: 0.5 - size / 2, opacity, boxShadow: '0 0 12px rgb(245 181 71 / 0.8)' }}
    />
  )
}

// The one continuous data line down the page. The lead packet sits at mid-viewport and follows scroll.
export default function Rail() {
  const ref = useRef(null)
  const geo = useRef({ top: 0, height: 1, vh: 1 })
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const lead = useMotionValue(0)
  const trailA = useSpring(lead, { stiffness: 90, damping: 18 })
  const trailB = useSpring(lead, { stiffness: 45, damping: 16 })
  const fill = useTransform(lead, (v) => v / geo.current.height)
  const fillTransform = useMotionTemplate`scaleY(${fill})`

  useEffect(() => {
    if (reduce) return
    const place = () => lead.set(clamp(scrollY.get() + geo.current.vh * 0.5 - geo.current.top, 0, geo.current.height))
    const measure = () => {
      const r = ref.current.getBoundingClientRect()
      geo.current = { top: r.top + window.scrollY, height: Math.max(1, r.height), vh: window.innerHeight }
      place()
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ref.current)
    const off = scrollY.on('change', place)
    return () => {
      ro.disconnect()
      off()
    }
  }, [reduce, scrollY, lead])

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[max(1rem,calc((100%-1200px)/2+1rem))] z-[1] w-px bg-line">
      {!reduce && (
        <>
          <motion.div className="absolute inset-0 origin-top bg-teal/50" style={{ transform: fillTransform }} />
          <Packet y={trailB} size={3} opacity={0.4} />
          <Packet y={trailA} size={5} opacity={0.7} />
          <Packet y={lead} size={7} opacity={1} />
        </>
      )}
    </div>
  )
}
