# tmux Theme Customization Guide

## 1. Configuration File Structure

The primary configuration file is `~/.tmux.conf` (or `~/.config/tmux/tmux.conf` for XDG-compliant setups). Themes are typically organized as:

```
~/.tmux.conf              # Main config, sources theme file
~/.tmux.mytheme.theme     # Theme variables and set-option calls
~/.tmux/plugins/          # TPM-managed plugins/themes
```

For modular organization, configs can be split into files under `conf.d/`, with the main `tmux.conf` containing primarily `source-file` and `run-shell` commands.

Reloading config within tmux:

```bash
tmux source-file ~/.tmux.conf
# Or bind to a key:
bind r source-file ~/.tmux.conf \; display "Config reloaded"
```

## 2. set-option and set-window-option Commands

### Command Forms

| Command                              | Alias    | Scope            |
| ------------------------------------ | -------- | ---------------- |
| `set-option -g`                      | `set -g` | Global (session) |
| `set-option -s`                      | `set -s` | Server           |
| `set-option -w` or `set-window-option -g` | `setw -g` | Window        |
| `set-option -p`                      | `set -p` | Pane             |
| `set-option -a`                      |          | Append to value  |

**Important**: In tmux 2.9+, the old `-fg`, `-bg`, `-attr` suffixed options were consolidated into unified `-style` options.

```bash
# Old (pre-2.9, deprecated):
set -g status-fg colour240
set -g status-bg colour234

# Modern (2.9+):
set -g status-style "fg=colour240,bg=colour234"
```

## 3. Color Configuration

### Color Formats

tmux supports multiple color specification methods:

| Format             | Example                     | Notes                        |
| ------------------ | --------------------------- | ---------------------------- |
| Named colors       | `red`, `green`, `blue`, `cyan`, `magenta`, `yellow`, `black`, `white` | 8 basic colors |
| Bright variants    | `brightred`, `brightblue`   | Higher intensity             |
| 256-color palette  | `colour0` – `colour255`    | Terminal 256-color           |
| Hex RGB            | `#FF0000`, `#1a1b26`       | True color                   |
| `default`          | `default`                   | Terminal default (transparent)|

### Enabling 256-Color Support

```bash
set -g default-terminal "tmux-256color"
# OR
set -g default-terminal "screen-256color"
```

`TERM` outside tmux must also be set to a 256-color capable value (e.g., `xterm-256color`). This is the terminal emulator's responsibility.

### Enabling True Color (24-bit RGB)

**tmux 3.2+ (recommended):**

```bash
set -as terminal-features ",xterm-256color:RGB"
```

**Older tmux versions:**

```bash
set -ag terminal-overrides ",xterm-256color:RGB"
# Or using the Tc extension flag:
set -ag terminal-overrides ",xterm-256color:Tc"
```

The `RGB` flag is the official terminfo flag; `Tc` is a tmux extension. Once configured, hex colors like `bg=#1a1b26` work in all style options.

**Verify true color** with a gradient test script:

```bash
awk 'BEGIN{
    s="/\\/\\/\\/\\/\\"; s=s s s s s s s s;
    for (colnum = 0; colnum<77; colnum++) {
        r = 255-(colnum*255/76);
        g = (colnum*510/76);
        b = (colnum*255/76);
        if (g>255) g = 510-g;
        printf "\033[48;2;%d;%d;%dm", r,g,b;
        printf "\033[38;2;%d;%d;%dm", 255-r,255-g,255-b;
        printf "%s\033[0m", substr(s,colnum+1,1);
    }
    printf "\n";
}'
```

## 4. Status Bar Customization

### Structure

The status bar has three sections: **left**, **center** (window list), **right**.

### Core Status Options

```bash
# Enable/disable status bar
set -g status on

# Position (top or bottom)
set -g status-position bottom

# Update interval in seconds
set -g status-interval 5

# Overall bar style
set -g status-style "fg=colour240,bg=colour234"

# Status bar lengths
set -g status-left-length 50
set -g status-right-length 100
```

### status-left and status-right

These accept format strings with inline style directives using `#[...]` notation:

```bash
set -g status-left "#[fg=colour235,bg=colour252,bold] #S #[fg=colour252,bg=colour238] #[fg=colour245,bg=colour238] #H "
set -g status-right "#[fg=colour238,bg=colour234]#[fg=colour245,bg=colour238] %b %d %Y #[fg=colour252]%H:%M "
```

### Inline Style Directives

Within format strings, `#[...]` sets styles for subsequent text:

| Directive          | Effect                       |
| ------------------ | ---------------------------- |
| `#[fg=colour135]`  | Foreground color             |
| `#[bg=black]`      | Background color             |
| `#[bold]`          | Bold text                    |
| `#[dim]`           | Dim text                     |
| `#[italic]`        | Italic text                  |
| `#[reverse]`       | Reverse video                |
| `#[default]`       | Reset all styles             |
| `#[fg=default]`    | Reset to terminal default FG |

## 5. Window/Pane Styling

### Window Status Formats

