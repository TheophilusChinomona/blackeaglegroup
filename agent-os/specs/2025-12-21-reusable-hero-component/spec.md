# Reusable Hero Component with Event Image Carousel Specification

**Project:** Black Eagle Group Website  
**Date:** December 21, 2025  
**Status:** Ready for Implementation

---

## 1. Executive Summary

This specification details the creation of a **reusable hero component** that will replace all existing hero sections across the website with a consistent, unified design featuring:

1. **Event Image Carousel Background** - Auto-discovered images from a dedicated folder
2. **Consistent Sizing** - All pages use the same hero dimensions (`min(80vh, 650px)`)
3. **Unified Styling** - Same overlay gradient and content positioning across all pages
4. **Breadcrumb Integration** - Breadcrumbs included in the hero component
5. **Page-Specific Content** - Customizable title and optional subtitle per page

---

## 2. Goals & Objectives

### Primary Goals
- Create a single, reusable hero component for all pages
- Implement carousel background using actual event images
- Ensure consistent hero sizing and styling across all pages
- Remove video CTA from home page (simplify to match other pages)
- Integrate breadcrumbs into hero component

### Success Criteria
- All pages use the same hero component
- Hero carousel auto-discovers images from `public/images/heros/` folder
- All hero sections have identical dimensions and styling
- No layout shifts when carousel images change (all images same size)
- Breadcrumbs display correctly on all pages that need them

---

## 3. Current State Analysis

### 3.1 Home Page Hero (`Home.jsx`)
- **Class:** `hero-section`
- **Height:** `min(80vh, 650px)`
- **Background:** Static image (`bg_1.jpg`)
- **Overlay:** `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`
- **Content:** Centered text with heading, tagline, and video CTA button
- **Structure:** Single column, centered content

### 3.2 Other Pages Hero Sections
- **About:** Uses `hero-wrap-2` class, height 700px, background `bg_3.jpg`
- **PropertyServices:** Uses `hero-wrap-2`, background `bg_41.jpg`
- **Services:** Uses `hero-wrap-2`, background `bg_4.jpg`
- **Contact:** Uses `hero-wrap-2`, background `bg_5.jpg`
- **GolfEvents:** Uses `hero-wrap-2`, background from projects folder

### 3.3 Issues with Current Implementation
- Inconsistent heights (650px vs 700px)
- Different overlay styles
- Different background image sources
- No carousel functionality
- Video CTA only on home page (inconsistent)
- Breadcrumbs implemented separately on each page

### 3.4 Existing Components
- `EventCarousel.jsx` - Existing carousel component (can be adapted)
- Event images available in various folders:
  - `public/COT/img/` - Contains carousel-1.jpg, carousel-2.jpg
  - `public/cassi/img/` - Contains many event images
  - `public/images/` - Contains various background images

---

## 4. Component Specifications

### 4.1 Hero Component Structure

**File:** `src/components/Hero.jsx` (new component)

#### 4.1.1 Component Props

```typescript
interface HeroProps {
  title: string                    // Main heading text
  subtitle?: string                 // Optional tagline/subtitle
  breadcrumbs?: BreadcrumbItem[]   // Optional breadcrumb navigation
}

interface BreadcrumbItem {
  name: string
  url: string
}
```

#### 4.1.2 Component Features

1. **Image Carousel Background**
   - Auto-discovers images from `/images/heros/` folder
   - Pattern matching: `hero-*.jpg` or `hero-*.jpeg`
   - Sorts images numerically (hero-1.jpg, hero-2.jpg, etc.)
   - Falls back to single static image if no carousel images found

2. **Carousel Behavior**
   - Auto-play interval: **5 seconds**
   - Pause on hover: **Yes**
   - Transition effect: **Fade** (smooth crossfade between images)
   - Navigation controls: **Hidden** (background carousel, no user interaction needed)
   - Indicators: **Hidden** (background carousel)

3. **Image Requirements**
   - All images must be **identical dimensions** (1920px × 650px recommended)
   - Use `object-fit: cover` CSS to ensure consistent display
   - Images should be optimized for web (200-500KB per image)
   - Format: JPG or JPEG

4. **Styling**
   - Height: `min(80vh, 650px)` (matches current home page)
   - Width: 100% (full viewport width)
   - Overlay: `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`
   - Content: Centered vertically and horizontally
   - Responsive: Maintains proportions on mobile/tablet

#### 4.1.3 Component Implementation

