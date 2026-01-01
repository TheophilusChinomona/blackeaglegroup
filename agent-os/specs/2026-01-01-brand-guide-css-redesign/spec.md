# Specification: Brand Guide CSS Redesign - Phase 1 (Clients Page)

**Spec Date:** 2026-01-01  
**Status:** Draft  
**Phase:** 1 of 2

---

## Executive Summary

This specification details Phase 1 of implementing the brand guide design system across the Black Eagle Group Holdings website. Phase 1 focuses exclusively on the Clients page redesign, establishing reusable component patterns and design system foundations that will be applied site-wide in Phase 2.

The redesign transforms the current styling into a sophisticated, premium corporate aesthetic using the established brand colors (Deep Forest #1A1C19, Vibrant Green #4B9400, Brass/Gold #C5A367, Antique White #F9F7F2) and typography (Playfair Display for headings, Source Sans 3 for body text).

**Key Deliverables:**
1. Redesigned Clients page matching brand guide specifications
2. Refactored ClientCard component with brand styling
3. Updated design system foundation (CSS variables, Tailwind config)
4. Reusable component patterns for Phase 2
5. Mobile-responsive implementation with audited typography

---

## Table of Contents

1. [Goals & Success Criteria](#goals--success-criteria)
2. [Design System Foundation](#design-system-foundation)
3. [Component Specifications](#component-specifications)
4. [Page Layout Specifications](#page-layout-specifications)
5. [Animation & Interaction Patterns](#animation--interaction-patterns)
6. [Responsive Design Requirements](#responsive-design-requirements)
7. [Technical Implementation](#technical-implementation)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [Future Considerations (Phase 2)](#future-considerations-phase-2)

---

## Goals & Success Criteria

### Primary Goals

1. **Establish Brand Visual Identity**: Implement the brand guide design system on the Clients page with pixel-perfect accuracy
2. **Create Reusable Foundation**: Build CSS foundation and component patterns reusable across the entire site
3. **Maintain Functionality**: Preserve all existing functionality (search, filter, sort, animations) while updating styling
4. **Ensure Accessibility**: Maintain WCAG 2.1 AA compliance with improved visual hierarchy
5. **Optimize Mobile Experience**: Audit and enhance mobile responsiveness for brand typography

### Success Criteria

- [ ] Clients page matches visual mockups and brand guide specifications
- [ ] All colors updated to exact brand palette
- [ ] Typography hierarchy uses Playfair Display (headings) and Source Sans 3 (body)
- [ ] ClientCard component displays with 4px green top border, proper buttons, and hover states
- [ ] Section backgrounds alternate correctly (Cream/White)
- [ ] All animations work smoothly with brand colors
- [ ] Mobile typography is readable and properly sized
- [ ] Touch targets meet 44px minimum on mobile
- [ ] Page loads with no visual regressions
- [ ] All existing functionality (filter, search, sort) works correctly
- [ ] Code is well-documented and reusable

---

## Design System Foundation

### Color Palette

Update all color definitions to match the brand guide exactly.

#### CSS Variables (`index.css`)

```css
:root {
  /* Primary Brand Colors */
  --color-primary: #4B9400;        /* Vibrant Green (was #59B200) */
  --color-primary-dark: #3D7A00;   /* Darker green for hover states */
  
  /* Luxury Accents */
  --color-accent: #C5A367;         /* Brass/Gold (was #C9A962) */
  --color-accent-light: #D4BC7D;   /* Lighter gold for highlights */

  /* Neutrals */
  --color-dark: #1A1C19;           /* Deep Forest (was #1A1A1A) */
  --color-charcoal: #2D2D2D;       /* Charcoal for secondary dark text */
  --color-cream: #F9F7F2;          /* Antique White (was #F5F3EF) */
  --color-white: #FFFFFF;          /* Pure white */
  --color-text: #333333;           /* Primary text */
  --color-text-muted: #666666;     /* Muted text */
  
  /* Spacing Scale - Keep existing */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-2xl: 4rem;    /* 64px */
  --space-3xl: 5rem;    /* 80px - section spacing */
  
  /* Shadows - Brand-specific */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.05);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
  --shadow-gold: 0 4px 20px rgba(197, 163, 103, 0.3);
}
```

#### Tailwind Configuration (`tailwind.config.js`)

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4B9400',
          'primary-dark': '#3D7A00',
          accent: '#C5A367',
          'accent-light': '#D4BC7D',
          dark: '#1A1C19',
          charcoal: '#2D2D2D',
          cream: '#F9F7F2',
          white: '#FFFFFF',
          muted: '#666666',
        }
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'gold': '0 4px 20px rgba(197, 163, 103, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
```

### Typography System

#### Base Typography Styles (`index.css`)

```css
@layer base {
  body {
    @apply bg-brand-cream text-brand-text font-sans antialiased;
    font-size: 16px;  /* Base size */
    line-height: 1.6;
  }

  /* Heading Hierarchy - Playfair Display */
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-semibold text-brand-dark;
    line-height: 1.2;
  }

  h1 {
    font-size: 3rem;      /* 48px */
    font-weight: 600;
  }

  h2 {
    font-size: 2.5rem;    /* 40px */
    font-weight: 500;
  }

  h3 {
    font-size: 1.75rem;   /* 28px */
    font-weight: 500;
  }

  h4 {
    font-size: 1.25rem;   /* 20px */
    font-weight: 500;
  }

  /* Responsive Typography */
  @media (max-width: 768px) {
    h1 { font-size: 2rem; }      /* 32px */
    h2 { font-size: 1.75rem; }   /* 28px */
    h3 { font-size: 1.5rem; }    /* 24px */
  }
}
```

#### Typography Utilities

```css
/* Subheading/Label Style */
.subheading {
  font-size: 0.75rem;           /* 12px */
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.125em;      /* 2px */
  color: var(--color-primary);
}

/* Quote Style */
.quote-text {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.75rem;           /* 28px */
  line-height: 1.6;
  color: var(--color-text);
}

@media (max-width: 768px) {
  .quote-text {
    font-size: 1.25rem;         /* 20px */
  }
}
```

### Visual Depth System

Implement layered shadows and depth following the brand guide principles:

```css
/* Card Depth Classes */
.card-elevated {
  background: white;
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-elevated:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

/* Light Physics - Top Border Accent */
.border-accent-top {
  border-top: 4px solid var(--color-primary);
}

/* Button Depth */
.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 2px 4px rgba(75, 148, 0, 0.2);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: 0 4px 12px rgba(75, 148, 0, 0.3);
  transform: translateY(-2px);
}

.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-accent);
  color: white;
  box-shadow: var(--shadow-gold);
}
```

---

## Component Specifications

### 1. ClientCard Component

**File:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

#### Visual Design

The ClientCard is the signature component of the brand guide implementation:

```
┌─────────────────────────────────────┐
│ ███████████ (4px Green Border Top)  │  ← Brand signature element
├─────────────────────────────────────┤
│                                     │
│         [LOGO IMAGE]                │  ← Logo area (centered, 120px height)
│                                     │
├─────────────────────────────────────┤
│                                     │
│      Company Name (Serif)           │  ← Playfair Display, 1.5rem
│   LOCATION — CATEGORY (Uppercase)   │  ← 12px, letter-spacing, muted
│                                     │
│   ┌──────────┐  ┌──────────────┐   │
│   │   Call   │  │  Reference   │   │  ← Green solid + Gold outline
│   └──────────┘  └──────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

#### Props Interface

```typescript
interface ClientCardProps {
  // Required props
  name: string
  logo: string
  
  // Optional props
  location?: string
  industry?: string
  description?: string
  referenceLink?: string
  phoneNumber?: string
  featured?: boolean
  industryColor?: string
  className?: string
  
  // Image fallback (existing prop - maintain compatibility)
  image?: string
}
```

#### Component Structure

```jsx
<div className="client-card-wrapper">
  <div className="client-card">
    {/* 4px Green Top Border */}
    <div className="border-accent-top" />
    
    {/* Logo Area */}
    <div className="logo-area">
      <img 
        src={logo} 
        alt={`${name} logo`}
        className="logo-image"
      />
    </div>
    
    {/* Content Area */}
    <div className="card-content">
      <h3 className="company-name">{name}</h3>
      {(location || industry) && (
        <p className="company-meta">
          {location && <span>{location}</span>}
          {location && industry && <span> — </span>}
          {industry && <span>{industry}</span>}
        </p>
      )}
      
      {/* Action Buttons */}
      <div className="card-actions">
        {phoneNumber && (
          <button className="btn-call">Call</button>
        )}
        {referenceLink && (
          <button className="btn-reference">Reference</button>
        )}
      </div>
    </div>
  </div>
</div>
```

#### Styling Specifications

```css
.client-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid var(--color-primary);
}

.client-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}

/* Logo Area */
.logo-area {
  height: 120px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.logo-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Content Area */
.card-content {
  padding: 1.5rem;
  text-align: center;
}

.company-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-dark);
  margin-bottom: 0.5rem;
}

.company-meta {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.125em;
  color: var(--color-text-muted);
  font-weight: 600;
  margin-bottom: 1.5rem;
}

/* Action Buttons */
.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.btn-call {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.625rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-call:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(75, 148, 0, 0.3);
}

.btn-reference {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  padding: 0.625rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-reference:hover {
  background: var(--color-accent);
  color: white;
  box-shadow: var(--shadow-gold);
}

/* Featured Variant */
.client-card.featured {
  border-top-width: 5px;
}

.client-card.featured .logo-area {
  height: 160px;
}

.client-card.featured .company-name {
  font-size: 2rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .logo-area {
    height: 100px;
  }
  
  .company-name {
    font-size: 1.25rem;
  }
  
  .card-actions {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  
  .client-card.featured .logo-area {
    height: 120px;
  }
}
```

#### Hover States & Interactions

**Card Hover:**
- Transform: `translateY(-4px)`
- Shadow: Enhanced from `--shadow-card` to `--shadow-card-hover`
- Duration: 0.3s ease

**Button Hovers:**
- Call button: Darker green + subtle lift + shadow
- Reference button: Fill with gold + shadow

**Logo Area:**
- Maintain crisp rendering with `image-rendering: auto`
- No transform on hover (keep logo stable)

#### Accessibility

- Maintain keyboard focus states (2px outline, brand primary color)
- Ensure 4.5:1 contrast ratio for all text
- Touch targets minimum 44px on mobile
- ARIA labels for buttons
- Semantic HTML structure

### 2. Section Header Component

Create a reusable section header pattern:

```jsx
const SectionHeader = ({ label, title, description, align = 'center' }) => (
  <div className={`section-header ${align}`}>
    {label && <span className="subheading">{label}</span>}
    {title && <h2 className="section-title">{title}</h2>}
    {description && <p className="section-description">{description}</p>}
  </div>
)
```

```css
.section-header {
  margin-bottom: 3rem;
}

.section-header.center {
  text-align: center;
}

.section-header .section-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--color-dark);
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.section-header .section-description {
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .section-header .section-title {
    font-size: 1.75rem;
  }
  
  .section-header .section-description {
    font-size: 1rem;
  }
}
```

### 3. Filter/Search Components

Update existing ClientFilter, ClientSearch, and ClientSort with brand styling:

#### ClientSearch Styling

```css
.client-search-input {
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.client-search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(75, 148, 0, 0.1);
}

.client-search-icon {
  color: var(--color-text-muted);
}
```

#### ClientFilter Styling

```css
.client-filter-btn {
  padding: 0.625rem 1.25rem;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  background: white;
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.client-filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.client-filter-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
```

---

## Page Layout Specifications

### Clients Page Structure

```jsx
<div className="clients-page">
  {/* Hero Section */}
  <section className="hero-section bg-brand-dark">
    <Hero
      title="Trusted by Industry Leaders"
      subtitle="Building lasting partnerships through excellence and innovation."
      backgroundImage="/images/bg_2.jpg"
      breadcrumbs={[...]}
    />
  </section>

  {/* Search/Filter Section */}
  <section className="search-section bg-brand-cream">
    <Container>
      <div className="search-controls">
        <ClientSearch />
        <ClientFilter />
        <ClientSort />
      </div>
    </Container>
  </section>

  {/* Featured Partners Section */}
  <section className="featured-section bg-brand-cream">
    <Container>
      <SectionHeader
        label="Featured Partners"
        title="Our Key Partnerships"
      />
      <div className="grid-3-col">
        {featuredClients.map(...)}
      </div>
    </Container>
  </section>

  {/* Industry Sections (alternating backgrounds) */}
  {industryKeys.map((industry, index) => (
    <section 
      key={industry}
      className={`industry-section ${index % 2 === 0 ? 'bg-white' : 'bg-brand-cream'}`}
    >
      <Container>
        <SectionHeader
          label={industryData.name}
          description={industryData.description}
        />
        <div className="grid-4-col">
          {clients.map(...)}
        </div>
      </Container>
    </section>
  ))}

  {/* Testimonial Section */}
  <section className="testimonial-section bg-brand-cream">
    <Container>
      <div className="testimonial-content">
        <span className="quote-mark">"</span>
        <p className="quote-text">{quote}</p>
        <div className="attribution">
          <p className="author">{author}</p>
          <p className="company">{company}</p>
        </div>
      </div>
    </Container>
  </section>

  {/* CTA Footer */}
  <section className="cta-section bg-brand-dark">
    <Container>
      <h2>Ready to Build Success Together?</h2>
      <p>Join our network of forward-thinking partners...</p>
      <button className="btn-gold">Become a Partner</button>
    </Container>
  </section>
</div>
```

### Section Spacing

All sections use consistent 80px (5rem) vertical padding:

```css
.ftco-section,
.featured-section,
.industry-section,
.testimonial-section,
.search-section {
  padding: 5rem 0;
}

@media (max-width: 768px) {
  .ftco-section,
  .featured-section,
  .industry-section,
  .testimonial-section,
  .search-section {
    padding: 3rem 0;
  }
}
```

### Grid Systems

```css
/* 3-column grid for featured clients */
.grid-3-col {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

/* 4-column grid for regular clients */
.grid-4-col {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
  .grid-4-col {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .grid-3-col {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-4-col {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .grid-3-col,
  .grid-4-col {
    grid-template-columns: 1fr;
  }
}
```

### Background Alternation

```css
.bg-brand-cream {
  background-color: var(--color-cream);
}

.bg-white {
  background: white;
}

.bg-brand-dark {
  background-color: var(--color-dark);
  color: white;
}

.bg-brand-dark h1,
.bg-brand-dark h2,
.bg-brand-dark h3 {
  color: white;
}

.bg-brand-dark .subheading {
  color: var(--color-primary);
}
```

### Testimonial Section Styling

```css
.testimonial-section {
  background: var(--color-cream);
  padding: 5rem 0;
}

.testimonial-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.quote-mark {
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  color: var(--color-accent);
  line-height: 1;
  display: block;
  margin-bottom: -1rem;
}

.quote-text {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.75rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-bottom: 2rem;
}

.attribution {
  margin-top: 2rem;
}

.attribution .author {
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 0.25rem;
}

.attribution .company {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

@media (max-width: 768px) {
  .quote-mark {
    font-size: 3rem;
  }
  
  .quote-text {
    font-size: 1.25rem;
  }
}
```

### CTA Section Styling

```css
.cta-section {
  background: var(--color-dark);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.cta-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.btn-gold {
  background: var(--color-accent);
  color: white;
  border: none;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-gold:hover {
  background: var(--color-accent-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-gold);
}

@media (max-width: 768px) {
  .cta-section h2 {
    font-size: 1.75rem;
  }
  
  .cta-section p {
    font-size: 1rem;
  }
}
```

---

## Animation & Interaction Patterns

### Scroll-Triggered Animations

Maintain existing Framer Motion animations with brand color updates:

```jsx
// Staggered fade-in for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  })
}

// Section header animations
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}
```

### Animation Timing Standards

```css
/* Standard timing values */
--transition-fast: 0.15s;
--transition-base: 0.3s;
--transition-slow: 0.6s;

/* Easing curves */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Responsive Design Requirements

### Breakpoints

```css
/* Mobile First Approach */
/* xs: 576px */
/* sm: 640px */
/* md: 768px */
/* lg: 992px */
/* xl: 1200px */
/* 2xl: 1280px */
```

### Typography Scaling

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| H1 | 48px | 40px | 32px |
| H2 | 40px | 32px | 28px |
| H3 | 28px | 24px | 24px |
| Body | 16px | 16px | 16px |
| Small | 14px | 14px | 14px |
| Label | 12px | 12px | 12px |

### Grid Responsiveness

| Screen Size | Featured Grid | Regular Grid |
|-------------|---------------|--------------|
| Desktop (1200px+) | 3 columns | 4 columns |
| Tablet (768-1199px) | 2 columns | 3 columns |
| Large Mobile (576-767px) | 2 columns | 2 columns |
| Small Mobile (<576px) | 1 column | 1 column |

### Touch Targets

All interactive elements must meet minimum touch target size:

```css
/* Minimum 44x44px for mobile */
@media (max-width: 768px) {
  button,
  a,
  [role="button"] {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### Mobile Optimizations

```css
@media (max-width: 768px) {
  /* Reduce card padding */
  .card-content {
    padding: 1rem;
  }
  
  /* Stack button grid */
  .card-actions {
    grid-template-columns: 1fr;
  }
  
  /* Reduce section spacing */
  .ftco-section {
    padding: 3rem 0;
  }
  
  /* Optimize logo size */
  .logo-area {
    height: 100px;
  }
  
  /* Disable parallax effects */
  [style*="background-attachment: fixed"] {
    background-attachment: scroll !important;
  }
}
```

---

## Technical Implementation

### Implementation Order

1. **Foundation Setup** (Day 1)
   - Update CSS variables in `index.css`
   - Update Tailwind config
   - Update typography base styles
   - Test color changes across page

2. **Component Refactoring** (Days 2-3)
   - Refactor ClientCard component
   - Create SectionHeader component
   - Update Filter/Search/Sort components
   - Test component isolation

3. **Page Integration** (Days 4-5)
   - Update Clients page layout
   - Apply section backgrounds
   - Integrate refactored components
   - Test grid responsiveness

4. **Animation Updates** (Day 6)
   - Update Framer Motion variants
   - Test scroll triggers
   - Verify reduced motion support

5. **Mobile Optimization** (Day 7)
   - Audit mobile typography
   - Test touch targets
   - Optimize grid layouts
   - Test across devices

6. **Testing & QA** (Day 8)
   - Cross-browser testing
   - Accessibility audit
   - Performance testing
   - Bug fixes

### File Structure

```
BlackEagleGroup.React/
├── src/
│   ├── index.css                 # UPDATE: CSS variables, base styles
│   ├── components/
│   │   ├── ClientCard.jsx        # REFACTOR: Brand styling
│   │   ├── SectionHeader.jsx     # NEW: Reusable header component
│   │   ├── ClientFilter.jsx      # UPDATE: Brand styling
│   │   ├── ClientSearch.jsx      # UPDATE: Brand styling
│   │   └── ClientSort.jsx        # UPDATE: Brand styling
│   ├── pages/
│   │   └── Clients.jsx           # UPDATE: Layout, sections, animations
│   └── styles/
│       └── clients.css           # NEW: Client page specific styles
├── tailwind.config.js            # UPDATE: Brand colors, shadows
└── package.json
```

### Code Quality Standards

1. **Component Structure**
   - Functional components with hooks
   - PropTypes or TypeScript for type safety
   - Default props for optional values
   - Comprehensive JSDoc comments

2. **CSS Organization**
   - CSS variables for all colors
   - Consistent naming conventions (BEM or utility-first)
   - Mobile-first media queries
   - Logical grouping of related styles

3. **Performance**
   - Minimize re-renders with React.memo where appropriate
   - Optimize images (WebP format, lazy loading)
   - Use CSS transforms for animations (hardware accelerated)
   - Debounce search/filter inputs

4. **Accessibility**
   - Semantic HTML elements
   - ARIA labels where needed
   - Keyboard navigation support
   - Focus visible states
   - 4.5:1 contrast ratio minimum

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

---

## Testing & Quality Assurance

### Visual Regression Testing

Compare screenshots before/after implementation:

1. **Full Page Screenshots**
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

2. **Component Isolation**
   - ClientCard (default state)
   - ClientCard (hover state)
   - ClientCard (featured variant)
   - Section headers
   - Filter/search components

### Functional Testing Checklist

- [ ] Search functionality works with new styling
- [ ] Filter by industry works correctly
- [ ] Sort options work correctly
- [ ] Client cards display all required information
- [ ] Call button links to phone number
- [ ] Reference button links to email/reference
- [ ] Scroll animations trigger at correct positions
- [ ] Hover states work on all interactive elements
- [ ] Keyboard navigation works throughout page
- [ ] Focus states are visible
- [ ] Screen reader announces content correctly

### Accessibility Testing

Use tools:
- axe DevTools
- WAVE
- Lighthouse Accessibility audit
- Keyboard-only navigation test
- Screen reader test (NVDA/VoiceOver)

### Performance Testing

Metrics to verify:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1
- Time to Interactive (TTI) < 3.5s

### Cross-Browser Testing

Test on:
- Windows: Chrome, Firefox, Edge
- macOS: Chrome, Firefox, Safari
- iOS: Safari, Chrome
- Android: Chrome, Samsung Internet

---

## Future Considerations (Phase 2)

### Site-Wide Implementation

After Phase 1 success, apply brand guide to:

1. **Homepage**
   - Hero carousel with brand colors
   - Service cards with brand styling
   - Event cards with adapted colors

2. **About Page**
   - Team member cards (contextual adaptation)
   - Timeline/history section
   - Compliance cards

3. **Services Page**
   - Service category cards
   - Service detail cards
   - CTA sections

4. **Events Page**
   - Maintain energetic aesthetic
   - Apply brand typography
   - Update filter/search styling

5. **Property Services Page**
   - Property type cards
   - Service listing cards

6. **Contact Page**
   - Form styling with brand colors
   - Contact cards
   - Map integration

### Component Library Evolution

Build out full component library:

- Button variants (primary, secondary, tertiary, ghost)
- Input components (text, select, checkbox, radio)
- Card variants (default, featured, compact, expanded)
- Modal/dialog components
- Alert/notification components
- Badge/tag components
- Pagination components

### Documentation

Create comprehensive documentation:

- Brand guide implementation guide
- Component usage examples
- Style guide for developers
- Design tokens documentation
- Accessibility guidelines
- Animation guidelines

---

## Appendix

### Color Reference Table

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Vibrant Green | #4B9400 | Primary actions, accents, labels |
| Vibrant Green Dark | #3D7A00 | Hover states for primary actions |
| Brass/Gold | #C5A367 | Secondary actions, decorative elements |
| Gold Light | #D4BC7D | Hover states for gold elements |
| Deep Forest | #1A1C19 | Dark sections, hero, footer |
| Charcoal | #2D2D2D | Secondary dark text |
| Antique White | #F9F7F2 | Light section backgrounds |
| White | #FFFFFF | Card backgrounds, text on dark |
| Text Primary | #333333 | Primary body text |
| Text Muted | #666666 | Secondary text, labels |

### Typography Reference

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | Playfair Display | 48px | 600 | 1.2 |
| H2 | Playfair Display | 40px | 500 | 1.2 |
| H3 | Playfair Display | 28px | 500 | 1.2 |
| Body | Source Sans 3 | 16px | 400 | 1.6 |
| Label | Source Sans 3 | 12px | 600 | 1.4 |
| Quote | Playfair Display Italic | 28px | 400 | 1.6 |

### Shadow Reference

| Name | Value | Usage |
|------|-------|-------|
| card | 0 4px 20px rgba(0,0,0,0.05) | Default card shadow |
| card-hover | 0 8px 32px rgba(0,0,0,0.12) | Elevated card shadow |
| gold | 0 4px 20px rgba(197,163,103,0.3) | Gold button shadow |
| sm | 0 2px 8px rgba(0,0,0,0.08) | Small elements |
| md | 0 4px 16px rgba(0,0,0,0.12) | Medium elements |
| lg | 0 8px 32px rgba(0,0,0,0.16) | Large elements |

---

**End of Specification**

**Next Steps:** Run `/create-tasks` to generate the implementation task list.
