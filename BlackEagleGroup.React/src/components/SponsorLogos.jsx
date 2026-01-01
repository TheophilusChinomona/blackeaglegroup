import { Container, Row, Col } from 'react-bootstrap'

/**
 * SponsorLogos Component
 * Displays sponsor logos in a grid layout or scrolling carousel
 * 
 * @param {Object} props
 * @param {Array} props.sponsors - Array of sponsor objects with name, logo, url
 * @param {number} props.columns - Number of columns (default: 3, only used in grid mode)
 * @param {boolean} props.carousel - If true, displays logos in a scrolling carousel (default: false)
 */
const SponsorLogos = ({ sponsors = [], columns = 3, carousel = false }) => {
  if (!sponsors || sponsors.length === 0) {
    return null
  }

  if (carousel) {
    return (
      <div className="sponsor-logos-section sponsor-logos-carousel">
        <Container>
          <Row className="justify-content-center">
            <Col md={12} className="text-center mb-5">
              <h1 className="display-5 mb-4">EVENT SPONSORS</h1>
            </Col>
          </Row>
          <div className="sponsor-carousel-wrapper">
            <div className="sponsor-carousel-track">
              {/* Duplicate logos for seamless loop */}
              {[...sponsors, ...sponsors].map((sponsor, index) => (
                <div key={index} className="sponsor-carousel-item">
                  {sponsor.url ? (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sponsor-logo-link"
                      aria-label={`Visit ${sponsor.name} website`}
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="sponsor-logo"
                        loading="lazy"
                      />
                    </a>
                  ) : (
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="sponsor-logo"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    )
  }

  const colSize = 12 / columns

  return (
    <div className="sponsor-logos-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} className="text-center mb-5">
            <h1 className="display-5 mb-4">EVENT SPONSORS</h1>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          {sponsors.map((sponsor, index) => (
            <Col
              key={index}
              md={colSize}
              sm={6}
              className="mb-4 d-flex justify-content-center align-items-center"
            >
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sponsor-logo-link"
                  aria-label={`Visit ${sponsor.name} website`}
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="sponsor-logo"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="sponsor-logo"
                  loading="lazy"
                />
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default SponsorLogos

