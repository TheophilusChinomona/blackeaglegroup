# Black Eagle Group Holdings Pty Ltd - Website Documentation

*Last Updated: 2025-01-30*

---

## Project Overview

Black Eagle Group Holdings Pty Ltd is a corporate services company specializing in stakeholder relations management, golf events management, sponsorship management, and property services. The website serves as the primary digital presence for the company, showcasing services, client portfolios, strategic partnerships, and event management capabilities.

The website is a **static HTML website** built with Bootstrap framework, featuring multiple sub-sites for specific events and projects. It includes a PHP-based contact form handler for lead generation and customer inquiries.

**Company Information:**
- **Company:** Black Eagle Group Holdings Pty Ltd
- **Founder:** Mr. Mandla Mndawe
- **Location:** No. 640 Wainright Street Moreleta, Moreleta Park, Pretoria, 0002, South Africa
- **Contact:** info@blackeaglegroup.co.za | 0128835609 | 0826249680
- **Website:** https://blackeaglegroup.co.za

**Core Services:**
1. Stakeholder Relations Management
2. Golf Events Management
3. Sponsorship Management
4. Post-Event Management
5. Property Services

## Career Goals & Learning Objectives

*[Section for user to fill in later]*

## Tech Stack

### Frontend
- **HTML5** - Static page structure
- **CSS3** - Styling and responsive design
- **Bootstrap 4** - Responsive framework and grid system
- **JavaScript (jQuery)** - Interactive functionality and animations
- **Google Fonts (Poppins)** - Typography

### Backend/Server
- **PHP 7+** - Contact form processing
- **Apache/Nginx** - Web server (assumed)

### JavaScript Libraries
- **jQuery 3.2.1** - DOM manipulation and AJAX
- **Bootstrap JS** - UI components (modals, dropdowns, carousel)
- **AOS (Animate On Scroll)** - Scroll animations
- **Owl Carousel** - Image/content carousels
- **Magnific Popup** - Lightbox and popup modals
- **jQuery Waypoints** - Scroll-triggered animations
- **jQuery Stellar** - Parallax scrolling effects
- **Bootstrap Datepicker** - Date selection
- **jQuery Timepicker** - Time selection
- **Google Maps API** - Location mapping

### CSS Libraries
- **Animate.css** - CSS animations
- **AOS CSS** - Scroll animation styles
- **Flaticon** - Icon fonts
- **Icomoon** - Icon fonts
- **Ionicons** - Icon fonts
- **Open Iconic Bootstrap** - Bootstrap icon set

### External Integrations
- **Google Maps API** - Embedded maps for office location
- **YouTube** - Video embeds (company introduction video)
- **Social Media** - LinkedIn, Facebook, Instagram links

## Architecture Overview

### Project Structure
```
public_html/
├── index.html                 # Homepage
├── about.html                 # About page
├── services.html              # Services overview
├── property.html              # Property services
├── clients.html               # Client portfolio
├── StrategicPartners.html     # Strategic partners
├── blog.html                  # Blog listing
├── blog-single.html           # Blog post detail
├── contact.html               # Contact form
├── contact2.html              # Contact confirmation
├── pricing.html               # Pricing information
├── car.html                   # [Template page]
├── car-single.html            # [Template page]
├── send_mail.php              # Contact form handler
├── css/                       # Stylesheets
│   ├── style.css              # Main stylesheet
│   ├── bootstrap.min.css      # Bootstrap framework
│   ├── animate.css            # Animation library
│   ├── aos.css                # Scroll animations
│   └── [other CSS libraries]
├── js/                        # JavaScript files
│   ├── main.js                # Main application logic
│   ├── jquery.min.js          # jQuery library
│   ├── bootstrap.min.js       # Bootstrap JS
│   └── [other JS libraries]
├── images/                    # Image assets
├── fonts/                     # Web fonts
├── cassi/                     # Golf events sub-site
│   ├── GolfDay.html           # Main golf day page
│   ├── gallery.html           # Event gallery
│   └── [event-specific pages]
├── COT/                       # Consultancy template sub-site
│   ├── index.html
│   └── [template pages]
├── csir/                      # CSIR event sub-site
│   ├── csir.html
│   └── [event pages]
└── iLGM/                      # iLGM event sub-site
    ├── index.html
    └── [event pages]
```

