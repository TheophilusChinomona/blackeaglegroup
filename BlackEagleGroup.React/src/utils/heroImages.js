/**
 * Hero Images Discovery Utility
 * Auto-discovers hero carousel images from /images/heros/ folder
 * 
 * This utility provides functions to discover and load hero carousel images
 * that match the naming pattern hero-*.jpg, hero-*.jpeg, or hero-*.png
 * 
 * Features:
 * - Runtime image discovery with caching
 * - Parallel image checking for performance
 * - Numeric sorting (hero-1, hero-2, hero-10, etc.)
 * - Comprehensive error handling
 * - Automatic fallback to empty array on errors
 */

// Cache for discovered images to avoid re-checking on every call
let cachedImages = null
let cacheTimestamp = null
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Check if an image exists by trying to load it
 * @param {string} imagePath - Path to the image
 * @param {number} timeout - Timeout in milliseconds (default: 2000)
 * @returns {Promise<boolean>} True if image exists and loads successfully
 */
const checkImageExists = (imagePath, timeout = 2000) => {
  return new Promise((resolve) => {
    const img = new Image()
    let resolved = false
    
    const cleanup = () => {
      if (!resolved) {
        resolved = true
        img.onload = null
        img.onerror = null
      }
    }
    
    img.onload = () => {
      cleanup()
      resolve(true)
    }
    
    img.onerror = () => {
      cleanup()
      resolve(false)
    }
    
    img.src = imagePath
    
    // Timeout to prevent hanging
    setTimeout(() => {
      if (!resolved) {
        cleanup()
        resolve(false)
      }
    }, timeout)
  })
}

/**
 * Validates that an image path matches the expected pattern
 * @param {string} path - Image path to validate
 * @returns {boolean} True if path matches hero-*.{jpg,jpeg,png} pattern
 */
const validateImagePath = (path) => {
  const pattern = /^\/images\/heros\/hero-\d+\.(jpg|jpeg|png)$/i
  return pattern.test(path)
}

/**
 * Extracts numeric index from hero image filename
 * @param {string} path - Image path (e.g., '/images/heros/hero-5.jpg')
 * @returns {number} Numeric index (e.g., 5) or 0 if not found
 */
const extractImageIndex = (path) => {
  const match = path.match(/hero-(\d+)/)
  return match ? parseInt(match[1], 10) : 0
}

/**
 * Auto-discovers hero carousel images from /images/heros/ folder
 * Matches pattern: hero-*.jpg, hero-*.jpeg, or hero-*.png
 * Returns sorted array of image paths
 * 
 * Uses runtime discovery to check for images in the public folder.
 * Images are sorted numerically (hero-1, hero-2, hero-10, etc.)
 * Results are cached for 5 minutes to improve performance.
 * 
 * @returns {Promise<string[]>} Promise that resolves to array of image paths in format: /images/heros/hero-1.jpg
 * 
 * @example
 * // Basic usage
 * const images = await discoverHeroImages()
 * // Returns: ['/images/heros/hero-1.jpg', '/images/heros/hero-2.png', ...]
 * 
 * @example
 * // Handle empty result (no images found)
 * const images = await discoverHeroImages()
 * if (images.length === 0) {
 *   console.warn('No hero images found. Using fallback image.')
 * }
 */
export const discoverHeroImages = async () => {
  // Return cached result if available and not expired
  const now = Date.now()
  if (cachedImages !== null && cacheTimestamp !== null && (now - cacheTimestamp) < CACHE_DURATION) {
    if (cachedImages.length > 0) {
      console.log(`[Hero Images] Using cached result: ${cachedImages.length} images`)
    }
    return cachedImages
  }

  try {
    const images = []
    let index = 1
    const maxAttempts = 50 // Limit to prevent infinite loops
    const extensions = ['jpg', 'jpeg', 'png']
    const consecutiveFailures = { count: 0, max: 3 } // Stop after 3 consecutive failures
    
    console.log('[Hero Images] Starting image discovery...')
    
    // Try to discover images by checking sequentially numbered files
    while (index <= maxAttempts) {
      let found = false
      
      // Check all extensions in parallel for better performance
      const checkPromises = extensions.map(ext => {
        const imagePath = `/images/heros/hero-${index}.${ext}`
        return checkImageExists(imagePath).then(exists => ({ exists, path: imagePath }))
      })
      
      const results = await Promise.all(checkPromises)
      
      // Find the first existing image for this index
      for (const result of results) {
        if (result.exists) {
          // Validate path before adding
          if (validateImagePath(result.path)) {
            images.push(result.path)
            found = true
            consecutiveFailures.count = 0 // Reset failure counter
            break // Found image with this extension, move to next number
          } else {
            console.warn(`[Hero Images] Invalid image path format: ${result.path}`)
          }
        }
      }
      
      // If no image found for this index
      if (!found) {
        consecutiveFailures.count++
        
        // Stop after consecutive failures (likely reached end of sequence)
        if (consecutiveFailures.count >= consecutiveFailures.max) {
          console.log(`[Hero Images] Stopped after ${consecutiveFailures.count} consecutive failures`)
          break
        }
      }
      
      index++
    }
    
    // Sort images numerically by extracting the number from filename
    images.sort((a, b) => {
      const numA = extractImageIndex(a)
      const numB = extractImageIndex(b)
      return numA - numB
    })
    
    // Cache the results
    cachedImages = images
    cacheTimestamp = now
    
    if (images.length === 0) {
      console.warn('[Hero Images] No hero images found in /images/heros/ folder. Component will use fallback image.')
    } else {
      console.log(`[Hero Images] Successfully discovered ${images.length} image(s):`, images)
    }
    
    return images
  } catch (error) {
    console.error('[Hero Images] Error discovering hero images:', error)
    console.warn('[Hero Images] Returning empty array. Component will use fallback image.')
    
    // Cache empty result to avoid repeated failures
    cachedImages = []
    cacheTimestamp = now
    
    // Return empty array on error - component will handle fallback
    return []
  }
}

/**
 * Clears the cached hero images
 * Useful for testing or forcing a refresh
 */
export const clearHeroImagesCache = () => {
  cachedImages = null
  cacheTimestamp = null
  console.log('[Hero Images] Cache cleared')
}

/**
 * Alternative: Build-time discovery using import.meta.glob
 * 
 * Note: This approach requires images to be in src/ folder, not public/ folder.
 * For public folder images, use discoverHeroImages() instead.
 * 
 * @returns {string[]} Array of image paths
 */
export const discoverHeroImagesBuildTime = () => {
  try {
    // Note: import.meta.glob doesn't work directly with public folder files
    // This would work if images were in src/assets/heros/ instead
    const images = import.meta.glob('/src/assets/heros/hero-*.{jpg,jpeg}', {
      eager: true
    })
    
    const imagePaths = Object.keys(images)
      .map(path => path.replace('/src/assets', '/images'))
      .sort((a, b) => {
        const numA = parseInt(a.match(/hero-(\d+)/)?.[1] || '0')
        const numB = parseInt(b.match(/hero-(\d+)/)?.[1] || '0')
        return numA - numB
      })
    
    return imagePaths
  } catch (error) {
    console.error('Error in build-time hero image discovery:', error)
    return []
  }
}

