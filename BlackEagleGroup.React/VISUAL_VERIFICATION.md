# Visual Verification Guide - Phase 1

## Purpose
This document provides a checklist for visually comparing the React application with the original HTML site to ensure pixel-perfect consistency.

## Comparison Instructions

1. Start the development server: `npm run dev`
2. Open the React app in browser (typically `http://localhost:5173`)
3. Open the original HTML files from `public_html/` in another browser window
4. Compare side-by-side at different screen sizes

---

## Home Page Comparison (`/` vs `public_html/index.html`)

### Hero Section
- [ ] Background image (`bg_1.jpg`) displays correctly
- [ ] Overlay opacity matches (40% black overlay)
- [ ] Welcome text: "Welcome to Black Eagle Group Holdings Pty Ltd"
- [ ] Text styling: 60px, white, font-weight 200
- [ ] Video link with play icon (green circle, #59B200)
- [ ] Promotional images on right side (CoT and CSIR golf day)
- [ ] Responsive height: 850px desktop, 1150px mobile

### Services Section
- [ ] Section title: "Our Brief" / "Services"
- [ ] Four service cards in a row:
  - [ ] Stakeholder Relations Management (guard.png icon)
  - [ ] Golf Events Management (flaticon-route icon)
  - [ ] Sponsorship Management (cleaning.png icon)
  - [ ] Post-Event Management (car.png icon)
- [ ] Card layout and spacing matches

### Why Choose Us Section
- [ ] Left side: Background image (`about.jpg`)
- [ ] Right side: Text content with heading
- [ ] "Read More" button links to About page
- [ ] Text content matches exactly

### Dedication Section
- [ ] Background image (`bg_6.jpg`) with overlay
- [ ] Section title: "Why us" / "Dedicated"
- [ ] Four dedication cards:
  - [ ] "Maintaining contract compliance"
  - [ ] "Making timely information-driven decisions"
  - [ ] "Integrity is non-negotiable"
  - [ ] Fourth dedication point
- [ ] Icon fonts display correctly (flaticon icons)
- [ ] White text on dark background

---

## About Page Comparison (`/about` vs `public_html/about.html`)

### Hero Section with Breadcrumbs
- [ ] Background image (`bg_3.jpg`)
- [ ] Breadcrumb navigation: "Home > About us"
- [ ] Heading: "Get To Know Us"
- [ ] Height: 700px

### Company Overview Section
- [ ] Left side: Background image (`About-1.jpg`)
- [ ] Right side: Text content
- [ ] Subheading: "About us"
- [ ] Heading: "Company Overview"
- [ ] Paragraph content matches

### CEO and Founder Section
- [ ] Background image (`bg_6.jpg`) with overlay
- [ ] Centered text content
- [ ] Subheading: "About us"
- [ ] Heading: "CEO and Founder"
- [ ] Paragraph about Mr. Mandla Mndawe

### Mission Section
- [ ] Left side: Background image (`About-4.jpg`)
- [ ] Right side: Mission statement
- [ ] Heading: "Our Mission"

### Vision Section
- [ ] Background image (`bg_6.jpg`) with overlay
- [ ] Centered text content
- [ ] Heading: "Our Vision"

### Services List Section
- [ ] Left side: Background image (`About-3.jpg`)
- [ ] Right side: Bulleted list of services
- [ ] Heading: "Our Services"

### More About Section
- [ ] Background image (`bg_6.jpg`) with overlay
- [ ] Long paragraph content about the company
- [ ] Heading: "About us"

### Compliance Information Section
- [ ] Left side: Background image (`About-4.jpg`)
- [ ] Right side: Compliance details (PSIRA, Co Reg, Bank accounts)
- [ ] Heading: "Compliance Information"

### Company Structure Section
- [ ] Section title: "Our Company" / "Structure"
- [ ] Three team member cards:
  - [ ] Mandla Mndawe - CEO (MM.png)
  - [ ] Siegfried Mboweni - Brand Manager (SR.png)
  - [ ] Kabelo Mokoena - Stakeholder Relations Manager (KM.png)
- [ ] Images and text display correctly

---

## Header/Navigation Comparison

### Desktop View
- [ ] Logo displays on left (`Website logo.png`)
- [ ] Navigation links in horizontal row on right
- [ ] Links: Home, About, Property Services, Golf Events, Services, Clients, Strategic Partners, Blog, Contact
- [ ] Active link highlighted (Home on home page, About on about page)
- [ ] Dark background (`bg-dark`)
- [ ] Text color and styling matches

### Mobile View (< 992px)
- [ ] Hamburger menu button visible
- [ ] Menu collapses/expands on click
- [ ] Navigation links stack vertically when expanded
- [ ] Logo remains visible

---

## Footer Comparison

### Layout
- [ ] Four columns layout
- [ ] Dark background (`ftco-bg-dark`)

### Column 1: Company Info
- [ ] Company name: "Black Eagle Group Holdings Pty Ltd"
- [ ] Company description paragraph
- [ ] Three PDF download links with flag icons:
  - [ ] Cleaning Profile (BE Profile2.pdf)
  - [ ] Security Profile (BE Profile.pdf)
  - [ ] CDP & Events Management Profile

### Column 2: Navigation
- [ ] Heading: "Navigation"
- [ ] List of navigation links (Home, About, Property, Services, etc.)

### Column 3: Quick Contacts
- [ ] Heading: "Quick Contacts"
- [ ] Address: "No. 640 Wainright Street Moreleta, Moreleta Park, Pretoria, 0002"
- [ ] Phone: "0128835609 | 0826249680"
- [ ] Email: "info@blackeaglegroup.co.za"
- [ ] Icons display correctly

### Column 4: Office Directions
- [ ] Heading: "Office Directions"
- [ ] Google Maps iframe (289x218px)
- [ ] Map loads and displays correctly

### Footer Bottom
- [ ] Social media links (LinkedIn, Facebook, Instagram)
- [ ] Copyright text with dynamic year
- [ ] "Designed by Deovolent IT Solutions" link

---

## Responsive Breakpoints

Test at these screen widths:
- [ ] Mobile: 375px, 414px
- [ ] Tablet: 768px, 992px
- [ ] Desktop: 1200px, 1440px

### Mobile Checks (< 768px)
- [ ] Navigation menu collapses
- [ ] Hero section height adjusts (1150px)
- [ ] Images scale appropriately
- [ ] Text remains readable
- [ ] Footer columns stack vertically

### Tablet Checks (768px - 991px)
- [ ] Navigation may still be collapsed or horizontal
- [ ] Layout adjusts appropriately
- [ ] Images and text maintain proportions

### Desktop Checks (> 992px)
- [ ] Full navigation menu visible
- [ ] Hero section at full height (850px)
- [ ] Four-column footer layout
- [ ] All sections display side-by-side where intended

---

## Color Verification

### Primary Colors
- [ ] Primary green: #59B200 (buttons, icons)
- [ ] Primary light: #00CC33 (hover states)
- [ ] Primary lighter: #99FF00 (some hover states)
- [ ] Black: #000000 (text, backgrounds)
- [ ] White: #ffffff (text on dark backgrounds)

### Backgrounds
- [ ] Hero overlay: rgba(0, 0, 0, 0.4)
- [ ] Section overlays: rgba(0, 0, 0, 0.4)
- [ ] Dark sections: #000000 or similar

---

## Typography Verification

### Font Family
- [ ] Poppins font loads correctly
- [ ] Fallback fonts work if Poppins fails

### Font Sizes
- [ ] Hero h1: 60px
- [ ] Section headings: Various sizes
- [ ] Body text: Default size
- [ ] Navigation: Appropriate size

### Font Weights
- [ ] Hero text: 200 (light)
- [ ] Headings: 600-700 (semi-bold to bold)
- [ ] Body: 400 (normal)

---

## Icon Fonts Verification

### Ionicons
- [ ] Play icon (ion-ios-play) displays
- [ ] Arrow icons (ion-ios-arrow-forward) display
- [ ] Other ionicons display correctly

### Flaticon
- [ ] Route icon (flaticon-route) displays
- [ ] Select icon (flaticon-select) displays
- [ ] Rent icon (flaticon-rent) displays
- [ ] Review icon (flaticon-review) displays

---

## Image Verification

### Key Images
- [ ] Logo: `Website logo.png`
- [ ] Hero backgrounds: `bg_1.jpg`, `bg_3.jpg`, `bg_6.jpg`
- [ ] About images: `About-1.jpg`, `About-3.jpg`, `About-4.jpg`
- [ ] Service icons: `guard.png`, `cleaning.png`, `car.png`
- [ ] Team photos: `MM.png`, `SR.png`, `KM.png`
- [ ] Promotional: `Summary Pic1.png`, `Summary Pic2.png`

### Image Loading
- [ ] All images load without errors
- [ ] Images maintain aspect ratios
- [ ] No broken image icons
- [ ] Images are optimized for web

---

## Functional Verification

### Navigation
- [ ] All links work (Home, About, etc.)
- [ ] Active state highlights current page
- [ ] Mobile menu toggles correctly
- [ ] Links navigate without page reload

### External Links
- [ ] YouTube video link opens in new tab
- [ ] CoT golf day link opens correctly
- [ ] CSIR golf day link opens correctly
- [ ] Social media links open in new tabs
- [ ] PDF links download correctly

### Interactive Elements
- [ ] Buttons are clickable
- [ ] Links have hover states
- [ ] Forms (if any) are functional
- [ ] Google Maps iframe loads

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Notes

- Some visual differences may be acceptable due to React/Bootstrap rendering
- Focus on layout, spacing, colors, and typography matching
- Interactive behavior should match original site
- All content should be present and readable
- Performance should be acceptable (no significant lag)

---

## Sign-off

Once all items are checked and verified:
- [ ] Visual design matches original site
- [ ] All functionality works correctly
- [ ] Responsive design maintained
- [ ] No visual regressions
- [ ] Ready for Phase 2 development

