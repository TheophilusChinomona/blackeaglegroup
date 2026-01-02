import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/utils'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { CardSpotlight } from '@/components/ui/card-spotlight'

/**
 * ServiceCard Component
 * Displays a service with image, title, and description
 * Matches the ClientCard (Key Partnerships) visual language
 * Includes 3D effects for featured services and Spotlight for regular ones
 */
const ServiceCard = ({ 
  image, 
  title, 
  description, 
  className,
  category,
  featured = false,
  categoryColor,
  categoryLabel
}) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Intersection Observer for visibility
  useEffect(() => {
    if (prefersReducedMotion) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const accentColor = categoryColor || '#4B9400'
  const shouldAnimate = isVisible && !prefersReducedMotion

  const cardContent = (
    <article 
      className={cn(
        "service-card bg-white rounded-xl overflow-hidden h-full flex flex-col",
        "shadow-card hover:shadow-card-hover",
        "border-t-4",
        "transition-all duration-300 ease-out",
        !featured && "hover:-translate-y-1",
        featured && "border-t-[5px]"
      )}
      style={{ borderTopColor: accentColor }}
    >
      {/* Image Area */}
      <div 
        className={cn(
          "w-full overflow-hidden relative shrink-0",
          featured ? "h-[200px] md:h-[240px]" : "h-[180px]"
        )}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Subtle overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        {(categoryLabel || category) && (
          <p 
            className="text-xs uppercase tracking-wider font-semibold mb-2" 
            style={{ color: accentColor }}
          >
            {categoryLabel || category}
          </p>
        )}
        
        <h3 
          className={cn(
            "font-serif font-medium text-brand-dark mb-3 leading-tight line-clamp-2 min-h-[2.5rem]",
            featured ? "text-2xl" : "text-xl md:text-2xl"
          )}
        >
          {title}
        </h3>
        
        <p className="text-sm text-gray-700 leading-6 mb-6 line-clamp-3 min-h-[4.5rem]">
          {description}
        </p>

        {/* Action Button */}
        <div className="mt-auto">
          <Link 
            to="/contact" 
            className="btn-reference w-full"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </article>
  )

  if (featured && shouldAnimate) {
    return (
      <div ref={cardRef} className={cn('h-full mb-4 group', className)}>
        <CardContainer containerClassName="p-0 h-full">
          <CardBody className="w-full h-full">
            <CardItem translateZ={50} className="w-full h-full">
              {cardContent}
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    )
  }

  if (!featured && shouldAnimate) {
    return (
      <div ref={cardRef} className={cn('h-full mb-4 group', className)}>
        <CardSpotlight className="rounded-xl h-full">
          {cardContent}
        </CardSpotlight>
      </div>
    )
  }

  return (
    <div ref={cardRef} className={cn('h-full mb-4 group', className)}>
      {cardContent}
    </div>
  )
}

export default ServiceCard

