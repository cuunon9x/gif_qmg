import { useState, useEffect, useRef } from 'react'

/**
 * useInView – re-triggers animation every time element scrolls in/out of view.
 * Lesson from truonglai: do NOT call observer.disconnect() so it re-triggers.
 */
export default function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
