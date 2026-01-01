import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { getEventById } from '@/utils/eventData'
import SEO from '@/components/SEO'

const CSIRAbout = () => {
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

  if (!event || !event.content || !event.content.about) {
    return (
      <div className="container mt-5">
        <h1>Event Not Found</h1>
        <Link to="/events/csir">Back to CSIR Event</Link>
      </div>
    )
  }

  const aboutContent = event.content.about

  return (
    <div className="csir-theme">
      <SEO
        title={`${event.title} - About Event`}
        description={aboutContent.paragraphs && aboutContent.paragraphs[0]}
        path="/events/csir/about"
      />

      {/* Page Header */}
      <section className="container-fluid bg-dark p-5" style={{ backgroundColor: '#003669' }}>
        <Row>
          <Col md={12} className="text-center">
            <h1 className="display-4 text-white">ABOUT EVENT</h1>
          </Col>
        </Row>
      </section>

      {/* About Content */}
      <section className="container-fluid py-5">
        <Container>
          <Row>
            <Col md={12}>
              <div className="titlepage text_align_center">
                <h2>More About The Event</h2>
              </div>
            </Col>
            <Col md={10} className="offset-md-1">
              <div className="about_text text_align_center">
                {aboutContent.paragraphs && aboutContent.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                {aboutContent.document && (
                  <p>
                    Check out the GOLF DAY DETAILS DOCUMENT: {aboutContent.document.description}
                    <br />
                    <a href={aboutContent.document.path} target="_blank" rel="noopener noreferrer">
                      <img src="/csir/images/flag.png" alt="PDF" />
                      <strong> {aboutContent.document.title}</strong>
                    </a>
                  </p>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default CSIRAbout
