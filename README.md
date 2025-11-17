# Cloud Engineer Portfolio (Astro)

淡いトーンとドットテクスチャを基調に、AWS×Terraform の実績・学習記録・資格バッジをまとめたポートフォリオです。Astro の MDX Content Collections からデータを読み込み、React islands でタグフィルタやバッジホバーなど動的 UI を実現しています。
今回、Codexを活用し要件定義から実装まで1日かからず作り上げることができました。

## ✨ Features
- **Projects / Learning** 一覧は `src/content/*/*.mdx` から生成。工程（phases）、技術タグ、成果を柔軟に記載可能。
- **ProjectsSection + LearningSection** は `whitespace-pre-line` を活かして frontmatter の改行を UI へ反映。
- **ShutterOverlay** でトップアクセス時のみシャッターアニメーションを表示。
- **Projects フィルタ** と **資格バッジホバー** は React islands (`ProjectExplorer`, `BadgeShowcase`) で実装。

## 🧱 Stack
| Layer | Tech |
| --- | --- |
| Framework | Astro 5 + TypeScript |
| Styling | Tailwind CSS 4, カスタムタグカラー |
| Islands | React 19 |
| Content | MDX (`src/content/projects`, `src/content/learning`) |

## 📂 Structure
```
src/
├─ components/
│  ├─ islands/        # ProjectExplorer, BadgeShowcase など
│  └─ sections/       # Hero/Profile/Projects/Learning/Badges/Contact
├─ content/
│  ├─ projects/*.mdx  # 実務経験
│  └─ learning/*.mdx  # 学習記録
├─ layouts/Layout.astro
└─ pages/
   ├─ index.astro
   ├─ projects.astro
   └─ learning.astro
```

## 🚀 Commands
| Command | Description |
| --- | --- |
| `npm install` | 依存パッケージをインストール |
| `npm run dev` | 開発サーバ (`http://localhost:4321`) |
| `npm run build` | `/dist` へ本番ビルド |
| `npm run preview` | ビルド成果物をローカル確認 |