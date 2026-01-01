import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
import EventSearch from '@/components/EventSearch'
import ServiceFilter from '@/components/ServiceFilter'
import { getAllServices, getServicesByCategory, getServiceCategories } from '@/utils/serviceData'
import { cn } from '@/utils'

// Animated Service Card Wrapper Component
const AnimatedServiceCard = ({ service, index, scrollYProgress, categoryColor }) => {
  // Staggered delays: 50-100ms between cards (0.05-0.1 scroll progress increments)
  const delay = 0.1 + (index * 0.05)
  const cardOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const cardY = useTransform(scrollYProgress, [delay, delay + 0.3], [30, 0])
  
  return (
    <motion.div 
      style={{ opacity: cardOpacity, y: cardY }}
      className="w-full h-full"
    >
      <ServiceCard
        image={service.image}
        title={service.title}
        description={service.description}
        category={service.category}
        featured={service.featured || false}
        categoryColor={categoryColor}
      />
    </motion.div>
  )
}

// Category Section Component
const CategorySection = ({ categoryKey, categoryData, services, scrollYProgress, sectionIndex, isExpanded, onToggle }) => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Header animations with staggered delays
  const subheadingOpacity = useTransform(sectionScrollProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(sectionScrollProgress, [0, 0.3], [20, 0])
  
  const headingOpacity = useTransform(sectionScrollProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(sectionScrollProgress, [0.05, 0.35], [20, 0])
  
  const descriptionOpacity = useTransform(sectionScrollProgress, [0.1, 0.4], [0, 1])
  const descriptionY = useTransform(sectionScrollProgress, [0.1, 0.4], [20, 0])

  // Category color
  const categoryColor = categoryData?.color || '#59B200'

  // Sort services: featured first, then by order
  const sortedServices = [...services].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return (a.order || 999) - (b.order || 999)
  })

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "ftco-section services-category-section",
        sectionIndex > 0 && "pt-0"
      )}
      style={{
        position: 'relative'
      }}
    >
      <Container>
        {/* Category Header - Clickable to Toggle */}
        <Row className="justify-content-center mb-4">
          <Col md={10} className="text-center">
            <button
              onClick={onToggle}
              className="services-category-toggle"
              style={{ 
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center'
              }}
              aria-expanded={isExpanded}
              aria-controls={`category-${categoryKey}-content`}
            >
              <motion.span 
                className="subheading services-category-subheading"
                style={{ 
                  opacity: subheadingOpacity, 
                  y: subheadingY,
                  color: categoryColor
                }}
              >
                {categoryData?.name || categoryKey}
                <span 
                  className="services-category-icon"
                  style={{
                    marginLeft: '1rem',
                    display: 'inline-block',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </motion.span>
              {categoryData?.description && (
                <motion.p
                  className="services-category-description mt-3"
                  style={{ 
                    opacity: descriptionOpacity, 
                    y: descriptionY 
                  }}
                >
                  {categoryData.description}
                </motion.p>
              )}
            </button>
          </Col>
        </Row>

        {/* Services Grid - Dynamic Layout - Collapsible */}
        <motion.div
          ref={contentRef}
          id={`category-${categoryKey}-content`}
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
          style={{
            overflow: 'hidden'
          }}
        >
          <Row className="d-flex">
            {sortedServices.map((service, index) => (
              <Col 
                key={service.id} 
                xs={12} 
                sm={6} 
                md={service.featured ? 6 : 4}
                lg={service.featured ? 6 : 4}
                className="d-flex mb-4"
              >
                <AnimatedServiceCard
                  service={service}
                  index={index}
                  scrollYProgress={sectionScrollProgress}
                  categoryColor={categoryColor}
                />
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  )
}

const Services = () => {
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [servicesByCategory, setServicesByCategory] = useState({
    security: [],
    property: [],
    business: []
  })
  
  // State for collapsible categories - all expanded by default
  const [expandedCategories, setExpandedCategories] = useState({
    security: true,
    property: true,
    business: true
  })
  
  // State for filtering
  const [selectedCategories, setSelectedCategories] = useState({
    security: true,
    property: true,
    business: true
  })
  const [searchQuery, setSearchQuery] = useState('')
  
  // Toggle category expansion
  const toggleCategory = (categoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }
  
  // Toggle category filter
  const toggleCategoryFilter = (categoryKey) => {
    setSelectedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }
  
  // Filter services based on selected categories and search query
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

  // Load services data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [allServices, categoriesData] = await Promise.all([
          getAllServices(),
          getServiceCategories()
        ])

        setServices(allServices)
        setCategories(categoriesData)

        // Group services by category
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

  // Main page scroll progress for overall animations
  const pageRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start end", "end start"]
  })

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
      
      {/* Hero Section */}
      <Hero 
        title="What We Do"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' }
        ]}
      />

      {/* Search and Filter Section */}
      <section className="ftco-section services-search-section">
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={12} lg={10}>
              <div className="d-flex flex-column flex-md-row gap-3 align-items-start align-items-md-center">
                <div className="flex-grow-1" style={{ minWidth: '200px', maxWidth: '300px' }}>
                  <EventSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search services..."
                  />
                </div>
                <div className="flex-shrink-0">
                  <ServiceFilter
                    selectedCategories={selectedCategories}
                    onToggleCategory={toggleCategoryFilter}
                    categories={categories}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Content */}
      <div ref={pageRef}>
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
            {/* Security Services Section */}
            {filteredServicesByCategory.security.length > 0 && (
              <CategorySection
                categoryKey="security"
                categoryData={categories.security}
                services={filteredServicesByCategory.security}
                scrollYProgress={scrollYProgress}
                sectionIndex={0}
                isExpanded={expandedCategories.security}
                onToggle={() => toggleCategory('security')}
              />
            )}

            {/* Property Services Section */}
            {filteredServicesByCategory.property.length > 0 && (
              <CategorySection
                categoryKey="property"
                categoryData={categories.property}
                services={filteredServicesByCategory.property}
                scrollYProgress={scrollYProgress}
                sectionIndex={1}
                isExpanded={expandedCategories.property}
                onToggle={() => toggleCategory('property')}
              />
            )}

            {/* Business Services Section */}
            {filteredServicesByCategory.business.length > 0 && (
              <CategorySection
                categoryKey="business"
                categoryData={categories.business}
                services={filteredServicesByCategory.business}
                scrollYProgress={scrollYProgress}
                sectionIndex={2}
                isExpanded={expandedCategories.business}
                onToggle={() => toggleCategory('business')}
              />
            )}
            
            {/* No Results Message */}
            {Object.values(filteredServicesByCategory).every(arr => arr.length === 0) && (
              <section className="ftco-section">
                <Container>
                  <Row className="justify-content-center">
                    <Col md={8} className="text-center">
                      <div className="py-5">
                        <h3>No services found</h3>
                        <p className="text-muted">Try adjusting your search or filter criteria.</p>
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
          </>
        )}
      </div>
    </>
  )
}

export default Services
