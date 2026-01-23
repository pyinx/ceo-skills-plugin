# React Native Best Practices 集成说明

**版本**: 6.5.0
**更新日期**: 2025-01-23
**状态**: ✅ 完成

---

## 📋 集成概述

### 集成的Skill

**Callstack React Native Best Practices**
- **来源**: https://github.com/callstackincubator/agent-skills/tree/main/skills/react-native-best-practices
- **作者**: Callstack（基于9+年React Native/Expo经验）
- **定位**: React Native性能优化专家
- **许可**: MIT

---

## 🎯 集成理由

### 问题分析

在v6.4.0中，我们引入了mobile-developer agent负责React Native跨平台应用开发。但是在性能优化方面，我们的覆盖相对基础：
- ✅ 基础性能优化（Flash List、图片优化、内存管理）
- ❌ 缺少系统性的性能优化方法论
- ❌ 缺少深度的性能分析工具
- ❌ 缺少基于实战经验的最佳实践

### 解决方案

集成Callstack的react-native-best-practices skill：
- ✅ 基于Callstack 9+年React Native/Expo经验
- ✅ 系统性的性能优化方法论
- ✅ 涵盖JavaScript/React、Native、Bundling三个层面
- ✅ 提供详细的优化指南和代码示例
- ✅ 与mobile-developer agent完美互补

---

## 📊 技能对比分析

### 覆盖范围对比

| 优化领域 | mobile-developer | react-native-best-practices | 协作关系 |
|---------|-----------------|---------------------------|---------|
| **项目搭建** | ✅ 完整流程 | ❌ 不涉及 | 独立 |
| **UI实现** | ✅ 完整实现 | ❌ 不涉及 | 独立 |
| **API集成** | ✅ 完整实现 | ❌ 不涉及 | 独立 |
| **状态管理** | ✅ Zustand实现 | ✅ 优化指南 | 增强 |
| **FlatList** | ✅ 基础使用 | ✅ 深度优化（CRITICAL） | 增强 |
| **性能分析** | ⚠️ 简单提及 | ✅ 专门的profiling指南 | 增强 |
| **Bundle优化** | ❌ 无覆盖 | ✅ 8个专门文档（CRITICAL） | 补充 |
| **Turbo Modules** | ❌ 无覆盖 | ✅ 详细的C++/线程指南 | 补充 |
| **TTI优化** | ⚠️ 简单提及 | ✅ 专门的测量和优化 | 增强 |
| **内存泄漏** | ⚠️ 简单提及 | ✅ JS和Native详细指南 | 增强 |
| **动画优化** | ✅ 基础使用 | ✅ Reanimated worklets | 增强 |

### 结论

✅ **完全互补，无冲突**
- mobile-developer：负责从0到1构建React Native应用
- react-native-best-practices：负责性能优化和最佳实践指导
- 两者覆盖不同领域，完美协作

---

## 🔧 集成方案

### 方案选择

采用**方案A：作为独立skill引入**

**理由**：
1. ✅ 保持Callstack skill的独立性
2. ✅ 可以自动获取Callstack的更新
3. ✅ 清晰的技能边界
4. ✅ 易于维护和升级

### 实施方式

1. **文件位置**
   ```
   skills/
   ├── ceo/
   │   └── SKILL.md
   └── react-native-best-practices/
       ├── SKILL.md
       └── references/
           ├── js-*
           ├── native-*
           └── bundle-*
   ```

2. **在mobile-developer中引用**
   ```yaml
   ## 使用的Skills

   - `react-native-best-practices`：React Native性能优化和最佳实践
   - `frontend-design`：移动端UI组件生成
   - `tdd`：测试驱动开发
   ```

