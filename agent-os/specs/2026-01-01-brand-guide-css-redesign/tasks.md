# Tasks: Brand Guide CSS Redesign - Phase 1 (Clients Page)

**Spec:** `agent-os/specs/2026-01-01-brand-guide-css-redesign/spec.md`  
**Status:** Not Started  
**Created:** 2026-01-01

---

## Overview

This tasks list breaks down Phase 1 of the brand guide CSS redesign into actionable, sequential tasks. The focus is on redesigning the Clients page while establishing reusable component patterns and design system foundations for future site-wide application.

**Estimated Timeline:** 8 days  
**Total Tasks:** 47

---

## Task Groups

### Group 1: Foundation Setup (Day 1) - 8 tasks

**Goal:** Establish the brand design system foundation by updating CSS variables, Tailwind config, and base typography styles.

#### 1.1: Update CSS Color Variables - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Update all CSS custom properties to match brand guide colors
- **Details:**
  - Change `--color-primary` from `#59B200` to `#4B9400` (Vibrant Green)
  - Change `--color-accent` from `#C9A962` to `#C5A367` (Brass/Gold)
  - Change `--color-dark` from `#1A1A1A` to `#1A1C19` (Deep Forest)
  - Change `--color-cream` from `#F5F3EF` to `#F9F7F2` (Antique White)
  - Add `--color-primary-dark: #3D7A00`
  - Add `--color-accent-light: #D4BC7D`
  - Verify all color variables are defined
- **Acceptance Criteria:**
  - All brand colors are correctly defined in CSS variables
  - No hardcoded color values remain in variable definitions
  - Colors match brand guide specifications exactly

#### 1.2: Add Brand Shadow Variables - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Add shadow variables for brand design system
- **Details:**
  - Add `--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05)`
  - Add `--shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.12)`
  - Add `--shadow-gold: 0 4px 20px rgba(197, 163, 103, 0.3)`
  - Update existing shadow variables if needed
- **Acceptance Criteria:**
  - All shadow variables are defined
  - Shadow values match brand guide specifications

#### 1.3: Update Tailwind Color Configuration - [x]
- **File:** `BlackEagleGroup.React/tailwind.config.js`
- **Description:** Update Tailwind config to include brand color palette
- **Details:**
  - Add `brand` color object with all brand colors
  - Include: primary, primary-dark, accent, accent-light, dark, charcoal, cream, white, muted
  - Ensure colors reference exact hex values from brand guide
- **Acceptance Criteria:**
  - Brand colors are accessible via Tailwind utilities (e.g., `bg-brand-primary`)
  - All color values match brand guide specifications
  - Existing color utilities still work

#### 1.4: Update Tailwind Shadow Configuration - [x]
- **File:** `BlackEagleGroup.React/tailwind.config.js`
- **Description:** Add brand shadow utilities to Tailwind config
- **Details:**
  - Add `card`, `card-hover`, and `gold` shadow utilities
  - Match shadow values to CSS variables
- **Acceptance Criteria:**
  - Shadow utilities are accessible (e.g., `shadow-card`)
  - Shadow values match brand specifications

#### 1.5: Update Base Typography Styles - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Update typography base styles in `@layer base`
- **Details:**
  - Update body font to use Source Sans 3 with brand colors
  - Update heading styles (h1-h6) to use Playfair Display
  - Set proper font weights (h1: 600, h2-h3: 500)
  - Define responsive typography sizes
  - Ensure line-height is set correctly (1.2 for headings, 1.6 for body)
- **Acceptance Criteria:**
  - All headings use Playfair Display
  - Body text uses Source Sans 3
  - Font sizes match brand guide specifications
  - Responsive typography scales correctly on mobile

#### 1.6: Create Typography Utility Classes - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Create reusable typography utility classes
- **Details:**
  - Create `.subheading` class (12px, uppercase, letter-spacing, green)
  - Create `.quote-text` class (italic serif, 28px)
  - Add responsive styles for each utility
- **Acceptance Criteria:**
  - Utility classes are defined and styled correctly
  - Classes match brand guide specifications
  - Responsive variants work on mobile

#### 1.7: Create Visual Depth Utility Classes - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Create utility classes for visual depth system
- **Details:**
  - Create `.card-elevated` class with shadow and hover states
  - Create `.border-accent-top` class for 4px green top border
  - Create `.btn-primary` and `.btn-secondary` classes
  - Add transitions and hover states
- **Acceptance Criteria:**
  - All utility classes are defined
  - Hover states work correctly
  - Transitions are smooth (0.3s ease)

