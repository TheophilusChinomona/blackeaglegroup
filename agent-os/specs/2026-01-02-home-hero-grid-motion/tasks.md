# Tasks: Home Hero Grid Motion

## 1. Setup & Data
- [x] Create `src/data/homeHeroImages.js` containing the full list of images from `public/new images`.
    - **Test:** Verify the file exports an array of strings.
- [x] Verify `src/components/GridMotion/GridMotion.jsx` implementation. Ensure it handles the image sizing and grid layout correctly.
    - **Test:** Component renders without errors with a simple array.

## 2. Integration
- [x] Update `src/pages/Home.jsx` to import images from `src/data/homeHeroImages.js`.
- [x] Implement logic in `Home.jsx` (or a utility) to select 28 images (randomly or first 28) to pass to `GridMotion`.
- [x] Ensure the `GridMotion` component in `Home.jsx` is configured with `gradientColor="rgba(6, 8, 18, 0.95)"` (or similar dark overlay) to match the design.
    - **Test:** Visual verification of the grid animation on the Home page.
    - **Test:** Check console for any performance warnings.

## 3. Cleanup
- [x] Remove unused image references if any.