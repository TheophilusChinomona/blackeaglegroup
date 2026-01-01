# Spec Initialization

**Date:** 2025-12-21  
**Spec Name:** Homepage Spacing & Events Integration  
**Status:** Initialized

## Overview

This spec addresses:
1. **Homepage spacing issues** - Fixing visual spacing between sections on the homepage
2. **Section reordering** - Reorganizing homepage sections for better flow
3. **Events integration** - Migrating COT and CSIR/CASSI event websites from separate HTML files into the React app as integrated pages

## Context

- Current homepage has spacing issues between sections causing poor visual appearance
- Events are currently displayed as external links to separate HTML websites:
  - `/public_html/COT/` - COT & BEG-Holdings Management Golf Day
  - `/public_html/csir/cassi/` - CSIR Golf Day
- Events data structure already exists in `BlackEagleGroup.React/src/data/events.json`
- React app has routes for events but they're not fully implemented
- Need to convert static HTML event pages into React components

## Related Specs

- `2025-12-21-homepage-redesign` - Previous homepage work
- `2025-12-21-homepage-sections-visual-improvements` - Visual improvements work
- `2025-12-20-phase-3-event-galleries-subsites` - Event galleries work

