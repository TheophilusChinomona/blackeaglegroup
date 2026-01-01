import { useState, useEffect, useRef } from 'react'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import { cn } from '@/utils'

/**
 * Gallery Component
 * Reusable image gallery component with lightbox and grid view options
 * Supports lazy loading and is reusable for different event types
 * 
 * @param {Array} items - Array of image objects with original, thumbnail, and optional description
 * @param {boolean} showNav - Show navigation arrows (default: true)
 * @param {boolean} showBullets - Show bullet navigation (default: true)
 * @param {boolean} showThumbnails - Show thumbnail strip (default: true)
 * @param {boolean} autoPlay - Auto-play slideshow (default: false)
 * @param {string} className - Additional CSS classes
 * @param {string} viewMode - 'lightbox' or 'grid' (default: 'lightbox')
 */
const Gallery = ({
  items = [],
  showNav = true,
  showBullets = true,
  showThumbnails = true,
  autoPlay = false,
  className,
  viewMode = 'lightbox'
}) => {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const lightboxRef = useRef(null)
  
  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50

  // Detect if device is mobile
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle touch start for swipe gestures
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  // Handle touch move for swipe gestures
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  // Handle touch end and detect swipe direction
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && lightboxIndex !== null && lightboxIndex < items.length - 1) {
      // Swipe left - next image
      setLightboxIndex(lightboxIndex + 1)
    }
    if (isRightSwipe && lightboxIndex !== null && lightboxIndex > 0) {
      // Swipe right - previous image
      setLightboxIndex(lightboxIndex - 1)
    }
  }

  // Transform items to react-image-gallery format if needed
  const galleryItems = items.map((item, index) => {
    if (typeof item === 'string') {
      // If item is just a string URL, convert to object format
      return {
        original: item,
        thumbnail: item,
        originalAlt: `Gallery image ${index + 1}`,
        thumbnailAlt: `Gallery thumbnail ${index + 1}`
      }
    }
    return {
      original: item.original || item.src || item.url,
      thumbnail: item.thumbnail || item.original || item.src || item.url,
      originalAlt: item.description || item.alt || `Gallery image ${index + 1}`,
      thumbnailAlt: item.description || item.alt || `Gallery thumbnail ${index + 1}`,
      description: item.description,
      ...item
    }
  })

  if (galleryItems.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">No images to display</p>
      </div>
    )
  }

  // Grid view mode
  if (viewMode === 'grid') {
    return (
      <div className={cn('gallery-grid', className)} role="region" aria-label="Image gallery">
        {/* Mobile-optimized grid: 1 column on mobile, 2 on tablet, 3-4 on desktop */}
        <div className={cn(
          'grid gap-4',
          'grid-cols-1', // Mobile: 1 column
          'sm:grid-cols-2', // Small screens: 2 columns
          'md:grid-cols-3', // Medium screens: 3 columns
          'lg:grid-cols-4' // Large screens: 4 columns
        )}>
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                'gallery-item cursor-pointer overflow-hidden rounded-lg shadow-sm',
                'hover:shadow-md transition-shadow',
                'touch-manipulation', // Optimize touch interactions
                isMobile && 'active:scale-95' // Touch feedback on mobile
              )}
              onClick={() => setLightboxIndex(index)}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{ 
                touchAction: 'manipulation', // Optimize touch scrolling
                minHeight: isMobile ? '200px' : '192px' // Optimize mobile image sizes
              }}
            >
              <img
                src={item.thumbnail}
                alt={item.originalAlt || `Gallery image ${index + 1}`}
                loading="lazy"
                className={cn(
                  'w-full object-cover transition-transform duration-300',
                  isMobile ? 'h-[200px]' : 'h-48 hover:scale-105' // Smaller on mobile, hover effect on desktop
                )}
                decoding="async" // Improve mobile performance
                fetchPriority={index < 4 ? 'high' : 'low'} // Prioritize first images
              />
              {item.description && (
                <div className="p-2 bg-white">
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Lightbox for grid view - opens when image is clicked */}
        {lightboxIndex !== null && (
          <div
            ref={lightboxRef}
            className={cn(
              'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center',
              'touch-none' // Prevent background scrolling on mobile
            )}
            onClick={() => setLightboxIndex(null)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            style={{ touchAction: 'pan-y' }} // Allow vertical scrolling but optimize horizontal
          >
            <button
              className={cn(
                'absolute text-white text-2xl z-10',
                'top-4 right-4', // Desktop position
                'top-2 right-2', // Mobile position (overridden by desktop)
                'hover:text-gray-300',
                'touch-manipulation', // Optimize touch
                'min-w-[44px] min-h-[44px]', // Minimum touch target size (iOS/Android guidelines)
                'flex items-center justify-center',
                'focus:outline-2 focus:outline-white focus:outline-offset-2'
              )}
              onClick={() => setLightboxIndex(null)}
              aria-label="Close lightbox"
              type="button"
            >
              <span aria-hidden="true">×</span>
              <span className="visually-hidden">Close image lightbox</span>
            </button>
            <div 
              onClick={(e) => e.stopPropagation()}
              className="w-full h-full flex items-center justify-center p-4"
              style={{ touchAction: 'pan-x pan-y' }} // Allow swiping in lightbox
            >
              <ImageGallery
                items={galleryItems}
                showNav={showNav && !isMobile} // Hide nav arrows on mobile (use swipe instead)
                showBullets={showBullets}
                showThumbnails={false}
                startIndex={lightboxIndex}
                swipeable={true} // Enable swipe gestures
                useBrowserFullscreen={false} // Better mobile control
                onScreenChange={(isFullscreen) => {
                  if (!isFullscreen) {
                    setLightboxIndex(null)
                  }
                }}
                additionalClass="image-gallery-mobile"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  // Default lightbox view mode
  return (
    <div className={cn('gallery-container', className)} role="region" aria-label="Image gallery">
      <ImageGallery
        items={galleryItems}
        showNav={showNav && !isMobile} // Hide nav arrows on mobile (use swipe instead)
        showBullets={showBullets}
        showThumbnails={!isMobile ? showThumbnails : false} // Hide thumbnails on mobile for better performance
        autoPlay={autoPlay}
        lazyLoad={true}
        swipeable={true} // Enable swipe gestures
        useBrowserFullscreen={false} // Better mobile control
        additionalClass={cn('image-gallery-custom', isMobile && 'image-gallery-mobile')}
      />
    </div>
  )
}

export default Gallery

