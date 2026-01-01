import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import EventCarousel from '@/components/EventCarousel'
import EventGallery from '@/components/EventGallery'
import SponsorLogos from '@/components/SponsorLogos'
import EventContactModal from '@/components/EventContactModal'
import { Button } from '@/components/ui/button'
import SEO from '@/components/SEO'

const CSIRIndex = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const csirEvent = await getEventById('csir-1')
        setEvent(csirEvent)
      } catch (error) {
        console.error('Error loading CSIR event:', error)
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
    <div className="csir-theme">
      <SEO
        title={`${event.title} - Welcome`}
        description={event.description}
        path="/events/csir"
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
                <Link to="/events/csir/about" style={{ textDecoration: 'none', color: 'inherit' }}>Read More</Link>
              </Button>
              <Button
                size="lg"
                className="csir-cta-primary"
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
                {event.content.welcome.heading}
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
                  src="/csir/images/Woodhill3.png"
                  alt="Event Quote"
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            </Col>
          </Row>
        </section>
      )}

      {/* About Section */}
      {event.content && event.content.about && (
        <section className="about">
          <Container>
            <Row>
              <Col md={12}>
                <div className="titlepage text_align_center">
                  <h2>More About The Event</h2>
                </div>
              </Col>
              <Col md={10} className="offset-md-1">
                <div className="about_text text_align_center">
                  {event.content.about.paragraphs && event.content.about.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {event.content.about.document && (
                    <p>
                      Check out the GOLF DAY DETAILS DOCUMENT: {event.content.about.document.description}
                      <br />
                      <a href={event.content.about.document.path} target="_blank" rel="noopener noreferrer">
                        <img src="/csir/images/flag.png" alt="PDF" />
                        <strong> {event.content.about.document.title}</strong>
                      </a>
                    </p>
                  )}
                  <a className="read_more" href="/events/csir/about">Read More</a>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Gallery Section */}
      {event.gallery && event.gallery.images && event.gallery.images.length > 0 && (
        <section className="container-fluid py-5 bg-light">
          <Container>
            <Row>
              <Col md={12} className="text-center mb-5">
                <h2 className="display-5 mb-3">Event Gallery</h2>
                <p className="text-muted">Browse through our event photos</p>
                <Link to="/events/csir/gallery" className="btn btn-primary mt-3">
                  View Full Gallery
                </Link>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <EventGallery items={event.gallery.images} />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="container-fluid bg-primary p-0">
          <div className="sponsor-section-white-bg">
            <Container>
              <h1 className="text-center mb-2">CSIR Charity Golf Day</h1>
              <h2 className="text-center mb-4">powered by H3C Technologies Africa.</h2>
              <SponsorLogos sponsors={event.sponsors} carousel={true} />
            </Container>
          </div>
        </section>
      )}
    </div>
  )
}

export default CSIRIndex
