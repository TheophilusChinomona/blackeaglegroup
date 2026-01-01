# Implementation Tasks

## Phase 1: Homepage Updates

### Task 1.1: Fix Homepage Section Spacing
**Priority:** High  
**Estimated Time:** 1 hour

- [x] Update `index.css` to add uniform 80px spacing between sections
- [x] Remove or standardize `ftco-no-pt` and `ftco-no-pb` classes
- [x] Remove manual spacing hack (lines 235-239) from `Home.jsx`
- [x] Test spacing on all screen sizes
- [x] Verify uniform 80px spacing between all sections

**Files:**
- `BlackEagleGroup.React/src/index.css`
- `BlackEagleGroup.React/src/pages/Home.jsx`

---

### Task 1.2: Reorder Homepage Sections
**Priority:** High  
**Estimated Time:** 30 minutes

- [x] Reorder sections in `Home.jsx`: Hero → Services → Events → Why Choose Us
- [x] Remove Dedication section (lines 275-340)
- [x] Remove Dedication section refs and animation code
- [x] Update section refs if needed
- [x] Test page flow and animations

**Files:**
- `BlackEagleGroup.React/src/pages/Home.jsx`

---

### Task 1.3: Update Events Section on Homepage
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Create or update events display component to pull from `events.json`
- [x] Filter events to show main events (COT, CSIR, CASSI)
- [x] Design new layout (grid/carousel instead of two large cards)
- [x] Update links to use React Router `Link` component
- [x] Update links to point to `/events/{event-type}` routes
- [x] Test event cards display and navigation

**Files:**
- `BlackEagleGroup.React/src/pages/Home.jsx`
- `BlackEagleGroup.React/src/components/EventCard.jsx` (or create new component)
- `BlackEagleGroup.React/src/utils/eventData.js` (verify functions exist)

---

## Phase 2: Data Structure Enhancement

### Task 2.1: Analyze HTML Source Files
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Read and analyze COT HTML files:
  - `public_html/COT/index.html`
  - `public_html/COT/about.html`
  - `public_html/COT/team.html`
  - `public_html/COT/contact.html`
- [x] Read and analyze CSIR HTML files:
  - `public_html/csir/ReadMore.html`
  - `public_html/csir/eventDetail.html`
  - `public_html/csir/AboutEvent.html`
  - `public_html/csir/AideMemoir.html`
  - `public_html/csir/CSIRGolfDay.html`
- [x] Extract all content, images, sponsors, forms, maps
- [x] Document structure needed for JSON

---

### Task 2.2: Enhance events.json Structure
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Add `hero.carousel` array with images and captions
- [x] Add `content` object with welcome, about, aideMemoire sections
- [x] Add `sponsors` array with name, logo, url
- [x] Add `contact.form` configuration
- [x] Add `contact.map` embed code and address
- [x] Add `gallery` paths and images
- [x] Add detailed schedules and event details
- [x] Update COT event data
- [x] Update CSIR event data
- [x] Validate JSON structure

**Files:**
- `BlackEagleGroup.React/src/data/events.json`

---

## Phase 3: Event Components

### Task 3.1: Create EventCarousel Component
**Priority:** Medium  
**Estimated Time:** 2 hours

- [x] Create `EventCarousel.jsx` component
- [x] Support multiple images with captions
- [x] Add auto-play functionality
- [x] Add manual navigation (prev/next buttons)
- [x] Add indicator dots
- [x] Make responsive
- [x] Add accessibility features (ARIA labels, keyboard navigation)
- [x] Test carousel functionality

**Files:**
- `BlackEagleGroup.React/src/components/EventCarousel.jsx`

---

### Task 3.2: Create SponsorLogos Component
**Priority:** Medium  
**Estimated Time:** 1 hour

- [x] Create `SponsorLogos.jsx` component
- [x] Display sponsor logos in grid layout
- [x] Support clickable links to sponsor websites
- [x] Make responsive
- [x] Add alt text for accessibility
- [x] Test component

**Files:**
- `BlackEagleGroup.React/src/components/SponsorLogos.jsx`

---

### Task 3.3: Create EventContactForm Component
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Create `EventContactForm.jsx` component
- [x] Support dynamic form fields from JSON
- [x] Add form validation
- [x] Add error handling
- [x] Connect to backend API or email service
- [x] Add success/error messaging
- [x] Make responsive
- [x] Add accessibility features
- [x] Test form submission

