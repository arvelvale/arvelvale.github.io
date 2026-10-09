// 全站 UI 文案中英双语。文章正文不翻译，仅站点框架。
// 构建期（SSG）：页面用 t(Astro.currentLocale, key) 直接渲染对应语言；
// 客户端动态文案用 ct(key, vars)，从 <html lang> 读取当前语言。

export type Lang = 'en' | 'zh';

export const langs: Lang[] = ['en', 'zh'];
export const defaultLang: Lang = 'en';

const dict: Record<string, { zh: string; en: string }> = {
  // 导航 / 页脚
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.blog': { zh: '文章', en: 'Posts' },
  'nav.categories': { zh: '分类', en: 'Categories' },
  'nav.series': { zh: '专栏', en: 'Series' },
  'nav.search': { zh: '搜索', en: 'Search' },
  'nav.projects': { zh: '作品', en: 'Projects' },

  // 作品页
  'projects.title': { zh: '作品', en: 'Projects' },
  'projects.intro': {
    zh: '我做的一些东西。点击卡片访问对应的站点。',
    en: 'Things I have built. Click a card to visit the site.',
  },
  'projects.orrery.desc': {
    zh: '个人 Agent 驾驶舱：把 Claude Code、Codex、OpenCode 等工具的会话汇到一处，支持跨工具迁移、清理，以及本地模型代理。Tauri 2 桌面应用，MIT 开源。',
    en: 'A personal cockpit for coding agents: sessions from Claude Code, Codex, OpenCode and more in one place, with cross-tool transfer, clean-up and a local model proxy. A Tauri 2 desktop app, MIT licensed.',
  },
  'projects.blog.desc': {
    zh: '你正在看的这个站。Astro + Tailwind 的静态博客，中英双语、思维导图稿纸组件、暖纸风格，托管在 GitHub Pages。',
    en: 'The site you are reading. A static blog on Astro and Tailwind: bilingual, with a mind-map manuscript component and a warm-paper look, hosted on GitHub Pages.',
  },
  'projects.krovin.desc': {
    zh: '跑在 NVIDIA DGX Spark 上的开发流 Agent：读 Linear issue 与 Obsidian 纪要，完成拆解、计划、开发与同步。JEV 决策层把技能选择、模型路由、工具门控都写进可度量的决策轨迹。DGX Spark Hackathon 参赛项目。',
    en: 'A dev-flow agent on NVIDIA DGX Spark: reads Linear issues and Obsidian notes, then breaks down, plans, codes and syncs. A JEV decision layer logs skill selection, model routing and tool gating into a measurable trace. Built for the DGX Spark Hackathon.',
  },
  'projects.cat.agent': { zh: '开发流 Agent', en: 'Dev-flow agent' },
  'projects.cat.ai': { zh: 'AI 应用', en: 'AI app' },
  'projects.cat.desktop': { zh: '桌面工具', en: 'Desktop tool' },
  'projects.cat.web': { zh: '网站', en: 'Website' },
  'projects.filter.all': { zh: '全部', en: 'All' },
  'projects.visit': { zh: '访问', en: 'Visit' },
  'home.hero.eyebrow': { zh: '开发者 · 写作 · AI', en: 'DEVELOPER · WRITING · AI' },
  'home.hero.readPosts': { zh: '读文章', en: 'Read the posts' },
  'home.hero.seeProjects': { zh: '看作品', en: 'See projects' },
  'home.hero.subject': { zh: '主体', en: 'SUBJECT' },
  'home.latestUpdate': { zh: '最近更新', en: 'Last updated' },
  'home.featured': { zh: '精选', en: 'Featured' },
  'home.more': { zh: '更多文章', en: 'More writing' },
  'home.projects': { zh: '作品', en: 'Projects' },
  'home.allProjects': { zh: '完整作品集', en: 'All projects' },
  'home.contact': { zh: '联系', en: 'Contact' },
  'home.contact.lead': { zh: '想聊聊，或者交换一点想法：', en: 'Want to talk, or trade a few ideas:' },
  'home.marquee': { zh: 'AI · 软件设计 · 系统架构 · 行情研究 · 读书笔记 · 随想', en: 'AI · Software design · Architecture · Markets · Reading notes · Stray thoughts' },
  'projects.miaoling.desc': {
    zh: '一个帮你安放思绪的 AI 陪伴应用。通过对话整理日常，让记忆、来信和桌宠陪伴连接起每一天。',
    en: 'An AI companion that helps you make room for your thoughts. Reflect through conversation, with memories, letters, and a virtual pet connecting one day to the next.',
  },
  'projects.elsewhere': { zh: '也可以在别处找到我', en: 'Elsewhere' },
  'projects.twitter': { zh: 'X', en: 'X' },
  'footer.built.pre': { zh: '用', en: 'Built with' },
  'footer.built.mid': { zh: '构建 · 托管于', en: '· Hosted on' },

  // 首页
  'home.tagline': { zh: '写代码，也写点别的', en: 'I write code, and a few other things' },
  'home.intro': {
    zh: '这里记我在 AI、软件构建和别的事情上想过的问题。',
    en: 'Notes on what I have been thinking about in AI, software building, and everything else.',
  },
  'home.stats.posts': { zh: '篇文章', en: 'posts' },
  'home.stats.categories': { zh: '个分类', en: 'categories' },
  'home.stats.tags': { zh: '个标签', en: 'tags' },
  'home.recent': { zh: '最近写作', en: 'Recent writing' },
  'home.allPosts': { zh: '全部文章', en: 'All posts' },
  'home.categories': { zh: '分类', en: 'Categories' },
  'home.tags': { zh: '标签', en: 'Tags' },
  'home.about': { zh: '关于', en: 'About' },
  'home.about.body': {
    zh: '我是 ArvelVale，做开发的，最近在学 AI 和软件设计。这里放学习笔记、项目记录，偶尔有些读书笔记和想法。更新不勤，但每篇都是自己想过一遍的。英文不是我的母语，站内的英文文章都是 AI 翻译自中文原文，仅供参考。',
    en: "I'm ArvelVale, a developer currently learning AI and software design. This site holds my study notes, project logs, and the occasional book note or stray thought. I don't post often, but every piece is something I've actually thought through. English is not my first language, so the English posts here are AI translations of my Chinese originals.",
  },
  'home.about.visitGithub': { zh: '访问 GitHub', en: 'Visit GitHub' },

  // 翻译声明：原文非当前语言时，文章页顶部提示「AI 翻译 + 非英语母语」
  'post.note.aiFromZh': {
    zh: '英文不是我的母语。本站的英文文章均由 AI 翻译自中文原文，仅供快速阅读，如有歧义请以中文原版为准。',
    en: "English is not my first language. The English posts on this site are AI translations of my Chinese originals, written for quick reading only — if anything reads oddly, the Chinese version is the source of truth.",
  },
  'post.note.aiFromEn': {
    zh: '本文由 AI 自英文原文翻译而成，仅供快速阅读，如有歧义请以英文原版为准。',
    en: 'This post is an AI translation of an English original, written for quick reading only — if anything reads oddly, the English version is the source of truth.',
  },
  'post.note.readOriginal': { zh: '阅读原文', en: 'Read the original' },

  // 文章列表页
  'blog.title': { zh: '文章', en: 'Posts' },
  'blog.intro.pre': { zh: '把技术探索、学习札记与思考片段按时间展开，共', en: 'Technical explorations, study notes, and fragments of thought, laid out in time order —' },
  'blog.intro.post': { zh: '篇。', en: 'posts in total.' },
  'blog.empty': { zh: '暂无文章，敬请期待。', en: 'No posts yet. Stay tuned.' },
  'blog.categoryOverview': { zh: '分类总览', en: 'Categories' },

  // 分类
  'categories.title': { zh: '分类', en: 'Categories' },
  'categories.intro': {
    zh: '把技术探索按主题整理成更清晰的知识分区。分类不是为了把内容关进盒子，而是为了更快找到下一条值得深入的线索。',
    en: 'Topics grouped into clearer partitions. Categories exist not to box content in, but to help you find the next thread worth pulling.',
  },
  'categories.latest': { zh: '最近：', en: 'Latest: ' },
  'common.count.posts': { zh: '{n} 篇', en: '{n} posts' },
  'meta.category': { zh: '{n} 分类', en: '{n}' },
  'categories.back': { zh: '返回分类总览', en: 'Back to categories' },
  'categories.index.pre': { zh: '这个分类下目前有', en: '' },
  'categories.index.post': { zh: '篇文章。', en: 'posts in this category.' },

  // 专栏
  'series.title': { zh: '专栏', en: 'Series' },
  'series.intro': {
    zh: '值得连续写的话题，按顺序沉淀成专栏。连载比散篇更能看清一条思考的轨迹。',
    en: 'Topics worth writing about continuously, collected in order. A series shows the trajectory of a thought better than scattered posts.',
  },
  'series.updatedTo': { zh: '更新至', en: 'updated' },
  'series.empty': { zh: '暂无专栏，敬请期待……', en: 'No series yet. Stay tuned…' },
  'series.nav': { zh: '专栏', en: 'Series' },

  // 搜索
  'search.title': { zh: '搜索', en: 'Search' },
  'search.intro': {
    zh: '输入标题、分类、标签或正文片段，快速找到想看的记录。',
    en: 'Search by title, category, tag, or a fragment of the text.',
  },
  'search.placeholder': { zh: '搜索标题、标签、分类或正文...', en: 'Search titles, tags, categories, or content...' },
  'search.none': { zh: '没有匹配的文章，换个关键词试试。', en: 'No matching posts. Try another keyword.' },
  'search.count.all': { zh: '共 {n} 篇', en: '{n} posts' },
  'search.count.found': { zh: '找到 {n} 篇', en: '{n} found' },

  // 文章页外壳
  'post.toc.close': { zh: '关闭目录', en: 'Close contents' },
  'post.toc.toggle': { zh: '收起 / 展开目录', en: 'Collapse / expand contents' },
  'post.toc': { zh: '目录', en: 'Contents' },
  'post.allPosts': { zh: '全部文章', en: 'All posts' },
  'post.updated': { zh: '更新于', en: 'Updated' },
  'post.readMinutes': { zh: '约 {n} 分钟', en: '~{n} min' },
  'post.words': { zh: '{n} 字', en: '{n} words' },
  'post.prev': { zh: '上一篇', en: 'Previous' },
  'post.next': { zh: '下一篇', en: 'Next' },
  'progress.label': { zh: '阅读进度 {n}%', en: 'Reading {n}%' },
  'progress.continue': { zh: '继续阅读', en: 'Keep reading' },
  'progress.remaining': { zh: '预计剩余约 {n} 分钟', en: '~{n} min left' },
  'progress.almost': { zh: '即将读完', en: 'Almost done' },
  'copy.copy': { zh: '复制', en: 'Copy' },
  'copy.copied': { zh: '已复制', en: 'Copied' },
  'copy.fail': { zh: '复制失败', en: 'Failed' },
};

/** 构建期/通用：按语言取文案，支持 {n} 占位 */
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const entry = dict[key];
  let s = entry ? entry[lang] : key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}

/** 客户端：从 <html lang> 读当前语言 */
export function getClientLang(): Lang {
  return typeof document !== 'undefined' && document.documentElement.lang.startsWith('zh')
    ? 'zh'
    : 'en';
}

/** 客户端动态文案 */
export function ct(key: string, vars?: Record<string, string | number>): string {
  return t(getClientLang(), key, vars);
}
