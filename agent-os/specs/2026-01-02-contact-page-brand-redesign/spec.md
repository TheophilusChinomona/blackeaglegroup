# Specification: Contact Page Brand Redesign - Phase 2

**Spec Date:** 2026-01-02  
**Status:** Draft  
**Phase:** 2 of 2 (Brand Guide CSS Redesign)

---

## Executive Summary

This specification details Phase 2 of implementing the brand guide design system across the Black Eagle Group Holdings website. Phase 2 focuses on the Contact page redesign, applying the reusable component patterns and design system foundations established in Phase 1 (Clients page).

The redesign transforms the Contact page into a sophisticated, premium corporate aesthetic using the established brand colors (Deep Forest #1A1C19, Vibrant Green #4B9400, Brass/Gold #C5A367, Antique White #F9F7F2) and typography (Playfair Display for headings, Source Sans 3 for body text).

**Key Deliverables:**
1. Redesigned Contact page with combined contact information card
2. New reusable brand-styled form components (BrandInput, BrandTextarea)
3. Styled Google Maps section with section header
4. Restyled Compliance section matching CTA pattern
5. Mobile-responsive implementation
6. No complex animations (simple/static functional page)

---

## Table of Contents

1. [Goals & Success Criteria](#goals--success-criteria)
2. [Design System Foundation](#design-system-foundation)
3. [Component Specifications](#component-specifications)
4. [Page Layout Specifications](#page-layout-specifications)
5. [Responsive Design Requirements](#responsive-design-requirements)
6. [Technical Implementation](#technical-implementation)
7. [Testing & Quality Assurance](#testing--quality-assurance)

---

## Goals & Success Criteria

### Primary Goals

1. **Apply Brand Visual Identity**: Implement the brand guide design system on the Contact page using established patterns from Phase 1
2. **Create Reusable Form Components**: Build brand-styled form components reusable across the site
3. **Maintain Functionality**: Preserve all existing form functionality (validation, submission) while updating styling
4. **Ensure Accessibility**: Maintain WCAG 2.1 AA compliance with proper form accessibility
5. **Optimize Mobile Experience**: Responsive form layout and touch-friendly inputs

### Success Criteria

- [ ] Contact page matches brand guide specifications
- [ ] Contact information displayed in single combined card with brand styling
- [ ] Form inputs styled with brand colors and typography
- [ ] Gold submit button displays correctly with hover states
- [ ] Google Maps section has styled container and section header
- [ ] Compliance section matches CTA pattern (Deep Forest background)
- [ ] Form layout is 2-column on desktop, single-column on mobile
- [ ] All form fields have proper focus states with brand colors
- [ ] Touch targets meet 44px minimum on mobile
- [ ] Form validation and submission functionality works correctly
- [ ] No complex animations (page is static/functional)
- [ ] Code is well-documented and reusable

---

## Design System Foundation

### Available Resources from Phase 1

The following CSS variables, utilities, and components are already available from Phase 1:

#### CSS Variables (`index.css`)

```css
:root {
  /* Primary Brand Colors */
  --color-primary: #4B9400;        /* Vibrant Green */
  --color-primary-dark: #3D7A00;   /* Darker green for hover states */
  
  /* Luxury Accents */
  --color-accent: #C5A367;         /* Brass/Gold */
  --color-accent-light: #D4BC7D;   /* Lighter gold for highlights */

  /* Neutrals */
  --color-dark: #1A1C19;           /* Deep Forest */
  --color-charcoal: #2D2D2D;       /* Charcoal */
  --color-cream: #F9F7F2;          /* Antique White */
  --color-white: #FFFFFF;          /* Pure white */
  --color-text: #333333;           /* Primary text */
  --color-text-muted: #666666;     /* Muted text */
  
  /* Shadows */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-gold: 0 4px 20px rgba(197, 163, 103, 0.3);
}
```

#### Existing Utility Classes

- `.subheading` - Green uppercase label
- `.btn-gold` - Gold solid button
- `.btn-primary` - Green solid button
- `.btn-secondary` - Gold outline button
- `.card-elevated` - Card with shadow
- `.border-accent-top` - 4px green top border
- `.bg-brand-cream`, `.bg-brand-dark` - Background colors

#### Existing Components

- `SectionHeader` - Reusable section header with label, title, description
- `Hero` - Already styled hero component

---

## Component Specifications

### 1. ContactInfoCard Component (NEW)

**File:** `BlackEagleGroup.React/src/components/ContactInfoCard.jsx`

#### Visual Design

A single combined card displaying all contact information:

```
┌─────────────────────────────────────────────────────────────────┐
│ ███████████████████████████████ (4px Green Border Top)          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    Get in Touch (Serif)                         │  ← Playfair Display
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │   📍            │ │   📞            │ │   ✉️            │   │
│  │   Address       │ │   Phone         │ │   Email         │   │
│  │   640 Wainright │ │   012 883 5609  │ │   info@black... │   │
│  │   Street...     │ │   082 624 9680  │ │                 │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Props Interface

```typescript
interface ContactInfoCardProps {
  className?: string
}
```

#### Component Structure

```jsx
<div className="contact-info-card card-elevated border-accent-top">
  <h2 className="contact-info-title">Get in Touch</h2>
  
  <div className="contact-info-grid">
    {/* Address */}
    <div className="contact-info-item">
      <div className="contact-info-icon">
        <MapPin />
      </div>
      <div className="contact-info-content">
        <h4 className="contact-info-label">Address</h4>
        <p>No. 640 Wainright Street Moreleta,<br/>
           Moreleta Park, Pretoria, 0002</p>
      </div>
    </div>
    
    {/* Phone */}
    <div className="contact-info-item">
      <div className="contact-info-icon">
        <Phone />
      </div>
      <div className="contact-info-content">
        <h4 className="contact-info-label">Phone</h4>
        <p>
          <a href="tel:0128835609">012 883 5609</a><br/>
          <a href="tel:0826249680">082 624 9680</a>
        </p>
      </div>
    </div>
    
    {/* Email */}
    <div className="contact-info-item">
      <div className="contact-info-icon">
        <Mail />
      </div>
      <div className="contact-info-content">
        <h4 className="contact-info-label">Email</h4>
        <p>
          <a href="mailto:info@blackeaglegroup.co.za">
            info@blackeaglegroup.co.za
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
```

#### Styling Specifications

```css
.contact-info-card {
  background: white;
  border-radius: 12px;
  padding: 2.5rem;
  border-top: 4px solid var(--color-primary);
  box-shadow: var(--shadow-card);
  max-width: 900px;
  margin: 0 auto;
}

.contact-info-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 500;
  color: var(--color-dark);
  text-align: center;
  margin-bottom: 2rem;
}

.contact-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.contact-info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.contact-info-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.contact-info-icon svg {
  width: 24px;
  height: 24px;
}

.contact-info-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.125em;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
}

.contact-info-content p {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

.contact-info-content a {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info-content a:hover {
  color: var(--color-primary);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-info-card {
    padding: 1.5rem;
  }
  
  .contact-info-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .contact-info-title {
    font-size: 1.5rem;
  }
}
```

---

### 2. BrandInput Component (NEW)

**File:** `BlackEagleGroup.React/src/components/form/BrandInput.jsx`

#### Visual Design

Brand-styled input field with focus states:

```
┌────────────────────────────────────────┐
│ Label (Source Sans 3, 600 weight)      │
├────────────────────────────────────────┤
│ ┌────────────────────────────────────┐ │
│ │ Placeholder text...                │ │  ← 2px border, 8px radius
│ └────────────────────────────────────┘ │
│                                        │
│ (On focus: Green border + ring)        │
└────────────────────────────────────────┘
```

#### Props Interface

```typescript
interface BrandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}
```

#### Component Structure

```jsx
const BrandInput = React.forwardRef(({ 
  label, 
  error, 
  className, 
  ...props 
}, ref) => (
  <div className="brand-form-group">
    {label && <label className="brand-form-label">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "brand-input",
        error && "brand-input-error",
        className
      )}
      {...props}
    />
    {error && <span className="brand-form-error">{error}</span>}
  </div>
))
```

#### Styling Specifications

```css
.brand-form-group {
  margin-bottom: 1rem;
}

.brand-form-label {
  display: block;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-dark);
  margin-bottom: 0.5rem;
}

.brand-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1rem;
  color: var(--color-text);
  background: white;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.brand-input::placeholder {
  color: var(--color-text-muted);
}

.brand-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(75, 148, 0, 0.1);
}

.brand-input:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.brand-input-error {
  border-color: #dc2626;
}

.brand-input-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.brand-form-error {
  display: block;
  font-size: 0.875rem;
  color: #dc2626;
  margin-top: 0.25rem;
}
```

---

### 3. BrandTextarea Component (NEW)

**File:** `BlackEagleGroup.React/src/components/form/BrandTextarea.jsx`

#### Props Interface

```typescript
interface BrandTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  className?: string
}
```

#### Component Structure

```jsx
const BrandTextarea = React.forwardRef(({ 
  label, 
  error, 
  className, 
  rows = 6,
  ...props 
}, ref) => (
  <div className="brand-form-group">
    {label && <label className="brand-form-label">{label}</label>}
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        "brand-textarea",
        error && "brand-textarea-error",
        className
      )}
      {...props}
    />
    {error && <span className="brand-form-error">{error}</span>}
  </div>
))
```

#### Styling Specifications

```css
.brand-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 1rem;
  color: var(--color-text);
  background: white;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.brand-textarea::placeholder {
  color: var(--color-text-muted);
}

.brand-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(75, 148, 0, 0.1);
}

