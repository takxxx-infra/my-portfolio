---
title: "サーバレスAPIで学ぶAWS応用アーキテクチャ"
type: "learning"
period: "YYYY.MM"
summary: |
  サーバレスアーキテクチャを主題に、API 基盤の設計から運用までを段階的に構築。
  API Gateway + Lambda を中心に、SQS 非同期処理、EventBridge Scheduler の定期実行、Cognito 認証を統合した API 運用を実践。
  さらに RDS Proxy を挟んだ DB 接続と IAM 認証、WAF によるアクセス制御を組み込み、可用性とセキュリティを強化した。
  Lambda のイベント駆動設計に合わせた非同期処理モデルへ移行し、サーバレス特有の設計判断を運用観点まで含めて検証した。
  監視ログやアクセス制御も含め、実運用を意識したサーバレス API の標準構成を整理した。
tech:
  - AWS
  - Serverless
techTable:
  - label: "プラットフォーム"
    values:
      - AWS
  - label: "AWSサービス"
    values:
      - API Gateway (REST API)
      - Lambda
      - SQS
      - EventBridge Scheduler
      - Cognito
      - RDS Proxy
      - AWS WAF
      - Secrets Manager
      - CloudWatch Logs
      - VPC
      - Subnet
      - Security Group
      - IAM Role
      - IAM Policy
      - SSM Parameter Store
outcome: |
  ・API Gateway + Lambda + Cognito + SQS + EventBridge Scheduler を組み合わせ、認証付きサーバレス API の標準構成を再現
  ・RDS Proxy と IAM 認証を組み込むことで、Lambda からの DB 接続安定化と認証情報管理の安全性を両立
  ・Lambda のイベント駆動モデルに合わせ、SQS 連携の非同期処理パターンを実装し、疎結合な API 基盤を整理
  ・WAF と CloudWatch Logs を含む運用パターンを組み込み、実運用を意識した監視・防御観点を体系化
diagram: "/images/diagrams/cp-aws-ouyou/cp-aws-ouyou.png"
order: 30
---
