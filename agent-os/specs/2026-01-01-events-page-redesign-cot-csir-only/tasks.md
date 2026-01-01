
# Task Breakdown: Events Page Redesign (COT and CSIR Only)

## Overview
Total Tasks: 5 major task groups with 30+ sub-tasks

## Task List

### Data Cleanup Layer

#### Task Group 1: Remove CASSI Events from Codebase
**Dependencies:** None

- [x] 1.0 Complete data cleanup layer
  - [x] 1.1 Remove CASSI events from events.json
    - Remove all event objects with `"type": "cassi"` from events array
    - Keep only COT (`cot-1`) and CSIR (`csir-1`) events
    - Verify JSON structure remains valid after removal
  - [x] 1.2 Remove CASSI from eventTypes object
    - Remove `"cassi"` entry from `eventTypes` object in events.json
    - Keep only `"cot"` and `"csir"` event types
  - [x] 1.3 Update GolfEvents.jsx to remove CASSI references
    - Remove `getCASSIEvents` import from eventData.js
    - Remove `cassiEvents` state variable
    - Remove CASSI event loading from Promise.all in useEffect
    - Remove CASSI event rendering from JSX (lines 113-134)
    - Update loading logic to only handle COT and CSIR
  - [x] 1.4 Update Home.jsx to remove CASSI references
    - Remove `getCASSIEvents` import from eventData.js
    - Remove CASSI event from Promise.all in loadMainEvents
    - Remove CASSI event from events array construction (line 43)
    - Verify homepage only shows COT and CSIR events
  - [x] 1.5 Clean up eventData.js exports
    - Check if `getCASSIEvents` is used elsewhere in codebase
    - Remove `getCASSIEvents` export if not needed
    - Keep function definition for backward compatibility if still referenced
  - [x] 1.6 Verify data cleanup
    - Test that events.json loads without errors
    - Verify GolfEvents page loads only COT and CSIR events
    - Verify Home page displays only COT and CSIR events
    - Check browser console for any errors or warnings

**Acceptance Criteria:**
- events.json contains only COT and CSIR events
- eventTypes object contains only "cot" and "csir"
- GolfEvents.jsx no longer references CASSI events
- Home.jsx no longer displays CASSI events
- No console errors related to missing CASSI data

### Component Development Layer

#### Task Group 2: Enhanced EventCard Component
**Dependencies:** Task Group 1

- [x] 2.0 Complete EventCard enhancements
  - [x] 2.1 Enhance EventCard component for event-specific styling
    - Add `eventType` prop to accept "cot" or "csir"
    - Add `isFutureEvent` prop to determine if event is upcoming
    - Add `showRegisterButton` prop to control CTA button display
    - Maintain backward compatibility with existing usage
  - [x] 2.2 Add event-specific CSS classes
    - Create `.event-card-cot` and `.event-card-csir` classes in index.css
    - Apply distinct color schemes for each event type
    - Use energetic, dynamic styling (not premium/luxury)
    - Ensure visual differentiation while maintaining cohesion
  - [x] 2.3 Add "Register Interest" button to EventCard
    - Display button only when `isFutureEvent` is true
    - Position button prominently on card (overlay or separate section)
    - Style button with event-focused, call-to-action design
    - Add onClick handler to open registration modal
    - Ensure button doesn't interfere with card click navigation
  - [x] 2.4 Add hover effects and interactions
    - Implement scale transform on hover (subtle, 1.02-1.05)
    - Add shadow transitions for depth
    - Add color transitions for event-specific styling
    - Ensure keyboard accessibility with focus states
  - [x] 2.5 Update EventCard to display event metadata
    - Show event title prominently
    - Display event date in readable format
    - Show location if available
    - Use event images from events.json (hero images or gallery previews)
  - [x] 2.6 Test EventCard component
    - Verify event-specific styling applies correctly
    - Test "Register Interest" button appears for future events only
    - Verify hover effects work smoothly
    - Test keyboard navigation and accessibility

**Acceptance Criteria:**
- EventCard supports event-specific styling variants
- "Register Interest" button displays for future events
- Hover effects provide visual feedback
- Component maintains backward compatibility
- All interactions are keyboard accessible

#### Task Group 3: Search and Filter Components
**Dependencies:** Task Group 1

