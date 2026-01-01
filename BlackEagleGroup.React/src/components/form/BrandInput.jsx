import React from 'react'
import PropTypes from 'prop-types'
import { cn } from '@/lib/utils'

/**
 * BrandInput Component
 * Brand-styled input field with focus states and validation styling
 * Compatible with react-hook-form via forwardRef
 * 
 * @param {Object} props
 * @param {string} props.label - Optional label text
 * @param {string} props.error - Error message to display
 * @param {string} props.className - Additional CSS classes
 * @param {...any} props - All standard input props
 */
const BrandInput = React.forwardRef(({ 
  label, 
  error, 
  className,
  id,
  ...props 
}, ref) => {
  // Generate an id if not provided (for label association)
  const inputId = id || `brand-input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className="brand-form-group">
      {label && (
        <label htmlFor={inputId} className="brand-form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={cn(
          "brand-input",
          error && "brand-input-error",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span 
          id={`${inputId}-error`}
          className="brand-form-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
})

BrandInput.displayName = 'BrandInput'

BrandInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
}

export default BrandInput
