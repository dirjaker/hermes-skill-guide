# 示例：API 文档生成 Skill

这是一个用于自动生成 API 文档的 skill 示例。

## SKILL.md

```yaml
---
name: api-doc-generator
description: "Use when generating API documentation. Automatically creates OpenAPI/Swagger docs from code."
version: 1.0.0
author: dirjaker
license: MIT
metadata:
  hermes:
    tags: [api, documentation, openapi, swagger, fastapi]
    related_skills: [fastapi-backend, markdown-docs]
---

# API 文档生成

## Overview

帮助用户自动生成 API 文档，支持 OpenAPI/Swagger 规范，可生成 Markdown、HTML、PDF 等格式。

## When to Use

- 为 FastAPI/Flask 应用生成文档
- 更新现有 API 文档
- 生成 API 客户端 SDK
- 验证 API 规范

**Don't use for:**
- 编写用户手册（用 user-guide-generator）
- 生成数据库文档（用 db-doc-generator）

## Steps

### 1. 从 FastAPI 生成 OpenAPI

**FastAPI 自动生成：**
```python
from fastapi import FastAPI

app = FastAPI(
    title="My API",
    description="This is a very fancy API",
    version="0.1.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc",  # ReDoc
)

@app.get("/items/{item_id}", 
         summary="Get item",
         description="Get item by ID",
         response_model=ItemResponse)
async def read_item(item_id: int):
    """获取物品详情"""
    return {"item_id": item_id}
```

**访问文档：**
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
- OpenAPI JSON: http://localhost:8000/openapi.json

### 2. 导出 OpenAPI 规范

```bash
# 下载 OpenAPI JSON
curl http://localhost:8000/openapi.json > openapi.json

# 使用 Python 脚本
python -c "
import httpx
resp = httpx.get('http://localhost:8000/openapi.json')
with open('openapi.json', 'w') as f:
    f.write(resp.text)
"
```

### 3. 生成 Markdown 文档

**使用 openapi-generator：**
```bash
# 安装
npm install -g @openapitools/openapi-generator-cli

# 生成 Markdown
openapi-generator generate \
  -i openapi.json \
  -g markdown \
  -o docs/api/
```

**使用 widdershins：**
```bash
# 安装
npm install -g widdershins

# 生成 Markdown
widdershins openapi.json -o docs/api.md
```

### 4. 生成 HTML 文档

**使用 Swagger UI：**
```bash
# 下载 Swagger UI
git clone https://github.com/swagger-api/swagger-ui.git

