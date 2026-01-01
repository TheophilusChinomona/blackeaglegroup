# About Page Scroll Motion - Tasks List

**Spec:** About Page Scroll Motion  
**Created:** January 1, 2026  
**Total Tasks:** 15  
**Estimated Effort:** Medium

---

## Task Overview

| Group | Tasks | Status |
|-------|-------|--------|
| 1. Setup & Dependencies | 1 task | ✅ Complete |
| 2. Animation Utilities | 3 tasks | ✅ Complete |
| 3. Split Layout Sections | 4 tasks | ✅ Complete |
| 4. Dark Background Sections | 3 tasks | ✅ Complete |
| 5. Card Sections | 2 tasks | ✅ Complete |
| 6. Cleanup & Optimization | 2 tasks | ✅ Complete |

---

## Group 1: Setup & Dependencies

Foundation setup that all other tasks depend on.

### Task 1.1: Install Framer Motion
**File:** `package.json`  
**Priority:** 🔴 High  
**Dependencies:** None

**Description:**
Install Framer Motion library for scroll-linked animations.

**Acceptance Criteria:**
- [x] Run `npm install framer-motion`
- [x] Verify package is added to `package.json` dependencies
- [x] Verify package version is latest stable (v11.x or v12.x)
- [x] Verify installation completes without errors
- [x] Test import: `import { motion } from 'framer-motion'` works

**Command:**
```bash
npm install framer-motion
```

---

## Group 2: Animation Utilities

Create reusable animation components and hooks for scroll-linked animations.

### Task 2.1: Create AnimatedSection Component
**File:** `src/components/animations/AnimatedSection.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 1.1

**Description:**
Create a reusable section wrapper component that tracks scroll progress and applies scroll-linked animations.

**Acceptance Criteria:**
- [x] Create `src/components/animations/` directory
- [x] Create `AnimatedSection.jsx` component
- [x] Component uses `useScroll` hook to track scroll progress
- [x] Component uses `useTransform` to map scroll progress to opacity and y values
- [x] Opacity animates from 0 to 1 over 30% scroll progress
- [x] Y translates from 20-30px to 0 over 30% scroll progress
- [x] Component accepts `children` and `className` props
- [x] Component respects `prefers-reduced-motion` setting
- [x] Component uses `motion.section` from Framer Motion
- [x] Includes JSDoc comments

**Code Reference:**
```jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  return (
    <motion.section
      ref={ref}
      className={className}
      style={prefersReducedMotion ? {} : { opacity, y }}
    >
      {children}
    </motion.section>
  )
}

export default AnimatedSection
```

---

### Task 2.2: Create useScrollAnimation Hook
**File:** `src/hooks/useScrollAnimation.js`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 1.1

**Description:**
Create a custom hook for scroll-linked animations that can be reused across different element types.

**Acceptance Criteria:**
- [x] Create `src/hooks/` directory if it doesn't exist
- [x] Create `useScrollAnimation.js` hook
- [x] Hook accepts options: `offset`, `opacityRange`, `yRange`, `delay`
- [x] Hook returns `ref`, `opacity`, and `y` motion values
- [x] Hook uses `useScroll` and `useTransform` internally
- [x] Hook respects `prefers-reduced-motion`
- [x] Includes JSDoc comments with usage examples

**Code Reference:**
```jsx
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export const useScrollAnimation = ({
  offset = ["start end", "center center"],
  opacityRange = [0, 0.3],
  yRange = [20, 0],
  delay = 0
} = {}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset
  })
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const opacity = useTransform(scrollYProgress, opacityRange, [0, 1])
  const y = useTransform(scrollYProgress, opacityRange, yRange)
  
  return {
    ref,
    opacity: prefersReducedMotion ? 1 : opacity,
    y: prefersReducedMotion ? 0 : y
  }
}
```

---

### Task 2.3: Create AnimatedElement Component
**File:** `src/components/animations/AnimatedElement.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** Task 2.2

**Description:**
Create a flexible animated element component that can wrap any element type (div, span, h2, p, etc.) with scroll-linked animations.

**Acceptance Criteria:**
- [x] Create `AnimatedElement.jsx` component
- [x] Component accepts `as` prop to specify element type (default: 'div')
- [x] Component accepts `children`, `className`, `delay`, and animation options
- [x] Component uses `useScrollAnimation` hook internally
- [x] Component applies opacity and y transform based on scroll progress
- [x] Component supports staggered delays via `delay` prop
- [x] Component respects `prefers-reduced-motion`
- [x] Includes JSDoc comments

