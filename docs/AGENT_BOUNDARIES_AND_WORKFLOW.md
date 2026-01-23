# Agent职责边界与Workflow集成方案

**文档版本**: 1.0
**创建日期**: 2025-01-23
**作者**: CEO Agent Team

---

## 📋 目录

1. [问题定义](#问题定义)
2. [Agent职责矩阵](#agent职责矩阵)
3. [Workflow集成方案](#workflow集成方案)
4. [协作契约](#协作契约)
5. [实施指南](#实施指南)
6. [示例场景](#示例场景)

---

## 问题定义

### 问题1：Mobile-Developer在Workflow中的位置

**现状**：
- 现有workflow是线性的Web开发流程
- Mobile-Developer是新加入的agent
- 需要明确何时介入、如何与其他agents协作

**挑战**：
- 如何决定项目需要Web、Mobile还是Both？
- Mobile和Web开发如何并行？
- 如何避免重复工作？

### 问题2：Agent功能重叠

**涉及的Agents**：
1. system-architect（架构设计）
2. ui-ux-designer（UI/UX设计）
3. fullstack-developer（Web全栈开发）
4. mobile-developer（移动端开发）
5. test-engineer（测试工程师）

**重叠区域**：
- Architect ↔ Developer：技术设计与实现
- Designer ↔ Developer：设计与实现
- Fullstack ↔ Mobile：状态管理、API集成
- Developer ↔ Test Engineer：测试实现

---

## Agent职责矩阵

### 架构层：system-architect

**职责**：技术架构设计

**负责**：
- ✅ 技术选型（框架、数据库、缓存等）
- ✅ 系统架构设计（微服务、单体等）
- ✅ API规范设计（REST/GraphQL、接口定义）
- ✅ 数据模型设计（Schema、关系）
- ✅ 安全架构设计（认证、授权）
- ✅ 性能指标设定（响应时间、并发量）

**不负责**：
- ❌ 具体代码实现
- ❌ UI细节设计
- ❌ 测试用例编写

**输出产物**：
- 技术架构文档
- API规范文档（OpenAPI/Swagger）
- 数据模型定义（TypeScript类型）
- 安全规范
- 性能指标

---

### 设计层：ui-ux-designer

**职责**：用户体验和界面设计

**负责**：
- ✅ 用户故事映射
- ✅ 交互流程设计
- ✅ 视觉设计（色彩、字体、间距）
- ✅ 响应式设计规范（Web/Mobile）
- ✅ 设计系统（组件库、Design tokens）
- ✅ 原型和可交互设计稿

**不负责**：
- ❌ 具体代码实现
- ❌ 技术架构决策
- ❌ 性能优化实现

**输出产物**：
- 用户故事文档
- Figma设计稿
- 交互原型
- 设计规范（Design tokens）
- 组件规范

---

### 实现层：fullstack-developer

**职责**：Web全栈开发实现

**负责**：
- ✅ **后端API实现**（统一负责）
  - REST/GraphQL API
  - 数据库操作
  - 认证授权逻辑
  - 业务逻辑实现
- ✅ **Web前端实现**（如需要）
  - React/Next.js组件
  - Web状态管理
  - Web路由
  - Web响应式实现
- ✅ 代码质量和规范
- ✅ 单元测试实现

**不负责**：
- ❌ 移动端UI实现（由mobile-developer负责）
- ❌ 架构设计决策（由architect负责）
- ❌ 测试策略制定（由test-engineer负责）

**输出产物**：
- 后端API代码
- Web前端代码（如需要）
- API文档（自动生成）
- 单元测试代码

---

### 实现层：mobile-developer

**职责**：移动端开发实现

**负责**：
- ✅ **移动端UI实现**
  - React Native组件
  - 移动端布局和适配
  - 移动端导航
- ✅ **移动端状态管理**（基于architect设计）
  - 本地状态（Zustand）
  - 服务端状态（React Query）
- ✅ **API集成**（调用fullstack实现的API）
  - API客户端配置
  - 数据获取hooks
- ✅ **原生功能集成**
  - 相机、位置、推送等
  - 设备权限管理
- ✅ **移动端性能优化**
  - 列表优化（Flash List）
  - 图片优化
  - 内存管理
- ✅ 移动端单元测试

**不负责**：
- ❌ 后端API实现（由fullstack-developer负责）
- ❌ Web前端实现（由fullstack-developer负责）
- ❌ 架构设计决策（由architect负责）
- ❌ 设计决策（由designer负责）

**输出产物**：
- 移动端应用代码
- API客户端代码
- 单元测试代码
- 构建配置（EAS Build）

---

### 验证层：test-engineer

**职责**：测试策略和质量保证

**负责**：
- ✅ 测试策略制定
- ✅ 测试用例设计
- ✅ 测试框架配置
- ✅ 集成测试和E2E测试
- ✅ 性能测试
- ✅ 质量验收

**不负责**：
- ❌ 单元测试实现（由developer负责）
- ❌ 功能实现（由developer负责）

**输出产物**：
- 测试计划
- 测试用例
- 测试报告
- 质量验收报告

---

## Workflow集成方案

### 增强的Workflow流程

```
用户输入
    ↓
【阶段0】需求探索（brainstorming）
    ↓
【阶段1】需求澄清（产品经理）
    输出：PRD、用户故事
    ↓
【阶段2】产品设计（UI/UX设计师）
    输出：用户故事、Figma设计、设计规范
    ↓
【阶段3】架构设计（系统架构师）
    3.1 技术架构设计
    3.2 API规范设计
    3.3 🆕 平台决策（Web/Mobile/Both）
    输出：架构文档、API规范、平台决策
    ↓
【阶段3.5】工作区准备（git-worktrees）
    ↓
【阶段4】并行开发实现
    ├─ 4.1 后端API开发（fullstack-developer）【始终执行】
    │   输出：可运行的API
    │
    ├─ 4.2 Web前端开发（fullstack-developer）【如需要】
    │   输出：Web应用
    │
    └─ 4.3 移动端开发（mobile-developer）【如需要】
        输出：移动应用
    ↓
【阶段5】测试验证（test-engineer）
    ├─ 5.1 单元测试验证
    ├─ 5.2 集成测试（Web）
    ├─ 5.3 集成测试（Mobile）
    └─ 5.4 E2E测试
    ↓
【阶段6】交付部署（市场营销师）
    ├─ 6.1 Web部署（如需要）
    └─ 6.2 Mobile应用发布（如需要）
```

### 关键增强点

#### 1. 阶段3.3：平台决策

**决策依据**：
```yaml
决策因素:
  目标用户:
    - 办公场景 → 优先Web
    - 移动场景 → 优先Mobile
    - 全场景 → Both

  业务需求:
    - 复杂表单 → Web优势
    - 地理位置 → Mobile优势
    - 离线需求 → Mobile优势
    - 实时协作 → Web优势

  技术约束:
    - 需要原生功能 → Mobile
    - 需要大屏幕 → Web

  资源约束:
    - 开发时间
    - 团队能力
    - 预算
```

**决策输出**：
```typescript
interface PlatformDecision {
  platforms: ('web' | 'mobile')[];
  priority: 'web-first' | 'mobile-first' | 'parallel';
  rationale: string;
}
```

#### 2. 阶段4：并行开发

**触发逻辑**：
```typescript
// 根据平台决策动态激活agents
if (platformDecision.platforms.includes('web')) {
  // fullstack-developer实现Web前端
  activateAgent('fullstack-developer', {
    tasks: ['web-frontend'],
    dependsOn: ['backend-api']
  });
}

if (platformDecision.platforms.includes('mobile')) {
  // mobile-developer实现移动端
  activateAgent('mobile-developer', {
    tasks: ['mobile-app'],
    dependsOn: ['backend-api']
  });
}

// 后端API始终由fullstack-developer实现
activateAgent('fullstack-developer', {
  tasks: ['backend-api'],
  priority: 'first'
});
```

**并行策略**：
```yaml
web-first:
  顺序: 后端 → Web前端 → Mobile
  适用: Web是主要平台

mobile-first:
  顺序: 后端 → Mobile → Web前端
  适用: Mobile是主要平台

parallel:
  顺序: 后端 → (Web前端 || Mobile)
  适用: 两个平台同等重要
```

---

## 协作契约

### 1. API契约

**定义者**：system-architect
**实现者**：fullstack-developer
**消费者**：fullstack-developer（Web前端）、mobile-developer

**契约格式**：
```typescript
// architect定义
interface APIContract {
  endpoints: APIEndpoint[];
  types: TypeScriptTypes;
  authentication: AuthScheme;
}

// 示例
const todoAPI: APIContract = {
  endpoints: [
    {
      path: '/todos',
      method: 'GET',
      response: 'Todo[]',
      auth: true
    },
    {
      path: '/todos',
      method: 'POST',
      body: 'CreateTodoInput',
      response: 'Todo',
      auth: true
    }
  ],
  types: {
    Todo: {
      id: 'string',
      title: 'string',
      completed: 'boolean'
    },
    CreateTodoInput: {
      title: 'string',
      description: 'string?'
    }
  },
  authentication: 'Bearer Token'
};
```

**共享方式**：
- OpenAPI/Swagger文档
- 共享的TypeScript类型定义包
- 自动生成的API客户端

---

### 2. 数据契约

**定义者**：system-architect
**使用者**：所有agents

**契约格式**：
```typescript
// shared-types/src/entities/Todo.ts
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// shared-types/src/api/todos.ts
export interface CreateTodoInput {
  title: string;
  description?: string;
}

export interface UpdateTodoInput {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

**共享方式**：
- 独立的npm包：`@project/shared-types`
- 所有项目依赖此包
- 确保类型一致性

---

### 3. 设计契约

**定义者**：ui-ux-designer
**实现者**：fullstack-developer（Web）、mobile-developer（Mobile）

**契约内容**：

**Design Tokens**：
```typescript
// design-tokens/src/colors.ts
export const colors = {
  primary: '#0066FF',
  secondary: '#00C853',
  success: '#00E676',
  warning: '#FFAB00',
  error: '#FF5252',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    // ...
  }
};

// design-tokens/src/typography.ts
export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold' },
  h2: { fontSize: 24, fontWeight: 'bold' },
  body: { fontSize: 16, fontWeight: 'normal' }
};

// design-tokens/src/spacing.ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
```

**组件规范**：
```typescript
// design-tokens/src/components/Button.ts
export interface ButtonSpec {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  disabled: boolean;
}

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary,
    color: '#FFFFFF'
  },
  // ...
};
```

**共享方式**：
- Figma设计稿
- Design tokens包
- 设计系统文档

---

### 4. 测试契约

**定义者**：test-engineer
**实现者**：fullstack-developer、mobile-developer

**契约内容**：

**测试策略**：
```yaml
测试层次:
  单元测试:
    目标覆盖率: 70%
    负责人: developer
    验证者: test-engineer

  集成测试:
    覆盖范围: 所有API端点
    负责人: test-engineer
    执行者: developer

  E2E测试:
    覆盖范围: 核心用户流程
    负责人: test-engineer
    平台: Web (Playwright), Mobile (Maestro)

  性能测试:
    指标: LCP < 2.5s, FID < 100ms
    负责人: test-engineer
```

**测试规范**：
```typescript
// test-specs/src/api/todos.test.ts
describe('Todo API', () => {
  it('应该返回todo列表', async () => {
    const response = await apiClient.get('/todos');
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String)
      })
    ]));
  });
});
```

---

## 实施指南

### 步骤1：更新workflow配置

修改 `skills/ceo/workflow.md`：

```markdown
## 阶段3：架构设计

