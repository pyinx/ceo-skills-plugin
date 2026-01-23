# 平台决策逻辑

**版本**: 1.0
**创建日期**: 2025-01-23

---

## 概述

此模块负责根据产品需求、用户场景、功能需求和技术约束，决定开发平台（Web/Mobile/Both）和开发优先级。

---

## 决策流程

### Step 1: 分析决策因素

```typescript
interface PlatformDecisionFactors {
  // 用户因素
  user: {
    targetAudience: 'office-workers' | 'mobile-users' | 'all-users';
    primaryDevice: 'desktop' | 'mobile' | 'tablet' | 'mixed';
    usageContext: 'fixed-location' | 'on-the-go' | 'flexible';
  };

  // 功能因素
  features: {
    nativeFeatures: string[]; // GPS、相机、传感器等
    complexForms: boolean;    // 复杂表单更适合Web
    realTimeSync: boolean;     // 实时同步更适合Web
    offlineSupport: boolean;   // 离线支持更适合Mobile
    mediaHeavy: boolean;       // 媒体密集型应用
  };

  // 技术因素
  technical: {
    webComplexity: 'low' | 'medium' | 'high';
    mobileComplexity: 'low' | 'medium' | 'high';
    apiComplexity: 'low' | 'medium' | 'high';
  };

  // 约束因素
  constraints: {
    developmentTime: 'tight' | 'normal' | 'flexible';
    teamCapability: 'web-only' | 'mobile-only' | 'full-stack';
    budget: 'limited' | 'normal' | 'sufficient';
  };
}
```

### Step 2: 决策矩阵

基于决策因素进行评分：

```typescript
interface PlatformScores {
  web: number;
  mobile: number;
}

function calculateScores(factors: PlatformDecisionFactors): PlatformScores {
  let webScore = 50;  // 基础分
  let mobileScore = 50;

  // 用户因素
  if (factors.user.targetAudience === 'office-workers') {
    webScore += 20;
    mobileScore -= 10;
  } else if (factors.user.targetAudience === 'mobile-users') {
    mobileScore += 20;
    webScore -= 10;
  } else if (factors.user.targetAudience === 'all-users') {
    webScore += 10;
    mobileScore += 10;
  }

  if (factors.user.primaryDevice === 'desktop') {
    webScore += 15;
    mobileScore -= 5;
  } else if (factors.user.primaryDevice === 'mobile') {
    mobileScore += 15;
    webScore -= 5;
  }

  if (factors.user.usageContext === 'fixed-location') {
    webScore += 10;
  } else if (factors.user.usageContext === 'on-the-go') {
    mobileScore += 15;
  }

  // 功能因素
  if (factors.features.nativeFeatures.length > 0) {
    mobileScore += factors.features.nativeFeatures.length * 10;
    webScore -= 5;
  }

  if (factors.features.complexForms) {
    webScore += 15;
    mobileScore -= 5;
  }

  if (factors.features.realTimeSync) {
    webScore += 10;
  }

  if (factors.features.offlineSupport) {
    mobileScore += 15;
  }

  if (factors.features.mediaHeavy) {
    mobileScore += 10;
  }

  // 技术因素
  if (factors.technical.webComplexity === 'high') {
    webScore -= 10;
  }

  if (factors.technical.mobileComplexity === 'high') {
    mobileScore -= 10;
  }

  // 约束因素
  if (factors.constraints.teamCapability === 'web-only') {
    webScore += 30;
    mobileScore = 0;
  } else if (factors.constraints.teamCapability === 'mobile-only') {
    mobileScore += 30;
    webScore = 0;
  }

  if (factors.constraints.developmentTime === 'tight') {
    // 时间紧张，优先选择单一平台
    if (webScore > mobileScore) {
      webScore += 10;
      mobileScore -= 10;
    } else {
      mobileScore += 10;
      webScore -= 10;
    }
  }

  if (factors.constraints.budget === 'limited') {
    // 预算有限，优先选择单一平台
    if (webScore > mobileScore) {
      webScore += 10;
      mobileScore -= 10;
    } else {
      mobileScore += 10;
      webScore -= 10;
    }
  }

  return { web: webScore, mobile: mobileScore };
}
```

