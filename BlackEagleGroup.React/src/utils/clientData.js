import clientsData from '../data/clients.json'

/**
 * Client Data Loading Utilities
 * Provides functions to load and filter client data from JSON files
 */

/**
 * Load all client data
 * @returns {Promise<Object>} Promise that resolves to client data object
 */
export const loadClientData = async () => {
  try {
    // Return the clients data
    // In a real scenario, this might fetch from an API
    return clientsData
  } catch (error) {
    console.error('Error loading client data:', error)
    return {
      clients: [],
      clientIndustries: {}
    }
  }
}

/**
 * Get all clients
 * @returns {Promise<Array>} Promise that resolves to array of clients
 */
export const getAllClients = async () => {
  try {
    const data = await loadClientData()
    return data.clients || []
  } catch (error) {
    console.error('Error getting all clients:', error)
    return []
  }
}

/**
 * Get clients by industry
 * @param {string} industry - Industry category (government, energy, technology, etc.)
 * @returns {Promise<Array>} Promise that resolves to array of clients of specified industry
 */
export const getClientsByIndustry = async (industry) => {
  try {
    const clients = await getAllClients()
    const filtered = clients.filter(client => client.industry === industry)
    // Sort by order field if available, otherwise maintain array order
    return filtered.sort((a, b) => {
      const orderA = a.order || 999
      const orderB = b.order || 999
      return orderA - orderB
    })
  } catch (error) {
    console.error(`Error getting clients by industry ${industry}:`, error)
    return []
  }
}

/**
 * Get client by ID
 * @param {string|number} id - Client ID
 * @returns {Promise<Object|null>} Promise that resolves to client object or null
 */
export const getClientById = async (id) => {
  try {
    const clients = await getAllClients()
    return clients.find(client => client.id === id) || null
  } catch (error) {
    console.error(`Error getting client by ID ${id}:`, error)
    return null
  }
}

/**
 * Get featured clients
 * @returns {Promise<Array>} Promise that resolves to array of featured clients
 */
export const getFeaturedClients = async () => {
  try {
    const clients = await getAllClients()
    return clients.filter(client => client.featured === true)
  } catch (error) {
    console.error('Error getting featured clients:', error)
    return []
  }
}

/**
 * Get client industries metadata
 * @returns {Promise<Object>} Promise that resolves to client industries object
 */
export const getClientIndustries = async () => {
  try {
    const data = await loadClientData()
    return data.clientIndustries || {}
  } catch (error) {
    console.error('Error getting client industries:', error)
    return {}
  }
}

/**
 * Search clients by keyword
 * @param {string} keyword - Search keyword
 * @param {Array} clients - Optional array of clients to search (if not provided, loads all clients)
 * @returns {Promise<Array>} Promise that resolves to array of matching clients
 */
export const searchClients = async (keyword, clients = null) => {
  try {
    const clientsToSearch = clients || await getAllClients()
    
    if (!keyword || keyword.trim() === '') {
      return clientsToSearch
    }
    
    const lowerKeyword = keyword.toLowerCase().trim()
    
    return clientsToSearch.filter(client => {
      const searchableText = [
        client.name || '',
        client.location || '',
        client.description || '',
        client.industry || ''
      ].join(' ').toLowerCase()
      
      return searchableText.includes(lowerKeyword)
    })
  } catch (error) {
    console.error(`Error searching clients with keyword ${keyword}:`, error)
    return []
  }
}

/**
 * Validate client data structure
 * @param {Object} client - Client object to validate
 * @returns {boolean} True if client structure is valid
 */
export const validateClient = (client) => {
  if (!client || typeof client !== 'object') {
    return false
  }
  
  const requiredFields = ['id', 'name', 'industry', 'image', 'location', 'referenceLink', 'phoneNumber']
  return requiredFields.every(field => client.hasOwnProperty(field))
}

/**
 * Handle data loading errors gracefully
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 * @returns {Object} Default/fallback data structure
 */
export const handleClientDataError = (error, context = 'unknown') => {
  console.error(`Client data loading error in ${context}:`, error)
  
  return {
    clients: [],
    clientIndustries: {},
    error: {
      message: error.message || 'Unknown error',
      context
    }
  }
}

// Export default for convenience
export default {
  loadClientData,
  getAllClients,
  getClientsByIndustry,
  getClientById,
  getFeaturedClients,
  getClientIndustries,
  searchClients,
  validateClient,
  handleClientDataError
}
