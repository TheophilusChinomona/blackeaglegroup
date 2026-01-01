# Homepage Redesign - Spec Notes

## Overview
Redesign the Black Eagle Group homepage with a **Premium/Luxury** aesthetic, fixing the hero section, making event cards clickable, and creating a streamlined footer.

---

## Scope

### 1. Hero Section Redesign

**Current Issues:**
- Hero height is too tall (850px fixed)
- Event images are not functioning as clickable buttons
- Images wrapped incorrectly in a `<form>` element

**Decisions:**
- [ ] Reduce hero height to appropriate responsive size (~70-80vh or ~600px max)
- [ ] Hero = background image only, all content overlaid on top
- [ ] Convert event images into **prominent call-to-action cards**
- [ ] Cards link to **external websites** (for now):
  - CoT Golf Day → `https://blackeaglegroup.co.za/COT/index.html`
  - CSIR Golf Day → `https://blackeaglegroup.co.za/csir/csir.html`
- [ ] Remove the `<form>` wrapper causing click issues
- [ ] Video play button opens in **modal/lightbox** instead of new tab

**Design Direction:**
- Premium/Luxury aesthetic (sophisticated, elegant, refined)
- Maintain green brand color (#59B200)
- Typography: elegant, refined fonts
- Subtle animations and hover effects
- Golf club / high-end services feel

### 2. Footer Redesign

**Current Issues:**
- Footer is too large (4 columns, Google Maps embed, PDF downloads)
- No clear visual hierarchy
- Too much content for a footer

**Decisions:**
- [ ] Streamlined footer with only:
  - Contact info (address as text, phone, email)
  - Social media links (LinkedIn, Facebook, Instagram)
  - Copyright notice
  - Key navigation links (condensed)
- [ ] **Remove**: Google Maps embed (move to Contact page only)
- [ ] **Remove**: PDF downloads (move to About page)

### 3. About Page Update

**Additions:**
- [ ] Add PDF download section for company profiles:
  - Cleaning Profile (BE Profile2.pdf)
  - Security Profile (BE Profile.pdf)
  - CDP & Events Management Profile

---

## Design Specifications

### Aesthetic: Premium/Luxury

**Typography:**
- Elegant serif or refined sans-serif for headings
- Clean, readable body font
- Proper hierarchy with weight and size variations

**Color Palette:**
- Primary: #59B200 (brand green)
- Accent: Gold/champagne tones for luxury feel
- Neutrals: Dark charcoal, cream/off-white
- Background: Dark overlays for hero, clean whites for content

**Visual Elements:**
- Subtle gold accents
- Refined borders and spacing
- Premium button styles with hover effects
- Elegant transitions and animations

**Layout:**
- Clean, uncluttered spacing
- Proper visual hierarchy
- Mobile-responsive design
- Refined grid alignment

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Home.jsx` | Hero restructure, event CTA cards, video lightbox |
| `src/components/common/Footer.jsx` | Complete redesign - streamlined |
| `src/pages/About.jsx` | Add PDF downloads section |
| `src/pages/Contact.jsx` | Add Google Maps embed |
| `src/index.css` | Premium styling, modal styles |

---

## Technical Considerations

1. **Video Lightbox:**
   - Use React state for modal open/close
   - YouTube embed in modal
   - Click outside to close
   - Escape key to close

2. **CTA Cards:**
   - Remove `<form>` wrapper
   - Use proper `<a>` tags with `target="_blank"`
   - Add hover effects and transitions
   - Prominent styling with shadows/borders

3. **Responsive Design:**
   - Hero adapts to viewport height
   - Cards stack on mobile
   - Footer collapses gracefully

---

## User Answers Summary

| Question | Answer |
|----------|--------|
| Hero issue | Height too big, event images should be buttons |
| Event links | External websites for now |
| Event styling | Prominent call-to-action cards |
| Event placement | Remain in hero, overlaid on background |
| Video button | Open in modal/lightbox |
| Footer content | Condensed: contact, social, copyright, key nav |
| PDF downloads | Move to About page |
| Google Maps | Move to Contact page, show address as text in footer |
| Design direction | Premium/Luxury aesthetic |
| References | None, follow existing theme |
