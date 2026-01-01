import { Filter } from 'lucide-react'

/**
 * ClientFilter Component
 * Dropdown select for industry filtering
 * 
 * @param {Object} props
 * @param {string} props.selectedIndustry - Currently selected industry (or 'all')
 * @param {Function} props.onSelectIndustry - Callback when industry filter changes
 * @param {Object} props.industries - Industries metadata object
 */
const ClientFilter = ({ selectedIndustry = 'all', onSelectIndustry, industries = {} }) => {
  const industryKeys = Object.keys(industries)
  
  if (industryKeys.length === 0) return null

  return (
    <div className="client-filter-wrapper d-flex gap-2 align-items-center">
      <Filter className="client-filter-icon text-muted" size={20} />
      <select 
        value={selectedIndustry}
        onChange={(e) => onSelectIndustry && onSelectIndustry(e.target.value)}
        className="form-select"
        style={{ 
          minWidth: '200px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          padding: '0.5rem 2rem 0.5rem 1rem',
          fontSize: '0.875rem',
          backgroundColor: '#fff',
          cursor: 'pointer'
        }}
        aria-label="Filter by industry"
      >
        <option value="all">All Industries</option>
        {industryKeys.map((industryKey) => {
          const industry = industries[industryKey]
          return (
            <option key={industryKey} value={industryKey}>
              {industry?.name || industryKey}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default ClientFilter
