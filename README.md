# ArvelVale 的个人博客

晨熠（ArvelVale）的个人博客 —— 记录技术探索、思考与成长。

线上地址：https://arvelvale.github.io

## 技术栈

- [Astro](https://astro.build) 5（静态站点生成，Content Collections）
- Tailwind CSS 3 + @tailwindcss/typography
- MDX、KaTeX（数学公式）、Mermaid（图表）、自研思维导图渲染
- GitHub Actions 自动部署到 GitHub Pages（推送 `main` 即发布）

## 本地开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建到 dist/
```

## 目录结构

```
src/content/blog/    # 文章（Markdown，frontmatter 含 title/pubDate/category/tags/series）
src/pages/           # 页面：首页 / 文章 / 分类 / 专栏 / 搜索
src/layouts/         # 页面布局（含文章排版与阅读进度）
public/uploads/      # 文章配图（WebP 优先，单张尽量 < 500KB）
```

## 写作规范

- 文件名与标题保持一致；系列文章使用「系列名-序号-主题」命名，并设置 frontmatter 的 `series` / `seriesOrder`
- 配图优先使用 WebP；PNG 截图超过 500KB 先压缩再提交
- 配套桌面编辑器：[blog-editor](../blog-editor)（支持单篇发布/撤回）

## License

文章版权归作者所有；站点代码以 [MIT](./LICENSE) 开源。
