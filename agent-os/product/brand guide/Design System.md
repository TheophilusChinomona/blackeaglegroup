### 1. The Global Styles (`index.css`)

This setup replaces the harsh white background with your **brand cream** and establishes the typography hierarchy.

```css
@layer base {
  :root {
    /* Primary Brand Colors */
    --color-primary: #59B200;
    --color-primary-dark: #4A9600;
    
    /* Luxury Accents */
    --color-accent: #C9A962;
    --color-accent-light: #D4BC7D;

    /* Neutrals */
    --color-dark: #1A1A1A;
    --color-charcoal: #2D2D2D;
    --color-cream: #F5F3EF;
    --color-white: #FFFFFF;
    --color-text: #333333;
    --color-text-muted: #666666;
  }

  body {
    @apply bg-[var(--color-cream)] text-[var(--color-text)] font-sans antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-bold text-[var(--color-dark)];
  }
}

```

---

### 2. Tailwind Configuration (`tailwind.config.js`)

This maps your specific font weights and brand names so the agent can use classes like `bg-brand-primary` or `font-serif`.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'var(--color-primary)',
          primaryDark: 'var(--color-primary-dark)',
          accent: 'var(--color-accent)',
          cream: 'var(--color-cream)',
          dark: 'var(--color-dark)',
        }
      },
      fontFamily: {
        // Correcting the hierarchy: Playfair for headings, Source Sans for body
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'], // For category subheadings
      },
    },
  },
  plugins: [],
}

```

---

### 3. The Reusable Partner Card (`PartnerCard.tsx`)

This React component implements the consistent green top-border, the boxed logo, and the luxury button styling seen in the redesign.

```tsx
const PartnerCard = ({ logo, name, location, category }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border-t-4 border-brand-primary overflow-hidden transition-transform hover:-translate-y-1">
      {/* Logo Container */}
      <div className="p-8 bg-white flex justify-center items-center h-32 border-b border-gray-50">
        <img src={logo} alt={name} className="max-h-full max-w-[140px] object-contain" />
      </div>

      {/* Content */}
      <div className="p-6 text-center bg-white">
        <h3 className="text-xl mb-1">{name}</h3>
        <p className="text-[10px] tracking-widest uppercase font-sans text-brand-muted mb-6">
          {location} — {category}
        </p>

        {/* Actions */}
        <div className="flex gap-2 justify-center">
          <button className="flex-1 py-2 px-4 bg-brand-primary text-white font-semibold rounded-sm hover:bg-brand-primaryDark transition-colors">
            Call
          </button>
          <button className="flex-1 py-2 px-4 border border-brand-accent text-brand-accent font-semibold rounded-sm hover:bg-brand-accent hover:text-white transition-all">
            Reference
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

### 4. Hero Section Component

Agent should use this structure to create the depth shown in the dark hero area.

```tsx
const HeroSection = () => {
  return (
    <section className="relative bg-brand-dark py-24 text-center overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-4">
        <span className="text-brand-primary uppercase tracking-[0.2em] text-sm font-semibold mb-4 block">
          Featured Partners
        </span>
        <h1 className="text-5xl md:text-6xl text-white mb-6">
          Trusted by Industry Leaders
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-sans">
          Building lasting partnerships through excellence and innovation.
        </p>
        <button className="bg-brand-primary hover:bg-brand-primaryDark text-white px-8 py-3 rounded-md transition-all font-bold">
          View Our Work
        </button>
      </div>
    </section>
  );
};

