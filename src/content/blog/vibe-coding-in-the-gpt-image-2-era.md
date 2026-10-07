---
title: A New Vibe Coding Workflow in the GPT-Image 2 Era
description: Recently, while using Codex, I found that image-2 + GPT 5.5 can really save you a ton of work on the frontend.
pubDate: '2026-04-26'
updatedDate: '2026-04-26'
category: AI
tags:
  - AI
  - vibe coding
lang: en
originalLang: zh
translationSlug: 'gpt-image2时代的新vibe-coding方式.md'
---

> 中文版：[GPT-Image 2 时代的新 Vibe Coding 方式](/zh/blog/gpt-image2时代的新vibe-coding方式.md/)

I've been vibe coding a project lately. The frontend was pretty ugly at first — my blog too, actually. It's not that I don't know what looks good and what doesn't, but fixing things bit by bit is still kind of hard. Luckily, OpenAI just released Image-2, along with GPT 5.5. Though other models work fine too — so far, 5.5 gets you maybe seventy to eighty percent of the way there.

## 1. If It's a Brand-New Project

Here's the approach: first give your vibe coding tool a description of the project, then have the AI list out all the pages, and write a description document for each page's features, and drop those in a folder (call it ui-pages or whatever you like).

![](/uploads/1777165221116-37xqay.webp)

Then take each page's description document and paste it into Codex, or the official GPT site, to generate a reference image.

![](/uploads/1777165381305-dohtxe.webp)

The image above is what image-2 generated. As you can see, it's still really beautiful.

After that, whenever you need to actually build the page, you can just throw the reference image over to Codex, or Claude Code, or whatever else.

What if you're still not happy with what it generates?

First, you can describe the parts you're unhappy with. Second, there's a little trick: you can have image-2 put several different options into a single image, and then pick the version you like best.

![](/uploads/1777168116081-hzws1k.webp)

Then you can have GPT generate a separate, standalone interface for the page you liked.

## 2. Projects Where the UI Is Already Mostly Done

For this kind of project, if you're not happy with the frontend, you can just screenshot the current result and send it to the official GPT site or to Codex. But I'd still recommend Codex — if you use the GPT site, the page it generates might have some buttons for features that don't exist in the current project at all.

![](/uploads/1777167978949-rftzg7.webp)

Once the image is generated, just throw it at GPT 5.5, or Claude, or GLM, and get to work.
