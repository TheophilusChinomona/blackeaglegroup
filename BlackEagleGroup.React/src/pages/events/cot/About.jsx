import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import SponsorLogos from '@/components/SponsorLogos'
import SEO from '@/components/SEO'

const COTAbout = () => {
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

  if (!event || !event.content || !event.content.about) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/cot">Back to COT Event</Link>
      </div>
    )
  }

  const aboutContent = event.content.about

  return (
    <div className="cot-theme">
      <SEO
        title={`${event.title} - About`}
        description={aboutContent.paragraphs && aboutContent.paragraphs[0]}
        path="/events/cot/about"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5">
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">About</h1>
            <p className="text-white">
              <Link to="/events/cot" className="text-white">Golf</Link>
              <i className="far fa-square text-primary px-2"></i>
              <span>Day</span>
            </p>
          </Col>
        </Row>
      </section>

      {/* About Content */}
      <section className="container-fluid bg-secondary p-0">
        <Row className="g-0">
          <Col lg={6} className="py-6 px-5">
            <h1 className="display-5 mb-4">
              EVENT <span className="text-primary">OVERVIEW</span>
            </h1>
            {aboutContent.paragraphs && aboutContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </Col>
          <Col lg={6}>
            <div className="h-100 d-flex flex-column justify-content-center bg-primary p-5">
              <p style={{ color: 'white' }}>
                This Golf Day forms part of the City's Mayoral Fundraising Campaign in support of the U20 Africa Mayoral Assembly. It creates a unique and relaxed platform where public and private sector leaders can connect and collaborate around:
              </p>
              {aboutContent.focusAreas && (
                <div className="d-flex text-white mb-5">
                  <ul>
                    {aboutContent.focusAreas.map((area, index) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p style={{ color: 'white' }}>This initiative is strongly supported by:</p>
              {aboutContent.supporters && (
                <div className="d-flex text-white mb-5">
                  <ul>
                    {aboutContent.supporters.map((supporter, index) => (
                      <li key={index}>{supporter}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </section>

      {/* Sponsors Section */}
      {event.sponsors && event.sponsors.length > 0 && (
        <section className="container-fluid bg-primary text-secondary p-5">
          <SponsorLogos sponsors={event.sponsors} columns={3} />
        </section>
      )}
    </div>
  )
}

export default COTAbout
