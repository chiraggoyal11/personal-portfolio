import { motion } from 'framer-motion'
import { skills } from '../data'

const Skills = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  return (
    <section id="skills" className="min-h-screen px-6 py-20 relative overflow-hidden">
      {/* Animated Particle Background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: i % 2 === 0 
                ? 'rgba(16, 185, 129, 0.3)' 
                : 'rgba(168, 85, 247, 0.3)',
              boxShadow: i % 2 === 0
                ? '0 0 20px rgba(16, 185, 129, 0.5)'
                : '0 0 20px rgba(168, 85, 247, 0.5)',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Technologies and tools I work with</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              }}
              className="relative group"
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-light-accent via-emerald-500 to-light-accent dark:from-dark-accent dark:via-purple-500 dark:to-dark-accent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-gradient-xy"></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-light-accent/50 to-emerald-600/50 dark:from-dark-accent/50 dark:to-purple-600/50 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 group-hover:border-transparent transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gradient">{category}</h3>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex flex-wrap gap-3"
                >
                  {skillList.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      variants={item}
                      whileHover={{ 
                        scale: 1.1,
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-light-accent/10 to-emerald-600/10 dark:from-dark-accent/10 dark:to-purple-600/10 rounded-full text-sm font-medium border border-light-accent/20 dark:border-dark-accent/20 hover:border-light-accent dark:hover:border-dark-accent hover:shadow-lg transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
