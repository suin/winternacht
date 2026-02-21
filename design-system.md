# suin Design System — "Winternacht"

はかなさとやさしさ。静かだけど、ちゃんと「自分らしさ」がある。

---

## Philosophy

- **はかなさ** — 消え入りそうなほど繊細。主張せず、佇む。
- **やさしさ** — すべてのタッチポイントがあたたかく迎える。
- **意図** — 飾りはない。すべてに理由がある。
- **一貫性** — ブログもスライドもSNSも名刺も、同じ空気。

---

## Unified Color Palette

全色を10のScaleで統一定義。Semantic、Syntax Highlight、Tags、Button Statesはすべてここから参照する。

### Master Palette — 10 Scales

| Scale | 50 (bg) | 100 (border) | 200 (base) | 300 (vivid) | 400 (deep) | 500 (darkest) |
|---|---|---|---|---|---|---|
| **Neutral** | `#FCFCFB` | `#F7F6F3` | `#F1F0EE` | `#D5D3CF` | `#BAB7B2` | `#7A7672` |
| **Accent** | `#EFF5F5` | `#D0E4E6` | `#8CC3CB` | `#5F9EA8` | `#4E8C95` | `#3D7A83` |
| **Sage** | `#EDF2ED` | `#C6D8C0` | `#8A9E82` | `#7A9E72` | `#6B7E64` | `#587850` |
| **Sand** | `#F5F0E8` | `#E6D5AE` | `#C2AD8E` | `#C29E5E` | `#9E8B6E` | `#8E7040` |
| **Clay** | `#F4EDEA` | `#E0C0C0` | `#BF9E90` | `#B87070` | `#A07E6E` | `#8E5050` |
| **Lavender** | `#F0EDF4` | `#D0C8E0` | `#9E90B5` | `#8A7EB0` | `#7E7098` | `#635788` |
| **Slate** | `#ECEEF2` | `#C8CCD8` | `#8890A0` | `#6B8BBF` | `#6B7385` | `#4A5870` |
| **Mint** | `#EDF5F2` | `#C0DDD4` | `#8DBFB2` | `#6B9E8A` | `#508070` | `#3A6558` |
| **Rose** | `#F4EDF0` | `#DEC4CC` | `#C09AA8` | `#B07888` | `#906070` | `#704858` |
| **Copper** | `#F4EFE8` | `#DDD0B8` | `#C4A880` | `#B08A60` | `#907050` | `#705838` |

Neutral追加ステップ:

| Step | Hex | 用途 |
|---|---|---|
| `600` | `#6B6862` | Dark mode faint |
| `700` | `#504D48` | Light text-strong |
| `800` | `#3A3835` | Light text |
| `900` | `#242320` | Dark surface |
| `950` | `#1A1917` | Dark bg |

### Dark Mode 変換ルール

Dark modeでは各Scaleを以下のように変換:

| Light Step | → Dark |
|---|---|
| 50 (bg) | `rgba({scale-300}, 0.08)` |
| 100 (border) | `rgba({scale-300}, 0.15)` |
| 300 (text) | 明度を上げた Lightened 版 |

Dark Lightened 色:

| Scale | Light 300 | Dark Lightened |
|---|---|---|
| Accent | `#5F9EA8` | `#8CC3CB` (= 200) |
| Sage | `#7A9E72` | `#A0C496` |
| Sand | `#C29E5E` | `#D4B87A` |
| Clay | `#B87070` | `#D4A0A0` |
| Lavender | `#8A7EB0` | `#B0A4D0` |
| Slate | `#6B8BBF` | `#8DAFD4` |
| Mint | `#6B9E8A` | `#8DC0A8` |
| Rose | `#B07888` | `#D0A0AA` |
| Copper | `#B08A60` | `#D0B080` |

### 用途マッピング

#### Semantic

| 用途 | Scale | bg | icon | text |
|---|---|---|---|---|
| Success | Sage | 50 | 300 | 500 |
| Warning | Sand | 50 | 300 | 500 |
| Error | Clay | 50 | 300 | 500 |
| Info | Accent | 50 | 200 | 300 |

#### Syntax Highlight

| Token | Scale | Light | Dark |
|---|---|---|---|
| keyword | Accent | 300 `#5F9EA8` | 200 `#8CC3CB` |
| string | Sage | 300 `#7A9E72` | `#A0C496` |
| string-expr | Mint | 300 `#6B9E8A` | `#8DC0A8` |
| constant | Sand | 300 `#C29E5E` | `#D4B87A` |
| type / class | Rose | 300 `#B07888` | `#D0A0AA` |
| function | Lavender | 300 `#8A7EB0` | `#B0A4D0` |
| parameter | Slate | 300 `#6B8BBF` | `#8DAFD4` |
| property | Copper | 300 `#B08A60` | `#D0B080` |
| comment | Neutral | `#A8A5A0` | `#B0ADA8` |
| punctuation | Neutral | 500 `#7A7672` | `#CCC9C4` |

