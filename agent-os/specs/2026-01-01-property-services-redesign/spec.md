# Property Services Page Redesign - Specification

## Overview

### Summary
Redesign the PropertyServices.jsx page to match the sophisticated design patterns established in the Home and About pages. The redesign will implement Framer Motion scroll-triggered animations, alternating light/dark section rhythm, and split layouts for content-heavy sections.

### Goals
1. **Visual Consistency**: Align Property Services page design with Home and About page aesthetics
2. **Motion Design**: Implement scroll-triggered animations using Framer Motion
3. **User Engagement**: Create visual interest through alternating section backgrounds and staggered reveals
4. **Content Hierarchy**: Improve readability by restructuring Overview/Expertise content into split layouts
5. **Brand Cohesion**: Use property-specific hero and consistent dark section backgrounds

### Non-Goals
- Creating new ServiceCard component variants (using existing component with motion wrappers)
- Adding new features or content beyond current page scope
- Modifying other pages
- Backend changes

---

## Technical Specification

### Tech Stack (Existing)
- **Framework**: React 18.x with Vite
- **Animation Library**: Framer Motion (already installed, used in About page)
- **Styling**: Tailwind CSS v3 + existing CSS classes (`ftco-section`, `about-split-section`, etc.)
- **UI Components**: shadcn/ui, React Bootstrap
- **Icons**: Lucide React

### Dependencies
No new dependencies required. Uses existing:
- `framer-motion` - scroll animations
- `react-bootstrap` - Container, Row, Col
- Existing components: `Hero`, `ServiceCard`, `SEO`

---

## Page Structure

### Section Architecture

```
PropertyServices.jsx
├── SEO Component
├── Hero Section (property-specific background)
├── ServicesIntroSection (light) - Animated heading
├── ServiceCardsSection (light) - 5 cards with stagger
├── OurExpertiseSection (dark) - Full-width with overlay
├── WhatWeHandleSection (light) - Split layout with list
└── OverviewSection (dark) - Full-width with overlay
```

### Section Details

#### 1. Hero Section
- **Component**: Existing `Hero` component
- **Modification**: Pass `backgroundImage` prop for property-specific background
- **Background**: `/images/cp.jpg` (Commercial Property image)
- **Title**: "Property Services"
- **Breadcrumbs**: Home → Property Services

#### 2. Services Introduction Section (Light Background)
- **Purpose**: Introduce the property services offering
- **Layout**: Centered heading with subheading
- **Animation**: 
  - Subheading: scroll progress offset 0 → 0.3
  - Heading: scroll progress offset 0.05 → 0.35
- **Content**:
  - Subheading: "Our Services Property"
  - Heading: "What We Do"

#### 3. Service Cards Section (Light Background)
- **Purpose**: Display 5 property services
- **Layout**: 3-column grid (Bootstrap Row/Col)
- **Component**: Existing `ServiceCard` wrapped in motion.div
- **Animation**: Staggered scroll reveals
  - Card 1: delay 0.1
  - Card 2: delay 0.15
  - Card 3: delay 0.2
  - Card 4: delay 0.25
  - Card 5: delay 0.3
- **Services Data** (preserve existing):
  1. Commercial Property Services
  2. Residential Property
  3. Township Rentals
  4. Body Corporate & HOA Management
  5. Airbnb / Short-Term Rental Management

#### 4. Our Expertise Section (Dark Background)
- **Purpose**: Highlight BEGH expertise and credentials
- **Layout**: Full-width dark section with centered content
- **Background**: `/images/bg_6.jpg` with dark overlay
- **Animation**: Staggered text reveals
- **Content** (from existing Overview):
  - Subheading: "Excellence"
  - Heading: "Our Expertise"
  - Paragraph: Portfolio details (10,000+ units, nationwide coverage)
- **Styling**: `services-section img` with `overlay` div

#### 5. What We Handle Section (Light Background)
- **Purpose**: Detail the services provided
- **Layout**: Split layout - image left, bullet list right
- **Image**: `/images/BC.jpg` (Body Corporate image)
- **Animation**: 
  - Image: scroll progress offset 0 → 0.3
  - Heading: scroll progress offset 0.05 → 0.35
  - List items: staggered delays 0.1, 0.15, 0.2, etc.
- **Content** (from existing Expertise bullet list):
  - Property maintenance and repairs
  - General accounting and financial reporting
  - Budgeting and contract management
  - Enforcing rules and by-laws
  - Handling owner concerns and disputes
  - Invoicing levies and service charges
  - Collecting arrears
  - Preparing meetings and issuing notices
  - Conducting monthly operations reports

