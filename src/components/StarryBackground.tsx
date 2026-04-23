'use client'

import { useEffect, useRef } from 'react'

export default function StarryBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 星を生成
    const stars: HTMLDivElement[] = []
    for (let i = 0; i < 80; i++) {
      const star = document.createElement('div')
      star.className = 'star'
      const size = Math.random() * 2.5 + 0.5
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${Math.random() * 3 + 2}s;
        animation-delay: ${Math.random() * 4}s;
        opacity: ${Math.random() * 0.7 + 0.3};
      `
      container.appendChild(star)
      stars.push(star)
    }

    // 流れ星を生成
    const shootingStars: HTMLDivElement[] = []
    for (let i = 0; i < 3; i++) {
      const s = document.createElement('div')
      s.className = 'shooting-star'
      s.style.cssText = `
        left: ${Math.random() * 90}%;
        top: ${Math.random() * 30}%;
        height: ${Math.random() * 60 + 50}px;
        animation-duration: ${Math.random() * 1.5 + 1.5}s;
        animation-delay: ${Math.random() * 10 + i * 5}s;
      `
      container.appendChild(s)
      shootingStars.push(s)
    }

    return () => {
      stars.forEach(s => s.remove())
      shootingStars.forEach(s => s.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="stars-bg"
      aria-hidden="true"
    />
  )
}
