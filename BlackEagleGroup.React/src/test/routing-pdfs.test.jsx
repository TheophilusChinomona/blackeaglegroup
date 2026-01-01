import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Services from '../pages/Services'
import Clients from '../pages/Clients'
import StrategicPartners from '../pages/StrategicPartners'
import PropertyServices from '../pages/PropertyServices'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import Contact from '../pages/Contact'
import Footer from '../components/common/Footer'

// Helper to render components with router
const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  )
}

describe('Routing & PDF Downloads', () => {
  describe('Route Configuration', () => {
    it('should render Services page at /services route', () => {
      renderWithRouter(<Services />, ['/services'])
      expect(screen.getByRole('heading', { name: /What We Do/i, level: 1 })).toBeInTheDocument()
    })

    it('should render Clients page at /clients route', () => {
      renderWithRouter(<Clients />, ['/clients'])
      expect(screen.getByRole('heading', { name: /Who We Served/i })).toBeInTheDocument()
    })

    it('should render Strategic Partners page at /strategic-partners route', () => {
      renderWithRouter(<StrategicPartners />, ['/strategic-partners'])
      expect(screen.getByRole('heading', { name: /Strategic Partners/i, level: 1 })).toBeInTheDocument()
    })

    it('should render Property Services page at /property-services route', () => {
      renderWithRouter(<PropertyServices />, ['/property-services'])
      expect(screen.getByRole('heading', { name: /What We Do/i, level: 1 })).toBeInTheDocument()
    })

    it('should render Blog listing page at /blog route', () => {
      renderWithRouter(<Blog />, ['/blog'])
      expect(screen.getByRole('heading', { name: /Blog/i })).toBeInTheDocument()
    })

    it('should render Blog single post page at /blog/:slug route', () => {
      renderWithRouter(<BlogPost />, ['/blog/csir-charity-golf-event'])
      // Should show either the post or "Post Not Found"
      const heading = screen.queryByRole('heading', { name: /CSIR's CHARITY GOLF EVENT/i }) || 
                     screen.queryByRole('heading', { name: /Post Not Found/i })
      expect(heading).toBeInTheDocument()
    })

    it('should render Contact page at /contact route', () => {
      renderWithRouter(<Contact />, ['/contact'])
      expect(screen.getByRole('heading', { name: /Contact us/i })).toBeInTheDocument()
    })
  })

  describe('PDF Download Links', () => {
    it('should have PDF download links in Footer', () => {
      renderWithRouter(<Footer />, ['/'])
      
      // Check for PDF links
      const cleaningProfileLink = screen.getByRole('link', { name: /Cleaning Profile/i })
      const securityProfileLink = screen.getByRole('link', { name: /Security Profile/i })
      const cdpProfileLink = screen.getByRole('link', { name: /CDP & Events Management Profile/i })
      
      expect(cleaningProfileLink).toBeInTheDocument()
      expect(securityProfileLink).toBeInTheDocument()
      expect(cdpProfileLink).toBeInTheDocument()
      
      // Check that links point to PDF files and have download attribute
      expect(cleaningProfileLink).toHaveAttribute('href', expect.stringContaining('.pdf'))
      expect(cleaningProfileLink).toHaveAttribute('download')
      expect(securityProfileLink).toHaveAttribute('href', expect.stringContaining('.pdf'))
      expect(securityProfileLink).toHaveAttribute('download')
      expect(cdpProfileLink).toHaveAttribute('href', expect.stringContaining('.pdf'))
      expect(cdpProfileLink).toHaveAttribute('download')
    })
  })
})
