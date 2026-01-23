# Agent决策树 - 场景分工指南

**版本**: 1.0
**创建日期**: 2025-01-23
**基于**: 用户关于React Native跨平台能力的反馈

---

## 🎯 核心原则

### 关键洞察

**React Native的跨平台能力**：
- ✅ React Native可以同时编译到iOS、Android、Web
- ⚠️ 但是：React Native的"Web" ≠ 传统Web前端（React/Next.js）
- 💡 结论：需要明确区分"传统Web应用"和"React Native跨平台应用"

### 技术栈对比

| 特性 | 传统Web前端 | React Native |
|------|------------|---------------|
| **框架** | React/Next.js/Vue | React Native |
| **平台** | Web浏览器 | iOS + Android + Web* |
| **Web实现** | DOM渲染 | React Native for Web |
| **性能** | Web优化 | 移动优化 |
| **适用场景** | Web应用 | 跨平台应用 |

*React Native for Web将React Native组件编译为Web组件

---

## 📊 决策树

```
用户需求
    ↓
是否有前端需求？
├─ 否 → 【场景1：纯后端项目】
│         └─ Agent: fullstack-developer（仅后端）
│
└─ 是 → 前端需求是什么？
         │
         ├─ 传统Web应用
         │   → 【场景2：Web前端 + 后端】
         │   └─ Agent: fullstack-developer（后端 + Web前端）
         │
         └─ 移动应用（跨平台）
             → 【场景3：React Native跨平台】
             └─ Agents:
                 ├─ fullstack-developer（后端）
                 └─ mobile-developer（iOS + Android + Web）
```

---

## 🎬 场景详解

### 场景1：纯后端项目

**需求特征**：
- ❌ 无前端需求
- ✅ 仅需要API服务
- ✅ 仅需要数据处理

**Agent分配**：
```yaml
负责agent: ceo-fullstack-developer
任务: 后端API开发
技术栈:
  - 后端: Node.js/Python/Go
  - 数据库: PostgreSQL/MySQL/MongoDB
  - API: REST/GraphQL
```

**示例项目**：
- 数据处理服务
- API微服务
- 后台管理系统（无UI）

**不涉及**：
- ❌ mobile-developer（无需激活）

---

### 场景2：传统Web应用

**需求特征**：
- ✅ 需要Web浏览器访问
- ✅ 需要响应式设计（桌面/平板/手机）
- ✅ 需要SEO优化
- ✅ 需要Web特定功能（复杂表单、实时协作）

**Agent分配**：
```yaml
负责agent: ceo-fullstack-developer
任务: 后端API + Web前端
技术栈:
  - 后端: Node.js/Python/Go
  - 前端: React/Next.js/Vue
  - 状态管理: Redux/Zustand
  - 样式: TailwindCSS/CSS Modules
```

**示例项目**：
- 企业官网
- 管理系统（Web版）
- 电商平台（Web版）
- SaaS应用

**不涉及**：
- ❌ mobile-developer（无需激活）

---

### 场景3：React Native跨平台应用

**需求特征**：
- ✅ 需要iOS和Android应用
- ✅ 希望一套代码覆盖多平台
- ✅ 需要访问原生功能（相机、GPS、传感器）
- ✅ Web端是"加分项"而非"必需品"

**Agent分配**：
```yaml
负责agents:
  - fullstack-developer: 后端API
  - mobile-developer: React Native应用
技术栈:
  - 后端: Node.js/Python/Go
  - 移动端: React Native + Expo
  - 平台: iOS、Android、Web（React Native for Web）
  - 状态管理: Zustand + React Query
  - 样式: Nativewind + TailwindCSS
```

**示例项目**：
- 移动App（iOS + Android）
- 户外运动追踪
- 社交App
- 工具类App

**关键理解**：
- ⚠️ 这里的"Web"是React Native编译的Web版本
- ⚠️ 不是传统意义的React/Next.js Web应用
- 💡 适合：移动为主，Web为辅的场景

---

### 场景4：Web + Mobile 双平台（可选）

**需求特征**：
- ✅ 需要完整的Web应用
- ✅ 同时需要原生移动应用
- ✅ 两个平台都需要独立优化

**Agent分配**：
```yaml
负责agents:
  - fullstack-developer: 后端API + 传统Web前端
  - mobile-developer: React Native移动应用
技术栈:
  - 后端: Node.js/Python/Go（共享）
  - Web前端: React/Next.js（传统Web）
  - 移动端: React Native + Expo
```

