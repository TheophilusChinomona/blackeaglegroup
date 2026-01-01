import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <Container>
        {/* Main Footer Content */}
        <Row className="footer-main">
          {/* Contact Info */}
          <Col lg={4} md={6}>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <address>
                <p>
                  No. 640 Wainright Street Moreleta,<br />
                  Moreleta Park, Pretoria, 0002
                </p>
                <p>
                  <a href="tel:0128835609">012 883 5609</a>
                </p>
                <p>
                  <a href="mailto:info@blackeaglegroup.co.za">info@blackeaglegroup.co.za</a>
                </p>
              </address>
            </div>
          </Col>
          
          {/* Quick Links */}
          <Col lg={4} md={6}>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <nav>
                <Link to="/about">About Us</Link>
                <Link to="/services">Services</Link>
                <Link to="/events">Golf Events</Link>
                <Link to="/contact">Contact</Link>
              </nav>
            </div>
          </Col>
          
          {/* Social Links */}
          <Col lg={4}>
            <div className="footer-social">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a
                  href="https://www.linkedin.com/company/black-eagle-group-xkk2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.facebook.com/Black-Eagle-Group-XKK2-112062043913835"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/blackeaglegroupxkk2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Copyright Bar */}
        <Row className="footer-copyright">
          <Col className="text-center">
            <p>© {currentYear} Black Eagle Group Holdings. All rights reserved.</p>
            <p className="footer-credit">
              Designed by{' '}
              <a href="https://deovolent.co.za" target="_blank" rel="noopener noreferrer">
                Deovolent IT Solutions
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

