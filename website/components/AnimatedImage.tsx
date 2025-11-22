'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

interface AnimatedImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  animationType?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight'
  delay?: number
  duration?: number
  whileHover?: boolean
  skeleton?: boolean
}

const animationVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 }
  },
  slideLeft: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 }
  },
  slideRight: {
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 }
  }
}

export default function AnimatedImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  animationType = 'fadeUp',
  delay = 0,
  duration = 0.6,
  whileHover = true,
  skeleton = true
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [imageLoaded, setImageLoaded] = useState(false)

  const variants = animationVariants[animationType]

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      initial={variants.initial}
      whileInView={variants.whileInView}
      viewport={{ once: true }}
      transition={{ 
        duration, 
        delay,
        ease: [0.2, 0.9, 0.2, 1]
      }}
      whileHover={whileHover ? { 
        scale: 1.05, 
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)' 
      } : undefined}
    >
      {/* Skeleton loader */}
      {skeleton && !imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-electric/20 to-charcoal animate-pulse" />
      )}
      
      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ${className} ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        initial={{ scale: 1 }}
        whileHover={whileHover ? { scale: 1.1 } : undefined}
        transition={{ duration: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
      />
      
      {/* Animated overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shimmer effect */}
      {isInView && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </motion.div>
  )
}
