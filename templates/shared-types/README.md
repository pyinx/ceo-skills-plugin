# Shared Types Package

共享的类型定义包，供Web、Mobile和后端使用。

## 包结构

```
packages/shared-types/
├── src/
│   ├── entities/          # 实体类型
│   │   ├── User.ts
│   │   ├── Todo.ts
│   │   └── index.ts
│   ├── api/              # API类型
│   │   ├── requests.ts
│   │   ├── responses.ts
│   │   └── index.ts
│   ├── common/           # 通用类型
│   │   ├── base.ts
│   │   └── index.ts
│   └── index.ts          # 导出所有类型
├── package.json
└── tsconfig.json
```

## 使用示例

### 在后端（Node.js）

```typescript
import { Todo, CreateTodoInput } from '@project/shared-types';

// 使用类型
async function createTodo(input: CreateTodoInput): Promise<Todo> {
  // ...
}
```

### 在Web前端（React/Next.js）

```typescript
import { Todo, CreateTodoInput } from '@project/shared-types';

// 使用类型
const [todo, setTodo] = useState<Todo | null>(null);
```

### 在Mobile端（React Native）

```typescript
import { Todo, CreateTodoInput } from '@project/shared-types';

// 使用类型
const { data } = useQuery<Todo[]>(['todos']);
```

## 类型定义示例

### entities/User.ts

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### entities/Todo.ts

```typescript
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

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

### api/requests.ts

```typescript
import { CreateTodoInput, UpdateTodoInput } from '../entities';

export interface CreateTodoRequest {
  body: CreateTodoInput;
}

export interface UpdateTodoRequest {
  params: {
    id: string;
  };
  body: UpdateTodoInput;
}
```

### api/responses.ts

```typescript
import { Todo } from '../entities';

export interface TodoResponse {
  data: Todo;
}

export interface TodosResponse {
  data: Todo[];
  total: number;
  page: number;
  pageSize: number;
}
```

## 开发指南

### 添加新类型

1. 在相应的目录下创建类型定义文件
2. 导出类型
3. 在`src/index.ts`中重新导出

### 版本管理

- 使用语义化版本（Semantic Versioning）
- 破坏性变更需要升级主版本号
- 新增类型为次版本号
- Bug修复为修订号

### 发布

```bash
# 构建类型包
pnpm build

# 发布到npm（或私有registry）
pnpm publish
```
