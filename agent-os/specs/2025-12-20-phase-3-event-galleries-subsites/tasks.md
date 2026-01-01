# Task Breakdown: Phase 3 - Event Galleries & Sub-sites

## Project Location
**Working Directory**: `BlackEagleGroup.React/`
- All tasks should be executed in the `BlackEagleGroup.React/` folder
- Continue building on Phases 1 and 2 foundation

## Overview
Total Tasks: 7 major task groups

## Task List

### Gallery Infrastructure

#### Task Group 1: Image Gallery Setup
**Dependencies:** None

- [x] 1.0 Complete gallery infrastructure
  - [x] 1.1 Write 2-4 focused tests for gallery components
    - Test gallery component renders
    - Test lightbox opens/closes
    - Test image lazy loading works
    - Skip exhaustive testing of all gallery features
  - [x] 1.2 Install gallery dependencies in `BlackEagleGroup.React/`
    - Navigate to `BlackEagleGroup.React/` folder
    - Install `react-image-gallery`: `npm install react-image-gallery`
    - Install `react-player` for videos: `npm install react-player`
    - Verify packages install correctly
  - [x] 1.3 Create reusable Gallery component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/Gallery.jsx`
    - Use react-image-gallery library
    - Support lightbox view with prev/next navigation
    - Support grid view option
    - Implement lazy loading for images
    - Make component reusable for different event types
  - [x] 1.4 Create VideoPlayer component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/VideoPlayer.jsx`
    - Use react-player library
    - Support YouTube video URLs
    - Maintain responsive aspect ratios
    - Include video controls
    - Make component reusable
  - [x] 1.5 Ensure gallery infrastructure tests pass
    - Run ONLY the 2-4 tests written in 1.1
    - Verify gallery component works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 1.1 pass
- Gallery component created and functional
- VideoPlayer component created and functional
- Lazy loading implemented

### Image Optimization

#### Task Group 2: Image Processing Pipeline
**Dependencies:** None

- [x] 2.0 Complete image optimization setup
  - [x] 2.1 Write 2-4 focused tests for image optimization
    - Test WebP conversion works
    - Test image lazy loading
    - Test fallback to original formats
    - Skip exhaustive testing of all image scenarios
  - [x] 2.2 Set up WebP conversion during build in `BlackEagleGroup.React/`
    - Configure Vite build process in `BlackEagleGroup.React/vite.config.js` for automatic WebP conversion
    - Convert all gallery images to WebP format
    - Maintain fallback to original formats
    - Optimize image sizes while maintaining quality
  - [x] 2.3 Implement image lazy loading
    - Use native `loading="lazy"` or intersection observer
    - Apply to all gallery images
    - Ensure performance improvement
  - [x] 2.4 Create responsive image sets
    - Generate different sizes for different screen sizes
    - Optimize for mobile, tablet, desktop
    - Ensure fast loading on mobile networks
  - [x] 2.5 Ensure image optimization tests pass
    - Run ONLY the 2-4 tests written in 2.1
    - Verify WebP conversion works
    - Verify lazy loading works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 2.1 pass
- WebP conversion working
- Lazy loading implemented
- Images optimized for performance

### Event Data Structure

#### Task Group 3: Data-Driven Event System
**Dependencies:** None

- [x] 3.0 Complete event data structure
  - [x] 3.1 Write 2-4 focused tests for data structure
    - Test JSON/config files load correctly
    - Test event data parsing works
    - Test dynamic content loading
    - Skip exhaustive testing of all data scenarios
  - [x] 3.2 Create JSON/config file structure in `BlackEagleGroup.React/src/data/`
    - Create `BlackEagleGroup.React/src/data/` folder
    - Design data structure for events
    - Include metadata: title, description, date, location, images, videos
    - Support multiple events per event type
    - Structure for future CMS integration
  - [x] 3.3 Extract event data from existing HTML
    - Extract COT event data from `public_html/COT/`
    - Extract CSIR event data from `public_html/csir/`
    - Extract CASSI event data from `public_html/cassi/`
    - Convert to JSON/config format
    - Save to `BlackEagleGroup.React/src/data/events.json` or similar structure
  - [x] 3.4 Create data loading utilities in `BlackEagleGroup.React/src/utils/`
    - Create `BlackEagleGroup.React/src/utils/eventData.js` or similar
    - Create functions to load event data
    - Support dynamic content loading
    - Handle data errors gracefully
  - [x] 3.5 Ensure data structure tests pass
    - Run ONLY the 2-4 tests written in 3.1
    - Verify data loads correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 3.1 pass
