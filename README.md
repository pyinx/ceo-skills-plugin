# CEO Skills - Full-Stack Development Team

从模糊需求到产品交付的全栈开发团队，集成8个专业agents和11个Superpowers框架skills。

## ✨ 特性

- 🎯 **端到端自动化**：从需求探索到产品交付的完整workflow
- 👥 **专业分工**：8个专业agents（产品、设计、架构、全栈开发、移动端开发、TDD测试、集成测试、营销）
- 🧪 **TDD强制**：测试驱动开发，确保代码质量
- 🔍 **两阶段审查**：规格合规性 + 代码质量双重保障
- ⚡ **并行测试**：独立失败并行修复，提升效率
- 🌳 **工作区隔离**：Git worktrees避免环境污染
- 🌐 **集成测试**：完整的E2E测试（使用Chrome DevTools MCP）
- 📱 **移动端支持**：支持Web + Mobile并行开发，动态平台决策
- 📦 **一键安装**：完整插件包，所有依赖自包含

## 🚀 快速开始

### 安装

```bash
# 通过 Marketplace 安装（推荐）
claude plugin marketplace add https://github.com/pyinx/ceo-skills-plugin.git
claude plugin install ceo@ceo-skills-marketplace

# 更新已安装的插件
claude plugin marketplace update ceo-skills-marketplace
claude plugin update ceo@ceo-skills-marketplace

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
/ceo:workflow "我想要一个博客系统"

# 从特定阶段开始
/ceo:execute-plan --start-phase=4 "继续开发"

# 探索需求
/ceo:brainstorm "探索待办事项应用需求"

# 执行集成测试（新增）
/ceo:integration-test
```

## 📖 工作流程

```
用户输入 → 阶段0: 需求探索（brainstorming）
       → 阶段1: 需求澄清（产品经理）
       → 阶段2: 产品设计（UI/UX设计师）
       → 阶段3: 架构设计（系统架构师）
       → 阶段3.3: 平台决策（Web/Mobile/Both）🆕
       → 阶段3.5: 工作区准备（git-worktrees）
       → 阶段4: 开发实现（并行：Web+Mobile）🆕
       → 阶段5: 测试验证（并行修复）
       → 阶段6: 交付部署（市场营销师）
```

## 📦 组件清单

### 8个专业Agents

1. ceo-product-manager - 产品需求文档
2. ceo-ui-ux-designer - 用户故事和交互设计
3. ceo-system-architect - 技术架构设计
4. ceo-fullstack-developer - 全栈开发实现（Web）
5. **ceo-mobile-developer** - **移动端开发实现（React Native + Expo）**
6. ceo-test-engineer - 测试和质量保证
7. **ceo-integration-tester** - **集成测试和E2E测试**
8. ceo-marketing-specialist - 部署文档和推广

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

**版本**: 6.6.0
**集成**: Superpowers Framework + Chrome DevTools MCP + Callstack React Native Best Practices
**组件**: 8 agents + 13 skills
**仓库**: https://github.com/pyinx/ceo-skills-plugin

## 🆕 v6.6.0 更新

### Workflow自动化和Git Worktree集成

- 🤖 **自动模式**: 完全自动化workflow，跳过所有确认检查点
- 👤 **交互模式**: 在关键阶段暂停，等待用户确认
- 🌳 **Git Worktree**: 使用git worktree创建新项目，解决跨目录访问权限问题
- ⚡ **无缝体验**: 自动模式下100%自动化，零手动确认
- 🔧 **平台决策检查点**: 修复平台决策未受模式控制的Bug

### React Native最佳实践集成

- 📚 **Callstack Skill**: 集成react-native-best-practices skill（基于9+年经验）
- ⚡ **性能优化**: 系统性的性能优化方法论（FPS、Bundle、TTI、内存）
- 🎯 **优先级分类**: Critical、High、Medium三级优化策略
- 📊 **详细指南**: 27个性能优化参考文档

### 工作区权限解决方案

- 🔧 **权限问题**: 解决Claude Code CLI跨目录访问权限确认
- 🌳 **Git Worktree**: 新项目作为worktree，无需额外确认
- 📁 **工作区隔离**: 独立的Git工作环境，互不干扰

## 🆕 v6.4.0 更新

### 新增移动端开发功能

- 📱 **新增 Agent**: `ceo-mobile-developer` - 移动端开发工程师
- 🚀 **技术栈**: Expo + TypeScript + TailwindCSS + expo-router
- 📦 **脚手架**: 基于 obytes/react-native-template-obytes
- 🎨 **UI实现**: TailwindCSS + Nativewind + Moti 动画
- 💾 **状态管理**: Zustand + React Query
- 🧪 **测试覆盖**: Jest + React Testing Library + Maestro E2E
- ⚡ **性能优化**: Flash List、图片优化、内存管理

### 技术选型说明

经过对三个主流React Native脚手架的全面分析：
- ✅ **obytes/react-native-template-obytes**（强烈推荐）
  - 最新技术栈（Expo SDK + TypeScript + TailwindCSS）
  - 与现有CEO agents高度集成
  - 专业团队维护，生产就绪
  - 完整的测试覆盖和CI/CD
  - AI友好，适合AI辅助开发
- ⚠️ **flatlogic/react-native-starter**（中等推荐）
  - 商业支持，但使用JavaScript和传统Redux
- ❌ **mcnamee/react-native-starter-kit**（不推荐）
  - 技术栈过时，维护频率低

### 使用场景

当产品需求中明确需要移动端应用时：

```bash
# 1. 启动workflow（自动检测移动端需求）
/ceo:workflow "我想要一个带移动应用的电商系统"

# 2. workflow会自动调用移动端开发agent
# 3. 交付完整的iOS/Android应用
```

## 🆕 v6.3.0 更新

### 新增集成测试功能

- 🌐 **新增 Agent**: `ceo-integration-tester` - 集成测试工程师
- 🧪 **新增命令**: `/ceo:integration-test` - 执行完整的前后端集成测试
- 📸 **E2E测试**: 使用 Chrome DevTools MCP 进行真实浏览器测试
- ⚡ **性能测试**: LCP、FID、CLS 等核心性能指标
- 📊 **详细报告**: 自动生成测试报告和修复建议

### 使用场景

在 CEO workflow 完成后，手动执行集成测试：

```bash
# 1. 完成开发workflow
/ceo:workflow "我想要一个博客系统"

# 2. workflow完成后，执行集成测试
/ceo:integration-test

# 3. 查看测试报告
cat .claudedocs/integration-test-report.md
```

### 测试覆盖

- ✅ 环境检查（项目结构、依赖、配置）
- ✅ 服务启动验证（后端、前端）
- ✅ API集成测试（所有端点）
- ✅ 前端E2E测试（用户故事场景）
- ✅ 性能测试（LCP、FID、CLS、TTFB）
