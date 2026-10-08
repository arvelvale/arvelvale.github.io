/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 夜间观测站色板：深空底 + 头像光环青（颜色值在 global.css 的 :root，以 RGB 三元组存放以支持 /透明度）
        // token 名沿用旧名（ember=全站唯一强调色），避免改动所有页面的类名
        paper: {
          DEFAULT: 'rgb(var(--c-paper) / <alpha-value>)',
          deep: 'rgb(var(--c-paper-deep) / <alpha-value>)',
          raised: 'rgb(var(--c-raised) / <alpha-value>)',
        },
        ink: {
          DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--c-ink-faint) / <alpha-value>)',
          ghost: 'rgb(var(--c-ink-ghost) / <alpha-value>)',
        },
        ember: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          deep: 'rgb(var(--c-accent-deep) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--c-line) / <alpha-value>)',
          strong: 'rgb(var(--c-line-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Noto Sans SC', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['Noto Serif SC', 'LXGW WenKai Screen', 'Songti SC', 'serif'],
        kai: ['LXGW WenKai Screen', 'Noto Serif SC', 'Songti SC', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
