# 示例：基础 Skill

这是一个简单的 skill 示例，用于规范 Git commit 信息。

## SKILL.md

```yaml
---
name: git-commit-guide
description: "Use when committing code to git. Provides commit message conventions and best practices."
version: 1.0.0
author: dirjaker
license: MIT
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
- 用户说"提交代码"、"git commit"时

**Don't use for:**
- 创建仓库（用 github-repo-management）
- 分支管理（用 git-branch-guide）

## Steps

### 1. Commit Message 格式

```
&lt;type&gt;: &lt;subject&gt;

&lt;body&gt;

&lt;footer&gt;
```

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

### 3. Subject 规范

- 不超过 50 字符
- 使用祈使语气（"add" 不是 "added"）
- 不要以句号结尾
- 首字母小写

### 4. Body 规范（可选）

- 解释为什么做这个改动
- 说明之前的实现有什么问题
- 描述新实现的优点

### 5. Footer 规范（可选）

- 关联 Issue：`Closes #123`
- 破坏性变更：`BREAKING CHANGE: xxx`

## Common Pitfalls

1. **Subject 太长**
   - 症状：超过 50 字符
   - 解决：精简描述，详细放 body

2. **使用过去式**
   - 症状："added feature"
   - 解决：用祈使语气："add feature"

3. **提交信息不清晰**
   - 症状："fix bug", "update code"
   - 解决：具体说明修复了什么 bug

4. **混合多个改动**
   - 症状：一个 commit 包含多个不相关的改动
   - 解决：拆分成多个 commit

5. **忘记关联 Issue**
   - 症状：commit 和 Issue 没有关联
   - 解决：在 footer 添加 `Closes #123`

## Verification Checklist

- [ ] commit message 符合格式
- [ ] type 选择正确
- [ ] subject 简洁明了（≤50 字符）
- [ ] 使用祈使语气
- [ ] body 解释了为什么（如果需要）
- [ ] footer 关联了 Issue（如果有）

## Quick Reference

### 常用 Type

```bash
# 新功能
git commit -m "feat: 添加用户注册功能"

# 修复 bug
git commit -m "fix: 修复邮箱验证失败的问题"

# 文档
git commit -m "docs: 更新 API 文档"

# 代码格式
git commit -m "style: 格式化登录页面代码"

# 重构
git commit -m "refactor: 重构用户认证逻辑"

# 测试
git commit -m "test: 添加登录功能单元测试"

# 构建/工具
git commit -m "chore: 更新 FastAPI 到 0.110.0"
```

### 完整示例

```bash
# 简单改动
git commit -m "fix: 修复登录超时问题"

# 复杂改动
git commit -m "feat: 添加用户头像上传功能

- 支持 JPG/PNG 格式
- 图片自动压缩到 500KB
- 生成缩略图

Closes #45"
```

## Example Usage

**场景 1：用户提交代码**
```
用户：提交代码
Hermes：[加载 git-commit-guide skill]
Hermes：[分析改动，生成符合规范的 commit message]
结果：git commit -m "feat: 添加天气查询功能"
```

**场景 2：用户询问规范**
```
用户：commit message 怎么写？
Hermes：[加载 git-commit-guide skill]
Hermes：[展示规范和示例]
结果：用户了解规范
```
```

## 分析

### 为什么这是一个好的 Skill

1. **Description 明确**
   - "Use when committing code to git"
   - 明确的触发场景

2. **Steps 具体**
   - 包含格式、类型、规范
   - 有示例代码

3. **Pitfalls 完整**
   - 列出常见错误
   - 给出解决方法

4. **Verification 齐全**
   - 每个检查点都有
   - 可以实际验证

5. **Quick Reference 实用**
   - 常用命令速查
   - 完整示例

### 可以改进的地方

1. **添加 references/**
   - 详细的 type 说明
   - 更多示例

2. **添加 templates/**
   - commit message 模板
   - 脚本自动检查

3. **版本管理**
   - 添加 version 字段
   - 记录变更历史
```