**Code Reference:**
```jsx
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const AnimatedElement = ({ 
  as = 'div', 
  children, 
  className, 
  delay = 0,
  offset = ["start end", "center center"],
  ...props 
}) => {
  const { ref, opacity, y } = useScrollAnimation({ offset, delay })
  
  const MotionComponent = motion[as]
  
  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ opacity, y }}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}

export default AnimatedElement
```

---

## Group 3: Split Layout Sections

Implement scroll-linked animations for sections with split layout (image left, text right).

**Sections:** Company Overview, Mission, Services List, Compliance Information

### Task 3.1: Animate Company Overview Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1, Task 2.3

**Description:**
Add scroll-linked animations to the Company Overview section. Image should animate first (0ms), then subheading (50ms), heading (100ms), and paragraph (150ms).

**Acceptance Criteria:**
- [x] Wrap section with `AnimatedSection` or add `motion.section` with scroll tracking
- [x] Image element uses `motion.div` with scroll-linked opacity and y transform
- [x] Subheading uses `AnimatedElement` or `motion.span` with 50ms delay offset
- [x] Heading uses `AnimatedElement` or `motion.h2` with 100ms delay offset
- [x] Paragraph uses `AnimatedElement` or `motion.p` with 150ms delay offset
- [x] Animations are scroll-linked (continuous, not binary on/off)
- [x] Remove old `.ftco-animate` classes and inline `animationDelay` styles
- [x] Test scroll behavior - elements should animate as section scrolls into view

**Code Reference:**
See spec.md section 7.3 for before/after code example.

---

### Task 3.2: Animate Mission Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1

**Description:**
Add scroll-linked animations to the Mission section with same pattern as Company Overview.

**Acceptance Criteria:**
- [x] Apply same animation pattern as Task 3.1
- [x] Image animates first (0ms)
- [x] Subheading animates with 50ms delay
- [x] Heading animates with 100ms delay
- [x] Paragraph animates with 150ms delay
- [x] Remove old animation classes/styles
- [x] Test scroll behavior

---

### Task 3.3: Animate Services List Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1

**Description:**
Add scroll-linked animations to the Services List section. Image first, then subheading, heading, and list items with staggered delays (200ms, 250ms, 300ms, etc.).

**Acceptance Criteria:**
- [x] Apply animation pattern similar to Task 3.1
- [x] Image animates first (0ms)
- [x] Subheading animates with 50ms delay
- [x] Heading animates with 100ms delay
- [x] List items animate with staggered delays: 200ms, 250ms, 300ms, 350ms, 400ms, 450ms
- [x] Use `motion.li` for list items
- [x] Remove old animation classes/styles
- [x] Test scroll behavior

---

### Task 3.4: Animate Compliance Information Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 3.1

**Description:**
Add scroll-linked animations to the Compliance Information section. Image first, then subheading, heading, and compliance cards with staggered delays.

**Acceptance Criteria:**
- [x] Apply animation pattern similar to Task 3.1
- [x] Image animates first (0ms)
- [x] Subheading animates with 50ms delay
- [x] Heading animates with 100ms delay
- [x] Compliance cards animate with staggered delays: 150ms, 200ms, 250ms, 300ms
- [x] Ensure ComplianceCard components can accept animation props or wrap with motion.div
- [x] Remove old animation classes/styles
- [x] Test scroll behavior

---

## Group 4: Dark Background Sections

Implement scroll-linked animations for sections with dark backgrounds and centered text.

**Sections:** CEO and Founder, Vision, More About

### Task 4.1: Animate CEO and Founder Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1, Task 2.3

**Description:**
Add scroll-linked animations to the CEO and Founder section. Subheading (0ms), heading (50ms), and paragraph (100ms).

**Acceptance Criteria:**
- [x] Wrap section with scroll tracking
- [x] Subheading animates with 0ms delay
- [x] Heading animates with 50ms delay
- [x] Paragraph animates with 100ms delay
- [x] Animations are scroll-linked (continuous)
- [x] Remove old `.ftco-animate` classes and inline `animationDelay` styles
- [x] Test scroll behavior

---

### Task 4.2: Animate Vision Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 4.1

**Description:**
Add scroll-linked animations to the Vision section with same pattern as CEO and Founder.

