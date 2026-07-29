---
title: mindmap probe
description: 思维导图渲染验证用临时文章，验证完删除。
pubDate: '2026-07-29'
category: 博客搭建
---
## 正常四分支

很多性能问题其实不是渲染问题，而是**状态放错了位置**。在动手 `memo` 之前，
值得先把整条链路摊开看一遍。

```mindmap
React 性能优化
  度量优先
    React Profiler 火焰图
    Lighthouse 冷启动
    Web Vitals 真实用户
  渲染控制
    memo 划在 props 稳定处
    列表 key 用业务 id
    状态尽量下沉
  状态设计
    派生值不进 state
    Context 按变更频率拆
    更新保持不可变
  资源加载
    路由级懒加载
    图片预留宽高
    字体子集化
```

## 三级嵌套 + 长标签 + 奇数分支

```mindmap
博客技术架构
  内容层
    Markdown
      frontmatter 校验
      Shiki 语法高亮
    图片资产走 public 目录统一管理
  构建层
    Astro 静态生成
    GitHub Actions 自动部署
  编辑层
    Electron 桌面编辑器
```

## 单分支边界

```mindmap
只有一条分支
  唯一要点
```

## 错误输入（应显示可读提示而不是崩掉）

```mindmap
中心主题
没有缩进的第二行
```
