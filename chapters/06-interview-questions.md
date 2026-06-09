# 第六章：面试常见问题

## 基础概念题

### Q1：什么是 Skill？它解决了什么问题？

**答：**

Skill 是 Hermes Agent 的可复用程序记忆，本质上是一个 YAML + Markdown 文件，存储了完成特定任务的步骤、注意事项和验证方法。

**解决的问题：**
1. **知识丢失** — 每次新会话都要重新解释
2. **重复劳动** — 相同任务反复执行
3. **质量不一致** — 每次做法不同
4. **经验无法积累** — 踩过的坑反复踩

**示例：**
```
没有 Skill：每次创建项目都要 20 分钟
有 Skill：5 分钟自动完成
```

### Q2：Skill 和 Memory 有什么区别？

**答：**

| 维度 | Skill | Memory |
|------|-------|--------|
| **用途** | 存储"怎么做" | 存储"是什么" |
| **格式** | YAML + Markdown 结构化 | 纯文本 |
| **位置** | `~/.hermes/skills/` | `~/.hermes/memory.md` |
| **触发** | 语义匹配自动加载 | 始终注入上下文 |
| **示例** | "如何创建 FastAPI 项目" | "用户喜欢用 dev 分支" |

**关键区别：**
- Skill 是**程序性知识**（Procedural Knowledge）
- Memory 是**陈述性知识**（Declarative Knowledge）

### Q3：Skill 的生命周期是什么？

**答：**

```
创建 → 发现 → 加载 → 使用 → 维护
```

1. **创建** — 识别重复工作，编写 SKILL.md
2. **发现** — 用户发消息，语义匹配
3. **加载** — 读取 SKILL.md，解析内容
4. **使用** — 按照 Steps 执行，处理 Pitfalls
5. **维护** — 更新过时内容，删除无用 skill

### Q4：Skill 的匹配机制是什么？

**答：**

**三层匹配：**
1. **关键词匹配** — 提取 description 和用户消息的关键词，计算重叠度
2. **语义相似度** — 将文本转换为向量，计算余弦相似度
3. **上下文相关性** — 考虑对话历史、当前目录、用户偏好

**选择策略：**
- 匹配度最高的优先
- 最近使用过的优先
- 用户明确指定的优先

## 设计思想题

### Q5：为什么用 Markdown 而不是 JSON/YAML？

**答：**

1. **人类可读** — 方便编写和审查
2. **AI 友好** — LLM 擅长理解 Markdown
3. **灵活性** — 可以包含代码、表格、列表
4. **工具支持** — 编辑器、Git 都原生支持

**对比：**
```yaml
# JSON/YAML - 只适合机器
{
  "steps": [
    {"action": "create_dir", "path": "~/myprojects"}
  ]
}

# Markdown - 人和 AI 都能理解
## Steps
### 1. 创建目录
```bash
mkdir -p ~/myprojects
```
```

### Q6：为什么 Skill 要原子化？

**答：**

**原子化 = 一个 Skill 只做一件事**

**好处：**
1. **精确匹配** — 避免多个 skill 冲突
2. **易于维护** — 修改一个不影响其他
3. **可组合** — 多个 skill 组合完成复杂任务
4. **易于测试** — 每个 skill 独立验证

**示例：**
```yaml
# ❌ 不原子
name: full-stack-development
description: "Use for any full-stack development task"

# ✅ 原子
name: python-project-scaffold
description: "Use when creating a new Python project."

name: fastapi-endpoint
description: "Use when adding a FastAPI endpoint."
```

### Q7：如何设计一个好的 Description？

**答：**

**原则：**
1. 以 "Use when" 开头
2. 描述具体场景
3. 说明做什么
4. 控制在 1024 字符内

**示例：**
```yaml
# ❌ 不好
description: "Python helper"
description: "Use for stuff"

# ✅ 好
description: "Use when creating a new Python project from scratch. Sets up directory structure, conda env, git, and basic files."
```

**技巧：**
- 列出所有可能的触发场景
- 使用同义词
- 参考用户的实际说法

### Q8：为什么 Common Pitfalls 最重要？

**答：**

**原因：**
1. **Steps 可以从文档查** — 官方文档、Stack Overflow
2. **Pitfalls 只能从经验得** — 踩过的坑、调试过程
3. **Pitfalls 节省时间最多** — 避免重复踩坑
4. **Pitfalls 提高质量** — 预防常见错误

**示例：**
```markdown
## Steps
1. 创建 conda 环境
2. 安装依赖

## Common Pitfalls
1. **conda 环境已存在**
   - 症状：CondaError
   - 解决：先删除或换个名字

2. **pip install 超时**
   - 症状：ReadTimeoutError
   - 解决：使用清华源
```

## 实现细节题

### Q9：Skill 文件有哪些约束？

**答：**

| 约束项 | 值 | 说明 |
|--------|-----|------|
| name | ≤64 字符 | 小写 + 连字符 |
| description | ≤1024 字符 | 触发条件描述 |
| SKILL.md 总大小 | ≤100,000 字符 | 约 36k tokens |
| 推荐大小 | 8k-15k 字符 | 太大拆分到 references/ |
| 头部格式 | 必须以 `---` 开头 | 不能有空行 |
| body | 非空 | 必须有正文 |

### Q10：如何处理 Skill 之间的依赖？

**答：**

**方式 1：声明依赖**
```yaml
metadata:
  hermes:
    related_skills: [python-project-scaffold, conda-env-management]
```

**方式 2：在 Steps 中引用**
```markdown
## Steps
详细步骤参考 [conda-env-management](../conda-env-management/SKILL.md)
```

**原则：**
- 保持独立性（每个 skill 可以单独使用）
- 明确依赖关系
- 避免循环依赖

