import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { submitContactForm } from '@/api/contact'
import SEO from '@/components/SEO'
import Spinner from '@/components/Spinner'
import { trackFormSubmission } from '@/utils/analytics'
import Hero from '@/components/Hero'
import SectionHeader from '@/components/SectionHeader'
import ContactInfoCard from '@/components/ContactInfoCard'
import { BrandInput, BrandTextarea } from '@/components/form'

// Yup validation schema
const contactFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const result = await submitContactForm(data)
      if (result.success) {
        trackFormSubmission('contact')
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you for contacting us! We will be in touch shortly.',
        })
        reset()
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'There was an error submitting your message. Please try again.',
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'There was an error submitting your message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Black Eagle Group Holdings. Contact us for stakeholder relations, golf events management, and sponsorship services."
        path="/contact"
        image="/images/bg_5.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]}
      />
      
      {/* Hero Section */}
      <Hero 
        title="Contact Us"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]}
      />

      {/* Contact Info Card Section */}
      <section className="contact-info-section">
        <div className="container">
          <ContactInfoCard />
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <SectionHeader
            label="Send us a Message"
            title="Have a Question? We'd Love to Hear From You"
            align="center"
          />
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
              {/* Left Column - Name, Email, Subject */}
              <div className="contact-form-left">
                <BrandInput
                  label="Name"
                  placeholder="Enter your name"
                  error={errors.name?.message}
                  {...register('name')}
                />
                
                <BrandInput
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  error={errors.email?.message}
                  {...register('email')}
                />
                
                <BrandInput
                  label="Subject"
                  placeholder="Enter subject"
                  error={errors.subject?.message}
                  {...register('subject')}
                />
              </div>

              {/* Right Column - Message */}
              <div className="contact-form-right">
                <BrandTextarea
                  label="Message"
                  placeholder="Your message..."
                  rows={8}
                  error={errors.message?.message}
                  {...register('message')}
                />
              </div>

              {/* Actions Row */}
              <div className="contact-form-actions">
                {/* Alert Messages */}
                {submitStatus.type === 'success' && (
                  <div className="alert-success" role="alert">
                    {submitStatus.message}
                  </div>
                )}
                {submitStatus.type === 'error' && (
                  <div className="alert-error" role="alert">
                    {submitStatus.message}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="btn-gold"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" label="Sending message" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="map-section">
        <div className="container">
          <SectionHeader
            label="Our Location"
            title="Find Us Here"
            align="center"
          />
          
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114958.5672708051!2d28.160609289062467!3d-25.788551665522654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95677baa001287%3A0xe0ef9127f70cfcd1!2s640%20Wainwright%20St%2C%20Moreleta%20Park%2C%20Pretoria%2C%200044!5e0!3m2!1sen!2sza!4v1741086116569!5m2!1sen!2sza"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Black Eagle Group Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Compliance Section (CTA Style) */}
      <section className="contact-compliance-section">
        <div className="container">
          <span className="subheading">Compliance</span>
          <h2>Our Regulatory Information</h2>
          <p>
            PSIRA No: 3031824<br />
            Co Reg No: 2012/086451/07
          </p>
        </div>
      </section>
    </>
  )
}

export default Contact
