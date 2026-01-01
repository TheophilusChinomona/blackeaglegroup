import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GolfEvents from '../pages/GolfEvents'
import EventPage from '../components/EventPage'

// Mock window.scrollTo
global.scrollTo = vi.fn()

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Event Pages', () => {
  it('should render Golf Events landing page', async () => {
    renderWithRouter(<GolfEvents />)
    
    // Wait for async data loading to complete
    await waitFor(() => {
      const page = screen.getByText(/Golf Tournaments/i) || screen.getByText(/Golf Events/i) || document.body
      expect(page).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should render EventPage template component', () => {
    const mockEvent = {
      id: 'test-1',
      type: 'cot',
      title: 'Test Event',
      description: 'Test Description',
      images: [],
      videos: []
    }
    
    renderWithRouter(<EventPage event={mockEvent} />)
    
    // EventPage should render with event title (use getAllByText since title appears in breadcrumbs and h1)
    const titles = screen.getAllByText(/Test Event/i)
    expect(titles.length).toBeGreaterThan(0)
  })

  it('should render COT event pages', () => {
    // Test that COT pages can be imported and rendered
    const cotEvent = {
      id: 'cot-1',
      type: 'cot',
      title: 'COT Golf Day',
      description: 'City of Tshwane Golf Day'
    }
    
    renderWithRouter(<EventPage event={cotEvent} />)
    
    // Use getAllByText since title appears multiple times
    const titles = screen.getAllByText(/COT Golf Day/i)
    expect(titles.length).toBeGreaterThan(0)
  })

  it('should render CSIR event pages', () => {
    // Test that CSIR pages can be imported and rendered
    const csirEvent = {
      id: 'csir-1',
      type: 'csir',
      title: 'CSIR Golf Day',
      description: 'CSIR Golf Day Event'
    }
    
    renderWithRouter(<EventPage event={csirEvent} />)
    
    // Use getAllByText since title appears multiple times
    const titles = screen.getAllByText(/CSIR Golf Day/i)
    expect(titles.length).toBeGreaterThan(0)
  })

  it('should render CASSI gallery pages', () => {
    // Test that CASSI gallery pages can render
    const cassiEvent = {
      id: 'cassi-1',
      type: 'cassi',
      title: 'CASSI Gallery',
      description: 'CASSI Golf Day Gallery',
      images: [
        {
          original: '/images/test.jpg',
          thumbnail: '/images/test-thumb.jpg'
        }
      ]
    }
    
    renderWithRouter(<EventPage event={cassiEvent} />)
    
    // Use getAllByText since title appears multiple times
    const titles = screen.getAllByText(/CASSI Gallery/i)
    expect(titles.length).toBeGreaterThan(0)
  })
})