3. **在性能优化阶段激活**
   ```typescript
   /**
    * 性能优化阶段（集成react-native-best-practices）
    */
   async function optimizePerformance(): Promise<void> {
     // 1. 加载react-native-best-practices skill
     const optimizationGuide = await loadSkill('react-native-best-practices');

     // 2. FPS和重渲染优化（CRITICAL）
     await applyOptimization(optimizationGuide, 'js-profile-react.md');
     await applyOptimization(optimizationGuide, 'js-measure-fps.md');
     await applyOptimization(optimizationGuide, 'js-lists-flatlist-flashlist.md');

     // 3. Bundle大小优化（CRITICAL）
     await applyOptimization(optimizationGuide, 'bundle-analyze-js.md');
     await applyOptimization(optimizationGuide, 'bundle-barrel-exports.md');

     // 4. TTI优化（HIGH）
     await applyOptimization(optimizationGuide, 'native-measure-tti.md');
     await applyOptimization(optimizationGuide, 'bundle-hermes-mmap.md');

     // 5. Native性能优化（HIGH）
     await applyOptimization(optimizationGuide, 'native-turbo-modules.md');

     // 6. 内存管理（MEDIUM-HIGH）
     await applyOptimization(optimizationGuide, 'js-memory-leaks.md');
     await applyOptimization(optimizationGuide, 'native-memory-leaks.md');

     // 7. 动画优化（MEDIUM）
     await applyOptimization(optimizationGuide, 'js-animations-reanimated.md');
   }
   ```

---

## 📋 性能优化指南

### 优先级分类

**Critical（关键，必须修复）**：
- FPS & Re-renders优化
- Bundle大小优化

**High（高优先级，显著改进）**：
- TTI优化
- Native性能优化
- 内存管理

**Medium（中等优先级，值得优化）**：
- 动画优化
- TextInput优化
- Bundle分析工具

### 优化领域

#### 1. JavaScript/React层（`js-*`）

| 文件 | 优先级 | 描述 |
|------|--------|------|
| `js-lists-flatlist-flashlist.md` | CRITICAL | 替换ScrollView为虚拟化列表 |
| `js-profile-react.md` | MEDIUM | React DevTools profiling |
| `js-measure-fps.md` | HIGH | FPS监控和测量 |
| `js-memory-leaks.md` | MEDIUM | JS内存泄漏检测 |
| `js-atomic-state.md` | HIGH | Jotai/Zustand模式 |
| `js-concurrent-react.md` | HIGH | useDeferredValue, useTransition |
| `js-react-compiler.md` | HIGH | 自动memoization |
| `js-animations-reanimated.md` | MEDIUM | Reanimated worklets |
| `js-uncontrolled-components.md` | HIGH | TextInput优化 |

#### 2. Native层（`native-*`）

| 文件 | 优先级 | 描述 |
|------|--------|------|
| `native-turbo-modules.md` | HIGH | 构建快速的native modules |
| `native-sdks-over-polyfills.md` | HIGH | Native vs JS库 |
| `native-measure-tti.md` | HIGH | TTI测量设置 |
| `native-threading-model.md` | HIGH | Turbo Module线程 |
| `native-profiling.md` | MEDIUM | Xcode/Android Studio profiling |
| `native-platform-setup.md` | MEDIUM | iOS/Android工具指南 |
| `native-view-flattening.md` | MEDIUM | View层级调试 |
| `native-memory-patterns.md` | MEDIUM | C++/Swift/Kotlin内存 |
| `native-memory-leaks.md` | MEDIUM | Native内存泄漏检测 |

#### 3. Bundling层（`bundle-*`）

| 文件 | 优先级 | 描述 |
|------|--------|------|
| `bundle-barrel-exports.md` | CRITICAL | 避免barrel imports |
| `bundle-analyze-js.md` | CRITICAL | JS bundle可视化 |
| `bundle-tree-shaking.md` | HIGH | Dead code elimination |
| `bundle-analyze-app.md` | HIGH | App大小分析 |
| `bundle-r8-android.md` | HIGH | Android代码压缩 |
| `bundle-hermes-mmap.md` | HIGH | 禁用bundle压缩 |
| `bundle-native-assets.md` | HIGH | Asset catalog设置 |
| `bundle-library-size.md` | MEDIUM | 评估依赖 |
| `bundle-code-splitting.md` | MEDIUM | Re.Pack code splitting |

---

## 🔄 工作流集成

### 在CEO Workflow中的位置

```
阶段4: 开发实现（并行：Web + Mobile）
├─ 4.1: 后端API实现（fullstack-developer）
├─ 4.2: Web前端实现（fullstack-developer）
└─ 4.5: 移动端开发（mobile-developer）
    ├── 4.5.1: 项目初始化
    ├── 4.5.2: UI组件实现
    ├── 4.5.3: 状态管理实现
    ├── 4.5.4: API集成
    ├── 4.5.5: 原生功能集成
    └── 4.5.6: 性能优化 🆕
        └── 自动激活react-native-best-practices skill

阶段5: 测试验证
└─ 性能测试（基于优化后的代码）
```

