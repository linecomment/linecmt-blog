import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

const sharedSidebarOptions = {
  documentRootPath: '/',
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  includeFolderIndexFile: true,
  includeRootIndexFile: true,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 100,
} as const

// GitHub Pages：项目页为 /<仓库名>/，用户/组织站点页（<user>.github.io）为 /
// CI 通过环境变量 VITEPRESS_BASE 注入；本地开发默认 '/'
const base =
  (process.env.VITEPRESS_BASE && process.env.VITEPRESS_BASE.trim()) || '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base,

  title: 'Linecmt 知识库',
  description: '个人知识记录、笔记与备忘',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap',
      },
    ],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '知识笔记', link: '/notes/' },
    ],

    sidebar: generateSidebar([
      {
        ...sharedSidebarOptions,
        scanStartPath: 'guide',
        resolvePath: '/guide/',
        collapsed: false,
      },
      {
        ...sharedSidebarOptions,
        scanStartPath: 'notes',
        resolvePath: '/notes/',
        collapsed: true,
      },
    ]),

    outline: { label: '本页目录' },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },

    footer: {
      message: '个人知识库 · 持续整理',
      copyright: 'Copyright © 2025 Linecomment',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '关闭搜索',
            noResultsText: '未找到相关结果',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
})
