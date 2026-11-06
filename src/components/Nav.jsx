import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { profile } from '../content'

const links = [
  ['About', '#about'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/70 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" aria-label={`${profile.name}, back to top`} className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-surface font-heading text-sm font-bold text-primary">
          {profile.short}
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="rounded-full px-4 py-3 text-sm text-muted transition-colors duration-150 hover:text-fg">
              {label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="icon-link md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-hairline bg-bg/95 md:hidden">
          <ul className="wrap py-2">
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
