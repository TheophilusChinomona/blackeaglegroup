# Spec Requirements: Clients Page Redesign

## Initial Description
Redesign `BlackEagleGroup.React/src/pages/Clients.jsx` page using the frontend-design skill from `.claude/skills/frontend-design/SKILL.md`.

The frontend-design skill emphasizes:
- Creating distinctive, production-grade frontend interfaces
- Avoiding generic "AI slop" aesthetics
- Bold aesthetic direction with intentionality
- Exceptional attention to aesthetic details and creative choices
- Focus on typography, color & theme, motion, spatial composition, and visual details

## Requirements Discussion

### First Round Questions

**Q1:** Aesthetic Direction - The About page uses a premium/luxury aesthetic, and the Services page has distinctive typography with category color coding. Should the Clients page follow the same premium/luxury aesthetic to maintain consistency, or would you prefer a different distinctive aesthetic direction? (e.g., editorial/magazine style, corporate showcase, testimonial-focused, portfolio gallery)
**Answer:** Corporate showcase

**Q2:** Layout Approach - Currently, clients are displayed in a simple 4-column grid. Should we keep a uniform grid, or explore a more dynamic layout? Options include:
- Masonry grid with varying card sizes
- Asymmetric layout with featured clients larger
- Carousel/slider presentation
- Timeline or chronological layout
- Interactive grid with hover reveals
**Answer:** Interactive grid with hover reveals

**Q3:** Client Card Presentation - The current ClientCard shows image, name, location, and action buttons (Reference, Call). Should we:
- Enhance the card with more sophisticated interactions and hover effects?
- Add client testimonials or quotes?
- Include client logos more prominently?
- Add filtering or grouping capabilities (by industry, location, etc.)?
**Answer:** More prominent logos, More sophisticated interactions/hover effects

**Q4:** Typography & Visual Hierarchy - Should we use the same typography system as other pages (Playfair Display + Source Sans 3), or introduce distinctive typography choices that differentiate the Clients page? The frontend-design skill emphasizes avoiding generic fonts and choosing distinctive, characterful typefaces.
**Answer:** Use the existing system (Playfair Display + Source Sans 3)

**Q5:** Color & Theme - Should we:
- Maintain the unified brand color palette?
- Introduce client category/industry color coding?
- Use a different color scheme that complements the brand but creates visual distinction?
- Apply color accents based on client types (corporate, government, international)?
**Answer:** Client category/industry color coding, Different complementary scheme

**Q6:** Animation & Motion - Should we implement:
- Staggered reveals for client cards as they scroll into view (similar to About/Services pages)?
- Hover interactions with parallax or 3D effects?
- Page load animations with coordinated reveals?
- Interactive filtering animations?
**Answer:** Staggered reveals on scroll (like About/Services), Hover interactions (parallax/3D)

**Q7:** Client Grouping/Organization - With 15 clients, should we:
- Present them all in a unified grid/list?
- Group them by category (e.g., Corporate, Government, International) with section headers?
- Group by industry or service type?
- Create featured clients section with others in a secondary section?
**Answer:** Group by industry/service type, Create a featured clients section

**Q8:** Visual Details & Atmosphere - Should we add:
- Background effects (subtle patterns, decorative elements, textures)?
- Client logo showcase section?
- Testimonial quotes or case study highlights?
- Interactive elements (filtering, search, sorting)?
- Dark/light section alternation for visual rhythm?
**Answer:** Interactive elements (filtering, search, sorting), Dark/light section alternation, Client logo showcase section

**Q9:** Data Structure - Currently, clients are in `@/data/clients.js`. Should we:
- Keep the current JavaScript data structure?
- Migrate to JSON format (similar to events.json and services.json) for consistency?
- Add additional fields (testimonials, case studies, industry categories, featured status)?
**Answer:** [Awaiting response]

**Q10:** Hero Section - The current hero uses a generic background image. Should we:
- Keep the existing hero structure?
- Customize with clients-specific imagery or messaging?
- Add client count or statistics?
- Create a more distinctive hero design?
**Answer:** [Awaiting response]

### Existing Code to Reference

**Similar Features Identified:**
- Feature: Services Page - Path: `BlackEagleGroup.React/src/pages/Services.jsx`
  - Components to potentially reuse: Scroll-triggered animations with framer-motion, category grouping patterns
  - Animation patterns: Staggered card reveals with scroll progress offsets
  - Layout patterns: Dynamic grid layouts, category sections

- Feature: About Page - Path: `BlackEagleGroup.React/src/pages/About.jsx`
  - Components to potentially reuse: AnimatedElement, scroll-triggered animations with framer-motion
  - Animation patterns: Scroll progress-based animations with useScroll and useTransform
  - Layout patterns: Split layout sections, dark background sections with overlays

