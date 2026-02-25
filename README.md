# My Portfolio

クラウドエンジニア向けのポートフォリオサイトです。  
業務経歴、自己学習、資格、プロフィールを Markdown ベースで管理し、Next.js で表示します。

## URL / ページ構成

- `/` : トップページ（プロフィール、業務経歴サマリ、自己学習サマリ、資格サマリ）
- `/projects` : 実務プロジェクト一覧
- `/learning` : 自己学習アーカイブ
- `/certifications` : 資格一覧

## 技術スタック

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- UI: React 18
- Styling: Tailwind CSS + `app/globals.css` のカスタムデザイン
- Content Management: Markdown + Frontmatter
- Markdown Processing:
  - `gray-matter`（Frontmatter 解析）
  - `remark` / `remark-html`（Markdown を HTML へ変換）
- Image / Media:
  - `next/image`
  - `react-zoom-pan-pinch`（図の拡大・移動ビュー）
- Hosting / Build:
  - AWS Amplify（`amplify.yml`）

## このポートフォリオに記載しているコンテンツ

`content/` 配下の Markdown を読み込み、サイトに反映しています。

- `content/profile.md`
  - 氏名、肩書き、概要、自己紹介、スキル、外部リンク
- `content/projects/*.md`
  - 業務プロジェクト（期間、役割、技術要素、成果、詳細本文）
- `content/learning/*.md`
  - 自己学習テーマ（狙い、技術スタック、得た知見、図解、リポジトリリンク）
- `content/certifications/*.md`
  - 保有資格（資格名、発行元、取得時期、認定情報）

現在の登録件数（テンプレート除く）:

- Projects: 5
- Learning: 2
- Certifications: 6

## ディレクトリ構成

```text
.
├── app/                  # ルーティング・ページ
├── components/           # UI コンポーネント
├── content/              # 表示データ（Markdown）
│   ├── profile.md
│   ├── projects/
│   ├── learning/
│   └── certifications/
├── lib/
│   └── content.ts        # Markdown 読み込み / パース処理
├── public/               # 画像・バッジ等の静的ファイル
└── amplify.yml           # Amplify ビルド設定
```

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## 利用可能なスクリプト

```bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run start    # 本番モード起動
npm run lint     # ESLint
```

## コンテンツ追加・更新手順

1. `content/projects` / `content/learning` / `content/certifications` に Markdown を追加
2. 既存テンプレート（`*_template.md`）をベースに Frontmatter を入力
3. `order` を調整して表示順を制御
4. 必要な画像を `public/` 配下に配置し、Markdown 側から参照

## 備考

- Frontmatter の必須項目やパース仕様は `lib/content.ts` で定義されています。
- `content/` のテンプレートファイルは表示対象から自動除外されます。
