# 新增支持markdown文本渲染
## 需求功能
- 实现支持markdown文本渲染
  - 具体功能点：
  - 支持SSE/Fetch Stream流式响应
  - 实现边接收边渲染markdown文本,要支持code block、inline code、table、blockquote、list等常见语法
  - 代码块需要深色背景、圆角、padding、横向滚动、copy button、language label、要是独立卡片
  - 消息最大宽度800px、长代码块不撑破布局、流式输出时有光标闪烁效果
  - 表格支持横向滚动、Markdown排版舒适
  ## 约束
  - 不要修改我现有的代码结构
  - 不要对现已实现的功能进行删除修改
  - 只新增渲染逻辑层
  - 优先复用已有组件
  - 在进行代码编写的时候，先看.claude/rules/code-style.md、.claude/rules/architecture.md、.claude/rules/project-structure.md 的文档，并严格遵守
 ## 目标
 - 代码输入的规范
 - 1、输入完整、可运行的代码。
 - 2、严格遵守对应语言的最佳实践和官方格式规范
 - 3、自动进行合理换行和缩进，不允许将多个逻辑语句压缩到同一行
 - 4、JSX、TSX、HTML标签超过一层嵌套时必须换行。
 - 5、函数体、条件语句、循环语句必须采用标准代码块格式
 - 6、返回的代码应符合Prettier默认格式
 - 7、不要为了节省字符数而压缩代码
 - 8、 代码块必须使用markdown三引号包裹、并标注正确语言类型
 - 9、优先保证代码可读性，而不是输出速度
 - 10、生成代码时应模拟资深前端工程师提交到生产环境的代码风格



