import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

/**
 * EventFilter Component
 * Filter dropdown/buttons for date filtering
 * 
 * @param {Object} props
 * @param {string} props.value - Current filter value ("all", "upcoming", "past")
 * @param {Function} props.onChange - Callback when filter changes
 */
const EventFilter = ({ value = 'all', onChange }) => {
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'past', label: 'Past' }
  ]

  return (
    <div className="event-filter-wrapper d-flex gap-2 flex-wrap">
      <Calendar className="event-filter-icon" size={20} />
      {filters.map((filter) => (
        <Button
          key={filter.id}
          type="button"
          variant={value === filter.id ? 'default' : 'outline'}
          onClick={() => onChange && onChange(filter.id)}
          className={`event-filter-btn ${value === filter.id ? 'active' : ''}`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}

export default EventFilter
