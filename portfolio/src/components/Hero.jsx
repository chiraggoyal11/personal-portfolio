import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDownload, FiEye } from 'react-icons/fi'
import { personal, summary } from '../data'

const Hero = () => {
  const [typedText, setTypedText] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
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
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Trigger confetti animation
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Image Modal */}
      {showImageModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl ring-8 ring-white dark:ring-gray-800">
              <img 
                src="/profile.jpg" 
                alt={personal.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="hidden w-full h-full items-center justify-center text-white text-9xl font-bold">
                {personal.initials}
              </div>
            </div>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg text-xl font-bold"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}

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

      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Profile Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex justify-center md:justify-start"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative cursor-pointer w-full max-w-[18rem] md:max-w-[24rem] lg:max-w-[28rem] xl:max-w-[31rem] group"
              onClick={() => setShowImageModal(true)}
              whileHover={{ scale: 1.05 }}
            >
              {/* Glowing Particles Orbiting Around Profile Image */}
              <div className="absolute inset-0 -z-10 overflow-visible pointer-events-none">
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 360) / 12;
                  const radius = 52; // percentage from center
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full shadow-lg"
                      style={{
                        left: '50%',
                        top: '50%',
                        background: i % 2 === 0 
                          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.9))' 
                          : 'linear-gradient(135deg, rgba(168, 85, 247, 0.8), rgba(147, 51, 234, 0.9))',
                        boxShadow: i % 2 === 0
                          ? '0 0 20px rgba(16, 185, 129, 0.6), 0 0 40px rgba(16, 185, 129, 0.3)'
                          : '0 0 20px rgba(168, 85, 247, 0.6), 0 0 40px rgba(168, 85, 247, 0.3)',
                      }}
                      animate={{
                        x: [
                          Math.cos((angle) * Math.PI / 180) * radius + '%',
                          Math.cos((angle + 360) * Math.PI / 180) * radius + '%',
                        ],
                        y: [
                          Math.sin((angle) * Math.PI / 180) * radius + '%',
                          Math.sin((angle + 360) * Math.PI / 180) * radius + '%',
                        ],
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: (i * 8) / 12,
                      }}
                    />
                  );
                })}
              </div>

              {/* Animated Gradient Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-light-accent via-emerald-500 to-light-accent dark:from-dark-accent dark:via-purple-500 dark:to-dark-accent rounded-full opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-gradient-xy"></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-light-accent/50 to-emerald-600/50 dark:from-dark-accent/50 dark:to-purple-600/50 rounded-full opacity-0 group-hover:opacity-75 blur-2xl transition-all duration-500"></div>

              <div className="relative aspect-square w-full rounded-full bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl ring-8 ring-white dark:ring-gray-800 group-hover:ring-transparent transition-all duration-500">
                <img 
                  src="/profile.jpg" 
                  alt={personal.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full items-center justify-center text-white text-7xl md:text-8xl lg:text-9xl font-bold">
                  {personal.initials}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content - Right Side */}
          <div className="text-center md:text-left space-y-4 md:space-y-6 lg:space-y-8">
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none"
            >
              {personal.name}
            </motion.h1>

            {/* Title with Typing Animation */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gradient min-h-[2rem] md:min-h-[3rem]"
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-justify max-w-3xl mx-auto md:mx-0"
            >
              {summary}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 lg:gap-6 justify-center md:justify-start pt-2 md:pt-4"
            >
              <motion.button
                onClick={handleViewResume}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-400 ease-out flex items-center justify-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl"
              >
                <FiEye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                <span className="whitespace-nowrap">View Resume</span>
              </motion.button>
              
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all duration-400 ease-out flex items-center justify-center gap-2 md:gap-3 text-base sm:text-lg md:text-xl"
              >
                <FiDownload className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                <span className="whitespace-nowrap">Download Resume</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
