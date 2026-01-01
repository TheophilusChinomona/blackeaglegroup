# About Page Redesign - Tasks List

**Spec:** About Page Redesign  
**Created:** December 23, 2025  
**Total Tasks:** 20  
**Estimated Effort:** Medium-High  

---

## Task Overview

| Group | Tasks | Status |
|-------|-------|--------|
| 1. Foundation & Spacing | 2 tasks | ✅ Complete |
| 2. Split Layout Sections | 4 tasks | ✅ Complete |
| 3. Dark Background Sections | 3 tasks | ✅ Complete |
| 4. Team Member Cards | 3 tasks | ✅ Complete |
| 5. Compliance Cards | 2 tasks | ✅ Complete |
| 6. Animations | 2 tasks | ✅ Complete |
| 7. Responsive & Polish | 2 tasks | ✅ Complete |
| 8. Verification | 2 tasks | ⏳ Pending |

---

## Group 1: Foundation & Spacing

Foundation work that all other components depend on.

### Task 1.1: Apply Uniform Section Spacing
**File:** `src/pages/About.jsx` and `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** None  

**Description:**
Apply uniform 80px spacing between all sections, matching homepage redesign.

**Acceptance Criteria:**
- [x] Remove manual `<br />` spacing hacks (lines 212-214)
- [x] Apply consistent `.ftco-section` padding: `5rem 0` (80px)
- [x] Standardize `.ftco-no-pt` and `.ftco-no-pb` usage
- [x] Verify uniform spacing between all 10 sections
- [x] Test spacing on all breakpoints

**Code Reference:**
```css
/* Add/update in src/index.css */
.ftco-section {
  padding: 5rem 0; /* 80px uniform spacing */
}

.about-split-section {
  padding: 5rem 0;
}
```

---

### Task 1.2: Add About Page CSS Foundation
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** None  

**Description:**
Add base CSS classes and variables for About page components.

**Acceptance Criteria:**
- [x] Add `.about-split-section` base styles
- [x] Add `.about-image-col` and `.about-image-wrapper` styles
- [x] Add `.compliance-section` base styles
- [x] Add `.team-member-col` base styles
- [x] Ensure all use existing design system variables

---

## Group 2: Split Layout Sections

Enhance the four split layout sections with premium styling and animations.

### Task 2.1: Enhance Split Section Images
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Add hover effects and styling to split section images.

**Acceptance Criteria:**
- [x] Add `.about-image` styles with hover scale effect (1.05)
- [x] Add brightness increase on hover (10%)
- [x] Smooth transitions (0.6s cubic-bezier)
- [x] Minimum height: 500px
- [x] Proper background-size and position
- [x] Test hover effects on desktop

**Code Reference:**
```css
.about-image {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              filter 0.6s ease;
  filter: brightness(1);
}

.about-image:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
```

---

### Task 2.2: Enhance Split Section Typography
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Improve typography hierarchy and styling for split sections.

**Acceptance Criteria:**
- [x] Enhance `.heading-section` styling
- [x] Style `.subheading` with gold accent color
- [x] Add gradient underline to h2 headings
- [x] Improve paragraph line-height and spacing
- [x] Style list items with checkmark icons
- [x] Use Playfair Display for headings
- [x] Use Source Sans 3 for body text

---

### Task 2.3: Update Split Section Structure
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1, Task 2.2  

**Description:**
Update split section JSX structure to use new classes.

**Acceptance Criteria:**
- [x] Update Company Overview section structure
- [x] Update Mission section structure
- [x] Update Services List section structure
- [x] Update Compliance Information section structure
- [x] Add `.about-split-section` class
- [x] Add `.about-image-wrapper` div
- [x] Ensure proper column structure maintained

**Sections to Update:**
- Company Overview (lines 35-55)
- Mission (lines 82-101)
- Services List (lines 128-152)
- Compliance Information (lines 188-210)

---

### Task 2.4: Add Split Section Animations
**File:** `src/pages/About.jsx` and `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 2.3  

