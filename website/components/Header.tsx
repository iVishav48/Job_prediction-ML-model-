'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

// SVG Icon Components
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const PredictIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const ContactIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Motion values for pill animation
  const pillX = useMotionValue(0)
  const pillWidth = useMotionValue(0)
  const pillScale = useMotionValue(1)
  const pillOpacity = useMotionValue(0)
  
  // Spring animations
  const springConfig = { damping: 30, stiffness: 400 }
  const animatedX = useSpring(pillX, springConfig)
  const animatedWidth = useSpring(pillWidth, springConfig)
  const animatedScale = useSpring(pillScale, springConfig)
  const animatedOpacity = useSpring(pillOpacity, springConfig)

  const navItems = [
    { href: '/', label: 'Home', icon: <HomeIcon /> },
    { href: '/model', label: 'Predict', icon: <PredictIcon /> },
    { href: '/contact', label: 'Contact', icon: <ContactIcon /> },
  ]

  // Get active index based on current pathname
  const getActiveIndex = () => {
    const index = navItems.findIndex(item => item.href === pathname)
    return index >= 0 ? index : 0
  }
  
  const activeIndex = getActiveIndex()
  
  // Update pill position when active index or hovered index changes
  useEffect(() => {
    if (navRef.current) {
      const navItems = navRef.current.querySelectorAll('[data-nav-item]')
      const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex
      const targetItem = navItems[targetIndex] as HTMLElement
      
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect()
        const containerRect = navRef.current.getBoundingClientRect()
        
        pillX.set(rect.left - containerRect.left)
        pillWidth.set(rect.width)
        pillScale.set(hoveredIndex !== null ? 1.05 : 1)
        pillOpacity.set(hoveredIndex !== null ? 1 : 0)
      }
    }
  }, [activeIndex, hoveredIndex, pillX, pillWidth, pillScale, pillOpacity])

  return (
    <header className="sticky top-0 z-50 pt-6">
      <nav className="container mx-auto px-8">
        <div className="bg-charcoal/95 backdrop-blur-md border border-electric/40 rounded-2xl shadow-2xl shadow-electric/10 hover:shadow-electric/20 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl md:text-3xl font-bold gradient-text">JobPredictor</span>
          </Link>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex relative" ref={navRef}>
            {/* Pill Background */}
            <motion.div
              className="absolute top-0 h-full bg-electric/20 rounded-lg border border-electric/40 backdrop-blur-sm"
              style={{
                x: animatedX,
                width: animatedWidth,
                scale: animatedScale,
                opacity: animatedOpacity,
              }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            />
            
            {/* Nav Items */}
            <div className="flex items-center space-x-8 relative z-10">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  data-nav-item
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 font-medium transition-all duration-120 ease-snap active:scale-95 group ${
                      index === activeIndex 
                        ? 'text-electric' 
                        : 'text-steel hover:text-electric'
                    }`}
                  >
                    <motion.span
                      className="transition-transform duration-300 group-hover:rotate-12"
                      whileHover={{ scale: 1.2 }}
                    >
                      {item.icon}
                    </motion.span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-electric focus:outline-none px-3 py-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
          </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
            className="md:hidden px-6 pb-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-steel font-medium">Theme</span>
              <ThemeToggle />
            </div>
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 text-steel hover:text-electric transition-all duration-120 ease-snap font-medium active:scale-95 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.span
                    className="transition-transform duration-300 group-hover:rotate-12"
                    whileHover={{ scale: 1.2 }}
                  >
                    {item.icon}
                  </motion.span>
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
        </div>
        </div>
      </nav>
    </header>
  )
}

