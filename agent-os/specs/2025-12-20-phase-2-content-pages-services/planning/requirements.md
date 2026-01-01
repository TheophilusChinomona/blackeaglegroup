# Spec Requirements: Phase 2 - Content Pages & Services

## Initial Description

Migrate all content pages, implement service listings, add client showcase, and integrate contact form.

### Objectives
- Migrate all content pages
- Implement service listings
- Add client showcase
- Integrate contact form

### Deliverables
- Services page with all service cards
- Clients page with client showcase
- Strategic Partners page
- Property Services page
- Blog listing page
- Blog single post page
- Contact page with form
- Contact form backend integration (API endpoint)

### Key Features
- Service cards with images and descriptions
- Client logos and information grid
- Contact form with validation
- Form submission handling
- PDF download links

### Success Criteria
- All content pages functional
- Contact form submits successfully
- All links and downloads work
- Images and assets load correctly

## Requirements Discussion

### First Round Questions

**Q1:** Service Cards - Should each service have its own detail page, or just the listing page?
**Answer:** For now it's just the listing page

**Q2:** Client Showcase - Should it be a static array/object in a React component or config file?
**Answer:** Display client logos, names, and contact info in a grid layout matching the existing clients.html and include Reference and Call buttons for each client

**Q3:** Contact Form Backend - Should we keep the PHP backend or create a new API endpoint?
**Answer:** Keep the PHP backend for now but plan to migrate to Node.js in future updates. Make all the files and structure but use PHP until ready to migrate

**Q4:** Form Validation - Should we implement client-side only, or also server-side validation?
**Answer:** Create API structure (e.g., src/api/contact.js) that can switch between calling PHP endpoint now and Node.js endpoint later. Client-side validation with React Hook Form + Yup, abstract form submission logic so switching backends only requires changing API endpoint URL

**Q5:** Blog - Should blog posts be static markdown/HTML files, or CMS integration?
**Answer:** Static files but maybe TSX files for now, CMS for later development

**Q6:** PDF Downloads - Should PDFs be kept in public/ or served via API/CDN?
**Answer:** Keep in public/ for now but will be migrating to Node.js backend later

**Q7:** Strategic Partners - Should this have the same layout as Clients, or a different design?
**Answer:** Same layout as clients

**Q8:** Property Services - Should this be a separate section with sub-pages, or a single page?
**Answer:** Single page for now

### Existing Code to Reference

**Similar Features Identified:**
- Client showcase: `public_html/clients.html` contains the grid layout with client cards, logos, Reference and Call buttons
- Services page: `public_html/services.html` contains service cards with images and descriptions
- Contact form: `public_html/contact.html` contains the contact form structure
- PHP backend: `public_html/send_mail.php` contains the current form submission handler
- Strategic Partners: `public_html/StrategicPartners.html` for layout reference
- Property Services: `public_html/property.html` for content reference

### Follow-up Questions

**Follow-up 1:** Client Showcase Elaboration - Should it display client logos, names, and contact info in a grid layout matching clients.html with Reference and Call buttons?
**Answer:** Yes, display client logos, names, and contact info in a grid layout matching the existing clients.html and include Reference and Call buttons for each client

**Follow-up 2:** Form Validation Elaboration - Should we create API structure that can switch between PHP and Node.js endpoints?
**Answer:** Yes, create API structure (src/api/contact.js) that can switch between calling PHP endpoint now and Node.js endpoint later

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
- Reference `public_html/clients.html` for exact client showcase grid layout
- Reference `public_html/services.html` for service card layout
- Reference `public_html/contact.html` for contact form structure

## Requirements Summary

### Functional Requirements
- Create Services page with all service cards (images and descriptions)
- Create Clients page with client showcase grid layout matching existing design
- Create Strategic Partners page with same layout as Clients
- Create Property Services page (single page)
- Create Blog listing page
- Create Blog single post page (TSX files for now, CMS later)
- Create Contact page with form
- Implement contact form with React Hook Form + Yup validation
- Create API abstraction layer (src/api/contact.js) for backend switching
- Integrate with PHP backend (send_mail.php) initially
- Structure code to easily switch to Node.js backend later
- Implement PDF download links (PDFs in public/ folder)
- Maintain exact visual design from existing HTML pages

### Reusability Opportunities
- Client card component can be reused for Strategic Partners page
- Service card component can be reused across service listings
- Form components can be abstracted for future forms
- API structure allows easy backend migration

### Scope Boundaries
**In Scope:**
- All content pages (Services, Clients, Strategic Partners, Property Services, Blog, Contact)
- Service cards with images and descriptions
- Client showcase grid with logos, names, contact info, Reference and Call buttons
- Contact form with client-side validation
- API abstraction layer for backend switching
- PHP backend integration (current)
- PDF download functionality
- Blog listing and single post pages (TSX files)

**Out of Scope:**
- Service detail pages (listing only for now)
- CMS integration for blog (future development)
- Node.js backend implementation (future migration)
- CDN for PDFs (future migration)
- Event galleries - Phase 3
- Performance optimization - Phase 4

### Technical Considerations
- Form handling: React Hook Form for performance
- Validation: Yup schema validation
- API structure: Abstracted in src/api/contact.js for easy backend switching
- Backend: PHP (send_mail.php) initially, structured for Node.js migration
- Blog: TSX files for now, CMS integration planned for later
- PDFs: Stored in public/ folder, migration to Node.js backend later
- Layout: Match existing HTML layouts exactly (clients.html, services.html, etc.)
- Reference point: `public_html/` folder for all existing page designs

