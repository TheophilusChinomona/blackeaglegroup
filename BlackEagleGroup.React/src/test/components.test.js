import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Home from '../pages/Home'
import About from '../pages/About'

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Component Rendering', () => {
  it('should render Header component', () => {
    renderWithRouter(<Header />)
    const logo = screen.getByAltText(/website logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('should render Footer component', () => {
    renderWithRouter(<Footer />)
    const companyName = screen.getByText(/Black Eagle Group Holdings/i)
    expect(companyName).toBeInTheDocument()
  })

  it('should render Home page', () => {
    renderWithRouter(<Home />)
    const welcomeText = screen.getByText(/Welcome/i)
    expect(welcomeText).toBeInTheDocument()
  })

  it('should render About page', () => {
    renderWithRouter(<About />)
    const aboutText = screen.getByText(/Get To Know Us|Company Overview/i)
    expect(aboutText).toBeInTheDocument()
  })
})

describe('Navigation', () => {
  it('should have navigation links in Header', () => {
    renderWithRouter(<Header />)
    const homeLink = screen.getByText(/Home/i)
    const aboutLink = screen.getByText(/About/i)
    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })

  it('should have navigation links in Footer', () => {
    renderWithRouter(<Footer />)
    const navSection = screen.getByText(/Navigation/i)
    expect(navSection).toBeInTheDocument()
  })
})

describe('Routing', () => {
  it('should have React Router Link components', () => {
    renderWithRouter(<Header />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })
})