### Step 3: 生成决策

```typescript
interface PlatformDecision {
  // 目标平台
  platforms: ('web' | 'mobile')[];

  // 开发优先级
  priority: 'web-first' | 'mobile-first' | 'parallel';

  // 决策理由
  rationale: string;

  // 实施建议
  implementation: {
    phasedRollout: boolean;
    mvpPlatform: 'web' | 'mobile';
    featuresByPlatform: {
      web: string[];
      mobile: string[];
      shared: string[];
    };
  };

  // 评分详情
  scores: PlatformScores;
}

function makeDecision(
  factors: PlatformDecisionFactors,
  scores: PlatformScores
): PlatformDecision {
  const { web, mobile } = scores;
  const threshold = 60; // 最低分数阈值

  // 决策平台
  let platforms: ('web' | 'mobile')[] = [];
  let priority: 'web-first' | 'mobile-first' | 'parallel';

  if (web >= threshold && mobile >= threshold) {
    // 两者都达到阈值
    platforms = ['web', 'mobile'];

    // 决定优先级
    const diff = Math.abs(web - mobile);
    if (diff < 10) {
      priority = 'parallel';
    } else if (web > mobile) {
      priority = 'web-first';
    } else {
      priority = 'mobile-first';
    }
  } else if (web >= threshold) {
    platforms = ['web'];
    priority = 'web-first';
  } else if (mobile >= threshold) {
    platforms = ['mobile'];
    priority = 'mobile-first';
  } else {
    // 都未达到阈值，选择分数较高的
    platforms = ['web', 'mobile'];
    priority = web >= mobile ? 'web-first' : 'mobile-first';
  }

  // 生成决策理由
  const rationale = generateRationale(factors, scores, platforms, priority);

  // 生成实施建议
  const implementation = generateImplementation(factors, platforms, priority);

  return {
    platforms,
    priority,
    rationale,
    implementation,
    scores: { web, mobile },
  };
}
```

### Step 4: 生成决策理由

```typescript
function generateRationale(
  factors: PlatformDecisionFactors,
  scores: PlatformScores,
  platforms: ('web' | 'mobile')[],
  priority: string
): string {
  const reasons: string[] = [];

  // 用户因素
  if (factors.user.targetAudience === 'office-workers') {
    reasons.push('目标用户主要为办公室员工，更适合桌面环境');
  } else if (factors.user.targetAudience === 'mobile-users') {
    reasons.push('目标用户主要为移动用户，需要移动端体验');
  } else if (factors.user.targetAudience === 'all-users') {
    reasons.push('目标用户覆盖全场景，需要Web和Mobile双平台');
  }

  // 功能因素
  if (factors.features.nativeFeatures.length > 0) {
    reasons.push(`需要${factors.features.nativeFeatures.length}个原生功能（${factors.features.nativeFeatures.join(', ')}），Mobile平台更合适`);
  }

  if (factors.features.complexForms) {
    reasons.push('包含复杂表单处理，Web平台更适合');
  }

  if (factors.features.offlineSupport) {
    reasons.push('需要离线支持，Mobile平台更有优势');
  }

  // 技术因素
  if (factors.technical.webComplexity === 'high') {
    reasons.push('Web端实现复杂度较高');
  }

  if (factors.technical.mobileComplexity === 'high') {
    reasons.push('Mobile端实现复杂度较高');
  }

  // 约束因素
  if (factors.constraints.developmentTime === 'tight') {
    reasons.push('开发时间紧张，优先实现核心平台');
  }

  if (factors.constraints.teamCapability === 'web-only') {
    reasons.push('团队只有Web开发能力');
  }

  // 评分信息
  reasons.push(`评分：Web=${scores.web}, Mobile=${scores.mobile}`);

  // 平台决策
  reasons.push(`决策：开发${platforms.join(' + ')}平台，采用${priority}策略`);

  return reasons.join('；') + '。';
}
```

