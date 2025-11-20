'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/model', label: 'Predict' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-electric/20">
      <nav className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl md:text-3xl font-bold gradient-text">JobPredictor</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-steel hover:text-electric transition-colors duration-120 ease-snap font-medium active:scale-95"
              >
                {item.label}
              </Link>
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
            className="md:hidden mt-4 space-y-4 pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-steel hover:text-electric transition-colors duration-120 ease-snap font-medium active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </nav>
    </header>
  )
}

