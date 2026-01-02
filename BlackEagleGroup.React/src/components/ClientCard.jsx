import { useRef, useEffect, useState } from 'react'
import { cn } from '@/utils'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { CardSpotlight } from '@/components/ui/card-spotlight'

/**
 * ClientCard Component
 * Displays a client with logo, name, location/industry, and action buttons
 * Brand guide styling: 4px green top border, serif typography, 2-column button grid
 * Maintains backward compatibility with existing props
 * 
 * @param {Object} props
 * @param {string} props.name - Company name (required)
 * @param {string} props.logo - Logo image URL
 * @param {string} props.image - Fallback image URL (for backward compatibility)
 * @param {string} props.location - Company location
 * @param {string} props.industry - Industry/category
 * @param {string} props.description - Company description (optional)
 * @param {string} props.referenceLink - Reference/email link
 * @param {string} props.phoneNumber - Phone number for call button
 * @param {boolean} props.featured - Featured variant with larger styling
 * @param {string} props.industryColor - Custom accent color (optional)
 * @param {string} props.className - Additional CSS classes
 */
const ClientCard = ({ 
  image, 
  name, 
  location, 
  referenceLink, 
  phoneNumber,
  className,
  industry,
  featured = false,
  logo
}) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  )

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    
    // Listen for changes
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Intersection Observer for visibility-based effect activation
  useEffect(() => {
    if (prefersReducedMotion) return // Skip if reduced motion preferred
    
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

  const logoSrc = logo || image

  // Dynamic font size for long client names
  // Dynamic font size for long client names
  const getNameFontSize = (name) => {
    if (name.length > 35) return "text-sm"
    if (name.length > 28) return "text-base"
    if (name.length > 20) return "text-lg"
    if (featured) return "text-2xl"
    return "text-xl md:text-2xl"
  }
  
  // Card content (shared between all variants)
  const cardContent = (
    <article 
      className={cn(
        "client-card bg-white rounded-xl overflow-hidden",
        "shadow-card hover:shadow-card-hover",
        "border-t-4 border-t-brand-primary",
        "transition-all duration-300 ease-out",
        !featured && "hover:-translate-y-1", // Keep lift for non-3D cards only
        featured && "border-t-[5px]"
      )}
    >
      {/* Logo Area */}
      <div 
        className={cn(
          "flex items-center justify-center bg-white border-b border-gray-100",
          "shrink-0",
          featured ? "h-[160px] md:h-[160px]" : "h-[160px]"
        )}
      >
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt={`${name} logo`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center">
            <span className="text-2xl font-serif text-brand-dark">
              {name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 text-center flex flex-col h-full justify-between">
        <div className="flex flex-col flex-grow">
          <h3 
            className={cn(
              "font-serif font-medium text-brand-dark mb-2 leading-tight",
              getNameFontSize(name)
            )}
          >
            {name}
          </h3>
          
          {(location || industry) && (
            <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-6">
              {location && <span>{location}</span>}
              {location && industry && <span className="mx-1">/</span>}
              {industry && <span>{industry}</span>}
            </p>
          )}
        </div>
        
        <div className={cn(
          "grid gap-3 shrink-0",
          phoneNumber && referenceLink ? "grid-cols-2" : "grid-cols-1"
        )}>
          {phoneNumber && (
            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="btn-call">
              Call
            </a>
          )}
          {referenceLink && (
            <a
              href={referenceLink.startsWith('mailto:') || referenceLink.startsWith('http') 
                ? referenceLink 
                : `mailto:${referenceLink}`}
              className="btn-reference"
            >
              Reference
            </a>
          )}
        </div>
      </div>
    </article>
  )

  // Determine if effects should be applied
  const shouldAnimate = isVisible && !prefersReducedMotion

  // Featured cards get 3D effect
  if (featured && shouldAnimate) {
    return (
      <div ref={cardRef} className={cn('mb-4', className)}>
        <CardContainer containerClassName="p-0">
          <CardBody className="w-full">
            <CardItem translateZ={50} className="w-full">
              {cardContent}
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    )
  }

  // Regular cards get spotlight effect
  if (!featured && shouldAnimate) {
    return (
      <div ref={cardRef} className={cn('mb-4', className)}>
        <CardSpotlight className="rounded-xl">
          {cardContent}
        </CardSpotlight>
      </div>
    )
  }

  // Fallback: no effects (not visible or reduced motion)
  return (
    <div ref={cardRef} className={cn('mb-4', className)}>
      {cardContent}
    </div>
  )
}

export default ClientCard
