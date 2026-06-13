# 实际项目案例

本文档展示了 Skill 在真实项目中的应用案例。

---

## 案例 1：Vestio 项目开发

### 项目背景

**项目名称：** Vestio - AI 穿搭助手
**技术栈：** Vue 3 + FastAPI + SQLite
**开发时间：** 2026 年 6 月

### 使用的 Skill

#### 1. python-project-scaffold

**场景：** 项目初始化

**执行过程：**
```bash
# 用户说：创建一个新项目，做 AI 穿搭助手的

# Hermes 加载 python-project-scaffold skill
# 按照 Steps 执行：

1. 确认项目信息
   - 项目名称：vestio
   - 项目类型：api (FastAPI)
   - Python 版本：3.12

2. 创建目录结构
   mkdir -p ~/myprojects/vestio/{backend,frontend,docs}

3. 生成基础文件
   - backend/main.py
   - backend/requirements.txt
   - frontend/package.json

4. 创建 conda 环境
   conda create -n vestio python=3.12 -y

5. 初始化 git
   git init && git add . && git commit -m "feat: initial scaffold"
```

**结果：** 5 分钟完成项目初始化

#### 2. fastapi-backend

**场景：** 添加用户认证 API

**执行过程：**
```bash
# 用户说：添加用户登录注册接口

# Hermes 加载 fastapi-backend skill
# 按照 Steps 执行：

1. 创建用户模型
   - backend/app/models/user.py
   - 使用 SQLAlchemy

2. 创建 Pydantic 模型
   - backend/app/schemas/user.py
   - UserCreate, UserResponse, UserLogin

3. 创建 API 端点
   - backend/app/api/auth.py
   - POST /api/auth/register
   - POST /api/auth/login
   - POST /api/auth/logout

4. 配置 JWT 认证
   - backend/app/core/security.py
   - 创建 token、验证 token

5. 添加中间件
   - CORS 中间件
   - 认证中间件
```

**结果：** 30 分钟完成完整的认证系统

#### 3. vestio-dev-server

**场景：** 启动开发服务器

**执行过程：**
```bash
# 用户说：启动 vestio 开发服务器

# Hermes 加载 vestio-dev-server skill
# 按照 Steps 执行：

1. 检查端口占用
   - 检查 8000（后端）
   - 检查 5173（前端）

2. 启动后端
   cd ~/myprojects/vestio/backend
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload &

3. 启动前端
   cd ~/myprojects/vestio/frontend
   npx vite --host 0.0.0.0 &

4. 验证服务
   - curl http://localhost:8000/health
   - curl http://localhost:5173
```

**结果：** 2 分钟完成服务启动

### 问题和解决

**问题 1：端口被占用**
```bash
# 症状
ERROR: [Errno 98] Address already in use

# 解决（来自 vestio-dev-server skill 的 Pitfalls）
lsof -ti:8000 | xargs kill -9
```

**问题 2：前端白屏**
```bash
# 症状
Vue 警告：<n-empty> size 属性类型错误

# 解决（来自 vestio-dev-server skill 的 Pitfalls）
将 :size="40" 改为 size="40"（字符串）
```

**问题 3：数据库锁**
```bash
# 症状
database is locked

# 解决（来自 vestio-dev-server skill 的 Pitfalls）
确保只有一个后端进程运行
pkill -f uvicorn
```

### 经验总结

1. **Skill 节省时间**
   - 项目初始化：5 分钟（没有 skill 需要 20 分钟）
   - 添加认证：30 分钟（没有 skill 需要 2 小时）
   - 启动服务：2 分钟（没有 skill 需要 10 分钟）

2. **Pitfalls 最有价值**
   - 端口冲突问题反复出现
   - 数据库锁问题经常发生
   - 有了 Pitfalls，5 秒解决

3. **Skill 需要维护**
   - 项目结构变化时要更新 skill
   - 新的坑要及时添加到 Pitfalls
   - 定期测试 skill 是否仍然有效

---

## 案例 2：LLM Agent 面试准备

### 项目背景

**项目名称：** llm_agent_interview - LLM 应用 & Agent 开发面试指南
**内容：** 27 专题/450+ 题/56K+ 行/9 工具
**目的：** 面试准备

### 使用的 Skill

#### 1. writing-plans

**场景：** 规划面试准备内容

**执行过程：**
```bash
# 用户说：帮我规划 LLM Agent 面试准备内容

# Hermes 加载 writing-plans skill
# 按照 Steps 执行：

1. 确认范围
   - 基础概念（01-03）
   - 核心技术（04-11）
   - 模型相关（12-13）
   - 工程实践（14-19）
   - 生产部署（20-22）
   - 冲刺复习（23-24）
   - 新方向（25-27）

2. 创建目录结构
   mkdir -p ~/myprojects/llm_agent_interview/{chapters,tools,examples}

3. 编写大纲
   - 27 个章节
   - 每章 15-20 道题
   - 总共 450+ 道题

4. 制定计划
   - 每天完成 2-3 个章节
   - 一周完成全部内容
```

