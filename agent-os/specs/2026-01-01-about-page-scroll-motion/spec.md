# About Page Scroll Motion Specification

**Project:** Black Eagle Group Website  
**Date:** January 1, 2026  
**Status:** Ready for Implementation

---

## 1. Executive Summary

This specification details the implementation of **scroll-linked animations** on the Black Eagle Group About page using Framer Motion. The current page has static content with non-functional animation classes. This spec will add smooth, continuous scroll-linked animations that respond proportionally to scroll position, creating an engaging and dynamic user experience as visitors scroll through the page.

**Key Features:**
1. **Scroll-Linked Animations** - Elements animate continuously based on scroll position (not just on/off)
2. **Framer Motion Integration** - Use Framer Motion library for advanced animation capabilities
3. **Staggered Timing** - Elements within sections animate with sequential delays
4. **Performance Optimized** - Smooth 60fps animations using GPU-accelerated properties
5. **All Sections Animated** - Every section on the About page receives scroll-linked motion
6. **Quick & Minimal** - Subtle, fast animations that enhance without overwhelming

---

## 2. Goals & Objectives

### Primary Goals
- Replace non-functional static animations with working scroll-linked animations
- Implement Framer Motion library for advanced scroll-based animations
- Create smooth, continuous animations that respond to scroll position in real-time
- Apply staggered animations to elements within each section
- Optimize for 60fps performance
- Maintain accessibility with `prefers-reduced-motion` support

### Success Criteria
- All 10 sections on About page have scroll-linked animations
- Animations are smooth and performant (60fps)
- Elements animate proportionally to scroll position (continuous, not binary)
- Staggered timing works correctly within sections
- Animations respect `prefers-reduced-motion` setting
- No visual regressions or layout shifts
- Page remains fully accessible and functional

---

## 3. Current State Analysis

### 3.1 Current Implementation

**File:** `BlackEagleGroup.React/src/pages/About.jsx`

**Current Issues:**
- `initScrollAnimations()` is called but animations are not working
- Elements have `.ftco-animate` class and inline `animationDelay` styles
- All content appears static with no motion
- CSS animations defined in `index.css` but not triggering properly

**Existing Animation System:**
- `BlackEagleGroup.React/src/utils/scrollAnimations.js` - Intersection Observer utility
- `.ftco-animate` class with `fadeInUp` animation (0.6s duration)
- Staggered delays applied via inline styles (0ms, 100ms, 200ms, etc.)

**Current Section Structure:**
1. Hero Section - Uses Hero component
2. Company Overview - Split layout (image left, text right)
3. CEO and Founder - Centered text on dark background
4. Mission - Split layout (image left, text right)
5. Vision - Centered text on dark background
6. Services List - Split layout (image left, list right)
7. More About - Centered text on dark background
8. Compliance Information - Split layout (image left, cards right)
9. Company Structure - Team member cards grid
10. Company Profiles Download - PDF download cards

### 3.2 Related Code

**Existing Animation Utilities:**
- `src/utils/scrollAnimations.js` - Contains `useScrollAnimation` hook and `initScrollAnimations` function
- Uses Intersection Observer API
- Respects `prefers-reduced-motion`

**Home Page Animation Pattern:**
- `src/pages/Home.jsx` - Uses `initScrollAnimations()` and applies staggered delays
- Service cards: 50ms increments
- Text elements: 100ms increments

**CSS Animation Definitions:**
- `src/index.css` - Contains `.ftco-animate` and `fadeInUp` keyframe
- Animation: `fadeInUp 0.6s ease-in-out forwards`
- Uses `opacity` and `transform: translateY(30px)`

---

## 4. Technical Specifications

### 4.1 Framer Motion Installation

**Package:** `framer-motion`

**Installation:**
```bash
npm install framer-motion
```

**Version:** Latest stable (v11.x or v12.x)

### 4.2 Core Animation Approach

**Scroll-Linked Animations:**
- Use Framer Motion's `useScroll` hook to track scroll position
- Use `useTransform` to map scroll progress to animation values
- Apply animations to `motion` components
- Each section tracks its own scroll progress independently

**Key Hooks:**
- `useScroll()` - Track scroll position and progress
- `useTransform()` - Map scroll progress to animation values
- `useInView()` - Detect when elements enter viewport (for initial triggers)
- `useMotionValue()` - Create reactive motion values

### 4.3 Animation Values