- Event data structure created
- Data loads correctly
- Easy to add new events

### Event Pages & Templates

#### Task Group 4: Event Page Components
**Dependencies:** Task Groups 1, 3

- [x] 4.0 Complete event page components
  - [x] 4.1 Write 2-6 focused tests for event pages
    - Test Golf Events landing page renders
    - Test event page template renders
    - Test COT pages render
    - Test CSIR pages render
    - Test CASSI gallery pages render
    - Skip exhaustive testing of all page states
  - [x] 4.2 Create Golf Events landing page in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/GolfEvents.jsx`
    - Display overview of golf events
    - Include links to COT, CSIR, CASSI sections
    - Reference structure from `public_html/cassi/GolfDay.html`
    - Maintain design consistency
  - [x] 4.3 Create EventPage template component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/EventPage.jsx`
    - Reusable template for different event types
    - Support dynamic content from JSON/config in `BlackEagleGroup.React/src/data/`
    - Include sections: overview, details, gallery, videos
    - Maintain consistent layout
  - [x] 4.4 Create COT event pages in `BlackEagleGroup.React/src/pages/events/cot/`
    - Create `BlackEagleGroup.React/src/pages/events/cot/` folder structure
    - Convert content from `public_html/COT/` folder
    - Create pages: index, about, contact, team, etc.
    - Maintain COT branding and styling
    - Use EventPage template where applicable
  - [x] 4.5 Create CSIR event pages in `BlackEagleGroup.React/src/pages/events/csir/`
    - Create `BlackEagleGroup.React/src/pages/events/csir/` folder structure
    - Convert content from `public_html/csir/` folder
    - Include all CSIR-specific pages and content
    - Maintain CSIR branding and styling
    - Use EventPage template where applicable
  - [x] 4.6 Create CASSI gallery pages in `BlackEagleGroup.React/src/pages/cassi/`
    - Create `BlackEagleGroup.React/src/pages/cassi/` folder structure
    - Convert gallery structure from `public_html/cassi/Gallery/`
    - Implement gallery with all CASSI event images
    - Include navigation to different CASSI galleries
    - Maintain CASSI-specific styling
  - [x] 4.7 Ensure event page tests pass
    - Run ONLY the 2-6 tests written in 4.1
    - Verify all event pages render
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-6 tests written in 4.1 pass
- All event pages created
- Pages match original designs
- Dynamic content loading works

### Mobile Optimization

#### Task Group 5: Mobile Gallery Experience
**Dependencies:** Task Groups 1, 4

- [x] 5.0 Complete mobile optimization
  - [x] 5.1 Write 2-4 focused tests for mobile experience
    - Test mobile gallery layout
    - Test touch interactions
    - Test swipe gestures
    - Skip exhaustive mobile testing
  - [x] 5.2 Create mobile-optimized gallery layout
    - Adjust grid layout for mobile screens
    - Optimize image sizes for mobile
    - Ensure fast loading on mobile networks
  - [x] 5.3 Implement touch interactions
    - Add swipe gestures for lightbox navigation
    - Optimize touch targets
    - Test on various mobile device sizes
  - [x] 5.4 Optimize mobile performance
    - Reduce image sizes for mobile
    - Implement progressive loading
    - Ensure smooth scrolling
  - [x] 5.5 Ensure mobile optimization tests pass
    - Run ONLY the 2-4 tests written in 5.1
    - Verify mobile experience works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 5.1 pass
- Mobile gallery optimized
- Touch interactions work
- Fast loading on mobile

### Routing & Deployment

#### Task Group 6: Nested Routing & cPanel Setup
**Dependencies:** Task Groups 4, 5

