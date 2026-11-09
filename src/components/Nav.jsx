import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../content'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

const manila = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

// Real Manila time; the night shift overlaps the US business day (content.js: Philippines, UTC+8, working US hours).
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(id)
  }, [])
  return (
    <p className="hidden items-center gap-2 whitespace-nowrap font-mono text-[0.6875rem] text-muted min-[360px]:flex md:text-xs">
      <span aria-hidden="true" className="led size-2 rounded-full bg-ok" />
      <span>
        Manila <span className="text-fg">{manila.format(now)}</span>
      </span>
      <span aria-hidden="true">·</span>
      <span>on US hours</span>
    </p>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-shell/80 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-teal focus:px-3 focus:py-2 focus:text-shell">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 md:px-8">
        <a href="#top" aria-label={`${profile.name}, back to top`} className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line bg-raised font-display text-sm font-bold text-teal">
          {profile.short}
        </a>
        <nav aria-label="Primary" className="hidden items-center md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="rounded-md px-3 py-3 text-sm text-muted transition-colors duration-150 hover:text-fg lg:px-4">
              {label}
            </a>
          ))}
        </nav>
        <Clock />
        <button
          type="button"
          className="icon-link shrink-0 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-line bg-shell/95 md:hidden">
          <ul className="mx-auto max-w-[1200px] px-4 py-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} onClick={() => setOpen(false)} className="flex min-h-12 items-center text-base text-fg">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