```jsx
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hero = ({ title, subtitle, breadcrumbs }) => {
  const [carouselImages, setCarouselImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-discover images from /images/heros/ folder
  useEffect(() => {
    // Implementation: Fetch or discover images matching hero-*.jpg pattern
    // Sort numerically and set to state
  }, [])

  // Auto-play carousel with pause on hover
  useEffect(() => {
    // Implementation: 5-second interval, pause on hover
  }, [carouselImages.length])

  return (
    <section className="hero-section">
      {/* Carousel Background */}
      <div className="hero-background-carousel">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`hero-carousel-slide ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      
      {/* Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Content */}
      <Container className="hero-content">
        <Row className="align-items-center">
          <Col lg={12} className="hero-text-col">
            {/* Breadcrumbs */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <div className="hero-breadcrumbs">
                {breadcrumbs.map((crumb, index) => (
                  <span key={index}>
                    {index > 0 && <i className="ion-ios-arrow-forward"></i>}
                    {index < breadcrumbs.length - 1 ? (
                      <Link to={crumb.url}>{crumb.name}</Link>
                    ) : (
                      <span>{crumb.name}</span>
                    )}
                  </span>
                ))}
              </div>
            )}
            
            {/* Title and Subtitle */}
            <div className="hero-text text-center">
              <h1 className="hero-heading">{title}</h1>
              {subtitle && <p className="hero-tagline">{subtitle}</p>}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Hero
```

### 4.2 Image Auto-Discovery Implementation

**File:** `src/utils/heroImages.js` (new utility)

```javascript
/**
 * Auto-discovers hero carousel images from /images/heros/ folder
 * Matches pattern: hero-*.jpg or hero-*.jpeg
 * Returns sorted array of image paths
 */
export const discoverHeroImages = async () => {
  // Implementation options:
  // 1. Use import.meta.glob (Vite) to discover images at build time
  // 2. Use fetch to check for images at runtime
  // 3. Create a manifest file listing available images
  
  // Recommended: Use import.meta.glob for build-time discovery
  const images = import.meta.glob('/public/images/heros/hero-*.{jpg,jpeg}', { 
    eager: true 
  })
  
  // Extract and sort paths numerically
  const imagePaths = Object.keys(images)
    .map(path => path.replace('/public', ''))
    .sort((a, b) => {
      const numA = parseInt(a.match(/hero-(\d+)/)?.[1] || '0')
      const numB = parseInt(b.match(/hero-(\d+)/)?.[1] || '0')
      return numA - numB
    })
  
  return imagePaths
}
```

### 4.3 CSS Styling

**File:** `src/index.css` (update existing hero styles)

```css
/* Hero Section - Reusable Component */
.hero-section {
  position: relative;
  width: 100%;
  min-height: min(80vh, 650px);
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Carousel Background */
.hero-background-carousel {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-carousel-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.hero-carousel-slide.active {
  opacity: 1;
}

/* Overlay */
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3));
  z-index: 1;
}

/* Content */
.hero-content {
  position: relative;
  z-index: 2;
  padding: var(--space-xl) var(--space-md);
}

.hero-text-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.hero-text {
  color: white;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.hero-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.2;
  color: white;
  margin-bottom: var(--space-md);
}

.hero-tagline {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: var(--space-lg);
}

/* Breadcrumbs */
.hero-breadcrumbs {
  margin-bottom: var(--space-lg);
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.hero-breadcrumbs a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.2s ease;
}

.hero-breadcrumbs a:hover {
  color: white;
}

.hero-breadcrumbs .ion-ios-arrow-forward {
  margin: 0 var(--space-xs);
  font-size: 0.75rem;
}

/* Responsive Styles */
@media (max-width: 991px) {
  .hero-section {
    min-height: min(90vh, 700px);
  }
  
  .hero-heading {
    font-size: 2.5rem;
  }
  
  .hero-tagline {
    font-size: 1.1rem;
  }
}

@media (max-width: 768px) {
  .hero-heading {
    font-size: 2rem;
  }
  
  .hero-tagline {
    font-size: 1rem;
  }
  
  .hero-breadcrumbs {
    font-size: 0.75rem;
  }
}
```

---

## 5. Page Updates

### 5.1 Home Page (`src/pages/Home.jsx`)

**Changes:**
- Remove video CTA button and related state
- Replace hero section with `<Hero />` component
- Remove `VideoModal` import and usage
- Update hero text to: "Welcome to Black Eagle Group Holdings" (title) and "Premier stakeholder relations & event management" (subtitle)

**Before:**
```jsx
<section className="hero-section">
  <div className="hero-background">
    <div className="hero-overlay"></div>
  </div>
  <Container className="hero-content">
    {/* Video CTA button */}
  </Container>
