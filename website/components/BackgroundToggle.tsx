'use client'

import { useState, useEffect } from 'react'

interface BackgroundToggleProps {
  onBackgroundChange: (enabled: boolean) => void
  onThemeChange: (theme: 'dark' | 'light') => void
}

export default function BackgroundToggle({ onBackgroundChange, onThemeChange }: BackgroundToggleProps) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const savedBackground = localStorage.getItem('backgroundEnabled')
    
    if (savedTheme) {
      setTheme(savedTheme)
      onThemeChange(savedTheme)
    }
    
    if (savedBackground !== null) {
      const enabled = savedBackground === 'true'
      setBackgroundEnabled(enabled)
      onBackgroundChange(enabled)
    }
  }, [onBackgroundChange, onThemeChange])

  const toggleBackground = () => {
    const newValue = !backgroundEnabled
    setBackgroundEnabled(newValue)
    localStorage.setItem('backgroundEnabled', String(newValue))
    onBackgroundChange(newValue)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    onThemeChange(newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-charcoal/80 backdrop-blur-md border border-electric/50 rounded-full flex items-center justify-center text-electric hover:bg-charcoal transition-all duration-120 ease-[cubic-bezier(.2,.9,.2,1)] active:scale-95"
        aria-label="Toggle settings"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold">{isOpen ? '×' : '≡'}</span>
      </button>
      
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-charcoal/95 backdrop-blur-md border border-electric/50 rounded-lg p-4 space-y-3 min-w-[180px] shadow-xl">
          <button
            onClick={toggleBackground}
            className="w-full text-left px-3 py-2 text-sm text-offwhite hover:bg-electric/10 rounded transition-all duration-120 ease-[cubic-bezier(.2,.9,.2,1)] active:scale-95"
            aria-pressed={backgroundEnabled}
          >
            Background: {backgroundEnabled ? 'On' : 'Off'}
          </button>
          <button
            onClick={toggleTheme}
            className="w-full text-left px-3 py-2 text-sm text-offwhite hover:bg-electric/10 rounded transition-all duration-120 ease-[cubic-bezier(.2,.9,.2,1)] active:scale-95"
            aria-pressed={theme === 'light'}
          >
            Theme: {theme === 'dark' ? 'Dark' : 'Light'}
          </button>
        </div>
      )}
    </div>
  )
}

