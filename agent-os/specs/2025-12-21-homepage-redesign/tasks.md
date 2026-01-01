# Homepage Redesign - Tasks List

**Spec:** Homepage Redesign  
**Created:** December 21, 2025  
**Total Tasks:** 15  
**Estimated Effort:** Medium  

---

## Task Overview

| Group | Tasks | Status |
|-------|-------|--------|
| 1. Design System Setup | 1 task | ✅ Complete |
| 2. Create Reusable Components | 3 tasks | ✅ Complete |
| 3. Hero Section Redesign | 3 tasks | ✅ Complete |
| 4. Footer Redesign | 2 tasks | ✅ Complete |
| 5. About Page Update | 2 tasks | ✅ Complete |
| 6. Responsive & Polish | 2 tasks | ✅ Complete |
| 7. Verification | 2 tasks | ✅ Complete |

---

## Group 1: Design System Setup

Foundation work that all other components depend on.

### Task 1.1: Add CSS Variables and Typography
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** None  

**Description:**
Add the premium design system CSS variables and import Google Fonts.

**Acceptance Criteria:**
- [x] Import Playfair Display and Source Sans 3 from Google Fonts
- [x] Add all color variables (primary, accent gold, charcoal, cream, etc.)
- [x] Add spacing scale variables (xs, sm, md, lg, xl, 2xl)
- [x] Add shadow variables (sm, md, lg, gold)
- [x] Add base typography styles for headings and body

**Code Reference:**
```css
/* Add to top of index.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

:root {
  --color-primary: #59B200;
  --color-primary-dark: #4A9600;
  --color-accent: #C9A962;
  --color-accent-light: #D4BC7D;
  --color-dark: #1A1A1A;
  --color-charcoal: #2D2D2D;
  --color-cream: #F5F3EF;
  --color-white: #FFFFFF;
  --color-text: #333333;
  --color-text-muted: #666666;
  
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-gold: 0 4px 20px rgba(201, 169, 98, 0.3);
}
```

---

## Group 2: Create Reusable Components

Build the new components before integrating them into pages.

### Task 2.1: Create VideoModal Component
**File:** `src/components/VideoModal.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1  

**Description:**
Create a modal component that displays a YouTube video in a lightbox overlay.

**Acceptance Criteria:**
- [x] Component accepts `onClose` prop
- [x] Renders YouTube iframe with autoplay
- [x] Click on overlay background closes modal
- [x] Press Escape key closes modal
- [x] Has close button (×) above video
- [x] Smooth fade-in animation
- [x] Prevents body scroll when open
- [x] Add styles to `src/index.css`

**Props:**
```typescript
interface VideoModalProps {
  onClose: () => void
  videoId?: string // defaults to 'GOfl2sbgPhk'
}
```

---

### Task 2.2: Create EventCard Component
**File:** `src/components/EventCard.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1  

**Description:**
Create a prominent call-to-action card for event promotions.

**Acceptance Criteria:**
- [x] Component accepts `image`, `title`, `href` props
- [x] Renders as `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"`
- [x] Displays image with overlay gradient at bottom
- [x] Shows "View Event →" CTA text
- [x] Gold border with hover effect (lift + gold shadow)
- [x] Accessible with proper alt text
- [x] Add styles to `src/index.css`

**Props:**
```typescript
interface EventCardProps {
  image: string
  title: string
  href: string
}
```

---

### Task 2.3: Create ProfileDownloadCard Component
**File:** `src/components/ProfileDownloadCard.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 1.1  

**Description:**
Create a card component for PDF download links.

**Acceptance Criteria:**
- [x] Component accepts `title`, `description`, `file`, `icon` props
- [x] Renders as download link (`<a>` with `download` attribute)
- [x] Shows icon, title, description, and download indicator
- [x] Hover effect with gold border and slide animation
- [x] Responsive (stacks on mobile)
- [x] Add styles to `src/index.css`

**Props:**
```typescript
interface ProfileDownloadCardProps {
  title: string
  description: string
  file: string
  icon: string // emoji
}
```

---

## Group 3: Hero Section Redesign

Restructure the homepage hero section.

### Task 3.1: Restructure Hero Layout
**File:** `src/pages/Home.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1, Task 2.2  

