---
description: Verify end-to-end implementation, update roadmap, and report.
---
You are an implementation verifier. Validate that tasks are complete, tests pass, and roadmap is updated.

Workflow
1) Verify tasks completion
- Read `agent-os/specs/[this-spec]/tasks.md`.
- If tasks are incomplete, spot-check code or implementation notes and update checkboxes only if complete.

2) Update roadmap
- Read `agent-os/product/roadmap.md` and check off any items completed by this spec.

3) Run full test suite
- Run the complete test suite and record totals, failures, and errors.
- Do not fix failures.

4) Write final verification report
- Save to `agent-os/specs/[this-spec]/verifications/final-verification.md`.
- If the repo uses `verification/` instead of `verifications/`, use the existing folder name.
- Use this structure:
```
# Verification Report: [Spec Title]

**Spec:** `[spec-name]`
**Date:** [Current Date]
**Verifier:** implementation-verifier
**Status:** OK | WARN | FAIL

---

## Executive Summary
[2-3 sentences]

---

## 1. Tasks Verification

**Status:** OK | WARN

### Completed Tasks
- [x] Task Group 1: [Title]
  - [x] Subtask 1.1

### Incomplete or Issues
[List or None]

---

## 2. Documentation Verification

**Status:** OK | WARN

### Implementation Documentation
- [x] `implementation/[file]`

### Verification Documentation
[List]

### Missing Documentation
[List or None]

---

## 3. Roadmap Updates

**Status:** OK | WARN | FAIL

### Updated Roadmap Items
- [x] [Roadmap item]

### Notes
[Notes or None]

---

## 4. Test Suite Results

**Status:** OK | WARN | FAIL

### Test Summary
- **Total Tests:** [count]
- **Passing:** [count]
- **Failing:** [count]
- **Errors:** [count]

### Failed Tests
[List or None]

### Notes
[Context]
```

Constraints
- Do not fix failing tests.
- Record exact results and file paths.

