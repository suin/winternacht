# Winternacht — Zed Markdown Preview Check

`markdown: open preview` で開いて、各要素が Winternacht のトークンに沿って描画されているか確認するためのファイル。
要素のとなりにある括弧書きは、Zed のレンダラがその要素を描くときに参照するテーマトークン。

> 使い方: 違和感がある要素の上で **右クリック → Inspector** を開くと、実際に参照されているトークン名が確認できる。
> Winternacht 側で直すべきトークンが、それで一目で分かる。

---

## 見出し（H1〜H6 すべて `text`）

# H1 — Display
## H2 — Section
### H3 — Subsection
#### H4 — Detail
##### H5 — Note
###### H6 — Label

> プレビューでは H1〜H6 すべて `text` 色。`text.muted` の H6 マッピングは Agent パネル専用で、プレビューには適用されない（ソース確認済）。

---

## 本文（`text`）／リンク（`text.accent`）

これは普通の段落。**強調** と *斜体* と `インラインコード`（背景は `editor.foreground` を 0.08 透過した派生色）を混ぜている。
[これはリンク](https://zed.dev) — `text.accent` の色になり、下線は `text.accent` を 0.5 透過した1pxの線。リンクの背景も `editor.foreground` を 0.025 透過した薄いハイライトが乗る。

---

## 引用（境界線が `border`）

> 静かな冬の夜のように、控えめで、それでいて意志がある。
>
> — Winternacht

---

## 水平線（Zed 1.1 で表示が修正された要素）

上と下のあいだに、はっきり見える水平線が入る。

---

## コードブロック

背景は `editor.background`（プレビュー全体と同じ）、枠線は `border.variant`、シンタックスハイライトは `syntax.*` トークン全体を使う。フォントは `buffer_font_family` ＋ `buffer_font_size`。

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
    """挨拶を返す。"""
    return f"こんばんは、{name}さん"
```

```sh
cp themes/winternacht.json ~/.config/zed/themes/
```

---

## テーブル（ヘッダ行 `title_bar.background`／交互行 `panel.background`／枠 `border`）

| 要素                    | 参照されるトークン                               |
| ---------------------- | ----------------------------------------------- |
| プレビュー背景           | `editor.background`                             |
| 本文・H1〜H6            | `text`                                          |
| リンク色                 | `text.accent`                                   |
| コードブロック背景        | `editor.background`                             |
| コードブロック枠線        | `border.variant`                                |
| インラインコード背景      | `editor.foreground` を 0.08 透過（派生）           |
| 引用ブロック・HR・テーブル枠 | `border`                                       |
| GFM アラート枠（種類別）  | `status.info` / `status.success` / `status.warning` / `status.error` |

### テーブル内チェックボックス（Zed 1.1 でクリック可能になった）

| 項目 | 状態 |
| --- | --- |
| インストール済みテーマを最新化 | [x] 完了 |
| `markdown_preview_theme` を明示指定 | [x] 完了 |
| Inspector で各トークンを確認     | [ ] 未 |

---

## タスクリスト（リスト項目側のチェックボックス）

- [x] 設定ファイル更新
- [x] テーマファイル更新
- [ ] 違和感のある要素を Inspector で特定
- [ ] Winternacht 側のトークンを調整

---

## GFM アラート（Zed 1.1 で追加）

枠の色はそれぞれ `status.*` トークンから取られる（個別に色付け可能）。

> [!NOTE]
> 補足情報。`status.info` の色が枠に出る。

> [!TIP]
> ヒント。`status.success` の色が枠に出る。

> [!IMPORTANT]
> 重要事項。`status.info` の色（NOTE と同じ）が枠に出る。

> [!WARNING]
> 注意喚起。`status.warning` の色が枠に出る。Winternacht の Sand スケールに当てる。

> [!CAUTION]
> 強い警告。`status.error` の色が枠に出る。Winternacht の Clay スケールに当てる。

---

## 確認の進めかた

1. このファイル全体をプレビューで開く。
2. **背景・本文色・リンク色**が Winternacht の見え方になっているかをまず眺める。
3. 違和感のある要素（例: 引用のボーダーが薄すぎる、テーブルヘッダが沈んで見える、など）を一つ選んで右クリック → **Inspector**。
4. 表示されたトークン名を `themes/winternacht.json` で検索し、値を調整する。
5. Zed が設定をホットリロードするので、保存すれば即反映される。
