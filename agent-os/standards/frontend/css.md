# CSS and Styling

This document defines CSS and styling standards for theo.dev projects.

## Philosophy

**Visual result matters more than methodology.**

Choose the approach that produces the best visual outcome, whether that's Tailwind, CSS Modules, or custom CSS.

**The 80/20 Rule:** Most UIs consist primarily of text, buttons, and icons. Mastering typography, color, and layout is the "20% of design that gives you 80% of the results."

---

## Default: Tailwind CSS

### Why Tailwind?

- Utility-first approach
- Fast development
- Consistent design system
- Excellent developer experience
- Tree-shaking (unused styles removed)
- Great documentation

### Configuration

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
}
```

### Usage Examples

```tsx
// ✅ Good - Utility classes for layout
function Card({ title, children }: ICardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  )
}

// ✅ Good - Responsive classes
function Hero() {
  return (
    <div className="px-4 py-8 md:px-8 md:py-16 lg:px-16 lg:py-24">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
        Welcome
      </h1>
    </div>
  )
}

// ✅ Good - State variants
function Button({ variant = 'primary' }: IButtonProps) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition'
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      Click me
    </button>
  )
}
```

### Class Organization

```tsx
// ✅ Good - Organized by category
<div className="
  // Layout
  flex items-center justify-between gap-4
  // Spacing
  p-6 m-4
  // Typography
  text-lg font-semibold
  // Colors
  bg-white text-gray-900
  // Borders & Shadows
  rounded-lg border border-gray-200 shadow-sm
  // Responsive
  md:p-8 lg:flex-row
">
  Content
</div>

// ❌ Bad - Random order, hard to read
<div className="shadow-sm text-lg md:p-8 bg-white flex p-6 border-gray-200 rounded-lg items-center">
  Content
</div>
```

---

## CSS Modules (When Needed)

### When to Use

- Tailwind doesn't achieve desired look
- Complex animations
- Highly custom styling
- Third-party component styling

### File Structure

```
Component.tsx
Component.module.css
```

### Naming Convention

**Use camelCase for class names:**

```css
/* Button.module.css */
.buttonPrimary {
  background-color: #3b82f6;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.buttonPrimary:hover {
  background-color: #2563eb;
}

.buttonDisabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

```tsx
// Button.tsx
import styles from './Button.module.css'

export function Button({ disabled = false }: IButtonProps) {
  return (
    <button
      className={`${styles.buttonPrimary} ${disabled ? styles.buttonDisabled : ''}`}
      disabled={disabled}
    >
      Click me
    </button>
  )
}
```

---

## Custom CSS (When Necessary)

### When to Use

- Neither Tailwind nor CSS Modules work
- Very specific visual requirements
- Complex animations not achievable with Tailwind

### Global Styles

```css
/* globals.css */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #10b981;
  --spacing-unit: 0.25rem;
  --font-family-sans: 'Inter', system-ui, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family-sans);
  line-height: 1.5;
  color: #1f2937;
}
```

---

## Responsive Design

### Mobile-First Approach

```tsx
// ✅ Good - Mobile first, then tablet/desktop
<div className="
  text-base p-4        // Mobile (default)
  md:text-lg md:p-6    // Tablet
  lg:text-xl lg:p-8    // Desktop
">
  Content
</div>

// ❌ Bad - Desktop first
<div className="text-xl p-8 md:text-lg md:p-6 text-base p-4">
  Content
</div>
```

### Breakpoints

**Standard breakpoints (Tailwind defaults):**

- `sm`: 640px (small phone landscape)
- `md`: 768px (tablet)
- `lg`: 1024px (laptop)
- `xl`: 1280px (desktop)
- `2xl`: 1536px (large desktop)

**Common usage:**

```tsx
// Mobile: 375px (default)
// Tablet: 768px (md:)
// Desktop: 1440px (lg: or xl:)

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

---

## Design Tokens

### Color Systems

**Use HSL/OKLCH for Color Definitions**

Avoid Hex or RGB for defining palettes. Use **HSL (Hue, Saturation, Lightness)** or **OKLCH** because they allow for logical adjustments:

- **Hue:** The base color (0–360 degrees)
- **Saturation:** Intensity (0% is gray, 100% is intense)
- **Lightness:** Brightness (0% is black, 100% is white)

**Neutral Palettes & Shades**

For backgrounds, borders, and text, use neutral colors (Saturation set to 0). Create harmony by only adjusting the **Lightness** value:

- **Dark Mode:** Start with a base of 0% lightness. Use 5% for cards/surfaces, and 10% for elevated elements. Lighter shades appear closer to the user.
- **Light Mode:** A simple trick is to subtract the dark mode Lightness value from 100. However, manual adjustment is better because light naturally comes from the top; therefore, top elements should often be lighter, not darker.
- **Newer Formats:** Consider using **OKLCH** (available in CSS), which provides more natural perceptual increments compared to HSL.

**Define in Tailwind config:**

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      brand: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',
        900: '#0c4a6e',
      },
      gray: {
        50: '#f9fafb',
        500: '#6b7280',
        900: '#111827',
      }
    }
  }
}
```

