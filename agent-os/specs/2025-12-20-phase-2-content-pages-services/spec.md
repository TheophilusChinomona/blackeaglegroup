# Specification: Phase 2 - Content Pages & Services

## Goal
Migrate all content pages (Services, Clients, Strategic Partners, Property Services, Blog, Contact) to React components with form handling, maintaining exact visual design and implementing API abstraction for backend flexibility.

## User Stories
- As a visitor, I want to browse services and view client information so that I can understand the company's capabilities
- As a potential client, I want to submit a contact form so that I can get in touch with the company

## Specific Requirements

**Services Page Component**
- Convert `public_html/services.html` to React component
- Display all service cards in grid layout matching existing design
- Each service card includes: image, title, and description
- Services include: Hygiene and Cleaning, Security, VIP Protection, Computer Forensics, Marketing Management, State Vehicle Purchases, Fleet Management, Skills Development, Remuneration for EPWP, Building Renovation, THM Accounting, Public Relations, Customer Service Management, Spa Treatment, Events Management, Stakeholders Relations, Tshwane Open Event Management
- Maintain exact card styling and layout from original HTML
- Use Tailwind classes converted from existing CSS

**Clients Page Component**
- Convert `public_html/clients.html` to React component
- Create reusable ClientCard component for individual client entries
- Display clients in grid layout (col-md-3) matching existing design
- Each client card includes: logo/image, client name, location/description, Reference button, Call button with phone number
- Extract client data from existing HTML or create data structure (JSON/config file)
- Maintain exact button styling and layout
- Preserve background images for client cards

**Strategic Partners Page Component**
- Convert `public_html/StrategicPartners.html` to React component
- Reuse ClientCard component with same layout as Clients page
- Display strategic partners in same grid format
- Maintain visual consistency with Clients page design

**Property Services Page Component**
- Convert `public_html/property.html` to React component
- Display as single page with all property service information
- Include service descriptions, images, and overview content
- Maintain exact layout and styling from original HTML
- Preserve all content sections and formatting

**Blog Listing Page Component**
- Convert `public_html/blog.html` to React component
- Display blog posts in list/grid format
- Create blog post data structure (initially TSX files, future CMS integration)
- Include post preview with image, title, excerpt, and read more link
- Maintain exact styling from original blog page

**Blog Single Post Page Component**
- Create dynamic blog post page component
- Read blog content from TSX files or data structure
- Display full post content with title, image, body text
- Include navigation to return to blog listing
- Structure for future CMS integration
- Maintain blog post styling and layout

**Contact Page Component**
- Convert `public_html/contact.html` to React component
- Implement contact form using React Hook Form
- Include form fields: name, email, subject, message
- Add client-side validation using Yup schema
- Display contact information (address, phone, email) matching existing layout
- Include Google Maps embed matching existing configuration
- Preserve compliance information section

**Contact Form API Abstraction**
- Create `src/api/contact.js` module for form submission
- Implement abstraction layer that can switch between PHP and Node.js backends
- Use environment variable or config to determine which backend to use
- PHP endpoint: call existing `send_mail.php` endpoint
- Node.js endpoint: structure for future migration (endpoint URL configurable)
- Handle form submission, error handling, and success responses
- Abstract submission logic so only endpoint URL needs to change for backend switch

**Form Validation Implementation**
- Use React Hook Form for form state management and performance
- Implement Yup schema validation for all form fields
- Validate email format, required fields, and message length
- Display validation errors inline with form fields
- Prevent form submission until all validations pass
- Show success/error messages after submission

**PDF Download Functionality**
- Implement PDF download links for company profiles
- PDFs stored in `public/` folder: BE Profile2.pdf, BE Profile.pdf, CDP & Events Management Profile.pdf
- Use anchor tags with download attribute or direct links
- Maintain existing PDF link structure from footer and pages
- Structure for future migration to Node.js backend serving PDFs

**Reusable Components**
- Use shadcn/ui components as base where applicable:
  - Use shadcn/ui Card component for ServiceCard, ClientCard, BlogPostCard
  - Use shadcn/ui Button component (customize to match existing styles)
  - Use shadcn/ui Form components (Input, Textarea, Label) for form fields
  - Use shadcn/ui Form component wrapper (works with React Hook Form)
- Create ServiceCard component for service listings (using shadcn/ui Card)
- Create ClientCard component for clients and strategic partners (using shadcn/ui Card)
- Create BlogPostCard component for blog listing (using shadcn/ui Card)
- Customize shadcn/ui components to match exact existing button and form styles
- Maintain pixel-perfect visual consistency with original HTML

## Visual Design
No visual assets provided. Reference existing HTML files (`public_html/clients.html`, `public_html/services.html`, `public_html/contact.html`) for exact visual design and maintain pixel-perfect consistency.

## Existing Code to Leverage

**Client Showcase from `public_html/clients.html`**
- Grid layout structure with col-md-3 columns
- Client card design with image, name, location, and action buttons
- Reference and Call button styling and functionality
- Background image styling for client cards

**Service Cards from `public_html/services.html`**
- Service card layout with image, title, and description
- Grid structure for multiple service cards
- Image styling and hover effects
- Card spacing and responsive behavior

**Contact Form from `public_html/contact.html`**
- Form field structure and layout
- Form validation patterns (HTML5 validation attributes)
- Contact information display format
- Google Maps embed configuration
- Form submission handling structure

**PHP Backend from `public_html/send_mail.php`**
- Email sending logic and structure
- Form data processing (name, email, subject, message)
- Email headers and formatting
- Success/error handling patterns
- Redirect behavior after submission

**Blog Structure from `public_html/blog.html`**
- Blog post listing layout
- Post preview card design
- Image and text formatting
- Navigation patterns

## Out of Scope
- Service detail pages (listing only for now)
- CMS integration for blog (future development, using TSX files for now)
- Node.js backend implementation (future migration, structure only)
- CDN for PDFs (future migration, using public folder for now)
- Event galleries and sub-sites (Phase 3)
- Performance optimization beyond basic implementation (Phase 4)
- SEO enhancements (Phase 4)
- Advanced form features beyond basic validation

