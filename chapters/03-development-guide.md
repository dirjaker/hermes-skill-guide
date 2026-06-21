# 第三章：Skill 开发实战指南

## 开发流程

### Step 1：识别重复工作

**触发信号：**
- 你发现自己第三次做同样的事情
- 每次都要重新查文档/搜索
- 用户经常问同样的问题
- 解决了一个复杂问题，怕下次忘记

**示例：**
```
信号：每次创建 Python 项目都要：
1. 建目录结构
2. 写 README
3. 创建 conda 环境
4. 初始化 git
→ 这应该是一个 skill
```

### Step 2：收集信息

**收集内容：**
1. 完整的步骤（从头到尾）
2. 所有命令和参数
3. 常见错误和解决办法
4. 验证方法

**收集方式：**
- 回顾之前的会话记录
- 查看历史命令
- 记录踩过的坑
- 总结最佳实践

### Step 3：编写 SKILL.md

**编写顺序：**
1. 先写 `description`（最重要）
2. 写 `When to Use`（明确边界）
3. 写 `Steps`（核心内容）
4. 写 `Common Pitfalls`（最有价值）
5. 写 `Verification Checklist`（质量保证）
6. 最后补充元数据

### Step 4：测试和迭代

**测试方法：**
1. 用新会话测试（确保 skill 能被正确加载）
2. 模拟不同场景
3. 检查是否遗漏步骤
4. 验证 Pitfalls 是否完整

**迭代周期：**
```
编写 → 测试 → 发现问题 → 更新 → 再测试 → ...
```

## 实战案例：创建 vestio-dev-server skill

### 背景

vestio 项目经常需要启动/重启前后端服务，每次都要：
- 找到项目目录
- 检查端口是否被占用
- 启动后端（uvicorn）
- 启动前端（vite）
- 验证服务是否正常

### 完整 Skill

```yaml
---
name: vestio-dev-server
description: "Use when starting, stopping, or restarting the Vestio dev server (Vue + FastAPI). Handles port conflicts and service health checks."
version: 1.0.0
author: dirjaker
metadata:
  hermes:
    tags: [vestio, fastapi, vue, dev-server, startup]
---

# Vestio 开发服务器管理

## Overview

管理 Vestio 项目的开发服务器，包括前后端启动、停止、重启，以及端口冲突处理。

## When to Use

- 启动 Vestio 开发环境
- 重启服务（代码更新后）
- 端口被占用需要清理
- 检查服务状态

**Don't use for:**
- 生产环境部署
- 数据库迁移
- 代码修改

## Steps

### 1. 检查端口占用

```bash
# 检查后端端口 8000
lsof -i:8000 | grep LISTEN

# 检查前端端口 5173
lsof -i:5173 | grep LISTEN
```

如果端口被占用：
```bash
# 找到进程 PID
lsof -ti:8000

# 杀掉进程
kill -9 &lt;PID&gt;
```

### 2. 启动后端

```bash
cd /home/dirjaker/myprojects/vestio/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**关键参数：**
- `--host 0.0.0.0` — 允许外部访问
- `--port 8000` — 后端端口
- `--reload` — 代码修改自动重启

**后台启动（推荐）：**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
```

### 3. 启动前端

```bash
cd /home/dirjaker/myprojects/vestio/frontend
npx vite --host 0.0.0.0
```

**关键参数：**
- `--host 0.0.0.0` — 允许外部访问

### 4. 验证服务

```bash
# 验证后端
curl http://localhost:8000/health
# 期望输出：{"status":"ok"}

