# 示例：Docker 部署 Skill

这是一个用于 Docker 容器部署的 skill 示例。

## SKILL.md

```yaml
---
name: docker-deploy
description: "Use when deploying applications with Docker. Handles Dockerfile creation, image building, and container management."
version: 1.0.0
author: dirjaker
license: MIT
metadata:
  hermes:
    tags: [docker, deploy, container, devops]
    related_skills: [docker-compose, kubernetes-deploy]
---

# Docker 部署

## Overview

帮助用户使用 Docker 部署应用程序，包括 Dockerfile 创建、镜像构建、容器管理。

## When to Use

- 部署 Python/FastAPI 应用
- 创建 Docker 容器
- 管理 Docker 镜像
- 配置 Docker 网络和卷

**Don't use for:**
- Kubernetes 部署（用 kubernetes-deploy）
- Docker Compose 多容器（用 docker-compose）
- Docker 安装（用 docker-install）

## Steps

### 1. 创建 Dockerfile

**Python 应用：**
```dockerfile
# 基础镜像
FROM python:3.12-slim

# 设置工作目录
WORKDIR /app

# 安装依赖
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 复制代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Node.js 应用：**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

### 2. 创建 .dockerignore

```
.git
.gitignore
__pycache__
*.pyc
*.pyo
*.pyd
.Python
env/
venv/
.conda/
*.egg-info/
dist/
build/
.mypy_cache/
.pytest_cache/
.coverage
htmlcov/
.env
.DS_Store
*.log
node_modules/
```

### 3. 构建镜像

```bash
# 基本构建
docker build -t &lt;image-name&gt;:&lt;tag&gt; .

# 示例
docker build -t my-app:latest .
docker build -t my-app:v1.0.0 .

# 带构建参数
docker build \
  --build-arg PYTHON_VERSION=3.12 \
  --build-arg APP_ENV=production \
  -t my-app:latest .
```

### 4. 运行容器

```bash
# 基本运行
docker run -d -p 8000:8000 --name my-app my-app:latest

# 带环境变量
docker run -d \
  -p 8000:8000 \
  -e DATABASE_URL="postgresql://user:pass@db:5432/mydb" \
  -e SECRET_KEY="my-secret" \
  --name my-app \
  my-app:latest

# 带卷挂载
docker run -d \
  -p 8000:8000 \
  -v $(pwd)/data:/app/data \
  -v $(pwd)/logs:/app/logs \
  --name my-app \
  my-app:latest

# 带网络
docker run -d \
  -p 8000:8000 \
  --network my-network \
  --name my-app \
  my-app:latest
```

### 5. 管理容器

```bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 查看容器日志
docker logs my-app
docker logs -f my-app  # 实时查看

# 进入容器
docker exec -it my-app bash

# 停止容器
docker stop my-app

# 启动容器
docker start my-app

# 重启容器
docker restart my-app

# 删除容器
docker rm my-app
docker rm -f my-app  # 强制删除
```

### 6. 管理镜像

```bash
# 查看镜像
docker images

# 删除镜像
docker rmi my-app:latest
docker rmi -f my-app:latest  # 强制删除

# 清理未使用的镜像
docker image prune

# 清理所有未使用的资源
docker system prune

# 推送镜像到仓库
docker tag my-app:latest registry.example.com/my-app:latest
docker push registry.example.com/my-app:latest

# 从仓库拉取镜像
docker pull registry.example.com/my-app:latest
```

### 7. Docker Compose（多容器）

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
    networks:
      - my-network

  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - my-network

  redis:
    image: redis:7-alpine
    networks:
      - my-network

volumes:
  postgres_data:

networks:
  my-network:
    driver: bridge
```

**常用命令：**
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 重新构建并启动
docker-compose up -d --build
```

## Common Pitfalls

1. **镜像太大**
   - 症状：镜像超过 1GB
   - 原因：使用了完整基础镜像
   - 解决：使用 `slim` 或 `alpine` 版本
   - 示例：`python:3.12-slim` 代替 `python:3.12`

2. **构建缓存失效**
   - 症状：每次都重新安装依赖
   - 原因：COPY 顺序不对
   - 解决：先 COPY 依赖文件，再 COPY 代码
   - 示例：
     ```dockerfile
     COPY requirements.txt .  # 先复制依赖文件
     RUN pip install -r requirements.txt
     COPY . .  # 再复制代码
     ```

