# Personal Portfolio Site

GitHub Pages で公開する個人ポートフォリオサイトです。

## GitHub Pages 公開手順

### 1. リポジトリ作成

GitHub で新しいリポジトリを作成します（例: `portfolio`）。

### 2. Push

```bash
cd homework3
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### 3. GitHub Pages 設定

1. リポジトリの **Settings** タブを開く
2. 左メニューから **Pages** を選択
3. **Source** を `Deploy from a branch` に設定
4. **Branch** を `main`、フォルダを `/ (root)` に設定
5. **Save** をクリック

### 4. 公開 URL 確認

数分後、以下の URL でサイトが公開されます。

```
https://<ユーザー名>.github.io/<リポジトリ名>/
```

## コンテンツ編集箇所

すべての編集は `index.html` 内で行います。

| セクション | 編集箇所 |
|------------|----------|
| **About** | `<section id="about">` 内の `<p>` タグの文章を書き換え |
| **Skills** | `<div class="skills-grid">` 内の `.skill-card` を追加・編集 |
| **Experience** | `<div class="timeline">` 内の `.timeline-item` を追加・編集 |
| **Portfolio** | `<div class="portfolio-grid">` 内の `.portfolio-card` を追加・編集。リンク先 `href="#"` を実際の URL に変更 |
| **Contact** | `<section id="contact">` 内のメールアドレス・GitHub URL を書き換え |

## 投稿機能について

- 投稿データは **ブラウザの `localStorage`** に保存されます
- サーバーには保存されないため、別のブラウザや端末では投稿データは共有されません
- ブラウザのデータを消去すると投稿データも削除されます
