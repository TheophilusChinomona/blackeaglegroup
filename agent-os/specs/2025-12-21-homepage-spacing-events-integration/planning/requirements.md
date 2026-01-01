# Requirements Research

## Current State Analysis

### Homepage Structure
Current sections in order:
1. **Hero Section** - Welcome message with video CTA
2. **Events Section** - Two event cards (CoT Golf Day, CSIR Charity Golf Day) - links to external URLs
3. **Services Section** - Four service cards
4. **Why Choose Us Section** - Two-column layout with image and text
5. **Dedication Section** - Four dedication cards with background image

### Spacing Issues Identified
- Line 235-239 in `Home.jsx` shows a manual spacing hack: `<div><p><br /></p></div>`
- Sections use inconsistent spacing classes (`ftco-no-pt`, `ftco-no-pb`)
- Visual spacing between sections is not uniform

### Events Integration Status
- Events data exists in `events.json` with COT and CSIR events defined
- React routes exist for `/events/cot/*` and `/events/csir/*`
- Event components exist but may not be fully implemented:
  - `COTIndex`, `COTAbout`, `COTContact`, `COTTeam`
  - `CSIRIndex`, `CSIRAbout`, `CSIREventDetail`, `CSIRContact`
- Homepage currently links to external URLs instead of React routes:
  - `https://blackeaglegroup.co.za/COT/index.html`
  - `https://blackeaglegroup.co.za/csir/csir.html`

### Source HTML Files
- **COT**: `/public_html/COT/` contains:
  - `index.html` - Welcome page with carousel
  - `about.html` - Event overview
  - `team.html` - Aide Memoire (event details)
  - `contact.html` - Contact form
- **CSIR**: `/public_html/csir/` contains:
  - `CSIRGolfDay.html` - Gallery page
  - Other HTML files for event details

---

## Clarifying Questions

### 1. Homepage Section Spacing
**Question:** What specific spacing issues are you seeing? 
- Are sections too close together or too far apart?
- Which sections have the worst spacing?
- Do you have a preferred spacing value (e.g., 80px, 100px between sections)?

**Question:** Should spacing be consistent between all sections, or do some sections need different spacing (e.g., more space after Hero, less space between Services and Why Choose Us)?

### 2. Section Reordering
**Question:** What order would you like for the homepage sections? Please specify the desired order from top to bottom.

Current order:
1. Hero
2. Events
3. Services
4. Why Choose Us
5. Dedication

**Question:** Should the Events section remain on the homepage, or should it be moved elsewhere (e.g., only shown on `/golf-events` page)?

### 3. Events Display on Homepage
**Question:** How should events be displayed on the homepage?
- Keep the current two large event cards?
- Show more events (all COT/CSIR events)?
- Use a different layout (e.g., carousel, grid)?
- Should events link to React routes (`/events/cot`, `/events/csir`) instead of external URLs?

**Question:** Should the Events section pull data dynamically from `events.json`, or remain hardcoded?

### 4. Events Integration - Content Migration
**Question:** For the COT event pages, should we:
- Convert all HTML content exactly as-is from the source files?
- Modernize the design while keeping the same content?
- Extract only specific content sections?

**Question:** For the CSIR event pages, which HTML files should be converted?
- `CSIRGolfDay.html` (gallery)
- `ReadMore.html`
- `eventDetail.html`
- `AboutEvent.html`
- `AideMemoir.html`
- Others?

**Question:** Should event pages have their own navigation/header, or use the main site header?

### 5. Events Integration - Functionality
**Question:** Should the contact forms on event pages (e.g., `contact.html`) be functional in React, or just display contact information?

**Question:** Should event pages include:
- Image carousels (from COT index.html)?
- PDF downloads (e.g., ProgramBusiness.pdf from team.html)?
- Embedded maps?
- Sponsor logos sections?

### 6. Events Integration - Styling
**Question:** Should event pages:
- Match the main site's design system?
- Have event-specific branding/colors?
- Use the same components as the main site (Header, Footer)?

### 7. Data Structure
**Question:** Should we enhance `events.json` to include:
- Full page content (HTML converted to structured data)?
- Additional metadata (sponsors, schedules, etc.)?
- Image paths for carousels and galleries?

---

## Visual Assets Needed

To properly implement this spec, please provide:

1. **Screenshots or mockups** showing:
   - Current homepage with spacing issues highlighted
   - Desired homepage layout with proper spacing
   - Desired section order

2. **Reference designs** for:
   - How events should appear on homepage
   - How event detail pages should look

3. **Content priorities**:
   - Which content from HTML files is most important to preserve
   - Any content that can be simplified or removed

---

---

## User Requirements (Answers)

### 1. Homepage Section Spacing
**Answer:** Sections are too close together. Uniform 80px spacing between all sections.

### 2. Section Reordering
**Answer:** New order:
1. Hero
2. Services
3. Events
4. Why Choose Us
(Remove Dedication section)

### 3. Events Display on Homepage
**Answer:** 
- Change the layout (not keep current two large cards)
- Link to React routes (`/events/cot`, `/events/csir`, etc.)
- Pull data dynamically from `events.json`
- Homepage shows main event cards (COT, CASSI, etc.)
- Events page (`/golf-events`) will have the details

### 4. Events Integration - Content Migration
**Answer:**
- **COT pages:** Make them look exactly as they do now, but navigation should have one main page for the event + gallery instead of completely separate app
- **CSIR pages:** Convert all relevant pages
- Event pages should use main site header (not separate navigation)

### 5. Events Integration - Functionality
**Answer:**
- Contact forms should be functional in React
- Event pages should include:
  - Image carousels (hero section for the event)
  - Embedded maps
  - Event details
  - Sponsor logos section

### 6. Events Integration - Styling
**Answer:**
- Event-specific colors (like what's currently there)
- Use same components as main site (Header, Footer)
- Instead of "Golf Events" tab, it should be "Events" tab with event details

### 7. Data Structure
**Answer:**
- Enhance `events.json` to include:
  - Full page content (HTML converted to structured data)
  - Additional metadata (sponsors, schedules, etc.)
  - Image paths for carousels and galleries

---

## Next Steps

1. Finalize the requirements document ✅
2. Create detailed implementation tasks
3. Generate the formal specification document