### Design Patterns Identified
- **Static Site Architecture** - Pre-rendered HTML pages
- **Template Reuse** - Shared navigation and footer components
- **Progressive Enhancement** - JavaScript enhances but doesn't require
- **Responsive Design** - Mobile-first Bootstrap approach
- **Component-Based CSS** - Modular stylesheet organization

### Layer Separation
- **Presentation Layer:** HTML templates with embedded CSS/JS
- **Styling Layer:** External CSS files organized by functionality
- **Behavior Layer:** JavaScript files for interactivity
- **Server Layer:** PHP script for form processing

## Functional Requirements

### Core Features

1. **Company Information Display**
   - Homepage with company overview
   - About page with company history and values
   - Services page detailing offerings
   - Property services dedicated page

2. **Client & Partner Showcase**
   - Clients page displaying portfolio
   - Strategic partners page
   - Testimonials and case studies

3. **Event Management**
   - Golf events sub-sites (cassi, COT, csir, iLGM)
   - Event galleries
   - Event-specific information pages

4. **Content Management**
   - Blog listing page
   - Blog post detail pages
   - News and updates

5. **Contact & Lead Generation**
   - Contact form with validation
   - PHP email handler
   - Contact confirmation page
   - Embedded Google Maps

6. **Social Media Integration**
   - Social media links (LinkedIn, Facebook, Instagram)
   - Social sharing capabilities

### User Roles
- **Public Visitors** - Browse content, view services, submit contact forms
- **No authentication system** - Static public website

## Non-Functional Requirements

### Security Implemented
- **Input Sanitization** - PHP form handler processes POST data
- **Email Headers** - Proper email headers in PHP mail function
- **HTTPS Ready** - Static content can be served over HTTPS
- **No SQL Injection Risk** - No database connections

### Performance Considerations
- **Static Assets** - Pre-compiled CSS/JS for fast loading
- **Image Optimization** - Image assets in dedicated folder
- **CDN Ready** - External libraries can be served from CDN
- **Minified Libraries** - Production-ready minified JS/CSS

### Accessibility
- **Semantic HTML** - Proper HTML5 semantic elements
- **Alt Text** - Image alt attributes present
- **ARIA Labels** - Navigation accessibility attributes
- **Responsive Design** - Mobile-friendly layouts

### Browser Compatibility
- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **IE11 Support** - jQuery 3.2.1 supports IE11+
- **Mobile Responsive** - Bootstrap ensures mobile compatibility

## API Endpoints

### Contact Form Handler

#### POST /send_mail.php

**Purpose:** Process contact form submissions and send email notifications

**Parameters (POST):**
- `name` (string, required) - Contact name
- `email` (string, required) - Contact email address
- `cell` (string, optional) - Contact phone number
- `subject` (string, required) - Email subject
- `message` (string, required) - Contact message

**Request Body:**
```
POST /send_mail.php
Content-Type: application/x-www-form-urlencoded

name=John+Doe&email=john@example.com&cell=1234567890&subject=Inquiry&message=Hello
```

**Response:**
- **302 Redirect** - Always redirects to `contact2.html`
  - Success: Redirects to confirmation page
  - Failure: Also redirects to confirmation page (no error differentiation)

**Business Logic:**
1. Receives POST data from contact form
2. Formats email body as HTML table
3. Sets email headers (MIME, charset, from, reply-to)
4. Sends email to `info@blackeaglegroup.co.za`
5. Redirects to confirmation page

**Email Configuration:**
- **To:** info@blackeaglegroup.co.za
- **From:** noreply@mandla@blackeaglegroup.co.za
- **Reply-To:** User's email address
- **Format:** HTML email with table layout

**Error Handling:**
- No explicit error messages to user
- Always redirects to confirmation page regardless of success/failure
- Server-side error logging (error_log file present)

