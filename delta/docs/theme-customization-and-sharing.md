# Delta Theme Customization & Sharing Guide

This document covers how to create custom themes for [delta](https://github.com/dandavison/delta) (a syntax-highlighting pager for git, diff, grep, and blame) and how to share them with the community.

---

## Table of Contents

1. [How Delta Themes Work](#how-delta-themes-work)
2. [Configuration Basics](#configuration-basics)
3. [Built-in Themes](#built-in-themes)
4. [Key Configuration Options](#key-configuration-options)
5. [Creating a Custom Theme](#creating-a-custom-theme)
6. [Using Custom .tmTheme Files](#using-custom-tmtheme-files)
7. [Example Configurations](#example-configurations)
8. [Sharing Themes with the World](#sharing-themes-with-the-world)

---

## How Delta Themes Work

Delta uses two layers of theming:

1. **Syntax Theme** — Controls syntax highlighting colors (code keywords, strings, comments, etc.). Delta uses [bat](https://github.com/sharkdp/bat)'s syntax theme engine, which supports TextMate `.tmTheme` files and Sublime Text color schemes.
2. **Delta UI Theme** — Controls diff-specific styling: background colors for added/removed lines, line number colors, commit/file header styling, blame formatting, etc. This is configured through delta's own options.

A complete delta "theme" is a named **feature** that bundles both syntax theme selection and UI styling options together.

---

## Configuration Basics

Delta is configured in your **`.gitconfig`** (or `~/.config/git/config`). The delta section goes under `[delta]`:

```gitconfig
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true
    side-by-side = true
    syntax-theme = Dracula
    line-numbers = true
```

### Named Features (Themes)

Delta supports named **features** which act as reusable theme bundles. A feature is a section named `[delta "feature-name"]`:

```gitconfig
[delta]
    features = my-custom-theme

[delta "my-custom-theme"]
    syntax-theme = Nord
    minus-style = syntax "#3f2d3d"
    minus-emph-style = syntax "#763842"
    plus-style = syntax "#283b4d"
    plus-emph-style = syntax "#2e5d6e"
    line-numbers = true
```

You can activate a feature by listing it in `features` or by passing `--features my-custom-theme` on the command line.

### Important: `dark` / `light` Flag

A feature **must** include either `dark = true` or `light = true` to be recognized as a "theme" by delta. Without this flag, the feature won't appear in `delta --show-themes` output.

### Author Comment Convention

By convention, themes include an author comment:

```gitconfig
[delta "my-theme"]
    # author: https://github.com/username
    dark = true
    ...
```

---

## Built-in Themes

Delta ships with several built-in themes. To explore them:

```bash
# List all available syntax themes
delta --list-syntax-themes

# Show a demo diff with a specific syntax theme
delta --show-syntax-themes

# List available built-in delta features/themes
delta --show-themes
```

### Notable Built-in Themes

| Theme | Description |
|-------|-------------|
| `collared-trogon` | Vivid, colorful diff theme |
| `coracias-caudatus` | Soft blue/green theme |
| `villsau` | Warm, earthy tones |
| `woolly-mammoth` | Dark theme with muted colors |
| `tangara-chilensis` | Bright, tropical colors |
| `chameleon` | Adapts based on terminal background |
| `calochortus-lyallii` | Light theme |
| `mantis-shrimp` | High-contrast, vivid theme |
| `zebra-dark` | Dark theme with alternating background lines |

---

## Key Configuration Options

### Diff Styling

| Option | Description | Example |
|--------|-------------|---------|
| `syntax-theme` | Syntax highlighting theme | `Dracula`, `Nord`, `OneHalfDark` |
| `minus-style` | Style for removed lines | `syntax "#3f2d3d"` |
| `minus-emph-style` | Style for emphasized removed text | `syntax "#763842"` |
| `plus-style` | Style for added lines | `syntax "#283b4d"` |
| `plus-emph-style` | Style for emphasized added text | `syntax "#2e5d6e"` |
| `zero-style` | Style for unchanged context lines | `syntax` |
| `whitespace-error-style` | Style for whitespace errors | `reverse red` |

### Layout Options

| Option | Description | Example |
|--------|-------------|---------|
| `side-by-side` | Side-by-side diff view | `true` |
| `line-numbers` | Show line numbers | `true` |
| `navigate` | Enable n/N navigation between files | `true` |
| `dark` / `light` | Hint for auto-detecting terminal background | `true` |

### Line Number Styling

| Option | Description |
|--------|-------------|
| `line-numbers-minus-style` | Color for removed line numbers |
| `line-numbers-plus-style` | Color for added line numbers |
| `line-numbers-zero-style` | Color for unchanged line numbers |
| `line-numbers-left-style` | Style for left line number column border |
| `line-numbers-right-style` | Style for right line number column border |
| `line-numbers-left-format` | Format string for left line numbers |
| `line-numbers-right-format` | Format string for right line numbers |

### Header Styling

| Option | Description |
|--------|-------------|
| `file-style` | Style for file name headers |
| `file-decoration-style` | Decoration (underline, box, etc.) for file headers |
| `hunk-header-style` | Style for hunk headers (`@@ ... @@`) |
| `hunk-header-decoration-style` | Decoration for hunk headers |
| `commit-style` | Style for commit hash lines |
| `commit-decoration-style` | Decoration for commit lines |

### Blame Styling

| Option | Description |
|--------|-------------|
| `blame-palette` | Space-separated list of background colors for blame |
| `blame-format` | Format string for blame metadata |

### Style Value Syntax

Style values follow the format: `[foreground] [background] [attributes]`

- **Colors**: Named colors (`red`, `green`), hex (`"#ff0000"`), ANSI 256 (`"128"`), or `syntax` (keep syntax highlighting)
- **Attributes**: `bold`, `italic`, `underline`, `strikethrough`, `reverse`, `dim`
- **Decorations**: `underline`, `overline`, `box`, `none`, `omit`

Examples:
```
red                         # Red foreground
red "#1e1e2e"               # Red foreground, dark background
syntax "#1e1e2e"            # Syntax highlighting with dark background
bold yellow ul              # Bold yellow with underline
"#88c0d0" "#2e3440" bold    # Nord-style with bold
```

---

## Creating a Custom Theme

### Step-by-Step Process

1. **Choose a syntax theme** — Run `delta --list-syntax-themes` and pick one, or use a custom `.tmTheme`.

2. **Define your color palette** — Choose hex colors for:
   - Removed line background
   - Removed line emphasis (word-level diff) background
   - Added line background
   - Added line emphasis background
   - Line number colors
   - Header decorations

3. **Create a named feature** in `.gitconfig`:

```gitconfig
[delta "winternacht"]
    # Syntax highlighting
    syntax-theme = Nord

    # Dark mode hint
    dark = true

    # Diff colors
    minus-style = syntax "#3b1d2e"
    minus-emph-style = syntax "#6b2035"
    plus-style = syntax "#1d2e3b"
    plus-emph-style = syntax "#20506b"
    zero-style = syntax

    # Line numbers
    line-numbers = true
    line-numbers-minus-style = "#b04050"
    line-numbers-plus-style = "#40b080"
    line-numbers-zero-style = "#555577"

    # File headers
    file-style = bold "#88c0d0"
    file-decoration-style = "#88c0d0" ul
    hunk-header-style = syntax bold italic
    hunk-header-decoration-style = "#5e81ac" box

    # Commit info
    commit-style = bold "#ebcb8b"
    commit-decoration-style = "#ebcb8b" box

    # Blame
    blame-palette = "#1a1b26 #1f2335 #24283b #292e42"

    # Navigation
    navigate = true
```

4. **Activate the theme**:

```gitconfig
[delta]
    features = winternacht
```

5. **Test** by running `git diff`, `git log -p`, `git blame`, etc.

### Tips for Good Theme Design

- Use `syntax` as the foreground to preserve syntax highlighting while changing backgrounds
- Keep background colors subtle — high contrast backgrounds distract from the code
- Test with multiple languages and file types
- Test both `git diff` and `git log -p` output
- Test with `side-by-side = true` and `false`
- Consider creating both dark and light variants

---

## Using Custom .tmTheme Files

Delta can use custom TextMate `.tmTheme` files for syntax highlighting:

1. **Place the .tmTheme file** anywhere accessible:
   ```
   ~/.config/delta/themes/MyTheme.tmTheme
   ```

2. **Reference it by path** in your config:
   ```gitconfig
   [delta]
       syntax-theme = /path/to/MyTheme.tmTheme
   ```

3. **Or add it to bat's theme directory** for named access:
   ```bash
   mkdir -p "$(bat --config-dir)/themes"
   cp MyTheme.tmTheme "$(bat --config-dir)/themes/"
   bat cache --build
   # Now you can reference it by name
   ```

   ```gitconfig
   [delta]
       syntax-theme = MyTheme
   ```

### Creating a .tmTheme File

TextMate theme files are XML-based plist files. You can:

- Convert from VS Code themes using [tm-theme-generator](https://github.com/nickcernis/tm-theme-generator)
- Create one from scratch (the format is well-documented in TextMate docs)
- Use existing `.tmTheme` files from [tmTheme-Editor](https://tmtheme-editor.glitch.me/)

---

## Example Configurations

### Minimal Dark Theme

```gitconfig
[delta "minimal-dark"]
    syntax-theme = OneHalfDark
    dark = true
    minus-style = syntax "#340001"
    plus-style = syntax "#012800"
    line-numbers = true
    navigate = true
```

### Nord-Inspired Theme

```gitconfig
[delta "nord-delta"]
    syntax-theme = Nord
    dark = true
    minus-style = syntax "#3b2c3a"
    minus-emph-style = syntax "#6b3a4a"
    plus-style = syntax "#2c3b3a"
    plus-emph-style = syntax "#3a6b5a"
    line-numbers = true
    line-numbers-minus-style = "#bf616a"
    line-numbers-plus-style = "#a3be8c"
    line-numbers-zero-style = "#4c566a"
    file-style = bold "#88c0d0"
    file-decoration-style = "#88c0d0" ul
    hunk-header-style = syntax italic
    hunk-header-decoration-style = "#5e81ac" box ul
    commit-style = bold "#ebcb8b"
    commit-decoration-style = "#ebcb8b" box
    navigate = true
    side-by-side = true
```

### Catppuccin Mocha Style

```gitconfig
[delta "catppuccin-mocha"]
    syntax-theme = Catppuccin Mocha
    dark = true
    minus-style = syntax "#53394c"
    minus-emph-style = syntax "#894465"
    plus-style = syntax "#2e4437"
    plus-emph-style = syntax "#3e7352"
    line-numbers = true
    line-numbers-minus-style = "#f38ba8"
    line-numbers-plus-style = "#a6e3a1"
    line-numbers-zero-style = "#585b70"
    file-style = bold "#89dceb"
    file-decoration-style = "#89dceb" ul
    navigate = true
```

---

## Sharing Themes with the World

### Method 1: Contributing to the Delta Project (Upstream)

The most impactful way to share a theme is contributing it directly to [dandavison/delta](https://github.com/dandavison/delta). The official theme collection lives in [`themes.gitconfig`](https://github.com/dandavison/delta/blob/main/themes.gitconfig) at the repo root.

**Upstream naming convention:** Theme names **must be the name of a wild organism** (mammal, bird, plant, mollusk, etc.) in any language. Examples: `hoopoe`, `woolly-mammoth`, `villsau` (Norwegian sheep breed), `collared-trogon`, `kingfisher`. A brand name like "Winternacht" would not qualify — you'd need to submit under a different organism-based name, or discuss with the maintainer.

**Process:**

1. **Fork** the delta repository
2. Add your theme to `themes.gitconfig`
3. **Submit a Pull Request** with:
   - A **screenshot** showing the theme in action
   - Info about your **terminal theme/colors** used with it
   - The theme definition (must include `dark = true` or `light = true`)
4. Follow the project's contribution guidelines

**Browsing existing upstream themes:**
- `delta --show-themes` — live preview all themes in your terminal
- Browse [theme PR history](https://github.com/dandavison/delta/commits/main/themes.gitconfig) — PRs nearly always include screenshots

**Users install upstream themes by:**
```gitconfig
[include]
    path = /path/to/delta/themes.gitconfig
[delta]
    features = kingfisher
```
Or download directly:
```bash
wget -O ~/delta-themes.gitconfig https://raw.githubusercontent.com/dandavison/delta/main/themes.gitconfig
```

### Method 2: Dotfiles Repository

Share your theme as part of your dotfiles:

1. Include the delta configuration in your `.gitconfig` or a dedicated delta config include file
2. Add documentation with screenshots
3. Use git config includes to keep things modular:

```gitconfig
# ~/.gitconfig
[include]
    path = ~/.config/delta/themes/winternacht.gitconfig
```

```gitconfig
# ~/.config/delta/themes/winternacht.gitconfig
[delta "winternacht"]
    syntax-theme = Nord
    minus-style = syntax "#3b1d2e"
    # ... rest of theme
```

### Method 3: Standalone Theme Repository

Create a dedicated repository for your delta theme. A well-known example is [catppuccin/delta](https://github.com/catppuccin/delta) (~100 stars), which provides multiple flavor variants with screenshots for each.

**Recommended structure:**

```
my-delta-theme/
  README.md              # Description, screenshots, installation instructions
  themes.gitconfig       # The theme configuration
  screenshots/
    diff.png
    log.png
    blame.png
    side-by-side.png
  install.sh             # Optional: automated installation script
  LICENSE                # MIT or similar
```

**For multi-app theme suites** (like Winternacht), keeping the delta theme within the main project repo (e.g., `delta/winternacht.gitconfig`) makes more sense than a separate repo.

#### README Template

```markdown
# My Delta Theme

A [delta](https://github.com/dandavison/delta) theme inspired by ...

## Screenshots

### git diff
![diff](screenshots/diff.png)

### git log -p
![log](screenshots/log.png)

## Installation

1. Copy the theme configuration to your `.gitconfig`:
   ```bash
   cat themes.gitconfig >> ~/.gitconfig
   ```

2. Activate the theme:
   ```gitconfig
   [delta]
       features = my-theme-name
   ```

## Requirements
- [delta](https://github.com/dandavison/delta) >= 0.16.0
```

#### Installation Script Example

```bash
#!/bin/bash
# install.sh
THEME_FILE="themes.gitconfig"

if ! command -v delta &> /dev/null; then
    echo "Error: delta is not installed"
    exit 1
fi

# Append theme to gitconfig
cat "$THEME_FILE" >> ~/.gitconfig
echo "Theme installed! Add 'features = my-theme-name' to your [delta] section."
```

### Method 4: Community Collections

Several community collections aggregate delta themes:

- **[dandavison/delta themes directory](https://github.com/dandavison/delta/blob/main/themes.gitconfig)** — The official themes file in the delta repo
- **GitHub Topics** — Tag your repository with `delta-theme`, `git-delta`, `delta-pager` for discoverability
- **Blog posts and articles** — Write about your theme on dev.to, Medium, or your personal blog
- **Reddit** — Share on r/commandline, r/unixporn, r/git

### Best Practices for Sharing

1. **Include screenshots** — Show `git diff`, `git log -p`, `git blame`, and side-by-side mode
2. **Specify the delta version** your theme was tested with
3. **Provide clear installation instructions** — Include both manual and automated options
4. **Document all options** — Explain what each setting does and why you chose it
5. **Test on multiple terminals** — Verify your theme looks good on iTerm2, Alacritty, Ghostty, kitty, WezTerm, etc.
6. **Consider both dark and light modes** — Provide variants if possible
7. **Include the full `.gitconfig` snippet** — Users should be able to copy-paste directly
8. **License your theme** — MIT or similar permissive license is standard
9. **If using a custom `.tmTheme`** — Include it in the repo and document the bat cache build step

### Sharing Checklist

- [ ] Theme works with latest delta version
- [ ] Screenshots for diff, log, blame, and side-by-side
- [ ] Clear installation instructions
- [ ] All color values use hex codes (most portable)
- [ ] Tested on multiple terminal emulators
- [ ] README with description, screenshots, and install steps
- [ ] Appropriate license file
- [ ] Tagged with relevant GitHub topics for discoverability

---

## References

- [Delta GitHub Repository](https://github.com/dandavison/delta)
- [Delta Manual](https://dandavison.github.io/delta/)
- [Delta Custom Themes Documentation](https://dandavison.github.io/delta/custom-themes.html)
- [Delta Themes File (official collection)](https://github.com/dandavison/delta/blob/main/themes.gitconfig)
- [catppuccin/delta](https://github.com/catppuccin/delta) — Example standalone theme repo
- [bat Themes Documentation](https://github.com/sharkdp/bat#adding-new-themes)
- [TextMate Theme Format](https://macromates.com/manual/en/themes)
- [tmTheme-Editor](https://tmtheme-editor.glitch.me/) — Online .tmTheme editor
