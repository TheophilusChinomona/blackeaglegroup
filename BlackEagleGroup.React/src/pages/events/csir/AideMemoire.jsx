import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import SEO from '@/components/SEO'

const CSIRAideMemoire = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (!event || !event.content || !event.content.aideMemoire) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/csir">Back to CSIR Event</Link>
      </div>
    )
  }

  const aideMemoire = event.content.aideMemoire

  return (
    <div className="csir-theme">
      <SEO
        title={`${event.title} - Aide Memoire`}
        description="Event details and registration information"
        path="/events/csir/aide-memoire"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5" style={{ backgroundColor: '#003669' }}>
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">AIDE MEMOIRE</h1>
          </Col>
        </Row>
      </section>

      {/* Aide Memoire Content */}
      <section className="container-fluid py-5">
        <Container>
          <Row>
            <Col md={6}>
              <div className="packages_box">
                <div className="tusc text_align_left">
                  <p>
                    Here is additional information in relation to the CSIR Inaugural Charity Golf Day.
                    <br /><br />
                    Fourball registration closing date {aideMemoire.registrationDeadline}.
                    <br /><br />
                    {aideMemoire.sponsorDeadline}
                    <br /><br />
                    {aideMemoire.note}
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="packages_box">
                <hr />
                <h3>Event</h3>
                <p>{aideMemoire.event}</p>
                <hr />
                <h3>Date</h3>
                <p>{aideMemoire.date}</p>
                <hr />
                <h3>Venue</h3>
                <p>
                  {aideMemoire.venue}
                  <br />
                  <a href={event.venue.url} target="_blank" rel="noopener noreferrer">
                    {event.venue.name}
                  </a>
                </p>
                <hr />
                <h3>Times</h3>
                <p>{aideMemoire.times}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default CSIRAideMemoire

