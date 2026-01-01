import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { submitContactForm } from '@/api/contact'

// Validation schema for event registration
const eventRegistrationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  phone: yup.string(),
  message: yup.string().required('Please tell us about your interest in this event'),
})

/**
 * EventContactModal Component
 * Contact form modal for event pages using shadcn/ui Dialog
 * Can be used for general contact or event registration
 * 
 * @param {Object} props
 * @param {boolean} props.open - Whether the modal is open
 * @param {Function} props.onOpenChange - Callback when open state changes
 * @param {Array} props.fields - Form field configuration (optional, uses default if not provided)
 * @param {string} props.endpoint - Form submission endpoint
 * @param {Object} props.event - Event object for registration context
 * @param {string} props.title - Modal title (optional)
 * @param {string} props.description - Modal description (optional)
 */
const EventContactModal = ({ 
  open, 
  onOpenChange, 
  fields = null, 
  endpoint = '/api/contact',
  event = null,
  title = null,
  description = null
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // Default fields for event registration if not provided
  const defaultFields = fields || [
    { name: 'name', type: 'text', label: 'Full Name', required: true },
    { name: 'email', type: 'email', label: 'Email Address', required: true },
    { name: 'phone', type: 'tel', label: 'Phone Number (Optional)', required: false },
    { name: 'message', type: 'textarea', label: 'Tell us about your interest', required: true, placeholder: 'Please let us know why you\'re interested in this event...' }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(eventRegistrationSchema),
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Include event context in form data
      const formData = {
        ...data,
        subject: event 
          ? `Event Registration: ${event.title}`
          : data.subject || 'Event Registration',
        eventName: event?.title || '',
        eventId: event?.id || '',
        eventType: event?.type || '',
      }

      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus('success')
        reset()
        // Auto-close after 2-3 seconds on success
        setTimeout(() => {
          onOpenChange(false)
          setSubmitStatus(null)
        }, 2500)
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

  const modalTitle = title || (event ? `Register Interest: ${event.title}` : 'Contact Us')
  const modalDescription = description || (event 
    ? 'Fill out the form below to register your interest in this event. We\'ll get back to you soon!'
    : 'Fill out the form below and we\'ll get back to you as soon as possible.')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {modalDescription}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {defaultFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    ...(field.type === 'email' && {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }),
                  })}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  className={errors[field.name] ? 'border-red-500' : ''}
                />
              ) : (
                <Input
                  id={field.name}
                  type={field.type || 'text'}
                  {...register(field.name, {
                    required: field.required ? `${field.label} is required` : false,
                    ...(field.type === 'email' && {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    }),
                  })}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  className={errors[field.name] ? 'border-red-500' : ''}
                />
              )}
              {errors[field.name] && (
                <p className="text-sm text-red-500">{errors[field.name].message}</p>
              )}
            </div>
          ))}

          {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              Thank you! Your message has been sent successfully.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              There was an error submitting your form. Please try again.
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EventContactModal