**Description:**
Implement scroll-triggered staggered animations for split sections.

**Acceptance Criteria:**
- [x] Add `.ftco-animate` classes to text elements
- [x] Implement Intersection Observer for scroll detection
- [x] Apply staggered delays: image (0ms), heading (100ms), text (200ms)
- [x] Use `fadeInUp` animation
- [x] Respect `prefers-reduced-motion`
- [x] Test animations trigger correctly

---

## Group 3: Dark Background Sections

Enhance the three dark background sections with improved gradients and typography.

### Task 3.1: Enhance Overlay Gradients
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Add enhanced gradient overlays to dark background sections.

**Acceptance Criteria:**
- [x] Update `.services-section.img` with enhanced gradients
- [x] Add `::before` pseudo-element with gradient
- [x] Enhance `.overlay` with additional gradient layer
- [x] Use `linear-gradient(135deg, ...)` for depth
- [x] Ensure text remains readable
- [x] Add `background-attachment: fixed` for parallax (desktop)

**Code Reference:**
```css
.services-section.img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}
```

---

### Task 3.2: Enhance Dark Section Typography
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1  

**Description:**
Improve typography styling for dark background sections.

**Acceptance Criteria:**
- [x] Enhance `.heading-section-white` styles
- [x] Style `.subheading` with gold accent color
- [x] Increase heading font size (3rem)
- [x] Add text-shadow for readability
- [x] Improve paragraph line-height (2)
- [x] Add subtle text-shadow to paragraphs
- [x] Use Playfair Display for headings

---

### Task 3.3: Add Dark Section Animations
**File:** `src/pages/About.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 3.2  

**Description:**
Implement staggered text reveals for dark sections.

**Acceptance Criteria:**
- [x] Add `.ftco-animate` classes to headings and paragraphs
- [x] Implement scroll detection
- [x] Stagger animations: heading (0ms), paragraphs (100ms, 200ms, 300ms)
- [x] Use `fadeInUp` animation
- [x] Test on CEO and Founder, Vision, More About sections

---

## Group 4: Team Member Cards

Enhance team member cards with larger images and hover effects.

### Task 4.1: Create TeamMemberCard Component (Optional)
**File:** `src/components/TeamMemberCard.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** None  

**Description:**
Create enhanced team member card component with hover state.

**Acceptance Criteria:**
- [x] Create component with `member` and `index` props (implemented inline)
- [x] Add hover state management (`useState`)
- [x] Implement image wrapper with overlay
- [x] Add hover overlay with member details
- [x] Include animation delay based on index
- [x] Make component accessible

**Note:** This is optional - can be done inline in About.jsx instead. **✓ Implemented inline with all functionality.**

---

### Task 4.2: Enhance Team Member Card Styling
**File:** `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.2  

**Description:**
Add premium styling to team member cards.

**Acceptance Criteria:**
- [x] Style `.team-member-card` with rounded corners, shadows
- [x] Add hover lift effect (translateY -8px)
- [x] Add gold border on hover
- [x] Style `.team-member-image-wrapper` (400px height)
- [x] Add image scale effect on hover (1.1)
- [x] Style overlay with gradient
- [x] Style `.team-member-info` section
- [x] Use Playfair Display for names

**Code Reference:**
```css
.team-member-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.team-member-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-gold);
  border-color: var(--color-accent);
}
```

---

### Task 4.3: Update Team Structure Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 4.2  

**Description:**
Update team structure section with enhanced cards and hover effects.

**Acceptance Criteria:**
- [x] Update Company Structure section (lines 217-245)
- [x] Increase image size (from 80px to full card height)
- [x] Add hover overlay with member details
- [x] Add animation delays to cards (0ms, 100ms, 200ms)
- [x] Update column structure if needed
- [x] Test hover effects work correctly

---

## Group 5: Compliance Cards

Redesign compliance information as cards/icons.

### Task 5.1: Create ComplianceCard Component
**File:** `src/components/ComplianceCard.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** None  

**Description:**
Create compliance card component for displaying compliance information.

