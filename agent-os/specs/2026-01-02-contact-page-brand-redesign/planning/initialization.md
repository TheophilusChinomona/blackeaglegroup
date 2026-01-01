# Spec Initialization: Contact Page Brand Redesign

## Spec Details

- **Spec Name:** Contact Page Brand Redesign
- **Spec Date:** 2026-01-02
- **Spec Folder:** `agent-os/specs/2026-01-02-contact-page-brand-redesign/`
- **Phase:** 2 of 2 (Brand Guide CSS Redesign)

## Context

This spec is Phase 2 of the Brand Guide CSS Redesign project. Phase 1 (2026-01-01-brand-guide-css-redesign) successfully redesigned the Clients page with the brand design system. Phase 2 will apply the same design patterns to the Contact page.

### Phase 1 Accomplishments (Foundation Already Built)

The following have been established and can be reused:

1. **CSS Variables** (in `index.css`):
   - `--color-primary: #4B9400` (Vibrant Green)
   - `--color-primary-dark: #3D7A00`
   - `--color-accent: #C5A367` (Brass/Gold)
   - `--color-accent-light: #D4BC7D`
   - `--color-dark: #1A1C19` (Deep Forest)
   - `--color-cream: #F9F7F2` (Antique White)
   - Shadow variables: `--shadow-card`, `--shadow-card-hover`, `--shadow-gold`

2. **Tailwind Config**:
   - Brand color palette (`brand.primary`, `brand.accent`, etc.)
   - Shadow utilities (`shadow-card`, `shadow-card-hover`, `shadow-gold`)

3. **Reusable Components**:
   - `SectionHeader` component
   - Typography utility classes (`.subheading`, `.quote-text`)
   - Button utilities (`.btn-primary`, `.btn-secondary`, `.btn-gold`)
   - Visual depth utilities (`.card-elevated`, `.border-accent-top`)

4. **Design Patterns**:
   - Alternating section backgrounds (cream/white)
   - Card styling with 4px green top border
   - Animation patterns with reduced motion support
   - Mobile-responsive grid systems

### Phase 2 Focus: Contact Page

From the Phase 1 spec "Future Considerations" section:

> **Contact Page**
> - Form styling with brand colors
> - Contact cards
> - Map integration

### Current Contact Page Analysis

**File:** `BlackEagleGroup.React/src/pages/Contact.jsx`

**Current Structure:**
1. Hero Section (uses existing Hero component)
2. Contact Information Section:
   - 3 contact cards (Address, Phone, Email)
   - Icon-based display with old styling
3. Contact Form:
   - Name, Email, Subject, Message fields
   - Uses react-hook-form with yup validation
   - Basic Bootstrap/form styling
4. Google Maps Embed:
   - iframe with fixed dimensions
5. Compliance Information Section:
   - Background image section
   - PSIRA and Company Registration info

**Components Used:**
- `Hero` - Already brand-styled from Phase 1
- `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` - UI components
- `Input`, `Textarea`, `Button` - UI components
- `Spinner` - Loading state

## Initial Description

Apply the brand guide design system (established in Phase 1) to the Contact page, including:
- Redesign contact information cards with brand styling
- Style the contact form with brand colors, typography, and depth
- Improve the Google Maps section styling
- Update the Compliance Information section with brand patterns
- Ensure mobile responsiveness
- Apply animations following brand standards

## Linked Documents

- **Phase 1 Spec:** `agent-os/specs/2026-01-01-brand-guide-css-redesign/spec.md`
- **Brand Guide:** `agent-os/product/brand guide/`
- **Contact Page:** `BlackEagleGroup.React/src/pages/Contact.jsx`
