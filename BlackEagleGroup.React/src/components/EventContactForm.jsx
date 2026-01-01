import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

/**
 * EventContactForm Component
 * Dynamic contact form based on JSON configuration
 * 
 * @param {Object} props
 * @param {Array} props.fields - Array of form field configurations
 * @param {string} props.endpoint - API endpoint for form submission
 * @param {string} props.eventName - Name of the event (for email subject)
 */
const EventContactForm = ({ fields = [], endpoint = '/api/contact', eventName = '' }) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`
      }
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Please enter a valid email address'
        }
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventName,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({})
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus(null)
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!fields || fields.length === 0) {
    return null
  }

  return (
    <div className="event-contact-form-container">
      <Container>
        <Row>
          <Col lg={12}>
            <h1 className="display-5 mb-4">Contact For Any Queries</h1>
            <Form onSubmit={handleSubmit}>
              {submitStatus === 'success' && (
                <Alert variant="success" className="mb-4">
                  Thank you! Your message has been sent successfully.
                </Alert>
              )}
              {submitStatus === 'error' && (
                <Alert variant="danger" className="mb-4">
                  Sorry, there was an error sending your message. Please try again or contact us directly.
                </Alert>
              )}

              <Row>
                {fields.map((field, index) => (
                  <Col
                    key={field.name}
                    md={field.type === 'textarea' ? 12 : 6}
                    className={index === 0 && fields.length > 2 ? 'mb-3' : ''}
                  >
                    <Form.Group className="mb-3">
                      {field.type === 'textarea' ? (
                        <>
                          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                          <Form.Control
                            as="textarea"
                            id={field.name}
                            name={field.name}
                            rows={5}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            isInvalid={!!errors[field.name]}
                            required={field.required}
                            placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
                          />
                        </>
                      ) : (
                        <>
                          <Form.Label htmlFor={field.name}>{field.label}</Form.Label>
                          <Form.Control
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            isInvalid={!!errors[field.name]}
                            required={field.required}
                            placeholder={field.placeholder || `Enter your ${field.label.toLowerCase()}`}
                          />
                        </>
                      )}
                      {errors[field.name] && (
                        <Form.Control.Feedback type="invalid">
                          {errors[field.name]}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                ))}
              </Row>

              <Row>
                <Col md={12}>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-100"
                  >
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EventContactForm