#### 6. Overview Section (Dark Background)
- **Purpose**: Company overview with CTA
- **Layout**: Full-width dark section with centered content
- **Background**: `/images/bg_6.jpg` with dark overlay
- **Animation**: Staggered paragraph reveals
- **Content** (from existing Overview):
  - Subheading: "About"
  - Heading: "Overview"
  - Paragraphs: BEGH company description, leading property management agency
  - Final line: "Our in-house collections team..."

---

## Component Architecture

### New Section Components (Inside PropertyServices.jsx)

Following the About page pattern, create inline section components:

```jsx
// ServicesIntroSection - Animated intro heading
const ServicesIntroSection = () => {
  // Uses useScroll, useTransform from framer-motion
  // Returns section with animated subheading + heading
}

// AnimatedServiceCard - Wrapper for ServiceCard with motion
const AnimatedServiceCard = ({ service, index, scrollYProgress }) => {
  // Wraps existing ServiceCard with motion.div
  // Calculates delay based on index
}

// ServiceCardsSection - Grid of animated service cards
const ServiceCardsSection = () => {
  // Maps propertyServices data to AnimatedServiceCard
}

// OurExpertiseSection - Dark full-width section
const OurExpertiseSection = () => {
  // Dark background with overlay
  // Centered content with scroll animations
}

// AnimatedListItem - For staggered list items
const AnimatedListItem = ({ children, scrollYProgress, delay }) => {
  // Individual list item with scroll animation
}

// WhatWeHandleSection - Split layout with list
const WhatWeHandleSection = () => {
  // Split layout: image left, list right
  // Uses existing about-split-section pattern
}

// OverviewSection - Dark full-width section
const OverviewSection = () => {
  // Dark background with overlay
  // Company overview text with scroll animations
}
```

### Existing Components (No Modifications)
- `Hero` - Already supports `backgroundImage` prop
- `ServiceCard` - Used as-is, wrapped with motion
- `SEO` - Used for meta tags

---

## Animation Specifications

### Scroll Animation Pattern (From About Page)

```jsx
import { motion, useScroll, useTransform } from 'framer-motion'

const Section = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Element animations with staggered delays
  const elementOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
  const elementY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
  
  return (
    <section ref={sectionRef}>
      <motion.div style={{ opacity: elementOpacity, y: elementY }}>
        {/* Content */}
      </motion.div>
    </section>
  )
}
```

### Animation Values

| Element Type | Delay Start | Delay End | Y Start | Y End |
|--------------|-------------|-----------|---------|-------|
| First element | 0 | 0.3 | 20px | 0 |
| Second element | 0.05 | 0.35 | 20px | 0 |
| Third element | 0.1 | 0.4 | 20px | 0 |
| List items | 0.1 + (index * 0.05) | +0.3 | 20px | 0 |
| Cards | 0.1 + (index * 0.05) | +0.3 | 20px | 0 |

### Accessibility
- Respect `prefers-reduced-motion` media query
- Motion should be purely decorative, not blocking content
- All content visible without JavaScript enabled (graceful degradation)

---

## Styling Specifications

### CSS Classes (Existing)

| Class | Purpose | Usage |
|-------|---------|-------|
| `ftco-section` | Standard section padding | All sections |
| `about-split-section` | Split layout section | WhatWeHandleSection |
| `about-image-col` | Image column in split | WhatWeHandleSection |
| `about-image-wrapper` | Image container | WhatWeHandleSection |
| `about-image` | Background image div | WhatWeHandleSection |
| `wrap-about` | Text column in split | WhatWeHandleSection |
| `services-section` | Dark section styling | Dark sections |
| `img` | Background image section | Dark sections |
| `overlay` | Dark overlay div | Dark sections |
| `heading-section` | Heading container | All headings |
| `heading-section-white` | White text heading | Dark sections |
| `subheading` | Subheading text | All sections |

### Background Images

| Section | Image | Treatment |
|---------|-------|-----------|
| Hero | `/images/cp.jpg` | Via Hero component |
| Dark sections | `/images/bg_6.jpg` | `background-size: cover` + overlay |
| WhatWeHandle | `/images/BC.jpg` | Split layout image |

### Dark Section Structure
```jsx
<section
  className="ftco-section services-section img"
  style={{
    backgroundImage: "url('/images/bg_6.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  }}
>
  <div className="overlay"></div>
  <Container>
    {/* Content */}
  </Container>
</section>
```

---

## Data Structure

