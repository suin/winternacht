# Starship Color Theme Customization: A Comprehensive Guide

## Table of Contents

1. [Overview](#overview)
2. [Configuration File](#configuration-file)
3. [Color Specification Methods](#color-specification-methods)
4. [Style Strings](#style-strings)
5. [Per-Module Color Customization](#per-module-color-customization)
6. [Palette Feature](#palette-feature)
7. [Format Strings and Styling](#format-strings-and-styling)
8. [Preset Themes](#preset-themes)
9. [Sharing Your Customization with the World](#sharing-your-customization-with-the-world)
10. [References](#references)

---

## Overview

[Starship](https://starship.rs/) is a minimal, blazing-fast, and infinitely customizable cross-shell prompt written in Rust. It works with Bash, Zsh, Fish, PowerShell, Elvish, Tcsh, Nushell, Xonsh, and Cmd. Its color theming system is powerful and flexible, offering named colors, ANSI 256, full hex RGB support, a palette system for color scheme switching, and a growing collection of community presets.

---

## Configuration File

### Location

Starship reads its configuration from a single TOML file:

```
~/.config/starship.toml
```

This path can be overridden via the `STARSHIP_CONFIG` environment variable:

```bash
# Bash / Zsh / Fish
export STARSHIP_CONFIG=~/path/to/starship.toml

# PowerShell
$ENV:STARSHIP_CONFIG = "$HOME\path\starship.toml"

# Cmd (via starship.lua)
os.setenv('STARSHIP_CONFIG', 'C:\\Users\\user\\path\\starship.toml')
```

### Architecture

- **Modules** are individual prompt components (git status, directory, language versions, etc.)
- **Variables** are subcomponents within modules containing specific data values
- Each module has configurable `format`, `style`, `symbol`, `disabled`, and detection properties

---

## Color Specification Methods

Starship supports three color specification methods.

### Named Colors (16 Terminal Colors)

Standard terminal colors and their bright variants:

| Standard | Bright |
|----------|--------|
| `black` | `bright-black` |
| `red` | `bright-red` |
| `green` | `bright-green` |
| `yellow` | `bright-yellow` |
| `blue` | `bright-blue` |
| `purple` | `bright-purple` |
| `cyan` | `bright-cyan` |
| `white` | `bright-white` |

These map to the terminal's own color definitions, providing portability across themes.

### ANSI 256 Color Codes

Numeric references from 0 to 255:

- **0-15**: Standard and bright colors
- **16-231**: 6x6x6 RGB color cube (216 colors)
- **232-255**: Grayscale ramp (24 shades)

```toml
style = "fg:27"        # ANSI color 27 (a blue)
style = "bg:196"       # ANSI color 196 (a red) as background
style = "bold fg:208"  # Bold with ANSI 208 (an orange)
```

### Hexadecimal RGB Colors

Full 24-bit true color using `#RRGGBB` notation:

```toml
style = "fg:#bf5700"       # Burnt orange foreground
style = "bg:#1e1e1e"       # Dark gray background
style = "fg:#00d4ff bold"  # Bright cyan, bold
```

> **Note:** Hex colors are converted to the closest ANSI equivalent on terminals that only support 256 colors.

---

## Style Strings

Style strings are the core mechanism for visual customization. They are **space-separated**, **case-insensitive** directives.

### Color Directives

| Directive | Meaning |
|-----------|---------|
| `fg:<color>` | Set foreground color explicitly |
| `bg:<color>` | Set background color explicitly |
| `<color>` | Shorthand for foreground (when no `fg:` prefix) |

When multiple color specifications appear, **the last one wins**.

### Text Attribute Directives

| Attribute | Effect |
|-----------|--------|
| `bold` | Increased text intensity / heavy weight |
| `italic` | Slanted text (requires terminal support) |
| `underline` | Horizontal line under text |
| `dimmed` | Reduced text intensity / faint |
| `inverted` | Swaps foreground and background colors |
| `blink` | Blinking text (rarely supported by terminals) |
| `hidden` | Text rendered same color as background |
| `strikethrough` | Horizontal line through text |

### The `none` Token

- `none` overrides all other tokens in the string if it is not part of a `bg:` specifier
- `bg:none` sets the background to the terminal's default
- An empty string `""` explicitly disables all styling

### Examples

```toml
style = "bold"                               # Just bold
style = "fg:green"                           # Green foreground
style = "fg:green bg:blue"                   # Green text on blue background
style = "bold fg:27"                         # Bold with ANSI color 27
style = "underline bg:#bf5700"               # Underlined with burnt orange background
style = "bold italic fg:#ff0000 underline"   # Multiple combined
style = ""                                   # No styling
style = "none"                               # Override/disable all styling
```

### Terminal Compatibility Notes

- Italic support varies by terminal emulator
- Bold and dimmed appearance depends on the terminal theme
- Blink is rarely supported
- Bright colors may render as bold on some terminals

---

## Per-Module Color Customization

### Universal `style` Property

Every module has a `style` property accepting a style string:

```toml
[character]
style = "bold green"

[directory]
style = "bold cyan"

[git_branch]
style = "bold purple"

[git_status]
style = "bold red"

[nodejs]
style = "bold green"

[python]
style = "bold yellow"

[rust]
style = "bold red"
```

### State-Specific Style Fields

Many modules provide multiple style fields for different states.

#### Character Module

Different styles based on command success/failure and vim modes:

```toml
[character]
success_symbol = "[❯](bold green)"
error_symbol = "[❯](bold red)"
vimcmd_symbol = "[❮](bold green)"
vimcmd_replace_one_symbol = "[❮](bold purple)"
vimcmd_replace_symbol = "[❮](bold purple)"
vimcmd_visual_symbol = "[❮](bold yellow)"
```

#### Directory Module

Separate styling for different path components:

```toml
[directory]
style = "bold cyan"
read_only_style = "red"
before_repo_root_style = "dimmed cyan"
repo_root_style = "bold cyan"
repo_root_format = "[$before_root_path]($before_repo_root_style)[$repo_root]($repo_root_style)[$path]($style)[$read_only]($read_only_style) "
```

#### Git Status Module

Each indicator can include inline styling:

```toml
[git_status]
style = "bold red"
conflicted = "="
ahead = "⇡"
behind = "⇣"
diverged = "⇕"
untracked = "?"
stashed = "\\$"
modified = "!"
staged = "[++\\($count\\)](green)"  # Inline green styling for staged count
renamed = "»"
deleted = "✘"
```

#### Other Modules with Multiple Style Fields

- `username`: `style_user`, `style_root`
- `battery`: Different styles per charge level via `display` thresholds
- Language modules: `style` plus inline format string styles

---

## Palette Feature

The palette system lets you define named color sets and switch between them with a single line change.

### Defining Palettes

Palettes are defined under `[palettes.<name>]` TOML tables:

```toml
# Select the active palette
palette = "catppuccin_mocha"

[palettes.catppuccin_mocha]
rosewater = "#f5e0dc"
flamingo = "#f2cdcd"
pink = "#f5c2e7"
mauve = "#cba6f7"
red = "#f38ba8"
maroon = "#eba0ac"
peach = "#fab387"
yellow = "#f9e2af"
green = "#a6e3a1"
teal = "#94e2d5"
sky = "#89dceb"
sapphire = "#74c7ec"
blue = "#89b4fa"
lavender = "#b4befe"
text = "#cdd6f4"
subtext1 = "#bac2de"
subtext0 = "#a6adc8"
overlay2 = "#9399b2"
overlay1 = "#7f849c"
overlay0 = "#6c7086"
surface2 = "#585b70"
surface1 = "#45475a"
surface0 = "#313244"
base = "#1e1e2e"
mantle = "#181825"
crust = "#11111b"

[palettes.dracula]
foreground = "#f8f8f2"
background = "#282a36"
current_line = "#44475a"
comment = "#6272a4"
cyan = "#8be9fd"
green = "#50fa7b"
orange = "#ffb86c"
pink = "#ff79c6"
purple = "#bd93f9"
red = "#ff5555"
yellow = "#f1fa8c"

[palettes.gruvbox_dark]
fg0 = "#fbf1c7"
bg0 = "#282828"
red = "#cc241d"
green = "#98971a"
yellow = "#d79921"
blue = "#458588"
purple = "#b16286"
aqua = "#689d6a"
orange = "#d65d0e"
```

### Using Palette Colors

Once a palette is active, reference its color names in any style string:

```toml
palette = "catppuccin_mocha"

[directory]
style = "bold lavender"  # Resolves to #b4befe

[git_branch]
style = "bold mauve"     # Resolves to #cba6f7

[python]
style = "fg:yellow"      # Resolves to #f9e2af (overrides terminal yellow)
```

### Overriding Standard Color Names

Palettes can redefine standard terminal color names:

```toml
[palettes.custom]
blue = "21"       # ANSI code 21 instead of terminal default blue
red = "#ff6666"   # Custom hex instead of terminal default red
```

### Switching Between Palettes

Change the root-level `palette` value to switch the entire color scheme:

```toml
palette = "dracula"
# palette = "gruvbox_dark"
# palette = "catppuccin_mocha"
```

### Mixing Palette and Literal Colors

You can combine palette references with direct color specifications:

```toml
[directory]
style = "fg:lavender bg:#1e1e1e bold"
# "lavender" resolves via palette, "#1e1e1e" is a literal hex value
```

### Important Limitation

**Palette colors cannot reference other palette colors.** All values must be literal (named color, hex, or ANSI code).

```toml
# INVALID - self-reference does not work
[palettes.broken]
primary = "#ff0000"
accent = "primary"     # ERROR

# VALID - all values are literal
[palettes.valid]
primary = "#ff0000"
accent = "#00ff00"
```

### Color Resolution Order

1. The active palette is determined from the `palette` field
2. For each color name in a style string:
   - If a palette is active and the name exists in the palette, the palette value is used
   - Otherwise, the name is treated as a literal color (named, hex, or ANSI code)
3. Styles are converted to ANSI escape sequences during rendering

---

## Format Strings and Styling

### Top-Level Prompt Format

The root `format` key controls module ordering. The default is `$all`:

```toml
format = """
$username\
$hostname\
$directory\
$git_branch\
$git_status\
$nodejs\
$python\
$rust\
$character"""

# Right-aligned prompt (fish, zsh, elvish, nushell, bash with ble.sh)
right_format = """$cmd_duration $time"""

# Continuation prompt (bash, zsh, PowerShell)
continuation_prompt = "[∙](bright-black) "
```

### Inline Styling with Text Groups: `[content](style)`

```toml
# Static styled text
format = "[on](red bold)"

# Variable with styled wrapper
format = "[⌘ $version](bold green)"

# Powerline-style colored segments
format = "[░▒▓](#a3aed2)[  $path ](bg:#769ff0 fg:#e3e5e5)[](fg:#769ff0 bg:#394260)"
```

### Conditional Rendering: `(content)`

Parenthesized content is hidden when all contained variables are empty:

```toml
format = "($region)"              # Only shown when $region has a value
format = "($profile )(@$region )" # Hidden if both are empty
```

### Escaping Special Characters

```toml
format = "cost: \\$100"                 # Literal dollar sign
format = "[\\[git\\]](bold green)"      # Literal brackets
format = "[staged: \\($count\\)](green)" # Literal parentheses
```

### Nested Style Groups

Inner groups can override outer styles:

```toml
# "prefix" is bold; "inner" is bold + red
format = "[prefix [inner](red)](bold)"
```

### Comprehensive Example: Tokyo Night Style

```toml
format = """
[░▒▓](#a3aed2)\
[$directory](bg:#769ff0 fg:#e3e5e5)\
[](fg:#769ff0 bg:#394260)\
[$git_branch$git_status](bg:#394260 fg:#769ff0)\
[](fg:#394260 bg:#212736)\
[$nodejs$rust$golang$php](bg:#212736 fg:#769ff0)\
[](fg:#212736 bg:#1d2230)\
[$time](bg:#1d2230 fg:#a3aed2)\
[ ](fg:#1d2230)\
\n$character"""
```

---

## Preset Themes

### Available Official Presets

Starship ships with 12+ community-contributed presets compiled into the binary:

| Preset | Description |
|--------|-------------|
| **Nerd Font Symbols** | Replaces all module symbols with Nerd Font glyphs |
| **No Nerd Fonts** | Removes Nerd Font symbols entirely |
| **Bracketed Segments** | Wraps module output in brackets |
| **Plain Text Symbols** | Unicode/ASCII only, no special fonts needed |
| **No Runtime Versions** | Hides language version numbers |
| **No Empty Icons** | Hides icons when toolsets are not detected |
| **Pure Prompt** | Emulates the Pure shell prompt |
| **Pastel Powerline** | Powerline-style, inspired by M365Princess theme |
| **Tokyo Night** | Layered colored segments inspired by the VS Code theme |
| **Gruvbox Rainbow** | Rainbow Powerline with Gruvbox colors |
| **Jetpack** | Pseudo-minimalist two-line prompt |
| **Catppuccin Powerline** | Pastel aesthetic using the Catppuccin palette |

### CLI Commands

```bash
# List all available presets
starship preset --list

# Preview a preset (prints TOML to stdout)
starship preset nerd-font-symbols

# Apply a preset to your config file
starship preset tokyo-night -o ~/.config/starship.toml

# Other examples
starship preset gruvbox-rainbow -o ~/.config/starship.toml
starship preset catppuccin-powerline -o ~/.config/starship.toml
```

### How Presets Work Internally

- Presets are TOML files stored in `docs/public/presets/toml/` in the repository
- They are compiled into the binary at build time
- Selection uses Rust's `ValueEnum` derive for type-safe validation
- Zero runtime filesystem dependency

### Downloading Presets Directly

```bash
curl -o ~/.config/starship.toml \
  https://raw.githubusercontent.com/starship/starship/master/docs/public/presets/toml/tokyo-night.toml
```

---

## Sharing Your Customization with the World

### Method 1: Contributing an Official Preset

Submit a pull request to [starship/starship](https://github.com/starship/starship) with these files:

1. **`docs/public/presets/toml/<preset-name>.toml`** -- The complete configuration
2. **`docs/presets/<preset-name>.md`** -- Documentation with description, prerequisites, and install instructions
3. **`docs/public/presets/img/<preset-name>.png`** -- Screenshot showing the preset
4. **`docs/presets/README.md`** -- Update the main listing to include the new preset

The documentation file typically includes:

```markdown
# <Preset Name>

Description of the theme's inspiration and aesthetic.

## Prerequisites

- Requires a [Nerd Font](https://www.nerdfonts.com/) installed and enabled in your terminal

## Installation

```sh
starship preset <preset-name> -o ~/.config/starship.toml
```

[Click to download the TOML](./toml/<preset-name>.toml)
```

Real contribution examples: [OwO preset (PR #6237)](https://github.com/starship/starship/pull/6237/files), [Power10 preset (PR #6279)](https://github.com/starship/starship/pull/6279), [Deep Oceanic Next (PR #6245)](https://github.com/starship/starship/pull/6245).

### Method 2: Standalone GitHub Repository

Create a repository with your theme. Community conventions from the [starship-preset topic](https://github.com/topics/starship-preset):

- **Naming**: `starship-<theme-name>` (e.g., `starship-gruvbox-rainbow`)
- **Include**: Screenshot, README with install instructions, the TOML file
- **Tag with**: `starship-preset`, `starship-config`, `starship-theme`, `starship-prompt`

Example: The [Catppuccin Starship theme](https://github.com/catppuccin/starship) (400+ stars) organizes flavor-specific palette files in a `themes/` directory.

### Method 3: GitHub Gist

Share a single `starship.toml` as a lightweight Gist:

```bash
# Users install with:
curl -o ~/.config/starship.toml \
  https://gist.githubusercontent.com/<user>/<gist-id>/raw/starship.toml
```

### Method 4: Dotfiles Repository

Include `starship.toml` alongside your other config files (shell rc, terminal emulator, tmux, neovim, etc.). This is the most common sharing method. Many users in [Starship Discussion #1107](https://github.com/starship/starship/discussions/1107) share setups this way.

### Method 5: Community Platforms

- **[r/unixporn](https://reddit.com/r/unixporn)**: The desktop "ricing" community where users share complete setups with screenshots and dotfiles links
- **[Starship GitHub Discussions](https://github.com/starship/starship/discussions/1107)**: The "Share your setup!" thread with 70+ configurations
- **[Starship Custom Commands Discussion #1252](https://github.com/starship/starship/discussions/1252)**: For sharing custom module configurations

### Method 6: Theme Ecosystem Integration

Major color scheme projects maintain official Starship ports:

- **[Catppuccin](https://github.com/catppuccin/starship)**: Provides palette-only files; users paste and set `palette = "catppuccin_mocha"`
- **Dracula, Nord, Gruvbox, Tokyo Night**: Community members create and maintain ports in dedicated repositories

### Method 7: Blog Posts and Tutorials

Publish detailed guides showing your setup:

- Explain design decisions and color choices
- Include screenshots for different shells/terminals
- Provide step-by-step installation instructions
- Platforms: personal blog, DEV Community, Medium, etc.

### Method 8: Palette-Only Distribution

A lightweight approach: distribute **only palette definitions** rather than full configs. Users paste the palette block into their existing config without altering module formats or symbols:

```toml
# User pastes this into their existing starship.toml:
palette = "winternacht"

[palettes.winternacht]
frost = "#88c0d0"
aurora_green = "#a3be8c"
aurora_purple = "#b48ead"
snow = "#e5e9f0"
polar_night = "#2e3440"
```

This is less intrusive than full presets -- it only recolors the existing setup.

---

## Quick Reference

| Feature | Details |
|---------|---------|
| Config file | `~/.config/starship.toml` (override: `STARSHIP_CONFIG`) |
| Color types | Named (16), ANSI 256 (0-255), Hex RGB (`#RRGGBB`) |
| Style string format | `fg:color bg:color attribute1 attribute2 ...` |
| Text attributes | `bold`, `italic`, `underline`, `dimmed`, `inverted`, `blink`, `hidden`, `strikethrough` |
| Disable styling | Empty string `""` or `none` token |
| Palette definition | `[palettes.<name>]` with `palette = "<name>"` at root |
| Palette limitation | Cannot self-reference; all values must be literal |
| Format string styling | `[text](style)` for inline, `(conditional)` for optional |
| Preset CLI | `starship preset --list`, `starship preset <name> -o <file>` |
| Official presets | 12+ built-in, compiled into binary |
| Contributing presets | PR to `starship/starship` with TOML + docs + screenshot |

---

## References

- [Starship Official Documentation - Configuration](https://starship.rs/config/)
- [Starship Official Documentation - Advanced Configuration](https://starship.rs/advanced-config/)
- [Starship Official Documentation - Presets](https://starship.rs/presets/)
- [Starship GitHub Repository](https://github.com/starship/starship)
- [Starship GitHub Discussions - Share Your Setup](https://github.com/starship/starship/discussions/1107)
- [Catppuccin Starship Theme](https://github.com/catppuccin/starship)
- [GitHub Topic: starship-preset](https://github.com/topics/starship-preset)
