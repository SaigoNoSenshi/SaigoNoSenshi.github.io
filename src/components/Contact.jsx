import { BadgeCheck, Briefcase, GitBranch, Mail } from 'lucide-react'
import { profile } from '../content'
import { Reveal, Section } from './ui'

const { links } = profile
const bare = (url) => url.replace(/^https?:\/\//, '')
const items = [
  { label: 'Email', href: `mailto:${links.email}`, text: links.email, Icon: Mail },
  { label: 'LinkedIn', href: links.linkedin, text: bare(links.linkedin), Icon: Briefcase },
  { label: 'GitHub', href: links.github, text: bare(links.github), Icon: GitBranch },
  { label: 'Credentials', href: links.credentials, text: bare(links.credentials), Icon: BadgeCheck },
]

export default function Contact() {
  return (
    <Section id="contact" title="Let's build something">
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ label, href, text, Icon }, i) => (
          <li key={label}>
            <Reveal delay={i * 0.05} className="h-full">
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="card flex h-full flex-col gap-4 p-6 transition-colors duration-150 hover:border-primary/50"
              >
                <Icon size={22} strokeWidth={1.75} className="text-primary" aria-hidden="true" />
                <span className="font-heading text-lg font-semibold">{label}</span>
                <span className="font-mono text-xs text-muted [overflow-wrap:anywhere]">{text}</span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
