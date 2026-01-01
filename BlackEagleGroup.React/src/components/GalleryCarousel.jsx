import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'

/**
 * GalleryCarousel Component
 * Carousel/slider for displaying gallery images with lightbox functionality
 * Similar to EventCarousel but optimized for gallery images
 * 
 * @param {Array} items - Array of image objects with original, thumbnail, and optional description
 * @param {number} autoPlayInterval - Auto-play interval in milliseconds (default: 5000)
 * @param {boolean} autoPlay - Enable auto-play (default: false)
 * @param {boolean} showControls - Show navigation controls (default: true)
 * @param {boolean} showIndicators - Show indicator dots (default: true)
 * @param {Function} onImageClick - Callback when image is clicked (for lightbox)
 */
const GalleryCarousel = ({ 
  items = [], 
  autoPlayInterval = 5000, 
  autoPlay = false,
  showControls = true,
  showIndicators = true,
  onImageClick = null
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
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  // Transform items to consistent format
  const galleryItems = items.map((item, index) => {
    if (typeof item === 'string') {
      return {
        original: item,
        thumbnail: item,
        description: `Gallery image ${index + 1}`
      }
    }
    return {
      original: item.original || item.src || item.url || item.image,
      thumbnail: item.thumbnail || item.original || item.src || item.url || item.image,
      description: item.description || item.alt || `Gallery image ${index + 1}`
    }
  })

  const currentItem = galleryItems[activeIndex]

  return (
    <div className="gallery-carousel-container">
      <div className="gallery-carousel">
        <div
          className="gallery-carousel-item active"
          style={{
            backgroundImage: `url(${currentItem?.original || currentItem?.thumbnail})`,
            minHeight: '600px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="gallery-carousel-overlay"></div>
          {onImageClick && (
            <div 
              className="gallery-carousel-clickable"
              onClick={() => onImageClick(activeIndex)}
              style={{
                position: 'absolute',
                inset: 0,
                cursor: 'pointer',
                zIndex: 2
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onImageClick(activeIndex)
                }
              }}
              aria-label="Open image in lightbox"
            />
          )}
          <Container className="gallery-carousel-content">
            {currentItem?.description && (
              <div className="gallery-carousel-caption">
                <h3 className="gallery-carousel-title mb-3">{currentItem.description}</h3>
                <p className="gallery-carousel-subtitle">
                  {activeIndex + 1} of {galleryItems.length}
                </p>
              </div>
            )}
          </Container>
        </div>
      </div>

      {/* Navigation Controls */}
      {galleryItems.length > 1 && showControls && (
        <>
          <button
            className="gallery-carousel-control gallery-carousel-control-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
            type="button"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>
          <button
            className="gallery-carousel-control gallery-carousel-control-next"
            onClick={goToNext}
            aria-label="Next image"
            type="button"
          >
            <ChevronRight size={32} className="text-white" />
          </button>
        </>
      )}

      {/* Indicator Dots */}
      {galleryItems.length > 1 && showIndicators && (
        <div className="gallery-carousel-indicators">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              className={cn(
                'gallery-carousel-indicator',
                index === activeIndex && 'active'
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default GalleryCarousel

