# Design Tokens Package

共享的设计规范包，供Web和Mobile使用。

## 包结构

```
packages/design-tokens/
├── src/
│   ├── colors.ts         # 色彩规范
│   ├── typography.ts     # 字体规范
│   ├── spacing.ts        # 间距规范
│   ├── borderRadius.ts  # 圆角规范
│   ├── shadows.ts        # 阴影规范
│   ├── breakpoints.ts    # 断点规范
│   └── index.ts          # 导出所有tokens
├── package.json
└── tsconfig.json
```

## Design Tokens定义

### colors.ts

```typescript
export const colors = {
  // 主色
  primary: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
  },

  // 次色
  secondary: {
    50: '#F3E5F5',
    100: '#E1BEE7',
    200: '#CE93D8',
    300: '#BA68C8',
    400: '#AB47BC',
    500: '#9C27B0',
    600: '#8E24AA',
    700: '#7B1FA2',
    800: '#6A1B9A',
    900: '#4A148C',
  },

  // 功能色
  success: {
    light: '#81C784',
    main: '#4CAF50',
    dark: '#388E3C',
  },

  warning: {
    light: '#FFB74D',
    main: '#FF9800',
    dark: '#F57C00',
  },

  error: {
    light: '#E57373',
    main: '#F44336',
    dark: '#D32F2F',
  },

  info: {
    light: '#64B5F6',
    main: '#2196F3',
    dark: '#1976D2',
  },

  // 灰色
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // 文本色
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    hint: '#9E9E9E',
  },

  // 背景色
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    disabled: '#EEEEEE',
  },

  // 分割线
  divider: '#E0E0E0',
} as const;
```

### typography.ts

```typescript
export const typography = {
  // 字体家族
  fontFamily: {
    primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'Monaco, Consolas, "Courier New", monospace',
  },

  // 字体大小
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  // 字重
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // 行高
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// 预定义文本样式
export const textStyles = {
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },

  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.lineHeight.tight,
  },

  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.normal,
  },

  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
  },

  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    color: colors.text.secondary,
  },
} as const;
```

### spacing.ts

```typescript
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

// 别名
export const space = {
  xs: spacing[1],
  sm: spacing[2],
  md: spacing[4],
  lg: spacing[6],
  xl: spacing[8],
  '2xl': spacing[12],
  '3xl': spacing[16],
} as const;
```

### borderRadius.ts

```typescript
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
} as const;
```

### shadows.ts

```typescript
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;
```

### breakpoints.ts

```typescript
export const breakpoints = {
  sm: '640px',   // 手机
  md: '768px',   // 平板
  lg: '1024px',  // 桌面
  xl: '1280px',  // 大桌面
  '2xl': '1536px', // 超大桌面
} as const;
```

## 使用示例

### 在Web（React/TailwindCSS）

```typescript
import { colors, spacing, borderRadius } from '@project/design-tokens';

// 使用tokens
const buttonStyle = {
  backgroundColor: colors.primary.main,
  padding: spacing[2, 4],
  borderRadius: borderRadius.base,
};
```

### 在Mobile（React Native/Nativewind）

```typescript
import { colors, spacing, textStyles } from '@project/design-tokens';

// 使用tokens
<View style={{
  backgroundColor: colors.background.default,
  padding: spacing.md,
}}>
  <Text style={textStyles.h1}>标题</Text>
</View>
```

### 在TailwindCSS配置

```javascript
// tailwind.config.js
import { colors, spacing, borderRadius } from '@project/design-tokens';

module.exports = {
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      borderRadius: borderRadius,
    },
  },
};
```

### 在Nativewind配置

```javascript
// nativewind-env.d.ts
import { colors, spacing } from '@project/design-tokens';

declare module 'nativewind' {
  interface Theme {
    colors: typeof colors;
    spacing: typeof spacing;
  }
}
```

## 设计原则

### 一致性
- 在所有平台使用相同的设计token
- 保持视觉一致性

### 可扩展性
- 易于添加新的token
- 支持主题定制

### 可维护性
- 集中管理设计规范
- 便于版本控制和更新

## 版本管理

- 使用语义化版本
- 破坏性变更需要升级主版本号
- 新增token为次版本号
- Bug修复为修订号

## 开发指南

### 添加新Token

1. 在相应的文件中定义token
2. 在`src/index.ts`中导出
3. 更新版本号
4. 发布新版本

### 主题定制

支持多主题：

```typescript
export const themes = {
  light: {
    colors: { /* ... */ },
  },
  dark: {
    colors: { /* ... */ },
  },
};
```
