# Task Breakdown: Services Page Redesign

## Overview
Total Tasks: 5 major task groups with 40+ sub-tasks

## Task List

### Data Migration Layer

#### Task Group 1: Migrate Services Data to JSON
**Dependencies:** None

- [x] 1.0 Complete data migration layer
  - [x] 1.1 Create services.json file structure
    - Create `BlackEagleGroup.React/src/data/services.json` file
    - Define JSON structure with `services` array and `serviceCategories` object
    - Follow events.json structure pattern for consistency
    - Include all required fields: id, category, title, description, image
    - Include optional fields: subtitle, featured, order, icon, color
  - [x] 1.2 Migrate all 17 services from services.js to services.json
    - Map Security Services: Security Services, VIP Protection, Computer Forensics (category: "security")
    - Map Property Services: Building Renovation (category: "property")
    - Map Business Services: All remaining 13 services (category: "business")
    - Preserve all existing service data (id, title, description, image)
    - Assign appropriate category to each service
    - Set order field for custom ordering within categories
  - [x] 1.3 Define serviceCategories object in services.json
    - Add "security" category with name, color (visually distinct from brand palette), optional description
    - Add "property" category with name, color (visually distinct from brand palette), optional description
    - Add "business" category with name, color (visually distinct from brand palette), optional description
    - Ensure category colors visually make sense with brand palette (#59B200, #C9A962, #2D2D2D, #F5F3EF)
  - [x] 1.4 Create serviceData.js utility file
    - Create `BlackEagleGroup.React/src/utils/serviceData.js` following eventData.js pattern
    - Implement `loadServiceData()` function to load services.json
    - Implement `getAllServices()` function to return all services
    - Implement `getServicesByCategory(category)` function to filter by category
    - Implement `getServiceById(id)` function to get single service
    - Implement `getServiceCategories()` function to return category metadata
    - Use async/await pattern matching eventData.js
    - Include error handling and fallback data structures
  - [x] 1.5 Verify JSON structure and data loading
    - Validate services.json syntax and structure
    - Test serviceData.js functions load data correctly
    - Verify all 17 services are accessible
    - Verify category filtering works correctly
    - Check browser console for any errors or warnings

**Acceptance Criteria:**
- services.json file created with valid structure
- All 17 services migrated with correct categories
- serviceCategories object defined with distinct colors
- serviceData.js utility functions work correctly
- All services accessible via utility functions
- No console errors when loading data

### Component Enhancement Layer

#### Task Group 2: Enhance ServiceCard Component
**Dependencies:** Task Group 1

- [x] 2.0 Complete ServiceCard enhancements
  - [x] 2.1 Extend ServiceCard component API
    - Add optional `category` prop to accept category string ("security", "property", "business")
    - Add optional `featured` prop to support featured service variant
    - Add optional `categoryColor` prop for category-specific color accents
    - Maintain backward compatibility with existing props (image, title, description, className)
  - [x] 2.2 Enhance ServiceCard visual design with premium styling
    - Improve typography hierarchy (distinctive display font for title, refined body font)
    - Refine spacing and padding for premium feel
    - Enhance card shadows and borders for depth
    - Apply premium color treatments while maintaining brand consistency
  - [x] 2.3 Add category color accent support
    - Apply category color to card accents (borders, decorative elements, hover states)
    - Use categoryColor prop when provided, fallback to default styling
    - Ensure color contrast meets WCAG 2.1 AA standards
    - Add subtle category color hints without overwhelming design
  - [x] 2.4 Implement featured service variant
    - Create larger card size variant when `featured` prop is true
    - Enhance visual treatment for featured services (larger image, prominent typography)
    - Maintain responsive behavior for featured cards
    - Ensure featured cards work in dynamic layouts
  - [x] 2.5 Preserve existing hover parallax effect
    - Maintain existing mouse-following parallax effect on image
    - Enhance hover effect with category color accents
    - Ensure smooth transitions and animations
    - Respect prefers-reduced-motion setting
  - [x] 2.6 Test ServiceCard enhancements
    - Verify component accepts new props without breaking existing usage
    - Test category color accents apply correctly
    - Test featured variant displays larger cards appropriately
    - Verify hover effects work smoothly
    - Test keyboard accessibility and focus states

**Acceptance Criteria:**
- ServiceCard supports category and featured props
- Premium visual design enhancements applied
- Category color accents work correctly
- Featured service variant displays larger cards
- Existing hover parallax effect preserved
- Component maintains backward compatibility
- All interactions are keyboard accessible

### Page Redesign Layer

#### Task Group 3: Redesign Services.jsx Page
**Dependencies:** Task Groups 1, 2

- [x] 3.0 Complete Services page redesign
  - [x] 3.1 Update Services.jsx to use serviceData.js
    - Replace `import { services } from '@/data/services'` with serviceData.js imports
    - Add useState hooks for services data and loading state
    - Add useEffect to load services using `getAllServices()` from serviceData.js
    - Group services by category using `getServicesByCategory()` function
    - Handle loading and error states appropriately
  - [x] 3.2 Implement category section structure
    - Create category section components for each category (Security, Property, Business)
    - Display category section headers with category name and styling
    - Apply category-specific colors to section headers from serviceCategories
    - Add category descriptions if available in serviceCategories
    - Maintain clear visual separation between categories
  - [x] 3.3 Implement dynamic layout system
    - Create layout component supporting masonry grid, featured services, and asymmetric layouts
    - Use featured services (featured: true) to display with larger, more prominent cards
    - Support varying card sizes within categories to break monotony
    - Implement responsive grid that adapts to screen sizes (mobile, tablet, desktop)
    - Ensure layout works seamlessly with category grouping
  - [x] 3.4 Implement scroll-triggered staggered animations
    - Import framer-motion (useScroll, useTransform) following About page pattern
    - Create section refs for scroll tracking using useRef
    - Implement scroll progress offsets for smooth animations (0.05, 0.1, 0.15 increments)
    - Apply staggered reveal animations to service cards (50-100ms delays between cards)
    - Animate category section headers with fade-in and slide-up effects
    - Respect prefers-reduced-motion setting for accessibility
  - [x] 3.5 Update Services page structure
    - Keep existing Hero component usage (no changes needed)
    - Replace existing services section with new category-based sections
    - Maintain SEO component with updated description if needed
    - Ensure page structure follows premium/luxury aesthetic
  - [x] 3.6 Test Services page functionality
    - Verify services load correctly from JSON
    - Test category grouping displays correctly
    - Verify dynamic layout adapts to different screen sizes
    - Test scroll animations trigger correctly
    - Verify all 17 services display in correct categories
    - Check browser console for errors

**Acceptance Criteria:**
- Services page loads data from services.json via serviceData.js
- Services grouped correctly by category with section headers
- Dynamic layout displays featured services prominently
- Scroll-triggered animations work smoothly
- All 17 services display correctly
- Page maintains premium/luxury aesthetic
- No console errors

### Styling & Design Layer

#### Task Group 4: Typography, Colors, and Visual Effects
**Dependencies:** Task Groups 2, 3

- [x] 4.0 Complete styling and design enhancements
  - [x] 4.1 Implement distinctive typography system
    - Select distinctive display font for Services page headings (avoid Inter, Roboto, Arial, system fonts)
    - Pair display font with refined body font for optimal readability
    - Apply typography to category section headers and service card titles
    - Ensure typography choices differentiate Services page from About page
    - Maintain brand consistency while creating memorable typographic identity
  - [x] 4.2 Implement category color coding system
    - Apply category colors from serviceCategories to section headers
    - Use category colors for decorative elements and card accents
    - Ensure colors visually make sense with brand palette
    - Verify color contrast meets WCAG 2.1 AA accessibility standards
    - Test color combinations for visual harmony
  - [x] 4.3 Add background effects and decorative elements
    - Create subtle patterns or decorative elements for depth
    - Apply background effects that complement premium/luxury aesthetic
    - Use decorative elements strategically to enhance category sections
    - Ensure effects don't interfere with readability or accessibility
    - Maintain consistent visual language with About page while adding uniqueness
  - [x] 4.4 Enhance premium/luxury aesthetic styling
    - Apply sophisticated, elegant styling throughout page
    - Refine spacing, shadows, and borders for premium feel
    - Ensure visual cohesion with existing brand identity
    - Maintain high-end corporate excellence feel
    - Match About page aesthetic while introducing Services page character
  - [x] 4.5 Implement responsive design
    - Ensure dynamic layouts adapt gracefully to mobile (320px-768px)
    - Optimize for tablet (768px-1024px) with appropriate card sizing
    - Ensure desktop (1024px+) displays full dynamic layout capabilities
    - Maintain touch-friendly interactions and spacing on mobile
    - Test all breakpoints for proper layout behavior
  - [x] 4.6 Ensure accessibility compliance
    - Implement proper keyboard navigation for all interactive elements
    - Add focus states for service cards and category sections
    - Ensure proper ARIA labels and semantic HTML
    - Test with screen readers for proper announcements
    - Verify WCAG 2.1 AA compliance matching About page standards
  - [x] 4.7 Test styling and design
    - Verify typography displays correctly across browsers
    - Test category colors apply consistently
    - Verify background effects don't interfere with content
    - Test responsive design on multiple devices/screen sizes
    - Verify accessibility features work correctly

**Acceptance Criteria:**
- Distinctive typography system implemented and differentiates Services page
- Category colors applied consistently and meet accessibility standards
- Background effects enhance design without overwhelming content
- Premium/luxury aesthetic matches About page quality
- Responsive design works on all screen sizes
- Accessibility compliance verified (WCAG 2.1 AA)

### Testing & Verification Layer

#### Task Group 5: Testing and Final Verification
**Dependencies:** Task Groups 1-4

- [x] 5.0 Complete testing and verification
  - [x] 5.1 Test data loading and JSON structure
    - Verify all 17 services load correctly from services.json
    - Verify category filtering works for all three categories
    - Test serviceData.js utility functions handle errors gracefully
    - Verify JSON structure matches specification requirements
    - Check for any data inconsistencies or missing fields
  - [x] 5.2 Test ServiceCard component enhancements
    - Verify ServiceCard accepts new props without breaking existing usage
    - Test category color accents display correctly
    - Verify featured service variant shows larger cards
    - Test hover parallax effect works smoothly
    - Verify component maintains backward compatibility
  - [x] 5.3 Test Services page functionality
    - Verify all 17 services display in correct categories
    - Test dynamic layout adapts to different screen sizes
    - Verify scroll animations trigger correctly and smoothly
    - Test category section headers display with correct colors
    - Verify featured services display prominently
  - [x] 5.4 Test responsive design
    - Test mobile layout (320px-768px) for proper card stacking
    - Test tablet layout (768px-1024px) for appropriate grid behavior
    - Test desktop layout (1024px+) for full dynamic layout features
    - Verify touch interactions work on mobile devices
    - Test all breakpoints for proper responsive behavior
  - [x] 5.5 Test accessibility
    - Verify keyboard navigation works for all interactive elements
    - Test screen reader announcements for service cards and categories
    - Verify focus states are visible and properly styled
    - Test color contrast meets WCAG 2.1 AA standards
    - Verify prefers-reduced-motion setting is respected
  - [x] 5.6 Cross-browser testing
    - Test in Chrome (latest 2 versions)
    - Test in Firefox (latest 2 versions)
    - Test in Safari (latest 2 versions)
    - Test in Edge (latest 2 versions)
    - Verify consistent behavior across browsers
  - [x] 5.7 Final verification
    - Verify page matches premium/luxury aesthetic requirements
    - Confirm distinctive typography differentiates Services page
    - Verify category color coding is visually distinct and makes sense
    - Confirm background effects enhance design appropriately
    - Verify all acceptance criteria from previous task groups are met
    - Check browser console for any errors or warnings

**Acceptance Criteria:**
- All data loads correctly from services.json
- ServiceCard enhancements work as specified
- Services page displays all services in correct categories
- Dynamic layout works responsively on all screen sizes
- Scroll animations work smoothly
- Accessibility compliance verified (WCAG 2.1 AA)
- Cross-browser compatibility confirmed
- Premium/luxury aesthetic matches requirements
- No console errors or warnings

## Execution Order

Recommended implementation sequence:
1. Data Migration Layer (Task Group 1) - Foundation for all other work
2. Component Enhancement Layer (Task Group 2) - Enhance ServiceCard before using in page
3. Page Redesign Layer (Task Group 3) - Build new page structure using enhanced components
4. Styling & Design Layer (Task Group 4) - Apply visual design and styling
5. Testing & Verification Layer (Task Group 5) - Final testing and verification

## Notes

- All tasks should maintain backward compatibility where possible
- Follow existing code patterns from eventData.js, About.jsx, and PropertyServices.jsx
- Ensure premium/luxury aesthetic matches About page quality
- Category colors should visually make sense with brand palette
- Typography should differentiate Services page while maintaining brand consistency
- All animations should respect prefers-reduced-motion setting