#### Extended Tags

全Scaleで共通ルール: bg=50, border=100, text=400

#### Button States

| State | Step |
|---|---|
| Default | Accent 300 |
| Hover | Accent 400 |
| Active | Accent 500 |

### Gradient

```css
background: linear-gradient(135deg, #5F9EA8, #8CC3CB); /* accent-300 → accent-200 */
```

---

## Typography

### Font Stack

| Role | Font | Fallback |
|---|---|---|
| Sans（見出し・本文） | Inter | Noto Sans JP, -apple-system, sans-serif |
| Mono（日付・ラベル・コード） | JetBrains Mono | monospace |

### Font Scale

| Name | Size | Weight | Letter Spacing | 用途 |
|---|---|---|---|---|
| `display` | 34px | 900 | -0.04em | ブログタイトル、ヒーロー |
| `heading` | 20-28px | 800 | -0.03em | セクション見出し |
| `body` | 15px | 400 | 0 | 本文 |
| `small` | 13px | 500 | 0 | ナビゲーション、ボタン |
| `caption` | 11-12px | 600 | 0.1em | タグ、日付、ラベル |
| `mono-label` | 11-13px | 500 | 0.02em | 日付、メタ情報（JetBrains Mono） |

### Line Height

- 見出し: `1.2`
- 本文: `1.9〜2.0`（ゆったり）
- キャプション: `1.4`

---

## Spacing

**方針: Airy（エアリー）** — たっぷりの余白で呼吸感を。

| Token | Value | 用途 |
|---|---|---|
| `xs` | 4px | アイコンとテキストの隙間 |
| `sm` | 8px | タグ間、小さな隙間 |
| `md` | 16px | カード内パディング |
| `lg` | 32px | セクション内余白 |
| `xl` | 48px | セクション間余白 |
| `2xl` | 64px | ページセクション間 |
| `3xl` | 80px | ヒーローセクション |

---

## Border Radius

| Token | Value | 用途 |
|---|---|---|
| `sm` | 6px | 小さいバッジ |
| `md` | 12px | 名刺内要素、小カード |
| `lg` | 16px | OGP、スライド、カード |
| `xl` | 20px | ブログカード、大きなセクション |
| `full` | 100px | ボタン、タグ、バッジ（Pill型） |

---

## Shadow / Elevation

**Ring + Whisper** — ボーダーの代わりにbox-shadow ringで囲み、極薄の影。

```css
/* Light */
box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02);

/* Dark */
box-shadow: 0 0 0 1px rgba(255,255,255,0.04);
```

---

---

## Icons

**Heroicons Rounded Outline**

- Stroke width: `1.5`
- Style: やわらかい曲線のアウトライン
- 色: `accent`（アクティブ）、`mute`（非アクティブ）

---

## Logo / Brand Mark

### マーク

グラデーション円。`accent-deep` → `accent` の135度グラデーション。

```css
.brand-mark {
  border-radius: 50%;
  background: linear-gradient(135deg, #5F9EA8, #8CC3CB);
}
```

### サイズバリエーション

| Name | Size | 用途 |
|---|---|---|
| `favicon` | 16px | ブラウザタブ |
| `inline` | 24px | テキスト内、リスト |
| `nav` | 32px | ナビゲーション |
| `header` | 48px | ページヘッダー |
| `hero` | 72px | ヒーローセクション |
| `splash` | 96px | スプラッシュ、カタログ表紙 |

### ロックアップ

マーク（28px円）+ テキスト（Inter 800, 18px, -0.04em）を横並び、gap 10px。

- ライト背景: テキストは `text-strong`
- ダーク背景: テキストは `dark-text`
- アクセント背景: テキストは `accent-deep`

### クリアスペース

マーク周囲にマーク直径の **25%** 以上の余白を確保。

---

## Grid / Layout

### カラム

12カラムグリッド。gap: 16px。

### コンテンツ幅

| Token | Value | 用途 |
|---|---|---|
| `content-narrow` | 640px | ブログ本文、読み物 |
| `content-base` | 960px | 標準レイアウト、カタログ |
| `content-wide` | 1200px | ダッシュボード、ギャラリー |

### ブレイクポイント

| Token | Value |
|---|---|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

### ページ余白

