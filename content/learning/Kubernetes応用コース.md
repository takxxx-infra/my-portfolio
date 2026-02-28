---
title: "GitOps × Istio × 監視統合で構築するKubernetes基盤"
type: "learning"
period: "YYYY.MM"
summary: |
  GitOps を軸に、Kubernetes クラスタの構成管理からデリバリー、運用監視までを一貫して学習。
  マニフェスト管理は Kustomize、OSS 導入は Helm を採用し、Argo CD で継続的に同期する運用モデルを構築した。
  外部公開は ALB Controller + Istio Ingress Gateway で入口を設計し、証明書管理は ACM で統一。
  機密情報は External Secrets Operator と Pod Identity で分離し、Secrets Manager 連携によるセキュア運用を実践。
  監視は Prometheus / Grafana、ログは Fluent Bit から CloudWatch Logs へ集約し、可観測性を強化した。
tech:
  - AWS
  - Kubernetes
techTable:
  - label: "プラットフォーム"
    values:
      - AWS
      - EKS
      - Kubernetes
  - label: "Kubernetesリソース"
    values:
      - Deployment
      - Pod
      - Service (ClusterIP)
      - Ingress
      - ServiceAccount
      - ConfigMap
      - Secret
      - DaemonSet
      - StatefulSet
      - Job
      - CronJob
      - PersistentVolume
      - PersistentVolumeClaim
      - CustomResourceDefinition
  - label: "GitOps/構成管理"
    values:
      - Argo CD
      - Argo CD Image Updater
      - Kustomize
      - Helm
  - label: "運用/監視"
    values:
      - Prometheus
      - Grafana
      - Fluent Bit
      - CloudWatch Logs
  - label: "セキュリティ/連携"
    values:
      - External Secrets Operator
      - Pod Identity
      - AWS Secrets Manager
      - Amazon ECR
      - AWS Load Balancer Controller
      - Istio
outcome: |
  ・Argo CD Image Updater と ECR を連携し、イメージ更新からマニフェスト反映までの GitOps パイプラインを自動化
  ・External Secrets Operator と Pod Identity を組み合わせ、アプリケーションコードに認証情報を埋め込まない運用設計を確立
  ・Fluent Bit / Prometheus / Grafana によるログ・メトリクス統合監視を構築し、障害調査の初動を標準化
  ・ALB + Istio Gateway + VirtualService の構成で L7 ルーティングの実装パターンを整理し、段階的リリースに対応可能な基盤を再現
diagram: "/images/diagrams/cp-k8s-ouyou/cp-k8s-ouyou.png"
order: 40
---
