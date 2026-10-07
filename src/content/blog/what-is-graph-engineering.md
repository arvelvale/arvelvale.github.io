---
title: What Is Graph Engineering?
description: Another newly coined term, right after loop engineering
pubDate: '2026-07-28'
updatedDate: '2026-07-29'
category: AI
tags:
  - AI
  - Knowledge Graph
lang: en
originalLang: zh
translationSlug: '什么是graph-engineering.md'
---

> 中文版：[什么是graph engineering？](/zh/blog/什么是graph-engineering.md/)

## 1. What Is Graph Engineering

Definition: graph engineering takes a bunch of AI steps that each mind their own business (nodes) and strings them together with explicit hand-off rules (edges), letting one shared record (state) flow through them. It's closer to managing an organization than forcing a single agent to loop its way through every task.

Every so often, AI engineering expands outward another level: from the earliest days of figuring out how to write the prompt for a single conversation with an AI, to designing the AI's context environment (system prompts, documents, and memory included), and now to designing how multiple agents should collaborate with each other.

<p>&nbsp;</p>

![](/uploads/1785225206983-60qxxu.webp)

Honestly, I'd say graph engineering is a bit like workflow, or like multi-agent, but also not quite the same thing. Graph engineering is more of a design approach, while multi-agent and workflows are the concrete embodiments of the graph.

Workflow: every edge and every node is fixed. The control flow is nailed in place, as if you're on a fixed track with no way to jump off.

Multi-agent: communication and interaction between multiple agents with roles, where both delegation and control flow are left to each agent to decide for itself.

Graph engineering, on the other hand, cares about the graph itself: how tasks get split into nodes, how dependency edges should be wired, how the shared state's fields are defined, where to insert verification nodes, which checkpoint to recover from when something fails, and which edges can fan out in parallel.

Note:

1. Control flow: control flow is about the order instructions follow when a program executes. There are surprisingly few ways to build it — really just a handful — and it's the same for every programming language.

Branching, looping, jumping, and exceptions. Structured programming theory has already proven that sequence + branch + loop alone can express any computable logic.

1. Fan-out: one node/source branches out into multiple successors. Kind of like a fan spreading open from a single point.

## 2. The Old Way

Before, an AI agent was basically = LLM + while loop + a few tools.

<p>&nbsp;</p>

![](/uploads/1785227641909-j45tr9.webp)

That way, even with 10 tasks, or 100 tasks, they still had to be done one at a time, with no parallel fan-out.

It has five downsides:

1. Can only do one thing at a time: things like writing code or doing research, which could be done in parallel, still just get queued up by the loop.

2. Memory = chat history: how much memory you have depends on how much context you have.

3. Failure = start over: after step 40 fails, the first 39 steps are wasted.

4. No pause button:

5. No division of labor: there is only ever one process. One.

## 3. How Graph Engineering Answers This

What graph engineering does is stop letting one AI run the entire process, and instead draw the process out as a graph. Graph engineering includes loops too; it just turns the loop into the form of a graph and hands the tasks out to the nodes in it. A graph has only three components.

1. Nodes (the ones doing the work): a node is the smallest unit of work. An AI, an ordinary function, a step carried out by a human — any of them can be a node. Good nodes generally do only one thing, can be tested on their own, and can be swapped out on their own when they break.

2. Edges (the ones making decisions): an edge equals a hand-off. Some edges are hard-coded rules; others let the model decide.

3. State (the flowing file): state = a folder of files that travels along with the process, saved once every time you cross an edge. It's essentially the information nodes pass to each other.

![](/uploads/1785288626431-5tjh0l.webp)

Loop engineering manages a single context window; graph engineering manages how multiple context windows communicate with each other — how to make hundreds of model calls feel more like one system.

## 4. Fan-out and Fan-in

If a single agent just runs a loop, there's no way to split one thing into several things and do them in parallel (fan-out), and then gather the results back together (fan-in).

![](/uploads/1785288878206-222ihh.webp)

This is a bit like the structure of a company: instead of one person running the entire process, specialists do specialist work, and then the results get reported up layer by layer.

## 5. When Do You Need a Graph

For most tasks, a loop with well-designed boundaries and acceptance criteria is enough.

| Which signal to look at | A loop is enough | Time to consider a graph |
| --- | --- | --- |
| **Task shape** | One thing, with a clear finish line | **Naturally splits into several different "job types" that have to hand off to each other** |
| **Parallelism needs** | The steps have to happen one after another anyway | **You need to run several paths at the same time, then merge them** |
| **Tools per step** | The same toolset is used the whole way through | **Different steps need different models or toolsets** |
| **When something goes wrong** | Just retry the failed step | **You want one node going down to not contaminate the other nodes** |
| **Who does acceptance** | The AI checks its own output | **You need an independent "review node" to check other people's work** |

## 6. Anchors: Don't Let the System Fool Itself

When a code-writing agent reviews its own code, the result usually comes back all green. Try to avoid grading yourself, and avoid single-metric grading too.

Goodhart's Law: "Once a measure becomes a target, it ceases to be a good measure."

Take a recent example: a model OpenAI tested not long ago broke out of its sandbox to get a higher score, and hacked into Hugging Face to look for the answers. It was basically a textbook-level flare-up of this law.

Or: grade programmers by lines of code and you get bloated code; grade testers by bug count and you get nobody reporting bugs; grade researchers by paper count and you get padding; grade products by DAU and you get designs that get users hooked instead of benefiting them.

Graph engineering's answer is to change the structure:

1. Metrics can't travel alone: every optimization metric (close rate, speed) needs to be paired with a counter-metric (renewal rate, error rate).

2. Goals need an owner: a thermostat can't change its own set temperature. Fast loops aren't allowed to quietly modify their own KPIs; changing the goals themselves is the job of a slower, higher-level loop.

3. Separate the fast and slow layers: the loops that tune by the day, operate by the week, and set strategy by the quarter must be kept apart. The fast loop needs to report upward; it can't make decisions by jumping over the slow loops.

4. Deliberately freeze some nodes: the held-out test set, the safety red lines, the real data — these can only ever be read, never modified, nailing the whole graph in place.

## 7. Is Graph Engineering Just Hype?

##### **Where the Critics Are Right**

- Directed graphs and state machines are decades-old computer science, not a new invention.
- Frameworks like LangGraph, AutoGen, and Google ADK were already doing this a long time ago — "congratulations on reinventing LangGraph."
- The term "graph engineering" itself could easily not exist at all. The mechanism is not the goal.

##### **But the Upgrade Is Real**

- Teams really are moving from "one AI running a loop" to "multiple specialized nodes + shared state."
- Picking nodes, defining edges, designing state — this really is a different craft from "designing a single loop."
- A 2026 survey showed that of 70 open-source agent projects, 60% are still running bare loops, while industry frameworks have fully moved to graphs.

The name can be dropped, but the upgrade is real. And — for most tasks, one loop is enough. Don't treat a new term as a reason to jump in right away.

## 8. Summary

In the past, one agent ran the whole thing in a loop. Now a task gets split up and handed to multiple sub-nodes, connected to each other through edges (hard-coded rules or an agent's own judgment), with state flowing through the edges. The loop hasn't disappeared — it's still the four steps of think, do, observe, check — but the unit of execution has changed from one agent to one graph.
