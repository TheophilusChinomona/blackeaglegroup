# Spec Requirements: Services Page Redesign

## Initial Description
Redesign `BlackEagleGroup.React/src/pages/Services.jsx` page using the frontend-design skill from `.claude/skills/frontend-design/SKILL.md`.

The frontend-design skill emphasizes:
- Creating distinctive, production-grade frontend interfaces
- Avoiding generic "AI slop" aesthetics
- Bold aesthetic direction with intentionality
- Exceptional attention to aesthetic details and creative choices
- Focus on typography, color & theme, motion, spatial composition, and visual details

## Requirements Discussion

### First Round Questions

**Q1:** Aesthetic Direction - I see the About page uses a premium/luxury aesthetic with scroll animations. Should the Services page follow the same premium/luxury aesthetic to maintain consistency, or would you prefer a different distinctive aesthetic?
**Answer:** Follow About page aesthetic

**Q2:** Layout Approach - Currently, services are displayed in a simple 3-column grid. Should we keep the uniform grid, or explore a more dynamic layout?
**Answer:** Explore a more dynamic layout (masonry grid, featured services with larger cards, asymmetric layout with varying card sizes) for visual interest

**Q3:** Service Card Presentation - Should we enhance the ServiceCard with more sophisticated interactions, or keep the card structure simple but elevate the visual design?
**Answer:** Category grouping would be great and also want the services to work the same way the events do where it can pull information from a .json file

**Q4:** Typography & Visual Hierarchy - Should we use the same typography system as the About page, or introduce distinctive typography choices?
**Answer:** Introduce distinctive typography choices that differentiate the Services page

**Q5:** Color & Theme - Should we introduce service category color coding or maintain a unified color palette?
**Answer:** Introduce service category color coding

**Q6:** Animation & Motion - Should we implement staggered reveals for service cards as they scroll into view (similar to About page), or focus on hover interactions?
**Answer:** Similar to About page (staggered reveals)

**Q7:** Service Grouping/Categorization - With 17 services, should we group them by category with section headers, or present them all in a unified grid/list?
**Answer:** Group them by category (e.g., Security Services, Property Services, Business Services) with section headers

**Q8:** Visual Details & Atmosphere - Should we add background effects to create depth, or keep the background clean?
**Answer:** Add background effects (subtle patterns, decorative elements) to create depth

### Existing Code to Reference

**Similar Features Identified:**
- Feature: Events Page - Path: `BlackEagleGroup.React/src/pages/GolfEvents.jsx`
  - Components to potentially reuse: EventCard component, eventData.js utilities for JSON loading
  - Backend logic to reference: `BlackEagleGroup.React/src/utils/eventData.js` - pattern for loading from JSON, filtering by type
  - JSON structure: `BlackEagleGroup.React/src/data/events.json` - structure with type, title, description, etc.

- Feature: About Page - Path: `BlackEagleGroup.React/src/pages/About.jsx`
  - Components to potentially reuse: AnimatedElement, scroll-triggered animations with framer-motion
  - Animation patterns: Scroll progress-based animations with useScroll and useTransform from framer-motion
  - Layout patterns: Split layout sections, dark background sections with overlays

