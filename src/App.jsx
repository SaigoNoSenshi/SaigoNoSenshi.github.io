import { MotionConfig } from 'motion/react'
import { profile } from './content'
import About from './components/About'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Funnel from './components/Funnel'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Rail from './components/Rail'
import Skills from './components/Skills'
import Stats from './components/Stats'
import Work from './components/Work'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main" className="relative">
        <Rail />
        <Hero />
        <Stats />
        <Funnel />
        <About />
        <Work />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="relative border-t border-line py-8">
        <p className="wrap text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </footer>
    </MotionConfig>
  )
}