**Files:**
- `BlackEagleGroup.React/src/components/EventContactForm.jsx`

---

### Task 3.4: Create EventMap Component
**Priority:** Low  
**Estimated Time:** 1 hour

- [x] Create `EventMap.jsx` component
- [x] Support Google Maps embed
- [x] Make responsive
- [x] Extract embed code from HTML sources
- [x] Test map display

**Files:**
- `BlackEagleGroup.React/src/components/EventMap.jsx`

---

## Phase 4: COT Event Pages

### Task 4.1: Implement COT Index Page
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Update `COTIndex.jsx` to match `index.html` exactly
- [x] Integrate `EventCarousel` component with COT carousel images
- [x] Add welcome content section
- [x] Integrate `SponsorLogos` component
- [x] Add navigation links (Main, About, Aide Memoire, Gallery, Contact)
- [x] Apply COT-specific colors
- [x] Test page display and navigation

**Files:**
- `BlackEagleGroup.React/src/pages/events/cot/Index.jsx`
- Use: `EventCarousel`, `SponsorLogos`

---

### Task 4.2: Implement COT About Page
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Update `COTAbout.jsx` to match `about.html` exactly
- [x] Convert event overview content
- [x] Integrate `SponsorLogos` component
- [x] Apply COT-specific colors
- [x] Test page display

**Files:**
- `BlackEagleGroup.React/src/pages/events/cot/About.jsx`
- Use: `SponsorLogos`

---

### Task 4.3: Implement COT Aide Memoire Page
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Update `COTTeam.jsx` to match `team.html` exactly
- [x] Convert event details (date, venue, times)
- [x] Add PDF download link for ProgramBusiness.pdf
- [x] Apply COT-specific colors
- [x] Test page display and PDF link

**Files:**
- `BlackEagleGroup.React/src/pages/events/cot/Team.jsx`

---

### Task 4.4: Implement COT Contact Page
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Update `COTContact.jsx` to match `contact.html` exactly
- [x] Integrate `EventContactForm` component
- [x] Integrate `EventMap` component
- [x] Configure form fields from JSON
- [x] Make form functional (connect to backend/email)
- [x] Apply COT-specific colors
- [x] Test form submission and map display

**Files:**
- `BlackEagleGroup.React/src/pages/events/cot/Contact.jsx`
- Use: `EventContactForm`, `EventMap`

---

### Task 4.5: Link COT Gallery
**Priority:** Medium  
**Estimated Time:** 30 minutes

- [x] Update COT navigation to link to gallery
- [x] Link to existing CASSI gallery or create COT-specific gallery route
- [x] Test gallery navigation

**Files:**
- `BlackEagleGroup.React/src/pages/events/cot/Index.jsx`
- `BlackEagleGroup.React/src/App.jsx` (if new route needed)

---

## Phase 5: CSIR Event Pages

