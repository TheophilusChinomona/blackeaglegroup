# Homepage Redesign Specification

**Project:** Black Eagle Group Website  
**Date:** December 21, 2025  
**Status:** Ready for Implementation  

---

## 1. Executive Summary

This specification details the redesign of the Black Eagle Group homepage and footer components with a **Premium/Luxury** aesthetic. The changes focus on:

1. **Hero Section** - Reduced height, functional CTA cards, video lightbox
2. **Footer** - Streamlined design following best practices
3. **About Page** - Add PDF downloads section (moved from footer)

---

## 2. Design System

### 2.1 Aesthetic Direction: Premium/Luxury

The design should evoke the sophistication of high-end golf clubs and corporate excellence.

### 2.2 Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#59B200` | Brand green, primary actions |
| `--color-primary-dark` | `#4A9600` | Hover states |
| `--color-accent` | `#C9A962` | Gold accent, luxury highlights |
| `--color-accent-light` | `#D4BC7D` | Gold hover states |
| `--color-dark` | `#1A1A1A` | Dark backgrounds, text |
| `--color-charcoal` | `#2D2D2D` | Footer background |
| `--color-cream` | `#F5F3EF` | Light backgrounds |
| `--color-white` | `#FFFFFF` | Pure white |
| `--color-text` | `#333333` | Body text |
| `--color-text-muted` | `#666666` | Secondary text |

### 2.3 Typography

```css
/* Import refined fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600&display=swap');

/* Hero heading */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 500;

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

### 2.5 Shadows

```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.16);
--shadow-gold: 0 4px 20px rgba(201, 169, 98, 0.3);
```

---

## 3. Component Specifications

### 3.1 Hero Section

**File:** `src/pages/Home.jsx`

#### 3.1.1 Layout Changes

| Property | Current | New |
|----------|---------|-----|
| Height | `850px` fixed | `min(80vh, 650px)` |
| Content structure | Form wrapper with images | Clean overlay with CTA cards |
| Background overlay | `rgba(0,0,0,0.4)` | Gradient: `linear-gradient(135deg, rgba(0,0,0,0.5), rgba(0,0,0,0.3))` |

#### 3.1.2 Hero Structure

```jsx
<section className="hero-section">
  {/* Background with gradient overlay */}
  <div className="hero-background">
    <div className="hero-overlay" />
  </div>
  
  {/* Content container */}
  <Container className="hero-content">
    <Row>
      {/* Left: Welcome text + Video CTA */}
      <Col lg={7}>
        <h1>Welcome to Black Eagle Group Holdings</h1>
        <p className="hero-tagline">Premier stakeholder relations & event management</p>
        <button className="video-cta" onClick={openVideoModal}>
          <PlayIcon /> Watch Our Story
        </button>
      </Col>
      
      {/* Right: Event CTA Cards */}
      <Col lg={5}>
        <div className="event-cards-container">
          <EventCard 
            image="/images/Summary Pic2.png"
            title="CoT Golf Day"
            href="https://blackeaglegroup.co.za/COT/index.html"
          />
          <EventCard 
            image="/images/Summary Pic1.png"
            title="CSIR Charity Golf Day"
            href="https://blackeaglegroup.co.za/csir/csir.html"
          />
        </div>
      </Col>
    </Row>
  </Container>
</section>

{/* Video Modal */}
{isVideoOpen && <VideoModal onClose={closeVideoModal} />}
```

#### 3.1.3 Event CTA Card Component

**Purpose:** Prominent, clickable cards that clearly indicate they are interactive

**Styling:**

```css
.event-card {
  display: block;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(201, 169, 98, 0.3); /* Subtle gold border */
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-gold);
  border-color: var(--color-accent);
}

.event-card img {
  width: 100%;
  height: auto;
  display: block;
}

.event-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
}

.event-card-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-accent);
  font-weight: 500;
}
```

#### 3.1.4 Video Modal Component

**Behavior:**
- Opens when video CTA is clicked
- YouTube embed in centered modal
- Click outside or press Escape to close
- Smooth fade-in animation

```jsx
const VideoModal = ({ onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose}>×</button>
        <iframe
          src="https://www.youtube.com/embed/GOfl2sbgPhk?autoplay=1"
          title="Black Eagle Group - How we achieve our goals"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}
