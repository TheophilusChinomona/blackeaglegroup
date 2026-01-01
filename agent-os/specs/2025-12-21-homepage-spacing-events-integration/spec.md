# Homepage Spacing & Events Integration Specification

**Date:** 2025-12-21  
**Status:** Ready for Implementation

## Overview

This specification covers:
1. Fixing homepage section spacing (uniform 80px between sections)
2. Reordering homepage sections (Hero → Services → Events → Why Choose Us, remove Dedication)
3. Integrating COT and CSIR event websites into React app as pages
4. Enhancing events data structure and homepage events display
5. Updating navigation to use "Events" instead of "Golf Events"

---

## 1. Homepage Section Spacing

### Current Issues
- Sections are too close together
- Inconsistent spacing classes (`ftco-no-pt`, `ftco-no-pb`)
- Manual spacing hack exists (lines 235-239 in `Home.jsx`)

### Requirements
- **Uniform 80px spacing** between all sections
- Remove manual spacing hacks
- Standardize section padding classes

### Implementation
1. Update CSS to add uniform 80px spacing between sections
2. Remove `ftco-no-pt` and `ftco-no-pb` classes or standardize their usage
3. Remove manual `<div><p><br /></p></div>` spacing hack
4. Add consistent section spacing utility class or update existing `.ftco-section` class

**Files to Modify:**
- `BlackEagleGroup.React/src/pages/Home.jsx` - Remove spacing hack, update section classes
- `BlackEagleGroup.React/src/index.css` - Add/update spacing styles

---

## 2. Homepage Section Reordering

### Current Order
1. Hero
2. Events
3. Services
4. Why Choose Us
5. Dedication

### New Order
1. Hero
2. Services
3. Events
4. Why Choose Us
*(Dedication section removed)*

### Implementation
1. Reorder sections in `Home.jsx`
2. Remove Dedication section entirely (lines 275-340)
3. Update refs and animation delays if needed

**Files to Modify:**
- `BlackEagleGroup.React/src/pages/Home.jsx`

---

## 3. Homepage Events Display

### Current State
- Two hardcoded event cards linking to external URLs
- Links point to `https://blackeaglegroup.co.za/COT/index.html` and `https://blackeaglegroup.co.za/csir/csir.html`

### Requirements
- Change layout (not current two large cards)
- Display main event cards (COT, CASSI, etc.)
- Link to React routes (`/events/cot`, `/events/csir`, etc.)
- Pull data dynamically from `events.json`
- Show all main events (not just two)

### Implementation
1. Create new events display component or update existing `EventCard`
2. Load events from `events.json` using existing utility functions
3. Filter to show main events (COT, CSIR, CASSI)
4. Update links to use React Router `Link` component pointing to `/events/{event-type}`
5. Design new layout (grid/carousel instead of two large cards)

**Files to Modify:**
- `BlackEagleGroup.React/src/pages/Home.jsx` - Update Events section
- `BlackEagleGroup.React/src/components/EventCard.jsx` - Update or create new component
- `BlackEagleGroup.React/src/utils/eventData.js` - Ensure utility functions exist

---

## 4. Events Data Structure Enhancement

### Current State
- `events.json` has basic event structure
- Missing: full page content, sponsors, detailed schedules, carousel images

### Requirements
- Add full page content (HTML converted to structured data)
- Add sponsor information and logos
- Add detailed schedules and event details
- Add image paths for carousels and galleries
- Add contact form configuration
- Add embedded map data

### Implementation
1. Analyze HTML source files to extract:
   - COT: `index.html`, `about.html`, `team.html`, `contact.html`
   - CSIR: `ReadMore.html`, `eventDetail.html`, `AboutEvent.html`, `AideMemoir.html`, `CSIRGolfDay.html`
2. Convert HTML content to structured JSON
3. Extract sponsor logos and information
4. Extract carousel images
5. Extract contact form fields
6. Extract map embed codes
7. Update `events.json` with enhanced structure

**Enhanced Structure Example:**
```json
{
  "id": "cot-1",
  "type": "cot",
  "title": "...",
  "hero": {
    "carousel": [
      { "image": "...", "title": "...", "subtitle": "..." }
    ]
  },
  "content": {
    "welcome": "...",
    "about": "...",
    "aideMemoire": {
      "event": "...",
      "date": "...",
      "venue": "...",
      "times": "...",
      "document": "..."
    }
  },
  "sponsors": [
    { "name": "...", "logo": "...", "url": "..." }
  ],
  "contact": {
    "form": {
      "fields": [...],
      "endpoint": "..."
    },
    "map": {
      "embed": "...",
      "address": "..."
    }
  },
  "gallery": {
    "path": "...",
    "images": [...]
  }
}
```