- Feature: Property Services Page - Path: `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
  - Components to potentially reuse: ServiceCard component, similar section structure
  - Layout patterns: Service cards in grid, dark sections with overlays

### Follow-up Questions

**Follow-up 1:** Service Categories - You mentioned grouping by "Security Services, Property Services, Business Services". Looking at the 17 services, I need to clarify the exact categorization. Should the categories be:
- Security Services (Security Services, VIP Protection, Computer Forensics)
- Property Services (Building Renovation, and any others?)
- Business Services (all others: Hygiene and Cleaning, Marketing Management, Fleet Management, Skills Development, etc.)
Or do you have a different categorization in mind? Also, should each category have its own distinct color from the brand palette?
**Answer:** The categorization suggested is okay. Each category should have distinct colors that visually make sense.

**Follow-up 2:** JSON Structure - For the services.json file, should it follow a similar structure to events.json with:
- A `services` array containing all service objects
- A `serviceCategories` object defining category metadata (name, color, description)
- Each service object having: `id`, `category`, `title`, `description`, `image`, and potentially additional fields?
Or do you prefer a different structure?
**Answer:** User asked what additional fields would be needed.

**Additional Fields Recommendation:**
Based on the events.json structure and dynamic layout requirements, suggested additional fields for services.json:
- `subtitle` (optional) - Short tagline or additional descriptive text for featured services
- `featured` (optional, boolean) - Mark services to display with larger cards in dynamic layout
- `order` (optional, number) - Custom ordering within category (defaults to array order)
- `icon` (optional, string) - Icon name or path for category/service icons
- `color` (optional, string) - Service-specific color override (defaults to category color)

**Minimum Required Fields:**
- `id` (string/number) - Unique identifier
- `category` (string) - "security", "property", or "business"
- `title` (string) - Service name
- `description` (string) - Service description
- `image` (string) - Image path/URL

**serviceCategories Object Structure:**
- `security`, `property`, `business` objects each containing:
  - `name` (string) - Display name
  - `color` (string) - Category color (hex code)
  - `description` (string, optional) - Category description
  - `icon` (string, optional) - Category icon

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
N/A - No visual files found.

## Requirements Summary

### Functional Requirements
- Redesign Services page with premium/luxury aesthetic matching About page
- Implement dynamic layout (masonry grid, featured services, asymmetric layout with varying card sizes)
- Group services by category (Security Services, Property Services, Business Services) with section headers
- Migrate services data from services.js to services.json file
- Create serviceData.js utility (similar to eventData.js) to load and filter services from JSON
- Implement scroll-triggered staggered animations similar to About page
- Add service category color coding
- Introduce distinctive typography choices that differentiate Services page
- Add background effects (subtle patterns, decorative elements) to create depth
- Maintain existing ServiceCard component but enhance visual design

### Reusability Opportunities
- Reuse EventCard/ServiceCard component patterns
- Reuse eventData.js pattern for serviceData.js utility
- Reuse About page animation patterns (framer-motion scroll animations)
- Reuse Property Services page section structure patterns
- Reuse Hero component (already in use)

### Scope Boundaries
**In Scope:**
- Services page redesign with premium/luxury aesthetic
- Dynamic layout implementation (masonry/asymmetric grid)
- Service categorization with section headers
- JSON-based service data loading (similar to events)
- Scroll-triggered animations
- Category color coding
- Distinctive typography
- Background effects and decorative elements
- Enhanced ServiceCard visual design

**Out of Scope:**
- Individual service detail pages (future enhancement)
- Service search/filter functionality (not mentioned)
- Service contact forms per service (not mentioned)
- Backend API integration (using JSON file like events)

### Technical Considerations
- Use framer-motion for scroll-triggered animations (already in use on About page)
- Create services.json file in `BlackEagleGroup.React/src/data/` directory
- Create serviceData.js utility in `BlackEagleGroup.React/src/utils/` directory
- Follow eventData.js pattern for consistency
- Maintain existing ServiceCard component API (image, title, description)
- Use existing brand colors with category-specific variations that visually make sense
- Ensure responsive design for dynamic layouts
- Accessibility: Maintain WCAG 2.1 AA compliance like About page

### Service Categorization
**Security Services:**
- Security Services
- VIP Protection
- Computer Forensics

**Property Services:**
- Building Renovation

**Business Services:**
- Hygiene and Cleaning Services
- Marketing Management
- State Vehicle Purchases
- Fleet Management
- Skills Development and Training
- Remuneration for EPWP Management
- THM Accounting Services
- Public Relations (PR)
- Customer Service Management
- Spa Treatment
- Events Management Services
- Stakeholders Relations Management
- Tshwane Open Event Management

### JSON Structure
**services.json Structure:**
```json
{
  "services": [
    {
      "id": 1,
      "category": "business",
      "title": "Service Name",
      "description": "Service description",
      "image": "/images/image_16.jpg",
      "subtitle": "Optional tagline",
      "featured": false,
      "order": 1,
      "icon": "optional-icon-name",
      "color": "optional-color-override"
    }
  ],
  "serviceCategories": {
    "security": {
      "name": "Security Services",
      "color": "#[color-hex]",
      "description": "Optional category description",
      "icon": "optional-icon"
    },
    "property": {
      "name": "Property Services",
      "color": "#[color-hex]",
      "description": "Optional category description",
      "icon": "optional-icon"
    },
    "business": {
      "name": "Business Services",
      "color": "#[color-hex]",
      "description": "Optional category description",
      "icon": "optional-icon"
    }
  }
}
```