| Device | Padding |
|---|---|
| Mobile | 16px |
| Tablet | 24px |
| Desktop | 32px |

---

## Image Treatment

### アスペクト比

| Name | Ratio | 用途 |
|---|---|---|
| Landscape | 16:9 | ブログヒーロー、スライド |
| Standard | 4:3 | 記事内画像 |
| Square | 1:1 | SNS、アバター |
| Portrait | 9:16 | ストーリーズ |
| OGP | 1200:630 | OGP画像 |

### トリートメントスタイル

| Style | Radius | Border/Shadow | 用途 |
|---|---|---|---|
| IM1: Rounded + Shadow | 20px | Ring+Whisper | ブログヒーロー、ポートフォリオ |
| IM2: Rounded + Border | 20px | 1px border | 記事内の装飾的な画像 |
| IM3: Standard + Border | 12px | 1px border | スクリーンショット、技術記事 |
| IM4: Accent Overlay | 20px | なし | ヒーロー背景、SNSバック画像 |

IM4のオーバーレイ: `rgba(140, 195, 203, 0.15)`

### 原則

- 画像は常にborderかshadowで背景と区切る
- 彩度の高い写真はやや彩度を下げてWinternachtに馴染ませる
- 角丸は内容に応じて12px〜20px
- `object-fit: cover` を基本とする

---

## Components

### Button

```css
.btn-primary {
  padding: 10px 28px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  background: var(--accent-deep);
  color: white;
}

.btn-outline {
  padding: 9px 27px;
  border-radius: 100px;
  font-size: 13px;
  font-weight: 600;
  background: transparent;
  color: var(--accent-deep);
  border: 1px solid var(--accent-border);
}
```

### Tag / Badge

```css
.tag {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 100px;
  border: 1px solid var(--border);
  color: var(--mute);
}

.tag-accent {
  border-color: var(--accent-border);
  color: var(--accent-deep);
  background: var(--accent-bg);
}
```

### Card

```css
.card {
  background: var(--bg);
  border-radius: 20px;
  border: 1px solid var(--border);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.02);
}
```

### Card Hover

**H4: Micro Lift** — 2pxだけ浮く。最小限の動き。

```css
.card {
  transition: transform var(--duration-base) var(--easing-default);
}
.card:hover {
  transform: translateY(-2px);
}
```

### Section Divider

**D3: Accent Fade** — アクセントカラーのフェードライン。中央が見え、両端が消える。

```css
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent-border), transparent);
  margin: var(--2xl) 0; /* 64px */
}
```

### Code Block

```css
.code-block {
  background: var(--bg);     /* Light: #FCFCFB */
  border-radius: 14px;
  border: 1px solid var(--border);
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.9;
}
/* Dark mode */
[data-theme="dark"] .code-block {
  background: var(--bg);     /* Dark: #1A1917 */
  border: 1px solid var(--border);
}
```

---

## Syntax Highlight — Shiki CSS Variables

Unified Paletteの各Scaleから参照。

### CSS Variables (Light)

```css
:root {
  --shiki-foreground: #7A7672;          /* neutral-500 */
  --shiki-background: #FCFCFB;          /* neutral-50 */
  --shiki-token-keyword: #5F9EA8;       /* accent-300 */
  --shiki-token-string: #7A9E72;        /* sage-300 */
  --shiki-token-constant: #C29E5E;      /* sand-300 */
  --shiki-token-function: #8A7EB0;      /* lavender-300 */
  --shiki-token-parameter: #6B8BBF;     /* slate-300 */
  --shiki-token-string-expression: #6B9E8A; /* mint-300 */
  --shiki-token-comment: #A8A5A0;       /* neutral (custom) */
  --shiki-token-punctuation: #7A7672;   /* neutral-500 */
  --shiki-token-link: #5F9EA8;          /* accent-300 */
  --shiki-token-type: #B07888;          /* rose-300 */
  --shiki-token-property: #B08A60;      /* copper-300 */
}
```

### CSS Variables (Dark)

```css
[data-theme="dark"] {
  --shiki-foreground: #D6D3CE;          /* neutral dark text */
  --shiki-background: #1A1917;          /* neutral-950 */
  --shiki-token-keyword: #8CC3CB;       /* accent-200 */
  --shiki-token-string: #A0C496;        /* sage lightened */
  --shiki-token-constant: #D4B87A;      /* sand lightened */
  --shiki-token-function: #B0A4D0;      /* lavender lightened */
  --shiki-token-parameter: #8DAFD4;     /* slate lightened */
  --shiki-token-string-expression: #8DC0A8; /* mint lightened */
  --shiki-token-comment: #B0ADA8;       /* neutral (custom) */
  --shiki-token-punctuation: #CCC9C4;   /* neutral (custom) */
  --shiki-token-link: #8CC3CB;          /* accent-200 */
  --shiki-token-type: #D0A0AA;          /* rose lightened */
  --shiki-token-property: #D0B080;      /* copper lightened */
}
```

