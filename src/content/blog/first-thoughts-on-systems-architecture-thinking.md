---
title: A First Take on Systems Architecture Thinking
description: In the era of AI programming, what matters most is not the implementation of some concrete functional module, or even the tech stack or a particular technology, but the more abstract architectural thinking.
pubDate: '2026-05-11'
updatedDate: '2026-05-20'
category: Thinking
tags:
  - Thinking
  - Architecture
lang: en
originalLang: zh
translationSlug: '对系统架构思维的初步理解.md'
---

> 中文版：[对系统架构思维的初步理解](/zh/blog/对系统架构思维的初步理解.md/)

I've been feeling lately that systems architecture thinking matters more and more. As AI keeps developing, the difficulty of building an app has really dropped through the floor — these days basically anyone with Claude Opus 4.7 or GPT-5.5 can build something that used to require a full-stack developer.

<p>&nbsp;</p>

But there's a very critical point here:

AI has, to some extent, only made it easier to implement features. AI is very good at local, isolated features — a login function, for example.
But AI has only made features cheap. If a product is really going to hold together, you need architecture.

<p>&nbsp;</p>

An app is usually a collection of many features, and those features have all sorts of relationships between them, with a lot of flows crisscrossing each other on top of that. If you just let AI build features one by one, it's very easy for one mistake to take down a whole batch, and what you end up writing tends to have quite a few problems, like:

```
1. Everyone writes their own way
2. Data models are inconsistent front to back
3. Something that could have been wrapped into a single function gets rewritten several times
4. Permission boundaries are blurry
5. One change breaks a whole batch
```

Some people will say that modular programming reduces a lot of these problems — which, honestly, is what I used to think too. But modularity, to some degree, only pulls things apart at the code level. It's still the concrete, lower-level code layer.

> Modularity without architectural constraints just splits the mess apart. Seen locally it may not look so messy, but it cannot change the mess as a whole.

<p>&nbsp;</p>

So here's the question: how do you get AI to write programs that actually match the real business? You need architectural constraints. If Go, Tauri, Rust, PostgreSQL, and the ACP protocol count as technologies and tech stacks, then technologies and tech stacks belong to that concrete category of things that are relatively easy to get a handle on — and the same goes for any specific feature. Architecture, on the other hand, belongs to the abstract kind. It requires abstracting a business into systems, plus some core objects. It's a fairly abstract thing. But we need to use abstract architecture to constrain the concrete technology.

<p>&nbsp;</p>

AI is good at implementing local features, but a real application is not a stack of features. It is a system made up of objects, flows, states, rules, data, and feedback mechanisms. The biggest value of architecture in this era is using business structure to constrain AI's local implementations, so that every feature grows in the right place.

## I. What Is Architecture

By definition, architecture is the set of key decisions made — in the face of complex requirements — about system boundaries; module relationships; data flow; control flow; constraints; and evolution paths. Honestly, when I first read this definition I was a bit lost. What is a system boundary? Control flow? Evolution path?

But later I realized you don't need to overthink these terms. Just grab one core idea first:

> Architecture is not about first asking how to write a particular feature. It's about first asking how this system can hold together.

First get clear on what questions architecture is supposed to answer:

1. What this system is responsible for, and what it is not responsible for
2. What core objects exist inside this system
3. What relationships exist between those objects
4. Where data comes from and where it goes
5. Who does the scheduling, and who decides the next step
6. Which rules must not be broken
7. When the system grows more complex in the future, which directions it should expand in

These questions sound abstract, but they determine what a system will grow into, and whether it can have a life of its own.

But from a fundamental angle — or rather, from the purpose of architecture design — there are two kinds here: system architecture and product architecture. Product architecture leans more toward the user's perspective; system architecture leans more toward functionality.

### 1.1 Product Architecture

Product architecture is concerned with how a product's capabilities are organized, how the product's value comes to hold, and how the user path forms a closed loop.

For example, in a learning product: can the user get from "I have no idea what to study" to "knowing the goal, getting a path, practicing continuously, getting feedback, reviewing to consolidate"

### 1.2 System Architecture

System architecture leans more toward engineering and business implementation. It is concerned with how, in order to support those product capabilities, the system's internals divide the work, collaborate, set constraints, and evolve.

For instance: how do the learner profile module, the knowledge point module, the recommendation module, the assessment module, and the review module communicate with each other? Who owns the data? Who changes the state? Which behaviors must be recorded?

And system architecture usually has several possible solutions. Being able to explain why plan A is better than plan B is also a very important ability, and it usually requires some deeper understanding.

## II. Architecture Should Come From Requirements

Deriving a system's architecture from requirements is a fairly important ability. When I used to do development, I was mostly piling up modules. For example, if the user's requirement was to build an AI study assistant, I might pile on AI Q&A, smart path planning, PDF upload and parsing, a mistake notebook, daily check-ins, a points system, a points store, a community system... But it's very easy to end up with no stable structure or relationships between these features, and in the end it turns into a big stew where every module does its own thing.

But with architectural thinking, you usually wouldn't start by considering whether the backend uses Java or Go, PostgreSQL or MySQL, Qdrant or ChromaDB. You'd start by analyzing what the user's requirement actually is.

> What problem does the user actually want to solve?

For example, say the requirement is "I want to learn better." That example is probably pretty broad — you could even say it's a terrible prompt. But you can try guessing what the user's real pain points are from it:

```
1. Not knowing what they should be studying
2. Not knowing what kind of learning method suits them
3. No feedback after studying, or rather a lack of positive feedback
4. Learning a bit today, forgetting a bit tomorrow, never internalizing it into something of their own
5. Not knowing which courses, articles, or materials suit them
```

So what the user wants is not a bot with a community, a points system, and AI Q&A

