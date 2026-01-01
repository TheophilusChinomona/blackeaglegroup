# Spec Requirements: Events Page Redesign (COT and CSIR Only)

## Initial Description

Redesign events page. Currently all the events are shown there and clicking the card opens the event sub page. What I want is to only keep the events for COT and CSIR only the rest can be removed from events.json

## Requirements Discussion

### First Round Questions

**Q1:** Design Aesthetic Direction: I'm assuming you want the redesigned events page to match the premium/luxury aesthetic of your recently redesigned About page and homepage. Should we use a similar design language with scroll-triggered animations, refined typography, and sophisticated visual treatments, or do you prefer a different aesthetic direction (e.g., more minimalist, more dynamic, event-focused with energy)?

**Answer:** Event focused

**Q2:** Layout Approach: Currently, events are displayed in a grid of cards. For the redesign with only COT and CSIR (2 events), I'm thinking we could either:
- Keep a card-based grid but make the cards larger and more prominent
- Create a split-screen or side-by-side layout showcasing both events equally
- Design a featured hero section for one event with the other as a secondary card
Which approach do you prefer, or do you have another layout in mind?

**Answer:** I want a featured events section that will show the two event cards side by side but this should adapt to 3 events in a row. I should also be able to search for events or filter by date etc

**Q3:** Card Interaction: Currently, clicking a card navigates to the event sub-page. Should we keep this behavior, or would you like to add hover effects, preview information, or other interactive elements before navigation?

**Answer:** Keep current behaviour

**Q4:** Visual Elements: Should the redesigned page include:
- Event images from the events.json data (hero images, gallery previews)?
- Event metadata prominently displayed (dates, locations, descriptions)?
- Call-to-action buttons or links?
- Any specific visual treatments like gradients, overlays, or decorative elements?

