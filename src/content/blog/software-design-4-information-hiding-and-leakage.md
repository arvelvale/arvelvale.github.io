---
title: 'Software Design (4): Information Hiding and Leakage'
description: 'The number one technique behind deep modules: every module keeps its design decisions to itself. Turn it around, and once the same decision is scattered across several modules, changing it once means changing a whole circle of code. That is information leakage.'
pubDate: '2026-07-30'
updatedDate: '2026-07-31'
category: Architecture
tags:
  - Design
  - Architecture
series: Software Design
seriesOrder: 4
lang: en
originalLang: zh
translationSlug: '软件设计-四-信息隐藏与泄露.md'
---
> 中文版：[软件设计（四）：接口中的信息隐藏与泄露](/zh/blog/软件设计-四-信息隐藏与泄露.md/)

## 1. Information Hiding: Each Module Should Keep Its Decisions Hidden Inside

Every module encapsulates a few pieces of knowledge. Each piece of knowledge represents a design decision, and that knowledge is embedded in the module's implementation but never appears in its interface, so other modules simply cannot see it.

Note that what is hidden here is not code, but design decisions. So what is a design decision?

A design decision is the final call you make among several viable options when implementing some feature: an array or a hash table for the user list, an array of lines or a piece table for text, LRU or LFU for the cache, and so on.

Decisions will change, but the change gets locked inside a single module. That is the whole point of information hiding.

### 1.1 Why Does Hiding Decisions Reduce Complexity?

1. The interface gets simpler -> cognitive load drops

The interface only presents an abstract view of what the module does, details are wiped out, and there is less stuff you have to cram into your head.

2. The system stays evolvable -> changes get confined

Hidden information has no dependencies outside the module, so any design change related to that information affects only this one module.

When designing a new module, keep asking yourself one question: what else can this module hide? The more it hides, the simpler the interface, and the deeper the module.

### 1.2 private Is Not Information Hiding

Declaring variables and methods private only stops them from being accessed directly from outside the class. But if the class is stuffed with getters and setters, the nature and usage of those private variables leak out through the public methods all the same, which is no different from public. What information hiding hides is the knowledge of *why it was designed this way*, not an access-modifier keyword.

## 2. Information Leakage: One Decision, Many Homes

The opposite of information hiding is information leakage: a single design decision gets reflected across multiple modules, creating dependencies between them. Change that decision, and every module involved has to change with it.

Leakage has two channels.

Channel A: leakage through the interface (the overt side)

Once a piece of information enters a module's interface, it has leaked. So "a simple interface" and "good information hiding" are two sides of the same coin.

Channel B: back-door leakage (the covert side)

The interface looks clean, but the knowledge behind several interfaces is nonetheless shared.

For example, two classes both know a certain data type: one performs a read on a file, the other performs a write. The moment the file type changes, both classes have to change.

If you spot a leak, there are two concrete routes out:

1. Merge

If the affected classes are all fairly small and are tightly bound to the leaked knowledge, you can merge them into a single class, folding the shared knowledge into one place.

2. Extract

Pull that knowledge out and encapsulate it as a class of its own, but there is a hard requirement: **the new class must have a simple interface that abstracts away the details**. If the new class's interface transpires most of that knowledge again, you have merely traded back-door leakage for interface leakage — a different way of leaking, nothing more.

## 3. The Most Common Root Cause: Temporal Decomposition (Slicing Modules by What Comes First)

Take an example. In file operations, if you decompose by temporal order you get three operations: read the file, modify the file, write the file. Both the read step and the modify step define the file type, so if the file type changes, both the read and the write have to change together — in which case you might as well merge them into a single module. Very often, when designing modules, what we need to think about is not the order in which tasks happen, but what knowledge each task contains.

![](/uploads/1785401440486-jeej9k.webp)

### 3.1 Case Study: The HTTP Server Student Project: A "Class Explosion"

![](/uploads/1785404127475-rmav4a.webp)

```mindmap
Central topic
```
