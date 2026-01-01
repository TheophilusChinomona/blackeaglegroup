import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import EventContactForm from '@/components/EventContactForm'
import EventMap from '@/components/EventMap'
import SEO from '@/components/SEO'

const COTContact = () => {
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

  if (!event || !event.contact) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/cot">Back to COT Event</Link>
      </div>
    )
  }

  return (
    <div className="cot-theme">
      <SEO
        title={`${event.title} - Contact`}
        description="Contact us for any queries about the event"
        path="/events/cot/contact"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5">
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">Contact Us</h1>
            <p className="text-white">
              <Link to="/events/cot" className="text-white">Home</Link>
              <i className="far fa-square text-primary px-2"></i>
              <span>Contact</span>
            </p>
          </Col>
        </Row>
      </section>

      {/* Contact Form and Map */}
      <section className="container-fluid bg-secondary px-0">
        <Row className="g-0">
          <Col lg={6} className="py-6 px-5">
            {event.contact.form && (
              <EventContactForm
                fields={event.contact.form.fields}
                endpoint={event.contact.form.endpoint}
                eventName={event.title}
              />
            )}
          </Col>
          <Col lg={6} style={{ minHeight: '400px' }}>
            <div className="position-relative h-100">
              {event.contact.map && (
                <EventMap
                  embedCode={event.contact.map.embed}
                  address={event.contact.map.address}
                />
              )}
            </div>
          </Col>
        </Row>
      </section>
    </div>
  )
}

export default COTContact
