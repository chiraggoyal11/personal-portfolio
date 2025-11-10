import { motion } from 'framer-motion'

const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated Gradient Mesh */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 dark:opacity-0"
      />
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 opacity-0 dark:opacity-100"
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -15, 0],
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Dark mode particles */}
      {particles.slice(0, 10).map((particle) => (
        <motion.div
          key={`dark-${particle.id}`}
          className="absolute rounded-full opacity-0 dark:opacity-20"
          style={{
            width: particle.size * 0.8,
            height: particle.size * 0.8,
            left: `${(particle.x + 50) % 100}%`,
            top: `${(particle.y + 30) % 100}%`,
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            y: [0, 30, 0],
            x: [0, -15, 15, 0],
            scale: [1, 0.9, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: particle.duration * 1.2,
            delay: particle.delay + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default AnimatedBackground
