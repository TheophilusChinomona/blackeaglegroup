/**
 * Spinner Component
 * Reusable loading spinner component
 * References loader design from public_html/index.html (ftco-loader)
 */

import { cn } from '@/utils'

/**
 * Spinner Component
 * @param {string} size - Size of spinner: 'sm', 'md', 'lg' (default: 'md')
 * @param {string} className - Additional CSS classes
 * @param {string} label - Accessible label for screen readers (default: 'Loading...')
 */
const Spinner = ({ 
  size = 'md', 
  className,
  label = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }

  return (
    <div 
      className={cn('d-flex justify-content-center align-items-center', className)}
      role="status"
      aria-label={label}
    >
      <div 
        className={cn('spinner-border text-primary', sizeClasses[size])}
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">{label}</span>
      </div>
    </div>
  )
}

export default Spinner

