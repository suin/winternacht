# fzf Theme Customization & Publishing Research

## Table of Contents

1. [Global Theme Customization](#1-global-theme-customization)
2. [Color Specification Syntax](#2-color-specification-syntax)
3. [Modern Styling Features (v0.50+)](#3-modern-styling-features-v050)
4. [Configuration Methods](#4-configuration-methods)
5. [Publishing & Distribution](#5-publishing--distribution)
6. [Examples from the Community](#6-examples-from-the-community)
7. [Recommendations for Winternacht](#7-recommendations-for-winternacht)

---

## 1. Global Theme Customization

### FZF_DEFAULT_OPTS Environment Variable

The primary way to set a global fzf theme is via the `FZF_DEFAULT_OPTS` environment variable. This variable holds default options that are prepended to any fzf command invocation.

```bash
# Bash / Zsh (~/.bashrc or ~/.zshrc)
export FZF_DEFAULT_OPTS='--color=fg:#d0d0d0,bg:#121212,hl:#5f87af'

# Fish (~/.config/fish/config.fish)
set -gx FZF_DEFAULT_OPTS '--color=fg:#d0d0d0,bg:#121212,hl:#5f87af'
```

### The `--color` Flag

The `--color` flag accepts a comma-separated list of `attribute:color` pairs:

```
--color=[BASE_SCHEME][,ATTRIBUTE:COLOR[,ATTRIBUTE:COLOR]...]
```

**Base schemes** can be specified first (optional):

| Scheme | Description |
|--------|-------------|
| `dark` | Dark color scheme (default on dark terminals) |
| `light` | Light color scheme (default on light terminals) |
| `16` | Use 16-color palette |
| `bw` | Black and white (no colors) |

### Color Formats

Colors can be specified in several formats:

| Format | Example | Description |
|--------|---------|-------------|
| ANSI 256 | `12` | ANSI 256-color index |
| Hex RGB | `#ff0000` | 24-bit true color |
| Named | `red` | Basic ANSI color name |
| `-1` | `-1` | Terminal default (transparent) |

Color names available: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white` (and their `bright` variants like `bright-red`).

**Style attributes** can be added with `:`-suffix on color values:

- `bold`, `dim`, `italic`, `underline`, `strikethrough`, `reverse`, `blink`

Example: `--color=fg:#ffffff:bold,hl:#ff0000:italic`

---

## 2. Color Specification Syntax

### Complete List of Color Attributes

#### Text Colors

| Attribute | Alias | Description |
|-----------|-------|-------------|
| `fg` | | Default text color |
| `fg+` | `current-fg` | Text on the current line |
| `list-fg` | | List area text |
| `selected-fg` | | Multi-selected item text |
| `preview-fg` | | Preview window text |
| `query` | `input-fg` | Query string text |
| `ghost` | | Ghost text (autocomplete suggestion) |
| `disabled` | | Query string when search is disabled |
| `hl` | | Highlighted substrings (matching text) |
| `hl+` | `current-hl` | Highlighted substrings on current line |
| `selected-hl` | | Highlighted substrings on selected items |
| `nth` | | Nth-field highlight |
| `nomatch` | | No-match indicator |

#### Background Colors

| Attribute | Description |
|-----------|-------------|
| `bg` | Default background |
| `bg+` / `current-bg` | Background of the current line |
| `list-bg` | List area background |
| `selected-bg` | Multi-selected item background |
| `preview-bg` | Preview window background |
| `input-bg` | Input area background |
| `header-bg` | Header area background |
| `footer-bg` | Footer area background |
| `alt-bg` | Alternating row background |
| `gutter` | Gutter on the left (default: `bg+`) |

#### UI Element Colors

| Attribute | Description |
|-----------|-------------|
| `info` | Info line (match count) |
| `prompt` | Prompt character |
| `pointer` | Pointer to the current line |
| `marker` | Multi-select marker |
| `spinner` | Streaming input indicator |
| `header` / `header-fg` | Header text |
| `footer` / `footer-fg` | Footer text |

#### Border & Separator Colors

| Attribute | Description |
|-----------|-------------|
| `border` | Border of the main window |
| `list-border` | List area border |
| `preview-border` | Preview window border |
| `input-border` | Input area border |
| `header-border` | Header area border |
| `footer-border` | Footer area border |
| `separator` | Horizontal separator on info line |
| `gap-line` | Gap line between items |

#### Scrollbar & Label Colors

| Attribute | Description |
|-----------|-------------|
| `scrollbar` | Main scrollbar |
| `preview-scrollbar` | Preview window scrollbar |
| `label` | Border label |
| `list-label` | List area label |
| `preview-label` | Preview window label |
| `input-label` | Input area label |
| `header-label` | Header area label |
| `footer-label` | Footer area label |

---

## 3. Modern Styling Features (v0.50+)

### The `--style` Flag (v0.55+)

fzf v0.55 introduced the `--style` flag for high-level UI styling control. It accepts a comma-separated list of style components:

```
--style=full          # Enable all style components (default)
--style=minimal       # Disable all decorations
--style=default       # Default style
```

Individual components can be toggled:

| Component | Description |
|-----------|-------------|
| `rounded` | Rounded border corners (default on capable terminals) |
| `sharp` | Sharp border corners |
| `bold` | Bold tab and info line labels |
| `unicode` | Unicode characters for borders/separators |
| `ascii` | ASCII-only characters |

### The `--border` Flag

Controls the border style of the main window:

```
--border=rounded    # Rounded corners (default)
--border=sharp      # Sharp corners
--border=bold       # Bold lines
--border=double     # Double lines
--border=block      # Block characters
--border=thinblock  # Thin block characters
--border=horizontal # Only horizontal borders
--border=vertical   # Only vertical borders
--border=top        # Only top border
--border=bottom     # Only bottom border
--border=left       # Only left border
--border=right      # Only right border
--border=none       # No border
```

### The `--separator` Flag

Controls the separator line between the input and results:

```
--separator="─"     # Custom separator character
--separator=""      # No separator
```

### The `--scrollbar` Flag

Custom scrollbar characters:

```
--scrollbar="│"     # Custom scrollbar character
--scrollbar="▐"     # Block scrollbar
```

### The `--marker` and `--pointer` Flags

Customize selection indicators:

```
--pointer="▶"
--marker="✓"
```

---

## 4. Configuration Methods

### Method 1: Environment Variable (Most Common)

```bash
# ~/.bashrc or ~/.zshrc
export FZF_DEFAULT_OPTS='
  --color=fg:#c0caf5,bg:#1a1b26,hl:#bb9af7
  --color=fg+:#c0caf5,bg+:#292e42,hl+:#7dcfff
  --color=info:#7aa2f7,prompt:#7dcfff,pointer:#7dcfff
  --color=marker:#9ece6a,spinner:#9ece6a,header:#9ece6a
  --border=rounded
  --pointer="▶"
  --marker="✓"
'
```

### Method 2: Shell-Specific Config File

```fish
# Fish: ~/.config/fish/config.fish
set -gx FZF_DEFAULT_OPTS "\
  --color=fg:#c0caf5,bg:#1a1b26,hl:#bb9af7 \
  --color=fg+:#c0caf5,bg+:#292e42,hl+:#7dcfff \
  --color=info:#7aa2f7,prompt:#7dcfff,pointer:#7dcfff \
  --color=marker:#9ece6a,spinner:#9ece6a,header:#9ece6a"
```

### Method 3: fzf Config File (v0.53+)

Since fzf v0.53, fzf supports a configuration file. The file location follows XDG conventions:

- `$FZF_CONFIG_DIR/fzfrc`
- `$XDG_CONFIG_HOME/fzf/fzfrc`
- `~/.config/fzf/fzfrc` (default fallback)

The config file uses the same syntax as command-line options, one per line:

```
# ~/.config/fzf/fzfrc
--color=fg:#c0caf5,bg:#1a1b26,hl:#bb9af7
--color=fg+:#c0caf5,bg+:#292e42,hl+:#7dcfff
--color=info:#7aa2f7,prompt:#7dcfff,pointer:#7dcfff
--border=rounded
--pointer=▶
--marker=✓
```

**Priority order**: Config file options are applied first, then `FZF_DEFAULT_OPTS`, then command-line arguments.

### Method 4: Source a Theme File

Create a separate theme file and source it:

```bash
# ~/.config/fzf/themes/winternacht.sh
export FZF_DEFAULT_OPTS='--color=fg:#c0caf5,bg:#1a1b26,...'

# In ~/.bashrc
source ~/.config/fzf/themes/winternacht.sh
```

---

## 5. Publishing & Distribution

### Distribution Formats Used in the Community

#### 1. Shell Script Snippet (Most Common)

The simplest and most popular format. Provide an `export` statement users can paste into their shell config:

```bash
# Winternacht theme for fzf
export FZF_DEFAULT_OPTS=$FZF_DEFAULT_OPTS'
  --color=fg:#d0d0d0,bg:#121212,hl:#5f87af
  ...'
```

**Key pattern**: Use `$FZF_DEFAULT_OPTS` concatenation (not plain `=`) so users can combine with their own options.

#### 2. Dedicated GitHub Repository

Many themes maintain a standalone repo for their fzf variant:

| Project | Repo | Format | Notes |
|---------|------|--------|-------|
| Catppuccin | `catppuccin/fzf` | Shell files in `themes/` dir (.sh, .fish, .nu, .ps1) | ~289 stars, MIT, 4 flavors x 4 shells |
| Dracula | `dracula/fzf` | Minimal repo, docs on draculatheme.com | ~26 stars, single snippet |
| Rose Pine | `rose-pine/fzf` | Template build system (`template.sh` -> `dist/`) | 3 variants, build script |
| Base16 | `tinted-theming/tinted-fzf` | Auto-generated, dirs per shell (`sh/`, `fish/`, `powershell/`) | ~150 stars, 100+ schemes |
| Nord | `ianchesal/nord-fzf` | Community repo, snippet in README | ~33 stars |
| Tokyo Night | Part of `folke/tokyonight.nvim` | Included as "extras" in Neovim theme | No dedicated repo |

#### 3. Part of a Larger Theme Collection

Some themes distribute fzf as part of a multi-app theme project (like Winternacht):

```
winternacht/
├── fzf/
│   ├── winternacht.sh        # Bash/Zsh theme
│   ├── winternacht.fish      # Fish theme
│   └── fzfrc                 # Config file format
├── ghostty/
├── starship/
└── ...
```

#### 4. Plugin Manager Distribution

Some themes support installation via shell plugin managers:

- **Oh My Zsh**: Place in `~/.oh-my-zsh/custom/themes/`
- **Fisher (Fish)**: Provide as a Fish plugin
- **Zinit/Antigen**: Loadable Zsh plugin

### Catppuccin fzf Distribution (Best-in-Class Example)

Catppuccin's fzf theme (`catppuccin/fzf`) is widely considered a gold standard:

- **Multiple flavors**: Latte, Frappe, Macchiato, Mocha
- **Multiple formats**: Shell env vars, fzfrc config file
- **Clear installation instructions** per shell (Bash, Zsh, Fish)
- **Concatenation-friendly**: Uses `$FZF_DEFAULT_OPTS` appending pattern
- **Preview screenshots** in README

### Base16 fzf Distribution

The `tinted-theming/base16-fzf` project provides:

- Auto-generated themes from Base16 color scheme definitions
- One `.config` file per color scheme
- Sourced into shell config: `source ~/.config/fzf/base16-theme.config`
- Integrated with `base16-shell` for automatic theme switching

### Recommended File Structure for Distribution

```
fzf/
├── docs/
│   └── research.md           # This document
├── themes/
│   ├── winternacht.sh         # Bash/Zsh: export FZF_DEFAULT_OPTS=...
│   ├── winternacht.fish       # Fish: set -gx FZF_DEFAULT_OPTS ...
│   └── fzfrc                  # fzf config file format (v0.53+)
├── screenshots/
│   └── preview.png            # Terminal screenshot showing the theme
├── install.sh                 # Optional install script
└── README.md                  # Installation instructions
```

### Web-Based Theme Tools

These tools can help during theme development:

- **fzf Theme Playground** (`vitormv.github.io/fzf-themes`) - Interactive web tool to create, preview, and share themes via URL
- **fzf Color Picker** (`minsw.github.io/fzf-color-picker`) - Visual color scheme designer with live preview

### Where to List Your Theme for Discoverability

1. **Official fzf Wiki - Color Schemes page** (`github.com/junegunn/fzf/wiki/Color-schemes`) - Community-maintained, anyone can add their theme
2. **Project README** with relevant GitHub topics (`fzf-theme`, `fzf-color-scheme`, `color-scheme`)

### Additional Shell Format: PowerShell

For broader reach, consider providing a PowerShell variant:

```powershell
# PowerShell profile
$ENV:FZF_DEFAULT_OPTS=@"
--color=fg:#d0d0d0,bg:#121212,hl:#5f87af
--color=fg+:#d0d0d0,bg+:#262626,hl+:#5fd7ff
"@
```

### Best Practices for Publishing

1. **Provide shell-specific snippets**: At minimum Bash/Zsh and Fish. Optionally PowerShell and Nushell.
2. **Use `$FZF_DEFAULT_OPTS` concatenation**: Don't overwrite user's existing options.
   ```bash
   export FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS \
     --color=fg:#... "
   ```
3. **Include screenshots**: Show the theme in a real terminal with sample data.
4. **Document prerequisites**: Mention terminal true-color support requirement.
5. **Provide fzfrc format**: For users on fzf v0.53+.
6. **Keep it copy-paste friendly**: The simplest install method should be copying a snippet.
7. **Test with common fzf integrations**: Verify with `fzf --preview`, Ctrl-R history, Ctrl-T file finder, etc.
8. **Submit to fzf wiki**: Add your theme to the official Color Schemes wiki page for discoverability.
9. **Provide a transparent background tip**: Document using `bg:-1` for transparent terminal backgrounds.

---

## 6. Examples from the Community

### Catppuccin Mocha (Popular Dark Theme)

```bash
export FZF_DEFAULT_OPTS=" \
--color=bg+:#313244,bg:#1e1e2e,spinner:#f5e0dc,hl:#f38ba8 \
--color=fg:#cdd6f4,header:#f38ba8,info:#cba6f7,pointer:#f5e0dc \
--color=marker:#b4befe,fg+:#cdd6f4,prompt:#cba6f7,hl+:#f38ba8 \
--color=selected-bg:#45475a \
--color=border:#313244,label:#cdd6f4"
```

### Dracula

```bash
export FZF_DEFAULT_OPTS='--color=fg:#f8f8f2,bg:#282a36,hl:#bd93f9 --color=fg+:#f8f8f2,bg+:#44475a,hl+:#bd93f9 --color=info:#ffb86c,prompt:#50fa7b,pointer:#ff79c6 --color=marker:#ff79c6,spinner:#ffb86c,header:#6272a4'
```

### Tokyo Night

```bash
export FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS \
--color=fg:#c0caf5,bg:#1a1b26,hl:#ff9e64 \
--color=fg+:#c0caf5,bg+:#292e42,hl+:#ff9e64 \
--color=info:#7aa2f7,prompt:#7dcfff,pointer:#7dcfff \
--color=marker:#9ece6a,spinner:#9ece6a,header:#9ece6a"
```

### Gruvbox Dark

```bash
export FZF_DEFAULT_OPTS='--color=bg+:#3c3836,bg:#282828,spinner:#fb4934,hl:#928374 --color=fg:#ebdbb2,header:#928374,info:#8ec07c,pointer:#fb4934 --color=marker:#fb4934,fg+:#ebdbb2,prompt:#fb4934,hl+:#fb4934'
```

### Nord

```bash
export FZF_DEFAULT_OPTS='--color=fg:#e5e9f0,bg:#2e3440,hl:#81a1c1 --color=fg+:#e5e9f0,bg+:#3b4252,hl+:#81a1c1 --color=info:#eacb8a,prompt:#bf6069,pointer:#b48dac --color=marker:#a3be8b,spinner:#b48dac,header:#a3be8b'
```

---

## 7. Recommendations for Winternacht

### Theme Files to Create

1. **`fzf/themes/winternacht.sh`** - Bash/Zsh export snippet
2. **`fzf/themes/winternacht.fish`** - Fish `set -gx` snippet
3. **`fzf/themes/fzfrc`** - fzf config file format (for v0.53+)

### Installation Documentation

Provide installation instructions for each method:

```markdown
### Bash / Zsh
Add to `~/.bashrc` or `~/.zshrc`:
source /path/to/winternacht/fzf/themes/winternacht.sh

### Fish
Add to `~/.config/fish/config.fish`:
source /path/to/winternacht/fzf/themes/winternacht.fish

### fzf Config File (v0.53+)
Copy to `~/.config/fzf/fzfrc`:
cp /path/to/winternacht/fzf/themes/fzfrc ~/.config/fzf/fzfrc
```

### Color Mapping Strategy

Map Winternacht palette colors to fzf attributes:

| fzf Attribute | Suggested Mapping |
|---------------|-------------------|
| `bg` | Primary background |
| `fg` | Primary foreground/text |
| `bg+` | Selection/highlight background |
| `fg+` | Selection foreground (can match `fg`) |
| `hl` | Match highlight (accent color) |
| `hl+` | Match highlight on selected line (brighter accent) |
| `info` | Secondary/muted text color |
| `prompt` | Accent/brand color |
| `pointer` | Accent color |
| `marker` | Success/green accent |
| `spinner` | Accent color |
| `header` | Muted/secondary text |
| `border` | Border/separator color |
| `gutter` | Match `bg+` or `bg` |

### Checklist Before Publishing

- [ ] Theme file works with Bash, Zsh, and Fish
- [ ] Colors render correctly in true-color terminals
- [ ] Theme looks good with `fzf --preview 'cat {}'`
- [ ] Theme works well with Ctrl-R (history search)
- [ ] Screenshot captured and added to README
- [ ] Uses `$FZF_DEFAULT_OPTS` concatenation pattern
- [ ] fzfrc format provided for v0.53+ users
- [ ] `bg` set to `-1` option documented (for transparent background)
