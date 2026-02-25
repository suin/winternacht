# Winternacht for Tabby

A gentle, warm color theme for [Tabby](https://tabby.sh/) — ephemeral, kind, and intentional.

Includes both **Dark** and **Light** variants.

## Installation

### Option A: Plugin (recommended)

Install from Tabby's built-in plugin manager:

1. Open **Settings > Plugins**
2. Search for `tabby-theme-winternacht-by-suin`
3. Click **Install** and restart Tabby
4. Go to **Settings > Color Scheme** and select **Winternacht** or **Winternacht Light**

### Option B: Manual YAML

Add the following to your `config.yaml` under `terminal.customColorSchemes`:

<details>
<summary>Winternacht (Dark)</summary>

```yaml
- name: Winternacht
  foreground: '#D6D3CE'
  background: '#1A1917'
  cursor: '#8CC3CB'
  cursorAccent: '#1A1917'
  selection: '#3A4A4C'
  selectionForeground: '#FCFCFB'
  colors:
    - '#242320'    # 0  black
    - '#B87070'    # 1  red           (Clay)
    - '#7A9E72'    # 2  green         (Sage)
    - '#C29E5E'    # 3  yellow        (Sand)
    - '#6B8BBF'    # 4  blue          (Slate)
    - '#8A7EB0'    # 5  magenta       (Lavender)
    - '#5F9EA8'    # 6  cyan          (Accent)
    - '#D5D3CF'    # 7  white
    - '#7A7672'    # 8  bright black
    - '#D4A0A0'    # 9  bright red    (Clay Lightened)
    - '#A0C496'    # 10 bright green  (Sage Lightened)
    - '#D4B87A'    # 11 bright yellow (Sand Lightened)
    - '#8DAFD4'    # 12 bright blue   (Slate Lightened)
    - '#B0A4D0'    # 13 bright magenta(Lavender Lightened)
    - '#8CC3CB'    # 14 bright cyan   (Accent 200)
    - '#FCFCFB'    # 15 bright white
```

</details>

<details>
<summary>Winternacht Light</summary>

```yaml
- name: Winternacht Light
  foreground: '#3A3835'
  background: '#FCFCFB'
  cursor: '#5F9EA8'
  cursorAccent: '#FCFCFB'
  selection: '#D0E4E6'
  selectionForeground: '#242320'
  colors:
    - '#3A3835'    # 0  black
    - '#8E5050'    # 1  red           (Clay)
    - '#587850'    # 2  green         (Sage)
    - '#8E7040'    # 3  yellow        (Sand)
    - '#4A5870'    # 4  blue          (Slate)
    - '#635788'    # 5  magenta       (Lavender)
    - '#3D7A83'    # 6  cyan          (Accent)
    - '#F1F0EE'    # 7  white
    - '#7A7672'    # 8  bright black
    - '#B87070'    # 9  bright red    (Clay)
    - '#7A9E72'    # 10 bright green  (Sage)
    - '#C29E5E'    # 11 bright yellow (Sand)
    - '#6B8BBF'    # 12 bright blue   (Slate)
    - '#8A7EB0'    # 13 bright magenta(Lavender)
    - '#5F9EA8'    # 14 bright cyan   (Accent)
    - '#FCFCFB'    # 15 bright white
```

</details>

Then select the scheme in **Settings > Color Scheme**.

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

## Development

```bash
npm install
npm run watch

# Launch Tabby with the plugin loaded from the current directory
TABBY_PLUGINS=$(pwd) tabby --debug

# Press Ctrl-R (Cmd-R on macOS) to reload plugins without restarting
```

## Publishing

```bash
npm publish
```

The package will appear in Tabby's **Settings > Plugins** within minutes.

## License

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
