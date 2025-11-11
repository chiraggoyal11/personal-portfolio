import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
import ScrollProgress from './components/ScrollProgress'
import { initGA, logPageView } from './analytics'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Google Analytics when app loads
    initGA()
    // Log initial page view
    logPageView()
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loading onLoadingComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="custom-scrollbar relative">
          {/* Global Floating Particles Background - Reduced for performance */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 8 + 2 + 'px',
                  height: Math.random() * 8 + 2 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  background: i % 2 === 0 
                    ? 'rgba(16, 185, 129, 0.25)' 
                    : 'rgba(168, 85, 247, 0.25)',
                  boxShadow: i % 2 === 0
                    ? '0 0 20px rgba(16, 185, 129, 0.4)'
                    : '0 0 20px rgba(168, 85, 247, 0.4)',
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 30 - 15, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <AnimatedBackground />
          <ScrollProgress />
          <Header />
          <main className="relative z-10">
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
