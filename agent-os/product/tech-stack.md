# Black Eagle Group Holdings - Tech Stack

## Overview

This document outlines the complete technology stack for converting the Black Eagle Group Holdings website from static HTML to a modern React application.

---

## Frontend Framework & Core

### React
- **Version**: 18.x (latest stable)
- **Rationale**: Industry-standard, component-based UI library with excellent ecosystem
- **Usage**: Core framework for all UI components and application logic

### React Router
- **Version**: 6.x
- **Rationale**: Standard routing solution for React SPAs
- **Usage**: Client-side routing for all pages (Home, About, Services, Contact, etc.)

### Build Tool
- **Option 1**: Vite (Recommended)
  - **Rationale**: Fast development server, optimized production builds, modern tooling
- **Option 2**: Create React App (CRA)
  - **Rationale**: Stable, well-documented, zero-config setup
- **Decision**: Vite preferred for better performance and developer experience

---

## Styling & UI

### CSS Approach
- **Tailwind CSS v3** (Selected)
  - **Rationale**: Utility-first, rapid development, converts existing CSS easily
  - **Usage**: All styling through utility classes, convert existing CSS from `public_html/css/style.css`

### UI Component System
- **shadcn/ui** (Primary Component System)
  - **Rationale**: Open code components built on Tailwind CSS and Radix UI primitives
  - **Benefits**: 
    - Full control over component code (copy into project, not a library)
    - Beautiful, accessible defaults out-of-the-box
    - Composable interface across all components
    - AI-ready (open code for LLMs to read and modify)
    - Works seamlessly with Tailwind CSS v3
  - **Usage**: Buttons, forms, dialogs, navigation, cards, and other UI components
  - **Installation**: Use shadcn CLI to add components as needed
  - **Reference**: [shadcn/ui Documentation](https://ui.shadcn.com/docs)

- **React Bootstrap** (Selective Use)
  - **Rationale**: For navigation components that match existing Bootstrap navbar structure
  - **Usage**: Navigation menu/navbar to maintain exact Bootstrap styling from original site
  - **Note**: Can be replaced with shadcn/ui Navigation Menu component if preferred

### Icons
- **React Icons**
  - **Rationale**: Unified icon library supporting multiple icon sets (including existing Ionicons, Font Awesome)
  - **Usage**: Social media icons, UI icons, navigation icons

### Animations
- **Framer Motion** or **React Spring**
  - **Rationale**: Modern animation libraries for React
  - **Usage**: Page transitions, scroll animations, hover effects
- **AOS (Animate On Scroll)** - React wrapper
  - **Rationale**: Maintain existing scroll animations from current site

---

## Forms & Validation

### Form Handling
- **React Hook Form**
  - **Rationale**: Performant, minimal re-renders, easy validation
  - **Usage**: Contact form, newsletter signup

### Validation
- **Yup** or **Zod**
  - **Rationale**: Schema-based validation, integrates well with React Hook Form
  - **Usage**: Form field validation

---

## Image & Media Handling

### Image Optimization
- **react-image** or **next/image** (if using Next.js)
  - **Rationale**: Lazy loading, responsive images, optimization
- **WebP** format support
  - **Rationale**: Better compression, faster loads

### Image Galleries
- **react-image-gallery** or **react-lightbox**
  - **Rationale**: Feature-rich gallery components with lightbox functionality
  - **Usage**: Event galleries, project showcases

### Video
- **react-player**
  - **Rationale**: Unified player for YouTube, Vimeo, and other video sources
  - **Usage**: YouTube video embeds

---

## HTTP & API

### HTTP Client
- **Axios** or **Fetch API**
  - **Rationale**: Promise-based HTTP client for API calls
  - **Usage**: Contact form submissions, future API integrations

### API Integration
- **Backend**: Node.js/Express or PHP API endpoint
  - **Rationale**: Handle contact form submissions, future CMS integration
  - **Alternative**: Email service (SendGrid, Mailgun) for direct form submissions

---

## State Management

### Local State
- **React Hooks** (useState, useEffect, useContext)
  - **Rationale**: Built-in React state management for component-level state

### Global State (if needed)
- **Context API** or **Zustand**
  - **Rationale**: Lightweight state management for shared data (user preferences, theme)
  - **Usage**: Navigation state, theme preferences, user data

---

## Development Tools

### Code Quality
- **ESLint**
  - **Rationale**: Code linting and style enforcement
  - **Config**: Airbnb or Standard React config

- **Prettier**
  - **Rationale**: Code formatting for consistency

### Type Safety
- **TypeScript** (Optional but Recommended)
  - **Rationale**: Type safety, better IDE support, fewer runtime errors
  - **Decision**: Consider for larger codebase, optional for initial migration

---

## Testing

### Unit Testing
- **Jest**
  - **Rationale**: Standard React testing framework

- **React Testing Library**
  - **Rationale**: Component testing best practices

### E2E Testing
- **Playwright** or **Cypress**
  - **Rationale**: End-to-end testing for critical user flows
  - **Usage**: Contact form submission, navigation flows

---

## Performance & Optimization

### Code Splitting
- **React.lazy()** and **Suspense**
  - **Rationale**: Lazy load routes and components for better performance

### Bundle Analysis
- **webpack-bundle-analyzer** or **vite-bundle-visualizer**
  - **Rationale**: Analyze and optimize bundle size

### Performance Monitoring
- **Web Vitals**
  - **Rationale**: Monitor Core Web Vitals (LCP, FID, CLS)

---

## SEO & Meta

### SEO
- **react-helmet-async** or **react-helmet**
  - **Rationale**: Dynamic meta tags for SEO
  - **Usage**: Page titles, descriptions, Open Graph tags

### Structured Data
- **JSON-LD** implementation
  - **Rationale**: Rich snippets for search engines

### Sitemap & Robots
- **react-router-sitemap** or manual generation
  - **Rationale**: Generate sitemap for search engines

---

## Accessibility

### Tools
- **eslint-plugin-jsx-a11y**
  - **Rationale**: Accessibility linting rules

- **@axe-core/react**
  - **Rationale**: Accessibility testing in development

### Standards
- **WCAG 2.1 AA** compliance
  - **Rationale**: Web accessibility standards

---

## Deployment & Hosting

### Hosting Options
- **Netlify** (Recommended)
  - **Rationale**: Easy deployment, CDN, form handling, free tier
- **Vercel**
  - **Rationale**: Optimized for React, excellent performance
- **AWS Amplify** or **CloudFront**
  - **Rationale**: Scalable, enterprise-grade hosting

### CI/CD
- **GitHub Actions** or **GitLab CI**
  - **Rationale**: Automated testing and deployment

### Environment Variables
- **dotenv**
  - **Rationale**: Manage environment-specific configuration

---

## Third-Party Integrations

### Maps
- **@react-google-maps/api** or **react-google-maps**
  - **Rationale**: Google Maps integration for contact page
  - **Usage**: Office location map

### Analytics
- **Google Analytics 4** (GA4)
  - **Rationale**: Website analytics and user tracking

### Social Media
- **react-share**
  - **Rationale**: Social media sharing buttons

---

## Migration Tools & Utilities

### HTML to React
- **Manual conversion** (Recommended)
  - **Rationale**: Full control, proper component structure
- **html-to-react** (for initial parsing, if needed)
  - **Rationale**: Automated HTML parsing for quick start

### Asset Management
- **Public folder** for static assets
  - **Rationale**: Images, PDFs, fonts in public directory
- **Import statements** for component assets
  - **Rationale**: Optimized asset bundling

---

## Package Management

### Package Manager
- **npm** or **yarn** or **pnpm**
  - **Rationale**: Dependency management
  - **Decision**: npm (standard) or pnpm (faster, disk-efficient)

---

## Browser Support

### Target Browsers
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Polyfills
- **core-js** or **@babel/polyfill** (if needed)
  - **Rationale**: Support for older browsers if required

---

## Development Environment

### Node.js
- **Version**: 18.x LTS or 20.x
  - **Rationale**: Stable, long-term support

### Editor/IDE
- **VS Code** (Recommended)
  - **Extensions**: ESLint, Prettier, React snippets

### Version Control
- **Git**
  - **Rationale**: Source code version control

---

## Project Structure

```
black-eagle-react/
├── public/
│   ├── images/
│   ├── fonts/
│   ├── pdfs/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Navigation/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── About/
│   │   │   ├── Services/
│   │   │   └── Contact/
│   │   └── features/
│   │       ├── ContactForm/
│   │       ├── ServiceCard/
│   │       └── ImageGallery/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js (or similar)
```

---

## Dependencies Summary

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "tailwindcss": "^3.4.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0",
  "@radix-ui/react-*": "varies by component",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.0",
  "tailwind-merge": "^2.2.0",
  "react-bootstrap": "^2.9.0",
  "bootstrap": "^5.3.0"
}
```

**Note**: shadcn/ui components are installed via CLI (`npx shadcn@latest add [component]`) which copies component code into your project and installs necessary Radix UI dependencies automatically.

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.0.0",
  "eslint": "^8.55.0",
  "prettier": "^3.1.0"
}
```

