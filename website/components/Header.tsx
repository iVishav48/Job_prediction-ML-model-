'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

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

  const navItems = [
    { href: '/', label: 'Home', icon: <HomeIcon /> },
    { href: '/model', label: 'Predict', icon: <PredictIcon /> },
    { href: '/contact', label: 'Contact', icon: <ContactIcon /> },
  ]

  return (
    <header className="sticky top-0 z-50 pt-6">
      <nav className="container mx-auto px-8">
        <div className="bg-charcoal/95 backdrop-blur-md border border-electric/20 rounded-2xl shadow-2xl shadow-electric/10 hover:shadow-electric/20 transition-all duration-300">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl md:text-3xl font-bold gradient-text">JobPredictor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.12, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 text-steel hover:text-electric transition-all duration-120 ease-snap font-medium active:scale-95 group"
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
      </nav>
    </header>
  )
}