- Feature: Events Page - Path: `BlackEagleGroup.React/src/pages/GolfEvents.jsx`
  - Components to potentially reuse: EventCard component patterns, JSON data loading utilities
  - Backend logic to reference: `BlackEagleGroup.React/src/utils/eventData.js` - pattern for loading from JSON
  - JSON structure: `BlackEagleGroup.React/src/data/events.json` - structure with type, title, description, etc.

- Component: ClientCard - Path: `BlackEagleGroup.React/src/components/ClientCard.jsx`
  - Current API: image, name, location, referenceLink, phoneNumber
  - Uses shadcn/ui Card component
  - Has Reference and Call action buttons

### Follow-up Questions

**Follow-up 1:** Industry Categories - You mentioned grouping by "industry/service type". Looking at the 15 clients, I can identify several potential industry categories:
- **Government/Public Sector**: Tourism, Correctional Services, Mineral Resources, International Relations, Tshwane Open (Municipality), CSIR
- **Corporate/Private Sector**: Eskom, Momentum, VW, Volvo Motors, BestMed, Amscor, H3C Technologies, Threeframs, ScoreCapture, Respondnow
- **International**: Sun
- **Technology/IT**: H3C Technologies, ScoreCapture, Respondnow
- **Automotive**: VW, Volvo Motors
- **Medical/Healthcare**: BestMed
- **Research**: CSIR

Should we use these categories, or do you prefer a different grouping? Also, should each industry category have its own distinct color from a complementary color scheme?
**Answer:** Use web tools to search for each company and get details needed. Each industry category should have its own distinct color from a complementary color scheme.

**Follow-up 2:** Featured Clients - You mentioned creating a "featured clients section". Which clients should be featured? Should we feature:
- Large/well-known clients (Eskom, VW, Momentum, CSIR)?
- Government clients (to showcase public sector work)?
- A mix based on importance or relationship?
- Or should we add a `featured: true` field to the data and let you specify?
**Answer:** Add a `featured: true` field to the data structure

**Follow-up 3:** JSON Structure - For the clients.json file, should it follow a similar structure to events.json and services.json with:
- A `clients` array containing all client objects
- A `clientIndustries` or `clientCategories` object defining industry metadata (name, color, description)
- Each client object having: `id`, `name`, `location`, `image`, `referenceLink`, `phoneNumber`, `industry`, `featured` (boolean), and potentially additional fields?
**Answer:** Yes, migrate to JSON format. Additional field will be the phone number as well (already included in minimum required fields).

**Additional Fields Recommendation:**
Based on the requirements, suggested additional fields for clients.json:
- `industry` (required) - Industry category (e.g., "government", "corporate", "technology", "automotive", "medical", "research", "international")
- `featured` (optional, boolean) - Mark clients to display in featured section
- `logo` (optional, string) - Dedicated logo image path (separate from background image)
- `order` (optional, number) - Custom ordering within industry (defaults to array order)
- `description` (optional, string) - Client description or tagline
- `website` (optional, string) - Client website URL

**Minimum Required Fields:**
- `id` (string/number) - Unique identifier
- `name` (string) - Client name
- `industry` (string) - Industry category
- `image` (string) - Image path/URL (background image for card)
- `location` (string) - Client location
- `referenceLink` (string) - Reference contact link (email or URL)
- `phoneNumber` (string) - Phone number

**clientIndustries Object Structure:**
- Each industry object (e.g., "government", "corporate", "technology") containing:
  - `name` (string) - Display name
  - `color` (string) - Industry color (hex code from complementary scheme)
  - `description` (string, optional) - Industry description
  - `icon` (string, optional) - Industry icon

**Follow-up 4:** Hero Section - Should the hero section:
- Keep the existing hero structure but customize with clients-specific messaging?
- Add client count or statistics (e.g., "Trusted by 15+ clients", "Serving 5+ industries")?
- Use a different background image that better represents corporate showcase?
- Include a tagline or value proposition specific to the clients page?
**Answer:** Add client count/statistics (e.g., "Trusted by 15+ clients", "Serving 5+ industries"), Use a different background image for the corporate showcase, Include a clients-specific tagline or value proposition

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
N/A - No visual files found.

## Requirements Summary

### Functional Requirements
- Redesign Clients page with corporate showcase aesthetic
- Implement interactive grid with hover reveals showing additional client information
- Display client logos prominently with sophisticated hover interactions (parallax/3D effects)
- Group clients by industry/service type with section headers
- Create featured clients section highlighting key partnerships
- Migrate clients data from clients.js to clients.json file
- Create clientData.js utility (similar to eventData.js) to load and filter clients from JSON
- Implement scroll-triggered staggered animations similar to About/Services pages
- Add client industry color coding with complementary color scheme
- Add interactive elements: filtering, search, and sorting capabilities
- Implement dark/light section alternation for visual rhythm
- Create dedicated client logo showcase section
- Customize hero section with client count/statistics, corporate showcase background image, and clients-specific tagline
- Maintain existing typography system (Playfair Display + Source Sans 3)

