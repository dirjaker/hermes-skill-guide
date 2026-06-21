# 更新日志

本文档记录 Hermes Skill 开发指南项目的所有重要变更。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
版本号遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

---

## [1.2.0] - 2026-06-22

### 新增

- **第八章：进阶面试题（Q21-Q40）** — 涵盖设计模式、实现细节、场景应用等高级面试题目
- **实战案例文档** — 5 个真实项目案例（Vestio、LLM Agent 面试准备、GitHub 仓库管理、模型监控系统、Docker 容器化部署）
- **CHANGELOG.md** — 添加更新日志，记录项目变更历史

### 改进

- **README.md 全面更新**
  - 新增内容概览章节，包含核心章节、示例 Skill、开发模板的表格化导航
  - 功能特性更新：面试题从 20 道扩充至 40 道
  - 新增实战案例特性介绍
  - 内容统计更新
  - 开发日志更新
- **docs/index.md 更新**
  - 新增实战案例和最佳实践特性卡片
  - 内容统计更新，反映最新的 40 道面试题和 5 个实战案例
- **文档一致性**
  - 统一 `chapters/`、`examples/`、`templates/` 顶层目录与 `docs/` 下的对应文件
  - 修复 HTML 实体转义差异（`<` → `&lt;`、`>` → `&gt;`），确保 VitePress 正确渲染

### 修复

- 修复顶层 `chapters/` 目录中部分文件的 Markdown 代码块内 HTML 标签未转义的问题
- 修复顶层 `examples/` 目录中部分文件与 `docs/` 版本不一致的问题

---

## [1.1.0] - 2026-06-21

### 新增

- **Skill 模板** — 标准化模板文件，包含填写指南和完整示例
- **示例 Skill 文档**
  - 基础 Skill 示例（Git Commit 规范）
  - 高级 Skill 示例（FastAPI 后端开发）
  - Docker 部署 Skill 示例
  - API 文档生成 Skill 示例
- **面试常见问题（Q1-Q20）** — 基础概念、设计思想、实现细节、场景应用题
- **最佳实践总结** — 开发、使用、设计三个维度的最佳实践

### 改进

- 完善第二章 Skill 结构详解，补充 description 写法和文件大小限制
- 完善第三章开发实战指南，添加 vestio-dev-server 完整案例
- 完善第四章常见问题，扩展至 10 个常见问题
- 完善第五章调用机制，补充匹配算法详解和调试技巧

---

## [1.0.0] - 2026-06-20

### 新增

- **项目初始化** — 创建 hermes-skill-guide 项目
- **VitePress 文档站点** — 配置 VitePress + GitHub Pages 部署
- **核心章节（第一章至第七章）**
  - 第一章：什么是 Skill
  - 第二章：Skill 的结构详解
  - 第三章：Skill 开发实战指南
  - 第四章：常见问题和解决方案
  - 第五章：Hermes 如何调用 Skill
  - 第六章：面试常见问题
  - 第七章：最佳实践总结
- **README.md** — 项目介绍、功能特性、快速开始
- **Banner SVG** — 科技风格的项目 Banner 图片
- **MIT License** — 开源许可证
