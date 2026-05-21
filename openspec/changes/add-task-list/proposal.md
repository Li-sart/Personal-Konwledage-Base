# Change: 添加任务清单功能

## Why

用户需要一个简单的任务清单应用，可以添加、查看、编辑、删除任务，完成任务时显示烟花庆祝动画，并支持批量操作。

## What Changes

- 新增任务清单前端应用（React + TypeScript）
- 支持 CRUD 操作：添加、查看、编辑、删除任务
- 完成任务时显示烟花弹窗动画（持续5秒，保持最后一秒）
- 支持批量选择和批量操作任务
- 数据持久化到 localStorage

## Impact

- 新增 specs: task-list
- 新增代码文件：
  - `src/components/TaskInput.tsx`
  - `src/components/TaskList.tsx`
  - `src/components/TaskItem.tsx`
  - `src/components/CelebrationModal.tsx`
  - `src/hooks/useTasks.ts`
  - `src/types/index.ts`
  - `src/App.tsx`
  - `src/main.tsx`
- 新增依赖: canvas-confetti
