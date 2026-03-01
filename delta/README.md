# Winternacht for delta

A quiet, warm diff theme for [delta](https://github.com/dandavison/delta) — ephemeral, kind, and intentional.

## Requirements

- delta 0.16.0+

## Installation

### Method 1: Git include

Clone or download this repository, then add to your `~/.gitconfig`:

```gitconfig
[include]
    path = /path/to/winternacht/delta/themes/winternacht.gitconfig

[delta]
    features = winternacht
```

### Method 2: Copy-paste

Add the following directly to your `~/.gitconfig`:

```gitconfig
[delta "winternacht"]
    dark = true
    syntax-theme = ansi
    minus-style = syntax "#27201E"
    minus-emph-style = syntax "#3A2A29"
    plus-style = syntax "#22241E"
    plus-emph-style = syntax "#2D3429"
    line-numbers-minus-style = "#B87070"
    line-numbers-plus-style = "#7A9E72"
    line-numbers-zero-style = "#6B6862"
    line-numbers-left-style = "#504D48"
    line-numbers-right-style = "#504D48"
    file-style = bold "#8CC3CB"
    file-decoration-style = "#5F9EA8" ul
    hunk-header-decoration-style = "#504D48" box
    commit-style = bold "#D4B87A"
    blame-palette = "#1A1917 #1E1D1B #242320 #201F1D"

[delta]
    features = winternacht
```

## Color Palette

| Role | Hex | Token |
|---|---|---|
| Removed background | `#27201E` | Clay-300 @ 8% on Neutral-950 |
| Removed emphasis | `#3A2A29` | Clay-300 @ 20% on Neutral-950 |
| Added background | `#22241E` | Sage-300 @ 8% on Neutral-950 |
| Added emphasis | `#2D3429` | Sage-300 @ 20% on Neutral-950 |
| Line numbers (minus) | `#B87070` | Clay-300 |
| Line numbers (plus) | `#7A9E72` | Sage-300 |
| Line numbers (zero) | `#6B6862` | Neutral-600 |
| Line numbers (border) | `#504D48` | Neutral-700 |
| File name | `#8CC3CB` | Accent-200 |
| File decoration | `#5F9EA8` | Accent-300 |
| Hunk header decoration | `#504D48` | Neutral-700 |
| Commit hash | `#D4B87A` | Sand (bright) |
| Blame palette | `#1A1917` `#1E1D1B` `#242320` `#201F1D` | Neutral-950/900 range |

## License

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
