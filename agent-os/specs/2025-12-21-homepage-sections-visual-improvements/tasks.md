# Homepage Sections Visual Improvements - Tasks List

**Spec:** Homepage Sections Visual Improvements  
**Created:** December 21, 2025  
**Total Tasks:** 18  
**Estimated Effort:** Medium  

---

## Task Overview

| Group | Tasks | Status |
|-------|-------|--------|
| 1. Spacing & Layout Matching | 2 tasks | ✅ Completed |
| 2. Services Section Enhancements | 3 tasks | ✅ Completed |
| 3. Why Choose Us Section Enhancements | 3 tasks | ✅ Completed |
| 4. Dedication Section Enhancements | 3 tasks | ✅ Completed |
| 5. Animation Implementation | 3 tasks | ✅ Completed |
| 6. Responsive & Polish | 2 tasks | ✅ Completed |
| 7. Verification | 2 tasks | ⏳ Pending |

---

## Group 1: Spacing & Layout Matching

Foundation work - must match live site spacing before visual enhancements.

### Task 1.1: Analyze and Document Live Site Spacing
**File:** Reference `public_html/index.html` and `public_html/css/style.css`  
**Priority:** 🔴 High  
**Dependencies:** None  

**Description:**
Analyze the live site HTML structure and CSS to document exact spacing values for all three sections.

**Acceptance Criteria:**
- [x] Document exact section padding values from `.ftco-section` (6em = 96px)
- [x] Document which sections use `.ftco-no-pt` and `.ftco-no-pb` classes
- [x] Document internal spacing: card padding, heading margins, section gaps
- [x] Document responsive breakpoint behavior from live site
- [x] Create spacing reference document or notes for implementation

**Reference Files:**
- `public_html/index.html` (lines 101-234)
- `public_html/css/style.css` (lines 8884-8950, 9049-9222)

---

### Task 1.2: Apply Spacing to React Components
**File:** `BlackEagleGroup.React/src/pages/Home.jsx` and `BlackEagleGroup.React/src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1  

**Description:**
Update React components and CSS to match exact spacing from live site.

**Acceptance Criteria:**
- [x] Apply `.ftco-section` padding `6em 0` (96px) to all three sections
- [x] Apply `.ftco-no-pt` and `.ftco-no-pb` classes correctly to match live site
- [x] Match internal spacing: card padding (`py-md-4`), heading margins (`mb-5`, `mb-2`, `mb-4`, `mb-3`)
- [x] Match section gaps and spacing between elements
- [x] Verify spacing matches live site visually

**Code Reference:**
```css
/* Add/update in src/index.css */
.ftco-section {
  padding: 6em 0; /* 96px */
}

.ftco-no-pt {
  padding-top: 0;
}

.ftco-no-pb {
  padding-bottom: 0;
}
```

---

## Group 2: Services Section Enhancements

Enhance service cards with hover effects, shadows, and animations.

### Task 2.1: Enhance Service Card Hover Effects
**File:** `BlackEagleGroup.React/src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Add hover effects to service cards: subtle lift, shadow enhancement, and smooth transitions.

**Acceptance Criteria:**
- [x] Add hover state with `translateY(-4px)` for subtle lift effect
- [x] Enhance shadow on hover (use `--shadow-md` or `--shadow-lg`)
- [x] Add smooth transitions using GPU-accelerated properties (`transform`, `opacity`)
- [x] Ensure transitions are smooth (0.3s ease)
- [x] Maintain existing `.services` class structure
- [x] Keep all existing content (icons/images and headings) unchanged

**Code Reference:**
```css
/* Add to src/index.css */
.services {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.services:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

### Task 2.2: Implement Scroll-Triggered Staggered Animations
**File:** `BlackEagleGroup.React/src/pages/Home.jsx` and `BlackEagleGroup.React/src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 2.1  

**Description:**
Implement scroll-triggered staggered reveal animations for service cards (50ms delay between cards).

