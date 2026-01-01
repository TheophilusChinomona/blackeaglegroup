# About Page Redesign Specification

**Project:** Black Eagle Group Website  
**Date:** December 23, 2025  
**Status:** Ready for Implementation  

---

## 1. Executive Summary

This specification details the redesign of the Black Eagle Group About page with a **Premium/Luxury** aesthetic, following the same design principles established in the homepage redesign. The redesign will enhance visual appeal, add smooth animations, improve team member cards, and create a cohesive premium experience that matches the brand identity.

**Key Changes:**
1. **Visual Enhancements** - Premium styling across all sections
2. **Animations** - Moderate scroll-triggered staggered reveals
3. **Team Member Cards** - Larger images with hover effects revealing details
4. **Compliance Section** - Redesigned as cards/icons instead of list
5. **Overlay Gradients** - Enhanced dark background sections
6. **Image Effects** - Hover effects and visual enhancements
7. **Spacing** - Uniform 80px between sections (matching homepage)

---

## 2. Design System

### 2.1 Aesthetic Direction: Premium/Luxury

Following the homepage redesign principles:
- Sophisticated, elegant, refined aesthetic
- High-end golf club / corporate excellence feel
- Subtle animations and hover effects
- Refined typography and spacing

### 2.2 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#59B200` | Brand green, primary actions |
| `--color-primary-dark` | `#4A9600` | Hover states |
| `--color-accent` | `#C9A962` | Gold accent, luxury highlights |
| `--color-accent-light` | `#D4BC7D` | Gold hover states |
| `--color-dark` | `#1A1A1A` | Dark backgrounds, text |
| `--color-charcoal` | `#2D2D2D` | Section backgrounds |
| `--color-cream` | `#F5F3EF` | Light backgrounds |
| `--color-white` | `#FFFFFF` | Pure white |
| `--color-text` | `#333333` | Body text |
| `--color-text-muted` | `#666666` | Secondary text |

### 2.3 Typography

```css
/* Headings */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 500-600;

/* Body text */
font-family: 'Source Sans 3', system-ui, sans-serif;
font-weight: 400;
```

### 2.4 Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2rem` |
| `--space-xl` | `3rem` |
| `--space-2xl` | `4rem` |

**Section Spacing:** Uniform 80px (5rem) between all sections

### 2.5 Shadows

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
--shadow-gold: 0 4px 20px rgba(201, 169, 98, 0.3);
```

---

## 3. Current About Page Structure

### 3.1 Section List

1. **Hero Section** - Uses Hero component (already styled)
2. **Company Overview** - Split layout (image left, text right)
3. **CEO and Founder** - Centered text on dark background
4. **Mission** - Split layout (image left, text right)
5. **Vision** - Centered text on dark background
6. **Services List** - Split layout (image left, list right)
7. **More About** - Centered text on dark background
8. **Compliance Information** - Split layout (image left, list right) → **REDESIGN AS CARDS**
9. **Company Structure** - Team member cards → **ENHANCE WITH LARGER IMAGES & HOVER**
10. **Company Profiles** - PDF downloads (already implemented)

### 3.2 Consolidation Opportunities

**Option 1:** Combine Mission & Vision into single "Mission & Vision" section
**Option 2:** Keep separate but enhance visual connection
**Decision:** Keep separate sections for clarity, but enhance visual flow

---

## 4. Component Specifications

### 4.1 Split Layout Sections

**Sections:** Company Overview, Mission, Services List, Compliance Information

#### 4.1.1 Layout Structure

```jsx
<section className="ftco-section about-split-section">
  <Container>
    <Row className="no-gutters">
      {/* Image Column */}
      <Col md={6} className="about-image-col">
        <div className="about-image-wrapper">
          <div 
            className="about-image" 
            style={{ backgroundImage: "url('/images/About-X.jpg')" }}
          />
        </div>
      </Col>
      
      {/* Content Column */}
      <Col md={6} className="wrap-about py-md-5">
        <div className="heading-section mb-5 pl-md-5 ftco-animate">
          <span className="subheading">About us</span>
          <h2 className="mb-4">Section Title</h2>
          <p>Content...</p>
        </div>
      </Col>
    </Row>
  </Container>
