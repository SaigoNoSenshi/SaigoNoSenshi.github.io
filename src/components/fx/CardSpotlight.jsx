// Own implementation (pointer-following spotlight). No third-party code.
import { useReducedMotion } from 'motion/react'

export function CardSpotlight({ children, radius = 320, color = 'rgb(45 212 191 / 0.1)', className = '', ...props }) {
  const reduce = useReducedMotion()

  function handlePointerMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    currentTarget.style.setProperty('--x', `${clientX - left}px`)
    currentTarget.style.setProperty('--y', `${clientY - top}px`)
  }

  return (
    <div className={`group/spotlight relative ${className}`} onPointerMove={reduce ? undefined : handlePointerMove} {...props}>
      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
          style={{ background: `radial-gradient(${radius}px circle at var(--x) var(--y), ${color}, transparent 80%)` }}
        />
      )}
      {children}
    </div>
  )
}
