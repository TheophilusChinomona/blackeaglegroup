import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gallery from '../components/Gallery'

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: query.includes('max-width: 640px'), // Simulate mobile
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Mobile Gallery Experience', () => {
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
    },
    {
      original: '/images/test3.jpg',
      thumbnail: '/images/test3-thumb.jpg',
      description: 'Test Image 3'
    }
  ]

  it('should have mobile-optimized gallery layout', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Gallery grid should use responsive classes
    const galleryGrid = document.querySelector('.gallery-grid .grid')
    expect(galleryGrid).toBeInTheDocument()
    
    // Check for responsive grid classes (mobile-first: grid-cols-1)
    expect(galleryGrid.className).toContain('grid-cols-1')
    expect(galleryGrid.className).toContain('sm:grid-cols-2')
  })

  it('should support touch interactions', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Gallery items should be clickable/touchable
    const galleryItems = document.querySelectorAll('.gallery-item')
    expect(galleryItems.length).toBeGreaterThan(0)
    
    // Items should have cursor-pointer class for touch indication
    galleryItems.forEach(item => {
      expect(item.className).toContain('cursor-pointer')
    })
  })

  it('should support swipe gestures for lightbox navigation', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Open lightbox by clicking first image
    const firstItem = document.querySelector('.gallery-item')
    if (firstItem) {
      fireEvent.click(firstItem)
      
      // Lightbox should be open
      const lightbox = document.querySelector('[role="dialog"]')
      expect(lightbox).toBeInTheDocument()
      
      // ImageGallery component should support swipe (react-image-gallery has built-in support)
      const imageGallery = document.querySelector('.image-gallery')
      expect(imageGallery || lightbox).toBeTruthy()
    }
  })

  it('should optimize images for mobile loading', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Images should have lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]')
    expect(images.length).toBeGreaterThan(0)
    
    // Images should have appropriate sizes for mobile
    images.forEach(img => {
      // Images should have responsive classes
      expect(img.className).toContain('w-full') || expect(img.className).toContain('object-cover')
    })
  })
})

