# CEO Skills - Full-Stack Development Team

从模糊需求到产品交付的全栈开发团队，集成6个专业agents和11个Superpowers框架skills。

## ✨ 特性

- 🎯 **端到端自动化**：从需求探索到产品交付的完整workflow
- 👥 **专业分工**：6个专业agents（产品、设计、架构、开发、测试、营销）
- 🧪 **TDD强制**：测试驱动开发，确保代码质量
- 🔍 **两阶段审查**：规格合规性 + 代码质量双重保障
- ⚡ **并行测试**：独立失败并行修复，提升效率
- 🌳 **工作区隔离**：Git worktrees避免环境污染
- 📦 **一键安装**：完整插件包，所有依赖自包含

## 🚀 快速开始

### 安装

```bash
# 通过 Marketplace 安装（推荐）
claude plugin marketplace add https://github.com/pyinx/ceo-skills-plugin.git
claude plugin install ceo-skills@ceo-skills-marketplace

# 更新已安装的插件
claude plugin marketplace update ceo-skills-marketplace
claude plugin update ceo-skills@ceo-skills-marketplace

# 或手动安装
git clone https://github.com/pyinx/ceo-skills-plugin.git ~/.claude/plugins/ceo-skills-plugin
cd ~/.claude/plugins/ceo-skills-plugin
./scripts/install.sh

# 验证安装
/ceo --version
```

### 使用

```bash
# 启动完整workflow
/ceo "我想要一个博客系统"

# 从特定阶段开始
/ceo --start-phase=4 "继续开发"

# 探索需求
/ceo:brainstorm "探索待办事项应用需求"
```

## 📖 工作流程

```
用户输入 → 阶段0: 需求探索（brainstorming）
       → 阶段1: 需求澄清（产品经理）
       → 阶段2: 产品设计（UI/UX设计师）
       → 阶段3: 架构设计（系统架构师）
       → 阶段3.5: 工作区准备（git-worktrees）
       → 阶段4: 开发实现（子任务驱动+两阶段审查）
       → 阶段5: 测试验证（并行修复）
       → 阶段6: 交付部署（市场营销师）
```

## 📦 组件清单

### 6个专业Agents

1. ceo-product-manager - 产品需求文档
2. ceo-ui-ux-designer - 用户故事和交互设计
3. ceo-system-architect - 技术架构设计
4. ceo-fullstack-developer - 全栈开发实现
5. ceo-test-engineer - 测试和质量保证
6. ceo-marketing-specialist - 部署文档和推广

### 11个集成Skills

**核心Workflow（7个）**：
- ceo（主orchestrator）
- brainstorming（需求探索）
- using-git-worktrees（工作区隔离）
- subagent-driven-dev（子任务驱动）
- tdd（测试驱动）
- parallel-dispatch（并行调度）
- two-stage-review（两阶段审查）

**增强能力（4个）**：
- planning-with-files（状态管理）
- frontend-design（前端设计）
- ui-ux-pro-max（UI/UX增强）
- webapp-testing（Web测试）

## 📚 文档

- [安装指南](docs/INSTALL.md)
- [架构说明](docs/ARCHITECTURE.md)
- [版本历史](docs/VERSION_HISTORY.md)

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 🔗 链接

- **GitHub**: https://github.com/pyinx/ceo-skills-plugin
- **Issues**: https://github.com/pyinx/ceo-skills-plugin/issues

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

---

**版本**: 6.0.0
**集成**: Superpowers Framework
**组件**: 6 agents + 11 skills
**仓库**: https://github.com/pyinx/ceo-skills-plugin
