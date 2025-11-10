import { motion } from 'framer-motion'
import { FiAward, FiExternalLink } from 'react-icons/fi'
import { education, certificates } from '../data'

const Education = () => {
  return (
    <section id="education" className="min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Academic background and professional credentials</p>
        </motion.div>

        {/* Education Timeline */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold mb-8 text-gradient">Education</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-8 border-l-4 border-light-accent dark:border-dark-accent"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="absolute -left-3 top-0 w-6 h-6 bg-light-accent dark:bg-dark-accent rounded-full border-4 border-white dark:border-dark-bg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-full h-full bg-light-accent dark:bg-dark-accent rounded-full"
                  />
                </motion.div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800 group relative"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-emerald-600/5 dark:from-dark-accent/5 dark:to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none rounded-xl"
                  />
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-xl font-bold">{edu.degree}</h4>
                      <p className="text-light-accent dark:text-dark-accent font-medium">{edu.institution}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 font-medium">{edu.grade}</p>
                  {edu.achievements && (
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, aIndex) => (
                        <li key={aIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                          <FiAward className="text-light-accent dark:text-dark-accent mt-1 mr-2 flex-shrink-0" size={14} />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-gradient">Certifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <FiAward className="text-light-accent dark:text-dark-accent flex-shrink-0" size={28} />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {cert.date}
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2">{cert.name}</h4>
                <p className="text-light-accent dark:text-dark-accent font-medium text-sm mb-2">
                  {cert.issuer}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  ID: {cert.credentialId}
                </p>
                {cert.verifyUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-light-accent dark:text-dark-accent hover:underline"
                  >
                    <FiExternalLink size={14} />
                    Verify Certificate
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