### Property Services Data (Existing)
```javascript
const propertyServices = [
  {
    id: 1,
    image: '/images/cp.jpg',
    title: 'Commercial Property Services',
    description: '...'
  },
  {
    id: 2,
    image: '/images/cb.jpg',
    title: 'Residential Property',
    description: '...'
  },
  {
    id: 3,
    image: '/images/TR.jpg',
    title: 'Township Rentails',
    description: '...'
  },
  {
    id: 4,
    image: '/images/BC.jpg',
    title: 'Body Corporate & HOA Management',
    description: '...'
  },
  {
    id: 5,
    image: '/images/Abnb.jpg',
    title: 'Airbnb / Short-Term Rental Management',
    description: '...'
  }
]
```

### What We Handle List Data
```javascript
const whatWeHandleItems = [
  'Property maintenance and repairs',
  'General accounting and financial reporting',
  'Budgeting and contract management',
  'Enforcing rules and by-laws',
  'Handling owner concerns and disputes',
  'Invoicing levies and service charges',
  'Collecting arrears',
  'Preparing meetings and issuing notices, orders, and certificates',
  'Conducting monthly operations reports from on-site visits'
]
```

---

## File Changes

### Files to Modify
1. **`BlackEagleGroup.React/src/pages/PropertyServices.jsx`**
   - Complete redesign with new section components
   - Add Framer Motion imports and scroll animations
   - Restructure content into distinct sections

### Files to Review (Reference Only)
- `BlackEagleGroup.React/src/pages/About.jsx` - Animation patterns
- `BlackEagleGroup.React/src/pages/Home.jsx` - Section styling patterns
- `BlackEagleGroup.React/src/components/Hero.jsx` - Hero props

---

## Testing Requirements

### Visual Testing
1. Verify Hero displays property-specific background
2. Check scroll animations trigger at correct viewport positions
3. Confirm stagger effects on service cards and list items
4. Validate dark section overlays and text readability
5. Test split layout responsive behavior

### Responsive Testing
- Desktop (1200px+): 3-column card grid, side-by-side split
- Tablet (768px-1199px): 2-column card grid, stacked split
- Mobile (<768px): 1-column card grid, stacked split

### Accessibility Testing
1. Test with `prefers-reduced-motion: reduce` - animations should be disabled
2. Verify keyboard navigation through sections
3. Check color contrast in dark sections
4. Validate ARIA labels on images

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari
- Chrome Mobile

---

## Success Criteria

1. ✅ Property Services page uses Framer Motion scroll animations
2. ✅ Service cards animate with staggered reveals on scroll
3. ✅ Page has alternating light/dark section rhythm
4. ✅ Overview/Expertise content uses split layouts or full-width dark sections
5. ✅ Hero has property-specific background image
6. ✅ All animations respect `prefers-reduced-motion`
7. ✅ Page is fully responsive across all breakpoints
8. ✅ Design is consistent with Home and About page aesthetics

---

## Implementation Notes

### Pattern Reference
Use `About.jsx` as the primary reference for:
- Section component structure
- Framer Motion hook usage
- Scroll progress calculations
- Stagger delay patterns

### Key Imports
```jsx
import { useState, useEffect, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { motion, useScroll, useTransform } from 'framer-motion'
import SEO from '@/components/SEO'
import Hero from '@/components/Hero'
import ServiceCard from '@/components/ServiceCard'
```

### Hero Background Implementation
Check if Hero component supports `backgroundImage` prop. If not, may need to:
1. Pass background as a prop
2. Or use inline style override

---

## Timeline Estimate

| Task | Estimate |
|------|----------|
| Setup section components structure | 30 min |
| Implement service cards with animation | 45 min |
| Create dark sections (Expertise, Overview) | 45 min |
| Build WhatWeHandle split section | 30 min |
| Add Hero background customization | 15 min |
| Responsive testing & fixes | 30 min |
| Accessibility testing | 15 min |
| **Total** | **~3.5 hours** |

---

## Appendix

### Current PropertyServices.jsx Structure
```
- Hero (default background)
- Services Section (light)
  - Heading
  - 3-column ServiceCard grid (5 cards)
  - Overview paragraph
  - Expertise list
```

### New PropertyServices.jsx Structure
```
- SEO
- Hero (property background)
- ServicesIntroSection (light, animated heading)
- ServiceCardsSection (light, 5 animated cards)
- OurExpertiseSection (dark, portfolio stats)
- WhatWeHandleSection (light, split layout with list)
- OverviewSection (dark, company description)
```