#### 1.8: Test Foundation Changes - [x]
- **Description:** Verify foundation setup doesn't break existing functionality
- **Details:**
  - Run dev server and check for console errors
  - Verify color changes are visible across the site
  - Check that no styles are broken
  - Test in Chrome and Firefox
- **Acceptance Criteria:**
  - No console errors
  - Dev server runs without issues
  - Color changes are visible
  - No visual regressions in other pages

---

### Group 2: ClientCard Component Refactor (Days 2-3) - 12 tasks

**Goal:** Refactor the ClientCard component to match brand guide specifications with proper structure, styling, and hover states.

#### 2.1: Update ClientCard Component Structure - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Refactor component JSX structure to match brand guide design
- **Details:**
  - Simplify component structure (remove complex parallax/3D effects)
  - Add 4px green top border element
  - Restructure logo area (120px height, centered)
  - Update content area with proper hierarchy
  - Update button grid layout
- **Acceptance Criteria:**
  - Component structure matches spec design
  - Logo area is 120px height
  - Buttons are in 2-column grid
  - 4px green border is at top

#### 2.2: Style ClientCard Container - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx` or create `BlackEagleGroup.React/src/styles/ClientCard.css`
- **Description:** Apply brand styling to card container
- **Details:**
  - White background
  - Border radius: 12px
  - Border-top: 4px solid brand-primary
  - Box shadow: var(--shadow-card)
  - Hover: translateY(-4px) + shadow-card-hover
  - Transition: 0.3s ease
- **Acceptance Criteria:**
  - Card has white background and rounded corners
  - 4px green top border is visible
  - Hover state works smoothly
  - Shadow depth increases on hover

#### 2.3: Style Logo Area - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Style the logo display area
- **Details:**
  - Height: 120px
  - Padding: 1.5rem
  - Display: flex (center content)
  - Background: white
  - Border-bottom: 1px solid #f0f0f0
  - Logo: max-width/height 100%, object-fit contain
- **Acceptance Criteria:**
  - Logo area is exactly 120px tall
  - Logos are centered and scaled properly
  - Border separates logo from content
  - No logo distortion

#### 2.4: Style Company Name - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Apply brand typography to company name
- **Details:**
  - Font: Playfair Display
  - Size: 1.5rem (24px)
  - Weight: 500
  - Color: var(--color-dark)
  - Margin-bottom: 0.5rem
- **Acceptance Criteria:**
  - Company name uses serif font
  - Font size is correct
  - Color matches brand dark
  - Proper spacing below

#### 2.5: Style Company Meta (Location/Industry) - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Style the location and industry text
- **Details:**
  - Font size: 0.75rem (12px)
  - Text-transform: uppercase
  - Letter-spacing: 0.125em
  - Color: var(--color-text-muted)
  - Font-weight: 600
  - Margin-bottom: 1.5rem
- **Acceptance Criteria:**
  - Text is uppercase with proper letter spacing
  - Color is muted gray
  - Proper spacing before buttons

#### 2.6: Style Call Button (Primary) - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Apply brand styling to Call button
- **Details:**
  - Background: var(--color-primary)
  - Color: white
  - Padding: 0.625rem 1rem
  - Border-radius: 6px
  - Font-weight: 600
  - Font-size: 0.875rem
  - Hover: background-primary-dark + translateY(-2px) + shadow
  - Transition: 0.3s ease
- **Acceptance Criteria:**
  - Button has green background
  - White text is readable
  - Hover state darkens and lifts button
  - Shadow appears on hover

#### 2.7: Style Reference Button (Secondary) - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Apply brand styling to Reference button
- **Details:**
  - Background: transparent
  - Color: var(--color-accent)
  - Border: 2px solid var(--color-accent)
  - Padding: 0.625rem 1rem
  - Border-radius: 6px
  - Font-weight: 600
  - Hover: fill with accent color + white text + gold shadow
  - Transition: 0.3s ease
- **Acceptance Criteria:**
  - Button has gold outline
  - Gold text is visible
  - Hover fills with gold and shows white text
  - Gold shadow appears on hover

#### 2.8: Style Button Grid Layout - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Style the button container grid
- **Details:**
  - Display: grid
  - Grid-template-columns: 1fr 1fr
  - Gap: 0.75rem
  - Both buttons equal width
- **Acceptance Criteria:**
  - Buttons are side by side
  - Equal width with gap between
  - Grid layout is responsive

