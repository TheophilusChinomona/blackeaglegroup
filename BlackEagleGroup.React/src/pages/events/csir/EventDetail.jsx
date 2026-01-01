import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import SponsorLogos from '@/components/SponsorLogos'
import SEO from '@/components/SEO'

const CSIREventDetail = () => {
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

  if (!event) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/csir">Back to CSIR Event</Link>
      </div>
    )
  }

  // Group sponsors by tier if available
  const diamondSponsors = event.sponsors?.filter(s => s.tier === 'diamond') || []
  const otherSponsors = event.sponsors?.filter(s => s.tier !== 'diamond') || []

  return (
    <div className="csir-theme">
      <SEO
        title={`${event.title} - Event Detail`}
        description="Event details and sponsorship information"
        path="/events/csir/event-detail"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5" style={{ backgroundColor: '#003669' }}>
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">EVENT DETAIL</h1>
          </Col>
        </Row>
      </section>

      {/* Event Detail Content */}
      <section className="container-fluid py-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="text-center mb-5">
                <h2>CSIR Charity Golf Day, powered by H3C Technologies Africa took place on {event.date} at the {event.venue.name}.</h2>
                <p>We are grateful to the following sponsors who made the day and fundraising possible:</p>
              </div>
            </Col>
          </Row>

          {/* Diamond Sponsors */}
          {diamondSponsors.length > 0 && (
            <Row className="mb-5">
              <Col md={12} className="text-center">
                <img src="/csir/Logos/Diamond.png" alt="Diamond Sponsor" className="mb-3" />
                <SponsorLogos sponsors={diamondSponsors} columns={1} />
                <hr className="my-5" />
              </Col>
            </Row>
          )}

          {/* Other Sponsors */}
          {otherSponsors.length > 0 && (
            <Row>
              <Col md={12} className="text-center">
                <img src="/csir/Logos/Gold.png" alt="Gold Sponsor" className="mb-3" />
                <SponsorLogos sponsors={otherSponsors} columns={4} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </div>
  )
}

export default CSIREventDetail
