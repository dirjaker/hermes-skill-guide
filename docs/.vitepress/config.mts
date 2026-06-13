import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/hermes-skill-guide/',
  title: 'Hermes Skill 开发指南',
  description: 'Hermes Agent 的 Skill 系统深度解析：从原理到实战，从开发到面试',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '章节', link: '/chapters/01-what-is-skill' },
      { text: '示例', link: '/examples/basic-skill' },
      { text: '模板', link: '/templates/skill-template' },
      { text: 'GitHub', link: 'https://github.com/dirjaker/hermes-skill-guide' }
    ],
    sidebar: [
      {
        text: '📚 核心章节',
        items: [
          { text: '第一章：什么是 Skill', link: '/chapters/01-what-is-skill' },
          { text: '第二章：Skill 的结构', link: '/chapters/02-skill-structure' },
          { text: '第三章：开发指南', link: '/chapters/03-development-guide' },
          { text: '第四章：常见陷阱', link: '/chapters/04-common-pitfalls' },
          { text: '第五章：Hermes 如何调用 Skill', link: '/chapters/05-how-hermes-calls-skill' },
          { text: '第六章：面试题', link: '/chapters/06-interview-questions' },
          { text: '第七章：最佳实践', link: '/chapters/07-best-practices' },
          { text: '第八章：高级面试题', link: '/chapters/08-advanced-interview-questions' }
        ]
      },
      {
        text: '💡 示例 Skill',
        items: [
          { text: '基础示例', link: '/examples/basic-skill' },
          { text: '高级示例', link: '/examples/advanced-skill' },
          { text: 'API 文档生成器', link: '/examples/api-doc-generator-skill' },
          { text: 'Docker 部署', link: '/examples/docker-deploy-skill' },
          { text: '真实项目案例', link: '/examples/real-project-cases' }
        ]
      },
      {
        text: '📋 模板',
        items: [
          { text: 'Skill 开发模板', link: '/templates/skill-template' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/dirjaker/hermes-skill-guide' }
    ],
    search: {
      provider: 'local'
    },
    footer: {
      message: 'Hermes Agent Skill 开发指南',
      copyright: '© 2026 dirjaker'
    }
  }
})