**示例项目**：
- 大型电商平台（Web + App）
- 社交平台（Web + App）
- 内容平台（Web + App）

**优先级策略**：
- **web-first**: Web优先，移动端跟进
- **mobile-first**: 移动端优先，Web跟进
- **parallel**: 并行开发（后端API优先）

---

## 🤔 常见问题

### Q1: 什么时候用React Native？

**使用React Native的场景**：
- ✅ 需要iOS和Android原生应用
- ✅ 希望一套代码覆盖多平台
- ✅ 需要大量原生功能（相机、GPS、传感器）
- ✅ Web是"加分项"而非"必需品"

**不使用React Native的场景**：
- ❌ 只需要Web应用
- ❌ 需要复杂的Web交互（大量表单、实时协作）
- ❌ SEO是核心需求
- ❌ 需要极致的Web性能

### Q2: React Native for Web是什么？

**React Native for Web**：
- 将React Native组件编译为Web组件
- 使用React Native的组件和API
- 性能不如传统React/Next.js
- 适合：移动应用的Web补充

**传统Web前端**：
- 使用React/Next.js/Vue等框架
- 直接渲染DOM
- 更好的Web性能和SEO
- 适合：纯Web应用

### Q3: 能否同时用两种Web技术？

**可以，但需要明确理由**：

```
方案A: 传统Web + React Native App
  - Web: Next.js（完整Web应用）
  - Mobile: React Native（原生App）
  - 适合: Web和Mobile都是核心平台

方案B: 仅React Native
  - 所有平台: React Native
  - Web: React Native for Web
  - 适合: 移动为主，Web为辅助
```

---

## 📋 决策检查清单

### 在平台决策时检查：

**前端需求分析**：
- [ ] 是否需要Web浏览器访问？
- [ ] 是否需要iOS App？
- [ ] 是否需要Android App？
- [ ] Web是"必需品"还是"加分项"？

**技术需求分析**：
- [ ] 是否需要SEO优化？（→ 传统Web）
- [ ] 是否需要大量原生功能？（→ React Native）
- [ ] 是否需要复杂的Web交互？（→ 传统Web）
- [ ] 是否希望一套代码多平台？（→ React Native）

**团队能力分析**：
- [ ] 团队是否有Web开发经验？
- [ ] 团队是否有React Native经验？
- [ ] 时间和预算是否支持双平台？

---

## 🎯 快速决策指南

### 根据需求快速选择

| 需求描述 | 推荐方案 | Agents |
|----------|---------|--------|
| "我只需要一个API服务" | 纯后端 | fullstack |
| "我需要一个管理系统的Web版" | Web Full Stack | fullstack |
| "我需要一个iOS和Android App" | React Native | fullstack + mobile |
| "我需要一个完整的电商网站和App" | Web + Mobile | fullstack + mobile |
| "我需要一个移动App，也希望能用浏览器访问" | React Native | fullstack + mobile |

---

## 🔧 工作流集成

### 在CEO workflow中

**阶段3.3：平台决策**应该明确：

1. **前端类型**
   ```yaml
   前端类型:
     - 无前端
     - 传统Web（React/Next.js）
     - 跨平台移动（React Native）
     - 双平台（传统Web + React Native）
   ```

2. **Agent激活**
   ```yaml
   无前端:
     - fullstack-developer（后端）

   传统Web:
     - fullstack-developer（后端 + Web）

   React Native:
     - fullstack-developer（后端）
     - mobile-developer（跨平台）

   双平台:
     - fullstack-developer（后端 + Web）
     - mobile-developer（移动端）
   ```

---

## 📚 相关文档

- [Agent职责边界与Workflow集成方案](./AGENT_BOUNDARIES_AND_WORKFLOW.md)
- [Agent职责边界矩阵](./AGENT_RESPONSIBILITY_MATRIX.md)
- [问题解答文档](./AGENT_WORKFLOW_QA.md)
- [移动端技术栈分析](./MOBILE_TECH_STACK_ANALYSIS.md)

---

**文档结束**

**总结**：
- 纯后端 → fullstack-developer
- Web + 后端 → fullstack-developer
- 移动应用 → fullstack-developer（后端）+ mobile-developer（跨平台）
- Web + 移动 → fullstack-developer（后端+Web）+ mobile-developer（移动端）
