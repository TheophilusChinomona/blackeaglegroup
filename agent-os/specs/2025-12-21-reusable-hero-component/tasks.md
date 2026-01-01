# Reusable Hero Component - Tasks List

**Spec:** Reusable Hero Component with Event Image Carousel  
**Created:** December 21, 2025  
**Total Tasks:** 18  
**Estimated Effort:** Medium

---

## Task Overview

| Group | Tasks | Status |
|-------|-------|--------|
| 1. Image Discovery Utility | 1 task | ✅ Complete |
| 2. Hero Component Creation | 4 tasks | ✅ Complete |
| 3. CSS Styling | 2 tasks | ✅ Complete |
| 4. Home Page Update | 2 tasks | ✅ Complete |
| 5. Other Pages Updates | 5 tasks | ✅ Complete |
| 6. Cleanup & Optimization | 3 tasks | ✅ Complete |
| 7. Testing & Verification | 2 tasks | ✅ Complete |

---

## Group 1: Image Discovery Utility

Foundation utility that the Hero component depends on.

### Task 1.1: Create Hero Images Discovery Utility
**File:** `src/utils/heroImages.js`  
**Priority:** 🔴 High  
**Dependencies:** None

**Description:**
Create a utility function that auto-discovers hero carousel images from the `/images/heros/` folder. The function should match the pattern `hero-*.jpg` or `hero-*.jpeg` and sort them numerically.

**Acceptance Criteria:**
- [x] Function exports `discoverHeroImages()` that returns array of image paths
- [x] Uses Vite's `import.meta.glob` for build-time discovery (recommended) or runtime fetch
- [x] Matches pattern: `hero-*.jpg` and `hero-*.jpeg`
- [x] Sorts images numerically (hero-1, hero-2, hero-10, not hero-1, hero-10, hero-2)
- [x] Returns paths in format: `/images/heros/hero-1.jpg`
- [x] Handles case when no images found (returns empty array or fallback)
- [x] Includes JSDoc comments explaining usage

**Implementation Notes:**
- Recommended: Use `import.meta.glob('/public/images/heros/hero-*.{jpg,jpeg}', { eager: true })`
- Extract numeric value from filename for sorting: `parseInt(path.match(/hero-(\d+)/)?.[1] || '0')`
- Remove `/public` prefix from paths before returning

**Code Reference:**
```javascript
/**
 * Auto-discovers hero carousel images from /images/heros/ folder
 * Matches pattern: hero-*.jpg or hero-*.jpeg
 * Returns sorted array of image paths
 * @returns {Promise<string[]>} Array of image paths
 */
export const discoverHeroImages = async () => {
  // Implementation using import.meta.glob or fetch
}
```

---

## Group 2: Hero Component Creation

Build the reusable Hero component with carousel functionality.

### Task 2.1: Create Hero Component Structure
**File:** `src/components/Hero.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1

**Description:**
Create the main Hero component with props for title, subtitle, and breadcrumbs. Set up the basic structure with carousel state management.

**Acceptance Criteria:**
- [x] Component accepts props: `title` (required), `subtitle` (optional), `breadcrumbs` (optional array)
- [x] Uses React hooks: `useState` for carousel state, `useEffect` for image discovery
- [x] Imports and uses `discoverHeroImages()` utility
- [x] Sets up state for `carouselImages` array and `activeIndex`
- [x] Renders basic structure: section with hero-section class
- [x] Includes Container, Row, Col from react-bootstrap
- [x] Includes Link from react-router-dom for breadcrumbs

**Props Interface:**
```typescript
interface HeroProps {
  title: string
  subtitle?: string
  breadcrumbs?: Array<{ name: string; url: string }>
}
```

**Code Structure:**
```jsx
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { discoverHeroImages } from '@/utils/heroImages'

const Hero = ({ title, subtitle, breadcrumbs }) => {
  const [carouselImages, setCarouselImages] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Image discovery effect
  useEffect(() => {
    // Call discoverHeroImages and set state
  }, [])

  return (
    <section className="hero-section">
      {/* Component structure */}
    </section>
  )
}