**Security Notes:**
- No input validation visible in code
- No CSRF protection
- Direct email injection possible (needs sanitization)
- Email address in From header has syntax error (double @)

**Related Code:**
- [send_mail.php](public_html/send_mail.php) - Form handler implementation
- [contact.html](public_html/contact.html) - Contact form UI

## Services

### Contact Form Service

**Purpose:** Handle contact form submissions and email delivery

**Type:** Server-side PHP script

**Key Operations:**
1. **Form Processing** - Receives and formats contact form data
2. **Email Generation** - Creates HTML email with form data
3. **Email Delivery** - Sends email via PHP mail() function
4. **User Redirect** - Redirects user to confirmation page

**Dependencies:**
- PHP mail() function
- Server email configuration
- Contact form HTML (contact.html)

**Used By:**
- Contact form on contact.html page

**State Management:**
- Stateless - processes single request
- No session management

**Error Handling:**
- Silent failure - always redirects regardless of outcome
- No user-facing error messages
- Server errors logged to error_log

**Limitations:**
- No input validation
- No spam protection
- No email delivery confirmation
- Email syntax error in From header

## Data Models

### Contact Form Data

**Structure:**
```javascript
{
  name: string,      // Contact's full name
  email: string,     // Contact's email address
  cell: string,      // Contact's phone number (optional)
  subject: string,   // Email subject line
  message: string    // Contact message content
}
```

**Validation:**
- Currently no client-side or server-side validation
- All fields sent as-is to PHP handler

**Storage:**
- No database storage
- Data only sent via email
- No data persistence

## File Explanations

### public_html/index.html

**Purpose:** Main homepage of the website

**Layer:** Presentation

**Key Responsibilities:**
- Display company welcome message
- Showcase main services (4 service cards)
- Link to YouTube introduction video
- Display featured events (COT and CSIR golf days)
- Provide navigation to all site sections

**Important Sections:**
- Hero section with company name and video link
- Services overview section
- "Why Choose Us" section
- Footer with company information and social links

**Dependencies:**
- CSS: style.css, bootstrap.min.css, animate.css, aos.css
- JS: jQuery, Bootstrap, AOS, main.js
- Images: Website logo, service icons, background images

**Related Files:**
- [about.html](public_html/about.html) - Detailed company information
- [services.html](public_html/services.html) - Full services listing
- [css/style.css](public_html/css/style.css) - Main stylesheet

**Notes:**
- Uses parallax background effects (jQuery Stellar)
- Responsive navigation with mobile menu
- Embedded Google Maps in footer

---

### public_html/about.html

**Purpose:** Detailed company information and history page

**Layer:** Presentation

**Key Responsibilities:**
- Display company background and mission
- Show company values and dedication
- Provide founder information
- Link to company profile PDFs

**Important Sections:**
- Company history and background
- Founder information (Mr. Mandla Mndawe)
- Company values and dedication
- Service highlights

**Dependencies:**
- Same CSS/JS dependencies as index.html
- PDF files: BE Profile.pdf, BE Profile2.pdf, CDP & Events Management Profile.pdf

**Related Files:**
- [index.html](public_html/index.html) - Homepage
- [services.html](public_html/services.html) - Services details

---

### public_html/services.html

**Purpose:** Detailed services information page

**Layer:** Presentation

**Key Responsibilities:**
- Display comprehensive service offerings
- Show service details and benefits
- Provide service-specific information

**Important Sections:**
- Service listings with descriptions
- Service benefits and features
- Call-to-action sections

**Dependencies:**
- Standard site CSS/JS libraries
- Service-related images

**Related Files:**
- [index.html](public_html/index.html) - Homepage with service overview
- [property.html](public_html/property.html) - Property services page

---

### public_html/property.html

**Purpose:** Property services dedicated page

**Layer:** Presentation

**Key Responsibilities:**
- Showcase property management services
- Display property-related information
- Provide property service details

**Dependencies:**
- Standard site CSS/JS libraries
- Property-related images

**Related Files:**
- [services.html](public_html/services.html) - General services page
- [index.html](public_html/index.html) - Homepage

---

### public_html/clients.html

**Purpose:** Client portfolio and testimonials page

