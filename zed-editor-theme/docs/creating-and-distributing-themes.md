# Creating and Distributing Zed Editor Themes

A comprehensive guide to building custom themes for the [Zed editor](https://zed.dev/) and publishing them to the Zed extension registry.

---

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Theme File Format](#theme-file-format)
   - [Top-Level Structure](#top-level-structure)
   - [Appearance (Light / Dark)](#appearance-light--dark)
   - [Style Properties](#style-properties)
   - [Syntax Token Styling](#syntax-token-styling)
   - [Terminal Colors](#terminal-colors)
   - [Player Colors](#player-colors)
   - [Markdown Preview Styling](#markdown-preview-styling)
4. [Complete Example Theme](#complete-example-theme)
5. [Local Development and Testing](#local-development-and-testing)
   - [Using a Local Theme File](#using-a-local-theme-file)
   - [Using a Dev Extension](#using-a-dev-extension)
   - [Using the Theme Builder](#using-the-theme-builder)
   - [Theme Overrides for Quick Iteration](#theme-overrides-for-quick-iteration)
6. [Publishing to the Zed Extension Registry](#publishing-to-the-zed-extension-registry)
   - [Prerequisites](#prerequisites)
   - [Preparing Your Extension Repository](#preparing-your-extension-repository)
   - [Submitting to the Extensions Registry](#submitting-to-the-extensions-registry)
   - [Updating a Published Extension](#updating-a-published-extension)
   - [Automating Updates with GitHub Actions](#automating-updates-with-github-actions)
7. [Alternative Distribution Methods](#alternative-distribution-methods)
8. [Tips and Best Practices](#tips-and-best-practices)
9. [References](#references)

---

## Overview

Zed themes control the visual appearance of the entire editor -- including UI chrome (title bar, status bar, panels, tabs), the code editor area (background, gutter, line numbers), syntax highlighting colors, the integrated terminal, and collaborative player cursors.

Themes are defined as JSON files conforming to the schema at:

```
https://zed.dev/schema/themes/v0.2.0.json
```

A single theme file can contain multiple theme variants (e.g., a dark and a light variant) grouped under a **theme family**.

---

## Project Structure

A minimal Zed theme extension has the following directory layout:

```
my-awesome-theme/
  extension.toml          # Extension manifest (required)
  LICENSE                 # License file (required for publishing)
  README.md               # Description and screenshots (optional but recommended)
  themes/
    my-awesome-theme.json # One or more theme JSON files
```

### `extension.toml`

The extension manifest is a TOML file that provides metadata about your extension:

```toml
id = "my-awesome-theme"
name = "My Awesome Theme"
version = "0.0.1"
schema_version = 1
authors = ["Your Name <you@example.com>"]
description = "A beautiful dark theme inspired by the northern lights"
repository = "https://github.com/your-username/my-awesome-theme"
```

**Important naming convention:** Theme extension IDs should be suffixed with `-theme` if the name does not already make it clear that it is a theme. This avoids complications during the publishing process. For example: `northern-lights-theme`.

| Field            | Required | Description                                                    |
| ---------------- | -------- | -------------------------------------------------------------- |
| `id`             | Yes      | Unique identifier (lowercase, hyphens). Must not contain "zed" |
| `name`           | Yes      | Human-readable display name. Must not contain "Zed"            |
| `version`        | Yes      | Semantic version (e.g., `0.1.0`)                               |
| `schema_version` | Yes      | Always `1` for current extensions                              |
| `authors`        | Yes      | Array of author strings                                        |
| `description`    | Yes      | Short description of the extension                             |
| `repository`     | Yes      | HTTPS URL to the Git repository                                |

### `themes/` Directory

The `themes` directory contains one or more `.json` files. Each JSON file defines a **theme family** that may include multiple theme variants (e.g., dark, light, high-contrast). Zed automatically discovers all JSON files in this directory.

### License File

As of October 1, 2025, extension repositories must include a license file at the root. Accepted licenses are:

- MIT
- Apache 2.0
- BSD 2-Clause / BSD 3-Clause
- GNU GPLv3 / GNU LGPLv3
- zlib

---

## Theme File Format

### Top-Level Structure

Every theme JSON file represents a **theme family** and has this top-level structure:

```json
{
  "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
  "name": "My Awesome Theme",
  "author": "Your Name",
  "themes": [
    {
      "name": "My Awesome Theme Dark",
      "appearance": "dark",
      "style": { }
    },
    {
      "name": "My Awesome Theme Light",
      "appearance": "light",
      "style": { }
    }
  ]
}
```

| Property   | Type   | Description                                                 |
| ---------- | ------ | ----------------------------------------------------------- |
| `$schema`  | string | Points to the JSON schema for validation and autocompletion |
| `name`     | string | Name of the theme family                                    |
| `author`   | string | Author attribution                                         |
| `themes`   | array  | Array of individual theme variant objects                   |

### Appearance (Light / Dark)

Each theme in the `themes` array specifies an `appearance` field:

- `"dark"` -- The theme is designed for dark mode
- `"light"` -- The theme is designed for light mode

Zed uses this value to determine which theme to activate when the user's system is set to light or dark mode (when `"mode": "system"` is configured in Zed settings).

```json
{
  "theme": {
    "mode": "system",
    "light": "My Awesome Theme Light",
    "dark": "My Awesome Theme Dark"
  }
}
```

You can provide just one appearance if you only want to support dark or light mode.

### Style Properties

The `style` object within each theme defines colors for every UI surface and element. All color values are CSS hex strings (e.g., `"#1e2127"`, `"#abb2bfcc"` for colors with alpha). Any property can be set to `null` to inherit the default.

#### Background and Surface Colors

```json
{
  "style": {
    "background": "#1e2127",
    "background.appearance": "opaque",
    "surface.background": "#21252b",
    "elevated_surface.background": "#2c313a",
    "drop_target.background": "#3a3f4b88",
    "panel.background": "#21252b",
    "editor.background": "#282c34",
    "editor.gutter.background": "#282c34"
  }
}
```

| Property                       | Description                                     |
| ------------------------------ | ----------------------------------------------- |
| `background`                   | Main application background                     |
| `background.appearance`        | `"opaque"`, `"transparent"`, or `"blurred"`     |
| `surface.background`           | Grounded surfaces (panels, sidebars)            |
| `elevated_surface.background`  | Floating surfaces (menus, dialogs, popovers)    |
| `drop_target.background`       | Drag-and-drop target indicator                  |
| `panel.background`             | Panel backgrounds (terminal, project panel)     |
| `editor.background`            | Code editor background                          |
| `editor.gutter.background`     | Line number gutter area                         |

#### Border Colors

```json
{
  "style": {
    "border": "#3e4452",
    "border.variant": "#3e445280",
    "border.focused": "#528bff",
    "border.selected": "#528bff",
    "border.transparent": "#00000000",
    "border.disabled": "#3e445260",
    "pane.focused_border": "#528bff",
    "panel.focused_border": "#528bff",
    "pane_group.border": "#181a1f"
  }
}
```

#### Text and Icon Colors

```json
{
  "style": {
    "text": "#abb2bf",
    "text.accent": "#528bff",
    "text.muted": "#5c6370",
    "text.placeholder": "#5c637099",
    "text.disabled": "#5c637066",
    "icon": "#abb2bf",
    "icon.accent": "#528bff",
    "icon.muted": "#5c6370",
    "icon.disabled": "#5c637066",
    "icon.placeholder": "#5c637099"
  }
}
```

#### Element States (Buttons, List Items, etc.)

```json
{
  "style": {
    "element.background": "#2c313a",
    "element.hover": "#3a3f4b",
    "element.active": "#4a5060",
    "element.selected": "#3a3f4b",
    "element.disabled": "#2c313a80",
    "ghost_element.background": "#00000000",
    "ghost_element.hover": "#3a3f4b",
    "ghost_element.active": "#4a5060",
    "ghost_element.selected": "#3a3f4b",
    "ghost_element.disabled": "#2c313a80"
  }
}
```

#### Editor-Specific Properties

```json
{
  "style": {
    "editor.foreground": "#abb2bf",
    "editor.line_number": "#495162",
    "editor.active_line_number": "#abb2bf",
    "editor.active_line.background": "#2c313a80",
    "editor.highlighted_line.background": "#2c313a",
    "editor.invisible": "#5c637066",
    "editor.indent_guide": "#3e4452",
    "editor.indent_guide_active": "#5c6370",
    "editor.wrap_guide": "#3e4452",
    "editor.active_wrap_guide": "#5c6370",
    "editor.subheader.background": "#21252b",
    "editor.document_highlight.bracket_background": "#528bff33",
    "editor.document_highlight.read_background": "#528bff22",
    "editor.document_highlight.write_background": "#528bff44"
  }
}
```

#### Tab Bar and Toolbar

```json
{
  "style": {
    "tab_bar.background": "#21252b",
    "tab.active_background": "#282c34",
    "tab.inactive_background": "#21252b",
    "toolbar.background": "#282c34",
    "title_bar.background": "#21252b",
    "title_bar.inactive_background": "#1e2127",
    "status_bar.background": "#21252b"
  }
}
```

#### Scrollbar

```json
{
  "style": {
    "scrollbar.track.background": "#00000000",
    "scrollbar.track.border": "#00000000",
    "scrollbar.thumb.background": "#5c637044",
    "scrollbar.thumb.border": "#00000000",
    "scrollbar.thumb.hover_background": "#5c637088"
  }
}
```

#### Status Indicator Colors

These represent semantic colors used across the UI for various states:

```json
{
  "style": {
    "error": "#e06c75",
    "error.background": "#e06c7520",
    "error.border": "#e06c7540",
    "warning": "#e5c07b",
    "warning.background": "#e5c07b20",
    "warning.border": "#e5c07b40",
    "success": "#98c379",
    "success.background": "#98c37920",
    "success.border": "#98c37940",
    "info": "#61afef",
    "info.background": "#61afef20",
    "info.border": "#61afef40",
    "hint": "#56b6c2",
    "hint.background": "#56b6c220",
    "hint.border": "#56b6c240",
    "conflict": "#c678dd",
    "created": "#98c379",
    "deleted": "#e06c75",
    "modified": "#e5c07b",
    "renamed": "#61afef",
    "hidden": "#5c6370",
    "ignored": "#5c6370",
    "predictive": "#5c6370",
    "unreachable": "#5c6370"
  }
}
```

#### Search

```json
{
  "style": {
    "search.match_background": "#e5c07b40"
  }
}
```

#### Links

```json
{
  "style": {
    "link_text.hover": "#61afef"
  }
}
```

#### Panel Indent Guides

```json
{
  "style": {
    "panel.indent_guide": "#3e4452",
    "panel.indent_guide_active": "#5c6370",
    "panel.indent_guide_hover": "#5c637088"
  }
}
```

### Syntax Token Styling

The `syntax` object within `style` controls code syntax highlighting. Each key is a token name, and the value is a highlight style object.

#### Highlight Style Properties

Each syntax token accepts the following properties:

| Property           | Type              | Description                                    |
| ------------------ | ----------------- | ---------------------------------------------- |
| `color`            | string or null    | Text foreground color (hex)                     |
| `background_color` | string or null    | Text background color (hex)                     |
| `font_style`       | string or null    | `"normal"`, `"italic"`, or `"oblique"`          |
| `font_weight`      | number or null    | 100 to 900 in increments of 100                 |

#### Available Syntax Tokens

Below is the complete list of syntax tokens recognized by Zed (based on the built-in One Dark theme):

| Token                         | Typical Usage                                           |
| ----------------------------- | ------------------------------------------------------- |
| `attribute`                   | Attributes / decorators (`@decorator`, `#[attr]`)       |
| `boolean`                     | Boolean literals (`true`, `false`)                      |
| `comment`                     | Code comments (`// ...`, `/* ... */`)                   |
| `comment.doc`                 | Documentation comments (`/// ...`, `/** ... */`)        |
| `constant`                    | Named constants                                         |
| `constructor`                 | Constructors, class instantiation                       |
| `embedded`                    | Embedded code (e.g., `{}` in JSX, template literals)    |
| `emphasis`                    | Italic emphasis in markup                               |
| `emphasis.strong`             | Bold emphasis in markup                                 |
| `enum`                        | Enum types / members                                    |
| `function`                    | Function names / calls                                  |
| `hint`                        | Hint-level diagnostics                                  |
| `keyword`                     | Language keywords (`if`, `for`, `return`, `fn`, etc.)   |
| `label`                       | Labels (e.g., loop labels in Rust)                      |
| `link_text`                   | Link text in markup                                     |
| `link_uri`                    | URLs / URIs in markup                                   |
| `namespace`                   | Namespace / module names                                |
| `number`                      | Numeric literals (`42`, `3.14`, `0xFF`)                 |
| `operator`                    | Operators (`+`, `-`, `==`, `=>`)                        |
| `predictive`                  | Predictive / autocomplete ghost text                    |
| `preproc`                     | Preprocessor directives (`#include`, `#define`)         |
| `primary`                     | Primary / default highlighted text                      |
| `property`                    | Object properties, struct fields                        |
| `punctuation`                 | General punctuation                                     |
| `punctuation.bracket`         | Brackets (`()`, `[]`, `{}`)                             |
| `punctuation.delimiter`       | Delimiters (`,`, `;`, `:`)                              |
| `punctuation.list_marker`     | List markers in markup (`-`, `*`, `1.`)                 |
| `punctuation.markup`          | Markup punctuation (`#`, `**`, `` ` ``)                 |
| `punctuation.special`         | Special punctuation (e.g., `${}` in template strings)   |
| `selector`                    | CSS selectors                                           |
| `selector.pseudo`             | CSS pseudo-selectors (`:hover`, `::before`)             |
| `string`                      | String literals                                         |
| `string.escape`               | Escape sequences in strings (`\n`, `\t`)                |
| `string.regex`                | Regular expressions                                     |
| `string.special`              | Special strings                                         |
| `string.special.symbol`       | Symbols (e.g., Ruby `:symbol`)                          |
| `tag`                         | HTML/XML/JSX tags                                       |
| `text.literal`                | Literal text in markup (code spans)                     |
| `title`                       | Headings / titles in markup                             |
| `type`                        | Type names                                              |
| `variable`                    | Variable names                                          |
| `variable.special`            | Special variables (`self`, `this`, `super`)             |
| `variant`                     | Enum variants, union members                            |

#### Example Syntax Configuration

```json
{
  "style": {
    "syntax": {
      "keyword": {
        "color": "#c678dd",
        "font_weight": 700
      },
      "function": {
        "color": "#61afef"
      },
      "string": {
        "color": "#98c379"
      },
      "comment": {
        "color": "#5c6370",
        "font_style": "italic"
      },
      "comment.doc": {
        "color": "#7f848e",
        "font_style": "italic"
      },
      "type": {
        "color": "#e5c07b"
      },
      "variable": {
        "color": "#e06c75"
      },
      "variable.special": {
        "color": "#e06c75",
        "font_style": "italic"
      },
      "number": {
        "color": "#d19a66"
      },
      "boolean": {
        "color": "#d19a66"
      },
      "constant": {
        "color": "#d19a66"
      },
      "operator": {
        "color": "#56b6c2"
      },
      "attribute": {
        "color": "#d19a66",
        "font_style": "italic"
      },
      "tag": {
        "color": "#e06c75"
      },
      "punctuation": {
        "color": "#abb2bf"
      },
      "punctuation.bracket": {
        "color": "#abb2bf"
      },
      "punctuation.delimiter": {
        "color": "#abb2bf"
      },
      "string.escape": {
        "color": "#56b6c2"
      },
      "string.regex": {
        "color": "#56b6c2"
      },
      "property": {
        "color": "#e06c75"
      },
      "enum": {
        "color": "#e5c07b"
      },
      "constructor": {
        "color": "#61afef"
      },
      "namespace": {
        "color": "#e06c75"
      },
      "emphasis": {
        "font_style": "italic"
      },
      "emphasis.strong": {
        "font_weight": 700
      },
      "title": {
        "color": "#e06c75",
        "font_weight": 700
      },
      "link_text": {
        "color": "#61afef"
      },
      "link_uri": {
        "color": "#98c379"
      },
      "text.literal": {
        "color": "#98c379"
      }
    }
  }
}
```

### Terminal Colors

The terminal section defines ANSI colors for the integrated terminal. All keys are nested under the top-level `style` object and prefixed with `terminal.`:

```json
{
  "style": {
    "terminal.foreground": "#abb2bf",
    "terminal.background": "#1e2127",
    "terminal.bright_foreground": "#e6efff",
    "terminal.dim_foreground": "#5c6370",
    "terminal.ansi.black": "#3f4451",
    "terminal.ansi.red": "#e06c75",
    "terminal.ansi.green": "#98c379",
    "terminal.ansi.yellow": "#e5c07b",
    "terminal.ansi.blue": "#61afef",
    "terminal.ansi.magenta": "#c678dd",
    "terminal.ansi.cyan": "#56b6c2",
    "terminal.ansi.white": "#d7dae0",
    "terminal.ansi.bright_black": "#5c6370",
    "terminal.ansi.bright_red": "#ff616e",
    "terminal.ansi.bright_green": "#a5e075",
    "terminal.ansi.bright_yellow": "#f2ce7e",
    "terminal.ansi.bright_blue": "#74bfff",
    "terminal.ansi.bright_magenta": "#de73ff",
    "terminal.ansi.bright_cyan": "#63d4e0",
    "terminal.ansi.bright_white": "#e6efff",
    "terminal.ansi.dim_black": "#3f445180",
    "terminal.ansi.dim_red": "#e06c7580",
    "terminal.ansi.dim_green": "#98c37980",
    "terminal.ansi.dim_yellow": "#e5c07b80",
    "terminal.ansi.dim_blue": "#61afef80",
    "terminal.ansi.dim_magenta": "#c678dd80",
    "terminal.ansi.dim_cyan": "#56b6c280",
    "terminal.ansi.dim_white": "#d7dae080"
  }
}
```

### Player Colors

Player colors are used during collaborative editing to distinguish different participants. The `players` array can contain up to 8 entries:

```json
{
  "style": {
    "players": [
      {
        "cursor": "#528bff",
        "background": "#528bff33",
        "selection": "#528bff33"
      },
      {
        "cursor": "#98c379",
        "background": "#98c37933",
        "selection": "#98c37933"
      },
      {
        "cursor": "#c678dd",
        "background": "#c678dd33",
        "selection": "#c678dd33"
      },
      {
        "cursor": "#e5c07b",
        "background": "#e5c07b33",
        "selection": "#e5c07b33"
      }
    ]
  }
}
```

The first player entry is always used for the local user's cursor and selection.

### Accents

The `accents` array defines a set of accent colors available throughout the UI:

```json
{
  "style": {
    "accents": ["#528bff", "#98c379", "#e06c75", "#e5c07b", "#c678dd", "#56b6c2", "#61afef", "#d19a66"]
  }
}
```

### Markdown Preview Styling

The Markdown preview panel in Zed does **not** have its own dedicated theme properties. There is no `markdown.*` or `preview.*` namespace in the theme schema. Instead, the preview renderer reuses existing general-purpose theme tokens to derive its appearance.

Since Zed 1.1, however, you can choose **which whole theme the preview itself uses**, independently of the editor theme. See [Choosing a Separate Theme for the Preview](#choosing-a-separate-theme-for-the-preview) below.

#### How Theme Tokens Map to Preview Elements

The following table is verified against the Zed source (`crates/markdown/src/markdown.rs`, primarily `MarkdownStyle::themed_with_overrides` ~L160–295 and the per-element render functions ~L1186–2030). Token names use the JSON form that appears in a theme file.

| Preview Element                       | Theme Token / Source                                          |
| ------------------------------------- | ------------------------------------------------------------- |
| Preview background                    | `editor.background`                                           |
| Body text color                       | `text`                                                        |
| All heading colors (H1--H6)           | `text` (the `text.muted` H6 path is **Agent-panel only**)     |
| Link color                            | `text.accent`                                                 |
| Link background                       | derived: `editor.foreground` × `0.025` opacity                |
| Link underline                        | derived: `text.accent` × `0.5` opacity, 1px                   |
| Inline code background                | derived: `editor.foreground` × `0.08` opacity                 |
| Code block background                 | `editor.background`                                           |
| Code block border                     | `border.variant`                                              |
| Code block syntax highlighting        | `syntax.*` (all syntax tokens apply inside fenced blocks)     |
| Blockquote border (default)           | `border`                                                      |
| GFM alert border `> [!NOTE]`          | `status.info`                                                 |
| GFM alert border `> [!TIP]`           | `status.success`                                              |
| GFM alert border `> [!IMPORTANT]`     | `status.info`                                                 |
| GFM alert border `> [!WARNING]`       | `status.warning`                                              |
| GFM alert border `> [!CAUTION]`       | `status.error`                                                |
| Horizontal rule color                 | `border`                                                      |
| Footnote separator                    | `border`                                                      |
| Table border                          | `border` (1.5px)                                              |
| Table header row background           | `title_bar.background`                                        |
| Table odd-row alternating background  | `panel.background`                                            |
| Selection background                  | `element_selection_background`                                |
| Active root-block indicator           | `border`                                                      |
| Hovered root-block indicator          | `border.variant`                                              |

A few important notes on this table:

- The earlier-version of this document had several entries wrong: code block background is **not** `surface.background`, and inline code background is **not** `editor.document_highlight.read_background`. Both are derived from `editor.foreground` opacity. Trust the source-verified table above.
- The `text.muted` H6 mapping only applies when `MarkdownFont::Agent` is active (the Agent panel chat). In the preview, all heading levels use `text`. This is because `heading_level_styles` is only populated for `MarkdownFont::Agent` (`markdown.rs` ~L270).
- GFM alerts (`> [!NOTE]` etc.) read from `status.*` tokens, which means the same five colors that drive diagnostics are reused for prose annotation. Tuning them affects both contexts unless you use a separate theme via `markdown_preview_theme`.
- Many of these tokens (`editor.background`, `border`, `panel.background`, `title_bar.background`, `status.*`) are shared with the editor UI. Adjusting them to tune the preview will also affect editor chrome, side panels, status bar, and diagnostic markers. See [Building a Reading-Optimized Variant](#building-a-reading-optimized-variant).

#### Font and Heading Sizes

Verified against Zed `1.1.6` source:

- **Body text** is sized from `ui_font_size` (not `buffer_font_size`).
- **Headings** are sized via gpui's text-size scale, **not** rem multiples in the preview:

  | Heading | gpui size class | Approximate value |
  | ------- | --------------- | ----------------- |
  | H1      | `text_3xl`      | 30px              |
  | H2      | `text_2xl`      | 24px              |
  | H3      | `text_xl`       | 20px              |
  | H4      | `text_lg`       | 18px              |
  | H5      | `text_base`     | 16px              |
  | H6      | `text_sm`       | 14px              |

  These sizes are hardcoded and not configurable from theme or settings. The rem-based heading sizes (`1.15rem` → `0.875rem`) that show up in the source apply only when `MarkdownFont::Agent` is the active font — i.e. in the Agent panel — not in the Markdown preview.

- **Code blocks** inside the preview use `buffer_font_size` and the `buffer_font` family. They are the only preview elements that scale with `cmd-=` / `cmd--` today ([Issue #55374](https://github.com/zed-industries/zed/issues/55374), [PR #55489](https://github.com/zed-industries/zed/pull/55489) is in flight to scale body and headings together).
- **Preview body font family** can be overridden independently via the `markdown_preview_font_family` setting (Zed 1.1+).
- **Paragraph line-height is hardcoded** to `rems(1.3)` in the renderer (`markdown.rs` ~L1164–1165). It cannot be changed from settings, theme, or language scope. Acceptable for Latin scripts; cramped for CJK prose. See [Discussion #56111](https://github.com/zed-industries/zed/discussions/56111) for the open feature request.
- `buffer_line_height` does **not** affect preview rendering. It is read only by `line_scroll_amount` to compute scroll distance, despite the name suggesting otherwise.

#### Fixed Spacing Inside the Preview

The following dimensions are hardcoded in the renderer and cannot be changed from settings or themes:

| Element                | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Paragraph line-height  | `rems(1.3)`                                    |
| Heading top margin     | 16px (`mt_4`)                                  |
| Heading bottom margin  | 8px (`mb_2`)                                   |
| Code block padding     | 8px on all sides                               |
| Code block margin      | top 8px, bottom 12px                           |
| Table cell padding     | 4px horizontal, 2px vertical                   |
| Table border thickness | 1.5px                                          |
| Code block border      | 1px                                            |

#### Markdown Editor Syntax Highlighting vs. Preview

It is important to distinguish between the **editor** syntax highlighting for `.md` files and the **rendered preview panel**:

- **Editor syntax highlighting** (when editing a `.md` file) is controlled by the `syntax` tokens listed in [Syntax Token Styling](#syntax-token-styling). The relevant tokens are:

  | Syntax Token              | What It Styles in the Editor           |
  | ------------------------- | -------------------------------------- |
  | `title`                   | Markdown headings (all levels)         |
  | `emphasis`                | Italic text (`*text*`)                 |
  | `emphasis.strong`         | Bold text (`**text**`)                 |
  | `text.literal`            | Inline code and code blocks            |
  | `link_text`               | Link display text                      |
  | `link_uri`                | Link URLs                              |
  | `punctuation.list_marker` | List bullets/numbers                   |
  | `punctuation`             | General markdown punctuation           |

- **Rendered preview** uses the general UI tokens mapped above. The `syntax` tokens only affect code blocks within the preview (for syntax-highlighted fenced code blocks).

#### Choosing a Separate Theme for the Preview

Zed 1.1 added two settings that let the Markdown preview render with a different theme and font from the editor ([PR #54003](https://github.com/zed-industries/zed/pull/54003)):

| Setting                        | Purpose                                            | When unset                              |
| ------------------------------ | -------------------------------------------------- | --------------------------------------- |
| `markdown_preview_theme`       | Name of the theme used to render the preview pane. | Falls back to the editor's active theme. |
| `markdown_preview_font_family` | Font family used inside the preview pane.          | Falls back to the UI font.              |

Example `settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "light": "Winternacht Light",
    "dark": "Winternacht Dark"
  },
  "markdown_preview_theme": "Winternacht Dark",
  "markdown_preview_font_family": "Inter"
}
```

Important: `markdown_preview_theme` only selects **which theme** the preview reads from. It does **not** add a Markdown-specific token namespace — the preview still derives every color from the general tokens listed in [How Theme Tokens Map to Preview Elements](#how-theme-tokens-map-to-preview-elements) above. Use this setting when you want a different overall theme for the preview (for example, an editor in a Dark theme but a Light theme for the preview), not as a way to style individual Markdown elements.

Other rendering changes shipped alongside this in the 1.1 line affect how previews look across themes:

- GFM alert callouts (`> [!NOTE]`, `> [!WARNING]`, etc.) are now rendered.
- Horizontal rules and blockquotes are now consistently visible.
- Table-cell checkboxes are clickable, matching list-item checkboxes.
- Selection and search highlights inside the rendered preview were corrected.

If a preview previously "looked right" but now feels off after upgrading, the renderer changes above — not the theme file — are the most likely cause.

#### Building a Reading-Optimized Variant

Because so many preview tokens are shared with the editor and panel chrome, the most effective way to tune the preview without disturbing the editor is to **ship an additional theme** that lives alongside your main theme and that the user selects via `markdown_preview_theme`.

A reading variant typically diverges from the editor variant on a small number of tokens:

| Token                      | Editor variant goal                  | Reading variant goal                                          |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------- |
| `border`                   | Subtle separators                    | Stronger to delineate blockquotes, HRs, and table edges       |
| `border.variant`           | Quiet code-block frames              | Slightly stronger so code blocks read as discrete blocks      |
| `text.accent`              | Calm UI accents                      | Higher contrast for link visibility                           |
| `title_bar.background`     | Window chrome tone                   | More differentiated from `editor.background` for table headers |
| `panel.background`         | Side-panel surface                   | Subtly distinct for table alternating rows                    |
| `status.info`              | Informational diagnostic color       | Same hue, tuned for sustained reading of `> [!NOTE]`          |
| `status.success`           | Success diagnostic color             | Tuned for `> [!TIP]`                                          |
| `status.warning`           | Warning diagnostic color             | Tuned for `> [!WARNING]`                                      |
| `status.error`             | Error diagnostic color               | Tuned for `> [!CAUTION]`                                      |

The remaining tokens (`editor.background`, `text`, `text.muted`, `editor.foreground`, `syntax.*`, etc.) usually stay identical to the editor variant, so the reading and editor experiences feel like the same theme.

A reading variant is **not** a workaround for the hardcoded dimensions in [Fixed Spacing Inside the Preview](#fixed-spacing-inside-the-preview); it can only adjust colors. For line-height, padding, and heading scale, follow the upstream issues linked in [Limitations](#limitations).

##### Caveat: no system light/dark switching for the preview theme

`markdown_preview_theme` accepts a single string. It does **not** support the `{ "mode": "system", "light": ..., "dark": ... }` form that `theme` accepts. If you ship both a Reading Light and a Reading Dark variant, users currently have to pick one and live with it across system theme changes. Tracking this as a separate enhancement upstream is reasonable.

#### Limitations

The following theme-side capabilities have been requested but are **still not implemented** as of May 2026:

- **Per-element Markdown tokens** -- There is still no `markdown.*` or `preview.*` namespace in the theme schema. `markdown_preview_theme` selects an entire theme; it does not expose new element-level tokens.
- **Configurable paragraph line-height** -- The paragraph `line-height` is hardcoded to `rems(1.3)` in `crates/markdown/src/markdown.rs`. No setting, theme, or language scope can override it. `1.3` is acceptable for Latin scripts but cramped for CJK prose ([Discussion #56111](https://github.com/zed-industries/zed/discussions/56111)).
- **Custom CSS for the preview** -- A proposed `preview_styles` setting for injecting custom CSS has not been implemented ([Discussion #43384](https://github.com/zed-industries/zed/discussions/43384)).
- **Per-heading-level colors** -- A PR to support `markup.heading.1` through `markup.heading.6` syntax tokens was closed without merging ([Issue #14115](https://github.com/zed-industries/zed/issues/14115), [PR #31477](https://github.com/zed-industries/zed/pull/31477)). All heading levels (H1--H5) share the same `text` color, and H6 uses `text.muted`.
- **Dedicated preview theme section inside a theme file** -- There is no isolated set of theme properties scoped to the preview panel ([Discussion #23951](https://github.com/zed-industries/zed/discussions/23951)). `markdown_preview_theme` works around this by swapping the whole theme, not by carving out a preview-only section.

#### Key Source Files

- [`crates/markdown/src/markdown.rs`](https://github.com/zed-industries/zed/blob/main/crates/markdown/src/markdown.rs) -- The Markdown renderer itself: how each element maps to theme tokens, default `MarkdownStyle`, paragraph `line_height(rems(1.3))` (~L1164), heading `rem` sizes, and `MarkdownFont::Preview` font selection.
- [`crates/markdown_preview/src/markdown_preview_view.rs`](https://github.com/zed-industries/zed/blob/main/crates/markdown_preview/src/markdown_preview_view.rs) -- Preview pane wiring: scroll handling (`line_scroll_amount` is the only consumer of `buffer_line_height`), keymap context, focus.
- [`crates/markdown_preview/src/markdown_preview.rs`](https://github.com/zed-industries/zed/blob/main/crates/markdown_preview/src/markdown_preview.rs) -- Crate entry point that registers the preview view with the workspace.
- [`crates/languages/src/markdown/highlights.scm`](https://github.com/zed-industries/zed/blob/main/crates/languages/src/markdown/highlights.scm) -- Tree-sitter queries for editor syntax highlighting (does not affect the preview).

---

## Complete Example Theme

Here is a minimal but functional theme file (`themes/my-awesome-theme.json`):

```json
{
  "$schema": "https://zed.dev/schema/themes/v0.2.0.json",
  "name": "My Awesome Theme",
  "author": "Your Name",
  "themes": [
    {
      "name": "My Awesome Dark",
      "appearance": "dark",
      "style": {
        "background": "#1a1b26",
        "surface.background": "#1f2029",
        "elevated_surface.background": "#292a37",
        "panel.background": "#1f2029",
        "editor.background": "#1a1b26",
        "editor.foreground": "#c0caf5",
        "editor.gutter.background": "#1a1b26",
        "editor.line_number": "#3b4261",
        "editor.active_line_number": "#c0caf5",
        "editor.active_line.background": "#292a3766",

        "border": "#292a37",
        "border.focused": "#7aa2f7",
        "border.selected": "#7aa2f7",
        "border.variant": "#292a3780",

        "text": "#c0caf5",
        "text.muted": "#565f89",
        "text.accent": "#7aa2f7",

        "tab_bar.background": "#1f2029",
        "tab.active_background": "#1a1b26",
        "tab.inactive_background": "#1f2029",
        "title_bar.background": "#1f2029",
        "toolbar.background": "#1a1b26",
        "status_bar.background": "#1f2029",

        "element.background": "#292a37",
        "element.hover": "#343547",
        "element.selected": "#343547",
        "ghost_element.hover": "#343547",
        "ghost_element.selected": "#343547",

        "error": "#f7768e",
        "warning": "#e0af68",
        "success": "#9ece6a",
        "info": "#7aa2f7",
        "hint": "#2ac3de",
        "modified": "#e0af68",
        "created": "#9ece6a",
        "deleted": "#f7768e",
        "conflict": "#bb9af7",

        "search.match_background": "#e0af6844",

        "players": [
          {
            "cursor": "#7aa2f7",
            "background": "#7aa2f733",
            "selection": "#7aa2f733"
          }
        ],

        "syntax": {
          "keyword": { "color": "#bb9af7" },
          "function": { "color": "#7aa2f7" },
          "string": { "color": "#9ece6a" },
          "comment": { "color": "#565f89", "font_style": "italic" },
          "type": { "color": "#2ac3de" },
          "variable": { "color": "#c0caf5" },
          "number": { "color": "#ff9e64" },
          "boolean": { "color": "#ff9e64" },
          "constant": { "color": "#ff9e64" },
          "operator": { "color": "#89ddff" },
          "property": { "color": "#73daca" },
          "tag": { "color": "#f7768e" },
          "attribute": { "color": "#bb9af7" },
          "punctuation": { "color": "#c0caf5" },
          "punctuation.bracket": { "color": "#c0caf5" },
          "punctuation.delimiter": { "color": "#89ddff" }
        },

        "terminal.foreground": "#c0caf5",
        "terminal.background": "#1a1b26",
        "terminal.ansi.black": "#414868",
        "terminal.ansi.red": "#f7768e",
        "terminal.ansi.green": "#9ece6a",
        "terminal.ansi.yellow": "#e0af68",
        "terminal.ansi.blue": "#7aa2f7",
        "terminal.ansi.magenta": "#bb9af7",
        "terminal.ansi.cyan": "#2ac3de",
        "terminal.ansi.white": "#c0caf5",
        "terminal.ansi.bright_black": "#565f89",
        "terminal.ansi.bright_red": "#f7768e",
        "terminal.ansi.bright_green": "#9ece6a",
        "terminal.ansi.bright_yellow": "#e0af68",
        "terminal.ansi.bright_blue": "#7aa2f7",
        "terminal.ansi.bright_magenta": "#bb9af7",
        "terminal.ansi.bright_cyan": "#2ac3de",
        "terminal.ansi.bright_white": "#c0caf5"
      }
    }
  ]
}
```

---

## Local Development and Testing

There are several ways to develop and test themes without publishing.

### Using a Local Theme File

The simplest approach -- place a theme JSON file directly in Zed's local themes directory:

| Platform      | Path                                           |
| ------------- | ---------------------------------------------- |
| macOS / Linux | `~/.config/zed/themes/`                        |
| Windows       | `%USERPROFILE%\AppData\Roaming\Zed\themes\`    |

1. Create your theme JSON file (e.g., `my-theme.json`) in the directory above.
2. Restart Zed or open the command palette.
3. Open the theme selector (`Cmd+K Cmd+T` on macOS, `Ctrl+K Ctrl+T` on Windows/Linux).
4. Your theme will appear in the list.

This method is good for quick experiments but does not simulate the full extension experience.

### Using a Dev Extension

For a proper extension workflow:

1. **Set up your extension directory** with the structure described in [Project Structure](#project-structure).

2. **Install Rust via rustup** (required even for theme-only extensions):
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   ```
   Note: Rust installed via Homebrew or other package managers will not work for dev extensions.

3. **Install the dev extension** in Zed:
   - Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
   - Run `zed: install dev extension`
   - Select your extension's root directory (the one containing `extension.toml`)

4. **Select your theme** via the theme selector.

5. **Iterate on your theme**:
   - Edit the theme JSON file
   - Run `zed: reload extensions` from the command palette
   - If changes are not reflected, try `workspace: reload`

6. **Troubleshooting**:
   - Check logs: run `zed: open log` from the command palette
   - For verbose output, launch Zed from the terminal:
     ```bash
     zed --foreground
     ```
     This shows INFO-level logs including extension loading details.

When a published version of your extension already exists, installing the dev extension will temporarily override it. The Extensions page will show that it is "Overridden by dev extension."

### Using the Theme Builder

Zed provides a visual [Theme Builder](https://zed.dev/theme-builder) web tool:

1. Visit [zed.dev/theme-builder](https://zed.dev/theme-builder).
2. Start from one of the built-in starter themes (One, Ayu, Gruvbox) or import an existing theme JSON.
3. Use the **Inspector** -- right-click on any element in the live preview to find which theme token controls its appearance.
4. Use **Color Linking** to make related tokens (e.g., all borders) reference a single source color, so changing one updates them all.
5. When finished, export as:
   - **Theme overrides** (for personal use in `settings.json`)
   - **Extension file** (a complete theme JSON ready for publishing)

The Theme Builder uses Tree-sitter grammars compiled to WebAssembly for pixel-perfect syntax highlighting that matches the actual editor.

### Theme Overrides for Quick Iteration

You can also experiment with theme tweaks using `theme_overrides` in your Zed settings file (`settings.json`):

```json
{
  "theme_overrides": {
    "My Awesome Dark": {
      "editor.background": "#000000",
      "syntax": {
        "comment": {
          "color": "#6a9955",
          "font_style": "italic"
        },
        "keyword": {
          "font_weight": 700
        }
      }
    }
  }
}
```

This lets you override individual properties of any installed theme without modifying its source files. It is useful for quick testing but should not replace proper theme development.

---

## Publishing to the Zed Extension Registry

### Prerequisites

Before publishing, ensure you have:

1. A GitHub account
2. Your theme extension in its own public GitHub repository
3. An `extension.toml` manifest at the repository root
4. A license file at the repository root (MIT, Apache 2.0, BSD, GPLv3, LGPLv3, or zlib)
5. Theme JSON files in the `themes/` directory
6. Rust installed via rustup (the CI system compiles extensions)

### Preparing Your Extension Repository

Your repository should look like this:

```
my-awesome-theme/
  extension.toml
  LICENSE
  README.md
  themes/
    my-awesome-theme.json
```

Verify that:
- The `id` in `extension.toml` does not contain "zed" or "Zed"
- The `name` in `extension.toml` does not contain "Zed"
- Theme extension IDs are suffixed with `-theme` (e.g., `my-awesome-theme`)
- The `repository` URL in `extension.toml` uses HTTPS (not SSH)
- The `version` field in `extension.toml` uses semantic versioning

### Submitting to the Extensions Registry

1. **Fork** the [zed-industries/extensions](https://github.com/zed-industries/extensions) repository.
   - Fork to your personal GitHub account (not an organization) so that Zed staff can assist via direct commits if needed.

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/extensions.git
   cd extensions
   git submodule init
   git submodule update
   ```

3. **Add your extension as a Git submodule**:
   ```bash
   git submodule add https://github.com/YOUR-USERNAME/my-awesome-theme.git extensions/my-awesome-theme
   git add extensions/my-awesome-theme
   ```
   All submodule URLs must use HTTPS, not SSH.

4. **Add an entry to `extensions.toml`**:
   ```toml
   [my-awesome-theme]
   submodule = "extensions/my-awesome-theme"
   version = "0.0.1"
   ```
   The version here must match the `version` in your extension's `extension.toml`.

5. **Sort the extensions file** (entries must be alphabetically ordered):
   ```bash
   pnpm sort-extensions
   ```

6. **Commit and push**:
   ```bash
   git add extensions.toml .gitmodules extensions/my-awesome-theme
   git commit -m "Add my-awesome-theme extension"
   git push origin main
   ```

7. **Open a Pull Request** against `zed-industries/extensions` `main` branch.

8. The CI/CD pipeline will validate your extension, compile it, and (once the PR is merged) publish it to S3 storage for distribution to all Zed users.

### Updating a Published Extension

To release a new version:

1. **In your extension repository**: bump the `version` in `extension.toml`, commit, and push.

2. **In your fork of zed-industries/extensions**:
   ```bash
   cd extensions
   git submodule update --remote extensions/my-awesome-theme
   ```

3. **Update `extensions.toml`** with the new version number.

4. **Open a new Pull Request** to `zed-industries/extensions`.

### Automating Updates with GitHub Actions

The community-maintained [zed-extension-action](https://github.com/huacnlee/zed-extension-action) GitHub Action automates version bumping and PR creation.

Create `.github/workflows/release.yml` in your extension repository:

```yaml
name: Release Zed Extension

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    name: Release Zed Extension
    runs-on: ubuntu-latest
    steps:
      - uses: huacnlee/zed-extension-action@v2
        with:
          extension-name: my-awesome-theme
          push-to: YOUR-USERNAME/extensions
        env:
          COMMITTER_TOKEN: ${{ secrets.COMMITTER_TOKEN }}
```

The `COMMITTER_TOKEN` must be a GitHub personal access token with `repo` and `workflow` scopes. Store it as a repository secret.

When you push a version tag (e.g., `git tag v0.2.0 && git push --tags`), the action will automatically:

1. Detect the new version from the tag
2. Update the submodule reference in your fork of `zed-industries/extensions`
3. Update the version in `extensions.toml`
4. Open a Pull Request to the official extensions repository

---

## Alternative Distribution Methods

### Local Theme Files

As described in [Using a Local Theme File](#using-a-local-theme-file), you can share theme JSON files directly. Users place them in their `~/.config/zed/themes/` directory. This is simple but does not provide automatic updates.

### Manual Dev Extension Installation

Share your extension repository URL and have users clone it, then install via `zed: install dev extension`. This is useful for beta testing before publishing.

### Direct Repository Sharing

Since Zed extensions are Git repositories, users with the know-how can clone your repository and install it as a dev extension. Include clear instructions in your README.

---

## Tips and Best Practices

1. **Start from an existing theme.** Use the [Theme Builder](https://zed.dev/theme-builder) to import an existing theme and modify it rather than starting from scratch. This ensures you cover all necessary tokens.

2. **Use the JSON schema.** Adding `"$schema": "https://zed.dev/schema/themes/v0.2.0.json"` to your theme file enables autocompletion and validation in editors that support JSON Schema.

3. **Test with multiple languages.** Open files in various languages (Rust, TypeScript, Python, HTML, CSS, Markdown) to verify that syntax highlighting looks good across the board.

4. **Provide both appearances.** Supporting both dark and light variants makes your theme accessible to more users.

5. **Use semantic colors consistently.** Ensure that `error`, `warning`, `success`, and `info` colors are distinct and visually meaningful.

6. **Define all terminal colors.** Missing terminal colors will fall back to defaults that may clash with your theme.

7. **Include preview screenshots.** Add screenshots to your README showing the theme with different languages and UI states. This helps users decide whether to install your theme.

8. **Use the right-click inspector** in Theme Builder to discover which tokens affect specific UI elements -- there are over 200 customizable properties.

9. **Test collaborative features.** Verify that your player colors are distinct and visible against your editor background.

10. **Follow naming conventions.** Suffix your extension ID with `-theme` and avoid including "zed" or "Zed" in your extension ID or name.

---

## References

- [Zed Themes Documentation](https://zed.dev/docs/themes) -- Official documentation on theme configuration and overrides
- [Theme Extensions Documentation](https://zed.dev/docs/extensions/themes) -- Guide for creating theme extensions
- [Developing Extensions](https://zed.dev/docs/extensions/developing-extensions) -- Complete extension development guide
- [Zed Theme Builder](https://zed.dev/theme-builder) -- Visual theme creation tool
- [Theme Builder Blog Post](https://zed.dev/blog/theme-builder) -- Introduction and features of the Theme Builder
- [Zed Theme JSON Schema](https://zed.dev/schema/themes/v0.2.0.json) -- Authoritative JSON schema for theme files
- [zed-industries/extensions Repository](https://github.com/zed-industries/extensions) -- Official extensions registry repository
- [zed-extension-action](https://github.com/huacnlee/zed-extension-action) -- GitHub Action for automating extension version bumps
- [Semantic Tokens Documentation](https://zed.dev/docs/semantic-tokens) -- Semantic token types and configuration
- [Zed Extensions Gallery](https://zed.dev/extensions?filter=themes) -- Browse published theme extensions
- [One Dark Theme Source](https://github.com/zed-industries/zed/blob/main/assets/themes/one/one.json) -- Built-in One Dark/Light theme for reference
- [Catppuccin for Zed](https://github.com/catppuccin/zed) -- Example of a well-structured theme extension
- [GitHub Zed Theme](https://github.com/PyaeSoneAungRgn/github-zed-theme) -- Another example theme extension with build pipeline
