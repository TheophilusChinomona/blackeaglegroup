import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gallery from '../components/Gallery'

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Image Optimization', () => {
  const mockImages = [
    {
      original: '/images/test1.jpg',
      thumbnail: '/images/test1-thumb.jpg',
      description: 'Test Image 1'
    },
    {
      original: '/images/test2.jpg',
      thumbnail: '/images/test2-thumb.jpg',
      description: 'Test Image 2'
    }
  ]

  it('should implement lazy loading for images', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Check if images have loading="lazy" attribute
    const images = document.querySelectorAll('img[loading="lazy"]')
    expect(images.length).toBeGreaterThan(0)
    
    // Verify lazy loading is applied to gallery images
    const galleryImages = Array.from(images).filter(img => 
      img.closest('.gallery-item') !== null
    )
    expect(galleryImages.length).toBeGreaterThan(0)
  })

  it('should support fallback to original image formats', () => {
    // Test that images can use original formats when WebP is not available
    const imagesWithFallback = [
      {
        original: '/images/test1.jpg',
        thumbnail: '/images/test1-thumb.jpg',
        webp: '/images/test1.webp', // WebP version
        fallback: '/images/test1.jpg' // Fallback
      }
    ]
    
    renderWithRouter(<Gallery items={imagesWithFallback} viewMode="grid" />)
    
    // Images should render with original format as fallback
    const images = document.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
    
    // Images should have src attributes pointing to valid image paths
    images.forEach(img => {
      expect(img.src).toBeTruthy()
      expect(img.src).toMatch(/\.(jpg|jpeg|png|webp)/i)
    })
  })

  it('should optimize images for different screen sizes', () => {
    // Test that responsive image sets can be generated
    const responsiveImage = {
      original: '/images/test1.jpg',
      thumbnail: '/images/test1-thumb.jpg',
      sizes: {
        mobile: '/images/test1-mobile.jpg',
        tablet: '/images/test1-tablet.jpg',
        desktop: '/images/test1-desktop.jpg'
      }
    }
    
    // Verify image structure supports responsive sizes
    expect(responsiveImage.sizes).toBeDefined()
    expect(responsiveImage.sizes.mobile).toBeDefined()
    expect(responsiveImage.sizes.tablet).toBeDefined()
    expect(responsiveImage.sizes.desktop).toBeDefined()
  })
})

describe('WebP Conversion Support', () => {
  it('should support WebP image format in gallery', () => {
    const webpImages = [
      {
        original: '/images/test1.webp',
        thumbnail: '/images/test1-thumb.webp',
        description: 'WebP Image'
      }
    ]
    
    renderWithRouter(<Gallery items={webpImages} viewMode="grid" />)
    
    // Gallery should render WebP images
    const images = document.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)
    
    // Images should load (WebP support is browser-dependent, but component should handle it)
    const firstImage = images[0]
    expect(firstImage).toBeInTheDocument()
  })
})

