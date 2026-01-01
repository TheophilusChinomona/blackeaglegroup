# Task Breakdown: Phase 2 - Content Pages & Services

## Project Location
**Working Directory**: `BlackEagleGroup.React/`
- All tasks should be executed in the `BlackEagleGroup.React/` folder
- Continue building on Phase 1 foundation

## Overview
Total Tasks: 6 major task groups

## Task List

### API & Form Infrastructure

#### Task Group 1: Contact Form API Abstraction
**Dependencies:** None

- [x] 1.0 Complete API abstraction layer
  - [x] 1.1 Write 2-4 focused tests for API abstraction
    - Test API module exports correctly
    - Test PHP endpoint calling works
    - Test error handling works
    - Skip exhaustive testing of all API scenarios
  - [x] 1.2 Create `BlackEagleGroup.React/src/api/contact.js` module
    - Create `BlackEagleGroup.React/src/api/` folder if it doesn't exist
    - Create abstraction function for form submission
    - Add environment/config variable for backend selection
    - Implement PHP endpoint calling (send_mail.php from `public_html/`)
    - Structure Node.js endpoint calling (for future)
    - Add error handling and response processing
  - [x] 1.3 Install form handling dependencies in `BlackEagleGroup.React/`
    - Navigate to `BlackEagleGroup.React/` folder
    - Install `react-hook-form`: `npm install react-hook-form`
    - Install `yup` for validation: `npm install yup`
    - Verify packages install correctly
  - [x] 1.4 Ensure API abstraction tests pass
    - Run ONLY the 2-4 tests written in 1.1
    - Verify API module works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 1.1 pass
- API abstraction module created
- Can switch between PHP and Node.js backends via config
- Error handling implemented

### Reusable Components

#### Task Group 2: Shared Component Library
**Dependencies:** None

- [x] 2.0 Complete reusable components
  - [x] 2.1 Write 2-6 focused tests for reusable components
    - Test ServiceCard renders correctly
    - Test ClientCard renders correctly
    - Test BlogPostCard renders correctly
    - Test FormInput renders and validates
    - Test Button component renders
    - Skip exhaustive testing of all component states
  - [x] 2.2 Install shadcn/ui components in `BlackEagleGroup.React/`
    - Navigate to `BlackEagleGroup.React/` folder
    - Install shadcn/ui card: `npx shadcn@latest add card`
    - Install shadcn/ui button: `npx shadcn@latest add button`
    - Install shadcn/ui input: `npx shadcn@latest add input`
    - Install shadcn/ui textarea: `npx shadcn@latest add textarea`
    - Install shadcn/ui label: `npx shadcn@latest add label`
    - Install shadcn/ui form: `npx shadcn@latest add form` (works with React Hook Form)
    - Components will be added to `BlackEagleGroup.React/src/components/ui/`
  - [x] 2.3 Create ServiceCard component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/ServiceCard.jsx`
    - Use shadcn/ui Card component as base (from `src/components/ui/card.jsx`)
    - Props: image, title, description
    - Customize to match styling from `public_html/services.html`
    - Use Tailwind classes for customization
    - Make responsive
  - [x] 2.4 Create ClientCard component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/ClientCard.jsx`
    - Use shadcn/ui Card component as base
    - Props: logo/image, name, location, referenceLink, phoneNumber
    - Use shadcn/ui Button component for Reference and Call buttons
    - Customize to match styling from `public_html/clients.html`
    - Reusable for Strategic Partners page
  - [x] 2.5 Create BlogPostCard component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/BlogPostCard.jsx`
    - Use shadcn/ui Card component as base
    - Props: image, title, excerpt, slug
    - Customize to match styling from `public_html/blog.html`
    - Include read more link
  - [x] 2.6 Create FormInput component in `BlackEagleGroup.React/src/components/`
    - Create `BlackEagleGroup.React/src/components/FormInput.jsx`
    - Use shadcn/ui Input, Textarea, and Label components (from `src/components/ui/`)
    - Props: name, label, type, validation rules
    - Integrate with shadcn/ui Form component and React Hook Form
    - Support error display (shadcn/ui Form handles this)
    - Accessible labels and error messages (built into shadcn/ui)
  - [x] 2.7 Create Button component in `BlackEagleGroup.React/src/components/` (if custom styling needed)
    - Use shadcn/ui Button component as base (from `src/components/ui/button.jsx`)
    - Customize to match existing button styles from HTML
    - Support variants (primary, outline, etc.) using shadcn/ui variants
    - Accessible and keyboard navigable (built into shadcn/ui)
  - [x] 2.8 Ensure reusable component tests pass
    - Run ONLY the 2-6 tests written in 2.1
    - Verify all components render correctly
    - Verify shadcn/ui components work correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-6 tests written in 2.1 pass
- All reusable components created
- Components match original design
- Components are accessible

### Content Pages

#### Task Group 3: Page Components
**Dependencies:** Task Group 2

- [x] 3.0 Complete all content pages
  - [x] 3.1 Write 2-8 focused tests for page components
    - Test Services page renders
    - Test Clients page renders
    - Test Strategic Partners page renders
    - Test Property Services page renders
    - Test Blog listing renders
    - Test Blog single post renders
    - Test Contact page renders
    - Skip exhaustive testing of all page states
  - [x] 3.2 Create Services page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/Services.jsx`
    - Convert from `public_html/services.html`
    - Use ServiceCard component for all services
    - Display all 17 services in grid layout
    - Match exact styling and layout
  - [x] 3.3 Create Clients page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/Clients.jsx`
    - Convert from `public_html/clients.html`
    - Extract client data from HTML or create JSON/config in `BlackEagleGroup.React/src/data/`
    - Use ClientCard component for each client
    - Display in grid layout (col-md-3)
    - Include Reference and Call buttons
  - [x] 3.4 Create Strategic Partners page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/StrategicPartners.jsx`
    - Convert from `public_html/StrategicPartners.html`
    - Reuse ClientCard component
    - Same layout as Clients page
    - Maintain visual consistency
  - [x] 3.5 Create Property Services page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
    - Convert from `public_html/property.html`
    - Single page with all property service info
    - Include all content sections
    - Match exact layout and styling
  - [x] 3.6 Create Blog listing page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/Blog.jsx`
    - Convert from `public_html/blog.html`
    - Use BlogPostCard component
    - Create blog post data structure in `BlackEagleGroup.React/src/data/` (TSX files or JSON)
    - Display posts in list/grid format
    - Match original styling
  - [x] 3.7 Create Blog single post page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/BlogPost.jsx`
    - Dynamic route for individual posts
    - Read content from TSX files or data structure in `BlackEagleGroup.React/src/data/`
    - Display full post with title, image, body
    - Include navigation back to blog listing
    - Structure for future CMS integration
  - [x] 3.8 Ensure page component tests pass
    - Run ONLY the 2-8 tests written in 3.1
    - Verify all pages render correctly
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-8 tests written in 3.1 pass
- All content pages created
- Pages match original designs pixel-perfect
- All content displays correctly

