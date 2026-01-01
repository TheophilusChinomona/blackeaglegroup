# Tasks: Contact Page Brand Redesign - Phase 2

**Spec:** `agent-os/specs/2026-01-02-contact-page-brand-redesign/spec.md`  
**Status:** Complete  
**Created:** 2026-01-02

---

## Overview

This tasks list breaks down Phase 2 of the brand guide CSS redesign into actionable, sequential tasks. The focus is on redesigning the Contact page while creating reusable form components for future site-wide application.

**Estimated Timeline:** 3-4 days  
**Total Tasks:** 28

---

## Task Groups

### Group 1: Form Components Setup (Day 1) - 6 tasks

**Goal:** Create reusable brand-styled form components (BrandInput, BrandTextarea) that can be used on the Contact page and reused across the site.

#### 1.1: Create Form Components Directory - [x]
- **Action:** Create new directory structure
- **Details:**
  - Create `BlackEagleGroup.React/src/components/form/` directory
  - This will house all brand form components
- **Acceptance Criteria:**
  - Directory exists at `src/components/form/`

#### 1.2: Create BrandInput Component - [x]
- **File:** `BlackEagleGroup.React/src/components/form/BrandInput.jsx`
- **Description:** Create brand-styled input field component
- **Details:**
  - Accept props: label, error, className, and all standard input props
  - Use forwardRef for react-hook-form compatibility
  - Include label rendering (optional)
  - Include error message rendering (optional)
  - Apply brand styling classes
- **Acceptance Criteria:**
  - Component accepts all required props
  - Works with react-hook-form
  - Renders label when provided
  - Renders error message when provided
  - Has correct default styling

#### 1.3: Create BrandTextarea Component - [x]
- **File:** `BlackEagleGroup.React/src/components/form/BrandTextarea.jsx`
- **Description:** Create brand-styled textarea component
- **Details:**
  - Accept props: label, error, className, rows, and all standard textarea props
  - Use forwardRef for react-hook-form compatibility
  - Include label rendering (optional)
  - Include error message rendering (optional)
  - Default rows to 6
  - Apply brand styling classes
- **Acceptance Criteria:**
  - Component accepts all required props
  - Works with react-hook-form
  - Renders label when provided
  - Renders error message when provided
  - Has correct default styling

#### 1.4: Create Form Components Index Export - [x]
- **File:** `BlackEagleGroup.React/src/components/form/index.js`
- **Description:** Create index file for easy imports
- **Details:**
  - Export BrandInput
  - Export BrandTextarea
- **Acceptance Criteria:**
  - Can import components from `@/components/form`

#### 1.5: Add Form Styling to index.css - [x]
- **File:** `BlackEagleGroup.React/src/index.css`
- **Description:** Add brand form styling utilities
- **Details:**
  - Add `.brand-form-group` styles
  - Add `.brand-form-label` styles
  - Add `.brand-input` styles with focus states
  - Add `.brand-input-error` styles
  - Add `.brand-textarea` styles with focus states
  - Add `.brand-textarea-error` styles
  - Add `.brand-form-error` message styles
  - Include responsive styles for mobile (44px min-height)
