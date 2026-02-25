# Winternacht for Starship

A quiet, warm-toned [Starship](https://starship.rs/) prompt theme from the Winternacht design system.

## Philosophy

- **Transience** — Delicate, never demanding. The prompt steps aside.
- **Gentleness** — Warm grays and muted accents that welcome, not shout.
- **Intention** — Every color has a reason, drawn from a unified palette.

## Preview

```
~/codes/winternacht on  main +2 !1
❯
```

## Color Mapping

Colors are drawn from the Winternacht Unified Color Palette (10 scales, 6 steps each):

| Prompt Element   | Scale    | Rationale                   |
| ---------------- | -------- | --------------------------- |
| Directory        | Neutral  | Understated, always present |
| Repo root        | Accent   | Anchors the eye             |
| Git branch       | Accent   | Primary orientation cue     |
| Staged changes   | Sage     | Success / green semantic    |
| Modified files   | Sand     | Warning / yellow semantic   |
| Deleted files    | Clay     | Error / red semantic        |
| Untracked files  | Slate    | Info / blue semantic        |
| Stashed changes  | Lavender | Auxiliary                   |
| Renamed files    | Copper   | Auxiliary                   |
| Node.js          | Sage     | Matches syntax: string      |
| Python           | Sand     | Matches syntax: constant    |
| Rust             | Clay     | Matches syntax: type        |
| Go               | Mint     | Matches syntax: string-expr |
| Java             | Copper   | Matches syntax: property    |
| Ruby             | Rose     | Matches syntax: type/class  |
| Lua              | Slate    | Matches syntax: parameter   |
| Package version  | Lavender | Matches syntax: function    |
| Success prompt   | Accent   | Positive, calm              |
| Error prompt     | Clay     | Error semantic              |
| Command duration | Neutral  | Quiet, unobtrusive          |

## Installation

### Quick install

```sh
cp starship.toml ~/.config/starship.toml
```

### Without overwriting your existing config

Point `STARSHIP_CONFIG` to the theme file directly:

```sh
# Bash / Zsh
export STARSHIP_CONFIG=/path/to/winternacht/starship/starship.toml

# Fish
set -gx STARSHIP_CONFIG /path/to/winternacht/starship/starship.toml
```

### Palette-only (keep your current layout)

If you prefer to keep your existing module format and just adopt the colors, copy only the `[palettes.winternacht]` section into your `~/.config/starship.toml` and add:

```toml
palette = "winternacht"
```

## Requirements

- [Starship](https://starship.rs/) v1.0+
- A [Nerd Font](https://www.nerdfonts.com/) installed and enabled in your terminal (for module symbols)
