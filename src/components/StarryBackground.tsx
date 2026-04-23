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
        left: ${Math.random() * 60}%;
        top: ${Math.random() * 40}%;
        width: ${Math.random() * 80 + 40}px;
        height: 1px;
        background: linear-gradient(90deg, white, transparent);
        border-radius: 0;
        animation-duration: ${Math.random() * 2 + 2}s;
        animation-delay: ${Math.random() * 6 + i * 3}s;
        animation-iteration-count: infinite;
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
