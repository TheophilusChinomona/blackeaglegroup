# Specification: ClientCard Aceternity UI Redesign

**Spec Date:** 2026-01-01  
**Status:** Draft  
**Priority:** High

---

## Executive Summary

This specification details the integration of Aceternity UI effects into the existing ClientCard component. The goal is to add premium, animated hover effects that enhance user engagement while preserving all existing brand guide styling and maintaining excellent performance for 50+ cards.

**Key Deliverables:**
1. New `3d-card.jsx` component in `/components/ui/` (for Featured cards)
2. New `card-spotlight.jsx` component in `/components/ui/` (lightweight, for Regular cards)
3. Refactored `ClientCard.jsx` with conditional effect rendering
4. Intersection Observer integration for performance optimization
5. Accessibility compliance (prefers-reduced-motion support)

---

## Table of Contents

1. [Goals & Success Criteria](#goals--success-criteria)
2. [Technical Architecture](#technical-architecture)
3. [Component Specifications](#component-specifications)
4. [Integration Strategy](#integration-strategy)
5. [Performance Optimization](#performance-optimization)
6. [Accessibility Requirements](#accessibility-requirements)
7. [Testing & Quality Assurance](#testing--quality-assurance)

---

## Goals & Success Criteria

### Primary Goals

1. **Add Premium Visual Effects**: Integrate Aceternity UI 3D Card effect for featured clients and a lightweight spotlight effect for regular clients
2. **Preserve Brand Identity**: Maintain ALL existing brand guide styling (green border, typography, buttons)
3. **Optimize Performance**: Ensure smooth 60fps animations even with 50+ cards visible
4. **Maintain Accessibility**: Respect prefers-reduced-motion and keyboard navigation

### Success Criteria

- [ ] 3D Card effect works on Featured ClientCards with perspective tilt on hover
- [ ] Spotlight effect works on Regular ClientCards with cursor-following gradient
- [ ] All brand guide styling preserved (4px green border, serif fonts, button grid)
- [ ] Animations only activate for visible cards (Intersection Observer)
- [ ] No new heavy dependencies added (no Three.js)
- [ ] Reduced motion preference disables all effects
- [ ] No visual regressions on existing Clients page
- [ ] Page load time impact < 50ms
- [ ] Lighthouse Performance score remains > 85

---

## Technical Architecture

### Project Context

| Aspect | Current State |
|--------|---------------|
| **Framework** | React 18 + Vite |
| **Language** | JavaScript (JSX) |
| **Styling** | Tailwind CSS v3.4.19 |
| **UI Components** | shadcn/ui structure at `/components/ui/` |
| **Animation Library** | Framer Motion v12.23.26 ✅ |
| **cn Utility** | `@/lib/utils.js` and `@/utils/index.js` |

### New Components

```
BlackEagleGroup.React/
└── src/
    └── components/
        └── ui/
            ├── 3d-card.jsx          # NEW - Aceternity 3D Card (Featured)
            └── card-spotlight.jsx    # NEW - Lightweight spotlight (Regular)
```

### Dependency Decision

**Card Spotlight Alternative (Recommended):**

The original Aceternity Card Spotlight requires heavy dependencies (Three.js, React Three Fiber, ~500KB+). Instead, we will create a **lightweight custom spotlight** using only Framer Motion:

| Approach | Dependencies | Bundle Impact | Performance |
|----------|-------------|---------------|-------------|
| Aceternity Card Spotlight | Three.js, @react-three/fiber | +500KB | Heavy (WebGL) |
| **Custom Spotlight (Selected)** | None (Framer Motion) | ~0KB | Light (CSS gradients) |

The custom spotlight will use:
- `useMotionValue` and `useMotionTemplate` from Framer Motion
- Radial gradient that follows mouse cursor
- CSS transitions for smooth opacity changes

---

## Component Specifications

### 1. 3D Card Component (`3d-card.jsx`)

**Purpose:** Wrap Featured ClientCards with perspective-based 3D tilt effect on hover.

**Location:** `src/components/ui/3d-card.jsx`

**Exports:**
- `CardContainer` - Outer wrapper with perspective
- `CardBody` - Card body with preserve-3d
- `CardItem` - Individual elements that float on hover
- `useMouseEnter` - Hook for accessing hover state

**Implementation (converted from TypeScript):**

```jsx
import { cn } from "@/lib/utils"
import React, { createContext, useState, useContext, useRef, useEffect } from "react"

const MouseEnterContext = createContext(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}) => {
  const containerRef = useRef(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / 25
    const y = (e.clientY - top - height / 2) / 25
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
  }

  const handleMouseEnter = () => {
    setIsMouseEntered(true)
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({ children, className }) => {
  return (
    <div
      className={cn(
        "[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    handleAnimations()
  }, [isMouseEntered])

  const handleAnimations = () => {
    if (!ref.current) return
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
    }
  }

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider")
  }
  return context
}
```

**Key Modifications from Original:**
- Removed `"use client"` directive (Next.js-specific)
- Removed TypeScript type annotations
- Removed default `py-20` padding from CardContainer (conflicts with card layout)
- Changed import path to `@/lib/utils`

---

### 2. Card Spotlight Component (`card-spotlight.jsx`)

**Purpose:** Add a subtle spotlight effect that follows the cursor for Regular ClientCards.

**Location:** `src/components/ui/card-spotlight.jsx`

**Implementation (Custom Lightweight Version):**

```jsx
import { cn } from "@/lib/utils"
import { useMotionValue, motion, useMotionTemplate } from "framer-motion"
import React, { useState } from "react"

export const CardSpotlight = ({
  children,
  radius = 250,
  color = "rgba(75, 148, 0, 0.15)", // Brand green with low opacity
  className,
  ...props
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  return (
    <div
      className={cn("group/spotlight relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px rounded-xl opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          backgroundColor: color,
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
```

**Key Design Decisions:**
- Uses brand green color (`#4B9400`) with 15% opacity for subtle effect
- No Three.js or WebGL dependencies
- Radius of 250px provides good coverage without being overwhelming
- Spotlight sits behind content (z-0) so it doesn't interfere with buttons

---

### 3. Refactored ClientCard Component

**Location:** `src/components/ClientCard.jsx`

**Changes Required:**

1. Import new components conditionally
2. Wrap content with appropriate effect based on `featured` prop
3. Add Intersection Observer for visibility detection
4. Respect reduced motion preference

**Updated Component Structure:**

```jsx
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/utils'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { CardSpotlight } from '@/components/ui/card-spotlight'

const ClientCard = ({ 
  image, 
  name, 
  location, 
  referenceLink, 
  phoneNumber,
  className,
  industry,
  featured = false,
  industryColor,
  logo,
  description
}) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    setPrefersReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  }, [])

  // Intersection Observer for visibility-based effect activation
  useEffect(() => {
    if (prefersReducedMotion) return // Skip if reduced motion preferred
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  const logoSrc = logo || image
  
  // Card content (shared between both variants)
  const cardContent = (
    <article 
      className={cn(
        "client-card bg-white rounded-xl overflow-hidden",
        "shadow-card hover:shadow-card-hover",
        "border-t-4 border-t-brand-primary",
        "transition-all duration-300 ease-out",
        !featured && "hover:-translate-y-1", // Keep lift for non-3D cards
        featured && "border-t-[5px]"
      )}
    >
      {/* Logo Area */}
      <div 
        className={cn(
          "flex items-center justify-center bg-white border-b border-gray-100",
          "p-6",
          featured ? "h-[160px] md:h-[160px]" : "h-[120px]"
        )}
      >
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt={`${name} logo`}
            className="max-w-full max-h-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center">
            <span className="text-2xl font-serif text-brand-dark">
              {name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div className="p-6 text-center">
        <h3 
          className={cn(
            "font-serif font-medium text-brand-dark mb-2 leading-tight",
            featured ? "text-2xl" : "text-xl md:text-2xl"
          )}
        >
          {name}
        </h3>
        
        {(location || industry) && (
          <p className="text-xs uppercase tracking-wider text-brand-muted font-semibold mb-6">
            {location && <span>{location}</span>}
            {location && industry && <span className="mx-1">—</span>}
            {industry && <span>{industry}</span>}
          </p>
        )}
        
        <div className={cn(
          "grid gap-3",
          phoneNumber && referenceLink ? "grid-cols-2" : "grid-cols-1"
        )}>
          {phoneNumber && (
            <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="btn-call">
              Call
            </a>
          )}
          {referenceLink && (
            <a
              href={referenceLink.startsWith('mailto:') || referenceLink.startsWith('http') 
                ? referenceLink 
                : `mailto:${referenceLink}`}
              className="btn-reference"
            >
              Reference
            </a>
          )}
        </div>
      </div>
    </article>
  )

  // Render with appropriate effect wrapper
  const shouldAnimate = isVisible && !prefersReducedMotion

  if (featured && shouldAnimate) {
    // Featured cards get 3D effect
    return (
      <div ref={cardRef} className={cn('mb-4', className)}>
        <CardContainer containerClassName="p-0">
          <CardBody className="w-full">
            <CardItem translateZ={50} className="w-full">
              {cardContent}
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    )
  }

  if (!featured && shouldAnimate) {
    // Regular cards get spotlight effect
    return (
      <div ref={cardRef} className={cn('mb-4', className)}>
        <CardSpotlight className="rounded-xl">
          {cardContent}
        </CardSpotlight>
      </div>
    )
  }

  // Fallback: no effects (not visible or reduced motion)
  return (
    <div ref={cardRef} className={cn('mb-4', className)}>
      {cardContent}
    </div>
  )
}

export default ClientCard
```

---

## Integration Strategy

### Phase 1: Create Base Components

1. Create `src/components/ui/3d-card.jsx`
   - Convert TypeScript to JavaScript
   - Test in isolation

2. Create `src/components/ui/card-spotlight.jsx`
   - Implement lightweight version
   - Test in isolation

### Phase 2: Update ClientCard

1. Add imports for new components
2. Add Intersection Observer logic
3. Implement conditional rendering based on `featured` prop
4. Add reduced motion support

### Phase 3: Integration Testing

1. Test on Clients page with all card types
2. Verify Featured section uses 3D effect
3. Verify Industry sections use spotlight effect
4. Test scroll performance with 50+ cards

---

## Performance Optimization

### Intersection Observer Strategy

```javascript
const observer = new IntersectionObserver(
  ([entry]) => {
    setIsVisible(entry.isIntersecting)
  },
  { 
    threshold: 0.1,      // Trigger when 10% visible
    rootMargin: '50px'   // Pre-load 50px before entering viewport
  }
)
```

**Benefits:**
- Effects only activate for visible cards
- Reduces GPU/CPU load for off-screen cards
- Pre-loading margin ensures smooth transition when scrolling

### Animation Performance Guidelines

1. **Use `transform` and `opacity` only** - GPU-accelerated properties
2. **Avoid `will-change` abuse** - Only set on actively animating elements
3. **Use `transition` over continuous animation** - Less CPU intensive
4. **Batch DOM reads/writes** - Avoid layout thrashing in mouse handlers

### Bundle Size Impact

| Component | Estimated Size | Notes |
|-----------|---------------|-------|
| `3d-card.jsx` | ~2KB | Pure React, no deps |
| `card-spotlight.jsx` | ~1.5KB | Uses existing Framer Motion |
| **Total** | ~3.5KB | Minimal impact |

---

## Accessibility Requirements

### Reduced Motion Support

```javascript
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

useEffect(() => {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  setPrefersReducedMotion(mediaQuery.matches)
  
  // Listen for changes
  const handler = (e) => setPrefersReducedMotion(e.matches)
  mediaQuery.addEventListener('change', handler)
  return () => mediaQuery.removeEventListener('change', handler)
}, [])
```

**Behavior:**
- When `prefers-reduced-motion: reduce` is set, cards render without effects
- All hover states and shadows still work (non-motion effects)
- Focus states remain fully functional

### Keyboard Navigation

- All buttons remain keyboard accessible
- Focus indicators unchanged
- No focus traps introduced

### Screen Reader Support

- Semantic HTML structure preserved (`<article>`, `<h3>`)
- Alt text on logos unchanged
- No ARIA changes required

---

## Testing & Quality Assurance

### Unit Tests

1. **3d-card.jsx**
   - Renders children correctly
   - MouseEnterContext provides expected values
   - Transform styles apply on hover

2. **card-spotlight.jsx**
   - Renders children correctly
   - Spotlight gradient follows mouse position
   - Respects custom radius and color props

3. **ClientCard.jsx**
   - Renders with all prop combinations
   - Featured cards use 3D wrapper
   - Regular cards use spotlight wrapper
   - Reduced motion disables effects

### Integration Tests

1. Clients page loads without errors
2. Featured section displays with 3D effects
3. Industry sections display with spotlight effects
4. Scroll performance is smooth (no jank)
5. Mobile touch interactions work correctly

### Visual Regression Tests

1. Compare Featured ClientCard before/after
2. Compare Regular ClientCard before/after
3. Verify brand colors preserved
4. Verify button styling unchanged

### Performance Tests

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | Baseline |
| Largest Contentful Paint | < 2.5s | Baseline |
| Cumulative Layout Shift | < 0.1 | Baseline |
| Time to Interactive | < 3.5s | Baseline |
| Lighthouse Performance | > 85 | Baseline |

### Browser Testing Matrix

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | Latest 2 | High |
| Firefox | Latest 2 | High |
| Safari | Latest 2 | High |
| Edge | Latest 2 | Medium |
| Mobile Chrome | Latest | High |
| Mobile Safari | Latest | High |

---

## Rollback Plan

If issues arise after deployment:

1. **Quick Fix:** Remove effect wrappers, return to static cards
2. **Component Isolation:** Delete new UI components, revert ClientCard imports
3. **Full Rollback:** Git revert to pre-implementation commit

---

## Future Considerations

After successful implementation, consider:

1. **Apply to other cards:** EventCard, ServiceCard could use similar effects
2. **Button effects:** Aceternity Moving Border or Hover Border Gradient
3. **Section backgrounds:** Spotlight or Grid backgrounds for page sections
4. **Logo showcase:** Infinite Moving Cards for client logo carousel

These are explicitly **out of scope** for this implementation but noted for future specs.
