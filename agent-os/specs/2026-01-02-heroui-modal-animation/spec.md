# HeroUI Modal Animation Spec

## Overview
Implement HeroUI-style (NextUI) animations for opening and closing modals. Since the project uses shadcn/ui Dialog, we will enhance it with `framer-motion` to achieve the desired scale-and-fade animation.

## Requirements
- Use `framer-motion` for spring-based scale and fade transitions.
- Animation:
    - Entry: `scale: 0.95`, `opacity: 0`, `y: 20` -> `scale: 1`, `opacity: 1`, `y: 0`.
    - Exit: `scale: 1`, `opacity: 1`, `y: 0` -> `scale: 0.95`, `opacity: 0`, `y: 20`.
    - Transition: `type: "spring"`, `stiffness: 300`, `damping: 30`.
- Apply to `DialogContent` in `src/components/ui/dialog.jsx`.

## Implementation Plan
1.  Modify `src/components/ui/dialog.jsx`.
2.  Import `motion` and `AnimatePresence` from `framer-motion`.
3.  Wrap `DialogPrimitive.Content` (or its children) in a `motion.div`.
4.  Ensure the backdrop (overlay) also fades in/out smoothly.