**Properties to Animate:**
- `opacity` - Fade in/out (0 to 1)
- `y` - Vertical translation (translateY)
- `scale` - Optional scale effect (0.95 to 1)

**Animation Ranges:**
- **Opacity:** Start at 0, reach 1 when section is 30% scrolled into viewport
- **Y Translation:** Start at 20-30px, reach 0 when section is 30% scrolled
- **Duration:** Quick animations (0.3s to 0.5s)
- **Easing:** `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`

### 4.4 Staggered Animations

**Timing Pattern:**
- Image elements: 0ms delay
- Subheading: 50ms delay
- Heading: 100ms delay
- First paragraph: 150ms delay
- Subsequent paragraphs: 200ms, 250ms, etc.
- List items: 50ms increments (200ms, 250ms, 300ms...)
- Cards: 100ms increments

**Implementation:**
- Use Framer Motion's `stagger` prop or manual delay calculations
- Apply delays based on element order within section

---

## 5. Component Specifications

### 5.1 Section Animation Wrapper

**Purpose:** Wrap each section to track scroll progress

**Implementation Pattern:**
```jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  // Map scroll progress to opacity
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3], [30, 0])
  
  return (
    <motion.section
      ref={ref}
      className={className}
      style={{ opacity, y }}
    >
      {children}
    </motion.section>
  )
}
```

### 5.2 Element Animation Components

**Animated Image:**
```jsx
const AnimatedImage = ({ src, alt, className, delay = 0 }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y }}
      transition={{ delay }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  )
}
```

**Animated Text:**
```jsx
const AnimatedText = ({ children, className, delay = 0, as = 'p' }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  const MotionComponent = motion[as]
  
  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ opacity, y }}
      transition={{ delay }}
    >
      {children}
    </MotionComponent>
  )
}
```

### 5.3 Section-Specific Implementations

#### 5.3.1 Split Layout Sections
**Sections:** Company Overview, Mission, Services List, Compliance Information

**Animation Pattern:**
- Image column: Animate first (0ms delay)
- Text column: Stagger subheading (50ms), heading (100ms), paragraphs (150ms+)

#### 5.3.2 Dark Background Sections
**Sections:** CEO and Founder, Vision, More About

**Animation Pattern:**
- Subheading: 0ms delay
- Heading: 50ms delay
- Paragraphs: 100ms, 200ms, 300ms, 400ms delays

#### 5.3.3 Team Member Cards
**Section:** Company Structure

**Animation Pattern:**
- Heading: 0ms delay
- Cards: 100ms, 200ms, 300ms delays (staggered)

#### 5.3.4 Profile Download Cards
**Section:** Company Profiles Download

**Animation Pattern:**
- Heading: 0ms delay
- Cards: 100ms, 200ms, 300ms delays (staggered)

---

## 6. Performance Optimization

### 6.1 GPU Acceleration

**Properties to Use:**
- `transform` (translateY, scale) - GPU-accelerated
- `opacity` - GPU-accelerated
- Avoid: `top`, `left`, `width`, `height` (not GPU-accelerated)

**Framer Motion Optimization:**
- Use `will-change` CSS property (Framer Motion handles this automatically)
- Enable `layoutId` for shared element transitions if needed
- Use `layout` prop sparingly (only when necessary)

### 6.2 Scroll Performance

**Optimization Techniques:**
- Throttle scroll events (Framer Motion handles this internally)
- Use `useScroll` with proper `offset` values to reduce calculations
- Limit number of animated elements per section
- Use `transform` and `opacity` only (GPU-accelerated)

### 6.3 Reduced Motion Support

**Implementation:**
```jsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// In animation config
const animationConfig = prefersReducedMotion
  ? { opacity: 1, y: 0 } // No animation
  : { opacity, y } // Full animation
```

**Framer Motion Support:**
- Framer Motion respects `prefers-reduced-motion` automatically
- Can also check manually and disable animations

---

## 7. Implementation Details

### 7.1 File Structure

**New Files:**
- `src/components/animations/AnimatedSection.jsx` - Section wrapper component
- `src/components/animations/AnimatedText.jsx` - Text animation component
- `src/components/animations/AnimatedImage.jsx` - Image animation component
- `src/hooks/useScrollAnimation.js` - Custom hook for scroll-linked animations (optional)

**Modified Files:**
- `src/pages/About.jsx` - Replace static elements with animated components
- `package.json` - Add framer-motion dependency

### 7.2 Migration Strategy

