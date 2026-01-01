import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import SEO from '@/components/SEO'

const COTTeam = () => {
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)

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

  if (!event || !event.content || !event.content.aideMemoire) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/cot">Back to COT Event</Link>
      </div>
    )
  }

  const aideMemoire = event.content.aideMemoire

  return (
    <div className="cot-theme">
      <SEO
        title={`${event.title} - Aide Memoire`}
        description="Event details and information"
        path="/events/cot/team"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5">
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">Aide Memoire</h1>
            <p className="text-white">
              <Link to="/events/cot" className="text-white">Home</Link>
              <i className="far fa-square text-primary px-2"></i>
              <span>Aide Memoire</span>
            </p>
          </Col>
        </Row>
      </section>

      {/* Aide Memoire Content */}
      <section className="container-fluid py-6 px-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
          <h1 className="display-5 mb-0">Aide Memoire</h1>
          <hr className="w-25 mx-auto bg-primary" />
        </div>

        <div className="text-center">
          <h4 className="text-primary mb-4">Event</h4>
          <p className="mb-4">{aideMemoire.event}</p>
          <hr className="w-25 mx-auto bg-primary" />

          <h4 className="text-primary mb-4">Date</h4>
          <p className="mb-4">{aideMemoire.date}</p>
          <hr className="w-25 mx-auto bg-primary" />

          <h4 className="text-primary mb-4">Venue</h4>
          <p className="mb-4">
            {aideMemoire.venue.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                {index < aideMemoire.venue.split('\n').length - 1 && <br />}
              </span>
            ))}
            <br /><br />
            Click on the{' '}
            <a href={event.venue.mapUrl || '#'} target="_blank" rel="noopener noreferrer">
              Google Map
            </a>{' '}
            for directions
            <br />
            For more information about{' '}
            <a href={event.venue.url} target="_blank" rel="noopener noreferrer">
              {event.venue.name}
            </a>
          </p>
          <hr className="w-25 mx-auto bg-primary" />

          <h4 className="text-primary mb-4">Times</h4>
          <p className="mb-4">{aideMemoire.times}</p>
          <hr className="w-25 mx-auto bg-primary" />

          {aideMemoire.document && (
            <>
              <h4 className="text-primary mb-4">Business Networking Golf Day Document</h4>
              <p>
                <strong>Check out the GOLF DAY DETAILS DOCUMENT</strong>:<br />
                <a href={aideMemoire.document.path} target="_blank" rel="noopener noreferrer">
                  <img src="/COT/img/flag.png" alt="PDF" /> {aideMemoire.document.title}
                </a>
                <br />
                {aideMemoire.document.description}
              </p>
              <hr className="w-25 mx-auto bg-primary" />
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default COTTeam
