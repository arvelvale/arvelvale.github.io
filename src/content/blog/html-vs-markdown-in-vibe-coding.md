---
title: Pros and Cons of Using HTML in Vibe Coding
description: What I learned from Anthropic engineer Thariq on expressive AI output.
pubDate: '2026-05-10'
category: AI
tags:
  - AI
  - vibe coding
updatedDate: '2026-05-11'
lang: en
translationSlug: 在vibe-coding中使用html的利与弊.md
originalLang: zh
---

> 中文版：[在vibe-coding中使用html的利与弊](/zh/blog/在vibe-coding中使用html的利与弊.md/)

In vibe coding, AI loves to output long, smelly Markdown documents — plans, summaries, PR descriptions, execution reports. Markdown is indeed concise, token-efficient, and version-control friendly. But its problem is this: it's better at generating text than at helping humans review complex decisions.

When agents start taking on harder engineering tasks, what we need is not longer Markdown, but higher information density — output interfaces that are more visual and easier for humans to participate in and control. HTML artifacts happen to offer exactly that.

> Markdown is hard for humans to actually sit down and read. And AI is not human.

## 1. Why HTML expresses information better

HTML usually conveys richer information than Markdown. Sure, AI is now strong enough to draw flowcharts with ASCII characters — but that's like putting an extra constraint on the AI, while HTML gives it much more freedom to express things to humans.

1. Tables: HTML can render beautiful tables. Markdown can technically do tables too, but they're painful to maintain.
2. Flowcharts — this one needs no explanation.
3. You can adjust parameters on the interface in real time and generate prompts from them. There's a story in Steve Jobs' biography about an engineer who wrote a parameter-tuning program so Jobs could tweak things to exactly the style he liked.
4. Compared with Markdown, HTML is simply easier for people to actually read.

## 2. Downsides of expressing things in HTML

Richer, more readable — but there are a few catches:

1. Generating HTML is slower than Markdown. Anthropic engineer Thariq says it's roughly 3–4x slower.
2. It also costs more tokens than Markdown.