</section>
```

**After:**
```jsx
<Hero 
  title="Welcome to Black Eagle Group Holdings"
  subtitle="Premier stakeholder relations & event management"
/>
```

### 5.2 About Page (`src/pages/About.jsx`)

**Changes:**
- Replace `hero-wrap-2` section with `<Hero />` component
- Update title to "About Us"
- Include breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]`

**After:**
```jsx
<Hero 
  title="About Us"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ]}
/>
```

### 5.3 Property Services Page (`src/pages/PropertyServices.jsx`)

**Changes:**
- Replace `hero-wrap-2` section with `<Hero />` component
- Update title to "Property Services"
- Include breadcrumbs

**After:**
```jsx
<Hero 
  title="Property Services"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Property Services', url: '/property-services' }
  ]}
/>
```

### 5.4 Services Page (`src/pages/Services.jsx`)

**Changes:**
- Replace `hero-wrap-2` section with `<Hero />` component
- Keep title as "What We Do" (user preference)
- Include breadcrumbs

**After:**
```jsx
<Hero 
  title="What We Do"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ]}
/>
```

### 5.5 Contact Page (`src/pages/Contact.jsx`)

**Changes:**
- Replace `hero-wrap-2` section with `<Hero />` component
- Update title to "Contact Us"
- Include breadcrumbs

**After:**
```jsx
<Hero 
  title="Contact Us"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]}
/>
```

### 5.6 Golf Events Page (`src/pages/GolfEvents.jsx`)

**Changes:**
- Replace `hero-wrap-2` section with `<Hero />` component
- Update title to "Events"
- Include breadcrumbs

**After:**
```jsx
<Hero 
  title="Events"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/golf-events' }
  ]}
/>
```

### 5.7 Other Pages

Any other pages with hero sections should be updated to use the `<Hero />` component following the same pattern.

---

## 6. Image Folder Structure

### 6.1 Folder Location
- **Path:** `public/images/heros/`
- **Status:** ✅ Created
- **README:** `public/images/heros/README.md` (contains naming conventions and requirements)