### 3.3 平台决策

**输入**：
- 产品需求文档（PRD）
- 用户故事文档
- 业务场景分析

**决策流程**：
1. 分析目标用户和使用场景
2. 评估技术约束和资源约束
3. 决定开发平台（Web/Mobile/Both）
4. 确定开发优先级

**输出**：
```typescript
interface PlatformDecision {
  platforms: ('web' | 'mobile')[];
  priority: 'web-first' | 'mobile-first' | 'parallel';
  rationale: string;
}
```

---

### 步骤2：创建共享契约包

```bash
# 创建共享类型包
mkdir -p packages/shared-types/src
cd packages/shared-types
pnpm init

# 创建设计tokens包
mkdir -p packages/design-tokens/src
cd packages/design-tokens
pnpm init
```

---

### 步骤3：更新Agent配置

修改 `agents/ceo-fullstack-developer.md`，明确职责：

```markdown
## 职责范围

### 后端API实现（统一负责）
- REST/GraphQL API
- 数据库操作
- 认证授权
- 业务逻辑

### Web前端实现（如需要）
- React/Next.js组件
- Web状态管理
- Web响应式实现

### 不负责
- ❌ 移动端UI实现（由mobile-developer负责）
```

修改 `agents/ceo-mobile-developer.md`，明确依赖：

