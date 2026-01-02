# Tasks: HeroUI Modal Animation

- [x] Configure Tailwind keyframes for HeroUI-style animations.
    - [x] Added `modal-in` and `modal-out` to `tailwind.config.js`.
- [x] Update `DialogContent` to use the new animations.
    - [x] Updated `src/components/ui/dialog.jsx` with `data-[state=open]:animate-modal-in` and `data-[state=closed]:animate-modal-out`.
- [x] Verify visual style matches HeroUI (NextUI) behavior.
    - [x] Scale 0.95 -> 1 on enter.
    - [x] Subtle Y-axis shift on enter.
    - [x] Fade in/out.
