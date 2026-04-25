import './styles.css';
import { projects, infoLinks, sites, dict, type Lang } from './data';

type View = 'home' | 'works' | 'info' | 'sites';
type Theme = 'light' | 'dark';

const VIEWS = new Set<View>(['home', 'works', 'info', 'sites']);

const STORE = {
  lang:  'fuheng.lang',
  theme: 'fuheng.theme',
};

const state = {
  view: 'home' as View,
  lang:  resolveInitialLang(),
  theme: resolveInitialTheme(),
};

function resolveInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORE.lang);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch (_) { /* storage disabled */ }
  return navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function resolveInitialTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  try {
    const saved = localStorage.getItem(STORE.theme);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) { /* noop */ }
  return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/* ---------------- Theme ---------------- */

function setTheme(next: Theme, persist = true) {
  state.theme = next;
  document.documentElement.setAttribute('data-theme', next);
  if (persist) { try { localStorage.setItem(STORE.theme, next); } catch (_) { /* noop */ } }
  // Keep theme toggle aria-label accurate
  const btn = document.getElementById('themeToggle');
  if (btn) btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

function bindTheme() {
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    setTheme(state.theme === 'dark' ? 'light' : 'dark');
  });
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    try { if (!localStorage.getItem(STORE.theme)) setTheme(e.matches ? 'light' : 'dark', false); }
    catch (_) { setTheme(e.matches ? 'light' : 'dark', false); }
  });
}

/* ---------------- Language ---------------- */

function updateLangAriaLabel() {
  const btn = document.getElementById('langToggle');
  if (!btn) return;
  const next = state.lang === 'en' ? 'zh' : 'en';
  btn.setAttribute('aria-label',
    state.lang === 'en'
      ? 'Language: English. Switch to Chinese (中文)'
      : '语言：中文。切换到英文 (English)'
  );
  btn.setAttribute('aria-pressed', state.lang === 'zh' ? 'true' : 'false');
  void next;
}

function setLang(next: Lang) {
  state.lang = next;
  try { localStorage.setItem(STORE.lang, next); } catch (_) { /* noop */ }
  document.documentElement.lang = next === 'zh' ? 'zh' : 'en';
  document.getElementById('langToggle')?.classList.toggle('is-zh', next === 'zh');
  updateLangAriaLabel();
  applyText();
  renderWorks();
  renderSites();
  renderInfo();
}

function applyText() {
  const d = dict[state.lang];
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (key && d[key]) el.textContent = d[key];
  });
}

function bindLang() {
  const btn = document.getElementById('langToggle');
  btn?.classList.toggle('is-zh', state.lang === 'zh');
  btn?.addEventListener('click', () => setLang(state.lang === 'en' ? 'zh' : 'en'));
}

/* ---------------- Works ---------------- */

function renderWorks() {
  const list = document.getElementById('worksList');
  if (!list) return;
  const count = document.getElementById('worksCount');
  if (count) count.textContent = String(projects.length);

  list.innerHTML = projects
    .map((p, i) => {
      const num = String(i + 1).padStart(2, '0');
      const subtitle = p.subtitle ? `<span class="italic">${p.subtitle[state.lang]}</span>` : '';
      const isExternal = p.href.startsWith('http') || p.href.startsWith('mailto');
      const attrs = isExternal ? 'target="_blank" rel="noopener"' : '';
      const tagHtml = p.tags.map((t) => `<span class="work__tag">${t}</span>`).join('');
      const statusLabel = p.status ? (dict[state.lang][`status.${p.status}`] ?? p.status) : '';
      const statusHtml = p.status
        ? `<span class="work__status" data-status="${p.status}" aria-label="${statusLabel}"><span class="dot"></span>${statusLabel}</span>`
        : '';
      return `
        <li>
          <a class="work" href="${p.href}" ${attrs}>
            <span class="work__num" aria-hidden="true">${num}</span>
            <span class="work__main">
              <span class="work__title">${p.title}${subtitle}</span>
              <span class="work__meta">${p.meta[state.lang]}</span>
            </span>
            ${statusHtml}
            <span class="work__year" aria-hidden="true">${p.year}</span>
            <span class="work__arrow" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" stroke-width="1" fill="none"/></svg>
            </span>
            <span class="work__desc"><div><p>${p.description[state.lang]}</p></div></span>
            <span class="work__tags" aria-hidden="true">${tagHtml}</span>
          </a>
        </li>
      `;
    })
    .join('');
}

