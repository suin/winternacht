# Winternacht — Zed Markdown Preview Check

Open this file with `markdown: open preview` to verify that each element is rendered using the correct Winternacht token.
The parenthetical note next to each section names the theme token that Zed's renderer reads when drawing that element.

> How to use: when something looks off, **right-click on the element → Inspector** to confirm which token is actually being read.
> That makes it obvious which token to fix on the Winternacht side.

---

## Headings (all of H1–H6 use `text`)

# H1 — Display
## H2 — Section
### H3 — Subsection
#### H4 — Detail
##### H5 — Note
###### H6 — Label

> In the preview every heading level uses `text`. The `text.muted` mapping for H6 only applies in the Agent panel, not here (verified against the Zed source).

---

## Body (`text`) and Links (`text.accent`)

This is a regular paragraph. It mixes **strong emphasis**, *italic emphasis*, and `inline code` (background is derived from `editor.foreground` at 0.08 opacity).
[This is a link](https://zed.dev) — color is `text.accent`, the underline is a 1px line of `text.accent` at 0.5 opacity, and a faint `editor.foreground` × 0.025 highlight sits behind the text.

---

## Blockquote (border uses `border`)

> Quiet as a winter night, restrained yet unmistakably intentional.
>
> — Winternacht

---

## Horizontal Rule (rendering was fixed in Zed 1.1)

There should be a clearly visible horizontal rule between the line above and the line below.

---

## Code Blocks

Background uses `editor.background` (same as the preview itself), border uses `border.variant`, and syntax highlighting uses the entire `syntax.*` token set. Font is `buffer_font_family` at `buffer_font_size`.

```typescript
type Theme = {
  name: string;
  appearance: "light" | "dark";
  tokens: Record<string, string>;
};

const winter: Theme = {
  name: "Winternacht Dark",
  appearance: "dark",
  tokens: { background: "#1A1917", text: "#D6D3CE" },
};
```

```python
def greet(name: str) -> str:
    """Return a greeting."""
    return f"Good evening, {name}"
```

```sh
cp themes/winternacht.json ~/.config/zed/themes/
```

---

## Table (header `title_bar.background` / alternating rows `panel.background` / borders `border`)

| Element                      | Token referenced                                              |
| ---------------------------- | ------------------------------------------------------------- |
| Preview background           | `editor.background`                                           |
| Body text and headings H1–H6 | `text`                                                        |
| Link color                   | `text.accent`                                                 |
| Code block background        | `editor.background`                                           |
| Code block border            | `border.variant`                                              |
| Inline code background       | derived: `editor.foreground` × 0.08                           |
| Blockquotes, HRs, table edges| `border`                                                      |
| GFM alert borders (per kind) | `status.info` / `status.success` / `status.warning` / `status.error` |

### Checkboxes inside table cells (clickable since Zed 1.1)

| Item | Status |
| --- | --- |
| Refreshed installed theme to latest | [x] done |
| Set `markdown_preview_theme` explicitly | [x] done |
| Inspect each token via Inspector       | [ ] pending |

---

## Task List (checkboxes on list items)

- [x] Settings file updated
- [x] Theme file updated
- [ ] Identify any off-looking element via Inspector
- [ ] Adjust the corresponding token in Winternacht

---

## GFM Alerts (added in Zed 1.1)

The border color of each alert is taken from a `status.*` token, so each kind can be tuned independently.

> [!NOTE]
> Supplementary information. Border color: `status.info`.

> [!TIP]
> A hint. Border color: `status.success`.

> [!IMPORTANT]
> Information that should not be skimmed past. Border color: `status.info` (same as NOTE).

> [!WARNING]
> A caution. Border color: `status.warning`. Map to Winternacht's Sand scale.

> [!CAUTION]
> A strong warning. Border color: `status.error`. Map to Winternacht's Clay scale.

---

## How to proceed

1. Open this entire file in the preview pane.
2. First, eyeball the **background, body color, and link color** to confirm the Winternacht look.
3. Pick one off-looking element (e.g. the blockquote border feels too faint, the table header sinks into the background) and right-click → **Inspector**.
4. Search the displayed token name in `themes/winternacht.json` and adjust its value.
5. Zed hot-reloads settings, so saving the file applies the change immediately.
