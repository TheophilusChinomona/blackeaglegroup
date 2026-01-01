import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

/**
 * ServiceFilter Component
 * Filter buttons for category filtering
 * 
 * @param {Object} props
 * @param {Object} props.selectedCategories - Object with category keys and boolean values
 * @param {Function} props.onToggleCategory - Callback when category filter changes
 * @param {Object} props.categories - Categories metadata object
 */
const ServiceFilter = ({ selectedCategories = {}, onToggleCategory, categories = {} }) => {
  const categoryKeys = Object.keys(categories)
  
  if (categoryKeys.length === 0) return null

  return (
    <div className="service-filter-wrapper d-flex gap-2 flex-wrap align-items-center">
      <Filter className="service-filter-icon" size={20} />
      {categoryKeys.map((categoryKey) => {
        const category = categories[categoryKey]
        const isSelected = selectedCategories[categoryKey] !== false // Default to true if not set
        
        return (
          <Button
            key={categoryKey}
            type="button"
            variant={isSelected ? 'default' : 'outline'}
            onClick={() => onToggleCategory && onToggleCategory(categoryKey)}
            className={`service-filter-btn ${isSelected ? 'active' : ''}`}
            style={isSelected && category?.color ? {
              backgroundColor: category.color,
              borderColor: category.color
            } : {}}
          >
            {category?.name || categoryKey}
          </Button>
        )
      })}
    </div>
  )
}

export default ServiceFilter
