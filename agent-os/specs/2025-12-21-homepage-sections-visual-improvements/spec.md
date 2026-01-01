# Specification: Homepage Sections Visual Improvements

## Goal

Enhance the visual design of the Services, Why Choose Us, and Dedication sections on the homepage by adding hover effects, shadows, animations, and improved styling while maintaining the existing theme from the live site and matching exact spacing.

## User Stories

- As a website visitor, I want to see visually engaging sections with smooth animations so that the homepage feels modern and professional
- As a website visitor, I want interactive hover effects on service cards so that I can clearly see which services are available

## Specific Requirements

**Services Section Visual Enhancements**
- Maintain existing 4-column grid layout with service cards (no structural changes)
- Add hover effects to service cards: subtle lift (translateY), shadow enhancement, and smooth transitions
- Implement scroll-triggered staggered reveal animations (50ms delay between cards) using existing `.ftco-animate` pattern
- Match exact spacing from live site: section padding `6em 0` (96px), no top/bottom padding classes (`.ftco-no-pt`, `.ftco-no-pb`)
- Use existing `.services` class with enhanced hover states (shadow elevation, transform effects)
- Keep all existing content (icons/images and headings) - no additional descriptive text
- Apply GPU-accelerated properties (transform, opacity) for smooth performance
- Ensure responsive behavior across mobile, tablet, and desktop breakpoints

**Why Choose Us Section Styling Enhancements**
- Maintain split layout structure (image left column, text right column) - no layout changes
- Enhance visual styling: improve typography hierarchy, add subtle decorative elements, refine spacing
- Implement scroll-triggered staggered text reveals (heading first, then paragraphs with delays)
- Match exact spacing from live site: section padding and internal spacing
- Add subtle background effects or overlays if appropriate while maintaining readability
- Use existing `.wrap-about` and `.heading-section` classes with enhanced styling
- Apply moderate animations that don't distract from content readability
- Ensure image background maintains proper aspect ratio and positioning

**Dedication Section Visual Improvements**
- Maintain existing dark overlay background with 4 dedication cards in grid layout
- Enhance card hover effects: lift animation, shadow enhancement, icon border color transitions
- Implement scroll-triggered staggered card reveals (staggered by 100ms between cards)
- Keep existing circular icon borders (`.services-2 .icon` style with 90px diameter, green border)
- Match exact spacing from live site: section padding and card spacing
- Enhance overlay treatment if needed while maintaining text readability
- Use existing `.services.services-2` class with enhanced hover states
- Ensure white text remains readable against dark background with overlay

**Spacing and Layout Matching**
- Reference live site HTML structure in `public_html/index.html` (lines 101-234) for exact spacing
- Use `.ftco-section` class with `padding: 6em 0` (96px top/bottom) for standard sections
- Apply `.ftco-no-pt` and `.ftco-no-pb` classes where live site has zero padding
- Match internal spacing: card padding, heading margins, section gaps
- Maintain responsive breakpoints matching live site behavior

**Animation Implementation**
- Use moderate animation level: staggered reveals and scroll-triggered animations
- Implement using CSS animations or consider Framer Motion/React Spring for scroll detection
- Follow existing `.ftco-animate` pattern with staggered delays (50-100ms increments)
- Use fadeIn, fadeInUp, or similar subtle entrance animations
- Ensure animations are performant using GPU-accelerated properties
- Add `will-change` property for animated elements to optimize rendering
- Respect user's `prefers-reduced-motion` setting for accessibility

**Theme Consistency**
- Follow existing theme from live site (https://blackeaglegroup.co.za/) for these sections only
- Use existing color scheme: Primary green (#59B200), accent gold (#C9A962), charcoal (#2D2D2D), cream (#F5F3EF)
- Maintain existing typography: Playfair Display for headings, Source Sans 3 for body text
- Use existing CSS variables from design system in `src/index.css`
- Ensure visual enhancements complement existing hero section (which is already okay)
- Do not modify footer styling (footer is fine as-is)

## Visual Design

No visual mockups provided. Reference the live site at https://blackeaglegroup.co.za/ for exact spacing, styling, and visual appearance.

## Existing Code to Leverage

**Live Site HTML Structure (`public_html/index.html` lines 101-234)**
- Contains exact structure and spacing for Services, Why Choose Us, and Dedication sections
- Reference for section padding, class names, and layout structure
- Use as blueprint for matching spacing and layout exactly

**Live Site CSS Styling (`public_html/css/style.css`)**
- `.services-section` (line 8884): Section background and overlay styles to reference
- `.services` (line 8896): Base service card styles with `transition: all 0.3s ease` - extend with hover effects
- `.services.services-2` (line 8930): Dedication section card styles with circular icon borders (90px, green border) - enhance with hover states
- `.ftco-section` (line 9049): Section padding `6em 0` (96px) - use for spacing matching
- `.heading-section` (line 9196): Heading styles with subheading formatting - maintain and enhance
- `.heading-section.heading-section-white` (line 9213): White text variant for dark backgrounds - use for Dedication section

**React Implementation (`BlackEagleGroup.React/src/pages/Home.jsx` lines 79-244)**
- Current React component structure for all three sections
- Existing Bootstrap/React Bootstrap classes and structure to maintain
- Component structure to enhance with additional CSS classes and animations

**Design System CSS Variables (`BlackEagleGroup.React/src/index.css`)**
- Color variables: `--color-primary`, `--color-accent`, `--color-charcoal`, `--color-cream`
- Spacing scale: `--space-xs` through `--space-2xl`
- Shadow variables: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-gold`
- Typography already imported: Playfair Display and Source Sans 3

**Animation Patterns (`public_html/js/main.js` and `BlackEagleGroup.React/src/index.css`)**
- Existing `.ftco-animate` class with staggered animation pattern (k * 50ms delay)
- FadeIn animation keyframes already defined in `src/index.css` (lines 712-721)
- Scroll-triggered animation pattern using waypoints or Intersection Observer
- Transition patterns for hover effects using `transform` and `opacity`

## Out of Scope

- Content changes: All existing text and content must remain exactly as-is
- Functional changes: No new functionality or interactive features beyond visual enhancements
- Footer modifications: Footer styling is fine and should not be changed
- Hero section changes: Hero section is already okay and should not be modified
- Layout structure changes: Must maintain existing layouts (4-column grid, split layout, etc.)
- Additional descriptive text: Service cards should not have additional text content
- Backend or API changes: These are static visual sections requiring no backend work
- New components: Enhance existing components rather than creating new ones
- Color scheme changes: Must use existing color palette, no new colors
- Typography changes: Must use existing Playfair Display + Source Sans 3 pairing

