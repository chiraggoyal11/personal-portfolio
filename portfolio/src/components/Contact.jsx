import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiTwitter, FiMapPin, FiPhone, FiCheck } from 'react-icons/fi'
import { personal } from '../data'

const Contact = () => {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const contactLinks = [
    { icon: FiMail, label: 'Email', value: personal.email, href: `mailto:${personal.email}`, isEmail: true },
    { icon: FiLinkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: personal.linkedin },
    { icon: FiGithub, label: 'GitHub', value: 'View GitHub Profile', href: personal.github },
    { icon: FiTwitter, label: 'Twitter', value: 'Follow on Twitter', href: personal.twitter },
    { icon: FiMapPin, label: 'Location', value: personal.location, href: null },
    { icon: FiPhone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}`, isPhone: true },
  ]

  const handleEmailClick = (e) => {
    e.preventDefault()
    window.location.href = `mailto:${personal.email}`
  }

  const handlePhoneClick = (e) => {
    e.preventDefault()
    window.location.href = `tel:${personal.phone}`
  }

  return (
    <section id="contact" className="min-h-screen px-6 py-20 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Let's connect and build something amazing together</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactLinks.map((link, index) => {
            const Icon = link.icon
            const CardContent = (
              <>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-light-accent to-emerald-600 dark:from-dark-accent dark:to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{link.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium">{link.value}</p>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-emerald-600/10 dark:from-dark-accent/10 dark:to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-out pointer-events-none rounded-2xl"
                />
              </>
            )

            return link.href ? (
              <motion.a
                key={index}
                href={link.href}
                onClick={link.isEmail ? handleEmailClick : link.isPhone ? handlePhoneClick : undefined}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ 
                  scale: 1.08,
                  rotateY: 3,
                  y: -5,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800 group relative cursor-pointer block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {CardContent}
              </motion.a>
            ) : (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg transition-all duration-400 ease-out border border-gray-200 dark:border-gray-800 group relative"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {CardContent}
              </motion.div>
            )
          })}
        </div>

        {/* Social Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">Share this portfolio</p>
          <div className="flex justify-center gap-4">
            {[
              { icon: FiTwitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=Check out this amazing portfolio!` },
              { icon: FiLinkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}` },
            ].map((social, index) => {
              const SocialIcon = social.icon
              return (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.95 }}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition-all duration-400 ease-out no-print shadow-lg hover:shadow-2xl"
                >
                  <SocialIcon size={20} />
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          <p>© {new Date().getFullYear()} {personal.name}. Built with React & Tailwind CSS.</p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