#### 2.9: Add Featured Variant Styles - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Add styles for featured card variant
- **Details:**
  - Border-top-width: 5px (instead of 4px)
  - Logo area height: 160px (instead of 120px)
  - Company name size: 2rem (instead of 1.5rem)
- **Acceptance Criteria:**
  - Featured cards have thicker border
  - Featured cards have taller logo area
  - Featured cards have larger company name
  - Non-featured cards are unaffected

#### 2.10: Add Mobile Responsive Styles - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Add mobile-specific styles for ClientCard
- **Details:**
  - Logo area: 100px height on mobile
  - Company name: 1.25rem on mobile
  - Button grid: stack to 1 column on mobile
  - Button gap: 0.5rem on mobile
  - Touch targets: minimum 44px
- **Acceptance Criteria:**
  - Card looks good on mobile (375px width)
  - Buttons stack vertically on mobile
  - Touch targets meet 44px minimum
  - Typography is readable

#### 2.11: Remove Old Hover Effects - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`
- **Description:** Remove complex parallax and 3D hover effects
- **Details:**
  - Remove mouse position tracking
  - Remove parallax style calculations
  - Remove 3D card transform
  - Remove hover overlay with information
  - Keep simple card hover (translateY + shadow)
- **Acceptance Criteria:**
  - No parallax effects remain
  - No 3D transform on hover
  - Simple hover animation works
  - Code is cleaner and simpler

#### 2.12: Test ClientCard Component - [x]
- **Description:** Test refactored ClientCard in isolation
- **Details:**
  - Test with different logo sizes
  - Test with/without phone number and reference link
  - Test featured variant
  - Test hover states
  - Test on mobile viewport
  - Test keyboard navigation
- **Acceptance Criteria:**
  - All card states work correctly
  - Logos display properly
  - Buttons link correctly
  - Hover states are smooth
  - Mobile layout works
  - Keyboard navigation works

---

### Group 3: Supporting Components (Day 3) - 6 tasks

**Goal:** Create and update supporting components (SectionHeader, Filter, Search, Sort) with brand styling.

#### 3.1: Create SectionHeader Component - [x]
- **File:** `BlackEagleGroup.React/src/components/SectionHeader.jsx` (NEW)
- **Description:** Create reusable section header component
- **Details:**
  - Accept props: label, title, description, align
  - Render subheading label (if provided)
  - Render section title (Playfair Display, 2.5rem)
  - Render description (if provided)
  - Support center/left alignment
- **Acceptance Criteria:**
  - Component accepts all required props
  - Renders correct hierarchy
  - Uses brand typography
  - Alignment options work

#### 3.2: Style SectionHeader Component - [x]
- **File:** `BlackEagleGroup.React/src/components/SectionHeader.jsx`
- **Description:** Apply brand styling to SectionHeader
- **Details:**
  - Margin-bottom: 3rem
  - Label: use .subheading utility class
  - Title: Playfair Display, 2.5rem, color-dark
  - Description: 1.125rem, color-text-muted, max-width 800px
  - Add responsive styles for mobile
- **Acceptance Criteria:**
  - Typography matches brand guide
  - Spacing is correct
  - Responsive on mobile
  - Centered alignment works

#### 3.3: Update ClientSearch Styling - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientSearch.jsx`
- **Description:** Apply brand styling to search input
- **Details:**
  - Border: 2px solid #e5e5e5
  - Border-radius: 8px
  - Padding: 0.75rem with left padding for icon
  - Focus: border-color primary + shadow ring
  - Icon: color-text-muted
  - Transition: 0.3s ease
- **Acceptance Criteria:**
  - Search input has rounded corners
  - Focus state shows green border and ring
  - Icon is properly positioned
  - Transitions are smooth

#### 3.4: Update ClientFilter Styling - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientFilter.jsx`
- **Description:** Apply brand styling to filter buttons
- **Details:**
  - Border: 2px solid #e5e5e5
  - Border-radius: 8px
  - Background: white
  - Padding: 0.625rem 1.25rem
  - Hover: border-color primary + text color primary
  - Active: background primary + white text
  - Transition: 0.3s ease
- **Acceptance Criteria:**
  - Filter buttons have proper styling
  - Hover shows green border
  - Active state is clearly visible
  - Transitions work smoothly

#### 3.5: Update ClientSort Styling - [x]
- **File:** `BlackEagleGroup.React/src/components/ClientSort.jsx`
- **Description:** Apply brand styling to sort dropdown
- **Details:**
  - Match filter button styling
  - Dropdown menu: white background, shadow-md
  - Dropdown items: hover with brand-cream background
  - Selected item: text color primary