**Acceptance Criteria:**
- [x] Add `.ftco-animate` class to service cards
- [x] Implement scroll detection using Intersection Observer or similar
- [x] Apply staggered animation delays (0ms, 50ms, 100ms, 150ms for 4 cards)
- [x] Use fadeIn or fadeInUp animation from existing keyframes
- [x] Respect `prefers-reduced-motion` setting for accessibility
- [x] Ensure animations are performant (GPU-accelerated)

**Reference:**
- Existing animation pattern: `public_html/js/main.js` (lines 202-236)
- Existing keyframes: `BlackEagleGroup.React/src/index.css` (lines 712-721)

---

### Task 2.3: Verify Services Section Visual Quality
**File:** `BlackEagleGroup.React/src/pages/Home.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 2.2  

**Description:**
Verify services section matches live site spacing and has enhanced visual effects.

**Acceptance Criteria:**
- [x] Spacing matches live site exactly
- [x] Hover effects work smoothly on all cards
- [x] Staggered animations trigger on scroll
- [x] All 4 service cards display correctly
- [x] Responsive behavior maintained
- [x] No content changes (icons/images and headings preserved)

---

## Group 3: Why Choose Us Section Enhancements

Enhance styling while maintaining split layout structure.

### Task 3.1: Enhance Typography and Visual Styling
**File:** `BlackEagleGroup.React/src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Improve typography hierarchy, add subtle decorative elements, and refine spacing for Why Choose Us section.

**Acceptance Criteria:**
- [x] Enhance `.heading-section` styling with better hierarchy
- [x] Improve subheading styling (color, spacing, typography)
- [x] Refine paragraph spacing and readability
- [x] Add subtle decorative elements if appropriate (borders, underlines)
- [x] Maintain existing `.wrap-about` and `.heading-section` classes
- [x] Ensure image background maintains proper aspect ratio and positioning

**Code Reference:**
```css
/* Enhance in src/index.css */
.wrap-about .heading-section {
  /* Enhanced typography hierarchy */
}

.wrap-about .subheading {
  color: var(--color-primary);
  /* Enhanced styling */
}
```

---

### Task 3.2: Implement Staggered Text Reveal Animations
**File:** `BlackEagleGroup.React/src/pages/Home.jsx` and `BlackEagleGroup.React/src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 3.1  

**Description:**
Implement scroll-triggered staggered text reveals (heading first, then paragraphs with delays).

**Acceptance Criteria:**
- [x] Add animation classes to heading and paragraphs
- [x] Implement scroll detection for section
- [x] Stagger animations: heading (0ms), first paragraph (100ms), second paragraph (200ms), third paragraph (300ms), subheading (400ms), button (500ms)
- [x] Use fadeIn or fadeInUp animations
- [x] Respect `prefers-reduced-motion` setting
- [x] Ensure animations don't distract from content readability

---

### Task 3.3: Verify Why Choose Us Section Visual Quality
**File:** `BlackEagleGroup.React/src/pages/Home.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 3.2  

**Description:**
Verify Why Choose Us section matches live site spacing and has enhanced styling.

**Acceptance Criteria:**
- [x] Spacing matches live site exactly
- [x] Split layout maintained (image left, text right)
- [x] Typography hierarchy improved
- [x] Staggered text animations work on scroll
- [x] Image background displays correctly
- [x] All content preserved (no text changes)

---

## Group 4: Dedication Section Enhancements

Enhance dedication cards with hover effects and animations.

### Task 4.1: Enhance Dedication Card Hover Effects
**File:** `BlackEagleGroup.React/src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Add hover effects to dedication cards: lift animation, shadow enhancement, icon border color transitions.

**Acceptance Criteria:**
- [x] Add hover state with `translateY(-4px)` for lift effect
- [x] Enhance shadow on hover
- [x] Add icon border color transition (green to gold on hover)
- [x] Maintain existing circular icon borders (90px diameter, green border)
- [x] Use `.services.services-2` class with enhanced hover states
- [x] Ensure white text remains readable against dark background

**Code Reference:**
```css
/* Add to src/index.css */
.services.services-2 {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
}

