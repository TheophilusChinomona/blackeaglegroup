## Responsive design best practices

- **Mobile-First Development**: Start with mobile layout and progressively enhance for larger screens
- **Standard Breakpoints**: Consistently use standard breakpoints across the application (e.g., mobile, tablet, desktop)
- **Fluid Layouts**: Use percentage-based widths and flexible containers that adapt to screen size
- **Relative Units**: Prefer rem/em units over fixed pixels for better scalability and accessibility
- **Test Across Devices**: Test and verify UI changes across multiple screen sizes from mobile to tablet to desktop screen sizes and ensure a balanced, user-friendly viewing and reading experience on all
- **Touch-Friendly Design**: Ensure tap targets are appropriately sized (minimum 44x44px) for mobile users
- **Performance on Mobile**: Optimize images and assets for mobile network conditions and smaller screens
- **Readable Typography**: Maintain readable font sizes across all breakpoints without requiring zoom
- **Content Priority**: Show the most important content first on smaller screens through thoughtful layout decisions

## Layout Philosophy

**Think Inside the Box**: Everything on a website is a box. Layouts are defined by parent-child relationships. A parent box controls how its children are displayed using properties like `display: block`, `flex`, or `grid`.

**Responsive Design = Moving Boxes**: Responsive design is essentially moving boxes into different rows and columns based on screen width. Use media queries to apply different CSS properties when the screen size changes.

**Planning Before Coding**: Do not try to solve layout issues in the code editor immediately. Sketch a rough idea of how the parent-child boxes will rearrange on different screens before coding.

**Positioning for Overlays**: To handle sidebars or overlays on smaller screens without breaking the flow, use `position: absolute` or `fixed` to remove elements from the normal document flow.