**Layer:** Presentation

**Key Responsibilities:**
- Display client logos and portfolio
- Showcase client testimonials
- Demonstrate company track record

**Important Sections:**
- Client logo gallery
- Testimonials section
- Case studies (if applicable)

**Dependencies:**
- Standard site CSS/JS libraries
- Client logos and images
- Owl Carousel for client showcase

**Related Files:**
- [StrategicPartners.html](public_html/StrategicPartners.html) - Partners page

---

### public_html/StrategicPartners.html

**Purpose:** Strategic partners showcase page

**Layer:** Presentation

**Key Responsibilities:**
- Display strategic partner information
- Showcase partnership details
- Highlight collaborative relationships

**Dependencies:**
- Standard site CSS/JS libraries
- Partner logos and information

**Related Files:**
- [clients.html](public_html/clients.html) - Clients page

---

### public_html/blog.html

**Purpose:** Blog listing page

**Layer:** Presentation

**Key Responsibilities:**
- Display blog post listings
- Show blog post previews
- Link to individual blog posts

**Dependencies:**
- Standard site CSS/JS libraries
- Blog post images and content

**Related Files:**
- [blog-single.html](public_html/blog-single.html) - Individual blog post page

---

### public_html/blog-single.html

**Purpose:** Individual blog post detail page

**Layer:** Presentation

**Key Responsibilities:**
- Display full blog post content
- Show blog post metadata
- Provide navigation to other posts

**Dependencies:**
- Standard site CSS/JS libraries
- Blog post content and images

**Related Files:**
- [blog.html](public_html/blog.html) - Blog listing page

---

### public_html/contact.html

**Purpose:** Contact form and company contact information page

**Layer:** Presentation

**Key Responsibilities:**
- Display contact form
- Show company contact details
- Provide office location map
- Submit contact inquiries

**Important Sections:**
- Contact form (name, email, cell, subject, message)
- Company address and phone numbers
- Embedded Google Maps
- Office directions

**Form Fields:**
- Name (text input)
- Email (email input)
- Cell/Phone (tel input)
- Subject (text input)
- Message (textarea)

**Dependencies:**
- Standard site CSS/JS libraries
- Google Maps API
- [send_mail.php](public_html/send_mail.php) - Form handler

**Related Files:**
- [send_mail.php](public_html/send_mail.php) - Form processing
- [contact2.html](public_html/contact2.html) - Confirmation page

**Notes:**
- Form submits to send_mail.php via POST
- No client-side validation visible
- Google Maps embedded for office location

---

### public_html/contact2.html

**Purpose:** Contact form submission confirmation page

**Layer:** Presentation

**Key Responsibilities:**
- Confirm form submission to user
- Provide next steps information
- Allow return to main site

**Dependencies:**
- Standard site CSS/JS libraries

**Related Files:**
- [contact.html](public_html/contact.html) - Contact form
- [send_mail.php](public_html/send_mail.php) - Form handler redirects here

---

### public_html/send_mail.php

**Purpose:** Process contact form submissions and send email notifications

**Layer:** Server/Backend

**Key Responsibilities:**
- Receive POST data from contact form
- Format email message as HTML
- Send email to company address
- Redirect user to confirmation page

**Important Methods:**
- `mail()` - PHP function to send email
- `header()` - Redirect to confirmation page

**Dependencies:**
- PHP mail() function
- Server email configuration
- Contact form POST data

**Used By:**
- Contact form on contact.html

**Related Files:**
- [contact.html](public_html/contact.html) - Form source
- [contact2.html](public_html/contact2.html) - Redirect destination

**Notes:**
- No input validation or sanitization
- Email From header has syntax error (double @)
- Always redirects regardless of success/failure
- No error feedback to user
- HTML email format with table layout

**Security Concerns:**
- No input sanitization
- No CSRF protection
- Potential email header injection
- No spam protection

---

### public_html/js/main.js

**Purpose:** Main JavaScript file for site interactivity and animations

**Layer:** Behavior

