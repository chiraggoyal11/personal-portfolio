import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sections = ['hero', 'skills', 'projects', 'education', 'activities', 'contact']

const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4 no-print">
      {sections.map((section) => (
        <motion.button
          key={section}
          whileHover={{ scale: 1.5 }}
          onClick={() => scrollToSection(section)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            activeSection === section
              ? 'bg-light-accent dark:bg-dark-accent scale-125'
              : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
          }`}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        />
      ))}
    </div>
  )
}

export default ProgressIndicator
