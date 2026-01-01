# Spec Requirements: ClientCard Aceternity UI Redesign

## Initial Description

Apply Aceternity UI components and effects to the ClientCard component (`BlackEagleGroup.React/src/components/ClientCard.jsx`). The goal is to add premium animated hover effects while preserving the existing brand guide styling.

## Requirements Discussion

### First Round Questions

**Q1:** Which Aceternity UI effect would you prefer - Card Spotlight, Glare Card, 3D Card Effect, or another option?
**Answer:** Use the 3D Card Effect. User provided the complete component code for integration.

**Q2:** Installation approach - CLI method or manual?
**Answer:** CLI method preferred, but user provided manual component code to integrate.

**Q3:** Should we preserve all brand guide styling and add Aceternity effects as enhancements?
**Answer:** Correct - keep all brand elements (4px green top border, serif typography, buttons, hover lift) and add Aceternity effects as enhancements.

**Q4:** Should effects apply to all cards or differentiate between Featured and Regular?
**Answer:** Different effects for each:
- **3D Card Effect** for Featured cards (more dramatic)
- **Card Spotlight** for Regular cards (subtle, premium)

**Q5:** Performance approach for 50+ client cards?
**Answer:** Apply effects only to visible cards using Intersection Observer.

**Q6:** Scope - ClientCard only or additional components?
**Answer:** Only ClientCard for now (no button effects, background effects, or logo showcase changes).

**Q7:** What's explicitly out of scope?
**Answer:** Not explicitly stated, but implied scope is ClientCard component only.

### Existing Code to Reference

**Similar Features Identified:**
- Component: `ClientCard.jsx` - Path: `BlackEagleGroup.React/src/components/ClientCard.jsx`
- Existing shadcn/ui components at: `BlackEagleGroup.React/src/components/ui/`
- `cn` utility at: `BlackEagleGroup.React/src/lib/utils.js` and `src/utils/index.js`
- Framer Motion already installed and used in `Clients.jsx` page

**Project Structure Verification:**
- **Language:** JavaScript (JSX) - NOT TypeScript
- **Tailwind CSS:** v3.4.19 (not v4.0 - component code needs adaptation)
- **shadcn/ui structure:** ✅ Exists at `/components/ui/`
- **Framer Motion:** ✅ Already installed (v12.23.26)
- **cn utility:** ✅ Available at `@/lib/utils`

### Follow-up Questions

No additional follow-up questions needed - user provided comprehensive answers and component code.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
N/A - No mockups or wireframes. Implementation should follow Aceternity UI's default component styling adapted to brand colors.

## Requirements Summary

### Functional Requirements

1. **Create 3D Card Component**
   - Add `3d-card.jsx` to `src/components/ui/` folder
   - Convert provided TypeScript code to JavaScript (JSX)
   - Ensure compatibility with Tailwind v3.4 (not v4)

2. **Create Card Spotlight Component**
   - Add `card-spotlight.jsx` to `src/components/ui/` folder
   - For use with regular (non-featured) client cards

3. **Refactor ClientCard Component**
   - Integrate 3D Card effect for `featured={true}` cards
   - Integrate Card Spotlight effect for regular cards
   - Preserve ALL existing brand guide styling:
     - 4px green top border (`border-t-4 border-t-brand-primary`)
     - Serif typography for company names
     - Call/Reference button 2-column grid
     - Existing hover lift effect (can be enhanced with 3D)
   - Maintain backward compatibility with existing props

4. **Performance Optimization**
   - Use Intersection Observer to apply effects only to visible cards
   - Respect `prefers-reduced-motion` for accessibility
   - Lazy-load animation effects to minimize initial bundle impact

### Technical Considerations

- **TypeScript to JavaScript Conversion Required:**
  - Remove type annotations from provided component code
  - Change file extension from `.tsx` to `.jsx`
  - Remove `"use client"` directive (Next.js specific, not needed in Vite)

- **Import Path Adjustments:**
  - Use `@/lib/utils` for `cn` utility (already exists)
  - Use `@/components/ui/3d-card` for component imports

