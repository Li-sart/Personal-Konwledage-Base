# Code Style Rules（代码风格规范）

本规范用于约束所有由 Claude 生成或修改的代码，必须严格遵守。

---

## 一、通用规则（General Rules）

1. 所有代码必须保持清晰、可读、结构化、代码简介
2. 禁止生成冗余代码或未使用的变量
3. 必须遵循模块化设计，避免单文件过大
4. 命名必须语义化，禁止使用无意义命名（如 a, b, temp）

---

## 二、技术栈

本项目使用以下技术栈：

| 层级 | 技术 | 版本 |
|------|------|------|
| 前端 | React | 19.2.6 |
| 构建 | Vite | 8.0.12 |
| UI 库 | Ant Design | 6.4.2 |
| UI 库 | Ant Design X | 2.7.0 |
| 样式 | LESS | 4.6.4 |
| 后端 | Express | 5.2.1 |
| AI | OpenAI SDK | 6.37.0 |
| 语言 | TypeScript | 6.0.2 |

---

## 三、JavaScript / TypeScript 规范

### 1. 分号（强制）和引号

- 每一行代码必须以分号结尾
- 禁止省略分号（即使语法允许）
- 字符串必须使用单引号
- 对于多行字符串，必须使用反引号

示例：
const name = 'Nexa';

---

### 2. 变量声明

- 优先使用 const
- 仅在必要时使用 let
- 禁止使用 var

---

### 3. 函数写法

- 优先使用箭头函数
- 保持函数职责单一

示例：
const getUserName = (user: User): string => {
  return user.name;
};

---

### 4. 类型定义（TypeScript）

- 必须为函数参数和返回值添加类型
- 推荐使用 type 而不是 interface（除非明确需要扩展）

---

## 四、React 组件规范

### 1. 组件结构

- 一个组件一个目录，放在frontend/components下
- 目录命名采用 PascalCase（如 NoteCard）
- 组件目录下，一定有一个index.tsx 文件作为组件入口
- 如果有样式，则必须有index.module.less 文件

---

### 2. 组件写法

示例：
import styles from "./index.module.less";

type Props = {
  title: string;
};

const NoteCard = ({ title }: Props) => {
  return <div className={styles.container}>{title}</div>;
};

export default NoteCard;

---

### 3. 状态管理

- 使用 useState / useEffect
- 避免在组件中写复杂业务逻辑（应放入 service）

---

### 4. React 19 特定规范

- 遵守 Hooks 规则：只在顶层调用 Hooks
- 使用 useCallback/useMemo 优化性能
- 避免使用 useEffect 处理复杂逻辑

---

### 5. React-native组件规范

- 对齐react组件的规范
- 样式必须单独成一个 styles.ts 文件，禁止将样式写到组件内

---

## 五、Ant Design 使用规范

### 1. 组件引入

- 按需引入组件，减少 bundle 大小
- 使用 Tree Shaking 优化

### 2. 自定义样式

- 使用 CSS Modules 覆盖 Ant Design 样式
- 避免直接修改 Ant Design 源码

### 3. Form 处理

- 使用 Ant Design Form 组件管理表单状态
- 使用 useForm 获取 form 实例

---

## 六、样式规范（强制）

### 1. 样式必须独立文件（强制）

- 禁止使用 inline style
- 禁止在组件中写 <style>
- 必须使用 CSS Modules

---

### 2. 样式方案

- 使用 .module.less 文件
- 每个组件对应一个样式文件

示例结构：
NoteCard/index.tsx
NoteCard/index.module.less

---

### 3. 引入方式

import styles from "./index.module.less";

---

### 4. 类名规范

- 使用语义化命名
- 推荐简单语义命名

示例：
.container {
  padding: 12px;
}

.title {
  font-size: 16px;
}

---

## 七、注释规范（强制）

### 1. 必须添加必要注释

以下场景必须写注释：

- 复杂逻辑
- 数据处理逻辑
- AI 调用逻辑
- 非直观代码
- 注释需要使用中文

---

### 2. 注释要求

- 使用中文注释
- 说明"为什么"，而不仅是"做什么"

示例：
// 根据用户输入生成 embedding，用于后续语义搜索
const embedding = await generateEmbedding(text);

---

### 3. 禁止无意义注释

错误示例：
const a = 1; // 设置a为1

---

## 八、文件结构规范

推荐结构：

/frontend
  /components
  /pages
  /modules
  /utils
  /commons
  /hooks

---

## 九、AI 调用规范（重要）

- 所有 AI 相关调用必须封装在 /server/services/下
- AI Agent单独成一个目录在  /server/services/agent
- UI 层禁止直接调用 AI API

---

## 十、错误处理

- 必须处理 async/await 错误
- 禁止忽略异常

示例：
try {
  const result = await fetchData();
} catch (error) {
  console.error("数据获取失败:", error);
}

---

## 十一、输出要求（针对 Claude）

当生成代码时，必须：

1. 严格遵守本规范
2. 自动补充分号
3. 自动拆分样式文件
4. 自动添加必要注释
5. 保持代码可直接运行
6. 使用项目技术栈中的版本

---

## 十二、优先级说明

本规则优先级高于默认代码风格。

如有冲突，必须以本规则为准。
