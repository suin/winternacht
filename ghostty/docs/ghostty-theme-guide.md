# Ghostty Theme Guide

## How to Configure Ghostty Theme Colors

### File Format

Ghostty theme files use the same key-value format as Ghostty's main configuration file:

```
key = value
```

- Comments start with `#` on their own line.
- Colors are specified as hex (`#RRGGBB` or `RRGGBB`) or named X11 colors.
- Theme files have **no file extension** by convention (matching the built-in themes sourced from iTerm2-Color-Schemes).
- Theme files can set any configuration option (not just colors), so cursor styles, fonts, etc. are also possible.

### Available Color Configuration Keys

#### Core Colors

| Key | Description |
| --- | --- |
| `background` | Background color |
| `foreground` | Foreground (text) color |

#### Cursor Colors

| Key | Description |
| --- | --- |
| `cursor-color` | Cursor color. Also accepts `cell-foreground` / `cell-background` (since 1.2.0) |
| `cursor-text` | Color of text rendered under the cursor |

#### Selection Colors

| Key | Description |
| --- | --- |
| `selection-foreground` | Foreground color for selected text |
| `selection-background` | Background color for selected text |

#### Bold Text

| Key | Description |
| --- | --- |
| `bold-color` | Custom color for bold text (since 1.2.0) |

#### 16 ANSI Palette Colors (+ Extended 256)

Set via the `palette` key with `N=COLOR` syntax (N = 0-255). Each palette entry is a separate line:

| Index | Standard Name |
| ----- | ------------- |
| 0 | Black |
| 1 | Red |
| 2 | Green |
| 3 | Yellow |
| 4 | Blue |
| 5 | Magenta |
| 6 | Cyan |
| 7 | White |
| 8 | Bright Black |
| 9 | Bright Red |
| 10 | Bright Green |
| 11 | Bright Yellow |
| 12 | Bright Blue |
| 13 | Bright Magenta |
| 14 | Bright Cyan |
| 15 | Bright White |

Indices 16-255 cover the extended 256-color palette.

### Example Theme File

Here is the built-in Dracula theme as an example (file named `Dracula` with no extension):

```
palette = 0=#21222c
palette = 1=#ff5555
palette = 2=#50fa7b
palette = 3=#f1fa8c
palette = 4=#bd93f9
palette = 5=#ff79c6
palette = 6=#8be9fd
palette = 7=#f8f8f2
palette = 8=#6272a4
palette = 9=#ff6e6e
palette = 10=#69ff94
palette = 11=#ffffa5
palette = 12=#d6acff
palette = 13=#ff92df
palette = 14=#a4ffff
palette = 15=#ffffff
background = #282a36
foreground = #f8f8f2
cursor-color = #f8f8f2
cursor-text = #282a36
selection-background = #44475a
selection-foreground = #ffffff
```

> **Syntax note:** The `=` inside palette values (`0=#21222c`) must NOT have spaces around it. The `=` separating the key from the value (`palette = ...`) can have spaces.

### Where to Place Theme Files

Theme files are searched in this order:

1. **User custom themes:** `~/.config/ghostty/themes/`
2. **System themes:** `$PREFIX/share/ghostty/themes/`
3. **Absolute file path** can also be used directly in the `theme` option.

On macOS, the config directory may also be `~/Library/Application Support/com.mitchellh.ghostty/themes/`.

### How to Activate a Theme

In `~/.config/ghostty/config`:

```
# By name (built-in or custom)
theme = Dracula

# Light/dark mode auto-switching (based on system appearance)
theme = light:Rose Pine Dawn,dark:Rose Pine

# By absolute file path
theme = /path/to/my/theme/file
```

List all available themes interactively with:

```bash
ghostty +list-themes
```

### Loading Order

Themes are loaded **first**, and any conflicting options in the user's main config file override the theme values. This is different from `config-file` includes.

### Security Warning