- [x] 3.0 Complete search and filter functionality
  - [x] 3.1 Create EventSearch component
    - Build search input field with real-time filtering
    - Use shadcn/ui Input component for consistency
    - Implement debounced search to optimize performance
    - Display search icon and clear button
  - [x] 3.2 Enhance searchEvents function in eventData.js
    - Verify existing `searchEvents()` function works correctly
    - Ensure it searches title, subtitle, description, and location
    - Add case-insensitive matching
    - Return filtered results array
  - [x] 3.3 Create EventFilter component
    - Build filter dropdown/buttons for date filtering
    - Options: "All Events", "Upcoming", "Past"
    - Use shadcn/ui Select or Button components
    - Add visual indicator for active filter
  - [x] 3.4 Implement date comparison utility
    - Create function to compare event.date with current date
    - Parse event dates (format: "YYYY-MM-DD" or "YYYY/MM/DD")
    - Return boolean for isFutureEvent, isPastEvent
    - Handle edge cases (same day, invalid dates)
  - [x] 3.5 Combine search and filter logic
    - Create unified filtering function that applies both search and date filter
    - Ensure filters work together (AND logic)
    - Update filtered events in real-time as user types or changes filter
  - [x] 3.6 Add "No results" message
    - Display message when search/filter yields no matches
    - Provide clear, helpful messaging
    - Include option to clear filters
  - [x] 3.7 Test search and filter functionality
    - Test keyword search across all event fields
    - Test date filtering (upcoming, past, all)
    - Test combined search and filter
    - Verify "No results" message displays correctly

**Acceptance Criteria:**
- Search filters events by keyword in real-time
- Date filter correctly categorizes events
- Search and filter work together seamlessly
- "No results" message displays when appropriate
- All functionality is responsive and accessible

#### Task Group 4: Event Registration Modal
**Dependencies:** Task Group 2

- [x] 4.0 Complete registration modal functionality
  - [x] 4.1 Adapt EventContactModal for event registration
    - Reuse existing EventContactModal component
    - Add event context (event name/ID) to form submission
    - Customize form fields: name, email, phone (optional), message/interest
    - Update modal title and description for registration context
  - [x] 4.2 Integrate with contact form API
    - Use existing `submitContactForm()` from `@/api/contact`
    - Include event name/ID in form data for context
    - Set appropriate subject line (e.g., "Event Registration: [Event Name]")
    - Handle form submission errors gracefully
  - [x] 4.3 Add form validation
    - Use React Hook Form with Yup validation (pattern from Contact.jsx)
    - Validate required fields: name, email
    - Validate email format
    - Show validation errors inline
  - [x] 4.4 Implement success/error handling
    - Display success message on successful submission
    - Display error message on failure
    - Auto-close modal after successful submission (2-3 second delay)
    - Reset form on successful submission
  - [x] 4.5 Connect modal to EventCard button
    - Pass event data to modal when "Register Interest" button clicked
    - Manage modal open/close state in parent component
    - Ensure modal opens with correct event context
  - [x] 4.6 Test registration modal
    - Verify form validation works correctly
    - Test successful form submission
    - Test error handling
    - Verify modal closes after successful submission

**Acceptance Criteria:**
- Registration modal opens from EventCard button
- Form validates required fields correctly
- Form submits to contact API with event context
- Success/error messages display appropriately
- Modal auto-closes on successful submission

### Page Redesign Layer

#### Task Group 5: GolfEvents Page Redesign
**Dependencies:** Task Groups 1, 2, 3, 4

