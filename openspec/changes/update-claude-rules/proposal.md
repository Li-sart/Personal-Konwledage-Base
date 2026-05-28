# Proposal: update-claude-rules

## Summary

更新 `.claude/rules/` 目录下的规范文件（architecture.md、code-style.md、project-structure.md），补充本项目技术栈信息，确保 Claude Code 在生成代码时能准确使用项目相关的技术栈和规范。

## Motivation

当前 rules 文件中的规范内容已较为完善，但缺少项目实际技术栈的明确描述。需要将以下技术栈信息整合到规范中：

- 前端：React 19, Vite, Ant Design, Ant Design X, react-markdown
- 后端：Express, OpenAI SDK
- 其他：TypeScript, LESS, Axios

这样可以确保 AI 在生成代码时：
1. 使用正确的技术栈版本
2. 遵循项目现有的代码模式
3. 与现有代码风格保持一致

## Scope

### In Scope
- 更新 architecture.md：补充 Electron 架构细节
- 更新 code-style.md：补充技术栈相关的代码规范
- 更新 project-structure.md：补充完整的项目目录结构
- 更新 openspec/project.md：补充项目技术栈信息

### Out Scope
- 不修改现有业务逻辑代码
- 不修改 openspec 本身的配置文件

## Dependencies

无外部依赖。

## Risk Assessment

- **低风险**：仅修改文档类文件，不影响运行时代码
- **影响范围**：仅影响 Claude Code 的代码生成行为
