import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Services from '../pages/Services'
import Clients from '../pages/Clients'
import StrategicPartners from '../pages/StrategicPartners'
import PropertyServices from '../pages/PropertyServices'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import Contact from '../pages/Contact'

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Page Components', () => {
  describe('Services Page', () => {
    it('should render Services page', () => {
      renderWithRouter(<Services />)
      const headings = screen.getAllByRole('heading', { name: /What We Do/i })
      expect(headings.length).toBeGreaterThan(0)
      const servicesTexts = screen.getAllByText(/Services/i)
      expect(servicesTexts.length).toBeGreaterThan(0)
    })
  })

  describe('Clients Page', () => {
    it('should render Clients page', () => {
      renderWithRouter(<Clients />)
      expect(screen.getByRole('heading', { name: /Who We Served/i })).toBeInTheDocument()
    })
  })

  describe('Strategic Partners Page', () => {
    it('should render Strategic Partners page', () => {
      renderWithRouter(<StrategicPartners />)
      const headings = screen.getAllByRole('heading', { name: /Strategic Partners/i })
      expect(headings.length).toBeGreaterThan(0)
    })
  })

  describe('Property Services Page', () => {
    it('should render Property Services page', () => {
      renderWithRouter(<PropertyServices />)
      const headings = screen.getAllByRole('heading', { name: /What We Do/i })
      expect(headings.length).toBeGreaterThan(0)
      expect(screen.getByText(/Our Services Property/i)).toBeInTheDocument()
    })
  })

  describe('Blog Listing Page', () => {
    it('should render Blog listing page', () => {
      renderWithRouter(<Blog />)
      expect(screen.getByRole('heading', { name: /Blog/i })).toBeInTheDocument()
    })
  })

  describe('Blog Single Post Page', () => {
    it('should render Blog single post page', () => {
      // Mock useParams to return a slug
      renderWithRouter(<BlogPost />)
      // The page should render even if post not found
      expect(screen.getByText(/Post Not Found/i)).toBeInTheDocument()
      expect(screen.getByText(/Back to Blog/i)).toBeInTheDocument()
    })
  })

  describe('Contact Page', () => {
    it('should render Contact page', () => {
      renderWithRouter(<Contact />)
      expect(screen.getByRole('heading', { name: /Contact Us/i })).toBeInTheDocument()
    })
  })
})

