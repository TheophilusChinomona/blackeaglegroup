# Specification: Phase 1 - Foundation & Core Setup

## Goal
Set up React development environment with Vite, create component architecture, and migrate core pages (Home, About) with shared navigation and footer components while maintaining pixel-perfect visual consistency with the existing site.

## User Stories
- As a developer, I want a modern React project structure so that I can efficiently build and maintain the application
- As a user, I want to navigate between Home and About pages seamlessly so that I can access company information without page reloads

## Specific Requirements

**React Project Initialization**
- Initialize React project using Vite build tool for fast development and optimized production builds
- Set up project structure with `src/` for components and `public/` for static assets
- Configure Tailwind CSS v3 with PostCSS and Autoprefixer
- Install React Router 6.x for client-side routing with nested route support
- Install React Bootstrap for navigation components

**Component Architecture Setup**
- Create `src/components/common/` folder for shared components (Header, Footer, Navigation)
- Create `src/pages/` folder for page components (Home, About)
- Create `src/css/` folder for any custom CSS modules if needed alongside Tailwind
- Set up component structure following React best practices with functional components and hooks

**Navigation Component**
- Create Header component using React Bootstrap Navbar OR shadcn/ui Navigation Menu
- Option 1: React Bootstrap Navbar (to match exact Bootstrap styling from original)
- Option 2: shadcn/ui Navigation Menu (modern, accessible, customizable)
- Preserve logo placement and styling (logo image from `images/Website logo.png`)
- Implement responsive mobile menu with hamburger toggle matching existing behavior
- Include all navigation links: Home, About, Property Services, Golf Events, Services, Clients, Strategic Partners, Blog, Contact
- Use React Router Link components for client-side navigation
- Maintain exact visual design from original HTML (regardless of component choice)

**Footer Component**
- Create Footer component matching structure from `public_html/index.html` footer section
- Include company information, navigation links, contact details, and social media links
- Preserve Google Maps embed iframe with exact dimensions and styling
- Include PDF download links for company profiles (BE Profile2.pdf, BE Profile.pdf, CDP & Events Management Profile.pdf)
- Maintain exact layout with four columns: Company info, Navigation, Quick Contacts, Office Directions

**Home Page Component**
- Convert `public_html/index.html` main content to React component
- Implement hero section with CSS background-image using `images/bg_1.jpg`
- Preserve hero text, video link, and promotional image links (CoT and CSIR golf day images)
- Convert services section with four service cards (Stakeholder Relations, Golf Events, Sponsorship, Post-Event Management)
- Convert "Why Choose Us" section with image and text content
- Convert dedication section with four dedication points
- Maintain exact Tailwind classes converted from existing CSS

**About Page Component**
- Convert `public_html/about.html` main content to React component
- Implement hero section with breadcrumbs matching existing design
- Convert all content sections: Company Overview, CEO and Founder, Mission, Vision, Services List, Company Structure
- Preserve team member cards with images and roles
- Maintain compliance information section
- Use CSS background images for section backgrounds

**Routing Configuration**
- Set up React Router with routes: `/` (Home), `/about` (About)
- Configure nested route structure for future sub-sites (COT, CSIR, CASSI)
- Implement route-based code splitting using React.lazy() for performance
- Ensure all routes work correctly with client-side navigation

**Styling System**
- Convert existing CSS from `public_html/css/style.css` to Tailwind v3 utility classes
- Maintain all existing visual design elements exactly
- Use Tailwind's JIT mode for optimal build performance
- Configure Tailwind to scan all React component files for class usage
- Preserve custom fonts (Poppins) and icon fonts (Ionicons, Flaticon) from existing site

**Asset Migration**
- Copy all images from `public_html/images/` to React `public/images/` folder
- Copy all fonts from `public_html/fonts/` to React `public/fonts/` folder
- Copy all PDFs from `public_html/` root to React `public/` folder
- Preserve `public_html/` folder completely unchanged as reference
- Update all asset paths in components to use React public folder structure

## Visual Design
No visual assets provided. Reference existing HTML files in `public_html/` for exact visual design and maintain pixel-perfect consistency.

## Existing Code to Leverage

**Navigation Structure from `public_html/index.html`**
- Bootstrap navbar with collapse functionality for mobile menu
- Logo placement and responsive behavior
- Navigation menu items and active state handling
- Mobile hamburger toggle button with icon

**Footer Structure from `public_html/index.html`**
- Four-column footer layout with company info, navigation, contacts, and map
- Social media links structure (LinkedIn, Facebook, Instagram)
- Contact information formatting
- Google Maps embed configuration
- PDF download link structure

**Hero Sections from `public_html/index.html` and `public_html/about.html`**
- Hero section with background image and overlay
- Text positioning and styling
- Video link integration pattern
- Breadcrumb navigation structure for inner pages

**CSS Styles from `public_html/css/style.css`**
- All existing CSS classes and styling rules to convert to Tailwind
- Color schemes, typography, spacing, and layout patterns
- Responsive breakpoints and media queries
- Animation and transition effects

## Out of Scope
- Services, Contact, Clients, and other content pages (Phase 2)
- Event galleries and sub-site pages (Phase 3)
- Performance optimization and code splitting beyond basic route splitting (Phase 4)
- SEO meta tags and structured data (Phase 4)
- Accessibility enhancements beyond basic semantic HTML (Phase 4)
- Image optimization and WebP conversion (Phase 4)
- Error boundaries and loading states (Phase 4)

