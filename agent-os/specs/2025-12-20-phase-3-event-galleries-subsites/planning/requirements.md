# Spec Requirements: Phase 3 - Event Galleries & Sub-sites

## Initial Description

Migrate golf event pages, implement image galleries, handle sub-site structures (COT, CSIR, CASSI), and add interactive features.

### Objectives
- Migrate golf event pages
- Implement image galleries
- Handle sub-site structures (COT, CSIR, CASSI)
- Add interactive features

### Deliverables
- Golf Events landing page
- Event gallery components
- Image lightbox/modal functionality
- COT (City of Tshwane) event pages
- CSIR event pages
- CASSI gallery pages
- Video integration (YouTube embeds)

### Key Features
- Image gallery with lightbox
- Event-specific pages
- Responsive image grids
- Video player integration
- Smooth scrolling and animations

### Success Criteria
- All galleries functional
- Images load efficiently
- Video embeds work correctly
- Event pages maintain original functionality

## Requirements Discussion

### First Round Questions

**Q1:** Image Galleries - Should we use react-image-gallery or react-lightbox, or a custom solution?
**Answer:** react-image-gallery is best

**Q2:** Gallery Performance - Should we lazy load all images, or load on scroll/viewport?
**Answer:** Lazy load images

**Q3:** Sub-sites (COT, CSIR, CASSI) - Should these be separate route sections or separate apps?
**Answer:** COT and CSIR are separate app sub-sites in the same big app folder, CASSI can be a separate route section. Single build with all routes. Need to research cPanel deployment considerations.

**Q4:** Video Embeds - Should we use react-player for YouTube, or native iframe embeds?
**Answer:** react-player

**Q5:** Event Pages - Should event pages be static content, or data-driven from JSON/config?
**Answer:** Data-driven from JSON/config files

**Q6:** Image Optimization - Should we convert to WebP, or keep original formats?
**Answer:** Convert to WebP format

**Q7:** Gallery Navigation - Should we have lightbox with prev/next, or grid view only?
**Answer:** Lightbox with prev/next and also grid view option

**Q8:** Mobile Galleries - Should we use the same layout, or a mobile-optimized view?
**Answer:** Mobile optimized view

### Existing Code to Reference

**Similar Features Identified:**
- Golf event pages: `public_html/cassi/GolfDay.html` and related event pages
- Gallery structure: `public_html/cassi/Gallery/gallery.html` contains gallery layout
- COT sub-site: `public_html/COT/` folder contains COT event pages
- CSIR sub-site: `public_html/csir/` folder contains CSIR event pages
- CASSI gallery: `public_html/cassi/Gallery/` contains gallery images and structure
- Video embeds: Existing YouTube embeds in HTML files

### Follow-up Questions

**Follow-up 1:** Deployment Question - Should COT/CSIR be separate route sections within the main app, single build with all routes?
**Answer:** Separate route sections within the main app, single build with all routes. Need to research cPanel documentation for best deployment approach.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
- Reference `public_html/cassi/Gallery/gallery.html` for gallery structure
- Reference `public_html/cassi/GolfDay.html` for event page layout
- Reference `public_html/COT/` and `public_html/csir/` for sub-site structures

## Requirements Summary

### Functional Requirements
- Create Golf Events landing page
- Implement event gallery components using react-image-gallery
- Implement image lightbox/modal with prev/next navigation
- Implement grid view option for galleries
- Create COT (City of Tshwane) event pages as nested routes
- Create CSIR event pages as nested routes
- Create CASSI gallery pages as route section
- Integrate react-player for YouTube video embeds
- Implement lazy loading for all gallery images
- Convert images to WebP format for optimization
- Create mobile-optimized gallery views
- Structure event data in JSON/config files (data-driven approach)
- Implement smooth scrolling and animations
- Single build with all routes for cPanel deployment

### Reusability Opportunities
- Gallery component can be reused across different event types
- Event page template can be reused for COT, CSIR, and other events
- Image optimization pipeline can be reused for all images
- Video player component can be reused for all video embeds

### Scope Boundaries
**In Scope:**
- Golf Events landing page
- Event gallery components with react-image-gallery
- Lightbox with prev/next navigation
- Grid view option
- COT event pages (nested routes)
- CSIR event pages (nested routes)
- CASSI gallery pages (route section)
- Video integration with react-player
- Lazy loading for images
- WebP image conversion
- Mobile-optimized gallery views
- Data-driven event pages (JSON/config)
- Single build deployment for cPanel

**Out of Scope:**
- Separate builds for sub-sites (using single build approach)
- CMS for event content (using JSON/config for now)
- Advanced video features beyond YouTube embeds
- Performance optimization - Phase 4
- SEO enhancements - Phase 4

### Technical Considerations
- Gallery library: react-image-gallery for feature-rich gallery functionality
- Image loading: Lazy loading for performance
- Image format: WebP conversion for optimization
- Video player: react-player for YouTube embeds
- Routing: Nested routes for COT and CSIR sub-sites, route section for CASSI
- Data structure: JSON/config files for event data (data-driven approach)
- Deployment: Single build with all routes, research cPanel deployment best practices
- Mobile: Responsive and mobile-optimized gallery views
- Gallery features: Lightbox with prev/next, grid view option
- Reference point: `public_html/cassi/`, `public_html/COT/`, `public_html/csir/` folders for existing structures

### cPanel Deployment Considerations
- Single build approach: All routes in one build, deployed to public_html
- .htaccess configuration: May need rewrite rules for SPA routing
- Sub-site routing: COT and CSIR as nested routes (e.g., `/events/cot`, `/events/csir`)
- CASSI routing: Route section (e.g., `/cassi/gallery`)
- Research needed: Review cPanel documentation for React SPA deployment best practices

