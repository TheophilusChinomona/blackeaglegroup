import servicesData from '../data/services.json'

/**
 * Service Data Loading Utilities
 * Provides functions to load and filter service data from JSON files
 */

/**
 * Load all service data
 * @returns {Promise<Object>} Promise that resolves to service data object
 */
export const loadServiceData = async () => {
  try {
    // Return the services data
    // In a real scenario, this might fetch from an API
    return servicesData
  } catch (error) {
    console.error('Error loading service data:', error)
    return {
      services: [],
      serviceCategories: {}
    }
  }
}

/**
 * Get all services
 * @returns {Promise<Array>} Promise that resolves to array of services
 */
export const getAllServices = async () => {
  try {
    const data = await loadServiceData()
    return data.services || []
  } catch (error) {
    console.error('Error getting all services:', error)
    return []
  }
}

/**
 * Get services by category (security, property, business)
 * @param {string} category - Service category (security, property, business)
 * @returns {Promise<Array>} Promise that resolves to array of services of specified category
 */
export const getServicesByCategory = async (category) => {
  try {
    const services = await getAllServices()
    const filtered = services.filter(service => service.category === category)
    // Sort by order field if available, otherwise maintain array order
    return filtered.sort((a, b) => {
      const orderA = a.order || 999
      const orderB = b.order || 999
      return orderA - orderB
    })
  } catch (error) {
    console.error(`Error getting services by category ${category}:`, error)
    return []
  }
}

/**
 * Get service by ID
 * @param {string|number} id - Service ID
 * @returns {Promise<Object|null>} Promise that resolves to service object or null
 */
export const getServiceById = async (id) => {
  try {
    const services = await getAllServices()
    return services.find(service => service.id === id) || null
  } catch (error) {
    console.error(`Error getting service by ID ${id}:`, error)
    return null
  }
}

/**
 * Get service categories metadata
 * @returns {Promise<Object>} Promise that resolves to service categories object
 */
export const getServiceCategories = async () => {
  try {
    const data = await loadServiceData()
    return data.serviceCategories || {}
  } catch (error) {
    console.error('Error getting service categories:', error)
    return {}
  }
}

/**
 * Get featured services
 * @returns {Promise<Array>} Promise that resolves to array of featured services
 */
export const getFeaturedServices = async () => {
  try {
    const services = await getAllServices()
    return services.filter(service => service.featured === true)
  } catch (error) {
    console.error('Error getting featured services:', error)
    return []
  }
}

/**
 * Validate service data structure
 * @param {Object} service - Service object to validate
 * @returns {boolean} True if service structure is valid
 */
export const validateService = (service) => {
  if (!service || typeof service !== 'object') {
    return false
  }
  
  const requiredFields = ['id', 'category', 'title', 'description', 'image']
  return requiredFields.every(field => service.hasOwnProperty(field))
}

/**
 * Handle data loading errors gracefully
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {Object} Default/fallback data structure
 */
export const handleServiceDataError = (error, context = 'unknown') => {
  console.error(`Service data loading error in ${context}:`, error)
  
  return {
    services: [],
    serviceCategories: {},
    error: {
      message: error.message || 'Unknown error',
      context
    }
  }
}

// Export default for convenience
export default {
  loadServiceData,
  getAllServices,
  getServicesByCategory,
  getServiceById,
  getServiceCategories,
  getFeaturedServices,
  validateService,
  handleServiceDataError
}
