---
title: 'Software Design (1): The Problem and the Mindset'
description: A comparison of tactical programming and strategic programming
pubDate: '2026-07-29'
updatedDate: '2026-07-29'
category: Architecture
tags:
  - Design
  - Architecture
series: Software Design
seriesOrder: 1
lang: en
originalLang: zh
translationSlug: '软件设计-一-问题与心态.md'
---
> 中文版：[软件设计（一）：问题与心态](/zh/blog/软件设计-一-问题与心态.md/)

This one mainly compares two programming mindsets:

```mindmap
Central topic
  Tactical programming
    Get it running ASAP
  Strategic programming
    Keep investing in good design
```

## 1. Tactical Programming

This is the mindset the vast majority of programmers are in when they write code. The goal is to get whatever is in front of you running as fast as possible, whether that's a new feature or a bug fix.

But complexity adds up bit by bit. What makes a system complex is never some one big accident; it's hundreds of little decisions piling up together. And complexity will push you toward slapping on a patch to get past it quickly, the patch then creates more complexity, more complexity then needs more patches, and it closes into a loop.

![](/uploads/1785306449597-vwkdy5.webp)

**1.1 The Profile (the Tactical Tornado)**

Almost every software organization has at least one person who takes tactical programming to the extreme. The book calls them a **tactical tornado**.

The tactical tornado has three traits:

①. Output

**Ships code far faster than everyone else**

When it comes to hacking together a feature that runs, nobody beats the tactical tornado. He's prolific (high-output), productive, always the first to hand in the exam, but the way he works is tactical through and through.

②. Treatment

**Treated as a hero by management**

What managers can see is how many features shipped this week; what they can't see is the dependencies and obscurity buried in the code. So the tornado gets the praise, the promotions, and the say.

③. The wake

**A field of rubble behind them**

The engineers who will have to work with his code rarely think of him as a hero. The typical plot: other people follow along cleaning up the mess, and these are the real heroes, yet they end up looking slower than the tornado.

## 2. Strategic Programming

The main goal is good design; being able to run is the bonus

The first step to becoming a good software designer is admitting that code that merely runs isn't enough. Introducing unnecessary complexity in order to deliver faster is unacceptable.

![](/uploads/1785307001121-dtthun.webp)

Strategic programming is an investment mindset. Instead of taking the shortest path to finish the current task, you deliberately spend time improving the system's design. The investments here split into proactive investment and reactive investment.

①. Proactive investment: don't go with the first design you think of

Spend a little more time on every new class: sketch two or three candidate designs first, then pick the cleanest one (a more straightforward interface, lower cognitive load for whoever reads it)

②. Proactive investment: rehearse future changes

Picture the several ways the system might have to change down the road, and confirm that under the current design they're easy to do

③. Proactive investment: write good docs

Leave behind why the design is the way it is

④. Reactive investment: when you spot a design problem, fix it

When you find a problem, don't ignore it, don't patch around it. Spend a little extra time to genuinely fix it.

Here's a code example. Say production reported a bug: some old order had its amount computed wrong.

![](/uploads/1785308430388-uoi3kf.webp)

`f (inv.id === 8841)` is **obscurity** nobody can read (why does this one order get 20 off? The next person to read the code has no way of knowing); discount rules scattered all over the place, on the other hand, are the seed of the next **change amplification**. The version on the right is only 15 minutes slower, yet it turns "which discounts are there" into a searchable, enumerable fact.

## 3. How Should You Invest

Big up-front investments and waterfall processes are both out. The ideal design is something that grows out bit by bit as your understanding of the system deepens; the right posture is to keep making many small investments continuously.

![](/uploads/1785308733267-60azsn.webp)

![](/uploads/1785308750309-4atua5.webp)

## 4. The Places Under the Most Pressure Are Exactly the Ones That Can't Afford to Lose

Early-stage startups usually spend no effort on design, and when problems come up they can't be bothered cleaning up. Their line is **once we make it, we'll have the money to hire people to clean it up.**

But there are two problems with that:

1. Once the code turns into spaghetti it's nearly impossible to fix, and you'll most likely pay high development costs for the entire lifecycle of the product

2. The payoff of good design actually comes fast

And there's a hidden third layer: bad code drives away the very people you need most, such as excellent engineers, who care about design extremely deeply