From the official docs: themes can modify **any** configuration option, so be careful when using themes from untrusted sources.

---

## How to Distribute a Ghostty Theme

### Method 1: Contribute to Built-in Themes (via iTerm2-Color-Schemes)

Ghostty's ~463 built-in themes are sourced from [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) and synced **weekly**. The official docs state:

> "If you want to contribute a new theme, please contribute it to iterm2-color-schemes and it will be automatically picked up by Ghostty."

#### Steps

1. **Create your theme in YAML format** (Gogh format):

   ```yaml
   ---
   name: "Your Theme Name"
   author: "Your Name (https://yourwebsite.com)"
   variant: "dark" # or "light"

   color_01: "#292D3E" # Black
   color_02: "#F07178" # Red
   color_03: "#62DE84" # Green
   color_04: "#FFCB6B" # Yellow
   color_05: "#75A1FF" # Blue
   color_06: "#F580FF" # Magenta
   color_07: "#60BAEC" # Cyan
   color_08: "#ABB2BF" # White
   color_09: "#959DCB" # Bright Black
   color_10: "#F07178" # Bright Red
   color_11: "#C3E88D" # Bright Green
   color_12: "#FF5572" # Bright Yellow
   color_13: "#82AAFF" # Bright Blue
   color_14: "#FFCB6B" # Bright Magenta
   color_15: "#676E95" # Bright Cyan
   color_16: "#FFFEFE" # Bright White
   background: "#292D3E"
   foreground: "#BFC7D5"
   cursor: "#BFC7D5"
   ```

2. **Generate all terminal format files:**

   ```bash
   python3 tools/gen.py -s <YourThemeName>
   ```

   This auto-generates Ghostty theme files (and files for other terminals) using the template at `tools/templates/ghostty`.

3. **Generate screenshots** (optional but recommended):

   ```bash
   pushd tools && python3 -m screenshot_gen && popd
   ```

4. **Update documentation:** Add your theme to `README.md` with a screenshot and add credit to `CREDITS.md`.

5. **Submit a Pull Request** to [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes). Once merged, Ghostty picks it up automatically in the next weekly sync.

> **Tip:** If you already have a Ghostty config file, use `tools/ghostty_to_yaml.py` in the iTerm2-Color-Schemes repo to convert it to YAML for submission.

### Method 2: Independent GitHub Repository

Many theme projects maintain dedicated Ghostty theme files in their own repos. Examples:

- [catppuccin/ghostty](https://github.com/catppuccin/ghostty)
- [dracula/ghostty](https://github.com/dracula/ghostty)
- [rose-pine/ghostty](https://github.com/rose-pine/ghostty)

Users install by downloading the theme file into `~/.config/ghostty/themes/`.

The [ghostty-theme](https://github.com/topics/ghostty-theme) GitHub topic aggregates community themes.

### Method 3: Direct Config Inclusion

Distribute a theme file that users include via `config-file`:

```
config-file = /path/to/downloaded/theme
```

### Method 4: Inline in Config

Theme color definitions can be pasted directly into a user's `~/.config/ghostty/config`.

---

## Quick Reference

| Aspect | Detail |
| --- | --- |
| Config format | Plain text, `key = value`, no file extension needed |
| Color format | Hex `#RRGGBB` or `RRGGBB`, or X11 named colors |
| Theme directory | `~/.config/ghostty/themes/` |
| Main config | `~/.config/ghostty/config` |
| Activate theme | `theme = Theme Name` in config |
| Light/dark auto | `theme = light:Light Theme,dark:Dark Theme` |
| List themes | `ghostty +list-themes` |
| Contribute built-in | Submit PR to [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes) |

## Sources

- [Ghostty Official Docs - Color Theme](https://ghostty.org/docs/features/theme)
- [Ghostty Official Docs - Configuration Reference](https://ghostty.org/docs/config/reference)
- [mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)
- [ghostty-theme GitHub Topic](https://github.com/topics/ghostty-theme)