</section>
```

#### 4.1.2 Styling Enhancements

```css
.about-split-section {
  padding: 5rem 0; /* 80px */
}

.about-image-col {
  position: relative;
  min-height: 500px;
}

.about-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.about-image {
  width: 100%;
  height: 100%;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              filter 0.6s ease;
  filter: brightness(1);
}

.about-image:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}

.wrap-about {
  display: flex;
  align-items: center;
  background: var(--color-cream);
}

.heading-section {
  padding-left: 2rem;
}

.heading-section .subheading {
  color: var(--color-primary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
}

.heading-section h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
  position: relative;
}

.heading-section h2::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

.heading-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.heading-section ul {
  list-style: none;
  padding: 0;
}

.heading-section ul li {
  padding: 0.75rem 0;
  padding-left: 1.5rem;
  position: relative;
  font-size: 1.1rem;
  color: var(--color-text);
}

.heading-section ul li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-primary);
  font-weight: bold;
}
```

#### 4.1.3 Animation

- Text content: Staggered fadeInUp (heading: 0ms, paragraph: 100ms, list items: 200ms each)
- Image: Fade in on scroll with slight scale effect
- Use `.ftco-animate` class with Intersection Observer

---

### 4.2 Dark Background Sections

**Sections:** CEO and Founder, Vision, More About

#### 4.2.1 Enhanced Overlay Gradients

```css
.services-section.img {
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* Parallax effect */
}

.services-section.img::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  z-index: 1;
}

.services-section.img .overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0.3) 0%,
    rgba(45, 45, 45, 0.4) 100%
  );
  z-index: 2;
}

.services-section.img .container {
  position: relative;
  z-index: 3;
}
```

#### 4.2.2 Typography Enhancements

```css
.heading-section-white {
  color: white;
}

.heading-section-white .subheading {
  color: var(--color-accent);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.heading-section-white h2 {
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: white;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.heading-section-white p {
  font-size: 1.15rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
```

#### 4.2.3 Animation

- Staggered text reveals: heading (0ms), paragraphs (100ms, 200ms, 300ms)
- Fade in with slight upward movement
- Respect `prefers-reduced-motion`

---

### 4.3 Team Member Cards (Company Structure)

#### 4.3.1 Enhanced Card Component

```jsx
const TeamMemberCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Col md={4} lg={4} className="team-member-col">
      <div 
        className="team-member-card ftco-animate"
        style={{ animationDelay: `${index * 100}ms` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="team-member-image-wrapper">
          <img 
            src={member.image} 
            alt={member.name}
            className="team-member-image"
          />
          <div className={`team-member-overlay ${isHovered ? 'active' : ''}`}>
            <div className="team-member-details">
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
              {/* Optional: Add bio or additional info on hover */}
            </div>
          </div>
        </div>
        <div className="team-member-info">
          <h4>{member.name}</h4>
          <p className="role">{member.role}</p>
        </div>
      </div>
    </Col>
  );
};
```

#### 4.3.2 Card Styling

```css
.team-member-col {
  margin-bottom: 2rem;
}

.team-member-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.team-member-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-gold);
  border-color: var(--color-accent);
}

.team-member-image-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  background: var(--color-cream);
}

.team-member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.team-member-card:hover .team-member-image {
  transform: scale(1.1);
}

.team-member-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.team-member-overlay.active {
  opacity: 1;
}

