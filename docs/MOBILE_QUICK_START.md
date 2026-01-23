# 移动端开发快速开始指南

**版本**: 1.0
**最后更新**: 2025-01-23

---

## 📱 什么是移动端开发Agent？

`ceo-mobile-developer` 是CEO技能插件中的移动端开发专家，负责将产品需求转化为iOS和Android应用。

### 核心能力

- 📱 使用 Expo + TypeScript 开发跨平台应用
- 🎨 使用 TailwindCSS + Nativewind 实现现代化UI
- 💾 使用 Zustand + React Query 管理状态
- 🧪 使用 Jest + Maestro 进行测试
- ⚡ 性能优化和原生功能集成

---

## 🚀 快速开始

### 前置要求

```bash
# 1. 安装Node.js (>= 18)
node --version

# 2. 安装pnpm
npm install -g pnpm

# 3. 安装Expo CLI
npm install -g expo-cli

# 4. 安装EAS CLI（用于构建）
npm install -g eas-cli

# 5. iOS开发需要Xcode（仅macOS）
# Android开发需要Android Studio
```

### 创建第一个移动应用

#### 方法1：通过CEO workflow（推荐）

```bash
# 启动workflow，自动检测移动端需求
/ceo:workflow "我想要一个待办事项移动应用"

# workflow会自动：
# 1. 需求澄清（产品经理）
# 2. UI设计（UI/UX设计师）
# 3. 架构设计（系统架构师）
# 4. 移动端开发（移动端开发者）✨
# 5. 测试验证
```

#### 方法2：手动创建项目

```bash
# 使用obytes模板创建项目
npx create-expo-app --template https://github.com/obytes/react-native-template-obytes my-app

# 进入项目目录
cd my-app

# 安装依赖
pnpm install

# 启动开发服务器
pnpm start
```

### 项目结构

```
my-app/
├── app/                   # expo-router页面
│   ├── (tabs)/           # 底部标签页
│   │   ├── index.tsx     # 首页
│   │   └── _layout.tsx   # 标签布局
│   ├── modal/            # 模态页面
│   └── _layout.tsx       # 根布局
├── components/           # 通用组件
├── hooks/               # 自定义hooks
├── stores/              # Zustand stores
├── lib/                 # 工具库
│   ├── api-client.ts    # API客户端
│   └── utils.ts         # 工具函数
├── types/               # TypeScript类型
├── constants/           # 常量
├── assets/              # 静态资源
├── __tests__/           # 测试文件
├── maestro/             # E2E测试
├── .github/             # GitHub Actions
├── app.json             # Expo配置
├── tailwind.config.js   # Tailwind配置
└── tsconfig.json        # TypeScript配置
```

---

## 📚 核心概念

### 1. 文件路由（expo-router）

```typescript
// app/index.tsx → 首页 (/)
export default function IndexScreen() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl">首页</Text>
    </View>
  );
}

// app/about.tsx → 关于页面 (/about)
export default function AboutScreen() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl">关于</Text>
    </View>
  );
}

// app/(tabs)/profile.tsx → 标签页面 (/profile)
export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-white">
      <Text className="text-2xl">个人资料</Text>
    </View>
  );
}
```

### 2. TailwindCSS样式

```typescript
import { View, Text } from 'react-native';

export default function StyledScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold text-blue-500 mb-4">
        TailwindCSS样式
      </Text>
      <View className="bg-gray-100 rounded-lg p-4">
        <Text className="text-gray-700">
          使用TailwindCSS编写样式，就像Web开发一样！
        </Text>
      </View>
    </View>
  );
}
```

### 3. 状态管理（Zustand）

```typescript
// stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// 在组件中使用
export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View>
      <Text>欢迎, {user?.name}</Text>
      <Button onPress={logout}>退出登录</Button>
    </View>
  );
}
```

### 4. 数据获取（React Query）

```typescript
// hooks/useTodos.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const { data } = await apiClient.get('/todos');
      return data;
    },
  });
}

// 在组件中使用
export default function TodosScreen() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <Text>加载中...</Text>;
  if (error) return <Text>加载失败</Text>;

  return (
    <FlatList
      data={todos}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
}
```

### 5. 表单处理（react-hook-form + zod）

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 定义验证schema
const todoSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  description: z.string().optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export default function CreateTodoScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = async (data: TodoFormData) => {
    // 创建todo
    await apiClient.post('/todos', data);
  };

  return (
    <View className="p-4">
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="输入标题"
            className="border border-gray-300 rounded p-2"
          />
        )}
      />
      {errors.title && <Text className="text-red-500">{errors.title.message}</Text>}

      <Button title="创建" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

