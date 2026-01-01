import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/**
 * AnimatedElement - A flexible animated element component for scroll-linked animations
 * 
 * Wraps any element type (div, span, h2, p, etc.) with scroll-linked animations.
 * Supports staggered delays via the delay prop (scroll progress offset).
 * 
 * @param {Object} props
 * @param {string} props.as - HTML element type to render, default 'div'
 * @param {React.ReactNode} props.children - Child elements to render
 * @param {string} props.className - CSS class name(s) to apply
 * @param {number} props.delay - Delay offset in scroll progress (0-1), default 0
 * @param {string[]} props.offset - Scroll offset range, default ["start end", "center center"]
 * @param {number[]} props.opacityRange - Scroll progress range for opacity, default [0, 0.3]
 * @param {number[]} props.yRange - Y translation range [start, end], default [20, 0]
 * @param {Object} props...props - Additional props to pass to the motion element
 * @returns {JSX.Element} Motion element
 * 
 * @example
 * <AnimatedElement as="h2" className="mb-4" delay={0.1}>
 *   Heading Text
 * </AnimatedElement>
 * 
 * @example
 * <AnimatedElement as="p" delay={0.15}>
 *   Paragraph text
 * </AnimatedElement>
 */
const AnimatedElement = ({ 
  as = 'div', 
  children, 
  className, 
  delay = 0,
  offset = ["start end", "center center"],
  opacityRange = [0, 0.3],
  yRange = [20, 0],
  ...props 
}) => {
  const { ref, opacity, y } = useScrollAnimation({ 
    offset, 
    opacityRange,
    yRange,
    delay 
  })
  
  const MotionComponent = motion[as]
  
  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ opacity, y }}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimatedElement
