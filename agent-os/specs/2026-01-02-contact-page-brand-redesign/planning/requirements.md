# Spec Requirements: Contact Page Brand Redesign

## Initial Description

Apply the brand guide design system (established in Phase 1 of the Brand Guide CSS Redesign) to the Contact page. This is Phase 2 of the site-wide brand implementation.

**Referenced Phase 1 Spec:** `agent-os/specs/2026-01-01-brand-guide-css-redesign/spec.md`

## Requirements Discussion

### First Round Questions

**Q1:** Contact Information Cards Design - The current page has 3 contact info items (Address, Phone, Email) displayed in a row. Should we:
- Option A: Restyle them as individual brand cards (white background, 4px green top border, elevated shadow) similar to ClientCard pattern?
- Option B: Keep them more subtle/inline but apply brand typography and colors?
- Option C: Combine into a single styled card with all contact info?

**Answer:** Option C - Combine into a single styled card with all contact info.

---

**Q2:** Form Input Styling - The current form uses shadcn/ui components with generic styling. Should we:
- Option A: Update the existing shadcn/ui Input/Textarea components with brand styles globally (affects all forms site-wide)?
- Option B: Create brand-styled form components specifically for the Contact page that can be reused on other pages later?
- Option C: Apply inline/Tailwind brand styling directly to the Contact form without changing the base components?

**Answer:** Option B - Create brand-styled form components specifically for the Contact page that can be reused on other pages later.

---

**Q3:** Form Layout - The current form has Name/Email/Subject in the left column and Message taking the full right column. Should we:
- Option A: Keep the 2-column layout but add brand styling?
- Option B: Switch to a single-column stacked layout for better mobile experience?
- Option C: Another layout preference?

**Answer:** Option A - Keep the 2-column layout but add brand styling. Must be responsive to screen size.

---

**Q4:** Submit Button Styling - Should the form submit button use:
- Option A: Primary green button (.btn-primary - solid Vibrant Green)?
- Option B: Gold button (.btn-gold - solid Brass/Gold for "premium action")?
- Option C: Something else?

**Answer:** Option B - Gold button (.btn-gold - solid Brass/Gold for "premium action").

---

**Q5:** Google Maps Section - The current map is a basic iframe. Should we:
- Option A: Wrap it in a brand-styled container with shadow and rounded corners?
- Option B: Keep it simple but add a section header above it?
- Option C: Both (styled container + section header)?

**Answer:** Option C - Both (styled container + section header).

---

**Q6:** Compliance Section - The current compliance section has a background image with overlay. Should we:
- Option A: Restyle it to match the CTA sections from Phase 1 (Deep Forest background, centered text, brand typography)?
- Option B: Keep the background image aesthetic but update typography to brand fonts?
- Option C: Something else?

**Answer:** Option A - Restyle it to match the CTA sections from Phase 1 (Deep Forest background, centered text, brand typography).

---

**Q7:** Animations - Should the Contact page include scroll-triggered animations similar to the Clients page (staggered fade-in for cards, section header animations), or should it be a simpler/static page given its functional nature?

**Answer:** A simpler/static page given its functional nature. No complex scroll-triggered animations.

---

### Visual Assets

**Files Provided:** None

No visual mockups were provided. The design will follow the established brand guide patterns from Phase 1.

## Requirements Summary

### Functional Requirements

**Contact Page Redesign Components:**

1. **Hero Section** (Already styled)
   - Uses existing `Hero` component with brand styling from Phase 1
   - No changes needed

2. **Contact Information Card** (NEW)
   - Combine Address, Phone, and Email into a single styled card
   - White background with 4px Vibrant Green (#4B9400) top border
   - Card elevation with shadow
   - Brand typography (Playfair Display for heading, Source Sans 3 for content)
   - Icon styling with brand colors
   - Responsive layout

3. **Contact Form** (RESTYLE)
   - Create new brand-styled form components:
     - `BrandInput` - Input field with brand styling
     - `BrandTextarea` - Textarea with brand styling
     - `BrandFormLabel` - Label with brand typography
   - 2-column responsive layout:
     - Desktop: Name/Email/Subject (left) | Message (right)
     - Mobile: Stack to single column
   - Gold submit button (`.btn-gold`) for premium action feel
   - Success/error alerts with brand colors
   - Form validation styling with brand colors

4. **Google Maps Section** (RESTYLE)
   - Add section header above the map ("Our Location" or similar)
   - Wrap iframe in brand-styled container:
     - Rounded corners (12px)
     - Subtle shadow
     - Proper spacing
   - Responsive width (100% of container)

5. **Compliance Section** (RESTYLE)
   - Remove background image
   - Apply Deep Forest (#1A1C19) solid background
   - White centered text with brand typography
   - Match CTA footer section styling from Clients page
   - Green subheading label

### Reusability Opportunities

**New Reusable Components to Create:**

1. `BrandInput` - Input field component with:
   - 2px border (#e5e5e5)
   - 8px border-radius
   - Focus state: Green border + subtle ring
   - Brand typography

2. `BrandTextarea` - Textarea component with:
   - Same styling as BrandInput
   - Proper min-height for multiline content

3. `BrandFormLabel` - Label component with:
   - Source Sans 3 font
   - Proper spacing and color

4. `ContactInfoCard` - Combined contact info card component:
   - Reusable pattern for displaying contact details
   - Can be adapted for other pages (event contact info, etc.)

**Existing Components to Reuse from Phase 1:**

- `SectionHeader` - For "Send us a Message" and "Our Location" sections
- `.btn-gold` - For submit button
- `.card-elevated` / `.border-accent-top` - For card styling
- Background utilities (`.bg-brand-dark`, `.bg-brand-cream`)

### Scope Boundaries

**In Scope:**
- Contact page layout restructuring
- Contact information card (combined)
- Brand-styled form components (BrandInput, BrandTextarea, BrandFormLabel)
- Google Maps container styling + section header
- Compliance section restyling (CTA style)
- Mobile responsiveness
- Basic hover/focus states

**Out of Scope:**
- Complex scroll-triggered animations (keep it simple/static)
- Form functionality changes (validation, submission logic)
- Hero section changes (already styled)
- New form fields or features

### Technical Considerations

**Components to Create:**
- `src/components/BrandInput.jsx` (or add to existing UI components)
- `src/components/BrandTextarea.jsx`
- `src/components/ContactInfoCard.jsx`

**Files to Modify:**
- `src/pages/Contact.jsx` - Main page restructuring
- `src/index.css` - Any additional utility classes needed
- Possibly `src/styles/contact.css` - Page-specific styles

**Design Tokens Already Available:**
- Colors: `--color-primary`, `--color-accent`, `--color-dark`, `--color-cream`
- Shadows: `--shadow-card`, `--shadow-card-hover`, `--shadow-gold`
- Typography: Playfair Display (headings), Source Sans 3 (body)

**Responsive Breakpoints:**
- Desktop: 2-column form layout, full-width map
- Tablet (768px): Adjust spacing, may keep 2-column
- Mobile (576px): Single-column form, full-width map

**Accessibility Requirements:**
- Maintain keyboard navigation
- Proper focus states on all form fields
- ARIA labels for form fields
- Color contrast compliance (4.5:1 minimum)
- Touch targets 44px minimum on mobile