**Step 1: Install Framer Motion**
```bash
npm install framer-motion
```

**Step 2: Create Animation Components**
- Create reusable animation components
- Test with one section first

**Step 3: Migrate Sections**
- Migrate one section at a time
- Test scroll behavior
- Verify performance

**Step 4: Remove Old System**
- Remove `initScrollAnimations()` call
- Remove `.ftco-animate` classes (or keep for fallback)
- Remove inline `animationDelay` styles

### 7.3 Code Example: Company Overview Section

**Before:**
```jsx
<section className="ftco-section about-split-section">
  <Container>
    <Row className="no-gutters">
      <Col md={6} className="about-image-col">
        <div className="about-image-wrapper">
          <div 
            className="about-image ftco-animate" 
            style={{ 
              backgroundImage: "url('/images/About-1.jpg')",
              animationDelay: '0ms'
            }}
          />
        </div>
      </Col>
      <Col md={6} className="wrap-about py-md-5">
        <div className="heading-section mb-5 pl-md-5">
          <span className="subheading ftco-animate" style={{ animationDelay: '100ms' }}>
            About us
          </span>
          <h2 className="mb-4 ftco-animate" style={{ animationDelay: '100ms' }}>
            Company Overview
          </h2>
          <p className="ftco-animate" style={{ animationDelay: '200ms' }}>
            Content...
          </p>
        </div>
      </Col>
    </Row>
  </Container>
</section>
```

**After:**
```jsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const CompanyOverviewSection = () => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  // Image animation
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const imageY = useTransform(scrollYProgress, [0, 0.3], [20, 0])
  
  // Text animations with staggered delays
  const textOpacity1 = useTransform(scrollYProgress, [0.1, 0.4], [0, 1])
  const textY1 = useTransform(scrollYProgress, [0.1, 0.4], [20, 0])
  
  const textOpacity2 = useTransform(scrollYProgress, [0.15, 0.45], [0, 1])
  const textY2 = useTransform(scrollYProgress, [0.15, 0.45], [20, 0])
  
  const textOpacity3 = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
  const textY3 = useTransform(scrollYProgress, [0.2, 0.5], [20, 0])
  
  return (
    <motion.section 
      ref={sectionRef}
      className="ftco-section about-split-section"
    >
      <Container>
        <Row className="no-gutters">
          <Col md={6} className="about-image-col">
            <div className="about-image-wrapper">
              <motion.div 
                className="about-image"
                style={{ 
                  backgroundImage: "url('/images/About-1.jpg')",
                  opacity: imageOpacity,
                  y: imageY
                }}
              />
            </div>
          </Col>
          <Col md={6} className="wrap-about py-md-5">
            <div className="heading-section mb-5 pl-md-5">
              <motion.span 
                className="subheading"
                style={{ opacity: textOpacity1, y: textY1 }}
              >
                About us
              </motion.span>
              <motion.h2 
                className="mb-4"
                style={{ opacity: textOpacity2, y: textY2 }}
              >
                Company Overview
              </motion.h2>
              <motion.p 
                style={{ opacity: textOpacity3, y: textY3 }}
              >
                Content...
              </motion.p>
            </div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  )
}
```

---

## 8. Animation Specifications

### 8.1 Animation Timing

**Scroll Progress Mapping:**
- **0% to 30% scroll:** Element fades in and slides up
- **30% to 70% scroll:** Element fully visible
- **70% to 100% scroll:** Element can fade out (optional, for continuous effect)

**Animation Values:**
- **Opacity:** 0 → 1 (over 30% scroll progress)
- **Y Translation:** 20-30px → 0 (over 30% scroll progress)
- **Duration:** Continuous (linked to scroll, not time-based)

### 8.2 Easing Functions

**Primary Easing:**
- `ease-out` or `cubic-bezier(0.4, 0, 0.2, 1)`
- Quick start, smooth finish

**Alternative:**
- `ease-in-out` for more balanced feel
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for subtle motion

### 8.3 Stagger Configuration

**Default Stagger:**
- Base delay: 0ms
- Increment: 50ms per element
- Maximum stagger: 500ms (10 elements)

**Section-Specific Staggers:**
- **Split sections:** Image (0ms), Subheading (50ms), Heading (100ms), Text (150ms+)
- **Dark sections:** Subheading (0ms), Heading (50ms), Paragraphs (100ms increments)
- **Card grids:** Heading (0ms), Cards (100ms increments)

