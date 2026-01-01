/**
 * ComplianceCard Component
 * Card component for displaying compliance information with icon, title, and value
 * 
 * @param {Object} props
 * @param {string} props.icon - Emoji icon for the compliance item
 * @param {string} props.title - Compliance item title
 * @param {string} props.value - Compliance registration/value number
 * @param {number} props.index - Index for animation delay (optional)
 */
const ComplianceCard = ({ icon, title, value, index = 0 }) => {
  // Task 6.2: Compliance cards have relative delays of 0ms, 100ms, 200ms, 300ms between cards
  // Per spec table: Image (0ms), Heading (100ms), Cards (200ms, 300ms, 400ms, 500ms)
  // This gives relative delays of 0ms, 100ms, 200ms, 300ms for the 4 cards
  const animationDelay = `${200 + index * 100}ms`
  
  return (
    <div 
      className="compliance-card ftco-animate" 
      style={{ animationDelay }}
      role="article"
      tabIndex={0}
      aria-label={`${title}: ${value}`}
    >
      <div className="compliance-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="compliance-content">
        <h5>{title}</h5>
        <p>{value}</p>
      </div>
    </div>
  )
}

export default ComplianceCard
