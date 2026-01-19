#!/bin/bash

set -e

echo "🔍 Verifying CEO Skills installation..."
echo ""

# Check agents
echo "📦 Checking agents..."
AGENT_COUNT=$(ls ~/.claude/agents/ceo-*.md 2>/dev/null | wc -l | tr -d ' ')
if [ "$AGENT_COUNT" -eq 6 ]; then
    echo "✅ All 6 agents installed"
    ls ~/.claude/agents/ceo-*.md
else
    echo "❌ Expected 6 agents, found $AGENT_COUNT"
    exit 1
fi

echo ""

# Check skills
echo "📦 Checking skills..."
REQUIRED_SKILLS=("ceo" "brainstorming" "using-git-worktrees" "subagent-driven-dev" "tdd" "parallel-dispatch" "two-stage-review" "planning-with-files" "frontend-design" "ui-ux-pro-max" "webapp-testing")

for skill in "${REQUIRED_SKILLS[@]}"; do
    if [ -d ~/.claude/skills/$skill ]; then
        echo "✅ $skill skill installed"
    else
        echo "❌ $skill skill missing"
        exit 1
    fi
done

echo ""
echo "🎉 All components verified successfully!"
echo ""
echo "📋 Available commands:"
echo "  /ceo 'build a complete app'"
echo "  /ceo:brainstorm 'explore requirements'"
echo "  /ceo:write-plan 'create implementation plan'"
echo "  /ceo:execute-plan 'execute plan'"