**Files to Modify:**
- `BlackEagleGroup.React/src/data/events.json` - Enhance structure

---

## 5. COT Event Pages Integration

### Current State
- Separate HTML website at `/public_html/COT/`
- Pages: `index.html`, `about.html`, `team.html`, `contact.html`
- React routes exist but components may not be fully implemented

### Requirements
- Make pages look exactly as they do now
- Navigation: one main page for the event + gallery (not separate app)
- Use main site header
- Convert all content exactly as-is

### Implementation
1. **COT Index Page (`/events/cot`)**
   - Convert `index.html` carousel to React carousel component
   - Include welcome content
   - Include sponsor logos section
   - Add navigation to: Main, About, Aide Memoire, Gallery, Contact

2. **COT About Page (`/events/cot/about`)**
   - Convert `about.html` content exactly
   - Include event overview text
   - Include sponsor logos

3. **COT Aide Memoire Page (`/events/cot/team`)**
   - Convert `team.html` content exactly
   - Include event details (date, venue, times)
   - Include PDF download link for ProgramBusiness.pdf

4. **COT Contact Page (`/events/cot/contact`)**
   - Convert `contact.html` form to functional React form
   - Include embedded map
   - Make form submit functional (connect to backend or email service)

5. **COT Gallery**
   - Link to existing CASSI gallery or create COT-specific gallery
   - Use React Router navigation

**Files to Create/Modify:**
- `BlackEagleGroup.React/src/pages/events/cot/Index.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/cot/About.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/cot/Team.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/cot/Contact.jsx` - Full implementation with functional form
- `BlackEagleGroup.React/src/components/EventCarousel.jsx` - New component for carousel
- `BlackEagleGroup.React/src/components/SponsorLogos.jsx` - New component for sponsors

---

## 6. CSIR Event Pages Integration

### Current State
- Separate HTML website at `/public_html/csir/`
- Multiple HTML files: `ReadMore.html`, `eventDetail.html`, `AboutEvent.html`, `AideMemoir.html`, `CSIRGolfDay.html`
- React routes exist but components may not be fully implemented

### Requirements
- Convert all relevant pages
- Use main site header
- Include all functionality (carousels, forms, maps, sponsors)

### Implementation
1. **CSIR Index Page (`/events/csir`)**
   - Convert main welcome page with carousel
   - Include navigation to all CSIR pages

2. **CSIR About Event Page (`/events/csir/about`)**
   - Convert `ReadMore.html` or `AboutEvent.html` content
   - Include event overview

3. **CSIR Event Detail Page (`/events/csir/event-detail`)**
   - Convert `eventDetail.html` content
   - Include detailed event information

4. **CSIR Aide Memoire Page (`/events/csir/aide-memoire`)**
   - Convert `AideMemoir.html` content
   - Include event schedule and details

5. **CSIR Contact Page (`/events/csir/contact`)**
   - Convert contact form to functional React form
   - Include embedded map

6. **CSIR Gallery**
   - Convert `CSIRGolfDay.html` gallery
   - Use React gallery component

**Files to Create/Modify:**
- `BlackEagleGroup.React/src/pages/events/csir/Index.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/csir/About.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/csir/EventDetail.jsx` - Full implementation
- `BlackEagleGroup.React/src/pages/events/csir/AideMemoire.jsx` - New page
- `BlackEagleGroup.React/src/pages/events/csir/Contact.jsx` - Full implementation with functional form
- `BlackEagleGroup.React/src/pages/events/csir/Gallery.jsx` - New page

---

## 7. Event Pages Features

### Required Features for All Event Pages

1. **Hero Section with Image Carousel**
   - Convert HTML carousels to React carousel component
   - Support multiple images with captions
   - Auto-play and manual navigation

2. **Embedded Maps**
   - Include Google Maps embed
   - Extract from HTML source files
   - Make responsive

3. **Event Details**
   - Date, time, venue information
   - Event schedule
   - Registration information

4. **Sponsor Logos Section**
   - Display sponsor logos in grid
   - Link to sponsor websites if available
   - Extract from HTML source

5. **Functional Contact Forms**
   - Convert HTML forms to React forms
   - Form validation
   - Submit to backend API or email service
   - Success/error messaging