- **Acceptance Criteria:**
  - Sort dropdown matches filter styling
  - Dropdown menu is properly styled
  - Hover states work correctly
  - Selected state is visible

#### 3.6: Test Supporting Components - [x]
- **Description:** Test all supporting components together
- **Details:**
  - Test SectionHeader with different prop combinations
  - Test search input with focus states
  - Test filter buttons with selection
  - Test sort dropdown functionality
  - Test keyboard navigation
- **Acceptance Criteria:**
  - All components render correctly
  - Interactions work as expected
  - Keyboard navigation works
  - No console errors

---

### Group 4: Clients Page Layout (Days 4-5) - 10 tasks

**Goal:** Update the Clients page layout with proper sections, backgrounds, and component integration.

#### 4.1: Update Hero Section Styling - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Apply brand styling to hero section
- **Details:**
  - Ensure background uses brand-dark color
  - Verify Hero component renders correctly
  - Check breadcrumbs styling
  - Verify title and subtitle colors (white)
- **Acceptance Criteria:**
  - Hero section uses Deep Forest background
  - Text is white and readable
  - Breadcrumbs are visible
  - No visual regressions

#### 4.2: Create Search Section Container - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Style the search/filter section container
- **Details:**
  - Background: brand-cream
  - Padding: 2rem 0
  - Center search controls in container
  - Flex layout for controls (search, filter, sort)
  - Gap between controls: 1rem
  - Responsive: stack on mobile
- **Acceptance Criteria:**
  - Section has cream background
  - Controls are properly spaced
  - Responsive layout works on mobile
  - No layout shifts

#### 4.3: Update Featured Partners Section - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Update featured partners section layout
- **Details:**
  - Background: brand-cream
  - Padding: 5rem 0
  - Use SectionHeader component
  - 3-column grid for featured cards
  - Gap: 1.5rem
  - Responsive: 3 → 2 → 1 columns
- **Acceptance Criteria:**
  - Section uses SectionHeader component
  - Grid layout works correctly
  - Responsive breakpoints work
  - Cards are properly spaced

#### 4.4: Implement Alternating Section Backgrounds - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Add alternating backgrounds to industry sections
- **Details:**
  - Odd-indexed sections: white background
  - Even-indexed sections: brand-cream background
  - Use modulo operator for alternation
  - Consistent padding: 5rem 0
- **Acceptance Criteria:**
  - Backgrounds alternate correctly
  - Cream and white sections are visible
  - Padding is consistent
  - Smooth visual rhythm

#### 4.5: Update Industry Section Layout - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Update industry section structure and grid
- **Details:**
  - Use SectionHeader for each industry
  - 4-column grid for regular clients
  - Gap: 1.5rem
  - Responsive: 4 → 3 → 2 → 1 columns
  - Proper spacing between sections
- **Acceptance Criteria:**
  - Industry sections use SectionHeader
  - Grid responsive behavior works
  - Proper spacing throughout
  - Cards render correctly

#### 4.6: Create Testimonial Section - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Create testimonial section with brand styling
- **Details:**
  - Background: brand-cream
  - Padding: 5rem 0
  - Center content, max-width 900px
  - Large gold quotation mark
  - Italic serif quote text (1.75rem)
  - Attribution: author (green), company (muted)
  - Responsive text sizing
- **Acceptance Criteria:**
  - Testimonial section matches mockup
  - Quote mark is gold and prominent
  - Text is centered and readable
  - Attribution colors are correct
  - Responsive on mobile

#### 4.7: Create CTA Footer Section - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Create CTA footer section with brand styling
- **Details:**
  - Background: brand-dark
  - Padding: 4rem 0
  - Text center alignment
  - White heading (2.5rem Playfair Display)
  - Gray subtitle
  - Gold button with hover effects
- **Acceptance Criteria:**
  - CTA section has dark background
  - Text is white and readable
  - Gold button stands out
  - Hover effects work
  - Responsive on mobile

#### 4.8: Create Page-Specific Styles File - [x]
- **File:** `BlackEagleGroup.React/src/styles/clients.css` (NEW)
- **Description:** Create CSS file for Clients page specific styles
- **Details:**
  - Grid utilities (.grid-3-col, .grid-4-col)
  - Section background utilities
  - Testimonial styles (.quote-mark, .attribution)
  - CTA section styles
  - Responsive media queries