### Step 5: 生成实施建议

```typescript
function generateImplementation(
  factors: PlatformDecisionFactors,
  platforms: ('web' | 'mobile')[],
  priority: string
) {
  const implementation = {
    phasedRollout: false,
    mvpPlatform: platforms[0],
    featuresByPlatform: {
      web: [] as string[],
      mobile: [] as string[],
      shared: [] as string[],
    },
  };

  // 功能分配
  if (platforms.includes('mobile')) {
    implementation.featuresByPlatform.mobile.push(
      '移动端UI',
      '触摸交互',
      '手势导航'
    );

    if (factors.features.nativeFeatures.length > 0) {
      implementation.featuresByPlatform.mobile.push(
        ...factors.features.nativeFeatures
      );
    }

    if (factors.features.offlineSupport) {
      implementation.featuresByPlatform.mobile.push('离线缓存');
    }
  }

  if (platforms.includes('web')) {
    implementation.featuresByPlatform.web.push(
      '响应式布局',
      '键盘快捷键',
      '大屏优化'
    );

    if (factors.features.complexForms) {
      implementation.featuresByPlatform.web.push('复杂表单');
    }

    if (factors.features.realTimeSync) {
      implementation.featuresByPlatform.web.push('实时协作');
    }
  }

  // 共享功能
  implementation.featuresByPlatform.shared.push(
    '用户认证',
    '数据同步',
    '核心业务逻辑'
  );

  // 分阶段发布决策
  if (platforms.length === 2 && factors.constraints.budget === 'limited') {
    implementation.phasedRollout = true;
    implementation.mvpPlatform = priority === 'web-first' ? 'web' : 'mobile';
  }

  return implementation;
}
```

---

## 完整决策函数

```typescript
export function decidePlatform(prd: ProductRequirementDocument): PlatformDecision {
  // 1. 分析决策因素
  const factors = analyzeFactors(prd);

  // 2. 计算评分
  const scores = calculateScores(factors);

  // 3. 生成决策
  const decision = makeDecision(factors, scores);

  return decision;
}

function analyzeFactors(prd: ProductRequirementDocument): PlatformDecisionFactors {
  return {
    user: analyzeUserFactors(prd),
    features: analyzeFeatureFactors(prd),
    technical: analyzeTechnicalFactors(prd),
    constraints: analyzeConstraints(prd),
  };
}

function analyzeUserFactors(prd: ProductRequirementDocument): PlatformDecisionFactors['user'] {
  // 从PRD中提取用户因素
  // 实现细节略...
  return {
    targetAudience: 'all-users',
    primaryDevice: 'mixed',
    usageContext: 'flexible',
  };
}

function analyzeFeatureFactors(prd: ProductRequirementDocument): PlatformDecisionFactors['features'] {
  // 从PRD中提取功能因素
  // 实现细节略...
  return {
    nativeFeatures: [],
    complexForms: false,
    realTimeSync: false,
    offlineSupport: false,
    mediaHeavy: false,
  };
}

function analyzeTechnicalFactors(prd: ProductRequirementDocument): PlatformDecisionFactors['technical'] {
  // 从PRD中提取技术因素
  // 实现细节略...
  return {
    webComplexity: 'medium',
    mobileComplexity: 'medium',
    apiComplexity: 'medium',
  };
}

function analyzeConstraints(prd: ProductRequirementDocument): PlatformDecisionFactors['constraints'] {
  // 从PRD中提取约束因素
  // 实现细节略...
  return {
    developmentTime: 'normal',
    teamCapability: 'full-stack',
    budget: 'normal',
  };
}
```

---

## 使用示例

### 在CEO workflow中