- [x] 6.0 Complete routing and deployment setup
  - [x] 6.1 Write 2-4 focused tests for routing
    - Test nested routes work
    - Test COT routes work
    - Test CSIR routes work
    - Test CASSI routes work
  - [x] 6.2 Configure nested routes for sub-sites in `BlackEagleGroup.React/src/App.jsx`
    - Configure `/events/cot/*` nested routes pointing to `BlackEagleGroup.React/src/pages/events/cot/`
    - Configure `/events/csir/*` nested routes pointing to `BlackEagleGroup.React/src/pages/events/csir/`
    - Configure `/cassi/*` route section pointing to `BlackEagleGroup.React/src/pages/cassi/`
    - Ensure all routes work in single build
  - [x] 6.3 Research cPanel deployment requirements
    - Review cPanel documentation for React SPA deployment
    - Determine .htaccess configuration needs
    - Plan for single build deployment approach
    - Document deployment steps for `BlackEagleGroup.React/` build output
  - [x] 6.4 Implement .htaccess for SPA routing (if needed)
    - Create `.htaccess` file in `BlackEagleGroup.React/public/` or build output
    - Create rewrite rules for client-side routing
    - Ensure all routes redirect to index.html
    - Test routing works after deployment
  - [x] 6.5 Add smooth scrolling and animations
    - Implement smooth scrolling for page navigation
    - Add subtle animations for gallery image loading
    - Include transition effects for lightbox
    - Use CSS transitions (lightweight approach)
  - [x] 6.6 Ensure routing tests pass
    - Run ONLY the 2-4 tests written in 6.1
    - Verify all nested routes work
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 6.1 pass
- All nested routes configured correctly
- Single build deployment ready
- Smooth scrolling and animations working

### Testing & Verification

#### Task Group 7: Test Review & Visual Verification
**Dependencies:** Task Groups 1-6

- [x] 7.0 Review tests and verify functionality
  - [x] 7.1 Review tests from Task Groups 1-6
    - Review the 2-4 tests from gallery infrastructure (Task 1.1)
    - Review the 2-4 tests from image optimization (Task 2.1)
    - Review the 2-4 tests from data structure (Task 3.1)
    - Review the 2-6 tests from event pages (Task 4.1)
    - Review the 2-4 tests from mobile optimization (Task 5.1)
    - Review the 2-4 tests from routing (Task 6.1)
    - Total existing tests: approximately 14-26 tests
  - [x] 7.2 Visual comparison with original pages
    - Compare galleries with `public_html/cassi/Gallery/gallery.html`
    - Compare event pages with `public_html/cassi/GolfDay.html`
    - Compare COT pages with `public_html/COT/` pages
    - Compare CSIR pages with `public_html/csir/` pages
    - Verify pixel-perfect visual consistency
  - [x] 7.3 Write up to 8 additional strategic tests maximum
    - Add integration tests for gallery navigation
    - Add tests for video playback
    - Add tests for nested routing
    - Focus on critical user workflows
  - [x] 7.4 Run feature-specific tests only
    - Run ONLY tests related to Phase 3 (tests from 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, and 7.3)
    - Expected total: approximately 22-34 tests maximum
    - Do NOT run entire application test suite
    - Verify all critical functionality works

**Acceptance Criteria:**
- All feature-specific tests pass (approximately 22-34 tests total)
- Visual design matches original pages pixel-perfect
- All galleries functional
- All event pages work correctly
- Mobile experience optimized
- Testing focused exclusively on Phase 3 requirements

## Execution Order

Recommended implementation sequence:
1. Gallery Infrastructure (Task Group 1) - Can run parallel with Groups 2, 3
2. Image Optimization (Task Group 2) - Can run parallel with Groups 1, 3
3. Event Data Structure (Task Group 3) - Can run parallel with Groups 1, 2
4. Event Pages & Templates (Task Group 4) - Requires Groups 1, 3
5. Mobile Optimization (Task Group 5) - Requires Groups 1, 4
6. Routing & Deployment (Task Group 6) - Requires Groups 4, 5
7. Testing & Verification (Task Group 7) - Requires all previous groups

