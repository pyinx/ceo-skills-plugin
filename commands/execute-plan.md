---
name: ceo:execute-plan
description: Execute existing implementation plan with subagent-driven development
---

# /ceo:execute-plan - Execute Implementation Plan

## Usage

```bash
/ceo:execute-plan
```

## What it does

- Reads existing task plan from `.claudedocs/task_plan.md`
- Breaks down into 2-5 minute subtasks
- Dispatches independent subagents per task
- Performs two-stage code review (spec compliance + quality)
- Tracks progress with TodoWrite

## Prerequisites

- Must have `.claudedocs/task_plan.md` from Phase 3 (System Architect)
- Architecture design must be completed

## Examples

```bash
# Continue from where you left off
/ceo:execute-plan

# Execute with specific phase
/ceo:execute-plan --phase=4
```
