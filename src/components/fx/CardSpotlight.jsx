// Source: https://ui.aceternity.com/registry/card-spotlight.json | Licence: Aceternity License (https://ui.aceternity.com/licence) | Adapted for jp-portfolio
// Only the pointer-following mask is kept; the CanvasRevealEffect dot field needs three and is left out.
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'motion/react'

export function CardSpotlight({ children, radius = 320, color = 'rgb(45 212 191 / 0.1)', className = '', ...props }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const reduce = useReducedMotion()
  const mask = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div className={`group/spotlight relative ${className}`} onMouseMove={reduce ? undefined : handleMouseMove} {...props}>
      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
          style={{ backgroundColor: color, maskImage: mask, WebkitMaskImage: mask }}
        />
      )}
      {children}
    </div>
  )
}