### 6.2 Naming Convention
- **Pattern:** `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, etc.
- **Format:** JPG or JPEG
- **Sorting:** Numeric (hero-1, hero-2, hero-10, etc.)

### 6.3 Image Requirements
- **Dimensions:** All images must be **1920px × 650px** (identical)
- **Aspect Ratio:** Approximately 3:1 (width:height)
- **File Size:** 200-500KB per image (optimized)
- **Format:** JPG or JPEG
- **Quality:** High quality but web-optimized

### 6.4 Image Processing
Before adding images to the folder:
1. Resize all images to 1920px × 650px
2. Crop if necessary to maintain aspect ratio
3. Optimize file size using tools like TinyPNG, ImageOptim, or similar
4. Ensure all images are the exact same dimensions

**Why same dimensions matter:** If images have different dimensions, the carousel container may resize when switching images, causing layout shifts. All images must be pre-processed to identical dimensions.

---

## 7. Technical Implementation Details

### 7.1 Carousel Auto-Play Logic

```javascript
useEffect(() => {
  if (carouselImages.length <= 1) return
  
  let intervalId
  let isPaused = false
  
  const startInterval = () => {
    intervalId = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prev) => (prev + 1) % carouselImages.length)
      }
    }, 5000) // 5 seconds
  }
  
  startInterval()
  
  // Pause on hover
  const handleMouseEnter = () => { isPaused = true }
  const handleMouseLeave = () => { isPaused = false }
  
  const heroSection = document.querySelector('.hero-section')
  if (heroSection) {
    heroSection.addEventListener('mouseenter', handleMouseEnter)
    heroSection.addEventListener('mouseleave', handleMouseLeave)
  }
  
  return () => {
    clearInterval(intervalId)
    if (heroSection) {
      heroSection.removeEventListener('mouseenter', handleMouseEnter)
      heroSection.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
}, [carouselImages.length])
```

### 7.2 Image Discovery Options

**Option 1: Build-time Discovery (Recommended)**
```javascript
// Using Vite's import.meta.glob
const heroImages = import.meta.glob('/public/images/heros/hero-*.{jpg,jpeg}', { 
  eager: true 
})
```

**Option 2: Runtime Discovery**
```javascript
// Fetch manifest or check for images at runtime
const discoverImages = async () => {
  const images = []
  let index = 1
  while (true) {
    try {
      const response = await fetch(`/images/heros/hero-${index}.jpg`)
      if (response.ok) {
        images.push(`/images/heros/hero-${index}.jpg`)
        index++
      } else {
        break
      }
    } catch {
      break
    }
  }
  return images
}
```

**Option 3: Manifest File**
Create a `public/images/heros/manifest.json` file listing all available images.

### 7.3 Fallback Behavior

If no carousel images are found:
- Use a single default background image (`/images/bg_1.jpg`)
- Display hero content normally
- No carousel functionality (single static image)

---

## 8. Testing Requirements

### 8.1 Functional Testing
- [ ] Hero component renders correctly on all pages
- [ ] Carousel auto-plays every 5 seconds
- [ ] Carousel pauses on hover
- [ ] Images transition smoothly (fade effect)
- [ ] All images are same dimensions (no layout shifts)
- [ ] Breadcrumbs display correctly on pages that have them
- [ ] Responsive design works on mobile/tablet/desktop

### 8.2 Image Testing
- [ ] Images auto-discover from `/images/heros/` folder
- [ ] Images sort correctly (hero-1, hero-2, hero-10, etc.)
- [ ] Fallback works when no images found
- [ ] All images load without errors
- [ ] Images maintain aspect ratio

### 8.3 Cross-Page Testing
- [ ] Home page hero matches other pages
- [ ] All pages have consistent hero height
- [ ] All pages have same overlay gradient
- [ ] Content positioning is consistent
- [ ] Video CTA removed from home page

### 8.4 Performance Testing
- [ ] Images are optimized (200-500KB each)
- [ ] No layout shifts when carousel changes
- [ ] Smooth transitions (60fps)
- [ ] No memory leaks in carousel logic

---

## 9. Migration Checklist

### Phase 1: Component Creation
- [ ] Create `src/components/Hero.jsx`
- [ ] Create `src/utils/heroImages.js` (image discovery utility)
- [ ] Update `src/index.css` with hero carousel styles
- [ ] Test component in isolation

### Phase 2: Image Setup
- [ ] Verify `public/images/heros/` folder exists
- [ ] Add README with naming conventions
- [ ] User adds images to folder (manual step)
- [ ] Verify image discovery works

### Phase 3: Page Updates
- [ ] Update Home page
- [ ] Update About page
- [ ] Update PropertyServices page
- [ ] Update Services page
- [ ] Update Contact page
- [ ] Update GolfEvents page
- [ ] Update any other pages with hero sections

### Phase 4: Cleanup
- [ ] Remove old hero CSS classes (`hero-wrap-2`, etc.)
- [ ] Remove video CTA code from Home page
- [ ] Remove VideoModal if no longer used
- [ ] Update any references to old hero styles

### Phase 5: Testing
- [ ] Test all pages with new hero component
- [ ] Verify carousel functionality
- [ ] Test responsive design
- [ ] Verify breadcrumbs work
- [ ] Performance testing

---

## 10. Dependencies

### Existing Dependencies
- `react` - React framework
- `react-bootstrap` - Bootstrap components (Container, Row, Col)
- `react-router-dom` - Routing (Link component for breadcrumbs)

### No New Dependencies Required
- Carousel functionality implemented with native React hooks
- Image discovery uses Vite's built-in `import.meta.glob` or fetch API
- No external carousel libraries needed

---

## 11. Related Specifications

- `2025-12-21-homepage-redesign` - Previous homepage hero work
- `2025-12-21-homepage-spacing-events-integration` - Events integration work

---

## 12. Open Questions & Decisions

### Resolved
- ✅ Auto-play interval: 5 seconds
- ✅ Pause on hover: Yes
- ✅ Video CTA: Removed from home page
- ✅ Image naming: `hero-1.jpg`, `hero-2.jpg`, etc.
- ✅ Image dimensions: 1920px × 650px (all identical)
- ✅ Breadcrumbs: Included in hero component
- ✅ Services page title: Keep "What We Do"

### To Be Determined During Implementation
- Image discovery method (build-time vs runtime)
- Fallback image if no carousel images found
- Transition duration (currently 1s fade)

---

## 13. Success Metrics

- All pages use the same hero component
- Hero carousel works on all pages
- No layout shifts when carousel changes
- Consistent styling across all pages
- Images load quickly and smoothly
- Responsive design works on all devices

---

**End of Specification**