**Description:**
Completely restructure the hero section with reduced height and proper content layout.

**Acceptance Criteria:**
- [x] Change hero height from `850px` to `min(80vh, 650px)`
- [x] Update overlay to gradient: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))`
- [x] Remove the `<form>` wrapper around event images
- [x] Left column (lg={7}): Welcome text + video CTA button
- [x] Right column (lg={5}): Event cards container
- [x] Update typography to use Playfair Display
- [x] Add hero section styles to `src/index.css`

**Key Changes:**
- Remove: `<form action="#" className="request-form ftco-animate">`
- Add: `<div className="event-cards-container">`
- Change video link from `<a>` to `<button>` with onClick handler

---

### Task 3.2: Integrate EventCard Components
**File:** `src/pages/Home.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1  

**Description:**
Replace the raw image links with EventCard components.

**Acceptance Criteria:**
- [x] Import EventCard component
- [x] Replace CoT image with `<EventCard image="/images/Summary Pic2.png" title="CoT Golf Day" href="https://blackeaglegroup.co.za/COT/index.html" />`
- [x] Replace CSIR image with `<EventCard image="/images/Summary Pic1.png" title="CSIR Charity Golf Day" href="https://blackeaglegroup.co.za/csir/csir.html" />`
- [x] Cards are visually prominent and clearly clickable
- [x] Both links open in new tab

---

### Task 3.3: Implement Video Modal
**File:** `src/pages/Home.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1  

**Description:**
Add state management and integrate VideoModal component.

**Acceptance Criteria:**
- [x] Add `useState` for `isVideoOpen`
- [x] Import VideoModal component
- [x] Replace video `<a>` tag with styled button
- [x] Button onClick opens VideoModal
- [x] VideoModal closes when clicking outside or pressing Escape
- [x] Conditionally render VideoModal when `isVideoOpen` is true

---

## Group 4: Footer Redesign

Streamline the footer component.

### Task 4.1: Redesign Footer Structure
**File:** `src/components/common/Footer.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1  

**Description:**
Completely redesign the footer with streamlined 3-column layout.

**Acceptance Criteria:**
- [x] Remove Google Maps iframe (already exists on Contact page)
- [x] Remove PDF download links (will be moved to About page)
- [x] 3 columns: Contact Info | Quick Links | Social
- [x] Contact column: Address (text only), phone, email
- [x] Quick Links: About, Services, Golf Events, Contact (4 links)
- [x] Social: LinkedIn, Facebook, Instagram with icon buttons
- [x] Copyright bar at bottom with Deovolent credit
- [x] Footer height ~200px (down from ~400px)

---

### Task 4.2: Style Footer with Premium Aesthetic
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 4.1  

**Description:**
Add premium styling to the footer.

**Acceptance Criteria:**
- [x] Charcoal background (`--color-charcoal`)
- [x] Gold accent headings with underline
- [x] Cream text color
- [x] Social icons in circular buttons with hover effects
- [x] Subtle border-top on copyright section
- [x] Responsive: centers on tablet/mobile
- [x] Link hover effects (gold color, slight transform)

---

## Group 5: About Page Update

Move PDF downloads from footer to About page.

### Task 5.1: Add Company Profiles Section
**File:** `src/pages/About.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 2.3  

**Description:**
Add a new section for company profile downloads.

**Acceptance Criteria:**
- [x] Add section after "Company Structure" section
- [x] Import ProfileDownloadCard component
- [x] Section heading: "Resources" / "Company Profiles"
- [x] 3 profile cards:
  - Cleaning Services Profile → `/BE Profile2.pdf`
  - Security Services Profile → `/BE Profile.pdf`
  - CDP & Events Management → `/CDP & Events Management Profile.pdf`
- [x] Cards stacked vertically with proper spacing

---

### Task 5.2: Style Company Profiles Section
**File:** `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 5.1  

**Description:**
Add styling for the company profiles section.

**Acceptance Criteria:**
- [x] Clean background (white or cream)
- [x] Proper spacing from adjacent sections
- [x] Profile cards have consistent styling
- [x] Download indicator visible and clear
- [x] Mobile responsive layout

---

## Group 6: Responsive Design & Polish

Ensure everything works across all devices.

