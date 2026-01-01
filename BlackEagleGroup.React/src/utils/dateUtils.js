/**
 * Date Utility Functions
 * Provides functions for date comparison and formatting
 */

/**
 * Parse event date string (handles YYYY-MM-DD and YYYY/MM/DD formats)
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Parsed date object or null if invalid
 */
export const parseEventDate = (dateString) => {
  if (!dateString) return null
  
  // Handle both YYYY-MM-DD and YYYY/MM/DD formats
  const normalizedDate = dateString.replace(/\//g, '-')
  const dateObj = new Date(normalizedDate)
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    // Try parsing as just year (e.g., "2025")
    const year = parseInt(dateString, 10)
    if (!isNaN(year) && year > 1900 && year < 2100) {
      return new Date(year, 0, 1) // January 1st of that year
    }
    return null
  }
  
  return dateObj
}

/**
 * Compare event date with current date
 * @param {string} eventDate - Event date string
 * @returns {Object} Object with isFutureEvent, isPastEvent, isToday flags
 */
export const compareEventDate = (eventDate) => {
  const parsedDate = parseEventDate(eventDate)
  if (!parsedDate) {
    return {
      isFutureEvent: false,
      isPastEvent: false,
      isToday: false,
      isValid: false
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const eventDateOnly = new Date(parsedDate)
  eventDateOnly.setHours(0, 0, 0, 0)

  const isToday = eventDateOnly.getTime() === today.getTime()
  const isFutureEvent = eventDateOnly > today
  const isPastEvent = eventDateOnly < today

  return {
    isFutureEvent,
    isPastEvent,
    isToday,
    isValid: true
  }
}

/**
 * Check if event is a future event
 * @param {string} eventDate - Event date string
 * @returns {boolean} True if event is in the future
 */
export const isFutureEvent = (eventDate) => {
  return compareEventDate(eventDate).isFutureEvent
}

/**
 * Format event date for display
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export const formatEventDate = (dateString) => {
  const parsedDate = parseEventDate(dateString)
  if (!parsedDate) return dateString

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
