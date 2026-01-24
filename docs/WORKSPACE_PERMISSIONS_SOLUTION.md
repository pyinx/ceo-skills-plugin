# CEO 工作区权限问题解决方案

**版本**: 6.5.0
**创建日期**: 2025-01-23
**问题**: Claude Code CLI 文件系统访问控制导致跨目录操作需要用户确认

---

## 🎯 问题分析

### 问题现象

当CEO workflow创建新项目时，经常遇到权限确认提示：

```bash
mkdir -p /Users/zyb/Documents/git/yunsiweilai.com/my-appstore/.claudedocs

Do you want to proceed?
  1. Yes
❯ 2. Yes, and always allow access to my-appstore/ from this project
  3. No
```

### 根本原因

**Claude Code CLI的安全机制**：
- 当前工作目录：`/Users/zyb/Documents/git/yunsiweilai.com/agent-skills/ceo-skills-plugin`
- 目标操作目录：`/Users/zyb/Documents/git/yunsiweilai.com/my-appstore/`
- 由于目标目录在当前项目外，触发安全确认

**触发条件**：
```yaml
当前项目: /path/to/ceo-skills-plugin
操作目标: /path/to/another-project
结果: 权限确认提示 ❌
```

---

## 💡 解决方案对比

### 方案A: Git Worktree（推荐）✅

**原理**：将新项目作为当前仓库的 worktree，使其成为"项目内"目录。

**实施**：
```bash
# 在阶段3.5执行
git worktree add ../my-project -b feature/my-project
```

**目录结构**：
```
Users/zyb/Documents/git/yunsiweilai.com/
├── .git/                           # 共享Git仓库
├── agent-skills/
│   └── ceo-skills-plugin/          # 当前工作目录（主worktree）
└── my-project/                     # 新worktree（共享.git）
    └── .git (指向主仓库的worktree)
```

**优势**：
- ✅ 新项目在"项目内"，无需额外确认
- ✅ Git管理独立，互不干扰
- ✅ 符合Git最佳实践
- ✅ 易于切换和管理
- ✅ 完全解决权限问题

**劣势**：
- ⚠️ 需要Git仓库环境
- ⚠️ 项目与CEO plugin在同一Git仓库中

---

### 方案B: 项目内工作区

**原理**：将新项目创建在当前项目目录内。

**实施**：
```bash
mkdir -p workspace/my-project
cd workspace/my-project
```

**目录结构**：
```
ceo-skills-plugin/
├── agents/
├── skills/
├── docs/
└── workspace/              # 新增工作区目录
    ├── my-project/
    └── another-project/
```

**优势**：
- ✅ 简单直接
- ✅ 无需Git配置
- ✅ 自然的项目隔离
- ✅ 无权限问题

**劣势**：
- ⚠️ 项目嵌套可能不符合工作流
- ⚠️ workspace目录可能被Git跟踪

---

### 方案C: 交互式永久授权

**原理**：通过第一次交互式提示永久授权。

**实施**：
```
Do you want to proceed?
  1. Yes
❯ 2. Yes, and always allow access to my-appstore/ from this project  ← 选择这个
  3. No
```

**优势**：
- ✅ 一次性操作
- ✅ Claude Code自动记忆

**劣势**：
- ⚠️ 需要用户手动操作
- ⚠️ 每个新项目需要首次授权
- ⚠️ 不适合自动化流程

---

### 方案D: 配置访问控制文件

**原理**：创建`.claude/access-control.json`预配置权限。

**实施**：
```json
{
  "allowedPaths": [
    "/Users/zyb/Documents/git/yunsiweilai.com/**"
  ],
  "trustedProjects": [
    "/Users/zyb/Documents/git/yunsiweilai.com/my-project"
  ]
}
```

**优势**：
- ✅ 预配置，无需手动确认
- ✅ 批量授权

**劣势**：
- ⚠️ 功能可能因Claude Code版本而异
- ⚠️ 需要验证官方文档支持

---

### 方案E: 子进程独立上下文

**原理**：使用Task工具在新目录中执行命令。

