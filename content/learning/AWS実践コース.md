---
title: "マルチAZ × ECS(Fargate) × GitHub Actions の実運用を想定した Web/API 基盤"
type: "learning"
period: "2025.07 - 2025.09"
summary: |
  本構成は、東京リージョン（ap-northeast-1）における Webフロント配信〜API実行基盤〜DB までを一通り揃えた、実運用を想定したアーキテクチャを実装。
  フロントエンドは CloudFront を入口に S3（静的配信）/ Amplify（フロント）へルーティングし、バックエンドは ALB 配下で ECS on Fargate をマルチAZに分散して稼働。
  非同期処理は EventBridge / SQSを介して疎結合化し、通知はAmazon SESを活用。
  DBはプライベートサブネットにRDS（PostgreSQL）を配置し、Security Groupによる境界制御を行い、ECSなど必要なリソースからのみ到達可能な設計。
  デプロイはGitHub ActionsからECRへビルドしたイメージをpushし、ecspressoでタスク定義更新・サービス反映・DBマイグレーションまでを自動化。
  運用アクセスはSSM Session Managerを前提に、セキュアな運用を実現。
tech:
  - AWS
  - Terraform
techTable:
  - label: "プラットフォーム"
    values:
      - "AWS"
  - label: "AWSサービス"
    values:
      - AWS Organizations
      - IAM Identity Center
      - IAM Role
      - IAM Policy
      - Route53
      - VPC
      - Subnet
      - Route Table
      - Internet Gateway
      - NAT Gateway
      - Security Group
      - ALB
      - S3
      - EC2
      - ECS
      - ECR
      - RDS
      - Session Manager
      - Secrets Manager
      - Certificate Manager
      - CloudWatch Logs
      - CloudFront
      - Amplify
      - SES
      - SQS
      - EventBridge Scheduler
  - label: "IaC"
    values:
      - "Terraform"
  - label: "CI/CD"
    values:
      - "GitHub Actions"
  - label: "Deploy Tools"
    values:
      - "ecspresso"
outcome: |
  ・CloudFront/WAF/ALB + ECS(Fargate) + RDS(PostgreSQL) の本番相当構成を Terraform で再現し、IaC の標準構成を整備
  ・GitHub Actions と ecspresso を組み合わせ、ECR への push から DB マイグレーション/デプロイまでを自動化
  ・NAT Gateway を EC2 NAT インスタンスへ置き換え、学習環境の通信コストを最小化
diagram: "/images/diagrams/cp-jissenn/cp-jissenn.png"
order: 300
---

## 学習目的
- 実務で使える Web 基盤の標準構成を Terraform で再現し、設計判断の根拠を説明できるようにする。
- セキュリティ/運用/コストのバランスを取りながら、継続的デリバリーまで含めて整備する。
- アプリ、データ、運用、配信のレイヤを分離し、可用性と保守性の観点で設計する。

## 構成の全体像
- Route53 でドメイン管理し、CloudFront を入口に WAF を適用。HTTPS は ACM で管理。
- Web フロントは Amplify でホスティングし、静的コンテンツは S3 から配信。CloudFront でフロント/バックの入口を統一。
- VPC は 2AZ 構成。public subnet に ALB と NAT インスタンス、private subnet に ECS(Fargate) と RDS を配置。
- ECS は API/バッチを分離し、ALB からのリクエストは API タスクへ、バッチは EventBridge Scheduler で起動。
- RDS(PostgreSQL) は Single AZ とし、バックアップやパラメータは最小構成で検証。
- 運用は SSM Session Manager を採用し、踏み台を使わないアクセスを標準化。

## 設計と運用の工夫
- AWS Managed Rules と Bot Control を組み合わせ、L7 攻撃対策をテンプレ化して再利用可能にした。
- Secrets Manager と Parameter Store を用途で使い分け、アプリ設定と秘密情報のライフサイクルを整理。
- NAT Gateway を EC2 NAT インスタンスへ置き換え、学習環境のコストを抑えつつ運用手順を明文化。
- GitHub Actions で ECR への push、ecspresso で ECS デプロイ、DB マイグレーションまでを一連で自動化。

## 学んだこと
- 入口(CloudFront/WAF/ALB)と内部(ECS/RDS)を分離することで、公開範囲と運用責任が明確になる。
- private subnet 前提で ECS/Fargate を構成すると、セキュリティ上の設計判断がシンプルになる。
- CI/CD を先に整えることで、インフラ変更を安全に繰り返せる。