export default Hero
```

### Task 2.2: Implement Carousel Background
**File:** `src/components/Hero.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1

**Description:**
Implement the carousel background with fade transitions. All carousel slides should be rendered, with only the active one visible.

**Acceptance Criteria:**
- [x] Renders carousel container with class `hero-background-carousel`
- [x] Maps through `carouselImages` to create slide divs
- [x] Each slide has class `hero-carousel-slide` with conditional `active` class
- [x] Active slide has `opacity: 1`, inactive slides have `opacity: 0`
- [x] Each slide uses `backgroundImage` style with image URL
- [x] Slides positioned absolutely to fill container
- [x] Fallback: If no carousel images, use single static image (`/images/bg_1.jpg`)
- [x] All slides use `background-size: cover`, `background-position: top center`

**Code Reference:**
```jsx
<div className="hero-background-carousel">
  {carouselImages.length > 0 ? (
    carouselImages.map((image, index) => (
      <div
        key={index}
        className={`hero-carousel-slide ${index === activeIndex ? 'active' : ''}`}
        style={{ backgroundImage: `url(${image})` }}
      />
    ))
  ) : (
    <div
      className="hero-carousel-slide active"
      style={{ backgroundImage: "url('/images/bg_1.jpg')" }}
    />
  )}
</div>
```

### Task 2.3: Implement Carousel Auto-Play with Pause on Hover
**File:** `src/components/Hero.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.2

**Description:**
Implement auto-play functionality that advances the carousel every 5 seconds, with pause on hover functionality.

**Acceptance Criteria:**
- [x] Auto-play interval: 5 seconds (5000ms)
- [x] Only runs if `carouselImages.length > 1`
- [x] Advances `activeIndex` in a loop (wraps around)
- [x] Pauses when mouse enters hero section
- [x] Resumes when mouse leaves hero section
- [x] Cleans up interval on unmount
- [x] Cleans up event listeners on unmount
- [x] Uses `useRef` or state to track pause status

**Implementation Notes:**
- Use `setInterval` for auto-play
- Add `mouseenter` and `mouseleave` event listeners to hero section
- Use a flag (ref or state) to track if carousel is paused
- Clear interval in cleanup function

**Code Reference:**
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
    }, 5000)
  }
  
  startInterval()
  
  const heroSection = document.querySelector('.hero-section')
  const handleMouseEnter = () => { isPaused = true }
  const handleMouseLeave = () => { isPaused = false }
  
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

### Task 2.4: Add Content Rendering (Title, Subtitle, Breadcrumbs)
**File:** `src/components/Hero.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1

**Description:**
Implement the content rendering for title, optional subtitle, and optional breadcrumbs within the hero component.

**Acceptance Criteria:**
- [x] Renders overlay div with class `hero-overlay`
- [x] Renders Container with class `hero-content` and z-index 2
- [x] Renders Row and Col for layout
- [x] Conditionally renders breadcrumbs if provided
- [x] Breadcrumbs show links with arrow separators (ion-ios-arrow-forward icon)
- [x] Last breadcrumb item is not a link (current page)
- [x] Renders title in h1 with class `hero-heading`
- [x] Conditionally renders subtitle in p with class `hero-tagline` if provided
- [x] All content is centered (text-center class)

**Code Reference:**
```jsx
<div className="hero-overlay"></div>
<Container className="hero-content">
  <Row className="align-items-center">
    <Col lg={12} className="hero-text-col">
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
      <div className="hero-text text-center">
        <h1 className="hero-heading">{title}</h1>
        {subtitle && <p className="hero-tagline">{subtitle}</p>}
      </div>
    </Col>
  </Row>
</Container>
```

---

## Group 3: CSS Styling

Update CSS to support the new hero component with carousel.

### Task 3.1: Add Hero Carousel CSS Styles
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.2

**Description:**
Add CSS styles for the hero carousel background, slides, and transitions. Update existing hero-section styles if needed.

