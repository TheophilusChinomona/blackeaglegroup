# Phase 2 Visual Verification Checklist

This document provides a checklist for visually verifying that all Phase 2 content pages match the original HTML designs pixel-perfect.

## Visual Comparison Checklist

### Services Page (`/services`)
- [ ] Hero section with background image matches `public_html/services.html`
- [ ] Breadcrumbs display correctly
- [ ] "What We Do" heading matches original styling
- [ ] All 17 service cards display in grid layout (3 columns)
- [ ] Service card images display correctly
- [ ] Service titles are clickable and styled correctly
- [ ] Service descriptions match original text
- [ ] Responsive layout works on mobile/tablet

### Clients Page (`/clients`)
- [ ] Hero section with background image matches `public_html/clients.html`
- [ ] "Who We Served" heading matches original
- [ ] All client cards display in grid layout (4 columns: col-md-3)
- [ ] Client images display correctly
- [ ] Client names are clickable and styled correctly
- [ ] Location text displays when present
- [ ] Reference and Call buttons display correctly
- [ ] Button styling matches original (black outline)

### Strategic Partners Page (`/strategic-partners`)
- [ ] Hero section matches `public_html/StrategicPartners.html`
- [ ] "Strategic Partners" heading matches original
- [ ] All partner cards display in grid layout (4 columns)
- [ ] Partner images display correctly
- [ ] Partner names are clickable and styled correctly
- [ ] Reference and Call buttons work correctly
- [ ] Layout matches Clients page

### Property Services Page (`/property-services`)
- [ ] Hero section with background image matches `public_html/property.html`
- [ ] "What We Do" heading matches original
- [ ] All property service cards display (5 cards)
- [ ] Overview section displays correctly
- [ ] Expertise section with list items displays correctly
- [ ] Services section with numbered list displays correctly
- [ ] All text content matches original

### Blog Listing Page (`/blog`)
- [ ] Hero section matches `public_html/blog.html`
- [ ] "Blog" heading matches original
- [ ] All blog posts display in list format
- [ ] Video post (VW Menlyn) displays YouTube embed correctly
- [ ] Image posts display correctly
- [ ] Post titles are clickable and styled correctly
- [ ] Post excerpts display correctly
- [ ] "Read More" links work correctly
- [ ] Date and comments display correctly

### Blog Single Post Page (`/blog/:slug`)
- [ ] Hero section displays with post title
- [ ] Breadcrumbs show Home > Blog > Post Title
- [ ] Video posts display YouTube embed correctly
- [ ] Image posts display featured image correctly
- [ ] Post content displays correctly
- [ ] "Back to Blog" link works correctly
- [ ] 404 handling works for invalid slugs

### Contact Page (`/contact`)
- [ ] Hero section matches `public_html/contact.html`
- [ ] "Contact us" heading matches original
- [ ] Contact information section displays correctly (Address, Phone, Email)
- [ ] Contact form displays correctly
- [ ] Form fields (Name, Email, Subject, Message) styled correctly
- [ ] Form validation errors display inline
- [ ] Submit button styled correctly (green primary button)
- [ ] Success/error messages display correctly
- [ ] Google Maps embed displays correctly
- [ ] Compliance Information section displays correctly

## Navigation Verification

- [ ] Header navigation includes all routes
- [ ] Active state highlights current page correctly
- [ ] Footer navigation includes all routes
- [ ] All navigation links work correctly
- [ ] Mobile menu works correctly

## PDF Downloads

- [ ] Cleaning Profile PDF link works in Footer
- [ ] Security Profile PDF link works in Footer
- [ ] CDP & Events Management Profile PDF link works in Footer
- [ ] All PDF links have download attribute
- [ ] PDFs download correctly when clicked

## Form Functionality

- [ ] Contact form validates required fields
- [ ] Email validation works correctly
- [ ] Message length validation works
- [ ] Form submission shows loading state
- [ ] Success message displays after submission
- [ ] Error handling works correctly
- [ ] Form resets after successful submission

## Responsive Design

- [ ] All pages work on mobile devices
- [ ] All pages work on tablet devices
- [ ] All pages work on desktop
- [ ] Navigation menu collapses correctly on mobile
- [ ] Grid layouts adapt to screen size

## Cross-Browser Testing

- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile browsers

## Notes

- Compare side-by-side with original HTML files in `public_html/`
- Use browser dev tools to inspect element styles
- Verify all images load correctly
- Check that all links work
- Ensure no console errors

