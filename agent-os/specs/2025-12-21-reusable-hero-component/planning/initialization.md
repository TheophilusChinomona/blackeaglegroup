# Spec Initialization

**Date:** 2025-12-21  
**Spec Name:** Reusable Hero Component with Event Image Carousel  
**Status:** Initialized

## Overview

This spec addresses:
1. **Reusable Hero Component** - Create a single, reusable hero component that can be used across all pages
2. **Event Image Carousel** - Implement a carousel background using actual event images from hosted events
3. **Consistent Sizing** - Ensure all hero sections have the same sizing and styling as the home page hero
4. **Page-Specific Content** - Allow customizable hero text per page while maintaining consistent structure

## Context

- Current hero sections are implemented differently across pages:
  - Home page: Uses `hero-section` class with static background (`bg_1.jpg`)
  - About page: Uses `hero-wrap-2` class with different height (700px) and background (`bg_3.jpg`)
  - PropertyServices: Uses `hero-wrap-2` with different background (`bg_41.jpg`)
  - GolfEvents: Uses `hero-wrap-2` with different background
- Home page hero has specific styling: `min(80vh, 650px)` height, gradient overlay, centered content
- User wants to use actual event images in a carousel for the hero background
- Need to create a `heros` folder in `public/images/` for hero carousel images
- Home page should keep its current text content
- Other pages should have simple hero text like "About Us", "Property Services", "Events", etc.

## Related Specs

- `2025-12-21-homepage-redesign` - Previous homepage hero work
- `2025-12-21-homepage-spacing-events-integration` - Events integration work

