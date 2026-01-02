/**
 * Contact Form API Abstraction
 * 
 * This module provides an abstraction layer for contact form submissions,
 * allowing easy switching between PHP and Node.js backends via configuration.
 */

/**
 * Configuration for backend endpoints
 * Can be overridden via environment variables
 */
const getBackendConfig = () => {
  // Default to PHP backend
  const backendType = import.meta.env.VITE_CONTACT_BACKEND || 'php'
  
  if (backendType === 'php') {
    return {
      type: 'php',
      endpoint: import.meta.env.VITE_PHP_ENDPOINT || '/send_mail.php',
    }
  } else if (backendType === 'node') {
    return {
      type: 'node',
      endpoint: import.meta.env.VITE_NODE_ENDPOINT || '/api/contact',
    }
  }
  
  throw new Error(`Unsupported backend type: ${backendType}`)
}

/**
 * Formats form data for PHP endpoint (application/x-www-form-urlencoded)
 */
const formatFormDataForPHP = (data) => {
  const params = new URLSearchParams()
  
  // Add all form fields
  if (data.name) params.append('name', data.name)
  if (data.email) params.append('email', data.email)
  // Map both 'cell' and 'phone' to 'cell' for the PHP script
  if (data.cell || data.phone) params.append('cell', data.cell || data.phone)
  if (data.subject) params.append('subject', data.subject)
  if (data.message) params.append('message', data.message)
  
  return params.toString()
}

/**
 * Formats form data for Node.js endpoint (JSON)
 */
const formatFormDataForNode = (data) => {
  return JSON.stringify({
    name: data.name || '',
    email: data.email || '',
    cell: data.cell || '',
    subject: data.subject || '',
    message: data.message || '',
  })
}

/**
 * Submits contact form to the configured backend
 * 
 * @param {Object} formData - Form data object with fields: name, email, cell, subject, message
 * @returns {Promise<Object>} Response object with success status and message
 * @throws {Error} If submission fails
 */
export const submitContactForm = async (formData) => {
  const config = getBackendConfig()
  
  try {
    let response
    
    if (config.type === 'php') {
      // PHP endpoint expects form-urlencoded data
      const body = formatFormDataForPHP(formData)
      
      response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body,
      })
    } else if (config.type === 'node') {
      // Node.js endpoint expects JSON data
      const body = formatFormDataForNode(formData)
      
      response = await fetch(config.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      })
    } else {
      throw new Error(`Unsupported backend type: ${config.type}`)
    }
    
    // Handle response
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Form submission failed: ${response.status} ${response.statusText}. ${errorText}`
      )
    }
    
    // PHP backend redirects, so we check for redirect or success
    // Node.js backend should return JSON
    if (config.type === 'node') {
      const data = await response.json()
      return {
        success: true,
        message: data.message || 'Form submitted successfully',
        data: data,
      }
    } else {
      // PHP backend redirects, so if we get here, it's likely a success
      // In a real scenario, PHP would redirect, but for API abstraction,
      // we'll treat a 200/302 as success
      return {
        success: true,
        message: 'Form submitted successfully',
      }
    }
  } catch (error) {
    // Handle network errors and other exceptions
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server')
    }
    throw error
  }
}

/**
 * Validates form data before submission
 * 
 * @param {Object} formData - Form data to validate
 * @returns {Object} Validation result with isValid and errors
 */
export const validateFormData = (formData) => {
  const errors = {}
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required'
  }
  
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required'
  } else {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
  }
  
  if (!formData.subject || formData.subject.trim() === '') {
    errors.subject = 'Subject is required'
  }
  
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'Message is required'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