```markdown
## 依赖关系

### 输入依赖
- system-architect：技术架构、API规范
- ui-ux-designer：设计规范、Figma设计
- fullstack-developer：后端API

### 输出产出
- 移动端应用代码
- 移动端测试代码
```

---

### 步骤4：实现平台决策逻辑

创建 `skills/ceo/platform-decision.ts`：

```typescript
export function decidePlatform(prd: PRD): PlatformDecision {
  const factors = analyzeFactors(prd);

  // 决策逻辑
  if (factors.targetUsers.includes('mobile-only')) {
    return { platforms: ['mobile'], priority: 'mobile-first' };
  }

  if (factors.targetUsers.includes('office-workers')) {
    return { platforms: ['web'], priority: 'web-first' };
  }

  if (factors.requiresNativeFeatures) {
    return { platforms: ['mobile'], priority: 'mobile-first' };
  }

  // 默认：全平台
  return { platforms: ['web', 'mobile'], priority: 'parallel' };
}
```

---

## 示例场景

### 场景1：纯Web应用

**需求**：企业内部管理系统

**决策过程**：
1. 阶段3.3：平台决策
   - 目标用户：办公室员工
   - 使用场景：桌面办公
   - 决策：`{ platforms: ['web'], priority: 'web-first' }`

2. 阶段4：开发实现
   - fullstack-developer：后端API + Web前端
   - mobile-developer：不激活