```bash
# Inactive windows in window list
set -g window-status-format " #I #W "
set -g window-status-style "fg=colour244,bg=colour234"

# Currently active window
set -g window-status-current-format " #I #W "
set -g window-status-current-style "fg=colour222,bg=colour238,bold"

# Window with activity/bell flags
set -g window-status-activity-style "fg=colour154,bg=colour234"
set -g window-status-bell-style "fg=colour255,bg=colour1,bold"

# Separator between window entries
set -g window-status-separator ""
```

### Pane Borders

```bash
# Inactive pane border
set -g pane-border-style "fg=colour238"

# Active pane border
set -g pane-active-border-style "fg=colour252"

# Pane border format (tmux 2.3+)
set -g pane-border-format " #P: #{pane_current_command} "
set -g pane-border-status top  # or bottom
```

### Copy Mode / Selection Mode

```bash
# Selection highlight in copy mode
set -g mode-style "fg=black,bg=colour220,bold"
```

## 6. Message and Command Prompt Styling

```bash
# Status messages (e.g., "Config reloaded")
set -g message-style "fg=colour222,bg=colour238"

# Command prompt style (when typing tmux commands)
set -g message-command-style "fg=colour222,bg=colour238"
```

## 7. Clock Mode and Other Visual Elements

```bash
# Clock color (prefix + t)
set -g clock-mode-colour "colour135"

# Clock format: 12 or 24 hour
set -g clock-mode-style 24

# Visual bell (flash instead of audio bell)
set -g visual-bell on
set -g bell-action other  # only flash when bell in non-current window

# Activity monitoring
set -g monitor-activity on
set -g visual-activity off  # don't show message, just flag in window list
```

## 8. Format Strings and Variables

Format strings use `#{variable}` syntax.

### Session Variables

- `#{session_name}` — Session name
- `#{session_windows}` — Number of windows
- `#{session_id}` — Session ID (`$N`)

### Window Variables

- `#{window_index}` — Window number
- `#{window_name}` — Window name
- `#{window_panes}` — Number of panes
- `#{window_active}` — 1 if current window
- `#{window_zoomed_flag}` — 1 if a pane is zoomed
- `#{window_activity_flag}` — 1 if activity alert
- `#{window_bell_flag}` — 1 if bell alert

### Pane Variables

- `#{pane_current_path}` — Current directory
- `#{pane_current_command}` — Running command
- `#{pane_index}` — Pane index
- `#{pane_id}` — Pane ID (`%N`)
- `#{pane_width}` / `#{pane_height}` — Dimensions

### Special Substitutions

- `#S` — Session name (shorthand)
- `#W` — Window name (shorthand)
- `#I` — Window index (shorthand)
- `#H` — Hostname (full)
- `#h` — Hostname (short)
- `#(command)` — Shell command output

### Format Modifiers

| Modifier       | Example                         | Effect                   |
| -------------- | ------------------------------- | ------------------------ |
| Truncate       | `#{=10:window_name}`            | Truncate to 10 chars     |
| Truncate+marker| `#{=\|10\|...:window_name}`     | Add `...` when truncated |
| Pad            | `#{p10:window_index}`           | Pad to 10 chars          |
| Basename       | `#{b:pane_current_path}`        | Last path component      |
| Conditional    | `#{?window_active,*,}`          | Ternary if               |
| Regex sub      | `#{s/foo/bar/:window_name}`     | Substitution             |
| Math (3.2+)    | `#{e|+|:width,10}`             | Arithmetic               |
| Iterate windows| `#{W:format}`                   | Loop over windows        |

### Conditional Format Example

```bash
# Show + if window is zoomed
set -g window-status-current-format " #I #W#{?window_zoomed_flag,+, } "
```

## 9. Conditionals and Scripting

### Parse-Time Conditionals (`%if`)

Evaluated when tmux reads the config file:

```bash
%if #{==:#{host_short},myworkstation}
source ~/.tmux.work.conf
%endif

%if #{>=:#{version},3.2}
set -as terminal-features ",xterm-256color:RGB"
%else
set -ag terminal-overrides ",xterm-256color:Tc"
%endif
```

Supported operators: `==`, `!=`, `<`, `>`, `<=`, `>=`, `||`, `&&`

### Runtime Conditionals (`if-shell`)

```bash
# Check environment variable
if-shell '[ -n "$SSH_CONNECTION" ]' \
  'set -g status-style "fg=white,bg=colour160"' \
  'set -g status-style "fg=white,bg=colour24"'
```

### `run-shell` for Dynamic Values

```bash
# Load theme based on environment variable
run-shell "tmux source-file ~/.tmux.${TMUX_THEME:-default}.theme"
```

### User Options (`@` prefix)

Custom variables stored in tmux options with `@` prefix, usable for theme configuration:

```bash
# Define theme colors as variables
set -g @bg_dark "#1a1b26"
set -g @fg_light "#c0caf5"
set -g @accent "#7aa2f7"

# Use in format strings via #{@variable}
set -g status-style "bg=#{@bg_dark},fg=#{@fg_light}"
```

## 10. Complete Style Options Reference

All styleable elements in tmux:

