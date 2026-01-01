import { useState, useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils'

/**
 * Lightbox Component
 * Standalone lightbox for viewing images
 * 
 * @param {Array} items - Array of image objects
 * @param {number} initialIndex - Initial image index to show
 * @param {Function} onClose - Callback when lightbox is closed
 */
const Lightbox = ({
  items = [],
  initialIndex = 0,
  onClose = null
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const lightboxRef = useRef(null)
  const minSwipeDistance = 50

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [currentIndex, items.length, onClose])

  // Update index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex)
    setImageLoaded(false)
  }, [initialIndex])

  const goToNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setImageLoaded(false)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
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

  if (!items || items.length === 0) return null

  // Transform items to consistent format
  const galleryItems = items.map((item, index) => {
    if (typeof item === 'string') {
      return {
        original: item,
        description: `Image ${index + 1}`
      }
    }
    return {
      original: item.original || item.src || item.url || item.image,
      description: item.description || item.alt || `Image ${index + 1}`
    }
  })

  const currentImage = galleryItems[currentIndex]
  const canGoNext = currentIndex < galleryItems.length - 1
  const canGoPrevious = currentIndex > 0

  if (!currentImage) return null

  return (
    <div
      ref={lightboxRef}
      className={cn(
        'fixed inset-0 z-[9999]',
        'bg-black/95 backdrop-blur-sm',
        'flex items-center justify-center',
        'animate-in fade-in duration-200'
      )}
      onClick={onClose || (() => {})}
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
          if (onClose) onClose()
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
              {currentIndex + 1} of {galleryItems.length}
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
                index === currentIndex
                  ? 'bg-white w-6'
                  : 'bg-white/50'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Lightbox