**Key Responsibilities:**
- Initialize AOS (Animate On Scroll)
- Configure jQuery Stellar for parallax
- Set up mobile detection
- Initialize carousels (Owl Carousel)
- Handle navigation interactions
- Manage scroll animations
- Configure full-height sections

**Important Functions:**
- `AOS.init()` - Initialize scroll animations
- `$(window).stellar()` - Configure parallax scrolling
- `isMobile.any()` - Mobile device detection
- `carousel()` - Initialize Owl Carousel
- `fullHeight()` - Set full-height sections
- `loader()` - Page loader functionality

**Dependencies:**
- jQuery 3.2.1+
- AOS library
- jQuery Stellar
- Owl Carousel
- Scrollax

**Used By:**
- All HTML pages (included in footer)

**Related Files:**
- [css/style.css](public_html/css/style.css) - Complementary styles
- [js/aos.js](public_html/js/aos.js) - AOS library

**Notes:**
- Mobile-responsive navigation handling
- Parallax effects for hero sections
- Smooth scroll animations
- Carousel configuration for testimonials

---

### public_html/css/style.css

**Purpose:** Main stylesheet for the website

**Layer:** Presentation

**Key Responsibilities:**
- Define site-wide styles
- Customize Bootstrap components
- Style navigation and footer
- Define responsive breakpoints
- Style service cards and sections

**Dependencies:**
- Bootstrap 4 (base styles)
- Custom fonts (Poppins from Google Fonts)
- Icon fonts (Flaticon, Icomoon, Ionicons)

**Used By:**
- All HTML pages

**Related Files:**
- [css/bootstrap.min.css](public_html/css/bootstrap.min.css) - Bootstrap base
- [index.html](public_html/index.html) - Main page using styles

**Notes:**
- Custom color scheme
- Responsive design patterns
- Custom component styling

---

### public_html/cassi/GolfDay.html

**Purpose:** Golf events sub-site main page

**Layer:** Presentation

**Key Responsibilities:**
- Display golf event information
- Showcase event details
- Link to event galleries
- Provide event-specific navigation

**Dependencies:**
- Sub-site specific CSS/JS
- Event images and content

**Related Files:**
- [cassi/gallery.html](public_html/cassi/gallery.html) - Event gallery
- [index.html](public_html/index.html) - Main site homepage

**Notes:**
- Separate sub-site with own navigation
- Event-specific branding and content

---

### public_html/COT/index.html

**Purpose:** COT (Consultancy Template) event sub-site

**Layer:** Presentation

**Key Responsibilities:**
- Display COT event information
- Showcase event packages
- Provide event registration details

**Dependencies:**
- COT-specific template CSS/JS
- Event images and content

**Related Files:**
- [index.html](public_html/index.html) - Main site homepage

**Notes:**
- Uses separate template design
- Event-specific sub-site

---

### public_html/csir/csir.html

**Purpose:** CSIR event sub-site main page

**Layer:** Presentation

**Key Responsibilities:**
- Display CSIR event information
- Showcase CSIR event details
- Provide event-specific content

**Dependencies:**
- CSIR-specific CSS/JS
- Event images and content

**Related Files:**
- [index.html](public_html/index.html) - Main site homepage

---

### public_html/iLGM/index.html

**Purpose:** iLGM event sub-site main page

**Layer:** Presentation

**Key Responsibilities:**
- Display iLGM event information
- Showcase event packages
- Provide event registration

**Dependencies:**
- iLGM-specific CSS/JS
- Event images and content

**Related Files:**
- [index.html](public_html/index.html) - Main site homepage

---

## Configuration

### Required Server Configuration

**PHP Settings:**
- PHP 7.0+ required
- `mail()` function enabled
- Error logging enabled (error_log file present)

**Email Configuration:**
- SMTP server configured for PHP mail()
- Email address: info@blackeaglegroup.co.za
- From address: noreply@mandla@blackeaglegroup.co.za (needs fixing)

**Web Server:**
- Apache or Nginx
- Document root: public_html/
- PHP processing enabled
- .htaccess support (if Apache)

### Environment Variables

**Not Required:**
- Static HTML site - no environment variables needed
- PHP script uses hardcoded email addresses

