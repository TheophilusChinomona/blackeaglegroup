# Property Services Page Redesign - Shaping Notes

## Initial Analysis

### Current State
The PropertyServices.jsx page is currently a basic static page with:
- Hero component (already consistent with site design)
- Static service cards using ServiceCard component (3-column grid)
- Basic text content for Overview and Expertise sections
- No scroll animations or motion effects
- Standard ftco-section styling

### Design Patterns from Home & About Pages

**Home Page Patterns:**
- Uses `initScrollAnimations()` utility with `ftco-animate` class
- Staggered animation delays via refs (50ms increments for cards, 100ms for text)
- `section-alt-1` and `section-alt-2` for alternating section backgrounds
- Service cards in 4-column grid with icon wrappers
- Split layout sections (image left, text right)

**About Page Patterns:**
- Uses Framer Motion (`motion` from 'framer-motion')
- Scroll-triggered animations via `useScroll` and `useTransform`
- Scroll progress offsets instead of time-based delays
- Section components for each logical content block
- Split sections: `about-split-section` with `about-image-col` + `wrap-about`
- Dark background sections with overlays (`services-section img` + `overlay`)
- Staggered list item animations
- Card animations with scroll progress

### Frontend Design Skill Requirements
- Avoid generic AI aesthetics
- Use bold typography choices
- Motion effects for high-impact moments
- Scroll-triggered animations
- Cohesive aesthetic matching the site

---

## User Decisions

### 1. Animation Approach ✅
**Choice: A - Framer Motion (like About page)**
- Use scroll-triggered animations via `useScroll` and `useTransform`
- Scroll progress offsets for staggered reveals
- Consistent with the About page's sophisticated motion design

### 2. Service Cards Layout ✅
**Choice: A - Keep existing ServiceCard with scroll animations**
- Retain the current ServiceCard component
- Add Framer Motion scroll animations
- Implement stagger effects (50ms increments converted to scroll progress)
- 3-column grid layout preserved

### 3. Dark/Light Section Rhythm ✅
**Choice: C - Alternating rhythm like About page**
- Light section for service cards introduction
- Dark section for Overview/Expertise content
- Light section for additional details/CTAs
- Creates visual interest and breaks up content

### 4. Overview/Expertise Content Treatment ✅
**Choice: B - Split layout with background image**
- Transform into visually distinct section
- Use split layout (image + text) similar to About page sections
- Background image with overlay for dark sections
- Scroll-triggered text animations

### 5. Property Services Specific Hero ✅
**Choice: B - Property-specific background image**
- Add a property-related hero background
- Maintain Hero component structure
- Use an existing property image from `/images/` folder

---

## Implementation Scope

### Components to Create/Modify
1. **PropertyServices.jsx** - Complete redesign with Framer Motion
2. Reuse existing components:
   - `ServiceCard` (add motion wrapper)
   - `Hero` (with property-specific background)

### Section Structure (Proposed)
1. **Hero Section** - Property-specific background
2. **Services Introduction** (light) - Animated heading + subheading
3. **Service Cards Grid** (light) - 5 cards with staggered scroll animations
4. **Our Expertise Section** (dark) - Split layout with background image overlay
5. **What We Handle Section** (light) - Split layout with bullet list
6. **CTA Section** (dark) - Call to action for contact

### Images to Use
- Hero: `/images/cp.jpg` or `/images/BC.jpg` (property-related)
- Dark sections: `/images/bg_6.jpg` (consistent with About page)
- Split section images: Existing property images from the service cards

### Animation Specifications
- Scroll progress offsets matching About page patterns
- Staggered reveals: 0.05 increments for sequential elements
- Y-axis translations: 20px → 0px
- Opacity: 0 → 1
- Respect `prefers-reduced-motion` accessibility preference

---

## Visual Assets

### Available Images (in /public/images/)
- `/images/cp.jpg` - Commercial Property
- `/images/cb.jpg` - Residential Property  
- `/images/TR.jpg` - Township Rentals
- `/images/BC.jpg` - Body Corporate
- `/images/Abnb.jpg` - Airbnb/Short-Term
- `/images/bg_6.jpg` - Dark background (used in About page)

### Recommended Usage
- **Hero background**: `/images/cp.jpg` (Commercial Property - professional look)
- **Dark overlay sections**: `/images/bg_6.jpg` (consistent branding)
- **Service cards**: Keep existing per-service images