### Reusability Opportunities
- Reuse ClientCard component patterns (enhance with new features)
- Reuse eventData.js pattern for clientData.js utility
- Reuse About page animation patterns (framer-motion scroll animations)
- Reuse Services page filtering/search patterns
- Reuse Hero component (customize for clients page)

### Scope Boundaries
**In Scope:**
- Clients page redesign with corporate showcase aesthetic
- Interactive grid with hover reveals
- Industry-based grouping with color coding
- Featured clients section
- JSON-based client data loading (similar to events/services)
- Scroll-triggered animations with staggered reveals
- Hover interactions (parallax/3D effects)
- Interactive filtering, search, and sorting
- Dark/light section alternation
- Client logo showcase section
- Enhanced hero section with statistics and tagline
- Enhanced ClientCard component with prominent logos and sophisticated interactions

**Out of Scope:**
- Individual client detail pages (future enhancement)
- Client testimonials or case studies (not mentioned in requirements)
- Client contact forms per client (not mentioned)
- Backend API integration (using JSON file like events/services)
- Client relationship management features

### Technical Considerations
- Use framer-motion for scroll-triggered animations (already in use on About/Services pages)
- Create clients.json file in `BlackEagleGroup.React/src/data/` directory
- Create clientData.js utility in `BlackEagleGroup.React/src/utils/` directory
- Follow eventData.js and serviceData.js patterns for consistency
- Enhance existing ClientCard component while maintaining backward compatibility
- Use complementary color scheme for industry categories (distinct from brand palette)
- Ensure responsive design for interactive grid
- Accessibility: Maintain WCAG 2.1 AA compliance like About/Services pages
- Respect `prefers-reduced-motion` for animations

### Client Industry Categorization
Based on client data analysis, potential industry categories:
- **Government/Public Sector**: Tourism, Correctional Services, Mineral Resources, International Relations, Tshwane Open (Municipality), CSIR
- **Energy/Utilities**: Eskom
- **Technology/IT**: H3C Technologies, ScoreCapture, Respondnow
- **Automotive**: VW, Volvo Motors
- **Healthcare/Medical**: BestMed
- **Financial Services**: Momentum
- **Defense/Procurement**: Amscor
- **Research/Scientific**: CSIR
- **Business Services**: Threeframs, Respondnow
- **International**: Sun

*Note: Final industry categorization will be determined during implementation based on web research of each company.*

### JSON Structure
**clients.json Structure:**
```json
{
  "clients": [
    {
      "id": 1,
      "name": "Client Name",
      "industry": "government",
      "location": "Location",
      "image": "/images/car-24.jpg",
      "logo": "/images/logos/client-logo.png",
      "referenceLink": "mailto:contact@client.com",
      "phoneNumber": "0123585520",
      "featured": false,
      "order": 1,
      "description": "Optional client description",
      "website": "https://client-website.com"
    }
  ],
  "clientIndustries": {
    "government": {
      "name": "Government & Public Sector",
      "color": "#[color-hex]",
      "description": "National departments, municipalities, and public sector organizations"
    },
    "energy": {
      "name": "Energy & Utilities",
      "color": "#[color-hex]",
      "description": "Energy providers and utility companies"
    },
    "technology": {
      "name": "Technology & IT",
      "color": "#[color-hex]",
      "description": "Technology companies and IT services"
    },
    "automotive": {
      "name": "Automotive",
      "color": "#[color-hex]",
      "description": "Automotive manufacturers and retailers"
    },
    "healthcare": {
      "name": "Healthcare & Medical",
      "color": "#[color-hex]",
      "description": "Healthcare providers and medical services"
    },
    "financial": {
      "name": "Financial Services",
      "color": "#[color-hex]",
      "description": "Financial institutions and insurance companies"
    },
    "defense": {
      "name": "Defense & Procurement",
      "color": "#[color-hex]",
      "description": "Defense contractors and procurement organizations"
    },
    "research": {
      "name": "Research & Scientific",
      "color": "#[color-hex]",
      "description": "Research institutions and scientific organizations"
    },
    "business": {
      "name": "Business Services",
      "color": "#[color-hex]",
      "description": "Business service providers"
    },
    "international": {
      "name": "International",
      "color": "#[color-hex]",
      "description": "International clients and partners"
    }
  }
}
```

### Hero Section Enhancements
- **Statistics Display**: "Trusted by 15+ clients" and "Serving 5+ industries"
- **Background Image**: Corporate showcase-themed background (different from generic hero)
- **Tagline/Value Proposition**: Clients-specific messaging highlighting company's commitment to client success
- **Visual Design**: Corporate showcase aesthetic with professional, trustworthy presentation
