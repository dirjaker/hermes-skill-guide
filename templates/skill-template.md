# Skill 模板

使用此模板创建新的 Skill。

## SKILL.md 模板

```yaml
---
name: <skill-name>                    # 小写+连字符，≤64字符
description: "Use when <触发条件>. <一句话说明做什么>."
version: 1.0.0
author: <your-name>
license: MIT
metadata:
  hermes:
    tags: [<tag1>, <tag2>, <tag3>]    # 3-5个标签
    related_skills: [<skill1>, <skill2>]  # 相关skill
---

# <技能标题>

## Overview

一两段话：这个 skill 做什么、为什么需要它。

## When to Use

- 触发条件 1
- 触发条件 2
- 触发条件 3

**Don't use for:**
- 不适用场景 1
- 不适用场景 2

## Steps

### 1. <步骤标题>

具体命令和说明

```bash
# 命令示例
command arg1 arg2
```

**参数说明：**
- `arg1` — 参数说明
- `arg2` — 参数说明

### 2. <步骤标题>

具体命令和说明

```python
# 代码示例
def function():
    pass
```

### 3. <步骤标题>

具体命令和说明

## Common Pitfalls

1. **<问题标题>**
   - 症状：<错误信息>
   - 原因：<原因分析>
   - 解决：
     ```bash
     # 解决命令
     ```
   - 预防：<预防措施>

2. **<问题标题>**
   - 症状：<错误信息>
   - 原因：<原因分析>
   - 解决：
     ```bash
     # 解决命令
     ```
   - 预防：<预防措施>

## Verification Checklist

- [ ] 检查点 1：`验证命令`
- [ ] 检查点 2：`验证命令`
- [ ] 检查点 3：`验证命令`

## Quick Reference

### 常用命令

```bash
# 命令 1
command1 arg1

# 命令 2
command2 arg2
```

### 常用配置

```yaml
# 配置 1
key1: value1

# 配置 2
key2: value2
```

## Example Usage

**场景 1：<场景描述>**
```
用户：<用户消息>
Hermes：[加载 <skill-name> skill]
Hermes：[按照 Steps 执行]
结果：<执行结果>
```

**场景 2：<场景描述>**
```
用户：<用户消息>
Hermes：[加载 <skill-name> skill]
Hermes：[按照 Steps 执行]
结果：<执行结果>
```
```

## 填写指南

### 1. name 字段

**要求：**
- ≤64 字符
- 小写字母 + 连字符
- 唯一标识符

**示例：**
```yaml
name: python-project-scaffold
name: fastapi-backend
name: git-commit-guide
name: docker-deployment
```

### 2. description 字段

**要求：**
- ≤1024 字符
- 以 "Use when" 开头
- 描述具体触发场景
- 说明做什么

**示例：**
```yaml
description: "Use when creating a new Python project. Sets up directory structure, conda env, git, and basic files."
description: "Use when building FastAPI backends. Includes project structure, API patterns, and best practices."
description: "Use when committing code to git. Provides commit message conventions and best practices."
```

### 3. tags 字段

**要求：**
- 3-5 个标签
- 相关的关键词
- 便于搜索

**示例：**
```yaml
tags: [python, scaffold, conda, git]
tags: [fastapi, python, backend, api]
tags: [git, commit, conventions]
```

### 4. Steps 部分

**要求：**
- 每个步骤一个子标题
- 包含完整命令
- 说明参数含义
- 给出示例

**示例：**
```markdown
### 1. 创建项目目录

```bash
mkdir -p ~/myprojects/<project-name>/{src,tests,docs}
cd ~/myprojects/<project-name>
```

**参数说明：**
- `<project-name>` — 项目名称，小写+连字符
```

### 5. Common Pitfalls 部分

**要求：**
- 列出所有踩过的坑
- 说明错误症状
- 给出解决步骤
- 说明如何预防

**示例：**
```markdown
1. **conda 环境已存在**
   - 症状：`CondaError: already exists`
   - 原因：之前创建过同名环境
   - 解决：
     ```bash
     conda env remove -n <project-name>
     ```
   - 预防：创建前先检查 `conda env list`
```

### 6. Verification Checklist 部分

**要求：**
- 每个关键步骤都有验证
- 验证命令要可执行
- 期望结果要明确

**示例：**
```markdown
- [ ] 目录结构正确：`ls -la ~/myprojects/<name>`
- [ ] conda 环境创建成功：`conda env list | grep <name>`
- [ ] 程序能运行：`python main.py`
```

## 完整示例

```yaml
---
name: python-project-scaffold
description: "Use when creating a new Python project. Sets up directory structure, conda env, git, and basic files."
version: 1.0.0
author: dirjaker
license: MIT
metadata:
  hermes:
    tags: [python, scaffold, conda, git]
    related_skills: [conda-env-management, github-repo-management]
---

# Python 项目快速搭建

## Overview

帮助用户快速创建一个新的 Python 项目，包含标准目录结构、conda 虚拟环境、git 初始化、基础依赖文件。

## When to Use

- 用户说"创建一个新 Python 项目"
- 用户说"新建项目"且上下文是 Python 相关

**Don't use for:**
- 已有项目的修改
- 前端项目

## Steps

### 1. 确认项目信息

向用户确认：
- 项目名称（小写+连字符）
- 项目类型（cli/api/data/ml/basic）
- Python 版本（默认 3.12）

### 2. 创建目录结构

```bash
mkdir -p ~/myprojects/<project-name>/{src,tests,docs}
cd ~/myprojects/<project-name>
```

### 3. 生成基础文件

**main.py:**
```python
def main():
    print("Hello from <project-name>!")

if __name__ == "__main__":
    main()
```

**requirements.txt:**
```
httpx>=0.27.0
pydantic>=2.0.0
rich>=13.0.0
```

### 4. 创建 Conda 环境

```bash
conda create -n <project-name> python=3.12 -y
conda activate <project-name>
pip install -r requirements.txt
```

### 5. 初始化 Git

```bash
git init
git add .
git commit -m "feat: initial project scaffold"
```

## Common Pitfalls

1. **项目名包含大写字母**
   - 症状：目录名不规范
   - 解决：转为小写，空格替换为连字符

2. **conda 环境已存在**
   - 症状：`CondaError: already exists`
   - 解决：`conda env remove -n <name>` 或换个名字

3. **pip install 超时**
   - 症状：`ReadTimeoutError`
   - 解决：使用清华源

## Verification Checklist

- [ ] 目录结构正确：`ls -la ~/myprojects/<name>`
- [ ] conda 环境创建成功：`conda env list | grep <name>`
- [ ] 程序能运行：`python main.py`
- [ ] git 状态正常：`git status`

## Example Usage

**场景：创建 Python 项目**
```
用户：创建一个新 Python 项目
Hermes：[加载 python-project-scaffold skill]
Hermes：[按照 Steps 执行]
结果：完整的 Python 项目
```
```
