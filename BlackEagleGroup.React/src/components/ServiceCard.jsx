import { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utils'

/**
 * ServiceCard Component
 * Displays a service with image, title, and description
 * Includes mouse-following parallax effect on hover
 * Enhanced with category color accents and featured variant support
 */
const ServiceCard = ({ 
  image, 
  title, 
  description, 
  className,
  category,
  featured = false,
  categoryColor
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const imageRef = useRef(null)
  const prefersReducedMotion = useRef(false)

  // Check for reduced motion preference
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const handleMouseMove = (e) => {
    if (prefersReducedMotion.current || !imageRef.current) return
    
    const rect = imageRef.current.getBoundingClientRect()
    // Calculate position from center (-1 to 1)
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePosition({ x, y })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  // Calculate transform based on mouse position (subtle movement: max 10px)
  const parallaxStyle = {
    backgroundImage: `url(${image})`,
    transform: isHovered 
      ? `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) scale(1.08)`
      : 'translate(0, 0) scale(1)',
    transition: isHovered 
      ? 'transform 0.1s ease-out' 
      : 'transform 0.4s ease-out'
  }

  // Determine accent color (use categoryColor prop if provided, otherwise default)
  const accentColor = categoryColor || '#59B200'
  
  // Image height - featured cards have taller images
  const imageHeight = featured ? 'h-[400px] md:h-[450px]' : 'h-[270px]'

  return (
    <div className={cn('flex h-full', className)}>
      <Card 
        className={cn(
          "w-full overflow-hidden border-0 shadow-sm flex flex-col",
          "transition-all duration-300 hover:shadow-lg",
          "group relative"
        )}
        style={{
          borderTop: `3px solid ${accentColor}`,
        }}
      >
        {/* Category color accent bar on hover */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
          style={{
            backgroundColor: accentColor,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left'
          }}
        />
        
        <div 
          ref={imageRef}
          className={cn(
            "block-20 w-full overflow-hidden flex-shrink-0 relative",
            imageHeight
          )}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={parallaxStyle}
            role="img"
            aria-label={title}
          />
          {/* Subtle overlay on hover with category color */}
          <div 
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              backgroundColor: accentColor,
              opacity: isHovered ? 0.1 : 0
            }}
          />
        </div>
        <CardContent className={cn(
          "pt-4 flex-grow",
          featured && "pt-6"
        )}>
          <h3 className={cn(
            "mb-4 font-medium",
            featured ? "text-xl md:text-2xl" : "text-lg"
          )}>
            <a 
              href="#" 
              className={cn(
                "text-black transition-colors no-underline",
                "hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-sm",
                "focus:ring-[#59B200]"
              )}
              style={{
                color: isHovered ? accentColor : 'inherit'
              }}
              onFocus={handleMouseEnter}
              onBlur={handleMouseLeave}
            >
              {title}
            </a>
          </h3>
          <p className={cn(
            "leading-6 text-gray-700",
            featured ? "text-base" : "text-sm"
          )}>
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default ServiceCard
