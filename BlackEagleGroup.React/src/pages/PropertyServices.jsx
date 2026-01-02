import { useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'

// Property Services Data
const propertyServices = [
  {
    id: 1,
    image: '/images/cp.jpg',
    title: 'Commercial Property Services',
    description: 'is widely recognised for its ability to fill and sell space, an innovative approach to space utilisation and maximisation as well as the numerous successful collaborations forged with institutional partner'
  },
  {
    id: 2,
    image: '/images/cb.jpg',
    title: 'Residential Property',
    description: 'We offer a custom, proactive, and dynamic approach to property management, saving you time and maximising your profits. We offer an extensive list of services, all needed to create a turnkey solution for your property investments.'
  },
  {
    id: 3,
    image: '/images/TR.jpg',
    title: 'Township Rentails',
    description: 'The ultimate platform to connect Landlords and Tenants across Africa\'s townships. Find the best selection of cheap room rentals in South Africa. Enjoy easy access to a wide range of rental options in your area.'
  },
  {
    id: 4,
    image: '/images/BC.jpg',
    title: 'Body Corporate & HOA Management',
    description: 'We are taking a completely new approach to managing a body corporate/HOA. We are a hands-on style management company which I know most trustees/directors are currently struggling to find.'
  },
  {
    id: 5,
    image: '/images/Abnb.jpg',
    title: 'Airbnb / Short-Term Rental',
    description: 'We help operate your online marketplace for short-and-long-term homestays and experiences in various countries and regions. It acts as a broker and charges a commission from each booking.'
  }
]

// What We Handle List Data
const whatWeHandleItems = [
  'Property maintenance and repairs',
  'General accounting and financial reporting',
  'Budgeting and contract management',
  'Enforcing rules and by-laws',
  'Handling owner concerns and disputes',
  'Invoicing levies and service charges',
  'Collecting arrears',
  'Preparing meetings and issuing notices, orders, and certificates',
  'Conducting monthly operations reports from on-site visits'
]

// Services Intro Section Component
const ServicesIntroSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  return (
    <section ref={sectionRef} className="ftco-section">
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={7} className="heading-section text-center">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              Our Services Property
            </motion.span>
            <motion.h2 
              style={{ opacity: headingOpacity, y: headingY }}
            >
              What We Do
            </motion.h2>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated Service Card Wrapper Component
const AnimatedServiceCard = ({ service, index, scrollYProgress }) => {
  const delay = 0.1 + (index * 0.05)
  const cardOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const cardY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <Col md={4} className="d-flex mb-4">
      <motion.div style={{ opacity: cardOpacity, y: cardY }} className="w-100 h-100">
        <ServiceCard
          image={service.image}
          title={service.title}
          description={service.description}
        />
      </motion.div>
    </Col>
  )
}

// Service Cards Section Component
const ServiceCardsSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  return (
    <section ref={sectionRef} className="ftco-section pt-0">
      <Container>
        <Row className="d-flex">
          {propertyServices.map((service, index) => (
            <AnimatedServiceCard
              key={service.id}
              service={service}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </Row>
      </Container>
    </section>
  )
}

// Animated Paragraph Helper Component
const AnimatedParagraph = ({ children, scrollYProgress, delay }) => {
  const paragraphOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.p 
      className="text-white"
      style={{ opacity: paragraphOpacity, y: paragraphY }}
    >
      {children}
    </motion.p>
  )
}

// Our Expertise Section Component (Dark Background)
const OurExpertiseSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const paragraphOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const paragraphY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  return (
    <section
      ref={sectionRef}
      className="ftco-section services-section img"
      style={{
        backgroundImage: "url('/images/bg_6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      aria-label="Our Expertise section background"
    >
      <div className="overlay"></div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center heading-section heading-section-white">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              Excellence
            </motion.span>
            <motion.h2 
              className="mb-3 text-white"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              Our Expertise
            </motion.h2>
            <motion.p 
              className="text-white"
              style={{ opacity: paragraphOpacity, y: paragraphY }}
            >
              In recent years, BEGH has honed its capabilities in property management, delivering a comprehensive turnkey solution for property owners, residents, and body corporates. Our portfolio spans over 10,000 units nationwide, cementing our reputation for providing high-quality, efficient property management services. Our hands-on approach ensures the smooth management, control, and maintenance of buildings across South Africa.
            </motion.p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Animated List Item Component
const AnimatedListItem = ({ children, scrollYProgress, delay }) => {
  const itemOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const itemY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <motion.li style={{ opacity: itemOpacity, y: itemY }}>
      {children}
    </motion.li>
  )
}

// What We Handle Section Component (Split Layout)
const WhatWeHandleSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const subheadingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  return (
    <section ref={sectionRef} className="ftco-section about-split-section">
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/BC.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
                role="img"
                aria-label="Body Corporate and HOA Management services"
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: subheadingOpacity, y: subheadingY }}
              >
                Services
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: headingOpacity, y: headingY }}
              >
                What We Handle
              </motion.h2>
              <ul>
                {whatWeHandleItems.map((item, index) => {
                  const delay = 0.15 + (index * 0.05)
                  return (
                    <AnimatedListItem
                      key={index}
                      scrollYProgress={scrollYProgress}
                      delay={delay}
                    >
                      {item}
                    </AnimatedListItem>
                  )
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Overview Section Component (Dark Background)
const OverviewSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const subheadingOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const subheadingY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.35], [0, 1])
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [20, 0])
  
  const paragraphs = [
    "BLACK EAGLE GROUP HOLDINGS PTY LTD (BEGH) is a leading property management agency with a proven track record of excellence in managing residential and commercial properties across South Africa.",
    "As a prominent managing agent operating in Pretoria, Johannesburg, Mpumalanga, Western Cape, KwaZulu-Natal, and many other provinces, we have established ourselves as one of the country's top property management firms.",
    "Our in-house collections team is dedicated to keeping arrears at a minimum, ensuring that your property remains financially healthy."
  ]
  
  return (
    <section
      ref={sectionRef}
      className="ftco-section services-section img"
      style={{
        backgroundImage: "url('/images/bg_6.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
      aria-label="Overview section background"
    >
      <div className="overlay"></div>
      <Container>
        <Row className="justify-content-center mb-5">
          <Col md={8} className="text-center heading-section heading-section-white">
            <motion.span 
              className="subheading"
              style={{ opacity: subheadingOpacity, y: subheadingY }}
            >
              About
            </motion.span>
            <motion.h2 
              className="mb-3 text-white"
              style={{ opacity: headingOpacity, y: headingY }}
            >
              Overview
            </motion.h2>
            {paragraphs.map((text, index) => {
              const delay = 0.1 + (index * 0.1)
              return (
                <AnimatedParagraph
                  key={index}
                  scrollYProgress={scrollYProgress}
                  delay={delay}
                >
                  {text}
                </AnimatedParagraph>
              )
            })}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

// Main PropertyServices Component
const PropertyServices = () => {
  return (
    <>
      {/* SEO */}
      <SEO
        title="Property Services"
        description="BLACK EAGLE GROUP HOLDINGS offers comprehensive property management services including commercial, residential, body corporate management, and short-term rentals across South Africa."
        path="/property-services"
        image="/images/cp.jpg"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Property Services', url: '/property-services' }
        ]}
      />

      {/* Hero Section with Property Background */}
      <Hero 
        title="Property Services"
        backgroundImage="/images/heros/property-services.png"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Property Services', url: '/property-services' }
        ]}
      />

      {/* Services Intro Section */}
      <ServicesIntroSection />

      {/* Service Cards Section */}
      <ServiceCardsSection />

      {/* Our Expertise Section (Dark) */}
      <OurExpertiseSection />

      {/* What We Handle Section (Split Layout) */}
      <WhatWeHandleSection />

      {/* Overview Section (Dark) */}
      <OverviewSection />
    </>
  )
}

export default PropertyServices
