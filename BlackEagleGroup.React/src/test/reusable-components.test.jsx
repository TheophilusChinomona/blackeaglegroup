import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import ServiceCard from '../components/ServiceCard'
import ClientCard from '../components/ClientCard'
import BlogPostCard from '../components/BlogPostCard'
import FormInput from '../components/FormInput'
import Button from '../components/Button'

// Helper to wrap components with Router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

// Helper to wrap FormInput with FormProvider
const FormWrapper = ({ children }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('Reusable Components', () => {
  describe('ServiceCard', () => {
    it('should render ServiceCard with image, title, and description', () => {
      renderWithRouter(
        <ServiceCard
          image="/images/image_16.jpg"
          title="Hygiene and Cleaning Services"
          description="Cleaning offices, shopping centres, warehouses"
        />
      )
      
      expect(screen.getByText('Hygiene and Cleaning Services')).toBeInTheDocument()
      expect(screen.getByText('Cleaning offices, shopping centres, warehouses')).toBeInTheDocument()
      const image = screen.getByRole('img', { name: /hygiene and cleaning services/i })
      expect(image).toBeInTheDocument()
    })
  })

  describe('ClientCard', () => {
    it('should render ClientCard with name, location, and buttons', () => {
      renderWithRouter(
        <ClientCard
          name="Eskom"
          location="South Africa"
          referenceLink="mailto:info@eskom.co.za"
          phoneNumber="0123585520"
        />
      )
      
      expect(screen.getByText('Eskom')).toBeInTheDocument()
      expect(screen.getByText('South Africa')).toBeInTheDocument()
      expect(screen.getByText('Reference')).toBeInTheDocument()
      expect(screen.getByText('Call')).toBeInTheDocument()
    })
  })

  describe('BlogPostCard', () => {
    it('should render BlogPostCard with image, title, and excerpt', () => {
      renderWithRouter(
        <BlogPostCard
          image="/images/CSIR.jpg"
          title="CSIR's CHARITY GOLF EVENT"
          excerpt="The CSIR Charity Golf Day aims to enhance and reinforce the learning experience"
          slug="csir-charity-golf-event"
        />
      )
      
      expect(screen.getByText("CSIR's CHARITY GOLF EVENT")).toBeInTheDocument()
      expect(screen.getByText(/The CSIR Charity Golf Day aims/i)).toBeInTheDocument()
      expect(screen.getByText(/read more/i)).toBeInTheDocument()
    })
  })

  describe('FormInput', () => {
    it('should render FormInput with label', () => {
      renderWithRouter(
        <FormWrapper>
          <FormInput
            name="email"
            label="Email Address"
            type="email"
          />
        </FormWrapper>
      )
      
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument()
    })
  })

  describe('Button', () => {
    it('should render Button component', () => {
      renderWithRouter(
        <Button variant="primary">
          Click Me
        </Button>
      )
      
      expect(screen.getByText('Click Me')).toBeInTheDocument()
    })
  })
})

