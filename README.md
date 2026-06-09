# Hermes Skill 开发指南

Hermes Agent 的 Skill 系统深度解析：从原理到实战，从开发到面试。

## 项目结构

```
hermes-skill-guide/
├── chapters/              # 章节内容
│   ├── 01-what-is-skill.md
│   ├── 02-skill-structure.md
│   ├── 03-development-guide.md
│   ├── 04-common-pitfalls.md
│   ├── 05-how-hermes-calls-skill.md
│   ├── 06-interview-questions.md
│   └── 07-best-practices.md
├── examples/              # 示例 skill
│   ├── basic-skill.md
│   └── advanced-skill.md
├── templates/             # 模板文件
│   └── skill-template.md
└── README.md
```

## 适合谁

- 想深入了解 Hermes Agent 架构的开发者
- 准备 AI Agent 相关面试的候选人
- 想要高效使用 Hermes 的用户

## 如何使用

1. 按顺序阅读 `chapters/` 目录
2. 参考 `examples/` 中的示例
3. 使用 `templates/` 创建自己的 skill

## 核心要点

```
Skill = 可复用的程序记忆
     = YAML 元数据 + Markdown 正文
     = 触发条件 + 执行步骤 + 验证清单
```

## 面试高频考点

1. Skill 的作用和价值
2. Skill 的匹配机制
3. Skill 的生命周期
4. 如何设计一个好的 Skill
5. Skill 与 Memory 的区别

---

**作者:** dirjaker
**创建时间:** 2026-06-09
**最后更新:** 2026-06-09
