# CEO Skills Installation Guide

## Claude Code (Plugin Marketplace)

### Step 1: Register Marketplace

```bash
/plugin marketplace add <your-marketplace-url>
```

### Step 2: Install Plugin

```bash
/plugin install ceo-skills@<marketplace-name>
```

### Step 3: Verify Installation

```bash
# Check skills
/skill list

# Should see:
# - ceo
# - brainstorming
# - using-git-worktrees
# - subagent-driven-dev
# - tdd
# - parallel-dispatch
# - two-stage-review
# - planning-with-files
# - frontend-design
# - ui-ux-pro-max
# - webapp-testing

# Check agents
ls ~/.claude/agents/ceo-*.md

# Should see 6 agents
```

## Manual Installation

If marketplace is not available:

### Step 1: Clone Repository

```bash
git clone https://github.com/pyinx/ceo-skills-plugin.git ~/.claude/plugins/ceo-skills
```

### Step 2: Run Install Script

```bash
cd ~/.claude/plugins/ceo-skills
./scripts/install.sh
```

### Step 3: Verify

```bash
./scripts/verify.sh
```

## Uninstall

```bash
cd ~/.claude/plugins/ceo-skills
./scripts/uninstall.sh
```

## Troubleshooting

### Agents not found

```bash
# Check if agents are installed
ls ~/.claude/agents/ceo-*.md

# If empty, reinstall
./scripts/install.sh
```

### Skills not triggering

```bash
# Check if skills are registered
/skill list

# If ceo not listed, reload Claude Code
# or manually add to .claude/skills/
```
