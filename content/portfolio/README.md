# Portfolio Content Structure / 作品集内容结构

## 目录结构

```
content/portfolio/          ← 作品集数据 (Markdown + JSON)
├── design/                 ← Design 作品
│   ├── lazada-ued.md
│   ├── user-growth-coins.md
│   ├── tcl-app-design.md
│   └── tcl-kitchen.md
├── product/                ← IT Products 作品
│   ├── weiju-saas.md
│   ├── brazil-erp.md
│   ├── goldoak-ecommerce.md
│   ├── tcl-iot.md
│   └── malim-consulting.md
└── development/            ← Website 作品
    ├── swissazureai.md
    ├── malim-energy.md
    ├── keyflow.md
    ├── sherry-web.md
    ├── shopimage.md
    └── ai-thesis.md

public/portfolio/           ← 作品集图片
├── design/
│   ├── lazada-ued/
│   │   ├── cover.jpg       ← 封面图
│   │   ├── screenshot-1.jpg
│   │   └── screenshot-2.jpg
│   └── ...
├── product/
│   └── ...
└── development/
    └── ...
```

## Markdown 格式标准

每个 .md 文件使用 frontmatter + 正文：

```markdown
---
id: lazada-ued
title: Lazada Seller Center UED
subtitle: E-commerce Design System
category: design
subCategory: UI
year: "2016-2020"
company: Lazada Tech
location: China
tags: [UI/UX, Design System, CRM, User Research]
featured: true
link: ""
cover: /portfolio/design/lazada-ued/cover.jpg
images:
  - /portfolio/design/lazada-ued/screenshot-1.jpg
  - /portfolio/design/lazada-ued/screenshot-2.jpg
---

## Overview

Refined seller center design system for both administration and seller-facing CRM system. Improved process efficiency by 30%.

## Challenge

...

## Solution

...

## Results

- Improved process efficiency by 30%
- ...
```

## 如何添加新作品

1. 在 `content/portfolio/<category>/` 创建 `.md` 文件
2. 在 `public/portfolio/<category>/<id>/` 放入图片
3. 运行 `npm run portfolio:sync` 自动同步到 portfolio-data.ts

## 自动整理规则

- 图片自动压缩到 max 1200px 宽
- 封面图 aspect ratio 4:3
- 标签自动标准化 (大小写统一)
- 按年份自动排序
