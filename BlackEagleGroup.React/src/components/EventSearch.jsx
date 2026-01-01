import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

/**
 * EventSearch Component
 * Search input field with real-time filtering
 * 
 * @param {Object} props
 * @param {string} props.value - Current search value
 * @param {Function} props.onChange - Callback when search value changes
 * @param {string} props.placeholder - Placeholder text
 */
const EventSearch = ({ value = '', onChange, placeholder = 'Search events...' }) => {
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
    <div className="event-search-wrapper position-relative">
      <div className="position-relative">
        <Search className="event-search-icon" size={16} />
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="event-search-input pl-10"
        />
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="event-search-clear"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default EventSearch
