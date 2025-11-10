import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaDatabase, FaMobile } from 'react-icons/fa'
import { FiCalendar, FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '../data'

const getTechIcon = (tech) => {
  const techLower = tech.toLowerCase()
  if (techLower.includes('react') || techLower.includes('vue') || techLower.includes('angular')) return <FaCode />
  if (techLower.includes('node') || techLower.includes('express') || techLower.includes('django')) return <FaServer />
  if (techLower.includes('mongo') || techLower.includes('sql') || techLower.includes('firebase')) return <FaDatabase />
  if (techLower.includes('mobile') || techLower.includes('android') || techLower.includes('ios')) return <FaMobile />
  return <FaCode />
}

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen px-6 py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Building solutions that make a difference</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                rotateY: 3,
                rotateX: 3,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800 group relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-light-accent/20 to-emerald-600/20 dark:from-dark-accent/20 dark:to-purple-600/20 flex items-center justify-center relative overflow-hidden">
                <motion.div 
                  className="text-6xl font-bold text-light-accent dark:text-dark-accent opacity-20"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.title.charAt(0)}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-gray-900/50 to-transparent" />
              </div>

              <div className="p-6">
                {/* Title and Duration */}
                <div className="mb-3">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FiCalendar size={14} />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="px-3 py-1 text-xs font-medium bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent rounded-full flex items-center gap-1 border border-light-accent/20 dark:border-dark-accent/20 hover:border-light-accent dark:hover:border-dark-accent transition-all duration-400 ease-out"
                    >
                      {getTechIcon(tech)}
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Key Features:</p>
                  <ul className="space-y-1">
                    {project.highlights.slice(0, 3).map((highlight, hIndex) => (
                      <li key={hIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                        <span className="text-light-accent dark:text-dark-accent mr-2">•</span>
                        <span className="line-clamp-1">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <motion.a
                    whileHover={{ scale: 1.08, x: 5 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-400 ease-out text-sm font-medium shadow-md hover:shadow-xl"
                  >
                    <FiGithub size={16} />
                    View on GitHub
                  </motion.a>
                </div>
              </div>
              
              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-light-accent/10 via-transparent to-emerald-600/10 dark:from-dark-accent/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none rounded-2xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
