---
title: 'Software Design (2): Complexity'
description: ''
pubDate: '2026-07-29'
updatedDate: '2026-08-19'
category: Architecture
tags:
  - Design
  - Architecture
series: Software Design
seriesOrder: 2
lang: en
originalLang: zh
translationSlug: '软件设计-二-复杂性.md'
---
> 中文版：[软件设计（二）：复杂性](/zh/blog/软件设计-二-复杂性.md/)

## 1. The War Between the Human Brain and Complexity

The only constraint on writing software is our ability to understand the systems we build. The bigger the system, the higher the complexity, until nobody can touch it anymore. When you're programming with AI, for instance, it tends to spit out a pile of code and tack on a bunch of features, but the moment you try to change something you find the complexity has exploded. You may even go through several rounds of refactoring.

What complexity is: complexity is anything in the structure of software that makes it hard to understand and hard to modify, accumulated bit by bit by two poisons: dependency and obscurity.

With every feature you add, the subtle dependencies between components grow a little denser, until nobody can hold all the relevant factors in their head at once. That's when you get: development slows down, bugs go up, development slows down even more. This is inevitable in the lifecycle of any program; the only question is how fast.

There are generally two paths to fighting complexity:

1. Eliminate it: make the code simpler and more obvious, kill off special cases, unify naming and conventions, define errors out of existence. Suited to places where complexity hasn't taken root yet.

2. Encapsulate it: modularize, so a person faces only one small piece at a time.

<p>&nbsp;</p>

The waterfall model: the first formally proposed development process model in the history of software engineering. Its name matches its shape: requirements analysis -> design -> implementation -> testing -> maintenance, each phase cascading downward like a waterfall. A phase has to be completely finished before the next is allowed to start, and in principle you don't go back.

Of course, the waterfall model rests on three assumptions:

First layer: requirements can be known completely and correctly before work begins.

Second layer: design can be done right in one shot, divorced from implementation.

Third layer: the cost of going back can be ignored, or you simply never need to go back.

The waterfall model almost never works for software. Users usually only figure out what they don't want after seeing something they don't want. Requirements are half-baked at every moment right up to delivery, and nobody can prophesy all the consequences of a design before starting work. As a result, the only thing left is to patch things up afterward, and complexity explodes.

Incremental development: rather than building the whole system in one shot, cut the system into small, complete, deliverable feature increments, one at a time. With each one you finish, the system grows a ring larger, and every ring is actually runnable.

Note: increment ≠ iteration. Iteration is like sketching a rough draft of the whole painting, then deepening, correcting, and refining it pass after pass; every stroke covers the entire canvas. Increment is dividing the canvas into regions, finishing the upper-left corner **completely** before moving on to the next one, each region done right in a single pass.

Incremental development is a fairly effective method, because software is soft enough: design problems exposed in each round can be fixed while the system is still small.

## 2. What Exactly Is Complexity?

The answer comes in three layers:

### 2.1. A Practical Definition

Complexity = anything related to the **structure** of a software system that makes it hard to understand and modify. Note "structure": an algorithm being intrinsically hard (say, a clever numerical algorithm) does not count as complexity in the sense this book uses it; a way of organizing code that people can't understand does. The judging criterion is extremely simple: **if changing it is a pain, that's complexity; if changing it goes smoothly, that's simplicity.**

### 2.2. A Formula You Can Actually Do the Math With

$C = \sum_{p} c_{p} \cdot t_{p}$

C = the overall complexity of the system that you, as a developer, actually bear

p = some part of the system (module / file / class)

c_p = the complexity of part p itself (how hard it is to understand)

t_p = the proportion of time a developer spends on that part (0 ≤ t_p ≤ 1, Σt_p = 1)

Take an example. Suppose the system has two chunks of code:

```
Module A: nasty and rigid, cA = 9, but you only touch it once a year, tA = 0.02  →  contributes 9 × 0.02 = 0.18
Module B: fairly clean, cB = 2, but you change it every day, tB = 0.50  →  contributes 2 × 0.50 = 1.00

// Refactoring A from 9 down to 3: total complexity drops by only 0.12
// Polishing B from 2 down to 1.5: total complexity drops by 0.25 — twice the payoff for your effort
```

Two conclusions follow from this formula:

①. Refactoring isn't about finding the worst spot, it's about worst × most-touched

②. Isolating complexity in a place nobody touches is the same as eliminating it

### 2.3. Complexity Is the Reader's Experience, Not the Author's

You write code you think is simple, other people find it complex — **then it is complex**; the reader has the final say. It's harsh but fair: code gets read far more often than it gets written. Your job is to write code that other people can also pick up easily.

## 3. Three Symptoms of Complexity Flaring Up

### 3.1 Change Amplification

A change that looks simple requires editing in a lot of places. Changing a background color means touching 1000 pages. The requirement itself didn't get any more complex; your structure copied one decision a thousand times.

### 3.2 Cognitive Load

How much knowledge a developer must load into their head before completing a task. Memory returned by a C function has to be freed by the caller — every person using it has to remember this rule, and forgetting it once is a memory leak.

### 3.3 Unknown Unknowns

You don't know what you need to know: what needs changing isn't obvious, what information is required isn't clear, you can't even tell whether there are landmines — not until you finish the change, ship it, and the bug blows up.

<p>&nbsp;</p>

![](/uploads/1785295135438-693x7b.webp)

Of these, unknown unknowns are the worst. The first two only require knowing where to change things, and you're done once the change is made. Unknown unknowns usually mean you can't confirm whether you've changed everything, unless you read every single line of the system.

The most important goal of good design: make the system obvious.

**Lines of code ≠ complexity**. Some frameworks let you write an app in three lines, but figuring out what those three lines ought to be takes two days of digging through docs. Fewer lines, cognitive load exploded. The other way around: writing a few more straightforward lines of code to bring cognitive load down is often the real "simplicity". From now on, when you see someone using "my solution only needs N lines" as a selling point, remember to ask one more question: to come up with those N lines, how much do you need to know first?

## 4. The Causes of Complexity

There are only two causes of complexity:

1. Dependency

2. Obscurity

### 4.1 Toxin A: Dependency (can't be understood or modified on its own)

One piece of code has a connection to another; when you change it, you have to consider / modify the other one along with it. Change a method signature, and every call site has to change with it.

Note: dependency cannot be eliminated. Every time you write a class, you are actively introducing dependencies around its API. The goal of design is: fewer dependencies, and make the remaining ones simpler and explicit.

### 4.2 Toxin B: Obscurity (important information isn't obvious)

A variable named time (seconds or milliseconds?), and after adding a new error code you also have to add a row to some message table — but the existence of that table is something a person reading the code simply doesn't know about. Inconsistency is obscurity's number one accomplice: the same name doing two different things, and the reader can never guess which one it is this time. Insufficient documentation causes obscurity too, but needing a mountain of docs is itself a red flag that the design is problematic — the real cure is to simplify the design.

<p>&nbsp;</p>

![](/uploads/1785295938067-cp2gk1.webp)

<p>&nbsp;</p>

**Complexity = hard to understand + hard to modify; there are only two causes, dependency and obscurity; and it builds up through every single "whatever" of yours.**
