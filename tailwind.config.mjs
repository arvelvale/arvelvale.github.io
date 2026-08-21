/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 暖纸文人风色板 —— 与文章页思维导图「稿纸」组件同源（赤陶橙 #c04a1a）
        paper: {
          DEFAULT: '#faf6ee', // 页面底色：暖米白纸面
          deep: '#f3ecdd', // 略深的纸（代码块、井格底）
          raised: '#fffdf9', // 抬升的纸面（正文容器）
        },
        ink: {
          DEFAULT: '#2c2620', // 墨字：标题
          soft: '#4a4237', // 正文
          faint: '#8b7f6d', // 次要信息
          ghost: '#b8ac97', // 占位符、极弱信息
        },
        ember: {
          DEFAULT: '#c04a1a', // 赤陶橙：全站唯一强调色
          deep: '#9c3a12',
        },
        line: {
          DEFAULT: '#e7dfcf', // 发丝分隔线
          strong: '#d6cab2',
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