- [x] 5.0 Complete GolfEvents page redesign
  - [x] 5.1 Redesign page layout structure
    - Keep Hero component at top
    - Add search and filter section below hero
    - Create featured events section with responsive grid
    - Remove old gallery-section structure
  - [x] 5.2 Implement featured events section
    - Use React Bootstrap Grid (Container, Row, Col) or Tailwind grid
    - Display 2 events side-by-side on desktop
    - Layout adapts to 3 events in a row for future scalability
    - Stack events vertically on mobile/tablet
    - Maintain consistent spacing and visual hierarchy
  - [x] 5.3 Integrate search and filter components
    - Add EventSearch component above events section
    - Add EventFilter component next to search
    - Connect search/filter to event display logic
    - Update displayed events based on search/filter state
  - [x] 5.4 Integrate enhanced EventCard components
    - Use enhanced EventCard with event-specific styling
    - Pass event type (cot/csir) to EventCard
    - Pass isFutureEvent prop based on date comparison
    - Connect "Register Interest" button to modal
  - [x] 5.5 Add scroll-triggered animations
    - Import `initScrollAnimations` from `@/utils/scrollAnimations`
    - Call `initScrollAnimations()` in useEffect on mount
    - Add `.ftco-animate` class to event cards
    - Apply staggered delays (50-100ms between cards)
    - Respect `prefers-reduced-motion` setting
  - [x] 5.6 Implement responsive design
    - Mobile (< 768px): Stack cards vertically, full width
    - Tablet (768px - 1024px): 2 cards side-by-side or stacked
    - Desktop (> 1024px): 2 cards side-by-side, adaptable to 3
    - Ensure search/filter controls are responsive
    - Maintain touch-friendly button sizes on mobile
  - [x] 5.7 Apply event-focused styling
    - Use energetic, dynamic aesthetic (not premium/luxury)
    - Apply event-specific color schemes for COT and CSIR
    - Add event-focused typography
    - Ensure visual differentiation between event types
  - [x] 5.8 Test complete page functionality
    - Verify page loads with only COT and CSIR events
    - Test search functionality
    - Test filter functionality
    - Test "Register Interest" button and modal
    - Test responsive layout on different screen sizes
    - Test scroll animations
    - Verify keyboard navigation and accessibility

**Acceptance Criteria:**
- Page displays only COT and CSIR events
- Featured events section shows 2 events side-by-side (adaptable to 3)
- Search and filter work correctly
- Event cards have event-specific styling
- "Register Interest" button appears for future events
- Scroll animations work smoothly
- Page is fully responsive
- All functionality is accessible

### Styling & Design Layer

#### Task Group 6: Event-Specific Styling
**Dependencies:** Task Groups 2, 5

- [x] 6.0 Complete event-specific styling
  - [x] 6.1 Create COT event styling
    - Define color scheme for COT events (energetic, dynamic)
    - Create `.event-cot` and `.event-card-cot` CSS classes
    - Apply to Tailwind utilities or custom CSS
    - Ensure visual distinction from CSIR
  - [x] 6.2 Create CSIR event styling
    - Define color scheme for CSIR events (energetic, dynamic, different from COT)
    - Create `.event-csir` and `.event-card-csir` CSS classes
    - Apply to Tailwind utilities or custom CSS
    - Ensure visual distinction from COT
  - [x] 6.3 Add event-focused typography
    - Choose energetic, dynamic font styling
    - Apply to event titles and metadata
    - Ensure readability and visual impact
    - Differentiate from homepage/About page typography
  - [x] 6.4 Style search and filter components
    - Match event-focused aesthetic
    - Ensure components are visually cohesive
    - Add appropriate spacing and layout
  - [x] 6.5 Style registration modal
    - Match event-focused aesthetic
    - Ensure modal is visually appealing
    - Maintain consistency with form styling
  - [x] 6.6 Add hover and transition effects
    - Implement smooth transitions for all interactive elements
    - Add hover states for buttons and cards
    - Ensure animations enhance without overwhelming
  - [x] 6.7 Test styling across breakpoints
    - Verify styling works on mobile
    - Verify styling works on tablet
    - Verify styling works on desktop
    - Ensure visual consistency across devices

**Acceptance Criteria:**
- COT and CSIR events have distinct visual styling
- Event-focused aesthetic is consistent throughout page
- Typography matches event-focused direction
- All styling is responsive
- Hover and transition effects work smoothly

## Execution Order

Recommended implementation sequence:
1. Data Cleanup Layer (Task Group 1) - Remove CASSI events first
2. Component Development Layer (Task Groups 2, 3, 4) - Build components in parallel where possible
3. Page Redesign Layer (Task Group 5) - Integrate all components
4. Styling & Design Layer (Task Group 6) - Apply final styling polish

**Note:** Task Groups 2, 3, and 4 can be worked on in parallel as they have minimal dependencies on each other. Task Group 5 depends on all previous groups. Task Group 6 can be worked on alongside Task Group 5.
