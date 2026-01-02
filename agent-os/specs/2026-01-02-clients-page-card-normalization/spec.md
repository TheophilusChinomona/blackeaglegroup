# Specification: Clients Page Card Normalization

**Spec Date:** 2026-01-02  
**Status:** Draft  
**Priority:** High

---

## Executive Summary

This specification details the restructuring of the Clients page to simplify its layout and normalize the appearance of non-featured client cards. The current industry-based sub-sections will be replaced by a single, unified grid for all non-featured clients. Additionally, all non-featured cards will be normalized to match the dimensions and style of a standard "VW" card template, with specific handling for long text and overflow to ensure visual uniformity.

**Key Deliverables:**
1. Refactored `Clients.jsx` layout (Flattened grid for non-featured clients)
2. Enhanced `ClientCard.jsx` with a "normalized" mode for the Clients page
3. Dynamic font sizing logic for client names in `ClientCard.jsx`
4. Strict CSS constraints for card dimensions and text truncation
5. Scroll-triggered fade-in animations for the new unified grid

---

## Goals & Success Criteria

### Primary Goals

1. **Simplify Layout**: Remove industry sub-sections and group all non-featured clients into a single grid.
2. **Visual Uniformity**: Ensure every non-featured card has identical dimensions, regardless of content.
3. **Template Alignment**: Use the "VW" non-featured card style as the definitive template for all cards in the grid.
4. **Preserve Functionality**: Retain the "Featured Partners" section and all search/filter/sort controls.
5. **Scoped Changes**: Ensure these specific normalization rules only apply to the Clients page.

### Success Criteria

- [ ] "Featured Partners" section remains unchanged at the top of the page.
- [ ] Industry sub-sections are removed.
- [ ] All non-featured clients appear in one continuous grid.
- [ ] Non-featured cards have exact uniform dimensions (height/width).
- [ ] Client names with long text automatically reduce their font size to fit.
- [ ] Secondary text (location, industry) is truncated if it exceeds the fixed space.
- [ ] Search, filter, and sort controls continue to work as expected.
- [ ] New grid items fade in gracefully upon scroll.
- [ ] No visual changes to `ClientCard` usage on other pages (Home, Services, etc.).

---

## Technical Architecture

### Component Modifications

| Component | Role in this Spec |
|-----------|-------------------|
| `Clients.jsx` | Remove `IndustrySection` mapping; replace with a single `Row` for filtered non-featured clients. |
| `ClientCard.jsx` | Add logic for "normalized" mode; implement dynamic font sizing and truncation. |
| `clientData.js` | No changes needed to data loading, just how it's consumed in `Clients.jsx`. |

### Normalization Logic

The `ClientCard` will receive a new prop (e.g., `isNormalized`) or detect its context to apply:
1. **Fixed Height/Width**: CSS classes to lock the card size.
2. **Dynamic Name Font**: A utility function or CSS classes to scale down `h3` font size if character count exceeds a threshold.
3. **Truncation**: `line-clamp` or `text-overflow: ellipsis` for location and industry fields.

---

## Implementation Details

### 1. Layout Flattening (`Clients.jsx`)

Current structure:
```jsx
{industryKeys.map((industryKey, index) => (
  <IndustrySection ... />
))}
```

New structure:
```jsx
{/* One unified grid for non-featured clients */}
<section className="clients-main-grid-section">
  <Container>
    <Row className="d-flex">
      {filteredNonFeaturedClients.map((client, index) => (
        <Col key={client.id} xs={12} sm={6} md={4} lg={3} className="d-flex mb-4">
          <AnimatedClientCard
            client={client}
            index={index}
            isNormalized={true} // New prop for normalization
            ...
          />
        </Col>
      ))}
    </Row>
  </Container>
</section>
```

### 2. Card Normalization (`ClientCard.jsx`)

The "VW" card (non-featured) serves as the visual baseline.

**Enforced Dimensions:**
- All cards in the main grid must match the height of the standard VW card.
- Logo area height must be fixed (e.g., `h-[120px]`).
- Content area must have a fixed height to prevent vertical expansion.

**Dynamic Font Sizing:**
```javascript
const getNameFontSize = (name) => {
  if (name.length > 25) return "text-sm";
  if (name.length > 18) return "text-base";
  return "text-xl"; // Default
};
```

**Truncation:**
Secondary labels should use:
```css
.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}
```

---

## Out of Scope

- Changing client cards on any other page that is not the clients page (Home, Services, etc.).
- Changes to the "Featured Partners" section (visuals or functionality).
- Changes to the Search/Filter/Sort logic itself (beyond ensuring it filters the unified grid).
- Changes to the JSON data source.

---

## Testing & Quality Assurance

### Visual Verification
- Verify that "VW" card (non-featured) looks identical to other cards in the grid.
- Test with extremely long client names to ensure font scaling and no card expansion.
- Test with long location strings to ensure truncation works.
- Check grid alignment on Mobile, Tablet, and Desktop.

### Functional Verification
- Search for a specific client: Ensure the grid updates correctly.
- Filter by industry: Ensure the grid updates correctly.
- Sort by alphabetical/industry: Ensure the grid updates correctly.
- Scroll down the page: Ensure cards fade in as they enter the viewport.

### Regression Testing
- Check the Homepage and Services page to ensure `ClientCard` appearance remains unchanged there.
