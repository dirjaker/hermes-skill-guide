# 第五章：Hermes 如何调用 Skill

## 调用流程概览

```
用户消息
    ↓
扫描所有 Skill
    ↓
语义匹配（基于 description）
    ↓
选择最佳匹配
    ↓
加载 SKILL.md
    ↓
按照 Steps 执行
    ↓
验证结果
```

## 详细流程

### 1. 用户发消息

**示例：**
```
用户：创建一个新 Python 项目，做天气 API 的
```

**Hermes 收到：**
- 消息内容："创建一个新 Python 项目，做天气 API 的"
- 上下文：之前的对话记录
- 环境：当前目录、已安装的工具等

### 2. 扫描所有 Skill

**扫描位置：**
```
~/.hermes/skills/
├── software-development/
│   ├── python-project-scaffold/SKILL.md
│   ├── fastapi-backend/SKILL.md
│   └── test-driven-development/SKILL.md
├── github/
│   └── github-pr-workflow/SKILL.md
└── ...
```

**扫描内容：**
- 读取每个 SKILL.md 的 YAML 头部
- 提取 `name` 和 `description`
- 构建 skill 索引

### 3. 语义匹配

**匹配算法：**
1. 提取用户消息的关键词
2. 与每个 skill 的 description 计算相似度
3. 返回匹配度排序列表

**示例：**
```
用户消息："创建一个新 Python 项目，做天气 API 的"

匹配结果：
1. python-project-scaffold: 85%
   - "创建" ✓
   - "Python 项目" ✓
   - "新" ✓

2. fastapi-backend: 60%
   - "API" ✓
   - "Python" ✓
   - 但不是"创建项目"

3. github-pr-workflow: 10%
   - 无关
```

**匹配因素：**
- 关键词匹配
- 语义相似度
- 上下文相关性
- 历史使用频率

### 4. 选择最佳匹配

**选择策略：**
1. 匹配度最高
2. 最近使用过的优先
3. 用户明确指定的优先

**边界情况：**
- 多个 skill 匹配度相近 → 询问用户
- 没有 skill 匹配 → 不加载任何 skill
- 用户明确指定 → 使用指定的 skill

**示例：**
```bash
# 用户明确指定
用户：用 python-project-scaffold skill 创建项目
Hermes：直接加载 python-project-scaffold

# 匹配度相近
用户：创建项目
Hermes：检测到多个匹配的 skill：
  1. python-project-scaffold (85%)
  2. fastapi-backend (80%)
  你想用哪个？
```

### 5. 加载 SKILL.md

**加载过程：**
```python
# 伪代码
def load_skill(skill_name):
    skill_path = f"~/.hermes/skills/{category}/{skill_name}/SKILL.md"
    content = read_file(skill_path)
    
    # 解析 YAML 头部
    frontmatter = parse_yaml(content[:frontmatter_end])
    
    # 提取正文
    body = content[frontmatter_end:]
    
    return {
        "name": frontmatter["name"],
        "description": frontmatter["description"],
        "steps": parse_steps(body),
        "pitfalls": parse_pitfalls(body),
        "verification": parse_verification(body)
    }
```

**加载后：**
- Skill 内容进入 Hermes 的上下文
- Steps 成为执行指南
- Pitfalls 成为检查清单

### 6. 按照 Steps 执行

**执行方式：**
- Hermes 读取 Steps
- 逐步执行每个步骤
- 遇到 Pitfalls 则处理
- 每步完成后验证

**示例：**
```
Step 1: 确认项目信息
→ 询问用户：项目名称？类型？Python 版本？

Step 2: 预检查
→ 执行：ls ~/myprojects/weather-api
→ 结果：目录不存在，可以继续

Step 3: 创建目录结构
→ 执行：mkdir -p ~/myprojects/weather-api/{src,tests,docs}

Step 4: 生成文件
→ 执行：write_file(...)

Step 5: 创建 conda 环境
→ 执行：conda create -n weather-api python=3.12 -y

Step 6: 初始化 git
→ 执行：git init && git add . && git commit -m "feat: initial scaffold"
```

### 7. 验证结果

**验证方式：**
```markdown
## Verification Checklist
- [ ] 目录结构正确：`ls -la ~/myprojects/weather-api`
- [ ] conda 环境创建成功：`conda env list | grep weather-api`
- [ ] 程序能运行：`cd ~/myprojects/weather-api && python main.py`
```

