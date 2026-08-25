---
title: Why the cost for AI is more than before
description: ''
pubDate: '2026-08-25'
category: 思考
tags: []
updatedDate: '2026-08-25'
---
Recently, two small changes caught my attention.Deepseek improve it's API price, and codex 5-hour limit is coming back after remporarily lifting it, Neither change is dramatic on its own, but together they made me think: is the era of extremely cheap frontier intelligence beginning to end?

The history always repeating itself, similar things have happened before, In 2019, Uber write this logic very clearly, It described it explicitly on its 2019 S-1. In early stage, can give subsidy to driver and passenger at the same time, make driver and passenger become more and more, then will cause liquidity network effect -- The more people take part in exchange, exchange happen will be more easily, and will attract more people take part in.

Today's LLM model is in the earily to middle stage of Uber, still subsidy stage, but the price has been higher, so the usage of AI plan seem to become less maybe true, Upsell user's to more expensive plan, It would not surprise me if we can see $500,$1000 AI plan in the future, even I'm unhappy to see it happen. AI may be following a similar subsidy trajectory, this is the first demension.

Second demension is our comsume of token is become more than before. In the past, we only chat ai on the website, then we have claude code, but only some solo developer and engineering use. For me, the real turning point is the release of openclaw, from student to old man all start to use this kind of agent, make the requirement of token much more than before. Even now Virually nobody talk about openclaw, but I think it open a new history stage of AI, make more people into agent era.

Third demension is the lack of compute resource, Token demand can grow exponentially, but the Inference capacity can not, it has becoming another constraint on cheap AI. First evidence is DeepSeek's peak price, at 09:00-12:00 and 14:00-18:00 Beijing Time, it's price will be double as usual, if Deepseek only think it's cost is to high, it can compeletly make all day's price become higher, but the actual situation is more likely demand shaping:using price to move flexible workloads away from periods when inference capacity is scarce.

OpenCode's public statistics illustrate how quickly demand can change. Its daily token volume rose from roughly 3 trillion tokens at the end of June to 22 trillion on August 14. Not all of those tokens represent fresh computation because agent workloads have extremely high cache-hit rates, but the growth still shows how quickly agentic workloads can put pressure on inference infrastructure.

<p>&nbsp;</p>