.services.services-2:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.services.services-2:hover .icon {
  border-color: var(--color-accent);
  transition: border-color 0.3s ease;
}
```

---

### Task 4.2: Implement Staggered Card Reveal Animations
**File:** `BlackEagleGroup.React/src/pages/Home.jsx` and `BlackEagleGroup.React/src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 4.1  

**Description:**
Implement scroll-triggered staggered card reveals (100ms delay between cards).

**Acceptance Criteria:**
- [x] Add `.ftco-animate` class to dedication cards
- [x] Implement scroll detection for section
- [x] Apply staggered animation delays (0ms, 100ms, 200ms, 300ms for 4 cards)
- [x] Use fadeIn or fadeInUp animation
- [x] Respect `prefers-reduced-motion` setting
- [x] Ensure animations are performant

---

### Task 4.3: Verify Dedication Section Visual Quality
**File:** `BlackEagleGroup.React/src/pages/Home.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 4.2  

**Description:**
Verify Dedication section matches live site spacing and has enhanced visual effects.

**Acceptance Criteria:**
- [x] Spacing matches live site exactly
- [x] Dark overlay background maintained
- [x] Hover effects work smoothly on all cards
- [x] Icon border color transitions work
- [x] Staggered animations trigger on scroll
- [x] White text remains readable
- [x] All 4 dedication cards display correctly

---

## Group 5: Animation Implementation

Centralized animation system and scroll detection.

### Task 5.1: Create Scroll Detection Utility
**File:** `BlackEagleGroup.React/src/utils/scrollAnimations.js` or similar  
**Priority:** 🟡 Medium  
**Dependencies:** None  

**Description:**
Create a reusable scroll detection utility using Intersection Observer for triggering animations.

**Acceptance Criteria:**
- [x] Create utility function/hook for scroll detection
- [x] Use Intersection Observer API for performance
- [x] Support staggered animation delays
- [x] Respect `prefers-reduced-motion` setting
- [x] Return animation state (visible/hidden)
- [x] Handle cleanup on unmount

**Alternative:** Use existing animation library (Framer Motion, React Spring) if preferred.

---

### Task 5.2: Integrate Animation System
**File:** `BlackEagleGroup.React/src/pages/Home.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 5.1, Task 2.2, Task 3.2, Task 4.2  

**Description:**
Integrate scroll detection utility into all three sections for consistent animation behavior.

**Acceptance Criteria:**
- [x] Integrate scroll detection into Services section
- [x] Integrate scroll detection into Why Choose Us section
- [x] Integrate scroll detection into Dedication section
- [x] Ensure consistent animation timing and behavior
- [x] Verify all animations trigger correctly on scroll
- [x] Test with `prefers-reduced-motion` enabled

---

### Task 5.3: Optimize Animation Performance
**File:** `BlackEagleGroup.React/src/index.css`  
**Priority:** 🟢 Low  
**Dependencies:** Task 5.2  

**Description:**
Optimize animations for performance using GPU-accelerated properties.

**Acceptance Criteria:**
- [x] Use `transform` and `opacity` for all animations (GPU-accelerated)
- [x] Add `will-change` property to animated elements
- [x] Ensure smooth 60fps animations
- [x] Test performance on mobile devices
- [x] Verify no layout shifts during animations

---

## Group 6: Responsive & Polish

Ensure enhancements work across all devices.