.brand-textarea:disabled {
  background: #f5f5f5;
  cursor: not-allowed;
  opacity: 0.7;
}

.brand-textarea-error {
  border-color: #dc2626;
}

.brand-textarea-error:focus {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}
```

---

### 4. Contact Form Section

**File:** `BlackEagleGroup.React/src/pages/Contact.jsx`

#### Visual Design

Two-column responsive form layout:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│              SEND US A MESSAGE (Green Label)                    │
│         Have a Question? We'd Love to Hear From You             │
│                                                                 │
│  ┌────────────────────────┐  ┌────────────────────────────────┐ │
│  │ Name                   │  │                                │ │
│  │ ┌────────────────────┐ │  │ Message                        │ │
│  │ │                    │ │  │ ┌────────────────────────────┐ │ │
│  │ └────────────────────┘ │  │ │                            │ │ │
│  │                        │  │ │                            │ │ │
│  │ Email                  │  │ │                            │ │ │
│  │ ┌────────────────────┐ │  │ │                            │ │ │
│  │ │                    │ │  │ │                            │ │ │
│  │ └────────────────────┘ │  │ └────────────────────────────┘ │ │
│  │                        │  │                                │ │
│  │ Subject                │  │                                │ │
│  │ ┌────────────────────┐ │  │                                │ │
│  │ │                    │ │  │                                │ │
│  │ └────────────────────┘ │  │                                │ │
│  └────────────────────────┘  └────────────────────────────────┘ │
│                                                                 │
│                                    ┌──────────────────────────┐ │
│                                    │     Send Message         │ │  ← Gold Button
│                                    └──────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Styling Specifications

```css
.contact-form-section {
  background: var(--color-cream);
  padding: 5rem 0;
}