- **Acceptance Criteria:**
  - All page-specific styles are defined
  - Utilities are reusable
  - Responsive styles work
  - No style conflicts

#### 4.9: Import and Apply Page Styles - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Import clients.css and apply classes to elements
- **Details:**
  - Import clients.css at top of file
  - Apply grid classes to section containers
  - Apply background classes to sections
  - Apply testimonial classes
  - Verify all styles are applied
- **Acceptance Criteria:**
  - Styles file is imported correctly
  - Classes are applied to correct elements
  - Styles render as expected
  - No className typos

#### 4.10: Test Complete Page Layout - [x]
- **Description:** Test entire Clients page layout end-to-end
- **Details:**
  - Verify hero section renders correctly
  - Test search/filter/sort functionality
  - Verify featured section displays properly
  - Test industry sections with alternating backgrounds
  - Verify testimonial section
  - Test CTA section
  - Test all breakpoints (desktop, tablet, mobile)
  - Verify scroll behavior
- **Acceptance Criteria:**
  - All sections render correctly
  - Backgrounds alternate properly
  - All functionality works
  - Responsive design works at all breakpoints
  - No console errors

---

### Group 5: Animation Updates (Day 6) - 4 tasks

**Goal:** Update Framer Motion animations with brand colors and standardized timing.

#### 5.1: Update Card Animation Variants - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Update Framer Motion variants for card animations
- **Details:**
  - Keep existing staggered fade-in pattern
  - Update timing to use standard easing: cubic-bezier(0.4, 0, 0.2, 1)
  - Duration: 0.6s
  - Stagger delay: 0.1s per card
  - Ensure animations respect prefers-reduced-motion
- **Acceptance Criteria:**
  - Cards animate in with stagger
  - Timing is smooth and consistent
  - Reduced motion preference is respected
  - No animation jank

#### 5.2: Update Header Animation Variants - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Update section header animation variants
- **Details:**
  - Fade in from opacity 0 to 1
  - Translate from y: 20 to y: 0
  - Duration: 0.6s
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)
  - Trigger when section enters viewport
- **Acceptance Criteria:**
  - Headers animate smoothly
  - Timing matches brand standards
  - Triggers work correctly
  - No layout shift during animation

#### 5.3: Add Reduced Motion Support - [x]
- **File:** `BlackEagleGroup.React/src/pages/Clients.jsx`
- **Description:** Ensure all animations respect reduced motion preference
- **Details:**
  - Check for prefers-reduced-motion media query
  - Disable or minimize animations when preference is set
  - Ensure instant appearance instead of animation
  - Test with browser dev tools
- **Acceptance Criteria:**
  - Animations are disabled when reduced motion is preferred
  - Page is still fully functional
  - No animation flicker
  - Respects user preferences

#### 5.4: Test All Animations - [x]
- **Description:** Test all animation patterns on the page
- **Details:**
  - Test card stagger animations
  - Test header animations
  - Test scroll trigger points
  - Test reduced motion mode
  - Test on different scroll speeds
  - Verify performance (no jank)
- **Acceptance Criteria:**
  - All animations work smoothly
  - No performance issues
  - Reduced motion works correctly
  - Animations feel premium and polished

---

### Group 6: Mobile Optimization (Day 7) - 4 tasks

**Goal:** Audit and optimize mobile responsiveness for brand typography and layout.

#### 6.1: Audit Mobile Typography - [x]
- **Description:** Test and adjust typography on mobile devices
- **Details:**
  - Test on 375px width (iPhone SE)
  - Test on 390px width (iPhone 12/13/14)
  - Verify all text is readable
  - Check heading sizes are appropriate
  - Verify line heights prevent text cramping
  - Adjust sizes if needed
- **Acceptance Criteria:**
  - All text is readable on small screens
  - No text overflow
  - Proper line breaks
  - Comfortable reading experience

#### 6.2: Test Touch Targets - [x]
- **Description:** Verify all interactive elements meet 44px minimum
- **Details:**
  - Test buttons on mobile
  - Test filter controls
  - Test search input
  - Test card clickable areas
  - Measure using browser dev tools
  - Add padding if needed
- **Acceptance Criteria:**
  - All buttons are minimum 44px height
  - Touch targets are easy to tap
  - No accidental taps on wrong elements
  - Meets accessibility guidelines

#### 6.3: Optimize Grid Layouts - [x]
- **Description:** Test and optimize grid responsiveness
- **Details:**
  - Test 3-column featured grid → 2 → 1
  - Test 4-column industry grid → 3 → 2 → 1
  - Verify breakpoints work smoothly
  - Check card sizes at each breakpoint
  - Ensure no horizontal scroll
