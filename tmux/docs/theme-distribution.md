# tmux Theme Distribution Guide

## 1. TPM (Tmux Plugin Manager)

TPM is the de facto plugin manager for tmux. It manages plugins as Git repositories.

### How TPM Works

**Installation of TPM itself:**

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Add to the **end** of `~/.tmux.conf`:

```tmux
run '~/.tmux/plugins/tpm/tpm'
```

**Plugin declaration syntax:**

```tmux
set -g @plugin 'github_username/repository_name'
set -g @plugin 'github_username/repository_name#tag'  # specific version
```

**Key bindings:**

- `prefix + I` — Install new plugins (clones from GitHub, sources them)
- `prefix + U` — Update plugins
- `prefix + Alt + U` — Remove unlisted plugins

**Default plugin storage location:**

- `~/.tmux/plugins/` (default)
- `$XDG_CONFIG_HOME/tmux/plugins/` (if tmux.conf is at XDG location)
- Configurable via `set-environment -g TMUX_PLUGIN_MANAGER_PATH '/custom/path/'`

**How TPM loads plugins:**

TPM automatically executes **all `*.tmux` files** found in a plugin's root directory. This is the core loading mechanism — no special file naming required beyond the `.tmux` extension.

### TPM Plugin Structure Requirements

For a theme to work as a TPM plugin:

1. Must be a **git repository** (TPM uses git for management)
2. Must have at least one **executable `*.tmux` file** in the root
3. The `*.tmux` file is a bash script that configures tmux via `tmux set-option` commands

## 2. Plugin Entry Point: The `.tmux` File

The main entry point is an executable shell script with `.tmux` extension:

```bash
#!/usr/bin/env bash
# mytheme.tmux

CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Read user options
flavor=$(tmux show-option -gqv "@mytheme_flavor")
flavor=${flavor:-"default"}

# Source theme configuration
tmux source-file "$CURRENT_DIR/src/${flavor}.conf"

# Or run a setup script
bash "$CURRENT_DIR/scripts/setup.sh"
```

The file must be made executable: `chmod u+x mytheme.tmux`

## 3. Manual Installation (Without TPM)

### Method A: `source-file` Directive

For static `.conf` or `.tmuxtheme` files:

```tmux
# In ~/.tmux.conf
source-file "${HOME}/.config/tmux/plugins/mytheme/mytheme.tmux"
```

### Method B: `run` / `run-shell` Directive

For shell-script entry points:

```tmux
# In ~/.tmux.conf
run ~/.config/tmux/plugins/catppuccin/tmux/catppuccin.tmux
```

### Difference Between `source-file` and `run-shell`

- **`source-file`** — Reads and executes a tmux configuration file directly (tmux commands only)
- **`run-shell`** — Executes a shell command; used for scripts with bash logic, can then call `tmux source-file` internally
- For dynamic theme loading, they can be combined: `run-shell "tmux source-file ~/.tmux.${TMUX_THEME:-default}.theme"`

## 4. Repository Structure Conventions

Most popular themes follow this structure:

```
theme-name/
├── theme-name.tmux          # Main TPM entry point (executable)
├── README.md                # Documentation with screenshots
├── LICENSE                  # Usually MIT
├── CHANGELOG.md             # Version history
├── CONTRIBUTING.md          # Contribution guidelines
├── .github/                 # GitHub Actions, issue templates
├── scripts/                 # Supporting shell scripts
├── src/                     # Source files, variant configs
├── docs/                    # Extended documentation, CONFIG.md
└── assets/                  # Preview screenshots, demo images
```

### Naming Conventions for the Entry Point

- `catppuccin.tmux` (catppuccin/tmux)
- `dracula.tmux` (dracula/tmux)
- `nord.tmux` (nordtheme/tmux)
- `tokyo-night.tmux` (janoamaral/tokyo-night-tmux)

Pattern: `{theme-name}.tmux`

## 5. Popular Theme Examples

### Catppuccin (`catppuccin/tmux`)

- **TPM:** `set -g @plugin 'catppuccin/tmux#v2.1.3'`
- **Manual:** `run ~/.config/tmux/plugins/catppuccin/tmux/catppuccin.tmux`
- **Config variables:** `@catppuccin_flavor`, `@catppuccin_window_status_style`
- Recommends manual install to avoid TPM naming conflicts
- Supports flavors: latte, frappe, macchiato, mocha

### Dracula (`dracula/tmux`)

- **TPM:** `set -g @plugin 'dracula/tmux'`
- Entry point: `dracula.tmux`
- Color theming in `docs/color_theming/` subdirectory
- Scripts directory for custom plugin scripts
- 100% shell scripting

### Nord (`nordtheme/tmux`)

- **TPM:** `set -g @plugin 'nordtheme/tmux'`
- Entry point: `nord.tmux`
- Uses JavaScript + Shell (JavaScript for build tooling)
- Config: `@nord_tmux_show_status_content`, `@nord_tmux_no_patched_font`

### Tokyo Night (`janoamaral/tokyo-night-tmux`)

- **TPM:** `set -g @plugin 'janoamaral/tokyo-night-tmux'`
- Entry point: `tokyo-night.tmux`
- Directories: `lib/`, `src/`, `test/`
- Requires bash 4.2+
- Config: `@tokyo-night-tmux_theme` (storm/day/night), `@tokyo-night-tmux_transparent`

### tmux-themepack (`jimeh/tmux-themepack`)

- Uses `.tmuxtheme` file extension for theme files
- Themes selectable via `@themepack` option
- Manual: `source-file "${HOME}/.tmux-themepack/powerline/default/green.tmuxtheme"`

