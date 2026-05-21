# Task Manager API - 项目规范
## 技术栈
- 运行时: Node.js 20.x
- 框架: Express 4.x
- 语言: TypeScript 5.x
- 数据库: SQLite (开发环境)，Prisma ORM
- 测试: Jest, Supertest
- 验证: Zod
## 项目结构
```
src/
├── controllers/    # HTTP请求处理
├── services/       # 业务逻辑
├── repositories/   # 数据访问
├── models/         # 类型定义
├── middleware/     # 中间件
├── utils/          # 工具函数
└── app.ts          # 应用入口
```
## 代码规范
### 1. TypeScript配置
- 使用严格模式 (tsconfig.json strict: true)
- 所有导出必须有类型
- 禁止使用any类型
### 2. API设计规范
- RESTful API设计
- 统一响应格式:
```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}
```
### 3. 错误处理
- 服务层抛出特定错误类: ValidationError, NotFoundError, AuthenticationError
- Controller层统一捕获，返回标准格式
- HTTP状态码映射:
  - 400: 验证错误
  - 401: 未认证
  - 404: 资源不存在
  - 500: 服务器错误
### 4. 安全规范
- 所有用户输入必须用Zod验证
- 密码使用bcrypt哈希
- JWT令牌认证
- 敏感信息不记录日志
### 5. 数据库规范
- 使用Prisma Client进行所有数据库操作
- 查询必须参数化
- 事务用于多步骤操作
### 6. 测试规范
- 单元测试覆盖核心业务逻辑
- 集成测试覆盖API端点
- 测试覆盖率≥80%
- 每个PR必须有测试
## 命名约定
- 文件: kebab-case (user-controller.ts)
- 类: PascalCase (UserController)
- 变量/函数: camelCase (getUserById)
- 常量: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)