.team-member-overlay h4 {
  color: white;
  font-family: 'Playfair Display', serif;
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.team-member-overlay .role {
  color: var(--color-accent);
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.team-member-info {
  padding: 1.5rem;
  text-align: center;
}

.team-member-info h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: var(--color-dark);
  margin: 0 0 0.5rem;
}

.team-member-info .role {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin: 0;
}

/* Mobile: Show overlay by default, hide on hover */
@media (max-width: 768px) {
  .team-member-overlay {
    opacity: 1;
  }
  
  .team-member-card:hover .team-member-image {
    transform: scale(1.05);
  }
}
```

---

### 4.4 Compliance Information Cards

#### 4.4.1 Card Layout

```jsx
<section className="ftco-section compliance-section">
  <Container>
    <Row className="no-gutters">
      <Col md={6} className="about-image-col">
        {/* Image column - same as other split sections */}
      </Col>
      <Col md={6} className="wrap-about py-md-5">
        <div className="heading-section mb-5 pl-md-5">
          <span className="subheading">About us</span>
          <h2 className="mb-4">Compliance Information</h2>
          <div className="compliance-cards">
            <ComplianceCard
              icon="🛡️"
              title="PSIRA Registration"
              value="3031824"
            />
            <ComplianceCard
              icon="📋"
              title="Company Registration"
              value="2012/086451/07"
            />
            <ComplianceCard
              icon="🏦"
              title="FNB Bank Account"
              value="63043545110"
            />
            <ComplianceCard
              icon="🏦"
              title="ABSA Bank Account"
              value="4113233815"
            />
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>
```

#### 4.4.2 Compliance Card Component

```jsx
const ComplianceCard = ({ icon, title, value }) => (
  <div className="compliance-card ftco-animate">
    <div className="compliance-icon">{icon}</div>
    <div className="compliance-content">
      <h5>{title}</h5>
      <p>{value}</p>
    </div>
  </div>
);
```

#### 4.4.3 Compliance Card Styling

```css
.compliance-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 2rem;
}

.compliance-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 2px solid #e5e5e5;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-sm);
}

.compliance-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.compliance-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-cream);
  border-radius: 12px;
  flex-shrink: 0;
}

.compliance-content h5 {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  color: var(--color-dark);
  margin: 0 0 0.5rem;
  font-weight: 600;
}

.compliance-content p {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin: 0;
  font-weight: 500;
}