**Using HSL in CSS:**

```css
/* Define colors using HSL */
:root {
  --color-primary: hsl(200, 100%, 50%);
  --color-neutral-base: hsl(0, 0%, 10%); /* Dark mode base */
  --color-neutral-card: hsl(0, 0%, 5%);  /* Dark mode card */
  --color-neutral-elevated: hsl(0, 0%, 10%); /* Dark mode elevated */
}
```

### Typography and Hierarchy

**Establishing Hierarchy**

To create a clear hierarchy where the user knows what to look at, you must separate elements into logical groups. The primary tools for establishing hierarchy are **size, color, and spacing**:

- **Spacing:** Use spacing to group or separate elements (Law of Proximity). Often, you do not need to manually add margins; line height can act as the bottom margin for text elements, creating natural gaps.
- **Color & Contrast:** To emphasize an element, you must de-emphasize others. For example, white text on a black background provides maximum contrast; to create hierarchy, reduce the lightness of secondary text to around 60%.
- **Font Size & Weight:** You do not need a complex type scale. For 99% of apps, you only need a base size (14px or 16px) combined with weight and color changes. Design everything with the base size first, then only go up or down 2 pixels when absolutely necessary.

```javascript
// tailwind.config.js
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace'],
    },
    fontSize: {
      'xs': '0.75rem',     // 12px
      'sm': '0.875rem',    // 14px
      'base': '1rem',      // 16px - PRIMARY BASE SIZE
      'lg': '1.125rem',    // 18px (base + 2px)
      'xl': '1.25rem',     // 20px (base + 4px)
      '2xl': '1.5rem',     // 24px
      '3xl': '1.875rem',   // 30px
      '4xl': '2.25rem',    // 36px
    }
  }
}
```

**Typography Best Practices:**

```tsx
// ✅ Good - Base size with weight/color for hierarchy
<p className="text-base text-gray-900">Primary text</p>
<p className="text-base text-gray-600 font-medium">Secondary emphasized</p>
<p className="text-base text-gray-500">Tertiary muted text</p>

// ✅ Good - Minimal size changes (only when necessary)
<h1 className="text-lg font-bold">Heading (base + 2px)</h1>
<h2 className="text-base font-semibold">Subheading (base size)</h2>

// ❌ Bad - Complex type scale with many sizes
<h1 className="text-4xl">Too large</h1>
<h2 className="text-3xl">Too many sizes</h2>
<h3 className="text-2xl">Hard to maintain</h3>
```

### Spacing

```javascript
// tailwind.config.js
theme: {
  extend: {
    spacing: {
      '18': '4.5rem',   // 72px
      '88': '22rem',    // 352px
      '128': '32rem',   // 512px
    }
  }
}
```

---

## Visual Depth and Polish

An average design can be elevated to a "good" design simply by adding depth. This follows a logic similar to video game graphics: moving from "normal" to "high" settings creates a massive visual improvement for relatively low effort.

### Layering and Highlights

- **Shades:** Use three to four shades of the same color to create layers (background, middle, top).
- **Light Physics:** Mimic real light. If a card is elevated, it should be lighter than the background.
- **Borders & Glows:** Add a lighter border or "glow" on top of an element and a darker shadow at the bottom to create a realistic 3D feel.

### Shadows

Avoid basic, single shadows. Combine them for realism:

1. **Small Shadow:** A light border/inset shadow on top.
2. **Dark Shadow:** A softer, darker shadow at the bottom.
3. **Inset Shadows:** Use dark inset shadows on top and light inset shadows on the bottom of a container (like a table or progress bar) to make elements look like they are set *deep* into the page.

**The "Sajid" Formula for Depth:**
> "First create layers by adding a lighter color on important elements. Then add the small shadow to add more depth."

### Implementation Examples

```tsx
// ✅ Good - Multiple shadows for depth
<div className="
  bg-white
  border-t border-gray-100        // Light border on top
  shadow-[0_1px_2px_rgba(0,0,0,0.05)]  // Small light shadow on top
  shadow-[0_4px_12px_rgba(0,0,0,0.15)] // Darker shadow at bottom
">
  Elevated card
</div>

// ✅ Good - Layered colors for depth
<div className="bg-gray-50">           // Background layer
  <div className="bg-gray-100">        // Middle layer
    <div className="bg-white">         // Top layer (lighter = closer)
      Content
    </div>
  </div>
</div>

// ✅ Good - Inset shadows for depth
<div className="
  bg-gray-200
  shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]  // Dark inset on top
  shadow-[inset_0_-2px_4px_rgba(255,255,255,0.5)]  // Light inset on bottom
">
  Recessed element
</div>
```

## Animations

### Tailwind Animations

```tsx
// ✅ Good - Built-in transitions
<button className="bg-blue-500 transition-colors duration-200 hover:bg-blue-600">
  Hover me
</button>

<div className="animate-pulse">Loading...</div>

<div className="animate-spin">⟳</div>
```

