# Tasks: Service Card Partnership Redesign

- [x] Refactor `ServiceCard.jsx`:
    - [x] Import Aceternity UI components (`3d-card`, `card-spotlight`).
    - [x] Implement `shouldAnimate` logic based on visibility and `prefers-reduced-motion`.
    - [x] Define `cardContent` with the new design (Top border, image area, content area).
    - [x] Apply `font-serif` to the title.
    - [x] Wrap `cardContent` in `CardContainer` (for featured) or `CardSpotlight` (for regular).
- [x] Verify `Services.jsx` rendering of "Our Most Requested Solutions".
- [x] Ensure category colors are correctly passed and applied to the top border.
- [x] Check mobile responsiveness.
- [x] Update `index.css` to allow `btn-reference` and `btn-call` in `.service-card`.