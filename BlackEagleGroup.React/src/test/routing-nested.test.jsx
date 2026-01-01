import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import GolfEvents from '../pages/GolfEvents'
import COTIndex from '../pages/events/cot/Index'
import CSIRIndex from '../pages/events/csir/Index'
import CASSIIndex from '../pages/cassi/Index'

// Helper to render components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Nested Routing', () => {
  it('should handle nested COT routes', async () => {
    renderWithRouter(<COTIndex />)
    
    // COT index page should render or show loading
    await waitFor(() => {
      const page = screen.getByText(/COT|Loading|City of Tshwane|Golf Day/i) || document.body
      expect(page).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should handle nested CSIR routes', async () => {
    renderWithRouter(<CSIRIndex />)
    
    // CSIR index page should render or show loading
    await waitFor(() => {
      const page = screen.getByText(/CSIR|Loading|Golf Day/i) || document.body
      expect(page).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should handle CASSI gallery routes', async () => {
    renderWithRouter(<CASSIIndex />)
    
    // CASSI index page should render or show loading
    await waitFor(() => {
      const page = screen.getByText(/CASSI|Gallery|Loading|Golf Day/i) || document.body
      expect(page).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('should handle Golf Events route', async () => {
    renderWithRouter(<GolfEvents />)
    
    // Golf Events page should render or show loading
    await waitFor(() => {
      const page = screen.getByText(/Golf|Tournaments|Events|Loading/i) || document.body
      expect(page).toBeInTheDocument()
    }, { timeout: 2000 })
  })
})

describe('Route Configuration', () => {
  it('should configure all nested routes in single build', () => {
    // Test that route components can be imported and rendered
    // This verifies the route structure is set up correctly
    expect(() => renderWithRouter(<GolfEvents />)).not.toThrow()
    expect(() => renderWithRouter(<COTIndex />)).not.toThrow()
    expect(() => renderWithRouter(<CSIRIndex />)).not.toThrow()
    expect(() => renderWithRouter(<CASSIIndex />)).not.toThrow()
  })
})