3. 阶段5：测试
   - test-engineer：Web测试

---

### 场景2：纯移动应用

**需求**：户外运动追踪App

**决策过程**：
1. 阶段3.3：平台决策
   - 目标用户：户外运动者
   - 使用场景：移动中
   - 需要原生功能：GPS、相机、传感器
   - 决策：`{ platforms: ['mobile'], priority: 'mobile-first' }`

2. 阶段4：开发实现
   - fullstack-developer：后端API
   - mobile-developer：移动端App

3. 阶段5：测试
   - test-engineer：API测试 + 移动端测试

---

### 场景3：Web + Mobile应用

**需求**：电商平台

**决策过程**：
1. 阶段3.3：平台决策
   - 目标用户：全场景用户
   - 使用场景：浏览（Web）+ 下单（Mobile）
   - 决策：`{ platforms: ['web', 'mobile'], priority: 'parallel' }`

2. 阶段4：开发实现（并行）
   ```
   fullstack-developer:
     ├─ 后端API（优先）
     └─ Web前端（与Mobile并行）

   mobile-developer:
     └─ 移动端App（与Web并行）
   ```

3. 阶段5：测试
   - test-engineer：Web测试 + Mobile测试 + 集成测试

---

## 边界检查清单

### Architect边界检查

- [ ] 是否定义了API规范？
- [ ] 是否定义了数据模型？
- [ ] 是否定义了性能指标？
- [ ] 是否没有涉及具体实现代码？

### Designer边界检查

- [ ] 是否提供了设计规范？
- [ ] 是否提供了Figma设计稿？
- [ ] 是否定义了响应式规则？
- [ ] 是否没有涉及技术实现？

### Fullstack Developer边界检查

- [ ] 是否实现了后端API？
- [ ] 是否遵循了Architect的设计？
- [ ] 是否遵循了Designer的规范？
- [ ] 是否没有涉及移动端实现（除非是Mobile项目）？

### Mobile Developer边界检查

- [ ] 是否调用了Fullstack实现的API？
- [ ] 是否遵循了Architect的设计？
- [ ] 是否遵循了Designer的规范？
- [ ] 是否没有重新实现后端逻辑？

### Test Engineer边界检查

- [ ] 是否定义了测试策略？
- [ ] 是否验证了所有平台？
- [ ] 是否没有编写单元测试（由developer负责）？

---

## 总结

### 核心原则

1. **单一职责**：每个agent有明确的职责范围
2. **契约驱动**：通过共享契约确保协作
3. **平台分离**：Web和Mobile并行实现，共享后端
4. **动态激活**：根据需求动态激活相应的agents

### 职责边界总结

| Agent | 决策 | 实现 | 验证 |
|-------|------|------|------|
| system-architect | ✅ 技术决策 | ❌ | ❌ |
| ui-ux-designer | ✅ 设计决策 | ❌ | ❌ |
| fullstack-developer | ❌ | ✅ Web+后端 | ❌ |
| mobile-developer | ❌ | ✅ Mobile | ❌ |
| test-engineer | ❌ | ❌ | ✅ 质量验证 |

### 协作流程总结

```
Architect (API设计) → Fullstack (API实现) → [Web/Mobile] (API调用)
                        ↓
                    Test Engineer (API测试)

Designer (UI设计) → [Web/Mobile] (UI实现) → Test Engineer (UI测试)
```

---

**文档结束**

**下一步**：根据此方案更新workflow配置和agent配置
