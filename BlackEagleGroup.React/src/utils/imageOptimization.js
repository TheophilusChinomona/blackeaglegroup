/**
 * Image Optimization Utilities
 * Provides functions for WebP conversion, responsive image sets, and image optimization
 */

/**
 * Generate responsive image sources for different screen sizes
 * @param {string} basePath - Base path to the image
 * @param {Object} options - Options for image generation
 * @param {boolean} options.webp - Include WebP format
 * @param {Object} options.sizes - Custom sizes object with mobile, tablet, desktop
 * @returns {Object} Object with srcSet and sizes for responsive images
 */
export const generateResponsiveImageSet = (basePath, options = {}) => {
  const { webp = true, sizes = null } = options

  // Default responsive sizes if not provided
  const defaultSizes = sizes || {
    mobile: { width: 400, suffix: '-mobile' },
    tablet: { width: 768, suffix: '-tablet' },
    desktop: { width: 1200, suffix: '-desktop' }
  }

  // Extract file extension and base name
  const pathParts = basePath.split('.')
  const extension = pathParts.pop()
  const baseName = pathParts.join('.')

  const srcSet = []
  const webpSrcSet = []

  // Generate srcSet for original format
  Object.values(defaultSizes).forEach(({ width, suffix }) => {
    const imagePath = `${baseName}${suffix}.${extension}`
    srcSet.push(`${imagePath} ${width}w`)
    
    if (webp) {
      const webpPath = `${baseName}${suffix}.webp`
      webpSrcSet.push(`${webpPath} ${width}w`)
    }
  })

  // Generate sizes attribute for responsive images
  const sizesAttr = '(max-width: 640px) 400px, (max-width: 1024px) 768px, 1200px'

  return {
    src: basePath,
    srcSet: srcSet.join(', '),
    webpSrcSet: webp ? webpSrcSet.join(', ') : null,
    sizes: sizesAttr,
    fallback: basePath // Original format as fallback
  }
}

/**
 * Get optimized image path with WebP support and fallback
 * @param {string} imagePath - Path to the image
 * @param {Object} options - Options for optimization
 * @param {boolean} options.webp - Use WebP format if available
 * @param {string} options.quality - Image quality (default: '85')
 * @returns {Object} Object with optimized path and fallback
 */
export const getOptimizedImage = (imagePath, options = {}) => {
  const { webp = true, quality = '85' } = options

  // Extract file extension and base name
  const pathParts = imagePath.split('.')
  const extension = pathParts.pop()
  const baseName = pathParts.join('.')

  // Generate WebP path
  const webpPath = `${baseName}.webp`

  return {
    original: imagePath,
    webp: webp ? webpPath : null,
    fallback: imagePath, // Always provide fallback
    quality
  }
}

/**
 * Create picture element sources for WebP with fallback
 * @param {string} imagePath - Path to the image
 * @param {Object} options - Options for picture sources
 * @returns {Array} Array of source objects for picture element
 */
export const createPictureSources = (imagePath, options = {}) => {
  const { webp = true } = options
  const sources = []

  if (webp) {
    const optimized = getOptimizedImage(imagePath, { webp: true })
    sources.push({
      srcSet: optimized.webp,
      type: 'image/webp',
      fallback: optimized.fallback
    })
  }

  // Always include original format as fallback
  sources.push({
    srcSet: imagePath,
    type: null, // Original format
    fallback: imagePath
  })

  return sources
}

/**
 * Check if browser supports WebP format
 * @returns {Promise<boolean>} Promise that resolves to true if WebP is supported
 */
export const supportsWebP = () => {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * Get the best image format based on browser support
 * @param {string} imagePath - Path to the image
 * @param {Object} options - Options
 * @returns {Promise<string>} Promise that resolves to the best image path
 */
export const getBestImageFormat = async (imagePath, options = {}) => {
  const { webp = true } = options
  
  if (!webp) {
    return imagePath
  }

  const supports = await supportsWebP()
  const optimized = getOptimizedImage(imagePath, { webp: true })
  
  return supports && optimized.webp ? optimized.webp : optimized.fallback
}

/**
 * Transform gallery items to include optimized images
 * @param {Array} items - Array of image items
 * @param {Object} options - Optimization options
 * @returns {Array} Array of optimized image items
 */
export const optimizeGalleryItems = (items, options = {}) => {
  const { webp = true, responsive = false } = options

  return items.map((item) => {
    const original = item.original || item.src || item.url
    const thumbnail = item.thumbnail || original

    const optimized = {
      ...item,
      original: original,
      thumbnail: thumbnail
    }

    // Add WebP versions if enabled
    if (webp) {
      const originalOptimized = getOptimizedImage(original, { webp: true })
      const thumbnailOptimized = getOptimizedImage(thumbnail, { webp: true })
      
      optimized.originalWebp = originalOptimized.webp
      optimized.thumbnailWebp = thumbnailOptimized.webp
      optimized.fallback = originalOptimized.fallback
    }

    // Add responsive image sets if enabled
    if (responsive) {
      optimized.responsive = generateResponsiveImageSet(original, { webp })
    }

    return optimized
  })
}

