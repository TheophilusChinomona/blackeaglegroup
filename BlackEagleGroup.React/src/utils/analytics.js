/**
 * Google Analytics 4 Utilities
 * Handles GA4 tracking for page views and events
 */

// GA4 Measurement ID - should be set via environment variable
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID || ''

/**
 * Initialize Google Analytics 4
 */
export const initGA4 = () => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  // Load gtag script
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
    });
  `
  document.head.appendChild(script2)
}

/**
 * Track page view
 */
export const trackPageView = (path) => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: path,
  })
}

/**
 * Track custom event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  if (!GA4_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) {
    return
  }

  window.gtag('event', eventName, eventParams)
}

/**
 * Track form submission
 */
export const trackFormSubmission = (formName) => {
  trackEvent('form_submit', {
    form_name: formName,
  })
}

/**
 * Track PDF download
 */
export const trackPDFDownload = (fileName) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_extension: 'pdf',
  })
}

/**
 * Track video play
 */
export const trackVideoPlay = (videoTitle) => {
  trackEvent('video_play', {
    video_title: videoTitle,
  })
}

