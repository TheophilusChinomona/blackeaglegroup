import PropTypes from 'prop-types'

/**
 * SectionHeader Component
 * Reusable section header with brand typography and styling
 * 
 * @param {Object} props
 * @param {string} props.label - Optional subheading/label text (uppercase, brand primary)
 * @param {string} props.title - Main section title (Playfair Display)
 * @param {string} props.description - Optional description text
 * @param {string} props.align - Text alignment: 'center' (default) or 'left'
 * @param {string} props.className - Additional CSS classes
 */
const SectionHeader = ({ 
  label, 
  title, 
  description, 
  align = 'center',
  className = ''
}) => {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'
  
  return (
    <div className={`section-header ${alignmentClass} ${className}`}>
      {label && (
        <span className="section-header-label">
          {label}
        </span>
      )}
      {title && (
        <h2 className="section-header-title">
          {title}
        </h2>
      )}
      {description && (
        <p className="section-header-description">
          {description}
        </p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  align: PropTypes.oneOf(['center', 'left']),
  className: PropTypes.string
}

export default SectionHeader
