import { useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/**
 * Custom hook for scroll-linked animations
 * 
 * Tracks scroll progress for an element and returns motion values for opacity and y transform.
 * Animations are continuous and proportional to scroll position (not binary on/off).
 * 
 * @param {Object} options - Configuration options
 * @param {string[]} options.offset - Scroll offset range, default ["start end", "center center"]
 * @param {number[]} options.opacityRange - Scroll progress range for opacity animation, default [0, 0.3]
 * @param {number[]} options.yRange - Y translation range [start, end], default [20, 0]
 * @param {number} options.delay - Delay offset in scroll progress (0-1), default 0
 * @returns {Object} - { ref, opacity, y } motion values
 * 
 * @example
 * const { ref, opacity, y } = useScrollAnimation({
 *   offset: ["start end", "center center"],
 *   opacityRange: [0, 0.3],
 *   yRange: [20, 0],
 *   delay: 0.1
 * })
 */
export const useScrollAnimation = ({
  offset = ["start end", "center center"],
  opacityRange = [0, 0.3],
  yRange = [20, 0],
  delay = 0
} = {}) => {
  const ref = useRef(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  // Check for prefers-reduced-motion on mount and when it changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  })
  
  // Apply delay by adjusting the scroll progress range
  // Delay is a value from 0-1 representing scroll progress offset
  const adjustedOpacityRange = [
    opacityRange[0] + delay,
    opacityRange[1] + delay
  ]
  
  const opacity = useTransform(
    scrollYProgress,
    adjustedOpacityRange,
    [0, 1]
  )
  
  const y = useTransform(
    scrollYProgress,
    adjustedOpacityRange,
    yRange
  )
  
  return {
    ref,
    opacity: prefersReducedMotion ? 1 : opacity,
    y: prefersReducedMotion ? 0 : y
  }
}
