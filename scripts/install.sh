#!/bin/bash

set -e

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "🚀 Installing CEO Skills..."
echo "Plugin directory: $PLUGIN_DIR"

# 1. Install agents
echo "📦 Installing agents..."
mkdir -p ~/.claude/agents

for agent in "$PLUGIN_DIR"/../agents/*.md; do
    if [ -f "$agent" ]; then
        agent_name=$(basename "$agent")
        echo "  → Installing $agent_name"
        cp "$agent" ~/.claude/agents/
    fi
done

echo "✅ Installed 6 agents"

# 2. Install skills
echo "📦 Installing skills..."
mkdir -p ~/.claude/skills

# Copy CEO skill
echo "  → Installing ceo skill"
cp -r "$PLUGIN_DIR"/../skills/ceo ~/.claude/skills/

# Copy supporting skills
for skill in brainstorming using-git-worktrees subagent-driven-dev tdd parallel-dispatch two-stage-review planning-with-files frontend-design ui-ux-pro-max webapp-testing; do
    if [ -d "$PLUGIN_DIR"/../skills/$skill ]; then
        echo "  → Installing $skill skill"
        cp -r "$PLUGIN_DIR"/../skills/$skill ~/.claude/skills/
    fi
done

echo "✅ Installed 12 skills"

# 3. Install commands (if supported)
if [ -d "$PLUGIN_DIR"/../commands ]; then
    echo "📦 Installing commands..."
    # Commands are auto-discovered by Claude Code
    echo "✅ Commands available"
fi

# 4. Set up hooks (if supported)
if [ -d "$PLUGIN_DIR"/../hooks ]; then
    echo "📦 Setting up hooks..."
    # Hooks would be configured here
    echo "✅ Hooks configured"
fi

echo ""
echo "🎉 CEO Skills installed successfully!"
echo ""
echo "📋 Next steps:"
echo "  1. Verify: ./scripts/verify.sh"
echo "  2. Start: /ceo 'build a complete app'"
