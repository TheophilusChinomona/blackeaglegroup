import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

/**
 * BrandTextarea Component
 * Brand-styled textarea with focus states and validation styling
 * Compatible with react-hook-form via forwardRef
 * 
 * @param {Object} props
 * @param {string} props.label - Optional label text
 * @param {string} props.error - Error message to display
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.rows - Number of rows (default: 6)
 * @param {...any} props - All standard textarea props
 */
const BrandTextarea = React.forwardRef(({ 
  label, 
  error, 
  className,
  rows = 6,
  id,
  ...props 
}, ref) => {
  // Generate an id if not provided (for label association)
  const textareaId = id || `brand-textarea-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="brand-form-group">
      {label && (
        <label htmlFor={textareaId} className="brand-form-label">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        className={cn(
          "brand-textarea",
          error && "brand-textarea-error",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {error && (
        <span 
          id={`${textareaId}-error`}
          className="brand-form-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
})

BrandTextarea.displayName = 'BrandTextarea'

BrandTextarea.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  rows: PropTypes.number,
  id: PropTypes.string,
}

export default BrandTextarea
