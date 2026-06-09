# 第七章：最佳实践总结

## Skill 开发最佳实践

### 1. Description 编写

**原则：**
- 以 "Use when" 开头
- 描述具体场景
- 说明做什么
- 控制在 1024 字符内

**示例：**
```yaml
# ❌ 不好
description: "Python helper"
description: "Use for stuff"
description: "This is a very long description that goes on and on..."

# ✅ 好
description: "Use when creating a new Python project. Sets up directory structure, conda env, git, and basic files."
```

**技巧：**
- 列出所有可能的触发场景
- 使用同义词
- 参考用户的实际说法
- 测试不同的触发方式

### 2. Steps 编写

**原则：**
- 每个步骤一个子标题
- 包含完整命令
- 说明参数含义
- 给出示例

**示例：**
```markdown
# ❌ 太笼统
## Steps
1. 创建目录
2. 初始化 git

# ✅ 具体
## Steps

### 1. 创建项目目录
```bash
mkdir -p ~/myprojects/<project-name>/{src,tests,docs}
cd ~/myprojects/<project-name>
```

**参数说明：**
- `<project-name>` — 项目名称，小写+连字符

### 2. 初始化 git
```bash
git init
git add .
git commit -m "feat: initial project scaffold"
```

**说明：**
- 使用 `feat:` 前缀（符合 commit 规范）
- 提交信息简洁明了
```

### 3. Common Pitfalls 编写

**原则：**
- 列出所有踩过的坑
- 说明错误症状
- 给出解决步骤
- 说明如何预防

**示例：**
```markdown
## Common Pitfalls

1. **conda 环境已存在**
   - 症状：`CondaError: already exists`
   - 原因：之前创建过同名环境
   - 解决：
     ```bash
     conda env remove -n <project-name>
     # 或换个名字
     ```
   - 预防：创建前先检查 `conda env list`

2. **pip install 超时**
   - 症状：`ReadTimeoutError`
   - 原因：网络问题或 PyPI 服务器慢
   - 解决：
     ```bash
     pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
     ```
   - 预防：配置 pip 默认使用清华源
```

### 4. Verification Checklist 编写

**原则：**
- 每个关键步骤都有验证
- 验证命令要可执行
- 期望结果要明确
- 包含边界情况

**示例：**
```markdown
## Verification Checklist

- [ ] 目录结构正确：`ls -la ~/myprojects/<name>`
- [ ] conda 环境创建成功：`conda env list | grep <name>`
- [ ] 依赖安装成功：`conda activate <name> && pip list`
- [ ] 程序能运行：`python main.py`
- [ ] git 状态正常：`git status`
```

### 5. 文件组织

**原则：**
- 主文件保持精简（8k-15k 字符）
- 详细内容放 references/
- 避免重复
- 定期清理

**示例：**
```
~/.hermes/skills/
├── python-project-scaffold/
│   ├── SKILL.md              # 主文件（精简）
│   ├── references/
│   │   ├── project-types.md  # 详细：项目类型
│   │   └── conda-guide.md    # 详细：conda 使用
│   └── templates/
│       └── main.py           # 模板文件
```

## Skill 使用最佳实践

### 1. 何时创建 Skill

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

### 2. 如何维护 Skill

**维护周期：**
```
编写 → 测试 → 使用 → 发现问题 → 更新 → 再测试 → ...
```

**更新时机：**
- 命令或参数变更
- 发现新的 Pitfalls
- 流程优化
- 用户反馈

**更新方式：**
```bash
# 小修改
skill_manage(action='patch', name='my-skill', 
             old_string='...', new_string='...')

# 大修改
skill_manage(action='edit', name='my-skill', content='...')
```

### 3. 如何管理大量 Skill

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

## Skill 设计最佳实践

### 1. 原子化设计

**原则：** 一个 Skill 只做一件事

**好处：**
- 精确匹配
- 易于维护
- 可组合
- 易于测试

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

### 2. 避免冲突

