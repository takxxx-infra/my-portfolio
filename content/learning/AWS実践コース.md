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
order: 10
---