**结果：** 系统化的面试准备计划

#### 2. hermes-skill-guide

**场景：** 学习 Skill 系统

**执行过程：**
```bash
# 用户说：我想学习 Skill 系统

# Hermes 加载 hermes-skill-guide skill（就是这个项目）
# 按照 Steps 执行：

1. 讲解 Skill 概念
   - 什么是 Skill
   - Skill vs Memory
   - Skill 的价值

2. 演示 Skill 创建
   - 创建 python-project-scaffold
   - 创建 vestio-dev-server

3. 讲解匹配机制
   - 关键词匹配
   - 语义相似度
   - 上下文相关性

4. 实战练习
   - 用 Skill 创建项目
   - 用 Skill 解决问题
```

**结果：** 深入理解 Skill 系统

### 问题和解决

**问题 1：内容太多，不知道从哪开始**
```bash
# 解决（来自 writing-plans skill）
创建分层计划：
- 第一层：基础概念（必须掌握）
- 第二层：核心技术（重点掌握）
- 第三层：高级话题（了解即可）
```

**问题 2：知识点分散，难以串联**
```bash
# 解决（来自 writing-plans skill）
创建知识图谱：
- 每个知识点之间的关系
- 常见的组合方式
- 面试中的出题模式
```

**问题 3：练习不够，缺乏实战**
```bash
# 解决（来自 writing-plans skill）
添加实战案例：
- 真实项目中的应用
- 常见问题的解决方案
- 最佳实践总结
```

### 经验总结

1. **Skill 帮助系统化学习**
   - 不会遗漏重要知识点
   - 学习路径清晰
   - 进度可追踪

2. **实战案例最有价值**
   - 理论结合实践
   - 记忆更深刻
   - 面试中可以举例

3. **定期复习很重要**
   - 遗忘曲线
   - 间隔重复
   - 实践检验

---

## 案例 3：GitHub 仓库管理

### 项目背景

**仓库数量：** 19 个公开仓库
**管理方式：** 使用 Skill 自动化管理

### 使用的 Skill

#### 1. github-repo-management

**场景：** 批量管理仓库

**执行过程：**
```bash
# 用户说：给我所有的仓库添加标签

# Hermes 加载 github-repo-management skill
# 按照 Steps 执行：

1. 获取所有仓库列表
   gh repo list dirjaker --limit 100 --json name,description

2. 分析仓库类型
   - Python 项目
   - 前端项目
   - AI/ML 项目
   - 工具项目

3. 生成标签
   python, fastapi, vue, ai, agent, llm, etc.

4. 批量添加标签
   for repo in repos:
       gh repo edit $repo --add-topic $tags
```

**结果：** 124 个标签添加到 19 个仓库

#### 2. github-pr-workflow

**场景：** 创建 Pull Request

**执行过程：**
```bash
# 用户说：提交代码到 dev 分支

# Hermes 加载 github-pr-workflow skill
# 按照 Steps 执行：

1. 创建分支
   git checkout -b feature/new-feature

2. 提交代码
   git add .
   git commit -m "feat: add new feature"

3. 推送分支
   git push origin feature/new-feature

4. 创建 PR
   gh pr create --base dev --head feature/new-feature \
     --title "feat: add new feature" \
     --body "Description of changes"

5. 等待审核
   gh pr checks --watch
```

**结果：** 规范的 PR 流程

### 问题和解决

**问题 1：仓库没有标签**
```bash
# 解决（来自 github-repo-management skill）
批量添加标签：
gh repo edit <repo> --add-topic python,fastapi,api
```

**问题 2：PR 描述太简单**
```bash
# 解决（来自 github-pr-workflow skill）
使用 PR 模板：
## Changes
- Change 1
- Change 2

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
```

**问题 3：分支命名不规范**
```bash
# 解决（来自 github-pr-workflow skill）
使用规范的分支命名：
- feature/xxx — 新功能
- fix/xxx — 修复 bug
- docs/xxx — 文档更新
- refactor/xxx — 重构
```

### 经验总结

1. **自动化节省时间**
   - 批量操作效率高
   - 减少重复劳动
   - 降低出错概率

2. **规范很重要**
   - 统一的标签体系
   - 规范的 PR 流程
   - 清晰的分支命名

3. **Skill 可以复用**
   - 一次编写，多次使用
   - 团队共享
   - 持续改进

---

## 案例 4：模型监控系统

### 项目背景

**项目名称：** model_monitor - 模型监控系统
**功能：** 监控 DeepSeek/MiMo API 用量
**技术栈：** Python + FastAPI + SQLite

### 使用的 Skill

#### 1. python-project-scaffold

**场景：** 创建项目

