import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'

/**
 * EventCarousel Component
 * Displays a carousel of images with captions for event hero sections
 * 
 * @param {Object} props
 * @param {Array} props.items - Array of carousel items with image, title, subtitle
 * @param {number} props.autoPlayInterval - Auto-play interval in milliseconds (default: 5000)
 * @param {boolean} props.autoPlay - Enable auto-play (default: true)
 * @param {boolean} props.showControls - Show navigation controls (default: true)
 * @param {boolean} props.showIndicators - Show indicator dots (default: true)
 * @param {React.ReactNode} props.ctaButtons - Custom CTA buttons to display in carousel
 */
const EventCarousel = ({ 
  items = [], 
  autoPlayInterval = 5000, 
  autoPlay = true,
  showControls = true,
  showIndicators = true,
  ctaButtons = null
}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, items.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  const goToPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="event-carousel-container">
      <div className="event-carousel-wrapper">
        <div className="event-carousel">
          {items.map((item, index) => (
            <div
              key={index}
              className={`event-carousel-item ${index === activeIndex ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${item.image})`,
                display: index === activeIndex ? 'flex' : 'none'
              }}
            >
              <div className="event-carousel-overlay"></div>
              <Container className="event-carousel-content">
                <div className="event-carousel-caption">
                  {item.title && (
                    <h1 className="event-carousel-title">{item.title}</h1>
                  )}
                  {item.subtitle && (
                    <h5 className="event-carousel-subtitle">{item.subtitle}</h5>
                  )}
                  {ctaButtons && (
                    <div className="event-carousel-cta">
                      {ctaButtons}
                    </div>
                  )}
                </div>
              </Container>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {items.length > 1 && showControls && (
          <>
            <button
              className="event-carousel-control event-carousel-control-prev"
              onClick={goToPrevious}
              aria-label="Previous slide"
            >
              <span className="event-carousel-control-icon" aria-hidden="true">‹</span>
            </button>
            <button
              className="event-carousel-control event-carousel-control-next"
              onClick={goToNext}
              aria-label="Next slide"
            >
              <span className="event-carousel-control-icon" aria-hidden="true">›</span>
            </button>
          </>
        )}

        {/* Indicator Dots */}
        {items.length > 1 && showIndicators && (
          <div className="event-carousel-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                className={`event-carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventCarousel

