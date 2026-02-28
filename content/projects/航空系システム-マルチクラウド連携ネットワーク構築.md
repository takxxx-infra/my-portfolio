---
title: "航空系システム向けマルチクラウド連携ネットワーク構築（AWS Direct Connect × AWS Transit Gateway）"
type: "project"
period: "2026.02 - 2026.03"
role: "Infrastructure Engineer"
summary: |
  既存AWS環境への追加構築として、Google Cloud 環境を接続するマルチクラウド連携ネットワークを設計・実装。
  新規に AWS Direct Connect を構築し、Transit virtual interface を Direct Connect gateway に接続したうえで、AWS Transit Gateway と関連付けを実施。
  AWS Transit Gateway route table では blackhole route を活用し、通信経路を明示的かつ確実に制御。
  設計から実装まで約1週間で完了した。
tech:
  - AWS
phases:
  - 詳細設計
  - 構築
techTable:
  - label: "プラットフォーム"
    values:
      - "AWS"
      - "Google Cloud"
  - label: "AWSサービス"
    values:
      - "AWS Direct Connect"
      - "Direct Connect gateway"
      - "AWS Transit Gateway"
      - "Transit virtual interface"
      - "AWS Transit Gateway route table blackhole route"
      - "Transit Gateway Flow Logs"
      - "Amazon S3"
      - "Amazon S3 Lifecycle"
outcome: |
  ・AWS Direct Connect から AWS Transit Gateway までの接続経路を構築し、既存AWS環境とGoogle Cloud環境の連携基盤を短期間で実装
  ・AWS Transit Gateway route table の blackhole route 設計により、不要経路を明示的に遮断し通信制御を強化
  ・Transit Gateway Flow Logs を Amazon S3 に出力し、Amazon S3 Lifecycle で1年経過後に非同期削除する運用を実装
order: 240
---
