import { Link } from 'react-router-dom'

/**
 * EventCard Component
 * Prominent call-to-action card for event promotions with event-specific styling
 * 
 * @param {Object} props
 * @param {string} props.image - Image URL for the event
 * @param {string} props.title - Event title
 * @param {string} props.date - Event date (YYYY-MM-DD or YYYY/MM/DD format)
 * @param {string} props.location - Event location
 * @param {string} props.eventType - Event type ("cot" or "csir")
 * @param {boolean} props.isFutureEvent - Whether event is in the future
 * @param {boolean} props.showRegisterButton - Whether to show Register Interest button
 * @param {Function} props.onRegisterClick - Callback when Register Interest button is clicked
 * @param {string} props.href - URL to link to (external)
 * @param {string} props.to - React Router path (internal)
 * @param {boolean} props.external - Whether link is external
 */
const EventCard = ({ 
  image, 
  title, 
  date,
  location,
  eventType,
  isFutureEvent = false,
  showRegisterButton = false,
  onRegisterClick,
  href, 
  to, 
  external = false 
}) => {
  const handleRegisterClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onRegisterClick) {
      onRegisterClick()
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    // Handle both YYYY-MM-DD and YYYY/MM/DD formats
    const dateObj = new Date(dateString.replace(/\//g, '-'))
    if (isNaN(dateObj.getTime())) return dateString
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const cardClasses = [
    'event-card',
    eventType ? `event-card-${eventType}` : '',
  ].filter(Boolean).join(' ')

  const cardContent = (
    <>
      <img 
        src={image} 
        alt={title}
        loading="lazy"
      />
      <div className="event-card-overlay">
        <div className="event-card-content">
          <h3 className="event-card-title">{title}</h3>
          {date && (
            <p className="event-card-date">{formatDate(date)}</p>
          )}
          {location && (
            <p className="event-card-location">{location}</p>
          )}
        </div>
        <div className="event-card-actions">
          <div className="event-card-cta">
            View Event →
          </div>
          {showRegisterButton && isFutureEvent && (
            <button
              className="event-card-register-btn"
              onClick={handleRegisterClick}
              aria-label={`Register interest for ${title}`}
            >
              Register Interest
            </button>
          )}
        </div>
      </div>
    </>
  )

  if (external || href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cardClasses}
        aria-label={`View ${title} event`}
      >
        {cardContent}
      </a>
    )
  }

  return (
    <Link
      to={to || href || '#'}
      className={cardClasses}
      aria-label={`View ${title} event`}
    >
      {cardContent}
    </Link>
  )
}

export default EventCard