**验证过程：**
```bash
# 执行验证命令
ls -la ~/myprojects/weather-api
# ✓ 目录存在

conda env list | grep weather-api
# ✓ 环境存在

python main.py
# ✓ 程序运行正常
```

## 调用方式

### 方式 1：自动调用（最常见）

**触发：** 用户消息匹配 skill 的 description

**示例：**
```
用户：创建一个 Python 项目
Hermes：[自动加载 python-project-scaffold]
Hermes：[按照 Steps 执行]
```

**优点：**
- 用户无感知
- 自动选择最佳 skill
- 体验流畅

### 方式 2：手动指定

**触发：** 用户明确指定使用哪个 skill

**示例：**
```
用户：用 python-project-scaffold 创建项目
Hermes：[加载指定的 skill]
Hermes：[按照 Steps 执行]
```

**命令：**
```bash
# 在对话中
/skill python-project-scaffold

# 命令行
hermes --skills python-project-scaffold
```

**优点：**
- 精确控制
- 避免误匹配
- 调试时有用

### 方式 3：预加载

**触发：** 启动时加载指定 skill

**示例：**
```bash
hermes --skills python-project-scaffold,fastapi-backend
```

**优点：**
- 确保 skill 可用
- 适合特定任务
- 减少匹配时间

## 匹配算法详解

### 关键词匹配

**过程：**
1. 提取 description 的关键词
2. 提取用户消息的关键词
3. 计算重叠度

**示例：**
```
description: "Use when creating a new Python project"
关键词: [creating, new, Python, project]

用户消息: "创建一个 Python 项目"
关键词: [创建, Python, 项目]

匹配度: 高（Python, 项目 重叠）
```

### 语义相似度

**过程：**
1. 将 description 和用户消息转换为向量
2. 计算向量相似度（余弦相似度）
3. 返回相似度分数

**示例：**
```
description: "Use when creating a new Python project"
向量: [0.8, 0.6, 0.9, ...]

用户消息: "帮我搭个后端服务"
向量: [0.7, 0.5, 0.8, ...]

相似度: 0.85（高）
```

### 上下文相关性

**因素：**
- 之前的对话内容
- 当前工作目录
- 已安装的工具
- 用户的历史偏好

**示例：**
```
上下文：用户之前在做 vestio 项目
用户消息：启动服务
匹配：vestio-dev-server（而不是其他服务的 skill）
```

## 调用时机

### 何时调用

**会话开始时：**
- 扫描所有 skill
- 构建索引
- 准备匹配

**用户发消息时：**
- 提取消息内容
- 语义匹配
- 选择最佳 skill

**执行过程中：**
- 按照 Steps 执行
- 遇到 Pitfalls 处理
- 验证结果

### 何时不调用

**场景：**
- 没有 skill 匹配
- 用户明确说"不用 skill"
- 任务太简单（不需要 skill）

## 调用优化

### 优化 1：Description 精准化

**不好的 description：**
```yaml
description: "Helps with Python"
```

**好的 description：**
```yaml
description: "Use when creating a new Python project from scratch. Sets up directory structure, conda env, git, and basic files."
```

### 优化 2：关键词丰富

**技巧：**
- 列出所有可能的触发词
- 使用同义词
- 参考用户的实际说法

**示例：**
```yaml
description: "Use when creating a new Python project. Use when initializing Python project. Use when setting up Python development environment. Use when scaffolding Python project."
```

### 优化 3：避免冲突

**技巧：**
- 明确边界（"NOT for..."）
- 保持原子性
- 使用 `related_skills` 关联

**示例：**
```yaml
# skill 1
description: "Use when creating a new Python project. NOT for existing projects."

# skill 2
description: "Use when modifying existing Python projects. NOT for creating new ones."
```

## 调试技巧

### 查看加载的 Skill

```bash
# 查看所有 skill
hermes skills list

# 查看特定 skill
hermes skills inspect python-project-scaffold
```

### 手动测试匹配

```bash
# 模拟用户消息
hermes chat -q "创建一个 Python 项目" --skills python-project-scaffold
```

### 查看匹配过程

```bash
# 启用详细日志
hermes chat -v
```

---

**下一章：** [面试常见问题](06-interview-questions.md)
