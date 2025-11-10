import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiEye } from 'react-icons/fi'
import { personal, summary } from '../data'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const fullText = personal.title

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [fullText])

  const handleViewResume = () => {
    window.open('/resume.pdf', '_blank')
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = `${personal.name}_Resume.pdf`
    link.click()
    
    // Trigger confetti animation
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
              }}
              animate={{
                y: [0, window.innerHeight + 100],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Glowing Particles Around Profile */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-light-accent dark:bg-dark-accent rounded-full"
            style={{
              left: '50%',
              top: '30%',
            }}
            animate={{
              x: [0, Math.cos(i * 45 * Math.PI / 180) * 150],
              y: [0, Math.sin(i * 45 * Math.PI / 180) * 150],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8 inline-block"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800">
              <img 
                src="/profile.jpg" 
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-white text-4xl md:text-5xl font-bold">
                {personal.initials}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
        >
          {personal.name}
        </motion.h1>

        {/* Title with Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 text-gradient min-h-[2.5rem]"
        >
          {typedText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="ml-1"
          >
            |
          </motion.span>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed text-justify"
        >
          {summary}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(16, 185, 129, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewResume}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            <FiEye size={20} />
            View Resume
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-8 py-3 border-2 border-light-accent dark:border-dark-accent text-light-accent dark:text-dark-accent rounded-full font-semibold hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent dark:hover:text-white transition-all duration-300"
          >
            <FiDownload size={20} />
            Download Resume
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-6 h-10 border-2 border-light-accent dark:border-dark-accent rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-light-accent dark:bg-dark-accent rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
