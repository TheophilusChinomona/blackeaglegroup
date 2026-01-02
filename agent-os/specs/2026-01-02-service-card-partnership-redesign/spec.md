# Service Card Partnership Redesign Spec

## Overview
Update the `ServiceCard` component to match the visual language of `ClientCard` (Key Partnerships), specifically for featured services in the "Our Most Requested Solutions" section.

## Requirements
- Use `3D-card` (Aceternity UI) effects for featured service cards.
- Use `Spotlight` effects for regular service cards.
- Adopt `font-serif` (Playfair Display) for service titles.
- Use a similar card layout to `ClientCard`:
    - Top accent border (using category color).
    - Image area (fixed height, responsive).
    - Content area with title, category label, and description.
- Maintain existing props for backward compatibility.
- Ensure visual consistency between Clients and Services pages.

## Design Details
- **Border:** `border-t-4` with category-specific color.
- **Title Font:** `font-serif font-medium text-brand-dark`.
- **Category Font:** `text-xs uppercase tracking-wider text-brand-muted font-semibold`.
- **Description Font:** `text-sm text-gray-700 leading-6`.
- **Effects:** 
    - Featured: `CardContainer`, `CardBody`, `CardItem` (3D).
    - Regular: `CardSpotlight`.
