import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    cover: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('未分类'),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    lang: z.enum(['zh', 'en']).default('zh'),
    // 原文语言：与 lang 不一致时说明当前这篇是翻译版，文章页会渲染「AI 翻译」声明
    originalLang: z.enum(['zh', 'en']).optional(),
    translationSlug: z.string().optional(),
  }),
});

export const collections = { blog };