### Task 6.1: Responsive Design Verification
**File:** `BlackEagleGroup.React/src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** All previous task groups  

**Description:**
Verify all enhancements work correctly across mobile, tablet, and desktop breakpoints.

**Acceptance Criteria:**
- [ ] Test Services section on mobile (320px-768px), tablet (768px-1024px), desktop (1024px+)
- [ ] Test Why Choose Us section on all breakpoints
- [ ] Test Dedication section on all breakpoints
- [ ] Verify spacing scales appropriately
- [ ] Verify hover effects work on touch devices (or provide touch alternatives)
- [ ] Verify animations don't cause performance issues on mobile
- [ ] Ensure text remains readable at all sizes

---

### Task 6.2: Final Visual Polish
**File:** `BlackEagleGroup.React/src/index.css` and `BlackEagleGroup.React/src/pages/Home.jsx`  
**Priority:** 🟢 Low  
**Dependencies:** Task 6.1  

**Description:**
Apply final polish: refine transitions, ensure consistency, and verify theme alignment.

**Acceptance Criteria:**
- [x] Refine transition timings for consistency
- [x] Ensure all colors match existing theme (green, gold, charcoal, cream)
- [x] Verify typography consistency (Playfair Display, Source Sans 3)
- [x] Check shadow consistency across all sections
- [x] Ensure visual enhancements complement hero section
- [x] Verify no visual regressions

---

## Group 7: Verification

Final checks and validation.

### Task 7.1: Visual Comparison with Live Site
**Priority:** 🟡 Medium  
**Dependencies:** All previous task groups  

**Description:**
Compare enhanced sections with live site to verify spacing and visual quality match.

**Acceptance Criteria:**
- [ ] Services section spacing matches live site
- [ ] Why Choose Us section spacing matches live site
- [ ] Dedication section spacing matches live site
- [ ] Visual enhancements are noticeable but don't break theme
- [ ] All content preserved (no text or structural changes)
- [ ] Theme consistency maintained

---

### Task 7.2: Cross-Browser Testing
**Priority:** 🟢 Low  
**Dependencies:** Task 7.1  

**Description:**
Test enhanced sections across different browsers and devices.

**Acceptance Criteria:**
- [ ] Test in Chrome (latest)
- [ ] Test in Firefox (latest)
- [ ] Test in Safari (latest)
- [ ] Test in Edge (latest)
- [ ] Test on mobile Safari (iOS)
- [ ] Test on Chrome Mobile (Android)
- [ ] Verify animations work in all browsers
- [ ] Verify hover effects work appropriately
- [ ] No layout breaking issues

---

## Execution Order

Recommended implementation sequence:
1. Spacing & Layout Matching (Group 1) - Foundation, must be done first
2. Services Section Enhancements (Group 2) - Can be done in parallel with Groups 3-4
3. Why Choose Us Section Enhancements (Group 3) - Can be done in parallel with Groups 2-4
4. Dedication Section Enhancements (Group 4) - Can be done in parallel with Groups 2-3
5. Animation Implementation (Group 5) - Depends on Groups 2-4
6. Responsive & Polish (Group 6) - Depends on all previous groups
7. Verification (Group 7) - Final step, depends on all previous groups

---

## Quick Reference

| Task | File | Priority |
|------|------|----------|
| 1.1 | Reference files | 🔴 High |
| 1.2 | `src/pages/Home.jsx`, `src/index.css` | 🔴 High |
| 2.1 | `src/index.css` | 🔴 High |
| 2.2 | `src/pages/Home.jsx`, `src/index.css` | 🟡 Medium |
| 2.3 | `src/pages/Home.jsx` | 🟡 Medium |
| 3.1 | `src/index.css` | 🔴 High |
| 3.2 | `src/pages/Home.jsx`, `src/index.css` | 🟡 Medium |
| 3.3 | `src/pages/Home.jsx` | 🟡 Medium |
| 4.1 | `src/index.css` | 🔴 High |
| 4.2 | `src/pages/Home.jsx`, `src/index.css` | 🟡 Medium |
| 4.3 | `src/pages/Home.jsx` | 🟡 Medium |
| 5.1 | `src/utils/scrollAnimations.js` | 🟡 Medium |
| 5.2 | `src/pages/Home.jsx` | 🟡 Medium |
| 5.3 | `src/index.css` | 🟢 Low |
| 6.1 | `src/index.css` | 🟡 Medium |
| 6.2 | `src/index.css`, `src/pages/Home.jsx` | 🟢 Low |
| 7.1 | N/A (testing) | 🟡 Medium |
| 7.2 | N/A (testing) | 🟢 Low |