.contact-form-container {
  max-width: 900px;
  margin: 0 auto;
}

.contact-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.contact-form-left {
  display: flex;
  flex-direction: column;
}

.contact-form-right {
  display: flex;
  flex-direction: column;
}

.contact-form-right .brand-form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.contact-form-right .brand-textarea {
  flex: 1;
  min-height: 100%;
}

.contact-form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

/* Gold Submit Button */
.btn-gold {
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-family: 'Source Sans 3', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 44px;
}

.btn-gold:hover {
  background: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

.btn-gold:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Alert Messages */
.alert-success {
  background: rgba(75, 148, 0, 0.1);
  border: 1px solid var(--color-primary);
  color: var(--color-primary-dark);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.alert-error {
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid #dc2626;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contact-form-section {
    padding: 3rem 0;
  }
  
  .contact-form {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .contact-form-right .brand-textarea {
    min-height: 150px;
  }
  
  .contact-form-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .btn-gold {
    width: 100%;
  }
}
```

---

### 5. Google Maps Section

**File:** `BlackEagleGroup.React/src/pages/Contact.jsx`

#### Visual Design

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                      OUR LOCATION (Green Label)                 │
│                         Find Us Here                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │                                                           │  │
│  │                     Google Maps iFrame                    │  │
│  │                                                           │  │
│  │                                                           │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Styling Specifications

```css
.map-section {
  background: white;
  padding: 5rem 0;
}

.map-container {
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.map-container iframe {
  width: 100%;
  height: 400px;
  border: none;
  display: block;
}

@media (max-width: 768px) {
  .map-section {
    padding: 3rem 0;
  }
  
  .map-container iframe {
    height: 300px;
  }
}
```

---

### 6. Compliance Section (CTA Style)

**File:** `BlackEagleGroup.React/src/pages/Contact.jsx`

#### Visual Design

Matches the CTA footer pattern from Clients page:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Deep Forest Background                      │
│                                                                 │
│                    COMPLIANCE (Green Label)                     │
│             Our Regulatory Information (White)                  │
│                                                                 │
│           PSIRA No: 3031824 | Co Reg No: 2012/086451/07        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Styling Specifications

```css
.compliance-section {
  background: var(--color-dark);
  padding: 4rem 0;
  text-align: center;
}

.compliance-section .subheading {
  color: var(--color-primary);
}

.compliance-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 500;
  color: white;
  margin-bottom: 1.5rem;
}

.compliance-section p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .compliance-section {
    padding: 3rem 0;
  }
  
  .compliance-section h2 {
    font-size: 1.5rem;
  }
  
  .compliance-section p {
    font-size: 1rem;
  }
}
```

---

## Page Layout Specifications

### Contact Page Structure

```jsx
<div className="contact-page">
  {/* Hero Section - Already Styled */}
  <Hero 
    title="Contact Us"
    breadcrumbs={[...]}
  />

  {/* Contact Info Card Section */}
  <section className="contact-info-section bg-brand-cream">
    <Container>
      <ContactInfoCard />
    </Container>
  </section>

  {/* Contact Form Section */}
  <section className="contact-form-section bg-brand-cream">
    <Container>
      <SectionHeader
        label="Send us a Message"
        title="Have a Question? We'd Love to Hear From You"
        align="center"
      />
      <div className="contact-form-container">
        {/* Form with BrandInput, BrandTextarea, btn-gold */}
      </div>
    </Container>
  </section>

  {/* Google Maps Section */}
  <section className="map-section bg-white">
    <Container>
      <SectionHeader
        label="Our Location"
        title="Find Us Here"
        align="center"
      />
      <div className="map-container">
        <iframe ... />
      </div>
    </Container>
  </section>

  {/* Compliance Section (CTA Style) */}
  <section className="compliance-section bg-brand-dark">
    <Container>
      <span className="subheading">Compliance</span>
      <h2>Our Regulatory Information</h2>
      <p>PSIRA No: 3031824 | Co Reg No: 2012/086451/07</p>
    </Container>
  </section>
</div>
```

### Section Order & Backgrounds

| Section | Background | Padding |
|---------|------------|---------|
| Hero | Dark (image) | Standard Hero |
| Contact Info | Cream (#F9F7F2) | 5rem / 3rem mobile |
| Contact Form | Cream (#F9F7F2) | 5rem / 3rem mobile |
| Google Maps | White (#FFFFFF) | 5rem / 3rem mobile |
| Compliance | Dark (#1A1C19) | 4rem / 3rem mobile |

---

## Responsive Design Requirements

### Breakpoints

| Breakpoint | Width | Grid | Form Layout |
|------------|-------|------|-------------|
| Desktop | 992px+ | Full | 2-column |
| Tablet | 768px-991px | Full | 2-column |
| Mobile | <768px | Stack | 1-column |

### Mobile Optimizations

```css
@media (max-width: 768px) {
  /* Contact Info Card */
  .contact-info-grid {
    grid-template-columns: 1fr;
  }
  
  /* Contact Form */
  .contact-form {
    grid-template-columns: 1fr;
  }
  
  /* Section Padding */
  .contact-info-section,
  .contact-form-section,
  .map-section {
    padding: 3rem 0;
  }
  
  /* Touch Targets */
  .brand-input,
  .brand-textarea,
  .btn-gold {
    min-height: 44px;
  }
}
```

### Touch Targets

All interactive elements must meet 44px minimum:

- Form inputs: min-height 44px
- Submit button: min-height 44px
- Phone/email links: adequate padding

---

## Technical Implementation

### Implementation Order

1. **Create Form Components** (Task Group 1)
   - Create BrandInput component
   - Create BrandTextarea component
   - Add form styling to index.css
   - Test components in isolation

2. **Create ContactInfoCard** (Task Group 2)
   - Create ContactInfoCard component
   - Add Lucide icons (MapPin, Phone, Mail)
   - Style with brand patterns
   - Test responsiveness

3. **Update Contact Page Layout** (Task Group 3)
   - Refactor Contact.jsx structure
   - Integrate new form components
   - Add SectionHeader components
   - Apply section backgrounds

4. **Style Google Maps Section** (Task Group 4)
   - Add map container styling
   - Add section header
   - Ensure responsive width

5. **Restyle Compliance Section** (Task Group 5)
   - Remove background image
   - Apply CTA pattern styling
   - Update typography

6. **Testing & QA** (Task Group 6)
   - Test form functionality
   - Test responsiveness
   - Cross-browser testing
   - Accessibility audit

### File Structure

```
BlackEagleGroup.React/
├── src/
│   ├── index.css                 # UPDATE: Add form utilities
│   ├── components/
│   │   ├── form/                 # NEW directory
│   │   │   ├── BrandInput.jsx    # NEW
│   │   │   ├── BrandTextarea.jsx # NEW
│   │   │   └── index.js          # NEW (exports)
│   │   ├── ContactInfoCard.jsx   # NEW
│   │   └── SectionHeader.jsx     # EXISTS (reuse)
│   ├── pages/
│   │   └── Contact.jsx           # UPDATE: Full refactor
│   └── styles/
│       └── contact.css           # NEW: Page-specific styles
└── package.json
```

### Dependencies

No new dependencies needed. Uses:
- `lucide-react` - For icons (MapPin, Phone, Mail) - already installed
- `react-hook-form` - For form handling - already installed
- `yup` - For validation - already installed

---

## Testing & Quality Assurance

### Functional Testing Checklist

- [ ] Contact info card displays all information correctly
- [ ] Form inputs have proper focus states
- [ ] Form validation works (required fields, email format)
- [ ] Form submission works (success/error messages display)
- [ ] Gold submit button has correct hover state
- [ ] Google Maps iframe loads correctly
- [ ] Phone/email links work correctly
- [ ] All sections have correct backgrounds
- [ ] Page is fully responsive at all breakpoints

### Accessibility Testing

- [ ] All form fields have associated labels
- [ ] Focus states are visible on all inputs
- [ ] Color contrast meets 4.5:1 minimum
- [ ] Touch targets are 44px minimum on mobile
- [ ] Form error messages are announced to screen readers
- [ ] Keyboard navigation works through entire form
- [ ] ARIA attributes are correct

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Final QA Checklist

- [ ] All brand colors applied correctly
- [ ] Typography uses correct fonts
- [ ] Contact info in single combined card
- [ ] Form layout is 2-column desktop, 1-column mobile
- [ ] Gold submit button styled correctly
- [ ] Maps section has header and styled container
- [ ] Compliance section matches CTA pattern
- [ ] No complex animations (page is static)
- [ ] Mobile responsiveness works
- [ ] Form functionality preserved
- [ ] No console errors

---

## Appendix

### Color Quick Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Vibrant Green | #4B9400 | Icons, labels, focus states |
| Gold/Brass | #C5A367 | Submit button |
| Deep Forest | #1A1C19 | Compliance section |
| Antique White | #F9F7F2 | Section backgrounds |
| White | #FFFFFF | Cards, inputs, map section |
| Text | #333333 | Body text |
| Text Muted | #666666 | Placeholders |
| Error | #dc2626 | Validation errors |

### Component Dependencies

| Component | Dependencies |
|-----------|--------------|
| ContactInfoCard | lucide-react icons |
| BrandInput | cn utility |
| BrandTextarea | cn utility |
| Contact.jsx | react-hook-form, yup, SectionHeader |

---

**End of Specification**

**Next Steps:** Run `/create-tasks` to generate the implementation task list.