**实施**：
```typescript
await Task({
  subagent_type: 'fullstack-developer',
  prompt: '创建项目...',
  cwd: '/path/to/new/project'
});
```

**优势**：
- ✅ 子进程有独立工作目录
- ✅ 避免跨目录访问

**劣势**：
- ⚠️ 复杂度增加
- ⚠️ 上下文隔离可能影响协作

---

## 🎯 推荐实施方案

### 主方案：Git Worktree（方案A）

**适用场景**：
- ✅ 新项目与CEO plugin在同一Git组织/用户下
- ✅ 希望利用Git管理优势
- ✅ 需要完全自动化，无需手动确认

**实施步骤**：

#### 1. 更新阶段3.5实现

在`skills/ceo/SKILL.md`的Step 7中明确使用git-worktree：

```markdown
## Step 7: Execute Phase 3.5 - 工作区准备（Git Worktrees）

### Purpose

创建隔离的Git worktree以避免分支切换污染，**同时解决跨目录访问权限问题**。

### Execution

**Step 7.1: 确定项目名称和路径**

从PRD中提取项目名称：
```bash
Read file: .claudedocs/ceo-system-architect_result.md

Extract:
  - project_name: 项目名称
```

**Step 7.2: 创建Git Worktree**

```bash
# 计算worktree路径（相对于当前仓库）
WORKTREE_PATH="../${project_name}"

# 创建worktree
git worktree add ${WORKTREE_PATH} -b feature/${project_name}

# 验证创建成功
git worktree list
```

**Step 7.3: 在Worktree中创建文档目录**

```bash
# 创建.claudedocs目录（在worktree中，无需权限确认）
mkdir -p ${WORKTREE_PATH}/.claudedocs
```

**Step 7.4: 保存Worktree信息到任务计划**

```bash
Edit task_plan.md, add:

## 工作区配置
- 工作区类型: Git Worktree
- 项目路径: ${WORKTREE_PATH}
- Git 分支: feature/${project_name}
- 相对路径: ../${project_name}
```

**优势说明**：
- ✅ worktree是Git仓库的一部分，属于"项目内"
- ✅ 所有操作都在worktree内执行，无需跨目录访问
- ✅ 完全避免权限确认提示
- ✅ 项目完成后可以轻松清理worktree
```

#### 2. 添加Worktree管理工具函数

```typescript
/**
 * 工作区管理工具函数
 */

/**
 * 创建新的worktree
 */
async function createWorktree(projectName: string): Promise<WorkspaceInfo> {
  const worktreePath = `../${projectName}`;
  const branchName = `feature/${projectName}`;

  // 检查worktree是否已存在
  const existingWorktrees = await execCommand('git worktree list');
  if (existingWorktrees.stdout.includes(worktreePath)) {
    console.log(`⚠️  Worktree已存在: ${worktreePath}`);
    return {
      project_name: projectName,
      base_path: worktreePath,
      git_branch: branchName,
      type: 'worktree'
    };
  }

  // 创建新worktree
  await execCommand(
    `git worktree add ${worktreePath} -b ${branchName}`
  );

  // 创建文档目录
  await execCommand(`mkdir -p ${worktreePath}/.claudedocs`);

  console.log(`✅ Worktree已创建: ${worktreePath} (分支: ${branchName})`);

  return {
    project_name: projectName,
    base_path: worktreePath,
    git_branch: branchName,
    type: 'worktree'
  };
}

/**
 * 清理worktree（项目完成后）
 */
async function cleanupWorktree(projectName: string): Promise<void> {
  const worktreePath = `../${projectName}`;

  // 检查worktree是否存在
  const existingWorktrees = await execCommand('git worktree list');
  if (!existingWorktrees.stdout.includes(worktreePath)) {
    console.log(`⚠️  Worktree不存在: ${worktreePath}`);
    return;
  }

  // 移除worktree
  await execCommand(`git worktree remove ${worktreePath}`);

  // 询问是否删除分支
  console.log(`💡 提示: 分支 feature/${projectName} 仍存在`);
  console.log(`   如需删除，执行: git branch -d feature/${projectName}`);

  console.log(`✅ Worktree已清理: ${worktreePath}`);
}

/**
 * 列出所有worktrees
 */
async function listWorktrees(): Promise<void> {
  const result = await execCommand('git worktree list');
  console.log('📋 当前Worktrees:\n');
  console.log(result.stdout);
}
```

