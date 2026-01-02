# Tasks: Clients Page Card Normalization

**Spec:** `agent-os/specs/2026-01-02-clients-page-card-normalization/spec.md`  
**Created:** 2026-01-02  
**Status:** Ready for Implementation

---

## Overview

This task list implements the layout flattening and card normalization for the Clients page:
- **Flattened Grid**: Replaces industry sub-sections with one large grid for non-featured clients.
- **Card Normalization**: Enforces uniform dimensions for all cards in the grid.
- **Dynamic Font Sizing**: Reduces font size for long client names to prevent overflow.
- **Text Truncation**: Truncates secondary text (location, industry) to fit fixed dimensions.
- **Fade-in Animations**: Applies scroll-triggered fade-in to the new grid items.
- **Scoped Execution**: Ensures these changes only affect the Clients page.

**Estimated Effort:** 3-5 hours  
**Risk Level:** Low (CSS-focused, layout-only changes)

---

## Task Groups

| Group | Description | Tasks | Priority |
|-------|-------------|-------|----------|
| **1. Component Logic** | Enhance ClientCard with normalization features | 1.1-1.3 | High |
| **2. Page Layout** | Refactor Clients.jsx to use a unified grid | 2.1-2.2 | High |
| **3. Verification** | Validate UI, responsiveness, and regression | 3.1-3.3 | High |

---

## Group 1: Component Logic - Enhance ClientCard

### Task 1.1: Add Normalization Props and Logic

**Priority:** High  
**Estimated Time:** 30 min  
**Dependencies:** None

**Description:**  
Modify `ClientCard.jsx` to accept a `isNormalized` prop. When true, apply a fixed height and width to the card container and logo area.

**File to Modify:** `BlackEagleGroup.React/src/components/ClientCard.jsx`

**Acceptance Criteria:**
- [x] `isNormalized` prop added to `ClientCard`.
- [x] When `isNormalized` is true, the card has a fixed height (e.g., `h-[420px]`) and the logo area has a fixed height (e.g., `h-[120px]`).
- [x] Card maintains brand guide styling (green top border, etc.).

### Task 1.2: Implement Dynamic Font Sizing for Names

**Priority:** High  
**Estimated Time:** 30 min  
**Dependencies:** Task 1.1

**Description:**  
Add logic to scale down the font size of the client's name based on string length when `isNormalized` is active.

**Acceptance Criteria:**
- [x] For short names (< 18 chars), font remains `text-2xl`.
- [x] For medium names (18-25 chars), font scales to `text-xl` or `text-lg`.
- [x] For long names (> 25 chars), font scales to `text-base`.
- [x] Text remains centered and does not wrap into multiple lines if it would break the fixed height.

### Task 1.3: Implement Secondary Text Truncation

**Priority:** High  
**Estimated Time:** 20 min  
**Dependencies:** Task 1.1

**Description:**  
Apply CSS truncation to the location and industry labels when `isNormalized` is true.

**Acceptance Criteria:**
- [x] Location and industry strings use `text-overflow: ellipsis` and `whitespace: nowrap`.
- [x] Content does not overflow the card's fixed boundaries.

---

## Group 2: Page Layout - Refactor Clients.jsx

### Task 2.1: Flatten Grid Layout

**Priority:** High  
**Estimated Time:** 45 min  
**Dependencies:** Group 1

**Description:**  
Modify `Clients.jsx` to remove the `IndustrySection` loop for non-featured clients. Instead, collect all filtered non-featured clients into a single grid.

**File to Modify:** `BlackEagleGroup.React/src/pages/Clients.jsx`

**Acceptance Criteria:**
- [x] `IndustrySection` component usage removed for non-featured clients.
- [x] A single `Row` grid follows the "Featured Partners" section.
- [x] All non-featured clients (post-filter/search) are rendered in this one grid.
- [x] Each card is passed `isNormalized={true}`.

### Task 2.2: Apply Scroll Animations to Grid

**Priority:** Medium  
**Estimated Time:** 20 min  
**Dependencies:** Task 2.1

**Description:**  
Ensure the `AnimatedClientCard` wrapper works correctly within the new single grid layout, providing a staggered fade-in as the user scrolls.

**Acceptance Criteria:**
- [x] Cards in the unified grid fade in as they scroll into view.
- [x] Animation is smooth and performant.

---

## Group 3: Verification - Validate and Test

### Task 3.1: Layout and Normalization Check

**Priority:** High  
**Estimated Time:** 20 min  
**Dependencies:** All Group 2 tasks

**Description:**  
Verify that all cards in the grid have exactly the same dimensions and that long names scale correctly.

**Acceptance Criteria:**
- [ ] Visual inspection confirms all non-featured cards are perfectly aligned in a grid.
- [ ] "International Relations" or other long names are clearly readable at a smaller font size.
- [ ] No card expands vertically beyond the reference VW card size.

### Task 3.2: Responsiveness and Filtering

**Priority:** High  
**Estimated Time:** 15 min  
**Dependencies:** Task 3.1

**Description:**  
Test the new grid layout with search, filtering, and different screen sizes.

**Acceptance Criteria:**
- [ ] Grid adjusts correctly (e.g., 4 cols on desktop, 2 on tablet, 1 on mobile).
- [ ] Filtering by industry updates the unified grid correctly.
- [ ] Search functionality works within the flattened grid.

### Task 3.3: Regression Check (Other Pages)

**Priority:** High  
**Estimated Time:** 10 min  
**Dependencies:** Task 3.1

**Description:**  
Ensure that client cards on the Homepage or other pages have NOT been affected by the normalization.

**Acceptance Criteria:**
- [ ] Home page client cards (if any) retain their original styling.
- [ ] No visual regressions found on non-Clients pages.
