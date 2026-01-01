import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Contact from '../pages/Contact'
import * as contactAPI from '../api/contact'

// Mock the API module
vi.mock('../api/contact', () => ({
  submitContactForm: vi.fn(),
  validateFormData: vi.fn(),
}))

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Contact Form', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Form Rendering', () => {
    it('should render contact form correctly', () => {
      renderWithRouter(<Contact />)
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })
  })

  describe('Form Validation', () => {
    it('should validate required fields', async () => {
      const user = userEvent.setup()
      renderWithRouter(<Contact />)
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      // Wait for validation errors to appear
      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      })
    })

    it('should validate email format', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockClear()
      
      renderWithRouter(<Contact />)
      
      // Fill in required fields first
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'invalid-email')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'Test message content')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      // Wait a bit for validation to process
      await waitFor(() => {
        // Form should not submit with invalid email - API should not be called
        expect(contactAPI.submitContactForm).not.toHaveBeenCalled()
      }, { timeout: 2000 })
    })
  })

  describe('Form Submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockResolvedValue({
        success: true,
        message: 'Form submitted successfully',
      })
      
      renderWithRouter(<Contact />)
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(contactAPI.submitContactForm).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          subject: 'Test Subject',
          message: 'Test message',
        })
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle submission errors', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockRejectedValue(new Error('Network error'))
      
      renderWithRouter(<Contact />)
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/error|failed/i)).toBeInTheDocument()
      })
    })
  })

  describe('Success Message', () => {
    it('should display success message after submission', async () => {
      const user = userEvent.setup()
      contactAPI.submitContactForm.mockResolvedValue({
        success: true,
        message: 'Form submitted successfully',
      })
      
      renderWithRouter(<Contact />)
      
      await user.type(screen.getByLabelText(/name/i), 'John Doe')
      await user.type(screen.getByLabelText(/email/i), 'john@example.com')
      await user.type(screen.getByLabelText(/subject/i), 'Test Subject')
      await user.type(screen.getByLabelText(/message/i), 'Test message')
      
      const submitButton = screen.getByRole('button', { name: /send message/i })
      await user.click(submitButton)
      
      await waitFor(() => {
        expect(screen.getByText(/success|thank you/i)).toBeInTheDocument()
      })
    })
  })
})

