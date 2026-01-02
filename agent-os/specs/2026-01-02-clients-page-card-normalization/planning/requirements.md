# Spec Requirements: Clients Page Card Normalization

## Initial Description
"i want the cards on the clients page clients.tsx to have the same size card for non-featured clients. the template to use is the non featured VW card. all cards must look like that one, secondly we dont need to have all those sub sections for the client categories, we can remove the section and use a grid for the clients card after the featured clients"

## Requirements Discussion

### First Round Questions

**Q1:** Grid Layout & Categories - Should we keep the "Featured Partners" section at the top as it is, and then just have one large "Our Clients" grid below it? Should we keep the search/filter/sort controls?
**Answer:** Yes, keep the featured partners as they are and one list with motion animation fade in when i am scrolling down the list. Keep the search and filter and sort controls.

**Q2:** "Non-Featured VW Card" Template - Do you mean "Use the standard non-featured card style (like VW would be if un-featured) and ensure **all** cards match its exact dimensions"?
**Answer:** Use the standard non-featured card style (like VW would be if un-featured) and ensure all cards match its exact dimensions. If client name is too big lower the font size of that one specific client.

**Q3:** Card Sizing & Uniformity - To achieve "same size", should I enforce a **fixed height** for all cards in the grid? Should we truncate text?
**Answer:** Truncate.

### Existing Code to Reference

**Similar Features Identified:**
- Feature: Clients Page - Path: `BlackEagleGroup.React/src/pages/Clients.jsx`
  - Current implementation uses `IndustrySection` loop which needs to be flattened.
  - Contains `AnimatedClientCard` wrapper which handles animations.

- Component: ClientCard - Path: `BlackEagleGroup.React/src/components/ClientCard.jsx`
  - Needs modification to enforce fixed dimensions.
  - Needs modification to handle dynamic font sizing for long names.
  - Needs modification to truncate secondary text.

### Follow-up Questions
No follow-up questions were needed as the requirements provided in the first round were clear and decisive.

## Visual Assets

### Files Provided:
No visual assets provided.

### Visual Insights:
N/A

## Requirements Summary

### Functional Requirements
- **Layout Restructuring:**
  - Retain the "Featured Partners" section at the top.
  - Retain Search, Filter, and Sort controls.
  - **Remove** distinct industry sub-sections (e.g., "Government", "Technology").
  - **Replace** sub-sections with a single, unified grid containing all non-featured clients.
  - Apply scroll-triggered motion animation (fade-in) to items in this main grid.

- **Card Normalization (`ClientCard`):**
  - **Style:** All non-featured clients must use the standard non-featured card appearance (standard elevation, no 3D tilt).
  - **Dimensions:** Enforce strict, uniform fixed dimensions (height and width) for all cards in the grid.
  - **Typography (Name):** Implement dynamic font sizing for client names. If a name is too long to fit the fixed area, reduce its font size specifically for that card (do not wrap or expand the card).
  - **Content (Other):** Truncate secondary text (location, industry, descriptions) to ensure the card never exceeds its fixed dimensions.

### Reusability Opportunities
- **`AnimatedClientCard`**: Reuse this existing wrapper component for the new flattened grid to maintain the fade-in scroll animations.
- **`ClientCard`**: Modify the existing component rather than creating a new one, adding props or internal logic for "fixed-layout" mode if needed (or applying it globally to non-featured variant).

### Scope Boundaries
**In Scope:**
- Modifying `Clients.jsx` layout structure.
- Modifying `ClientCard.jsx` styling and text handling logic.
- CSS updates to enforce dimensions and truncation.

**Out of Scope:**
- Changing client cards on any other page that is not the clients page
- Changes to the "Featured Partners" section (visuals or functionality).
- Changes to the Search/Filter/Sort logic itself (just keeping the UI controls).
- Changes to data sources.

### Technical Considerations
- **Dynamic Font Size:** Need a lightweight approach to detect overflow or simply apply a class based on character count (e.g., `text-xl` for short names, `text-lg` or `text-md` for longer ones) to avoid complex runtime measurements if possible.
- **Grid Responsiveness:** The single grid must remain fully responsive (stacking on mobile, grid on desktop).
- **CSS Truncation:** Use `text-overflow: ellipsis`, `whitespace: nowrap`, and `overflow: hidden` for truncated fields.