**Google Maps API:**
- API key embedded in HTML: `AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s`
- Should be moved to environment variable for security

### File Permissions

**Required:**
- PHP files: 644 (readable, executable)
- HTML files: 644 (readable)
- CSS/JS files: 644 (readable)
- Images: 644 (readable)
- error_log: 666 (writable for logging)

## Installation & Setup

### Prerequisites
- Web server (Apache or Nginx)
- PHP 7.0 or higher
- PHP mail() function enabled
- Domain name configured
- SSL certificate (recommended for HTTPS)

### Deployment Steps

1. **Upload Files:**
   ```bash
   # Upload all files to web server
   # Document root should be public_html/
   ```

2. **Configure Web Server:**
   ```apache
   # Apache .htaccess example
   DirectoryIndex index.html
   ```

3. **Configure PHP:**
   ```php
   # Ensure PHP mail() is configured
   # Check php.ini for mail settings
   ```

4. **Set Permissions:**
   ```bash
   chmod 644 *.html *.css *.js
   chmod 644 send_mail.php
   chmod 666 error_log
   ```

5. **Test Contact Form:**
   - Submit test form
   - Check email delivery
   - Verify redirect to contact2.html

6. **Configure Google Maps:**
   - Update API key if needed
   - Verify map displays correctly

### Local Development

**Option 1: PHP Built-in Server:**
```bash
cd public_html
php -S localhost:8000
```

**Option 2: XAMPP/WAMP:**
- Place files in htdocs/public_html/
- Access via http://localhost/public_html/

**Option 3: Docker:**
```dockerfile
FROM php:7.4-apache
COPY public_html/ /var/www/html/
```

## Packages Used

### JavaScript Libraries (CDN/Local)

**jQuery:**
- `jquery.min.js` - Version 3.2.1
- `jquery-migrate-3.0.1.min.js` - Migration helper

**Bootstrap:**
- `bootstrap.min.js` - Version 4.x
- `popper.min.js` - Bootstrap dependency

**Animation Libraries:**
- `aos.js` - Animate On Scroll
- `animate.css` - CSS animations

**UI Libraries:**
- `owl.carousel.min.js` - Carousel component
- `jquery.magnific-popup.min.js` - Lightbox/popup
- `jquery.stellar.min.js` - Parallax effects
- `jquery.waypoints.min.js` - Scroll triggers
- `jquery.animateNumber.min.js` - Number animations

**Form Libraries:**
- `bootstrap-datepicker.js` - Date picker
- `jquery.timepicker.min.js` - Time picker

**Utilities:**
- `scrollax.min.js` - Scroll effects
- `google-map.js` - Google Maps integration

### CSS Libraries

**Framework:**
- `bootstrap.min.css` - Bootstrap 4.x
- `bootstrap-grid.css` - Grid system
- `bootstrap-reboot.css` - Reset styles

**Animation:**
- `animate.css` - Animation library
- `aos.css` - Scroll animations

**Icons:**
- `flaticon.css` - Flaticon icons
- `icomoon.css` - Icomoon icons
- `ionicons.min.css` - Ionicons
- `open-iconic-bootstrap.min.css` - Open Iconic

**UI Components:**
- `owl.carousel.min.css` - Carousel styles
- `owl.theme.default.min.css` - Carousel theme
- `magnific-popup.css` - Popup styles
- `bootstrap-datepicker.css` - Date picker styles
- `jquery.timepicker.css` - Time picker styles

### External Services

**Google Services:**
- Google Fonts (Poppins)
- Google Maps API

**Social Media:**
- LinkedIn integration
- Facebook integration
- Instagram integration

**Video:**
- YouTube embeds

## Integration Points

### Google Maps API

**Purpose:** Display office location on contact page

**Implementation:**
- Embedded iframe in footer
- API key: `AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s`
- Location: Moreleta Park, Pretoria

**Usage:**
- Contact page footer
- Office directions section

**Security Note:**
- API key is exposed in HTML
- Should be restricted by domain in Google Cloud Console
- Consider moving to server-side proxy

### Email Service

