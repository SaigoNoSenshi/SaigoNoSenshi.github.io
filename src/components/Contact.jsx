import { ArrowUpRight, BadgeCheck, Briefcase, GitBranch, Mail } from 'lucide-react'
import { profile } from '../content'
import { Reveal, Section } from './ui'

const { links } = profile
const bare = (url) => url.replace(/^https?:\/\//, '')
const items = [
  { label: 'LinkedIn', href: links.linkedin, text: bare(links.linkedin), Icon: Briefcase },
  { label: 'GitHub', href: links.github, text: bare(links.github), Icon: GitBranch },
  { label: 'Credentials', href: links.credentials, text: bare(links.credentials), Icon: BadgeCheck },
]

export default function Contact() {
  return (
    <Section id="contact" title="Let's build something">
      <Reveal>
        <a
          href={`mailto:${links.email}`}
          className="tick mt-10 flex min-h-11 flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-teal/40 bg-raised px-5 py-6 font-display text-xl font-bold [overflow-wrap:anywhere] transition-colors duration-150 hover:border-teal sm:text-3xl md:px-8 md:py-8 md:text-4xl"
        >
          <Mail size={28} strokeWidth={1.75} className="shrink-0 text-teal" aria-hidden="true" />
          <span className="min-w-0">{links.email}</span>
          <ArrowUpRight size={24} strokeWidth={1.75} className="ml-auto shrink-0 text-teal" aria-hidden="true" />
        </a>
      </Reveal>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map(({ label, href, text, Icon }, i) => (
          <li key={label}>
            <Reveal delay={i * 0.05} className="h-full">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="tick panel flex min-h-11 items-center gap-4 p-4 transition-colors duration-150 hover:border-teal/50 sm:before:hidden"
              >
                <Icon size={20} strokeWidth={1.75} className="shrink-0 text-teal" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold">{label}</span>
                  <span className="block font-mono text-xs text-muted [overflow-wrap:anywhere]">{text}</span>
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