/* ---------------- Sites ---------------- */

function renderSites() {
  const container = document.getElementById('sitesList');
  if (!container) return;
  container.innerHTML = sites
    .map((s) => {
      const statusLabel = dict[state.lang][`status.${s.status ?? 'live'}`] ?? (s.status ?? 'live');
      return `
        <a class="site" href="${s.href}" target="_blank" rel="noopener" aria-label="${s.name} — ${s.subdomain}">
          <div class="site__top">
            <span class="site__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path d="${s.icon}"/>
              </svg>
            </span>
            <span class="site__arrow" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" stroke-width="1" fill="none"/>
              </svg>
            </span>
          </div>
          <div class="site__body">
            <span class="site__name">${s.name}</span>
            <span class="site__sub">${s.subdomain}</span>
          </div>
          <div class="site__footer">
            <span class="site__desc">${s.desc[state.lang]}</span>
            <span class="site__badge" data-status="${s.status ?? 'live'}" aria-label="${statusLabel}">
              <span class="dot"></span>${statusLabel}
            </span>
          </div>
        </a>
      `;
    })
    .join('');
}

/* ---------------- Info ---------------- */

function renderInfo() {
  const list = document.getElementById('infoLinks');
  if (!list) return;
  const arrow = `<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" stroke-width="1" fill="none"/></svg>`;
  const checkIcon = `<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><polyline points="2,6 5,9 10,3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const copyIcon  = `<svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true"><rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1" stroke="currentColor" stroke-width="1" fill="none"/><rect x="2" y="2" width="6.5" height="6.5" rx="1" stroke="currentColor" stroke-width="1" fill="none"/></svg>`;
  list.innerHTML = infoLinks
    .map((l) => {
      const labelText = l.label[state.lang];
      const content = l.copy
        ? `<a href="${l.href}"><span>${l.display}</span>${arrow}</a>
           <button class="copy-btn" data-copy="${l.display}" data-check="${checkIcon}" data-orig="${copyIcon}" aria-label="${state.lang === 'zh' ? '复制邮箱' : 'Copy email'}">${copyIcon}</button>`
        : `<a href="${l.href}" target="_blank" rel="noopener"><span>${l.display}</span>${arrow}</a>`;
      return `<dt>${labelText}</dt><dd>${content}</dd>`;
    })
    .join('');
}

/* ---------------- Toast + Copy ---------------- */

let toastTimer = 0;
function showToast(text: string) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = text;
  t.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t.classList.remove('is-visible'), 1600);
}

function bindCopy() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>('[data-copy]');
    if (!btn) return;
    const text = btn.dataset.copy ?? '';
    if (!text) return;
    const checkHtml = btn.dataset.check ?? '';
    const origHtml  = btn.dataset.orig  ?? '';
    navigator.clipboard?.writeText(text).then(() => {
      showToast(dict[state.lang]['meta.copied'] ?? 'Copied');
      btn.classList.add('is-copied');
      btn.innerHTML = checkHtml;
      clearTimeout((btn as HTMLButtonElement & { _copyTimer?: number })._copyTimer);
      (btn as HTMLButtonElement & { _copyTimer?: number })._copyTimer = window.setTimeout(() => {
        btn.classList.remove('is-copied');
        btn.innerHTML = origHtml;
      }, 1800);
    }).catch(() => {
      // Fallback: select text in a temp input
      const tmp = document.createElement('input');
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      try { document.execCommand('copy'); showToast(dict[state.lang]['meta.copied'] ?? 'Copied'); }
      catch (_) { /* noop */ }
      document.body.removeChild(tmp);
    });
  });
}

/* ---------------- Shortcuts overlay ---------------- */

let shortcutsOpen = false;

function openShortcuts() {
  const overlay = document.getElementById('shortcutsOverlay');
  const btn = document.getElementById('helpToggle');
  if (!overlay) return;
  shortcutsOpen = true;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  btn?.setAttribute('aria-expanded', 'true');
  btn?.classList.add('is-active');
  document.getElementById('shortcutsClose')?.focus();
}

function closeShortcuts() {
  const overlay = document.getElementById('shortcutsOverlay');
  const btn = document.getElementById('helpToggle');
  if (!overlay) return;
  shortcutsOpen = false;
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  btn?.setAttribute('aria-expanded', 'false');
  btn?.classList.remove('is-active');
  btn?.focus();
}

function bindShortcuts() {
  document.getElementById('helpToggle')?.addEventListener('click', () =>
    shortcutsOpen ? closeShortcuts() : openShortcuts()
  );
  document.getElementById('shortcutsClose')?.addEventListener('click', closeShortcuts);
  document.getElementById('shortcutsOverlay')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeShortcuts();
  });
}

/* ---------------- View routing ---------------- */

function setView(next: View, updateHash = true) {
  if (state.view === next) return;
  document.querySelectorAll<HTMLElement>('.view').forEach((v) => {
    v.classList.toggle('is-active', v.dataset.view === next);
  });
  document.querySelectorAll<HTMLElement>('[data-view]').forEach((el) => {
    if (el.classList.contains('nav__link') || el.classList.contains('brand')) {
      el.classList.toggle('is-active', el.dataset.view === next);
      el.setAttribute('aria-current', el.dataset.view === next ? 'page' : 'false');
    }
  });
  state.view = next;
  if (updateHash) history.replaceState(null, '', next === 'home' ? '/' : '#' + next);

  // Move focus to the new view's heading after transition starts
  requestAnimationFrame(() => {
    const heading = document.querySelector<HTMLElement>(`#heading-${next}`);
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  });
}