### Task 5.1: Implement CSIR Index Page
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Update `CSIRIndex.jsx` to match CSIR main page
- [x] Integrate `EventCarousel` component
- [x] Add welcome content
- [x] Add navigation to all CSIR pages
- [x] Apply CSIR-specific colors (#003669, etc.)
- [x] Test page display and navigation

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/Index.jsx`
- Use: `EventCarousel`

---

### Task 5.2: Implement CSIR About Page
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Update `CSIRAbout.jsx` to match `ReadMore.html` or `AboutEvent.html`
- [x] Convert event overview content
- [x] Apply CSIR-specific colors
- [x] Test page display

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/About.jsx`

---

### Task 5.3: Implement CSIR Event Detail Page
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Update `CSIREventDetail.jsx` to match `eventDetail.html`
- [x] Convert detailed event information
- [x] Apply CSIR-specific colors
- [x] Test page display

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/EventDetail.jsx`

---

### Task 5.4: Implement CSIR Aide Memoire Page
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Create `CSIRAideMemoire.jsx` page
- [x] Convert `AideMemoir.html` content
- [x] Include event schedule and details
- [x] Apply CSIR-specific colors
- [x] Add route in `App.jsx`
- [x] Test page display

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/AideMemoire.jsx` (new)
- `BlackEagleGroup.React/src/App.jsx`

---

### Task 5.5: Implement CSIR Contact Page
**Priority:** High  
**Estimated Time:** 3 hours

- [x] Update `CSIRContact.jsx` to match CSIR contact page
- [x] Integrate `EventContactForm` component
- [x] Integrate `EventMap` component
- [x] Configure form fields from JSON
- [x] Make form functional
- [x] Apply CSIR-specific colors
- [x] Test form submission and map display

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/Contact.jsx`
- Use: `EventContactForm`, `EventMap`

---

### Task 5.6: Implement CSIR Gallery Page
**Priority:** Medium  
**Estimated Time:** 2 hours

- [x] Create `CSIRGallery.jsx` page
- [x] Convert `CSIRGolfDay.html` gallery
- [x] Use React gallery component
- [x] Apply CSIR-specific colors
- [x] Add route in `App.jsx`
- [x] Test gallery display

**Files:**
- `BlackEagleGroup.React/src/pages/events/csir/Gallery.jsx` (new)
- `BlackEagleGroup.React/src/App.jsx`

---

## Phase 6: Navigation & Polish

### Task 6.1: Update Header Navigation
**Priority:** High  
**Estimated Time:** 30 minutes

- [x] Change "Golf Events" to "Events" in Header
- [x] Update route if needed
- [x] Test navigation

**Files:**
- `BlackEagleGroup.React/src/components/common/Header.jsx`

---

### Task 6.2: Ensure Event Pages Use Main Header
**Priority:** High  
**Estimated Time:** 1 hour

- [ ] Verify all COT pages use main Header component
- [ ] Verify all CSIR pages use main Header component
- [ ] Remove any separate navigation components
- [ ] Test header display on all event pages

**Files:**
- All event page components

---

### Task 6.3: Apply Event-Specific Colors
**Priority:** Medium  
**Estimated Time:** 2 hours

- [x] Extract color schemes from HTML sources
- [x] Create CSS variables or theme props for COT colors
- [x] Create CSS variables or theme props for CSIR colors
- [x] Apply colors to respective event pages
- [x] Test color application

**Files:**
- Event page components
- `BlackEagleGroup.React/src/index.css` (if using CSS variables)

---

### Task 6.4: Update GolfEvents Page
**Priority:** Medium  
**Estimated Time:** 1 hour

- [x] Ensure `/golf-events` page shows event details properly
- [x] Update to use enhanced events data
- [x] Test page display

**Files:**
- `BlackEagleGroup.React/src/pages/GolfEvents.jsx`

---

## Phase 7: Testing & Quality Assurance

### Task 7.1: Route Testing
**Priority:** High  
**Estimated Time:** 1 hour

- [x] Test all COT routes
- [x] Test all CSIR routes
- [x] Test navigation between pages
- [x] Test back button functionality
- [x] Fix any routing issues

---

### Task 7.2: Form Functionality Testing
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Test COT contact form submission
- [x] Test CSIR contact form submission
- [x] Test form validation
- [x] Test error handling
- [x] Test success messaging
- [x] Fix any form issues

---

### Task 7.3: Responsive Design Testing
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Test all pages on mobile devices
- [x] Test all pages on tablets
- [x] Test all pages on desktop
- [x] Test carousels on all screen sizes
- [x] Test forms on all screen sizes
- [x] Test maps on all screen sizes
- [x] Fix any responsive issues

---

### Task 7.4: Accessibility Audit
**Priority:** Medium  
**Estimated Time:** 2 hours

- [x] Test keyboard navigation
- [x] Test screen reader compatibility
- [x] Check ARIA labels
- [x] Check color contrast
- [x] Check form labels
- [x] Fix any accessibility issues

---

### Task 7.5: Visual Comparison
**Priority:** High  
**Estimated Time:** 2 hours

- [x] Compare COT pages with HTML versions
- [x] Compare CSIR pages with HTML versions
- [x] Ensure exact visual match where specified
- [x] Fix any visual discrepancies

---

### Task 7.6: Performance Testing
**Priority:** Medium  
**Estimated Time:** 1 hour

- [x] Test page load times
- [x] Test image loading
- [x] Test lazy loading
- [x] Optimize if needed

---

## Summary

**Total Estimated Time:** ~45-50 hours

**Priority Breakdown:**
- High Priority: ~35 hours
- Medium Priority: ~10 hours
- Low Priority: ~1 hour

**Phases:**
1. Homepage Updates: ~3.5 hours
2. Data Structure: ~5 hours
3. Event Components: ~8 hours
4. COT Pages: ~10.5 hours
5. CSIR Pages: ~14 hours
6. Navigation & Polish: ~3.5 hours
7. Testing & QA: ~10 hours

