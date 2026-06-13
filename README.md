# Hermes Skill 开发指南

> Hermes Agent 的 Skill 系统深度解析：从原理到实战，从开发到面试

[![GitHub](https://img.shields.io/badge/GitHub-dirjaker-181717?style=flat&logo=github)](https://github.com/dirjaker)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](README.md)
[![Content](https://img.shields.io/badge/Content-5700%2B%20Lines-blue.svg)](#内容统计)

## 🌐 Online: [Click here](https://dirjaker.github.io/hermes-skill-guide/)

---

## 📖 项目简介

本项目是一份全面的 Hermes Agent Skill 开发指南，适合：
- 想深入了解 Hermes Agent 架构的开发者
- 准备 AI Agent 相关面试的候选人
- 想要高效使用 Hermes 的用户

**你将学到：**
- ✅ Skill 的核心概念和设计原理
- ✅ Skill 的完整结构和元数据规范
- ✅ 从零开始开发 Skill 的实战方法
- ✅ 常见陷阱和避坑指南
- ✅ Hermes 如何调用 Skill 的底层机制
- ✅ 面试高频考点和参考答案

---

## 📁 项目结构

```
hermes-skill-guide/
│
├── chapters/                            # 📚 核心章节（8章）
│   ├── 01-what-is-skill.md             # 第一章：什么是 Skill
│   ├── 02-skill-structure.md           # 第二章：Skill 的结构
│   ├── 03-development-guide.md         # 第三章：开发指南
│   ├── 04-common-pitfalls.md           # 第四章：常见陷阱
│   ├── 05-how-hermes-calls-skill.md    # 第五章：Hermes 如何调用 Skill
│   ├── 06-interview-questions.md       # 第六章：面试题
│   ├── 07-best-practices.md            # 第七章：最佳实践
│   └── 08-advanced-interview-questions.md  # 第八章：高级面试题
│
├── examples/                            # 💡 示例 Skill（5个）
│   ├── basic-skill.md                  # 基础示例
│   ├── advanced-skill.md               # 高级示例
│   ├── api-doc-generator-skill.md      # API 文档生成器
│   ├── docker-deploy-skill.md          # Docker 部署
│   └── real-project-cases.md           # 真实项目案例
│
├── templates/                           # 📋 模板文件
│   └── skill-template.md               # Skill 开发模板
│
└── README.md                            # 📖 项目说明（本文件）
```

---

## 📚 内容概览

### 第一部分：核心章节（chapters/）

#### 第一章：什么是 Skill
- Skill 的定义：可复用的程序记忆
- Skill vs Memory vs Plugin
- Skill 的价值和作用
- 实际应用场景

#### 第二章：Skill 的结构
- YAML 元数据规范
  - name、description、category
  - 触发条件和匹配规则
- Markdown 正文结构
  - 触发条件
  - 执行步骤
  - 验证清单
- 版本控制和更新策略

#### 第三章：开发指南
- 从零开始创建 Skill
- 命名规范和最佳实践
- 测试和调试方法
- 发布和分享

#### 第四章：常见陷阱
- 过度泛化 vs 过度具体
- 缺乏验证步骤
- 忽略边界条件
- 实际案例分析

#### 第五章：Hermes 如何调用 Skill
- Skill 匹配机制
- 加载和执行流程
- 上下文传递
- 错误处理

#### 第六章：面试题（基础）
- 10 道高频面试题
- 详细参考答案
- 面试技巧

#### 第七章：最佳实践
- 设计原则
- 代码规范
- 性能优化
- 团队协作

#### 第八章：高级面试题
- 10 道进阶面试题
- 系统设计题
- 场景分析题

---

### 第二部分：示例 Skill（examples/）

#### 基础示例
- 最简单的 Skill 结构
- 基本元数据配置
- 简单的执行步骤

#### 高级示例
- 复杂的触发条件
- 多步骤执行流程
- 错误处理机制
- 条件分支逻辑

#### API 文档生成器
- 实际项目应用
- 输入输出规范
- 模板化设计

#### Docker 部署
- DevOps 场景
- 环境检测
- 自动化流程

#### 真实项目案例
- 来自实际项目的 Skill
- 遇到的问题和解决方案
- 优化迭代过程

---

### 第三部分：模板文件（templates/）

#### Skill 开发模板
- 完整的 YAML 元数据模板
- 标准的 Markdown 结构
- 注释和说明
- 可直接使用的脚手架

---

## 🎯 学习路径

### 入门路径（1-2 天）

```
1. 阅读 chapters/01-what-is-skill.md（30分钟）
   → 理解 Skill 的基本概念

2. 阅读 chapters/02-skill-structure.md（40分钟）
   → 掌握 Skill 的结构规范

3. 阅读 examples/basic-skill.md（20分钟）
   → 看一个完整的示例

4. 使用 templates/skill-template.md 创建第一个 Skill（1小时）
   → 实践是最好的学习
```

### 进阶路径（3-5 天）

```
1. 阅读 chapters/03-development-guide.md（1小时）
   → 学习开发技巧

2. 阅读 chapters/04-common-pitfalls.md（40分钟）
   → 避免常见错误

3. 阅读 chapters/05-how-hermes-calls-skill.md（1小时）
   → 理解底层机制

4. 阅读 examples/ 中的 5 个示例（1.5小时）
   → 学习实际应用

5. 开发 3 个自己的 Skill（3小时）
   → 实战出真知
```

### 面试准备路径（2-3 天）

```
1. 掌握前面的所有内容

2. 阅读 chapters/06-interview-questions.md（1.5小时）
   → 学习基础面试题

3. 阅读 chapters/07-best-practices.md（1小时）
   → 掌握最佳实践

4. 阅读 chapters/08-advanced-interview-questions.md（1.5小时）
   → 攻克高级面试题

5. 阅读 examples/real-project-cases.md（1小时）
   → 准备项目经验

6. 模拟面试练习
   → 找人模拟或自我练习
```

---

## 🔑 核心概念

### Skill 的本质

```
Skill = 可复用的程序记忆

     = YAML 元数据     （定义：我是谁、我做什么、何时触发）
     + Markdown 正文   （描述：怎么做、验证清单）
     + 触发条件        （规则：什么时候用我）
     + 执行步骤        （指导：具体怎么做）
```

### Skill vs Memory vs Plugin

| 特性 | Skill | Memory | Plugin |
|------|-------|--------|--------|
| **本质** | 程序记忆 | 事实记忆 | 外部工具 |
| **内容** | 如何做某事 | 某个事实 | 功能扩展 |
| **格式** | 结构化文档 | 短文本 | 代码 |
| **触发** | 任务匹配 | 上下文相关 | 显式调用 |
| **示例** | "如何部署 Docker" | "用户喜欢简洁回答" | "天气 API" |

### Skill 的生命周期

```
创建 → 测试 → 发布 → 匹配 → 加载 → 执行 → 验证 → 更新
  ↑                                                   ↓
  └───────────────── 持续迭代 ←────────────────────────┘
```

---

## 💡 示例预览

### 基础 Skill 示例

```yaml
---
name: hello-world
description: 一个最简单的 Skill 示例
category: examples
---

# Hello World Skill

## 触发条件

当用户说"你好"或"hello"时触发。

## 执行步骤

1. 用中文回复"你好！有什么可以帮助你的吗？"
2. 询问用户具体需求

## 验证清单

- [ ] 回复是否友好
- [ ] 是否询问了用户需求
```

### 高级 Skill 示例

```yaml
---
name: api-doc-generator
description: 根据代码自动生成 API 文档
category: development
version: 1.2.0
tags: [api, documentation, automation]
---

# API 文档生成器

## 触发条件

当用户要求生成 API 文档、接口文档、Swagger 文档时触发。

## 前置条件

- 项目使用 Python/FastAPI/Flask 或 Node.js/Express
- 代码中有路由定义

## 执行步骤

### 1. 项目分析
- 识别项目类型和框架
- 定位路由定义文件
- 提取 API 端点信息

### 2. 信息提取
- 解析路由装饰器
- 提取请求方法、路径、参数
- 解析 docstring 或注释
- 识别请求/响应模型

### 3. 文档生成
- 按照 OpenAPI 3.0 规范组织
- 生成 YAML 或 JSON 格式
- 包含示例请求和响应

### 4. 验证和优化
- 验证文档格式正确
- 检查必填字段完整
- 优化描述和示例

## 验证清单

- [ ] 是否识别了所有 API 端点
- [ ] 参数类型是否正确
- [ ] 描述是否清晰
- [ ] 示例是否可用
- [ ] 文档格式是否标准

## 常见问题

**Q: 如果项目没有注释怎么办？**
A: 根据代码结构推断，但建议提醒用户补充注释。

**Q: 支持哪些框架？**
A: 目前支持 FastAPI、Flask、Express、Spring Boot。
```

---

## 📊 内容统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 核心章节 | 8 章 | 从基础到高级 |
| 面试题 | 20 道 | 基础 + 高级 |
| 示例 Skill | 5 个 | 覆盖常见场景 |
| 模板文件 | 1 个 | 可直接使用 |
| 总行数 | **5,700+** | 深度内容 |
| 代码示例 | 50+ 个 | 实战导向 |

---

## 🎓 面试高频考点

### 基础考点

1. **Skill 的定义和作用**
   - 什么是 Skill？
   - Skill 的核心价值是什么？
   - Skill 和 Memory 的区别？

2. **Skill 的结构**
   - YAML 元数据包含哪些字段？
   - Markdown 正文的结构是什么？
   - 触发条件如何设计？

3. **Skill 的生命周期**
   - Skill 是如何被匹配的？
   - Skill 是如何被加载的？
   - Skill 是如何被执行的？

### 进阶考点

4. **设计原则**
   - 如何设计一个好的 Skill？
   - Skill 的粒度如何把握？
   - 如何处理 Skill 的冲突？

5. **性能优化**
   - 如何优化 Skill 的匹配速度？
   - 如何减少 Skill 的加载时间？
   - 如何提高 Skill 的执行效率？

6. **实战经验**
   - 你开发过哪些 Skill？
   - 遇到过什么问题？如何解决的？
   - 如何评估 Skill 的质量？

---

## 🚀 快速开始

### 第一步：了解概念

```bash
# 阅读第一章，理解 Skill 是什么
cat chapters/01-what-is-skill.md
```

### 第二步：看示例

```bash
# 阅读基础示例
cat examples/basic-skill.md

# 阅读高级示例
cat examples/advanced-skill.md
```

### 第三步：动手实践

```bash
# 复制模板
cp templates/skill-template.md my-skill.md

# 编辑你的 Skill
vim my-skill.md

# 在 Hermes 中测试
hermes skill test my-skill.md
```

### 第四步：准备面试

```bash
# 阅读面试题
cat chapters/06-interview-questions.md
cat chapters/08-advanced-interview-questions.md

# 练习回答
# 找人模拟面试或自我练习
```

---

## 🤝 如何贡献

欢迎提交 Issue 和 Pull Request！

### 贡献方式

1. **报告问题**：发现错误或有改进建议
2. **补充内容**：添加新的章节或示例
3. **分享经验**：分享你的 Skill 开发经验
4. **翻译**：帮助翻译成其他语言

### 贡献指南

1. Fork 项目
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 👤 作者

**dirjaker**
- GitHub: [@dirjaker](https://github.com/dirjaker)

---

## 🙏 致谢

感谢 Hermes Agent 团队提供的优秀框架！

---

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- GitHub Issues：[提交问题](https://github.com/dirjaker/hermes-skill-guide/issues)

---

## ⭐ 支持项目

如果这个项目对你有帮助，请给个 Star ⭐！

你的支持是我持续更新的动力！

---

*最后更新：2026 年 6 月*
