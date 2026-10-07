---
title: 'Software Design (3): Module Design'
description: 'Strategic programming requires being willing to invest in good design; here is one direction for that investment: how to slice modules, how to tighten interfaces, and the standard for judging whether a module is deep.'
pubDate: '2026-07-29'
updatedDate: '2026-08-19'
category: Architecture
tags:
  - Design
  - Architecture
series: Software Design
seriesOrder: 3
lang: en
originalLang: zh
translationSlug: '软件设计-三-模块设计.md'
---
> 中文版：[软件设计（三）：模块设计](/zh/blog/软件设计-三-模块设计.md/)

> A module's cost is its interface, and its benefit is its functionality. In a good module, powerful functionality often hides behind a small interface. The narrower the interface, the less complexity the whole system has to carry.

## 1. Motivation

Slicing up modules is how you manage complexity. As covered in the first article of the series, total complexity is C = $\sum_{p} c_{p} \cdot t_{p}$, and modularization is the only technique that can turn big chunks of c into small t, letting each developer face only a small slice of the overall complexity at any given moment.

The ideal: every module is completely independent, and working inside one module requires knowing nothing about any other module. At that point the complexity of the whole system is equivalent to the complexity of the worst module. But that's unreachable in reality. Modules must call each other, and calling creates dependencies: change a method signature and every call site has to change with it.

So we get the goal of modular design: reduce dependencies between modules to a minimum.

To manage dependencies, you need to think of every module as two halves:

1. Interface: everything other developers must know in order to use you. It describes what the module does, not how.
2. Implementation: the code that delivers on the interface. Changing the implementation is invisible to other modules as long as the interface is untouched.

> Take an example. Suppose you wrote a balanced-tree module: inside it is complicated rotation, splitting, and rebalancing logic, but the user only sees three operations, insert / remove / fetch, and calling them just means handing over a key and a value. **How the tree stays balanced is not mentioned once in the interface** — that's what a good interface looks like. The corollary is equally direct: someone working inside a module must understand that module's interface plus implementation, plus the interfaces of the modules it calls; but **they should not need to understand the implementation of any other module**.

The word "module" covers a lot of ground: classes are modules, methods and functions are modules, subsystems and services are modules too.

## 2. Core Concepts

### 2.1 Interface

Whatever ends up in the interface is exactly what the abstraction leaks.

An interface is more than a method signature. It contains two kinds of information:

#### 1. The formal part (the compiler can check it)

Parameter names and types, return types, and exceptions thrown; all of a class's public method signatures and public variables. These are written explicitly in the code, and the language can check whether calls match.

The informal part (comments only)

2. High-level behavior and usage constraints

"This function will delete the file specified by the argument." "Method A must be called before method B." The language can neither understand nor enforce these. For most interfaces, the informal part is bigger and more complex than the formal part. The test is simple: any information you need in order to use the module is part of its interface.

### 2.2 Abstraction: a simplified view that leaves out unimportant details

Abstraction is inseparable from modularization.

In *A Philosophy of Software Design*, abstraction is defined this way: every module provides an abstraction through its interface; the interface is a simplified view of the functionality, and implementation details are unimportant to that abstraction, so they are left out.

But the key phrase here is "unimportant". The more unimportant details you leave out the better, but you can only leave out genuinely unimportant ones. There are two ways an abstraction can blow up, and both come down to the word "unimportant".

1. Failure mode 1: unimportant details get stuffed in

The abstraction becomes more complex than necessary, and the user's cognitive load rises for nothing. Every extra parameter or concept in the interface is a tax you have to memorize.

2. Failure mode 2: important details get left out

It looks simple, but it isn't actually usable. Someone reading only the interface can't get the information they need to use it correctly — **obscurity** is born here, and unknown unknowns follow.

Failure mode 2 has a textbook example: the file system. How a file is stored on disk is unimportant to users and can safely be omitted, but file systems buffer data in memory and delay writes to disk for performance, and for applications like databases that's a matter of life and death. Database-style applications must know when data is actually written to disk in order to guarantee that nothing is lost after a crash. So the rules for when to flush must appear in the file system's interface; otherwise it's a fake abstraction.

The entire craft of designing abstractions comes down to **figuring out what's important, then finding a way to make the important information as small as possible**.

Abstraction is not a programmer-exclusive skill. A microwave takes the complicated electronics of how AC power becomes microwaves and how the cavity heats food evenly, and simplifies it down to a few knobs for the user. That's abstraction too.

## 3. Deep Modules vs. Shallow Modules: A Cost-Benefit Ledger

The best modules tend to be the ones with powerful functionality and simple interfaces. A module's benefit is its functionality, and its interface is the cost.

![](/uploads/1785393786859-44xuaj.webp)

