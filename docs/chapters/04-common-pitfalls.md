# 第四章：常见问题和解决方案

## 开发阶段问题

### 问题 1：Description 写不好

**症状：**
- Skill 总是匹配不到
- 匹配到了错误的 skill
- 用户说"创建项目"，却加载了"部署项目"的 skill

**原因：**
- Description 太模糊
- 没有明确的触发条件
- 关键词不准确

**解决方案：**

```yaml
# ❌ 不好的 description
description: "Python project helper"
description: "Use for project stuff"
description: "Helps with development"

# ✅ 好的 description
description: "Use when creating a new Python project from scratch. Sets up directory structure, conda env, git, and basic files."
description: "Use when debugging FastAPI 422 validation errors. Explains Pydantic model issues."
```

**技巧：**
1. 以 "Use when" 开头
2. 描述具体场景
3. 说明做什么
4. 控制在 1024 字符内

### 问题 2：Steps 写得太笼统

**症状：**
- Hermes 执行时遗漏步骤
- 执行结果不符合预期
- 需要人工干预

**示例：**

```markdown
# ❌ 太笼统
## Steps
1. 创建项目目录
2. 初始化 git
3. 安装依赖

# ✅ 具体
## Steps
### 1. 创建项目目录
```bash
mkdir -p ~/myprojects/&lt;project-name&gt;/{src,tests,docs}
cd ~/myprojects/&lt;project-name&gt;
```

### 2. 初始化 git
```bash
git init
git add .
git commit -m "feat: initial project scaffold"
```

### 3. 安装依赖
```bash
conda create -n &lt;project-name&gt; python=3.12 -y
conda activate &lt;project-name&gt;
pip install -r requirements.txt
```
```

**技巧：**
1. 每个步骤一个子标题
2. 包含完整命令
3. 说明参数含义
4. 给出示例

### 问题 3：遗漏 Common Pitfalls

**症状：**
- 同样的错误反复出现
- 用户抱怨"Hermes 怎么又犯这个错"
- Skill 看起来很完美，但实际不好用

**示例：**

```markdown
# ❌ 遗漏 Pitfalls
## Steps
1. 创建 conda 环境
2. 安装依赖

# 实际上会遇到：
# - conda 环境已存在
# - pip install 超时
# - 依赖冲突

# ✅ 补充 Pitfalls
## Common Pitfalls

1. **conda 环境已存在**
   - 症状：`CondaError: already exists`
   - 解决：`conda env remove -n <name>` 或换个名字

2. **pip install 超时**
   - 症状：`ReadTimeoutError`
   - 解决：使用清华源 `pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple`
```

**技巧：**
1. 回忆踩过的所有坑
2. 记录错误信息
3. 写明解决步骤
4. 说明如何预防

### 问题 4：Verification Checklist 不完整

**症状：**
- 以为完成了，实际没完成
- 遗漏关键验证步骤
- 用户发现的问题比 Hermes 多

**示例：**

```markdown
# ❌ 不完整
## Verification
- [ ] 文件创建成功

# ✅ 完整
## Verification
- [ ] 文件存在：`ls -la ~/myprojects/<name>/main.py`
- [ ] 文件内容正确：`cat ~/myprojects/<name>/main.py`
- [ ] 语法正确：`python -c "import ast; ast.parse(open('main.py').read())"`
- [ ] 程序能运行：`python main.py`
- [ ] git 状态正常：`git status`
```

**技巧：**
1. 每个关键步骤都有验证
2. 验证命令要可执行
3. 期望结果要明确
4. 包含边界情况

## 匹配阶段问题

### 问题 5：多个 Skill 匹配冲突

**症状：**
- 用户说"创建项目"，有 3 个 skill 都匹配
- Hermes 不知道用哪个
- 加载了错误的 skill

**原因：**
- Skill 之间职责重叠
- Description 关键词冲突
- 缺少明确的边界

**解决方案：**

```yaml
# skill 1: python-project-scaffold
description: "Use when creating a new Python project from scratch."

# skill 2: fastapi-backend
description: "Use when building FastAPI backends. NOT for initial project creation."

# skill 3: conda-env-management
description: "Use when managing conda environments. NOT for creating new projects."
```

**技巧：**
1. 明确边界（"NOT for..."）
2. 避免关键词重叠
3. 保持原子性（一个 skill 做一件事）
4. 使用 `related_skills` 关联

### 问题 6：Skill 匹配不到

**症状：**
- 用户明确需要某个功能
- 但 Hermes 没有加载对应的 skill
- 重新发明轮子

