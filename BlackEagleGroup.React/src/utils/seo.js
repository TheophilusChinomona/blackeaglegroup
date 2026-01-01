/**
 * SEO Utilities
 * Functions for generating meta tags, structured data, and SEO-related content
 */

const BASE_URL = 'https://blackeaglegroup.co.za'

/**
 * Generate Organization schema (JSON-LD)
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Black Eagle Group Holdings Pty Ltd',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+27-12-883-5609',
      contactType: 'Customer Service',
      email: 'info@blackeaglegroup.co.za',
      areaServed: 'ZA',
      availableLanguage: 'en'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 640 Wainright Street Moreleta, Moreleta Park',
      addressLocality: 'Pretoria',
      postalCode: '0002',
      addressCountry: 'ZA'
    },
    sameAs: [
      // Add social media links if available
    ]
  }
}

/**
 * Generate Service schema (JSON-LD)
 */
export const generateServiceSchema = (service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Black Eagle Group Holdings Pty Ltd',
      url: BASE_URL
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa'
    }
  }
}

/**
 * Generate Event schema (JSON-LD)
 */
export const generateEventSchema = (event) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    description: event.description,
    startDate: event.date || new Date().toISOString(),
    location: {
      '@type': 'Place',
      name: event.location || event.venue?.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pretoria',
        addressCountry: 'ZA'
      }
    },
    organizer: {
      '@type': 'Organization',
      name: 'Black Eagle Group Holdings Pty Ltd',
      url: BASE_URL
    },
    image: event.images?.[0]?.original ? `${BASE_URL}${event.images[0].original}` : undefined
  }
}

/**
 * Generate BreadcrumbList schema (JSON-LD)
 */
export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`
    }))
  }
}

/**
 * Generate page meta tags
 */
export const generatePageMeta = ({ title, description, path, image, type = 'website' }) => {
  const url = `${BASE_URL}${path}`
  const imageUrl = image ? (image.startsWith('http') ? image : `${BASE_URL}${image}`) : `${BASE_URL}/images/og-default.jpg`
  
  return {
    title: title ? `${title} | Black Eagle Group Holdings` : 'Black Eagle Group Holdings',
    description: description || 'Premier provider of stakeholder relations management, golf events management, and sponsorship management.',
    canonical: url,
    openGraph: {
      title: title || 'Black Eagle Group Holdings',
      description: description || 'Premier provider of stakeholder relations management, golf events management, and sponsorship management.',
      url: url,
      siteName: 'Black Eagle Group Holdings',
      images: [{ url: imageUrl }],
      locale: 'en_ZA',
      type: type
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'Black Eagle Group Holdings',
      description: description || 'Premier provider of stakeholder relations management, golf events management, and sponsorship management.',
      image: imageUrl
    }
  }
}