#### 3. 更新阶段4执行上下文

在开发实现阶段，确保所有命令在worktree路径中执行：

```markdown
## Step 8: Execute Phase 4 - 开发实现

### Step 8.1: 加载Worktree配置

```bash
Read file: .claudedocs/task_plan.md

Extract:
  - WORKTREE_PATH: 工作区路径
  - PROJECT_NAME: 项目名称
```

### Step 8.2: 在Worktree中执行开发

**重要**：所有项目创建命令都在worktree路径中执行：

```bash
# 错误方式 ❌（跨目录访问，触发权限确认）
mkdir -p /Users/zyb/Documents/git/yunsiweilai.com/my-project/.claudedocs

# 正确方式 ✅（在worktree内，无需权限确认）
cd ${WORKTREE_PATH}
mkdir -p .claudedocs
```

**使用Task工具时指定工作目录**：
```
Task: subagent-driven-development
Working directory: ${WORKTREE_PATH}
Task: 实现后端API + 前端
```
```

---

### 备选方案：项目内工作区（方案B）

**适用场景**：
- ✅ 不希望新项目与CEO plugin在同一Git仓库
- ✅ 简单直接，无需Git配置

**实施步骤**：

#### 1. 更新阶段3.5实现

```markdown
## Step 7: Execute Phase 3.5 - 工作区准备

### Alternative: 项目内工作区（非Git Worktree）

**Step 7.1: 创建工作区目录**

```bash
# 在当前项目内创建workspace目录
mkdir -p workspace

# 创建项目子目录
PROJECT_PATH="workspace/${project_name}"
mkdir -p ${PROJECT_PATH}/.claudedocs
```

**Step 7.2: 保存工作区信息**

```bash
Edit task_plan.md, add:

## 工作区配置
- 工作区类型: 项目内工作区
- 项目路径: ${PROJECT_PATH}
- 相对路径: workspace/${project_name}
```

**优势说明**：
- ✅ 简单直接，无需Git操作
- ✅ workspace/目录在项目内，无需权限确认
- ⚠️ 建议将workspace/添加到.gitignore
```

#### 2. 更新.gitignore

```bash
# 添加到.gitignore
echo "workspace/" >> .gitignore
```

---

## 📋 实施检查清单

### Git Worktree方案

- [ ] 更新skills/ceo/SKILL.md的阶段3.5实现
- [ ] 添加worktree管理工具函数
- [ ] 更新阶段4执行上下文，使用worktree路径
- [ ] 测试worktree创建和清理流程
- [ ] 验证无权限确认提示

### 项目内工作区方案

- [ ] 更新skills/ceo/SKILL.md的阶段3.5实现
- [ ] 创建workspace/目录
- [ ] 更新.gitignore，添加workspace/
- [ ] 测试工作区创建流程
- [ ] 验证无权限确认提示

---

## 🎉 预期效果

### Git Worktree方案

**Before（问题）**：
```bash
mkdir -p ../my-project/.claudedocs
# ❌ 触发权限确认提示
```

**After（解决）**：
```bash
git worktree add ../my-project -b feature/my-project
mkdir -p ../my-project/.claudedocs
# ✅ 无权限确认，直接执行
```

### 项目内工作区方案

**Before（问题）**：
```bash
mkdir -p ../../my-project/.claudedocs
# ❌ 触发权限确认提示
```

**After（解决）**：
```bash
mkdir -p workspace/my-project/.claudedocs
# ✅ 无权限确认，直接执行
```

---

## 📚 相关资源

- [Git Worktree官方文档](https://git-scm.com/docs/git-worktree)
- [Claude Code CLI访问控制](https://github.com/anthropics/claude-code)
- [using-git-worktrees Superpowers Skill](https://github.com/anthropics/superpowers)

---

**版本**: 1.0
**最后更新**: 2025-01-23