### Additional Dependencies
```json
{
  "react-hook-form": "^7.49.0",
  "yup": "^1.3.0",
  "axios": "^1.6.0",
  "react-icons": "^4.12.0",
  "react-helmet-async": "^2.0.0",
  "@react-google-maps/api": "^2.19.0",
  "lucide-react": "^0.344.0"
}
```

**shadcn/ui Components**: Install as needed via CLI:
- `npx shadcn@latest add button` - For buttons
- `npx shadcn@latest add form` - For form components (works with React Hook Form)
- `npx shadcn@latest add card` - For service/client cards
- `npx shadcn@latest add dialog` - For modals/dialogs
- `npx shadcn@latest add navigation-menu` - For navigation (alternative to React Bootstrap)
- `npx shadcn@latest add input` - For form inputs
- `npx shadcn@latest add textarea` - For text areas
- `npx shadcn@latest add label` - For form labels
- `npx shadcn@latest add spinner` - For loading states
- And more as needed

---

## Migration Considerations

### Existing Assets
- **Images**: Migrate to `public/images/` or use import for optimization
- **Fonts**: Migrate to `public/fonts/` or use web fonts
- **PDFs**: Keep in `public/` for direct linking
- **CSS**: Convert to CSS Modules or maintain global styles

### jQuery Dependencies
- **Replace jQuery plugins** with React equivalents:
  - Owl Carousel → react-owl-carousel or swiper
  - Magnific Popup → react-image-gallery or react-lightbox
  - AOS → react-aos or CSS transitions (lightweight approach)
  - Bootstrap JS → React Bootstrap components or shadcn/ui Navigation Menu
  - Form validation → shadcn/ui Form components with React Hook Form + Yup

### PHP Backend
- **Contact Form**: Convert to API endpoint (Node.js/Express or keep PHP API)
- **Email Service**: Use SendGrid, Mailgun, or similar service

---

## Performance Targets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Bundle Size**: < 200KB (gzipped) for initial load

---

## Security Considerations

- **Environment Variables**: Never commit API keys or secrets
- **XSS Protection**: React's built-in XSS protection, sanitize user inputs
- **HTTPS**: Enforce HTTPS in production
- **Content Security Policy**: Implement CSP headers
- **Dependency Updates**: Regular security updates for dependencies

---

## Documentation Requirements

- **README.md**: Setup instructions, development guide
- **Component Documentation**: Storybook or similar (optional)
- **API Documentation**: If backend APIs are created
- **Deployment Guide**: Step-by-step deployment instructions

---

## Notes

- This tech stack is designed for a modern, maintainable React application
- All choices prioritize developer experience, performance, and maintainability
- Consider team expertise when making final decisions
- Stack can be adjusted based on specific requirements or constraints

