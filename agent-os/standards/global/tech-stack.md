# Tech Stack

This document defines the technical stack used across all theo.dev projects.

## Primary Languages

### TypeScript (Primary)
- **Usage:** Frontend (React, Next.js), Backend (Bun)
- **Version:** Latest stable
- **Configuration:** Strict mode always enabled
- **Why:** Type safety, better tooling, catch bugs early

### Python
- **Usage:** Scripting, data processing, automation
- **Version:** 3.10+
- **Why:** Excellent for data manipulation and scripts

### C# / .NET
- **Usage:** Backend services, enterprise applications
- **Version:** .NET 8.0+
- **Why:** High performance, strong typing, enterprise support

### JavaScript
- **Usage:** Only when TypeScript isn't feasible
- **Why:** Legacy support or specific tooling requirements

---

## Frontend Stack

### Framework & Runtime

**React + Vite (Primary)**
- **Usage:** SPAs, dashboards, internal tools, rapid prototyping
- **Version:** React 18/19, Vite latest
- **Why:** Better ecosystem support, faster development
- **Build Tool:** Vite (fast HMR, modern bundling)

**Next.js (Secondary)**
- **Usage:** When Next.js has better support for specific features
- **Version:** Latest stable
- **Why:** SSR/SSG capabilities, personal project exploration

**Decision Matrix:**
- Use React + Vite when library/tooling support is better
- Use Next.js when it has superior feature support or for personal projects

### UI Components

**Strategy:** Hybrid approach based on availability and visual preference

**Component Libraries:**
- **Radix UI primitives** (shadcn/ui pattern) - Copy/paste approach
- **Custom components** - Build when library options don't exist or don't look right
- **Flexibility:** Choose based on what produces the best visual result

**Styling:**
- **Tailwind CSS** - Default choice for utility-first styling
- **CSS Modules** - When Tailwind doesn't achieve desired look
- **Custom CSS** - When other approaches don't produce desired visual result
- **Philosophy:** Visual result matters more than methodology

### State Management

**Structured approach by use case:**

1. **Server State** → TanStack Query (or SWR)
   - All data from APIs/Firebase
   - Handles caching, refetching, loading states
   - Reduces need for manual state management

2. **Global Client State** → Zustand
   - App-wide UI state (modals, themes, user preferences)
   - Auth state (if not handled by Context)
   - Cross-component shared state

3. **Local Component State** → useState
   - Form inputs (before submission)
   - Component-specific UI (accordions, tabs)
   - Temporary state that doesn't need sharing

4. **Form State** → React Hook Form + Zod
   - All forms use React Hook Form
   - Schema validation with Zod
   - Type-safe form handling

5. **Context API** → Dependency injection only
   - Auth provider
   - Theme provider
   - NOT for frequently changing state

---

## Backend Stack