### Input

```css
.input {
  padding: 10px 20px;
  border-radius: 100px;
  font-size: 13px;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--faint); /* #D5D3CF — borderより濃く */
}
.input::placeholder { color: var(--faint); }
```

---

## Link Style

**Border Bottom + Growing Line** — 薄い1pxのborder-bottomがホバーで2pxに育つ。

```css
a {
  color: var(--accent-deep);
  text-decoration: none;
  border-bottom: 1px solid var(--accent-border);
  padding-bottom: 1px;
  transition: border-bottom-width 0.15s ease;
}
a:hover {
  border-bottom-width: 2px;
}
```

---

## Interaction States

### Button States

| State | Primary | Outline | Ghost |
|---|---|---|---|
| Default | `bg: accent-deep` | `border: accent-border` | `transparent` |
| Hover | `bg: #4E8C95` | `bg: accent-bg, border: accent` | `bg: surface, color: text` |
| Active | `bg: #3D7A83, scale(0.97)` | `bg: #E8F4F6, scale(0.97)` | `bg: border, scale(0.97)` |
| Disabled | `bg: faint, opacity: 0.7` | `border: border, opacity: 0.7` | `color: faint, opacity: 0.6` |

### Input States

| State | Border | Shadow |
|---|---|---|
| Default | `var(--faint)` | なし |
| Hover | `var(--mute)` | なし |
| Focus | `var(--accent)` | `0 0 0 3px rgba(140,195,203,0.15)` |
| Error | `#B87070` | `0 0 0 3px rgba(184,112,112,0.1)` |
| Disabled | `var(--border)` | なし, `opacity: 0.7` |

---

## Focus Ring

キーボードナビゲーション用。すべてのインタラクティブ要素に共通。

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(140, 195, 203, 0.25);
}
```

やさしく包むアクセントカラーのグロウ。

---

## Motion

**原則: 控えめ。気づかないくらいがちょうどいい。**

| Token | Value | 用途 |
|---|---|---|
| `duration-fast` | 100ms | active, press |
| `duration-base` | 150ms | hover, toggle |
| `duration-slow` | 200ms | appear, fade |
| `easing-default` | ease | 基本 |
| `easing-out` | ease-out | 出現アニメーション |
| `easing-in-out` | ease-in-out | 移動、スライド |

---

## Use Cases

### Blog / Website
- ウォームグレー背景にやさしいタイポグラフィ
- アクセントは見出しの一部や、タグにのみ使用
- 日付はJetBrains Monoで静かに

### OGP Image (1200×630)
- ダーク版とライト版の2パターン
- ロゴアバター（accent-deep → accent のグラデーション円）
- キッカーテキストはアクセントカラー

### Presentation Slide (16:9)

**ダークのみ。** ページ番号なし。

#### Canvas

| Property | Value |
|---|---|
| 解像度 | 1920 × 1080 |
| 背景色 | `--dark-bg` (#1A1917) |
| 背景グロウ | `radial-gradient(ellipse 80% 70% at 50% 45%, rgba(140,195,203,0.06), transparent)` |
| パディング | 120px（全辺共通） |

#### スライド用タイポグラフィ

| Role | Size | Weight | Letter Spacing | Color |
|---|---|---|---|---|
| `slide-title` | 128px | 800 | -0.04em | `--dark-text-strong` |
| `slide-heading` | 72px | 800 | -0.04em | `--dark-text-strong` |
| `slide-body` | 40px | 300–400 | 0 | `--dark-mute` |
| `slide-meta` | 22px | 500 | 0 | `--dark-faint`, JetBrains Mono |

- タイトル内のキーワード1語にアクセントカラー（`--dark-accent` #8CC3CB）を適用して求心力をつくる
- Line height: タイトル `1.1`、本文 `1.5`

#### 箇条書き

アクセントドット（●）方式。

```css
.slide-bullet {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 40px;
  font-weight: 400;
  color: var(--dark-text);   /* #D6D3CE */
}
.slide-bullet::before {
  content: '';
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--dark-accent);  /* #8CC3CB */
  flex-shrink: 0;
}
```

箇条書き間の gap: `36px`

#### レイアウト — 5種

**1. Cover（表紙）**
- 中央揃え
- タイトル 128px（キーワード1語をアクセント色）
- サブタイトル 40px
- 右下に `suin`（22px, JetBrains Mono, `--dark-faint`）
- 背景グロウあり

**2. Content（コンテンツ）**
- 左揃え・上下中央
- 見出し 72px + アクセントドット箇条書き

**3. Statement（主張）**
- 左揃え・上下中央
- タイトル 128px（キーワード1語をアクセント色）
- サブテキスト 40px

**4. Section（セクション区切り）**
- 左揃え・上下中央
- タイトル 128px（全文アクセント色）
- 説明 40px
- 背景グロウあり

**5. Ending（エンディング）**
- 中央揃え（Cover と同じ構造）
- メッセージ 128px（全文アクセント色）
- ハンドル名 36px（JetBrains Mono, `--dark-faint`）

### SNS Post (1:1)
- 3パターン: グラデーション / ライト / ダーク
- 絵文字との共存OK
- ハンドル名はJetBrains Mono

### Business Card (91×55mm)
- ダーク版とライト版
- ミニマル。ドットアクセントはグラデーション
- 連絡先はJetBrains Mono

---

## Dark Mode

ユーザーの切り替えで対応。全トークンにライト/ダークのペアを定義。

暗い背景でもアクセント `#8CC3CB` はそのまま使用可能。  
ダークモードではコントラストを狭く保ち、まぶしさを避ける。

