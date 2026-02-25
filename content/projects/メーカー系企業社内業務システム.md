---
title: "メーカー系企業の社内業務システム向け AWS 基盤構築"
type: "project"
period: "2025.10 - 2025.11"
role: "Infrastructure Engineer"
summary: |
  メーカー系企業の社内業務システムにおいて、AWS 上にクラウド基盤を構築。
  運用を前提に 本番／開発の2環境を分離し、インフラは Terraform による IaC として整備。構成要素をモジュール化し、環境差分は変数とディレクトリ構成で吸収することで、再現性と保守性を高めた。
  また、外部からの不正アクセスや BOT を想定し、ALB では IP アドレス直アクセスを遮断しつつ、正しい Host ヘッダーでのみリクエストを許可するルールを実装。意図しない経路でのアクセスを抑止し、セキュリティと運用性の両立を図った。
  アプリケーション実行基盤は EC2 を採用し設計・構築。
tech:
  - AWS
  - Terraform
phases:
  - 要件定義
  - 詳細設計
  - 構築
techTable:
  - label: "プラットフォーム"
    values:
      - "AWS"
  - label: "AWSサービス"
    values:
      - "VPC"
      - "EC2"
      - "ALB"
      - "Route 53"
      - "ACM"
      - "AWS Backup"
      - "System Manager Session Manager"
      - "IAM"
  - label: "OS"
    values:
      - "Amazon Linux 2023"
  - label: "IaC"
    values:
      - "Terraform"
outcome: |
  ・Terraform モジュール化による再現性・保守性の向上
  ・ALB で直アクセスをブロックし、正規経路のみ許可
order: 280
---
