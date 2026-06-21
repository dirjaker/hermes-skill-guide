# 第二章：Skill 的结构详解

## 文件结构

```
~/.hermes/skills/
├── <category>/                    # 分类目录
│   └── <skill-name>/             # skill 目录
│       ├── SKILL.md              # 主文件（必须）
│       ├── references/           # 参考文档（可选）
│       │   └── api-docs.md
│       ├── templates/            # 模板文件（可选）
│       │   └── config.yaml
│       └── scripts/              # 脚本文件（可选）
│           └── validate.sh
```

## SKILL.md 结构

### 1. YAML 头部（Frontmatter）

```yaml
---
name: my-skill-name
description: "Use when <触发条件>. <一句话说明>."
version: 1.0.0
author: Your Name
license: MIT
metadata:
  hermes:
    tags: [tag1, tag2, tag3]
    related_skills: [other-skill-1, other-skill-2]
---
```

#### 必填字段

| 字段 | 说明 | 约束 |
|------|------|------|
| `name` | 唯一标识符 | ≤64 字符，小写+连字符 |
| `description` | 触发条件描述 | ≤1024 字符，以 "Use when" 开头 |

#### 可选字段

| 字段 | 说明 | 建议 |
|------|------|------|
| `version` | 版本号 | 语义化版本（1.0.0） |
| `author` | 作者 | 你的名字或团队名 |
| `license` | 许可证 | MIT, Apache-2.0 等 |
| `metadata.hermes.tags` | 标签 | 3-5 个相关标签 |
| `metadata.hermes.related_skills` | 关联 skill | 列出相关 skill |

#### description 的写法

**好的写法：**
```yaml
description: "Use when creating a new Python project. Sets up directory structure, conda env, and git."
```

**不好的写法：**
```yaml
description: "Python project setup"  # 太简短，没有触发条件
description: "This skill helps you create Python projects with proper structure and dependencies..."  # 太长，超过 1024 字符
```

**触发条件要明确：**
```yaml
# ✅ 好：明确的触发场景
"Use when creating a new Python project."
"Use when debugging FastAPI backend errors."
"Use when setting up GitHub Actions CI/CD."

# ❌ 差：模糊的描述
"Use for Python stuff."
"Use when needed."
"General purpose skill."
```

### 2. Markdown 正文

#### 标准结构

```markdown
# 技能标题

## Overview
一两段话：这个 skill 做什么、为什么需要它。

## When to Use
- 触发条件 1
- 触发条件 2
- 不适用的场景

## Steps
### 1. 第一步
具体命令和说明

### 2. 第二步
具体命令和说明

## Common Pitfalls
1. 常见错误 → 解决办法
2. 容易踩的坑

## Verification Checklist
- [ ] 检查点 1
- [ ] 检查点 2

## Quick Reference (可选)
常用命令速查

## Example Usage (可选)
使用示例
```

#### 各部分详解

**## Overview**

帮助用户快速创建一个新的 Python 项目，包含标准目录结构、conda 虚拟环境、git 初始化、基础依赖文件。

- 简洁说明这个 skill 做什么
- 不要超过 2-3 句话
- 突出价值和适用场景

**## When to Use**

- 明确触发条件（正向）
- 明确不适用场景（反向）
- 帮助 Hermes 准确匹配

**## Steps**

- 每个步骤一个子标题
- 步骤要具体、可执行
- 包含代码示例
- 说明参数和选项

**## Common Pitfalls**

- 列出常见错误
- 说明如何发现
- 给出解决方案
- 这是 skill 最有价值的部分

**## Verification Checklist**

- 每个检查点要可验证
- 包含验证命令
- 完成后打勾

## 文件大小限制

| 限制项 | 值 | 说明 |
|--------|-----|------|
| description | ≤ 1024 字符 | 触发条件描述 |
| SKILL.md 总大小 | ≤ 100,000 字符 | 约 36k tokens |
| 推荐大小 | 8k-15k 字符 | 太大就拆分到 references/ |

## 示例：基础 Skill

```yaml
---
name: git-commit-guide
description: "Use when committing code to git. Provides commit message conventions and best practices."
version: 1.0.0
author: dirjaker
metadata:
  hermes:
    tags: [git, commit, conventions]
---

# Git Commit 规范

## Overview

提供 Git 提交信息的规范和最佳实践，确保提交历史清晰可读。

## When to Use

- 用户提交代码时
- 用户询问 commit message 规范时

## Steps

### 1. Commit Message 格式

    <type>: <subject>

    <body>

    <footer>

### 2. Type 类型

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | feat: 添加用户登录 |
| fix | 修复 bug | fix: 修复登录超时 |
| docs | 文档 | docs: 更新 README |
| style | 代码格式 | style: 格式化代码 |
| refactor | 重构 | refactor: 重构登录逻辑 |
| test | 测试 | test: 添加登录测试 |
| chore | 构建/工具 | chore: 更新依赖 |

### 3. 最佳实践

- subject 不超过 50 字符
- 使用祈使语气（"add" 不是 "added"）
- 不要以句号结尾
- body 解释为什么，不是做什么

## Common Pitfalls

1. **Subject 太长**
   → 控制在 50 字符以内

2. **使用过去式**
   → 用祈使语气："add feature" 不是 "added feature"

3. **提交信息不清晰**
   → 要让别人看一眼就知道做了什么

## Verification Checklist

- [ ] commit message 符合格式
- [ ] type 选择正确
- [ ] subject 简洁明了
- [ ] body 解释了为什么（如果需要）
```

## 示例：高级 Skill（带 references）

```yaml
---
name: fastapi-backend
description: "Use when building FastAPI backends. Includes project structure, common patterns, and best practices."
version: 1.0.0
metadata:
  hermes:
    tags: [fastapi, python, backend, api]
    related_skills: [python-project-scaffold, test-driven-development]
---

# FastAPI 后端开发

## Overview

完整的 FastAPI 后端开发指南，包含项目结构、常见模式、最佳实践。

## When to Use

- 创建新的 FastAPI 项目
- 添加 API 端点
- 配置数据库、认证等

## Steps

### 1. 项目结构

    backend/
    ├── main.py
    ├── app/
    │   ├── __init__.py
    │   ├── api/
    │   │   ├── __init__.py
    │   │   └── endpoints/
    │   ├── core/
    │   │   ├── config.py
    │   │   └── security.py
    │   ├── models/
    │   └── schemas/
    ├── requirements.txt
    └── README.md

详细结构参考 references/project-structure.md

### 2. 创建端点

    from fastapi import APIRouter

    router = APIRouter()

    @router.get("/items/{item_id}")
    async def read_item(item_id: int):
        return {"item_id": item_id}

更多模式参考 references/api-patterns.md

## Common Pitfalls

1. **忘记 async def**
   → FastAPI 端点必须是异步函数

2. **数据库连接未关闭**
   → 使用依赖注入自动管理

详细 pitfalls 参考 references/common-pitfalls.md
```

---

**下一章：** [Skill 开发实战指南](03-development-guide.md)
