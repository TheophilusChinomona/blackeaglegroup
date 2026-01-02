import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import EventSearch from '@/components/EventSearch'
import ServiceFilter from '@/components/ServiceFilter'
import SectionHeader from '@/components/SectionHeader'
import EventContactModal from '@/components/EventContactModal'
import { getAllServices, getServicesByCategory, getServiceCategories, getFeaturedServices } from '@/utils/serviceData'

import '@/styles/services.css'

const prefersReducedMotion = typeof window !== 'undefined'
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

const AnimatedServiceCard = ({ service, index, scrollYProgress, categoryColor, categoryLabel }) => {
  // Use row-based staggering: cards in the same row animate together
  // Assuming 3 columns on large screens, delay resets per row
  const rowIndex = Math.floor(index / 3)
  const delay = Math.min(0.05 + (rowIndex * 0.03), 0.2) // Cap delay at 0.2
  const cardOpacity = useTransform(
    scrollYProgress,
    [delay, delay + 0.15],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const cardY = useTransform(
    scrollYProgress,
    [delay, delay + 0.15],
    prefersReducedMotion ? [0, 0] : [20, 0]
  )

  return (
    <motion.div style={{ opacity: cardOpacity, y: cardY }} className="w-full h-full">
      <ServiceCard
        image={service.image}
        title={service.title}
        description={service.description}
        category={service.category}
        featured={service.featured || false}
        categoryColor={categoryColor}
        categoryLabel={categoryLabel}
      />
    </motion.div>
  )
}

const FeaturedServicesSection = ({ services, categories }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const headerOpacity = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const headerY = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [0, 0] : [20, 0]
  )

  if (services.length === 0) return null

  return (
    <section ref={sectionRef} className="services-featured-section">
      <Container>
        <motion.div style={{ opacity: headerOpacity, y: headerY }}>
          <SectionHeader
            label="Signature Services"
            title="Our Most Requested Solutions"
            description="A curated snapshot of the services clients rely on most for security, property, and business continuity."
            align="center"
          />
        </motion.div>
        <Row className="d-flex">
          {services.map((service, index) => {
            const categoryData = categories[service.category] || {}
            return (
              <Col key={service.id} xs={12} sm={6} lg={4} className="d-flex mb-4">
                <AnimatedServiceCard
                  service={service}
                  index={index}
                  scrollYProgress={sectionScrollProgress}
                  categoryColor={categoryData.color}
                  categoryLabel={categoryData.name}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

const ServicesHighlightsSection = ({ stats }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const headerOpacity = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const headerY = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [0, 0] : [20, 0]
  )

  return (
    <section ref={sectionRef} className="services-highlights-section">
      <Container>
        <motion.div style={{ opacity: headerOpacity, y: headerY }}>
          <SectionHeader
            label="Services Overview"
            title="Breadth With Precision"
            description="We deliver specialized support across security, property, and business operations with a focus on consistency and accountability."
            align="center"
          />
        </motion.div>
        <Row className="justify-content-center">
          {stats.map((stat) => (
            <Col key={stat.label} xs={12} sm={6} lg={4} className="mb-4 d-flex">
              <div className="services-highlight-card">
                <p className="services-highlight-value">{stat.value}</p>
                <p className="services-highlight-label">{stat.label}</p>
                <p className="services-highlight-detail">{stat.detail}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

const ServicesGridSection = ({ services, categories }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const headerOpacity = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const headerY = useTransform(
    sectionScrollProgress,
    [0, 0.3],
    prefersReducedMotion ? [0, 0] : [20, 0]
  )

  if (services.length === 0) return null

  return (
    <section ref={sectionRef} className="services-grid-section">
      <Container>
        <motion.div style={{ opacity: headerOpacity, y: headerY }}>
          <SectionHeader
            label="Full Service List"
            title="Every Capability, In One Place"
            description="Explore the complete catalogue and filter by category to zero in on the support your team needs."
            align="center"
          />
        </motion.div>
        <Row className="d-flex">
          {services.map((service, index) => {
            const categoryData = categories[service.category] || {}
            return (
              <Col key={service.id} xs={12} sm={6} lg={4} className="d-flex mb-4">
                <AnimatedServiceCard
                  service={service}
                  index={index}
                  scrollYProgress={sectionScrollProgress}
                  categoryColor={categoryData.color}
                  categoryLabel={categoryData.name}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

const ServicesTestimonialSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const contentOpacity = useTransform(
    sectionScrollProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const contentY = useTransform(
    sectionScrollProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [0, 0] : [30, 0]
  )

  return (
    <section ref={sectionRef} className="services-testimonial-section">
      <Container>
        <motion.div className="services-testimonial-content" style={{ opacity: contentOpacity, y: contentY }}>
          <span className="services-testimonial-quote">"</span>
          <p className="services-testimonial-text">
            Black Eagle Group has been the anchor for our facility operations.
            Their teams stay proactive, disciplined, and easy to collaborate with.
          </p>
          <div className="services-testimonial-attribution">
            <p className="services-testimonial-author">David M., Operations Director</p>
            <p className="services-testimonial-company">Metropolitan Assets</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

const ServicesCTASection = ({ onOpenModal }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const contentOpacity = useTransform(
    sectionScrollProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const contentY = useTransform(
    sectionScrollProgress,
    [0.1, 0.4],
    prefersReducedMotion ? [0, 0] : [30, 0]
  )

  return (
    <section ref={sectionRef} className="services-cta-section">
      <Container>
        <motion.div style={{ opacity: contentOpacity, y: contentY }}>
          <h2>Need a tailored services plan?</h2>
          <p>
            Share your requirements and we will assemble the right service mix
            for your teams, facilities, and events.
          </p>
          <button type="button" className="btn-gold" onClick={onOpenModal}>
            Talk to Our Team
          </button>
        </motion.div>
      </Container>
    </section>
  )
}

const Services = () => {
  const [services, setServices] = useState([])
  const [featuredServices, setFeaturedServices] = useState([])
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [servicesByCategory, setServicesByCategory] = useState({
    security: [],
    property: [],
    business: []
  })

  const [selectedCategories, setSelectedCategories] = useState({
    security: true,
    property: true,
    business: true
  })
  const [searchQuery, setSearchQuery] = useState('')

  const toggleCategoryFilter = (categoryKey) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

  const getFilteredServicesByCategory = () => {
    const filtered = {
      security: [],
      property: [],
      business: []
    }

    Object.keys(servicesByCategory).forEach(categoryKey => {
      if (selectedCategories[categoryKey]) {
        filtered[categoryKey] = servicesByCategory[categoryKey].filter(service => {
          if (!searchQuery.trim()) return true
          const query = searchQuery.toLowerCase()
          return (
            service.title.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query)
          )
        })
      }
    })

    return filtered
  }

  const filteredServicesByCategory = getFilteredServicesByCategory()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [allServices, categoriesData, featured] = await Promise.all([
          getAllServices(),
          getServiceCategories(),
          getFeaturedServices()
        ])

        setServices(allServices)
        setCategories(categoriesData)
        setFeaturedServices(featured)

        const securityServices = await getServicesByCategory('security')
        const propertyServices = await getServicesByCategory('property')
        const businessServices = await getServicesByCategory('business')

        setServicesByCategory({
          security: securityServices,
          property: propertyServices,
          business: businessServices
        })
      } catch (error) {
        console.error('Error loading services data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredServices = ['security', 'property', 'business'].flatMap((categoryKey) => (
    filteredServicesByCategory[categoryKey] || []
  ))
  const hasActiveFilters = searchQuery.trim() || Object.values(selectedCategories).some(value => !value)
  const showFeaturedSection = !hasActiveFilters
  const featuredServicesVisible = featuredServices.filter(service => (
    filteredServicesByCategory[service.category]?.some((item) => item.id === service.id)
  ))
  const nonFeaturedServices = filteredServices.filter(service => !service.featured)
  const gridServices = showFeaturedSection ? nonFeaturedServices : filteredServices

  const highlightStats = [
    {
      label: 'Total Services',
      value: services.length || 0,
      detail: 'Across security, property, and business delivery.'
    },
    {
      label: 'Service Categories',
      value: Object.keys(categories).length || 0,
      detail: 'Focused teams to match every operational need.'
    },
    {
      label: 'Featured Solutions',
      value: featuredServices.length || 0,
      detail: 'High-demand offerings trusted by clients.'
    }
  ]

  return (
    <>
      <SEO
        title="Our Services"
        description="Comprehensive services including stakeholder relations management, golf events management, security services, VIP protection, marketing management, and more."
        path="/services"
        image="/images/bg_4.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />

      <Hero
        title="What We Do"
        subtitle="Integrated security, property, and business services built for reliability, compliance, and client confidence."
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />

      <div className="services-page">
        <section className="services-search-section">
          <Container>
            <div className="services-search-controls">
              <div style={{ minWidth: '200px', maxWidth: '320px', flex: '1' }}>
                <EventSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search services..."
                />
              </div>
              <div>
                <ServiceFilter
                  selectedCategories={selectedCategories}
                  onToggleCategory={toggleCategoryFilter}
                  categories={categories}
                />
              </div>
            </div>
          </Container>
        </section>

        {loading ? (
          <section className="ftco-section">
            <Container>
              <Row className="justify-content-center">
                <Col md={8} className="text-center">
                  <p>Loading services...</p>
                </Col>
              </Row>
            </Container>
          </section>
        ) : (
          <>
            {showFeaturedSection && (
              <FeaturedServicesSection
                services={featuredServicesVisible}
                categories={categories}
              />
            )}

            <ServicesHighlightsSection stats={highlightStats} />

            <ServicesGridSection
              services={gridServices}
              categories={categories}
            />

            {Object.values(filteredServicesByCategory).every(arr => arr.length === 0) && (
              <section className="services-no-results-section">
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                      <div className="services-no-results">
                        <h3>No services found</h3>
                        <p>Try adjusting your search or filter criteria.</p>
                        {(searchQuery.trim() || Object.values(selectedCategories).some(v => !v)) && (
                          <button
                            onClick={() => {
                              setSearchQuery('')
                              setSelectedCategories({
                                security: true,
                                property: true,
                                business: true
                              })
                            }}
                            className="btn btn-primary mt-3"
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
            )}

            {showFeaturedSection && <ServicesTestimonialSection />}

            <ServicesCTASection onOpenModal={() => setIsContactModalOpen(true)} />
          </>
        )}
      </div>

      <EventContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        title="Talk to Our Team"
        description="Tell us about your service needs and we will reach out with a tailored plan."
      />
    </>
  )
}

export default Services
