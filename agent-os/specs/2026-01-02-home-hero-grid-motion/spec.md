# Home Hero Grid Motion Integration

## 1. Overview
Update the Home page Hero section to use the `GridMotion` component (based on `@react-bits/GridMotion-JS-CSS`) with a curated or random selection of images from `public/new images`.

## 2. Requirements

### 2.1 Component
- Ensure `src/components/GridMotion/GridMotion.jsx` matches the desired `@react-bits` implementation.
- Optimize for performance (GSAP usage, CSS transforms).
- Ensure the grid is responsive and handles the images gracefully.

### 2.2 Content
- Use images located in `public/new images`.
- Since there are ~80 images and the grid displays ~28, implement a randomization logic (either build-time or run-time) to select images, OR just select the best 28. *Decision: Randomize on mount to keep it fresh, or hardcode a "best of" list if provided. For now, randomized subset.*
- **Optimization:** Do not load all 80 images. Load only the 28 required for the grid.

### 2.3 Integration
- Update `src/pages/Home.jsx`.
- Replace the current `homeHeroGridImages` list with the new list from `public/new images`.
- Ensure the text overlay ("Welcome to Black Eagle Group...", etc.) remains visible and accessible above the animation.

## 3. Implementation Plan
1.  **Verify Component:** Check `GridMotion.jsx` code against `@react-bits` standard (if available/known) or best practices.
2.  **Generate Image List:** Create a list of all available images in `public/new images`.
3.  **Update Home.jsx:**
    -   Import the full image list.
    -   Select 28 images (randomly or sequentially).
    -   Pass to `GridMotion`.
4.  **Verify:** Check performance and visual appeal.
