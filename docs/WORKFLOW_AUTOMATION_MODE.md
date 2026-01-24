# CEO Workflow 自动化模式配置方案

**版本**: 6.5.0
**创建日期**: 2025-01-23
**问题**: workflow在阶段之间中断，等待用户确认

---

## 🎯 问题分析

### 问题现象

工作流在阶段之间自动中断：
```
🚀 准备进入 Phase 3

下一阶段：系统架构设计

是否继续？下一阶段将包括：
- 细化技术架构
- 数据库 schema 设计
- API 接口设计
- 目录结构规划
```

### 根本原因

workflow中存在**多个强制用户确认检查点**：

| 检查点 | 位置 | 用途 | 触发工具 |
|--------|------|------|----------|
| PRD确认检查点 | 阶段1后 | 确认PRD质量 | AskUserQuestion |
| 架构确认检查点 | 阶段3后 | 确认架构设计 | AskUserQuestion |

这些检查点导致工作流无法自动流转。

---

## 💡 解决方案对比

### 方案A: 自动模式配置（推荐）✅

**原理**：在workflow开始时询问用户模式选择，自动模式跳过所有确认检查点。

**实施**：
```markdown
## Step 1.5: 选择Workflow模式

Use AskUserQuestion tool:

Question: "选择CEO Workflow执行模式："
Header: "⚙️ Workflow模式配置"
Options:
  - label: "🤖 自动模式（推荐）"
    description: "完全自动化执行，跳过所有确认检查点，适合快速原型开发"
  - label: "👤 交互模式"
    description: "在每个关键阶段暂停，等待用户确认，适合重要项目"
```

**优势**：
- ✅ 保留用户选择权
- ✅ 灵活性高
- ✅ 适合不同场景

---

### 方案B: 完全移除检查点

**原理**：直接删除所有 `AskUserQuestion` 检查点。

**实施**：
- 删除阶段1后的PRD确认检查点
- 删除阶段3后的架构确认检查点
- 所有阶段自动流转

**优势**：
- ✅ 完全自动化
- ✅ 简化流程

**劣势**：
- ⚠️ 用户失去控制权
- ⚠️ 错误可能传播到后续阶段

---

### 方案C: 仅保留关键检查点

**原理**：只保留最重要的检查点（如架构确认），移除其他检查点。

**实施**：
- 移除PRD确认检查点（阶段1后）
- 保留架构确认检查点（阶段3后）
- 其他阶段自动流转

**优势**：
- ✅ 平衡自动化和控制
- ✅ 关键决策点保留确认

---

## 🎯 推荐实施：方案A（自动模式配置）

### 实施细节

#### 1. 在初始化阶段添加模式选择

```markdown
## Step 1: Initialize State Files

### Write initial task plan

创建 `.claudedocs/task_plan.md`，添加配置部分：

```markdown
# 任务计划

## Workflow配置
- 执行模式: 待定（Step 1.5选择）
- 自动流转: 待定

## 用户需求
{USER_INPUT}
...
```

#### 2. 添加模式选择步骤

```markdown
## Step 1.5: 选择Workflow执行模式 🆕

### Purpose

在开始workflow前，让用户选择执行模式：
- **自动模式**：完全自动化，跳过所有确认检查点
- **交互模式**：在关键阶段暂停，等待用户确认

### Execution

**Use AskUserQuestion tool**:

```
Question: "选择CEO Workflow执行模式："
Header: "⚙️ Workflow模式配置"
Options:
  - label: "🤖 自动模式（推荐）"
    description: "完全自动化执行，跳过所有确认检查点，适合快速原型开发"
  - label: "👤 交互模式"
    description: "在每个关键阶段暂停，等待用户确认，适合重要项目"
```

**Save user selection to task_plan.md**:

