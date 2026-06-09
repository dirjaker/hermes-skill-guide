# 示例：高级 Skill

这是一个复杂的 skill 示例，用于 FastAPI 后端开发，包含 references 和 templates。

## 目录结构

```
fastapi-backend/
├── SKILL.md                    # 主文件
├── references/
│   ├── project-structure.md    # 项目结构详解
│   ├── api-patterns.md         # API 模式
│   └── common-pitfalls.md      # 常见问题
└── templates/
    ├── main.py                 # 入口文件模板
    ├── config.py               # 配置文件模板
    └── requirements.txt        # 依赖模板
```

## SKILL.md

```yaml
---
name: fastapi-backend
description: "Use when building FastAPI backends. Includes project structure, API patterns, and best practices. Use when creating FastAPI project, adding API endpoints, or configuring database."
version: 1.0.0
author: dirjaker
license: MIT
metadata:
  hermes:
    tags: [fastapi, python, backend, api, web]
    related_skills: [python-project-scaffold, test-driven-development]
---

# FastAPI 后端开发

## Overview

完整的 FastAPI 后端开发指南，包含项目结构、常见模式、最佳实践。适用于创建新的 FastAPI 项目或添加 API 端点。

## When to Use

- 创建新的 FastAPI 项目
- 添加 API 端点
- 配置数据库、认证等
- 重构后端代码

**Don't use for:**
- 前端开发（用 vue-naiveui-frontend）
- 初始项目创建（用 python-project-scaffold）
- 部署服务（用 docker-deployment）

## Steps

### 1. 项目结构

标准 FastAPI 项目结构：

```
backend/
├── main.py              # 入口文件
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py      # 依赖注入
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── endpoints/
│   │       │   ├── users.py
│   │       │   └── items.py
│   │       └── router.py
│   ├── core/
│   │   ├── config.py    # 配置
│   │   ├── security.py  # 认证
│   │   └── database.py  # 数据库
│   ├── models/
│   │   ├── user.py
│   │   └── item.py
│   ├── schemas/
│   │   ├── user.py
│   │   └── item.py
│   └── services/
│       ├── user.py
│       └── item.py
├── requirements.txt
└── README.md
```

详细结构参考 [references/project-structure.md](references/project-structure.md)

### 2. 创建入口文件

**main.py:**
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="My API", version="0.1.0")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/health")
async def health():
    return {"status": "ok"}
```

模板文件参考 [templates/main.py](templates/main.py)

### 3. 添加 API 端点

**app/api/v1/endpoints/users.py:**
```python
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse

router = APIRouter()

@router.post("/", response_model=UserResponse)
async def create_user(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    """创建用户"""
    # 检查邮箱是否已存在
    existing = await db.query(User).filter(User.email == user_in.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # 创建用户
    user = User(**user_in.dict())
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return user
```

更多模式参考 [references/api-patterns.md](references/api-patterns.md)

### 4. 配置数据库

**app/core/database.py:**
```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

engine = create_async_engine(settings.DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
```

### 5. 配置认证

**app/core/security.py:**
```python
from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    # 从数据库获取用户
    user = await get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    
    return user
```

## Common Pitfalls

1. **忘记 async def**
   - 症状：端点不是异步函数
   - 解决：所有端点必须用 `async def`

2. **数据库连接未关闭**
   - 症状：连接池耗尽
   - 解决：使用依赖注入自动管理

3. **CORS 配置错误**
   - 症状：前端请求报跨域错误
   - 解决：检查 CORS 配置

4. **Pydantic 模型错误**
   - 症状：422 Validation Error
   - 解决：检查模型字段和类型

5. **数据库迁移遗漏**
   - 症状：表结构不匹配
   - 解决：运行 alembic migrate

详细问题参考 [references/common-pitfalls.md](references/common-pitfalls.md)

## Verification Checklist

- [ ] 后端能启动：`uvicorn main:app --reload`
- [ ] 健康检查通过：`curl http://localhost:8000/health`
- [ ] API 文档可访问：http://localhost:8000/docs
- [ ] 端点能正常响应
- [ ] 数据库连接正常
- [ ] 认证流程正常

## Quick Reference

### 常用命令

```bash
# 启动服务
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# 运行测试
pytest tests/ -v

# 数据库迁移
alembic revision --autogenerate -m "description"
alembic upgrade head

# 代码格式化
black app/ tests/
isort app/ tests/
```

### 常用依赖

```
fastapi>=0.110.0
uvicorn>=0.29.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
httpx>=0.27.0
alembic>=1.13.0
```

## Example Usage

**场景 1：创建新项目**
```
用户：创建一个 FastAPI 后端项目
Hermes：[加载 fastapi-backend skill]
Hermes：[按照 Steps 创建项目结构]
结果：完整的 FastAPI 项目
```

**场景 2：添加端点**
```
用户：添加用户注册接口
Hermes：[加载 fastapi-backend skill]
Hermes：[按照 Steps 创建端点]
结果：POST /api/v1/users/ 端点
```

**场景 3：配置认证**
```
用户：添加 JWT 认证
Hermes：[加载 fastapi-backend skill]
Hermes：[按照 Steps 配置认证]
结果：完整的认证流程
```
```

## 分析

### 为什么这是一个好的高级 Skill

1. **References 组织良好**
   - 详细的项目结构
   - 常见的 API 模式
   - 完整的 Pitfalls

2. **Templates 实用**
   - 入口文件模板
   - 配置文件模板
   - 依赖模板

3. **Description 丰富**
   - 多个触发场景
   - 明确的使用范围

4. **Steps 完整**
   - 从项目结构到具体实现
   - 包含代码示例

5. **可扩展性强**
   - 可以添加更多 references
   - 可以添加更多 templates

### 改进建议

1. **添加测试相关内容**
   - 测试目录结构
   - 测试模板
   - 测试最佳实践

2. **添加部署相关内容**
   - Docker 配置
   - CI/CD 配置
   - 环境变量管理

3. **添加监控相关内容**
   - 日志配置
   - 性能监控
   - 错误追踪
```
