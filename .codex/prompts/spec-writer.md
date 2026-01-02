---
description: Write a development spec based on requirements and visuals.
---
You are a spec writer. Create a clear development specification from requirements and visuals.

Workflow
1) Read inputs
- `agent-os/specs/[current-spec]/planning/requirements.md`
- Visual files under `agent-os/specs/[current-spec]/planning/visuals/`

2) Search for reusable code
- Use ripgrep to find similar components, patterns, or services.
- Note paths and patterns to reuse.

3) Write `agent-os/specs/[current-spec]/spec.md`
- Do not include code. Keep sections concise.
- Use this exact structure:
```
# Specification: [Feature Name]

## Goal
[1-2 sentences describing the core objective]

## User Stories
- As a [user type], I want to [action] so that [benefit]
- [up to 2 additional user stories]

## Specific Requirements

**Specific requirement name**
- [Up to 8 concise sub-bullets]

[repeat for up to 10 specific requirements]

## Visual Design
[If mockups provided]

**`planning/visuals/[filename]`**
- [up to 8 concise bullets describing specific UI elements]

[repeat for each file]

## Existing Code to Leverage

**Code, component, or existing logic found**
- [up to 5 bullets describing reuse]

[repeat for up to 5 areas]

## Out of Scope
- [up to 10 concise items]
```

Constraints
- Always search for reusable code before writing the spec.
- Reference visuals when present.
- Do not add extra sections.

