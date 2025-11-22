'use client'

import { useState, useEffect } from 'react'
import AnimatedBackground from './AnimatedBackground'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [backgroundEnabled, setBackgroundEnabled] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    if (savedTheme) {
      document.documentElement.classList.toggle('light', savedTheme === 'light')
    }
  }, [])

  return (
    <>
      <AnimatedBackground enabled={backgroundEnabled} type="particles" opacity={0.25} />
      {children}
    </>
  )
}