### 激活时机

**自动触发**：
- mobile-developer完成移动端开发后
- 进入性能优化阶段（4.5.6）
- 自动加载react-native-best-practices skill
- 按照优先级应用优化指南

**手动触发**：
- 用户明确要求性能优化
- 出现性能问题（jank、内存泄漏、启动慢）
- 代码审查需要性能验证

---

## ✅ 更新的文件

### 核心配置文件

1. **skills/ceo/SKILL.md**
   - 版本号：6.4.0 → 6.5.0
   - 描述更新：添加"Enhanced mobile development with Callstack's React Native best practices"

2. **agents/ceo-mobile-developer.md**
   - 添加react-native-best-practices到"使用的Skills"
   - 更新性能优化函数，集成Callstack skill
   - 更新性能检查清单，按优先级分类

3. **.claude-plugin/plugin.json**
   - 版本号：6.4.0 → 6.5.0
   - 描述更新：添加"Enhanced mobile development with Callstack's React Native best practices"

4. **.claude-plugin/marketplace.json**
   - 版本号：6.4.0 → 6.5.0
   - 描述更新：添加"Enhanced mobile development with Callstack's React Native best practices"

### 新增文件

5. **skills/react-native-best-practices/**（完整目录）
   - SKILL.md
   - references/js-*
   - references/native-*
   - references/bundle-*
   - references/images/*

6. **docs/REACT_NATIVE_BEST_PRACTICES_INTEGRATION.md**（本文档）
   - 集成说明
   - 技能对比分析
   - 使用指南

---

## 🎉 集成效果

### 增强能力

**性能优化**：
- ✅ 系统性的性能优化方法论
- ✅ 详细的优化指南和代码示例
- ✅ 按优先级分类的优化策略
- ✅ 涵盖JS、Native、Bundling三个层面

**专业性**：
- ✅ 基于Callstack 9+年实战经验
- ✅ 行业标准的最佳实践
- ✅ 专业的性能分析工具和技巧

**开发体验**：
- ✅ 自动化的性能优化流程
- ✅ 清晰的优化检查清单
- ✅ 问题→优化的映射表

### 无冲突保证

**职责边界**：
- mobile-developer：负责应用开发（0→1）
- react-native-best-practices：负责性能优化（1→100）

**协作模式**：
- 开发阶段：mobile-developer主导
- 优化阶段：react-native-best-practices指导
- 两者完全互补，无重叠冲突

---

## 📚 使用示例

### 示例1：自动优化

```bash
/ceo:workflow "开发一个健身追踪App"

# workflow执行到阶段4.5.6时
# 自动激活react-native-best-practices skill
# 按照优先级应用优化指南
# 输出优化报告
```

### 示例2：手动优化

```bash
/ceo:workflow "优化我的React Native应用性能"

# 直接进入性能优化阶段
# 加载react-native-best-practices skill
# 分析性能瓶颈
# 应用针对性优化
```

### 示例3：问题修复

```bash
"我的App列表滚动很卡顿"

# mobile-developer检测到性能问题
# 自动激活react-native-best-practices skill
# 应用js-lists-flatlist-flashlist.md指南
# 实施Flash List优化
```

---

## 🔗 相关文档

- [Callstack Ultimate Guide to React Native Optimization](https://callstack.com/blog/ultimate-guide-to-react-native-optimization)
- [react-native-best-practices Skill](../skills/react-native-best-practices/SKILL.md)
- [Agent决策树](./AGENT_DECISION_TREE.md)
- [移动端技术栈分析](./MOBILE_TECH_STACK_ANALYSIS.md)
- [移动端快速开始](./MOBILE_QUICK_START.md)

---

## 📝 版本历史

- **v6.5.0** (2025-01-23): 集成Callstack react-native-best-practices skill
- **v6.4.0** (2025-01-23): 新增mobile-developer agent，支持移动端开发
- **v6.3.0** (2025-01-22): 新增集成测试功能

---

**集成完成** ✅
