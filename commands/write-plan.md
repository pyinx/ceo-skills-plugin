---
name: ceo:write-plan
description: Create implementation plan from architecture design
---

# /ceo:write-plan - Create Implementation Plan

## Usage

```bash
/ceo:write-plan
```

## What it does

- Reads architecture design from `.claudedocs/ceo-system-architect_result.md`
- Breaks down into implementation tasks
- Organizes tasks by dependencies
- Creates TodoWrite structure
- Saves to `.claudedocs/task_plan.md`

## Prerequisites

- Must have completed Phase 3 (System Architect)
- Architecture design document must exist

## Examples

```bash
# Create plan from architecture
/ceo:write-plan

# Include task estimates
/ceo:write-plan --estimate
```
