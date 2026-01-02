import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import ClientCard from '@/components/ClientCard'
import ClientFilter from '@/components/ClientFilter'
import ClientSearch from '@/components/ClientSearch'
import ClientSort from '@/components/ClientSort'
import SectionHeader from '@/components/SectionHeader'
import { 
  getAllClients, 
  getFeaturedClients, 
  getClientIndustries
} from '@/utils/clientData'

// Import clients page specific styles
import '@/styles/clients.css'

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false

// Standard animation timing
const ANIMATION_DURATION = prefersReducedMotion ? 0 : 0.6
const ANIMATION_EASING = [0.4, 0, 0.2, 1]

// Animation variants for cards
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 20 
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: prefersReducedMotion ? 0 : index * 0.1,
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING
    }
  })
}

// Animation variants for headers
const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATION,
      ease: ANIMATION_EASING
    }
  }
}

// Animated Client Card Wrapper Component
const AnimatedClientCard = ({ client, index, scrollYProgress, industryColor }) => {
  // Stagger per row (4 cards per row on large screens)
  const rowIndex = Math.floor(index / 4)
  // First row starts immediately when section enters view
  const delay = rowIndex * 0.08
  const cardOpacity = useTransform(
    scrollYProgress, 
    [delay, delay + 0.25], 
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const cardY = useTransform(
    scrollYProgress, 
    [delay, delay + 0.25], 
    prefersReducedMotion ? [0, 0] : [20, 0]
  )
  
  return (
    <motion.div 
      style={{ opacity: cardOpacity, y: cardY }}
      className="w-full h-full"
    >
      <ClientCard
        image={client.image}
        name={client.name}
        location={client.location}
        referenceLink={client.referenceLink}
        phoneNumber={client.phoneNumber}
        industry={client.industry}
        featured={client.featured || false}
        industryColor={industryColor}
        logo={client.logo}
        description={client.description}
      />
    </motion.div>
  )
}

// Featured Clients Section Component
const FeaturedClientsSection = ({ featuredClients, industries }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Header animations
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

  if (featuredClients.length === 0) return null

  return (
    <section 
      ref={sectionRef}
      className="clients-featured-section"
    >
      <Container>
        <motion.div style={{ opacity: headerOpacity, y: headerY }}>
          <SectionHeader
            label="Featured Partners"
            title="Our Key Partnerships"
            align="center"
          />
        </motion.div>
        <Row className="d-flex">
          {featuredClients.map((client, index) => {
            const industryData = industries[client.industry] || {}
            return (
              <Col 
                key={client.id} 
                xs={12} 
                sm={6} 
                lg={4}
                className="d-flex mb-4"
              >
                <AnimatedClientCard
                  client={client}
                  index={index}
                  scrollYProgress={sectionScrollProgress}
                  industryColor={industryData.color}
                />
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

// Unified Clients Grid Section Component
const UnifiedClientsGridSection = ({ clients }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  if (clients.length === 0) return null

  return (
    <section 
      ref={sectionRef}
      className="clients-main-grid-section"
    >
      <Container>
        <Row className="d-flex">
          {clients.map((client, index) => (
            <Col 
              key={client.id} 
              xs={12} 
              sm={6} 
              md={4}
              lg={3}
              className="d-flex mb-4"
            >
              <AnimatedClientCard
                client={client}
                index={index}
                scrollYProgress={sectionScrollProgress}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

// Testimonial Section Component
const TestimonialSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
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
    <section 
      ref={sectionRef}
      className="clients-testimonial-section"
    >
      <Container>
        <motion.div 
          className="testimonial-content"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <span className="testimonial-quote-mark">"</span>
          <p className="testimonial-quote-text">
            Black Eagle Group has been instrumental in supporting our operations. 
            Their professionalism, attention to detail, and commitment to excellence 
            make them a valued partner we can always rely on.
          </p>
          <div className="testimonial-attribution">
            <p className="testimonial-author">Sarah M., CEO</p>
            <p className="testimonial-company">TechSolutions Inc.</p>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// CTA Footer Section Component
const CTASection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
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
    <section 
      ref={sectionRef}
      className="clients-cta-section"
    >
      <Container>
        <motion.div style={{ opacity: contentOpacity, y: contentY }}>
          <h2>Ready to Build Success Together?</h2>
          <p>
            Join our network of forward-thinking partners and discover how 
            we can help your organization achieve its goals.
          </p>
          <Link to="/contact" className="btn-gold">
            Become a Partner
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

// Animated Logo Item Component
const AnimatedLogoItem = ({ client, index, scrollYProgress }) => {
  const logoOpacity = useTransform(
    scrollYProgress, 
    [0.1 + (index * 0.05), 0.4 + (index * 0.05)], 
    prefersReducedMotion ? [1, 1] : [0, 1]
  )
  const logoY = useTransform(
    scrollYProgress, 
    [0.1 + (index * 0.05), 0.4 + (index * 0.05)], 
    prefersReducedMotion ? [0, 0] : [20, 0]
  )
  
  return (
    <Col 
      xs={6} 
      sm={4} 
      md={3}
      lg={2}
      className="mb-4 d-flex align-items-center justify-content-center"
    >
      <motion.div
        style={{ opacity: logoOpacity, y: logoY }}
        className="client-logo-item"
      >
        <img 
          src={client.logo} 
          alt={`${client.name} logo`}
          className="img-fluid"
        />
      </motion.div>
    </Col>
  )
}

// Client Logo Showcase Section Component
const ClientLogoShowcaseSection = ({ clientsWithLogos }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress: sectionScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Header animations
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
    <section 
      ref={sectionRef}
      className="clients-logo-showcase-section"
    >
      <Container>
        <motion.div style={{ opacity: headerOpacity, y: headerY }}>
          <SectionHeader
            label="Trusted Partners"
            title="Our Client Portfolio"
            align="center"
          />
        </motion.div>
        <Row className="d-flex align-items-center justify-content-center">
          {clientsWithLogos.map((client, index) => (
            <AnimatedLogoItem
              key={client.id}
              client={client}
              index={index}
              scrollYProgress={sectionScrollProgress}
            />
          ))}
        </Row>
      </Container>
    </section>
  )
}

const Clients = () => {
  const [allClients, setAllClients] = useState([])
  const [featuredClients, setFeaturedClients] = useState([])
  const [industries, setIndustries] = useState({})
  const [loading, setLoading] = useState(true)
  
  // Filter/Search/Sort state
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('alphabetical')

  // Load clients data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const [clients, featured, industriesData] = await Promise.all([
          getAllClients(),
          getFeaturedClients(),
          getClientIndustries()
        ])
        setAllClients(clients)
        setFeaturedClients(featured)
        setIndustries(industriesData)
      } catch (error) {
        console.error('Error loading clients data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  // Filter, search, and sort clients
  const getFilteredAndSortedClients = () => {
    let filtered = [...allClients]
    const tailClientOrder = [
      'Mineral Resources',
      'International Relations',
      'Tshwane Open',
      'Volvo Motors'
    ]

    // Apply industry filter
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(client => client.industry === selectedIndustry)
    }

    // Apply search
    if (searchQuery.trim()) {
      filtered = filtered.filter(client => {
        const searchableText = [
          client.name || '',
          client.location || '',
          client.description || '',
          client.industry || ''
        ].join(' ').toLowerCase()
        return searchableText.includes(searchQuery.toLowerCase().trim())
      })
    }

    // Apply sorting
    switch (sortOption) {
      case 'alphabetical':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
        break
      case 'industry':
        filtered.sort((a, b) => {
          const industryA = industries[a.industry]?.name || a.industry || ''
          const industryB = industries[b.industry]?.name || b.industry || ''
          return industryA.localeCompare(industryB)
        })
        break
      case 'featured':
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (a.order || 999) - (b.order || 999)
        })
        break
      default:
        break
    }

    const tailClients = tailClientOrder
      .map((name) => filtered.find((client) => client.name === name))
      .filter(Boolean)
    const tailIds = new Set(tailClients.map((client) => client.id))
    const remainingClients = filtered.filter((client) => !tailIds.has(client.id))

    return [...remainingClients, ...tailClients]
  }

  const filteredClients = getFilteredAndSortedClients()
  const nonFeaturedClients = filteredClients.filter(client => !client.featured)

  // Calculate statistics
  const clientCount = allClients.length
  const industryCount = Object.keys(industries).length

  if (loading) {
    return (
      <>
        <SEO 
          title="Our Clients"
          description="Discover the diverse range of clients we serve across government, energy, technology, automotive, healthcare, financial services, and more."
          path="/clients"
        />
        <div className="ftco-section">
          <Container>
            <div className="text-center py-5">
              <p>Loading clients...</p>
            </div>
          </Container>
        </div>
      </>
    )
  }

  return (
    <>
      <SEO 
        title="Our Clients"
        description={`Trusted by ${clientCount}+ clients across ${industryCount}+ industries. Discover the diverse range of organizations we serve, from government departments to leading corporations.`}
        path="/clients"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Our Clients', url: '/clients' }
        ]}
      />
      
      <div>
        {/* Hero Section */}
        <Hero
          title="Trusted by Industry Leaders"
          subtitle={`Building lasting partnerships through excellence and innovation with ${clientCount}+ clients across ${industryCount}+ industries`}
          backgroundImage="/images/bg_2.jpg"
          breadcrumbs={[
            { name: 'Home', url: '/' },
            { name: 'Our Clients', url: '/clients' }
          ]}
        />

        {/* Search and Filter Section */}
        <section className="clients-search-section">
          <Container>
            <div className="clients-search-controls">
              <div style={{ minWidth: '200px', maxWidth: '300px', flex: '1' }}>
                <ClientSearch
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search clients..."
                />
              </div>
              <div>
                <ClientFilter
                  selectedIndustry={selectedIndustry}
                  onSelectIndustry={setSelectedIndustry}
                  industries={industries}
                />
              </div>
              <div>
                <ClientSort
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Featured Clients Section */}
        {selectedIndustry === 'all' && searchQuery === '' && (
          <FeaturedClientsSection
            featuredClients={featuredClients}
            industries={industries}
          />
        )}

        {/* Unified Clients Grid */}
        <UnifiedClientsGridSection clients={nonFeaturedClients} />

        {/* Client Logo Showcase Section */}
        {selectedIndustry === 'all' && searchQuery === '' && allClients.filter(c => c.logo).length > 0 && (
          <ClientLogoShowcaseSection
            clientsWithLogos={allClients.filter(c => c.logo)}
          />
        )}

        {/* Testimonial Section */}
        {selectedIndustry === 'all' && searchQuery === '' && (
          <TestimonialSection />
        )}

        {/* CTA Footer Section */}
        <CTASection />
      </div>
    </>
  )
}

export default Clients
