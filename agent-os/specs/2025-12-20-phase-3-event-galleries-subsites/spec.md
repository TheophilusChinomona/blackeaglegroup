# Specification: Phase 3 - Event Galleries & Sub-sites

## Goal
Migrate golf event pages, implement image galleries with lightbox functionality, handle sub-site structures (COT, CSIR, CASSI) as nested routes, and integrate video players while maintaining original functionality.

## User Stories
- As a visitor, I want to browse event galleries with lightbox viewing so that I can see event photos in detail
- As an event participant, I want to access event-specific pages so that I can find information about golf events

## Specific Requirements

**Golf Events Landing Page**
- Create Golf Events landing page component
- Display overview of golf events and links to specific event pages
- Include navigation to COT, CSIR, and CASSI event sections
- Maintain design consistency with main site
- Reference structure from `public_html/cassi/GolfDay.html`

**Image Gallery Component**
- Implement gallery using react-image-gallery library
- Create reusable Gallery component for different event types
- Support both lightbox view with prev/next navigation and grid view option
- Implement lazy loading for all gallery images
- Convert all gallery images to WebP format during build process
- Create mobile-optimized gallery view with responsive layout
- Reference gallery structure from `public_html/cassi/Gallery/gallery.html`

**Event Page Template**
- Create reusable EventPage template component
- Structure event data in JSON/config files (data-driven approach)
- Support dynamic content loading from data files
- Include event-specific sections: overview, details, gallery, videos
- Maintain consistent layout across different event types
- Enable easy addition of new events through data files

**COT (City of Tshwane) Event Pages**
- Create COT event pages as nested routes (e.g., `/events/cot`)
- Convert content from `public_html/COT/` folder
- Include all COT-specific pages: index, about, contact, team, etc.
- Maintain COT branding and styling
- Implement as nested route section within main app
- Single build deployment approach

**CSIR Event Pages**
- Create CSIR event pages as nested routes (e.g., `/events/csir`)
- Convert content from `public_html/csir/` folder
- Include all CSIR-specific pages and content
- Maintain CSIR branding and styling
- Implement as nested route section within main app
- Single build deployment approach

**CASSI Gallery Pages**
- Create CASSI gallery pages as route section (e.g., `/cassi/gallery`)
- Convert gallery structure from `public_html/cassi/Gallery/`
- Implement gallery with all CASSI event images
- Include navigation to different CASSI event galleries
- Maintain CASSI-specific styling and layout

**Video Integration**
- Integrate react-player library for YouTube video embeds
- Create reusable VideoPlayer component
- Support YouTube video URLs from existing HTML embeds
- Maintain video aspect ratios and responsive behavior
- Include video controls and playback functionality
- Reference existing YouTube embeds from HTML files

**Image Optimization Pipeline**
- Set up automatic WebP conversion during build process
- Convert all gallery images to WebP format
- Maintain fallback to original formats for browser compatibility
- Implement image lazy loading for performance
- Optimize image sizes while maintaining quality
- Structure for easy addition of new images

**Mobile Gallery Optimization**
- Create mobile-specific gallery layout
- Optimize touch interactions for mobile devices
- Implement swipe gestures for lightbox navigation
- Adjust image sizes and grid layout for mobile screens
- Ensure fast loading on mobile networks
- Test on various mobile device sizes

**Routing Configuration for Sub-sites**
- Configure nested routes for COT: `/events/cot/*`
- Configure nested routes for CSIR: `/events/csir/*`
- Configure route section for CASSI: `/cassi/*`
- Ensure all routes work in single build deployment
- Set up route structure for cPanel hosting compatibility
- Research and implement .htaccess rules if needed for SPA routing

**Smooth Scrolling and Animations**
- Implement smooth scrolling for page navigation
- Add subtle animations for gallery image loading
- Include transition effects for lightbox open/close
- Maintain performance while adding visual polish
- Use CSS transitions (lightweight approach)

**Data Structure for Events**
- Create JSON/config file structure for event data
- Include event metadata: title, description, date, location, images, videos
- Support multiple events per event type (COT, CSIR, CASSI)
- Enable easy content updates through data files
- Structure for future CMS integration

## Visual Design
No visual assets provided. Reference existing gallery and event pages (`public_html/cassi/Gallery/gallery.html`, `public_html/cassi/GolfDay.html`, `public_html/COT/`, `public_html/csir/`) for exact visual design and maintain pixel-perfect consistency.

## Existing Code to Leverage

**Gallery Structure from `public_html/cassi/Gallery/gallery.html`**
- Gallery grid layout and image organization
- Image display patterns and sizing
- Navigation patterns between gallery images
- Mobile gallery behavior

**Event Pages from `public_html/cassi/GolfDay.html`**
- Event page layout and content structure
- Hero section for event pages
- Content sections and formatting
- Navigation patterns within event sites

**COT Sub-site from `public_html/COT/`**
- COT-specific navigation and branding
- Page structure and content organization
- Contact forms and information display
- Team and about page layouts

**CSIR Sub-site from `public_html/csir/`**
- CSIR-specific navigation and branding
- Event detail page structure
- Sponsorship package displays
- Content organization patterns

**Video Embeds from Existing HTML**
- YouTube embed iframe structure
- Video player configuration
- Responsive video container patterns
- Video placement and sizing

## Out of Scope
- Separate builds for sub-sites (using single build approach)
- CMS for event content (using JSON/config files for now)
- Advanced video features beyond YouTube embeds
- Performance optimization beyond lazy loading (Phase 4)
- SEO enhancements for event pages (Phase 4)
- Advanced animations beyond smooth scrolling (Phase 4)
- Image CDN integration (future enhancement)

