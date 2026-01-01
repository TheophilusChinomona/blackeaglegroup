import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from '../App'

// Helper to render App with router
const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  )
}

describe('Navigation Flow Integration', () => {
  it('should navigate from Home to About page', async () => {
    const user = userEvent.setup()
    renderApp('/')
    
    // Wait for Home page to load
    await waitFor(() => {
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
    })
    
    // Find and click About link
    const aboutLink = screen.getByRole('link', { name: /About/i })
    await user.click(aboutLink)
    
    // Verify About page content appears
    await waitFor(() => {
      expect(screen.getByText(/Get To Know Us|Company Overview/i)).toBeInTheDocument()
    })
  })

  it('should navigate from About to Home page', async () => {
    const user = userEvent.setup()
    renderApp('/about')
    
    // Wait for About page to load
    await waitFor(() => {
      expect(screen.getByText(/Get To Know Us|Company Overview/i)).toBeInTheDocument()
    })
    
    // Find and click Home link
    const homeLink = screen.getByRole('link', { name: /Home/i })
    await user.click(homeLink)
    
    // Verify Home page content appears
    await waitFor(() => {
      expect(screen.getByText(/Welcome/i)).toBeInTheDocument()
    })
  })
})

describe('Responsive Menu Behavior', () => {
  it('should have mobile menu toggle button', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for navbar toggle button (hamburger menu)
    const toggleButton = screen.getByRole('button', { name: /Menu/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('should show navigation links in header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for multiple navigation links
    const navLinks = screen.getAllByRole('link')
    const linkTexts = navLinks.map(link => link.textContent)
    
    // Should have Home and About links at minimum
    expect(linkTexts.some(text => text?.includes('Home'))).toBe(true)
    expect(linkTexts.some(text => text?.includes('About'))).toBe(true)
  })
})

describe('Asset Loading in Components', () => {
  it('should load logo image in Header', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    const logo = screen.getByAltText(/Black Eagle Group Logo|website logo/i)
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', expect.stringContaining('Website logo'))
  })

  it('should have footer with contact information', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for footer content
    expect(screen.getByText(/Black Eagle Group Holdings/i)).toBeInTheDocument()
    expect(screen.getByText(/Quick Contacts/i)).toBeInTheDocument()
  })
})

