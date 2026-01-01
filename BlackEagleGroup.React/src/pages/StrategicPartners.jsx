import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import ClientCard from '@/components/ClientCard'
import { strategicPartners } from '@/data/strategicPartners'

const StrategicPartners = () => {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="hero-wrap hero-wrap-2" 
        style={{ backgroundImage: "url('/images/bg_2.jpg')" }}
      >
        <div className="overlay"></div>
        <Container className="hero-content">
          <Col lg={12} className="hero-text-col">
            {/* Breadcrumbs */}
            <div className="hero-breadcrumbs">
              <span>
                <Link to="/">Home</Link>
              </span>
              <span>
                <i className="ion-ios-arrow-forward"></i>
                <span>Strategic Partners</span>
              </span>
            </div>

            {/* Title */}
            <div className="hero-text text-center">
              <h1 className="hero-heading">Strategic Partners</h1>
            </div>
          </Col>
        </Container>
      </section>

      {/* Strategic Partners Section */}
      <section className="ftco-section">
        <div className="container">
          <div className="row">
            {strategicPartners.map((partner, index) => (
              <div key={index} className="col-md-3">
                <ClientCard
                  image={partner.image}
                  name={partner.name}
                  location={partner.location}
                  referenceLink={partner.referenceLink}
                  phoneNumber={partner.phoneNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default StrategicPartners