---

## 9. Accessibility Considerations

### 9.1 Reduced Motion

**Implementation:**
- Check `prefers-reduced-motion` media query
- Disable animations if user prefers reduced motion
- Show content immediately without animation

**Framer Motion:**
- Automatically respects `prefers-reduced-motion`
- Can also manually check and disable

### 9.2 Focus Management

**Requirements:**
- Animated elements remain keyboard accessible
- Focus indicators visible during animations
- No focus traps or focus loss during scroll

### 9.3 Screen Readers

**Considerations:**
- Animations don't interfere with screen reader navigation
- Content remains readable and accessible
- No content hidden or obscured by animations

---

## 10. Testing Requirements

### 10.1 Functional Testing

**Test Cases:**
- [ ] All sections animate when scrolled into view
- [ ] Animations are smooth and continuous (not jumpy)
- [ ] Staggered timing works correctly within sections
- [ ] Animations reset/re-trigger when scrolling back up
- [ ] No layout shifts during animations
- [ ] All content remains visible and readable

### 10.2 Performance Testing

**Metrics:**
- [ ] 60fps maintained during scroll
- [ ] No jank or stuttering
- [ ] Smooth animations on mobile devices
- [ ] Acceptable performance on low-end devices
- [ ] No memory leaks during extended scrolling

**Tools:**
- Chrome DevTools Performance tab
- React DevTools Profiler
- Lighthouse performance audit

### 10.3 Browser Testing

**Browsers:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

### 10.4 Accessibility Testing

**Tests:**
- [ ] `prefers-reduced-motion` works correctly
- [ ] Keyboard navigation unaffected
- [ ] Screen reader compatibility
- [ ] Focus indicators visible
- [ ] No content hidden by animations

---

## 11. Success Metrics

### 11.1 Performance Metrics

**Targets:**
- 60fps during scroll animations
- < 100ms animation start delay
- < 16ms frame time (60fps)
- No layout shifts (CLS = 0)

### 11.2 User Experience Metrics

**Goals:**
- Smooth, engaging scroll experience
- No visual glitches or stuttering
- Animations enhance without distracting
- Page remains fully functional

### 11.3 Technical Metrics

**Requirements:**
- All 10 sections animated
- Staggered timing working correctly
- Scroll-linked animations responding in real-time
- Reduced motion support functional

---

## 12. Dependencies

### 12.1 Required Packages

```json
{
  "framer-motion": "^11.0.0"
}
```

### 12.2 Peer Dependencies

- React 18.x
- React DOM 18.x
- React Bootstrap (existing)
- React Router (existing)

### 12.3 Development Dependencies

- No additional dev dependencies required

---

## 13. Rollout Plan

### 13.1 Implementation Phases

**Phase 1: Setup**
- Install Framer Motion
- Create animation utility components
- Test with one section

**Phase 2: Core Sections**
- Implement animations for split layout sections
- Implement animations for dark background sections
- Test and refine

**Phase 3: Special Sections**
- Implement animations for card sections
- Test and refine

**Phase 4: Polish**
- Optimize performance
- Test accessibility
- Final testing across browsers

### 13.2 Rollback Plan

**If Issues Arise:**
- Keep old `.ftco-animate` classes as fallback
- Can disable Framer Motion animations via feature flag
- Revert to static content if necessary

---

## 14. Future Enhancements

### 14.1 Potential Improvements

- Parallax effects on background images
- Scroll progress indicators
- More complex animation sequences
- Intersection with other animations (hover, click)

### 14.2 Out of Scope

- Parallax scrolling (not requested)
- Scroll progress indicators (not requested)
- Animation library other than Framer Motion
- Changes to page content or structure

---

## 15. Related Documentation

- **Requirements:** `planning/requirements.md`
- **Initialization:** `planning/initialization.md`
- **About Page Redesign Spec:** `agent-os/specs/2025-12-23-about-page-redesign/spec.md`
- **Home Page Animations:** `agent-os/specs/2025-12-21-homepage-sections-visual-improvements/spec.md`
- **Framer Motion Docs:** https://www.framer.com/motion/

---

## 16. Notes

- Current animations are not working - this is a complete replacement, not an enhancement
- All sections must animate - no exclusions
- Animations should be quick and minimal - subtle enhancement, not distracting
- Scroll-linked means continuous animation based on scroll position, not just on/off triggers
- Performance is critical - must maintain 60fps

---

**End of Specification**
