import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/**
 * AnimatedSection - A reusable section wrapper component with scroll-linked animations
 * 
 * Wraps a section element and applies scroll-linked opacity and y-transform animations.
 * Animations are continuous and proportional to scroll position.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to render
 * @param {string} props.className - CSS class name(s) to apply
 * @param {string[]} props.offset - Scroll offset range, default ["start end", "end start"]
 * @param {number[]} props.opacityRange - Scroll progress range for opacity, default [0, 0.3]
 * @param {number[]} props.yRange - Y translation range [start, end], default [20, 0]
 * @returns {JSX.Element} Motion section element
 * 
 * @example
 * <AnimatedSection className="ftco-section about-split-section">
 *   <Container>
 *     <Row>...</Row>
 *   </Container>
 * </AnimatedSection>
 */
const AnimatedSection = ({ 
  children, 
  className,
  offset = ["start end", "end start"],
  opacityRange = [0, 0.3],
  yRange = [20, 0]
}) => {
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
  
  const opacity = useTransform(scrollYProgress, opacityRange, [0, 1])
  const y = useTransform(scrollYProgress, opacityRange, yRange)
  
  return (
    <motion.section
      ref={ref}
      className={className}
      style={prefersReducedMotion ? {} : { opacity, y }}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection
