---
title: A Breakdown of This Blog's Technical Architecture
description: ''
pubDate: '2026-04-22'
updatedDate: '2026-04-22'
category: Tutorial
tags:
  - Blog
  - Architecture
lang: en
originalLang: zh
translationSlug: '对该blog技术架构的解析.md'
---

> 中文版：[对该blog技术架构的解析](/zh/blog/对该blog技术架构的解析.md/)

This blog is mostly built with Astro. And locally I use an editor that can upload and sync content to GitHub at any time, mimicking the Notion style, instead of directly editing the raw md files.

**The blog site itself**

## 1. Astro

Let me start with Astro. It's a modern static site generator framework, used for building blogs and documentation sites. The pain point it solves is that if you write a website with Vue or React, the browser usually has to download a whole pile of JS files, which makes the page slow to open.

Astro, on the other hand, is zero-JS by default. It assembles the page on the server and sends pure HTML straight to the browser, so users can see the content directly without waiting for JS to load.

If the site has interactive components that need JS, Astro lets you load the JS for just that part, while the rest of the interface stays HTML.

## 2. Preact

React is very powerful, but for a lot of websites it's too heavy. If you're only writing a few interactive components, using it really doesn't pay off. Preact solves this problem. Its features:

- Extremely lightweight: React is usually around 40 KB, while Preact is only 3 KB, so it basically adds no burden to the page. Its API is almost identical to React's, and it's nearly perfectly compatible with React's ecosystem libraries.

## 3. TailwindCSS

Traditional CSS requires opening a separate file to write your styles, but TailwindCSS is different. It doesn't provide more new styles; it provides a different way of writing CSS.

**1. Traditional CSS**

It's written like this, with what's called semantic class names:

```
.btn-primary {
  background-color: blue;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}
```

The pain points of this approach:

1.Naming is hard. You have to wrack your brain for names (`btn-primary`? `submit-button`? `blue-btn`?), and once the project gets big, naming becomes sheer agony.

2.Jumping between files, writing HTML for a while and CSS for a while.

3.Styles with the same name easily conflict.

**2. TailwindCSS**

The core idea is atomic CSS: break all CSS properties down into the finest possible grains, then just snap them together directly in the HTML.

You don't need to write any CSS!

For example:

```
<button class="bg-blue-500 text-white py-2 px-4 rounded font-bold">提交</button>
```

Tailwind has plenty of predefined utility classes:

- `bg-blue-500` = `background-color: blue;` (500 is the shade level)
- `text-white` = `color: white;`
- `py-2` = `padding-top: 0.5rem; padding-bottom: 0.5rem;` (top and bottom padding)
- `px-4` = `padding-left: 1rem; padding-right: 1rem;` (left and right padding)
- `rounded` = `border-radius: 0.25rem;` (rounded corners)
- `font-bold` = `font-weight: bold;` (bold)

It wraps CSS properties into shorthand class names, written directly on the HTML tag.

**The local editor**

## 4. Tiptap

It's a headless rich-text editor framework, that is, one with no head. So what does headless mean? Let's first look at the headed kind.

### 4.1. Headed

The logic and the page are welded together. How it works and what it looks like are hardcoded into one inseparable thing, so once you reference it you can't change its appearance. A lot of old websites' editors seem to be this headed and pretty ugly kind. I remember running into a few back when I used to do CTF challenges, but I didn't know what they were called.

### 4.2. Headless

It only provides the core logic, no UI. You want it to look like something, and it can be that something. It's all soul, and the body you have to build yourself, like the Tiptap editor here.

## 5. MDX

Traditional Markdown can only write static content; you can't put interactive logic in it, like buttons or dynamic charts.

MDX = Markdown + React components, and the file extension is .mdx.

Not only can you see text, you can also play music on demand, and tap a like button...
A lot of interactive tutorials seem to be built this way.

## 6. Hosting

I use GitHub Pages here, the old-school hosting godsend.
But there are other platforms that can host your site
1.Vercel
The hosting platform run by the commercial company behind the Next.js framework, and currently the hottest frontend deployment platform in the world.
Free tier: more than enough for personal projects (the Hobby plan is free forever, 100 GB of bandwidth per month).
2.Cloudflare Pages

A hosting service launched by Cloudflare, the world's largest CDN vendor.
Free tier: a terrifyingly unlimited amount (unlimited bandwidth, unlimited requests! This is something Vercel/Netlify can't match).
Features: because Cloudflare is in the CDN business itself, sites deployed on it are extremely fast to access around the world (including in China), and it's completely unafraid of being slammed by traffic. It also integrates Cloudflare Workers, so you can run JS logic at edge nodes.
Best for: blogs with very high speed requirements or that might get a lot of traffic.

## 7. Electron

A framework that lets you develop desktop apps with frontend technology: with the frontend tech stack you can build desktop applications. The local blog editor is exactly this kind of thing. But it has drawbacks too.
It's generally quite memory-hungry.
The bundle size is usually on the large side.
Performance is usually not as light as native desktop applications.

7.KaTeX
LaTeX is a system that uses code to write document typesetting and math formulas. Its main use is writing math formulas, especially complex ones like fractions, subscripts and superscripts, calculus, and so on.
KaTeX is an open-source frontend library, used to render, on a webpage, math formulas written in LaTeX syntax, like:

$\int_0^1 x^2 dx$
