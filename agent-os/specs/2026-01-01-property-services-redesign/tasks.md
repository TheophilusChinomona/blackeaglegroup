# Property Services Page Redesign - Tasks List

## Overview
This tasks list breaks down the PropertyServices.jsx redesign into actionable implementation steps. Tasks are grouped by logical phases and ordered for optimal development flow.

**Spec Reference**: `agent-os/specs/2026-01-01-property-services-redesign/spec.md`

---

## Task Groups

### Group 1: Setup & Foundation
Prepare the file structure and imports for the redesign.

### Group 2: Hero & Introduction Sections
Implement the property-specific hero and intro section with animations.

### Group 3: Service Cards Section
Add scroll animations to the existing service cards grid.

### Group 4: Dark Background Sections
Create the Our Expertise and Overview dark sections with animations.

### Group 5: Split Layout Section
Build the What We Handle split layout with animated list items.

### Group 6: Testing & Verification
Validate responsive behavior, accessibility, and visual consistency.

---

## Tasks

### Group 1: Setup & Foundation

#### Task 1.1: Review Hero Component Props
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/components/Hero.jsx`
- **Description**: Check if Hero component supports `backgroundImage` prop
- **Acceptance Criteria**:
  - Verify Hero component accepts background customization
  - Document how to pass property-specific background image
  - If prop doesn't exist, note what modification is needed
- **Implementation Notes**: Added `backgroundImage` prop to Hero component that overrides carousel when provided

#### Task 1.2: Update Imports in PropertyServices.jsx
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Add Framer Motion and other required imports
- **Acceptance Criteria**:
  - Add `import { useRef } from 'react'`
  - Add `import { Container, Row, Col } from 'react-bootstrap'`
  - Add `import { motion, useScroll, useTransform } from 'framer-motion'`
  - Add `import SEO from '@/components/SEO'`
  - Keep existing `Hero` and `ServiceCard` imports

#### Task 1.3: Add SEO Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Add SEO meta tags for the Property Services page
- **Acceptance Criteria**:
  - Add SEO component with title "Property Services"
  - Add description about property management services
  - Set appropriate path and image

---

### Group 2: Hero & Introduction Sections

#### Task 2.1: Add Property-Specific Hero Background
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Update Hero component to use `/images/cp.jpg` background
- **Acceptance Criteria**:
  - Hero displays Commercial Property image as background
  - Title remains "Property Services"
  - Breadcrumbs: Home → Property Services

#### Task 2.2: Create ServicesIntroSection Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create animated introduction section with heading
- **Acceptance Criteria**:
  - Section uses `ftco-section` class
  - Subheading: "Our Services Property" with scroll animation
  - Heading: "What We Do" with staggered scroll animation
  - Centered text layout

---

### Group 3: Service Cards Section

#### Task 3.1: Create AnimatedServiceCard Wrapper Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create motion wrapper for existing ServiceCard component
- **Acceptance Criteria**:
  - Wraps ServiceCard in motion.div
  - Calculates delay based on card index (0.1, 0.15, 0.2, 0.25, 0.3)
  - Applies opacity and Y transform based on scroll progress

#### Task 3.2: Create ServiceCardsSection Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create section component that maps service data to animated cards
- **Acceptance Criteria**:
  - Uses `ftco-section` class
  - 3-column grid layout (Bootstrap Row/Col)
  - Maps all 5 propertyServices to AnimatedServiceCard
  - Section has its own scroll tracking ref

---

### Group 4: Dark Background Sections

#### Task 4.1: Create OurExpertiseSection Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create dark full-width section for expertise content
- **Implementation Details**:
  - Background: `/images/bg_6.jpg` with overlay
  - Classes: `ftco-section services-section img`
  - Overlay div with class `overlay`
  - White text with `heading-section-white`
- **Content**:
  - Subheading: "Excellence"
  - Heading: "Our Expertise"
  - Paragraph: Portfolio details (10,000+ units, nationwide coverage)
- **Acceptance Criteria**:
  - Dark background with semi-transparent overlay
  - Centered content layout
  - Staggered scroll animations on text elements
  - White text readable against dark background

#### Task 4.2: Create OverviewSection Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create dark full-width section for company overview
- **Implementation Details**:
  - Same dark background pattern as OurExpertiseSection
  - Multiple paragraphs with staggered animations
- **Content**:
  - Subheading: "About"
  - Heading: "Overview"
  - Paragraphs: BEGH company description from existing content
  - Final line: "Our in-house collections team..."
- **Acceptance Criteria**:
  - Dark background with overlay
  - Multiple paragraphs animate sequentially on scroll
  - Consistent styling with OurExpertiseSection

#### Task 4.3: Create AnimatedParagraph Helper Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create reusable component for animated paragraphs in dark sections
- **Acceptance Criteria**:
  - Reusable for both dark sections
  - Accepts delay prop for stagger timing
  - Applies white text styling

---

### Group 5: Split Layout Section

#### Task 5.1: Create AnimatedListItem Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create component for animated list items in What We Handle section
- **Acceptance Criteria**:
  - Staggered animation based on delay prop
  - Works within ul element
  - Consistent animation pattern with other elements

#### Task 5.2: Define whatWeHandleItems Data Array
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create data array for What We Handle bullet list
- **Acceptance Criteria**:
  - Array contains all 9 services from current page
  - Data defined at component level (not inside section component)

#### Task 5.3: Create WhatWeHandleSection Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Create split layout section with image left, list right
- **Implementation Details**:
  - Classes: `ftco-section about-split-section`
  - Image column: `about-image-col` with `about-image-wrapper`
  - Text column: `wrap-about` with heading and list
  - Image: `/images/BC.jpg`
- **Content**:
  - Subheading: "Services"
  - Heading: "What We Handle"
  - List: 9 items from whatWeHandleItems array
- **Acceptance Criteria**:
  - Split layout: image left, content right
  - Image animates on scroll
  - Heading animates with stagger
  - List items animate sequentially (9 items with staggered delays)
  - Follows About page split section pattern

---

### Group 6: Assembly & Main Component

#### Task 6.1: Assemble PropertyServices Main Component
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Combine all section components in correct order
- **Section Order**:
  1. SEO
  2. Hero (with property background)
  3. ServicesIntroSection
  4. ServiceCardsSection
  5. OurExpertiseSection
  6. WhatWeHandleSection
  7. OverviewSection
- **Acceptance Criteria**:
  - All sections render in correct order
  - Page scrolls smoothly
  - No console errors

#### Task 6.2: Remove Old Static Content
- [x] **Status**: Completed
- **File**: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
- **Description**: Remove old static section code that's been replaced
- **Acceptance Criteria**:
  - Old inline Overview/Expertise paragraphs removed
  - Old static service card grid removed
  - Only new section components remain
  - No duplicate content

---

### Group 7: Testing & Verification

#### Task 7.1: Visual Testing - Desktop
- [x] **Status**: Completed
- **Description**: Verify visual appearance on desktop viewport
- **Test Cases**:
  - [x] Hero displays property background image correctly
  - [x] Service cards appear in 3-column grid
  - [x] Dark sections have proper overlay and contrast
  - [x] Split section shows image left, content right
  - [x] All scroll animations trigger at correct positions
  - [x] Stagger timing feels natural and sequential

#### Task 7.2: Visual Testing - Tablet/Mobile
- [x] **Status**: Completed
- **Description**: Verify responsive behavior
- **Test Cases**:
  - [x] Tablet (768px): 2-column card grid, proper spacing
  - [x] Mobile (<768px): 1-column card grid, stacked layout
  - [x] Split section stacks vertically on mobile
  - [x] Dark sections remain readable on all sizes
  - [x] No horizontal scroll

#### Task 7.3: Accessibility Testing
- [x] **Status**: Completed
- **Description**: Verify accessibility compliance
- **Test Cases**:
  - [x] Test with `prefers-reduced-motion: reduce` enabled
  - [x] Verify animations are disabled when motion preference is reduced
  - [x] Check color contrast in dark sections (WCAG AA)
  - [x] Verify ARIA labels on background images
  - [x] Keyboard navigation works through all sections

#### Task 7.4: Cross-Browser Testing
- [x] **Status**: Completed
- **Description**: Verify functionality across browsers
- **Browsers to Test**:
  - [x] Chrome (latest)
  - [x] Firefox (latest)
  - [x] Safari (latest)
  - [x] Edge (latest)
  - [x] Mobile Safari
  - [x] Chrome Mobile

#### Task 7.5: Consistency Check with Home/About Pages
- [x] **Status**: Completed
- **Description**: Verify design matches established patterns
- **Test Cases**:
  - [x] Animation timing consistent with About page
  - [x] Dark section styling matches About page
  - [x] Split layout styling matches About page
  - [x] Typography and spacing consistent
  - [x] Color scheme aligned with brand

---

## Dependencies

```
Task 1.1 ──┐
Task 1.2 ──┼──> Task 2.1 ──> Task 2.2
Task 1.3 ──┘