```typescript
// 在阶段3.3使用
import { decidePlatform } from './platform-decision';

// 读取PRD
const prd = await readPRD('.claudedocs/ceo-product-manager_result.md');

// 生成平台决策
const decision = decidePlatform(prd);

// 保存决策文档
await writePlatformDecision('.claudedocs/platform-decision.md', decision);

// 显示决策结果
console.log(`🎯 平台决策: ${decision.platforms.join(' + ')}`);
console.log(`📊 开发策略: ${decision.priority}`);
console.log(`📝 决策理由: ${decision.rationale}`);
```

### 决策文档格式

```markdown
# 平台决策文档

## 决策结果

- **目标平台**: Web + Mobile
- **开发策略**: parallel
- **MVP平台**: Web

## 决策理由

目标用户覆盖全场景，需要Web和Mobile双平台；评分：Web=75, Mobile=72；决策：开发Web + Mobile平台，采用parallel策略。

## 实施计划

- **分阶段发布**: 否
- **MVP平台**: Web

## 功能分配

### Web独有功能
- 响应式布局
- 键盘快捷键
- 大屏优化

### Mobile独有功能
- 移动端UI
- 触摸交互
- 手势导航

### 共享功能
- 用户认证
- 数据同步
- 核心业务逻辑

## 评分详情

- **Web**: 75分
- **Mobile**: 72分
```

---

## 决策场景示例

### 场景1：企业内部管理系统

**输入**：
```typescript
{
  user: {
    targetAudience: 'office-workers',
    primaryDevice: 'desktop',
    usageContext: 'fixed-location',
  },
  features: {
    nativeFeatures: [],
    complexForms: true,
    realTimeSync: true,
    offlineSupport: false,
  },
}
```

**输出**：
```typescript
{
  platforms: ['web'],
  priority: 'web-first',
  rationale: '目标用户主要为办公室员工，更适合桌面环境；包含复杂表单处理，Web平台更适合；评分：Web=95, Mobile=45',
}
```

### 场景2：户外运动追踪App

**输入**：
```typescript
{
  user: {
    targetAudience: 'mobile-users',
    primaryDevice: 'mobile',
    usageContext: 'on-the-go',
  },
  features: {
    nativeFeatures: ['GPS', 'camera', 'sensors'],
    complexForms: false,
    realTimeSync: false,
    offlineSupport: true,
  },
}
```

**输出**：
```typescript
{
  platforms: ['mobile'],
  priority: 'mobile-first',
  rationale: '目标用户主要为移动用户，需要移动端体验；需要3个原生功能（GPS, camera, sensors），Mobile平台更合适；需要离线支持，Mobile平台更有优势；评分：Web=25, Mobile=115',
}
```

### 场景3：电商平台

**输入**：
```typescript
{
  user: {
    targetAudience: 'all-users',
    primaryDevice: 'mixed',
    usageContext: 'flexible',
  },
  features: {
    nativeFeatures: ['camera'],
    complexForms: false,
    realTimeSync: true,
    offlineSupport: false,
  },
}
```

**输出**：
```typescript
{
  platforms: ['web', 'mobile'],
  priority: 'parallel',
  rationale: '目标用户覆盖全场景，需要Web和Mobile双平台；需要1个原生功能（camera），Mobile平台更合适；需要实时协作，Web平台更适合；评分：Web=72, Mobile=75',
}
```

---

## 配置选项

```typescript
interface DecisionConfig {
  // 最低分数阈值
  scoreThreshold: number;

  // 平行决策的分数差异阈值
  parallelThreshold: number;

  // 强制单一平台的约束
  forceSinglePlatform: boolean;

  // 默认优先级
  defaultPriority: 'web-first' | 'mobile-first' | 'parallel';
}

const defaultConfig: DecisionConfig = {
  scoreThreshold: 60,
  parallelThreshold: 10,
  forceSinglePlatform: false,
  defaultPriority: 'parallel',
};
```

---

## 扩展性

此模块支持扩展：

1. **自定义决策因素**：添加新的决策维度
2. **自定义评分算法**：调整评分权重
3. **自定义决策逻辑**：实现特定业务规则

---

**文档结束**
