import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { discoverHeroImages } from '@/utils/heroImages'

/**
 * Hero Component
 * Reusable hero section with carousel background, title, subtitle, and breadcrumbs
 * 
 * @param {Object} props
 * @param {string} props.title - Main heading text (required)
 * @param {string} props.subtitle - Optional tagline/subtitle
 * @param {Array<{name: string, url: string}>} props.breadcrumbs - Optional breadcrumb navigation array
 * @param {string} props.backgroundImage - Optional static background image URL (overrides carousel)
 */
const Hero = ({ title, subtitle, breadcrumbs, backgroundImage }) => {
  const [carouselImages, setCarouselImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroSectionRef = useRef(null)
  const isPausedRef = useRef(false)

  // Image discovery effect
  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await discoverHeroImages()
        setCarouselImages(images)
      } catch (error) {
        console.error('Error loading hero images:', error)
        setCarouselImages([])
      }
    }

    loadImages()
  }, [])

  // Auto-play carousel with pause on hover
  useEffect(() => {
    // Only auto-play if there are multiple images and no static background
    if (backgroundImage || carouselImages.length <= 1) return

    let intervalId

    const startInterval = () => {
      intervalId = setInterval(() => {
        if (!isPausedRef.current) {
          setActiveIndex((prev) => (prev + 1) % carouselImages.length)
        }
      }, 5000) // 5 seconds
    }

    startInterval()

    // Cleanup
    return () => {
      clearInterval(intervalId)
    }
  }, [carouselImages.length, backgroundImage])

  // Mouse tracking for parallax effect
  useEffect(() => {
    const heroSection = heroSectionRef.current
    if (!heroSection) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e) => {
      const rect = heroSection.getBoundingClientRect()
      // Calculate position from center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      setMousePosition({ x, y })
    }

    const handleMouseEnter = () => {
      isPausedRef.current = true
    }

    const handleMouseLeave = () => {
      isPausedRef.current = false
      // Reset position smoothly
      setMousePosition({ x: 0, y: 0 })
    }

    heroSection.addEventListener('mousemove', handleMouseMove)
    heroSection.addEventListener('mouseenter', handleMouseEnter)
    heroSection.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      heroSection.removeEventListener('mousemove', handleMouseMove)
      heroSection.removeEventListener('mouseenter', handleMouseEnter)
      heroSection.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Calculate transform based on mouse position (subtle movement: max 15px)
  const parallaxTransform = {
    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px) scale(1.05)`,
    transition: mousePosition.x === 0 && mousePosition.y === 0 
      ? 'transform 0.5s ease-out' 
      : 'transform 0.1s ease-out'
  }

  return (
    <section className="hero-section" ref={heroSectionRef}>
      {/* Background - Static or Carousel */}
      <div className="hero-background-carousel">
        {backgroundImage ? (
          // Static background image when backgroundImage prop is provided
          <div
            className="hero-carousel-slide active"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
              ...parallaxTransform
            }}
            aria-hidden="false"
          />
        ) : carouselImages.length > 0 ? (
          // Carousel when no static background and images are loaded
          carouselImages.map((image, index) => (
            <div
              key={index}
              className={`hero-carousel-slide ${index === activeIndex ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${image})`,
                ...(index === activeIndex ? parallaxTransform : {})
              }}
              aria-hidden={index !== activeIndex}
            />
          ))
        ) : (
          // Fallback when no images available
          <div
            className="hero-carousel-slide active"
            style={{ 
              backgroundImage: "url('/images/bg_1.jpg')",
              ...parallaxTransform
            }}
            aria-hidden="false"
          />
        )}
      </div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <Container className="hero-content">
        <Row className="align-items-center">
          <Col lg={12} className="hero-text-col">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="hero-breadcrumbs">
                {breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    {index > 0 && <i className="ion-ios-arrow-forward"></i>}
                    {index < breadcrumbs.length - 1 ? (
                      <Link to={crumb.url}>{crumb.name}</Link>
                    ) : (
                      <span>{crumb.name}</span>
                    )}
                  </span>
                ))}
              </div>
            )}

            {/* Title and Subtitle */}
            <div className="hero-text text-center">
              <h1 className="hero-heading">{title}</h1>
              {subtitle && <p className="hero-tagline">{subtitle}</p>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
