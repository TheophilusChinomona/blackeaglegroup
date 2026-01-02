# About Page Modal Integration

## Overview
Connect the "Contact Us" CTA button on the About page to the `EventContactModal` component, ensuring consistent behavior across the site.

## Requirements
- Replace the existing `Link` or button navigation with an `onClick` handler that opens the modal.
- Import `EventContactModal` in `About.jsx`.
- Manage modal open state (`isContactModalOpen`).
- Ensure the modal is configured correctly (title: "Contact Us", no specific event context).

## Implementation Plan
1.  Read `src/pages/About.jsx` to identify the CTA button.
2.  Add state for modal visibility.
3.  Import `EventContactModal`.
4.  Render the modal component.
5.  Update the CTA button to trigger `setIsContactModalOpen(true)`.
