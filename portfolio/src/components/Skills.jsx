import { motion } from 'framer-motion'
import { skills } from '../data'

const skillLevels = {
  "Programming Languages": 90,
  "Frameworks & Libraries": 88,
  "Databases & Tools": 85,
  "Soft Skills": 92,
}

const Skills = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="min-h-screen px-6 py-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, rotateY: 5, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gradient">{category}</h3>
                <div className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                  {skillLevels[category]}%
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skillLevels[category]}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600"
                />
              </div>
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
                    whileHover={{ scale: 1.15, rotate: 3, y: -5 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="px-4 py-2 bg-gradient-to-r from-light-accent/10 to-emerald-600/10 dark:from-dark-accent/10 dark:to-purple-600/10 rounded-full text-sm font-medium border border-light-accent/20 dark:border-dark-accent/20 hover:border-light-accent dark:hover:border-dark-accent hover:shadow-lg transition-all duration-400 ease-out cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
