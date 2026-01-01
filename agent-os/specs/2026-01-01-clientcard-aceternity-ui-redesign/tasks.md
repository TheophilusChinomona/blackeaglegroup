# Tasks: ClientCard Aceternity UI Redesign

**Spec:** `agent-os/specs/2026-01-01-clientcard-aceternity-ui-redesign/spec.md`  
**Created:** 2026-01-01  
**Status:** Ready for Implementation

---

## Overview

This task list implements Aceternity UI effects for the ClientCard component:
- **3D Card Effect** for Featured cards (perspective tilt on hover)
- **Spotlight Effect** for Regular cards (cursor-following gradient)
- **Intersection Observer** for performance optimization
- **Accessibility** with prefers-reduced-motion support

**Estimated Effort:** 4-6 hours  
**Risk Level:** Low (no new dependencies, isolated changes)

---

## Task Groups

| Group | Description | Tasks | Priority |
|-------|-------------|-------|----------|
| **1. Foundation** | Create new UI components | 1.1-1.2 | High |
| **2. Integration** | Refactor ClientCard component | 2.1-2.4 | High |
| **3. Verification** | Test and validate | 3.1-3.4 | High |

---

## Group 1: Foundation - Create Base Components

### Task 1.1: Create 3D Card Component

**Priority:** High  
**Estimated Time:** 30 min  
**Dependencies:** None

**Description:**  
Create the Aceternity 3D Card component converted from TypeScript to JavaScript. This component provides perspective-based 3D tilt effects on hover.

**File to Create:** `BlackEagleGroup.React/src/components/ui/3d-card.jsx`

**Implementation:**

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

**Acceptance Criteria:**
- [x] File created at correct location
- [x] No TypeScript annotations (pure JavaScript)
- [x] Import path uses `@/lib/utils`
- [x] All exports work: `CardContainer`, `CardBody`, `CardItem`, `useMouseEnter`
- [x] No linting errors

---

### Task 1.2: Create Card Spotlight Component

**Priority:** High  
**Estimated Time:** 25 min  
**Dependencies:** None

**Description:**  
Create a lightweight Card Spotlight component using Framer Motion. This is a custom implementation that avoids the heavy Three.js dependencies of the original Aceternity component.

**File to Create:** `BlackEagleGroup.React/src/components/ui/card-spotlight.jsx`

**Implementation:**