```

**Modal Styling:**

```css
.video-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.2s ease;
}

.video-modal-content {
  position: relative;
  width: 90%;
  max-width: 900px;
  aspect-ratio: 16/9;
  background: black;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.video-modal-content iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.video-modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.video-modal-close:hover {
  opacity: 1;
}
```

---

### 3.2 Footer Redesign

**File:** `src/components/common/Footer.jsx`

#### 3.2.1 Current vs New Structure

| Current | New |
|---------|-----|
| 4 columns | 3 sections (horizontal layout) |
| Google Maps embed | Removed (exists on Contact page) |
| 3 PDF downloads | Removed (moved to About page) |
| 8 navigation links | 5 key links |
| ~400px height | ~200px height |

#### 3.2.2 New Footer Structure

```jsx
<footer className="site-footer">
  <Container>
    {/* Main Footer Content */}
    <Row className="footer-main">
      {/* Contact Info */}
      <Col lg={4} md={6}>
        <div className="footer-contact">
          <h4>Contact Us</h4>
          <address>
            <p>No. 640 Wainright Street Moreleta,<br />
               Moreleta Park, Pretoria, 0002</p>
            <p><a href="tel:0128835609">012 883 5609</a></p>
            <p><a href="mailto:info@blackeaglegroup.co.za">info@blackeaglegroup.co.za</a></p>
          </address>
        </div>
      </Col>
      
      {/* Quick Links */}
      <Col lg={4} md={6}>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <nav>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/golf-events">Golf Events</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </Col>
      
      {/* Social Links */}
      <Col lg={4}>
        <div className="footer-social">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/black-eagle-group-xkk2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://www.facebook.com/Black-Eagle-Group-XKK2-112062043913835" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href="https://www.instagram.com/blackeaglegroupxkk2/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </Col>
    </Row>
    
    {/* Copyright Bar */}
    <Row className="footer-copyright">
      <Col className="text-center">
        <p>© {currentYear} Black Eagle Group Holdings. All rights reserved.</p>
        <p className="footer-credit">
          Designed by <a href="https://deovolent.co.za" target="_blank" rel="noopener noreferrer">Deovolent IT Solutions</a>
        </p>
      </Col>
    </Row>
  </Container>
</footer>
```

#### 3.2.3 Footer Styling

```css
.site-footer {
  background: var(--color-charcoal);
  color: var(--color-cream);
  padding: var(--space-xl) 0 var(--space-md);
}

.site-footer h4 {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  color: var(--color-accent);
  margin-bottom: var(--space-md);
  position: relative;
}

.site-footer h4::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--color-accent);
}

.footer-contact address {
  font-style: normal;
  line-height: 1.8;
}

