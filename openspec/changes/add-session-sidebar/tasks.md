# Tasks: add-session-sidebar

## Implementation Tasks

- [ ] **1. 创建 TypeScript 类型定义** - 创建 types/session.ts，定义 Session 和 Message 接口
- [ ] **2. 创建 sessionService** - 创建 services/sessionService.ts，处理会话 CRUD 和 localStorage 持久化
- [ ] **3. 创建 Sidebar 组件** - 创建 components/Sidebar/index.tsx 和样式文件
- [ ] **4. 创建 SessionItem 组件** - 创建会话列表项组件，支持显示标题和删除
- [ ] **5. 修改 App.tsx 集成侧栏** - 将侧栏集成到主界面，修改状态管理
- [ ] **6. 实现会话切换** - 点击会话加载对应消息历史
- [ ] **7. 实现标题生成** - AI 回答完成后调用 API 生成会话标题
- [ ] **8. 回归测试** - 验证流式输出、复制、自动滚动功能正常

## Dependencies

- 任务 1 必须先完成（类型定义是基础）
- 任务 2 依赖任务 1
- 任务 3、4 可并行（独立组件）
- 任务 5 依赖任务 1、2、3、4
- 任务 6、7 依赖任务 5
- 任务 8 最后执行

## Parallelization

- 任务 3 和任务 4 可并行开发
- 任务 6 和任务 7 可并行开发

## Validation

- [ ] 新建会话成功创建并切换
- [ ] 删除会话成功移除
- [ ] 会话切换正确加载消息
- [ ] 标题自动生成并显示
- [ ] 刷新页面数据不丢失
- [ ] 现有功能（流式、复制、滚动）无回归