Task 3.1 ──> Task 3.2

Task 4.3 ──> Task 4.1
         ──> Task 4.2

Task 5.1 ──┐
Task 5.2 ──┴──> Task 5.3

All Section Tasks ──> Task 6.1 ──> Task 6.2

Task 6.2 ──> Group 7 (Testing)
```

---

## Estimated Timeline

| Group | Tasks | Estimate |
|-------|-------|----------|
| Group 1: Setup & Foundation | 1.1, 1.2, 1.3 | 15 min |
| Group 2: Hero & Introduction | 2.1, 2.2 | 20 min |
| Group 3: Service Cards | 3.1, 3.2 | 30 min |
| Group 4: Dark Sections | 4.1, 4.2, 4.3 | 45 min |
| Group 5: Split Layout | 5.1, 5.2, 5.3 | 30 min |
| Group 6: Assembly | 6.1, 6.2 | 15 min |
| Group 7: Testing | 7.1-7.5 | 45 min |
| **Total** | **17 tasks** | **~3.5 hours** |

---

## Success Criteria Checklist

Upon completion, verify all success criteria from spec:

- [x] Property Services page uses Framer Motion scroll animations
- [x] Service cards animate with staggered reveals on scroll
- [x] Page has alternating light/dark section rhythm
- [x] Overview/Expertise content uses split layouts or full-width dark sections
- [x] Hero has property-specific background image
- [x] All animations respect `prefers-reduced-motion`
- [x] Page is fully responsive across all breakpoints
- [x] Design is consistent with Home and About page aesthetics

---

## Notes

### Reference Files
- **Animation Patterns**: `BlackEagleGroup.React/src/pages/About.jsx`
- **Section Styling**: `BlackEagleGroup.React/src/pages/Home.jsx`
- **Hero Component**: `BlackEagleGroup.React/src/components/Hero.jsx`

### Key Animation Pattern
All scroll animations follow this pattern from About.jsx:
```jsx
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"]
})

const elementOpacity = useTransform(scrollYProgress, [delay, delay + 0.3], [0, 1])
const elementY = useTransform(scrollYProgress, [delay, delay + 0.3], [20, 0])
```

### Stagger Delays
- Cards: 0.1, 0.15, 0.2, 0.25, 0.3 (5 cards, 0.05 increment)
- List items: 0.1 + (index * 0.05) for 9 items
- Text elements: 0, 0.05, 0.1 (subheading, heading, paragraph)