## 6. User Configuration with `@variables`

### Pattern

tmux supports user options prefixed with `@`. These are the standard mechanism for theme configuration:

```tmux
# In ~/.tmux.conf — BEFORE the plugin line
set -g @catppuccin_flavor "mocha"
set -g @catppuccin_window_status_style "rounded"
set -g @tokyo-night-tmux_theme "storm"
set -g @tokyo-night-tmux_transparent 1
set -g @nord_tmux_no_patched_font "1"

# Then the plugin declaration
set -g @plugin 'catppuccin/tmux'
```

**Critical:** Configuration variables must be set **before** the `@plugin` declaration and before `run tpm`. Otherwise they may not be applied when the theme loads.

### Reading Variables in Theme Scripts

```bash
# In theme's .tmux script
flavor=$(tmux show-option -gqv "@catppuccin_flavor")
flavor=${flavor:-"mocha"}  # default value fallback
```

### Namespacing Convention

Variables are namespaced with the theme name:

- `@catppuccin_*` for catppuccin
- `@dracula-*` for dracula
- `@tokyo-night-tmux_*` for tokyo-night
- `@nord_tmux_*` for nord

## 7. Installation Instruction Patterns

Popular themes document installation with these sections:

1. **Requirements** — tmux version, nerd font requirement
2. **TPM installation** — `set -g @plugin '...'` snippet
3. **Manual installation** — clone + run/source commands
4. **Configuration** — table of `@variables` with values and defaults
5. **Screenshots/Preview** — embedded images in README

Example README pattern:

```markdown
## Installation

### TPM
Add to `~/.tmux.conf`:
```tmux
set -g @plugin 'author/theme-name'
```
Then press `prefix + I`.

### Manual
```bash
git clone https://github.com/author/theme-name ~/.config/tmux/plugins/theme-name
```
Add to `~/.tmux.conf`:
```tmux
run ~/.config/tmux/plugins/theme-name/theme-name.tmux
```

## Configuration
Set these **before** the plugin declaration:
```tmux
set -g @theme_option "value"
```
```

## 8. GitHub Repository Conventions

### Topics/Tags

Repositories commonly use these GitHub topics:

- `tmux`, `tmux-plugin`, `tmux-theme`, `tmux-themes`
- `colorscheme`, `color-scheme`, `colors`, `theme`
- `tpm`, `tmux-plugins`
- Tool-specific: `neovim`, `vim`, `terminal`

### Repository Naming Patterns

- `{theme-name}-tmux` (e.g., `tokyo-night-tmux`, `onedark-tmux`)
- `tmux-{theme-name}` (e.g., `tmux-power`, `tmux-themepack`)
- `{theme-name}/tmux` as org/repo (e.g., `catppuccin/tmux`, `dracula/tmux`)

### README Conventions

- Badges: license, tmux version, stars, language
- Screenshots/GIFs showing the theme in action
- Clear TPM + manual installation sections
- Configuration table with all `@variables`

### File Conventions

- `LICENSE` — typically MIT license in root
- `CHANGELOG.md` — version history
- `CONTRIBUTING.md` — contribution guidelines
- `.github/` — Actions CI, issue templates, PR templates

## 9. License and Attribution

### Common Licenses

- **MIT** — Most common (catppuccin, dracula, tokyo-night, nord)
- **GPL** — Less common
- License file always in repository root as `LICENSE` or `LICENSE.md`

### Attribution Conventions

- MIT license includes copyright year and author name
- CHANGELOG.md documents version history
- README credits contributors and inspirations
- Some themes (like Dracula) are part of larger cross-editor theme organizations

## 10. Applying to Winternacht: Recommended Structure

For the Winternacht tmux theme distributed via TPM, the recommended structure would be:

```
winternacht-tmux/           # or suin/tmux in a monorepo
├── winternacht.tmux        # Required: executable entry point
├── README.md               # Required: installation docs + screenshots
├── LICENSE                 # Required: MIT license
├── CHANGELOG.md            # Recommended: version history
├── scripts/                # Optional: helper scripts
│   └── helpers.sh
└── src/                    # Optional: variant configs
    └── winternacht.conf
```

### Minimal Entry Point (`winternacht.tmux`)

```bash
#!/usr/bin/env bash
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Read user options with defaults
option=$(tmux show-option -gqv "@winternacht_option")
option=${option:-"default_value"}

# Apply theme settings
tmux set-option -gq status-style "bg=#1a1b26,fg=#c0caf5"
# ... more tmux set-option commands
```

### User's `~/.tmux.conf`

```tmux
# Set options before plugin
set -g @winternacht_option "value"

# TPM installation
set -g @plugin 'suin/winternacht-tmux'
run '~/.tmux/plugins/tpm/tpm'

# OR manual installation
run ~/.config/tmux/plugins/winternacht-tmux/winternacht.tmux
```

## References

- [TPM GitHub](https://github.com/tmux-plugins/tpm)
- [TPM Creating Plugins](https://github.com/tmux-plugins/tpm/blob/master/docs/how_to_create_plugin.md)
- [Catppuccin tmux](https://github.com/catppuccin/tmux)
- [Dracula tmux](https://github.com/dracula/tmux)
- [Nord tmux](https://github.com/nordtheme/tmux)
- [Tokyo Night tmux](https://github.com/janoamaral/tokyo-night-tmux)
- [tmux-themepack](https://github.com/jimeh/tmux-themepack)
- [awesome-tmux](https://github.com/rothgar/awesome-tmux)
- [Nord tmux configuration docs](https://www.nordtheme.com/docs/ports/tmux/configuration)
