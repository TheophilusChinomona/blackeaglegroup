# Spec Requirements: Homepage Sections Visual Improvements

## Initial Description

The home hero is now okay but i want you to use @.claude/skills/frontend-design/SKILL.md to make visual improvements on the services, why choose us dedication sections of the home page.

## Requirements Discussion

### First Round Questions

**Q1:** I want these sections to follow the existing theme on https://blackeaglegroup.co.za/ just for these sections only, the footer is fine
**Answer:** Follow existing theme from live site (https://blackeaglegroup.co.za/) - just for these sections only, footer is fine

**Q2:** Enhance the card design with hover effects, shadows, and animations these cards don't need any more detail they are fine as they are
**Answer:** Enhance service cards with hover effects, shadows, and animations. Cards don't need any more detail - they are fine as they are

**Q3:** Keep the split layout but enhance styling
**Answer:** Keep split layout for Why Choose Us section but enhance styling

**Q4:** the spacing is not like it looks on https://blackeaglegroup.co.za/ so for these sections I just want to recreate what is on the current live site
**Answer:** Recreate spacing from live site - spacing should match what is on the current live site (https://blackeaglegroup.co.za/)

**Q5:** Use the existing Playfair Display + Source Sans 3 pairing
**Answer:** Use existing typography pairing (Playfair Display + Source Sans 3)

**Q6:** Moderate (staggered reveals, scroll-triggered animations)
**Answer:** Moderate level animations - staggered reveals and scroll-triggered animations

**Q7:** Keep all existing content/text as-is
**Answer:** Keep all existing content/text as-is - no content changes

**Q8:** Only improve visual design
**Answer:** Only improve visual design - no functional changes

### Existing Code to Reference

**Similar Features Identified:**
- Live site HTML structure: `public_html/index.html` (lines 101-234) - Contains the exact structure and spacing for Services, Why Choose Us, and Dedication sections
- Live site CSS styling: `public_html/css/style.css` - Contains existing styling for:
  - `.services-section` (line 8884) - Section background and overlay styles
  - `.services` (line 8896) - Service card base styles with transitions
  - `.services.services-2` (line 8930) - Dedication section card styles with circular icon borders
  - `.ftco-section` (line 9049) - Section padding (6em top/bottom, 0 for no-pt/no-pb)
  - `.heading-section` (line 9196) - Heading styles with subheading and h2 formatting
  - `.heading-section.heading-section-white` (line 9213) - White text variant for dark backgrounds
- React implementation: `BlackEagleGroup.React/src/pages/Home.jsx` (lines 79-244) - Current React implementation of these sections
- Design system: `BlackEagleGroup.React/src/index.css` - Contains CSS variables and premium design system (Playfair Display, Source Sans 3, color variables, spacing scale)

**Components to potentially reuse:**
- Existing CSS classes: `.ftco-section`, `.services-section`, `.services`, `.services-2`, `.heading-section`, `.heading-section-white`
- Existing color scheme: Primary green (#59B200), accent gold (#C9A962), charcoal (#2D2D2D), cream (#F5F3EF)
- Existing spacing: Section padding 6em (96px), no-pt/no-pb classes for zero padding

**Backend logic to reference:**
- No backend logic required - these are static visual sections

### Follow-up Questions

No follow-up questions needed - all requirements are clear.

## Visual Assets

### Files Provided:

No visual assets provided.

### Visual Insights:

No visual assets to analyze. Reference will be the live site at https://blackeaglegroup.co.za/ for exact spacing and styling.

## Requirements Summary

### Functional Requirements

- **Services Section:**
  - Maintain existing 4-column grid layout with service cards
  - Enhance card design with hover effects, shadows, and animations
  - Keep existing content (icons/images and headings) - no additional text needed
  - Match spacing from live site (section padding, card spacing)
  - Apply moderate animations (staggered reveals, scroll-triggered)

- **Why Choose Us Section:**
  - Maintain split layout (image left, text right)
  - Enhance styling while keeping layout structure
  - Match spacing from live site
  - Apply moderate animations (staggered text reveals, scroll-triggered)

- **Dedication Section:**
  - Maintain existing dark overlay background with 4 dedication cards
  - Enhance card design with hover effects and animations
  - Keep existing circular icon borders (services-2 style)
  - Match spacing from live site
  - Apply moderate animations (staggered card reveals, scroll-triggered)

### Reusability Opportunities

- Reuse existing CSS classes from live site: `.ftco-section`, `.services-section`, `.services`, `.services-2`, `.heading-section`, `.heading-section-white`
- Leverage existing design system CSS variables from `src/index.css`
- Reference live site HTML structure in `public_html/index.html` for exact spacing and layout
- Use existing color scheme: Primary green (#59B200), accent gold (#C9A962), charcoal (#2D2D2D), cream (#F5F3EF)
- Maintain existing typography: Playfair Display for headings, Source Sans 3 for body text

### Scope Boundaries

**In Scope:**
- Visual design improvements for Services section (hover effects, shadows, animations)
- Visual design improvements for Why Choose Us section (enhanced styling, animations)
- Visual design improvements for Dedication section (hover effects, animations)
- Matching spacing from live site (https://blackeaglegroup.co.za/)
- Moderate animations (staggered reveals, scroll-triggered)
- Following existing theme from live site
- Using existing typography (Playfair Display + Source Sans 3)

**Out of Scope:**
- Content changes (all text remains as-is)
- Functional changes
- Footer modifications (footer is fine as-is)
- Hero section changes (hero is okay)
- Layout structure changes (maintain existing layouts)
- Additional descriptive text for service cards

### Technical Considerations

- **Spacing Reference:** Live site uses `.ftco-section` with `padding: 6em 0` (96px top/bottom). Sections with `.ftco-no-pt` or `.ftco-no-pb` have zero padding on that side
- **Color Scheme:** Use existing CSS variables from design system:
  - `--color-primary: #59B200` (green)
  - `--color-accent: #C9A962` (gold)
  - `--color-charcoal: #2D2D2D`
  - `--color-cream: #F5F3EF`
- **Typography:** Already imported in `src/index.css` - Playfair Display for headings, Source Sans 3 for body
- **Animation Library:** Can use CSS animations or consider Framer Motion/React Spring for scroll-triggered animations (moderate level)
- **Existing Classes:** Maintain compatibility with existing Bootstrap/React Bootstrap classes used in the React implementation
- **Responsive:** Ensure enhancements work across all breakpoints (mobile, tablet, desktop)
- **Performance:** Use GPU-accelerated properties (transform, opacity) for smooth animations

