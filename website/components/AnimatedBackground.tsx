'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedBackgroundProps {
  type?: 'particles' | 'gradient' | 'css'
  enabled?: boolean
  opacity?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export default function AnimatedBackground({ 
  type = 'particles', 
  enabled = true, 
  opacity = 0.3 
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (!enabled || reducedMotion || type !== 'particles') return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Set canvas size
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    resize()
    window.addEventListener('resize', resize)

    // Initialize particles
    const particleCount = Math.min(
      Math.floor((canvas.width / window.devicePixelRatio) * (canvas.height / window.devicePixelRatio) / 15000),
      80
    )

    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width / window.devicePixelRatio,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      })
    }
    particlesRef.current = particles

    let lastTime = performance.now()
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      
      if (deltaTime >= frameInterval) {
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
        
        // Update and draw particles
        ctx.globalAlpha = opacity
        ctx.strokeStyle = '#0ea5e9'
        ctx.fillStyle = '#0ea5e9'
        
        particles.forEach((particle, i) => {
          // Update position
          particle.x += particle.vx
          particle.y += particle.vy
          
          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width / window.devicePixelRatio
          if (particle.x > canvas.width / window.devicePixelRatio) particle.x = 0
          if (particle.y < 0) particle.y = canvas.height / window.devicePixelRatio
          if (particle.y > canvas.height / window.devicePixelRatio) particle.y = 0
          
          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
          ctx.fill()
          
          // Draw connections
          particles.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x
            const dy = particle.y - other.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 120) {
              ctx.globalAlpha = opacity * (1 - distance / 120)
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(other.x, other.y)
              ctx.stroke()
            }
          })
        })
        
        ctx.globalAlpha = 1
        lastTime = currentTime
      }
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [enabled, reducedMotion, type, opacity])

  if (reducedMotion || !enabled) {
    return (
      <div 
        className="fixed inset-0 -z-10 bg-gradient-to-br from-charcoal via-charcoal to-blue-950/30"
        style={{ pointerEvents: 'none' }}
      />
    )
  }

  if (type === 'css') {
    return (
      <div 
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal to-blue-950/30 animate-pulse-slow"
          style={{ opacity }}
        />
        <div 
          className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#0ea5e9_60deg,transparent_120deg)] animate-spin"
          style={{ 
            opacity: opacity * 0.3,
            animationDuration: '20s',
            mixBlendMode: 'overlay'
          }}
        />
      </div>
    )
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-10"
        style={{ pointerEvents: 'none' }}
      />
      <div 
        className="fixed inset-0 -z-10 bg-gradient-to-br from-charcoal via-charcoal to-blue-950/30"
        style={{ pointerEvents: 'none' }}
      />
    </>
  )
}