- **Integration Points:**
  - `ClientCard.jsx` - main component to refactor
  - `Clients.jsx` page - already uses Framer Motion, compatible
  - `AnimatedClientCard` wrapper in `Clients.jsx` - may need adjustment

- **Dependencies:**
  - No new dependencies needed (Framer Motion already installed)

### Scope Boundaries

**In Scope:**
- Create `3d-card.jsx` component in `/components/ui/`
- Create `card-spotlight.jsx` component in `/components/ui/`
- Refactor `ClientCard.jsx` to use new effects
- Intersection Observer for performance
- Accessibility considerations (reduced motion)

**Out of Scope:**
- Button effects (Moving Border, Hover Border Gradient)
- Background effects on sections
- Logo showcase section effects
- TypeScript migration
- Tailwind v4 upgrade
- Other pages or components

### Component Code Provided

User provided the following Aceternity UI 3D Card component code (TypeScript) that needs to be converted to JavaScript:

**3D Card Component (`3d-card.tsx` → `3d-card.jsx`):**
```jsx
// Context for mouse enter state
const MouseEnterContext = createContext(undefined);

// CardContainer - wrapper with perspective
export const CardContainer = ({ children, className, containerClassName }) => {
  // Mouse tracking for 3D rotation effect
  // Transform based on mouse position
};

// CardBody - the card body with preserve-3d
export const CardBody = ({ children, className }) => {
  // Container for card content
};

// CardItem - individual elements that float on hover
export const CardItem = ({ as: Tag = "div", children, className, translateX, translateY, translateZ, rotateX, rotateY, rotateZ, ...rest }) => {
  // Transforms individual elements on hover
};

// Hook to access mouse enter context
export const useMouseEnter = () => {
  // Returns mouse enter state
};
```

### Card Spotlight Component Analysis

**⚠️ IMPORTANT FINDING:** The Card Spotlight component from Aceternity UI has heavy dependencies:

**Required Dependencies:**
- `motion` (Framer Motion) - ✅ Already installed
- `three` - ❌ NOT installed (WebGL 3D library)
- `@react-three/fiber` - ❌ NOT installed (React renderer for Three.js)
- `@types/three` - ❌ NOT installed (TypeScript types)

**Component Complexity:**
- Requires `CanvasRevealEffect` subcomponent (WebGL shader-based)
- Uses WebGL shaders for the dot matrix animation effect
- Performance-intensive for multiple cards

**Recommendation:** 
Given the heavy dependencies and performance concerns for 50+ cards, consider one of these alternatives for regular cards:

1. **Custom Spotlight Effect (Recommended):**
   - Create a simpler CSS/Framer Motion-based spotlight without Three.js
   - Uses radial gradient that follows mouse cursor
   - No WebGL overhead

2. **Glare Card Effect:**
   - Lighter weight than Card Spotlight
   - URL: https://ui.aceternity.com/components/glare-card
   - No Three.js dependency

3. **Card Hover Effect:**
   - Sliding highlight between cards
   - URL: https://ui.aceternity.com/components/card-hover-effect
   - Pure CSS/Framer Motion

**Decision Point for Spec Writer:**
During implementation, evaluate whether to:
- Use the full Aceternity Card Spotlight (adds ~500KB+ bundle size)
- Create a simplified spotlight effect using only Framer Motion
- Use an alternative lighter component

### 3D Card Component (User Provided)

Full TypeScript source code was provided by user. Key implementation notes:

1. **MouseEnterContext** - React context for tracking hover state across card elements
2. **CardContainer** - Wrapper with CSS perspective (1000px) and mouse tracking
3. **CardBody** - Container with `transform-style: preserve-3d`
4. **CardItem** - Individual elements that translate/rotate on hover (translateZ for float effect)
5. **useMouseEnter** - Hook to access hover state

**Conversion Required:**
- Remove TypeScript type annotations
- Change `.tsx` to `.jsx`
- Remove `"use client"` directive
- Ensure `cn` import path matches project structure (`@/lib/utils`)
