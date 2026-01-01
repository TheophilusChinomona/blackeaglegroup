import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Users, Trophy, Handshake, ClipboardCheck } from 'lucide-react'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import EventCard from '@/components/EventCard'
import { initScrollAnimations } from '@/utils/scrollAnimations'
import { getCOTEvents, getCSIREvents } from '@/utils/eventData'

const Home = () => {
  const [mainEvents, setMainEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(true)
  
  // Refs for service cards (staggered 50ms delays)
  const serviceCard1Ref = useRef(null)
  const serviceCard2Ref = useRef(null)
  const serviceCard3Ref = useRef(null)
  const serviceCard4Ref = useRef(null)
  
  // Refs for Why Choose Us text elements (staggered 100ms delays)
  const whyChooseUsHeadingRef = useRef(null)
  const whyChooseUsP1Ref = useRef(null)
  const whyChooseUsP2Ref = useRef(null)
  const whyChooseUsP3Ref = useRef(null)
  const whyChooseUsSubheadingRef = useRef(null)
  const whyChooseUsButtonRef = useRef(null)

  // Load main events on mount
  useEffect(() => {
    const loadMainEvents = async () => {
      try {
        const [cotEvents, csirEvents] = await Promise.all([
          getCOTEvents(),
          getCSIREvents()
        ])
        
        // Get first event of each type for homepage display
        const events = []
        if (cotEvents.length > 0) events.push(cotEvents[0])
        if (csirEvents.length > 0) events.push(csirEvents[0])
        
        setMainEvents(events)
      } catch (error) {
        console.error('Error loading main events:', error)
      } finally {
        setEventsLoading(false)
      }
    }
    
    loadMainEvents()
  }, [])

  // Initialize scroll animations on mount
  useEffect(() => {
    initScrollAnimations()
    
    // Apply staggered delays to service cards (50ms increments)
    const serviceCards = [serviceCard1Ref, serviceCard2Ref, serviceCard3Ref, serviceCard4Ref]
    serviceCards.forEach((ref, index) => {
      if (ref.current) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!prefersReducedMotion) {
          ref.current.style.animationDelay = `${index * 50}ms`
        }
      }
    })
    
    // Apply staggered delays to Why Choose Us elements (100ms increments)
    const whyChooseUsElements = [
      whyChooseUsHeadingRef,
      whyChooseUsP1Ref,
      whyChooseUsP2Ref,
      whyChooseUsP3Ref,
      whyChooseUsSubheadingRef,
      whyChooseUsButtonRef
    ]
    whyChooseUsElements.forEach((ref, index) => {
      if (ref.current) {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!prefersReducedMotion) {
          ref.current.style.animationDelay = `${index * 100}ms`
        }
      }
    })
  }, [])

  return (
    <>
      <SEO
        title="Home"
        description="Black Eagle Group Holdings - Premier provider of stakeholder relations management, golf events management, and sponsorship management. Building impactful partnerships that uplift communities."
        path="/"
        image="/images/bg_1.jpg"
        organization={true}
      />
      {/* Hero Section */}
      <Hero 
        title="Welcome to Black Eagle Group Holdings"
        subtitle="Premier stakeholder relations & event management"
      />

      {/* Services Section */}
      <section className="ftco-section services-section section-alt-1">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="heading-section text-center ftco-animate mb-5">
              <span className="subheading">Our Brief</span>
              <h2 className="mb-2">Services</h2>
            </Col>
          </Row>
          <Row className="d-flex">
            <Col md={3} className="d-flex align-self-stretch">
              <div ref={serviceCard1Ref} className="media block-6 services ftco-animate">
                <div className="media-body text-center">
                  <div className="service-icon-wrapper mb-2 mx-auto">
                    <Users className="service-icon" size={32} />
                  </div>
                  <h3 className="heading mb-0">Stakeholder Relations Management</h3>
                  <p></p>
                </div>
              </div>
            </Col>
            <Col md={3} className="d-flex align-self-stretch">
              <div ref={serviceCard2Ref} className="media block-6 services ftco-animate">
                <div className="media-body text-center">
                  <div className="service-icon-wrapper mb-2 mx-auto">
                    <Trophy className="service-icon" size={32} />
                  </div>
                  <h3 className="heading mb-0">Golf Events Management</h3>
                  <p></p>
                </div>
              </div>
            </Col>
            <Col md={3} className="d-flex align-self-stretch">
              <div ref={serviceCard3Ref} className="media block-6 services ftco-animate">
                <div className="media-body text-center">
                  <div className="service-icon-wrapper mb-2 mx-auto">
                    <Handshake className="service-icon" size={32} />
                  </div>
                  <h3 className="heading mb-0">Sponsorship Management</h3>
                  <p></p>
                </div>
              </div>
            </Col>
            <Col md={3} className="d-flex align-self-stretch">
              <div ref={serviceCard4Ref} className="media block-6 services ftco-animate">
                <div className="media-body text-center">
                  <div className="service-icon-wrapper mb-2 mx-auto">
                    <ClipboardCheck className="service-icon" size={32} />
                  </div>
                  <h3 className="heading mb-0">Post-Event Management</h3>
                  <p></p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Events Section */}
      <section className="ftco-section section-alt-2">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="heading-section text-center ftco-animate mb-5">
              <span className="subheading">Our Events</span>
              <h2 className="mb-2">Featured Golf Events</h2>
            </Col>
          </Row>
          {eventsLoading ? (
            <Row className="justify-content-center">
              <Col md={12} className="text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading events...</span>
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="justify-content-center">
              {mainEvents.map((event, index) => {
                // Get image from event data or use default
                const eventImage = event.images && event.images.length > 0 
                  ? event.images[0].original 
                  : event.type === 'cot' 
                    ? '/images/Summary Pic2.png'
                    : event.type === 'csir'
                      ? '/images/Summary Pic1.png'
                      : '/images/bg_1.jpg'
                
                // Get route path based on event type
                const eventRoute = `/events/${event.type}`
                
                return (
                  <Col key={event.id} md={6} lg={4} className="mb-4">
                    <div className="ftco-animate">
                      <EventCard 
                        image={eventImage}
                        title={event.title}
                        to={eventRoute}
                      />
                    </div>
                  </Col>
                )
              })}
            </Row>
          )}
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="ftco-section section-alt-1">
        <Container>
          <Row className="no-gutters">
            <Col
              md={6}
              className="p-md-5 img img-2 d-flex justify-content-center align-items-center"
              style={{ backgroundImage: "url('/images/about.jpg')", minHeight: '400px', backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></Col>
            <Col md={6} className="wrap-about py-md-5">
              <div className="heading-section mb-5 pl-md-5">
                <span className="subheading">Welcome</span>
                <h2 ref={whyChooseUsHeadingRef} className="mb-4 ftco-animate">Why Choose Us</h2>
                <p ref={whyChooseUsP1Ref} className="ftco-animate">
                  At Black Eagle Group Holdings, we don't just manage events and relationships; we build legacies. Founded by Mr. Mandla Mndawe, our firm has become a trusted partner for both State-Owned Entities and private sector leaders who demand precision and professionalism.
                </p>
                <h3 ref={whyChooseUsSubheadingRef} className="h5 mt-4 mb-3 ftco-animate">What Sets Us Apart:</h3>
                <div ref={whyChooseUsP2Ref} className="ftco-animate">
                  <p className="mb-3">
                    <strong>Specialized Expertise:</strong> We are industry leaders in stakeholder relations and high-tier golf event management, bridging the gap between corporate strategy and community impact.
                  </p>
                  <p className="mb-3">
                    <strong>Integrity-First Approach:</strong> Our reputation is built on transparency. We treat your brand's reputation with the same care and integrity as our own.
                  </p>
                  <p className="mb-3">
                    <strong>Social Responsibility:</strong> Beyond corporate services, we are deeply committed to youth development through our golf initiatives, ensuring that your partnership with us contributes to a greater social good.
                  </p>
                  <p className="mb-3">
                    <strong>Tailored Excellence:</strong> From sponsorship organization to complex stakeholder navigation, we provide bespoke solutions that meet the unique needs of the South African business landscape.
                  </p>
                </div>
                <p ref={whyChooseUsP3Ref} className="ftco-animate mt-4">
                  <Link to="/about" className="btn btn-primary">
                    Read More
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home