What they want is a personal operating system that genuinely helps them solve the lack of positive feedback, plan a learning path, recommend learning resources, review and consolidate, and personalize the whole thing.

At this point the core of the system is no longer a simple chat box, but a learning loop

```
Diagnose
  ↓
Plan
  ↓
Study
  ↓
Practice
  ↓
Assess
  ↓
Feedback
  ↓
Review
  ↓
Adjust the path
```

From there you can go on to derive what capabilities the system should have

```
1. Personal profile mapping capability
2. Forgetting curve management capability
3. Feedback adjustment capability
4. Resource recommendation capability
5. Review and consolidation capability
...
```

So features are not piled up out of thin air. They grow out of the business loop.

## III. What Is Systems Thinking?

> When developing a product, we can view a business scenario as a system: not merely a simple collection of features, but a whole — within a certain boundary, composed jointly of multiple objects, relationships, rules, flows, and feedback mechanisms — used to accomplish some goal.

Systems thinking amounts to a holistic method. Instead of breaking the business into many features, you identify the core objects, relationships, events, states, and rules in a business scenario.

For example:

1. Which objects in this scene persist over the long term
2. What relationships exist between the objects
3. How things flow
4. How states change
5. Which rules must not be broken
6. How the system should handle exceptional situations

Or, as I see it, this method is a bit like first principles: you first break the thing down into its basic main constituent parts. But systems thinking is not only about decomposition. It places more emphasis on how objects connect, how events flow, how states change, and what emerges when these things combine.

For example, take a delivery platform. If you only look at features, you'd see:

```
Search for a shop
Browse dishes
Add to cart
Place an order
Pay
Delivery
Leave a review
```

But by using systems thinking, we can look beyond the features and see the deeper relationships between objects.

In holism there's an idea that the whole is greater than the sum of its parts. And that portion by which the whole exceeds the sum of its parts is called emergence.

How to understand this? A single neuron on its own has no consciousness, but tens of billions of neurons combined together can form consciousness. So when does emergence appear? When the constituent parts are numerous enough, and the connections between them are numerous enough too.

By using systems thinking to try to see the connections between the constituent parts of this delivery form, we can see the following content.

```
The user creates an order
The order contains dishes
The order binds to a shop
The order triggers payment
The order enters delivery
Delivery assigns a rider
Once the order completes, a review is produced
In exceptional cases the order may be refunded, cancelled, time out, or complained about
```

So we can arrive at a list of the core objects of the delivery system:

- User
- Shop
- Dishes
- Order
- Payment
- Rider
- Review
- Refund
- Complaint

Among them, you can judge that the most critical one is actually the order, because the order connects the user, the shop, the dishes, payment, delivery, and reviews.

Feature thinking sees:

> I'm going to build an order-placing feature

Systems thinking sees:

> The order is the core object connecting the user, the shop, payment, delivery, and reviews. The order-placing feature is only one stage in its lifecycle

Of course it's not only objects — there are events too.

And this is where we can connect to DDD, that is, Domain-Driven Design.

## IV. DDD (Domain-Driven Design)

The core of DDD is not some framework, nor some fixed code structure. It is making the software system stay as close to the business itself as possible. It requires us not to start off thinking about database tables, APIs, pages, and tech stacks, but to first establish a set of business language.

Literally speaking, domain-driven design requires you to understand the business of the domain your product touches well enough, and to drive the product's design from that domain's business.

The first step in domain-driven design is generally to list out the roles, objects, and events. And this process of listing out the events is also called event storming.

Some people might be puzzled: isn't event storming just listing out the events one by one?

More precisely, DDD is not simply listing roles, objects, and events. It is using business language to build a domain model. Event storming is a commonly used modeling method in DDD: by sorting out what events happen, it helps us discover business objects, state changes, rules, commands, and boundaries.

For example, in a delivery system, we should not start by saying:

```
order_table
payment_service
delivery_controller
```

These are the technical things. We should first say:

```
The user creates an order.
The order contains dishes.
The order needs payment.
After payment succeeds, the order enters awaiting-delivery.
The delivery system assigns a rider.
After the rider accepts the order, delivery begins.
Once the order is delivered, it enters a completed state.
After the order completes, the user can leave a review.
In exceptional cases the order can be cancelled, refunded, or complained about.
```

These sentences look pretty ordinary, but they already describe the skeleton of the system.

Among them there are:

- Roles: user, shop, rider, platform administrator.
- Objects: order, dishes, payment, delivery, review, refund, complaint.
- Commands: create order, pay for order, cancel order, request refund, assign rider, submit review.
- Events: order created, payment completed, rider accepted order, order delivered, refund initiated.
- States: awaiting payment, awaiting delivery, in delivery, completed, cancelled, refunding, refunded.
- Rules: an unpaid order cannot be delivered, a completed order cannot be cancelled at will, a refund must meet certain conditions.
- Boundaries: the payment system should not directly modify reviews, and the review system should not directly modify delivery status.

This is where DDD is especially important for AI programming.

AI can very easily write a feature that "works," but it doesn't necessarily know where that feature sits in the business world.

If you only say to the AI:

> Help me write an order API.

It will very likely directly generate a set of CRUD: create order, delete order, update order, query order.

But a real business order is not an ordinary data table. An order has a lifecycle, state transitions, permission limits, exception handling, and relationships with payment, delivery, reviews, and refunds.

So a better way to prompt it is:

```
The order is the core aggregate of the delivery system. It has states such as created, paid, cancelled, delivered, completed, and refunded. Order state can only be changed through explicit business commands and business events. The payment system can only trigger a payment success event, the delivery system can only trigger a delivery status event, and the review system can only create a review after the order completes. No module may bypass the order lifecycle and directly modify order state.
```

The value of DDD is not making the code more complex. It is giving the system a stable business skeleton.