### Bun
- **Framework:** Express (simple), Fastify (performance), NestJS (enterprise structure)
- **Version:** Latest stable
- **Package Manager:** bun (default)
- **Usage:** REST APIs, serverless functions, backend services
- **Why:** 4x faster startup than Node.js, TypeScript/JSX support out of the box, drop-in Node.js replacement
- **Reference:** [Bun Documentation](https://bun.com/docs)

### .NET
- **Framework:** ASP.NET Core Web API
- **Version:** .NET 8.0+
- **API Style:** Minimal APIs or Controllers based on complexity
- **Usage:** Enterprise backend services, high-performance APIs

### API Architecture

**Decision Matrix:**

1. **REST (Default)**
   - Use for standard CRUD operations
   - Simple, well-understood
   - Good tooling support
   - Default choice unless limitations are hit

2. **GraphQL**
   - Use when REST can't handle complexity
   - Complex data relationships
   - Frontend needs flexible queries

3. **tRPC**
   - Use for full TypeScript stacks
   - End-to-end type safety critical
   - Internal APIs only

4. **Custom Endpoints**
   - File uploads
   - Webhooks
   - Third-party integrations
   - Specialized functionality not covered by REST

---

## Database & Storage

**Philosophy:** Google Cloud + Firebase ecosystem as primary choice

### Primary: Firebase/Google Cloud

**Firestore (Default)**
- NoSQL document database
- Real-time capabilities
- Serverless, scales automatically
- **Usage:** Most applications, real-time features

**Cloud SQL**
- PostgreSQL or MySQL
- **Usage:** When relational model or complex queries needed

**Cloud Storage**
- File and blob storage
- **Usage:** Images, videos, PDFs, user uploads

**Firebase Realtime Database**
- **Usage:** Only if Firestore doesn't fit specific use case

### Alternative Databases
- Only when Google Cloud/Firebase cannot meet specific project requirements
- Justify decision in project documentation

### ORMs / Query Builders

**Bun:**
- Prisma (recommended for TypeScript projects)
- TypeORM (alternative)
- Raw queries when ORM overhead not justified

**.NET:**
- Entity Framework Core (standard)

**Python:**
- SQLAlchemy (complex projects)
- Raw queries (simple scripts)

---

## Authentication & Authorization

### Authentication

**Primary: Firebase Authentication**
- Email/password
- Social providers (Google, GitHub, etc.)
- Phone authentication
- **Why:** Reliable, secure, well-tested, integrated with Firebase

### Authorization

**Strategy: Simple roles with server-side enforcement**

**Firebase Projects:**
- Firebase Security Rules for enforcement
- Simple role structure (e.g., admin, manager, member, user)
- Leverage built-in security

**Custom Backend (.NET/Bun):**
- Firebase Auth tokens for authentication
- Custom middleware for authorization logic
- Use middleware when business logic is complex

**Complex Authorization:**
- Always use middleware (even in Firebase Functions)
- Multi-step flows
- Attribute-based access control

---

## Deployment & Infrastructure

### Containerization

**Docker (Always)**
- Dockerfile in every project
- Docker Compose for local development
- Consistent environments dev → production

### CI/CD

**Google Cloud Build**
- Runs after local Docker testing succeeds
- Automated pipeline for builds and deployments

**GitHub Actions**
- Linting, type-checking, tests
- All checks run automatically
- Deployment requires manual approval

### Deployment Targets

**Flexible based on project needs:**

- **Google Cloud Run** - Containerized applications
- **Firebase Hosting** - Static sites, Next.js apps
- **Cloud Functions** - Serverless functions
- **cPanel** - Client-specific frontend deployments
- **Vercel/Netlify** - When better suited for Next.js

**Project decides deployment target based on:**
- Requirements
- Client preferences
- Cost considerations
- Performance needs

### Environments

**Two-tier approach:**
- **Development** - Local and staging combined
- **Production** - Live environment

**No separate staging environment unless project requires it**

---

## Third-Party Services

### Primary (Google Ecosystem)
- **Google Cloud Logging (Stackdriver)** - Logging and monitoring
- **Google Cloud Secret Manager** - Production secrets
- **Firebase services** - Auth, Firestore, Storage, Hosting, Functions

### Optional Services
- **Sentry** - Error tracking with context (optional, use for critical apps)
- **Vercel/Netlify** - Frontend hosting when better suited

### Email
- Service depends on project requirements
- Options: SendGrid, Postmark, Cloud provider email

---

## Development Tools

### Code Editors
- **VS Code** (primary)
- Any editor with TypeScript/language support

### Version Control
- **Git** (required)
- **GitHub** (hosting, CI/CD, collaboration)

### Package Managers
- **bun** - Bun/JavaScript/TypeScript (default)
- **pip** - Python
- **NuGet** - .NET

---

## Browser Support

### Modern Browsers Only
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

**No IE11 support**

---

## Notes

- This tech stack prioritizes Google Cloud ecosystem for cost and integration
- Alternative technologies allowed when justified by project requirements
- Document deviations from this stack in project README
- Stack evolves - update this document when adopting new technologies
