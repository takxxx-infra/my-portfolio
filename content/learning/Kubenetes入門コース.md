---
title: "ローカル環境で学ぶKubernetes基礎"
type: "learning"
period: "2025.12 - 2025.12"
summary: |
  minikube上に、APIとPostgres DBを配置し、Kubernetesの基本リソースを一通り実装。
  外部アクセスはホストマシンの/etc/hostsにて対象ドメインをノードIPに向け、Ingress →（NodePort）→ ClusterIP → Pod の流れで到達する構成を実現。
  DBはStatefulSet + PVC/PV + Headless Serviceで「Podが入れ替わっても」安定して接続できる形とした。
  運用系としてJob（DBマイグレーション）とCronJob（バッチ処理）も用意し、アプリ以外のワークロードも学習対象に含めた。
  設定値はConfigMap/Secretで分離し、「アプリのコードと環境設定を切り離す」基本を押さえた。
tech:
  - Kubernetes
techTable:
  - label: "プラットフォーム"
    values:
      - "Kubernetes"
      - "Minikube"
  - label: "Kubernetesリソース"
    values:
      - Node
      - Pod
      - Deployment
      - ReplicaSet
      - Service(ClusterIP)
      - Service(Headless)
      - Service(NodePort)
      - Service(LoadBalancer)
      - Ingress
      - ConfigMap
      - Secret
      - Job
      - CronJob
      - tatefulSet
      - PersistentVolume
      - PersistentVolumeClaim
      - HorizontalPodAutoscaler
outcome: |
  
diagram: "/images/diagrams/cp-k8s-nyuumon/k8s_nyuumon_cource.png"
order: 20
---