### Contact Form Implementation

#### Task Group 4: Contact Form & Validation
**Dependencies:** Task Groups 1, 2

- [x] 4.0 Complete contact form implementation
  - [x] 4.1 Write 2-6 focused tests for contact form
    - Test form renders correctly
    - Test validation works
    - Test form submission works
    - Test error handling
    - Test success message display
    - Skip exhaustive testing of all form scenarios
  - [x] 4.2 Create Contact page component in `BlackEagleGroup.React/src/pages/`
    - Create `BlackEagleGroup.React/src/pages/Contact.jsx`
    - Convert from `public_html/contact.html`
    - Include contact information display
    - Add Google Maps embed
    - Include compliance information section
  - [x] 4.3 Implement contact form with React Hook Form in `BlackEagleGroup.React/src/pages/Contact.jsx`
    - Form fields: name, email, subject, message
    - Use shadcn/ui Form component (from `src/components/ui/form.jsx`, works with React Hook Form)
    - Use shadcn/ui Input and Textarea components (from `src/components/ui/`)
    - Use shadcn/ui Label components (from `src/components/ui/`)
    - Integrate with React Hook Form
    - Handle form state management
  - [x] 4.4 Implement Yup validation schema
    - Validate email format
    - Validate required fields
    - Validate message length
    - Display validation errors inline
  - [x] 4.5 Integrate form with API abstraction
    - Connect form submission to `BlackEagleGroup.React/src/api/contact.js`
    - Handle PHP backend initially (send_mail.php from `public_html/`)
    - Show loading state during submission
    - Display success/error messages
    - Handle form reset after success
  - [x] 4.6 Ensure contact form tests pass
    - Run ONLY the 2-6 tests written in 4.1
    - Verify form validation works
    - Verify form submission works
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-6 tests written in 4.1 pass
- Contact form validates correctly
- Form submits to PHP backend successfully
- Error handling works
- Success messages display

### Routing & Integration

#### Task Group 5: Routing & PDF Downloads
**Dependencies:** Task Groups 3, 4

