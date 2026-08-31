import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://arvelvale.github.io',
  base: '/',
  integrations: [
    mdx(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
      // mindmap 不是 Shiki 语言，不映射的话会降级成 plaintext 并丢掉语言标记，
      // 客户端就认不出这是思维导图了。映射到 markdown 语法后 data-language 保留 "mindmap"。
      langAlias: {
        mindmap: 'markdown',
      },
    },
  },
});
