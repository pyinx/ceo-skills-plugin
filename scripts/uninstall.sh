#!/bin/bash

set -e

echo "🗑️  Uninstalling CEO Skills..."
echo ""

# Remove agents
echo "📦 Removing agents..."
rm -f ~/.claude/agents/ceo-*.md
echo "✅ Agents removed"

# Remove skills
echo "📦 Removing skills..."
for skill in ceo brainstorming using-git-worktrees subagent-driven-dev tdd parallel-dispatch two-stage-review planning-with-files frontend-design ui-ux-pro-max webapp-testing; do
    if [ -d ~/.claude/skills/$skill ]; then
        rm -rf ~/.claude/skills/$skill
        echo "  → Removed $skill skill"
    fi
done

echo "✅ Skills removed"

echo ""
echo "🎉 CEO Skills uninstalled successfully!"