Why the interface is the cost:

The interface represents the complexity the module imposes on the rest of the system. The smaller and simpler the interface, the less complexity it introduces. And there is a lot inside the interface that can be changed without affecting anyone: if changes don't amplify, that's the most valuable design there is. So interfaces are a good thing, but more or bigger interfaces are not better.

### 3.1 The Flagship Deep Module: Unix File I/O

The file I/O of Unix and its descendants (such as Linux) is the most beautiful deep interface in computer science. There are only five basic calls, and all their signatures are simple.

```
int     open  (const char* path, int flags, mode_t permissions);
ssize_t read  (int fd, void* buffer, size_t count);
ssize_t write (int fd, const void* buffer, size_t count);
off_t   lseek (int fd, off_t offset, int referencePosition);
int     close (int fd);
// open returns an integer file descriptor fd; all subsequent operations use it to refer to the file
// sequential reads and writes by default (the most common case); for random access, move the position with lseek
```

The problems these five functions solve include: how files should be laid out on disk for efficient access, how directories and hierarchical paths are resolved, how permissions are restricted, how responsibility and communication are split between interrupt handling and background code, and the scheduling strategy for concurrent access to multiple files.... All of it is invisible to the caller. Even more striking: the implementation of Unix I/O has been completely rewritten several times over the years, and these five kernel calls have never changed. A narrow interface buys the freedom to completely rebuild the implementation — that's what depth buys you.

### 3.2 Shallow Modules

A shallow module's interface complexity is too high relative to the functionality it provides. It doesn't just fail to manage complexity; it adds to it.

An extreme example:

```
private void addNullValueForAttribute(String attribute) {
    data.put(attribute, null);
}
// this method provides no abstraction at all: all of its functionality is sitting right on the interface
// a properly written document would be longer than the method body; typing the call costs more keyboard than writing data.put directly
```

What this method does, start to finish, is one line: put a null into a Map called `data`, keyed by `attribute`.

The implementation detail here is a single `data.put(attribute, null)`, while its interface (the name `addNullValueForAttribute` plus the parameter `attribute`) puts those details right back on the table, unchanged.

And the more serious problem is that the interface is even more verbose than the implementation. Writing it directly is `data.put(attribute, null)`; calling the wrapper is `addNullValueForAttribute(attribute)`. It doesn't even pay for itself in typing.

Linked-list classes are a common shallow module: inserting or deleting an element is a few lines of code, and the interface's complexity is almost equal to the implementation's.

### 3.2.1 Classitis (the cult of small classes)

What's popular in programming is that classes should be small rather than deep. Students are taught that the most important thing in class design is splitting big classes into small ones; methods are no different — any method longer than N lines should be split apart, and N can be as low as 10. The extreme form of this dogma is called **classitis**, and its root cause is a mistaken belief: *classes are good, so the more classes the better.* Want more functionality? Then make a few more classes.

The classes that classitis produces each look simple on their own but add up to a disaster. Small classes contribute little functionality, so you need a lot of them; each class comes with its own interface; these interfaces accumulate and create enormous complexity at the system level. This is exactly what death by a thousand cuts looks like.

The most visibly classitis-ridden example is the Java class library: to read a serialized object from a file, you have to create three different objects.

![](/uploads/1785396876802-lwfak7.webp)

![](/uploads/1785396983639-3db8nm.webp)

## 4. Summary

When designing an interface, first ask what the most common case is, then make that the default, the path of least effort.

```
The effective complexity of an interface ≈ Σi (complexity of feature i × probability that a developer needs to know it)

// Unix: lseek exists for random access, but people who only do sequential reads and writes don't need to know it → probability ≈ 0, contribution ≈ 0
// Java: the buffering feature is needed by everyone, yet it was made into "explicitly wrap it yourself" → probability ≈ 1, everyone pays
```

The interface is the cost, the implementation is the benefit; good modules are deep, and shallow modules might as well not exist; an interface must make common operations the simplest.

⚑

**Shallow modules**

The complexity of the interface is too high relative to the functionality it provides. Shallow modules are no help in the war on complexity: the benefit they offer (not having to understand the internals) is canceled out by the cost of learning and using their interfaces. Small modules easily become shallow — "small" is not a get-out-of-jail-free card.

⚑

**Documentation longer than the code**

If documenting a method or class properly means the documentation is longer than the code itself, that means the abstraction is hiding nothing at all, and the interface is as complex as the implementation. It is most likely a shallow module that should be merged or deleted.

⚑

**Treating "small" as the design goal**

"Classes should be small" and "split any method over N lines" — judging merit by line counts and class counts is the lesion of classitis. Before you split, ask first: is each half deeper or shallower? Two shallow modules don't buy you one deep module.
