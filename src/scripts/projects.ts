// 作品清单：首页预览与作品页共用，改这里两处同步。
import { t, type Lang } from './i18n';

export interface Project {
  name: string;
  url: string;
  domain: string;
  desc: string;
  category: string;
  year: string;
  stack: string[];
  logo: string;
}

export function getProjects(lang: Lang): Project[] {
  return [
    {
      name: 'Orrery',
      url: 'https://arvelvale.github.io/orrery/',
      domain: 'arvelvale.github.io/orrery',
      desc: t(lang, 'projects.orrery.desc'),
      category: t(lang, 'projects.cat.desktop'),
      year: '2026',
      stack: ['Tauri 2', 'Rust', 'JavaScript', 'MIT'],
      logo: '/projects/orrery.png',
    },
    {
      name: 'KROVIN',
      url: 'https://arvelvale.github.io/krovin/',
      domain: 'arvelvale.github.io/krovin',
      desc: t(lang, 'projects.krovin.desc'),
      category: t(lang, 'projects.cat.agent'),
      year: '2026',
      stack: ['DGX Spark', 'vLLM', 'Python', 'TypeScript'],
      logo: '/projects/krovin.png',
    },
    {
      name: '喵灵',
      url: 'https://arvelvale.github.io/morning-site/',
      domain: 'arvelvale.github.io/morning-site',
      desc: t(lang, 'projects.miaoling.desc'),
      category: t(lang, 'projects.cat.ai'),
      year: '2026',
      stack: ['AI', 'Android', 'HarmonyOS'],
      logo: '/projects/miaoling.png',
    },
    {
      name: lang === 'zh' ? '这个博客' : 'This blog',
      url: 'https://github.com/arvelvale/arvelvale.github.io',
      domain: 'github.com/arvelvale',
      desc: t(lang, 'projects.blog.desc'),
      category: t(lang, 'projects.cat.web'),
      year: '2026',
      stack: ['Astro', 'Tailwind', 'GitHub Pages'],
      logo: '/projects/blog.webp',
    },
    {
      name: '栖光',
      url: 'https://github.com/arvelvale/yinji-private',
      domain: 'github.com/arvelvale',
      desc: t(lang, 'projects.qiguang.desc'),
      category: t(lang, 'projects.cat.ai'),
      year: '2026',
      stack: ['React Native', 'Expo', 'FastAPI', 'PostgreSQL'],
      logo: '/projects/qiguang.png',
    },
  ];
}

// 文章封面的种子：中英配对的两篇取两个 id 里字典序较小的，保证封面一致
export function coverSeed(id: string, translationSlug?: string): string {
  return translationSlug && translationSlug < id ? translationSlug : id;
}