### Custom Animations

```javascript
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      slideIn: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(0)' },
      },
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      }
    },
    animation: {
      slideIn: 'slideIn 0.3s ease-out',
      fadeIn: 'fadeIn 0.2s ease-in',
    }
  }
}

// Usage
<div className="animate-slideIn">Content</div>
```

---

## Dark Mode

### Tailwind Dark Mode

```javascript
// tailwind.config.js
export default {
  darkMode: 'class', // or 'media'
  // ...
}
```

```tsx
// Usage
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content adapts to dark mode
</div>
```

---

## Performance

### Purge Unused Styles

```javascript
// tailwind.config.js - Already configured by default
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Tailwind automatically purges unused styles in production
}
```

### Avoid Inline Styles

```tsx
// ❌ Bad - Inline styles
<div style={{ padding: '1rem', backgroundColor: '#3b82f6' }}>
  Content
</div>

// ✅ Good - Use classes
<div className="p-4 bg-blue-500">
  Content
</div>
```

### Extract Common Patterns

```tsx
// ✅ Good - Reusable component with styles
function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  )
}

// Usage everywhere
<Card>Content</Card>
```

---

## Accessibility

### Focus States

```tsx
// ✅ Good - Visible focus indicators
<button className="
  bg-blue-500 text-white px-4 py-2 rounded
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  Accessible button
</button>
```

### Color Contrast

```tsx
// ✅ Good - Sufficient contrast (4.5:1 for normal text)
<p className="text-gray-900 bg-white">Readable text</p>

// ❌ Bad - Insufficient contrast
<p className="text-gray-300 bg-white">Hard to read</p>
```

### Screen Reader Only

```css
/* Utility class for screen reader only content */
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```tsx
<button>
  <span className="srOnly">Close menu</span>
  <XIcon />
</button>
```

---

## Layout Principles

### Think Inside the Box

Everything on a website is a box. Layouts are defined by parent-child relationships. A parent box controls how its children are displayed using properties like `display: block`, `flex`, or `grid`.

### Flexbox vs. Grid

- **Flexbox:** Use this for flexible layouts where items need to align in rows or columns and adapt dynamically. It is like a "cool parent" that gives children freedom to choose their size. Use `flex-grow: 1` to make items fill empty space.
- **Grid:** Use this for rigid, structured layouts where you need precise control over both rows and columns. It is like a "disciplined parent" where children obey strict placement rules.

### Responsiveness

Responsive design is essentially moving boxes into different rows and columns based on screen width.

- **Media Queries:** Use conditions (e.g., `max-width`) to apply different CSS properties when the screen size changes.
- **The "Good Enough" Solution:** Do not try to solve layout issues in the code editor immediately. Sketch a rough idea of how the parent-child boxes will rearrange on different screens before coding.
- **Positioning:** To handle sidebars or overlays on smaller screens without breaking the flow, use `position: absolute` or `fixed` to remove elements from the normal document flow.

## Common Patterns

### Centering Content

```tsx
// Horizontal and vertical center
<div className="flex items-center justify-center min-h-screen">
  <p>Centered content</p>
</div>

// Horizontal center only
<div className="mx-auto max-w-4xl">
  <p>Centered with max width</p>
</div>
```

### Grid Layouts

```tsx
// Responsive grid - moving boxes into different columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

// Auto-fit grid
<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

### Flexbox Layouts

```tsx
// Space between items - flexible layout
<div className="flex items-center justify-between">
  <Logo />
  <Navigation />
</div>

// Centered with gap - flexible layout
<div className="flex items-center gap-4">
  <Avatar />
  <UserName />
</div>

// Flex-grow to fill space
<div className="flex">
  <div className="flex-grow">Takes remaining space</div>
  <div>Fixed width</div>
</div>
```

---

## CSS Checklist

**Before committing:**

- [ ] Follows project's CSS methodology (Tailwind default)
- [ ] Responsive on all breakpoints (mobile, tablet, desktop)
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Focus states visible and accessible
- [ ] No inline styles (unless absolutely necessary)
- [ ] Classes organized and readable
- [ ] Design tokens used consistently
- [ ] Animations perform well
- [ ] Dark mode support (if applicable)
- [ ] CSS modules use camelCase names

---

## Summary

**Key Principles:**
1. Tailwind CSS is the default choice
2. Use CSS Modules when Tailwind doesn't fit
3. Custom CSS only when necessary
4. Mobile-first responsive design
5. Consistent design tokens
6. Accessible focus states and contrast
7. Performance matters (purge unused CSS)
8. Visual result > methodology

**Design Guide Principles:**
1. **Typography:** Stick to one base size (14/16px) and use weight/color for hierarchy
2. **Color:** Use HSL/OKLCH. 0% Saturation for neutrals. Tweak Lightness for depth
3. **Layout:** Use Flexbox for flexibility, Grid for structure. Plan parent-child relationships first
4. **Polish:** Add lighter tops and darker bottoms (borders/shadows) to simulate light sources
