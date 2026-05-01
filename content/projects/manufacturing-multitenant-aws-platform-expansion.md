---
title: "メーカー系企業向けマルチテナントAWS基盤の追加構築"
type: "project"
period: "2026.01 - 2026.02"
role: "Infrastructure Engineer"
summary: |
  既存AWS環境に対する追加構築として、マルチテナント方式の業務基盤を設計・実装。
  EC2 9台とRDS 9台を1:1で構成し、テナント単位で分離された実行・データ基盤を整備した。
  バックアップはAWS Backupで一元管理し、RDSはPITRを有効化。EC2/RDSともに東京リージョンから大阪リージョンへクロスリージョンコピーを実装し、DR対策を強化。
  監視・通知・コスト可視化まで含め、全リソースをTerraformで一貫管理した。
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
      - "Amazon EC2"
      - "Amazon RDS"
      - "AWS Backup"
      - "Amazon CloudWatch"
      - "CloudWatch Logs"
      - "Amazon SNS"
  - label: "バックアップ/DR"
    values:
      - "RDS PITR"
      - "Cross-Region Copy (Tokyo -> Osaka)"
  - label: "監視"
    values:
      - "RDS Enhanced Monitoring"
      - "Metric Filter"
      - "Custom Metrics"
      - "CloudWatch Alarms (Metric Math)"
  - label: "IaC"
    values:
      - "Terraform"
outcome: |
  ・EC2 9台・RDS 9台を1:1で増設し、マルチテナント方式の追加基盤を短期間で実装
  ・AWS Backup一元管理 + RDS PITR + 大阪リージョンへのクロスリージョンコピーでDR要件を満たすバックアップ基盤を確立
  ・標準メトリクス/カスタムメトリクスを組み合わせ、Metric Mathを用いた複合アラームを設計し監視精度を向上
  ・コスト配分タグによる可視化と、SNSのサブスクリプション解除リンク無効化により運用リスクを低減
order: 250
---