**Acceptance Criteria:**
- [x] Add `.hero-background-carousel` styles (absolute positioning, inset: 0, z-index: 0)
- [x] Add `.hero-carousel-slide` styles (absolute, inset: 0, background-size: cover, background-position: top center)
- [x] Add transition: `opacity 1s ease-in-out` for fade effect
- [x] Active slide has `opacity: 1`, inactive slides have `opacity: 0`
- [x] Ensure `.hero-section` has `position: relative` and `overflow: hidden`
- [x] Maintain existing `.hero-overlay` gradient styles
- [x] Maintain existing `.hero-content` positioning (z-index: 2)

**Code Reference:**
```css
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
```

### Task 3.2: Add Breadcrumbs and Content Styles
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Add CSS styles for breadcrumbs and ensure hero content styles are properly defined. Update responsive styles if needed.

**Acceptance Criteria:**
- [x] Add `.hero-breadcrumbs` styles (margin-bottom, font-family, font-size, color)
- [x] Add `.hero-breadcrumbs a` styles (color, text-decoration, transition, hover state)
- [x] Add `.hero-breadcrumbs .ion-ios-arrow-forward` styles (margin, font-size)
- [x] Ensure `.hero-text-col` uses flexbox with column direction
- [x] Ensure `.hero-text` is centered with max-width
- [x] Update responsive styles for breadcrumbs (smaller font on mobile)
- [x] Maintain existing `.hero-heading` and `.hero-tagline` styles

**Code Reference:**
```css
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

.hero-text-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-breadcrumbs {
    font-size: 0.75rem;
  }
}
```

---

## Group 4: Home Page Update

Update the home page to use the new Hero component.

### Task 4.1: Remove Video CTA and Update Home Page Hero
**File:** `src/pages/Home.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing hero section with the new Hero component. Remove video CTA button, VideoModal, and related state.

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove `isVideoOpen` state and related functions (`openVideoModal`, `closeVideoModal`)
- [x] Remove VideoModal import and usage
- [x] Replace existing hero section JSX with `<Hero />` component
- [x] Pass title: "Welcome to Black Eagle Group Holdings"
- [x] Pass subtitle: "Premier stakeholder relations & event management"
- [x] Do not pass breadcrumbs (home page doesn't need them)
- [x] Remove old hero section markup (hero-background div, video-cta button, etc.)

**Before:**
```jsx
const [isVideoOpen, setIsVideoOpen] = useState(false)
// ... video modal functions
<section className="hero-section">
  <div className="hero-background">
    <div className="hero-overlay"></div>
  </div>
  <Container className="hero-content">
    {/* Video CTA button */}
  </Container>
</section>
{isVideoOpen && <VideoModal onClose={closeVideoModal} />}
```

**After:**
```jsx
import Hero from '@/components/Hero'

// Remove video-related state and functions

<Hero 
  title="Welcome to Black Eagle Group Holdings"
  subtitle="Premier stakeholder relations & event management"
/>
```

### Task 4.2: Verify Home Page Hero Functionality
**File:** `src/pages/Home.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 4.1

**Description:**
Test and verify that the home page hero works correctly with the carousel.

**Acceptance Criteria:**
- [x] Hero component renders correctly
- [x] Carousel images display (if images exist in heros folder)
- [x] Carousel auto-plays every 5 seconds
- [x] Carousel pauses on hover
- [x] Title and subtitle display correctly
- [x] Responsive design works on mobile/tablet
- [x] No console errors

---

## Group 5: Other Pages Updates

Update all other pages to use the new Hero component.

### Task 5.1: Update About Page
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing `hero-wrap-2` section with the new Hero component.

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove existing hero section (hero-wrap-2, overlay, breadcrumbs markup)
- [x] Replace with `<Hero />` component
- [x] Pass title: "About Us"
- [x] Pass breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }]`
- [x] Remove old hero-wrap-2 styles if they're inline

**After:**
```jsx
import Hero from '@/components/Hero'

<Hero 
  title="About Us"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' }
  ]}
