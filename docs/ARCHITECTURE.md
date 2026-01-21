# CEO Skills Architecture

## Overview

CEO Skills is a full-stack development team orchestrator that coordinates 6 specialized agents through a complete development workflow, integrated with 12 Superpowers framework skills.

## Components

### 6 Professional Agents

| Agent | Role | Phase |
|-------|------|-------|
| ceo-product-manager | Product Requirements | Phase 1 |
| ceo-ui-ux-designer | User Experience Design | Phase 2 |
| ceo-system-architect | Technical Architecture | Phase 3 |
| ceo-fullstack-developer | Implementation | Phase 4 |
| ceo-test-engineer | Testing & QA | Phase 5 |
| ceo-marketing-specialist | Documentation & Deployment | Phase 6 |

### 11 Integrated Skills

#### Core Workflow Skills (7)

1. **ceo** - Main orchestrator
2. **brainstorming** - Requirement exploration (Phase 0)
3. **using-git-worktrees** - Workspace isolation (Phase 3.5)
4. **subagent-driven-dev** - Subtask execution (Phase 4)
5. **tdd** - Test-driven development (Phase 4.5)
6. **parallel-dispatch** - Parallel execution (Phase 5)
7. **two-stage-review** - Code quality assurance (Phase 4)

#### Enhancement Skills (5)

8. **planning-with-files** - State management (All phases)
9. **frontend-design** - UI generation (Phase 2, 4)
10. **ui-ux-pro-max** - UI/UX enhancement (Phase 2, 4)
11. **webapp-testing** - E2E testing (Phase 5)

## Workflow Phases

```
User Input
    ↓
Phase 0: Brainstorming (requirement exploration)
    ↓
Phase 1: Product Manager (PRD generation)
    ↓
Phase 2: UI/UX Designer (user stories & interaction design)
    ↓
Phase 3: System Architect (technical architecture)
    ↓
Phase 3.5: Git Worktrees (isolated workspace)
    ↓
Phase 4: Fullstack Developer (TDD + two-stage review)
    ↓
Phase 5: Test Engineer (parallel test fixing)
    ↓
Phase 6: Marketing Specialist (deployment docs)
    ↓
Complete
```

## State Management

Uses **planning-with-files** three-file system:

- `.claudedocs/task_plan.md` - Current phase, progress, goals
- `.claudedocs/notes.md` - Research notes, user answers
- `.claudedocs/deliverable.md` - All phase outputs

## Integration Points

### Superpowers Framework

CEO Skills v6.1.0 deeply integrates Superpowers:

- **Phase 0**: Uses `brainstorming` for natural dialogue exploration
- **Phase 3.5**: Uses `using-git-worktrees` for safe workspace isolation
- **Phase 4**: Uses `subagent-driven-dev` + `two-stage-review` for quality code
- **Phase 4.5**: Enforces `tdd` RED-GREEN-REFACTOR cycle
- **Phase 5**: Uses `parallel-dispatch` for independent test failure fixes

### Continuous State Tracking

- `planning-with-files` maintains state across all phases
- CEO reads `task_plan.md` at phase transitions to stay aligned
- Progress tracked automatically through TodoWrite

## Quality Gates

3 Mandatory Checkpoints:

1. **Phase 1**: PRD approval
2. **Phase 3**: Architecture approval
3. **Final**: Project completion summary

All other phases are automatic with two-stage review replacing manual checkpoints.

## Design Principles

1. **流程自洽**: Complete, non-redundant, naturally connected workflow
2. **保留自动化**: Maximum automation, minimal human intervention
3. **符合规范**: Follows Claude Skill standards, uses native CLI capabilities
