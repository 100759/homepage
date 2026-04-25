export type Lang = 'en' | 'zh';

export interface Project {
  title: string;
  subtitle?: { en: string; zh: string };
  meta:  { en: string; zh: string };
  description: { en: string; zh: string };
  tags: string[];
  href: string;
  year: string;
  status?: 'live' | 'wip' | 'archived';
}

export interface InfoLink {
  label: { en: string; zh: string };
  display: string;
  href: string;
  copy?: boolean;
}

/** Edit this to point to your own sites/projects. */
export const projects: Project[] = [
  {
    title: 'fuheng.vip',
    meta: { en: 'Personal homepage', zh: '个人主页' },
    description: {
      en: 'This portal. Built fast, runs on the edge, no clutter.',
      zh: '就是你正在看的这个站点。轻量、跑在边缘、不堆砌。',
    },
    tags: ['site', 'edge', '2026'],
    href: 'https://fuheng.vip',
    year: '2026',
    status: 'live',
  },
  {
    title: 'Lab',
    subtitle: { en: 'experiments', zh: '实验' },
    meta: { en: 'Sketches & prototypes', zh: '草稿与原型' },
    description: {
      en: 'A scratchpad for small visual experiments and shader sketches.',
      zh: '小型视觉实验与着色器草稿的画布。',
    },
    tags: ['wip', 'creative'],
    href: '#',
    year: '—',
    status: 'wip',
  },
  {
    title: 'Writing',
    subtitle: { en: 'notes', zh: '笔记' },
    meta: { en: 'Essays & short notes', zh: '文章与短札' },
    description: {
      en: 'Long-form notes on tools, taste, and the craft of building.',
      zh: '关于工具、品味、与造物之事的长札。',
    },
    tags: ['wip', 'words'],
    href: '#',
    year: '—',
    status: 'wip',
  },
];

export interface Site {
  name: string;
  subdomain: string;
  href: string;
  desc: { en: string; zh: string };
  icon: string;   // SVG path data (single <path> viewBox="0 0 20 20")
  status?: 'live' | 'wip';
}

export const sites: Site[] = [
  {
    name: 'Blog',
    subdomain: 'blog.fuheng.vip',
    href: 'https://blog.fuheng.vip',
    desc: { en: 'Writing & notes', zh: '文章与笔记' },
    icon: 'M3 4h14v1H3V4zm0 4h14v1H3V8zm0 4h9v1H3v-1zm0 4h6v1H3v-1z',
    status: 'live',
  },
  {
    name: 'Mail',
    subdomain: 'mail.fuheng.vip',
    href: 'https://mail.fuheng.vip',
    desc: { en: 'Self-hosted email', zh: '自托管邮件' },
    icon: 'M2 4a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm2 0l6 5.5L16 4H4zm12 2.3l-5.4 4.9a1 1 0 01-1.2 0L4 6.3V16h12V6.3z',
    status: 'live',
  },
  {
    name: 'Img',
    subdomain: 'img.fuheng.vip',
    href: 'https://img.fuheng.vip',
    desc: { en: 'Image hosting', zh: '图床服务' },
    icon: 'M1 3a1 1 0 011-1h16a1 1 0 011 1v14a1 1 0 01-1 1H2a1 1 0 01-1-1V3zm2 1v8.6l3.8-3.8a1 1 0 011.4 0L11 11.6l2.3-2.3a1 1 0 011.4 0L17 11.6V4H3zm0 12h14v-3.2l-2.3-2.3-2.3 2.3a1 1 0 01-1.4 0L8.2 9.9 3 15.1V16zm4.5-8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z',
    status: 'live',
  },
];

export const infoLinks: InfoLink[] = [
  { label: { en: 'Email',  zh: '邮箱' },   display: 'hi@fuheng.vip',  href: 'mailto:hi@fuheng.vip', copy: true },
  { label: { en: 'GitHub', zh: 'GitHub' }, display: 'github.com/…',    href: 'https://github.com/' },
  { label: { en: 'Site',   zh: '主站' },   display: 'fuheng.vip',      href: 'https://fuheng.vip' },
];

export const dict: Record<Lang, Record<string, string>> = {
  en: {
    'nav.works':  'Works',
    'nav.info':   'Info',
    'home.tag':   'Developer · Maker',
    'home.line1': 'What the mind imagines,',
    'home.line2': 'the hands make real.',
    'home.lede':  'No traffic goals, no trends to chase. Just the things I make, gathered in one quiet place.',
    'home.cta':   'Enter sites',
    'works.title':'Selected',
    'works.lede': 'A small set of things I keep alive on the web. Hover to peek.',
    'works.count':'projects',
    'info.title': 'Hello — 你好',
    'info.p1':    'A small, always-on-desk portal. Nothing to read, just a door to what I make.',
    'info.p2':    "Built with TypeScript and Vite. Running on Cloudflare's edge.",
    'meta.loc':   'Asia · 2026',
    'meta.copied':'Copied',
    'theme.light':'Light',
    'theme.dark': 'Dark',
    'nav.sites':  'Sites',
    'sites.title':'My sites',
    'sites.lede': 'Subdomains running on fuheng.vip.',
    'shortcuts.title': 'Keyboard shortcuts',
    'shortcuts.home':  'Home',
    'shortcuts.theme': 'Toggle theme',
    'shortcuts.lang':  'Toggle language',
    'shortcuts.help':  'This panel',
    'status.live':'Live',
    'status.wip': 'In progress',
    'status.archived': 'Archived',
  },
  zh: {
    'nav.works':  '作品',
    'nav.info':   '信息',
    'home.tag':   '开发者 · 造物者',
    'home.line1': '日有所思，手有所造，',
    'home.line2': '落处便是此间。',
    'home.lede':  '不为流量，不追热点。只是把做过的东西，放在一处还算安静的地方。',
    'home.cta':   '进入站点',
    'works.title':'近期作品',
    'works.lede': '一些我仍在维护、留在网络上的小东西。悬停查看详情。',
    'works.count':'件作品',
    'info.title': '你好 — Hello',
    'info.p1':    '一个常驻桌面的入口。没有要读的内容，只是通往我所造之物的门。',
    'info.p2':    '由 TypeScript 与 Vite 写成，跑在 Cloudflare 的边缘上。',
    'meta.loc':   '亚洲 · 2026',
    'meta.copied':'已复制',
    'theme.light':'明',
    'theme.dark': '暗',
    'nav.sites':  '站点',
    'sites.title':'我的站点',
    'sites.lede': '运行在 fuheng.vip 上的子域名站点。',
    'shortcuts.title': '键盘快捷键',
    'shortcuts.home':  '首页',
    'shortcuts.theme': '切换主题',
    'shortcuts.lang':  '切换语言',
    'shortcuts.help':  '此面板',
    'status.live':'运行中',
    'status.wip': '进行中',
    'status.archived': '归档',
  },
};
