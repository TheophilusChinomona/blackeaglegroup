import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { submitContactForm } from '@/api/contact'
import SEO from '@/components/SEO'
import { trackFormSubmission } from '@/utils/analytics'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { TextArea } from '@/components/base/textarea/textarea'
import { Checkbox } from '@/components/base/checkbox/checkbox'
import { Form } from '@/components/base/form/form'

// Yup validation schema
const contactFormSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  phone: yup.string().nullable(),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  privacy: yup.boolean().oneOf([true], 'Please agree to the privacy policy'),
})

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' })

  const { 
    control,
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      phone: '',
      message: '',
      privacy: false,
    },
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        subject: data.subject,
        message: data.message,
        cell: data.phone,
      }

      const result = await submitContactForm(payload)
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

      <main className="bg-brand-cream">
        {/* Contact simple form (UntitledUI) */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-primary md:text-base">Contact us</span>
              <h1 className="mt-3 text-3xl font-semibold text-brand-dark md:text-4xl">Let&apos;s get in touch</h1>
              <p className="mt-4 max-w-2xl text-lg text-brand-muted md:mt-6">
                We respond within 24 hours. Share a bit about your enquiry and we&apos;ll connect you with the right Black Eagle Group team member.
              </p>
            </div>

            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-8">
                <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          label="First name"
                          placeholder="First name"
                          isRequired
                          size="md"
                          isInvalid={!!fieldState.error}
                          hint={fieldState.error?.message}
                          wrapperClassName="bg-white ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-brand-primary"
                          inputClassName="text-slate-900 placeholder:text-slate-500"
                        />
                      )}
                    />
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          value={field.value}
                          onChange={field.onChange}
                          label="Last name"
                          placeholder="Last name"
                          isRequired
                          size="md"
                          isInvalid={!!fieldState.error}
                          hint={fieldState.error?.message}
                          wrapperClassName="bg-white ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-brand-primary"
                          inputClassName="text-slate-900 placeholder:text-slate-500"
                        />
                      )}
                    />
                  </div>

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                        isRequired
                        size="md"
                        isInvalid={!!fieldState.error}
                        hint={fieldState.error?.message}
                        wrapperClassName="bg-white ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-brand-primary"
                        inputClassName="text-slate-900 placeholder:text-slate-500"
                      />
                    )}
                  />

                  <Controller
                    name="subject"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        label="Subject"
                        placeholder="How can we help?"
                        isRequired
                        size="md"
                        isInvalid={!!fieldState.error}
                        hint={fieldState.error?.message}
                        wrapperClassName="bg-white ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-brand-primary"
                        inputClassName="text-slate-900 placeholder:text-slate-500"
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        label="Phone number"
                        placeholder="+27 12 883 5609"
                        size="md"
                        isInvalid={!!fieldState.error}
                        hint={fieldState.error?.message}
                        wrapperClassName="bg-white ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-brand-primary"
                        inputClassName="text-slate-900 placeholder:text-slate-500"
                      />
                    )}
                  />

                  <Controller
                    name="message"
                    control={control}
                    render={({ field, fieldState }) => (
                      <TextArea
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        label="Message"
                        placeholder="Tell us about your needs"
                        rows={5}
                        isRequired
                        isInvalid={!!fieldState.error}
                        hint={fieldState.error?.message}
                        textAreaClassName="bg-white ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary text-slate-900 placeholder:text-slate-500"
                      />
                    )}
                  />

                  <Controller
                    name="privacy"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div className="space-y-1">
                        <Checkbox
                          isSelected={field.value}
                          onChange={field.onChange}
                          size="md"
                          label="You agree to our privacy policy."
                        />
                        {fieldState.error && (
                          <p className="text-sm text-red-600">{fieldState.error.message}</p>
                        )}
                      </div>
                    )}
                  />

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

                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-brand-muted">
                      PSIRA No: 3031824 • Co Reg No: 2012/086451/07
                    </p>
                    <Button
                      type="submit"
                      size="lg"
                      color="primary"
                      className="w-full justify-center bg-brand-primary text-white shadow-lg ring-0 hover:bg-brand-primary-dark md:w-auto"
                      isLoading={isSubmitting}
                      isDisabled={isSubmitting}
                      showTextWhileLoading
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </Button>
                  </div>
                </Form>
              </div>

              <div className="space-y-5 rounded-2xl border border-slate-200 bg-brand-cream/60 p-6 shadow-card md:p-8">
                <h2 className="text-2xl font-semibold text-brand-dark">Contact details</h2>
                <div className="space-y-4 text-brand-dark">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Phone</p>
                    <p className="text-lg font-semibold text-brand-dark">012 883 5609</p>
                    <p className="text-sm text-brand-muted">After hours: 082 624 9680</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Email</p>
                    <p className="text-lg font-semibold text-brand-dark">info@blackeaglegroup.co.za</p>
                    <p className="text-sm text-brand-muted">Dedicated inbox for contact form responses</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">Office</p>
                    <p className="text-lg font-semibold text-brand-dark">
                      640 Wainwright Street, Moreleta Park, Pretoria, 0044
                    </p>
                    <p className="text-sm text-brand-muted">By appointment only.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location section */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-primary">Visit Us</p>
                <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">Our Pretoria Office</h2>
                <p className="text-base text-slate-600">
                  Meet the team in person—let us know ahead of time so we can tailor the visit to your agenda.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-primary shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.25l7.5 6.75v12h-5.25v-6h-4.5v6H4.5v-12L12 2.25z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">640 Wainwright St, Moreleta Park, Pretoria, 0044</p>
                    <p className="text-sm text-slate-600">Open weekdays 08:00 – 17:00</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-primary shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 8.25l-9 5.25-9-5.25M3 6.75l9 5.25 9-5.25M4.5 18.75h15M4.5 15.75h15" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">info@blackeaglegroup.co.za</p>
                    <p className="text-sm text-slate-600">Dedicated inbox for contact form responses</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-800">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-primary shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 6.75A3 3 0 015.25 3.75h1.05c.43 0 .82.27.95.67l1.23 3.7a1 1 0 01-.24 1.02l-1.5 1.5a10.5 10.5 0 005.62 5.62l1.5-1.5a1 1 0 011.02-.24l3.7 1.23c.4.13.67.52.67.95v1.05a3 3 0 01-3 3h-.5C7.95 20.83 3.17 16.05 3.17 10.25v-.5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">012 883 5609</p>
                    <p className="text-sm text-slate-600">After hours: 082 624 9680</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2 text-xs font-semibold text-brand-primary">
                  PSIRA No: 3031824
                </span>
                <span className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-2 text-xs font-semibold text-brand-dark">
                  Co Reg No: 2012/086451/07
                </span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[22px] shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114958.5672708051!2d28.160609289062467!3d-25.788551665522654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95677baa001287%3A0xe0ef9127f70cfcd1!2s640%20Wainwright%20St%2C%20Moreleta%20Park%2C%200044!5e0!3m2!1sen!2sza!4v1741086116569!5m2!1sen!2sza"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Black Eagle Group Location"
                className="h-[360px] w-full md:h-[460px]"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Compliance CTA */}
        <section className="border-t border-white/10 bg-gradient-to-r from-brand-dark to-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-slate-50 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Compliance</p>
              <h3 className="text-2xl font-semibold text-white">Licensed, regulated, and ready to serve.</h3>
              <p className="text-sm text-slate-200">
                PSIRA No: 3031824 • Co Reg No: 2012/086451/07
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
                Stakeholder ready
              </span>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white ring-1 ring-white/20">
                Security cleared
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Contact