### Q11：如何测试 Skill 的有效性？

**答：**

**测试清单：**
1. **匹配测试** — 不同说法都能匹配到
2. **执行测试** — 所有 Steps 都能执行
3. **验证测试** — Verification Checklist 都通过
4. **边界测试** — 异常情况都能处理
5. **用户测试** — 让其他人使用并反馈

**测试命令：**
```bash
# 匹配测试
hermes chat -q "创建一个 Python 项目"

# 执行测试
hermes --skills python-project-scaffold chat -q "创建项目 test-project"

# 验证测试
ls -la ~/myprojects/test-project
```

### Q12：如何处理 Skill 的版本管理？

**答：**

**版本号规则：**
- `1.0.0` — 初始版本
- `1.0.1` — 小修复（typo、格式）
- `1.1.0` — 新增步骤或 Pitfalls
- `2.0.0` — 重大修改（流程变更）

**更新方式：**
```bash
# 小修改
skill_manage(action='patch', name='my-skill', 
             old_string='...', new_string='...')

# 大修改
skill_manage(action='edit', name='my-skill', content='...')
```

## 场景应用题

### Q13：什么时候应该创建 Skill？

**答：**

**触发信号：**
1. 第三次做同样的事情
2. 每次都要重新查文档
3. 用户经常问同样的问题
4. 解决了一个复杂问题
5. 踩了一个大坑

**示例：**
- 创建项目 → ✅ 应该写成 Skill
- 格式化代码 → ❌ 用脚本更好
- 配置 frpc → ✅ 应该写成 Skill
- 简单查询 → ❌ 不需要 Skill

### Q14：Skill 和脚本怎么选择？

**答：**

| 维度 | Skill | 脚本 |
|------|-------|------|
| **执行者** | AI（需要判断） | 计算机（无需判断） |
| **灵活性** | 高（适应变化） | 低（严格按代码） |
| **适用场景** | 复杂、需要上下文 | 固定、重复 |
| **示例** | 创建项目、调试错误 | 格式化代码、备份数据 |

**组合使用：**
```markdown
## Steps
1. 判断项目类型
2. 调用脚本创建目录
3. 根据类型生成配置
```

### Q15：如何管理大量的 Skill？

**答：**

**组织方式：**
```
~/.hermes/skills/
├── software-development/    # 按领域分类
│   ├── python-project-scaffold/
│   ├── fastapi-backend/
│   └── test-driven-development/
├── github/
│   └── github-pr-workflow/
└── devops/
    └── docker-deployment/
```

**管理技巧：**
1. **分类存放** — 按领域/项目分类
2. **定期清理** — 删除过时的 skill
3. **使用标签** — 通过 tags 快速查找
4. **保持原子** — 一个 skill 做一件事

### Q16：如何处理 Skill 的冲突？

**答：**

**冲突场景：**
- 多个 skill 匹配同一个用户消息
- 不同 skill 有重叠的 Steps

**解决方式：**
1. **明确边界** — 在 description 中说明 "NOT for..."
2. **保持原子** — 每个 skill 只做一件事
3. **优先级** — 用户明确指定 > 匹配度 > 最近使用
4. **询问用户** — 匹配度相近时让用户选择

**示例：**
```yaml
# skill 1
description: "Use when creating a new Python project. NOT for existing projects."

# skill 2
description: "Use when modifying existing Python projects. NOT for creating new ones."
```

## 高级问题

### Q17：Skill 如何与 Memory 协同工作？

**答：**

**协同方式：**
1. **Memory 提供上下文** — 用户偏好、环境信息
2. **Skill 提供流程** — 具体步骤和注意事项
3. **相互补充** — Memory 告诉"是什么"，Skill 告诉"怎么做"

**示例：**
```
Memory: "用户喜欢用 dev 分支，不用 main"
Skill: "创建项目时，git init 后切换到 dev 分支"

协同：
1. 读取 Memory：用户偏好 dev 分支
2. 加载 Skill：创建项目流程
3. 执行时：使用 dev 分支而不是 main
```

### Q18：Skill 如何处理上下文变化？

**答：**

**上下文因素：**
- 当前目录
- 已安装的工具
- 用户的历史操作
- 之前的对话内容

**处理方式：**
1. **动态调整** — 根据上下文修改 Steps
2. **条件分支** — 不同情况不同处理
3. **询问用户** — 不确定时问用户

**示例：**
```markdown
## Steps
### 1. 检查环境
```bash
# 检查是否在项目目录
if [ -f "package.json" ]; then
    echo "Node.js 项目"
elif [ -f "requirements.txt" ]; then
    echo "Python 项目"
fi
```

### 2. 根据环境执行
- Node.js 项目 → 执行 npm install
- Python 项目 → 执行 pip install
```

### Q19：如何优化 Skill 的匹配准确率？

**答：**

**优化技巧：**
1. **Description 精准化** — 明确触发场景
2. **关键词丰富** — 使用同义词
3. **避免冲突** — 明确边界
4. **测试验证** — 不同说法都能匹配

**示例：**
```yaml
# ❌ 不好
description: "Helps with Python"

# ✅ 好
description: "Use when creating a new Python project. Use when initializing Python project. Use when setting up Python development environment. Use when scaffolding Python project."
```

### Q20：Skill 的未来发展方向？

**答：**

**可能方向：**
1. **自动学习** — 从用户行为自动创建 skill
2. **智能推荐** — 根据上下文推荐相关 skill
3. **版本控制** — Git 集成，追踪变更
4. **社区共享** — Skill 市场，用户共享
5. **自适应** — 根据执行结果自动优化

**当前限制：**
- 需要人工编写和维护
- 匹配依赖语义理解
- 无法处理复杂逻辑

---

**下一章：** [最佳实践总结](07-best-practices.md)
