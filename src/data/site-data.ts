export interface Article {
  slug: string;
  title: string;
  order: number;
}

export interface Subsection {
  slug: string;
  title: string;
  articles: Article[];
}

export interface Group {
  slug: string;
  title: string;
  subsections: Subsection[];
}

export const BASE_URL = "https://www.systemoverflow.com/learn";

export function buildArticleUrl(
  groupSlug: string,
  subsectionSlug: string,
  articleSlug: string,
): string {
  return `${BASE_URL}/${groupSlug}/${subsectionSlug}/${articleSlug}`;
}

export const siteData: Group[] = [
  {
    slug: "ml-ab-testing",
    title: "AB Testing",
    subsections: [
      {
        slug: "experiment-design",
        title: "Experiment Design",
        articles: [
          {
            slug: "how-do-geo-and-switchback-designs-handle-interference",
            title: "How Do Geo And Switchback Designs Handle Interference",
            order: 6,
          },
          {
            slug: "how-does-event-triggered-assignment-reduce-noise",
            title: "How Does Event Triggered Assignment Reduce Noise",
            order: 4,
          },
          {
            slug: "how-does-stratification-reduce-variance-in-experiments",
            title: "How Does Stratification Reduce Variance In Experiments",
            order: 2,
          },
          {
            slug: "what-are-sample-ratio-mismatch-and-identity-churn-failures",
            title: "What Are Sample Ratio Mismatch And Identity Churn Failures",
            order: 5,
          },
          {
            slug: "what-is-power-analysis-and-why-does-sample-size-matter",
            title: "What Is Power Analysis And Why Does Sample Size Matter",
            order: 3,
          },
          {
            slug: "what-is-randomization-and-sticky-bucketing-in-experiments",
            title: "What Is Randomization And Sticky Bucketing In Experiments",
            order: 1,
          },
        ],
      },
      {
        slug: "guardrail-metrics",
        title: "Guardrail Metrics",
        articles: [
          {
            slug: "guardrail-failure-modes-and-mitigation-strategies",
            title: "Guardrail Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "guardrail-metric-selection-and-tiering",
            title: "Guardrail Metric Selection And Tiering",
            order: 3,
          },
          {
            slug: "production-implementation-and-runtime-architecture",
            title: "Production Implementation And Runtime Architecture",
            order: 4,
          },
          {
            slug: "three-tier-guardrail-framework",
            title: "Three Tier Guardrail Framework",
            order: 2,
          },
          {
            slug: "tradeoffs-guardrail-coverage-vs-experiment-velocity",
            title: "Tradeoffs Guardrail Coverage Vs Experiment Velocity",
            order: 6,
          },
          {
            slug: "what-are-guardrail-metrics",
            title: "What Are Guardrail Metrics",
            order: 1,
          },
        ],
      },
      {
        slug: "holdout-groups",
        title: "Holdout Groups",
        articles: [
          {
            slug: "failure-modes-selection-bias-contamination-and-reshuffling",
            title: "Failure Modes Selection Bias Contamination And Reshuffling",
            order: 4,
          },
          {
            slug: "holdout-assignment-deterministic-hashing-and-cohort-management",
            title:
              "Holdout Assignment Deterministic Hashing And Cohort Management",
            order: 2,
          },
          {
            slug: "implementation-gating-analytics-and-dual-path-management",
            title: "Implementation Gating Analytics And Dual Path Management",
            order: 5,
          },
          {
            slug: "long-term-measurement-and-cumulative-impact",
            title: "Long Term Measurement And Cumulative Impact",
            order: 6,
          },
          {
            slug: "trade-offs-statistical-power-operational-complexity-and-cost",
            title:
              "Trade Offs Statistical Power Operational Complexity And Cost",
            order: 3,
          },
          {
            slug: "what-are-holdout-groups-and-why-do-they-matter",
            title: "What Are Holdout Groups And Why Do They Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "interleaving-experiments",
        title: "Interleaving Experiments",
        articles: [
          {
            slug: "interleaving-failure-modes-and-edge-cases",
            title: "Interleaving Failure Modes And Edge Cases",
            order: 5,
          },
          {
            slug: "interleaving-vs-ab-testing-trade-offs",
            title: "Interleaving Vs AB Testing Trade Offs",
            order: 4,
          },
          {
            slug: "production-implementation-and-scale-considerations",
            title: "Production Implementation And Scale Considerations",
            order: 6,
          },
          {
            slug: "statistical-analysis-and-preference-margins",
            title: "Statistical Analysis And Preference Margins",
            order: 3,
          },
          {
            slug: "team-draft-interleaving-algorithm",
            title: "Team Draft Interleaving Algorithm",
            order: 2,
          },
          {
            slug: "what-is-interleaving-for-ranking-models",
            title: "What Is Interleaving For Ranking Models",
            order: 1,
          },
        ],
      },
      {
        slug: "multi-armed-bandits",
        title: "Multi Armed Bandits",
        articles: [
          {
            slug: "contextual-bandits-linucb-and-neural-linear-methods",
            title: "Contextual Bandits Linucb And Neural Linear Methods",
            order: 6,
          },
          {
            slug: "failure-modes-delayed-rewards-and-nonstationarity",
            title: "Failure Modes Delayed Rewards And Nonstationarity",
            order: 5,
          },
          {
            slug: "multi-armed-bandits-balancing-exploration-and-exploitation",
            title: "Multi Armed Bandits Balancing Exploration And Exploitation",
            order: 1,
          },
          {
            slug: "production-architecture-serving-bandits-at-scale",
            title: "Production Architecture Serving Bandits At Scale",
            order: 4,
          },
          {
            slug: "thompson-sampling-bayesian-probability-matching",
            title: "Thompson Sampling Bayesian Probability Matching",
            order: 3,
          },
          {
            slug: "upper-confidence-bound-ucb-optimism-under-uncertainty",
            title: "Upper Confidence Bound Ucb Optimism Under Uncertainty",
            order: 2,
          },
        ],
      },
      {
        slug: "ramp-up-strategies",
        title: "Ramp Up Strategies",
        articles: [
          {
            slug: "canary-metrics-system-product-and-data-quality-signals",
            title: "Canary Metrics System Product And Data Quality Signals",
            order: 3,
          },
          {
            slug: "failure-modes-biased-cohorts-cold-start-and-feedback-loops",
            title: "Failure Modes Biased Cohorts Cold Start And Feedback Loops",
            order: 5,
          },
          {
            slug: "implementation-traffic-routing-metric-collection-and-decision-engine",
            title:
              "Implementation Traffic Routing Metric Collection And Decision Engine",
            order: 6,
          },
          {
            slug: "ramp-up-strategies-traffic-shaping-and-cohort-assignment",
            title: "Ramp Up Strategies Traffic Shaping And Cohort Assignment",
            order: 2,
          },
          {
            slug: "trade-offs-canary-vs-blue-green-vs-shadow-deployment",
            title: "Trade Offs Canary Vs Blue Green Vs Shadow Deployment",
            order: 4,
          },
          {
            slug: "what-is-canary-analysis-in-ml-systems",
            title: "What Is Canary Analysis In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "statistical-significance",
        title: "Statistical Significance",
        articles: [
          {
            slug: "confidence-intervals-precision-and-practical-interpretation",
            title:
              "Confidence Intervals Precision And Practical Interpretation",
            order: 2,
          },
          {
            slug: "experimentation-at-scale-randomization-metrics-and-variance-reduction",
            title:
              "Experimentation At Scale Randomization Metrics And Variance Reduction",
            order: 3,
          },
          {
            slug: "failure-modes-srm-peeking-interference-and-heavy-tails-in-production",
            title:
              "Failure Modes Srm Peeking Interference And Heavy Tails In Production",
            order: 5,
          },
          {
            slug: "statistical-significance-understanding-p-values-and-type-iii-errors",
            title:
              "Statistical Significance Understanding P Values And Type Iii Errors",
            order: 1,
          },
          {
            slug: "trade-offs-sequential-monitoring-unit-of-randomization-and-interval-methods",
            title:
              "Trade Offs Sequential Monitoring Unit Of Randomization And Interval Methods",
            order: 4,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-cv-systems",
    title: "CV Systems",
    subsections: [
      {
        slug: "cv-data-augmentation",
        title: "CV Data Augmentation",
        articles: [
          {
            slug: "autoaugment-automated-policy-discovery",
            title: "Autoaugment Automated Policy Discovery",
            order: 2,
          },
          {
            slug: "failure-modes-and-edge-cases-in-data-augmentation",
            title: "Failure Modes And Edge Cases In Data Augmentation",
            order: 5,
          },
          {
            slug: "mixup-linear-interpolation-for-regularization",
            title: "Mixup Linear Interpolation For Regularization",
            order: 3,
          },
          {
            slug: "production-implementation-augmentation-as-a-system-component",
            title:
              "Production Implementation Augmentation As A System Component",
            order: 6,
          },
          {
            slug: "synthetic-data-generation-for-computer-vision",
            title: "Synthetic Data Generation For Computer Vision",
            order: 4,
          },
          {
            slug: "what-is-data-augmentation-in-computer-vision",
            title: "What Is Data Augmentation In Computer Vision",
            order: 1,
          },
        ],
      },
      {
        slug: "cv-evaluation",
        title: "CV Evaluation",
        articles: [
          {
            slug: "choosing-metrics-and-protocols-for-your-task",
            title: "Choosing Metrics And Protocols For Your Task",
            order: 6,
          },
          {
            slug: "evaluation-failure-modes-and-metric-gaming-risks",
            title: "Evaluation Failure Modes And Metric Gaming Risks",
            order: 5,
          },
          {
            slug: "production-evaluation-pipelines-scale-cost-and-operating-points",
            title:
              "Production Evaluation Pipelines Scale Cost And Operating Points",
            order: 4,
          },
          {
            slug: "understanding-precision-recall-and-the-precision-recall-curve",
            title:
              "Understanding Precision Recall And The Precision Recall Curve",
            order: 2,
          },
          {
            slug: "what-is-average-precision-ap-and-mean-average-precision-map",
            title:
              "What Is Average Precision Ap And Mean Average Precision Map",
            order: 3,
          },
          {
            slug: "what-is-intersection-over-union-iou-and-why-does-it-matter",
            title: "What Is Intersection Over Union Iou And Why Does It Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "edge-deployment",
        title: "Edge Deployment",
        articles: [
          {
            slug: "accuracy-vs-latency-trade-offs-choosing-between-ssd-mobilenet-and-efficientdet-lite",
            title:
              "Accuracy Vs Latency Trade Offs Choosing Between Ssd Mobilenet And Efficientdet Lite",
            order: 6,
          },
          {
            slug: "edge-deployment-failure-modes-quantization-drift-thermal-throttling-and-nms-explosions",
            title:
              "Edge Deployment Failure Modes Quantization Drift Thermal Throttling And Nms Explosions",
            order: 5,
          },
          {
            slug: "efficientnet-lite-compound-scaling-for-hardware-constrained-deployment",
            title:
              "Efficientnet Lite Compound Scaling For Hardware Constrained Deployment",
            order: 3,
          },
          {
            slug: "how-mobilenet-achieves-8x-faster-inference-with-depthwise-separable-convolutions",
            title:
              "How Mobilenet Achieves 8x Faster Inference With Depthwise Separable Convolutions",
            order: 2,
          },
          {
            slug: "real-time-edge-pipeline-from-sensor-to-action-in-33ms",
            title: "Real Time Edge Pipeline From Sensor To Action In 33ms",
            order: 4,
          },
          {
            slug: "what-makes-edge-deployment-different-from-cloud-inference",
            title: "What Makes Edge Deployment Different From Cloud Inference",
            order: 1,
          },
        ],
      },
      {
        slug: "image-classification-scale",
        title: "Image Classification Scale",
        articles: [
          {
            slug: "critical-trade-offs-model-choice-serving-strategy-and-cost",
            title: "Critical Trade Offs Model Choice Serving Strategy And Cost",
            order: 4,
          },
          {
            slug: "failure-modes-and-production-reliability",
            title: "Failure Modes And Production Reliability",
            order: 5,
          },
          {
            slug: "image-classification-at-scale-architecture-and-data-flow",
            title: "Image Classification At Scale Architecture And Data Flow",
            order: 1,
          },
          {
            slug: "model-versioning-rollout-and-governance",
            title: "Model Versioning Rollout And Governance",
            order: 6,
          },
          {
            slug: "online-serving-architecture-dynamic-batching-and-caching",
            title: "Online Serving Architecture Dynamic Batching And Caching",
            order: 3,
          },
          {
            slug: "training-pipeline-from-pretraining-to-production",
            title: "Training Pipeline From Pretraining To Production",
            order: 2,
          },
        ],
      },
      {
        slug: "image-preprocessing",
        title: "Image Preprocessing",
        articles: [
          {
            slug: "common-preprocessing-failure-modes-in-production",
            title: "Common Preprocessing Failure Modes In Production",
            order: 5,
          },
          {
            slug: "domain-specific-preprocessing-constraints",
            title: "Domain Specific Preprocessing Constraints",
            order: 6,
          },
          {
            slug: "image-augmentation-fundamentals",
            title: "Image Augmentation Fundamentals",
            order: 1,
          },
          {
            slug: "normalization-and-input-standardization",
            title: "Normalization And Input Standardization",
            order: 2,
          },
          {
            slug: "offline-vs-on-the-fly-augmentation-tradeoffs",
            title: "Offline Vs On The Fly Augmentation Tradeoffs",
            order: 4,
          },
          {
            slug: "production-data-pipeline-design-and-throughput",
            title: "Production Data Pipeline Design And Throughput",
            order: 3,
          },
        ],
      },
      {
        slug: "multi-task-learning-cv",
        title: "Multi Task Learning CV",
        articles: [
          {
            slug: "failure-modes-negative-transfer-and-data-drift",
            title: "Failure Modes Negative Transfer And Data Drift",
            order: 5,
          },
          {
            slug: "hard-vs-soft-parameter-sharing-strategies",
            title: "Hard Vs Soft Parameter Sharing Strategies",
            order: 2,
          },
          {
            slug: "loss-balancing-and-gradient-interference",
            title: "Loss Balancing And Gradient Interference",
            order: 3,
          },
          {
            slug: "production-implementation-and-serving-architecture",
            title: "Production Implementation And Serving Architecture",
            order: 4,
          },
          {
            slug: "what-is-multi-task-learning",
            title: "What Is Multi Task Learning",
            order: 1,
          },
          {
            slug: "when-to-choose-multi-task-vs-separate-models",
            title: "When To Choose Multi Task Vs Separate Models",
            order: 6,
          },
        ],
      },
      {
        slug: "object-detection",
        title: "Object Detection",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-production-object-detection",
            title:
              "Failure Modes And Edge Cases In Production Object Detection",
            order: 5,
          },
          {
            slug: "production-trade-offs-when-to-choose-two-stage-vs-single-stage-detectors",
            title:
              "Production Trade Offs When To Choose Two Stage Vs Single Stage Detectors",
            order: 4,
          },
          {
            slug: "single-stage-detectors-yolo-ssd-and-real-time-performance",
            title: "Single Stage Detectors Yolo Ssd And Real Time Performance",
            order: 3,
          },
          {
            slug: "two-stage-detectors-r-cnn-family-evolution-and-performance",
            title: "Two Stage Detectors R Cnn Family Evolution And Performance",
            order: 2,
          },
          {
            slug: "video-optimization-and-multi-camera-deployment-strategies",
            title: "Video Optimization And Multi Camera Deployment Strategies",
            order: 6,
          },
          {
            slug: "what-is-object-detection-and-how-does-it-differ-from-classification",
            title:
              "What Is Object Detection And How Does It Differ From Classification",
            order: 1,
          },
        ],
      },
      {
        slug: "video-processing",
        title: "Video Processing",
        articles: [
          {
            slug: "city-scale-video-analytics-system-design",
            title: "City Scale Video Analytics System Design",
            order: 2,
          },
          {
            slug: "edge-vs-cloud-inference-trade-offs-for-video-ml",
            title: "Edge Vs Cloud Inference Trade Offs For Video Ml",
            order: 3,
          },
          {
            slug: "failure-modes-in-production-video-ml-systems",
            title: "Failure Modes In Production Video Ml Systems",
            order: 4,
          },
          {
            slug: "gpu-inference-scheduling-and-batching-strategies",
            title: "Gpu Inference Scheduling And Batching Strategies",
            order: 5,
          },
          {
            slug: "real-time-video-processing-pipeline-architecture",
            title: "Real Time Video Processing Pipeline Architecture",
            order: 1,
          },
          {
            slug: "temporal-downsampling-and-motion-gating-for-cost-efficiency",
            title:
              "Temporal Downsampling And Motion Gating For Cost Efficiency",
            order: 6,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-embeddings",
    title: "Embeddings",
    subsections: [
      {
        slug: "approximate-nearest-neighbors",
        title: "Approximate Nearest Neighbors",
        articles: [
          {
            slug: "ann-failure-modes-data-drift-imbalanced-partitions-and-hardware-effects",
            title:
              "Ann Failure Modes Data Drift Imbalanced Partitions And Hardware Effects",
            order: 6,
          },
          {
            slug: "faiss-ivf-pq-inverted-file-with-product-quantization",
            title: "Faiss Ivf Pq Inverted File With Product Quantization",
            order: 3,
          },
          {
            slug: "hnsw-graph-based-proximity-search",
            title: "Hnsw Graph Based Proximity Search",
            order: 2,
          },
          {
            slug: "scann-learning-based-quantization-for-maximum-inner-product-search",
            title:
              "Scann Learning Based Quantization For Maximum Inner Product Search",
            order: 5,
          },
          {
            slug: "two-stage-retrieval-ann-candidate-generation-re-ranking",
            title: "Two Stage Retrieval Ann Candidate Generation Re Ranking",
            order: 4,
          },
          {
            slug: "what-is-approximate-nearest-neighbor-ann-search",
            title: "What Is Approximate Nearest Neighbor Ann Search",
            order: 1,
          },
        ],
      },
      {
        slug: "dimensionality-reduction",
        title: "Dimensionality Reduction",
        articles: [
          {
            slug: "advanced-patterns-pca-with-quantization-and-refresh-strategies",
            title:
              "Advanced Patterns Pca With Quantization And Refresh Strategies",
            order: 6,
          },
          {
            slug: "pca-vs-umap-choosing-the-right-technique",
            title: "Pca Vs Umap Choosing The Right Technique",
            order: 4,
          },
          {
            slug: "principal-component-analysis-pca-for-online-systems",
            title: "Principal Component Analysis Pca For Online Systems",
            order: 2,
          },
          {
            slug: "production-implementation-and-failure-modes",
            title: "Production Implementation And Failure Modes",
            order: 5,
          },
          {
            slug: "umap-for-offline-visualization-and-clustering",
            title: "Umap For Offline Visualization And Clustering",
            order: 3,
          },
          {
            slug: "what-is-dimensionality-reduction-and-why-do-we-need-it",
            title: "What Is Dimensionality Reduction And Why Do We Need It",
            order: 1,
          },
        ],
      },
      {
        slug: "embedding-generation",
        title: "Embedding Generation",
        articles: [
          {
            slug: "bert-vs-sentence-bert-token-context-vs-sentence-similarity",
            title: "Bert Vs Sentence Bert Token Context Vs Sentence Similarity",
            order: 2,
          },
          {
            slug: "graph-embeddings-for-collaborative-and-structural-signals",
            title: "Graph Embeddings For Collaborative And Structural Signals",
            order: 3,
          },
          {
            slug: "index-architecture-memory-quantization-and-approximate-search",
            title:
              "Index Architecture Memory Quantization And Approximate Search",
            order: 4,
          },
          {
            slug: "production-failure-modes-drift-truncation-and-domain-mismatch",
            title:
              "Production Failure Modes Drift Truncation And Domain Mismatch",
            order: 5,
          },
          {
            slug: "two-stage-retrieval-candidate-generation-and-re-ranking-at-scale",
            title:
              "Two Stage Retrieval Candidate Generation And Re Ranking At Scale",
            order: 6,
          },
          {
            slug: "what-is-embedding-generation-and-why-it-matters",
            title: "What Is Embedding Generation And Why It Matters",
            order: 1,
          },
        ],
      },
      {
        slug: "embedding-quality-evaluation",
        title: "Embedding Quality Evaluation",
        articles: [
          {
            slug: "dimensionality-and-quantization-trade-offs",
            title: "Dimensionality And Quantization Trade Offs",
            order: 4,
          },
          {
            slug: "hubness-and-anisotropy-failure-modes",
            title: "Hubness And Anisotropy Failure Modes",
            order: 5,
          },
          {
            slug: "intrinsic-vs-extrinsic-evaluation-trade-offs",
            title: "Intrinsic Vs Extrinsic Evaluation Trade Offs",
            order: 3,
          },
          {
            slug: "mteb-and-beir-benchmark-evaluation",
            title: "Mteb And Beir Benchmark Evaluation",
            order: 2,
          },
          {
            slug: "production-rollout-and-version-management",
            title: "Production Rollout And Version Management",
            order: 6,
          },
          {
            slug: "what-is-embedding-quality-evaluation",
            title: "What Is Embedding Quality Evaluation",
            order: 1,
          },
        ],
      },
      {
        slug: "hard-negative-mining",
        title: "Hard Negative Mining",
        articles: [
          {
            slug: "failure-modes-false-negatives-and-label-noise",
            title: "Failure Modes False Negatives And Label Noise",
            order: 4,
          },
          {
            slug: "online-vs-offline-hard-negative-mining-architecture",
            title: "Online Vs Offline Hard Negative Mining Architecture",
            order: 3,
          },
          {
            slug: "production-implementation-metrics-monitoring-and-serving-impact",
            title:
              "Production Implementation Metrics Monitoring And Serving Impact",
            order: 5,
          },
          {
            slug: "triplet-loss-and-contrastive-loss-formulations",
            title: "Triplet Loss And Contrastive Loss Formulations",
            order: 2,
          },
          {
            slug: "what-is-hard-negative-mining",
            title: "What Is Hard Negative Mining",
            order: 1,
          },
        ],
      },
      {
        slug: "index-management",
        title: "Index Management",
        articles: [
          {
            slug: "failure-modes-encoder-mismatch-and-hot-shard-skew",
            title: "Failure Modes Encoder Mismatch And Hot Shard Skew",
            order: 5,
          },
          {
            slug: "index-building-batch-construction-vs-incremental-updates",
            title: "Index Building Batch Construction Vs Incremental Updates",
            order: 2,
          },
          {
            slug: "index-families-for-ml-systems-inverted-vs-vector-indexes",
            title: "Index Families For Ml Systems Inverted Vs Vector Indexes",
            order: 1,
          },
          {
            slug: "sharding-vector-indexes-balancing-load-and-latency",
            title: "Sharding Vector Indexes Balancing Load And Latency",
            order: 3,
          },
          {
            slug: "trade-offs-freshness-recall-latency-and-cost",
            title: "Trade Offs Freshness Recall Latency And Cost",
            order: 6,
          },
          {
            slug: "update-strategies-deletes-tombstones-and-compaction",
            title: "Update Strategies Deletes Tombstones And Compaction",
            order: 4,
          },
        ],
      },
      {
        slug: "realtime-embedding-updates",
        title: "Realtime Embedding Updates",
        articles: [
          {
            slug: "dynamic-vector-indexes-for-continuous-updates",
            title: "Dynamic Vector Indexes For Continuous Updates",
            order: 3,
          },
          {
            slug: "hot-index-plus-main-index-architecture",
            title: "Hot Index Plus Main Index Architecture",
            order: 2,
          },
          {
            slug: "index-drift-and-consistency-guarantees",
            title: "Index Drift And Consistency Guarantees",
            order: 4,
          },
          {
            slug: "model-evolution-and-dual-indexing",
            title: "Model Evolution And Dual Indexing",
            order: 5,
          },
          {
            slug: "operational-metrics-and-failure-detection",
            title: "Operational Metrics And Failure Detection",
            order: 6,
          },
          {
            slug: "what-is-real-time-incremental-indexing",
            title: "What Is Real Time Incremental Indexing",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-feature-stores",
    title: "Feature Stores",
    subsections: [
      {
        slug: "feature-backfilling",
        title: "Feature Backfilling",
        articles: [
          {
            slug: "backfill-cost-and-throughput-planning",
            title: "Backfill Cost And Throughput Planning",
            order: 2,
          },
          {
            slug: "common-backfill-failure-modes-and-mitigations",
            title: "Common Backfill Failure Modes And Mitigations",
            order: 5,
          },
          {
            slug: "idempotency-and-atomic-publication-patterns",
            title: "Idempotency And Atomic Publication Patterns",
            order: 4,
          },
          {
            slug: "point-in-time-joins-and-slowly-changing-dimensions",
            title: "Point In Time Joins And Slowly Changing Dimensions",
            order: 3,
          },
          {
            slug: "state-carryover-and-incremental-backfill-strategies",
            title: "State Carryover And Incremental Backfill Strategies",
            order: 6,
          },
          {
            slug: "what-is-feature-backfilling-in-ml-systems",
            title: "What Is Feature Backfilling In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "feature-freshness",
        title: "Feature Freshness",
        articles: [
          {
            slug: "event-time-semantics-and-point-in-time-correctness",
            title: "Event Time Semantics And Point In Time Correctness",
            order: 2,
          },
          {
            slug: "failure-modes-silent-staleness-and-training-serving-skew",
            title: "Failure Modes Silent Staleness And Training Serving Skew",
            order: 5,
          },
          {
            slug: "hybrid-freshness-architecture-batch-nearline-and-request-time",
            title:
              "Hybrid Freshness Architecture Batch Nearline And Request Time",
            order: 3,
          },
          {
            slug: "monitoring-freshness-and-handling-staleness-in-production",
            title: "Monitoring Freshness And Handling Staleness In Production",
            order: 4,
          },
          {
            slug: "production-implementation-metadata-tiering-and-capacity-planning",
            title:
              "Production Implementation Metadata Tiering And Capacity Planning",
            order: 6,
          },
          {
            slug: "what-is-feature-freshness-and-why-does-it-matter",
            title: "What Is Feature Freshness And Why Does It Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "feature-monitoring",
        title: "Feature Monitoring",
        articles: [
          {
            slug: "feature-monitoring-failure-modes-schema-changes-label-delays-and-feedback-loops",
            title:
              "Feature Monitoring Failure Modes Schema Changes Label Delays And Feedback Loops",
            order: 4,
          },
          {
            slug: "static-vs-dynamic-baselines-choosing-your-reference-distribution",
            title:
              "Static Vs Dynamic Baselines Choosing Your Reference Distribution",
            order: 2,
          },
          {
            slug: "streaming-vs-batch-monitoring-latency-cost-and-complexity-tradeoffs",
            title:
              "Streaming Vs Batch Monitoring Latency Cost And Complexity Tradeoffs",
            order: 3,
          },
          {
            slug: "what-is-feature-monitoring-and-why-track-drift-missing-values-and-outliers",
            title:
              "What Is Feature Monitoring And Why Track Drift Missing Values And Outliers",
            order: 1,
          },
        ],
      },
      {
        slug: "feature-sharing-discovery",
        title: "Feature Sharing Discovery",
        articles: [
          {
            slug: "feature-discovery-ranking-trust-and-quality-signals",
            title: "Feature Discovery Ranking Trust And Quality Signals",
            order: 2,
          },
          {
            slug: "feature-sharing-discovery-the-dual-plane-architecture",
            title: "Feature Sharing Discovery The Dual Plane Architecture",
            order: 1,
          },
          {
            slug: "feature-store-failure-modes-and-reliability-patterns",
            title: "Feature Store Failure Modes And Reliability Patterns",
            order: 6,
          },
          {
            slug: "feature-store-trade-offs-when-not-to-centralize",
            title: "Feature Store Trade Offs When Not To Centralize",
            order: 5,
          },
          {
            slug: "online-feature-serving-latency-budgets-and-scale",
            title: "Online Feature Serving Latency Budgets And Scale",
            order: 4,
          },
          {
            slug: "training-serving-skew-the-silent-accuracy-killer",
            title: "Training Serving Skew The Silent Accuracy Killer",
            order: 3,
          },
        ],
      },
      {
        slug: "feature-store-architecture",
        title: "Feature Store Architecture",
        articles: [
          {
            slug: "dual-store-architecture-offline-and-online-feature-stores",
            title: "Dual Store Architecture Offline And Online Feature Stores",
            order: 1,
          },
          {
            slug: "feature-materialization-batch-streaming-and-request-time",
            title: "Feature Materialization Batch Streaming And Request Time",
            order: 3,
          },
          {
            slug: "online-serving-architecture-and-latency-budgets",
            title: "Online Serving Architecture And Latency Budgets",
            order: 4,
          },
          {
            slug: "platform-choices-feast-tecton-and-hopsworks",
            title: "Platform Choices Feast Tecton And Hopsworks",
            order: 6,
          },
          {
            slug: "point-in-time-correctness-and-time-travel",
            title: "Point In Time Correctness And Time Travel",
            order: 2,
          },
          {
            slug: "training-serving-skew-and-distribution-drift",
            title: "Training Serving Skew And Distribution Drift",
            order: 5,
          },
        ],
      },
      {
        slug: "feature-transformation-pipelines",
        title: "Feature Transformation Pipelines",
        articles: [
          {
            slug: "choosing-streaming-vs-batch-latency-cost-and-operational-trade-offs",
            title:
              "Choosing Streaming Vs Batch Latency Cost And Operational Trade Offs",
            order: 5,
          },
          {
            slug: "exactly-once-semantics-idempotency-checkpoints-and-sink-guarantees",
            title:
              "Exactly Once Semantics Idempotency Checkpoints And Sink Guarantees",
            order: 6,
          },
          {
            slug: "feature-transformation-pipelines-streaming-vs-batch-architecture",
            title:
              "Feature Transformation Pipelines Streaming Vs Batch Architecture",
            order: 1,
          },
          {
            slug: "production-failure-modes-backpressure-skew-and-state-explosion",
            title:
              "Production Failure Modes Backpressure Skew And State Explosion",
            order: 4,
          },
          {
            slug: "stateful-streaming-keyed-state-management-and-windowing",
            title: "Stateful Streaming Keyed State Management And Windowing",
            order: 2,
          },
          {
            slug: "training-serving-skew-achieving-feature-parity-across-pipelines",
            title:
              "Training Serving Skew Achieving Feature Parity Across Pipelines",
            order: 3,
          },
        ],
      },
      {
        slug: "online-vs-offline-features",
        title: "Online Vs Offline Features",
        articles: [
          {
            slug: "freshness-vs-point-in-time-correctness",
            title: "Freshness Vs Point In Time Correctness",
            order: 3,
          },
          {
            slug: "latency-vs-cost-trade-offs-in-feature-storage",
            title: "Latency Vs Cost Trade Offs In Feature Storage",
            order: 2,
          },
          {
            slug: "online-vs-offline-features-core-distinction",
            title: "Online Vs Offline Features Core Distinction",
            order: 1,
          },
          {
            slug: "operational-failure-modes-in-production-feature-stores",
            title: "Operational Failure Modes In Production Feature Stores",
            order: 6,
          },
          {
            slug: "tail-latency-management-and-query-fanout",
            title: "Tail Latency Management And Query Fanout",
            order: 5,
          },
          {
            slug: "training-serving-skew-root-causes-and-mitigation",
            title: "Training Serving Skew Root Causes And Mitigation",
            order: 4,
          },
        ],
      },
      {
        slug: "point-in-time-correctness",
        title: "Point In Time Correctness",
        articles: [
          {
            slug: "implementing-temporal-as-of-joins-for-pit-correctness",
            title: "Implementing Temporal As Of Joins For Pit Correctness",
            order: 2,
          },
          {
            slug: "pit-correctness-failure-modes-and-edge-cases",
            title: "Pit Correctness Failure Modes And Edge Cases",
            order: 5,
          },
          {
            slug: "time-travel-storage-patterns-for-feature-versioning",
            title: "Time Travel Storage Patterns For Feature Versioning",
            order: 3,
          },
          {
            slug: "trading-off-storage-cost-freshness-and-pit-guarantees",
            title: "Trading Off Storage Cost Freshness And Pit Guarantees",
            order: 6,
          },
          {
            slug: "train-serve-skew-from-pit-violations",
            title: "Train Serve Skew From Pit Violations",
            order: 4,
          },
          {
            slug: "what-is-point-in-time-pit-correctness-in-ml-systems",
            title: "What Is Point In Time Pit Correctness In Ml Systems",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-fraud-detection",
    title: "Fraud Detection",
    subsections: [
      {
        slug: "adversarial-robustness",
        title: "Adversarial Robustness",
        articles: [
          {
            slug: "adversarial-training-the-core-defense-with-real-cost-trade-offs",
            title:
              "Adversarial Training The Core Defense With Real Cost Trade Offs",
            order: 2,
          },
          {
            slug: "failure-modes-when-adversarial-defenses-break-in-production",
            title:
              "Failure Modes When Adversarial Defenses Break In Production",
            order: 4,
          },
          {
            slug: "implementation-blueprint-building-layered-adversarial-defense-systems",
            title:
              "Implementation Blueprint Building Layered Adversarial Defense Systems",
            order: 5,
          },
          {
            slug: "production-architecture-fast-path-vs-slow-path-for-adversarial-defense",
            title:
              "Production Architecture Fast Path Vs Slow Path For Adversarial Defense",
            order: 3,
          },
          {
            slug: "real-world-trade-offs-when-to-use-adversarial-defenses-vs-alternatives",
            title:
              "Real World Trade Offs When To Use Adversarial Defenses Vs Alternatives",
            order: 6,
          },
          {
            slug: "what-is-adversarial-robustness-in-fraud-detection-systems",
            title: "What Is Adversarial Robustness In Fraud Detection Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "fraud-feature-engineering",
        title: "Fraud Feature Engineering",
        articles: [
          {
            slug: "aggregations-over-windows-summarizing-temporal-behavior",
            title: "Aggregations Over Windows Summarizing Temporal Behavior",
            order: 2,
          },
          {
            slug: "failure-modes-label-leakage-skew-and-adversarial-evasion",
            title: "Failure Modes Label Leakage Skew And Adversarial Evasion",
            order: 5,
          },
          {
            slug: "online-and-offline-feature-computation-architecture",
            title: "Online And Offline Feature Computation Architecture",
            order: 4,
          },
          {
            slug: "temporal-patterns-capturing-seasonality-and-time-based-signals",
            title:
              "Temporal Patterns Capturing Seasonality And Time Based Signals",
            order: 1,
          },
          {
            slug: "trade-offs-window-size-exactness-and-feature-breadth",
            title: "Trade Offs Window Size Exactness And Feature Breadth",
            order: 6,
          },
          {
            slug: "velocity-features-measuring-rate-and-acceleration",
            title: "Velocity Features Measuring Rate And Acceleration",
            order: 3,
          },
        ],
      },
      {
        slug: "graph-fraud-detection",
        title: "Graph Fraud Detection",
        articles: [
          {
            slug: "failure-modes-and-adversarial-robustness-in-graph-fraud-detection",
            title:
              "Failure Modes And Adversarial Robustness In Graph Fraud Detection",
            order: 4,
          },
          {
            slug: "how-graph-neural-networks-learn-fraud-patterns",
            title: "How Graph Neural Networks Learn Fraud Patterns",
            order: 2,
          },
          {
            slug: "implementation-details-sampling-caching-and-ensemble-fusion",
            title:
              "Implementation Details Sampling Caching And Ensemble Fusion",
            order: 5,
          },
          {
            slug: "production-serving-architecture-latency-and-scale-trade-offs",
            title:
              "Production Serving Architecture Latency And Scale Trade Offs",
            order: 3,
          },
          {
            slug: "why-fraud-detection-needs-graph-based-models",
            title: "Why Fraud Detection Needs Graph Based Models",
            order: 1,
          },
        ],
      },
      {
        slug: "imbalanced-data-handling",
        title: "Imbalanced Data Handling",
        articles: [
          {
            slug: "class-weighting-and-focal-loss-reweighting-the-loss-function",
            title:
              "Class Weighting And Focal Loss Reweighting The Loss Function",
            order: 3,
          },
          {
            slug: "end-to-end-production-architecture-for-imbalanced-data-systems",
            title:
              "End To End Production Architecture For Imbalanced Data Systems",
            order: 6,
          },
          {
            slug: "failure-modes-and-edge-cases-in-imbalanced-data-handling",
            title: "Failure Modes And Edge Cases In Imbalanced Data Handling",
            order: 5,
          },
          {
            slug: "production-trade-offs-when-to-use-each-technique",
            title: "Production Trade Offs When To Use Each Technique",
            order: 4,
          },
          {
            slug: "smote-synthetic-minority-oversampling-technique",
            title: "Smote Synthetic Minority Oversampling Technique",
            order: 2,
          },
          {
            slug: "why-imbalanced-data-breaks-standard-machine-learning",
            title: "Why Imbalanced Data Breaks Standard Machine Learning",
            order: 1,
          },
        ],
      },
      {
        slug: "realtime-fraud-scoring",
        title: "Realtime Fraud Scoring",
        articles: [
          {
            slug: "accuracy-vs-latency-trade-offs-model-cascades-and-dynamic-batching",
            title:
              "Accuracy Vs Latency Trade Offs Model Cascades And Dynamic Batching",
            order: 3,
          },
          {
            slug: "deployment-observability-and-capacity-planning-for-production-ml-serving",
            title:
              "Deployment Observability And Capacity Planning For Production Ml Serving",
            order: 6,
          },
          {
            slug: "online-feature-store-architecture-for-sub-10ms-reads",
            title: "Online Feature Store Architecture For Sub 10ms Reads",
            order: 5,
          },
          {
            slug: "tail-latency-amplification-and-cascading-failures-in-real-time-systems",
            title:
              "Tail Latency Amplification And Cascading Failures In Real Time Systems",
            order: 4,
          },
          {
            slug: "the-complete-real-time-scoring-flow-for-fraud-detection",
            title: "The Complete Real Time Scoring Flow For Fraud Detection",
            order: 2,
          },
          {
            slug: "what-is-real-time-scoring-and-why-is-latency-critical",
            title: "What Is Real Time Scoring And Why Is Latency Critical",
            order: 1,
          },
        ],
      },
      {
        slug: "supervised-anomaly-detection",
        title: "Supervised Anomaly Detection",
        articles: [
          {
            slug: "failure-modes-concept-drift-adversarial-attacks-and-cold-start",
            title:
              "Failure Modes Concept Drift Adversarial Attacks And Cold Start",
            order: 6,
          },
          {
            slug: "label-delay-and-feedback-loops-the-hidden-challenges-of-fraud-detection",
            title:
              "Label Delay And Feedback Loops The Hidden Challenges Of Fraud Detection",
            order: 4,
          },
          {
            slug: "production-architecture-online-scoring-feature-freshness-and-latency-budgets",
            title:
              "Production Architecture Online Scoring Feature Freshness And Latency Budgets",
            order: 3,
          },
          {
            slug: "supervised-anomaly-detection-why-accuracy-is-misleading-in-imbalanced-classification",
            title:
              "Supervised Anomaly Detection Why Accuracy Is Misleading In Imbalanced Classification",
            order: 1,
          },
          {
            slug: "threshold-tuning-and-cost-sensitive-decision-making",
            title: "Threshold Tuning And Cost Sensitive Decision Making",
            order: 5,
          },
          {
            slug: "training-strategies-for-extreme-class-imbalance-resampling-vs-weighting",
            title:
              "Training Strategies For Extreme Class Imbalance Resampling Vs Weighting",
            order: 2,
          },
        ],
      },
      {
        slug: "unsupervised-anomaly-detection",
        title: "Unsupervised Anomaly Detection",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-production",
            title: "Failure Modes And Edge Cases In Production",
            order: 5,
          },
          {
            slug: "how-do-autoencoders-detect-anomalies",
            title: "How Do Autoencoders Detect Anomalies",
            order: 3,
          },
          {
            slug: "how-does-isolation-forest-work",
            title: "How Does Isolation Forest Work",
            order: 2,
          },
          {
            slug: "implementation-patterns-and-production-architecture",
            title: "Implementation Patterns And Production Architecture",
            order: 6,
          },
          {
            slug: "trade-offs-isolation-forest-vs-autoencoders",
            title: "Trade Offs Isolation Forest Vs Autoencoders",
            order: 4,
          },
          {
            slug: "what-is-unsupervised-anomaly-detection",
            title: "What Is Unsupervised Anomaly Detection",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-infrastructure-mlops",
    title: "Infrastructure MLops",
    subsections: [
      {
        slug: "automated-rollback",
        title: "Automated Rollback",
        articles: [
          {
            slug: "canary-analysis-vs-blue-green-vs-rolling-updates",
            title: "Canary Analysis Vs Blue Green Vs Rolling Updates",
            order: 2,
          },
          {
            slug: "canary-failure-modes-and-mitigation-strategies",
            title: "Canary Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "implementing-the-canary-control-loop",
            title: "Implementing The Canary Control Loop",
            order: 6,
          },
          {
            slug: "ml-specific-guardrails-and-metrics-in-canary-analysis",
            title: "Ml Specific Guardrails And Metrics In Canary Analysis",
            order: 3,
          },
          {
            slug: "traffic-routing-and-shadow-mode-for-ml-canaries",
            title: "Traffic Routing And Shadow Mode For Ml Canaries",
            order: 4,
          },
          {
            slug: "what-is-automated-canary-analysis",
            title: "What Is Automated Canary Analysis",
            order: 1,
          },
        ],
      },
      {
        slug: "ci-cd-ml",
        title: "CI/CD for ML",
        articles: [
          {
            slug: "data-drift-detection-and-automated-retraining",
            title: "Data Drift Detection And Automated Retraining",
            order: 5,
          },
          {
            slug: "failure-modes-in-ml-cicd-pipelines",
            title: "Failure Modes In Ml Cicd Pipelines",
            order: 6,
          },
          {
            slug: "model-registry-and-lineage-capture",
            title: "Model Registry And Lineage Capture",
            order: 2,
          },
          {
            slug: "shadow-and-canary-deployment-for-models",
            title: "Shadow And Canary Deployment For Models",
            order: 3,
          },
          {
            slug: "training-serving-skew-and-environment-parity",
            title: "Training Serving Skew And Environment Parity",
            order: 4,
          },
          {
            slug: "what-is-cicd-for-ml-and-why-its-different",
            title: "What Is Cicd For Ml And Why Its Different",
            order: 1,
          },
        ],
      },
      {
        slug: "feature-store-integration",
        title: "Feature Store Integration",
        articles: [
          {
            slug: "failure-modes-hot-keys-late-events-and-schema-drift",
            title: "Failure Modes Hot Keys Late Events And Schema Drift",
            order: 6,
          },
          {
            slug: "feature-store-the-contract-between-data-and-models",
            title: "Feature Store The Contract Between Data And Models",
            order: 1,
          },
          {
            slug: "freshness-vs-latency-streaming-materialization-trade-offs",
            title: "Freshness Vs Latency Streaming Materialization Trade Offs",
            order: 4,
          },
          {
            slug: "offline-and-online-storage-architecture-and-trade-offs",
            title: "Offline And Online Storage Architecture And Trade Offs",
            order: 2,
          },
          {
            slug: "serving-flow-assembly-latency-budgets-and-caching",
            title: "Serving Flow Assembly Latency Budgets And Caching",
            order: 3,
          },
          {
            slug: "training-serving-skew-root-causes-and-mitigation",
            title: "Training Serving Skew Root Causes And Mitigation",
            order: 5,
          },
        ],
      },
      {
        slug: "ml-cost-optimization",
        title: "Ml Cost Optimization",
        articles: [
          {
            slug: "autoscaling-architecture-matching-capacity-to-demand",
            title: "Autoscaling Architecture Matching Capacity To Demand",
            order: 2,
          },
          {
            slug: "checkpointing-and-fault-tolerance-for-interruptible-workloads",
            title:
              "Checkpointing And Fault Tolerance For Interruptible Workloads",
            order: 4,
          },
          {
            slug: "failure-modes-capacity-crunches-interruption-storms-and-cost-spikes",
            title:
              "Failure Modes Capacity Crunches Interruption Storms And Cost Spikes",
            order: 6,
          },
          {
            slug: "production-pattern-baseline-on-demand-plus-spot-burst-capacity",
            title:
              "Production Pattern Baseline On Demand Plus Spot Burst Capacity",
            order: 5,
          },
          {
            slug: "spot-fleet-diversification-reducing-correlated-interruptions",
            title:
              "Spot Fleet Diversification Reducing Correlated Interruptions",
            order: 3,
          },
          {
            slug: "what-are-spot-instances-and-why-use-them-for-ml-workloads",
            title: "What Are Spot Instances And Why Use Them For Ml Workloads",
            order: 1,
          },
        ],
      },
      {
        slug: "model-governance",
        title: "Model Governance",
        articles: [
          {
            slug: "continuous-monitoring-for-drift-bias-and-policy-violations",
            title: "Continuous Monitoring For Drift Bias And Policy Violations",
            order: 4,
          },
          {
            slug: "governance-for-large-language-models-and-generative-ai",
            title: "Governance For Large Language Models And Generative Ai",
            order: 6,
          },
          {
            slug: "governance-trade-offs-and-failure-modes-in-production",
            title: "Governance Trade Offs And Failure Modes In Production",
            order: 5,
          },
          {
            slug: "immutable-artifacts-and-data-lineage-graphs",
            title: "Immutable Artifacts And Data Lineage Graphs",
            order: 3,
          },
          {
            slug: "prediction-journal-pattern-for-audit-trails",
            title: "Prediction Journal Pattern For Audit Trails",
            order: 2,
          },
          {
            slug: "what-is-model-governance-in-ml-systems",
            title: "What Is Model Governance In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "model-packaging",
        title: "Model Packaging",
        articles: [
          {
            slug: "building-lean-inference-containers-multi-stage-builds-and-optimization-patterns",
            title:
              "Building Lean Inference Containers Multi Stage Builds And Optimization Patterns",
            order: 6,
          },
          {
            slug: "docker-containers-for-model-serving-building-lean-inference-images",
            title:
              "Docker Containers For Model Serving Building Lean Inference Images",
            order: 3,
          },
          {
            slug: "model-packaging-failure-modes-conversion-pitfalls-and-production-gotchas",
            title:
              "Model Packaging Failure Modes Conversion Pitfalls And Production Gotchas",
            order: 5,
          },
          {
            slug: "onnx-vs-savedmodel-choosing-your-serialization-format",
            title: "Onnx Vs Savedmodel Choosing Your Serialization Format",
            order: 2,
          },
          {
            slug: "production-model-serving-pipeline-from-training-to-inference-at-scale",
            title:
              "Production Model Serving Pipeline From Training To Inference At Scale",
            order: 4,
          },
          {
            slug: "what-is-model-packaging-and-why-does-it-matter",
            title: "What Is Model Packaging And Why Does It Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "model-registry",
        title: "Model Registry",
        articles: [
          {
            slug: "model-registry-automation-cicd",
            title: "Model Registry Automation Cicd",
            order: 6,
          },
          {
            slug: "model-registry-core-entities-and-immutability-design",
            title: "Model Registry Core Entities And Immutability Design",
            order: 2,
          },
          {
            slug: "model-registry-failure-modes-and-mitigation-strategies",
            title: "Model Registry Failure Modes And Mitigation Strategies",
            order: 4,
          },
          {
            slug: "model-versioning-lineage-tracking",
            title: "Model Versioning Lineage Tracking",
            order: 5,
          },
          {
            slug: "production-model-registry-architecture-and-scale-requirements",
            title:
              "Production Model Registry Architecture And Scale Requirements",
            order: 3,
          },
          {
            slug: "what-is-a-model-registry-and-why-production-ml-needs-it",
            title: "What Is A Model Registry And Why Production Ml Needs It",
            order: 1,
          },
        ],
      },
      {
        slug: "resource-orchestration",
        title: "Resource Orchestration",
        articles: [
          {
            slug: "building-production-gpu-orchestration-discovery-scheduling-extensions-and-reliability-operations",
            title:
              "Building Production Gpu Orchestration Discovery Scheduling Extensions And Reliability Operations",
            order: 6,
          },
          {
            slug: "failure-modes-in-gpu-orchestration-fragmentation-deadlock-and-health-drift",
            title:
              "Failure Modes In Gpu Orchestration Fragmentation Deadlock And Health Drift",
            order: 5,
          },
          {
            slug: "gpu-partitioning-patterns-whole-device-vs-time-slicing-vs-hardware-partitioning",
            title:
              "Gpu Partitioning Patterns Whole Device Vs Time Slicing Vs Hardware Partitioning",
            order: 2,
          },
          {
            slug: "production-ml-inference-on-kubernetes-with-autoscaling-and-model-locality",
            title:
              "Production Ml Inference On Kubernetes With Autoscaling And Model Locality",
            order: 4,
          },
          {
            slug: "topology-aware-scheduling-and-gang-scheduling-for-distributed-training",
            title:
              "Topology Aware Scheduling And Gang Scheduling For Distributed Training",
            order: 3,
          },
          {
            slug: "what-is-gpu-resource-orchestration-in-ml-clusters",
            title: "What Is Gpu Resource Orchestration In Ml Clusters",
            order: 1,
          },
        ],
      },
      {
        slug: "shadow-mode-deployment",
        title: "Shadow Mode Deployment",
        articles: [
          {
            slug: "implementing-shadow-mode-mirroring-isolation-and-promotion-criteria",
            title:
              "Implementing Shadow Mode Mirroring Isolation And Promotion Criteria",
            order: 5,
          },
          {
            slug: "shadow-mode-architecture-and-traffic-flow",
            title: "Shadow Mode Architecture And Traffic Flow",
            order: 2,
          },
          {
            slug: "shadow-mode-failure-modes-and-edge-cases",
            title: "Shadow Mode Failure Modes And Edge Cases",
            order: 4,
          },
          {
            slug: "shadow-mode-monitoring-promotion",
            title: "Shadow Mode Monitoring Promotion",
            order: 6,
          },
          {
            slug: "shadow-mode-trade-offs-cost-vs-risk-reduction",
            title: "Shadow Mode Trade Offs Cost Vs Risk Reduction",
            order: 3,
          },
          {
            slug: "what-is-shadow-mode-deployment-in-ml-systems",
            title: "What Is Shadow Mode Deployment In Ml Systems",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-llm-genai",
    title: "LLM GenAI",
    subsections: [
      {
        slug: "agent-systems-tool-use",
        title: "Agent Systems Tool Use",
        articles: [
          {
            slug: "agent-system-architecture-execution-flow",
            title: "Agent System Architecture Execution Flow",
            order: 2,
          },
          {
            slug: "failure-modes-and-safety-in-agent-systems",
            title: "Failure Modes And Safety In Agent Systems",
            order: 5,
          },
          {
            slug: "production-implementation-and-llmops",
            title: "Production Implementation And Llmops",
            order: 6,
          },
          {
            slug: "single-step-vs-multi-step-agent-patterns",
            title: "Single Step Vs Multi Step Agent Patterns",
            order: 3,
          },
          {
            slug: "trade-offs-llm-centric-planning-vs-backend-orchestration",
            title: "Trade Offs LLM Centric Planning Vs Backend Orchestration",
            order: 4,
          },
          {
            slug: "what-are-agent-systems-tool-use",
            title: "What Are Agent Systems Tool Use",
            order: 1,
          },
        ],
      },
      {
        slug: "chunking-strategies",
        title: "Chunking Strategies",
        articles: [
          {
            slug: "advanced-hierarchical-retrieval-and-multi-stage-context",
            title: "Advanced Hierarchical Retrieval And Multi Stage Context",
            order: 6,
          },
          {
            slug: "chunking-strategies-fixed-vs-semantic",
            title: "Chunking Strategies Fixed Vs Semantic",
            order: 2,
          },
          {
            slug: "chunking-trade-offs-when-to-choose-what",
            title: "Chunking Trade Offs When To Choose What",
            order: 4,
          },
          {
            slug: "context-window-management-at-scale",
            title: "Context Window Management At Scale",
            order: 3,
          },
          {
            slug: "failure-modes-when-chunking-breaks",
            title: "Failure Modes When Chunking Breaks",
            order: 5,
          },
          {
            slug: "what-is-chunking-in-llm-systems",
            title: "What Is Chunking In LLM Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "llm-caching-optimization",
        title: "LLM Caching Optimization",
        articles: [
          {
            slug: "cost-optimization-trade-offs-caching-vs-model-routing",
            title: "Cost Optimization Trade Offs Caching Vs Model Routing",
            order: 4,
          },
          {
            slug: "failure-modes-and-edge-cases-in-llm-caching",
            title: "Failure Modes And Edge Cases In LLM Caching",
            order: 5,
          },
          {
            slug: "production-scale-caching-implementation",
            title: "Production Scale Caching Implementation",
            order: 3,
          },
          {
            slug: "three-layers-of-llm-caching",
            title: "Three Layers Of LLM Caching",
            order: 2,
          },
          {
            slug: "what-is-llm-caching-and-why-does-it-matter",
            title: "What Is LLM Caching And Why Does It Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "llm-evaluation-benchmarking",
        title: "LLM Evaluation Benchmarking",
        articles: [
          {
            slug: "failure-modes-and-edge-cases",
            title: "Failure Modes And Edge Cases",
            order: 5,
          },
          {
            slug: "red-teaming-in-production-human-vs-automated-approaches",
            title: "Red Teaming In Production Human Vs Automated Approaches",
            order: 3,
          },
          {
            slug: "scoring-systems-judge-models-vs-human-evaluation",
            title: "Scoring Systems Judge Models Vs Human Evaluation",
            order: 6,
          },
          {
            slug: "the-evaluation-pipeline-architecture",
            title: "The Evaluation Pipeline Architecture",
            order: 2,
          },
          {
            slug: "trade-offs-helpfulness-vs-harmlessness",
            title: "Trade Offs Helpfulness Vs Harmlessness",
            order: 4,
          },
          {
            slug: "what-is-llm-evaluation-red-teaming",
            title: "What Is LLM Evaluation Red Teaming",
            order: 1,
          },
        ],
      },
      {
        slug: "llm-fine-tuning",
        title: "LLM Fine Tuning",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-peft-systems",
            title: "Failure Modes And Edge Cases In Peft Systems",
            order: 5,
          },
          {
            slug: "how-lora-works-low-rank-adaptation-mechanics",
            title: "How Lora Works Low Rank Adaptation Mechanics",
            order: 2,
          },
          {
            slug: "qlora-quantized-low-rank-adaptation-at-extreme-scale",
            title: "Qlora Quantized Low Rank Adaptation At Extreme Scale",
            order: 3,
          },
          {
            slug: "trade-offs-full-fine-tuning-vs-lora-vs-qlora",
            title: "Trade Offs Full Fine Tuning Vs Lora Vs Qlora",
            order: 4,
          },
          {
            slug: "what-is-parameter-efficient-fine-tuning-peft",
            title: "What Is Parameter Efficient Fine Tuning Peft",
            order: 1,
          },
        ],
      },
      {
        slug: "llm-guardrails-safety",
        title: "LLM Guardrails Safety",
        articles: [
          {
            slug: "guardrail-design-trade-offs",
            title: "Guardrail Design Trade Offs",
            order: 4,
          },
          {
            slug: "guardrail-failure-modes-edge-cases",
            title: "Guardrail Failure Modes Edge Cases",
            order: 5,
          },
          {
            slug: "how-llm-guardrail-pipelines-work",
            title: "How LLM Guardrail Pipelines Work",
            order: 2,
          },
          {
            slug: "production-scale-guardrail-systems",
            title: "Production Scale Guardrail Systems",
            order: 3,
          },
          {
            slug: "what-are-llm-guardrails-safety-systems",
            title: "What Are LLM Guardrails Safety Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "multimodal-systems",
        title: "Multimodal Systems",
        articles: [
          {
            slug: "long-context-vlms-handling-documents-and-extended-video",
            title: "Long Context Vlms Handling Documents And Extended Video",
            order: 6,
          },
          {
            slug: "production-vlm-systems-routing-and-scale",
            title: "Production Vlm Systems Routing And Scale",
            order: 3,
          },
          {
            slug: "vlm-architecture-trade-offs-when-to-specialize-vs-generalize",
            title:
              "Vlm Architecture Trade Offs When To Specialize Vs Generalize",
            order: 4,
          },
          {
            slug: "vlm-failure-modes-and-edge-cases-at-scale",
            title: "Vlm Failure Modes And Edge Cases At Scale",
            order: 5,
          },
          {
            slug: "vlm-processing-pipeline-from-pixels-to-tokens",
            title: "Vlm Processing Pipeline From Pixels To Tokens",
            order: 2,
          },
          {
            slug: "what-are-multimodal-vision-language-models",
            title: "What Are Multimodal Vision Language Models",
            order: 1,
          },
        ],
      },
      {
        slug: "rag-architecture",
        title: "Rag Architecture",
        articles: [
          {
            slug: "rag-failure-modes-and-production-challenges",
            title: "Rag Failure Modes And Production Challenges",
            order: 4,
          },
          {
            slug: "rag-system-architecture-and-data-flow",
            title: "Rag System Architecture And Data Flow",
            order: 2,
          },
          {
            slug: "rag-vs-alternatives-when-to-choose-what",
            title: "Rag Vs Alternatives When To Choose What",
            order: 3,
          },
          {
            slug: "scaling-rag-to-production-architecture-patterns",
            title: "Scaling Rag To Production Architecture Patterns",
            order: 5,
          },
          {
            slug: "what-is-rag-retrieval-augmented-generation",
            title: "What Is Rag Retrieval Augmented Generation",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-model-optimization",
    title: "Model Optimization",
    subsections: [
      {
        slug: "batch-throughput-tuning",
        title: "Batch Throughput Tuning",
        articles: [
          {
            slug: "batching-failure-modes-and-mitigation-strategies",
            title: "Batching Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "batching-in-data-pipelines-producer-and-consumer-patterns",
            title: "Batching In Data Pipelines Producer And Consumer Patterns",
            order: 4,
          },
          {
            slug: "dynamic-batching-for-low-latency-gpu-inference",
            title: "Dynamic Batching For Low Latency Gpu Inference",
            order: 2,
          },
          {
            slug: "monitoring-and-adaptive-control-for-batching-systems",
            title: "Monitoring And Adaptive Control For Batching Systems",
            order: 6,
          },
          {
            slug: "training-batch-size-memory-convergence-and-throughput-trade-offs",
            title:
              "Training Batch Size Memory Convergence And Throughput Trade Offs",
            order: 3,
          },
          {
            slug: "what-is-batching-and-why-does-it-improve-throughput",
            title: "What Is Batching And Why Does It Improve Throughput",
            order: 1,
          },
        ],
      },
      {
        slug: "hardware-aware-optimization",
        title: "Hardware Aware Optimization",
        articles: [
          {
            slug: "critical-failure-modes-in-hardware-aware-optimization",
            title: "Critical Failure Modes In Hardware Aware Optimization",
            order: 4,
          },
          {
            slug: "four-core-patterns-of-hardware-aware-optimization",
            title: "Four Core Patterns Of Hardware Aware Optimization",
            order: 2,
          },
          {
            slug: "implementing-hardware-aware-optimization-a-systematic-pipeline",
            title:
              "Implementing Hardware Aware Optimization A Systematic Pipeline",
            order: 5,
          },
          {
            slug: "production-hardware-aware-optimization-edge-vs-cloud-trade-offs",
            title:
              "Production Hardware Aware Optimization Edge Vs Cloud Trade Offs",
            order: 3,
          },
          {
            slug: "what-is-hardware-aware-optimization-in-ml",
            title: "What Is Hardware Aware Optimization In Ml",
            order: 1,
          },
        ],
      },
      {
        slug: "knowledge-distillation",
        title: "Knowledge Distillation",
        articles: [
          {
            slug: "failure-modes-capacity-mismatch-bias-amplification-and-distribution-drift",
            title:
              "Failure Modes Capacity Mismatch Bias Amplification And Distribution Drift",
            order: 5,
          },
          {
            slug: "production-deployment-from-training-cost-to-serving-savings",
            title:
              "Production Deployment From Training Cost To Serving Savings",
            order: 3,
          },
          {
            slug: "three-transfer-granularities-response-feature-and-relation-based-distillation",
            title:
              "Three Transfer Granularities Response Feature And Relation Based Distillation",
            order: 2,
          },
          {
            slug: "training-recipe-loss-functions-temperature-and-data-pipelines",
            title:
              "Training Recipe Loss Functions Temperature And Data Pipelines",
            order: 4,
          },
          {
            slug: "validation-and-monitoring-beyond-accuracy-to-calibration-and-drift",
            title:
              "Validation And Monitoring Beyond Accuracy To Calibration And Drift",
            order: 6,
          },
          {
            slug: "what-is-knowledge-distillation",
            title: "What Is Knowledge Distillation",
            order: 1,
          },
        ],
      },
      {
        slug: "model-compilation",
        title: "Model Compilation",
        articles: [
          {
            slug: "onnx-the-universal-intermediate-format",
            title: "Onnx The Universal Intermediate Format",
            order: 2,
          },
          {
            slug: "precision-tradeoffs-fp32-vs-fp16-vs-int8",
            title: "Precision Tradeoffs Fp32 Vs Fp16 Vs Int8",
            order: 5,
          },
          {
            slug: "production-compilation-pipeline-and-failure-modes",
            title: "Production Compilation Pipeline And Failure Modes",
            order: 6,
          },
          {
            slug: "tensorrt-nvidia-gpu-specific-optimization",
            title: "Tensorrt Nvidia Gpu Specific Optimization",
            order: 3,
          },
          {
            slug: "tvm-cross-platform-ml-compiler",
            title: "Tvm Cross Platform Ml Compiler",
            order: 4,
          },
          {
            slug: "what-is-model-compilation-and-why-does-it-matter",
            title: "What Is Model Compilation And Why Does It Matter",
            order: 1,
          },
        ],
      },
      {
        slug: "model-pruning",
        title: "Model Pruning",
        articles: [
          {
            slug: "critical-tradeoffs-when-to-choose-each-pruning-style",
            title: "Critical Tradeoffs When To Choose Each Pruning Style",
            order: 4,
          },
          {
            slug: "failure-modes-and-edge-cases-in-production-pruning",
            title: "Failure Modes And Edge Cases In Production Pruning",
            order: 5,
          },
          {
            slug: "hardware-efficiency-and-speedup-characteristics",
            title: "Hardware Efficiency And Speedup Characteristics",
            order: 2,
          },
          {
            slug: "production-implementation-iterative-pruning-and-fine-tuning",
            title:
              "Production Implementation Iterative Pruning And Fine Tuning",
            order: 3,
          },
          {
            slug: "pruning-tooling-and-practical-workflow",
            title: "Pruning Tooling And Practical Workflow",
            order: 6,
          },
          {
            slug: "structured-vs-unstructured-pruning-core-differences",
            title: "Structured Vs Unstructured Pruning Core Differences",
            order: 1,
          },
        ],
      },
      {
        slug: "model-quantization",
        title: "Model Quantization",
        articles: [
          {
            slug: "choosing-quantization-strategy-decision-framework",
            title: "Choosing Quantization Strategy Decision Framework",
            order: 6,
          },
          {
            slug: "mixed-precision-training-fp16-bf16-and-fp32-accumulation",
            title: "Mixed Precision Training Fp16 Bf16 And Fp32 Accumulation",
            order: 3,
          },
          {
            slug: "post-training-quantization-vs-quantization-aware-training",
            title: "Post Training Quantization Vs Quantization Aware Training",
            order: 2,
          },
          {
            slug: "quantization-failure-modes-and-mitigation-strategies",
            title: "Quantization Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "weight-only-quantization-for-large-language-models",
            title: "Weight Only Quantization For Large Language Models",
            order: 4,
          },
          {
            slug: "what-is-model-quantization",
            title: "What Is Model Quantization",
            order: 1,
          },
        ],
      },
      {
        slug: "model-result-caching",
        title: "Model Result Caching",
        articles: [
          {
            slug: "cache-key-design-and-canonicalization-for-high-hit-rates",
            title: "Cache Key Design And Canonicalization For High Hit Rates",
            order: 3,
          },
          {
            slug: "cost-savings-and-observability-measuring-cache-impact",
            title: "Cost Savings And Observability Measuring Cache Impact",
            order: 6,
          },
          {
            slug: "embedding-cache-reducing-repeated-vector-computation",
            title: "Embedding Cache Reducing Repeated Vector Computation",
            order: 4,
          },
          {
            slug: "failure-modes-cache-stampede-embedding-drift-and-false-positives",
            title:
              "Failure Modes Cache Stampede Embedding Drift And False Positives",
            order: 5,
          },
          {
            slug: "semantic-result-cache-architecture-and-similarity-thresholds",
            title:
              "Semantic Result Cache Architecture And Similarity Thresholds",
            order: 2,
          },
          {
            slug: "three-layers-of-model-caching-kv-embedding-and-result",
            title: "Three Layers Of Model Caching KV Embedding And Result",
            order: 1,
          },
        ],
      },
      {
        slug: "neural-architecture-search",
        title: "Neural Architecture Search",
        articles: [
          {
            slug: "device-aware-latency-modeling-for-nas",
            title: "Device Aware Latency Modeling For Nas",
            order: 3,
          },
          {
            slug: "multi-fidelity-evaluation-strategy-in-nas",
            title: "Multi Fidelity Evaluation Strategy In Nas",
            order: 2,
          },
          {
            slug: "nas-failure-modes-and-production-mitigations",
            title: "Nas Failure Modes And Production Mitigations",
            order: 4,
          },
          {
            slug: "what-is-neural-architecture-search-nas",
            title: "What Is Neural Architecture Search Nas",
            order: 1,
          },
          {
            slug: "when-to-use-nas-vs-manual-architecture-design",
            title: "When To Use Nas Vs Manual Architecture Design",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-model-serving",
    title: "Model Serving",
    subsections: [
      {
        slug: "autoscaling-gpu-sharing",
        title: "Autoscaling Gpu Sharing",
        articles: [
          {
            slug: "cold-start-problem-model-loading-and-predictive-warming-strategies",
            title:
              "Cold Start Problem Model Loading And Predictive Warming Strategies",
            order: 4,
          },
          {
            slug: "cost-control-on-demand-vs-spot-scale-to-zero-and-fractional-allocation",
            title:
              "Cost Control On Demand Vs Spot Scale To Zero And Fractional Allocation",
            order: 5,
          },
          {
            slug: "full-gpu-vs-fractional-allocation-isolation-vs-utilization-trade-offs",
            title:
              "Full Gpu Vs Fractional Allocation Isolation Vs Utilization Trade Offs",
            order: 3,
          },
          {
            slug: "gpu-autoscaling-failure-modes-oscillation-placement-and-hidden-bottlenecks",
            title:
              "Gpu Autoscaling Failure Modes Oscillation Placement And Hidden Bottlenecks",
            order: 6,
          },
          {
            slug: "gpu-autoscaling-multi-layer-control-architecture",
            title: "Gpu Autoscaling Multi Layer Control Architecture",
            order: 1,
          },
          {
            slug: "gpu-metrics-beyond-utilization-for-accurate-autoscaling",
            title: "Gpu Metrics Beyond Utilization For Accurate Autoscaling",
            order: 2,
          },
        ],
      },
      {
        slug: "batch-vs-realtime-inference",
        title: "Batch Vs Realtime Inference",
        articles: [
          {
            slug: "batch-inference-throughput-over-latency",
            title: "Batch Inference Throughput Over Latency",
            order: 2,
          },
          {
            slug: "batch-vs-real-time-making-the-choice",
            title: "Batch Vs Real Time Making The Choice",
            order: 4,
          },
          {
            slug: "failure-modes-and-edge-cases",
            title: "Failure Modes And Edge Cases",
            order: 5,
          },
          {
            slug: "production-implementation-patterns",
            title: "Production Implementation Patterns",
            order: 6,
          },
          {
            slug: "real-time-inference-latency-under-pressure",
            title: "Real Time Inference Latency Under Pressure",
            order: 3,
          },
          {
            slug: "what-is-batch-vs-real-time-inference",
            title: "What Is Batch Vs Real Time Inference",
            order: 1,
          },
        ],
      },
      {
        slug: "inference-latency-optimization",
        title: "Inference Latency Optimization",
        articles: [
          {
            slug: "how-do-you-tune-inference-serving-for-different-workload-patterns",
            title:
              "How Do You Tune Inference Serving For Different Workload Patterns",
            order: 6,
          },
          {
            slug: "how-does-dynamic-batching-balance-throughput-and-latency",
            title: "How Does Dynamic Batching Balance Throughput And Latency",
            order: 2,
          },
          {
            slug: "how-does-pagedattention-and-prefix-caching-optimize-memory-management",
            title:
              "How Does Pagedattention And Prefix Caching Optimize Memory Management",
            order: 4,
          },
          {
            slug: "what-are-the-critical-failure-modes-in-production-inference-optimization",
            title:
              "What Are The Critical Failure Modes In Production Inference Optimization",
            order: 5,
          },
          {
            slug: "what-is-kv-cache-and-why-does-it-dominate-memory-in-llm-inference",
            title:
              "What Is KV Cache And Why Does It Dominate Memory In LLM Inference",
            order: 1,
          },
          {
            slug: "what-is-model-quantization-and-when-does-it-actually-speed-up-inference",
            title:
              "What Is Model Quantization And When Does It Actually Speed Up Inference",
            order: 3,
          },
        ],
      },
      {
        slug: "model-monitoring-observability",
        title: "Model Monitoring Observability",
        articles: [
          {
            slug: "batching-trade-offs-throughput-vs-tail-latency",
            title: "Batching Trade Offs Throughput Vs Tail Latency",
            order: 3,
          },
          {
            slug: "continuous-evaluation-and-safe-rollout-for-llms",
            title: "Continuous Evaluation And Safe Rollout For Llms",
            order: 4,
          },
          {
            slug: "cost-and-security-telemetry-for-production-ml",
            title: "Cost And Security Telemetry For Production Ml",
            order: 6,
          },
          {
            slug: "detecting-model-drift-data-concept-and-semantic-shifts",
            title: "Detecting Model Drift Data Concept And Semantic Shifts",
            order: 2,
          },
          {
            slug: "monitoring-inference-latency-time-to-first-token-vs-end-to-end",
            title:
              "Monitoring Inference Latency Time To First Token Vs End To End",
            order: 1,
          },
          {
            slug: "semantic-caching-and-retrieval-invalidation",
            title: "Semantic Caching And Retrieval Invalidation",
            order: 5,
          },
        ],
      },
      {
        slug: "model-versioning-rollback",
        title: "Model Versioning Rollback",
        articles: [
          {
            slug: "blue-green-and-canary-deployment-patterns-for-model-rollout",
            title:
              "Blue Green And Canary Deployment Patterns For Model Rollout",
            order: 2,
          },
          {
            slug: "fast-rollback-strategies-and-automated-decision-making",
            title: "Fast Rollback Strategies And Automated Decision Making",
            order: 4,
          },
          {
            slug: "feature-versioning-and-time-travel-for-reproducible-rollback",
            title:
              "Feature Versioning And Time Travel For Reproducible Rollback",
            order: 6,
          },
          {
            slug: "shadow-deployment-for-risk-free-model-validation",
            title: "Shadow Deployment For Risk Free Model Validation",
            order: 3,
          },
          {
            slug: "training-serving-skew-and-compatibility-failures-in-rollback",
            title:
              "Training Serving Skew And Compatibility Failures In Rollback",
            order: 5,
          },
          {
            slug: "what-is-model-versioning-in-production-ml-systems",
            title: "What Is Model Versioning In Production Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "multi-model-serving",
        title: "Multi Model Serving",
        articles: [
          {
            slug: "cold-start-storms-and-model-thrashing-detection-and-mitigation",
            title:
              "Cold Start Storms And Model Thrashing Detection And Mitigation",
            order: 5,
          },
          {
            slug: "dynamic-batching-in-multi-model-serving",
            title: "Dynamic Batching In Multi Model Serving",
            order: 3,
          },
          {
            slug: "llm-multi-model-serving-gateway-pattern-and-vram-constraints",
            title:
              "LLM Multi Model Serving Gateway Pattern And Vram Constraints",
            order: 4,
          },
          {
            slug: "on-demand-loading-vs-multi-deployed-latency-and-cost-trade-offs",
            title:
              "On Demand Loading Vs Multi Deployed Latency And Cost Trade Offs",
            order: 2,
          },
          {
            slug: "per-model-observability-metrics-and-alerting-strategy",
            title: "Per Model Observability Metrics And Alerting Strategy",
            order: 6,
          },
          {
            slug: "what-is-multi-model-serving",
            title: "What Is Multi Model Serving",
            order: 1,
          },
        ],
      },
      {
        slug: "serving-infrastructure",
        title: "Serving Infrastructure",
        articles: [
          {
            slug: "choosing-between-tensorflow-serving-torchserve-and-triton-for-production-deployment",
            title:
              "Choosing Between Tensorflow Serving Torchserve And Triton For Production Deployment",
            order: 6,
          },
          {
            slug: "dynamic-batching-throughput-vs-latency-tradeoffs-in-request-scheduling",
            title:
              "Dynamic Batching Throughput Vs Latency Tradeoffs In Request Scheduling",
            order: 2,
          },
          {
            slug: "model-serving-infrastructure-core-control-loop-and-architecture-patterns",
            title:
              "Model Serving Infrastructure Core Control Loop And Architecture Patterns",
            order: 1,
          },
          {
            slug: "multi-backend-serving-with-triton-unified-control-plane-across-frameworks-and-hardware",
            title:
              "Multi Backend Serving With Triton Unified Control Plane Across Frameworks And Hardware",
            order: 3,
          },
          {
            slug: "precision-conversion-and-hardware-optimization-fp32-to-bf16-fp16-int8-tradeoffs",
            title:
              "Precision Conversion And Hardware Optimization Fp32 To Bf16 Fp16 Int8 Tradeoffs",
            order: 4,
          },
          {
            slug: "production-failure-modes-tail-latency-memory-exhaustion-and-training-serving-skew",
            title:
              "Production Failure Modes Tail Latency Memory Exhaustion And Training Serving Skew",
            order: 5,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-monitoring-observability",
    title: "Monitoring Observability",
    subsections: [
      {
        slug: "business-metrics-correlation",
        title: "Business Metrics Correlation",
        articles: [
          {
            slug: "correlation-types-and-statistical-methods",
            title: "Correlation Types And Statistical Methods",
            order: 3,
          },
          {
            slug: "critical-failure-modes-and-guardrails",
            title: "Critical Failure Modes And Guardrails",
            order: 5,
          },
          {
            slug: "metric-ladders-and-mediation-chains",
            title: "Metric Ladders And Mediation Chains",
            order: 2,
          },
          {
            slug: "production-implementation-at-scale",
            title: "Production Implementation At Scale",
            order: 4,
          },
          {
            slug: "what-is-business-metrics-correlation-in-ml-systems",
            title: "What Is Business Metrics Correlation In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "concept-drift",
        title: "Concept Drift",
        articles: [
          {
            slug: "champion-challenger-rollout-and-operational-resilience",
            title: "Champion Challenger Rollout And Operational Resilience",
            order: 6,
          },
          {
            slug: "detection-strategies-monitoring-drift-with-statistical-signals",
            title:
              "Detection Strategies Monitoring Drift With Statistical Signals",
            order: 2,
          },
          {
            slug: "label-delay-and-two-stage-learning",
            title: "Label Delay And Two Stage Learning",
            order: 4,
          },
          {
            slug: "mitigation-data-weighting-retraining-cadence-and-model-portfolios",
            title:
              "Mitigation Data Weighting Retraining Cadence And Model Portfolios",
            order: 3,
          },
          {
            slug: "production-failure-modes-and-defensive-strategies",
            title: "Production Failure Modes And Defensive Strategies",
            order: 5,
          },
          {
            slug: "what-is-concept-drift-vs-data-drift-vs-model-decay",
            title: "What Is Concept Drift Vs Data Drift Vs Model Decay",
            order: 1,
          },
        ],
      },
      {
        slug: "data-drift-detection",
        title: "Data Drift Detection",
        articles: [
          {
            slug: "baseline-selection-and-windowing-strategy",
            title: "Baseline Selection And Windowing Strategy",
            order: 3,
          },
          {
            slug: "cost-scale-and-trade-off-analysis",
            title: "Cost Scale And Trade Off Analysis",
            order: 6,
          },
          {
            slug: "failure-modes-and-edge-cases-in-production-drift-detection",
            title: "Failure Modes And Edge Cases In Production Drift Detection",
            order: 5,
          },
          {
            slug: "production-architecture-and-implementation-patterns",
            title: "Production Architecture And Implementation Patterns",
            order: 4,
          },
          {
            slug: "statistical-tests-for-drift-detection",
            title: "Statistical Tests For Drift Detection",
            order: 2,
          },
          {
            slug: "what-is-data-drift-detection",
            title: "What Is Data Drift Detection",
            order: 1,
          },
        ],
      },
      {
        slug: "data-quality-monitoring",
        title: "Data Quality Monitoring",
        articles: [
          {
            slug: "batch-vs-streaming-monitoring-trade-offs",
            title: "Batch Vs Streaming Monitoring Trade Offs",
            order: 3,
          },
          {
            slug: "data-contracts-and-expectation-based-monitoring",
            title: "Data Contracts And Expectation Based Monitoring",
            order: 2,
          },
          {
            slug: "feature-drift-detection-with-psi-and-distribution-metrics",
            title: "Feature Drift Detection With Psi And Distribution Metrics",
            order: 4,
          },
          {
            slug: "production-failure-modes-and-edge-case-handling",
            title: "Production Failure Modes And Edge Case Handling",
            order: 6,
          },
          {
            slug: "training-serving-skew-detection-and-prevention",
            title: "Training Serving Skew Detection And Prevention",
            order: 5,
          },
          {
            slug: "what-is-data-quality-monitoring-in-ml-systems",
            title: "What Is Data Quality Monitoring In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "feature-importance-tracking",
        title: "Feature Importance Tracking",
        articles: [
          {
            slug: "model-centric-vs-data-centric-shap-monitoring-patterns",
            title: "Model Centric Vs Data Centric Shap Monitoring Patterns",
            order: 2,
          },
          {
            slug: "production-shap-drift-pipeline-architecture-and-capacity-planning",
            title:
              "Production Shap Drift Pipeline Architecture And Capacity Planning",
            order: 3,
          },
          {
            slug: "shap-drift-failure-modes-and-mitigation-strategies",
            title: "Shap Drift Failure Modes And Mitigation Strategies",
            order: 4,
          },
          {
            slug: "what-is-shap-drift-and-why-track-it",
            title: "What Is Shap Drift And Why Track It",
            order: 1,
          },
        ],
      },
      {
        slug: "model-performance-degradation",
        title: "Model Performance Degradation",
        articles: [
          {
            slug: "canary-deployments-and-automated-rollback-for-ml-models",
            title: "Canary Deployments And Automated Rollback For Ml Models",
            order: 4,
          },
          {
            slug: "failure-modes-label-bias-seasonality-and-slice-degradation",
            title: "Failure Modes Label Bias Seasonality And Slice Degradation",
            order: 6,
          },
          {
            slug: "label-delay-and-feedback-windows-in-production-monitoring",
            title: "Label Delay And Feedback Windows In Production Monitoring",
            order: 5,
          },
          {
            slug: "statistical-methods-for-drift-detection-and-alerting",
            title: "Statistical Methods For Drift Detection And Alerting",
            order: 3,
          },
          {
            slug: "two-tier-monitoring-service-health-vs-model-quality",
            title: "Two Tier Monitoring Service Health Vs Model Quality",
            order: 2,
          },
          {
            slug: "what-causes-model-performance-degradation-in-production",
            title: "What Causes Model Performance Degradation In Production",
            order: 1,
          },
        ],
      },
      {
        slug: "prediction-drift",
        title: "Prediction Drift",
        articles: [
          {
            slug: "baseline-selection-strategies-and-trade-offs",
            title: "Baseline Selection Strategies And Trade Offs",
            order: 3,
          },
          {
            slug: "prediction-drift-failure-modes-and-mitigation",
            title: "Prediction Drift Failure Modes And Mitigation",
            order: 5,
          },
          {
            slug: "production-implementation-architecture-and-cost-optimization",
            title:
              "Production Implementation Architecture And Cost Optimization",
            order: 6,
          },
          {
            slug: "slice-level-monitoring-and-dimensionality-management",
            title: "Slice Level Monitoring And Dimensionality Management",
            order: 4,
          },
          {
            slug: "statistical-metrics-for-prediction-drift-detection",
            title: "Statistical Metrics For Prediction Drift Detection",
            order: 2,
          },
          {
            slug: "what-is-prediction-drift-monitoring",
            title: "What Is Prediction Drift Monitoring",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-nlp-systems",
    title: "NLP Systems",
    subsections: [
      {
        slug: "llm-serving",
        title: "LLM Serving",
        articles: [
          {
            slug: "how-do-you-manage-kv-cache-memory-in-production",
            title: "How Do You Manage KV Cache Memory In Production",
            order: 4,
          },
          {
            slug: "how-does-continuous-batching-work-in-llm-serving",
            title: "How Does Continuous Batching Work In LLM Serving",
            order: 2,
          },
          {
            slug: "what-are-common-failure-modes-in-production-llm-serving",
            title: "What Are Common Failure Modes In Production LLM Serving",
            order: 6,
          },
          {
            slug: "what-are-the-key-trade-offs-in-llm-serving-optimizations",
            title: "What Are The Key Trade Offs In LLM Serving Optimizations",
            order: 5,
          },
          {
            slug: "what-is-kv-cache-in-llm-serving",
            title: "What Is KV Cache In LLM Serving",
            order: 1,
          },
          {
            slug: "what-is-speculative-decoding-and-when-does-it-help",
            title: "What Is Speculative Decoding And When Does It Help",
            order: 3,
          },
        ],
      },
      {
        slug: "multilingual-systems",
        title: "Multilingual Systems",
        articles: [
          {
            slug: "core-architecture-of-multilingual-natural-language-processing-nlp-systems",
            title:
              "Core Architecture Of Multilingual Natural Language Processing NLP Systems",
            order: 1,
          },
          {
            slug: "failure-modes-in-production-multilingual-systems",
            title: "Failure Modes In Production Multilingual Systems",
            order: 4,
          },
          {
            slug: "language-consistency-and-generation-control-mechanisms",
            title: "Language Consistency And Generation Control Mechanisms",
            order: 3,
          },
          {
            slug: "offline-document-translation-vs-online-query-translation-trade-offs",
            title:
              "Offline Document Translation Vs Online Query Translation Trade Offs",
            order: 2,
          },
          {
            slug: "unified-multilingual-vector-index-vs-per-language-index-architecture",
            title:
              "Unified Multilingual Vector Index Vs Per Language Index Architecture",
            order: 5,
          },
        ],
      },
      {
        slug: "named-entity-recognition",
        title: "Named Entity Recognition",
        articles: [
          {
            slug: "critical-ner-failure-modes-and-production-mitigations",
            title: "Critical Ner Failure Modes And Production Mitigations",
            order: 4,
          },
          {
            slug: "ner-model-architecture-trade-offs-rules-crfs-transformers-and-llms",
            title:
              "Ner Model Architecture Trade Offs Rules Crfs Transformers And Llms",
            order: 3,
          },
          {
            slug: "online-vs-offline-ner-deployment-patterns",
            title: "Online Vs Offline Ner Deployment Patterns",
            order: 2,
          },
          {
            slug: "production-ner-implementation-training-serving-and-monitoring",
            title:
              "Production Ner Implementation Training Serving And Monitoring",
            order: 5,
          },
          {
            slug: "what-is-named-entity-recognition-ner",
            title: "What Is Named Entity Recognition Ner",
            order: 1,
          },
        ],
      },
      {
        slug: "nlp-scalability",
        title: "NLP Scalability",
        articles: [
          {
            slug: "data-parallelism-for-training-gradient-sync-and-scaling",
            title: "Data Parallelism For Training Gradient Sync And Scaling",
            order: 4,
          },
          {
            slug: "horizontal-scaling-model-replication-and-load-balancing",
            title: "Horizontal Scaling Model Replication And Load Balancing",
            order: 5,
          },
          {
            slug: "how-does-batching-improve-training-and-inference-utilization",
            title:
              "How Does Batching Improve Training And Inference Utilization",
            order: 2,
          },
          {
            slug: "model-parallelism-tensor-and-pipeline-parallelism-explained",
            title:
              "Model Parallelism Tensor And Pipeline Parallelism Explained",
            order: 3,
          },
          {
            slug: "scaling-failures-memory-fragmentation-stragglers-and-graceful-degradation",
            title:
              "Scaling Failures Memory Fragmentation Stragglers And Graceful Degradation",
            order: 6,
          },
          {
            slug: "what-is-model-parallelism-and-why-do-we-need-it",
            title: "What Is Model Parallelism And Why Do We Need It",
            order: 1,
          },
        ],
      },
      {
        slug: "prompt-engineering-management",
        title: "Prompt Engineering Management",
        articles: [
          {
            slug: "advanced-techniques-caching-multi-model-routing-and-cost-optimization",
            title:
              "Advanced Techniques Caching Multi Model Routing And Cost Optimization",
            order: 6,
          },
          {
            slug: "production-prompt-pipeline-architecture",
            title: "Production Prompt Pipeline Architecture",
            order: 2,
          },
          {
            slug: "prompt-engineering-techniques-chain-of-thought-and-tool-use",
            title:
              "Prompt Engineering Techniques Chain Of Thought And Tool Use",
            order: 3,
          },
          {
            slug: "prompt-failure-modes-injection-drift-and-mitigation-strategies",
            title:
              "Prompt Failure Modes Injection Drift And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "prompt-management-versioning-evaluation-and-ab-testing",
            title: "Prompt Management Versioning Evaluation And AB Testing",
            order: 4,
          },
          {
            slug: "what-is-prompt-engineering-and-management",
            title: "What Is Prompt Engineering And Management",
            order: 1,
          },
        ],
      },
      {
        slug: "semantic-search-nlp",
        title: "Semantic Search Nlp",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-production-semantic-search",
            title: "Failure Modes And Edge Cases In Production Semantic Search",
            order: 5,
          },
          {
            slug: "how-ann-algorithms-work-hnsw-ivf-and-scaling-strategies",
            title: "How Ann Algorithms Work Hnsw Ivf And Scaling Strategies",
            order: 3,
          },
          {
            slug: "implementation-details-sharding-monitoring-and-optimization",
            title:
              "Implementation Details Sharding Monitoring And Optimization",
            order: 6,
          },
          {
            slug: "semantic-vs-keyword-search-when-to-use-each-and-hybrid-approaches",
            title:
              "Semantic Vs Keyword Search When To Use Each And Hybrid Approaches",
            order: 4,
          },
          {
            slug: "what-is-semantic-search-and-how-do-dense-embeddings-work",
            title: "What Is Semantic Search And How Do Dense Embeddings Work",
            order: 1,
          },
          {
            slug: "why-approximate-nearest-neighbor-ann-and-core-algorithm-families",
            title:
              "Why Approximate Nearest Neighbor Ann And Core Algorithm Families",
            order: 2,
          },
        ],
      },
      {
        slug: "text-classification-scale",
        title: "Text Classification Scale",
        articles: [
          {
            slug: "handling-class-imbalance-and-long-tail-labels",
            title: "Handling Class Imbalance And Long Tail Labels",
            order: 4,
          },
          {
            slug: "production-failure-modes-and-mitigation-strategies",
            title: "Production Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "serving-text-classification-at-scale-batching-caching-and-cost",
            title:
              "Serving Text Classification At Scale Batching Caching And Cost",
            order: 6,
          },
          {
            slug: "tiered-architecture-for-latency-and-cost-optimization",
            title: "Tiered Architecture For Latency And Cost Optimization",
            order: 3,
          },
          {
            slug: "what-is-text-classification-and-why-does-scale-matter",
            title: "What Is Text Classification And Why Does Scale Matter",
            order: 1,
          },
          {
            slug: "zero-shot-vs-supervised-classification-trade-offs",
            title: "Zero Shot Vs Supervised Classification Trade Offs",
            order: 2,
          },
        ],
      },
      {
        slug: "text-generation",
        title: "Text Generation",
        articles: [
          {
            slug: "decoding-failure-modes-and-safety-controls",
            title: "Decoding Failure Modes And Safety Controls",
            order: 4,
          },
          {
            slug: "greedy-vs-beam-search-decoding",
            title: "Greedy Vs Beam Search Decoding",
            order: 1,
          },
          {
            slug: "how-to-choose-deterministic-vs-stochastic-decoding",
            title: "How To Choose Deterministic Vs Stochastic Decoding",
            order: 5,
          },
          {
            slug: "production-serving-pipeline-with-token-streaming",
            title: "Production Serving Pipeline With Token Streaming",
            order: 3,
          },
          {
            slug: "speculative-decoding-and-latency-optimization",
            title: "Speculative Decoding And Latency Optimization",
            order: 6,
          },
          {
            slug: "temperature-and-nucleus-sampling-top-p",
            title: "Temperature And Nucleus Sampling Top P",
            order: 2,
          },
        ],
      },
      {
        slug: "tokenization-preprocessing",
        title: "Tokenization Preprocessing",
        articles: [
          {
            slug: "failure-modes-train-serve-skew-unicode-pitfalls-and-span-alignment",
            title:
              "Failure Modes Train Serve Skew Unicode Pitfalls And Span Alignment",
            order: 5,
          },
          {
            slug: "preprocessing-pipeline-normalization-and-text-cleaning",
            title: "Preprocessing Pipeline Normalization And Text Cleaning",
            order: 2,
          },
          {
            slug: "production-tokenization-performance-caching-and-scale",
            title: "Production Tokenization Performance Caching And Scale",
            order: 3,
          },
          {
            slug: "tokenizer-training-and-operational-best-practices",
            title: "Tokenizer Training And Operational Best Practices",
            order: 6,
          },
          {
            slug: "vocabulary-size-trade-offs-and-sequence-length-impact",
            title: "Vocabulary Size Trade Offs And Sequence Length Impact",
            order: 4,
          },
          {
            slug: "what-is-tokenization-and-why-does-it-matter",
            title: "What Is Tokenization And Why Does It Matter",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-privacy-fairness",
    title: "Privacy Fairness",
    subsections: [
      {
        slug: "bias-detection-mitigation",
        title: "Bias Detection Mitigation",
        articles: [
          {
            slug: "bias-mitigation-pre-in-and-post-processing-techniques",
            title: "Bias Mitigation Pre In And Post Processing Techniques",
            order: 3,
          },
          {
            slug: "failure-modes-proxy-leakage-and-feedback-loops",
            title: "Failure Modes Proxy Leakage And Feedback Loops",
            order: 5,
          },
          {
            slug: "fairness-metrics-group-individual-and-calibration-parity",
            title: "Fairness Metrics Group Individual And Calibration Parity",
            order: 2,
          },
          {
            slug: "legal-frameworks-and-production-compliance",
            title: "Legal Frameworks And Production Compliance",
            order: 6,
          },
          {
            slug: "production-fairness-architecture-and-monitoring",
            title: "Production Fairness Architecture And Monitoring",
            order: 4,
          },
          {
            slug: "what-is-bias-in-machine-learning-systems",
            title: "What Is Bias In Machine Learning Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "data-anonymization",
        title: "Data Anonymization",
        articles: [
          {
            slug: "failure-modes-attacks-and-operational-risks-in-anonymization",
            title:
              "Failure Modes Attacks And Operational Risks In Anonymization",
            order: 5,
          },
          {
            slug: "layered-strategy-combining-anonymization-techniques-in-production-ml",
            title:
              "Layered Strategy Combining Anonymization Techniques In Production Ml",
            order: 6,
          },
          {
            slug: "production-implementation-multi-tier-pii-detection-pipeline",
            title:
              "Production Implementation Multi Tier Pii Detection Pipeline",
            order: 4,
          },
          {
            slug: "pseudonymization-vs-anonymization-vs-differential-privacy",
            title: "Pseudonymization Vs Anonymization Vs Differential Privacy",
            order: 3,
          },
          {
            slug: "understanding-k-anonymity-for-tabular-data-protection",
            title: "Understanding K Anonymity For Tabular Data Protection",
            order: 2,
          },
          {
            slug: "what-is-data-anonymization-and-why-do-we-need-it",
            title: "What Is Data Anonymization And Why Do We Need It",
            order: 1,
          },
        ],
      },
      {
        slug: "differential-privacy",
        title: "Differential Privacy",
        articles: [
          {
            slug: "allocating-privacy-budgets-and-choosing-epsilon-in-production",
            title:
              "Allocating Privacy Budgets And Choosing Epsilon In Production",
            order: 6,
          },
          {
            slug: "central-vs-local-differential-privacy-trade-offs",
            title: "Central Vs Local Differential Privacy Trade Offs",
            order: 2,
          },
          {
            slug: "failure-modes-and-edge-cases-in-differential-privacy",
            title: "Failure Modes And Edge Cases In Differential Privacy",
            order: 5,
          },
          {
            slug: "production-system-architecture-for-differential-privacy",
            title: "Production System Architecture For Differential Privacy",
            order: 4,
          },
          {
            slug: "training-ml-models-with-differential-privacy-dp-sgd",
            title: "Training Ml Models With Differential Privacy Dp Sgd",
            order: 3,
          },
          {
            slug: "what-is-differential-privacy",
            title: "What Is Differential Privacy",
            order: 1,
          },
        ],
      },
      {
        slug: "fairness-metrics",
        title: "Fairness Metrics",
        articles: [
          {
            slug: "demographic-parity-vs-equalized-odds-when-to-choose-each",
            title: "Demographic Parity Vs Equalized Odds When To Choose Each",
            order: 3,
          },
          {
            slug: "fairness-metrics-failure-modes-and-edge-cases",
            title: "Fairness Metrics Failure Modes And Edge Cases",
            order: 5,
          },
          {
            slug: "implementing-fairness-metrics-in-production-ml-pipelines",
            title: "Implementing Fairness Metrics In Production Ml Pipelines",
            order: 4,
          },
          {
            slug: "post-processing-threshold-optimization-for-fairness",
            title: "Post Processing Threshold Optimization For Fairness",
            order: 6,
          },
          {
            slug: "what-is-demographic-parity",
            title: "What Is Demographic Parity",
            order: 1,
          },
          {
            slug: "what-is-equalized-odds",
            title: "What Is Equalized Odds",
            order: 2,
          },
        ],
      },
      {
        slug: "federated-learning",
        title: "Federated Learning",
        articles: [
          {
            slug: "communication-efficiency-and-compression",
            title: "Communication Efficiency And Compression",
            order: 4,
          },
          {
            slug: "handling-non-iid-data-and-client-selection",
            title: "Handling Non Iid Data And Client Selection",
            order: 3,
          },
          {
            slug: "production-deployment-and-failure-modes",
            title: "Production Deployment And Failure Modes",
            order: 5,
          },
          {
            slug: "secure-aggregation-and-privacy-mechanisms",
            title: "Secure Aggregation And Privacy Mechanisms",
            order: 2,
          },
          {
            slug: "what-is-federated-learning",
            title: "What Is Federated Learning",
            order: 1,
          },
          {
            slug: "when-to-use-federated-learning-trade-offs-and-alternatives",
            title: "When To Use Federated Learning Trade Offs And Alternatives",
            order: 6,
          },
        ],
      },
      {
        slug: "model-interpretability",
        title: "Model Interpretability",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-model-explanations",
            title: "Failure Modes And Edge Cases In Model Explanations",
            order: 4,
          },
          {
            slug: "implementation-patterns-from-prototyping-to-production-governance",
            title:
              "Implementation Patterns From Prototyping To Production Governance",
            order: 5,
          },
          {
            slug: "production-architecture-for-model-explanations-at-scale",
            title: "Production Architecture For Model Explanations At Scale",
            order: 2,
          },
          {
            slug: "shap-vs-lime-vs-gradient-methods-choosing-the-right-technique",
            title:
              "Shap Vs Lime Vs Gradient Methods Choosing The Right Technique",
            order: 3,
          },
          {
            slug: "what-are-shap-and-lime-for-model-interpretability",
            title: "What Are Shap And Lime For Model Interpretability",
            order: 1,
          },
        ],
      },
      {
        slug: "regulatory-compliance",
        title: "Regulatory Compliance",
        articles: [
          {
            slug: "critical-trade-offs-in-privacy-compliant-ml",
            title: "Critical Trade Offs In Privacy Compliant Ml",
            order: 3,
          },
          {
            slug: "dangerous-failure-modes-in-privacy-compliance",
            title: "Dangerous Failure Modes In Privacy Compliance",
            order: 4,
          },
          {
            slug: "four-planes-of-compliant-ml-architecture",
            title: "Four Planes Of Compliant Ml Architecture",
            order: 2,
          },
          {
            slug: "implementing-dsar-orchestration-at-scale",
            title: "Implementing Dsar Orchestration At Scale",
            order: 5,
          },
          {
            slug: "runtime-privacy-controls-and-audit-evidence",
            title: "Runtime Privacy Controls And Audit Evidence",
            order: 6,
          },
          {
            slug: "what-is-regulatory-compliance-for-ml-systems",
            title: "What Is Regulatory Compliance For Ml Systems",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-recommendation-systems",
    title: "Recommendation Systems",
    subsections: [
      {
        slug: "cold-start-problem",
        title: "Cold Start Problem",
        articles: [
          {
            slug: "cold-start-failure-modes-popularity-loops-and-sparse-signal-overreaction",
            title:
              "Cold Start Failure Modes Popularity Loops And Sparse Signal Overreaction",
            order: 5,
          },
          {
            slug: "exploration-policies-contextual-bandits-and-new-item-boosting",
            title:
              "Exploration Policies Contextual Bandits And New Item Boosting",
            order: 3,
          },
          {
            slug: "multi-stage-pipeline-layering-priors-to-handle-cold-start",
            title: "Multi Stage Pipeline Layering Priors To Handle Cold Start",
            order: 2,
          },
          {
            slug: "production-implementation-latency-budgets-and-nearline-refresh-cadences",
            title:
              "Production Implementation Latency Budgets And Nearline Refresh Cadences",
            order: 6,
          },
          {
            slug: "progressive-profiling-and-identity-resolution-for-user-cold-start",
            title:
              "Progressive Profiling And Identity Resolution For User Cold Start",
            order: 4,
          },
          {
            slug: "what-is-the-cold-start-problem-in-recommendation-systems",
            title: "What Is The Cold Start Problem In Recommendation Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "collaborative-filtering",
        title: "Collaborative Filtering",
        articles: [
          {
            slug: "failure-modes-cold-start-and-popularity-bias",
            title: "Failure Modes Cold Start And Popularity Bias",
            order: 6,
          },
          {
            slug: "how-collaborative-filtering-works",
            title: "How Collaborative Filtering Works",
            order: 2,
          },
          {
            slug: "implicit-vs-explicit-feedback",
            title: "Implicit Vs Explicit Feedback",
            order: 4,
          },
          {
            slug: "matrix-factorization-scaling-collaborative-filtering",
            title: "Matrix Factorization Scaling Collaborative Filtering",
            order: 3,
          },
          {
            slug: "trade-offs-when-to-use-collaborative-filtering",
            title: "Trade Offs When To Use Collaborative Filtering",
            order: 5,
          },
          {
            slug: "what-is-collaborative-filtering",
            title: "What Is Collaborative Filtering",
            order: 1,
          },
        ],
      },
      {
        slug: "content-based-filtering",
        title: "Content Based Filtering",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-content-based-and-hybrid-recommenders",
            title:
              "Failure Modes And Edge Cases In Content Based And Hybrid Recommenders",
            order: 5,
          },
          {
            slug: "hybrid-recommendation-systems-combining-content-and-collaborative-filtering",
            title:
              "Hybrid Recommendation Systems Combining Content And Collaborative Filtering",
            order: 2,
          },
          {
            slug: "implementation-deep-dive-building-production-cbf-and-hybrid-systems",
            title:
              "Implementation Deep Dive Building Production Cbf And Hybrid Systems",
            order: 6,
          },
          {
            slug: "production-architecture-two-stage-retrieval-and-re-ranking-pipeline",
            title:
              "Production Architecture Two Stage Retrieval And Re Ranking Pipeline",
            order: 3,
          },
          {
            slug: "trade-offs-when-to-choose-content-based-vs-collaborative-vs-hybrid",
            title:
              "Trade Offs When To Choose Content Based Vs Collaborative Vs Hybrid",
            order: 4,
          },
          {
            slug: "what-is-content-based-filtering",
            title: "What Is Content Based Filtering",
            order: 1,
          },
        ],
      },
      {
        slug: "diversity-exploration",
        title: "Diversity Exploration",
        articles: [
          {
            slug: "core-bandit-algorithms-epsilon-greedy-ucb-and-thompson-sampling",
            title:
              "Core Bandit Algorithms Epsilon Greedy Ucb And Thompson Sampling",
            order: 2,
          },
          {
            slug: "diversity-constraints-and-convergence-monitoring-in-production-bandits",
            title:
              "Diversity Constraints And Convergence Monitoring In Production Bandits",
            order: 5,
          },
          {
            slug: "failure-modes-misaligned-rewards-training-serving-skew-and-non-stationarity",
            title:
              "Failure Modes Misaligned Rewards Training Serving Skew And Non Stationarity",
            order: 6,
          },
          {
            slug: "production-architecture-sampler-parameter-store-and-streaming-feedback",
            title:
              "Production Architecture Sampler Parameter Store And Streaming Feedback",
            order: 3,
          },
          {
            slug: "slate-and-ranked-bandits-handling-multiple-positions-and-positional-bias",
            title:
              "Slate And Ranked Bandits Handling Multiple Positions And Positional Bias",
            order: 4,
          },
          {
            slug: "what-are-multi-armed-bandits-and-why-use-them-for-recommendations",
            title:
              "What Are Multi Armed Bandits And Why Use Them For Recommendations",
            order: 1,
          },
        ],
      },
      {
        slug: "position-bias-feedback-loops",
        title: "Position Bias Feedback Loops",
        articles: [
          {
            slug: "debiasing-techniques-ips-position-features-and-trade-offs",
            title: "Debiasing Techniques Ips Position Features And Trade Offs",
            order: 4,
          },
          {
            slug: "failure-modes-propensity-errors-format-changes-and-delayed-loops",
            title:
              "Failure Modes Propensity Errors Format Changes And Delayed Loops",
            order: 6,
          },
          {
            slug: "feedback-loops-how-bias-amplifies-over-time",
            title: "Feedback Loops How Bias Amplifies Over Time",
            order: 3,
          },
          {
            slug: "how-position-bias-distorts-training-data",
            title: "How Position Bias Distorts Training Data",
            order: 2,
          },
          {
            slug: "production-implementation-logging-calibration-and-monitoring",
            title:
              "Production Implementation Logging Calibration And Monitoring",
            order: 5,
          },
          {
            slug: "what-is-position-bias-in-recommendation-systems",
            title: "What Is Position Bias In Recommendation Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "realtime-personalization",
        title: "Realtime Personalization",
        articles: [
          {
            slug: "contextual-bandits-balancing-exploration-and-exploitation",
            title: "Contextual Bandits Balancing Exploration And Exploitation",
            order: 3,
          },
          {
            slug: "failure-modes-feedback-loops-position-bias-and-drift",
            title: "Failure Modes Feedback Loops Position Bias And Drift",
            order: 5,
          },
          {
            slug: "how-session-based-models-work",
            title: "How Session Based Models Work",
            order: 2,
          },
          {
            slug: "production-architecture-pipelines-serving-and-evaluation",
            title: "Production Architecture Pipelines Serving And Evaluation",
            order: 6,
          },
          {
            slug: "trade-offs-exploration-rate-latency-and-session-length",
            title: "Trade Offs Exploration Rate Latency And Session Length",
            order: 4,
          },
          {
            slug: "what-is-real-time-personalization",
            title: "What Is Real Time Personalization",
            order: 1,
          },
        ],
      },
      {
        slug: "recsys-evaluation",
        title: "Recsys Evaluation",
        articles: [
          {
            slug: "candidate-retrieval-vs-final-ranking-metrics",
            title: "Candidate Retrieval Vs Final Ranking Metrics",
            order: 6,
          },
          {
            slug: "choosing-precisionk-vs-ndcgk-when-to-use-each",
            title: "Choosing Precisionk Vs Ndcgk When To Use Each",
            order: 4,
          },
          {
            slug: "coverage-metrics-ecosystem-health-beyond-accuracy",
            title: "Coverage Metrics Ecosystem Health Beyond Accuracy",
            order: 3,
          },
          {
            slug: "ndcgk-position-aware-ranking-quality",
            title: "Ndcgk Position Aware Ranking Quality",
            order: 2,
          },
          {
            slug: "precisionk-top-k-accuracy-for-ranked-recommendations",
            title: "Precisionk Top K Accuracy For Ranked Recommendations",
            order: 1,
          },
          {
            slug: "production-evaluation-scale-debiasing-and-failure-modes",
            title: "Production Evaluation Scale Debiasing And Failure Modes",
            order: 5,
          },
        ],
      },
      {
        slug: "recsys-scalability",
        title: "Recsys Scalability",
        articles: [
          {
            slug: "approximate-nearest-neighbor-search-trading-exactness-for-scale",
            title:
              "Approximate Nearest Neighbor Search Trading Exactness For Scale",
            order: 1,
          },
          {
            slug: "choosing-the-right-index-decision-framework-and-capacity-planning",
            title:
              "Choosing The Right Index Decision Framework And Capacity Planning",
            order: 6,
          },
          {
            slug: "hnsw-graph-based-search-with-hierarchical-navigation",
            title: "Hnsw Graph Based Search With Hierarchical Navigation",
            order: 2,
          },
          {
            slug: "ivf-and-product-quantization-compression-for-billion-scale-search",
            title:
              "Ivf And Product Quantization Compression For Billion Scale Search",
            order: 3,
          },
          {
            slug: "memory-vs-disk-trade-offs-when-data-exceeds-ram",
            title: "Memory Vs Disk Trade Offs When Data Exceeds Ram",
            order: 4,
          },
          {
            slug: "production-failure-modes-and-operational-challenges",
            title: "Production Failure Modes And Operational Challenges",
            order: 5,
          },
        ],
      },
      {
        slug: "retrieval-ranking-pipeline",
        title: "Retrieval Ranking Pipeline",
        articles: [
          {
            slug: "critical-trade-offs-ranking-objectives-latency-and-freshness",
            title:
              "Critical Trade Offs Ranking Objectives Latency And Freshness",
            order: 4,
          },
          {
            slug: "multi-source-retrieval-combining-multiple-candidate-generators",
            title:
              "Multi Source Retrieval Combining Multiple Candidate Generators",
            order: 2,
          },
          {
            slug: "production-implementation-orchestration-caching-and-observability",
            title:
              "Production Implementation Orchestration Caching And Observability",
            order: 6,
          },
          {
            slug: "ranking-cascades-trading-off-quality-and-latency-with-multi-stage-rankers",
            title:
              "Ranking Cascades Trading Off Quality And Latency With Multi Stage Rankers",
            order: 3,
          },
          {
            slug: "retrieval-and-ranking-failure-modes-in-production",
            title: "Retrieval And Ranking Failure Modes In Production",
            order: 5,
          },
          {
            slug: "what-is-a-retrieval-and-ranking-pipeline",
            title: "What Is A Retrieval And Ranking Pipeline",
            order: 1,
          },
        ],
      },
      {
        slug: "two-tower-models",
        title: "Two Tower Models",
        articles: [
          {
            slug: "failure-modes-and-production-operations",
            title: "Failure Modes And Production Operations",
            order: 6,
          },
          {
            slug: "how-two-tower-architecture-works",
            title: "How Two Tower Architecture Works",
            order: 2,
          },
          {
            slug: "inference-at-scale-with-ann-search",
            title: "Inference At Scale With Ann Search",
            order: 4,
          },
          {
            slug: "trade-offs-and-when-to-use-two-tower",
            title: "Trade Offs And When To Use Two Tower",
            order: 5,
          },
          {
            slug: "training-two-tower-models",
            title: "Training Two Tower Models",
            order: 3,
          },
          {
            slug: "what-are-two-tower-models-and-why-use-them",
            title: "What Are Two Tower Models And Why Use Them",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-search-ranking",
    title: "Search Ranking",
    subsections: [
      {
        slug: "dense-retrieval",
        title: "Dense Retrieval",
        articles: [
          {
            slug: "dense-retrieval-failure-modes-and-mitigation-strategies",
            title: "Dense Retrieval Failure Modes And Mitigation Strategies",
            order: 5,
          },
          {
            slug: "hybrid-retrieval-combining-dense-and-sparse-methods",
            title: "Hybrid Retrieval Combining Dense And Sparse Methods",
            order: 4,
          },
          {
            slug: "production-dense-retrieval-pipeline-embedding-indexing-and-serving",
            title:
              "Production Dense Retrieval Pipeline Embedding Indexing And Serving",
            order: 3,
          },
          {
            slug: "training-dense-retrievers-contrastive-learning-and-hard-negatives",
            title:
              "Training Dense Retrievers Contrastive Learning And Hard Negatives",
            order: 2,
          },
          {
            slug: "vector-compression-and-quantization-trade-offs-for-dense-retrieval",
            title:
              "Vector Compression And Quantization Trade Offs For Dense Retrieval",
            order: 6,
          },
          {
            slug: "what-is-dense-retrieval-with-bert-based-embeddings",
            title: "What Is Dense Retrieval With Bert Based Embeddings",
            order: 1,
          },
        ],
      },
      {
        slug: "learning-to-rank",
        title: "Learning To Rank",
        articles: [
          {
            slug: "how-to-choose-decision-framework-for-pointwise-vs-pairwise-vs-listwise",
            title:
              "How To Choose Decision Framework For Pointwise Vs Pairwise Vs Listwise",
            order: 5,
          },
          {
            slug: "listwise-ranking-optimizing-the-entire-list-with-metric-aware-losses",
            title:
              "Listwise Ranking Optimizing The Entire List With Metric Aware Losses",
            order: 4,
          },
          {
            slug: "pairwise-ranking-learning-relative-order-from-item-comparisons",
            title:
              "Pairwise Ranking Learning Relative Order From Item Comparisons",
            order: 3,
          },
          {
            slug: "pointwise-ranking-when-to-treat-ranking-as-independent-predictions",
            title:
              "Pointwise Ranking When To Treat Ranking As Independent Predictions",
            order: 2,
          },
          {
            slug: "production-implementation-training-pipelines-and-serving-architecture-for-learning-to-rank",
            title:
              "Production Implementation Training Pipelines And Serving Architecture For Learning To Rank",
            order: 6,
          },
          {
            slug: "what-is-learning-to-rank-and-how-does-it-differ-from-standard-classification",
            title:
              "What Is Learning To Rank And How Does It Differ From Standard Classification",
            order: 1,
          },
        ],
      },
      {
        slug: "query-understanding",
        title: "Query Understanding",
        articles: [
          {
            slug: "entity-parsing-and-linking-in-query-understanding",
            title: "Entity Parsing And Linking In Query Understanding",
            order: 3,
          },
          {
            slug: "failure-modes-and-production-guardrails",
            title: "Failure Modes And Production Guardrails",
            order: 5,
          },
          {
            slug: "implementation-architecture-and-evaluation-strategy",
            title: "Implementation Architecture And Evaluation Strategy",
            order: 6,
          },
          {
            slug: "intent-classification-and-routing-strategies",
            title: "Intent Classification And Routing Strategies",
            order: 2,
          },
          {
            slug: "query-rewriting-for-improved-recall-and-precision",
            title: "Query Rewriting For Improved Recall And Precision",
            order: 4,
          },
          {
            slug: "what-is-query-understanding-in-search-systems",
            title: "What Is Query Understanding In Search Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "ranking-feature-engineering",
        title: "Ranking Feature Engineering",
        articles: [
          {
            slug: "feature-groups-and-their-role-in-ranking-systems",
            title: "Feature Groups And Their Role In Ranking Systems",
            order: 1,
          },
          {
            slug: "feature-store-serving-patterns-and-latency-budgets",
            title: "Feature Store Serving Patterns And Latency Budgets",
            order: 4,
          },
          {
            slug: "hierarchical-feature-backoff-and-cold-start-handling",
            title: "Hierarchical Feature Backoff And Cold Start Handling",
            order: 6,
          },
          {
            slug: "label-engineering-creating-training-labels-from-implicit-feedback",
            title:
              "Label Engineering Creating Training Labels From Implicit Feedback",
            order: 3,
          },
          {
            slug: "multi-resolution-time-windows-and-feature-freshness",
            title: "Multi Resolution Time Windows And Feature Freshness",
            order: 2,
          },
          {
            slug: "training-serving-skew-and-point-in-time-feature-correctness",
            title:
              "Training Serving Skew And Point In Time Feature Correctness",
            order: 5,
          },
        ],
      },
      {
        slug: "search-evaluation",
        title: "Search Evaluation",
        articles: [
          {
            slug: "ctr-and-dwell-time-what-user-behavior-reveals-about-ranking",
            title:
              "Ctr And Dwell Time What User Behavior Reveals About Ranking",
            order: 4,
          },
          {
            slug: "evaluation-pitfalls-logging-errors-distribution-shift-and-guardrails",
            title:
              "Evaluation Pitfalls Logging Errors Distribution Shift And Guardrails",
            order: 6,
          },
          {
            slug: "mrr-and-precision-at-k-when-you-care-about-the-first-correct-result",
            title:
              "Mrr And Precision At K When You Care About The First Correct Result",
            order: 3,
          },
          {
            slug: "ndcg-measuring-ranking-quality-with-position-discounting",
            title: "Ndcg Measuring Ranking Quality With Position Discounting",
            order: 2,
          },
          {
            slug: "offline-vs-online-the-gap-between-training-and-reality",
            title: "Offline Vs Online The Gap Between Training And Reality",
            order: 5,
          },
          {
            slug: "what-is-ranking-evaluation-and-why-simple-accuracy-fails",
            title: "What Is Ranking Evaluation And Why Simple Accuracy Fails",
            order: 1,
          },
        ],
      },
      {
        slug: "search-personalization",
        title: "Search Personalization",
        articles: [
          {
            slug: "dual-horizon-profiles-short-term-vs-long-term-personalization",
            title:
              "Dual Horizon Profiles Short Term Vs Long Term Personalization",
            order: 2,
          },
          {
            slug: "embedding-based-similarity-features-embclicksim-and-embskipsim",
            title:
              "Embedding Based Similarity Features Embclicksim And Embskipsim",
            order: 4,
          },
          {
            slug: "failure-modes-and-production-safety-in-real-time-personalization",
            title:
              "Failure Modes And Production Safety In Real Time Personalization",
            order: 5,
          },
          {
            slug: "session-feature-computation-real-time-updates-within-latency-constraints",
            title:
              "Session Feature Computation Real Time Updates Within Latency Constraints",
            order: 3,
          },
          {
            slug: "training-pipeline-and-offline-batch-feature-computation",
            title: "Training Pipeline And Offline Batch Feature Computation",
            order: 6,
          },
          {
            slug: "what-is-real-time-search-personalization",
            title: "What Is Real Time Search Personalization",
            order: 1,
          },
        ],
      },
      {
        slug: "search-relevance-feedback",
        title: "Search Relevance Feedback",
        articles: [
          {
            slug: "how-do-click-models-separate-examination-from-attractiveness",
            title:
              "How Do Click Models Separate Examination From Attractiveness",
            order: 2,
          },
          {
            slug: "how-do-you-deploy-bias-correction-in-a-production-ranking-pipeline",
            title:
              "How Do You Deploy Bias Correction In A Production Ranking Pipeline",
            order: 6,
          },
          {
            slug: "how-do-you-implement-production-exploration-to-estimate-propensities",
            title:
              "How Do You Implement Production Exploration To Estimate Propensities",
            order: 4,
          },
          {
            slug: "what-are-the-critical-failure-modes-in-bias-aware-ranking",
            title: "What Are The Critical Failure Modes In Bias Aware Ranking",
            order: 5,
          },
          {
            slug: "what-is-inverse-propensity-scoring-and-when-does-it-fail",
            title: "What Is Inverse Propensity Scoring And When Does It Fail",
            order: 3,
          },
          {
            slug: "what-is-position-bias-and-why-does-it-distort-ranking-systems",
            title:
              "What Is Position Bias And Why Does It Distort Ranking Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "search-scalability",
        title: "Search Scalability",
        articles: [
          {
            slug: "approximate-nearest-neighbor-hnsw-ivf-pq",
            title: "Approximate Nearest Neighbor Hnsw Ivf Pq",
            order: 3,
          },
          {
            slug: "multi-tier-caching-features-embeddings",
            title: "Multi Tier Caching Features Embeddings",
            order: 2,
          },
          {
            slug: "production-architecture-sharding-caching-ann",
            title: "Production Architecture Sharding Caching Ann",
            order: 6,
          },
          {
            slug: "scalability-failure-modes",
            title: "Scalability Failure Modes",
            order: 5,
          },
          {
            slug: "scalability-trade-offs-latency-cost-accuracy",
            title: "Scalability Trade Offs Latency Cost Accuracy",
            order: 4,
          },
          {
            slug: "what-is-ml-search-scalability",
            title: "What Is Ml Search Scalability",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-timeseries-forecasting",
    title: "Timeseries Forecasting",
    subsections: [
      {
        slug: "deep-learning-timeseries",
        title: "Deep Learning Timeseries",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-deep-learning-time-series-forecasting",
            title:
              "Failure Modes And Edge Cases In Deep Learning Time Series Forecasting",
            order: 5,
          },
          {
            slug: "global-multi-horizon-forecasting-models",
            title: "Global Multi Horizon Forecasting Models",
            order: 3,
          },
          {
            slug: "long-short-term-memory-lstm-networks-for-time-series-forecasting",
            title:
              "Long Short Term Memory Lstm Networks For Time Series Forecasting",
            order: 1,
          },
          {
            slug: "production-pipeline-training-serving-and-monitoring-at-scale",
            title:
              "Production Pipeline Training Serving And Monitoring At Scale",
            order: 4,
          },
          {
            slug: "transformer-architectures-for-time-series-self-attention-and-long-range-dependencies",
            title:
              "Transformer Architectures For Time Series Self Attention And Long Range Dependencies",
            order: 2,
          },
        ],
      },
      {
        slug: "forecasting-at-scale",
        title: "Forecasting At Scale",
        articles: [
          {
            slug: "failure-modes-hierarchy-drift-singular-systems-and-data-latency",
            title:
              "Failure Modes Hierarchy Drift Singular Systems And Data Latency",
            order: 6,
          },
          {
            slug: "global-models-forecasting-millions-of-series-with-shared-parameters",
            title:
              "Global Models Forecasting Millions Of Series With Shared Parameters",
            order: 2,
          },
          {
            slug: "hierarchical-forecasting-predicting-across-millions-of-related-time-series",
            title:
              "Hierarchical Forecasting Predicting Across Millions Of Related Time Series",
            order: 1,
          },
          {
            slug: "production-pipeline-from-data-ingestion-to-online-serving-at-scale",
            title:
              "Production Pipeline From Data Ingestion To Online Serving At Scale",
            order: 5,
          },
          {
            slug: "reconciliation-strategies-top-down-bottom-up-and-optimal-methods",
            title:
              "Reconciliation Strategies Top Down Bottom Up And Optimal Methods",
            order: 3,
          },
          {
            slug: "scaling-reconciliation-sparse-matrices-and-subtree-parallelism",
            title:
              "Scaling Reconciliation Sparse Matrices And Subtree Parallelism",
            order: 4,
          },
        ],
      },
      {
        slug: "forecasting-evaluation",
        title: "Forecasting Evaluation",
        articles: [
          {
            slug: "how-to-build-a-production-metric-suite-for-forecast-evaluation",
            title:
              "How To Build A Production Metric Suite For Forecast Evaluation",
            order: 4,
          },
          {
            slug: "how-to-implement-forecast-evaluation-at-scale",
            title: "How To Implement Forecast Evaluation At Scale",
            order: 6,
          },
          {
            slug: "what-are-the-key-failure-modes-in-forecast-evaluation",
            title: "What Are The Key Failure Modes In Forecast Evaluation",
            order: 5,
          },
          {
            slug: "what-is-forecast-bias-and-why-does-it-matter",
            title: "What Is Forecast Bias And Why Does It Matter",
            order: 3,
          },
          {
            slug: "what-is-mean-absolute-percentage-error-mape-in-forecasting",
            title: "What Is Mean Absolute Percentage Error Mape In Forecasting",
            order: 1,
          },
          {
            slug: "what-is-root-mean-squared-error-rmse-in-time-series",
            title: "What Is Root Mean Squared Error Rmse In Time Series",
            order: 2,
          },
        ],
      },
      {
        slug: "missing-data-handling",
        title: "Missing Data Handling",
        articles: [
          {
            slug: "critical-failure-modes-in-production-missing-data-handling",
            title: "Critical Failure Modes In Production Missing Data Handling",
            order: 4,
          },
          {
            slug: "end-to-end-missing-data-pipeline-for-high-qps-ml-systems",
            title: "End To End Missing Data Pipeline For High Qps Ml Systems",
            order: 3,
          },
          {
            slug: "imputation-strategies-training-time-versus-serving-time-trade-offs",
            title:
              "Imputation Strategies Training Time Versus Serving Time Trade Offs",
            order: 2,
          },
          {
            slug: "understanding-missing-data-mechanisms-in-production-ml",
            title: "Understanding Missing Data Mechanisms In Production Ml",
            order: 1,
          },
        ],
      },
      {
        slug: "multi-horizon-forecasting",
        title: "Multi Horizon Forecasting",
        articles: [
          {
            slug: "failure-modes-and-edge-cases-in-multi-horizon-systems",
            title: "Failure Modes And Edge Cases In Multi Horizon Systems",
            order: 5,
          },
          {
            slug: "input-types-for-multi-horizon-models-static-known-future-and-observed-covariates",
            title:
              "Input Types For Multi Horizon Models Static Known Future And Observed Covariates",
            order: 2,
          },
          {
            slug: "modeling-strategies-recursive-vs-direct-multi-output-vs-per-horizon-models",
            title:
              "Modeling Strategies Recursive Vs Direct Multi Output Vs Per Horizon Models",
            order: 3,
          },
          {
            slug: "production-pipeline-from-data-assembly-to-serving-at-scale",
            title: "Production Pipeline From Data Assembly To Serving At Scale",
            order: 4,
          },
          {
            slug: "trade-offs-in-multi-horizon-forecasting-systems",
            title: "Trade Offs In Multi Horizon Forecasting Systems",
            order: 6,
          },
          {
            slug: "what-is-multi-horizon-forecasting",
            title: "What Is Multi Horizon Forecasting",
            order: 1,
          },
        ],
      },
      {
        slug: "realtime-forecasting-updates",
        title: "Realtime Forecasting Updates",
        articles: [
          {
            slug: "end-to-end-architecture-for-real-time-features-at-scale",
            title: "End To End Architecture For Real Time Features At Scale",
            order: 6,
          },
          {
            slug: "event-time-watermarks-and-handling-late-data",
            title: "Event Time Watermarks And Handling Late Data",
            order: 3,
          },
          {
            slug: "online-learning-with-streaming-updates",
            title: "Online Learning With Streaming Updates",
            order: 4,
          },
          {
            slug: "production-failure-modes-in-real-time-windowing-systems",
            title: "Production Failure Modes In Real Time Windowing Systems",
            order: 5,
          },
          {
            slug: "time-bucketing-efficient-sliding-window-implementation",
            title: "Time Bucketing Efficient Sliding Window Implementation",
            order: 2,
          },
          {
            slug: "what-are-sliding-windows-in-real-time-systems",
            title: "What Are Sliding Windows In Real Time Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "statistical-forecasting",
        title: "Statistical Forecasting",
        articles: [
          {
            slug: "arima-modeling-momentum-and-shocks",
            title: "Arima Modeling Momentum And Shocks",
            order: 3,
          },
          {
            slug: "choosing-between-ets-arima-alternatives",
            title: "Choosing Between Ets Arima Alternatives",
            order: 5,
          },
          {
            slug: "exponential-smoothing-weighted-averages",
            title: "Exponential Smoothing Weighted Averages",
            order: 2,
          },
          {
            slug: "failure-modes-production-monitoring",
            title: "Failure Modes Production Monitoring",
            order: 6,
          },
          {
            slug: "production-architecture-statistical-models",
            title: "Production Architecture Statistical Models",
            order: 4,
          },
          {
            slug: "what-is-statistical-time-series-forecasting",
            title: "What Is Statistical Time Series Forecasting",
            order: 1,
          },
        ],
      },
      {
        slug: "timeseries-feature-engineering",
        title: "Timeseries Feature Engineering",
        articles: [
          {
            slug: "failure-modes-edge-cases-and-operational-challenges",
            title: "Failure Modes Edge Cases And Operational Challenges",
            order: 6,
          },
          {
            slug: "feature-pipeline-architecture-and-operational-patterns",
            title: "Feature Pipeline Architecture And Operational Patterns",
            order: 5,
          },
          {
            slug: "point-in-time-correctness-and-preventing-leakage",
            title: "Point In Time Correctness And Preventing Leakage",
            order: 4,
          },
          {
            slug: "rolling-statistics-and-window-aggregations",
            title: "Rolling Statistics And Window Aggregations",
            order: 2,
          },
          {
            slug: "seasonality-encoding-calendar-features-and-fourier-terms",
            title: "Seasonality Encoding Calendar Features And Fourier Terms",
            order: 3,
          },
          {
            slug: "what-are-lag-features-in-time-series",
            title: "What Are Lag Features In Time Series",
            order: 1,
          },
        ],
      },
    ],
  },
  {
    slug: "ml-training-infrastructure",
    title: "Training Infrastructure",
    subsections: [
      {
        slug: "continuous-training",
        title: "Continuous Training",
        articles: [
          {
            slug: "cost-and-capacity-management-for-continuous-training-at-scale",
            title:
              "Cost And Capacity Management For Continuous Training At Scale",
            order: 6,
          },
          {
            slug: "drift-detection-and-staleness-budgets",
            title: "Drift Detection And Staleness Budgets",
            order: 2,
          },
          {
            slug: "failure-modes-in-continuous-training-pipelines",
            title: "Failure Modes In Continuous Training Pipelines",
            order: 5,
          },
          {
            slug: "retraining-strategies-batch-vs-incremental-vs-hybrid",
            title: "Retraining Strategies Batch Vs Incremental Vs Hybrid",
            order: 3,
          },
          {
            slug: "safe-rollout-patterns-champion-challenger-and-phased-deployment",
            title:
              "Safe Rollout Patterns Champion Challenger And Phased Deployment",
            order: 4,
          },
          {
            slug: "what-is-continuous-training-and-model-refresh",
            title: "What Is Continuous Training And Model Refresh",
            order: 1,
          },
        ],
      },
      {
        slug: "data-versioning",
        title: "Data Versioning",
        articles: [
          {
            slug: "data-lineage-tracking-transformations-and-dependencies",
            title: "Data Lineage Tracking Transformations And Dependencies",
            order: 2,
          },
          {
            slug: "failure-modes-when-versioning-and-lineage-break-down",
            title: "Failure Modes When Versioning And Lineage Break Down",
            order: 5,
          },
          {
            slug: "lineage-granularity-table-vs-column-vs-row-level-trade-offs",
            title:
              "Lineage Granularity Table Vs Column Vs Row Level Trade Offs",
            order: 6,
          },
          {
            slug: "production-manifests-linking-data-code-and-environment",
            title: "Production Manifests Linking Data Code And Environment",
            order: 4,
          },
          {
            slug: "snapshot-vs-delta-storage-performance-and-cost-trade-offs",
            title: "Snapshot Vs Delta Storage Performance And Cost Trade Offs",
            order: 3,
          },
          {
            slug: "what-is-data-versioning-in-machine-learning-pipelines",
            title: "What Is Data Versioning In Machine Learning Pipelines",
            order: 1,
          },
        ],
      },
      {
        slug: "distributed-training",
        title: "Distributed Training",
        articles: [
          {
            slug: "3d-parallelism-and-topology-aware-mapping-in-production",
            title: "3d Parallelism And Topology Aware Mapping In Production",
            order: 5,
          },
          {
            slug: "communication-bottlenecks-and-scaling-limits-in-distributed-training",
            title:
              "Communication Bottlenecks And Scaling Limits In Distributed Training",
            order: 6,
          },
          {
            slug: "data-parallelism-scaling-training-throughput",
            title: "Data Parallelism Scaling Training Throughput",
            order: 2,
          },
          {
            slug: "model-tensor-parallelism-splitting-layers-across-devices",
            title: "Model Tensor Parallelism Splitting Layers Across Devices",
            order: 3,
          },
          {
            slug: "pipeline-parallelism-scaling-model-depth-across-devices",
            title: "Pipeline Parallelism Scaling Model Depth Across Devices",
            order: 4,
          },
          {
            slug: "what-is-distributed-training-and-why-do-we-need-it",
            title: "What Is Distributed Training And Why Do We Need It",
            order: 1,
          },
        ],
      },
      {
        slug: "experiment-tracking",
        title: "Experiment Tracking",
        articles: [
          {
            slug: "asynchronous-logging-and-metadata-architecture",
            title: "Asynchronous Logging And Metadata Architecture",
            order: 4,
          },
          {
            slug: "dataset-fingerprinting-and-artifact-versioning-strategies",
            title: "Dataset Fingerprinting And Artifact Versioning Strategies",
            order: 2,
          },
          {
            slug: "environment-capture-and-determinism-guarantees",
            title: "Environment Capture And Determinism Guarantees",
            order: 3,
          },
          {
            slug: "failure-modes-and-edge-cases-in-production-reproducibility",
            title: "Failure Modes And Edge Cases In Production Reproducibility",
            order: 6,
          },
          {
            slug: "lineage-graphs-and-promotion-gates",
            title: "Lineage Graphs And Promotion Gates",
            order: 5,
          },
          {
            slug: "what-is-experiment-tracking-and-reproducibility-in-ml-systems",
            title:
              "What Is Experiment Tracking And Reproducibility In Ml Systems",
            order: 1,
          },
        ],
      },
      {
        slug: "gpu-resource-management",
        title: "Gpu Resource Management",
        articles: [
          {
            slug: "ahead-of-time-scheduling-and-multi-stream-concurrency",
            title: "Ahead Of Time Scheduling And Multi Stream Concurrency",
            order: 2,
          },
          {
            slug: "failure-modes-fragmentation-thrashing-and-topology-misplacement",
            title:
              "Failure Modes Fragmentation Thrashing And Topology Misplacement",
            order: 5,
          },
          {
            slug: "gpu-allocation-fundamentals-spatial-vs-temporal-sharing",
            title: "Gpu Allocation Fundamentals Spatial Vs Temporal Sharing",
            order: 1,
          },
          {
            slug: "implementation-patterns-two-level-scheduling-and-profiling-based-co-location",
            title:
              "Implementation Patterns Two Level Scheduling And Profiling Based Co Location",
            order: 6,
          },
          {
            slug: "priority-preemption-and-multi-tenant-qos-policies",
            title: "Priority Preemption And Multi Tenant Qos Policies",
            order: 4,
          },
          {
            slug: "topology-aware-gang-scheduling-for-distributed-training",
            title: "Topology Aware Gang Scheduling For Distributed Training",
            order: 3,
          },
        ],
      },
      {
        slug: "hyperparameter-optimization-scale",
        title: "Hyperparameter Optimization Scale",
        articles: [
          {
            slug: "bayesian-optimization-vs-asha-when-to-use-each",
            title: "Bayesian Optimization Vs Asha When To Use Each",
            order: 4,
          },
          {
            slug: "core-hpo-algorithms-random-vs-bayesian-vs-multi-fidelity",
            title: "Core Hpo Algorithms Random Vs Bayesian Vs Multi Fidelity",
            order: 2,
          },
          {
            slug: "hpo-failure-modes-and-production-mitigations",
            title: "Hpo Failure Modes And Production Mitigations",
            order: 5,
          },
          {
            slug: "production-hpo-system-architecture",
            title: "Production Hpo System Architecture",
            order: 3,
          },
          {
            slug: "warm-start-transfer-learning-and-multi-objective-hpo",
            title: "Warm Start Transfer Learning And Multi Objective Hpo",
            order: 6,
          },
          {
            slug: "what-is-hyperparameter-optimization-at-scale",
            title: "What Is Hyperparameter Optimization At Scale",
            order: 1,
          },
        ],
      },
      {
        slug: "model-checkpointing",
        title: "Model Checkpointing",
        articles: [
          {
            slug: "checkpoint-failure-modes-and-atomic-commit-guarantees",
            title: "Checkpoint Failure Modes And Atomic Commit Guarantees",
            order: 5,
          },
          {
            slug: "checkpoint-frequency-balancing-cost-overhead-and-reliability",
            title:
              "Checkpoint Frequency Balancing Cost Overhead And Reliability",
            order: 3,
          },
          {
            slug: "checkpoint-storage-strategy-retention-tiering-and-cost-optimization",
            title:
              "Checkpoint Storage Strategy Retention Tiering And Cost Optimization",
            order: 6,
          },
          {
            slug: "snapshot-and-persist-the-two-phase-checkpointing-protocol",
            title: "Snapshot And Persist The Two Phase Checkpointing Protocol",
            order: 2,
          },
          {
            slug: "what-is-model-checkpointing-and-why-it-matters-at-scale",
            title: "What Is Model Checkpointing And Why It Matters At Scale",
            order: 1,
          },
          {
            slug: "world-size-agnostic-checkpoints-and-elastic-recovery",
            title: "World Size Agnostic Checkpoints And Elastic Recovery",
            order: 4,
          },
        ],
      },
      {
        slug: "training-orchestration",
        title: "Training Orchestration",
        articles: [
          {
            slug: "choosing-your-orchestration-stack-decision-framework",
            title: "Choosing Your Orchestration Stack Decision Framework",
            order: 6,
          },
          {
            slug: "containerized-vs-shared-environment-isolation-trade-offs",
            title: "Containerized Vs Shared Environment Isolation Trade Offs",
            order: 3,
          },
          {
            slug: "production-implementation-reliability-and-performance-patterns",
            title:
              "Production Implementation Reliability And Performance Patterns",
            order: 5,
          },
          {
            slug: "three-orchestration-tools-airflow-kubeflow-pipelines-and-mlflow-roles",
            title:
              "Three Orchestration Tools Airflow Kubeflow Pipelines And Mlflow Roles",
            order: 2,
          },
          {
            slug: "training-orchestration-coordinating-the-ml-pipeline-as-a-dag",
            title:
              "Training Orchestration Coordinating The Ml Pipeline As A Dag",
            order: 1,
          },
          {
            slug: "training-orchestration-failure-modes-in-production",
            title: "Training Orchestration Failure Modes In Production",
            order: 4,
          },
        ],
      },
      {
        slug: "training-serving-skew",
        title: "Training Serving Skew",
        articles: [
          {
            slug: "feedback-loops-and-position-bias-in-ranking-systems",
            title: "Feedback Loops And Position Bias In Ranking Systems",
            order: 6,
          },
          {
            slug: "logging-and-measurement-building-training-data-from-production",
            title:
              "Logging And Measurement Building Training Data From Production",
            order: 3,
          },
          {
            slug: "robustness-engineering-training-for-production-realities",
            title: "Robustness Engineering Training For Production Realities",
            order: 5,
          },
          {
            slug: "single-source-of-truth-unified-feature-definitions",
            title: "Single Source Of Truth Unified Feature Definitions",
            order: 2,
          },
          {
            slug: "temporal-correctness-and-point-in-time-joins",
            title: "Temporal Correctness And Point In Time Joins",
            order: 4,
          },
          {
            slug: "what-is-training-serving-skew-and-why-does-it-matter",
            title: "What Is Training Serving Skew And Why Does It Matter",
            order: 1,
          },
        ],
      },
    ],
  },
];
