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
    },
    {
      name: lang === 'zh' ? '喵灵 MindOff' : 'MindOff',
      url: 'https://yingjiapp.com',
      domain: 'yingjiapp.com',
      desc: t(lang, 'projects.mindoff.desc'),
      category: t(lang, 'projects.cat.ai'),
      year: '2026',
      stack: ['AI', 'Companion', 'Virtual pet'],
    },
    {
      name: lang === 'zh' ? '这个博客' : 'This blog',
      url: 'https://github.com/arvelvale/arvelvale.github.io',
      domain: 'github.com/arvelvale',
      desc: t(lang, 'projects.blog.desc'),
      category: t(lang, 'projects.cat.web'),
      year: '2026',
      stack: ['Astro', 'Tailwind', 'GitHub Pages'],
    },
  ];
}
