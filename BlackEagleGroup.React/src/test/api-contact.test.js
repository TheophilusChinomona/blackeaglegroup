import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitContactForm } from '../api/contact'

// Mock fetch globally
global.fetch = vi.fn()

describe('Contact API Abstraction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('API Module Exports', () => {
    it('should export submitContactForm function', () => {
      expect(typeof submitContactForm).toBe('function')
    })
  })

  describe('PHP Endpoint Calling', () => {
    it('should call PHP endpoint with correct form data', async () => {
      // Mock successful response (PHP redirects, so we'll simulate a response)
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => '',
      })

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        cell: '1234567890',
        subject: 'Test Subject',
        message: 'Test message',
      }

      await submitContactForm(formData)

      expect(global.fetch).toHaveBeenCalledTimes(1)
      const callArgs = global.fetch.mock.calls[0]
      expect(callArgs[0]).toContain('send_mail.php')
      expect(callArgs[1].method).toBe('POST')
      expect(callArgs[1].headers['Content-Type']).toBe('application/x-www-form-urlencoded')
    })

    it('should handle error responses correctly', async () => {
      // Mock network error
      global.fetch.mockRejectedValueOnce(new Error('Network error'))

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      }

      await expect(submitContactForm(formData)).rejects.toThrow('Network error')
    })
  })

  describe('Error Handling', () => {
    it('should handle HTTP error status codes', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Server error',
      })

      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Test message',
      }

      await expect(submitContactForm(formData)).rejects.toThrow()
    })
  })
})

