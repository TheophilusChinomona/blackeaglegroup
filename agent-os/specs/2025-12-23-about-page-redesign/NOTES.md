# About Page Redesign - Spec Notes

## Overview
Redesign the Black Eagle Group About page with a **Premium/Luxury** aesthetic, following the same design principles used in the homepage redesign.

---

## Scope

### Design Principles (from Homepage Redesign)
- **Premium/Luxury aesthetic** - sophisticated, elegant, refined
- **Design System** - Use existing CSS variables and typography
- **Spacing** - Uniform spacing between sections (80px)
- **Animations** - Scroll-triggered staggered reveals, hover effects
- **Typography** - Playfair Display for headings, Source Sans 3 for body
- **Color Palette** - Primary green (#59B200), accent gold (#C9A962), charcoal (#2D2D2D), cream (#F5F3EF)

### Current About Page Structure
1. Hero Section (with breadcrumbs)
2. Company Overview Section (split layout: image left, text right)
3. CEO and Founder Section (centered text on dark background)
4. Mission Section (split layout: image left, text right)
5. Vision Section (centered text on dark background)
6. Services List Section (split layout: image left, list right)
7. More About Section (centered text on dark background)
8. Compliance Information Section (split layout: image left, list right)
9. Company Structure Section (team member cards)
10. Company Profiles Download Section (PDF downloads)

---

## Design Direction

### Visual Enhancements Needed
- [ ] Apply premium styling to all sections
- [ ] Add scroll-triggered animations
- [ ] Enhance hover effects on interactive elements
- [ ] Improve typography hierarchy
- [ ] Add subtle decorative elements (gold accents, borders)
- [ ] Refine spacing and layout consistency
- [ ] Enhance team member cards with premium styling
- [ ] Improve image presentation and overlays

### Sections to Enhance
1. **Hero Section** - Already uses Hero component, may need styling refinement
2. **Split Layout Sections** - Add animations, improve image presentation
3. **Dark Background Sections** - Enhance overlay gradients, improve typography
4. **Team Member Cards** - Premium card styling with hover effects
5. **PDF Download Cards** - Already implemented, may need refinement

---

## User Decisions Summary

| Question | Answer |
|----------|--------|
| Section order | Keep all sections, redesign look, maybe consolidate some |
| Team member cards | Larger images with hover for details |
| Animation intensity | Moderate (staggered reveals with slight movement) |
| Image effects | Image hover effects, try other effects |
| Split layout | Keep alternating left/right image placement |
| Dark overlays | Enhance overlay gradients |
| Compliance | Redesign as cards/icons |
| Content changes | Keep all existing text, allow minor edits for clarity |
| Visual assets | Use relevant HTML pages from public_html |
| Mobile animations | Animations be reduced on mobile |

---

## Final Decisions

### Section Consolidation
- **Decision:** Keep all sections separate for clarity
- **Rationale:** Each section serves distinct purpose, better for SEO and content hierarchy

### Team Member Cards
- **Enhancement:** Larger images (400px height) with hover overlay showing details
- **Implementation:** Enhanced card component with hover state management

### Compliance Information
- **Redesign:** Convert from list to card grid (2 columns desktop, 1 column mobile)
- **Icons:** Add icons for each compliance item (🛡️ PSIRA, 📋 Registration, 🏦 Bank accounts)

### Animations
- **Level:** Moderate - staggered reveals with slight upward movement
- **Delays:** 50-100ms between elements
- **Mobile:** Reduced duration (0.4s) and transform distance (15px)

### Image Effects
- **Split Sections:** Scale (1.05) + brightness increase on hover
- **Team Cards:** Scale (1.1) + gradient overlay with details
- **Alternative:** Test tilt, zoom blur, color overlay effects

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/About.jsx` | Restructure sections, add animations, enhance cards |
| `src/index.css` | Add About page specific styles, animations, hover effects |
| `src/components/TeamMemberCard.jsx` | Create new component (optional - can be inline) |
| `src/components/ComplianceCard.jsx` | Create new component (optional - can be inline) |

---

## Technical Considerations

1. **Animations:**
   - Use Intersection Observer for scroll detection
   - Staggered reveals: 50-100ms delays
   - GPU-accelerated properties only (transform, opacity)
   - Respect `prefers-reduced-motion`

2. **Responsive Design:**
   - Stack split layouts on mobile
   - Reduce animations on mobile
   - Disable parallax on mobile
   - Single column compliance cards on mobile

3. **Performance:**
   - Lazy load images with `loading="lazy"`
   - Use `will-change` for animated elements
   - Optimize image sizes
   - Reduce effects on mobile

4. **Accessibility:**
   - Keyboard navigation for all interactive elements
   - Focus states visible
   - Color contrast ≥ 4.5:1
   - Descriptive alt text for images

