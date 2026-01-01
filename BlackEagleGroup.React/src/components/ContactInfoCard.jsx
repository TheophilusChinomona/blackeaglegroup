import PropTypes from 'prop-types'
import { MapPin, Phone, Mail } from 'lucide-react'

/**
 * ContactInfoCard Component
 * Combined contact information card displaying Address, Phone, and Email
 * Styled with brand design system - white background, 4px green top border
 * 
 * @param {Object} props
 * @param {string} props.className - Additional CSS classes
 */
const ContactInfoCard = ({ className = '' }) => {
  return (
    <div className={`contact-info-card ${className}`}>
      <h2 className="contact-info-title">Get in Touch</h2>
      
      <div className="contact-info-grid">
        {/* Address */}
        <div className="contact-info-item">
          <div className="contact-info-icon">
            <MapPin size={24} aria-hidden="true" />
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">Address</h4>
            <p>
              No. 640 Wainright Street Moreleta,<br />
              Moreleta Park, Pretoria, 0002
            </p>
          </div>
        </div>
        
        {/* Phone */}
        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Phone size={24} aria-hidden="true" />
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">Phone</h4>
            <p>
              <a href="tel:0128835609">012 883 5609</a><br />
              <a href="tel:0826249680">082 624 9680</a>
            </p>
          </div>
        </div>
        
        {/* Email */}
        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Mail size={24} aria-hidden="true" />
          </div>
          <div className="contact-info-content">
            <h4 className="contact-info-label">Email</h4>
            <p>
              <a href="mailto:info@blackeaglegroup.co.za">
                info@blackeaglegroup.co.za
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

ContactInfoCard.propTypes = {
  className: PropTypes.string
}

export default ContactInfoCard