```bash
# If user selects "自动模式"
Edit file: .claudedocs/task_plan.md
Replace: "## Workflow配置"
With:
"""
## Workflow配置
- 执行模式: 自动模式
- 自动流转: 启用
- 确认检查点: 跳过
"""

# If user selects "交互模式"
Edit file: .claudedocs/task_plan.md
Replace: "## Workflow配置"
With:
"""
## Workflow配置
- 执行模式: 交互模式
- 自动流转: 禁用
- 确认检查点: 启用
"""
```

Proceed to Step 2 (Phase 0).
```

#### 3. 修改确认检查点逻辑

在各个确认检查点添加条件判断：

```markdown
### Step 4.2: CONDITIONAL - User Confirmation Checkpoint

⚠️ **CONDITIONAL CHECKPOINT** - 根据workflow模式决定是否需要确认

**Check workflow mode first**:

```bash
Read file: .claudedocs/task_plan.md

Extract:
  - 执行模式: (自动模式 | 交互模式)
```

**If 执行模式 == "自动模式"**:
```
✅ 自动模式：跳过确认检查点

直接执行批准操作：
1. Use Edit tool to update task_plan.md:
   - Mark Phase 0 and Phase 1 as completed
   - Update current phase to "阶段2: 产品设计"
2. Proceed to Step 5 (Phase 2).

Display message:
```
✅ 自动模式：PRD已自动批准，继续下一阶段...
```
```

**If 执行模式 == "交互模式"**:
```
👤 交互模式：执行用户确认流程

Use AskUserQuestion tool to get user confirmation:
...（原有确认流程）
```
```

#### 4. 在阶段切换处显示模式信息

```markdown
## Step 5: Execute Phase 2 - 产品设计

### Check workflow mode

```bash
Read file: .claudedocs/task_plan.md

Display:
═════════════════════════════════════════════════════════════
🚀 Phase 2 - 产品设计（UI/UX设计师）
═════════════════════════════════════════════════════════════

Workflow模式: {执行模式}
{if 自动模式} "🤖 自动模式：将自动流转到下一阶段"
{if 交互模式} "👤 交互模式：将在阶段完成后等待确认"

🎨 任务：UI/UX设计
```
```

---

## 📋 实施清单

### 必须修改的部分

- [ ] Step 1.5: 添加模式选择步骤
- [ ] Step 4.2: PRD确认检查点添加条件判断
- [ ] Step 6.1: 架构确认检查点添加条件判断
- [ ] 所有阶段切换处显示模式信息

### 可选优化

- [ ] 添加模式切换功能（允许中途更改模式）
- [ ] 添加"静默模式"（减少输出信息）
- [ ] 添加"调试模式"（显示详细执行信息）

---

## 🔄 执行流程对比

### Before（问题）

```
阶段1完成
  ↓
AskUserQuestion: "是否批准PRD？"  ❌ 中断
  ↓
用户选择
  ↓
阶段2开始
```

### After（自动模式）

```
阶段1完成
  ↓
检查模式：自动模式
  ↓
跳过确认，自动批准  ✅ 自动流转
  ↓
阶段2开始
```

### After（交互模式）

```
阶段1完成
  ↓
检查模式：交互模式
  ↓
AskUserQuestion: "是否批准PRD？"  ✅ 用户确认
  ↓
用户选择
  ↓
阶段2开始
```

---

## 🎉 预期效果

### 自动模式

- ✅ 完全自动化执行
- ✅ 无需手动确认
- ✅ 快速原型开发
- ✅ 适合迭代开发

### 交互模式

- ✅ 关键阶段有确认
- ✅ 用户保持控制
- ✅ 适合重要项目
- ✅ 及时发现错误

---

## 📚 相关文档

- [ASKUSERQUESTION 工具文档](https://docs.anthropic.com/claude-code/tool-reference)
- [Workflow最佳实践](./WORKFLOW_BEST_PRACTICES.md)
- [工作区权限解决方案](./WORKSPACE_PERMISSIONS_SOLUTION.md)

---

**版本**: 1.0
**最后更新**: 2025-01-23
