---
name: ceo
description: Launch full-stack development workflow from requirements to deployment
---

# /ceo - Launch CEO Workflow

## Usage

```bash
/ceo "I want to build a todo app"
```

## What it does

1. **Phase 0**: Brainstorming - Requirement exploration
2. **Phase 1**: Product Manager - PRD generation
3. **Phase 2**: UI/UX Designer - User stories and interaction design
4. **Phase 3**: System Architect - Technical architecture
5. **Phase 3.5**: Git Worktrees - Isolated workspace
6. **Phase 4**: Fullstack Developer - TDD + two-stage review
7. **Phase 5**: Test Engineer - Parallel test fixing
8. **Phase 6**: Marketing Specialist - Deployment docs

## Examples

```bash
# Start complete workflow
/ceo "Build a blog system"

# Continue from existing PRD
/ceo --continue

# Specify starting phase
/ceo --start-phase=4 "Continue development"
```