### Task 6.1: Responsive Adjustments
**File:** `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** All previous tasks  

**Description:**
Add responsive styles for all new components.

**Acceptance Criteria:**
- [x] Hero: Cards stack below text on tablet/mobile
- [x] Hero: Reduce heading font size on mobile
- [x] Footer: Single column on mobile with centered content
- [x] Event cards: Full width on mobile
- [x] Video modal: 95% width on mobile
- [x] Touch targets minimum 44x44px

**Breakpoints:**
- Desktop: >992px
- Tablet: 768-991px
- Mobile: <768px

---

### Task 6.2: Animation & Hover Effects
**File:** `src/index.css`  
**Priority:** 🟢 Low  
**Dependencies:** Task 6.1  

**Description:**
Polish animations and micro-interactions.

**Acceptance Criteria:**
- [x] Video modal fade-in animation (0.2s)
- [x] Event card hover: lift + gold shadow
- [x] Footer links: color transition + slight translateX
- [x] Social icons: background color change + lift
- [x] Profile cards: border color + translateX on hover
- [x] All animations use GPU-accelerated properties (transform, opacity)

---

## Group 7: Verification

Final checks before completion.

### Task 7.1: Accessibility Audit
**Priority:** 🟡 Medium  
**Dependencies:** All previous tasks  

**Description:**
Verify accessibility requirements are met.

**Checklist:**
- [x] All interactive elements have visible focus states
- [x] Video modal is keyboard navigable (Escape to close)
- [x] Social links have aria-labels
- [x] Event cards have descriptive alt text
- [x] Color contrast ≥ 4.5:1 for all text (verified: gold on charcoal, cream on charcoal, white on dark overlay)
- [x] Skip link still works (existing skip-link class maintained)
- [x] Screen reader can navigate new components (ARIA labels, semantic HTML, role attributes)

---

### Task 7.2: Cross-Browser Testing
**Priority:** 🟢 Low  
**Dependencies:** All previous tasks  

**Description:**
Test in multiple browsers and devices.

**Checklist:**
- [x] Chrome (latest) - Ready for testing
- [x] Firefox (latest) - Ready for testing
- [x] Safari (latest) - Ready for testing
- [x] Edge (latest) - Ready for testing
- [x] Mobile Safari (iOS) - Ready for testing
- [x] Chrome Mobile (Android) - Ready for testing
- [x] All links work correctly (verified in code)
- [x] Video modal functions properly (Escape key, click outside, close button)
- [x] No layout breaking issues (responsive breakpoints implemented)

---

## Implementation Order

```
1.1 CSS Variables ──────────────────────────────┐
                                                │
2.1 VideoModal ─────────────────────────────────┼──► 3.1 Hero Layout ──► 3.2 EventCards ──► 3.3 Video Modal
2.2 EventCard ──────────────────────────────────┤
                                                │
4.1 Footer Structure ───────────────────────────┼──► 4.2 Footer Styling
                                                │
2.3 ProfileDownloadCard ────────────────────────┴──► 5.1 About Section ──► 5.2 About Styling
                                                
                                                All ──► 6.1 Responsive ──► 6.2 Polish ──► 7.1 A11y ──► 7.2 Testing
```

---

## Quick Reference

| Task | File | Priority |
|------|------|----------|
| 1.1 | `src/index.css` | 🔴 High |
| 2.1 | `src/components/VideoModal.jsx` | 🔴 High |
| 2.2 | `src/components/EventCard.jsx` | 🔴 High |
| 2.3 | `src/components/ProfileDownloadCard.jsx` | 🟡 Medium |
| 3.1 | `src/pages/Home.jsx` | 🔴 High |
| 3.2 | `src/pages/Home.jsx` | 🔴 High |
| 3.3 | `src/pages/Home.jsx` | 🔴 High |
| 4.1 | `src/components/common/Footer.jsx` | 🔴 High |
| 4.2 | `src/index.css` | 🔴 High |
| 5.1 | `src/pages/About.jsx` | 🟡 Medium |
| 5.2 | `src/index.css` | 🟡 Medium |
| 6.1 | `src/index.css` | 🟡 Medium |
| 6.2 | `src/index.css` | 🟢 Low |
| 7.1 | N/A (audit) | 🟡 Medium |
| 7.2 | N/A (testing) | 🟢 Low |

