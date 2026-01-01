---
name: Backend Models
description: Define database models with proper naming conventions, data types, constraints, indexes, and relationships following entity framework or ORM best practices. Use this skill when creating new database entity models, when defining model properties and data types, when adding timestamps (created_at, updated_at) to models, when setting up database constraints (NOT NULL, UNIQUE, DEFAULT), when defining foreign key relationships and cascade behaviors, when creating indexes on frequently queried fields, when implementing validation at multiple layers (application, model, database), when defining one-to-many, many-to-many, or one-to-one relationships, when choosing between normalization and denormalization strategies, or when implementing common patterns like soft deletes, enums, or JSON fields.
---

# Backend Models

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle backend models.

## When to use this skill

- When creating new entity model classes or files
- When defining model properties with appropriate data types
- When adding timestamp fields (created_at, updated_at) to models
- When setting database constraints (NOT NULL, UNIQUE, DEFAULT, CHECK)
- When defining foreign key relationships between models
- When specifying cascade behaviors (Cascade, SetNull, Restrict)
- When adding indexes to foreign keys or frequently queried fields
- When creating compound indexes for complex queries
- When implementing validation rules at model level
- When defining one-to-many, many-to-many, or one-to-one relationships
- When choosing appropriate data types (String, Int, Decimal, Boolean, DateTime, Json)
- When implementing soft delete patterns
- When creating enum types for models
- When balancing normalization with performance needs

## Instructions

For details, refer to the information provided in this file:
[backend models](../../../agent-os/standards/backend/models.md)
