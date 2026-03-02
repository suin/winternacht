# Winternacht for fzf

A quiet, warm-toned color theme for [fzf](https://github.com/junegunn/fzf) — ephemeral, kind, and intentional.

## Installation

### Bash / Zsh

Add to your `~/.bashrc` or `~/.zshrc`:

```sh
source /path/to/winternacht/fzf/themes/winternacht.sh
```

### Fish

Add to your `~/.config/fish/config.fish`:

```fish
source /path/to/winternacht/fzf/themes/winternacht.fish
```

### fzf Config File (v0.53+)

Copy the config file to your fzf configuration directory:

```sh
mkdir -p ~/.config/fzf
cp /path/to/winternacht/fzf/themes/fzfrc ~/.config/fzf/fzfrc
```

Then set the `FZF_DEFAULT_OPTS_FILE` environment variable to point to the config file:

**Bash / Zsh** — add to `~/.bashrc` or `~/.zshrc`:

```sh
export FZF_DEFAULT_OPTS_FILE=~/.config/fzf/fzfrc
```

**Fish** — add to `~/.config/fish/config.fish`:

```fish
set -gx FZF_DEFAULT_OPTS_FILE ~/.config/fzf/fzfrc
```

### Quick Copy-Paste

If you prefer not to source a file, add this directly to your shell config:

<details>
<summary>Bash / Zsh</summary>

```sh
export FZF_DEFAULT_OPTS="$FZF_DEFAULT_OPTS \
  --color=fg:#D6D3CE,bg:#1A1917,hl:#5F9EA8 \
  --color=fg+:#D6D3CE,bg+:#242320,hl+:#8CC3CB \
  --color=info:#7A7672,prompt:#8CC3CB,pointer:#8CC3CB \
  --color=marker:#A0C496,spinner:#8CC3CB,header:#BAB7B2 \
  --color=border:#504D48,separator:#504D48,scrollbar:#6B6862 \
  --color=gutter:#1A1917,selected-bg:#3A3835,selected-hl:#8CC3CB \
  --color=label:#BAB7B2,preview-fg:#D6D3CE,preview-bg:#1A1917 \
  --border=rounded \
  --scrollbar='│'"
```

</details>

<details>
<summary>Fish</summary>

```fish
set -gx FZF_DEFAULT_OPTS "$FZF_DEFAULT_OPTS \
  --color=fg:#D6D3CE,bg:#1A1917,hl:#5F9EA8 \
  --color=fg+:#D6D3CE,bg+:#242320,hl+:#8CC3CB \
  --color=info:#7A7672,prompt:#8CC3CB,pointer:#8CC3CB \
  --color=marker:#A0C496,spinner:#8CC3CB,header:#BAB7B2 \
  --color=border:#504D48,separator:#504D48,scrollbar:#6B6862 \
  --color=gutter:#1A1917,selected-bg:#3A3835,selected-hl:#8CC3CB \
  --color=label:#BAB7B2,preview-fg:#D6D3CE,preview-bg:#1A1917 \
  --border=rounded \
  --scrollbar='│'"
```

</details>

### Transparent Background

If your terminal uses a transparent or custom background, replace `bg:#1A1917` with `bg:-1` to inherit the terminal's background color.

## Requirements

- fzf 0.50+ (for modern styling features)
- A terminal with true color (24-bit) support

## Color Mapping

Colors are drawn from the Winternacht Unified Color Palette (dark mode):

| fzf Element | Scale | Hex | Role |
|---|---|---|---|
| `fg` | Neutral | `#D6D3CE` | Primary text |
| `bg` | Neutral 950 | `#1A1917` | Background |
| `bg+` | Neutral 900 | `#242320` | Current line background |
| `hl` | Accent 300 | `#5F9EA8` | Match highlight |
| `hl+` | Accent 200 | `#8CC3CB` | Match highlight (current line) |
| `prompt` | Accent 200 | `#8CC3CB` | Prompt character |
| `pointer` | Accent 200 | `#8CC3CB` | Current line pointer |
| `spinner` | Accent 200 | `#8CC3CB` | Streaming indicator |
| `marker` | Sage | `#A0C496` | Multi-select marker |
| `info` | Neutral 500 | `#7A7672` | Match count |
| `header` | Neutral 400 | `#BAB7B2` | Header text |
| `border` | Neutral 700 | `#504D48` | Border |
| `separator` | Neutral 700 | `#504D48` | Separator line |
| `scrollbar` | Neutral 600 | `#6B6862` | Scrollbar |
| `gutter` | Neutral 950 | `#1A1917` | Gutter (matches background) |
| `selected-bg` | Neutral 800 | `#3A3835` | Multi-selected item background |
| `selected-hl` | Accent 200 | `#8CC3CB` | Multi-selected item highlight |
| `label` | Neutral 400 | `#BAB7B2` | Border label |
| `preview-fg` | Neutral | `#D6D3CE` | Preview text |
| `preview-bg` | Neutral 950 | `#1A1917` | Preview background |

## Files

```
fzf/
├── themes/
│   ├── winternacht.sh      # Bash / Zsh
│   ├── winternacht.fish    # Fish
│   └── fzfrc               # fzf config file (v0.53+)
└── README.md
```

## License

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
