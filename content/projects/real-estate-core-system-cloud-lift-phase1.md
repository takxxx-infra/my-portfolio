---
title: "不動産系企業 基幹システムのクラウドリフト（Phase 1)"
type: "project"
period: "2025.11 - 2026.01"
role: "Infrastructure Engineer"
summary: |
  不動産系企業のオンプレミス基幹システムを対象に、クラウドリフトの Phase1 として AWS 上にステージング環境とネットワーク基盤（VPC） を構築。
  オンプレミス環境とは Direct Connect で接続し、他アカウントの AD サーバとは VPC ピアリングで連携。
  昨今のセキュリティインシデントを鑑みて、定期的なOSパッチ適用を行いたいものの、運用面でハードルを感じているという課題があった。今回、Patch Managerを使用することで、パッチ適用の標準化および自動適用を実現。
  監視は New Relicで主要メトリクス（S3 / NAT / EC2 / RDS）を可視化。
  インフラと監視設定はTerraformによるIaCで一貫して管理。
tech:
  - AWS
  - Terraform
  - NewRelic
phases:
  - 要件定義
  - 詳細設計
  - 監視設計
  - 構築
techTable:
  - label: "プラットフォーム"
    values:
      - "AWS"
  - label: "AWSサービス"
    values:
      - "VPC"
      - "DXGW"
      - "VPC Peering"
      - "VGW"
      - "EC2"
      - "RDS"
      - "ALB"
      - "S3"
      - "IAM"
      - "AWS Backup"
      - "Patch Manager"
      - "System Manager Session Manager"
      - "AWS Config"
      - "Amazon Data Firehose"
      - "Cloud Watch"
  - label: "OS"
    values:
      - "Windows Server 2025"
  - label: "IaC"
    values:
      - "Terraform"
  - label: "Monitoring"
    values:
      - "NewRelic"
outcome: |
  ・バックアップとパッチ適用を標準化（AWS Backup / Patch Manager）
  ・“監視とIaC” を同じ思想で整備（Terraform + New Relic）
order: 270
---
