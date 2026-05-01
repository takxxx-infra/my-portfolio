---
title: "小売企業 CCoE支援：Security Hub 運用設計と通知基盤の設計・構築"
type: "project"
period: "2025.11 - 2025.11"
role: "Infrastructure Engineer"
summary: |
  小売企業のCCoE案件として、AWS Organizations 環境における Security Hub の運用設計と、検知を確実にアクションへ繋げる 通知基盤（EventBridge / Step Functions / DynamoDB / SNS） を設計・構築。
  通知対象コントロールIDの精査によるノイズ削減、SNS経由での Backlog課題自動起票、検知周期を踏まえた 再通知（重複起票）防止まで含めて運用を標準化。
  また、AWSリソースは すべてTerraformで管理し、アカウント追加時に発生する DynamoDBの部門紐付けデータ投入（アイテム追加）などの運用作業もTerraformから実行できるようにして、手作業を最小化。
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
      - "SecurityHub CSPM"
      - "EventBridge"
      - "Step Functions"
      - "DynamoDB"
      - "Amazon SNS"
  - label: "IaC"
    values:
      - "Terraform"
outcome: |
  ・再通知（重複起票）を防ぐワークフローを実現
  ・部門別の通知最適化（DynamoDBで通知先を切替）
order: 260
---