**原因：**
- Description 太模糊
- 触发条件不明确
- 用户的说法和 description 不匹配

**解决方案：**

```yaml
# ❌ 太模糊
description: "Helps with Python"

# ✅ 明确
description: "Use when creating a new Python project. Use when initializing project structure. Use when setting up Python development environment."
```

**技巧：**
1. 列出所有可能的触发场景
2. 使用同义词
3. 参考用户的实际说法
4. 测试不同的触发方式

## 执行阶段问题

### 问题 7：Steps 顺序错误

**症状：**
- 执行到一半卡住
- 依赖缺失
- 环境不正确

**示例：**

```markdown
# ❌ 顺序错误
## Steps
1. 安装依赖
2. 创建 conda 环境
3. 激活环境

# 问题：依赖安装在哪个环境？

# ✅ 正确顺序
## Steps
1. 创建 conda 环境
2. 激活环境
3. 安装依赖
```

**技巧：**
1. 考虑依赖关系
2. 先创建后使用
3. 先配置后执行
4. 测试完整流程

### 问题 8：缺少错误处理

**症状：**
- 执行失败后不知道怎么办
- 错误信息不明确
- 无法恢复

**示例：**

```markdown
# ❌ 没有错误处理
## Steps
1. 创建目录
2. 初始化 git

# 如果 git init 失败呢？

# ✅ 包含错误处理
## Steps
1. 创建目录
```bash
mkdir -p ~/myprojects/&lt;name&gt;
if [ $? -ne 0 ]; then
    echo "创建目录失败"
    exit 1
fi
```

2. 初始化 git
```bash
git init
if [ $? -ne 0 ]; then
    echo "git init 失败，检查 git 是否安装"
    exit 1
fi
```

## Common Pitfalls
1. **git init 失败**
   - 原因：git 未安装或权限问题
   - 解决：`sudo apt install git` 或检查目录权限
```

### 问题 9：Skill 文件过大

**症状：**
- 加载慢
- 难以维护
- 超过 100,000 字符限制

**原因：**
- 包含过多细节
- 重复内容
- 没有拆分

**解决方案：**

```yaml
# 主文件 SKILL.md（精简）
---
name: fastapi-backend
description: "Use when building FastAPI backends."
---

# FastAPI 后端开发

## Steps
详细内容参考：
- [项目结构](references/project-structure.md)
- [API 模式](references/api-patterns.md)
- [常见问题](references/common-pitfalls.md)

# references/project-structure.md（详细）
...
```

**技巧：**
1. 主文件保持精简（8k-15k 字符）
2. 详细内容放 references/
3. 避免重复
4. 定期清理

### 问题 10：Skill 过时

**症状：**
- 命令不存在
- 参数已变更
- 流程已更新

**原因：**
- 工具版本更新
- 项目结构变化
- 最佳实践演进

**解决方案：**

```yaml
---
name: my-skill
version: 1.2.0  # 每次更新递增
---

# 定期检查和更新

## 维护清单
- [ ] 命令是否仍然有效
- [ ] 参数是否正确
- [ ] 流程是否最优
- [ ] Pitfalls 是否完整
```

**技巧：**
1. 定期测试 skill
2. 记录版本变更
3. 使用 `skill_manage(action='patch')` 更新
4. 删除过时的 skill

## 面试相关问题

### Q1：如何判断一个任务应该写成 Skill 还是脚本？

**A：**
- **Skill：** 需要 AI 判断、上下文理解、灵活应变
- **脚本：** 固定流程、无需判断、需要精确控制
- **组合：** Skill 调用脚本完成具体操作

**示例：**
- 创建项目 → Skill（需要判断项目类型、配置）
- 格式化代码 → 脚本（固定命令 `black .`）
- 部署服务 → Skill + 脚本（Skill 判断环境，脚本执行部署）

### Q2：如何处理 Skill 之间的依赖？

**A：**
1. 使用 `related_skills` 声明依赖
2. 在 Steps 中引用其他 skill
3. 保持独立性（每个 skill 可以单独使用）

```yaml
metadata:
  hermes:
    related_skills: [python-project-scaffold, conda-env-management]
```

### Q3：如何测试 Skill 的有效性？

**A：**
1. 用新会话测试（确保能被正确加载）
2. 模拟不同场景
3. 检查所有 Steps 是否可执行
4. 验证 Pitfalls 是否完整
5. 让其他人使用并反馈

---

**下一章：** [Hermes 如何调用 Skill](05-how-hermes-calls-skill.md)
