/**
 * SEO Component
 * Reusable component for adding meta tags and structured data to pages
 */

import { Helmet } from 'react-helmet-async'
import { generatePageMeta, generateOrganizationSchema, generateServiceSchema, generateEventSchema, generateBreadcrumbSchema } from '@/utils/seo'

/**
 * SEO Component
 * @param {Object} props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.path - Page path (e.g., '/about')
 * @param {string} props.image - Open Graph image URL
 * @param {string} props.type - Open Graph type (default: 'website')
 * @param {Object} props.organization - Include Organization schema
 * @param {Object} props.service - Include Service schema
 * @param {Object} props.event - Include Event schema
 * @param {Array} props.breadcrumbs - Breadcrumb items for BreadcrumbList schema
 * @param {Object} props.structuredData - Additional structured data
 */
const SEO = ({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  organization = false,
  service = null,
  event = null,
  breadcrumbs = null,
  structuredData = null
}) => {
  const meta = generatePageMeta({ title, description, path, image, type })
  
  // Generate structured data
  const structuredDataArray = []
  
  if (organization) {
    structuredDataArray.push(generateOrganizationSchema())
  }
  
  if (service) {
    structuredDataArray.push(generateServiceSchema(service))
  }
  
  if (event) {
    structuredDataArray.push(generateEventSchema(event))
  }
  
  if (breadcrumbs && breadcrumbs.length > 0) {
    structuredDataArray.push(generateBreadcrumbSchema(breadcrumbs))
  }
  
  if (structuredData) {
    structuredDataArray.push(structuredData)
  }

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={meta.openGraph.title} />
        <meta property="og:description" content={meta.openGraph.description} />
        <meta property="og:url" content={meta.openGraph.url} />
        <meta property="og:type" content={meta.openGraph.type} />
        <meta property="og:site_name" content={meta.openGraph.siteName} />
        {meta.openGraph.images && meta.openGraph.images.length > 0 && (
          <meta property="og:image" content={meta.openGraph.images[0].url} />
        )}
        <meta property="og:locale" content={meta.openGraph.locale} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content={meta.twitter.card} />
        <meta name="twitter:title" content={meta.twitter.title} />
        <meta name="twitter:description" content={meta.twitter.description} />
        <meta name="twitter:image" content={meta.twitter.image} />
      </Helmet>
      
      {/* Structured Data (JSON-LD) */}
      {structuredDataArray.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
}

export default SEO

