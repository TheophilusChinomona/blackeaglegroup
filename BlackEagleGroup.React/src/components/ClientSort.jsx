import { ArrowUpDown } from 'lucide-react'

/**
 * ClientSort Component
 * Dropdown select for sorting clients
 * 
 * @param {Object} props
 * @param {string} props.sortOption - Currently selected sort option
 * @param {Function} props.onSortChange - Callback when sort option changes
 */
const ClientSort = ({ sortOption = 'alphabetical', onSortChange }) => {
  const sortOptions = [
    { value: 'alphabetical', label: 'A-Z' },
    { value: 'industry', label: 'By Industry' },
    { value: 'featured', label: 'Featured First' }
  ]

  return (
    <div className="client-sort-wrapper d-flex gap-2 align-items-center">
      <ArrowUpDown className="client-sort-icon text-muted" size={20} />
      <select 
        value={sortOption}
        onChange={(e) => onSortChange && onSortChange(e.target.value)}
        className="form-select"
        style={{ 
          minWidth: '140px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          padding: '0.5rem 2rem 0.5rem 1rem',
          fontSize: '0.875rem',
          backgroundColor: '#fff',
          cursor: 'pointer'
        }}
        aria-label="Sort clients"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ClientSort
