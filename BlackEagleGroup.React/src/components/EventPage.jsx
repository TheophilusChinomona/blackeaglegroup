import { useEffect, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

// Lazy load large components for code splitting
const Gallery = lazy(() => import('./Gallery'))
const VideoPlayer = lazy(() => import('./VideoPlayer'))

/**
 * EventPage Component
 * Reusable template for different event types
 * Supports dynamic content from JSON/config files
 * 
 * @param {Object} event - Event data object
 * @param {Object} options - Additional options
 */
const EventPage = ({ event, options = {} }) => {
  const {
    showOverview = true,
    showDetails = true,
    showGallery = true,
    showVideos = true
  } = options

  if (!event) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <p>The event you're looking for doesn't exist.</p>
        <Link to="/events">Back to Events</Link>
      </div>
    )
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [event.id])

  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-wrap hero-wrap-2 js-fullheight" 
        style={{ 
          backgroundImage: event.images?.[0]?.original 
            ? `url(${event.images[0].original})` 
            : "url('/images/bg_2.jpg')"
        }}
      >
        <div className="overlay"></div>
        <Container>
          <Row className="no-gutters slider-text js-fullheight align-items-end justify-content-start">
            <Col md={9} className="ftco-animate pb-5">
              <p className="breadcrumbs">
                <span className="mr-2">
                  <Link to="/">Home <i className="ion-ios-arrow-forward"></i></Link>
                </span>
                <span>
                  <Link to="/events">Events <i className="ion-ios-arrow-forward"></i></Link>
                </span>
                <span>{event.title}</span>
              </p>
              <h1 className="mb-3 bread">{event.title}</h1>
              {event.subtitle && (
                <h2 className="mb-3 text-white">{event.subtitle}</h2>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Overview Section */}
      {showOverview && (event.description || event.date || event.location) && (
        <section className="ftco-section">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col md={7} className="heading-section text-center ftco-animate">
                <span className="subheading">Event Overview</span>
                <h2 className="mb-4">About This Event</h2>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="ftco-animate">
                {event.description && (
                  <p className="mb-4">{event.description}</p>
                )}
                <Row className="mb-4">
                  {event.date && (
                    <Col md={4}>
                      <p><strong>Date:</strong> {event.date}</p>
                    </Col>
                  )}
                  {event.location && (
                    <Col md={4}>
                      <p><strong>Location:</strong> {event.location}</p>
                    </Col>
                  )}
                  {event.venue && (
                    <Col md={4}>
                      <p><strong>Venue:</strong> 
                        {event.venue.url ? (
                          <a href={event.venue.url} target="_blank" rel="noopener noreferrer" className="ml-2">
                            {event.venue.name}
                          </a>
                        ) : (
                          <span className="ml-2">{event.venue.name}</span>
                        )}
                      </p>
                    </Col>
                  )}
                </Row>
                {event.contact && (
                  <Row>
                    {event.contact.email && (
                      <Col md={6}>
                        <p><strong>Email:</strong> <a href={`mailto:${event.contact.email}`}>{event.contact.email}</a></p>
                      </Col>
                    )}
                    {event.contact.phone && (
                      <Col md={6}>
                        <p><strong>Phone:</strong> <a href={`tel:${event.contact.phone}`}>{event.contact.phone}</a></p>
                      </Col>
                    )}
                  </Row>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Details Section */}
      {showDetails && event.details && (
        <section className="ftco-section ftco-no-pt ftco-no-pb">
          <Container>
            <Row>
              <Col md={12} className="ftco-animate">
                <div dangerouslySetInnerHTML={{ __html: event.details }} />
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Gallery Section */}
      {showGallery && event.images && event.images.length > 0 && (
        <section className="ftco-section">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col md={7} className="heading-section text-center ftco-animate">
                <span className="subheading">Gallery</span>
                <h2 className="mb-4">Event Photos</h2>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Suspense fallback={
                  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading gallery...</span>
                    </div>
                  </div>
                }>
                  <Gallery items={event.images} viewMode="grid" />
                </Suspense>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* Videos Section */}
      {showVideos && event.videos && event.videos.length > 0 && (
        <section className="ftco-section">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col md={7} className="heading-section text-center ftco-animate">
                <span className="subheading">Videos</span>
                <h2 className="mb-4">Event Videos</h2>
              </Col>
            </Row>
            <Row>
              {event.videos.map((video, index) => (
                <Col key={index} md={6} className="mb-4">
                  <Suspense fallback={
                    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading video...</span>
                      </div>
                    </div>
                  }>
                    <VideoPlayer url={video.url || video} />
                  </Suspense>
                  {video.title && (
                    <h4 className="mt-3">{video.title}</h4>
                  )}
                  {video.description && (
                    <p>{video.description}</p>
                  )}
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  )
}

export default EventPage

