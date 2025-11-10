import { motion } from 'framer-motion'
import { FiTrendingUp } from 'react-icons/fi'
import { activities } from '../data'

const Activities = () => {
  return (
    <section id="activities" className="min-h-screen px-6 py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Extra-Curricular Activities</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Beyond academics and professional work</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 3,
                y: -5,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800 group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-12 h-12 bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0"
                >
                  <FiTrendingUp size={24} />
                </motion.div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{activity.title}</h3>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                      {activity.period}
                    </span>
                  </div>
                  <p className="text-light-accent dark:text-dark-accent font-medium text-sm mb-3">
                    {activity.organization}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-emerald-600/5 dark:from-dark-accent/5 dark:to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Activities