- **Acceptance Criteria:**
  - Grids respond correctly at all breakpoints
  - Cards are properly sized
  - No layout breaks
  - No horizontal scroll
  - Smooth transitions between breakpoints

#### 6.4: Test Mobile Performance - [x]
- **Description:** Test page performance on mobile devices
- **Details:**
  - Test on real mobile device (iOS and Android)
  - Check scroll performance
  - Verify animations are smooth
  - Test with slow 3G connection
  - Check Lighthouse mobile score
  - Optimize if needed
- **Acceptance Criteria:**
  - Smooth scrolling on mobile
  - No animation jank
  - Acceptable load time on slow connection
  - Lighthouse mobile score > 80
  - Good user experience

---

### Group 7: Testing & QA (Day 8) - 3 tasks

**Goal:** Comprehensive testing and quality assurance before completion.

#### 7.1: Cross-Browser Testing - [x]
- **Description:** Test Clients page across all supported browsers
- **Details:**
  - Test on Chrome (latest)
  - Test on Firefox (latest)
  - Test on Safari (latest)
  - Test on Edge (latest)
  - Test on Mobile Safari (iOS)
  - Test on Chrome Mobile (Android)
  - Document any browser-specific issues
  - Fix any rendering issues
- **Acceptance Criteria:**
  - Page works correctly in all browsers
  - No visual differences between browsers
  - All functionality works consistently
  - No browser-specific bugs

#### 7.2: Accessibility Audit - [x]
- **Description:** Run accessibility audit and fix issues
- **Details:**
  - Run axe DevTools scan
  - Run Lighthouse accessibility audit
  - Test keyboard navigation throughout page
  - Test with screen reader (NVDA or VoiceOver)
  - Verify color contrast ratios (4.5:1 minimum)
  - Fix all accessibility issues found
- **Acceptance Criteria:**
  - No accessibility violations in axe
  - Lighthouse accessibility score > 90
  - Keyboard navigation works completely
  - Screen reader announces content correctly
  - All text meets contrast requirements
  - Focus indicators are visible

#### 7.3: Final QA Checklist - [x]
- **Description:** Complete final QA checklist before marking complete
- **Details:**
  - ✓ All colors match brand guide exactly
  - ✓ Typography uses correct fonts and sizes
  - ✓ ClientCard displays correctly (border, logo, buttons)
  - ✓ Section backgrounds alternate correctly
  - ✓ All animations work smoothly
  - ✓ Search, filter, sort functionality works
  - ✓ Mobile responsive at all breakpoints
  - ✓ Touch targets meet 44px minimum
  - ✓ Hover states work on all interactive elements
  - ✓ Cross-browser compatibility verified
  - ✓ Accessibility standards met
  - ✓ Performance is acceptable (Lighthouse > 80)
  - ✓ No console errors or warnings
  - ✓ Code is clean and well-documented
- **Acceptance Criteria:**
  - All checklist items pass
  - No critical issues remain
  - Ready for production deployment
  - Documentation is complete

---

## Task Status Legend

- ⏳ **Not Started** - Task has not been started yet
- 🚧 **In Progress** - Task is currently being worked on
- ✅ **Complete** - Task is finished and verified
- ⚠️ **Blocked** - Task is blocked by dependencies or issues
- ❌ **Cancelled** - Task has been cancelled or is no longer needed

---

## Dependencies & Prerequisites

### Before Starting
- [ ] Dev environment is set up and running
- [ ] Bun/npm dependencies are installed
- [ ] Git branch created for this work
- [ ] Brand guide documents reviewed
- [ ] Visual mockups reviewed

### External Dependencies
- Google Fonts API (Playfair Display, Source Sans 3) - already configured
- Framer Motion (animations) - already installed
- React Bootstrap (grid system) - already installed
- Tailwind CSS v3 - already installed

---

## Notes

### Testing Devices/Viewports
- Desktop: 1920x1080, 1440x900, 1280x720
- Tablet: 768x1024 (iPad)
- Mobile: 375x667 (iPhone SE), 390x844 (iPhone 12)

### Code Review Checkpoints
- After Group 1 (Foundation) - verify no breaking changes
- After Group 2 (ClientCard) - verify component works in isolation
- After Group 4 (Page Layout) - verify full page integration
- After Group 7 (Testing) - final review before completion

### Performance Targets
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Lighthouse Performance Score > 80

---

**End of Tasks List**
