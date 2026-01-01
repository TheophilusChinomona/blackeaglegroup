import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Gallery from '../components/Gallery'
import VideoPlayer from '../components/VideoPlayer'

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Gallery Component', () => {
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

  it('should render gallery component', () => {
    renderWithRouter(<Gallery items={mockImages} />)
    // Gallery should render with region role
    const gallery = screen.getByRole('region', { name: /image gallery/i })
    expect(gallery).toBeInTheDocument()
  })

  it('should open lightbox when image is clicked in grid view', async () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Find gallery items in grid view
    const galleryItems = document.querySelectorAll('.gallery-item')
    expect(galleryItems.length).toBeGreaterThan(0)
    
    // Click first image to open lightbox
    if (galleryItems.length > 0) {
      fireEvent.click(galleryItems[0])
      
      // Lightbox should be visible (check for dialog or fullscreen container)
      await waitFor(() => {
        const lightbox = document.querySelector('[role="dialog"]') ||
                        document.querySelector('.fixed.inset-0')
        expect(lightbox).toBeInTheDocument()
      }, { timeout: 1000 })
    }
  })

  it('should implement lazy loading for images', () => {
    renderWithRouter(<Gallery items={mockImages} viewMode="grid" />)
    
    // Check if images have loading="lazy" attribute in grid view
    const images = document.querySelectorAll('img[loading="lazy"]')
    // Grid view should have lazy loaded images
    expect(images.length).toBeGreaterThan(0)
  })
})

describe('VideoPlayer Component', () => {
  it('should render video player component', () => {
    const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    renderWithRouter(<VideoPlayer url={youtubeUrl} />)
    
    // Video player should render with region role
    const videoContainer = screen.getByRole('region', { name: /video player/i })
    expect(videoContainer).toBeInTheDocument()
  })
})

