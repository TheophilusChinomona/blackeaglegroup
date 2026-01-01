# Specification: Services Page Redesign

## Goal

Redesign the Services page with a premium/luxury aesthetic matching the About page, implementing dynamic layouts, category grouping, JSON-based data loading, and distinctive typography to create a visually striking and memorable service showcase.

## User Stories

- As a visitor, I want to see services organized by category (Security, Property, Business) so that I can quickly find services relevant to my needs
- As a visitor, I want to experience smooth scroll animations and dynamic layouts so that the page feels premium and engaging
- As a visitor, I want to see services with category-specific color coding so that I can visually distinguish between different service types

## Specific Requirements

**Premium/Luxury Aesthetic Design**
- Match the About page's premium/luxury aesthetic with sophisticated, elegant styling
- Use refined typography choices that differentiate Services page while maintaining brand consistency
- Apply subtle background effects (patterns, decorative elements) to create depth and atmosphere
- Ensure visual cohesion with existing brand identity while introducing distinctive Services page character
- Maintain high-end corporate excellence feel throughout all sections

**Dynamic Layout Implementation**
- Implement dynamic layout system supporting masonry grid, featured services with larger cards, and asymmetric layouts with varying card sizes
- Use featured services (marked with `featured: true` in JSON) to display with larger, more prominent cards
- Create responsive grid that adapts to different screen sizes while maintaining visual interest
- Support varying card sizes within categories to break monotony and create visual hierarchy
- Ensure layout works seamlessly with category grouping and section headers

**Service Categorization System**
- Group services into three categories: Security Services (3 services), Property Services (1 service), Business Services (13 services)
- Display category section headers with distinct styling and category-specific colors
- Each category should have visually distinct color from brand palette that makes sense aesthetically
- Maintain clear visual separation between categories while preserving overall page cohesion
- Support custom ordering within categories using `order` field in JSON data

**JSON-Based Data Loading**
- Migrate services data from `services.js` to `services.json` file following events.json structure pattern
- Create `serviceData.js` utility in `BlackEagleGroup.React/src/utils/` directory following `eventData.js` pattern
- Implement functions: `loadServiceData()`, `getAllServices()`, `getServicesByCategory()`, `getServiceById()`
- Include `serviceCategories` object in JSON defining category metadata (name, color, description, icon)
- Support optional fields: `subtitle`, `featured`, `order`, `icon`, `color` for enhanced functionality

**Scroll-Triggered Staggered Animations**
- Implement scroll-triggered animations using framer-motion's `useScroll` and `useTransform` hooks (similar to About page)
- Apply staggered reveal animations to service cards as they scroll into view (50-100ms delays between cards)
- Use scroll progress offsets for smooth, coordinated animations across section elements
- Respect `prefers-reduced-motion` setting for accessibility compliance
- Animate category section headers with fade-in and slide-up effects

**Category Color Coding System**
- Assign distinct colors to each category (Security, Property, Business) that visually make sense with brand palette
- Apply category colors to section headers, decorative elements, and card accents
- Use category colors consistently throughout each category section
- Ensure color contrast meets WCAG 2.1 AA accessibility standards
- Allow service-specific color overrides via `color` field in JSON when needed

**Enhanced ServiceCard Visual Design**
- Maintain existing ServiceCard component API (image, title, description props) for backward compatibility
- Enhance visual design with premium styling, improved typography, and refined spacing
- Apply category-specific color accents to cards based on service category
- Support featured service variant with larger card size and enhanced visual treatment
- Preserve existing hover parallax effect while adding category color accents

**Background Effects and Decorative Elements**
- Add subtle patterns or decorative elements to create depth and visual interest
- Apply background effects that complement premium/luxury aesthetic without overwhelming content
- Use decorative elements strategically to enhance category sections and page sections
- Ensure background effects are subtle and don't interfere with readability or accessibility
- Maintain consistent visual language with About page while adding Services page uniqueness

**Distinctive Typography System**
- Introduce typography choices that differentiate Services page from About page
- Select distinctive display font for headings that elevates Services page aesthetics
- Pair display font with refined body font for optimal readability and visual hierarchy
- Ensure typography choices avoid generic fonts (Inter, Roboto, Arial, system fonts)
- Maintain brand consistency while creating memorable typographic identity for Services page

**Responsive Design and Accessibility**
- Ensure dynamic layouts adapt gracefully to all screen sizes (mobile, tablet, desktop)
- Maintain touch-friendly interactions and spacing on mobile devices
- Implement proper keyboard navigation and focus states for all interactive elements
- Maintain WCAG 2.1 AA compliance matching About page accessibility standards
- Test with screen readers and ensure proper ARIA labels and semantic HTML

## Visual Design

No visual assets provided.

## Existing Code to Leverage

**ServiceCard Component (`BlackEagleGroup.React/src/components/ServiceCard.jsx`)**
- Reuse existing ServiceCard component with image, title, description props
- Enhance visual design while maintaining component API for backward compatibility
- Preserve existing hover parallax effect and accessibility features
- Extend component to support category color accents and featured service variants

**Event Data Utilities (`BlackEagleGroup.React/src/utils/eventData.js`)**
- Follow eventData.js pattern for creating serviceData.js utility
- Reuse async/await pattern, error handling approach, and data loading structure
- Implement similar functions: `loadServiceData()`, `getAllServices()`, `getServicesByCategory()`
- Maintain consistency with existing event data loading patterns

**About Page Animation Patterns (`BlackEagleGroup.React/src/pages/About.jsx`)**
- Reuse framer-motion scroll animation patterns using `useScroll` and `useTransform` hooks
- Follow scroll progress offset approach for staggered animations (0.05, 0.1, 0.15 increments)
- Apply similar animation timing and easing for cohesive user experience
- Respect `prefers-reduced-motion` setting like About page implementation

**Property Services Page Structure (`BlackEagleGroup.React/src/pages/PropertyServices.jsx`)**
- Reference AnimatedServiceCard wrapper pattern for scroll-triggered card animations
- Follow section structure patterns with Container, Row, Col from react-bootstrap
- Reuse dark background section patterns with overlay gradients if needed
- Apply similar spacing and layout approaches for consistency

**Hero Component (`BlackEagleGroup.React/src/components/Hero.jsx`)**
- Continue using existing Hero component for Services page header
- Maintain breadcrumb navigation and title display
- Preserve existing hero styling and functionality

## Out of Scope

- Individual service detail pages or service-specific landing pages
- Service search or filter functionality (keyword search, category filtering)
- Service contact forms per individual service
- Backend API integration (using JSON file like events, not API endpoints)
- Service booking or appointment scheduling functionality
- Service pricing or quote request features
- Service testimonials or case studies sections
- Service comparison or recommendation features
- Changes to other pages beyond Services.jsx
- Service category icons or icon libraries (unless specified in JSON)