# 验证前端
curl http://localhost:5173
# 期望输出：HTML 内容
```

### 5. 访问地址

- 前端：http://192.168.31.100:5173
- 后端 API：http://192.168.31.100:8000
- API 文档：http://192.168.31.100:8000/docs

## Common Pitfalls

1. **端口 8000 被占用**
   - 症状：`[Errno 98] Address already in use`
   - 原因：之前的 uvicorn 进程未退出
   - 解决：`lsof -ti:8000 | xargs kill -9`

2. **前端白屏**
   - 症状：页面空白，控制台有 Vue 警告
   - 原因：`<n-empty>` 的 size 属性类型错误
   - 解决：将 `:size="40"` 改为 `size="40"`（字符串）

3. **后端启动慢**
   - 症状：uvicorn 启动需要 10+ 秒
   - 原因：数据库初始化、模型加载
   - 解决：正常现象，等待即可

4. **CORS 错误**
   - 症状：前端请求后端报跨域错误
   - 原因：CORS 配置不正确
   - 解决：检查后端 CORS 配置是否包含前端地址

5. **数据库锁**
   - 症状：`database is locked`
   - 原因：多个进程同时访问 SQLite
   - 解决：确保只有一个后端进程运行

## Verification Checklist

- [ ] 后端端口 8000 可访问：`curl http://localhost:8000/health`
- [ ] 前端端口 5173 可访问：`curl http://localhost:5173`
- [ ] 浏览器能打开：http://192.168.31.100:5173
- [ ] 能正常登录
- [ ] API 文档可访问：http://192.168.31.100:8000/docs

## Quick Reference

### 常用命令

```bash
# 启动服务
cd ~/myprojects/vestio
./start.sh  # 如果有启动脚本

# 或者分别启动
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
cd frontend && npx vite --host 0.0.0.0 &

# 查看日志
tail -f backend/logs/app.log

# 重启
pkill -f uvicorn
pkill -f vite
# 然后重新启动
```

### 环境变量

```bash
# 后端配置
export DATABASE_URL="sqlite:///./vestio.db"
export SECRET_KEY="your-secret-key"

# 前端配置
export VITE_API_BASE="http://192.168.31.100:8000"
```

## Example Usage

**场景 1：正常启动**
```
用户：启动 vestio 开发服务器
Hermes：[检查端口 → 启动后端 → 启动前端 → 验证]
结果：服务正常运行在 8000 和 5173 端口
```

**场景 2：端口冲突**
```
用户：启动 vestio
Hermes：[检查端口 → 发现 8000 被占用 → 杀掉进程 → 启动服务]
结果：服务正常启动
```

**场景 3：代码更新后重启**
```
用户：我改了代码，重启一下
Hermes：[由于 --reload，后端自动重启]
结果：无需手动操作
```
```

## 开发技巧

### 1. 从实际问题出发

**不好的方式：**
```
我想写一个 skill → 写什么好呢？→ 随便写一个吧
```

**好的方式：**
```
我遇到了什么问题？→ 这个问题怎么解决？→ 解决过程能复用吗？→ 写成 skill
```

### 2. 先写 Pitfalls

**顺序：**
1. 先回忆踩过的坑
2. 写成 Pitfalls
3. 再补充 Steps

**原因：**
- Pitfalls 是最有价值的部分
- Steps 可以从文档查，Pitfalls 只能从经验得
- 先写 Pitfalls 可以避免遗漏

### 3. 保持原子性

**不好的方式：**
```yaml
name: full-stack-development
description: "Use when doing any full-stack development..."
# 太大、太泛，不好匹配
```

**好的方式：**
```yaml
name: fastapi-endpoint
description: "Use when adding a new FastAPI endpoint."

name: vue-component
description: "Use when creating a new Vue component."

name: database-migration
description: "Use when running database migrations."
```

### 4. 包含验证步骤

**不好的方式：**
```markdown
## Steps
1. 创建文件
2. 写入内容
3. 保存
```

**好的方式：**
```markdown
## Steps
1. 创建文件
2. 写入内容
3. 保存

## Verification
- [ ] 文件存在：`ls -la <path>`
- [ ] 内容正确：`cat <path>`
- [ ] 语法正确：`python -c "import ast; ast.parse(open('<path>').read())"
```

### 5. 版本管理

**版本号规则：**
- `1.0.0` — 初始版本
- `1.0.1` — 小修复
- `1.1.0` — 新增步骤或 Pitfalls
- `2.0.0` — 重大修改

**何时更新版本：**
- 添加新步骤：`1.1.0`
- 修复错误：`1.0.1`
- 完全重写：`2.0.0`

---

**下一章：** [常见问题和解决方案](04-common-pitfalls.md)