**Purpose:** Send contact form submissions via email

**Implementation:**
- PHP mail() function
- Server-side email delivery
- HTML email format

**Configuration:**
- To: info@blackeaglegroup.co.za
- From: noreply@mandla@blackeaglegroup.co.za (has syntax error)

**Limitations:**
- No delivery confirmation
- No spam protection
- No email queue
- Relies on server mail configuration

### YouTube Integration

**Purpose:** Embed company introduction video

**Implementation:**
- Video link: https://www.youtube.com/watch?v=GOfl2sbgPhk
- Magnific Popup for video modal
- Embedded on homepage hero section

## Data Flow

### Contact Form Submission Flow

```
1. User fills contact form (contact.html)
   ↓
2. Form submits POST data to send_mail.php
   ↓
3. PHP script receives: name, email, cell, subject, message
   ↓
4. PHP formats email as HTML table
   ↓
5. PHP sets email headers (From, Reply-To, etc.)
   ↓
6. PHP calls mail() function
   ↓
7. Email sent to info@blackeaglegroup.co.za
   ↓
8. PHP redirects to contact2.html (regardless of success/failure)
   ↓
9. User sees confirmation page
```

### Page Load Flow

```
1. User requests HTML page
   ↓
2. Server serves static HTML
   ↓
3. Browser loads CSS files (parallel)
   ↓
4. Browser loads JavaScript files (parallel)
   ↓
5. jQuery ready event fires
   ↓
6. main.js initializes:
   - AOS animations
   - Parallax effects
   - Carousels
   - Navigation handlers
   ↓
7. Page fully interactive
```

## Recent Changes

### [2025-01-30] - Initial Documentation

**Created:**
- Comprehensive project documentation
- File explanations for all major files
- Architecture overview
- API endpoint documentation
- Setup and deployment instructions

**Documented Files:**
- All main HTML pages (index, about, services, property, clients, etc.)
- Contact form handler (send_mail.php)
- Main JavaScript file (main.js)
- Main stylesheet (style.css)
- Sub-sites (cassi, COT, csir, iLGM)

**Identified:**
- 8 main HTML pages
- 1 PHP backend script
- Multiple sub-sites for events
- 20+ JavaScript libraries
- 15+ CSS libraries
- Contact form with email handler
- Google Maps integration
- Social media integration

**Next Steps:**
- Review and customize documentation
- Add career goals section
- Fix email From header syntax error
- Add input validation to contact form
- Implement CSRF protection
- Move Google Maps API key to environment variable
- Add error handling improvements

---

## Known Issues & Improvements

### Security Issues

1. **Contact Form:**
   - No input validation or sanitization
   - No CSRF protection
   - Potential email header injection
   - No spam protection (CAPTCHA)

2. **Email Configuration:**
   - From header has syntax error: `noreply@mandla@blackeaglegroup.co.za`
   - Should be: `noreply@blackeaglegroup.co.za`

3. **Google Maps API:**
   - API key exposed in HTML
   - Should be restricted by domain
   - Consider server-side proxy

### Functionality Improvements

1. **Contact Form:**
   - Add client-side validation
   - Add server-side validation
   - Implement CAPTCHA
   - Add success/error messages
   - Email delivery confirmation

2. **Error Handling:**
   - Better error messages
   - Error logging improvements
   - User feedback on failures

3. **Performance:**
   - Minify custom CSS/JS
   - Optimize images
   - Implement lazy loading
   - Use CDN for libraries

4. **Accessibility:**
   - Improve ARIA labels
   - Keyboard navigation
   - Screen reader optimization
   - Color contrast improvements

### Code Quality

1. **PHP Code:**
   - Add input sanitization
   - Implement proper error handling
   - Use PHPMailer instead of mail()
   - Add logging

2. **JavaScript:**
   - Modernize jQuery code
   - Add error handling
   - Improve code organization
   - Add comments

3. **HTML:**
   - Validate HTML5
   - Improve semantic markup
   - Add meta tags (SEO)
   - Improve accessibility

---

*Documentation maintained by: Development Team*
*For questions or updates, contact the project maintainer*

