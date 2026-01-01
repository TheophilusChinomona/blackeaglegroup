import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'

/**
 * EventGallery Component
 * Modern, clean lightbox gallery for event images
 * 
 * @param {Array} items - Array of image objects with original, thumbnail, and optional description
 * @param {string} className - Additional CSS classes
 */
const EventGallery = ({
  items = [],
  className,
  initialIndex = null
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(initialIndex)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const lightboxRef = useRef(null)
  const imageRef = useRef(null)
  
  const minSwipeDistance = 50

  // Update lightbox index when initialIndex changes
  useEffect(() => {
    if (initialIndex !== null) {
      setLightboxIndex(initialIndex)
    }
  }, [initialIndex])

  // Handle keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) {
      document.body.style.overflow = 'unset'
      return
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        if (lightboxIndex > 0) {
          setLightboxIndex(lightboxIndex - 1)
          setImageLoaded(false)
        }
      } else if (e.key === 'ArrowRight') {
        if (lightboxIndex < items.length - 1) {
          setLightboxIndex(lightboxIndex + 1)
          setImageLoaded(false)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxIndex, items.length])

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setImageLoaded(false)
  }

  const closeLightbox = () => {
    setLightboxIndex(null)
    setImageLoaded(false)
  }

  const goToNext = () => {
    if (lightboxIndex !== null && lightboxIndex < items.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
      setImageLoaded(false)
    }
  }

  const goToPrevious = () => {
    if (lightboxIndex !== null && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
      setImageLoaded(false)
    }
  }

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    }
    if (isRightSwipe) {
      goToPrevious()
    }
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
      original: item.original || item.src || item.url,
      thumbnail: item.thumbnail || item.original || item.src || item.url,
      description: item.description || item.alt || `Gallery image ${index + 1}`
    }
  })

  if (galleryItems.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  const currentImage = lightboxIndex !== null ? galleryItems[lightboxIndex] : null
  const canGoNext = lightboxIndex !== null && lightboxIndex < galleryItems.length - 1
  const canGoPrevious = lightboxIndex !== null && lightboxIndex > 0

  return (
    <>
      {/* Grid View */}
      <div className={cn('gallery-grid', className)} role="region" aria-label="Image gallery">
        <div className={cn(
          'grid gap-4',
          'grid-cols-1',
          'sm:grid-cols-2',
          'md:grid-cols-3',
          'lg:grid-cols-4'
        )}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                'gallery-item cursor-pointer overflow-hidden rounded-lg shadow-md',
                'hover:shadow-xl transition-all duration-300',
                'transform hover:scale-[1.02]',
                'group'
              )}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
              aria-label={`Open image ${index + 1} in lightbox`}
            >
              <div className="relative overflow-hidden bg-gray-100" style={{ minHeight: '192px', backgroundColor: '#f3f4f6' }}>
                <img
                  src={item.thumbnail}
                  alt={item.description}
                  loading="lazy"
                  className={cn(
                    'w-full h-48 object-cover transition-transform duration-500',
                    'group-hover:scale-110'
                  )}
                  onError={(e) => {
                    console.error('Failed to load image:', item.thumbnail)
                    e.target.style.display = 'none'
                    // Show error placeholder
                    const parent = e.target.parentElement
                    if (parent && !parent.querySelector('.error-placeholder')) {
                      const errorDiv = document.createElement('div')
                      errorDiv.className = 'error-placeholder w-full h-48 flex items-center justify-center bg-gray-200 text-gray-400 text-sm'
                      errorDiv.textContent = 'Image not found'
                      parent.appendChild(errorDiv)
                    }
                  }}
                  onLoad={(e) => {
                    // Ensure image is visible when loaded
                    e.target.style.opacity = '1'
                    e.target.style.display = 'block'
                  }}
                  style={{ 
                    display: 'block',
                    opacity: 1,
                    backgroundColor: 'transparent'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 pointer-events-none" />
              </div>
              {item.description && (
                <div className="p-3 bg-white">
                  <p className="text-sm text-gray-700 line-clamp-2">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modern Lightbox */}
      {lightboxIndex !== null && currentImage && (
        <div
          ref={lightboxRef}
          className={cn(
            'fixed inset-0 z-[9999]',
            'bg-black/95 backdrop-blur-sm',
            'flex items-center justify-center',
            'animate-in fade-in duration-200'
          )}
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close Button */}
          <button
            className={cn(
              'absolute top-4 right-4 z-10',
              'text-white hover:text-gray-300',
              'p-2 rounded-full bg-black/50 hover:bg-black/70',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
              'min-w-[44px] min-h-[44px] flex items-center justify-center'
            )}
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            aria-label="Close lightbox"
            type="button"
          >
            <X size={24} />
          </button>

          {/* Navigation Buttons */}
          {canGoPrevious && (
            <button
              className={cn(
                'absolute left-4 z-10',
                'text-white hover:text-gray-300',
                'p-3 rounded-full bg-black/50 hover:bg-black/70',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
                'min-w-[48px] min-h-[48px] flex items-center justify-center',
                'hidden md:flex'
              )}
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {canGoNext && (
            <button
              className={cn(
                'absolute right-4 z-10',
                'text-white hover:text-gray-300',
                'p-3 rounded-full bg-black/50 hover:bg-black/70',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black',
                'min-w-[48px] min-h-[48px] flex items-center justify-center',
                'hidden md:flex'
              )}
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={28} />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              ref={imageRef}
              src={currentImage.original}
              alt={currentImage.description}
              className={cn(
                'max-w-full max-h-[90vh] object-contain',
                'rounded-lg shadow-2xl',
                'transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
            
            {/* Image Info */}
            {currentImage.description && (
              <div className={cn(
                'mt-4 text-center',
                'text-white',
                'transition-opacity duration-300',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}>
                <p className="text-lg font-medium">{currentImage.description}</p>
                <p className="text-sm text-gray-300 mt-1">
                  {lightboxIndex + 1} of {galleryItems.length}
                </p>
              </div>
            )}
          </div>

          {/* Mobile Swipe Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="flex gap-2">
              {galleryItems.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-200',
                    index === lightboxIndex
                      ? 'bg-white w-6'
                      : 'bg-white/50'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EventGallery