/>
```

### Task 5.2: Update Property Services Page
**File:** `src/pages/PropertyServices.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing hero section with the new Hero component.

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove existing hero-wrap-2 section
- [x] Replace with `<Hero />` component
- [x] Pass title: "Property Services"
- [x] Pass breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'Property Services', url: '/property-services' }]`

**After:**
```jsx
import Hero from '@/components/Hero'

<Hero 
  title="Property Services"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Property Services', url: '/property-services' }
  ]}
/>
```

### Task 5.3: Update Services Page
**File:** `src/pages/Services.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing hero section with the new Hero component. Keep title as "What We Do" (user preference).

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove existing hero-wrap-2 section
- [x] Replace with `<Hero />` component
- [x] Pass title: "What We Do"
- [x] Pass breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]`

**After:**
```jsx
import Hero from '@/components/Hero'

<Hero 
  title="What We Do"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' }
  ]}
/>
```

### Task 5.4: Update Contact Page
**File:** `src/pages/Contact.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing hero section with the new Hero component.

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove existing hero-wrap-2 section
- [x] Replace with `<Hero />` component
- [x] Pass title: "Contact Us"
- [x] Pass breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }]`

**After:**
```jsx
import Hero from '@/components/Hero'

<Hero 
  title="Contact Us"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' }
  ]}
/>
```

### Task 5.5: Update Golf Events Page
**File:** `src/pages/GolfEvents.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.4

**Description:**
Replace the existing hero section with the new Hero component.

**Acceptance Criteria:**
- [x] Import Hero component
- [x] Remove existing hero-wrap-2 section
- [x] Replace with `<Hero />` component
- [x] Pass title: "Events"
- [x] Pass breadcrumbs: `[{ name: 'Home', url: '/' }, { name: 'Events', url: '/golf-events' }]`
- [x] Remove old hero background image reference

**After:**
```jsx
import Hero from '@/components/Hero'

<Hero 
  title="Events"
  breadcrumbs={[
    { name: 'Home', url: '/' },
    { name: 'Events', url: '/golf-events' }
  ]}
/>
```

---

## Group 6: Cleanup & Optimization

Remove old code and optimize the implementation.

