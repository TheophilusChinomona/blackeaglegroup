/**
 * EventMap Component
 * Displays an embedded Google Maps iframe
 * 
 * @param {Object} props
 * @param {string} props.embedCode - Google Maps embed iframe code or URL
 * @param {string} props.address - Physical address for display
 */
const EventMap = ({ embedCode, address }) => {
  if (!embedCode) {
    return null
  }

  // Extract src from embed code if it's a full iframe string
  let mapSrc = embedCode
  if (embedCode.includes('<iframe')) {
    const srcMatch = embedCode.match(/src="([^"]+)"/)
    if (srcMatch) {
      mapSrc = srcMatch[1]
    }
  }

  return (
    <div className="event-map-container">
      {address && (
        <div className="event-map-address">
          <p><i className="bi bi-geo-alt"></i> {address}</p>
        </div>
      )}
      <div className="event-map-wrapper">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Event Location Map"
        />
      </div>
    </div>
  )
}

export default EventMap

