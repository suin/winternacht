# Winternacht for tmux

A gentle, warm status line theme for [tmux](https://github.com/tmux/tmux) — ephemeral, kind, and intentional.

![screenshot](assets/screenshot.png)

## Requirements

- tmux 3.2+ (for `terminal-features` RGB support)
- A [Nerd Font](https://www.nerdfonts.com/) (for separator icons)

## Installation

### With [TPM](https://github.com/tmux-plugins/tpm)

Add to your `~/.tmux.conf`:

```sh
set -g @plugin 'suin/winternacht-tmux'
```

Then press `prefix + I` to install.

### Manual

```sh
git clone https://github.com/suin/winternacht-tmux.git ~/.config/tmux/plugins/winternacht-tmux
```

Add to your `~/.tmux.conf`:

```sh
run ~/.config/tmux/plugins/winternacht-tmux/winternacht.tmux
```

Reload with `tmux source ~/.tmux.conf`.

## Exposed Color Palette

The theme exposes all palette colors as tmux options, so external scripts and plugins can read them at runtime:

```sh
tmux show-option -gqv "@winternacht_color_accent"
# → #8CC3CB
```

| Variable | Hex | Role |
|---|---|---|
| `@winternacht_color_bg` | `#1A1917` | Background |
| `@winternacht_color_bg_surface` | `#242320` | Surface background |
| `@winternacht_color_bg_elevated` | `#3A3835` | Elevated background |
| `@winternacht_color_border` | `#504D48` | Border |
| `@winternacht_color_muted` | `#6B6862` | Muted text |
| `@winternacht_color_subtle` | `#7A7672` | Subtle text |
| `@winternacht_color_text` | `#D6D3CE` | Primary text |
| `@winternacht_color_accent` | `#8CC3CB` | Accent |
| `@winternacht_color_accent_deep` | `#5F9EA8` | Accent (deep) |
| `@winternacht_color_lavender` | `#8A7EB0` | Lavender |
| `@winternacht_color_sage` | `#A0C496` | Sage |
| `@winternacht_color_sand` | `#D4B87A` | Sand |
| `@winternacht_color_clay` | `#D4A0A0` | Clay |
| `@winternacht_color_slate` | `#8DAFD4` | Slate |
| `@winternacht_color_rose` | `#D0A0AA` | Rose |
| `@winternacht_color_mint` | `#8DC0A8` | Mint |
| `@winternacht_color_copper` | `#D0B080` | Copper |

## Script Integration

Use the exposed colors to keep other tools visually consistent with your tmux theme:

```bash
# Read Winternacht colors for fzf
bg=$(tmux show-option -gqv "@winternacht_color_bg")
fg=$(tmux show-option -gqv "@winternacht_color_text")
accent=$(tmux show-option -gqv "@winternacht_color_accent")
border=$(tmux show-option -gqv "@winternacht_color_border")

export FZF_DEFAULT_OPTS="--color=bg:$bg,fg:$fg,hl:$accent,border:$border"
```

```bash
# Use in any shell script
color=$(tmux show-option -gqv "@winternacht_color_sage")
echo -e "\033[38;2;${color}mHello\033[0m"
```

## License

[MIT](LICENSE) — Part of the [Winternacht](https://github.com/suin/winternacht) design system.
