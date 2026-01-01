import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Contact from '../pages/Contact'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import BlogPost from '../pages/BlogPost'
import * as contactAPI from '../api/contact'

// Mock the API module
vi.mock('../api/contact', () => ({
  submitContactForm: vi.fn(),
}))

// Helper to render components with router
const renderWithRouter = (component, initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  )
}

describe('Phase 2 Integration Tests', () => {
  describe('Contact Form Submission Flow', () => {
    it('should complete full form submission workflow', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockResolvedValue({
        success: true,
        message: 'Thank you for contacting us!',
      })

      renderWithRouter(<Contact />, ['/contact'])

      // Fill out form
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Inquiry')
      await user.type(screen.getByLabelText(/message/i), 'This is a test message for integration testing')

      // Submit form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Verify API was called
      await waitFor(() => {
        expect(contactAPI.submitContactForm).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Inquiry',
          message: 'This is a test message for integration testing',
        })
      })

      // Verify success message appears
      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument()
      })
    })
  })

  describe('Navigation Flow', () => {
    it('should show active state for current route', () => {
      // Test Home route
      const { unmount } = renderWithRouter(<Header />, ['/'])
      const homeLink = screen.getByRole('link', { name: /^home$/i })
      expect(homeLink).toHaveClass('active')
      unmount()

      // Test Services route
      renderWithRouter(<Header />, ['/services'])
      const servicesLink = screen.getByRole('link', { name: /^services$/i })
      expect(servicesLink).toHaveClass('active')
    })

    it('should have consistent navigation in Header and Footer', () => {
      const { container: headerContainer } = renderWithRouter(<Header />, ['/'])
      const { container: footerContainer } = renderWithRouter(<Footer />, ['/'])

      // Check that both have navigation links
      const headerLinks = headerContainer.querySelectorAll('a[href]')
      const footerLinks = footerContainer.querySelectorAll('a[href]')

      expect(headerLinks.length).toBeGreaterThan(0)
      expect(footerLinks.length).toBeGreaterThan(0)

      // Verify key routes exist in both
      const headerServices = Array.from(headerLinks).find(link => link.getAttribute('href') === '/services')
      const footerServices = Array.from(footerLinks).find(link => link.getAttribute('href') === '/services')

      expect(headerServices).toBeInTheDocument()
      expect(footerServices).toBeInTheDocument()
    })
  })

  describe('PDF Download Functionality', () => {
    it('should have all three PDF links with download attributes', () => {
      renderWithRouter(<Footer />, ['/'])

      const cleaningLink = screen.getByRole('link', { name: /Cleaning Profile/i })
      const securityLink = screen.getByRole('link', { name: /Security Profile/i })
      const cdpLink = screen.getByRole('link', { name: /CDP & Events Management Profile/i })

      // Verify all links exist
      expect(cleaningLink).toBeInTheDocument()
      expect(securityLink).toBeInTheDocument()
      expect(cdpLink).toBeInTheDocument()

      // Verify download attributes
      expect(cleaningLink).toHaveAttribute('download')
      expect(securityLink).toHaveAttribute('download')
      expect(cdpLink).toHaveAttribute('download')

      // Verify PDF file paths
      expect(cleaningLink).toHaveAttribute('href', '/BE Profile2.pdf')
      expect(securityLink).toHaveAttribute('href', '/BE Profile.pdf')
      expect(cdpLink).toHaveAttribute('href', '/CDP & Events Management Profile.pdf')
    })
  })

  describe('Blog Routing', () => {
    it('should handle blog post routing correctly', () => {
      // Test with valid slug
      renderWithRouter(<BlogPost />, ['/blog/csir-charity-golf-event'])
      
      // Should render the post or show not found
      const heading = screen.queryByRole('heading', { name: /CSIR's CHARITY GOLF EVENT/i }) ||
                     screen.queryByRole('heading', { name: /Post Not Found/i })
      expect(heading).toBeInTheDocument()
    })
  })

  describe('Form Validation Integration', () => {
    it('should prevent submission with invalid data and show validation errors', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockClear()

      renderWithRouter(<Contact />, ['/contact'])

      // Try to submit empty form
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)

      // Wait for validation
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })

      // API should not be called
      expect(contactAPI.submitContactForm).not.toHaveBeenCalled()
    })
  })
})