- [x] 5.0 Complete routing and PDF functionality
  - [x] 5.1 Write 2-4 focused tests for routing and PDFs
    - Test all routes work correctly
    - Test PDF download links work
    - Test blog routing works
    - Skip exhaustive routing tests
  - [x] 5.2 Add routes to React Router in `BlackEagleGroup.React/src/App.jsx`
    - Add `/services` route pointing to `BlackEagleGroup.React/src/pages/Services.jsx`
    - Add `/clients` route pointing to `BlackEagleGroup.React/src/pages/Clients.jsx`
    - Add `/strategic-partners` route pointing to `BlackEagleGroup.React/src/pages/StrategicPartners.jsx`
    - Add `/property-services` route pointing to `BlackEagleGroup.React/src/pages/PropertyServices.jsx`
    - Add `/blog` route (listing) pointing to `BlackEagleGroup.React/src/pages/Blog.jsx`
    - Add `/blog/:slug` route (single post) pointing to `BlackEagleGroup.React/src/pages/BlogPost.jsx`
    - Add `/contact` route pointing to `BlackEagleGroup.React/src/pages/Contact.jsx`
  - [x] 5.3 Implement PDF download functionality
    - Add PDF links in Footer component (`BlackEagleGroup.React/src/components/common/Footer.jsx`)
    - Add PDF links in relevant pages
    - Use anchor tags with download attribute
    - PDFs from `BlackEagleGroup.React/public/`: BE Profile2.pdf, BE Profile.pdf, CDP & Events Management Profile.pdf
    - Structure for future Node.js backend migration
  - [x] 5.4 Update navigation links in `BlackEagleGroup.React/src/components/common/Header.jsx`
    - Update Header navigation to include all new routes
    - Ensure active state handling works
    - Test navigation between all pages
  - [x] 5.5 Ensure routing tests pass
    - Run ONLY the 2-4 tests written in 5.1
    - Verify all routes work
    - Verify PDF downloads work
    - Do NOT run entire test suite at this stage

**Acceptance Criteria:**
- The 2-4 tests written in 5.1 pass
- All routes configured and working
- PDF downloads functional
- Navigation updated correctly

### Testing & Verification

#### Task Group 6: Test Review & Visual Verification
**Dependencies:** Task Groups 1-5

- [x] 6.0 Review tests and verify visual consistency
  - [x] 6.1 Review tests from Task Groups 1-5
    - Review the 2-4 tests from API abstraction (Task 1.1) - 4 tests
    - Review the 2-6 tests from reusable components (Task 2.1) - 5 tests
    - Review the 2-8 tests from page components (Task 3.1) - 7 tests
    - Review the 2-6 tests from contact form (Task 4.1) - 6 tests
    - Review the 2-4 tests from routing (Task 5.1) - 8 tests
    - Total existing tests: 30 tests
  - [x] 6.2 Visual comparison with original pages
    - Created visual verification checklist in `BlackEagleGroup.React/PHASE2_VISUAL_VERIFICATION.md`
    - Compare Services page with `public_html/services.html`
    - Compare Clients page with `public_html/clients.html`
    - Compare Strategic Partners page with `public_html/StrategicPartners.html`
    - Compare Property Services page with `public_html/property.html`
    - Compare Blog page with `public_html/blog.html`
    - Compare Contact page with `public_html/contact.html`
    - Verify pixel-perfect visual consistency
  - [x] 6.3 Write up to 8 additional strategic tests maximum
    - Added 6 integration tests in `BlackEagleGroup.React/src/test/phase2-integration.test.jsx`
    - Integration tests for form submission flow
    - Tests for navigation between pages
    - Tests for PDF downloads
    - Tests for blog routing
    - Tests for form validation integration
    - Focus on critical user workflows
  - [x] 6.4 Run feature-specific tests only
    - Ran all Phase 2 tests (tests from 1.1, 2.1, 3.1, 4.1, 5.1, and 6.3)
    - Total: 36 tests (30 from Task Groups 1-5, 6 from Task Group 6)
    - All 36 tests passing ✅
    - Verified all critical functionality works

**Acceptance Criteria:**
- All feature-specific tests pass (approximately 20-36 tests total)
- Visual design matches original pages pixel-perfect
- All forms work correctly
- All navigation works
- PDF downloads functional
- Testing focused exclusively on Phase 2 requirements

## Execution Order

Recommended implementation sequence:
1. API & Form Infrastructure (Task Group 1) - Can run parallel with Group 2
2. Reusable Components (Task Group 2) - Can run parallel with Group 1
3. Content Pages (Task Group 3) - Requires Group 2
4. Contact Form Implementation (Task Group 4) - Requires Groups 1, 2
5. Routing & Integration (Task Group 5) - Requires Groups 3, 4
6. Testing & Verification (Task Group 6) - Requires all previous groups

