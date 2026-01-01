import eventsData from '../data/events.json'

/**
 * Event Data Loading Utilities
 * Provides functions to load and filter event data from JSON files
 */

/**
 * Load all event data
 * @returns {Promise<Object>} Promise that resolves to event data object
 */
export const loadEventData = async () => {
  try {
    // Return the events data
    // In a real scenario, this might fetch from an API
    return eventsData
  } catch (error) {
    console.error('Error loading event data:', error)
    return {
      events: [],
      eventTypes: {}
    }
  }
}

/**
 * Get all events
 * @returns {Promise<Array>} Promise that resolves to array of events
 */
export const getAllEvents = async () => {
  try {
    const data = await loadEventData()
    return data.events || []
  } catch (error) {
    console.error('Error getting all events:', error)
    return []
  }
}

/**
 * Get events by type (cot, csir, cassi)
 * @param {string} type - Event type (cot, csir, cassi)
 * @returns {Promise<Array>} Promise that resolves to array of events of specified type
 */
export const getEventByType = async (type) => {
  try {
    const events = await getAllEvents()
    return events.filter(event => event.type === type)
  } catch (error) {
    console.error(`Error getting events by type ${type}:`, error)
    return []
  }
}

/**
 * Get event by ID
 * @param {string} id - Event ID
 * @returns {Promise<Object|null>} Promise that resolves to event object or null
 */
export const getEventById = async (id) => {
  try {
    const events = await getAllEvents()
    return events.find(event => event.id === id) || null
  } catch (error) {
    console.error(`Error getting event by ID ${id}:`, error)
    return null
  }
}

/**
 * Get event types metadata
 * @returns {Promise<Object>} Promise that resolves to event types object
 */
export const getEventTypes = async () => {
  try {
    const data = await loadEventData()
    return data.eventTypes || {}
  } catch (error) {
    console.error('Error getting event types:', error)
    return {}
  }
}

/**
 * Get CASSI gallery events
 * @returns {Promise<Array>} Promise that resolves to array of CASSI gallery events
 */
export const getCASSIEvents = async () => {
  return getEventByType('cassi')
}

/**
 * Get COT events
 * @returns {Promise<Array>} Promise that resolves to array of COT events
 */
export const getCOTEvents = async () => {
  return getEventByType('cot')
}

/**
 * Get CSIR events
 * @returns {Promise<Array>} Promise that resolves to array of CSIR events
 */
export const getCSIREvents = async () => {
  return getEventByType('csir')
}

/**
 * Search events by keyword
 * @param {string} keyword - Search keyword
 * @param {Array} events - Optional array of events to search (if not provided, loads all events)
 * @returns {Promise<Array>} Promise that resolves to array of matching events
 */
export const searchEvents = async (keyword, events = null) => {
  try {
    const eventsToSearch = events || await getAllEvents()
    
    if (!keyword || keyword.trim() === '') {
      return eventsToSearch
    }
    
    const lowerKeyword = keyword.toLowerCase().trim()
    
    return eventsToSearch.filter(event => {
      const searchableText = [
        event.title || '',
        event.subtitle || '',
        event.description || '',
        event.location || ''
      ].join(' ').toLowerCase()
      
      return searchableText.includes(lowerKeyword)
    })
  } catch (error) {
    console.error(`Error searching events with keyword ${keyword}:`, error)
    return []
  }
}

/**
 * Filter events by date (upcoming, past, all)
 * @param {Array} events - Array of events to filter
 * @param {string} filterType - Filter type: "all", "upcoming", "past"
 * @returns {Array} Filtered array of events
 */
export const filterEventsByDate = (events, filterType = 'all') => {
  if (filterType === 'all') {
    return events
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return events.filter(event => {
    if (!event.date) return filterType === 'all'

    // Handle both YYYY-MM-DD and YYYY/MM/DD formats
    const normalizedDate = event.date.replace(/\//g, '-')
    const eventDate = new Date(normalizedDate)
    
    if (isNaN(eventDate.getTime())) {
      // If date is invalid, try parsing as just year
      const year = parseInt(event.date, 10)
      if (!isNaN(year) && year > 1900 && year < 2100) {
        const yearDate = new Date(year, 0, 1)
        if (filterType === 'upcoming') {
          return yearDate >= today
        } else if (filterType === 'past') {
          return yearDate < today
        }
      }
      return filterType === 'all'
    }

    eventDate.setHours(0, 0, 0, 0)

    if (filterType === 'upcoming') {
      return eventDate >= today
    } else if (filterType === 'past') {
      return eventDate < today
    }

    return true
  })
}

/**
 * Combined search and filter function
 * @param {string} keyword - Search keyword
 * @param {string} dateFilter - Date filter: "all", "upcoming", "past"
 * @param {Array} events - Optional array of events (if not provided, loads all events)
 * @returns {Promise<Array>} Promise that resolves to filtered and searched events
 */
export const searchAndFilterEvents = async (keyword = '', dateFilter = 'all', events = null) => {
  try {
    // First apply search
    const searchedEvents = await searchEvents(keyword, events)
    
    // Then apply date filter
    return filterEventsByDate(searchedEvents, dateFilter)
  } catch (error) {
    console.error('Error in searchAndFilterEvents:', error)
    return []
  }
}

/**
 * Get event navigation for a specific event type
 * @param {string} type - Event type (cot, csir, cassi)
 * @returns {Promise<Array>} Promise that resolves to navigation array
 */
export const getEventNavigation = async (type) => {
  try {
    const events = await getEventByType(type)
    if (events.length > 0 && events[0].navigation) {
      return events[0].navigation
    }
    return []
  } catch (error) {
    console.error(`Error getting navigation for type ${type}:`, error)
    return []
  }
}

/**
 * Get event pages for a specific event
 * @param {string} id - Event ID
 * @returns {Promise<Array>} Promise that resolves to pages array
 */
export const getEventPages = async (id) => {
  try {
    const event = await getEventById(id)
    return event?.pages || []
  } catch (error) {
    console.error(`Error getting pages for event ${id}:`, error)
    return []
  }
}

/**
 * Validate event data structure
 * @param {Object} event - Event object to validate
 * @returns {boolean} True if event structure is valid
 */
export const validateEvent = (event) => {
  if (!event || typeof event !== 'object') {
    return false
  }
  
  const requiredFields = ['id', 'type', 'title']
  return requiredFields.every(field => event.hasOwnProperty(field))
}

/**
 * Handle data loading errors gracefully
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {Object} Default/fallback data structure
 */
export const handleDataError = (error, context = 'unknown') => {
  console.error(`Data loading error in ${context}:`, error)
  
  return {
    events: [],
    eventTypes: {},
    error: {
      message: error.message || 'Unknown error',
      context
    }
  }
}

// Export default for convenience
export default {
  loadEventData,
  getAllEvents,
  getEventByType,
  getEventById,
  getEventTypes,
  getCASSIEvents,
  getCOTEvents,
  getCSIREvents,
  searchEvents,
  getEventNavigation,
  getEventPages,
  validateEvent,
  handleDataError
}

