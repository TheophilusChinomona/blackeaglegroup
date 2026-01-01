# CSS Analysis and Tailwind Conversion Guide

## Overview
This document analyzes the existing CSS from `public_html/css/style.css` and provides guidance for converting to Tailwind CSS utility classes.

## Key Design Patterns

### Colors
- **Primary Green**: `#59B200` (main brand color)
- **Primary Light**: `#00CC33` (lighter green variant)
- **Primary Lighter**: `#99FF00` (bright green for hover states)
- **Black**: `#000000` (text and backgrounds)
- **White**: `#ffffff` (text on dark backgrounds)
- **Overlay**: Black with 40% opacity (`rgba(0, 0, 0, 0.4)`)

### Typography
- **Font Family**: Poppins (primary), system fonts (fallback)
- **Font Weights**: 200 (light), 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold), 800 (extra-bold)
- **Headings**: 
  - h1: 60px (hero), 20px (navbar brand)
  - h2: 36px
  - h3: 14-18px (varies by context)

### Spacing
- Standard Bootstrap spacing scale
- Custom spacing: 4.5rem (18), 22rem (88) for hero sections

### Breakpoints
- **xs**: 576px (custom)
- **sm**: 640px (Tailwind default) / 576px (site uses)
- **md**: 768px
- **lg**: 992px
- **xl**: 1200px
- **2xl**: 1280px (Tailwind default)

### Key CSS Classes to Convert

#### Hero Section
- `.hero-wrap`: Full width, height 850px (1150px on mobile), background cover
- `.overlay`: Absolute positioned, black with 40% opacity
- `.slider-text`: Height 850px, white text
- Convert to: `w-full h-[850px] md:h-[1150px] bg-cover bg-center relative`

#### Navigation
- `.ftco-navbar-light`: Light navbar styling
- `.navbar-nav`: Flex layout, auto margins
- Convert to: `flex items-center justify-end`

#### Services Section
- `.services-section`: Section with overlay
- `.block-6.services`: Media block with padding
- Convert to: `flex items-stretch` with Tailwind spacing

#### Buttons
- `.btn-primary`: Green background (#59B200)
- `.btn-black`: Black background with green hover
- Convert to: `bg-primary hover:bg-primary-light text-white`

### Custom Components

#### Hero Text
```css
.slider-text h1 {
  font-size: 60px;
  color: #fff;
  line-height: 1.1;
  font-weight: 200;
}
```
Convert to: `text-[60px] text-white leading-tight font-light`

#### Icon Wrapper
```css
.slider-text .icon-wrap .icon {
  width: 70px;
  height: 70px;
  background: #59B200;
  border-radius: 50%;
}
```
Convert to: `w-[70px] h-[70px] bg-primary rounded-full`

## Icon Fonts

### Ionicons
- Font family: "Ionicons"
- Classes: `.ion-ios-*`, `.ion-md-*`, `.ion-logo-*`
- Usage: `<span class="ion-ios-play"></span>`
- Location: `public/fonts/ionicons/fonts/`

### Flaticon
- Font family: "Flaticon"
- Classes: `.flaticon-*`
- Usage: `<span class="flaticon-route"></span>`
- Location: `public/fonts/flaticon/font/`

## Conversion Strategy

1. **Layout Classes**: Use Tailwind's flexbox/grid utilities
2. **Spacing**: Use Tailwind spacing scale (p-*, m-*, gap-*)
3. **Colors**: Use custom primary color classes (`bg-primary`, `text-primary`)
4. **Typography**: Use Tailwind typography utilities with Poppins font
5. **Responsive**: Use Tailwind breakpoint prefixes (`md:`, `lg:`, etc.)
6. **Custom Values**: Use arbitrary values when needed (`h-[850px]`, `text-[60px]`)

## Notes
- Most Bootstrap classes can remain (Bootstrap is installed)
- Custom ftco-* classes should be converted to Tailwind
- Icon fonts are preserved and imported via CSS
- Background images use inline styles or Tailwind's `bg-[url(...)]` syntax

