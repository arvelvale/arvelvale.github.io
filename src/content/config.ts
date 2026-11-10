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

// 日记是独立板块：刻意不设 category / tags / series，
// 因此不会被分类页、专栏页、文章侧栏与首页分类统计聚合到。
const diary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    cover: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    lang: z.enum(['zh', 'en']).default('zh'),
    originalLang: z.enum(['zh', 'en']).optional(),
    translationSlug: z.string().optional(),
  }),
});

export const collections = { blog, diary };
