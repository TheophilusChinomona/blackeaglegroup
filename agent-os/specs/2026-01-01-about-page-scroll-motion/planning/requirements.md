# Spec Requirements: About Page Scroll Motion

## Initial Description

User's original spec description:
> "on the @BlackEagleGroup.React/src/pages/About.jsx page i want motion...so the contents should have some motion as i scroll down the page"

## Requirements Discussion

### First Round Questions

**Q1:** I see the page currently uses `fadeInUp` animations (fade in + slide up from bottom). Should we keep this same animation style, or would you prefer different effects like fade only, slide from left/right, scale, or a mix of different animations for different sections?

**Answer:** "its not doing that currently everything is static" - The current animations are not working, everything appears static. Need to implement working scroll-triggered animations.

**Q2:** For animation intensity, should the motion be subtle (quick, minimal movement) or more noticeable (longer duration, larger transforms)?

**Answer:** "quick and minimal but i want it to be on the section i am looking at and it animates again for the next section" - Quick and minimal animations. Animations should trigger as each section comes into viewport, and each new section should animate when it becomes visible.

**Q3:** Should all sections on the About page animate, or focus on specific sections (e.g., Company Overview, Mission, Vision, Services, Compliance, Team Members)?

**Answer:** "all sections" - All sections should have scroll-triggered animations.

**Q4:** Should elements within each section animate with staggered timing (e.g., image first, then heading, then text, or list items appearing sequentially)?

**Answer:** "yes" - Yes, staggered timing for elements within sections.

**Q5:** Should we enhance the existing `scrollAnimations.js` utility, or would you prefer to add a library like Framer Motion or React Spring for more advanced animation capabilities?

**Answer:** "maybe framer motion would be best" - Use Framer Motion for animations.

**Q6:** Should we include parallax scrolling effects (where background images move at different speeds), or keep it to scroll-triggered reveals only?

**Answer:** "elaborate" - User requested elaboration on parallax/scroll effects. Need to clarify if they want parallax effects or just scroll-triggered reveals.

**Q7:** Any specific performance requirements or constraints for animations, or should we optimize for smooth 60fps animations?

**Answer:** "optimise for smooth 60fps" - Optimize for smooth 60fps animations.

**Q8:** Are there any sections or elements that should NOT animate?

**Answer:** "no" - No exclusions, all sections should animate.

### Existing Code to Reference

**Similar Features Identified:**
- Feature: Scroll Animations Utility - Path: `BlackEagleGroup.React/src/utils/scrollAnimations.js`
  - Components to potentially reuse: `useScrollAnimation` hook, `initScrollAnimations` function
  - Backend logic to reference: Intersection Observer pattern for scroll detection
- Feature: Home Page Animations - Path: `BlackEagleGroup.React/src/pages/Home.jsx`
  - Components to potentially reuse: Staggered animation delay pattern (50ms increments for cards, 100ms for text elements)
  - Animation pattern: Uses `initScrollAnimations()` and applies inline `animationDelay` styles
- Feature: CSS Animation Definitions - Path: `BlackEagleGroup.React/src/index.css`
  - Components to potentially reuse: `.ftco-animate` and `.ftco-animated` classes, `fadeInUp` keyframe animation
  - Current animation: `fadeInUp` with 0.6s duration, ease-in-out timing

**Note:** Current animation system uses CSS classes with Intersection Observer, but user wants to switch to Framer Motion for better control and more advanced animations.

### Follow-up Questions

**Follow-up 1:** Regarding parallax/scroll effects - I can implement:
1. **Parallax scrolling** - Background images move slower than foreground content, creating a depth effect
2. **Scroll-linked animations** - Elements animate proportionally to scroll position (not just on/off, but continuously as you scroll)
3. **Scroll progress indicators** - Visual progress bars showing scroll progress through sections

For the About page, I'm thinking:
- **Scroll-triggered reveals** (fade/slide in when sections enter viewport) - This matches what you described
- **Optional:** Subtle parallax on background images in sections that have background images (like the CEO/Founder, Vision, and More About sections)

Do you want any of these parallax effects, or just the scroll-triggered reveals?

**Answer:** "yes i want the scroll-linked animations" - User wants scroll-linked animations where elements animate proportionally to scroll position (not just on/off, but continuously as user scrolls through sections).

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
No visual assets to analyze.

## Requirements Summary

### Functional Requirements
- Implement scroll-linked animations on all sections of the About page (elements animate proportionally to scroll position)
- Use Framer Motion library for animations
- Animations should be quick and minimal
- Each section should animate continuously as user scrolls through it (proportional to scroll position, not just on/off)
- Animations should re-trigger for each new section as user scrolls
- Apply staggered timing to elements within each section (e.g., image first, then heading, then text)
- Optimize animations for smooth 60fps performance
- All sections should animate (no exclusions)
- Current animations are not working (everything is static), so need to implement working solution
- Use Framer Motion's `useScroll` or `useMotionValue` hooks for scroll-linked animations

### Reusability Opportunities
- Reference existing `scrollAnimations.js` utility for Intersection Observer pattern (but will use Framer Motion instead)
- Reference Home page animation patterns for staggered delays
- Use existing CSS animation definitions as fallback or reference
- Current `.ftco-animate` class system exists but not working - may need to replace with Framer Motion components

### Scope Boundaries
**In Scope:**
- Implementing Framer Motion library
- Adding scroll-triggered animations to all About page sections
- Staggered animations within sections
- Performance optimization for 60fps
- Quick, minimal animation effects
- Section-by-section animation triggers

**Out of Scope:**
- Parallax effects (background images moving at different speeds) - not requested
- Scroll progress indicators (visual progress bars) - not requested
- Animation library other than Framer Motion

### Technical Considerations
- Need to install Framer Motion library (`npm install framer-motion`)
- Replace or enhance existing `initScrollAnimations()` approach
- Use Framer Motion's `motion` components with `useScroll` or `useMotionValue` hooks for scroll-linked animations
- Use `useScroll` hook to track scroll progress through each section
- Map scroll progress to animation values (e.g., opacity, transform) using `useTransform` or `useMotionValueEvent`
- Ensure animations respect `prefers-reduced-motion` setting
- Optimize using GPU-accelerated properties (transform, opacity)
- Consider using Framer Motion's `AnimatePresence` for section transitions
- May need to refactor existing `.ftco-animate` class-based system
- Scroll-linked animations should be smooth and continuous, responding to scroll position in real-time
- Sections to animate:
  1. Hero Section (already uses Hero component)
  2. Company Overview Section
  3. CEO and Founder Section
  4. Mission Section
  5. Vision Section
  6. Services List Section
  7. More About Section
  8. Compliance Information Section
  9. Company Structure Section (team member cards)
  10. Company Profiles Download Section
