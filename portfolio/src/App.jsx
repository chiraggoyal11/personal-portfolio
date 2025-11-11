import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Activities from './components/Activities'
import Contact from './components/Contact'
import BackToTop from './components/BackToTop'
import ProgressIndicator from './components/ProgressIndicator'
import Loading from './components/Loading'
import AnimatedBackground from './components/AnimatedBackground'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <AnimatePresence>
        {loading && <Loading onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="custom-scrollbar">
          <AnimatedBackground />
          <CustomCursor />
          <ScrollProgress />
          <Header />
          <main>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Activities />
            <Contact />
          </main>
          <BackToTop />
          <ProgressIndicator />
        </div>
      )}
    </>
  )
}

export default App