**原则：** 明确边界，避免重叠

**示例：**
```yaml
# skill 1
description: "Use when creating a new Python project. NOT for existing projects."

# skill 2
description: "Use when modifying existing Python projects. NOT for creating new ones."
```

### 3. 保持独立

**原则：** 每个 skill 可以单独使用

**示例：**
```yaml
# ✅ 独立
name: python-project-scaffold
description: "Use when creating a new Python project."
# 不依赖其他 skill

# ✅ 有关联但独立
name: fastapi-backend
description: "Use when building FastAPI backends."
metadata:
  hermes:
    related_skills: [python-project-scaffold]
# 可以单独使用，也可以组合使用
```

## 常见错误和避免方法

### 错误 1：Description 太模糊

**症状：** Skill 匹配不到或匹配错误

**避免方法：**
```yaml
# ❌ 太模糊
description: "Python helper"

# ✅ 明确
description: "Use when creating a new Python project from scratch."
```

### 错误 2：Steps 太笼统

**症状：** Hermes 执行时遗漏步骤

**避免方法：**
```markdown
# ❌ 太笼统
## Steps
1. 创建目录
2. 初始化 git

# ✅ 具体
## Steps
### 1. 创建项目目录
```bash
mkdir -p ~/myprojects/<project-name>/{src,tests,docs}
```

### 2. 初始化 git
```bash
git init
git add .
git commit -m "feat: initial project scaffold"
```
```

### 错误 3：遗漏 Pitfalls

**症状：** 同样的错误反复出现

**避免方法：**
```markdown
## Common Pitfalls
1. **conda 环境已存在**
   - 症状：CondaError
   - 解决：先删除或换个名字

2. **pip install 超时**
   - 症状：ReadTimeoutError
   - 解决：使用清华源
```

### 错误 4：Verification 不完整

**症状：** 以为完成了，实际没完成

**避免方法：**
```markdown
## Verification Checklist
- [ ] 文件存在：`ls -la <path>`
- [ ] 内容正确：`cat <path>`
- [ ] 语法正确：`python -c "import ast; ast.parse(open('<path>').read())"`
- [ ] 程序能运行：`python main.py`
```

### 错误 5：Skill 文件过大

**症状：** 加载慢，难维护

**避免方法：**
- 主文件保持 8k-15k 字符
- 详细内容放 references/
- 避免重复
- 定期清理

## 面试准备要点

### 必须掌握的概念

1. **Skill 的定义** — 可复用的程序记忆
2. **Skill vs Memory** — 程序性知识 vs 陈述性知识
3. **匹配机制** — 关键词 + 语义 + 上下文
4. **生命周期** — 创建 → 发现 → 加载 → 使用 → 维护

### 必须能回答的问题

1. 什么是 Skill？它解决了什么问题？
2. Skill 和 Memory 有什么区别？
3. 如何设计一个好的 Skill？
4. 什么时候应该创建 Skill？
5. Skill 和脚本怎么选择？

### 必须了解的细节

1. 文件约束（name ≤64 字符，description ≤1024 字符）
2. 匹配算法（关键词 + 语义相似度）
3. 版本管理（语义化版本）
4. 组织方式（按领域分类）

## 总结

### Skill 的核心价值

1. **节省时间** — 不用重复造轮子
2. **知识积累** — 经验不会丢失
3. **质量保证** — 按照验证过的流程执行
4. **可分享** — 团队可以共享

### Skill 的最佳实践

1. **Description 精准** — 明确触发场景
2. **Steps 具体** — 包含完整命令
3. **Pitfalls 完整** — 列出所有坑
4. **Verification 齐全** — 每步都有验证
5. **保持原子** — 一个 skill 做一件事

### Skill 的未来

1. **自动学习** — 从用户行为自动创建
2. **智能推荐** — 根据上下文推荐
3. **社区共享** — Skill 市场
4. **自适应** — 根据执行结果优化

---

**附录：** [示例 Skill](../examples/) | [模板文件](../templates/)
