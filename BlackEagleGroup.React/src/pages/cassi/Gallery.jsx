import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById, getCASSIEvents } from '@/utils/eventData'
import Gallery from '@/components/Gallery'
import EventPage from '@/components/EventPage'

const CASSIGallery = () => {
  const { galleryId } = useParams()
  const [event, setEvent] = useState(null)
  const [allCASSIEvents, setAllCASSIEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cassiEvents, specificEvent] = await Promise.all([
          getCASSIEvents(),
          galleryId ? getEventById(galleryId) : null
        ])
        setAllCASSIEvents(cassiEvents)
        setEvent(specificEvent || cassiEvents[0] || null)
      } catch (error) {
        console.error('Error loading CASSI gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [galleryId])

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
        <h1>Gallery Not Found</h1>
        <Link to="/events">Back to Events</Link>
      </div>
    )
  }

  return (
    <>
      <EventPage event={event} options={{ showGallery: true, showVideos: true }} />
      
      {/* Navigation to other CASSI galleries */}
      {allCASSIEvents.length > 1 && (
        <section className="ftco-section">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col md={7} className="heading-section text-center ftco-animate">
                <span className="subheading">More Galleries</span>
                <h2 className="mb-4">Other CASSI Golf Day Galleries</h2>
              </Col>
            </Row>
            <Row>
              {allCASSIEvents
                .filter(e => e.id !== event.id)
                .map((otherEvent) => (
                  <Col key={otherEvent.id} lg={4} xl={3} sm={6} className="mb-4">
                    <Link 
                      to={`/cassi/${otherEvent.id}`}
                      className="gallery-item d-block text-decoration-none"
                    >
                      <div className="position-relative overflow-hidden rounded">
                        <img 
                          src={otherEvent.images?.[0]?.thumbnail || "/images/projects/S0.png"} 
                          alt={otherEvent.title} 
                          className="w-100"
                          style={{ height: '200px', objectFit: 'cover' }}
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="gi-text position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                          <h5 className="mb-1">{otherEvent.title?.toUpperCase() || 'GOLF DAY'}</h5>
                          <p className="mb-0 small">{otherEvent.date || '2025'}</p>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
            </Row>
          </Container>
        </section>
      )}
    </>
  )
}

export default CASSIGallery

