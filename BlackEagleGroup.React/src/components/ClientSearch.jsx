import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

/**
 * ClientSearch Component
 * Search input field with real-time filtering
 * 
 * @param {Object} props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Callback when search value changes
 * @param {string} props.placeholder - Placeholder text
 */
const ClientSearch = ({ value = '', onChange, placeholder = 'Search clients...' }) => {
  const [searchValue, setSearchValue] = useState(value)

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onChange) {
        onChange(searchValue)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [searchValue, onChange])

  // Sync with external value changes
  useEffect(() => {
    setSearchValue(value)
  }, [value])

  const handleClear = () => {
    setSearchValue('')
    if (onChange) {
      onChange('')
    }
  }

  return (
    <div className="client-search-wrapper position-relative">
      <div className="position-relative">
        <Search className="client-search-icon" size={16} />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="client-search-input pl-10"
          aria-label="Search clients"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="client-search-clear"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default ClientSearch