function bindNav() {
  document.querySelectorAll<HTMLAnchorElement>('[data-view]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = el.dataset.view as View;
      if (VIEWS.has(target)) {
        e.preventDefault();
        setView(target);
      }
    });
  });
  window.addEventListener('hashchange', () => setView(initialViewFromHash(), false));
}

function bindKeys() {
  window.addEventListener('keydown', (e) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    // Esc always closes shortcuts first, then goes home
    if (k === 'Escape') {
      if (shortcutsOpen) { closeShortcuts(); return; }
      setView('home');
      return;
    }
    if (k === '?') { shortcutsOpen ? closeShortcuts() : openShortcuts(); return; }

    // Don't fire nav shortcuts if shortcuts panel is open
    if (shortcutsOpen) return;

    const kl = k.toLowerCase();
    if (kl === 'w') setView('works');
    else if (kl === 's') setView('sites');
    else if (kl === 'i') setView('info');
    else if (kl === 'h') setView('home');
    else if (kl === 't') setTheme(state.theme === 'dark' ? 'light' : 'dark');
    else if (kl === 'l') setLang(state.lang === 'en' ? 'zh' : 'en');
  });
}

/* ---------------- Clock ---------------- */

function startClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
  const render = () => {
    const next = fmt.format(new Date()) + ' CST';
    if (el.textContent !== next) el.textContent = next;
  };
  render();
  setInterval(render, 30_000);
}

function initialViewFromHash(): View {
  const h = location.hash.replace('#', '') as View;
  return VIEWS.has(h) && h !== 'home' ? h : 'home';
}

/* ---------------- Bootstrap ---------------- */

function bootstrap() {
  document.documentElement.classList.add('is-booting');
  setTheme(state.theme, false);
  document.documentElement.lang = state.lang === 'zh' ? 'zh' : 'en';
  applyText();
  renderWorks();
  renderSites();
  renderInfo();
  bindNav();
  bindLang();
  bindTheme();
  bindCopy();
  bindShortcuts();
  bindKeys();
  startClock();
  updateLangAriaLabel();
  setView(initialViewFromHash(), false);
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('is-booting');
    document.documentElement.classList.add('is-ready');
  });
}

bootstrap();