---

## CSS Custom Properties

```css
:root {
  /* Neutral */
  --neutral-50: #FCFCFB;
  --neutral-100: #F7F6F3;
  --neutral-200: #F1F0EE;
  --neutral-300: #D5D3CF;
  --neutral-400: #BAB7B2;
  --neutral-500: #7A7672;
  --neutral-600: #6B6862;
  --neutral-700: #504D48;
  --neutral-800: #3A3835;
  --neutral-900: #242320;
  --neutral-950: #1A1917;

  /* Accent */
  --accent-50: #EFF5F5;
  --accent-100: #D0E4E6;
  --accent-200: #8CC3CB;
  --accent-300: #5F9EA8;
  --accent-400: #4E8C95;
  --accent-500: #3D7A83;

  /* Sage */
  --sage-50: #EDF2ED;   --sage-100: #C6D8C0;  --sage-200: #8A9E82;
  --sage-300: #7A9E72;   --sage-400: #6B7E64;  --sage-500: #587850;

  /* Sand */
  --sand-50: #F5F0E8;   --sand-100: #E6D5AE;  --sand-200: #C2AD8E;
  --sand-300: #C29E5E;   --sand-400: #9E8B6E;  --sand-500: #8E7040;

  /* Clay */
  --clay-50: #F4EDEA;   --clay-100: #E0C0C0;  --clay-200: #BF9E90;
  --clay-300: #B87070;   --clay-400: #A07E6E;  --clay-500: #8E5050;

  /* Lavender */
  --lavender-50: #F0EDF4;  --lavender-100: #D0C8E0;  --lavender-200: #9E90B5;
  --lavender-300: #8A7EB0;  --lavender-400: #7E7098;  --lavender-500: #635788;

  /* Slate */
  --slate-50: #ECEEF2;  --slate-100: #C8CCD8;  --slate-200: #8890A0;
  --slate-300: #6B8BBF;  --slate-400: #6B7385;  --slate-500: #4A5870;

  /* Mint */
  --mint-50: #EDF5F2;   --mint-100: #C0DDD4;  --mint-200: #8DBFB2;
  --mint-300: #6B9E8A;   --mint-400: #508070;  --mint-500: #3A6558;

  /* Rose */
  --rose-50: #F4EDF0;   --rose-100: #DEC4CC;  --rose-200: #C09AA8;
  --rose-300: #B07888;   --rose-400: #906070;  --rose-500: #704858;

  /* Copper */
  --copper-50: #F4EFE8;  --copper-100: #DDD0B8;  --copper-200: #C4A880;
  --copper-300: #B08A60;  --copper-400: #907050;  --copper-500: #705838;

  /* Semantic (aliases) */
  --success-bg: var(--sage-50);     --success: var(--sage-300);    --success-text: var(--sage-500);
  --warning-bg: var(--sand-50);     --warning: var(--sand-300);    --warning-text: var(--sand-500);
  --error-bg: var(--clay-50);       --error: var(--clay-300);      --error-text: var(--clay-500);

  /* Motion */
  --duration-fast: 100ms;
  --duration-base: 150ms;
  --duration-slow: 200ms;
  --easing-default: ease;
  --easing-out: ease-out;
  --easing-in-out: ease-in-out;
}
```

---

*Built with intention. Designed for the quiet night.*