6. **Event-Specific Colors**
   - Maintain current color schemes from HTML
   - COT: Use existing color scheme
   - CSIR: Use existing color scheme (#003669, etc.)
   - Apply via CSS variables or component props

**Files to Create:**
- `BlackEagleGroup.React/src/components/EventCarousel.jsx`
- `BlackEagleGroup.React/src/components/SponsorLogos.jsx`
- `BlackEagleGroup.React/src/components/EventContactForm.jsx`
- `BlackEagleGroup.React/src/components/EventMap.jsx`

---

## 8. Navigation Updates

### Current State
- Header has "Golf Events" link
- Links to `/golf-events` page

### Requirements
- Change "Golf Events" to "Events"
- Update to show event details (not just gallery)
- Event pages should use main site header

### Implementation
1. Update Header component to change "Golf Events" to "Events"
2. Ensure event pages use main Header component (not separate navigation)
3. Update `/golf-events` page to show event details properly

**Files to Modify:**
- `BlackEagleGroup.React/src/components/common/Header.jsx` - Update nav link
- `BlackEagleGroup.React/src/pages/GolfEvents.jsx` - Ensure it shows event details

---

## 9. Component Reusability

### Requirements
- Use same Header and Footer components as main site
- Create reusable event components
- Maintain consistent design system

### Implementation
1. Ensure all event pages import and use `Header` and `Footer` from common components
2. Create shared event components:
   - `EventCarousel`
   - `SponsorLogos`
   - `EventContactForm`
   - `EventMap`
   - `EventDetails`
3. Use consistent styling with main site

---

## 10. Technical Requirements

### Dependencies
- React Router for navigation
- React Bootstrap for UI components
- Form handling library (or native React forms)
- Image carousel library (or custom component)

### Performance
- Lazy load event pages (already implemented)
- Optimize images
- Code splitting for event components

### Accessibility
- Proper ARIA labels
- Keyboard navigation
- Screen reader support
- Form validation messages

### Responsive Design
- Mobile-friendly layouts
- Responsive carousels
- Responsive forms
- Responsive maps

---

## Implementation Checklist

### Phase 1: Homepage Updates
- [ ] Fix section spacing (80px uniform)
- [ ] Reorder sections (Hero → Services → Events → Why Choose Us)
- [ ] Remove Dedication section
- [ ] Update Events section to pull from `events.json`
- [ ] Update Events section layout
- [ ] Update Events section links to React routes

### Phase 2: Data Structure
- [ ] Enhance `events.json` with full content
- [ ] Add sponsor information
- [ ] Add carousel images
- [ ] Add contact form configuration
- [ ] Add map embed codes

### Phase 3: Event Components
- [ ] Create `EventCarousel` component
- [ ] Create `SponsorLogos` component
- [ ] Create `EventContactForm` component
- [ ] Create `EventMap` component

### Phase 4: COT Pages
- [ ] Implement COT Index page
- [ ] Implement COT About page
- [ ] Implement COT Aide Memoire page
- [ ] Implement COT Contact page (with functional form)
- [ ] Link to COT gallery

### Phase 5: CSIR Pages
- [ ] Implement CSIR Index page
- [ ] Implement CSIR About page
- [ ] Implement CSIR Event Detail page
- [ ] Implement CSIR Aide Memoire page
- [ ] Implement CSIR Contact page (with functional form)
- [ ] Implement CSIR Gallery page

### Phase 6: Navigation & Polish
- [ ] Update Header to "Events" instead of "Golf Events"
- [ ] Ensure all event pages use main Header
- [ ] Apply event-specific colors
- [ ] Test all routes
- [ ] Test forms functionality
- [ ] Test responsive design
- [ ] Accessibility audit

---

## Success Criteria

1. ✅ Homepage has uniform 80px spacing between sections
2. ✅ Homepage sections in correct order (Hero → Services → Events → Why Choose Us)
3. ✅ Dedication section removed
4. ✅ Events section displays main events from `events.json`
5. ✅ Events section links to React routes
6. ✅ COT pages look exactly as HTML versions
7. ✅ CSIR pages fully converted and functional
8. ✅ All contact forms functional
9. ✅ All carousels working
10. ✅ All maps embedded
11. ✅ Sponsor logos displayed
12. ✅ Navigation updated to "Events"
13. ✅ Event pages use main site header
14. ✅ Event-specific colors applied

---

## Notes

- Preserve all content from HTML source files
- Maintain exact visual appearance where specified
- Use React best practices for component structure
- Ensure forms are secure and validated
- Test all functionality thoroughly
- Maintain accessibility standards

