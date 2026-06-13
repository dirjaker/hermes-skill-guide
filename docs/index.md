---
layout: home
hero:
  name: "Hermes Skill Guide"
  text: "Skill 系统深度解析"
  tagline: 从原理到实战，从开发到面试
  actions:
    - theme: brand
      text: 开始阅读
      link: /chapters/01-what-is-skill
    - theme: alt
      text: 示例 Skill
      link: /examples/basic-skill

features:
  - title: 📚 核心章节
    details: 8 个章节，从 Skill 基础概念到高级面试题，全面覆盖
  - title: 💡 实战示例
    details: 5 个完整的 Skill 示例，覆盖开发、部署、文档等场景
  - title: 📋 开发模板
    details: 可直接使用的 Skill 模板，快速开始开发
  - title: 🎓 面试准备
    details: 20 道高频面试题，详细参考答案
---

## 📖 项目简介

本项目是一份全面的 Hermes Agent Skill 开发指南，适合：

- 想深入了解 Hermes Agent 架构的开发者
- 准备 AI Agent 相关面试的候选人
- 想要高效使用 Hermes 的用户

## 🔑 核心概念

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

## 📊 内容统计

| 类别 | 数量 | 说明 |
|------|------|------|
| 核心章节 | 8 章 | 从基础到高级 |
| 面试题 | 20 道 | 基础 + 高级 |
| 示例 Skill | 5 个 | 覆盖常见场景 |
| 模板文件 | 1 个 | 可直接使用 |
| 总行数 | **5,700+** | 深度内容 |
