import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * Supports staggered animation delays and respects prefers-reduced-motion
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Intersection threshold (0-1), default 0.1
 * @param {string} options.rootMargin - Root margin for intersection, default '0px 0px -100px 0px'
 * @param {boolean} options.triggerOnce - Whether to trigger animation only once, default true
 * @returns {[React.RefObject, boolean]} - [ref, isVisible]
 */
export const useScrollAnimation = ({
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true,
} = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // If reduced motion is preferred, show immediately without animation
      setIsVisible(true)
      return
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (triggerOnce) {
              observer.unobserve(entry.target)
            }
          } else if (!triggerOnce) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce])

  return [elementRef, isVisible]
}

/**
 * Utility function to apply staggered animation delays to multiple elements
 * 
 * @param {Array} elements - Array of element refs or DOM elements
 * @param {number} baseDelay - Base delay in milliseconds, default 0
 * @param {number} staggerDelay - Delay increment between elements in milliseconds, default 50
 */
export const applyStaggeredAnimations = (elements, baseDelay = 0, staggerDelay = 50) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    // If reduced motion, apply all animations immediately
    elements.forEach((el) => {
      if (el && el.current) {
        el.current.style.animationDelay = '0ms'
      } else if (el) {
        el.style.animationDelay = '0ms'
      }
    })
    return
  }

  elements.forEach((el, index) => {
    const delay = baseDelay + index * staggerDelay
    if (el && el.current) {
      el.current.style.animationDelay = `${delay}ms`
    } else if (el) {
      el.style.animationDelay = `${delay}ms`
    }
  })
}

/**
 * Initialize scroll animations for elements with .ftco-animate class
 * This function can be called to set up animations for elements that are added dynamically
 */
export const initScrollAnimations = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    // Show all elements immediately if reduced motion is preferred
    document.querySelectorAll('.ftco-animate').forEach((el) => {
      el.classList.add('ftco-animated')
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ftco-animated')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }
  )

  document.querySelectorAll('.ftco-animate').forEach((el) => {
    observer.observe(el)
  })
}

