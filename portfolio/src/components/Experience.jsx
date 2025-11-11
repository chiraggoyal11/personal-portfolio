import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi'
import { experience } from '../data'

const Experience = () => {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              className="relative group"
            >
              {/* Animated Gradient Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-light-accent via-emerald-500 to-light-accent dark:from-dark-accent dark:via-purple-500 dark:to-dark-accent rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 animate-gradient-xy"></div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-light-accent/50 to-emerald-600/50 dark:from-dark-accent/50 dark:to-purple-600/50 rounded-2xl opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-400 border border-gray-200 dark:border-gray-700 group-hover:border-transparent">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
                      <img 
                        src="/zeta.jpeg" 
                        alt={exp.company}
                        className="w-14 h-14 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="hidden w-14 h-14 items-center justify-center bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 rounded-lg text-white">
                        <FiBriefcase size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-xl font-semibold text-gradient">
                        {exp.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiCalendar size={18} />
                    <span className="font-medium">{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <FiMapPin size={18} />
                    <span className="font-medium">{exp.location}</span>
                  </div>
                  <span className="px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full text-sm font-semibold w-fit">
                    {exp.type}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                {exp.description}
              </p>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Key Responsibilities:
                </h4>
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 * idx }}
                      className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                    >
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 flex-shrink-0"></span>
                      <span className="leading-relaxed">{resp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