.footer-contact a {
  color: var(--color-cream);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-contact a:hover {
  color: var(--color-accent);
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a {
  color: var(--color-cream);
  text-decoration: none;
  transition: color 0.2s, transform 0.2s;
  display: inline-block;
}

.footer-links a:hover {
  color: var(--color-accent);
  transform: translateX(4px);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icons a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-cream);
  transition: background 0.3s, color 0.3s, transform 0.3s;
}

.social-icons a:hover {
  background: var(--color-accent);
  color: var(--color-dark);
  transform: translateY(-3px);
}

.footer-copyright {
  margin-top: var(--space-xl);
  padding-top: var(--space-md);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright p {
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.footer-credit a {
  color: var(--color-accent);
  text-decoration: none;
}

/* Responsive */
@media (max-width: 991px) {
  .footer-main > div {
    margin-bottom: var(--space-lg);
    text-align: center;
  }
  
  .site-footer h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-links nav {
    align-items: center;
  }
  
  .social-icons {
    justify-content: center;
  }
}
```

---

### 3.3 About Page - PDF Downloads Section

**File:** `src/pages/About.jsx`

#### 3.3.1 New Section

Add after the "Company Structure" section:

```jsx
{/* Company Profiles Download Section */}
<section className="ftco-section company-profiles-section">
  <Container>
    <Row className="justify-content-center mb-5">
      <Col md={8} className="text-center">
        <span className="subheading">Resources</span>
        <h2 className="mb-4">Company Profiles</h2>
        <p>Download our company profiles to learn more about our services and capabilities.</p>
      </Col>
    </Row>
    <Row className="justify-content-center">
      <Col md={10}>
        <div className="profile-cards">
          <ProfileDownloadCard
            title="Cleaning Services Profile"
            description="Comprehensive cleaning services for corporate and commercial clients."
            file="/BE Profile2.pdf"
            icon="🧹"
          />
          <ProfileDownloadCard
            title="Security Services Profile"
            description="Professional security solutions with PSIRA compliance."
            file="/BE Profile.pdf"
            icon="🛡️"
          />
          <ProfileDownloadCard
            title="CDP & Events Management"
            description="Community development and premier event management services."
            file="/CDP & Events Management Profile.pdf"
            icon="🏌️"
          />
        </div>
      </Col>
    </Row>
  </Container>
</section>
```

#### 3.3.2 ProfileDownloadCard Component

```jsx
const ProfileDownloadCard = ({ title, description, file, icon }) => (
  <a 
    href={file} 
    download 
    target="_blank" 
    rel="noopener noreferrer"
    className="profile-download-card"
  >
    <div className="profile-icon">{icon}</div>
    <div className="profile-info">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <div className="download-indicator">
      <span className="download-icon">↓</span>
      <span>Download PDF</span>
    </div>
  </a>
)
```

#### 3.3.3 Profile Card Styling

```css
.profile-cards {
  display: grid;
  gap: 1.5rem;
}

.profile-download-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.profile-download-card:hover {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-md);
  transform: translateX(4px);
}

.profile-icon {
  font-size: 2.5rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-cream);
  border-radius: 12px;
}

.profile-info {
  flex: 1;
}

.profile-info h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
  color: var(--color-dark);
}

.profile-info p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.download-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 0.875rem;
}

.download-icon {
  width: 36px;
  height: 36px;
  border: 2px solid currentColor;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.profile-download-card:hover .download-indicator {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .profile-download-card {
    flex-direction: column;
    text-align: center;
  }
}
```

---

## 4. Implementation Files

### 4.1 Files to Modify

| File | Changes | Priority |
|------|---------|----------|
| `src/pages/Home.jsx` | Hero restructure, event CTA cards, video modal | High |
| `src/components/common/Footer.jsx` | Complete redesign | High |
| `src/pages/About.jsx` | Add PDF downloads section | Medium |
| `src/index.css` | Add CSS variables, modal styles, new component styles | High |

### 4.2 Files to Create

| File | Purpose |
|------|---------|
| `src/components/EventCard.jsx` | Reusable event CTA card component |
| `src/components/VideoModal.jsx` | YouTube video lightbox modal |
| `src/components/ProfileDownloadCard.jsx` | PDF download card for About page |

---

## 5. Responsive Breakpoints

| Breakpoint | Behavior |
|------------|----------|
| Desktop (>992px) | Full layout, side-by-side hero content |
| Tablet (768-991px) | Stacked hero, 2-column footer |
| Mobile (<768px) | Single column, stacked cards |

---

## 6. Accessibility Requirements

- All interactive elements must have focus states
- Color contrast ratio ≥ 4.5:1 for text
- Video modal must be keyboard navigable
- Social links must have aria-labels
- Event cards must have descriptive alt text
- Skip link for keyboard users

---

## 7. Performance Considerations

- Lazy load event card images
- Use `loading="lazy"` on background images where possible
- Video modal should not load iframe until opened
- CSS animations use `transform` and `opacity` only (GPU accelerated)

---

## 8. Testing Checklist

- [ ] Hero displays correctly at all breakpoints
- [ ] Event cards are clickable and open in new tab
- [ ] Video modal opens, plays, and closes correctly
- [ ] Escape key closes video modal
- [ ] Footer links work correctly
- [ ] PDF downloads work from About page
- [ ] All hover states function
- [ ] Focus states visible for keyboard navigation
- [ ] Mobile touch targets are 44x44px minimum