- **Acceptance Criteria:**
  - All form utility classes are defined
  - Focus states use brand green (#4B9400)
  - Error states use red (#dc2626)
  - Transitions are smooth (0.3s ease)
  - Mobile touch targets meet 44px minimum

#### 1.6: Test Form Components - [x]
- **Description:** Test form components in isolation
- **Details:**
  - Test BrandInput with/without label
  - Test BrandInput with/without error
  - Test BrandInput focus states
  - Test BrandTextarea with/without label
  - Test BrandTextarea with/without error
  - Test BrandTextarea focus states
  - Test mobile responsiveness
- **Acceptance Criteria:**
  - All component states work correctly
  - Focus states are visible
  - Error states display correctly
  - Components work with react-hook-form

---

### Group 2: ContactInfoCard Component (Day 1-2) - 5 tasks

**Goal:** Create a combined contact information card component displaying Address, Phone, and Email in a single styled card.

#### 2.1: Create ContactInfoCard Component - [x]
- **File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx`
- **Description:** Create combined contact info card component
- **Details:**
  - Import Lucide icons (MapPin, Phone, Mail)
  - Create card structure with title and 3-column grid
  - Include Address info (hardcoded for now)
  - Include Phone info with tel: links
  - Include Email info with mailto: link
  - Accept className prop for customization
- **Acceptance Criteria:**
  - Component renders all contact information
  - Icons display correctly
  - Links are clickable and functional
  - Structure matches spec design

#### 2.2: Style ContactInfoCard Container - [x]
- **File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx` or `src/styles/contact.css`
- **Description:** Apply brand styling to card container
- **Details:**
  - White background
  - Border-radius: 12px
  - Border-top: 4px solid brand-primary (#4B9400)
  - Box-shadow: var(--shadow-card)
  - Padding: 2.5rem
  - Max-width: 900px, centered
- **Acceptance Criteria:**
  - Card has white background and rounded corners
  - 4px green top border is visible
  - Shadow creates proper elevation
  - Card is centered on page

#### 2.3: Style ContactInfoCard Title - [x]
- **File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx`
- **Description:** Style the "Get in Touch" title
- **Details:**
  - Font: Playfair Display
  - Size: 2rem
  - Weight: 500
  - Color: var(--color-dark)
  - Text-align: center
  - Margin-bottom: 2rem
- **Acceptance Criteria:**
  - Title uses serif font
  - Size and weight are correct
  - Centered and properly spaced

#### 2.4: Style ContactInfoCard Grid Items - [x]
- **File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx`
- **Description:** Style the contact info items and icons
- **Details:**
  - 3-column grid layout with 2rem gap
  - Icon container: 56px circle, cream background, green icon
  - Label: uppercase, 12px, green, letter-spacing
  - Content: 15px, text color, centered
  - Links: text color, hover to green
- **Acceptance Criteria:**
  - Grid displays 3 columns on desktop
  - Icons are properly styled in circles
  - Labels use subheading pattern
  - Content is readable
  - Links have hover states

#### 2.5: Add ContactInfoCard Mobile Styles - [x]
- **File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx`
- **Description:** Add responsive styles for mobile
- **Details:**
  - Grid stacks to single column below 768px
  - Reduce padding to 1.5rem
  - Title reduces to 1.5rem
  - Adjust gap to 1.5rem
- **Acceptance Criteria:**
  - Card displays single column on mobile
  - Padding and spacing are comfortable
  - All content is readable
  - No horizontal overflow

---

### Group 3: Contact Page Layout (Day 2) - 8 tasks

**Goal:** Refactor the Contact page layout to use new components and apply brand styling to all sections.

#### 3.1: Create Contact Page Styles File - [x]
- **File:** `BlackEagleGroup.React/src/styles/contact.css` (NEW)
- **Description:** Create CSS file for Contact page specific styles
- **Details:**
  - Section backgrounds and padding
  - Contact form grid layout
  - Alert message styles (success/error)
  - Map container styles
  - Compliance section styles
- **Acceptance Criteria:**
  - All page-specific styles are defined
  - Styles are organized by section
  - Responsive media queries included

#### 3.2: Update Contact Info Section - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Replace 3 separate contact items with ContactInfoCard
- **Details:**
  - Remove existing contact-info div with 3 columns
  - Import ContactInfoCard component
  - Add section with cream background
  - Render ContactInfoCard component
  - Proper section padding (5rem / 3rem mobile)
- **Acceptance Criteria:**
  - Old contact info markup removed
  - ContactInfoCard renders in its place
  - Section has cream background
  - Proper spacing above and below

#### 3.3: Add Contact Form Section Header - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Add SectionHeader component above form
- **Details:**
  - Import SectionHeader component
  - Add label: "Send us a Message"
  - Add title: "Have a Question? We'd Love to Hear From You"
  - Center alignment
- **Acceptance Criteria:**
  - SectionHeader displays above form
  - Label is green uppercase
  - Title uses serif font
  - Centered alignment

#### 3.4: Refactor Form to Use Brand Components - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Replace form fields with BrandInput and BrandTextarea
- **Details:**
  - Import BrandInput, BrandTextarea from @/components/form
  - Replace Name input with BrandInput
  - Replace Email input with BrandInput (type="email")
  - Replace Subject input with BrandInput
  - Replace Message textarea with BrandTextarea
  - Connect to react-hook-form with proper register/errors
- **Acceptance Criteria:**
  - All form fields use brand components
  - Form validation still works
  - Error messages display correctly
  - Labels display correctly

#### 3.5: Update Form Layout Grid - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Update form to 2-column responsive grid
- **Details:**
  - Create 2-column grid container
  - Left column: Name, Email, Subject (stacked)
  - Right column: Message (full height)
  - Actions row spans both columns
  - Stack to single column on mobile
- **Acceptance Criteria:**
  - Desktop: 2-column layout
  - Message field fills right column height
  - Mobile: single column stack
  - Proper gap between columns

#### 3.6: Update Submit Button to Gold - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Change submit button to gold styling
- **Details:**
  - Replace current button class with btn-gold
  - Ensure proper padding (0.875rem 2rem)
  - Position at right (flex-end)
  - Keep loading state functionality
  - Full width on mobile
- **Acceptance Criteria:**
  - Button is gold (#C5A367)
  - Hover state works (lighter + shadow + lift)
  - Loading state shows spinner
  - Positioned correctly
  - Full width on mobile

#### 3.7: Update Alert Message Styles - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx` or `src/styles/contact.css`
- **Description:** Update success/error alert styling
- **Details:**
  - Success: green background tint, green border, dark green text
  - Error: red background tint, red border, dark red text
  - Padding: 1rem
  - Border-radius: 8px
  - Margin-bottom: 1rem
- **Acceptance Criteria:**
  - Success alert uses brand green
  - Error alert uses red
  - Alerts are properly styled with borders
  - Position above submit button

#### 3.8: Test Contact Form Functionality - [x]
- **Description:** Test form functionality after refactor
- **Details:**
  - Test form validation (empty fields)
  - Test email format validation
  - Test message minimum length
  - Test form submission (mock or real)
  - Test success message display
  - Test error message display
  - Test loading state
- **Acceptance Criteria:**
  - All validations work correctly
  - Success/error messages display
  - Loading state shows during submission
  - Form resets after successful submission

---

### Group 4: Google Maps Section (Day 2-3) - 3 tasks

**Goal:** Add styled container and section header to the Google Maps section.

#### 4.1: Add Maps Section Header - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Add SectionHeader above the map
- **Details:**
  - Use SectionHeader component
  - Label: "Our Location"
  - Title: "Find Us Here"
  - Center alignment
- **Acceptance Criteria:**
  - SectionHeader displays above map
  - Label and title formatted correctly
  - Centered alignment

#### 4.2: Style Map Container - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx` or `src/styles/contact.css`
- **Description:** Add styled container around map iframe
- **Details:**
  - Max-width: 1000px, centered
  - Border-radius: 12px
  - Overflow: hidden (to clip iframe corners)
  - Box-shadow: var(--shadow-card)
  - iframe: width 100%, height 400px (300px mobile)
- **Acceptance Criteria:**
  - Map has rounded corners
  - Shadow creates elevation
  - Map is responsive width
  - Proper height on mobile

#### 4.3: Update Maps Section Background - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Apply white background to maps section
- **Details:**
  - Section background: white
  - Padding: 5rem 0 (3rem mobile)
  - Ensure proper spacing from form section
- **Acceptance Criteria:**
  - Section has white background
  - Creates contrast with cream sections
  - Proper vertical padding

---

### Group 5: Compliance Section (Day 3) - 3 tasks

**Goal:** Restyle the Compliance section to match CTA pattern from Phase 1.

#### 5.1: Remove Background Image from Compliance - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Remove inline style background image
- **Details:**
  - Remove style={{ backgroundImage: "url('/images/bg_6.jpg')" }}
  - Remove overlay div
  - Remove img class if present
- **Acceptance Criteria:**
  - No background image on section
  - No overlay element
  - Clean section markup

#### 5.2: Apply CTA Pattern Styling - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Apply Deep Forest background with CTA styling
- **Details:**
  - Background: var(--color-dark) or bg-brand-dark
  - Padding: 4rem 0 (3rem mobile)
  - Text-align: center
  - Add green subheading label "Compliance"
  - White heading: "Our Regulatory Information"
  - White/gray content text
- **Acceptance Criteria:**
  - Dark background (#1A1C19)
  - White text with proper contrast
  - Green label matches subheading pattern
  - Centered content
  - Proper padding

#### 5.3: Update Compliance Content Styling - [x]
- **File:** `BlackEagleGroup.React/src/pages/Contact.jsx`
- **Description:** Update typography for compliance info
- **Details:**
  - Heading: Playfair Display, 2rem, white
  - Content: 1.125rem, rgba(255,255,255,0.8)
  - Line-height: 1.8
  - Proper margin between elements
  - Responsive sizing on mobile
- **Acceptance Criteria:**
  - Typography matches brand guide
  - PSIRA and Company Reg info visible
  - Readable on all screen sizes

---

### Group 6: Testing & QA (Day 3-4) - 3 tasks

**Goal:** Comprehensive testing and quality assurance before completion.

#### 6.1: Responsive Testing - [x]
- **Description:** Test Contact page at all breakpoints
- **Details:**
  - Test at 1920px (desktop large)
  - Test at 1280px (desktop)
  - Test at 992px (tablet landscape)
  - Test at 768px (tablet portrait)
  - Test at 576px (mobile large)
  - Test at 375px (mobile small)
  - Verify all sections respond correctly
  - Verify form layout switches at correct breakpoint
  - Verify touch targets are 44px minimum
- **Acceptance Criteria:**
  - No horizontal overflow at any breakpoint
  - Form stacks to single column on mobile
  - ContactInfoCard stacks on mobile
  - All text is readable
  - All touch targets meet 44px minimum

#### 6.2: Accessibility Audit - [x]
- **Description:** Run accessibility audit and fix issues
- **Details:**
  - Run axe DevTools scan
  - Run Lighthouse accessibility audit
  - Test keyboard navigation through form
  - Verify all form fields have labels
  - Verify focus states are visible
  - Test color contrast ratios
  - Verify error messages are announced
- **Acceptance Criteria:**
  - No accessibility violations in axe
  - Lighthouse accessibility score > 90
  - Keyboard navigation works completely
  - All form fields properly labeled
  - Focus visible on all interactive elements
  - Contrast ratios meet 4.5:1 minimum

#### 6.3: Final QA Checklist - [x]
- **Description:** Complete final QA checklist before marking complete
- **Details:**
  - ✓ Hero section displays correctly (already styled)
  - ✓ Contact info combined in single card
  - ✓ Card has 4px green top border
  - ✓ Form uses brand-styled components
  - ✓ Form layout is 2-column desktop, 1-column mobile
  - ✓ Gold submit button with hover states
  - ✓ Form validation works correctly
  - ✓ Success/error alerts styled correctly
  - ✓ Maps section has header and styled container
  - ✓ Compliance section matches CTA pattern
  - ✓ No complex animations (page is static)
  - ✓ Mobile responsive at all breakpoints
  - ✓ Touch targets meet 44px minimum
  - ✓ Cross-browser compatibility verified
  - ✓ Accessibility standards met
  - ✓ No console errors or warnings
  - ✓ Code is clean and well-documented
- **Acceptance Criteria:**
  - All checklist items pass
  - No critical issues remain
  - Ready for production deployment
  - Form components documented for reuse

---

## Task Status Legend

- ⏳ **Not Started** - Task has not been started yet
- 🚧 **In Progress** - Task is currently being worked on
- ✅ **Complete** - Task is finished and verified
- ⚠️ **Blocked** - Task is blocked by dependencies or issues
- ❌ **Cancelled** - Task has been cancelled or is no longer needed

---

## Dependencies & Prerequisites

### Before Starting
- [x] Dev environment is set up and running
- [x] Phase 1 CSS foundation is in place (verify brand colors in index.css)
- [x] SectionHeader component exists from Phase 1
- [x] btn-gold utility class exists from Phase 1
- [x] Git branch created for this work

### External Dependencies
- Google Fonts API (Playfair Display, Source Sans 3) - already configured
- Lucide React (icons) - already installed
- react-hook-form - already installed
- yup validation - already installed

### Task Dependencies

```
Group 1 (Form Components)
    └── Group 3.4 (Refactor Form)

Group 2 (ContactInfoCard)
    └── Group 3.2 (Update Contact Info Section)

Group 3 (Page Layout) - depends on Groups 1 & 2
    └── Group 6 (Testing)

Group 4 (Maps) - can run parallel to Group 3
Group 5 (Compliance) - can run parallel to Group 3
```

---

## Notes

### Reusable Components Created

This phase creates the following reusable components:

| Component | Location | Reuse Potential |
|-----------|----------|-----------------|
| BrandInput | src/components/form/ | All forms site-wide |
| BrandTextarea | src/components/form/ | All forms site-wide |
| ContactInfoCard | src/components/ | Event pages, footer |

### Testing Viewports
- Desktop: 1920x1080, 1280x720
- Tablet: 768x1024 (iPad)
- Mobile: 375x667 (iPhone SE), 390x844 (iPhone 12)

### Key Differences from Phase 1
- No complex scroll animations (page is static)
- Focus on form functionality
- Simpler page structure
- Fewer sections to style

### Code Review Checkpoints
- After Group 1 (Form Components) - verify components work in isolation
- After Group 3 (Page Layout) - verify full page integration
- After Group 6 (Testing) - final review before completion

---

**End of Tasks List**
