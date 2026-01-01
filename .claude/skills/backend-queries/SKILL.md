---
name: Backend Queries
description: Write secure, efficient, and maintainable database queries using parameterized statements, proper indexing, transactions, and caching strategies while avoiding N+1 problems and SQL injection vulnerabilities. Use this skill when writing database queries with ORMs or raw SQL, when implementing eager loading to avoid N+1 queries, when using parameterized queries to prevent SQL injection, when selecting specific columns instead of fetching all data, when implementing pagination with skip/take or limit/offset, when adding filtering, sorting, or search functionality, when implementing transactions for related database operations, when setting query timeouts, when caching expensive queries with Redis or in-memory cache, when writing bulk insert/update/delete operations, when optimizing queries with indexes, or when analyzing query performance with EXPLAIN.
---

# Backend Queries

This Skill provides Claude Code with specific guidance on how to adhere to coding standards as they relate to how it should handle backend queries.

## When to use this skill

- When writing database queries using ORM methods or raw SQL
- When implementing eager loading or includes to avoid N+1 queries
- When using parameterized queries to prevent SQL injection
- When selecting specific columns with select() instead of fetching all data
- When implementing pagination (skip/take, limit/offset)
- When adding filtering, sorting, or search functionality to queries
- When implementing transactions for related database operations
- When setting query timeouts to prevent runaway queries
- When caching expensive queries with Redis or in-memory cache
- When writing bulk operations (createMany, updateMany, deleteMany)
- When using DataLoader for batching queries in GraphQL
- When optimizing queries by adding or using indexes
- When analyzing query performance with EXPLAIN or query logging
- When writing aggregation queries (count, sum, average, max, min)

## Instructions

For details, refer to the information provided in this file:
[backend queries](../../../agent-os/standards/backend/queries.md)