---

## 🧪 测试

### 单元测试

```typescript
// __tests__/components/Button.test.tsx
import { render } from '@testing-library/react-native';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button title="点击我" />);
    expect(getByText('点击我')).toBeTruthy();
  });

  it('calls onPress when clicked', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button title="点击我" onPress={onPress} />);
    fireEvent.press(getByText('点击我'));
    expect(onPress).toHaveBeenCalled();
  });
});
```

### E2E测试（Maestro）

```yaml
# maestro/todos-flow.yaml
appId: com.example.myapp
---
- launchApp
- tapOn: "待办事项"
- assertVisible: "我的待办事项"
- tapOn: "添加"
- tapOn: "输入标题"
- inputText: "买牛奶"
- tapOn: "保存"
- assertVisible: "买牛奶"
```

运行测试：

```bash
# 单元测试
pnpm test

# E2E测试
maestro test maestro/todos-flow.yaml
```

---

## 🔌 原生功能集成

### 相机

```typescript
import * as ImagePicker from 'expo-image-picker';

export function useCamera() {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return { image, takePhoto };
}
```

### 位置

```typescript
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  return location;
}
```

### 推送通知

```typescript
import * as Notifications from 'expo-notifications';

export async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('推送通知权限未授予！');
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  return token.data;
}
```

---

## ⚡ 性能优化

### 使用Flash List

```typescript
import { FlashList } from '@shopify/flash-list';

export function OptimizedList({ data }: { data: Item[] }) {
  return (
    <FlashList
      data={data}
      estimatedItemSize={80}
      renderItem={({ item }) => (
        <View className="p-4 border-b border-gray-200">
          <Text className="text-base">{item.title}</Text>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}
```

### 图片优化

```typescript
import { Image } from 'expo-image';

export function OptimizedImage({ uri }: { uri: string }) {
  return (
    <Image
      source={{ uri }}
      style={{ width: 200, height: 200 }}
      contentFit="cover"
      transition={200}
    />
  );
}
```

### 避免重渲染

```typescript
import { memo } from 'react';

export const ExpensiveComponent = memo(({ data }: { data: Data }) => {
  // 复杂的渲染逻辑
  return <View>{/* ... */}</View>;
});
```

---

## 📦 构建和发布

### 开发构建

```bash
# iOS
pnpm ios

# Android
pnpm android
```

### 生产构建（EAS Build）

```bash
# 配置EAS
eas build:configure

# 构建iOS
eas build --platform ios

# 构建Android
eas build --platform android

# 提交到应用商店
eas submit --platform ios
eas submit --platform android
```

### OTA更新（EAS Update）

```bash
# 发布更新
eas update --branch production --message "修复bug"
```

---

## 🤝 与Web端协作

### 共享类型定义

```typescript
// types/api.ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoInput {
  title: string;
  description?: string;
}
```

Web端和移动端都可以导入这些类型：

```typescript
// 移动端
import { Todo, CreateTodoInput } from '@/types/api';

// Web端
import { Todo, CreateTodoInput } from '@/types/api';
```

### 共享API客户端

```typescript
// lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});
```

---

## 🆘 常见问题

### Q: 为什么要使用Expo而不是React Native CLI？

A: Expo提供：
- ✅ 更好的开发体验
- ✅ 简化的构建流程
- ✅ 统一的API访问
- ✅ 更容易的OTA更新
- ✅ React Native官方推荐

### Q: 如何处理iOS和Android的差异？

A: 使用Platform模块：

```typescript
import { Platform } from 'react-native';

const Component = () => {
  return (
    <View style={Platform.OS === 'ios' ? styles.ios : styles.android}>
      {/* 内容 */}
    </View>
  );
};
```

### Q: 如何调试？

A: 使用Expo DevTools：

```bash
# 启动开发服务器后，按:
# - iOS: Cmd + D (摇一摇)
# - Android: Cmd + M (摇一摇)
```

---

## 📚 更多资源

- [Expo文档](https://docs.expo.dev/)
- [expo-router文档](https://docs.expo.dev/router/introduction/)
- [React Native文档](https://reactnative.dev/)
- [Nativewind文档](https://www.nativewind.dev/)
- [Obytes模板GitHub](https://github.com/obytes/react-native-template-obytes)

---

**下一步**: 开始创建你的第一个移动应用！
