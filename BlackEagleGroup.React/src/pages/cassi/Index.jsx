import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getCASSIEvents } from '@/utils/eventData'

const CASSIIndex = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const cassiEvents = await getCASSIEvents()
        setEvents(cassiEvents)
      } catch (error) {
        console.error('Error loading CASSI events:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
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

  return (
    <>
      <section 
        className="hero-wrap hero-wrap-2 js-fullheight" 
        style={{ backgroundImage: "url('/images/projects/Happy.jpg')" }}
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
                <span>CASSI Galleries</span>
              </p>
              <h1 className="mb-3 bread">CASSI Golf Day Galleries</h1>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="gallery-section ftco-section">
        <Container>
          <Row className="gallery-grid">
            {events.map((event) => (
              <Col key={event.id} lg={4} xl={3} sm={6} className="mb-4">
                <Link 
                  to={`/cassi/${event.id}`}
                  className="gallery-item d-block text-decoration-none"
                >
                  <div className="position-relative overflow-hidden rounded">
                    <img 
                      src={event.images?.[0]?.thumbnail || "/images/projects/S0.png"} 
                      alt={event.title} 
                      className="w-100"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="gi-text position-absolute bottom-0 start-0 end-0 p-3 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                      <h4 className="mb-1">{event.title?.toUpperCase() || 'GOLF DAY'}</h4>
                      <p className="mb-0">{event.date || '2025'}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default CASSIIndex