@media (max-width: 768px) {
  .compliance-cards {
    grid-template-columns: 1fr;
  }
}
```

---

## 5. Animation Specifications

### 5.1 Scroll-Triggered Animations

**Pattern:** Moderate staggered reveals with slight movement

**Implementation:**
- Use Intersection Observer API
- Stagger delays: 50-100ms between elements
- Animation: `fadeInUp` (opacity + translateY)
- Duration: 0.6s ease-in-out
- Respect `prefers-reduced-motion`

### 5.2 Animation Delays by Section

| Section | Elements | Delays |
|---------|----------|--------|
| Company Overview | Image, Heading, Text | 0ms, 100ms, 200ms |
| CEO and Founder | Heading, Text | 0ms, 100ms |
| Mission | Image, Heading, Text | 0ms, 100ms, 200ms |
| Vision | Heading, Text | 0ms, 100ms |
| Services List | Image, Heading, List items | 0ms, 100ms, 200ms, 300ms, 400ms, 500ms |
| More About | Heading, Paragraphs (4) | 0ms, 100ms, 200ms, 300ms, 400ms |
| Compliance | Image, Heading, Cards (4) | 0ms, 100ms, 200ms, 300ms, 400ms, 500ms |
| Team Structure | Heading, Cards (3) | 0ms, 100ms, 200ms, 300ms, 400ms |

### 5.3 Mobile Animation Reduction

```css
@media (max-width: 768px) {
  .ftco-animate {
    animation-duration: 0.4s;
  }
  
  /* Reduce transform distance on mobile */
  @keyframes fadeInUp {
    from {
      transform: translateY(15px);
    }
  }
  
  /* Disable parallax on mobile */
  .services-section.img {
    background-attachment: scroll;
  }
}
```

---

## 6. Image Hover Effects

### 6.1 Split Section Images

- **Scale Effect:** `transform: scale(1.05)` on hover
- **Brightness:** Increase brightness by 10%
- **Transition:** 0.6s cubic-bezier easing

### 6.2 Team Member Images

- **Scale Effect:** `transform: scale(1.1)` on card hover
- **Overlay:** Gradient overlay with member details
- **Smooth transition:** 0.5s cubic-bezier

### 6.3 Alternative Effects (To Test)

- **Tilt Effect:** Slight 3D rotation on hover
- **Zoom Blur:** Blur background, sharpen foreground
- **Color Overlay:** Add brand color overlay on hover
- **Parallax Scroll:** Subtle parallax on scroll (desktop only)

---

## 7. Spacing & Layout

### 7.1 Section Spacing

- **Uniform 80px (5rem)** between all sections
- Remove manual `<br />` spacing hacks
- Use consistent `.ftco-section` padding

### 7.2 Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>992px) | Full layout, side-by-side splits |
| Tablet (768-991px) | Stacked layout, reduced spacing |
| Mobile (<768px) | Single column, minimal spacing, reduced animations |

---

## 8. Implementation Files

### 8.1 Files to Modify

| File | Changes |
|------|---------|
| `src/pages/About.jsx` | Restructure sections, add animations, enhance cards |
| `src/index.css` | Add About page specific styles, animations, hover effects |
| `src/components/TeamMemberCard.jsx` | Create new component (optional) |
| `src/components/ComplianceCard.jsx` | Create new component (optional) |

### 8.2 Files to Create

| File | Purpose |
|------|---------|
| `src/components/TeamMemberCard.jsx` | Enhanced team member card with hover effects |
| `src/components/ComplianceCard.jsx` | Compliance information card component |

---

## 9. Accessibility Requirements

- All interactive elements must have focus states
- Color contrast ratio ≥ 4.5:1 for text
- Hover effects must have keyboard alternatives
- Team member cards must be keyboard navigable
- Compliance cards must be accessible
- Respect `prefers-reduced-motion` setting
- Images must have descriptive alt text

---

## 10. Performance Considerations

- Lazy load images with `loading="lazy"`
- Use `will-change` property for animated elements
- GPU-accelerated animations only (transform, opacity)
- Reduce animations on mobile
- Optimize image sizes
- Use CSS containment for better performance

---

## 11. Testing Checklist

- [ ] All sections display correctly at all breakpoints
- [ ] Animations trigger on scroll
- [ ] Hover effects work on all interactive elements
- [ ] Team member cards show details on hover
- [ ] Compliance cards display correctly
- [ ] Overlay gradients enhance readability
- [ ] Image hover effects are smooth
- [ ] Spacing is uniform (80px between sections)
- [ ] Mobile animations are reduced
- [ ] Focus states visible for keyboard navigation
- [ ] Color contrast meets WCAG standards
- [ ] `prefers-reduced-motion` is respected

---

## 12. Success Criteria

1. ✅ About page matches premium/luxury aesthetic of homepage
2. ✅ All sections have enhanced visual styling
3. ✅ Moderate animations with staggered reveals work smoothly
4. ✅ Team member cards have larger images with hover details
5. ✅ Compliance information displayed as cards/icons
6. ✅ Dark background sections have enhanced overlay gradients
7. ✅ Image hover effects are smooth and engaging
8. ✅ Uniform 80px spacing between sections
9. ✅ Mobile experience is optimized with reduced animations
10. ✅ All accessibility requirements met

---

## Notes

- Preserve all existing content (text may have minor edits for clarity)
- Maintain alternating left/right image placement in split sections
- Test image hover effects and iterate if needed
- Consider consolidating Mission & Vision if it improves flow
- Use existing design system variables and patterns
- Follow homepage redesign principles for consistency