| Option                          | What It Styles                        |
| ------------------------------- | ------------------------------------- |
| `status-style`                  | Overall status bar                    |
| `status-left` / `status-right`  | Status bar sections (format strings)  |
| `window-status-style`           | Inactive windows in window list       |
| `window-status-current-style`   | Active window in window list          |
| `window-status-activity-style`  | Windows with activity alert           |
| `window-status-bell-style`      | Windows with bell alert               |
| `window-status-last-style`      | Last active window                    |
| `pane-border-style`             | Inactive pane borders                 |
| `pane-active-border-style`      | Active pane border                    |
| `message-style`                 | Status line messages                  |
| `message-command-style`         | Command prompt                        |
| `mode-style`                    | Copy mode selection highlight         |
| `clock-mode-colour`             | Clock display color                   |
| `display-panes-colour`          | Inactive pane numbers (prefix + q)    |
| `display-panes-active-colour`   | Active pane number                    |

## 11. Best Practices for Theme Development

### Configuration Structure

1. **Separate theme from config**: Keep style options in a dedicated theme file sourced by main `tmux.conf`
2. **Use `@` user options** for color palette variables so users can override individual values
3. **Use `source-file`** to load the theme, making it easy to swap
4. **Use `run-shell`** for dynamic theme selection based on environment variables

### Compatibility

- **Test against tmux 2.9+** minimum for unified `-style` options
- **Use `%if #{>=:#{version},...}`** for version-gated features
- **Avoid deprecated `-fg`/`-bg` options** in new themes
- **Set `default-terminal`** early in config to ensure colors work

### Color System Design

- Define all colors as `@` user options at the top of the theme
- Use a consistent palette (8–16 colors maximum) for visual coherence
- Always test with both 256-color and true color terminals
- Provide a fallback for `default` (transparent) backgrounds

### Status Bar

- Keep `status-interval` at 5+ seconds to avoid excessive CPU use for shell command outputs
- Cache expensive `#(command)` results with a wrapper script
- Use `status-left-length` / `status-right-length` generously (50–200) to avoid truncation
- Use identical-width inactive/active window status formats to prevent visual jumping

## 12. Complete Minimal Theme Template

```bash
# ─── Color Palette (override to customize) ─────────────────────────────────
set -g @color_bg      "#1a1b26"
set -g @color_bg2     "#24283b"
set -g @color_border  "#414868"
set -g @color_fg      "#c0caf5"
set -g @color_accent  "#7aa2f7"
set -g @color_active  "#bb9af7"
set -g @color_muted   "#565f89"

# ─── Terminal Color Support ─────────────────────────────────────────────────
set -g default-terminal "tmux-256color"
set -as terminal-features ",xterm-256color:RGB"

# ─── Status Bar ─────────────────────────────────────────────────────────────
set -g status on
set -g status-position bottom
set -g status-interval 5
set -g status-style "fg=#{@color_fg},bg=#{@color_bg}"
set -g status-left-length 50
set -g status-right-length 100

set -g status-left  "#[fg=#{@color_bg},bg=#{@color_accent},bold] #S #[fg=#{@color_accent},bg=#{@color_bg}]"
set -g status-right "#[fg=#{@color_muted}] %Y-%m-%d  %H:%M "

# ─── Window List ────────────────────────────────────────────────────────────
set -g window-status-format         " #I #W "
set -g window-status-style          "fg=#{@color_muted},bg=#{@color_bg}"
set -g window-status-current-format " #I #W#{?window_zoomed_flag, ,} "
set -g window-status-current-style  "fg=#{@color_bg},bg=#{@color_active},bold"
set -g window-status-separator      ""

# ─── Pane Borders ───────────────────────────────────────────────────────────
set -g pane-border-style         "fg=#{@color_border}"
set -g pane-active-border-style  "fg=#{@color_accent}"

# ─── Messages ───────────────────────────────────────────────────────────────
set -g message-style         "fg=#{@color_fg},bg=#{@color_bg2}"
set -g message-command-style "fg=#{@color_fg},bg=#{@color_bg2}"

# ─── Copy Mode ──────────────────────────────────────────────────────────────
set -g mode-style "fg=#{@color_bg},bg=#{@color_accent},bold"

# ─── Clock ──────────────────────────────────────────────────────────────────
set -g clock-mode-colour "#{@color_accent}"
set -g clock-mode-style  24
```

## References

- [tmux Formats Wiki](https://github.com/tmux/tmux/wiki/Formats)
- [tmux Advanced Use Wiki](https://github.com/tmux/tmux/wiki/Advanced-Use)
- [tmux FAQ (colors/true color)](https://github.com/tmux/tmux/wiki/FAQ)
- [Tao of tmux: Status Bar](https://tao-of-tmux.readthedocs.io/en/latest/manuscript/09-status-bar.html)
- [Catppuccin for tmux](https://github.com/catppuccin/tmux)
- [tmux-themepack](https://github.com/jimeh/tmux-themepack)
- [TPM - Tmux Plugin Manager](https://github.com/tmux-plugins/tpm)
- [rothgar/awesome-tmux](https://github.com/rothgar/awesome-tmux)
