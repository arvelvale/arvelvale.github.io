**English** | [简体中文](./README.zh-CN.md)

# ArvelVale's Personal Blog

The personal blog of 晨熠 (ArvelVale) — notes on technical explorations, thinking, and growing up.

Live site: https://arvelvale.github.io (English by default, Chinese available at `/zh/`)

## Tech Stack

- [Astro](https://astro.build) 5 (static site generation with Content Collections)
- Tailwind CSS 3 + @tailwindcss/typography
- KaTeX (math), Mermaid (diagrams), homegrown mindmap rendering (MDX integrated; existing posts are all `.md`)
- GitHub Actions auto-deploy to GitHub Pages (push to `main` to publish)

## Local Development

```bash
npm install
npm run dev      # local preview
npm run build    # build to dist/
```

## Directory Structure

```
src/content/blog/    # posts (Markdown, frontmatter: title/pubDate/category/tags/series/lang)
src/pages/           # pages: home / posts / categories / series / search (en/ + zh/ trees)
src/layouts/         # layouts (post typography + reading progress)
public/uploads/      # post images (WebP preferred, keep single images < 500KB)
```

## Writing Conventions

- Keep filenames consistent with titles, but avoid URL-unfriendly characters such as full-width symbols, spaces, or commas (use lowercase English slugs with hyphens instead); series posts use the `series-name-number-topic` pattern with `series` / `seriesOrder` in frontmatter
- Prefer WebP for images; compress PNG screenshots over 500KB before committing
- Companion desktop editor: [blog-editor](../blog-editor) (single-post publish/unpublish support)
- Posts default to Chinese (`lang: zh`); English posts set `lang: en` with an English slug, and link to each other (`English version` / `中文版` notes)

## License

Post content © the author; site code open-sourced under [MIT](./LICENSE).
