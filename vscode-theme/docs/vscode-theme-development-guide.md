# VSCode/Cursor Theme Development & Publishing Guide

This guide covers how to create, develop, test, and publish a color theme extension for Visual Studio Code and Cursor, within the Winternacht Bun monorepo.

---

## Table of Contents

1. [Monorepo Structure](#1-monorepo-structure)
2. [Theme JSON Format](#2-theme-json-format)
3. [Editor Colors vs Token Colors](#3-editor-colors-vs-token-colors)
4. [TextMate Scopes](#4-textmate-scopes)
5. [Semantic Token Colors](#5-semantic-token-colors)
6. [Development Workflow](#6-development-workflow)
7. [package.json Configuration](#7-packagejson-configuration)
8. [Dark vs Light vs High Contrast](#8-dark-vs-light-vs-high-contrast)
9. [Best Practices](#9-best-practices)
10. [Publishing Prerequisites](#10-publishing-prerequisites)
11. [Publishing to VS Code Marketplace](#11-publishing-to-vs-code-marketplace)
12. [Publishing to Open VSX Registry](#12-publishing-to-open-vsx-registry)
13. [Cursor Compatibility](#13-cursor-compatibility)
14. [Updating & Versioning](#14-updating--versioning)
15. [CI/CD with GitHub Actions](#15-cicd-with-github-actions)
16. [README & Screenshots for Marketplace](#16-readme--screenshots-for-marketplace)
17. [Quick Reference Checklist](#17-quick-reference-checklist)

---

## 1. Monorepo Structure

This repository is a **Bun workspace monorepo**. The VSCode theme extension lives in the `vscode-theme/` package.

### Repository Layout

```
winternacht/                     # Repository root
├── package.json                 # Root: Bun workspace definition
├── bun.lock                     # Root lockfile (shared across all packages)
├── DESIGN_SYSTEM.md             # Shared design system specification
├── vscode-theme/                # VSCode theme extension package
│   ├── package.json             # Extension manifest (name, publisher, contributes)
│   ├── themes/
│   │   ├── winternacht-light-color-theme.json
│   │   └── winternacht-dark-color-theme.json
│   ├── .vscode/
│   │   └── launch.json          # F5 debug configuration
│   ├── .vscodeignore            # Files to exclude from .vsix packaging
│   ├── README.md                # Marketplace detail page
│   ├── CHANGELOG.md
│   ├── icon.png                 # 128x128 or 256x256 PNG for Marketplace
│   ├── LICENSE
│   └── docs/                    # This documentation
│       └── vscode-theme-development-guide.md
└── ...                          # Other packages/workspaces
```

### Root package.json (Bun Workspaces)

```json
{
  "name": "winternacht",
  "private": true,
  "workspaces": [
    "vscode-theme"
  ]
}
```

### Key Points

- The **root `package.json`** declares `"workspaces"` so Bun resolves dependencies across all packages with a single `bun install`.
- The **`vscode-theme/package.json`** is the extension manifest -- it contains `contributes.themes`, `publisher`, `engines.vscode`, etc.
- Theme JSON files live in `vscode-theme/themes/` and use the `-color-theme.json` suffix for in-editor schema validation and autocomplete.
- Run `bun install` at the repository root to install all dependencies.
- Publishing tools (`@vscode/vsce`, `ovsx`) can be added as `devDependencies` in `vscode-theme/package.json` or the root, and invoked via `bun run` scripts.

### Installing Dependencies

```bash
# From the repository root
bun install
```

### Running Scripts

Define scripts in `vscode-theme/package.json`:

```json
{
  "scripts": {
    "package": "vsce package",
    "publish:vsce": "vsce publish",
    "publish:ovsx": "ovsx publish"
  },
  "devDependencies": {
    "@vscode/vsce": "^3",
    "ovsx": "^0.10"
  }
}
```

Then run them with Bun's workspace filter:

```bash
# From the repository root
bun run --cwd vscode-theme package
bun run --cwd vscode-theme publish:vsce
bun run --cwd vscode-theme publish:ovsx

# Or from within the package directory
cd vscode-theme
bun run package
```

---

## 2. Theme JSON Format

A theme JSON file (e.g., `vscode-theme/themes/winternacht-dark-color-theme.json`) has three core sections:

```jsonc
{
  // "dark", "light", or "hc" (high contrast)
  "type": "dark",

  // Enable semantic highlighting
  "semanticHighlighting": true,

  // Workbench/UI colors (~900+ named keys)
  "colors": {
    "editor.background": "#0d1117",
    "editor.foreground": "#c9d1d9",
    "sideBar.background": "#010409",
    "statusBar.background": "#161b22"
  },

  // Syntax highlighting via TextMate scopes
  "tokenColors": [
    {
      "name": "Comments",
      "scope": ["comment", "punctuation.definition.comment"],
      "settings": {
        "foreground": "#8b949e",
        "fontStyle": "italic"
      }
    },
    {
      "name": "Keywords",
      "scope": "keyword",
      "settings": {
        "foreground": "#ff7b72"
      }
    }
  ],

  // Language-server-aware highlighting
  "semanticTokenColors": {
    "variable.readonly": "#79c0ff",
    "property.declaration": "#d2a8ff"
  }
}
```

| Section | Purpose |
|---|---|
| `colors` | Workbench UI elements (sidebar, tabs, status bar, etc.) |
| `tokenColors` | Syntax highlighting using TextMate grammar scopes |
| `semanticTokenColors` | Language-aware highlighting from language servers |

---

## 3. Editor Colors vs Token Colors

### Editor Colors (`colors`)

These control the **workbench UI** -- everything outside of actual source code text. The full reference is at [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color).

Major categories with key properties:

```jsonc
{
  // Editor surface
  "editor.background": "#1e1e1e",
  "editor.foreground": "#d4d4d4",
  "editor.lineHighlightBackground": "#2a2d2e",
  "editor.selectionBackground": "#264f78",
  "editorCursor.foreground": "#aeafad",
  "editorLineNumber.foreground": "#858585",
  "editorLineNumber.activeForeground": "#c6c6c6",

  // Activity Bar (far left icons)
  "activityBar.background": "#333333",
  "activityBar.foreground": "#ffffff",
  "activityBarBadge.background": "#007acc",

  // Side Bar (explorer, search)
  "sideBar.background": "#252526",
  "sideBar.foreground": "#cccccc",
  "sideBarSectionHeader.background": "#80808033",

  // Tabs
  "tab.activeBackground": "#1e1e1e",
  "tab.activeForeground": "#ffffff",
  "tab.inactiveBackground": "#2d2d2d",
  "tab.inactiveForeground": "#ffffff80",

  // Status Bar
  "statusBar.background": "#007acc",
  "statusBar.foreground": "#ffffff",
  "statusBar.debuggingBackground": "#cc6633",

  // Title Bar
  "titleBar.activeBackground": "#3c3c3c",
  "titleBar.activeForeground": "#cccccc",

  // Terminal (16 ANSI colors)
  "terminal.background": "#1e1e1e",
  "terminal.foreground": "#cccccc",
  "terminal.ansiBlack": "#000000",
  "terminal.ansiRed": "#cd3131",
  "terminal.ansiGreen": "#0dbc79",
  "terminal.ansiYellow": "#e5e510",
  "terminal.ansiBlue": "#2472c8",
  "terminal.ansiMagenta": "#bc3fbc",
  "terminal.ansiCyan": "#11a8cd",
  "terminal.ansiWhite": "#e5e5e5"
  // ... plus ansiBright* variants
}
```

### Token Colors (`tokenColors`)

These control **syntax highlighting** of source code. Each rule targets one or more TextMate scopes:

```json
{
  "name": "Human-readable description",
  "scope": ["keyword.control", "storage.type"],
  "settings": {
    "foreground": "#c586c0",
    "fontStyle": "italic"
  }
}
```

The `scope` field accepts:
- A single string: `"keyword.control"`
- A comma-separated string: `"keyword.control, storage.type"`
- An array: `["keyword.control", "storage.type"]`

The `settings` object supports:
- `foreground`: hex color
- `background`: hex color (rarely used)
- `fontStyle`: `"italic"`, `"bold"`, `"underline"`, `"strikethrough"`, or combinations like `"italic bold"`. Use `""` (empty string) to clear inherited styles.

---

## 4. TextMate Scopes

TextMate scopes are dot-separated, hierarchical identifiers assigned to tokens by grammar definitions.

### The 11 Root Scope Groups

| # | Root Scope | Purpose | Common Sub-scopes |
|---|---|---|---|
| 1 | `comment` | All comments | `.line.double-slash`, `.block`, `.block.documentation` |
| 2 | `constant` | Constant values | `.numeric`, `.character.escape`, `.language` (true/false/null) |
| 3 | `entity` | Named constructs | `.name.function`, `.name.type`, `.name.tag`, `.other.attribute-name` |
| 4 | `invalid` | Invalid code | `.illegal`, `.deprecated` |
| 5 | `keyword` | Language keywords | `.control` (if/else/for), `.operator`, `.operator.assignment` |
| 6 | `markup` | Markup languages | `.heading`, `.bold`, `.italic`, `.list`, `.quote`, `.raw` |
| 7 | `meta` | Large structural sections | `.function-call`, `.class`, `.block`, `.brace.*` |
| 8 | `storage` | Storage types/modifiers | `.type` (var/let/const/function), `.modifier` (static/public/async) |
| 9 | `string` | String literals | `.quoted.single`, `.quoted.double`, `.template`, `.regexp` |
| 10 | `support` | Framework/library constructs | `.function`, `.class`, `.type`, `.constant`, `.variable` |
| 11 | `variable` | Variables | `.parameter`, `.language` (this/self), `.other.property`, `.other.constant` |

### Scope Resolution / Specificity

When a token has the scope `keyword.operator.arithmetic.js`, the theme engine matches rules from most to least specific:

1. `keyword.operator.arithmetic.js` (most specific -- wins if present)
2. `keyword.operator.arithmetic`
3. `keyword.operator`
4. `keyword` (least specific)

### Practical tokenColors Example

```json
"tokenColors": [
  {
    "name": "Comments",
    "scope": ["comment", "punctuation.definition.comment"],
    "settings": { "foreground": "#6a9955", "fontStyle": "italic" }
  },
  {
    "name": "Strings",
    "scope": ["string", "string.template"],
    "settings": { "foreground": "#ce9178" }
  },
  {
    "name": "Keywords",
    "scope": ["keyword", "storage.type", "storage.modifier"],
    "settings": { "foreground": "#569cd6" }
  },
  {
    "name": "Functions",
    "scope": ["entity.name.function", "support.function"],
    "settings": { "foreground": "#dcdcaa" }
  },
  {
    "name": "Types and Classes",
    "scope": ["entity.name.type", "support.class", "support.type"],
    "settings": { "foreground": "#4ec9b0" }
  },
  {
    "name": "Variables",
    "scope": ["variable", "variable.other"],
    "settings": { "foreground": "#9cdcfe" }
  },
  {
    "name": "Constants",
    "scope": ["constant", "variable.other.constant"],
    "settings": { "foreground": "#4fc1ff" }
  },
  {
    "name": "HTML Tags",
    "scope": "entity.name.tag",
    "settings": { "foreground": "#569cd6" }
  },
  {
    "name": "HTML Attributes",
    "scope": "entity.other.attribute-name",
    "settings": { "foreground": "#9cdcfe", "fontStyle": "italic" }
  },
  {
    "name": "Decorators",
    "scope": ["meta.decorator", "punctuation.decorator"],
    "settings": { "foreground": "#dcdcaa", "fontStyle": "italic" }
  },
  {
    "name": "Invalid / Illegal",
    "scope": "invalid.illegal",
    "settings": { "foreground": "#f44747" }
  },
  {
    "name": "Markdown Headings",
    "scope": "markup.heading",
    "settings": { "foreground": "#569cd6", "fontStyle": "bold" }
  }
]
```

---

## 5. Semantic Token Colors

### What Are Semantic Tokens?

Semantic tokens are provided by **language servers** that understand the full project context. Unlike TextMate scopes (regex-based, single-file), semantic tokens leverage compiler/analyzer knowledge to distinguish things that look syntactically identical but have different meanings.

**Example:** TextMate grammars cannot distinguish a read-only `const` from a mutable `let` -- both are identifiers. A language server can emit `variable.readonly` for `const` values.

### Standard Semantic Token Types

```
namespace    class        enum         interface     struct
typeParameter type        parameter    variable      property
enumMember   decorator    event        function      method
macro        label        comment      string        keyword
number       regexp       operator
```

### Standard Semantic Token Modifiers

```
declaration   definition   readonly    static
deprecated    abstract     async       modification
documentation defaultLibrary
```

### Selector Format

```
(*|tokenType)(.tokenModifier)*(:tokenLanguage)?
```

Examples:

```jsonc
"semanticTokenColors": {
  "variable": "#9cdcfe",                          // All variables
  "variable.readonly": "#4fc1ff",                  // Read-only variables
  "variable.readonly:typescript": "#79c0ff",       // Read-only in TS only
  "*.declaration": { "fontStyle": "bold" },        // All declarations bold
  "method.static": { "foreground": "#dcdcaa", "fontStyle": "italic" },
  "*.deprecated": { "fontStyle": "strikethrough" },
  "*.defaultLibrary": "#4ec9b0",
  "function.declaration": { "foreground": "#dcdcaa", "bold": true },
  "enumMember": "#4fc1ff",
  "typeParameter": "#4ec9b0"
}
```

### Semantic vs TextMate Comparison

| Aspect | TextMate (`tokenColors`) | Semantic (`semanticTokenColors`) |
|---|---|---|
| Source | Regex-based grammar files | Language server / analyzer |
| Context | Single file, pattern matching | Full project, type resolution |
| Availability | Always available | Only when a language server is active |
| Granularity | Broad categories | Fine-grained (readonly, static, deprecated) |
| Precedence | Primary coloring system | Overrides TextMate when available |

### Fallback Mapping

When no `semanticTokenColors` are defined, VSCode maps semantic tokens to TextMate scopes automatically:
- `class` -> `entity.name.type.class`
- `function` -> `entity.name.function`
- `variable` -> `variable.other.readwrite`
- `parameter` -> `variable.parameter`

---

## 6. Development Workflow

### Step 1: Install Dependencies

```bash
# From the repository root
bun install
```

This installs all dependencies across the monorepo, including `@vscode/vsce` and `ovsx` in `vscode-theme/`.

### Step 2: Test with F5 (Extension Development Host)

1. Open the `vscode-theme/` folder in VSCode (or open the monorepo root and use the multi-root workspace).
2. Press **F5** (or Fn+F5 on Mac). The `.vscode/launch.json` in `vscode-theme/` should be configured to launch the Extension Development Host.
3. A new "Extension Development Host" window opens.
4. Open **File > Preferences > Color Theme** (or `Cmd+K Cmd+T`) and select your theme.
5. Open sample files in different languages to verify.
6. **Changes to the theme JSON are applied live** -- just save and the preview updates instantly.

#### launch.json for Monorepo

Place this in `vscode-theme/.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}"
      ]
    }
  ]
}
```

If you open the monorepo root in VSCode instead of `vscode-theme/` directly, adjust the path:

```json
{
  "args": [
    "--extensionDevelopmentPath=${workspaceFolder}/vscode-theme"
  ]
}
```

### Step 3: Use the Scope Inspector

The most important debugging tool for theme development:

1. In the Extension Development Host, open a source file.
2. Open Command Palette (`Cmd+Shift+P`).
3. Run: **Developer: Inspect Editor Tokens and Scopes**.
4. Click on any token in the code.

The inspector shows:
- **TextMate scopes**: Full scope hierarchy (e.g., `variable.parameter.ts`, `meta.function.ts`, `source.ts`)
- **Foreground color**: The resolved color and which rule matched
- **Semantic token type**: The semantic type and modifiers (if a language server is active)
- **Semantic foreground**: The resolved semantic color

### Step 4: Iterative Workflow Shortcut

Experiment interactively in your `settings.json`:

```jsonc
{
  "workbench.colorCustomizations": {
    "editor.background": "#0a0e14",
    "statusBar.background": "#1f2430"
  },
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "keyword.control",
        "settings": { "foreground": "#ff8f40" }
      }
    ]
  },
  "editor.semanticTokenColorCustomizations": {
    "rules": {
      "variable.readonly": "#cbccc6"
    }
  }
}
```

Then run **Developer: Generate Color Theme from Current Settings** from the Command Palette to export a complete theme JSON.

### Step 5: Use Developer Tools

Open DevTools in the Extension Development Host (`Cmd+Option+I`) to inspect the computed CSS of editor elements and debug workbench UI colors.

---

## 7. package.json Configuration

### vscode-theme/package.json

```jsonc
{
  "name": "winternacht-theme",
  "displayName": "Winternacht Theme",
  "description": "A dark theme inspired by winter nights",
  "version": "0.1.0",
  "publisher": "suin",
  "license": "MIT",
  "engines": {
    "vscode": "^1.60.0"
  },
  "categories": ["Themes"],
  "keywords": ["theme", "dark", "syntax", "color theme", "winternacht"],
  "icon": "icon.png",
  "galleryBanner": {
    "color": "#0d1117",
    "theme": "dark"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/suin/winternacht",
    "directory": "vscode-theme"
  },
  "contributes": {
    "themes": [
      {
        "label": "Winternacht Dark",
        "uiTheme": "vs-dark",
        "path": "./themes/winternacht-dark-color-theme.json"
      },
      {
        "label": "Winternacht Light",
        "uiTheme": "vs",
        "path": "./themes/winternacht-light-color-theme.json"
      }
    ]
  },
  "scripts": {
    "package": "vsce package",
    "publish:vsce": "vsce publish",
    "publish:ovsx": "ovsx publish"
  },
  "devDependencies": {
    "@vscode/vsce": "^3",
    "ovsx": "^0.10"
  }
}
```

Note the `"repository.directory": "vscode-theme"` field -- this tells the Marketplace that the extension source lives in a subdirectory of the repository (important for monorepos).

### Required Fields

| Field | Required? | Purpose |
|---|---|---|
| `name` | Yes | npm-style identifier (lowercase, hyphens) |
| `displayName` | Yes | Human-readable name shown in Marketplace |
| `version` | Yes | Semver version string |
| `publisher` | Yes (for publishing) | Your Marketplace publisher ID |
| `engines.vscode` | Yes | Minimum VSCode version |
| `categories` | Recommended | Must include `"Themes"` |
| `contributes.themes` | Yes | Array of theme declarations |
| `icon` | Recommended | 128x128 or 256x256 PNG |
| `repository` | Recommended | Link to source code (include `directory` for monorepos) |

### Theme Entry Properties

| Property | Values | Meaning |
|---|---|---|
| `label` | Any string | Display name in the theme picker |
| `uiTheme` | `"vs"`, `"vs-dark"`, `"hc-black"`, `"hc-light"` | Base theme type (determines fallback colors for omitted keys) |
| `path` | Relative path | Path to the theme JSON file |

---

## 8. Dark vs Light vs High Contrast

A single extension can ship multiple variants, each as a separate JSON file:

```json
"contributes": {
  "themes": [
    { "label": "Winternacht Dark",     "uiTheme": "vs-dark",  "path": "./themes/winternacht-dark-color-theme.json" },
    { "label": "Winternacht Light",    "uiTheme": "vs",       "path": "./themes/winternacht-light-color-theme.json" },
    { "label": "Winternacht HC Dark",  "uiTheme": "hc-black", "path": "./themes/winternacht-hc-dark-color-theme.json" },
    { "label": "Winternacht HC Light", "uiTheme": "hc-light", "path": "./themes/winternacht-hc-light-color-theme.json" }
  ]
}
```

### Key Differences

| Variant | Background | Text | Notes |
|---|---|---|---|
| Dark | `#1e1e1e` to `#000000` | Light | Syntax colors need brightness |
| Light | `#ffffff` to `#f5f5f5` | Dark | Syntax colors need saturation |
| HC Dark | Pure `#000000` | Very high contrast | WCAG AAA (7:1+), strong borders |
| HC Light | Pure `#ffffff` | Very high contrast | Available since VSCode 1.62+ |

### Programmatic Theme Generation

Many popular themes use build scripts to generate variants from a shared palette. In a Bun monorepo, you can add a build script:

```typescript
// vscode-theme/scripts/build-themes.ts
import { write } from "bun";

const palette = {
  dark:  { bg: "#0d1117", fg: "#c9d1d9", accent: "#58a6ff" },
  light: { bg: "#ffffff", fg: "#24292f", accent: "#0969da" },
};

function generateTheme(variant: "dark" | "light") {
  const p = palette[variant];
  return {
    type: variant,
    semanticHighlighting: true,
    colors: { "editor.background": p.bg, "editor.foreground": p.fg },
    tokenColors: [
      { scope: "keyword", settings: { foreground: p.accent } },
    ],
    semanticTokenColors: {},
  };
}

await write(
  "themes/winternacht-dark-color-theme.json",
  JSON.stringify(generateTheme("dark"), null, 2),
);
await write(
  "themes/winternacht-light-color-theme.json",
  JSON.stringify(generateTheme("light"), null, 2),
);
```

Run it with:
```bash
bun run vscode-theme/scripts/build-themes.ts
```

Or add to `vscode-theme/package.json`:
```json
{
  "scripts": {
    "build": "bun run scripts/build-themes.ts",
    "package": "bun run build && vsce package"
  }
}
```

---

## 9. Best Practices

### Color Design

1. **Limit your palette to 8-12 syntax colors.** Too many creates visual noise.
2. **Maintain a clear visual hierarchy.** Keywords and function names should stand out; comments and punctuation should recede.
3. **Ensure sufficient contrast ratios.** Aim for at least WCAG AA (4.5:1). Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).
4. **Keep ancillary UI subdued.** The code editor should be the visual focal point.
5. **Design terminal ANSI colors deliberately.** Test with common tools (git, bun, ls).

### Scope Coverage

6. **Cover all 11 root TextMate scope groups** at minimum.
7. **Use the Scope Inspector extensively.** Test across TypeScript, Python, Rust, HTML, CSS, JSON, Markdown, and shell scripts.
8. **Add semantic token rules.** Define at minimum: `variable.readonly`, `property.declaration`, `function.declaration`, `*.deprecated`, `*.defaultLibrary`.

### Development

9. **Create demo files** across many languages including edge cases (decorators, generics, JSX, template literals, regex).
10. **Test in both VSCode and Cursor.** Cursor occasionally has UI differences.
11. **Use `fontStyle: ""`** (empty string) to explicitly clear inherited font styles.

---

## 10. Publishing Prerequisites

### Accounts Required

| Account | Purpose | URL |
|---|---|---|
| Azure DevOps | Generate PAT for VS Code Marketplace | https://dev.azure.com |
| Open VSX | Publish to Open VSX Registry | https://open-vsx.org |

### Tools

The publishing tools are managed as `devDependencies` in `vscode-theme/package.json`:

```json
{
  "devDependencies": {
    "@vscode/vsce": "^3",
    "ovsx": "^0.10"
  }
}
```

Install them with:
```bash
bun install
```

They will be available via `bunx vsce` and `bunx ovsx`, or through the `bun run` scripts defined in package.json.

### Personal Access Token (PAT) for VS Code Marketplace

1. Go to https://dev.azure.com and sign in.
2. Click profile icon > **Personal access tokens**.
3. Click **New Token**.
4. Configure:
   - **Organization**: Select **All accessible organizations**
   - **Scopes**: Custom defined > **Marketplace** > check **Manage**
5. Copy the token immediately.

### Open VSX Token

1. Go to https://open-vsx.org.
2. Log in with GitHub.
3. Go to **Settings** > **Access Tokens** > **Generate New Token**.

---

## 11. Publishing to VS Code Marketplace

### Creating a Publisher

**Via the web:**
1. Go to https://marketplace.visualstudio.com/manage
2. Click **Create Publisher**.
3. Fill in the Publisher ID (e.g., `suin`) and Display Name.

**Via the CLI:**
```bash
bunx vsce create-publisher suin
```

### Publishing Steps

```bash
cd vscode-theme

# Login (stores PAT locally)
bunx vsce login suin

# Verify included files
bunx vsce ls

# Package into .vsix
bun run package
# -> winternacht-theme-0.1.0.vsix

# Publish
bun run publish:vsce

# Or publish with version bump
bunx vsce publish patch   # 0.1.0 -> 0.1.1
bunx vsce publish minor   # 0.1.0 -> 0.2.0
```

### Installing .vsix Locally (for testing)

```bash
code --install-extension vscode-theme/winternacht-theme-0.1.0.vsix
cursor --install-extension vscode-theme/winternacht-theme-0.1.0.vsix
```

Or via Command Palette: **"Install from VSIX"**.

### .vscodeignore

Create `vscode-theme/.vscodeignore` to exclude unnecessary files from the .vsix package:

```
.vscode/**
node_modules/**
scripts/**
docs/**
.gitignore
.git/**
*.md
!README.md
!CHANGELOG.md
.github/**
```

Note: Since `vsce package` runs from within `vscode-theme/`, only files inside that directory are considered. Monorepo root files are excluded automatically.

---

## 12. Publishing to Open VSX Registry

Open VSX is used by VSCodium, Gitpod, Eclipse Theia, and code-server.

```bash
cd vscode-theme

# Option A: Publish a pre-built .vsix
bunx ovsx publish winternacht-theme-0.1.0.vsix -p <your-open-vsx-token>

# Option B: Publish from source
bun run publish:ovsx -- -p <your-open-vsx-token>
```

Using environment variables:
```bash
export OVSX_PAT=<your-open-vsx-token>
bunx ovsx publish winternacht-theme-0.1.0.vsix
```

---

## 13. Cursor Compatibility

- Cursor uses the **same extension format** as VS Code. No special changes needed.
- Cursor primarily uses extensions from **Open VSX** (not the Microsoft Marketplace directly).
- Extensions published to the VS Code Marketplace typically appear in Cursor, but there can be delays.
- **Recommendation**: Publish to both the VS Code Marketplace and Open VSX for maximum reach.
- **Manual installation always works**: `cursor --install-extension winternacht-theme-0.1.0.vsix`
- Test in both editors before publishing -- Cursor occasionally has minor UI rendering differences (especially around AI panel colors).

---

## 14. Updating & Versioning

```bash
cd vscode-theme

# Manual bump
bun version patch   # or: npm version patch
bun run publish:vsce
bun run publish:ovsx -- -p $OVSX_PAT

# Or let vsce handle versioning
bunx vsce publish patch
```

Maintain `vscode-theme/CHANGELOG.md`:

```markdown
# Changelog

## [0.2.0] - 2026-02-20
### Changed
- Improved contrast for comments
- Updated sidebar background color

## [0.1.0] - 2026-02-01
### Added
- Initial release
```

---

## 15. CI/CD with GitHub Actions

Create `.github/workflows/publish-vscode-theme.yml` at the **repository root**:

```yaml
name: Publish VSCode Theme

on:
  push:
    tags:
      - 'vscode-theme@*'  # e.g., vscode-theme@0.1.0

jobs:
  publish:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: vscode-theme
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Bun
        uses: oven-sh/setup-bun@v2

      - name: Install dependencies
        run: bun install

      - name: Package extension
        run: bun run package

      - name: Publish to VS Code Marketplace
        run: bunx vsce publish -p ${{ secrets.VSCE_PAT }}

      - name: Publish to Open VSX
        run: bunx ovsx publish -p ${{ secrets.OVSX_PAT }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          files: vscode-theme/*.vsix
          generate_release_notes: true
```

### Secrets Setup

In your GitHub repository > **Settings** > **Secrets and variables** > **Actions**, add:
- `VSCE_PAT` -- Azure DevOps Personal Access Token
- `OVSX_PAT` -- Open VSX access token

### Release Workflow

```bash
cd vscode-theme
npm version patch                            # Bumps version in package.json
cd ..
git add vscode-theme/package.json
git commit -m "vscode-theme: release v0.1.1"
git tag "vscode-theme@0.1.1"
git push && git push --tags                  # Triggers the workflow
```

The tag pattern `vscode-theme@*` is a monorepo convention -- it scopes the release trigger to only this package, so tags for other packages (if any) won't trigger the theme publishing workflow.

---

## 16. README & Screenshots for Marketplace

`vscode-theme/README.md` becomes the Marketplace detail page. Recommended structure:

```markdown
# Winternacht Theme

> A dark, gentle color theme for VS Code inspired by winter nights.

![Overview](https://raw.githubusercontent.com/suin/winternacht/main/vscode-theme/screenshots/overview.png)

## Screenshots

### JavaScript / TypeScript
![JS](https://raw.githubusercontent.com/suin/winternacht/main/vscode-theme/screenshots/js.png)

### Python
![Python](https://raw.githubusercontent.com/suin/winternacht/main/vscode-theme/screenshots/python.png)

## Installation

1. Open **Extensions** sidebar (`Cmd+Shift+X`)
2. Search for `Winternacht`
3. Click **Install**
4. Open **Preferences: Color Theme** and select **Winternacht Dark** or **Winternacht Light**

## License

MIT
```

### Screenshot Tips

- Use Retina/high-DPI screenshots (at least 1200px wide)
- Show real, representative code (not "Hello World")
- Show 2-3 popular languages (TypeScript, Python, HTML/CSS)
- Include sidebar, status bar, and terminal
- Host on GitHub using `raw.githubusercontent.com` URLs pointing to `vscode-theme/screenshots/`
- Keep images under 1MB each

### Icon Tips

- 128x128px minimum, 256x256px recommended
- PNG format with transparency
- Simple, recognizable at small sizes
- Place at `vscode-theme/icon.png`

---

## 17. Quick Reference Checklist

### Development

- [ ] `bun install` at repo root
- [ ] Define `colors` for workbench UI
- [ ] Define `tokenColors` for syntax highlighting (all 11 root scope groups)
- [ ] Define `semanticTokenColors` for language-server-aware highlighting
- [ ] Set `"semanticHighlighting": true` in theme JSON
- [ ] Test with F5 in Extension Development Host
- [ ] Use Scope Inspector to verify coverage
- [ ] Test across multiple languages
- [ ] Test in both VSCode and Cursor

### Pre-Publish

- [ ] `vscode-theme/package.json` has all required fields (`publisher`, `version`, `engines`, `categories`, `contributes`)
- [ ] `repository.directory` set to `"vscode-theme"` (for monorepo)
- [ ] `icon.png` created (256x256 PNG)
- [ ] `README.md` with screenshots
- [ ] `CHANGELOG.md`
- [ ] `.vscodeignore` configured
- [ ] `LICENSE` file present
- [ ] `bun run package` runs without errors (in `vscode-theme/`)
- [ ] `.vsix` tested locally in VS Code
- [ ] `.vsix` tested locally in Cursor

### Publishing

- [ ] Azure DevOps account + PAT created
- [ ] Open VSX account + token created
- [ ] Publisher created on VS Code Marketplace
- [ ] `bun run publish:vsce` succeeds
- [ ] `bun run publish:ovsx` succeeds
- [ ] Extension appears on VS Code Marketplace
- [ ] Extension appears on Open VSX
- [ ] GitHub Actions workflow at `.github/workflows/publish-vscode-theme.yml`
- [ ] Secrets (`VSCE_PAT`, `OVSX_PAT`) configured in GitHub repo

---

## References

- [Color Theme Extension Guide](https://code.visualstudio.com/api/extension-guides/color-theme) -- Official guide
- [Theme Color Reference](https://code.visualstudio.com/api/references/theme-color) -- All ~900+ workbench color keys
- [Semantic Highlight Guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide) -- Semantic tokens
- [Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide) -- TextMate scopes
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) -- vsce and Marketplace
- [TextMate Language Grammars](https://macromates.com/manual/en/language_grammars) -- Original scope naming conventions
- [Open VSX Registry](https://open-vsx.org) -- Alternative marketplace
- [Bun Workspaces](https://bun.sh/docs/install/workspaces) -- Bun monorepo documentation