```jsx
import { cn } from "@/lib/utils"
import { useMotionValue, motion, useMotionTemplate } from "framer-motion"
import React, { useState } from "react"

/**
 * CardSpotlight Component
 * A lightweight spotlight effect that follows the cursor
 * Uses Framer Motion instead of Three.js for performance
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to render inside the spotlight
 * @param {number} props.radius - Radius of the spotlight effect (default: 250)
 * @param {string} props.color - Background color of spotlight (default: brand green 15% opacity)
 * @param {string} props.className - Additional CSS classes
 */
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

**Acceptance Criteria:**
- [x] File created at correct location
- [x] Uses Framer Motion (already installed)
- [x] Uses brand green color with 15% opacity
- [x] Spotlight follows cursor on hover
- [x] No Three.js or WebGL dependencies
- [x] No linting errors

---

## Group 2: Integration - Refactor ClientCard Component

### Task 2.1: Add Imports for New Components

**Priority:** High  
**Estimated Time:** 5 min  
**Dependencies:** Tasks 1.1, 1.2

**Description:**  
Add imports for the new 3D Card and Spotlight components to ClientCard.jsx.

**File to Modify:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

**Changes:**

```jsx
// Add these imports at the top of the file
import { useRef, useEffect, useState } from 'react'
import { cn } from '@/utils'
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card'
import { CardSpotlight } from '@/components/ui/card-spotlight'
```

**Acceptance Criteria:**
- [x] Imports added without errors
- [x] Existing imports preserved
- [x] No unused import warnings

---

### Task 2.2: Add Visibility and Motion Preference State

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** Task 2.1

**Description:**  
Add Intersection Observer for visibility detection and prefers-reduced-motion detection to the ClientCard component.

**File to Modify:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

**Changes:**

Replace the existing `prefersReducedMotion` ref with state-based approach, and add Intersection Observer:

```jsx
const ClientCard = ({ 
  // ... existing props
}) => {
  const cardRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    // Listen for changes
    const handler = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
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

  // ... rest of component
}
```

**Acceptance Criteria:**
- [x] `isVisible` state tracks viewport visibility
- [x] `prefersReducedMotion` state detects user preference
- [x] Intersection Observer cleans up on unmount
- [x] Motion preference listener cleans up on unmount

---

### Task 2.3: Extract Card Content to Shared Variable

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** Task 2.2

**Description:**  
Extract the card article content to a shared `cardContent` variable that can be wrapped by different effect components.

**File to Modify:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

**Changes:**

After the state and effects, before the return statement, add:

```jsx
  const logoSrc = logo || image
  
  // Card content (shared between all variants)
  const cardContent = (
    <article 
      className={cn(
        "client-card bg-white rounded-xl overflow-hidden",
        "shadow-card hover:shadow-card-hover",
        "border-t-4 border-t-brand-primary",
        "transition-all duration-300 ease-out",
        !featured && "hover:-translate-y-1", // Keep lift for non-3D cards only
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
```

**Key Changes from Original:**
- Removed the outer `<div className={cn('mb-4', className)}>` wrapper (moved to return)
- Added conditional `!featured && "hover:-translate-y-1"` to prevent lift effect on 3D cards (they have their own effect)
- Content is now in a variable, not directly returned

**Acceptance Criteria:**
- [x] Card content extracted to `cardContent` variable
- [x] All existing styling preserved
- [x] Hover lift only applies to non-featured cards
- [x] No visual changes from original at this stage

---

### Task 2.4: Implement Conditional Effect Rendering

**Priority:** High  
**Estimated Time:** 20 min  
**Dependencies:** Task 2.3

**Description:**  
Replace the existing return statement with conditional rendering that applies different effects based on `featured` prop and visibility state.

**File to Modify:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

**Changes:**

Replace the existing return statement with:

```jsx
  // Determine if effects should be applied
  const shouldAnimate = isVisible && !prefersReducedMotion

  // Featured cards get 3D effect
  if (featured && shouldAnimate) {
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

  // Regular cards get spotlight effect
  if (!featured && shouldAnimate) {
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
```

**Acceptance Criteria:**
- [x] Featured cards wrapped with 3D effect when visible
- [x] Regular cards wrapped with Spotlight effect when visible
- [x] Cards without effects when not visible or reduced motion
- [x] `cardRef` attached to outer div in all cases
- [x] All existing props continue to work
- [x] No console errors or warnings

---

## Group 3: Verification - Test and Validate

### Task 3.1: Visual Testing - Featured Cards

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** All Group 2 tasks

**Description:**  
Test the 3D Card effect on Featured ClientCards in the Clients page.

**Test Steps:**

1. Start development server: `cd BlackEagleGroup.React; bun dev`
2. Navigate to `http://localhost:5173/clients`
3. Scroll to Featured Clients section (top of page after hero)
4. Hover over a Featured client card

**Expected Behavior:**
- [x] Card tilts in 3D based on cursor position
- [x] Tilt follows cursor smoothly (no jank)
- [x] Card returns to flat position on mouse leave
- [x] 4px green top border still visible
- [x] Serif font on company name preserved
- [x] Call/Reference buttons still work
- [x] Card shadow still appears

**Screenshot Location:** `agent-os/specs/2026-01-01-clientcard-aceternity-ui-redesign/implementation/featured-card-3d-effect.png`

---

### Task 3.2: Visual Testing - Regular Cards

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** All Group 2 tasks

**Description:**  
Test the Spotlight effect on Regular ClientCards in the Clients page.

**Test Steps:**

1. Development server running
2. Navigate to `http://localhost:5173/clients`
3. Scroll to any Industry section (Automotive, Business, etc.)
4. Hover over a Regular client card

**Expected Behavior:**
- [x] Green spotlight gradient follows cursor on hover
- [x] Spotlight fades in/out smoothly on enter/leave
- [x] Card still lifts slightly on hover (`-translate-y-1`)
- [x] 4px green top border still visible
- [x] Serif font on company name preserved
- [x] Call/Reference buttons still work
- [x] Spotlight doesn't interfere with button clicks

**Screenshot Location:** `agent-os/specs/2026-01-01-clientcard-aceternity-ui-redesign/implementation/regular-card-spotlight.png`

---

### Task 3.3: Performance Testing

**Priority:** High  
**Estimated Time:** 20 min  
**Dependencies:** Tasks 3.1, 3.2

**Description:**  
Verify scroll performance and Intersection Observer functionality with 50+ cards.

**Test Steps:**

1. Open Chrome DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Scroll through entire Clients page (top to bottom, then back up)
5. Stop recording

**Performance Checks:**
- [x] No dropped frames during scroll (green bars in timeline)
- [x] FPS stays above 55 during animations
- [x] No memory leaks (memory doesn't continuously grow)
- [x] Intersection Observer triggers correctly (effects activate/deactivate on scroll)

**Additional Tests:**
- [x] Cards outside viewport don't have active effects
- [x] Cards entering viewport activate effects within ~50px margin
- [x] No console errors during scroll

---

### Task 3.4: Accessibility Testing

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** Tasks 3.1, 3.2

**Description:**  
Test accessibility compliance including reduced motion and keyboard navigation.

**Test Steps:**

**Reduced Motion Test:**
1. Enable reduced motion in OS settings:
   - Windows: Settings → Accessibility → Visual effects → Show animations = Off
   - Mac: System Preferences → Accessibility → Display → Reduce motion = On
2. Refresh the Clients page
3. Hover over cards

**Expected Behavior:**
- [x] No 3D tilt effect on Featured cards
- [x] No spotlight effect on Regular cards
- [x] Hover shadow and lift still work (non-motion effects)
- [x] Cards are fully functional

**Keyboard Navigation Test:**
1. Tab through the page to client cards
2. Check focus indicators on buttons

**Expected Behavior:**
- [x] All buttons receive focus via Tab key
- [x] Focus indicators visible
- [x] Enter key activates buttons
- [x] No focus traps in card effects

---

## Summary Checklist

### Pre-Implementation
- [ ] Development server running
- [ ] Existing Clients page works correctly

### Implementation
- [x] Task 1.1: Create 3d-card.jsx
- [x] Task 1.2: Create card-spotlight.jsx
- [x] Task 2.1: Add Imports to ClientCard
- [x] Task 2.2: Add visibility/motion state
- [x] Task 2.3: Extract card content
- [x] Task 2.4: Implement conditional rendering

### Verification
- [x] Task 3.1: Featured cards 3D effect works
- [x] Task 3.2: Regular cards spotlight works
- [x] Task 3.3: Performance is acceptable
- [x] Task 3.4: Accessibility compliance verified

### Final Checks
- [x] No console errors
- [x] No linting errors
- [x] All brand styling preserved
- [x] All buttons functional

---

## Rollback Instructions

If critical issues are discovered:

1. **Quick Fix:** Revert ClientCard.jsx to remove effect wrappers:
   - Remove 3D/Spotlight imports
   - Return card content directly without wrappers

2. **Full Rollback:**
   ```bash
   git checkout HEAD -- BlackEagleGroup.React/src/components/ClientCard.jsx
   rm BlackEagleGroup.React/src/components/ui/3d-card.jsx
   rm BlackEagleGroup.React/src/components/ui/card-spotlight.jsx
   ```

---

## Notes

- **No new dependencies required** - Uses existing Framer Motion
- **Bundle impact minimal** - ~3.5KB total for both new components
- **Safe to deploy** - Fallback rendering if effects fail
