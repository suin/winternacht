# Winternacht for Ghostty

A gentle, warm color theme for [Ghostty](https://ghostty.org/) — ephemeral, kind, and intentional.

Includes both **Dark** and **Light** variants.

## Installation

Copy the theme files into your Ghostty themes directory:

```sh
# macOS
mkdir -p ~/Library/Application\ Support/com.mitchellh.ghostty/themes
cp themes/* ~/Library/Application\ Support/com.mitchellh.ghostty/themes/

# Linux
mkdir -p ~/.config/ghostty/themes
cp themes/* ~/.config/ghostty/themes/
```

Then add to your Ghostty config:

```toml
# Dark only
theme = Winternacht

# Light only
theme = Winternacht Light

# Auto-switch with system appearance
theme = light:Winternacht Light,dark:Winternacht
```

Restart Ghostty or open a new window to apply.

## Color Palette

### Dark

| Role | Normal | Bright |
|---|---|---|
| Background | `#1A1917` | |
| Foreground | `#D6D3CE` | |
| Red (Clay) | `#B87070` | `#D4A0A0` |
| Green (Sage) | `#7A9E72` | `#A0C496` |
| Yellow (Sand) | `#C29E5E` | `#D4B87A` |
| Blue (Slate) | `#6B8BBF` | `#8DAFD4` |
| Magenta (Lavender) | `#8A7EB0` | `#B0A4D0` |
| Cyan (Accent) | `#5F9EA8` | `#8CC3CB` |

### Light

| Role | Normal | Bright |
|---|---|---|
| Background | `#FCFCFB` | |
| Foreground | `#3A3835` | |
| Red (Clay) | `#8E5050` | `#B87070` |
| Green (Sage) | `#587850` | `#7A9E72` |
| Yellow (Sand) | `#8E7040` | `#C29E5E` |
| Blue (Slate) | `#4A5870` | `#6B8BBF` |
| Magenta (Lavender) | `#635788` | `#8A7EB0` |
| Cyan (Accent) | `#3D7A83` | `#5F9EA8` |

## License

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
