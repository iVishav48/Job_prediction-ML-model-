'use client'

import { useState, useEffect } from 'react'
import AnimatedBackground from './AnimatedBackground'
import BackgroundToggle from './BackgroundToggle'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    }
  }, [])

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    setTheme(newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <>
      <AnimatedBackground enabled={backgroundEnabled} type="particles" opacity={0.25} />
      {children}
      <BackgroundToggle 
        onBackgroundChange={setBackgroundEnabled}
        onThemeChange={handleThemeChange}
      />
    </>
  )
}

