# Specification: Events Page Redesign (COT and CSIR Only)

## Goal

Redesign the events page with an event-focused aesthetic that displays only COT and CSIR events in a featured section with search and filter capabilities, while removing all CASSI events from the codebase.

## User Stories

- As a visitor, I want to see only COT and CSIR events prominently displayed so that I can quickly find relevant golf events
- As a visitor, I want to search and filter events by keyword and date so that I can find specific events I'm interested in
- As a visitor, I want to register interest for upcoming events so that I can be notified about future golf events

## Specific Requirements

**Featured Events Section Layout**
- Display COT and CSIR events side-by-side in a responsive grid (2 events, adaptable to 3 events in a row for future scalability)
- Use React Bootstrap Grid (Container, Row, Col) or Tailwind grid classes for responsive layout
- Cards should be prominent and visually engaging with event-focused styling
- Layout adapts to screen size: side-by-side on desktop, stacked on mobile/tablet
- Maintain consistent spacing and visual hierarchy between event cards

**Event-Specific Visual Styling**
- Apply distinct visual styling to differentiate COT and CSIR events
- Use event-specific color schemes, typography, or visual treatments for each event type
- Create CSS classes or Tailwind utilities for `event-cot` and `event-csir` styling variants
- Ensure visual differentiation is clear but maintains overall design cohesion
- Style should be energetic, dynamic, and event-focused (not premium/luxury like About page)

**Search Functionality**
- Implement search input field that filters events by keyword
- Search should match against event title, subtitle, description, and location fields
- Enhance existing `searchEvents()` function from `eventData.js` or create new search utility
- Display search results in real-time as user types
- Show "No results" message when search yields no matches
- Clear search functionality to reset to all events

**Filter Functionality**
- Add filter controls for date-based filtering (upcoming, past, all events)
- Compare event.date with current date to determine event status
- Filter by event type (COT, CSIR) if needed for future scalability
- Combine search and filter results appropriately
- Reset filters functionality to show all events

**Register Interest CTA for Future Events**
- Detect future events by comparing event.date with current date
- Display "Register Interest" button prominently on event cards for upcoming events
- Button should be visually distinct and call-to-action focused
- Clicking button opens a modal or form for event registration
- Use existing EventContactModal component or create new registration modal component

**Event Registration Form**
- Create registration form with fields: name, email, phone (optional), message/interest
- Use shadcn/ui Form components with React Hook Form + Yup validation (pattern from Contact.jsx)
- Submit form data to existing contact form endpoint using `submitContactForm()` from `@/api/contact`
- Include event name/ID in form submission for context
- Show success/error messages after submission
- Auto-close modal on successful submission after brief delay

**Scroll-Triggered Animations**
- Add scroll-triggered animations using `initScrollAnimations()` utility from `@/utils/scrollAnimations`
- Apply staggered reveal animations to event cards (50-100ms delays between cards)
- Use `.ftco-animate` class pattern for animation triggers
- Respect `prefers-reduced-motion` setting for accessibility
- Animations should be subtle and enhance without overwhelming (fade-in, slide-up effects)

**Remove CASSI Events from Codebase**
- Remove all CASSI event objects from `events.json` (keep only COT and CSIR events)
- Remove `cassi` from `eventTypes` object in `events.json`
- Remove `getCASSIEvents()` function calls from `GolfEvents.jsx`
- Remove CASSI event loading and state from `GolfEvents.jsx`
- Update `Home.jsx` to remove CASSI event loading and display (only show COT and CSIR on homepage)
- Remove `getCASSIEvents` export from `eventData.js` if no longer needed elsewhere

**Responsive Design**
- Ensure featured events section adapts to all screen sizes
- Mobile: Stack event cards vertically with full width
- Tablet: Show 2 cards side-by-side or stacked based on available space
- Desktop: Show 2 cards side-by-side, adaptable to 3 cards in a row
- Search and filter controls should be responsive and accessible on all devices
- Maintain touch-friendly button sizes and spacing on mobile

**Event Card Interaction**
- Maintain current click behavior: clicking card navigates to event sub-page (`/events/cot` or `/events/csir`)
- Add hover effects for visual feedback (scale, shadow, or color transitions)
- Ensure cards are keyboard accessible with proper focus states
- Display event metadata (title, date, location) prominently on cards
- Use event images from events.json data (hero images or gallery previews)

## Visual Design

No visual assets provided.

## Existing Code to Leverage

**EventCard Component (`BlackEagleGroup.React/src/components/EventCard.jsx`)**
- Reuse or enhance existing EventCard component for featured events display
- Component already handles image display, overlay, and navigation
- Can be extended to support event-specific styling variants and "Register Interest" button
- Follows existing pattern with Link component for navigation

**EventContactModal Component (`BlackEagleGroup.React/src/components/EventContactModal.jsx`)**
- Reuse EventContactModal for "Register Interest" functionality
- Component already uses shadcn/ui Dialog, React Hook Form, and form validation
- Can be adapted to include event-specific fields and context
- Handles form submission, loading states, and success/error messages

**Contact Form API (`BlackEagleGroup.React/src/api/contact.js`)**
- Use existing `submitContactForm()` function for event registration submissions
- API already handles both PHP and Node.js backend configurations
- Includes error handling and response formatting
- Can be extended to include event context in form data

**Event Data Utilities (`BlackEagleGroup.React/src/utils/eventData.js`)**
- Use existing `getCOTEvents()` and `getCSIREvents()` functions for loading events
- Enhance existing `searchEvents()` function for keyword search functionality
- Follow existing async/await pattern and error handling approach
- Maintain consistency with existing event data structure

**Scroll Animations Utility (`BlackEagleGroup.React/src/utils/scrollAnimations.js`)**
- Reuse `initScrollAnimations()` function for scroll-triggered animations
- Follow existing pattern with `.ftco-animate` class and Intersection Observer
- Respects `prefers-reduced-motion` for accessibility
- Can use `useScrollAnimation` hook for more granular control if needed

## Out of Scope

- Changes to individual event sub-pages (COT/CSIR detail pages at `/events/cot` and `/events/csir`)
- Modifications to event data structure beyond removing CASSI events
- Backend API changes (using existing contact form endpoint)
- Changes to other pages beyond Home.jsx (for CASSI removal)
- Advanced filtering options beyond date and keyword search
- Event calendar view or timeline visualization
- Event detail previews or tooltips on hover
- Social sharing functionality for events
- Event favorites or bookmarking features
- Integration with external event management systems
