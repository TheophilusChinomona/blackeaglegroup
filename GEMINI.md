# Black Eagle Group - Project Context & Instructions

## 1. Project Overview

**Mission:** Transform the Black Eagle Group Holdings static website into a modern, maintainable, and scalable React Single Page Application (SPA).
**Goal:** Achieve 100% feature parity with the existing static site while significantly improving performance (Lighthouse > 90), user experience (mobile responsiveness), and maintainability.

### Key Features
- **Corporate Services:** Detailed listings for Stakeholder Management, Golf Events, Sponsorships, Property Services, etc.
- **Event Management:** Specialized sub-sections for COT (City of Tshwane) and CSIR events with galleries and registration.
- **Contact:** Functional contact forms with validation and API integration.
- **Legacy Support:** PDF downloads and historical data preservation.

## 2. Technology Stack

### Core
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** JavaScript (Note: Project uses `.jsx` files, though standards mention TypeScript. **Stick to `.jsx` and JSDoc for now to match existing code.**)
- **Routing:** React Router v6

### Styling & UI
- **Primary:** Tailwind CSS v3
- **Components:** shadcn/ui (Radix UI primitives + Tailwind). *Note: shadcn components are copied into `src/components/ui`.*
- **Legacy/Compat:** React Bootstrap (specifically for Navigation Bar parity).
- **Animations:** Framer Motion (page transitions, complex animations), AOS (scroll animations).
- **Icons:** Lucide React, React Icons.

### Forms & Data
- **Form Handling:** React Hook Form
- **Validation:** Zod / Yup
- **Testing:** Vitest + React Testing Library

## 3. Directory Structure

### `BlackEagleGroup.React/` (The Active Codebase)
This is where **ALL** implementation work happens.
- `src/components/`: Reusable UI components.
  - `common/`: Header, Footer, Navigation.
  - `ui/`: shadcn/ui primitives (Button, Input, etc.).
  - `features/`: Complex feature-specific components (ContactForm, EventGallery).
- `src/pages/`: Route components (Home, About, Services).
- `src/assets/`: Images, fonts, static resources.
- `public/`: Static files served at root (PDFs, favicon).

### `agent-os/` (The Brain)
Contains project intelligence. **Read-only** unless you are updating specs/status.
- `specs/`: Detailed implementation guides for features (e.g., `2026-01-01-events-page-redesign...`). **Always check here before starting a task.**
- `standards/`: Coding conventions and architectural rules.
- `product/`: Roadmap, mission, and tech stack definitions.

### `public_html/` (Legacy)
The old static website. **Do not modify.** Use only for visual reference or content extraction.

## 4. Agent-OS Workflow

This project uses a structured, file-based workflow managed within the `agent-os/` directory. **Strictly adhere to this process for all development tasks.**

### Phase 1: Task Creation (Using `/create-tasks`)
1.  **Start with a Spec:** Every feature begins with a specification document located in `agent-os/specs/[spec-name]/`.
2.  **Analyze Spec:** Read the `spec.md` and/or `planning/requirements.md` to fully understand the feature requirements.
3.  **Generate Tasks:** Use the `/create-tasks` command. This command analyzes the spec and produces a detailed `tasks.md` file within the spec's directory.
    - **Structure:** Tasks are broken down by specialization (e.g., Database, API, Frontend) and include acceptance criteria.
    - **Testing:** Each task group includes a sub-task for writing a small number of highly focused tests (2-8) *before* implementation.

### Phase 2: Implementation (Using `/implement-tasks`)
This is the primary command for executing the development plan.
1.  **Review `tasks.md`:** Identify the next incomplete task group.
2.  **Implement Sequentially:**
    - Write the focused tests as defined in the task.
    - Implement the code, following project standards and referencing the `spec.md`.
    - Run **only the tests you just wrote** to confirm the implementation works.
    - Use browser/visual testing for UI tasks and save screenshots to `agent-os/specs/[spec-name]/verification/screenshots/`.
3.  **Update `tasks.md`:** After completing a task group, mark its checkboxes as complete (`- [x]`).

**Advanced Alternative: `/orchestrate-tasks`**
For complex features, this command can be used to assign different task groups in `tasks.md` to specialized sub-agents via an `orchestration.yml` file.

### Phase 3: Final Verification
This phase begins automatically after the last task in `tasks.md` is marked as complete.
1.  **Confirm All Tasks Done:** The agent verifies every checkbox in `tasks.md` is checked.
2.  **Update Roadmap:** The main `agent-os/product/roadmap.md` is updated to reflect the completion of the feature.
3.  **Run Full Test Suite:** The **entire** application test suite is executed to catch any regressions.
4.  **Generate Report:** A `final-verification.html` report is created in the spec's `verifications` folder, summarizing task completion, documentation status, and the full test suite results.

## 5. Coding Standards & Conventions
- **Component Style:**
  - **Function Components:** PascalCase (`UserProfile.jsx`).
  - **Props:** Destructure immediately (`function Button({ label, onClick })`).
  - **Conditionals:** Use early returns (`if (loading) return <Spinner />;`).
  - **Clean Code:** Keep components < 300 lines. Extract sub-components if larger.
- **Naming:**
  - **Files:** `PascalCase.jsx` for components, `camelCase.js` for utilities.
  - **Constants:** `camelCase` (e.g., `maxRetries`, not `MAX_RETRIES`).
- **Imports:**
  - Organize: External -> Internal Absolute (`@/...`) -> Relative -> Styles.

## 6. Commands (Run inside `BlackEagleGroup.React/`)
- **Start Dev Server:** `npm run dev`
- **Build Production:** `npm run build`
- **Run Tests:** `npm run test` (or `npm run test:run`)
- **Lint:** `npm run lint`

## 7. Critical Rules

1.  **Safety First:** Never commit API keys or secrets.
2.  **Preserve Legacy:** Ensure all old PDFs and content are accessible in the new React structure.
3.  **No "Blind" Changes:** Always read the relevant file in `agent-os/specs` before coding.
4.  **Maintainability:** Prefer clean, readable code over "clever" one-liners. Use comments to explain *why*, not *what*.