3. **端口冲突**
   - 症状：`bind: address already in use`
   - 原因：端口被占用
   - 解决：更换端口或停止占用进程
   - 示例：`docker run -p 8001:8000 ...`

4. **容器无法访问**
   - 症状：浏览器无法访问 http://localhost:8000
   - 原因：端口未映射或应用未监听
   - 解决：检查 `-p` 参数和应用配置
   - 示例：确保应用监听 `0.0.0.0` 而不是 `127.0.0.1`

5. **数据丢失**
   - 症状：容器重启后数据消失
   - 原因：数据存储在容器层
   - 解决：使用卷挂载 `-v`
   - 示例：`docker run -v $(pwd)/data:/app/data ...`

6. **网络不通**
   - 症状：容器之间无法通信
   - 原因：不在同一个网络
   - 解决：使用 `--network` 或 docker-compose
   - 示例：
     ```bash
     docker network create my-network
     docker run --network my-network ...
     ```

7. **权限问题**
   - 症状：容器内无法写入文件
   - 原因：用户权限不匹配
   - 解决：使用 `--user` 或在 Dockerfile 中设置
   - 示例：
     ```dockerfile
     RUN useradd -m myuser
     USER myuser
     ```

8. **环境变量泄露**
   - 症状：敏感信息暴露在镜像中
   - 原因：在 Dockerfile 中硬编码
   - 解决：使用 `ARG` 或运行时 `-e`
   - 示例：
     ```dockerfile
     ARG SECRET_KEY
     ENV SECRET_KEY=$SECRET_KEY
     ```

## Verification Checklist

- [ ] Dockerfile 存在且语法正确：`docker build -t test .`
- [ ] .dockerignore 存在：`ls -la .dockerignore`
- [ ] 镜像构建成功：`docker images | grep <image-name>`
- [ ] 容器运行正常：`docker ps | grep <container-name>`
- [ ] 应用可访问：`curl http://localhost:<port>/health`
- [ ] 日志正常：`docker logs <container-name>`
- [ ] 数据持久化：检查卷挂载

## Quick Reference

### 常用命令

```bash
# 构建
docker build -t my-app:latest .

# 运行
docker run -d -p 8000:8000 --name my-app my-app:latest

# 查看
docker ps
docker images

# 日志
docker logs -f my-app

# 进入
docker exec -it my-app bash

# 停止/启动
docker stop my-app
docker start my-app

# 清理
docker system prune -a
```

### 常用镜像

```bash
# Python
python:3.12-slim
python:3.12-alpine

# Node.js
node:18-alpine
node:18-slim

# 数据库
postgres:15
mysql:8
redis:7-alpine

# Web 服务器
nginx:alpine
traefik:v2.10
```

## Example Usage

**场景 1：部署 FastAPI 应用**
```
用户：用 Docker 部署 FastAPI 应用
Hermes：[加载 docker-deploy skill]
Hermes：[创建 Dockerfile]
Hermes：[构建镜像]
Hermes：[运行容器]
结果：应用运行在 http://localhost:8000
```

**场景 2：部署全栈应用**
```
用户：部署前端+后端+数据库
Hermes：[加载 docker-deploy skill]
Hermes：[创建 docker-compose.yml]
Hermes：[启动所有服务]
结果：完整应用运行
```

**场景 3：优化镜像大小**
```
用户：镜像太大了，优化一下
Hermes：[加载 docker-deploy skill]
Hermes：[更换基础镜像为 slim/alpine]
Hermes：[优化 Dockerfile 层]
结果：镜像从 1GB 减少到 200MB
```
```

## 分析

### 这个 Skill 的特点

1. **覆盖全面**
   - Dockerfile 创建
   - 镜像构建
   - 容器管理
   - Docker Compose

2. **Pitfalls 详细**
   - 8 个常见问题
   - 每个都有症状、原因、解决

3. **示例丰富**
   - Python 应用
   - Node.js 应用
   - 全栈应用

4. **Quick Reference 实用**
   - 常用命令速查
   - 常用镜像列表

### 可以改进的地方

1. **添加 Kubernetes 相关**
   - K8s 部署
   - K8s 配置

2. **添加 CI/CD 相关**
   - GitHub Actions
   - GitLab CI

3. **添加监控相关**
   - 容器监控
   - 日志收集
```
