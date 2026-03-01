# Winternacht for Zed

A gentle, warm color theme for [Zed](https://zed.dev/) — ephemeral, kind, and intentional.

Inspired by the quiet beauty of winter nights. Every color choice reflects a philosophy of fragility and gentleness: subtle enough to recede, warm enough to welcome.

Includes both **Dark** and **Light** variants.

## Features

- **Two variants** -- Winternacht Dark and Winternacht Light, designed for day and night.
- **Warm neutral tones** -- backgrounds and foregrounds built on earthy, low-contrast neutrals that reduce visual fatigue.
- **Teal accent** -- a single accent color (`#5F9EA8` light / `#8CC3CB` dark) used sparingly to guide attention without demanding it.
- **Readable syntax highlighting** -- token colors tuned for long reading sessions, with enough distinction to parse structure at a glance.

## Installation

### From Zed Extensions

1. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run `zed: extensions`
3. Search for **Winternacht**
4. Click **Install**

### Local Theme File

Copy the theme JSON into your Zed themes directory:

```sh
mkdir -p ~/.config/zed/themes
cp themes/winternacht.json ~/.config/zed/themes/
```

Restart Zed or reload to apply.

### Dev Extension

For development or local modifications:

1. Clone this repository
2. Open the command palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run `zed: install dev extension`
4. Select the `zed-editor-theme` directory

## Activation

Open the theme selector with `Cmd+K Cmd+T` (macOS) or `Ctrl+K Ctrl+T` (Linux), then choose **Winternacht Dark** or **Winternacht Light**.

Alternatively, set it directly in your `settings.json`:

```json
{
  "theme": {
    "mode": "system",
    "light": "Winternacht Light",
    "dark": "Winternacht Dark"
  }
}
```

With `"mode": "system"`, Zed will follow your OS appearance and switch between the two variants automatically.

## Color Palette

Winternacht uses a unified set of 10 chromatic scales, each with a 10-step range from dark to light. These scales are shared across the entire Winternacht design system (VS Code, Ghostty, Tabby, Starship, Zed).

| Scale | Hue | Role |
|---|---|---|
| **Neutral** | Warm gray | Backgrounds, foregrounds, borders |
| **Accent** | Teal | Primary accent, links, focus states |
| **Sage** | Green | String literals, additions |
| **Sand** | Gold | Warnings, parameters |
| **Clay** | Red | Errors, deletions |
| **Lavender** | Purple | Keywords, constants |
| **Slate** | Blue-gray | Functions, types |
| **Mint** | Green-blue | Support tokens, decorators |
| **Rose** | Pink | Special syntax, tags |
| **Copper** | Bronze | Punctuation, operators |

## License

MIT

---

Part of the [Winternacht](https://github.com/suin/winternacht) design system.