**Answer:** New events (that haven't happened yet) should have a call to action button to register interest for the event and this goes to the email for forms

**Q5:** Data Cleanup Scope: When removing CASSI events from events.json, should we also:
- Remove the `getCASSIEvents()` function calls from GolfEvents.jsx?
- Remove CASSI from the eventTypes object in events.json?
- Update any other files that reference CASSI events (like Home.jsx which also loads CASSI events)?

**Answer:** Yes

**Q6:** Responsive Design: Should the redesigned layout maintain the same responsive breakpoints as the current implementation, or do you want a different mobile/tablet experience?

**Answer:** Yes but it should be responsive to screen size

**Q7:** Animation & Motion: Given your recent About page redesign included scroll-triggered animations, should the events page include similar motion effects (staggered reveals, fade-ins, etc.) or keep animations minimal?

**Answer:** Yes to animations

**Q8:** Typography & Branding: Should we use the same typography system and color palette as the homepage/About page, or introduce event-specific styling that differentiates COT and CSIR visually?

**Answer:** Introduce event specific styling

### Existing Code to Reference

**Similar Features Identified:**
- **EventCard Component**: `BlackEagleGroup.React/src/components/EventCard.jsx` - Prominent call-to-action card for event promotions, used on Home.jsx
- **EventContactForm Component**: `BlackEagleGroup.React/src/components/EventContactForm.jsx` - Dynamic contact form based on JSON configuration, can be reused for "register interest" functionality
- **EventContactModal Component**: `BlackEagleGroup.React/src/components/EventContactModal.jsx` - Modal component for event contact forms
- **Contact Form API**: `BlackEagleGroup.React/src/api/contact.js` - Contains `submitContactForm()` function for form submissions
- **Event Data Utilities**: `BlackEagleGroup.React/src/utils/eventData.js` - Contains `searchEvents()` function that searches events by keyword (title, subtitle, description, location)
- **Scroll Animations**: `BlackEagleGroup.React/src/utils/scrollAnimations.js` - Contains `initScrollAnimations()` function used in About page redesign
- **Home.jsx Events Section**: Uses EventCard component in a grid layout (md={6} lg={4}) - can reference for responsive grid patterns

### Follow-up Questions

No follow-up questions needed - all requirements are clear.

## Visual Assets

### Files Provided:

No visual assets provided.

### Visual Insights:

No visual assets to analyze.

## Requirements Summary

### Functional Requirements

- **Event Filtering**: Display only COT and CSIR events (remove CASSI events)
- **Featured Events Section**: Show event cards side-by-side (2 events), with layout that adapts to 3 events in a row for future scalability
- **Search Functionality**: Users can search for events by keyword (title, subtitle, description, location)
- **Filter Functionality**: Users can filter events by date and other criteria
- **Event Cards**: Clicking a card navigates to the event sub-page (maintain current behavior)
- **Future Events CTA**: New events (that haven't happened yet) should display a "Register Interest" call-to-action button
- **Register Interest Form**: CTA button opens a form/modal that submits to email endpoint for event registration
- **Event-Specific Styling**: Visual differentiation between COT and CSIR events through styling
- **Scroll Animations**: Include scroll-triggered animations (staggered reveals, fade-ins) similar to About page
- **Responsive Design**: Layout adapts to different screen sizes (mobile, tablet, desktop)

### Reusability Opportunities

- **EventCard Component**: Can be enhanced or reused for the featured events section
- **EventContactForm/EventContactModal**: Can be adapted for "Register Interest" functionality
- **submitContactForm API**: Can be used for event registration form submissions
- **searchEvents Function**: Already exists in eventData.js - can be enhanced for search/filter functionality
- **Scroll Animations Utility**: Can reuse `initScrollAnimations()` from About page redesign
- **Contact Form Components**: shadcn/ui Form components with React Hook Form + Yup validation (as used in Contact.jsx)

### Scope Boundaries

**In Scope:**
- Redesign GolfEvents.jsx page with event-focused aesthetic
- Remove CASSI events from events.json
- Remove CASSI references from GolfEvents.jsx, Home.jsx, and eventTypes object
- Create featured events section with side-by-side layout (adapts to 3 events)
- Implement search functionality for events
- Implement filter functionality (by date, etc.)
- Add "Register Interest" CTA button for future events
- Create event registration form/modal
- Apply event-specific styling to differentiate COT and CSIR
- Add scroll-triggered animations
- Ensure responsive design across all screen sizes

**Out of Scope:**
- Changes to individual event sub-pages (COT/CSIR detail pages)
- Changes to event data structure beyond removing CASSI events
- Backend API changes (using existing contact form endpoint)
- Changes to other pages beyond Home.jsx (for CASSI removal)

### Technical Considerations

- **Framework**: React with React Router for navigation
- **Styling**: Tailwind CSS with event-specific styling classes
- **Components**: 
  - Reuse/enhance EventCard component
  - Use EventContactForm or EventContactModal for registration
  - Use shadcn/ui components for form elements
- **State Management**: React hooks (useState, useEffect) for search/filter state
- **Animations**: Reuse scroll animations utility from About page
- **Form Handling**: React Hook Form with Yup validation (as used in Contact.jsx)
- **API Integration**: Use existing `submitContactForm()` from `@/api/contact`
- **Event Data**: Use existing `getCOTEvents()` and `getCSIREvents()` functions
- **Search**: Enhance existing `searchEvents()` function or create new filter functions
- **Date Filtering**: Need to parse event dates and compare with current date to determine "future events"
- **Responsive Grid**: Use React Bootstrap Grid (Container, Row, Col) or Tailwind grid classes
- **Event Detection**: Compare event.date with current date to show "Register Interest" CTA for future events

### Design Direction

- **Aesthetic**: Event-focused (energetic, dynamic, engaging)
- **Layout**: Featured events section with side-by-side cards (2 events, adaptable to 3)
- **Visual Differentiation**: Event-specific styling to distinguish COT and CSIR events
- **Interactions**: Hover effects, scroll animations, smooth transitions
- **Typography**: Event-focused typography (may differ from homepage/About page)
- **Color Palette**: Event-specific colors for COT and CSIR differentiation
