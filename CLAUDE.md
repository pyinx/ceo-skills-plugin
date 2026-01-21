# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CEO Skills is a Claude Code plugin that orchestrates a full-stack development workflow from requirements to deployment. It coordinates 6 specialized agents (product, design, architecture, development, testing, marketing) integrated with 11 Superpowers framework skills.

**Current Version**: 6.1.0

## Development Commands

### Installation & Testing

```bash
# Manual installation (local development)
./scripts/install.sh

# Verify installation
./scripts/verify.sh

# Uninstall
./scripts/uninstall.sh

# Marketplace installation (production)
claude plugin marketplace add https://github.com/pyinx/ceo-skills-plugin.git
claude plugin install ceo-skills@ceo-skills-marketplace

# Update plugin
claude plugin marketplace update ceo-skills-marketplace
claude plugin update ceo-skills@ceo-skills-marketplace
```

### Version Management

**After any code changes**, update version numbers in:
1. `README.md` - Line 112: `**版本**: X.X.X`
2. `.claude-plugin/marketplace.json` - Line 13: `"version": "X.X.X"`
3. `skills/ceo/SKILL.md` - Line 3: `version: X.X.X`

**Version bumping rules**:
- Major version (X.0.0): Breaking changes, architectural redesigns
- Minor version (x.X.0): New features, significant enhancements
- Patch version (x.x.X): Bug fixes, small improvements

**Always ensure README.md documentation accuracy after changes.**

## Architecture

### Component Structure

```
ceo-skills-plugin/
├── agents/           # 6 specialized agents (markdown definitions)
├── skills/           # 12 skills (ceo orchestrator + 11 superpowers)
├── commands/         # 4 user-invocable commands (/ceo, /ceo:brainstorm, etc.)
├── scripts/          # Installation, verification, uninstallation
├── docs/             # Architecture, installation, version history
└── .claude-plugin/   # Plugin metadata (marketplace.json)
```

### Workflow Orchestration

**Main orchestrator**: `skills/ceo/SKILL.md`

The CEO skill manages a 6-phase workflow:
1. **Phase 0**: Brainstorming (requirement exploration via Superpowers)
2. **Phase 1**: Product Manager → PRD generation
3. **Phase 2**: UI/UX Designer → user stories & interaction design
4. **Phase 3**: System Architect → technical architecture
5. **Phase 3.5**: Git Worktrees → isolated workspace (via Superpowers)
6. **Phase 4**: Fullstack Developer → TDD + two-stage review (via Superpowers)
7. **Phase 5**: Test Engineer → parallel test fixing (via Superpowers)
8. **Phase 6**: Marketing Specialist → deployment docs

### Critical Pattern: Agent Synchronization

**All agent calls MUST follow this pattern** (v6.1.0 fix for checkpoint enforcement):

```markdown
### Call [Agent Name] agent

⚠️ **IMPORTANT**: Execute the following steps in order...

**Step 1: Launch agent**
```
Task tool: Launch the [agent-name] agent with context...
Save the returned task_id as {AGENT_TASK_ID}
```

**Step 2: Wait for agent completion**
```
TaskOutput: Wait for {AGENT_TASK_ID}
Parameters: block=true, timeout=300000

⚠️ CRITICAL: DO NOT PROCEED until agent completes
```

**Step 3: Verify output file exists**
```
Read file: .claudedocs/[agent-name]_result.md
⚠️ If file doesn't exist, agent failed - inform user
```

After agent completes and output is verified, proceed to next step.
```

**Why this matters**: Without `TaskOutput` with `block=true`, agents run asynchronously and the workflow skips mandatory user confirmation checkpoints.

### Mandatory User Checkpoints

Two checkpoints require user approval before proceeding:
- **Phase 1** (Line ~288): PRD confirmation via `AskUserQuestion`
- **Phase 3** (Line ~497): Architecture confirmation via `AskUserQuestion`

These checkpoints ONLY work if the agent synchronization pattern above is followed correctly.

### State Management

Uses `.claudedocs/` directory for state persistence:
- `task_plan.md` - Current phase, progress tracking, checkboxes
- `notes.md` - Research notes, user answers
- `phase0-design.md` - Brainstorming output
- `ceo-[agent-name]_result.md` - Each phase's output document

CEO reads `task_plan.md` at each phase to support resume capability.

### Superpowers Integration

CEO v6.0+ integrates these Superpowers framework skills:
- **Phase 0**: `brainstorming` skill (natural dialogue exploration)
- **Phase 3.5**: `using-git-worktrees` skill (workspace isolation)
- **Phase 4**: `subagent-driven-dev` + `two-stage-review` (quality code)
- **Phase 5**: `parallel-dispatch` (parallel test failure fixes)

**Superpowers skill invocation pattern**:
```markdown
Invoke the [skill-name] skill (from superpowers), execute it, then continue to [next phase].
```

Avoid "follow it exactly" language which can cause infinite loops.

## Key Constraints

### Agent/Skill Invocation

1. **Never use recursive patterns** in commands that trigger themselves
2. **Use "execute and continue"** for Superpowers skills, not "follow it exactly"
3. **Always use TaskOutput with block=true** when waiting for agents
4. **Verify output files exist** before proceeding to next phase

### Question Limits

Agents must enforce "maximum 5 questions per batch" rule to avoid overwhelming users. This is documented in:
- `skills/ceo/SKILL.md` - Passed as constraint to agents
- `agents/ceo-product-manager.md` - Best practices section (Line ~560)

### Tool Permissions

CEO skill allows these tools (Line 7-19):
- `Task`, `TodoWrite`, `Read`, `Write`, `Edit`, `Glob`, `Grep`
- `Bash(git:*)`, `Bash(npm:*)`, `Bash(python:*)`, `Bash(pip:*)`
- All MCP tools (`mcp__.*`)

## Common Issues & Solutions

### Issue: Workflow skips user confirmation checkpoints

**Root cause**: Agent calls without `TaskOutput` synchronization
**Fix**: Add Step 2 (TaskOutput wait) and Step 3 (verify output) to all agent calls
**Reference**: v6.1.0 commit "feat: 修复强制用户确认检查点未生效问题"

### Issue: Infinite loop when invoking CEO command

**Root cause**: Command uses "Invoke the ceo skill" which triggers skill description keywords
**Fix**: Use "Execute the CEO orchestrator workflow directly" instead
**Reference**: v6.0.0 commit "fix: 修复 command 调用 skill 的死循环问题"

### Issue: Agents ask too many questions at once

**Root cause**: Missing question constraint enforcement
**Fix**: Ensure agent context includes "最多提问5个问题" constraint
**Reference**: v6.0.0 commit "feat: 添加需求澄清阶段的提问数量约束"

## File Modification Guidelines

When modifying workflow logic in `skills/ceo/SKILL.md`:
1. **Maintain agent sync pattern** for all agent calls
2. **Preserve checkpoint structure** (Read preview → AskUserQuestion → Process decision)
3. **Update phase numbers consistently** across all references
4. **Test checkpoint flow** to ensure user confirmation works
5. **Update version** in all 3 locations after changes

When modifying agents in `agents/`:
1. **Maintain question limit constraint** (max 5 per batch)
2. **Keep output paths consistent** (.claudedocs/[agent-name]_result.md)
3. **Follow Task tool format**: "Launch the [agent-name] agent with context..."