# 复制文件
cp swagger-ui/dist/* docs/swagger/

# 配置
cat > docs/swagger/index.html << 'EOF'
<!DOCTYPE html>
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;API Documentation</title>
    <link rel="stylesheet" type="text/css" href="swagger-ui.css">
</head>
&lt;body&gt;
    <div id="swagger-ui"></div>
    <script src="swagger-ui-bundle.js"></script>
    &lt;script&gt;
        SwaggerUIBundle({
            url: "/openapi.json",
            dom_id: '#swagger-ui',
        })
    </script>
</body>
</html>
EOF
```

**使用 ReDoc：**
```bash
# 安装
npm install -g redoc-cli

# 生成 HTML
redoc-cli bundle openapi.json -o docs/redoc.html
```

### 5. 生成 PDF 文档

**使用 swagger-markdown + pandoc：**
```bash
# 生成 Markdown
widdershins openapi.json -o temp.md

# 转换为 PDF
pandoc temp.md -o docs/api.pdf

# 清理
rm temp.md
```

### 6. 生成客户端 SDK

**使用 openapi-generator：**
```bash
# Python SDK
openapi-generator generate \
  -i openapi.json \
  -g python \
  -o sdk/python/

# JavaScript SDK
openapi-generator generate \
  -i openapi.json \
  -g javascript \
  -o sdk/javascript/

# TypeScript SDK
openapi-generator generate \
  -i openapi.json \
  -g typescript-fetch \
  -o sdk/typescript/
```

### 7. 验证 API 规范

**使用 swagger-cli：**
```bash
# 安装
npm install -g @apidevtools/swagger-cli

# 验证
swagger-cli validate openapi.json

# 检查错误
swagger-cli validate openapi.json 2>&1 | grep -i error
```

**使用 openapi-spec-validator：**
```python
# 安装
# pip install openapi-spec-validator

from openapi_spec_validator import validate
import json

with open('openapi.json') as f:
    spec = json.load(f)

validate(spec)
print("OpenAPI 规范有效！")
```

### 8. 自动化文档生成

**创建脚本 generate-docs.sh：**
```bash
#!/bin/bash

# 生成 OpenAPI JSON
curl http://localhost:8000/openapi.json > openapi.json

# 生成 Markdown
widdershins openapi.json -o docs/api.md

# 生成 HTML
redoc-cli bundle openapi.json -o docs/api.html

# 生成 PDF
pandoc docs/api.md -o docs/api.pdf

# 验证规范
swagger-cli validate openapi.json

echo "文档生成完成！"
```

**添加到 Makefile：**
```makefile
.PHONY: docs

docs:
	@echo "生成 API 文档..."
	@curl -s http://localhost:8000/openapi.json > openapi.json
	@widdershins openapi.json -o docs/api.md
	@redoc-cli bundle openapi.json -o docs/api.html
	@echo "文档生成完成！"
```

## Common Pitfalls

1. **文档与代码不同步**
   - 症状：文档描述与实际 API 不一致
   - 原因：代码修改后未重新生成文档
   - 解决：添加 CI/CD 自动化生成
   - 预防：使用代码注释自动生成文档

2. **缺少示例数据**
   - 症状：文档中没有请求/响应示例
   - 原因：FastAPI 模型缺少 `example` 字段
   - 解决：在 Pydantic 模型中添加示例
   - 示例：
     ```python
     class Item(BaseModel):
         name: str = Field(..., example="Foo")
         price: float = Field(..., example=42.0)
     ```

3. **缺少错误响应**
   - 症状：文档中没有错误码说明
   - 原因：未定义错误响应
   - 解决：添加 `responses` 参数
   - 示例：
     ```python
     @app.get("/items/{item_id}",
              responses={
                  404: {"description": "Item not found"},
                  422: {"description": "Validation error"}
              })
     async def read_item(item_id: int):
         pass
     ```

4. **认证信息缺失**
   - 症状：文档中没有认证说明
   - 原因：未配置安全方案
   - 解决：添加 SecurityScheme
   - 示例：
     ```python
     from fastapi.security import OAuth2PasswordBearer
     
     app = FastAPI()
     oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
     ```

5. **版本管理混乱**
   - 症状：多个版本的 API 文档混在一起
   - 原因：未明确版本策略
   - 解决：使用 URL 路径版本
   - 示例：
     ```python
     app.include_router(v1_router, prefix="/api/v1")
     app.include_router(v2_router, prefix="/api/v2")
     ```

## Verification Checklist

- [ ] OpenAPI JSON 可访问：`curl http://localhost:8000/openapi.json`
- [ ] Swagger UI 可访问：http://localhost:8000/docs
- [ ] 所有端点都有文档
- [ ] 请求/响应模型都有示例
- [ ] 错误响应都有说明
- [ ] 认证信息配置正确
- [ ] 文档与代码同步

## Quick Reference

### 常用工具

```bash
# OpenAPI Generator
npm install -g @openapitools/openapi-generator-cli

# Widdershins (Markdown)
npm install -g widdershins

# Swagger CLI (验证)
npm install -g @apidevtools/swagger-cli

# ReDoc (HTML)
npm install -g redoc-cli
```

### 常用命令

```bash
# 下载 OpenAPI JSON
curl http://localhost:8000/openapi.json > openapi.json

# 生成 Markdown
widdershins openapi.json -o docs/api.md

# 生成 HTML
redoc-cli bundle openapi.json -o docs/api.html

# 验证规范
swagger-cli validate openapi.json

# 生成 SDK
openapi-generator generate -i openapi.json -g python -o sdk/python/
```

### FastAPI 文档配置

```python
app = FastAPI(
    title="My API",
    description="API description",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)
```

## Example Usage

**场景 1：为 FastAPI 应用生成文档**
```
用户：为 FastAPI 应用生成 API 文档
Hermes：[加载 api-doc-generator skill]
Hermes：[从 FastAPI 导出 OpenAPI JSON]
Hermes：[生成 Markdown 和 HTML 文档]
结果：完整的 API 文档
```

**场景 2：更新现有文档**
```
用户：API 改了，更新文档
Hermes：[加载 api-doc-generator skill]
Hermes：[重新生成 OpenAPI JSON]
Hermes：[更新所有文档格式]
结果：文档与代码同步
```

**场景 3：生成客户端 SDK**
```
用户：生成 Python SDK
Hermes：[加载 api-doc-generator skill]
Hermes：[使用 openapi-generator 生成 SDK]
结果：可用的 Python SDK
```
```

## 分析

### 这个 Skill 的特点

1. **工具全面**
   - 多种文档格式（Markdown, HTML, PDF）
   - 多种工具（widdershins, redoc, openapi-generator）
   - 多种用途（文档、SDK、验证）

2. **自动化程度高**
   - 可以集成到 CI/CD
   - 可以使用 Makefile
   - 可以使用脚本

3. **Pitfalls 实用**
   - 文档同步问题
   - 示例数据缺失
   - 认证配置问题

### 可以改进的地方

1. **添加更多格式**
   - Postman Collection
   - Insomnia
   - API Blueprint

2. **添加更多工具**
   - Stoplight
   - ReadMe
   - GitBook

3. **添加协作功能**
   - 文档版本控制
   - 团队协作
   - 评论和反馈
```
