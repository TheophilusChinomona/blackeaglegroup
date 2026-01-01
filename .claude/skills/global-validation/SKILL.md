---
name: Global Validation
description: Implement validation at multiple layers (client-side for UX, server-side for security) with specific error messages, allowlist patterns, type checking, input sanitization, and business rule validation. Use this skill when implementing server-side validation (always required for security), when adding client-side validation for immediate user feedback, when validating input types, formats, ranges, and required fields, when providing clear field-specific error messages, when implementing allowlist validation patterns instead of blocklists, when sanitizing user input to prevent injection attacks (SQL, XSS, command injection), when validating business rules (sufficient balance, valid dates, etc.), when ensuring consistent validation across all entry points (web forms, API endpoints, background jobs), when using validation libraries (FluentValidation, Zod, Yup, class-validator), or when implementing form validation with proper error display.
---

# Global Validation

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle global validation.

## When to use this skill

- When implementing server-side validation (always required for security)
- When adding client-side validation for immediate user feedback
- When validating input types, formats, ranges, and required fields
- When providing clear, field-specific error messages to users
- When implementing allowlist validation patterns
- When sanitizing user input to prevent injection attacks
- When validating business rules (balance checks, date validation, etc.)
- When ensuring consistent validation across all entry points
- When using validation libraries (FluentValidation, Zod, Yup, Joi)
- When implementing form validation with React Hook Form or similar
- When creating validation schemas or rules
- When handling validation errors and displaying them to users
- When validating API request payloads
- When implementing custom validation rules

## Instructions

For details, refer to the information provided in this file:
[global validation](../../../agent-os/standards/global/validation.md)