**Acceptance Criteria:**
- [x] Create component with `icon`, `title`, `value` props
- [x] Display icon, title, and value
- [x] Add `.ftco-animate` class for animations
- [x] Make component accessible
- [x] Add hover effects

**Note:** This is optional - can be done inline in About.jsx instead.

---

### Task 5.2: Update Compliance Section
**File:** `src/pages/About.jsx` and `src/index.css`  
**Priority:** 🔴 High  
**Dependencies:** Task 5.1 (or inline implementation)  

**Description:**
Redesign compliance section with cards instead of list.

**Acceptance Criteria:**
- [x] Update Compliance Information section (lines 188-210)
- [x] Replace `<ul>` list with card grid
- [x] Create 4 compliance cards:
  - PSIRA Registration (🛡️)
  - Company Registration (📋)
  - FNB Bank Account (🏦)
  - ABSA Bank Account (🏦)
- [x] Add `.compliance-cards` grid layout (2 columns)
- [x] Style cards with icons, hover effects
- [x] Add animations with staggered delays
- [x] Ensure responsive (1 column on mobile)

---

## Group 6: Animations

Implement scroll-triggered animations across all sections.

### Task 6.1: Implement Scroll Detection
**File:** `src/pages/About.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** All previous task groups  

**Description:**
Implement Intersection Observer for scroll-triggered animations.

**Acceptance Criteria:**
- [x] Create or use existing scroll detection utility
- [x] Add Intersection Observer to all animated sections
- [x] Trigger animations when elements enter viewport
- [x] Add `.ftco-animated` class on trigger
- [x] Respect `prefers-reduced-motion` setting
- [x] Handle cleanup on unmount

**Reference:**
- Use existing animation pattern from homepage
- Check `src/utils/scrollAnimations.js` if exists

---

### Task 6.2: Apply Staggered Animation Delays
**File:** `src/pages/About.jsx` and `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 6.1  

**Description:**
Apply correct animation delays to all sections.

**Acceptance Criteria:**
- [x] Apply delays to split sections (image: 0ms, heading: 100ms, text: 200ms)
- [x] Apply delays to dark sections (heading: 0ms, paragraphs: 100ms, 200ms, 300ms)
- [x] Apply delays to compliance cards (0ms, 100ms, 200ms, 300ms)
- [x] Apply delays to team cards (0ms, 100ms, 200ms)
- [x] Test all animations trigger in correct order
- [x] Verify smooth animation flow

---

## Group 7: Responsive & Polish

Ensure everything works across all devices.

### Task 7.1: Responsive Adjustments
**File:** `src/index.css`  
**Priority:** 🟡 Medium  
**Dependencies:** All previous task groups  

**Description:**
Add responsive styles for all About page components.

**Acceptance Criteria:**
- [x] Stack split sections on mobile (single column)
- [x] Reduce team member card image height on mobile (300px)
- [x] Stack compliance cards (1 column on mobile)
- [x] Reduce section spacing on mobile (3rem)
- [x] Disable parallax on mobile (`background-attachment: scroll`)
- [x] Reduce animation duration on mobile (0.4s)
- [x] Reduce transform distance on mobile (15px instead of 30px)
- [x] Test all breakpoints (mobile, tablet, desktop)

**Breakpoints:**
- Desktop: >992px
- Tablet: 768-991px
- Mobile: <768px

---

### Task 7.2: Final Visual Polish
**File:** `src/index.css` and `src/pages/About.jsx`  
**Priority:** 🟢 Low  
**Dependencies:** Task 7.1  

**Description:**
Apply final polish: refine transitions, ensure consistency.

**Acceptance Criteria:**
- [x] Refine transition timings for consistency
- [x] Ensure all colors match design system
- [x] Verify typography consistency
- [x] Check shadow consistency across all cards
- [x] Ensure visual flow between sections
- [x] Test hover effects are smooth
- [x] Verify no visual regressions

---

## Group 8: Verification

Final checks before completion.

### Task 8.1: Accessibility Audit
**Priority:** 🟡 Medium  
**Dependencies:** All previous task groups  