**Acceptance Criteria:**
- [x] Apply same animation pattern as Task 4.1
- [x] Subheading (0ms), heading (50ms), paragraph (100ms)
- [x] Remove old animation classes/styles
- [x] Test scroll behavior

---

### Task 4.3: Animate More About Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 4.1

**Description:**
Add scroll-linked animations to the More About section. Subheading (0ms), heading (50ms), and multiple paragraphs with staggered delays (100ms, 200ms, 300ms, 400ms).

**Acceptance Criteria:**
- [x] Apply animation pattern similar to Task 4.1
- [x] Subheading animates with 0ms delay
- [x] Heading animates with 50ms delay
- [x] First paragraph animates with 100ms delay
- [x] Second paragraph animates with 200ms delay
- [x] Third paragraph animates with 300ms delay
- [x] Fourth paragraph animates with 400ms delay
- [x] Remove old animation classes/styles
- [x] Test scroll behavior

---

## Group 5: Card Sections

Implement scroll-linked animations for sections with card grids.

**Sections:** Company Structure (team member cards), Company Profiles Download

### Task 5.1: Animate Company Structure Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 2.1, Task 2.3

**Description:**
Add scroll-linked animations to the Company Structure section. Heading (0ms), then team member cards with staggered delays (100ms, 200ms, 300ms).

**Acceptance Criteria:**
- [x] Wrap section heading with scroll-linked animation (0ms delay)
- [x] Wrap each team member card with `motion.div` or `AnimatedElement`
- [x] Cards animate with staggered delays: 100ms, 200ms, 300ms
- [x] Animations are scroll-linked (continuous)
- [x] Remove old `.ftco-animate` classes and inline `animationDelay` styles
- [x] Ensure hover effects on cards still work
- [x] Test scroll behavior

---

### Task 5.2: Animate Company Profiles Download Section
**File:** `src/pages/About.jsx`  
**Priority:** 🔴 High  
**Dependencies:** Task 5.1

**Description:**
Add scroll-linked animations to the Company Profiles Download section. Heading (0ms), then profile download cards with staggered delays (100ms, 200ms, 300ms).

**Acceptance Criteria:**
- [x] Wrap section heading with scroll-linked animation (0ms delay)
- [x] Wrap each ProfileDownloadCard with `motion.div` or `AnimatedElement`
- [x] Cards animate with staggered delays: 100ms, 200ms, 300ms
- [x] Animations are scroll-linked (continuous)
- [x] Remove old animation classes/styles if present
- [x] Test scroll behavior

---

## Group 6: Cleanup & Optimization

Remove old animation system and optimize performance.

### Task 6.1: Remove Old Animation System
**File:** `src/pages/About.jsx`  
**Priority:** 🟡 Medium  
**Dependencies:** All animation tasks complete

**Description:**
Remove the old non-functional animation system from About.jsx.

**Acceptance Criteria:**
- [x] Remove `initScrollAnimations()` call from useEffect
- [x] Remove import of `initScrollAnimations` from `@/utils/scrollAnimations`
- [x] Remove all `.ftco-animate` classes from About.jsx elements
- [x] Remove all inline `animationDelay` style props
- [x] Verify page still works correctly
- [x] Verify all animations are now handled by Framer Motion

**Note:** Keep `.ftco-animate` CSS definitions in `index.css` as they may be used elsewhere, or remove if confirmed unused.

---

### Task 6.2: Performance Optimization & Testing
**File:** `src/pages/About.jsx`, `src/components/animations/`, `src/hooks/`  
**Priority:** 🟡 Medium  
**Dependencies:** All animation tasks complete

**Description:**
Optimize animations for 60fps performance and test across browsers.

**Acceptance Criteria:**
- [x] Verify all animations use GPU-accelerated properties (transform, opacity)
- [x] Test scroll performance in Chrome DevTools Performance tab
- [x] Verify 60fps maintained during scroll
- [x] Test `prefers-reduced-motion` support - animations should be disabled
- [x] Test on mobile devices (iOS Safari, Chrome Mobile)
- [x] Test on desktop browsers (Chrome, Firefox, Safari, Edge)
- [x] Verify no layout shifts (CLS = 0)
- [x] Verify no jank or stuttering
- [x] Check for memory leaks during extended scrolling
- [x] Verify all 10 sections animate correctly
- [x] Verify staggered timing works within sections

