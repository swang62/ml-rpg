import type { Course } from "~/data/types";

const course: Course = {
  title: "ML System Design",
  categories: [
    {
      category: "ml-ab-testing",
      title: "AB Testing",
      subsections: [
        {
          subsection: "experiment-design",
          title: "Experiment Design",
          lessons: [
            {
              lesson: "how-do-geo-and-switchback-designs-handle-interference",
              title: "How Do Geo And Switchback Designs Handle Interference",
              order: 6,
            },
            {
              lesson: "how-does-event-triggered-assignment-reduce-noise",
              title: "How Does Event Triggered Assignment Reduce Noise",
              order: 4,
            },
            {
              lesson: "how-does-stratification-reduce-variance-in-experiments",
              title: "How Does Stratification Reduce Variance In Experiments",
              order: 2,
            },
            {
              lesson:
                "what-are-sample-ratio-mismatch-and-identity-churn-failures",
              title:
                "What Are Sample Ratio Mismatch And Identity Churn Failures",
              order: 5,
            },
            {
              lesson: "what-is-power-analysis-and-why-does-sample-size-matter",
              title: "What Is Power Analysis And Why Does Sample Size Matter",
              order: 3,
            },
            {
              lesson:
                "what-is-randomization-and-sticky-bucketing-in-experiments",
              title:
                "What Is Randomization And Sticky Bucketing In Experiments",
              order: 1,
            },
          ],
        },
        {
          subsection: "guardrail-metrics",
          title: "Guardrail Metrics",
          lessons: [
            {
              lesson: "guardrail-failure-modes-and-mitigation-strategies",
              title: "Guardrail Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson: "guardrail-metric-selection-and-tiering",
              title: "Guardrail Metric Selection And Tiering",
              order: 3,
            },
            {
              lesson: "production-implementation-and-runtime-architecture",
              title: "Production Implementation And Runtime Architecture",
              order: 4,
            },
            {
              lesson: "three-tier-guardrail-framework",
              title: "Three Tier Guardrail Framework",
              order: 2,
            },
            {
              lesson: "tradeoffs-guardrail-coverage-vs-experiment-velocity",
              title: "Tradeoffs Guardrail Coverage Vs Experiment Velocity",
              order: 6,
            },
            {
              lesson: "what-are-guardrail-metrics",
              title: "What Are Guardrail Metrics",
              order: 1,
            },
          ],
        },
        {
          subsection: "holdout-groups",
          title: "Holdout Groups",
          lessons: [
            {
              lesson:
                "failure-modes-selection-bias-contamination-and-reshuffling",
              title:
                "Failure Modes Selection Bias Contamination And Reshuffling",
              order: 4,
            },
            {
              lesson:
                "holdout-assignment-deterministic-hashing-and-cohort-management",
              title:
                "Holdout Assignment Deterministic Hashing And Cohort Management",
              order: 2,
            },
            {
              lesson:
                "implementation-gating-analytics-and-dual-path-management",
              title: "Implementation Gating Analytics And Dual Path Management",
              order: 5,
            },
            {
              lesson: "long-term-measurement-and-cumulative-impact",
              title: "Long Term Measurement And Cumulative Impact",
              order: 6,
            },
            {
              lesson:
                "trade-offs-statistical-power-operational-complexity-and-cost",
              title:
                "Trade Offs Statistical Power Operational Complexity And Cost",
              order: 3,
            },
            {
              lesson: "what-are-holdout-groups-and-why-do-they-matter",
              title: "What Are Holdout Groups And Why Do They Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "interleaving-experiments",
          title: "Interleaving Experiments",
          lessons: [
            {
              lesson: "interleaving-failure-modes-and-edge-cases",
              title: "Interleaving Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson: "interleaving-vs-ab-testing-trade-offs",
              title: "Interleaving Vs AB Testing Trade Offs",
              order: 4,
            },
            {
              lesson: "production-implementation-and-scale-considerations",
              title: "Production Implementation And Scale Considerations",
              order: 6,
            },
            {
              lesson: "statistical-analysis-and-preference-margins",
              title: "Statistical Analysis And Preference Margins",
              order: 3,
            },
            {
              lesson: "team-draft-interleaving-algorithm",
              title: "Team Draft Interleaving Algorithm",
              order: 2,
            },
            {
              lesson: "what-is-interleaving-for-ranking-models",
              title: "What Is Interleaving For Ranking Models",
              order: 1,
            },
          ],
        },
        {
          subsection: "multi-armed-bandits",
          title: "Multi Armed Bandits",
          lessons: [
            {
              lesson: "contextual-bandits-linucb-and-neural-linear-methods",
              title: "Contextual Bandits Linucb And Neural Linear Methods",
              order: 6,
            },
            {
              lesson: "failure-modes-delayed-rewards-and-nonstationarity",
              title: "Failure Modes Delayed Rewards And Nonstationarity",
              order: 5,
            },
            {
              lesson:
                "multi-armed-bandits-balancing-exploration-and-exploitation",
              title:
                "Multi Armed Bandits Balancing Exploration And Exploitation",
              order: 1,
            },
            {
              lesson: "production-architecture-serving-bandits-at-scale",
              title: "Production Architecture Serving Bandits At Scale",
              order: 4,
            },
            {
              lesson: "thompson-sampling-bayesian-probability-matching",
              title: "Thompson Sampling Bayesian Probability Matching",
              order: 3,
            },
            {
              lesson: "upper-confidence-bound-ucb-optimism-under-uncertainty",
              title: "Upper Confidence Bound Ucb Optimism Under Uncertainty",
              order: 2,
            },
          ],
        },
        {
          subsection: "ramp-up-strategies",
          title: "Ramp Up Strategies",
          lessons: [
            {
              lesson: "canary-metrics-system-product-and-data-quality-signals",
              title: "Canary Metrics System Product And Data Quality Signals",
              order: 3,
            },
            {
              lesson:
                "failure-modes-biased-cohorts-cold-start-and-feedback-loops",
              title:
                "Failure Modes Biased Cohorts Cold Start And Feedback Loops",
              order: 5,
            },
            {
              lesson:
                "implementation-traffic-routing-metric-collection-and-decision-engine",
              title:
                "Implementation Traffic Routing Metric Collection And Decision Engine",
              order: 6,
            },
            {
              lesson:
                "ramp-up-strategies-traffic-shaping-and-cohort-assignment",
              title: "Ramp Up Strategies Traffic Shaping And Cohort Assignment",
              order: 2,
            },
            {
              lesson: "trade-offs-canary-vs-blue-green-vs-shadow-deployment",
              title: "Trade Offs Canary Vs Blue Green Vs Shadow Deployment",
              order: 4,
            },
            {
              lesson: "what-is-canary-analysis-in-ml-systems",
              title: "What Is Canary Analysis In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "statistical-significance",
          title: "Statistical Significance",
          lessons: [
            {
              lesson:
                "confidence-intervals-precision-and-practical-interpretation",
              title:
                "Confidence Intervals Precision And Practical Interpretation",
              order: 2,
            },
            {
              lesson:
                "experimentation-at-scale-randomization-metrics-and-variance-reduction",
              title:
                "Experimentation At Scale Randomization Metrics And Variance Reduction",
              order: 3,
            },
            {
              lesson:
                "failure-modes-srm-peeking-interference-and-heavy-tails-in-production",
              title:
                "Failure Modes Srm Peeking Interference And Heavy Tails In Production",
              order: 5,
            },
            {
              lesson:
                "statistical-significance-understanding-p-values-and-type-iii-errors",
              title:
                "Statistical Significance Understanding P Values And Type Iii Errors",
              order: 1,
            },
            {
              lesson:
                "trade-offs-sequential-monitoring-unit-of-randomization-and-interval-methods",
              title:
                "Trade Offs Sequential Monitoring Unit Of Randomization And Interval Methods",
              order: 4,
            },
          ],
        },
      ],
    },
    {
      category: "ml-cv-systems",
      title: "CV Systems",
      subsections: [
        {
          subsection: "cv-data-augmentation",
          title: "CV Data Augmentation",
          lessons: [
            {
              lesson: "autoaugment-automated-policy-discovery",
              title: "Autoaugment Automated Policy Discovery",
              order: 2,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-data-augmentation",
              title: "Failure Modes And Edge Cases In Data Augmentation",
              order: 5,
            },
            {
              lesson: "mixup-linear-interpolation-for-regularization",
              title: "Mixup Linear Interpolation For Regularization",
              order: 3,
            },
            {
              lesson:
                "production-implementation-augmentation-as-a-system-component",
              title:
                "Production Implementation Augmentation As A System Component",
              order: 6,
            },
            {
              lesson: "synthetic-data-generation-for-computer-vision",
              title: "Synthetic Data Generation For Computer Vision",
              order: 4,
            },
            {
              lesson: "what-is-data-augmentation-in-computer-vision",
              title: "What Is Data Augmentation In Computer Vision",
              order: 1,
            },
          ],
        },
        {
          subsection: "cv-evaluation",
          title: "CV Evaluation",
          lessons: [
            {
              lesson: "choosing-metrics-and-protocols-for-your-task",
              title: "Choosing Metrics And Protocols For Your Task",
              order: 6,
            },
            {
              lesson: "evaluation-failure-modes-and-metric-gaming-risks",
              title: "Evaluation Failure Modes And Metric Gaming Risks",
              order: 5,
            },
            {
              lesson:
                "production-evaluation-pipelines-scale-cost-and-operating-points",
              title:
                "Production Evaluation Pipelines Scale Cost And Operating Points",
              order: 4,
            },
            {
              lesson:
                "understanding-precision-recall-and-the-precision-recall-curve",
              title:
                "Understanding Precision Recall And The Precision Recall Curve",
              order: 2,
            },
            {
              lesson:
                "what-is-average-precision-ap-and-mean-average-precision-map",
              title:
                "What Is Average Precision Ap And Mean Average Precision Map",
              order: 3,
            },
            {
              lesson:
                "what-is-intersection-over-union-iou-and-why-does-it-matter",
              title:
                "What Is Intersection Over Union Iou And Why Does It Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "edge-deployment",
          title: "Edge Deployment",
          lessons: [
            {
              lesson:
                "accuracy-vs-latency-trade-offs-choosing-between-ssd-mobilenet-and-efficientdet-lite",
              title:
                "Accuracy Vs Latency Trade Offs Choosing Between Ssd Mobilenet And Efficientdet Lite",
              order: 6,
            },
            {
              lesson:
                "edge-deployment-failure-modes-quantization-drift-thermal-throttling-and-nms-explosions",
              title:
                "Edge Deployment Failure Modes Quantization Drift Thermal Throttling And Nms Explosions",
              order: 5,
            },
            {
              lesson:
                "efficientnet-lite-compound-scaling-for-hardware-constrained-deployment",
              title:
                "Efficientnet Lite Compound Scaling For Hardware Constrained Deployment",
              order: 3,
            },
            {
              lesson:
                "how-mobilenet-achieves-8x-faster-inference-with-depthwise-separable-convolutions",
              title:
                "How Mobilenet Achieves 8x Faster Inference With Depthwise Separable Convolutions",
              order: 2,
            },
            {
              lesson: "real-time-edge-pipeline-from-sensor-to-action-in-33ms",
              title: "Real Time Edge Pipeline From Sensor To Action In 33ms",
              order: 4,
            },
            {
              lesson:
                "what-makes-edge-deployment-different-from-cloud-inference",
              title:
                "What Makes Edge Deployment Different From Cloud Inference",
              order: 1,
            },
          ],
        },
        {
          subsection: "image-classification-scale",
          title: "Image Classification Scale",
          lessons: [
            {
              lesson:
                "critical-trade-offs-model-choice-serving-strategy-and-cost",
              title:
                "Critical Trade Offs Model Choice Serving Strategy And Cost",
              order: 4,
            },
            {
              lesson: "failure-modes-and-production-reliability",
              title: "Failure Modes And Production Reliability",
              order: 5,
            },
            {
              lesson:
                "image-classification-at-scale-architecture-and-data-flow",
              title: "Image Classification At Scale Architecture And Data Flow",
              order: 1,
            },
            {
              lesson: "model-versioning-rollout-and-governance",
              title: "Model Versioning Rollout And Governance",
              order: 6,
            },
            {
              lesson:
                "online-serving-architecture-dynamic-batching-and-caching",
              title: "Online Serving Architecture Dynamic Batching And Caching",
              order: 3,
            },
            {
              lesson: "training-pipeline-from-pretraining-to-production",
              title: "Training Pipeline From Pretraining To Production",
              order: 2,
            },
          ],
        },
        {
          subsection: "image-preprocessing",
          title: "Image Preprocessing",
          lessons: [
            {
              lesson: "common-preprocessing-failure-modes-in-production",
              title: "Common Preprocessing Failure Modes In Production",
              order: 5,
            },
            {
              lesson: "domain-specific-preprocessing-constraints",
              title: "Domain Specific Preprocessing Constraints",
              order: 6,
            },
            {
              lesson: "image-augmentation-fundamentals",
              title: "Image Augmentation Fundamentals",
              order: 1,
            },
            {
              lesson: "normalization-and-input-standardization",
              title: "Normalization And Input Standardization",
              order: 2,
            },
            {
              lesson: "offline-vs-on-the-fly-augmentation-tradeoffs",
              title: "Offline Vs On The Fly Augmentation Tradeoffs",
              order: 4,
            },
            {
              lesson: "production-data-pipeline-design-and-throughput",
              title: "Production Data Pipeline Design And Throughput",
              order: 3,
            },
          ],
        },
        {
          subsection: "multi-task-learning-cv",
          title: "Multi Task Learning CV",
          lessons: [
            {
              lesson: "failure-modes-negative-transfer-and-data-drift",
              title: "Failure Modes Negative Transfer And Data Drift",
              order: 5,
            },
            {
              lesson: "hard-vs-soft-parameter-sharing-strategies",
              title: "Hard Vs Soft Parameter Sharing Strategies",
              order: 2,
            },
            {
              lesson: "loss-balancing-and-gradient-interference",
              title: "Loss Balancing And Gradient Interference",
              order: 3,
            },
            {
              lesson: "production-implementation-and-serving-architecture",
              title: "Production Implementation And Serving Architecture",
              order: 4,
            },
            {
              lesson: "what-is-multi-task-learning",
              title: "What Is Multi Task Learning",
              order: 1,
            },
            {
              lesson: "when-to-choose-multi-task-vs-separate-models",
              title: "When To Choose Multi Task Vs Separate Models",
              order: 6,
            },
          ],
        },
        {
          subsection: "object-detection",
          title: "Object Detection",
          lessons: [
            {
              lesson:
                "failure-modes-and-edge-cases-in-production-object-detection",
              title:
                "Failure Modes And Edge Cases In Production Object Detection",
              order: 5,
            },
            {
              lesson:
                "production-trade-offs-when-to-choose-two-stage-vs-single-stage-detectors",
              title:
                "Production Trade Offs When To Choose Two Stage Vs Single Stage Detectors",
              order: 4,
            },
            {
              lesson:
                "single-stage-detectors-yolo-ssd-and-real-time-performance",
              title:
                "Single Stage Detectors Yolo Ssd And Real Time Performance",
              order: 3,
            },
            {
              lesson:
                "two-stage-detectors-r-cnn-family-evolution-and-performance",
              title:
                "Two Stage Detectors R Cnn Family Evolution And Performance",
              order: 2,
            },
            {
              lesson:
                "video-optimization-and-multi-camera-deployment-strategies",
              title:
                "Video Optimization And Multi Camera Deployment Strategies",
              order: 6,
            },
            {
              lesson:
                "what-is-object-detection-and-how-does-it-differ-from-classification",
              title:
                "What Is Object Detection And How Does It Differ From Classification",
              order: 1,
            },
          ],
        },
        {
          subsection: "video-processing",
          title: "Video Processing",
          lessons: [
            {
              lesson: "city-scale-video-analytics-system-design",
              title: "City Scale Video Analytics System Design",
              order: 2,
            },
            {
              lesson: "edge-vs-cloud-inference-trade-offs-for-video-ml",
              title: "Edge Vs Cloud Inference Trade Offs For Video Ml",
              order: 3,
            },
            {
              lesson: "failure-modes-in-production-video-ml-systems",
              title: "Failure Modes In Production Video Ml Systems",
              order: 4,
            },
            {
              lesson: "gpu-inference-scheduling-and-batching-strategies",
              title: "Gpu Inference Scheduling And Batching Strategies",
              order: 5,
            },
            {
              lesson: "real-time-video-processing-pipeline-architecture",
              title: "Real Time Video Processing Pipeline Architecture",
              order: 1,
            },
            {
              lesson:
                "temporal-downsampling-and-motion-gating-for-cost-efficiency",
              title:
                "Temporal Downsampling And Motion Gating For Cost Efficiency",
              order: 6,
            },
          ],
        },
      ],
    },
    {
      category: "ml-embeddings",
      title: "Embeddings",
      subsections: [
        {
          subsection: "approximate-nearest-neighbors",
          title: "Approximate Nearest Neighbors",
          lessons: [
            {
              lesson:
                "ann-failure-modes-data-drift-imbalanced-partitions-and-hardware-effects",
              title:
                "Ann Failure Modes Data Drift Imbalanced Partitions And Hardware Effects",
              order: 6,
            },
            {
              lesson: "faiss-ivf-pq-inverted-file-with-product-quantization",
              title: "Faiss Ivf Pq Inverted File With Product Quantization",
              order: 3,
            },
            {
              lesson: "hnsw-graph-based-proximity-search",
              title: "Hnsw Graph Based Proximity Search",
              order: 2,
            },
            {
              lesson:
                "scann-learning-based-quantization-for-maximum-inner-product-search",
              title:
                "Scann Learning Based Quantization For Maximum Inner Product Search",
              order: 5,
            },
            {
              lesson: "two-stage-retrieval-ann-candidate-generation-re-ranking",
              title: "Two Stage Retrieval Ann Candidate Generation Re Ranking",
              order: 4,
            },
            {
              lesson: "what-is-approximate-nearest-neighbor-ann-search",
              title: "What Is Approximate Nearest Neighbor Ann Search",
              order: 1,
            },
          ],
        },
        {
          subsection: "dimensionality-reduction",
          title: "Dimensionality Reduction",
          lessons: [
            {
              lesson:
                "advanced-patterns-pca-with-quantization-and-refresh-strategies",
              title:
                "Advanced Patterns Pca With Quantization And Refresh Strategies",
              order: 6,
            },
            {
              lesson: "pca-vs-umap-choosing-the-right-technique",
              title: "Pca Vs Umap Choosing The Right Technique",
              order: 4,
            },
            {
              lesson: "principal-component-analysis-pca-for-online-systems",
              title: "Principal Component Analysis Pca For Online Systems",
              order: 2,
            },
            {
              lesson: "production-implementation-and-failure-modes",
              title: "Production Implementation And Failure Modes",
              order: 5,
            },
            {
              lesson: "umap-for-offline-visualization-and-clustering",
              title: "Umap For Offline Visualization And Clustering",
              order: 3,
            },
            {
              lesson: "what-is-dimensionality-reduction-and-why-do-we-need-it",
              title: "What Is Dimensionality Reduction And Why Do We Need It",
              order: 1,
            },
          ],
        },
        {
          subsection: "embedding-generation",
          title: "Embedding Generation",
          lessons: [
            {
              lesson:
                "bert-vs-sentence-bert-token-context-vs-sentence-similarity",
              title:
                "Bert Vs Sentence Bert Token Context Vs Sentence Similarity",
              order: 2,
            },
            {
              lesson:
                "graph-embeddings-for-collaborative-and-structural-signals",
              title:
                "Graph Embeddings For Collaborative And Structural Signals",
              order: 3,
            },
            {
              lesson:
                "index-architecture-memory-quantization-and-approximate-search",
              title:
                "Index Architecture Memory Quantization And Approximate Search",
              order: 4,
            },
            {
              lesson:
                "production-failure-modes-drift-truncation-and-domain-mismatch",
              title:
                "Production Failure Modes Drift Truncation And Domain Mismatch",
              order: 5,
            },
            {
              lesson:
                "two-stage-retrieval-candidate-generation-and-re-ranking-at-scale",
              title:
                "Two Stage Retrieval Candidate Generation And Re Ranking At Scale",
              order: 6,
            },
            {
              lesson: "what-is-embedding-generation-and-why-it-matters",
              title: "What Is Embedding Generation And Why It Matters",
              order: 1,
            },
          ],
        },
        {
          subsection: "embedding-quality-evaluation",
          title: "Embedding Quality Evaluation",
          lessons: [
            {
              lesson: "dimensionality-and-quantization-trade-offs",
              title: "Dimensionality And Quantization Trade Offs",
              order: 4,
            },
            {
              lesson: "hubness-and-anisotropy-failure-modes",
              title: "Hubness And Anisotropy Failure Modes",
              order: 5,
            },
            {
              lesson: "intrinsic-vs-extrinsic-evaluation-trade-offs",
              title: "Intrinsic Vs Extrinsic Evaluation Trade Offs",
              order: 3,
            },
            {
              lesson: "mteb-and-beir-benchmark-evaluation",
              title: "Mteb And Beir Benchmark Evaluation",
              order: 2,
            },
            {
              lesson: "production-rollout-and-version-management",
              title: "Production Rollout And Version Management",
              order: 6,
            },
            {
              lesson: "what-is-embedding-quality-evaluation",
              title: "What Is Embedding Quality Evaluation",
              order: 1,
            },
          ],
        },
        {
          subsection: "hard-negative-mining",
          title: "Hard Negative Mining",
          lessons: [
            {
              lesson: "failure-modes-false-negatives-and-label-noise",
              title: "Failure Modes False Negatives And Label Noise",
              order: 4,
            },
            {
              lesson: "online-vs-offline-hard-negative-mining-architecture",
              title: "Online Vs Offline Hard Negative Mining Architecture",
              order: 3,
            },
            {
              lesson:
                "production-implementation-metrics-monitoring-and-serving-impact",
              title:
                "Production Implementation Metrics Monitoring And Serving Impact",
              order: 5,
            },
            {
              lesson: "triplet-loss-and-contrastive-loss-formulations",
              title: "Triplet Loss And Contrastive Loss Formulations",
              order: 2,
            },
            {
              lesson: "what-is-hard-negative-mining",
              title: "What Is Hard Negative Mining",
              order: 1,
            },
          ],
        },
        {
          subsection: "index-management",
          title: "Index Management",
          lessons: [
            {
              lesson: "failure-modes-encoder-mismatch-and-hot-shard-skew",
              title: "Failure Modes Encoder Mismatch And Hot Shard Skew",
              order: 5,
            },
            {
              lesson:
                "index-building-batch-construction-vs-incremental-updates",
              title: "Index Building Batch Construction Vs Incremental Updates",
              order: 2,
            },
            {
              lesson:
                "index-families-for-ml-systems-inverted-vs-vector-indexes",
              title: "Index Families For Ml Systems Inverted Vs Vector Indexes",
              order: 1,
            },
            {
              lesson: "sharding-vector-indexes-balancing-load-and-latency",
              title: "Sharding Vector Indexes Balancing Load And Latency",
              order: 3,
            },
            {
              lesson: "trade-offs-freshness-recall-latency-and-cost",
              title: "Trade Offs Freshness Recall Latency And Cost",
              order: 6,
            },
            {
              lesson: "update-strategies-deletes-tombstones-and-compaction",
              title: "Update Strategies Deletes Tombstones And Compaction",
              order: 4,
            },
          ],
        },
        {
          subsection: "realtime-embedding-updates",
          title: "Realtime Embedding Updates",
          lessons: [
            {
              lesson: "dynamic-vector-indexes-for-continuous-updates",
              title: "Dynamic Vector Indexes For Continuous Updates",
              order: 3,
            },
            {
              lesson: "hot-index-plus-main-index-architecture",
              title: "Hot Index Plus Main Index Architecture",
              order: 2,
            },
            {
              lesson: "index-drift-and-consistency-guarantees",
              title: "Index Drift And Consistency Guarantees",
              order: 4,
            },
            {
              lesson: "model-evolution-and-dual-indexing",
              title: "Model Evolution And Dual Indexing",
              order: 5,
            },
            {
              lesson: "operational-metrics-and-failure-detection",
              title: "Operational Metrics And Failure Detection",
              order: 6,
            },
            {
              lesson: "what-is-real-time-incremental-indexing",
              title: "What Is Real Time Incremental Indexing",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-feature-stores",
      title: "Feature Stores",
      subsections: [
        {
          subsection: "feature-backfilling",
          title: "Feature Backfilling",
          lessons: [
            {
              lesson: "backfill-cost-and-throughput-planning",
              title: "Backfill Cost And Throughput Planning",
              order: 2,
            },
            {
              lesson: "common-backfill-failure-modes-and-mitigations",
              title: "Common Backfill Failure Modes And Mitigations",
              order: 5,
            },
            {
              lesson: "idempotency-and-atomic-publication-patterns",
              title: "Idempotency And Atomic Publication Patterns",
              order: 4,
            },
            {
              lesson: "point-in-time-joins-and-slowly-changing-dimensions",
              title: "Point In Time Joins And Slowly Changing Dimensions",
              order: 3,
            },
            {
              lesson: "state-carryover-and-incremental-backfill-strategies",
              title: "State Carryover And Incremental Backfill Strategies",
              order: 6,
            },
            {
              lesson: "what-is-feature-backfilling-in-ml-systems",
              title: "What Is Feature Backfilling In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "feature-freshness",
          title: "Feature Freshness",
          lessons: [
            {
              lesson: "event-time-semantics-and-point-in-time-correctness",
              title: "Event Time Semantics And Point In Time Correctness",
              order: 2,
            },
            {
              lesson:
                "failure-modes-silent-staleness-and-training-serving-skew",
              title: "Failure Modes Silent Staleness And Training Serving Skew",
              order: 5,
            },
            {
              lesson:
                "hybrid-freshness-architecture-batch-nearline-and-request-time",
              title:
                "Hybrid Freshness Architecture Batch Nearline And Request Time",
              order: 3,
            },
            {
              lesson:
                "monitoring-freshness-and-handling-staleness-in-production",
              title:
                "Monitoring Freshness And Handling Staleness In Production",
              order: 4,
            },
            {
              lesson:
                "production-implementation-metadata-tiering-and-capacity-planning",
              title:
                "Production Implementation Metadata Tiering And Capacity Planning",
              order: 6,
            },
            {
              lesson: "what-is-feature-freshness-and-why-does-it-matter",
              title: "What Is Feature Freshness And Why Does It Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "feature-monitoring",
          title: "Feature Monitoring",
          lessons: [
            {
              lesson:
                "feature-monitoring-failure-modes-schema-changes-label-delays-and-feedback-loops",
              title:
                "Feature Monitoring Failure Modes Schema Changes Label Delays And Feedback Loops",
              order: 4,
            },
            {
              lesson:
                "static-vs-dynamic-baselines-choosing-your-reference-distribution",
              title:
                "Static Vs Dynamic Baselines Choosing Your Reference Distribution",
              order: 2,
            },
            {
              lesson:
                "streaming-vs-batch-monitoring-latency-cost-and-complexity-tradeoffs",
              title:
                "Streaming Vs Batch Monitoring Latency Cost And Complexity Tradeoffs",
              order: 3,
            },
            {
              lesson:
                "what-is-feature-monitoring-and-why-track-drift-missing-values-and-outliers",
              title:
                "What Is Feature Monitoring And Why Track Drift Missing Values And Outliers",
              order: 1,
            },
          ],
        },
        {
          subsection: "feature-sharing-discovery",
          title: "Feature Sharing Discovery",
          lessons: [
            {
              lesson: "feature-discovery-ranking-trust-and-quality-signals",
              title: "Feature Discovery Ranking Trust And Quality Signals",
              order: 2,
            },
            {
              lesson: "feature-sharing-discovery-the-dual-plane-architecture",
              title: "Feature Sharing Discovery The Dual Plane Architecture",
              order: 1,
            },
            {
              lesson: "feature-store-failure-modes-and-reliability-patterns",
              title: "Feature Store Failure Modes And Reliability Patterns",
              order: 6,
            },
            {
              lesson: "feature-store-trade-offs-when-not-to-centralize",
              title: "Feature Store Trade Offs When Not To Centralize",
              order: 5,
            },
            {
              lesson: "online-feature-serving-latency-budgets-and-scale",
              title: "Online Feature Serving Latency Budgets And Scale",
              order: 4,
            },
            {
              lesson: "training-serving-skew-the-silent-accuracy-killer",
              title: "Training Serving Skew The Silent Accuracy Killer",
              order: 3,
            },
          ],
        },
        {
          subsection: "feature-store-architecture",
          title: "Feature Store Architecture",
          lessons: [
            {
              lesson:
                "dual-store-architecture-offline-and-online-feature-stores",
              title:
                "Dual Store Architecture Offline And Online Feature Stores",
              order: 1,
            },
            {
              lesson:
                "feature-materialization-batch-streaming-and-request-time",
              title: "Feature Materialization Batch Streaming And Request Time",
              order: 3,
            },
            {
              lesson: "online-serving-architecture-and-latency-budgets",
              title: "Online Serving Architecture And Latency Budgets",
              order: 4,
            },
            {
              lesson: "platform-choices-feast-tecton-and-hopsworks",
              title: "Platform Choices Feast Tecton And Hopsworks",
              order: 6,
            },
            {
              lesson: "point-in-time-correctness-and-time-travel",
              title: "Point In Time Correctness And Time Travel",
              order: 2,
            },
            {
              lesson: "training-serving-skew-and-distribution-drift",
              title: "Training Serving Skew And Distribution Drift",
              order: 5,
            },
          ],
        },
        {
          subsection: "feature-transformation-pipelines",
          title: "Feature Transformation Pipelines",
          lessons: [
            {
              lesson:
                "choosing-streaming-vs-batch-latency-cost-and-operational-trade-offs",
              title:
                "Choosing Streaming Vs Batch Latency Cost And Operational Trade Offs",
              order: 5,
            },
            {
              lesson:
                "exactly-once-semantics-idempotency-checkpoints-and-sink-guarantees",
              title:
                "Exactly Once Semantics Idempotency Checkpoints And Sink Guarantees",
              order: 6,
            },
            {
              lesson:
                "feature-transformation-pipelines-streaming-vs-batch-architecture",
              title:
                "Feature Transformation Pipelines Streaming Vs Batch Architecture",
              order: 1,
            },
            {
              lesson:
                "production-failure-modes-backpressure-skew-and-state-explosion",
              title:
                "Production Failure Modes Backpressure Skew And State Explosion",
              order: 4,
            },
            {
              lesson: "stateful-streaming-keyed-state-management-and-windowing",
              title: "Stateful Streaming Keyed State Management And Windowing",
              order: 2,
            },
            {
              lesson:
                "training-serving-skew-achieving-feature-parity-across-pipelines",
              title:
                "Training Serving Skew Achieving Feature Parity Across Pipelines",
              order: 3,
            },
          ],
        },
        {
          subsection: "online-vs-offline-features",
          title: "Online Vs Offline Features",
          lessons: [
            {
              lesson: "freshness-vs-point-in-time-correctness",
              title: "Freshness Vs Point In Time Correctness",
              order: 3,
            },
            {
              lesson: "latency-vs-cost-trade-offs-in-feature-storage",
              title: "Latency Vs Cost Trade Offs In Feature Storage",
              order: 2,
            },
            {
              lesson: "online-vs-offline-features-core-distinction",
              title: "Online Vs Offline Features Core Distinction",
              order: 1,
            },
            {
              lesson: "operational-failure-modes-in-production-feature-stores",
              title: "Operational Failure Modes In Production Feature Stores",
              order: 6,
            },
            {
              lesson: "tail-latency-management-and-query-fanout",
              title: "Tail Latency Management And Query Fanout",
              order: 5,
            },
            {
              lesson: "training-serving-skew-root-causes-and-mitigation",
              title: "Training Serving Skew Root Causes And Mitigation",
              order: 4,
            },
          ],
        },
        {
          subsection: "point-in-time-correctness",
          title: "Point In Time Correctness",
          lessons: [
            {
              lesson: "implementing-temporal-as-of-joins-for-pit-correctness",
              title: "Implementing Temporal As Of Joins For Pit Correctness",
              order: 2,
            },
            {
              lesson: "pit-correctness-failure-modes-and-edge-cases",
              title: "Pit Correctness Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson: "time-travel-storage-patterns-for-feature-versioning",
              title: "Time Travel Storage Patterns For Feature Versioning",
              order: 3,
            },
            {
              lesson: "trading-off-storage-cost-freshness-and-pit-guarantees",
              title: "Trading Off Storage Cost Freshness And Pit Guarantees",
              order: 6,
            },
            {
              lesson: "train-serve-skew-from-pit-violations",
              title: "Train Serve Skew From Pit Violations",
              order: 4,
            },
            {
              lesson: "what-is-point-in-time-pit-correctness-in-ml-systems",
              title: "What Is Point In Time Pit Correctness In Ml Systems",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-fraud-detection",
      title: "Fraud Detection",
      subsections: [
        {
          subsection: "adversarial-robustness",
          title: "Adversarial Robustness",
          lessons: [
            {
              lesson:
                "adversarial-training-the-core-defense-with-real-cost-trade-offs",
              title:
                "Adversarial Training The Core Defense With Real Cost Trade Offs",
              order: 2,
            },
            {
              lesson:
                "failure-modes-when-adversarial-defenses-break-in-production",
              title:
                "Failure Modes When Adversarial Defenses Break In Production",
              order: 4,
            },
            {
              lesson:
                "implementation-blueprint-building-layered-adversarial-defense-systems",
              title:
                "Implementation Blueprint Building Layered Adversarial Defense Systems",
              order: 5,
            },
            {
              lesson:
                "production-architecture-fast-path-vs-slow-path-for-adversarial-defense",
              title:
                "Production Architecture Fast Path Vs Slow Path For Adversarial Defense",
              order: 3,
            },
            {
              lesson:
                "real-world-trade-offs-when-to-use-adversarial-defenses-vs-alternatives",
              title:
                "Real World Trade Offs When To Use Adversarial Defenses Vs Alternatives",
              order: 6,
            },
            {
              lesson:
                "what-is-adversarial-robustness-in-fraud-detection-systems",
              title:
                "What Is Adversarial Robustness In Fraud Detection Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "fraud-feature-engineering",
          title: "Fraud Feature Engineering",
          lessons: [
            {
              lesson: "aggregations-over-windows-summarizing-temporal-behavior",
              title: "Aggregations Over Windows Summarizing Temporal Behavior",
              order: 2,
            },
            {
              lesson:
                "failure-modes-label-leakage-skew-and-adversarial-evasion",
              title: "Failure Modes Label Leakage Skew And Adversarial Evasion",
              order: 5,
            },
            {
              lesson: "online-and-offline-feature-computation-architecture",
              title: "Online And Offline Feature Computation Architecture",
              order: 4,
            },
            {
              lesson:
                "temporal-patterns-capturing-seasonality-and-time-based-signals",
              title:
                "Temporal Patterns Capturing Seasonality And Time Based Signals",
              order: 1,
            },
            {
              lesson: "trade-offs-window-size-exactness-and-feature-breadth",
              title: "Trade Offs Window Size Exactness And Feature Breadth",
              order: 6,
            },
            {
              lesson: "velocity-features-measuring-rate-and-acceleration",
              title: "Velocity Features Measuring Rate And Acceleration",
              order: 3,
            },
          ],
        },
        {
          subsection: "graph-fraud-detection",
          title: "Graph Fraud Detection",
          lessons: [
            {
              lesson:
                "failure-modes-and-adversarial-robustness-in-graph-fraud-detection",
              title:
                "Failure Modes And Adversarial Robustness In Graph Fraud Detection",
              order: 4,
            },
            {
              lesson: "how-graph-neural-networks-learn-fraud-patterns",
              title: "How Graph Neural Networks Learn Fraud Patterns",
              order: 2,
            },
            {
              lesson:
                "implementation-details-sampling-caching-and-ensemble-fusion",
              title:
                "Implementation Details Sampling Caching And Ensemble Fusion",
              order: 5,
            },
            {
              lesson:
                "production-serving-architecture-latency-and-scale-trade-offs",
              title:
                "Production Serving Architecture Latency And Scale Trade Offs",
              order: 3,
            },
            {
              lesson: "why-fraud-detection-needs-graph-based-models",
              title: "Why Fraud Detection Needs Graph Based Models",
              order: 1,
            },
          ],
        },
        {
          subsection: "imbalanced-data-handling",
          title: "Imbalanced Data Handling",
          lessons: [
            {
              lesson:
                "class-weighting-and-focal-loss-reweighting-the-loss-function",
              title:
                "Class Weighting And Focal Loss Reweighting The Loss Function",
              order: 3,
            },
            {
              lesson:
                "end-to-end-production-architecture-for-imbalanced-data-systems",
              title:
                "End To End Production Architecture For Imbalanced Data Systems",
              order: 6,
            },
            {
              lesson:
                "failure-modes-and-edge-cases-in-imbalanced-data-handling",
              title: "Failure Modes And Edge Cases In Imbalanced Data Handling",
              order: 5,
            },
            {
              lesson: "production-trade-offs-when-to-use-each-technique",
              title: "Production Trade Offs When To Use Each Technique",
              order: 4,
            },
            {
              lesson: "smote-synthetic-minority-oversampling-technique",
              title: "Smote Synthetic Minority Oversampling Technique",
              order: 2,
            },
            {
              lesson: "why-imbalanced-data-breaks-standard-machine-learning",
              title: "Why Imbalanced Data Breaks Standard Machine Learning",
              order: 1,
            },
          ],
        },
        {
          subsection: "realtime-fraud-scoring",
          title: "Realtime Fraud Scoring",
          lessons: [
            {
              lesson:
                "accuracy-vs-latency-trade-offs-model-cascades-and-dynamic-batching",
              title:
                "Accuracy Vs Latency Trade Offs Model Cascades And Dynamic Batching",
              order: 3,
            },
            {
              lesson:
                "deployment-observability-and-capacity-planning-for-production-ml-serving",
              title:
                "Deployment Observability And Capacity Planning For Production Ml Serving",
              order: 6,
            },
            {
              lesson: "online-feature-store-architecture-for-sub-10ms-reads",
              title: "Online Feature Store Architecture For Sub 10ms Reads",
              order: 5,
            },
            {
              lesson:
                "tail-latency-amplification-and-cascading-failures-in-real-time-systems",
              title:
                "Tail Latency Amplification And Cascading Failures In Real Time Systems",
              order: 4,
            },
            {
              lesson: "the-complete-real-time-scoring-flow-for-fraud-detection",
              title: "The Complete Real Time Scoring Flow For Fraud Detection",
              order: 2,
            },
            {
              lesson: "what-is-real-time-scoring-and-why-is-latency-critical",
              title: "What Is Real Time Scoring And Why Is Latency Critical",
              order: 1,
            },
          ],
        },
        {
          subsection: "supervised-anomaly-detection",
          title: "Supervised Anomaly Detection",
          lessons: [
            {
              lesson:
                "failure-modes-concept-drift-adversarial-attacks-and-cold-start",
              title:
                "Failure Modes Concept Drift Adversarial Attacks And Cold Start",
              order: 6,
            },
            {
              lesson:
                "label-delay-and-feedback-loops-the-hidden-challenges-of-fraud-detection",
              title:
                "Label Delay And Feedback Loops The Hidden Challenges Of Fraud Detection",
              order: 4,
            },
            {
              lesson:
                "production-architecture-online-scoring-feature-freshness-and-latency-budgets",
              title:
                "Production Architecture Online Scoring Feature Freshness And Latency Budgets",
              order: 3,
            },
            {
              lesson:
                "supervised-anomaly-detection-why-accuracy-is-misleading-in-imbalanced-classification",
              title:
                "Supervised Anomaly Detection Why Accuracy Is Misleading In Imbalanced Classification",
              order: 1,
            },
            {
              lesson: "threshold-tuning-and-cost-sensitive-decision-making",
              title: "Threshold Tuning And Cost Sensitive Decision Making",
              order: 5,
            },
            {
              lesson:
                "training-strategies-for-extreme-class-imbalance-resampling-vs-weighting",
              title:
                "Training Strategies For Extreme Class Imbalance Resampling Vs Weighting",
              order: 2,
            },
          ],
        },
        {
          subsection: "unsupervised-anomaly-detection",
          title: "Unsupervised Anomaly Detection",
          lessons: [
            {
              lesson: "failure-modes-and-edge-cases-in-production",
              title: "Failure Modes And Edge Cases In Production",
              order: 5,
            },
            {
              lesson: "how-do-autoencoders-detect-anomalies",
              title: "How Do Autoencoders Detect Anomalies",
              order: 3,
            },
            {
              lesson: "how-does-isolation-forest-work",
              title: "How Does Isolation Forest Work",
              order: 2,
            },
            {
              lesson: "implementation-patterns-and-production-architecture",
              title: "Implementation Patterns And Production Architecture",
              order: 6,
            },
            {
              lesson: "trade-offs-isolation-forest-vs-autoencoders",
              title: "Trade Offs Isolation Forest Vs Autoencoders",
              order: 4,
            },
            {
              lesson: "what-is-unsupervised-anomaly-detection",
              title: "What Is Unsupervised Anomaly Detection",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-infrastructure-mlops",
      title: "Infrastructure MLops",
      subsections: [
        {
          subsection: "automated-rollback",
          title: "Automated Rollback",
          lessons: [
            {
              lesson: "canary-analysis-vs-blue-green-vs-rolling-updates",
              title: "Canary Analysis Vs Blue Green Vs Rolling Updates",
              order: 2,
            },
            {
              lesson: "canary-failure-modes-and-mitigation-strategies",
              title: "Canary Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson: "implementing-the-canary-control-loop",
              title: "Implementing The Canary Control Loop",
              order: 6,
            },
            {
              lesson: "ml-specific-guardrails-and-metrics-in-canary-analysis",
              title: "Ml Specific Guardrails And Metrics In Canary Analysis",
              order: 3,
            },
            {
              lesson: "traffic-routing-and-shadow-mode-for-ml-canaries",
              title: "Traffic Routing And Shadow Mode For Ml Canaries",
              order: 4,
            },
            {
              lesson: "what-is-automated-canary-analysis",
              title: "What Is Automated Canary Analysis",
              order: 1,
            },
          ],
        },
        {
          subsection: "ci-cd-ml",
          title: "CI/CD for ML",
          lessons: [
            {
              lesson: "data-drift-detection-and-automated-retraining",
              title: "Data Drift Detection And Automated Retraining",
              order: 5,
            },
            {
              lesson: "failure-modes-in-ml-cicd-pipelines",
              title: "Failure Modes In Ml Cicd Pipelines",
              order: 6,
            },
            {
              lesson: "model-registry-and-lineage-capture",
              title: "Model Registry And Lineage Capture",
              order: 2,
            },
            {
              lesson: "shadow-and-canary-deployment-for-models",
              title: "Shadow And Canary Deployment For Models",
              order: 3,
            },
            {
              lesson: "training-serving-skew-and-environment-parity",
              title: "Training Serving Skew And Environment Parity",
              order: 4,
            },
            {
              lesson: "what-is-cicd-for-ml-and-why-its-different",
              title: "What Is Cicd For Ml And Why Its Different",
              order: 1,
            },
          ],
        },
        {
          subsection: "feature-store-integration",
          title: "Feature Store Integration",
          lessons: [
            {
              lesson: "failure-modes-hot-keys-late-events-and-schema-drift",
              title: "Failure Modes Hot Keys Late Events And Schema Drift",
              order: 6,
            },
            {
              lesson: "feature-store-the-contract-between-data-and-models",
              title: "Feature Store The Contract Between Data And Models",
              order: 1,
            },
            {
              lesson:
                "freshness-vs-latency-streaming-materialization-trade-offs",
              title:
                "Freshness Vs Latency Streaming Materialization Trade Offs",
              order: 4,
            },
            {
              lesson: "offline-and-online-storage-architecture-and-trade-offs",
              title: "Offline And Online Storage Architecture And Trade Offs",
              order: 2,
            },
            {
              lesson: "serving-flow-assembly-latency-budgets-and-caching",
              title: "Serving Flow Assembly Latency Budgets And Caching",
              order: 3,
            },
            {
              lesson: "training-serving-skew-root-causes-and-mitigation",
              title: "Training Serving Skew Root Causes And Mitigation",
              order: 5,
            },
          ],
        },
        {
          subsection: "ml-cost-optimization",
          title: "Ml Cost Optimization",
          lessons: [
            {
              lesson: "autoscaling-architecture-matching-capacity-to-demand",
              title: "Autoscaling Architecture Matching Capacity To Demand",
              order: 2,
            },
            {
              lesson:
                "checkpointing-and-fault-tolerance-for-interruptible-workloads",
              title:
                "Checkpointing And Fault Tolerance For Interruptible Workloads",
              order: 4,
            },
            {
              lesson:
                "failure-modes-capacity-crunches-interruption-storms-and-cost-spikes",
              title:
                "Failure Modes Capacity Crunches Interruption Storms And Cost Spikes",
              order: 6,
            },
            {
              lesson:
                "production-pattern-baseline-on-demand-plus-spot-burst-capacity",
              title:
                "Production Pattern Baseline On Demand Plus Spot Burst Capacity",
              order: 5,
            },
            {
              lesson:
                "spot-fleet-diversification-reducing-correlated-interruptions",
              title:
                "Spot Fleet Diversification Reducing Correlated Interruptions",
              order: 3,
            },
            {
              lesson:
                "what-are-spot-instances-and-why-use-them-for-ml-workloads",
              title:
                "What Are Spot Instances And Why Use Them For Ml Workloads",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-governance",
          title: "Model Governance",
          lessons: [
            {
              lesson:
                "continuous-monitoring-for-drift-bias-and-policy-violations",
              title:
                "Continuous Monitoring For Drift Bias And Policy Violations",
              order: 4,
            },
            {
              lesson: "governance-for-large-language-models-and-generative-ai",
              title: "Governance For Large Language Models And Generative Ai",
              order: 6,
            },
            {
              lesson: "governance-trade-offs-and-failure-modes-in-production",
              title: "Governance Trade Offs And Failure Modes In Production",
              order: 5,
            },
            {
              lesson: "immutable-artifacts-and-data-lineage-graphs",
              title: "Immutable Artifacts And Data Lineage Graphs",
              order: 3,
            },
            {
              lesson: "prediction-journal-pattern-for-audit-trails",
              title: "Prediction Journal Pattern For Audit Trails",
              order: 2,
            },
            {
              lesson: "what-is-model-governance-in-ml-systems",
              title: "What Is Model Governance In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-packaging",
          title: "Model Packaging",
          lessons: [
            {
              lesson:
                "building-lean-inference-containers-multi-stage-builds-and-optimization-patterns",
              title:
                "Building Lean Inference Containers Multi Stage Builds And Optimization Patterns",
              order: 6,
            },
            {
              lesson:
                "docker-containers-for-model-serving-building-lean-inference-images",
              title:
                "Docker Containers For Model Serving Building Lean Inference Images",
              order: 3,
            },
            {
              lesson:
                "model-packaging-failure-modes-conversion-pitfalls-and-production-gotchas",
              title:
                "Model Packaging Failure Modes Conversion Pitfalls And Production Gotchas",
              order: 5,
            },
            {
              lesson: "onnx-vs-savedmodel-choosing-your-serialization-format",
              title: "Onnx Vs Savedmodel Choosing Your Serialization Format",
              order: 2,
            },
            {
              lesson:
                "production-model-serving-pipeline-from-training-to-inference-at-scale",
              title:
                "Production Model Serving Pipeline From Training To Inference At Scale",
              order: 4,
            },
            {
              lesson: "what-is-model-packaging-and-why-does-it-matter",
              title: "What Is Model Packaging And Why Does It Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-registry",
          title: "Model Registry",
          lessons: [
            {
              lesson: "model-registry-automation-cicd",
              title: "Model Registry Automation Cicd",
              order: 6,
            },
            {
              lesson: "model-registry-core-entities-and-immutability-design",
              title: "Model Registry Core Entities And Immutability Design",
              order: 2,
            },
            {
              lesson: "model-registry-failure-modes-and-mitigation-strategies",
              title: "Model Registry Failure Modes And Mitigation Strategies",
              order: 4,
            },
            {
              lesson: "model-versioning-lineage-tracking",
              title: "Model Versioning Lineage Tracking",
              order: 5,
            },
            {
              lesson:
                "production-model-registry-architecture-and-scale-requirements",
              title:
                "Production Model Registry Architecture And Scale Requirements",
              order: 3,
            },
            {
              lesson: "what-is-a-model-registry-and-why-production-ml-needs-it",
              title: "What Is A Model Registry And Why Production Ml Needs It",
              order: 1,
            },
          ],
        },
        {
          subsection: "resource-orchestration",
          title: "Resource Orchestration",
          lessons: [
            {
              lesson:
                "building-production-gpu-orchestration-discovery-scheduling-extensions-and-reliability-operations",
              title:
                "Building Production Gpu Orchestration Discovery Scheduling Extensions And Reliability Operations",
              order: 6,
            },
            {
              lesson:
                "failure-modes-in-gpu-orchestration-fragmentation-deadlock-and-health-drift",
              title:
                "Failure Modes In Gpu Orchestration Fragmentation Deadlock And Health Drift",
              order: 5,
            },
            {
              lesson:
                "gpu-partitioning-patterns-whole-device-vs-time-slicing-vs-hardware-partitioning",
              title:
                "Gpu Partitioning Patterns Whole Device Vs Time Slicing Vs Hardware Partitioning",
              order: 2,
            },
            {
              lesson:
                "production-ml-inference-on-kubernetes-with-autoscaling-and-model-locality",
              title:
                "Production Ml Inference On Kubernetes With Autoscaling And Model Locality",
              order: 4,
            },
            {
              lesson:
                "topology-aware-scheduling-and-gang-scheduling-for-distributed-training",
              title:
                "Topology Aware Scheduling And Gang Scheduling For Distributed Training",
              order: 3,
            },
            {
              lesson: "what-is-gpu-resource-orchestration-in-ml-clusters",
              title: "What Is Gpu Resource Orchestration In Ml Clusters",
              order: 1,
            },
          ],
        },
        {
          subsection: "shadow-mode-deployment",
          title: "Shadow Mode Deployment",
          lessons: [
            {
              lesson:
                "implementing-shadow-mode-mirroring-isolation-and-promotion-criteria",
              title:
                "Implementing Shadow Mode Mirroring Isolation And Promotion Criteria",
              order: 5,
            },
            {
              lesson: "shadow-mode-architecture-and-traffic-flow",
              title: "Shadow Mode Architecture And Traffic Flow",
              order: 2,
            },
            {
              lesson: "shadow-mode-failure-modes-and-edge-cases",
              title: "Shadow Mode Failure Modes And Edge Cases",
              order: 4,
            },
            {
              lesson: "shadow-mode-monitoring-promotion",
              title: "Shadow Mode Monitoring Promotion",
              order: 6,
            },
            {
              lesson: "shadow-mode-trade-offs-cost-vs-risk-reduction",
              title: "Shadow Mode Trade Offs Cost Vs Risk Reduction",
              order: 3,
            },
            {
              lesson: "what-is-shadow-mode-deployment-in-ml-systems",
              title: "What Is Shadow Mode Deployment In Ml Systems",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-llm-genai",
      title: "LLM GenAI",
      subsections: [
        {
          subsection: "agent-systems-tool-use",
          title: "Agent Systems Tool Use",
          lessons: [
            {
              lesson: "agent-system-architecture-execution-flow",
              title: "Agent System Architecture Execution Flow",
              order: 2,
            },
            {
              lesson: "failure-modes-and-safety-in-agent-systems",
              title: "Failure Modes And Safety In Agent Systems",
              order: 5,
            },
            {
              lesson: "production-implementation-and-llmops",
              title: "Production Implementation And Llmops",
              order: 6,
            },
            {
              lesson: "single-step-vs-multi-step-agent-patterns",
              title: "Single Step Vs Multi Step Agent Patterns",
              order: 3,
            },
            {
              lesson:
                "trade-offs-llm-centric-planning-vs-backend-orchestration",
              title: "Trade Offs LLM Centric Planning Vs Backend Orchestration",
              order: 4,
            },
            {
              lesson: "what-are-agent-systems-tool-use",
              title: "What Are Agent Systems Tool Use",
              order: 1,
            },
          ],
        },
        {
          subsection: "chunking-strategies",
          title: "Chunking Strategies",
          lessons: [
            {
              lesson: "advanced-hierarchical-retrieval-and-multi-stage-context",
              title: "Advanced Hierarchical Retrieval And Multi Stage Context",
              order: 6,
            },
            {
              lesson: "chunking-strategies-fixed-vs-semantic",
              title: "Chunking Strategies Fixed Vs Semantic",
              order: 2,
            },
            {
              lesson: "chunking-trade-offs-when-to-choose-what",
              title: "Chunking Trade Offs When To Choose What",
              order: 4,
            },
            {
              lesson: "context-window-management-at-scale",
              title: "Context Window Management At Scale",
              order: 3,
            },
            {
              lesson: "failure-modes-when-chunking-breaks",
              title: "Failure Modes When Chunking Breaks",
              order: 5,
            },
            {
              lesson: "what-is-chunking-in-llm-systems",
              title: "What Is Chunking In LLM Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "llm-caching-optimization",
          title: "LLM Caching Optimization",
          lessons: [
            {
              lesson: "cost-optimization-trade-offs-caching-vs-model-routing",
              title: "Cost Optimization Trade Offs Caching Vs Model Routing",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-llm-caching",
              title: "Failure Modes And Edge Cases In LLM Caching",
              order: 5,
            },
            {
              lesson: "production-scale-caching-implementation",
              title: "Production Scale Caching Implementation",
              order: 3,
            },
            {
              lesson: "three-layers-of-llm-caching",
              title: "Three Layers Of LLM Caching",
              order: 2,
            },
            {
              lesson: "what-is-llm-caching-and-why-does-it-matter",
              title: "What Is LLM Caching And Why Does It Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "llm-evaluation-benchmarking",
          title: "LLM Evaluation Benchmarking",
          lessons: [
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson: "red-teaming-in-production-human-vs-automated-approaches",
              title: "Red Teaming In Production Human Vs Automated Approaches",
              order: 3,
            },
            {
              lesson: "scoring-systems-judge-models-vs-human-evaluation",
              title: "Scoring Systems Judge Models Vs Human Evaluation",
              order: 6,
            },
            {
              lesson: "the-evaluation-pipeline-architecture",
              title: "The Evaluation Pipeline Architecture",
              order: 2,
            },
            {
              lesson: "trade-offs-helpfulness-vs-harmlessness",
              title: "Trade Offs Helpfulness Vs Harmlessness",
              order: 4,
            },
            {
              lesson: "what-is-llm-evaluation-red-teaming",
              title: "What Is LLM Evaluation Red Teaming",
              order: 1,
            },
          ],
        },
        {
          subsection: "llm-fine-tuning",
          title: "LLM Fine Tuning",
          lessons: [
            {
              lesson: "failure-modes-and-edge-cases-in-peft-systems",
              title: "Failure Modes And Edge Cases In Peft Systems",
              order: 5,
            },
            {
              lesson: "how-lora-works-low-rank-adaptation-mechanics",
              title: "How Lora Works Low Rank Adaptation Mechanics",
              order: 2,
            },
            {
              lesson: "qlora-quantized-low-rank-adaptation-at-extreme-scale",
              title: "Qlora Quantized Low Rank Adaptation At Extreme Scale",
              order: 3,
            },
            {
              lesson: "trade-offs-full-fine-tuning-vs-lora-vs-qlora",
              title: "Trade Offs Full Fine Tuning Vs Lora Vs Qlora",
              order: 4,
            },
            {
              lesson: "what-is-parameter-efficient-fine-tuning-peft",
              title: "What Is Parameter Efficient Fine Tuning Peft",
              order: 1,
            },
          ],
        },
        {
          subsection: "llm-guardrails-safety",
          title: "LLM Guardrails Safety",
          lessons: [
            {
              lesson: "guardrail-design-trade-offs",
              title: "Guardrail Design Trade Offs",
              order: 4,
            },
            {
              lesson: "guardrail-failure-modes-edge-cases",
              title: "Guardrail Failure Modes Edge Cases",
              order: 5,
            },
            {
              lesson: "how-llm-guardrail-pipelines-work",
              title: "How LLM Guardrail Pipelines Work",
              order: 2,
            },
            {
              lesson: "production-scale-guardrail-systems",
              title: "Production Scale Guardrail Systems",
              order: 3,
            },
            {
              lesson: "what-are-llm-guardrails-safety-systems",
              title: "What Are LLM Guardrails Safety Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "multimodal-systems",
          title: "Multimodal Systems",
          lessons: [
            {
              lesson: "long-context-vlms-handling-documents-and-extended-video",
              title: "Long Context Vlms Handling Documents And Extended Video",
              order: 6,
            },
            {
              lesson: "production-vlm-systems-routing-and-scale",
              title: "Production Vlm Systems Routing And Scale",
              order: 3,
            },
            {
              lesson:
                "vlm-architecture-trade-offs-when-to-specialize-vs-generalize",
              title:
                "Vlm Architecture Trade Offs When To Specialize Vs Generalize",
              order: 4,
            },
            {
              lesson: "vlm-failure-modes-and-edge-cases-at-scale",
              title: "Vlm Failure Modes And Edge Cases At Scale",
              order: 5,
            },
            {
              lesson: "vlm-processing-pipeline-from-pixels-to-tokens",
              title: "Vlm Processing Pipeline From Pixels To Tokens",
              order: 2,
            },
            {
              lesson: "what-are-multimodal-vision-language-models",
              title: "What Are Multimodal Vision Language Models",
              order: 1,
            },
          ],
        },
        {
          subsection: "rag-architecture",
          title: "Rag Architecture",
          lessons: [
            {
              lesson: "rag-failure-modes-and-production-challenges",
              title: "Rag Failure Modes And Production Challenges",
              order: 4,
            },
            {
              lesson: "rag-system-architecture-and-data-flow",
              title: "Rag System Architecture And Data Flow",
              order: 2,
            },
            {
              lesson: "rag-vs-alternatives-when-to-choose-what",
              title: "Rag Vs Alternatives When To Choose What",
              order: 3,
            },
            {
              lesson: "scaling-rag-to-production-architecture-patterns",
              title: "Scaling Rag To Production Architecture Patterns",
              order: 5,
            },
            {
              lesson: "what-is-rag-retrieval-augmented-generation",
              title: "What Is Rag Retrieval Augmented Generation",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-model-optimization",
      title: "Model Optimization",
      subsections: [
        {
          subsection: "batch-throughput-tuning",
          title: "Batch Throughput Tuning",
          lessons: [
            {
              lesson: "batching-failure-modes-and-mitigation-strategies",
              title: "Batching Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson:
                "batching-in-data-pipelines-producer-and-consumer-patterns",
              title:
                "Batching In Data Pipelines Producer And Consumer Patterns",
              order: 4,
            },
            {
              lesson: "dynamic-batching-for-low-latency-gpu-inference",
              title: "Dynamic Batching For Low Latency Gpu Inference",
              order: 2,
            },
            {
              lesson: "monitoring-and-adaptive-control-for-batching-systems",
              title: "Monitoring And Adaptive Control For Batching Systems",
              order: 6,
            },
            {
              lesson:
                "training-batch-size-memory-convergence-and-throughput-trade-offs",
              title:
                "Training Batch Size Memory Convergence And Throughput Trade Offs",
              order: 3,
            },
            {
              lesson: "what-is-batching-and-why-does-it-improve-throughput",
              title: "What Is Batching And Why Does It Improve Throughput",
              order: 1,
            },
          ],
        },
        {
          subsection: "hardware-aware-optimization",
          title: "Hardware Aware Optimization",
          lessons: [
            {
              lesson: "critical-failure-modes-in-hardware-aware-optimization",
              title: "Critical Failure Modes In Hardware Aware Optimization",
              order: 4,
            },
            {
              lesson: "four-core-patterns-of-hardware-aware-optimization",
              title: "Four Core Patterns Of Hardware Aware Optimization",
              order: 2,
            },
            {
              lesson:
                "implementing-hardware-aware-optimization-a-systematic-pipeline",
              title:
                "Implementing Hardware Aware Optimization A Systematic Pipeline",
              order: 5,
            },
            {
              lesson:
                "production-hardware-aware-optimization-edge-vs-cloud-trade-offs",
              title:
                "Production Hardware Aware Optimization Edge Vs Cloud Trade Offs",
              order: 3,
            },
            {
              lesson: "what-is-hardware-aware-optimization-in-ml",
              title: "What Is Hardware Aware Optimization In Ml",
              order: 1,
            },
          ],
        },
        {
          subsection: "knowledge-distillation",
          title: "Knowledge Distillation",
          lessons: [
            {
              lesson:
                "failure-modes-capacity-mismatch-bias-amplification-and-distribution-drift",
              title:
                "Failure Modes Capacity Mismatch Bias Amplification And Distribution Drift",
              order: 5,
            },
            {
              lesson:
                "production-deployment-from-training-cost-to-serving-savings",
              title:
                "Production Deployment From Training Cost To Serving Savings",
              order: 3,
            },
            {
              lesson:
                "three-transfer-granularities-response-feature-and-relation-based-distillation",
              title:
                "Three Transfer Granularities Response Feature And Relation Based Distillation",
              order: 2,
            },
            {
              lesson:
                "training-recipe-loss-functions-temperature-and-data-pipelines",
              title:
                "Training Recipe Loss Functions Temperature And Data Pipelines",
              order: 4,
            },
            {
              lesson:
                "validation-and-monitoring-beyond-accuracy-to-calibration-and-drift",
              title:
                "Validation And Monitoring Beyond Accuracy To Calibration And Drift",
              order: 6,
            },
            {
              lesson: "what-is-knowledge-distillation",
              title: "What Is Knowledge Distillation",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-compilation",
          title: "Model Compilation",
          lessons: [
            {
              lesson: "onnx-the-universal-intermediate-format",
              title: "Onnx The Universal Intermediate Format",
              order: 2,
            },
            {
              lesson: "precision-tradeoffs-fp32-vs-fp16-vs-int8",
              title: "Precision Tradeoffs Fp32 Vs Fp16 Vs Int8",
              order: 5,
            },
            {
              lesson: "production-compilation-pipeline-and-failure-modes",
              title: "Production Compilation Pipeline And Failure Modes",
              order: 6,
            },
            {
              lesson: "tensorrt-nvidia-gpu-specific-optimization",
              title: "Tensorrt Nvidia Gpu Specific Optimization",
              order: 3,
            },
            {
              lesson: "tvm-cross-platform-ml-compiler",
              title: "Tvm Cross Platform Ml Compiler",
              order: 4,
            },
            {
              lesson: "what-is-model-compilation-and-why-does-it-matter",
              title: "What Is Model Compilation And Why Does It Matter",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-pruning",
          title: "Model Pruning",
          lessons: [
            {
              lesson: "critical-tradeoffs-when-to-choose-each-pruning-style",
              title: "Critical Tradeoffs When To Choose Each Pruning Style",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-production-pruning",
              title: "Failure Modes And Edge Cases In Production Pruning",
              order: 5,
            },
            {
              lesson: "hardware-efficiency-and-speedup-characteristics",
              title: "Hardware Efficiency And Speedup Characteristics",
              order: 2,
            },
            {
              lesson:
                "production-implementation-iterative-pruning-and-fine-tuning",
              title:
                "Production Implementation Iterative Pruning And Fine Tuning",
              order: 3,
            },
            {
              lesson: "pruning-tooling-and-practical-workflow",
              title: "Pruning Tooling And Practical Workflow",
              order: 6,
            },
            {
              lesson: "structured-vs-unstructured-pruning-core-differences",
              title: "Structured Vs Unstructured Pruning Core Differences",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-quantization",
          title: "Model Quantization",
          lessons: [
            {
              lesson: "choosing-quantization-strategy-decision-framework",
              title: "Choosing Quantization Strategy Decision Framework",
              order: 6,
            },
            {
              lesson:
                "mixed-precision-training-fp16-bf16-and-fp32-accumulation",
              title: "Mixed Precision Training Fp16 Bf16 And Fp32 Accumulation",
              order: 3,
            },
            {
              lesson:
                "post-training-quantization-vs-quantization-aware-training",
              title:
                "Post Training Quantization Vs Quantization Aware Training",
              order: 2,
            },
            {
              lesson: "quantization-failure-modes-and-mitigation-strategies",
              title: "Quantization Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson: "weight-only-quantization-for-large-language-models",
              title: "Weight Only Quantization For Large Language Models",
              order: 4,
            },
            {
              lesson: "what-is-model-quantization",
              title: "What Is Model Quantization",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-result-caching",
          title: "Model Result Caching",
          lessons: [
            {
              lesson:
                "cache-key-design-and-canonicalization-for-high-hit-rates",
              title: "Cache Key Design And Canonicalization For High Hit Rates",
              order: 3,
            },
            {
              lesson: "cost-savings-and-observability-measuring-cache-impact",
              title: "Cost Savings And Observability Measuring Cache Impact",
              order: 6,
            },
            {
              lesson: "embedding-cache-reducing-repeated-vector-computation",
              title: "Embedding Cache Reducing Repeated Vector Computation",
              order: 4,
            },
            {
              lesson:
                "failure-modes-cache-stampede-embedding-drift-and-false-positives",
              title:
                "Failure Modes Cache Stampede Embedding Drift And False Positives",
              order: 5,
            },
            {
              lesson:
                "semantic-result-cache-architecture-and-similarity-thresholds",
              title:
                "Semantic Result Cache Architecture And Similarity Thresholds",
              order: 2,
            },
            {
              lesson: "three-layers-of-model-caching-kv-embedding-and-result",
              title: "Three Layers Of Model Caching KV Embedding And Result",
              order: 1,
            },
          ],
        },
        {
          subsection: "neural-architecture-search",
          title: "Neural Architecture Search",
          lessons: [
            {
              lesson: "device-aware-latency-modeling-for-nas",
              title: "Device Aware Latency Modeling For Nas",
              order: 3,
            },
            {
              lesson: "multi-fidelity-evaluation-strategy-in-nas",
              title: "Multi Fidelity Evaluation Strategy In Nas",
              order: 2,
            },
            {
              lesson: "nas-failure-modes-and-production-mitigations",
              title: "Nas Failure Modes And Production Mitigations",
              order: 4,
            },
            {
              lesson: "what-is-neural-architecture-search-nas",
              title: "What Is Neural Architecture Search Nas",
              order: 1,
            },
            {
              lesson: "when-to-use-nas-vs-manual-architecture-design",
              title: "When To Use Nas Vs Manual Architecture Design",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "ml-model-serving",
      title: "Model Serving",
      subsections: [
        {
          subsection: "autoscaling-gpu-sharing",
          title: "Autoscaling Gpu Sharing",
          lessons: [
            {
              lesson:
                "cold-start-problem-model-loading-and-predictive-warming-strategies",
              title:
                "Cold Start Problem Model Loading And Predictive Warming Strategies",
              order: 4,
            },
            {
              lesson:
                "cost-control-on-demand-vs-spot-scale-to-zero-and-fractional-allocation",
              title:
                "Cost Control On Demand Vs Spot Scale To Zero And Fractional Allocation",
              order: 5,
            },
            {
              lesson:
                "full-gpu-vs-fractional-allocation-isolation-vs-utilization-trade-offs",
              title:
                "Full Gpu Vs Fractional Allocation Isolation Vs Utilization Trade Offs",
              order: 3,
            },
            {
              lesson:
                "gpu-autoscaling-failure-modes-oscillation-placement-and-hidden-bottlenecks",
              title:
                "Gpu Autoscaling Failure Modes Oscillation Placement And Hidden Bottlenecks",
              order: 6,
            },
            {
              lesson: "gpu-autoscaling-multi-layer-control-architecture",
              title: "Gpu Autoscaling Multi Layer Control Architecture",
              order: 1,
            },
            {
              lesson: "gpu-metrics-beyond-utilization-for-accurate-autoscaling",
              title: "Gpu Metrics Beyond Utilization For Accurate Autoscaling",
              order: 2,
            },
          ],
        },
        {
          subsection: "batch-vs-realtime-inference",
          title: "Batch Vs Realtime Inference",
          lessons: [
            {
              lesson: "batch-inference-throughput-over-latency",
              title: "Batch Inference Throughput Over Latency",
              order: 2,
            },
            {
              lesson: "batch-vs-real-time-making-the-choice",
              title: "Batch Vs Real Time Making The Choice",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson: "production-implementation-patterns",
              title: "Production Implementation Patterns",
              order: 6,
            },
            {
              lesson: "real-time-inference-latency-under-pressure",
              title: "Real Time Inference Latency Under Pressure",
              order: 3,
            },
            {
              lesson: "what-is-batch-vs-real-time-inference",
              title: "What Is Batch Vs Real Time Inference",
              order: 1,
            },
          ],
        },
        {
          subsection: "inference-latency-optimization",
          title: "Inference Latency Optimization",
          lessons: [
            {
              lesson:
                "how-do-you-tune-inference-serving-for-different-workload-patterns",
              title:
                "How Do You Tune Inference Serving For Different Workload Patterns",
              order: 6,
            },
            {
              lesson:
                "how-does-dynamic-batching-balance-throughput-and-latency",
              title: "How Does Dynamic Batching Balance Throughput And Latency",
              order: 2,
            },
            {
              lesson:
                "how-does-pagedattention-and-prefix-caching-optimize-memory-management",
              title:
                "How Does Pagedattention And Prefix Caching Optimize Memory Management",
              order: 4,
            },
            {
              lesson:
                "what-are-the-critical-failure-modes-in-production-inference-optimization",
              title:
                "What Are The Critical Failure Modes In Production Inference Optimization",
              order: 5,
            },
            {
              lesson:
                "what-is-kv-cache-and-why-does-it-dominate-memory-in-llm-inference",
              title:
                "What Is KV Cache And Why Does It Dominate Memory In LLM Inference",
              order: 1,
            },
            {
              lesson:
                "what-is-model-quantization-and-when-does-it-actually-speed-up-inference",
              title:
                "What Is Model Quantization And When Does It Actually Speed Up Inference",
              order: 3,
            },
          ],
        },
        {
          subsection: "model-monitoring-observability",
          title: "Model Monitoring Observability",
          lessons: [
            {
              lesson: "batching-trade-offs-throughput-vs-tail-latency",
              title: "Batching Trade Offs Throughput Vs Tail Latency",
              order: 3,
            },
            {
              lesson: "continuous-evaluation-and-safe-rollout-for-llms",
              title: "Continuous Evaluation And Safe Rollout For Llms",
              order: 4,
            },
            {
              lesson: "cost-and-security-telemetry-for-production-ml",
              title: "Cost And Security Telemetry For Production Ml",
              order: 6,
            },
            {
              lesson: "detecting-model-drift-data-concept-and-semantic-shifts",
              title: "Detecting Model Drift Data Concept And Semantic Shifts",
              order: 2,
            },
            {
              lesson:
                "monitoring-inference-latency-time-to-first-token-vs-end-to-end",
              title:
                "Monitoring Inference Latency Time To First Token Vs End To End",
              order: 1,
            },
            {
              lesson: "semantic-caching-and-retrieval-invalidation",
              title: "Semantic Caching And Retrieval Invalidation",
              order: 5,
            },
          ],
        },
        {
          subsection: "model-versioning-rollback",
          title: "Model Versioning Rollback",
          lessons: [
            {
              lesson:
                "blue-green-and-canary-deployment-patterns-for-model-rollout",
              title:
                "Blue Green And Canary Deployment Patterns For Model Rollout",
              order: 2,
            },
            {
              lesson: "fast-rollback-strategies-and-automated-decision-making",
              title: "Fast Rollback Strategies And Automated Decision Making",
              order: 4,
            },
            {
              lesson:
                "feature-versioning-and-time-travel-for-reproducible-rollback",
              title:
                "Feature Versioning And Time Travel For Reproducible Rollback",
              order: 6,
            },
            {
              lesson: "shadow-deployment-for-risk-free-model-validation",
              title: "Shadow Deployment For Risk Free Model Validation",
              order: 3,
            },
            {
              lesson:
                "training-serving-skew-and-compatibility-failures-in-rollback",
              title:
                "Training Serving Skew And Compatibility Failures In Rollback",
              order: 5,
            },
            {
              lesson: "what-is-model-versioning-in-production-ml-systems",
              title: "What Is Model Versioning In Production Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "multi-model-serving",
          title: "Multi Model Serving",
          lessons: [
            {
              lesson:
                "cold-start-storms-and-model-thrashing-detection-and-mitigation",
              title:
                "Cold Start Storms And Model Thrashing Detection And Mitigation",
              order: 5,
            },
            {
              lesson: "dynamic-batching-in-multi-model-serving",
              title: "Dynamic Batching In Multi Model Serving",
              order: 3,
            },
            {
              lesson:
                "llm-multi-model-serving-gateway-pattern-and-vram-constraints",
              title:
                "LLM Multi Model Serving Gateway Pattern And Vram Constraints",
              order: 4,
            },
            {
              lesson:
                "on-demand-loading-vs-multi-deployed-latency-and-cost-trade-offs",
              title:
                "On Demand Loading Vs Multi Deployed Latency And Cost Trade Offs",
              order: 2,
            },
            {
              lesson: "per-model-observability-metrics-and-alerting-strategy",
              title: "Per Model Observability Metrics And Alerting Strategy",
              order: 6,
            },
            {
              lesson: "what-is-multi-model-serving",
              title: "What Is Multi Model Serving",
              order: 1,
            },
          ],
        },
        {
          subsection: "serving-infrastructure",
          title: "Serving Infrastructure",
          lessons: [
            {
              lesson:
                "choosing-between-tensorflow-serving-torchserve-and-triton-for-production-deployment",
              title:
                "Choosing Between Tensorflow Serving Torchserve And Triton For Production Deployment",
              order: 6,
            },
            {
              lesson:
                "dynamic-batching-throughput-vs-latency-tradeoffs-in-request-scheduling",
              title:
                "Dynamic Batching Throughput Vs Latency Tradeoffs In Request Scheduling",
              order: 2,
            },
            {
              lesson:
                "model-serving-infrastructure-core-control-loop-and-architecture-patterns",
              title:
                "Model Serving Infrastructure Core Control Loop And Architecture Patterns",
              order: 1,
            },
            {
              lesson:
                "multi-backend-serving-with-triton-unified-control-plane-across-frameworks-and-hardware",
              title:
                "Multi Backend Serving With Triton Unified Control Plane Across Frameworks And Hardware",
              order: 3,
            },
            {
              lesson:
                "precision-conversion-and-hardware-optimization-fp32-to-bf16-fp16-int8-tradeoffs",
              title:
                "Precision Conversion And Hardware Optimization Fp32 To Bf16 Fp16 Int8 Tradeoffs",
              order: 4,
            },
            {
              lesson:
                "production-failure-modes-tail-latency-memory-exhaustion-and-training-serving-skew",
              title:
                "Production Failure Modes Tail Latency Memory Exhaustion And Training Serving Skew",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "ml-monitoring-observability",
      title: "Monitoring Observability",
      subsections: [
        {
          subsection: "business-metrics-correlation",
          title: "Business Metrics Correlation",
          lessons: [
            {
              lesson: "correlation-types-and-statistical-methods",
              title: "Correlation Types And Statistical Methods",
              order: 3,
            },
            {
              lesson: "critical-failure-modes-and-guardrails",
              title: "Critical Failure Modes And Guardrails",
              order: 5,
            },
            {
              lesson: "metric-ladders-and-mediation-chains",
              title: "Metric Ladders And Mediation Chains",
              order: 2,
            },
            {
              lesson: "production-implementation-at-scale",
              title: "Production Implementation At Scale",
              order: 4,
            },
            {
              lesson: "what-is-business-metrics-correlation-in-ml-systems",
              title: "What Is Business Metrics Correlation In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "concept-drift",
          title: "Concept Drift",
          lessons: [
            {
              lesson: "champion-challenger-rollout-and-operational-resilience",
              title: "Champion Challenger Rollout And Operational Resilience",
              order: 6,
            },
            {
              lesson:
                "detection-strategies-monitoring-drift-with-statistical-signals",
              title:
                "Detection Strategies Monitoring Drift With Statistical Signals",
              order: 2,
            },
            {
              lesson: "label-delay-and-two-stage-learning",
              title: "Label Delay And Two Stage Learning",
              order: 4,
            },
            {
              lesson:
                "mitigation-data-weighting-retraining-cadence-and-model-portfolios",
              title:
                "Mitigation Data Weighting Retraining Cadence And Model Portfolios",
              order: 3,
            },
            {
              lesson: "production-failure-modes-and-defensive-strategies",
              title: "Production Failure Modes And Defensive Strategies",
              order: 5,
            },
            {
              lesson: "what-is-concept-drift-vs-data-drift-vs-model-decay",
              title: "What Is Concept Drift Vs Data Drift Vs Model Decay",
              order: 1,
            },
          ],
        },
        {
          subsection: "data-drift-detection",
          title: "Data Drift Detection",
          lessons: [
            {
              lesson: "baseline-selection-and-windowing-strategy",
              title: "Baseline Selection And Windowing Strategy",
              order: 3,
            },
            {
              lesson: "cost-scale-and-trade-off-analysis",
              title: "Cost Scale And Trade Off Analysis",
              order: 6,
            },
            {
              lesson:
                "failure-modes-and-edge-cases-in-production-drift-detection",
              title:
                "Failure Modes And Edge Cases In Production Drift Detection",
              order: 5,
            },
            {
              lesson: "production-architecture-and-implementation-patterns",
              title: "Production Architecture And Implementation Patterns",
              order: 4,
            },
            {
              lesson: "statistical-tests-for-drift-detection",
              title: "Statistical Tests For Drift Detection",
              order: 2,
            },
            {
              lesson: "what-is-data-drift-detection",
              title: "What Is Data Drift Detection",
              order: 1,
            },
          ],
        },
        {
          subsection: "data-quality-monitoring",
          title: "Data Quality Monitoring",
          lessons: [
            {
              lesson: "batch-vs-streaming-monitoring-trade-offs",
              title: "Batch Vs Streaming Monitoring Trade Offs",
              order: 3,
            },
            {
              lesson: "data-contracts-and-expectation-based-monitoring",
              title: "Data Contracts And Expectation Based Monitoring",
              order: 2,
            },
            {
              lesson:
                "feature-drift-detection-with-psi-and-distribution-metrics",
              title:
                "Feature Drift Detection With Psi And Distribution Metrics",
              order: 4,
            },
            {
              lesson: "production-failure-modes-and-edge-case-handling",
              title: "Production Failure Modes And Edge Case Handling",
              order: 6,
            },
            {
              lesson: "training-serving-skew-detection-and-prevention",
              title: "Training Serving Skew Detection And Prevention",
              order: 5,
            },
            {
              lesson: "what-is-data-quality-monitoring-in-ml-systems",
              title: "What Is Data Quality Monitoring In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "feature-importance-tracking",
          title: "Feature Importance Tracking",
          lessons: [
            {
              lesson: "model-centric-vs-data-centric-shap-monitoring-patterns",
              title: "Model Centric Vs Data Centric Shap Monitoring Patterns",
              order: 2,
            },
            {
              lesson:
                "production-shap-drift-pipeline-architecture-and-capacity-planning",
              title:
                "Production Shap Drift Pipeline Architecture And Capacity Planning",
              order: 3,
            },
            {
              lesson: "shap-drift-failure-modes-and-mitigation-strategies",
              title: "Shap Drift Failure Modes And Mitigation Strategies",
              order: 4,
            },
            {
              lesson: "what-is-shap-drift-and-why-track-it",
              title: "What Is Shap Drift And Why Track It",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-performance-degradation",
          title: "Model Performance Degradation",
          lessons: [
            {
              lesson: "canary-deployments-and-automated-rollback-for-ml-models",
              title: "Canary Deployments And Automated Rollback For Ml Models",
              order: 4,
            },
            {
              lesson:
                "failure-modes-label-bias-seasonality-and-slice-degradation",
              title:
                "Failure Modes Label Bias Seasonality And Slice Degradation",
              order: 6,
            },
            {
              lesson:
                "label-delay-and-feedback-windows-in-production-monitoring",
              title:
                "Label Delay And Feedback Windows In Production Monitoring",
              order: 5,
            },
            {
              lesson: "statistical-methods-for-drift-detection-and-alerting",
              title: "Statistical Methods For Drift Detection And Alerting",
              order: 3,
            },
            {
              lesson: "two-tier-monitoring-service-health-vs-model-quality",
              title: "Two Tier Monitoring Service Health Vs Model Quality",
              order: 2,
            },
            {
              lesson: "what-causes-model-performance-degradation-in-production",
              title: "What Causes Model Performance Degradation In Production",
              order: 1,
            },
          ],
        },
        {
          subsection: "prediction-drift",
          title: "Prediction Drift",
          lessons: [
            {
              lesson: "baseline-selection-strategies-and-trade-offs",
              title: "Baseline Selection Strategies And Trade Offs",
              order: 3,
            },
            {
              lesson: "prediction-drift-failure-modes-and-mitigation",
              title: "Prediction Drift Failure Modes And Mitigation",
              order: 5,
            },
            {
              lesson:
                "production-implementation-architecture-and-cost-optimization",
              title:
                "Production Implementation Architecture And Cost Optimization",
              order: 6,
            },
            {
              lesson: "slice-level-monitoring-and-dimensionality-management",
              title: "Slice Level Monitoring And Dimensionality Management",
              order: 4,
            },
            {
              lesson: "statistical-metrics-for-prediction-drift-detection",
              title: "Statistical Metrics For Prediction Drift Detection",
              order: 2,
            },
            {
              lesson: "what-is-prediction-drift-monitoring",
              title: "What Is Prediction Drift Monitoring",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-nlp-systems",
      title: "NLP Systems",
      subsections: [
        {
          subsection: "llm-serving",
          title: "LLM Serving",
          lessons: [
            {
              lesson: "how-do-you-manage-kv-cache-memory-in-production",
              title: "How Do You Manage KV Cache Memory In Production",
              order: 4,
            },
            {
              lesson: "how-does-continuous-batching-work-in-llm-serving",
              title: "How Does Continuous Batching Work In LLM Serving",
              order: 2,
            },
            {
              lesson: "what-are-common-failure-modes-in-production-llm-serving",
              title: "What Are Common Failure Modes In Production LLM Serving",
              order: 6,
            },
            {
              lesson:
                "what-are-the-key-trade-offs-in-llm-serving-optimizations",
              title: "What Are The Key Trade Offs In LLM Serving Optimizations",
              order: 5,
            },
            {
              lesson: "what-is-kv-cache-in-llm-serving",
              title: "What Is KV Cache In LLM Serving",
              order: 1,
            },
            {
              lesson: "what-is-speculative-decoding-and-when-does-it-help",
              title: "What Is Speculative Decoding And When Does It Help",
              order: 3,
            },
          ],
        },
        {
          subsection: "multilingual-systems",
          title: "Multilingual Systems",
          lessons: [
            {
              lesson:
                "core-architecture-of-multilingual-natural-language-processing-nlp-systems",
              title:
                "Core Architecture Of Multilingual Natural Language Processing NLP Systems",
              order: 1,
            },
            {
              lesson: "failure-modes-in-production-multilingual-systems",
              title: "Failure Modes In Production Multilingual Systems",
              order: 4,
            },
            {
              lesson: "language-consistency-and-generation-control-mechanisms",
              title: "Language Consistency And Generation Control Mechanisms",
              order: 3,
            },
            {
              lesson:
                "offline-document-translation-vs-online-query-translation-trade-offs",
              title:
                "Offline Document Translation Vs Online Query Translation Trade Offs",
              order: 2,
            },
            {
              lesson:
                "unified-multilingual-vector-index-vs-per-language-index-architecture",
              title:
                "Unified Multilingual Vector Index Vs Per Language Index Architecture",
              order: 5,
            },
          ],
        },
        {
          subsection: "named-entity-recognition",
          title: "Named Entity Recognition",
          lessons: [
            {
              lesson: "critical-ner-failure-modes-and-production-mitigations",
              title: "Critical Ner Failure Modes And Production Mitigations",
              order: 4,
            },
            {
              lesson:
                "ner-model-architecture-trade-offs-rules-crfs-transformers-and-llms",
              title:
                "Ner Model Architecture Trade Offs Rules Crfs Transformers And Llms",
              order: 3,
            },
            {
              lesson: "online-vs-offline-ner-deployment-patterns",
              title: "Online Vs Offline Ner Deployment Patterns",
              order: 2,
            },
            {
              lesson:
                "production-ner-implementation-training-serving-and-monitoring",
              title:
                "Production Ner Implementation Training Serving And Monitoring",
              order: 5,
            },
            {
              lesson: "what-is-named-entity-recognition-ner",
              title: "What Is Named Entity Recognition Ner",
              order: 1,
            },
          ],
        },
        {
          subsection: "nlp-scalability",
          title: "NLP Scalability",
          lessons: [
            {
              lesson: "data-parallelism-for-training-gradient-sync-and-scaling",
              title: "Data Parallelism For Training Gradient Sync And Scaling",
              order: 4,
            },
            {
              lesson: "horizontal-scaling-model-replication-and-load-balancing",
              title: "Horizontal Scaling Model Replication And Load Balancing",
              order: 5,
            },
            {
              lesson:
                "how-does-batching-improve-training-and-inference-utilization",
              title:
                "How Does Batching Improve Training And Inference Utilization",
              order: 2,
            },
            {
              lesson:
                "model-parallelism-tensor-and-pipeline-parallelism-explained",
              title:
                "Model Parallelism Tensor And Pipeline Parallelism Explained",
              order: 3,
            },
            {
              lesson:
                "scaling-failures-memory-fragmentation-stragglers-and-graceful-degradation",
              title:
                "Scaling Failures Memory Fragmentation Stragglers And Graceful Degradation",
              order: 6,
            },
            {
              lesson: "what-is-model-parallelism-and-why-do-we-need-it",
              title: "What Is Model Parallelism And Why Do We Need It",
              order: 1,
            },
          ],
        },
        {
          subsection: "prompt-engineering-management",
          title: "Prompt Engineering Management",
          lessons: [
            {
              lesson:
                "advanced-techniques-caching-multi-model-routing-and-cost-optimization",
              title:
                "Advanced Techniques Caching Multi Model Routing And Cost Optimization",
              order: 6,
            },
            {
              lesson: "production-prompt-pipeline-architecture",
              title: "Production Prompt Pipeline Architecture",
              order: 2,
            },
            {
              lesson:
                "prompt-engineering-techniques-chain-of-thought-and-tool-use",
              title:
                "Prompt Engineering Techniques Chain Of Thought And Tool Use",
              order: 3,
            },
            {
              lesson:
                "prompt-failure-modes-injection-drift-and-mitigation-strategies",
              title:
                "Prompt Failure Modes Injection Drift And Mitigation Strategies",
              order: 5,
            },
            {
              lesson: "prompt-management-versioning-evaluation-and-ab-testing",
              title: "Prompt Management Versioning Evaluation And AB Testing",
              order: 4,
            },
            {
              lesson: "what-is-prompt-engineering-and-management",
              title: "What Is Prompt Engineering And Management",
              order: 1,
            },
          ],
        },
        {
          subsection: "semantic-search-nlp",
          title: "Semantic Search Nlp",
          lessons: [
            {
              lesson:
                "failure-modes-and-edge-cases-in-production-semantic-search",
              title:
                "Failure Modes And Edge Cases In Production Semantic Search",
              order: 5,
            },
            {
              lesson: "how-ann-algorithms-work-hnsw-ivf-and-scaling-strategies",
              title: "How Ann Algorithms Work Hnsw Ivf And Scaling Strategies",
              order: 3,
            },
            {
              lesson:
                "implementation-details-sharding-monitoring-and-optimization",
              title:
                "Implementation Details Sharding Monitoring And Optimization",
              order: 6,
            },
            {
              lesson:
                "semantic-vs-keyword-search-when-to-use-each-and-hybrid-approaches",
              title:
                "Semantic Vs Keyword Search When To Use Each And Hybrid Approaches",
              order: 4,
            },
            {
              lesson:
                "what-is-semantic-search-and-how-do-dense-embeddings-work",
              title: "What Is Semantic Search And How Do Dense Embeddings Work",
              order: 1,
            },
            {
              lesson:
                "why-approximate-nearest-neighbor-ann-and-core-algorithm-families",
              title:
                "Why Approximate Nearest Neighbor Ann And Core Algorithm Families",
              order: 2,
            },
          ],
        },
        {
          subsection: "text-classification-scale",
          title: "Text Classification Scale",
          lessons: [
            {
              lesson: "handling-class-imbalance-and-long-tail-labels",
              title: "Handling Class Imbalance And Long Tail Labels",
              order: 4,
            },
            {
              lesson: "production-failure-modes-and-mitigation-strategies",
              title: "Production Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson:
                "serving-text-classification-at-scale-batching-caching-and-cost",
              title:
                "Serving Text Classification At Scale Batching Caching And Cost",
              order: 6,
            },
            {
              lesson: "tiered-architecture-for-latency-and-cost-optimization",
              title: "Tiered Architecture For Latency And Cost Optimization",
              order: 3,
            },
            {
              lesson: "what-is-text-classification-and-why-does-scale-matter",
              title: "What Is Text Classification And Why Does Scale Matter",
              order: 1,
            },
            {
              lesson: "zero-shot-vs-supervised-classification-trade-offs",
              title: "Zero Shot Vs Supervised Classification Trade Offs",
              order: 2,
            },
          ],
        },
        {
          subsection: "text-generation",
          title: "Text Generation",
          lessons: [
            {
              lesson: "decoding-failure-modes-and-safety-controls",
              title: "Decoding Failure Modes And Safety Controls",
              order: 4,
            },
            {
              lesson: "greedy-vs-beam-search-decoding",
              title: "Greedy Vs Beam Search Decoding",
              order: 1,
            },
            {
              lesson: "how-to-choose-deterministic-vs-stochastic-decoding",
              title: "How To Choose Deterministic Vs Stochastic Decoding",
              order: 5,
            },
            {
              lesson: "production-serving-pipeline-with-token-streaming",
              title: "Production Serving Pipeline With Token Streaming",
              order: 3,
            },
            {
              lesson: "speculative-decoding-and-latency-optimization",
              title: "Speculative Decoding And Latency Optimization",
              order: 6,
            },
            {
              lesson: "temperature-and-nucleus-sampling-top-p",
              title: "Temperature And Nucleus Sampling Top P",
              order: 2,
            },
          ],
        },
        {
          subsection: "tokenization-preprocessing",
          title: "Tokenization Preprocessing",
          lessons: [
            {
              lesson:
                "failure-modes-train-serve-skew-unicode-pitfalls-and-span-alignment",
              title:
                "Failure Modes Train Serve Skew Unicode Pitfalls And Span Alignment",
              order: 5,
            },
            {
              lesson: "preprocessing-pipeline-normalization-and-text-cleaning",
              title: "Preprocessing Pipeline Normalization And Text Cleaning",
              order: 2,
            },
            {
              lesson: "production-tokenization-performance-caching-and-scale",
              title: "Production Tokenization Performance Caching And Scale",
              order: 3,
            },
            {
              lesson: "tokenizer-training-and-operational-best-practices",
              title: "Tokenizer Training And Operational Best Practices",
              order: 6,
            },
            {
              lesson: "vocabulary-size-trade-offs-and-sequence-length-impact",
              title: "Vocabulary Size Trade Offs And Sequence Length Impact",
              order: 4,
            },
            {
              lesson: "what-is-tokenization-and-why-does-it-matter",
              title: "What Is Tokenization And Why Does It Matter",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-privacy-fairness",
      title: "Privacy Fairness",
      subsections: [
        {
          subsection: "bias-detection-mitigation",
          title: "Bias Detection Mitigation",
          lessons: [
            {
              lesson: "bias-mitigation-pre-in-and-post-processing-techniques",
              title: "Bias Mitigation Pre In And Post Processing Techniques",
              order: 3,
            },
            {
              lesson: "failure-modes-proxy-leakage-and-feedback-loops",
              title: "Failure Modes Proxy Leakage And Feedback Loops",
              order: 5,
            },
            {
              lesson:
                "fairness-metrics-group-individual-and-calibration-parity",
              title: "Fairness Metrics Group Individual And Calibration Parity",
              order: 2,
            },
            {
              lesson: "legal-frameworks-and-production-compliance",
              title: "Legal Frameworks And Production Compliance",
              order: 6,
            },
            {
              lesson: "production-fairness-architecture-and-monitoring",
              title: "Production Fairness Architecture And Monitoring",
              order: 4,
            },
            {
              lesson: "what-is-bias-in-machine-learning-systems",
              title: "What Is Bias In Machine Learning Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "data-anonymization",
          title: "Data Anonymization",
          lessons: [
            {
              lesson:
                "failure-modes-attacks-and-operational-risks-in-anonymization",
              title:
                "Failure Modes Attacks And Operational Risks In Anonymization",
              order: 5,
            },
            {
              lesson:
                "layered-strategy-combining-anonymization-techniques-in-production-ml",
              title:
                "Layered Strategy Combining Anonymization Techniques In Production Ml",
              order: 6,
            },
            {
              lesson:
                "production-implementation-multi-tier-pii-detection-pipeline",
              title:
                "Production Implementation Multi Tier Pii Detection Pipeline",
              order: 4,
            },
            {
              lesson:
                "pseudonymization-vs-anonymization-vs-differential-privacy",
              title:
                "Pseudonymization Vs Anonymization Vs Differential Privacy",
              order: 3,
            },
            {
              lesson: "understanding-k-anonymity-for-tabular-data-protection",
              title: "Understanding K Anonymity For Tabular Data Protection",
              order: 2,
            },
            {
              lesson: "what-is-data-anonymization-and-why-do-we-need-it",
              title: "What Is Data Anonymization And Why Do We Need It",
              order: 1,
            },
          ],
        },
        {
          subsection: "differential-privacy",
          title: "Differential Privacy",
          lessons: [
            {
              lesson:
                "allocating-privacy-budgets-and-choosing-epsilon-in-production",
              title:
                "Allocating Privacy Budgets And Choosing Epsilon In Production",
              order: 6,
            },
            {
              lesson: "central-vs-local-differential-privacy-trade-offs",
              title: "Central Vs Local Differential Privacy Trade Offs",
              order: 2,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-differential-privacy",
              title: "Failure Modes And Edge Cases In Differential Privacy",
              order: 5,
            },
            {
              lesson: "production-system-architecture-for-differential-privacy",
              title: "Production System Architecture For Differential Privacy",
              order: 4,
            },
            {
              lesson: "training-ml-models-with-differential-privacy-dp-sgd",
              title: "Training Ml Models With Differential Privacy Dp Sgd",
              order: 3,
            },
            {
              lesson: "what-is-differential-privacy",
              title: "What Is Differential Privacy",
              order: 1,
            },
          ],
        },
        {
          subsection: "fairness-metrics",
          title: "Fairness Metrics",
          lessons: [
            {
              lesson:
                "demographic-parity-vs-equalized-odds-when-to-choose-each",
              title: "Demographic Parity Vs Equalized Odds When To Choose Each",
              order: 3,
            },
            {
              lesson: "fairness-metrics-failure-modes-and-edge-cases",
              title: "Fairness Metrics Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson:
                "implementing-fairness-metrics-in-production-ml-pipelines",
              title: "Implementing Fairness Metrics In Production Ml Pipelines",
              order: 4,
            },
            {
              lesson: "post-processing-threshold-optimization-for-fairness",
              title: "Post Processing Threshold Optimization For Fairness",
              order: 6,
            },
            {
              lesson: "what-is-demographic-parity",
              title: "What Is Demographic Parity",
              order: 1,
            },
            {
              lesson: "what-is-equalized-odds",
              title: "What Is Equalized Odds",
              order: 2,
            },
          ],
        },
        {
          subsection: "federated-learning",
          title: "Federated Learning",
          lessons: [
            {
              lesson: "communication-efficiency-and-compression",
              title: "Communication Efficiency And Compression",
              order: 4,
            },
            {
              lesson: "handling-non-iid-data-and-client-selection",
              title: "Handling Non Iid Data And Client Selection",
              order: 3,
            },
            {
              lesson: "production-deployment-and-failure-modes",
              title: "Production Deployment And Failure Modes",
              order: 5,
            },
            {
              lesson: "secure-aggregation-and-privacy-mechanisms",
              title: "Secure Aggregation And Privacy Mechanisms",
              order: 2,
            },
            {
              lesson: "what-is-federated-learning",
              title: "What Is Federated Learning",
              order: 1,
            },
            {
              lesson:
                "when-to-use-federated-learning-trade-offs-and-alternatives",
              title:
                "When To Use Federated Learning Trade Offs And Alternatives",
              order: 6,
            },
          ],
        },
        {
          subsection: "model-interpretability",
          title: "Model Interpretability",
          lessons: [
            {
              lesson: "failure-modes-and-edge-cases-in-model-explanations",
              title: "Failure Modes And Edge Cases In Model Explanations",
              order: 4,
            },
            {
              lesson:
                "implementation-patterns-from-prototyping-to-production-governance",
              title:
                "Implementation Patterns From Prototyping To Production Governance",
              order: 5,
            },
            {
              lesson: "production-architecture-for-model-explanations-at-scale",
              title: "Production Architecture For Model Explanations At Scale",
              order: 2,
            },
            {
              lesson:
                "shap-vs-lime-vs-gradient-methods-choosing-the-right-technique",
              title:
                "Shap Vs Lime Vs Gradient Methods Choosing The Right Technique",
              order: 3,
            },
            {
              lesson: "what-are-shap-and-lime-for-model-interpretability",
              title: "What Are Shap And Lime For Model Interpretability",
              order: 1,
            },
          ],
        },
        {
          subsection: "regulatory-compliance",
          title: "Regulatory Compliance",
          lessons: [
            {
              lesson: "critical-trade-offs-in-privacy-compliant-ml",
              title: "Critical Trade Offs In Privacy Compliant Ml",
              order: 3,
            },
            {
              lesson: "dangerous-failure-modes-in-privacy-compliance",
              title: "Dangerous Failure Modes In Privacy Compliance",
              order: 4,
            },
            {
              lesson: "four-planes-of-compliant-ml-architecture",
              title: "Four Planes Of Compliant Ml Architecture",
              order: 2,
            },
            {
              lesson: "implementing-dsar-orchestration-at-scale",
              title: "Implementing Dsar Orchestration At Scale",
              order: 5,
            },
            {
              lesson: "runtime-privacy-controls-and-audit-evidence",
              title: "Runtime Privacy Controls And Audit Evidence",
              order: 6,
            },
            {
              lesson: "what-is-regulatory-compliance-for-ml-systems",
              title: "What Is Regulatory Compliance For Ml Systems",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-recommendation-systems",
      title: "Recommenders",
      subsections: [
        {
          subsection: "cold-start-problem",
          title: "Cold Start Problem",
          lessons: [
            {
              lesson:
                "cold-start-failure-modes-popularity-loops-and-sparse-signal-overreaction",
              title:
                "Cold Start Failure Modes Popularity Loops And Sparse Signal Overreaction",
              order: 5,
            },
            {
              lesson:
                "exploration-policies-contextual-bandits-and-new-item-boosting",
              title:
                "Exploration Policies Contextual Bandits And New Item Boosting",
              order: 3,
            },
            {
              lesson:
                "multi-stage-pipeline-layering-priors-to-handle-cold-start",
              title:
                "Multi Stage Pipeline Layering Priors To Handle Cold Start",
              order: 2,
            },
            {
              lesson:
                "production-implementation-latency-budgets-and-nearline-refresh-cadences",
              title:
                "Production Implementation Latency Budgets And Nearline Refresh Cadences",
              order: 6,
            },
            {
              lesson:
                "progressive-profiling-and-identity-resolution-for-user-cold-start",
              title:
                "Progressive Profiling And Identity Resolution For User Cold Start",
              order: 4,
            },
            {
              lesson:
                "what-is-the-cold-start-problem-in-recommendation-systems",
              title: "What Is The Cold Start Problem In Recommendation Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "collaborative-filtering",
          title: "Collaborative Filtering",
          lessons: [
            {
              lesson: "failure-modes-cold-start-and-popularity-bias",
              title: "Failure Modes Cold Start And Popularity Bias",
              order: 6,
            },
            {
              lesson: "how-collaborative-filtering-works",
              title: "How Collaborative Filtering Works",
              order: 2,
            },
            {
              lesson: "implicit-vs-explicit-feedback",
              title: "Implicit Vs Explicit Feedback",
              order: 4,
            },
            {
              lesson: "matrix-factorization-scaling-collaborative-filtering",
              title: "Matrix Factorization Scaling Collaborative Filtering",
              order: 3,
            },
            {
              lesson: "trade-offs-when-to-use-collaborative-filtering",
              title: "Trade Offs When To Use Collaborative Filtering",
              order: 5,
            },
            {
              lesson: "what-is-collaborative-filtering",
              title: "What Is Collaborative Filtering",
              order: 1,
            },
          ],
        },
        {
          subsection: "content-based-filtering",
          title: "Content Based Filtering",
          lessons: [
            {
              lesson:
                "failure-modes-and-edge-cases-in-content-based-and-hybrid-recommenders",
              title:
                "Failure Modes And Edge Cases In Content Based And Hybrid Recommenders",
              order: 5,
            },
            {
              lesson:
                "hybrid-recommendation-systems-combining-content-and-collaborative-filtering",
              title:
                "Hybrid Recommendation Systems Combining Content And Collaborative Filtering",
              order: 2,
            },
            {
              lesson:
                "implementation-deep-dive-building-production-cbf-and-hybrid-systems",
              title:
                "Implementation Deep Dive Building Production Cbf And Hybrid Systems",
              order: 6,
            },
            {
              lesson:
                "production-architecture-two-stage-retrieval-and-re-ranking-pipeline",
              title:
                "Production Architecture Two Stage Retrieval And Re Ranking Pipeline",
              order: 3,
            },
            {
              lesson:
                "trade-offs-when-to-choose-content-based-vs-collaborative-vs-hybrid",
              title:
                "Trade Offs When To Choose Content Based Vs Collaborative Vs Hybrid",
              order: 4,
            },
            {
              lesson: "what-is-content-based-filtering",
              title: "What Is Content Based Filtering",
              order: 1,
            },
          ],
        },
        {
          subsection: "diversity-exploration",
          title: "Diversity Exploration",
          lessons: [
            {
              lesson:
                "core-bandit-algorithms-epsilon-greedy-ucb-and-thompson-sampling",
              title:
                "Core Bandit Algorithms Epsilon Greedy Ucb And Thompson Sampling",
              order: 2,
            },
            {
              lesson:
                "diversity-constraints-and-convergence-monitoring-in-production-bandits",
              title:
                "Diversity Constraints And Convergence Monitoring In Production Bandits",
              order: 5,
            },
            {
              lesson:
                "failure-modes-misaligned-rewards-training-serving-skew-and-non-stationarity",
              title:
                "Failure Modes Misaligned Rewards Training Serving Skew And Non Stationarity",
              order: 6,
            },
            {
              lesson:
                "production-architecture-sampler-parameter-store-and-streaming-feedback",
              title:
                "Production Architecture Sampler Parameter Store And Streaming Feedback",
              order: 3,
            },
            {
              lesson:
                "slate-and-ranked-bandits-handling-multiple-positions-and-positional-bias",
              title:
                "Slate And Ranked Bandits Handling Multiple Positions And Positional Bias",
              order: 4,
            },
            {
              lesson:
                "what-are-multi-armed-bandits-and-why-use-them-for-recommendations",
              title:
                "What Are Multi Armed Bandits And Why Use Them For Recommendations",
              order: 1,
            },
          ],
        },
        {
          subsection: "position-bias-feedback-loops",
          title: "Position Bias Feedback Loops",
          lessons: [
            {
              lesson:
                "debiasing-techniques-ips-position-features-and-trade-offs",
              title:
                "Debiasing Techniques Ips Position Features And Trade Offs",
              order: 4,
            },
            {
              lesson:
                "failure-modes-propensity-errors-format-changes-and-delayed-loops",
              title:
                "Failure Modes Propensity Errors Format Changes And Delayed Loops",
              order: 6,
            },
            {
              lesson: "feedback-loops-how-bias-amplifies-over-time",
              title: "Feedback Loops How Bias Amplifies Over Time",
              order: 3,
            },
            {
              lesson: "how-position-bias-distorts-training-data",
              title: "How Position Bias Distorts Training Data",
              order: 2,
            },
            {
              lesson:
                "production-implementation-logging-calibration-and-monitoring",
              title:
                "Production Implementation Logging Calibration And Monitoring",
              order: 5,
            },
            {
              lesson: "what-is-position-bias-in-recommendation-systems",
              title: "What Is Position Bias In Recommendation Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "realtime-personalization",
          title: "Realtime Personalization",
          lessons: [
            {
              lesson:
                "contextual-bandits-balancing-exploration-and-exploitation",
              title:
                "Contextual Bandits Balancing Exploration And Exploitation",
              order: 3,
            },
            {
              lesson: "failure-modes-feedback-loops-position-bias-and-drift",
              title: "Failure Modes Feedback Loops Position Bias And Drift",
              order: 5,
            },
            {
              lesson: "how-session-based-models-work",
              title: "How Session Based Models Work",
              order: 2,
            },
            {
              lesson:
                "production-architecture-pipelines-serving-and-evaluation",
              title: "Production Architecture Pipelines Serving And Evaluation",
              order: 6,
            },
            {
              lesson: "trade-offs-exploration-rate-latency-and-session-length",
              title: "Trade Offs Exploration Rate Latency And Session Length",
              order: 4,
            },
            {
              lesson: "what-is-real-time-personalization",
              title: "What Is Real Time Personalization",
              order: 1,
            },
          ],
        },
        {
          subsection: "recsys-evaluation",
          title: "Recsys Evaluation",
          lessons: [
            {
              lesson: "candidate-retrieval-vs-final-ranking-metrics",
              title: "Candidate Retrieval Vs Final Ranking Metrics",
              order: 6,
            },
            {
              lesson: "choosing-precisionk-vs-ndcgk-when-to-use-each",
              title: "Choosing Precisionk Vs Ndcgk When To Use Each",
              order: 4,
            },
            {
              lesson: "coverage-metrics-ecosystem-health-beyond-accuracy",
              title: "Coverage Metrics Ecosystem Health Beyond Accuracy",
              order: 3,
            },
            {
              lesson: "ndcgk-position-aware-ranking-quality",
              title: "Ndcgk Position Aware Ranking Quality",
              order: 2,
            },
            {
              lesson: "precisionk-top-k-accuracy-for-ranked-recommendations",
              title: "Precisionk Top K Accuracy For Ranked Recommendations",
              order: 1,
            },
            {
              lesson: "production-evaluation-scale-debiasing-and-failure-modes",
              title: "Production Evaluation Scale Debiasing And Failure Modes",
              order: 5,
            },
          ],
        },
        {
          subsection: "recsys-scalability",
          title: "Recsys Scalability",
          lessons: [
            {
              lesson:
                "approximate-nearest-neighbor-search-trading-exactness-for-scale",
              title:
                "Approximate Nearest Neighbor Search Trading Exactness For Scale",
              order: 1,
            },
            {
              lesson:
                "choosing-the-right-index-decision-framework-and-capacity-planning",
              title:
                "Choosing The Right Index Decision Framework And Capacity Planning",
              order: 6,
            },
            {
              lesson: "hnsw-graph-based-search-with-hierarchical-navigation",
              title: "Hnsw Graph Based Search With Hierarchical Navigation",
              order: 2,
            },
            {
              lesson:
                "ivf-and-product-quantization-compression-for-billion-scale-search",
              title:
                "Ivf And Product Quantization Compression For Billion Scale Search",
              order: 3,
            },
            {
              lesson: "memory-vs-disk-trade-offs-when-data-exceeds-ram",
              title: "Memory Vs Disk Trade Offs When Data Exceeds Ram",
              order: 4,
            },
            {
              lesson: "production-failure-modes-and-operational-challenges",
              title: "Production Failure Modes And Operational Challenges",
              order: 5,
            },
          ],
        },
        {
          subsection: "retrieval-ranking-pipeline",
          title: "Retrieval Ranking Pipeline",
          lessons: [
            {
              lesson:
                "critical-trade-offs-ranking-objectives-latency-and-freshness",
              title:
                "Critical Trade Offs Ranking Objectives Latency And Freshness",
              order: 4,
            },
            {
              lesson:
                "multi-source-retrieval-combining-multiple-candidate-generators",
              title:
                "Multi Source Retrieval Combining Multiple Candidate Generators",
              order: 2,
            },
            {
              lesson:
                "production-implementation-orchestration-caching-and-observability",
              title:
                "Production Implementation Orchestration Caching And Observability",
              order: 6,
            },
            {
              lesson:
                "ranking-cascades-trading-off-quality-and-latency-with-multi-stage-rankers",
              title:
                "Ranking Cascades Trading Off Quality And Latency With Multi Stage Rankers",
              order: 3,
            },
            {
              lesson: "retrieval-and-ranking-failure-modes-in-production",
              title: "Retrieval And Ranking Failure Modes In Production",
              order: 5,
            },
            {
              lesson: "what-is-a-retrieval-and-ranking-pipeline",
              title: "What Is A Retrieval And Ranking Pipeline",
              order: 1,
            },
          ],
        },
        {
          subsection: "two-tower-models",
          title: "Two Tower Models",
          lessons: [
            {
              lesson: "failure-modes-and-production-operations",
              title: "Failure Modes And Production Operations",
              order: 6,
            },
            {
              lesson: "how-two-tower-architecture-works",
              title: "How Two Tower Architecture Works",
              order: 2,
            },
            {
              lesson: "inference-at-scale-with-ann-search",
              title: "Inference At Scale With Ann Search",
              order: 4,
            },
            {
              lesson: "trade-offs-and-when-to-use-two-tower",
              title: "Trade Offs And When To Use Two Tower",
              order: 5,
            },
            {
              lesson: "training-two-tower-models",
              title: "Training Two Tower Models",
              order: 3,
            },
            {
              lesson: "what-are-two-tower-models-and-why-use-them",
              title: "What Are Two Tower Models And Why Use Them",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-search-ranking",
      title: "Search Ranking",
      subsections: [
        {
          subsection: "dense-retrieval",
          title: "Dense Retrieval",
          lessons: [
            {
              lesson: "dense-retrieval-failure-modes-and-mitigation-strategies",
              title: "Dense Retrieval Failure Modes And Mitigation Strategies",
              order: 5,
            },
            {
              lesson: "hybrid-retrieval-combining-dense-and-sparse-methods",
              title: "Hybrid Retrieval Combining Dense And Sparse Methods",
              order: 4,
            },
            {
              lesson:
                "production-dense-retrieval-pipeline-embedding-indexing-and-serving",
              title:
                "Production Dense Retrieval Pipeline Embedding Indexing And Serving",
              order: 3,
            },
            {
              lesson:
                "training-dense-retrievers-contrastive-learning-and-hard-negatives",
              title:
                "Training Dense Retrievers Contrastive Learning And Hard Negatives",
              order: 2,
            },
            {
              lesson:
                "vector-compression-and-quantization-trade-offs-for-dense-retrieval",
              title:
                "Vector Compression And Quantization Trade Offs For Dense Retrieval",
              order: 6,
            },
            {
              lesson: "what-is-dense-retrieval-with-bert-based-embeddings",
              title: "What Is Dense Retrieval With Bert Based Embeddings",
              order: 1,
            },
          ],
        },
        {
          subsection: "learning-to-rank",
          title: "Learning To Rank",
          lessons: [
            {
              lesson:
                "how-to-choose-decision-framework-for-pointwise-vs-pairwise-vs-listwise",
              title:
                "How To Choose Decision Framework For Pointwise Vs Pairwise Vs Listwise",
              order: 5,
            },
            {
              lesson:
                "listwise-ranking-optimizing-the-entire-list-with-metric-aware-losses",
              title:
                "Listwise Ranking Optimizing The Entire List With Metric Aware Losses",
              order: 4,
            },
            {
              lesson:
                "pairwise-ranking-learning-relative-order-from-item-comparisons",
              title:
                "Pairwise Ranking Learning Relative Order From Item Comparisons",
              order: 3,
            },
            {
              lesson:
                "pointwise-ranking-when-to-treat-ranking-as-independent-predictions",
              title:
                "Pointwise Ranking When To Treat Ranking As Independent Predictions",
              order: 2,
            },
            {
              lesson:
                "production-implementation-training-pipelines-and-serving-architecture-for-learning-to-rank",
              title:
                "Production Implementation Training Pipelines And Serving Architecture For Learning To Rank",
              order: 6,
            },
            {
              lesson:
                "what-is-learning-to-rank-and-how-does-it-differ-from-standard-classification",
              title:
                "What Is Learning To Rank And How Does It Differ From Standard Classification",
              order: 1,
            },
          ],
        },
        {
          subsection: "query-understanding",
          title: "Query Understanding",
          lessons: [
            {
              lesson: "entity-parsing-and-linking-in-query-understanding",
              title: "Entity Parsing And Linking In Query Understanding",
              order: 3,
            },
            {
              lesson: "failure-modes-and-production-guardrails",
              title: "Failure Modes And Production Guardrails",
              order: 5,
            },
            {
              lesson: "implementation-architecture-and-evaluation-strategy",
              title: "Implementation Architecture And Evaluation Strategy",
              order: 6,
            },
            {
              lesson: "intent-classification-and-routing-strategies",
              title: "Intent Classification And Routing Strategies",
              order: 2,
            },
            {
              lesson: "query-rewriting-for-improved-recall-and-precision",
              title: "Query Rewriting For Improved Recall And Precision",
              order: 4,
            },
            {
              lesson: "what-is-query-understanding-in-search-systems",
              title: "What Is Query Understanding In Search Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "ranking-feature-engineering",
          title: "Ranking Feature Engineering",
          lessons: [
            {
              lesson: "feature-groups-and-their-role-in-ranking-systems",
              title: "Feature Groups And Their Role In Ranking Systems",
              order: 1,
            },
            {
              lesson: "feature-store-serving-patterns-and-latency-budgets",
              title: "Feature Store Serving Patterns And Latency Budgets",
              order: 4,
            },
            {
              lesson: "hierarchical-feature-backoff-and-cold-start-handling",
              title: "Hierarchical Feature Backoff And Cold Start Handling",
              order: 6,
            },
            {
              lesson:
                "label-engineering-creating-training-labels-from-implicit-feedback",
              title:
                "Label Engineering Creating Training Labels From Implicit Feedback",
              order: 3,
            },
            {
              lesson: "multi-resolution-time-windows-and-feature-freshness",
              title: "Multi Resolution Time Windows And Feature Freshness",
              order: 2,
            },
            {
              lesson:
                "training-serving-skew-and-point-in-time-feature-correctness",
              title:
                "Training Serving Skew And Point In Time Feature Correctness",
              order: 5,
            },
          ],
        },
        {
          subsection: "search-evaluation",
          title: "Search Evaluation",
          lessons: [
            {
              lesson:
                "ctr-and-dwell-time-what-user-behavior-reveals-about-ranking",
              title:
                "Ctr And Dwell Time What User Behavior Reveals About Ranking",
              order: 4,
            },
            {
              lesson:
                "evaluation-pitfalls-logging-errors-distribution-shift-and-guardrails",
              title:
                "Evaluation Pitfalls Logging Errors Distribution Shift And Guardrails",
              order: 6,
            },
            {
              lesson:
                "mrr-and-precision-at-k-when-you-care-about-the-first-correct-result",
              title:
                "Mrr And Precision At K When You Care About The First Correct Result",
              order: 3,
            },
            {
              lesson:
                "ndcg-measuring-ranking-quality-with-position-discounting",
              title: "Ndcg Measuring Ranking Quality With Position Discounting",
              order: 2,
            },
            {
              lesson: "offline-vs-online-the-gap-between-training-and-reality",
              title: "Offline Vs Online The Gap Between Training And Reality",
              order: 5,
            },
            {
              lesson:
                "what-is-ranking-evaluation-and-why-simple-accuracy-fails",
              title: "What Is Ranking Evaluation And Why Simple Accuracy Fails",
              order: 1,
            },
          ],
        },
        {
          subsection: "search-personalization",
          title: "Search Personalization",
          lessons: [
            {
              lesson:
                "dual-horizon-profiles-short-term-vs-long-term-personalization",
              title:
                "Dual Horizon Profiles Short Term Vs Long Term Personalization",
              order: 2,
            },
            {
              lesson:
                "embedding-based-similarity-features-embclicksim-and-embskipsim",
              title:
                "Embedding Based Similarity Features Embclicksim And Embskipsim",
              order: 4,
            },
            {
              lesson:
                "failure-modes-and-production-safety-in-real-time-personalization",
              title:
                "Failure Modes And Production Safety In Real Time Personalization",
              order: 5,
            },
            {
              lesson:
                "session-feature-computation-real-time-updates-within-latency-constraints",
              title:
                "Session Feature Computation Real Time Updates Within Latency Constraints",
              order: 3,
            },
            {
              lesson: "training-pipeline-and-offline-batch-feature-computation",
              title: "Training Pipeline And Offline Batch Feature Computation",
              order: 6,
            },
            {
              lesson: "what-is-real-time-search-personalization",
              title: "What Is Real Time Search Personalization",
              order: 1,
            },
          ],
        },
        {
          subsection: "search-relevance-feedback",
          title: "Search Relevance Feedback",
          lessons: [
            {
              lesson:
                "how-do-click-models-separate-examination-from-attractiveness",
              title:
                "How Do Click Models Separate Examination From Attractiveness",
              order: 2,
            },
            {
              lesson:
                "how-do-you-deploy-bias-correction-in-a-production-ranking-pipeline",
              title:
                "How Do You Deploy Bias Correction In A Production Ranking Pipeline",
              order: 6,
            },
            {
              lesson:
                "how-do-you-implement-production-exploration-to-estimate-propensities",
              title:
                "How Do You Implement Production Exploration To Estimate Propensities",
              order: 4,
            },
            {
              lesson:
                "what-are-the-critical-failure-modes-in-bias-aware-ranking",
              title:
                "What Are The Critical Failure Modes In Bias Aware Ranking",
              order: 5,
            },
            {
              lesson:
                "what-is-inverse-propensity-scoring-and-when-does-it-fail",
              title: "What Is Inverse Propensity Scoring And When Does It Fail",
              order: 3,
            },
            {
              lesson:
                "what-is-position-bias-and-why-does-it-distort-ranking-systems",
              title:
                "What Is Position Bias And Why Does It Distort Ranking Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "search-scalability",
          title: "Search Scalability",
          lessons: [
            {
              lesson: "approximate-nearest-neighbor-hnsw-ivf-pq",
              title: "Approximate Nearest Neighbor Hnsw Ivf Pq",
              order: 3,
            },
            {
              lesson: "multi-tier-caching-features-embeddings",
              title: "Multi Tier Caching Features Embeddings",
              order: 2,
            },
            {
              lesson: "production-architecture-sharding-caching-ann",
              title: "Production Architecture Sharding Caching Ann",
              order: 6,
            },
            {
              lesson: "scalability-failure-modes",
              title: "Scalability Failure Modes",
              order: 5,
            },
            {
              lesson: "scalability-trade-offs-latency-cost-accuracy",
              title: "Scalability Trade Offs Latency Cost Accuracy",
              order: 4,
            },
            {
              lesson: "what-is-ml-search-scalability",
              title: "What Is Ml Search Scalability",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-timeseries-forecasting",
      title: "Timeseries Forecasting",
      subsections: [
        {
          subsection: "deep-learning-timeseries",
          title: "Deep Learning Timeseries",
          lessons: [
            {
              lesson:
                "failure-modes-and-edge-cases-in-deep-learning-time-series-forecasting",
              title:
                "Failure Modes And Edge Cases In Deep Learning Time Series Forecasting",
              order: 5,
            },
            {
              lesson: "global-multi-horizon-forecasting-models",
              title: "Global Multi Horizon Forecasting Models",
              order: 3,
            },
            {
              lesson:
                "long-short-term-memory-lstm-networks-for-time-series-forecasting",
              title:
                "Long Short Term Memory Lstm Networks For Time Series Forecasting",
              order: 1,
            },
            {
              lesson:
                "production-pipeline-training-serving-and-monitoring-at-scale",
              title:
                "Production Pipeline Training Serving And Monitoring At Scale",
              order: 4,
            },
            {
              lesson:
                "transformer-architectures-for-time-series-self-attention-and-long-range-dependencies",
              title:
                "Transformer Architectures For Time Series Self Attention And Long Range Dependencies",
              order: 2,
            },
          ],
        },
        {
          subsection: "forecasting-at-scale",
          title: "Forecasting At Scale",
          lessons: [
            {
              lesson:
                "failure-modes-hierarchy-drift-singular-systems-and-data-latency",
              title:
                "Failure Modes Hierarchy Drift Singular Systems And Data Latency",
              order: 6,
            },
            {
              lesson:
                "global-models-forecasting-millions-of-series-with-shared-parameters",
              title:
                "Global Models Forecasting Millions Of Series With Shared Parameters",
              order: 2,
            },
            {
              lesson:
                "hierarchical-forecasting-predicting-across-millions-of-related-time-series",
              title:
                "Hierarchical Forecasting Predicting Across Millions Of Related Time Series",
              order: 1,
            },
            {
              lesson:
                "production-pipeline-from-data-ingestion-to-online-serving-at-scale",
              title:
                "Production Pipeline From Data Ingestion To Online Serving At Scale",
              order: 5,
            },
            {
              lesson:
                "reconciliation-strategies-top-down-bottom-up-and-optimal-methods",
              title:
                "Reconciliation Strategies Top Down Bottom Up And Optimal Methods",
              order: 3,
            },
            {
              lesson:
                "scaling-reconciliation-sparse-matrices-and-subtree-parallelism",
              title:
                "Scaling Reconciliation Sparse Matrices And Subtree Parallelism",
              order: 4,
            },
          ],
        },
        {
          subsection: "forecasting-evaluation",
          title: "Forecasting Evaluation",
          lessons: [
            {
              lesson:
                "how-to-build-a-production-metric-suite-for-forecast-evaluation",
              title:
                "How To Build A Production Metric Suite For Forecast Evaluation",
              order: 4,
            },
            {
              lesson: "how-to-implement-forecast-evaluation-at-scale",
              title: "How To Implement Forecast Evaluation At Scale",
              order: 6,
            },
            {
              lesson: "what-are-the-key-failure-modes-in-forecast-evaluation",
              title: "What Are The Key Failure Modes In Forecast Evaluation",
              order: 5,
            },
            {
              lesson: "what-is-forecast-bias-and-why-does-it-matter",
              title: "What Is Forecast Bias And Why Does It Matter",
              order: 3,
            },
            {
              lesson:
                "what-is-mean-absolute-percentage-error-mape-in-forecasting",
              title:
                "What Is Mean Absolute Percentage Error Mape In Forecasting",
              order: 1,
            },
            {
              lesson: "what-is-root-mean-squared-error-rmse-in-time-series",
              title: "What Is Root Mean Squared Error Rmse In Time Series",
              order: 2,
            },
          ],
        },
        {
          subsection: "missing-data-handling",
          title: "Missing Data Handling",
          lessons: [
            {
              lesson:
                "critical-failure-modes-in-production-missing-data-handling",
              title:
                "Critical Failure Modes In Production Missing Data Handling",
              order: 4,
            },
            {
              lesson:
                "end-to-end-missing-data-pipeline-for-high-qps-ml-systems",
              title: "End To End Missing Data Pipeline For High Qps Ml Systems",
              order: 3,
            },
            {
              lesson:
                "imputation-strategies-training-time-versus-serving-time-trade-offs",
              title:
                "Imputation Strategies Training Time Versus Serving Time Trade Offs",
              order: 2,
            },
            {
              lesson: "understanding-missing-data-mechanisms-in-production-ml",
              title: "Understanding Missing Data Mechanisms In Production Ml",
              order: 1,
            },
          ],
        },
        {
          subsection: "multi-horizon-forecasting",
          title: "Multi Horizon Forecasting",
          lessons: [
            {
              lesson: "failure-modes-and-edge-cases-in-multi-horizon-systems",
              title: "Failure Modes And Edge Cases In Multi Horizon Systems",
              order: 5,
            },
            {
              lesson:
                "input-types-for-multi-horizon-models-static-known-future-and-observed-covariates",
              title:
                "Input Types For Multi Horizon Models Static Known Future And Observed Covariates",
              order: 2,
            },
            {
              lesson:
                "modeling-strategies-recursive-vs-direct-multi-output-vs-per-horizon-models",
              title:
                "Modeling Strategies Recursive Vs Direct Multi Output Vs Per Horizon Models",
              order: 3,
            },
            {
              lesson:
                "production-pipeline-from-data-assembly-to-serving-at-scale",
              title:
                "Production Pipeline From Data Assembly To Serving At Scale",
              order: 4,
            },
            {
              lesson: "trade-offs-in-multi-horizon-forecasting-systems",
              title: "Trade Offs In Multi Horizon Forecasting Systems",
              order: 6,
            },
            {
              lesson: "what-is-multi-horizon-forecasting",
              title: "What Is Multi Horizon Forecasting",
              order: 1,
            },
          ],
        },
        {
          subsection: "realtime-forecasting-updates",
          title: "Realtime Forecasting Updates",
          lessons: [
            {
              lesson: "end-to-end-architecture-for-real-time-features-at-scale",
              title: "End To End Architecture For Real Time Features At Scale",
              order: 6,
            },
            {
              lesson: "event-time-watermarks-and-handling-late-data",
              title: "Event Time Watermarks And Handling Late Data",
              order: 3,
            },
            {
              lesson: "online-learning-with-streaming-updates",
              title: "Online Learning With Streaming Updates",
              order: 4,
            },
            {
              lesson: "production-failure-modes-in-real-time-windowing-systems",
              title: "Production Failure Modes In Real Time Windowing Systems",
              order: 5,
            },
            {
              lesson: "time-bucketing-efficient-sliding-window-implementation",
              title: "Time Bucketing Efficient Sliding Window Implementation",
              order: 2,
            },
            {
              lesson: "what-are-sliding-windows-in-real-time-systems",
              title: "What Are Sliding Windows In Real Time Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "statistical-forecasting",
          title: "Statistical Forecasting",
          lessons: [
            {
              lesson: "arima-modeling-momentum-and-shocks",
              title: "Arima Modeling Momentum And Shocks",
              order: 3,
            },
            {
              lesson: "choosing-between-ets-arima-alternatives",
              title: "Choosing Between Ets Arima Alternatives",
              order: 5,
            },
            {
              lesson: "exponential-smoothing-weighted-averages",
              title: "Exponential Smoothing Weighted Averages",
              order: 2,
            },
            {
              lesson: "failure-modes-production-monitoring",
              title: "Failure Modes Production Monitoring",
              order: 6,
            },
            {
              lesson: "production-architecture-statistical-models",
              title: "Production Architecture Statistical Models",
              order: 4,
            },
            {
              lesson: "what-is-statistical-time-series-forecasting",
              title: "What Is Statistical Time Series Forecasting",
              order: 1,
            },
          ],
        },
        {
          subsection: "timeseries-feature-engineering",
          title: "Timeseries Feature Engineering",
          lessons: [
            {
              lesson: "failure-modes-edge-cases-and-operational-challenges",
              title: "Failure Modes Edge Cases And Operational Challenges",
              order: 6,
            },
            {
              lesson: "feature-pipeline-architecture-and-operational-patterns",
              title: "Feature Pipeline Architecture And Operational Patterns",
              order: 5,
            },
            {
              lesson: "point-in-time-correctness-and-preventing-leakage",
              title: "Point In Time Correctness And Preventing Leakage",
              order: 4,
            },
            {
              lesson: "rolling-statistics-and-window-aggregations",
              title: "Rolling Statistics And Window Aggregations",
              order: 2,
            },
            {
              lesson:
                "seasonality-encoding-calendar-features-and-fourier-terms",
              title: "Seasonality Encoding Calendar Features And Fourier Terms",
              order: 3,
            },
            {
              lesson: "what-are-lag-features-in-time-series",
              title: "What Are Lag Features In Time Series",
              order: 1,
            },
          ],
        },
      ],
    },
    {
      category: "ml-training-infrastructure",
      title: "Training Infrastructure",
      subsections: [
        {
          subsection: "continuous-training",
          title: "Continuous Training",
          lessons: [
            {
              lesson:
                "cost-and-capacity-management-for-continuous-training-at-scale",
              title:
                "Cost And Capacity Management For Continuous Training At Scale",
              order: 6,
            },
            {
              lesson: "drift-detection-and-staleness-budgets",
              title: "Drift Detection And Staleness Budgets",
              order: 2,
            },
            {
              lesson: "failure-modes-in-continuous-training-pipelines",
              title: "Failure Modes In Continuous Training Pipelines",
              order: 5,
            },
            {
              lesson: "retraining-strategies-batch-vs-incremental-vs-hybrid",
              title: "Retraining Strategies Batch Vs Incremental Vs Hybrid",
              order: 3,
            },
            {
              lesson:
                "safe-rollout-patterns-champion-challenger-and-phased-deployment",
              title:
                "Safe Rollout Patterns Champion Challenger And Phased Deployment",
              order: 4,
            },
            {
              lesson: "what-is-continuous-training-and-model-refresh",
              title: "What Is Continuous Training And Model Refresh",
              order: 1,
            },
          ],
        },
        {
          subsection: "data-versioning",
          title: "Data Versioning",
          lessons: [
            {
              lesson: "data-lineage-tracking-transformations-and-dependencies",
              title: "Data Lineage Tracking Transformations And Dependencies",
              order: 2,
            },
            {
              lesson: "failure-modes-when-versioning-and-lineage-break-down",
              title: "Failure Modes When Versioning And Lineage Break Down",
              order: 5,
            },
            {
              lesson:
                "lineage-granularity-table-vs-column-vs-row-level-trade-offs",
              title:
                "Lineage Granularity Table Vs Column Vs Row Level Trade Offs",
              order: 6,
            },
            {
              lesson: "production-manifests-linking-data-code-and-environment",
              title: "Production Manifests Linking Data Code And Environment",
              order: 4,
            },
            {
              lesson:
                "snapshot-vs-delta-storage-performance-and-cost-trade-offs",
              title:
                "Snapshot Vs Delta Storage Performance And Cost Trade Offs",
              order: 3,
            },
            {
              lesson: "what-is-data-versioning-in-machine-learning-pipelines",
              title: "What Is Data Versioning In Machine Learning Pipelines",
              order: 1,
            },
          ],
        },
        {
          subsection: "distributed-training",
          title: "Distributed Training",
          lessons: [
            {
              lesson: "3d-parallelism-and-topology-aware-mapping-in-production",
              title: "3d Parallelism And Topology Aware Mapping In Production",
              order: 5,
            },
            {
              lesson:
                "communication-bottlenecks-and-scaling-limits-in-distributed-training",
              title:
                "Communication Bottlenecks And Scaling Limits In Distributed Training",
              order: 6,
            },
            {
              lesson: "data-parallelism-scaling-training-throughput",
              title: "Data Parallelism Scaling Training Throughput",
              order: 2,
            },
            {
              lesson:
                "model-tensor-parallelism-splitting-layers-across-devices",
              title: "Model Tensor Parallelism Splitting Layers Across Devices",
              order: 3,
            },
            {
              lesson: "pipeline-parallelism-scaling-model-depth-across-devices",
              title: "Pipeline Parallelism Scaling Model Depth Across Devices",
              order: 4,
            },
            {
              lesson: "what-is-distributed-training-and-why-do-we-need-it",
              title: "What Is Distributed Training And Why Do We Need It",
              order: 1,
            },
          ],
        },
        {
          subsection: "experiment-tracking",
          title: "Experiment Tracking",
          lessons: [
            {
              lesson: "asynchronous-logging-and-metadata-architecture",
              title: "Asynchronous Logging And Metadata Architecture",
              order: 4,
            },
            {
              lesson:
                "dataset-fingerprinting-and-artifact-versioning-strategies",
              title:
                "Dataset Fingerprinting And Artifact Versioning Strategies",
              order: 2,
            },
            {
              lesson: "environment-capture-and-determinism-guarantees",
              title: "Environment Capture And Determinism Guarantees",
              order: 3,
            },
            {
              lesson:
                "failure-modes-and-edge-cases-in-production-reproducibility",
              title:
                "Failure Modes And Edge Cases In Production Reproducibility",
              order: 6,
            },
            {
              lesson: "lineage-graphs-and-promotion-gates",
              title: "Lineage Graphs And Promotion Gates",
              order: 5,
            },
            {
              lesson:
                "what-is-experiment-tracking-and-reproducibility-in-ml-systems",
              title:
                "What Is Experiment Tracking And Reproducibility In Ml Systems",
              order: 1,
            },
          ],
        },
        {
          subsection: "gpu-resource-management",
          title: "Gpu Resource Management",
          lessons: [
            {
              lesson: "ahead-of-time-scheduling-and-multi-stream-concurrency",
              title: "Ahead Of Time Scheduling And Multi Stream Concurrency",
              order: 2,
            },
            {
              lesson:
                "failure-modes-fragmentation-thrashing-and-topology-misplacement",
              title:
                "Failure Modes Fragmentation Thrashing And Topology Misplacement",
              order: 5,
            },
            {
              lesson: "gpu-allocation-fundamentals-spatial-vs-temporal-sharing",
              title: "Gpu Allocation Fundamentals Spatial Vs Temporal Sharing",
              order: 1,
            },
            {
              lesson:
                "implementation-patterns-two-level-scheduling-and-profiling-based-co-location",
              title:
                "Implementation Patterns Two Level Scheduling And Profiling Based Co Location",
              order: 6,
            },
            {
              lesson: "priority-preemption-and-multi-tenant-qos-policies",
              title: "Priority Preemption And Multi Tenant Qos Policies",
              order: 4,
            },
            {
              lesson: "topology-aware-gang-scheduling-for-distributed-training",
              title: "Topology Aware Gang Scheduling For Distributed Training",
              order: 3,
            },
          ],
        },
        {
          subsection: "hyperparameter-optimization-scale",
          title: "Hyperparameter Optimization Scale",
          lessons: [
            {
              lesson: "bayesian-optimization-vs-asha-when-to-use-each",
              title: "Bayesian Optimization Vs Asha When To Use Each",
              order: 4,
            },
            {
              lesson:
                "core-hpo-algorithms-random-vs-bayesian-vs-multi-fidelity",
              title: "Core Hpo Algorithms Random Vs Bayesian Vs Multi Fidelity",
              order: 2,
            },
            {
              lesson: "hpo-failure-modes-and-production-mitigations",
              title: "Hpo Failure Modes And Production Mitigations",
              order: 5,
            },
            {
              lesson: "production-hpo-system-architecture",
              title: "Production Hpo System Architecture",
              order: 3,
            },
            {
              lesson: "warm-start-transfer-learning-and-multi-objective-hpo",
              title: "Warm Start Transfer Learning And Multi Objective Hpo",
              order: 6,
            },
            {
              lesson: "what-is-hyperparameter-optimization-at-scale",
              title: "What Is Hyperparameter Optimization At Scale",
              order: 1,
            },
          ],
        },
        {
          subsection: "model-checkpointing",
          title: "Model Checkpointing",
          lessons: [
            {
              lesson: "checkpoint-failure-modes-and-atomic-commit-guarantees",
              title: "Checkpoint Failure Modes And Atomic Commit Guarantees",
              order: 5,
            },
            {
              lesson:
                "checkpoint-frequency-balancing-cost-overhead-and-reliability",
              title:
                "Checkpoint Frequency Balancing Cost Overhead And Reliability",
              order: 3,
            },
            {
              lesson:
                "checkpoint-storage-strategy-retention-tiering-and-cost-optimization",
              title:
                "Checkpoint Storage Strategy Retention Tiering And Cost Optimization",
              order: 6,
            },
            {
              lesson:
                "snapshot-and-persist-the-two-phase-checkpointing-protocol",
              title:
                "Snapshot And Persist The Two Phase Checkpointing Protocol",
              order: 2,
            },
            {
              lesson: "what-is-model-checkpointing-and-why-it-matters-at-scale",
              title: "What Is Model Checkpointing And Why It Matters At Scale",
              order: 1,
            },
            {
              lesson: "world-size-agnostic-checkpoints-and-elastic-recovery",
              title: "World Size Agnostic Checkpoints And Elastic Recovery",
              order: 4,
            },
          ],
        },
        {
          subsection: "training-orchestration",
          title: "Training Orchestration",
          lessons: [
            {
              lesson: "choosing-your-orchestration-stack-decision-framework",
              title: "Choosing Your Orchestration Stack Decision Framework",
              order: 6,
            },
            {
              lesson:
                "containerized-vs-shared-environment-isolation-trade-offs",
              title: "Containerized Vs Shared Environment Isolation Trade Offs",
              order: 3,
            },
            {
              lesson:
                "production-implementation-reliability-and-performance-patterns",
              title:
                "Production Implementation Reliability And Performance Patterns",
              order: 5,
            },
            {
              lesson:
                "three-orchestration-tools-airflow-kubeflow-pipelines-and-mlflow-roles",
              title:
                "Three Orchestration Tools Airflow Kubeflow Pipelines And Mlflow Roles",
              order: 2,
            },
            {
              lesson:
                "training-orchestration-coordinating-the-ml-pipeline-as-a-dag",
              title:
                "Training Orchestration Coordinating The Ml Pipeline As A Dag",
              order: 1,
            },
            {
              lesson: "training-orchestration-failure-modes-in-production",
              title: "Training Orchestration Failure Modes In Production",
              order: 4,
            },
          ],
        },
        {
          subsection: "training-serving-skew",
          title: "Training Serving Skew",
          lessons: [
            {
              lesson: "feedback-loops-and-position-bias-in-ranking-systems",
              title: "Feedback Loops And Position Bias In Ranking Systems",
              order: 6,
            },
            {
              lesson:
                "logging-and-measurement-building-training-data-from-production",
              title:
                "Logging And Measurement Building Training Data From Production",
              order: 3,
            },
            {
              lesson:
                "robustness-engineering-training-for-production-realities",
              title: "Robustness Engineering Training For Production Realities",
              order: 5,
            },
            {
              lesson: "single-source-of-truth-unified-feature-definitions",
              title: "Single Source Of Truth Unified Feature Definitions",
              order: 2,
            },
            {
              lesson: "temporal-correctness-and-point-in-time-joins",
              title: "Temporal Correctness And Point In Time Joins",
              order: 4,
            },
            {
              lesson: "what-is-training-serving-skew-and-why-does-it-matter",
              title: "What Is Training Serving Skew And Why Does It Matter",
              order: 1,
            },
          ],
        },
      ],
    },
  ],
};

export default course;
