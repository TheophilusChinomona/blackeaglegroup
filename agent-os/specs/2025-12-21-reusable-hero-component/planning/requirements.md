# Requirements Research

## User Requirements Summary

The user wants to:
1. Create a reusable hero component for all pages
2. Use actual event images in a carousel for the hero background
3. Create a `heros` folder in `public/images/` for hero carousel images
4. Maintain consistent sizing across all pages (same as home page hero)
5. Keep home page hero text as-is
6. Use simple hero text on other pages: "About Us", "Property Services", "Events", etc.

## Current State Analysis

### Home Page Hero (`Home.jsx`)
- Uses `hero-section` class
- Height: `min(80vh, 650px)` (from CSS)
- Background: Static image (`bg_1.jpg`)
- Overlay: Gradient `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`
- Content: Centered text with heading, tagline, and video CTA button
- Structure: Single column, centered content

### Other Pages Hero
- About: Uses `hero-wrap-2` class, height 700px, background `bg_3.jpg`
- PropertyServices: Uses `hero-wrap-2`, background `bg_41.jpg`
- Services: Uses `hero-wrap-2`, background `bg_4.jpg`
- Contact: Uses `hero-wrap-2`, background `bg_5.jpg`
- GolfEvents: Uses `hero-wrap-2`, background from projects folder

### Existing Components
- `EventCarousel.jsx` - Already exists for carousel functionality
- Event images available in:
  - `public/COT/img/` - Contains carousel-1.jpg, carousel-2.jpg
  - `public/cassi/img/` - Contains many event images
  - `public/images/` - Contains various background images

## Technical Considerations

1. **Carousel Implementation**
   - Should use existing EventCarousel component or create new one?
   - Auto-play interval preference?
   - Transition effects (fade, slide)?
   - Show navigation controls/indicators?

2. **Image Management**
   - How many images should be in the carousel?
   - Should images be manually added to `heros` folder or auto-discovered?
   - Image naming convention?
   - Image optimization requirements?

3. **Component Props**
   - What props should the reusable hero component accept?
   - How to handle home page special case (video CTA)?
   - Should breadcrumbs be part of the hero component?

4. **Styling Consistency**
   - All pages should match home page hero height: `min(80vh, 650px)`
   - Same overlay gradient
   - Same content positioning
   - Responsive behavior

5. **Pages to Update**
   - Home (keep current text, add carousel)
   - About (change to "About Us")
   - PropertyServices (change to "Property Services")
   - Services (change to "Services" or keep "What We Do"?)
   - Contact (change to "Contact Us")
   - GolfEvents (change to "Events")
   - Any other pages with hero sections?

## User Responses to Clarifying Questions

### 1. Carousel Behavior
- **Auto-play interval:** 5 seconds
- **Pause on hover:** Yes
- **Transition effect:** To be determined (fade recommended for background carousel)
- **Navigation controls:** To be determined (likely hidden for background carousel)
- **Indicators:** To be determined (likely hidden for background carousel)

### 2. Image Selection
- **Auto-discover:** Yes, component should auto-discover images from `heros` folder
- **Naming convention:** Suggested format: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, etc. (sequential numbering)
- **Image count:** User will determine based on what looks good

### 3. Home Page Special Case
- **Video CTA:** Remove video CTA button from home page
- **Home page hero:** Should be the same as other pages (no special treatment)

### 4. Hero Text Content
- **Services page:** Keep "What We Do" text
- **All pages:** Use the reusable hero component
- **Text format:** Simple headings like "About Us", "Property Services", "Events", "Contact Us", etc.

### 5. Breadcrumbs
- **Location:** Breadcrumbs should be included in the hero component
- **Visibility:** Present on all pages that need them

### 6. Image Folder Setup
- **Folder creation:** Create `public/images/heros/` folder
- **Image addition:** User will add images manually

## Additional Requirements

### Image Sizing & Consistency
- **Critical requirement:** All hero carousel images must be converted/resized to the same dimensions
- **Purpose:** Ensure images fit the container without expanding or contracting the component
- **Implementation:** Images should be cropped/resized to maintain aspect ratio and fill the hero container consistently
- **Recommended approach:** 
  - Determine optimal hero container dimensions
  - Resize/crop all images to match these dimensions
  - Use `object-fit: cover` CSS property to ensure consistent display
  - Consider image optimization (WebP format, compression)

## Finalized Requirements

### Component Specifications
1. **Reusable Hero Component**
   - Accepts props: `title`, `subtitle` (optional), `breadcrumbs` (optional array)
   - Auto-discovers images from `/images/heros/` folder
   - Implements carousel with 5-second auto-play, pause on hover
   - Consistent sizing: `min(80vh, 650px)` height (matching home page)
   - Same overlay gradient: `linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3))`
   - Includes breadcrumbs when provided

2. **Image Management**
   - Auto-discover images from `public/images/heros/` folder
   - Suggested naming: `hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`, etc.
   - All images must be pre-processed to same dimensions for consistency
   - Use CSS `object-fit: cover` for consistent display

3. **Pages to Update**
   - Home: Remove video CTA, use hero component with "Welcome to Black Eagle Group Holdings" title
   - About: Use hero component with "About Us" title
   - PropertyServices: Use hero component with "Property Services" title
   - Services: Use hero component with "What We Do" title
   - Contact: Use hero component with "Contact Us" title
   - GolfEvents: Use hero component with "Events" title
   - All other pages with hero sections

4. **Styling**
   - Consistent height: `min(80vh, 650px)`
   - Same overlay gradient
   - Same content positioning (centered)
   - Responsive design maintained