**Performance Checklist:**
- [x] 60fps maintained during scroll
- [x] < 100ms animation start delay
- [x] < 16ms frame time
- [x] No layout shifts
- [x] Smooth on mobile devices

**Browser Testing:**
- [x] Chrome (latest)
- [x] Firefox (latest)
- [x] Safari (latest)
- [x] Edge (latest)
- [x] Mobile Safari (iOS)
- [x] Chrome Mobile (Android)

**Accessibility Testing:**
- [x] `prefers-reduced-motion` works correctly
- [x] Keyboard navigation unaffected
- [x] Screen reader compatibility
- [x] Focus indicators visible
- [x] No content hidden by animations

---

## Implementation Order

**Recommended execution sequence:**

1. **Foundation** (Group 1)
   - Task 1.1: Install Framer Motion

2. **Animation Utilities** (Group 2)
   - Task 2.1: Create AnimatedSection component
   - Task 2.2: Create useScrollAnimation hook
   - Task 2.3: Create AnimatedElement component

3. **Split Layout Sections** (Group 3)
   - Task 3.1: Animate Company Overview Section
   - Task 3.2: Animate Mission Section
   - Task 3.3: Animate Services List Section
   - Task 3.4: Animate Compliance Information Section

4. **Dark Background Sections** (Group 4)
   - Task 4.1: Animate CEO and Founder Section
   - Task 4.2: Animate Vision Section
   - Task 4.3: Animate More About Section

5. **Card Sections** (Group 5)
   - Task 5.1: Animate Company Structure Section
   - Task 5.2: Animate Company Profiles Download Section

6. **Cleanup & Optimization** (Group 6)
   - Task 6.1: Remove Old Animation System
   - Task 6.2: Performance Optimization & Testing

---

## Quick Reference

| Task | File | Priority | Dependencies |
|------|------|----------|--------------|
| 1.1 | `package.json` | 🔴 High | None |
| 2.1 | `src/components/animations/AnimatedSection.jsx` | 🔴 High | 1.1 |
| 2.2 | `src/hooks/useScrollAnimation.js` | 🟡 Medium | 1.1 |
| 2.3 | `src/components/animations/AnimatedElement.jsx` | 🟡 Medium | 2.2 |
| 3.1 | `src/pages/About.jsx` | 🔴 High | 2.1, 2.3 |
| 3.2 | `src/pages/About.jsx` | 🔴 High | 3.1 |
| 3.3 | `src/pages/About.jsx` | 🔴 High | 3.1 |
| 3.4 | `src/pages/About.jsx` | 🔴 High | 3.1 |
| 4.1 | `src/pages/About.jsx` | 🔴 High | 2.1, 2.3 |
| 4.2 | `src/pages/About.jsx` | 🔴 High | 4.1 |
| 4.3 | `src/pages/About.jsx` | 🔴 High | 4.1 |
| 5.1 | `src/pages/About.jsx` | 🔴 High | 2.1, 2.3 |
| 5.2 | `src/pages/About.jsx` | 🔴 High | 5.1 |
| 6.1 | `src/pages/About.jsx` | 🟡 Medium | All animation tasks |
| 6.2 | Multiple files | 🟡 Medium | All animation tasks |

---

## Notes

- **Scroll-Linked Animations:** Elements should animate continuously based on scroll position, not just on/off when entering viewport
- **Staggered Timing:** Elements within sections should animate with sequential delays (50ms, 100ms, 150ms, etc.)
- **Performance:** Must maintain 60fps - use GPU-accelerated properties only (transform, opacity)
- **Accessibility:** Always respect `prefers-reduced-motion` setting
- **Hero Section:** Already uses Hero component - may not need animation if it's handled by Hero component
- **Testing:** Test one section at a time before moving to next section
- **Old System:** Keep old CSS classes in `index.css` until confirmed they're not used elsewhere

---

## Success Criteria

- ✅ All 10 sections have scroll-linked animations
- ✅ Animations are smooth and performant (60fps)
- ✅ Elements animate proportionally to scroll position (continuous, not binary)
- ✅ Staggered timing works correctly within sections
- ✅ Animations respect `prefers-reduced-motion` setting
- ✅ No visual regressions or layout shifts
- ✅ Page remains fully accessible and functional
- ✅ Old animation system removed
- ✅ Performance optimized

---

**End of Tasks List**
