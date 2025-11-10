import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { personal } from '../data'

const Loading = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onLoadingComplete(), 500)
          return 100
        }
        return prev + 10
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-light-bg dark:bg-dark-bg flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 flex items-center justify-center overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800"
        >
          <img 
            src="/profile.jpg" 
            alt={personal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full items-center justify-center text-white text-3xl font-bold">
            {personal.initials}
          </div>
        </motion.div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Loading Portfolio...</h2>
        <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600"
          />
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">{progress}%</p>
      </div>
    </motion.div>
  )
}

export default Loading
