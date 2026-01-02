import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import EventCarousel from '@/components/EventCarousel'
import CircularGallery from '@/components/CircularGallery/CircularGallery'
import SponsorLogos from '@/components/SponsorLogos'
import EventContactModal from '@/components/EventContactModal'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

const COTIndex = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const cotEvent = await getEventById('cot-1')
        setEvent(cotEvent)
      } catch (error) {
        console.error('Error loading COT event:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvent()
  }, [])

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events">Back to Events</Link>
      </div>
    )
  }

  return (
    <div className="cot-theme">
      <SEO
        title={`${event.title} - Welcome`}
        description={event.description}
        path="/events/cot"
      />
      
      {/* Hero Carousel */}
      {event.hero && event.hero.carousel && (
        <EventCarousel 
          items={event.hero.carousel}
          showControls={false}
          showIndicators={false}
          ctaButtons={
            <div className="event-carousel-cta-buttons">
              <Button
                variant="outline"
                size="lg"
                className="me-3 bg-white text-dark border-2 border-white hover:bg-gray-100 hover:border-gray-200"
                asChild
              >
                <Link to="/events/cot/about" style={{ textDecoration: 'none', color: 'inherit' }}>Read More</Link>
              </Button>
              <Button
                size="lg"
                className="cot-cta-primary"
                onClick={() => setIsContactModalOpen(true)}
              >
                Contact Us
              </Button>
            </div>
          }
        />
      )}

      {/* Contact Modal */}
      {event.contact && event.contact.form && (
        <EventContactModal
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
          fields={event.contact.form.fields}
          endpoint={event.contact.form.endpoint}
        />
      )}

      {/* Welcome Section */}
      {event.content && event.content.welcome && (
        <section className="container-fluid bg-secondary px-0">
          <Row className="g-0">
            <Col lg={6} className="py-6 px-5">
              <h1 className="display-5 mb-4">
                BEG-Holdings Management and{' '}
                <span className="text-primary">City of Tshwane Business</span>
                <br />
                <span className="text-primary">Networking Golf Day</span>
              </h1>
              <h4 className="text-primary mb-4">
                {event.content.welcome.subheading}
              </h4>
              <p className="mb-4 text-muted">{event.content.welcome.text}</p>
            </Col>
            <Col lg={6} style={{ minHeight: '400px' }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100"
                  src="/COT/img/quote.jpg"
                  alt="Event Quote"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </section>
      )}

      {/* Gallery Section - Commented out temporarily
      {event.gallery && event.gallery.images && event.gallery.images.length > 0 && (
        <section className="container-fluid py-5 bg-light">
          <Container>
            <Row>
              <Col md={12} className="text-center mb-5">
                <h2 className="display-5 mb-3">Event Gallery</h2>
                <p className="text-muted">Browse through our event photos</p>
                <Link to="/events/cot/gallery" className="btn btn-primary mt-3">
                  View Full Gallery
                </Link>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="circular-gallery-shell">
                  <CircularGallery
                    items={event.gallery.images.map((item, index) => ({
                      image: item.original || item.thumbnail || item,
                      text: item.description || item.alt || `Gallery image ${index + 1}`
                    }))}
                    textColor="#1f2937"
                    borderRadius={0.08}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}
      */}

      {/* Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="container-fluid bg-primary p-0">
          <div className="sponsor-section-white-bg">
            <SponsorLogos sponsors={event.sponsors} carousel={true} />
          </div>
        </section>
      )}
    </div>
  )
}

export default COTIndex