**Description:**
Verify accessibility requirements are met.

**Checklist:**
- [x] All interactive elements have visible focus states
- [x] Team member cards are keyboard navigable
- [x] Compliance cards are accessible
- [x] Color contrast ≥ 4.5:1 for all text
- [x] Images have descriptive alt text
- [x] `prefers-reduced-motion` is respected
- [x] Screen reader can navigate all sections
- [x] Keyboard navigation works correctly

---

### Task 8.2: Cross-Browser & Device Testing
**Priority:** 🟢 Low  
**Dependencies:** Task 8.1  

**Description:**
Test in multiple browsers and devices.

**Checklist:**
- [ ] Chrome (latest) - Ready for testing
- [ ] Firefox (latest) - Ready for testing
- [ ] Safari (latest) - Ready for testing
- [ ] Edge (latest) - Ready for testing
- [ ] Mobile Safari (iOS) - Ready for testing
- [ ] Chrome Mobile (Android) - Ready for testing
- [ ] All animations work correctly
- [ ] Hover effects work appropriately
- [ ] No layout breaking issues
- [ ] Images load correctly
- [ ] Spacing is consistent

---

## Implementation Order

```
1.1 Spacing ──────────────────────────────────────┐
1.2 CSS Foundation ───────────────────────────────┤
                                                  │
2.1 Split Images ────────────────────────────────┼──► 2.3 Split Structure ──► 2.4 Split Animations
2.2 Split Typography ────────────────────────────┤
                                                  │
3.1 Overlay Gradients ───────────────────────────┼──► 3.2 Dark Typography ──► 3.3 Dark Animations
                                                  │
4.2 Team Card Styling ───────────────────────────┼──► 4.3 Team Structure
4.1 Team Component (optional) ───────────────────┤
                                                  │
5.1 Compliance Component (optional) ─────────────┼──► 5.2 Compliance Section
                                                  │
                                                  └──► 6.1 Scroll Detection ──► 6.2 Staggered Delays
                                                
                                                All ──► 7.1 Responsive ──► 7.2 Polish ──► 8.1 A11y ──► 8.2 Testing
```

---

## Quick Reference

| Task | File | Priority |
|------|------|----------|
| 1.1 | `src/pages/About.jsx`, `src/index.css` | 🔴 High |
| 1.2 | `src/index.css` | 🔴 High |
| 2.1 | `src/index.css` | 🔴 High |
| 2.2 | `src/index.css` | 🔴 High |
| 2.3 | `src/pages/About.jsx` | 🔴 High |
| 2.4 | `src/pages/About.jsx`, `src/index.css` | 🟡 Medium |
| 3.1 | `src/index.css` | 🔴 High |
| 3.2 | `src/index.css` | 🔴 High |
| 3.3 | `src/pages/About.jsx` | 🟡 Medium |
| 4.1 | `src/components/TeamMemberCard.jsx` | 🟡 Medium |
| 4.2 | `src/index.css` | 🔴 High |
| 4.3 | `src/pages/About.jsx` | 🔴 High |
| 5.1 | `src/components/ComplianceCard.jsx` | 🟡 Medium |
| 5.2 | `src/pages/About.jsx`, `src/index.css` | 🔴 High |
| 6.1 | `src/pages/About.jsx` | 🟡 Medium |
| 6.2 | `src/pages/About.jsx`, `src/index.css` | 🟡 Medium |
| 7.1 | `src/index.css` | 🟡 Medium |
| 7.2 | `src/index.css`, `src/pages/About.jsx` | 🟢 Low |
| 8.1 | N/A (audit) | 🟡 Medium |
| 8.2 | N/A (testing) | 🟢 Low |

---

## Notes

- TeamMemberCard and ComplianceCard components are optional - can be implemented inline
- Follow existing animation patterns from homepage redesign
- Use existing design system variables
- Test image hover effects and iterate if needed
- Consider mobile performance when adding effects
- Maintain content integrity (text may have minor edits for clarity)
