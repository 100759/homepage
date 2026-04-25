# fuheng.vip

个人主页 / personal portal. 极简编辑器风格（editorial）：暗色 + 衬线标题 + 三个视图切换，零 WebGL，对显卡零负担。

- **Stack**: Vite + TypeScript（仅此二者，无运行时依赖）
- **Deploy**: Cloudflare Pages → `fuheng.vip`

## 视图

- **Home** — 名字、标语、一个"进入作品"按钮
- **Works** — 项目列表（外链）
- **Info** — 简介 + 联系方式

顶栏切换视图，不滚动，整屏一次显示。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:5173
```

## 构建

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

## 自定义

- 项目与链接：`src/data.ts`（同时改 zh/en 文案）
- 颜色 / 字体：`src/styles.css` 顶部 `:root`
- 快捷键：`src/main.ts` → `bindKeys()`

## 部署到 Cloudflare Pages

### 方式 A — Git 连接（推荐）

1. 推到 GitHub
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. Build command: `npm run build`，Output: `dist`，Node: `20`
4. 绑定 `fuheng.vip`：**Custom domains** → Add

### 方式 B — Wrangler CLI

```bash
npx wrangler login
npm run deploy     # = build + wrangler pages deploy dist
```

## 快捷键

| Key | Action |
|-----|--------|
| `W` | Works |
| `I` | Info |
| `H` / `Esc` | Home |
