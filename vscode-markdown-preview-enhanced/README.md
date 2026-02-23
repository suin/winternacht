# Winternacht for Markdown Preview Enhanced

A custom theme for [Markdown Preview Enhanced](https://github.com/shd101wyy/vscode-markdown-preview-enhanced) based on the [Winternacht design system](https://github.com/suin/winternacht).

Warm grays, soft accent colors, and gentle typography -- designed for comfortable reading.

## Features

- Light and dark mode support (follows your editor color scheme)
- Full syntax highlighting with Winternacht's 10-scale color palette
- Mermaid diagram theming (flowcharts, sequence diagrams, Gantt charts, git graphs, pie charts)
- Rainbow heading colors (each heading level has a distinct color from the palette)
- Custom styling for tables, blockquotes, code blocks, images, and more
- Inter + JetBrains Mono + Noto Sans JP font stack

## Setup

### Prerequisites

Install the [Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced) extension in VS Code or Cursor.

### Installation

There are two ways to install: **global** or **per-workspace**. Global is recommended as it applies the theme to all your workspaces at once. Per-workspace is useful for sharing the theme via Git with collaborators.

#### Option A: Global (recommended)

**Step 1.** Copy each configuration file into the global `.crossnote` directory:

| OS | Global directory |
|---|---|
| macOS / Linux | `~/.config/crossnote/` |
| Windows | `%USERPROFILE%\.crossnote\` |

```sh
# macOS / Linux
mkdir -p ~/.config/crossnote
cp crossnote/* ~/.config/crossnote/
```

```powershell
# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path $env:USERPROFILE\.crossnote
Copy-Item crossnote\* $env:USERPROFILE\.crossnote\
```

**Step 2.** Add the following to your **user** settings (`Cmd+,` / `Ctrl+,` > open `settings.json`):

```json
{
  "markdown-preview-enhanced.previewTheme": "none.css",
  "markdown-preview-enhanced.previewColorScheme": "editorColorScheme",
  "markdown-preview-enhanced.codeBlockTheme": "default.css",
  "markdown-preview-enhanced.mermaidTheme": "base"
}
```

#### Option B: Per-workspace

**Step 1.** Copy the `crossnote/` directory into the root of your workspace as `.crossnote/`:

```sh
cp -r crossnote /path/to/your-workspace/.crossnote
```

The resulting structure:

```
your-workspace/
├── .crossnote/
│   ├── style.less    # Theme styles (light + dark)
│   ├── config.js     # Mermaid diagram configuration
│   ├── parser.js     # Markdown parser hooks (default)
│   └── head.html     # Custom HTML head (default)
├── your-files...
```

**Step 2.** Add the following to your workspace `.vscode/settings.json` (create the file if it doesn't exist):

```json
{
  "markdown-preview-enhanced.previewTheme": "none.css",
  "markdown-preview-enhanced.previewColorScheme": "editorColorScheme",
  "markdown-preview-enhanced.codeBlockTheme": "default.css",
  "markdown-preview-enhanced.mermaidTheme": "base"
}
```

> **Note:** Both global and workspace `style.less` files are loaded simultaneously, but workspace styles take higher priority.

### Settings Explained

| Setting | Value | Why |
|---|---|---|
| `previewTheme` | `none.css` | Disables built-in themes so Winternacht has full control |
| `previewColorScheme` | `editorColorScheme` | Dark/light mode follows your editor theme |
| `codeBlockTheme` | `default.css` | Uses a minimal Prism base so Winternacht's syntax colors apply cleanly |
| `mermaidTheme` | `base` | Enables `themeVariables` in `config.js` for full Mermaid color control |

### Reload the preview

Open a markdown file and launch the preview with:

- **Command Palette** (`Cmd+Shift+P` / `Ctrl+Shift+P`) > `Markdown Preview Enhanced: Open Preview to the Side`
- Or press the **refresh button** at the top-right corner of the preview pane

## Color Palette

Each heading level uses a unique color from the Winternacht palette:

| Level | Color | Scale |
|---|---|---|
| `h1` | Violet | Lavender-300 |
| `h2` | Blue | Slate-300 |
| `h3` | Green | Mint-300 |
| `h4` | Yellow | Sand-300 |
| `h5` | Red | Clay-300 |
| `h6` | Gray (uppercase) | Neutral-500 |

Syntax highlighting tokens are mapped to the 10-scale palette:

| Token | Scale |
|---|---|
| Keywords | Accent |
| Strings | Sage |
| Template literals / Regex | Mint |
| Numbers / Constants | Sand |
| Functions | Lavender |
| Types / Classes | Rose |
| Parameters / Variables | Slate |
| Properties | Copper |
| Comments | Neutral |

## Customization

### Editing the theme

You can modify `.crossnote/style.less` in your workspace. After saving, click the refresh button in the preview pane to recompile.

The file uses [LESS syntax](https://lesscss.org/). All design tokens are defined as CSS custom properties (`--neutral-50`, `--accent-300`, etc.) for easy adjustment.

### Mermaid diagrams

Mermaid colors are configured in `.crossnote/config.js` via `themeVariables`. See the [Mermaid theming documentation](https://mermaid.js.org/config/theming.html) for available variables.

## File Reference

| File | Purpose |
|---|---|
| `.crossnote/style.less` | All visual styles -- layout, typography, colors, syntax highlighting, dark mode |
| `.crossnote/config.js` | Mermaid diagram theme configuration |
| `.crossnote/parser.js` | Markdown parser hooks (no modifications, included for completeness) |
| `.crossnote/head.html` | Custom HTML `<head>` injection (fonts loaded via `style.less`) |

## License

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