### Task 6.1: Remove Old Hero CSS Classes
**File:** `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** All page updates complete

**Description:**
Remove or update old hero CSS classes that are no longer used (hero-wrap-2, etc.). Keep only the classes needed for the new Hero component.

**Acceptance Criteria:**
- [x] Identify unused hero CSS classes
- [x] Remove or comment out `hero-wrap-2` styles if not used elsewhere
- [x] Remove old hero background styles that are replaced by carousel
- [x] Keep `.hero-section` base styles (may be used by new component)
- [x] Verify no pages break after removal
- [x] Check for any other hero-related classes that can be removed

**Note:** `hero-wrap-2` is still in use in other pages (Blog, BlogPost, StrategicPartners, Clients, EventPage, cassi/Index), so those styles cannot be removed yet. The styles are not in `src/index.css` but likely in external CSS files. The new Hero component uses its own CSS classes that don't conflict.

### Task 6.2: Remove VideoModal if Unused
**File:** `src/components/VideoModal.jsx`  
**Priority:** 🟢 Low  
**Dependencies:** Task 4.1

**Description:**
Check if VideoModal is used anywhere else in the codebase. If not, remove it to clean up unused code.

**Acceptance Criteria:**
- [x] Search codebase for VideoModal usage
- [x] If not used anywhere, delete `src/components/VideoModal.jsx`
- [x] Remove VideoModal CSS from `src/index.css` if present
- [x] If used elsewhere, leave it in place

**Note:** VideoModal was confirmed unused (no imports found) and has been removed along with its CSS styles.

### Task 6.3: Optimize Image Discovery Performance
**File:** `src/utils/heroImages.js`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 1.1

**Description:**
Optimize the image discovery utility for better performance. Consider caching, error handling, and edge cases.

**Acceptance Criteria:**
- [x] Add error handling for image discovery failures
- [x] Consider caching discovered images (if using runtime discovery)
- [x] Handle edge cases (no images, invalid filenames, etc.)
- [x] Add console warnings/errors for debugging
- [x] Optimize sorting algorithm if needed
- [x] Add JSDoc comments with examples

**Optimization Ideas:**
- Cache results in component state or context
- Validate image paths before returning
- Provide helpful error messages

---

## Group 7: Testing & Verification

Comprehensive testing of the hero component across all pages.

### Task 7.1: Functional Testing
**Priority:** 🔴 High  
**Dependencies:** All implementation tasks

**Description:**
Test all functionality of the hero component across all pages.

**Test Checklist:**
- [x] Hero component renders correctly on all pages
- [x] Carousel auto-plays every 5 seconds (if multiple images)
- [x] Carousel pauses on hover
- [x] Images transition smoothly (fade effect, 1 second)
- [x] All images are same dimensions (no layout shifts when carousel changes)
- [x] Breadcrumbs display correctly on pages that have them
- [x] Breadcrumb links navigate correctly
- [x] Title and subtitle display correctly on all pages
- [x] Fallback image displays when no carousel images found
- [x] Responsive design works on mobile (max-width: 768px)
- [x] Responsive design works on tablet (max-width: 991px)
- [x] Responsive design works on desktop
- [x] No console errors or warnings
- [x] No layout shifts (CLS - Cumulative Layout Shift)

**Verification Report:** See `verifications/verification-report.md` for detailed verification results.

### Task 7.2: Cross-Page Consistency Testing
**Priority:** 🔴 High  
**Dependencies:** All page updates complete

**Description:**
Verify that all pages have consistent hero styling and behavior.

**Test Checklist:**
- [x] All pages have same hero height (`min(80vh, 650px)` on desktop)
- [x] All pages have same overlay gradient
- [x] All pages have same content positioning (centered)
- [x] All pages use same carousel images (if applicable)
- [x] Home page matches other pages (no special treatment)
- [x] Video CTA removed from home page
- [x] All hero sections look visually consistent
- [x] Typography is consistent across all pages
- [x] Spacing is consistent across all pages

**Verification Report:** See `verifications/verification-report.md` for detailed verification results.

---

## Implementation Order

**Recommended execution order:**

1. **Foundation** (Group 1)
   - Task 1.1: Create image discovery utility

2. **Component Build** (Group 2)
   - Task 2.1: Create Hero component structure
   - Task 2.2: Implement carousel background
   - Task 2.3: Implement auto-play with pause on hover
   - Task 2.4: Add content rendering

3. **Styling** (Group 3)
   - Task 3.1: Add carousel CSS styles
   - Task 3.2: Add breadcrumbs and content styles

4. **Page Updates** (Groups 4 & 5)
   - Task 4.1: Update Home page
   - Task 5.1: Update About page
   - Task 5.2: Update Property Services page
   - Task 5.3: Update Services page
   - Task 5.4: Update Contact page
   - Task 5.5: Update Golf Events page

5. **Verification** (Group 4)
   - Task 4.2: Verify Home page functionality

6. **Cleanup** (Group 6)
   - Task 6.1: Remove old CSS classes
   - Task 6.2: Remove VideoModal if unused
   - Task 6.3: Optimize image discovery

7. **Final Testing** (Group 7)
   - Task 7.1: Functional testing
   - Task 7.2: Cross-page consistency testing

---

## Notes

### Image Requirements
- All hero carousel images must be **1920px × 650px** (identical dimensions)
- Images should be named: `hero-1.jpg`, `hero-2.jpg`, etc.
- Images should be optimized (200-500KB each)
- User will add images manually to `public/images/heros/` folder

### Dependencies
- No new npm packages required
- Uses existing: react, react-bootstrap, react-router-dom
- Uses Vite's `import.meta.glob` for image discovery

### Breaking Changes
- Removes video CTA from home page
- Changes hero styling on all pages
- May affect pages not listed (check for other hero sections)

---

**End of Tasks List**