**执行过程：**
```bash
# 用户说：创建一个模型监控项目

# Hermes 加载 python-project-scaffold skill
# 按照 Steps 执行：

1. 确认项目信息
   - 项目名称：model_monitor
   - 项目类型：api
   - Python 版本：3.12

2. 创建目录结构
   mkdir -p ~/myprojects/model_monitor/{src,tests,docs}

3. 生成基础文件
   - main.py (FastAPI)
   - requirements.txt
   - README.md

4. 创建 conda 环境
   conda create -n model_monitor python=3.12 -y

5. 初始化 git
   git init && git add . && git commit -m "feat: initial scaffold"
```

**结果：** 5 分钟完成项目初始化

#### 2. fastapi-backend

**场景：** 添加 API 端点

**执行过程：**
```bash
# 用户说：添加用量查询 API

# Hermes 加载 fastapi-backend skill
# 按照 Steps 执行：

1. 创建数据模型
   - UsageRecord
   - UsageSummary

2. 创建 API 端点
   - GET /api/usage/summary — 汇总统计
   - GET /api/usage/history — 历史记录
   - GET /api/usage/daily — 每日统计

3. 实现业务逻辑
   - 查询 DeepSeek API
   - 查询 MiMo API
   - 数据聚合

4. 添加缓存
   - Redis 缓存
   - 内存缓存
```

**结果：** 1 小时完成 API 开发

### 问题和解决

**问题 1：API 响应慢**
```bash
# 解决（来自 fastapi-backend skill 的 Pitfalls）
添加缓存：
- Redis 缓存热点数据
- 内存缓存频繁查询
```

**问题 2：数据量大，查询慢**
```bash
# 解决（来自 fastapi-backend skill 的 Pitfalls）
优化查询：
- 添加索引
- 分页查询
- 异步查询
```

**问题 3：API 限流**
```bash
# 解决（来自 fastapi-backend skill 的 Pitfalls）
添加限流：
- 使用 slowapi
- 配置限流规则
- 返回 429 状态码
```

### 经验总结

1. **Skill 加速开发**
   - 标准化的项目结构
   - 常用的代码模板
   - 最佳实践指导

2. **Pitfalls 避免踩坑**
   - 性能优化技巧
   - 常见问题解决
   - 安全注意事项

3. **可复用性高**
   - 类似项目可以直接复用
   - 团队共享 skill
   - 持续改进

---

## 案例 5：Docker 容器化部署

### 项目背景

**项目：** 多个项目的容器化部署
**方式：** 使用 Docker + Docker Compose

### 使用的 Skill

#### 1. docker-deploy

**场景：** 容器化部署

**执行过程：**
```bash
# 用户说：用 Docker 部署 vestio 项目

# Hermes 加载 docker-deploy skill
# 按照 Steps 执行：

1. 创建 Dockerfile
   - backend/Dockerfile
   - frontend/Dockerfile

2. 创建 docker-compose.yml
   - app (FastAPI)
   - db (PostgreSQL)
   - redis (Redis)
   - nginx (Nginx)

3. 构建镜像
   docker-compose build

4. 启动服务
   docker-compose up -d

5. 验证部署
   docker-compose ps
   curl http://localhost/health
```

**结果：** 30 分钟完成容器化部署

### 问题和解决

**问题 1：镜像太大**
```bash
# 解决（来自 docker-deploy skill 的 Pitfalls）
优化镜像：
- 使用 slim/alpine 基础镜像
- 多阶段构建
- 清理缓存
```

**问题 2：容器间通信问题**
```bash
# 解决（来自 docker-deploy skill 的 Pitfalls）
配置网络：
- 使用 docker-compose 网络
- 配置服务发现
- 使用环境变量
```

**问题 3：数据持久化**
```bash
# 解决（来自 docker-deploy skill 的 Pitfalls）
使用卷挂载：
- 数据库数据
- 上传文件
- 日志文件
```

### 经验总结

1. **标准化部署流程**
   - Dockerfile 标准化
   - docker-compose 标准化
   - 部署脚本标准化

2. **环境一致性**
   - 开发环境 = 生产环境
   - 避免"在我机器上能跑"
   - 易于扩展和迁移

3. **运维友好**
   - 易于监控
   - 易于扩展
   - 易于回滚

---

## 总结

### Skill 的实际价值

1. **节省时间**
   - 项目初始化：5 分钟（vs 20 分钟）
   - 功能开发：30 分钟（vs 2 小时）
   - 问题排查：5 秒（vs 10 分钟）

2. **提高质量**
   - 标准化的流程
   - 最佳实践指导
   - 避免常见错误

3. **知识积累**
   - 经验不会丢失
   - 团队可以共享
   - 持续改进

### Skill 的最佳实践

1. **从实际问题出发**
   - 不要为了写 skill 而写
   - 解决真实的问题
   - 从重复工作中提炼

2. **保持更新**
   - 定期测试 skill
   - 更新过时内容
   - 添加新的 Pitfalls

3. **分享和复用**
   - 团队内部共享
   - 开源社区分享
   - 持续改进

---

**相关章节：**
- [什么是 Skill](../chapters/01-what-is-skill.md)
- [开发实战指南](../chapters/03-development-guide.md)
- [最佳实践总结](../chapters/07-best-practices.md)
