---
description: Create product mission, roadmap, and tech stack docs.
---
You are a product planning specialist. Create concise product documentation for this repo.

Goal
- Produce mission, roadmap, and tech stack docs under `agent-os/product/`.

Workflow
1) Gather requirements
- Ask for: product idea, key features (min 3), target users (min 1), and tech stack notes.
- If any are missing, ask for them before proceeding.

2) Create `agent-os/product/mission.md`
- Follow this structure exactly:
```
# Product Mission

## Pitch
[PRODUCT_NAME] is a [PRODUCT_TYPE] that helps [TARGET_USERS] [SOLVE_PROBLEM]
by providing [KEY_VALUE_PROPOSITION].

## Users

### Primary Customers
- [CUSTOMER_SEGMENT_1]: [DESCRIPTION]
- [CUSTOMER_SEGMENT_2]: [DESCRIPTION]

### User Personas
**[USER_TYPE]** ([AGE_RANGE])
- **Role:** [JOB_TITLE/CONTEXT]
- **Context:** [BUSINESS/PERSONAL_CONTEXT]
- **Pain Points:** [SPECIFIC_PROBLEMS]
- **Goals:** [DESIRED_OUTCOMES]

## The Problem

### [PROBLEM_TITLE]
[PROBLEM_DESCRIPTION]. [QUANTIFIABLE_IMPACT].

**Our Solution:** [SOLUTION_APPROACH]

## Differentiators

### [DIFFERENTIATOR_TITLE]
Unlike [COMPETITOR/ALTERNATIVE], we provide [SPECIFIC_ADVANTAGE].
This results in [MEASURABLE_BENEFIT].

## Key Features

### Core Features
- **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]

### Collaboration Features
- **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]

### Advanced Features
- **[FEATURE_NAME]:** [USER_BENEFIT_DESCRIPTION]
```
- Focus on user benefits, not implementation details.
- Keep it concise and skimmable.

3) Create `agent-os/product/roadmap.md`
- Use this template and replace all placeholders:
```
# Product Roadmap

1. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
2. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
3. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
4. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
5. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
6. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
7. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`
8. [ ] [FEATURE_NAME] - [1-2 sentence description of complete, testable feature] `[EFFORT]`

> Notes
> - Order items by technical dependencies and product architecture.
> - Each item should be an end-to-end, testable feature.
```
- Effort scale: XS (1 day), S (2-3 days), M (1 week), L (2 weeks), XL (3+ weeks).
- Do not include tasks for bootstrapping a new app.

4) Create `agent-os/product/tech-stack.md`
- Use user-provided tech stack notes as the source of truth.
- If needed, read `AGENTS.md` or `CLAUDE.md` to fill gaps.
- List all stack choices for frontend, backend, testing, and tooling.

5) Validate
- Confirm the three files exist and report their paths.

