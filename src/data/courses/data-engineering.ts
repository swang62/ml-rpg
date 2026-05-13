import type { Course } from "~/data/types";

const course: Course = {
  title: "Data Engineering",
  categories: [
    {
      category: "data-governance-lineage",
      title: "Data Governance Lineage",
      subsections: [
        {
          subsection: "access-control-policies",
          title: "Access Control Policies",
          lessons: [
            {
              lesson: "what-is-fine-grained-access-control",
              title: "What Is Fine Grained Access Control",
              order: 1,
            },
            {
              lesson: "how-fgac-works-the-policy-evaluation-flow",
              title: "How Fgac Works The Policy Evaluation Flow",
              order: 2,
            },
            {
              lesson: "fgac-at-production-scale-real-numbers",
              title: "Fgac At Production Scale Real Numbers",
              order: 3,
            },
            {
              lesson: "fgac-design-trade-offs-when-to-use-what",
              title: "Fgac Design Trade Offs When To Use What",
              order: 4,
            },
            {
              lesson: "fgac-failure-modes-and-edge-cases",
              title: "Fgac Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-catalog-systems",
          title: "Data Catalog Systems",
          lessons: [
            {
              lesson: "what-is-a-data-catalog-system",
              title: "What Is A Data Catalog System",
              order: 1,
            },
            {
              lesson: "how-metadata-flows-through-a-catalog-system",
              title: "How Metadata Flows Through A Catalog System",
              order: 2,
            },
            {
              lesson: "search-lineage-and-graph-queries-at-scale",
              title: "Search Lineage And Graph Queries At Scale",
              order: 3,
            },
            {
              lesson: "building-vs-buying-catalog-trade-offs-and-alternatives",
              title: "Building Vs Buying Catalog Trade Offs And Alternatives",
              order: 4,
            },
            {
              lesson: "failure-modes-and-production-edge-cases",
              title: "Failure Modes And Production Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-governance-framework",
          title: "Data Governance Framework",
          lessons: [
            {
              lesson: "what-is-data-governance-framework",
              title: "What Is Data Governance Framework",
              order: 1,
            },
            {
              lesson: "how-governance-enforcement-works-at-scale",
              title: "How Governance Enforcement Works At Scale",
              order: 2,
            },
            {
              lesson: "data-quality-monitoring-and-sla-enforcement",
              title: "Data Quality Monitoring And Sla Enforcement",
              order: 3,
            },
            {
              lesson: "centralized-vs-federated-governance-models",
              title: "Centralized Vs Federated Governance Models",
              order: 4,
            },
            {
              lesson: "failure-modes-and-cross-region-compliance-edge-cases",
              title: "Failure Modes And Cross Region Compliance Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-lineage-tracking",
          title: "Data Lineage Tracking",
          lessons: [
            {
              lesson: "what-is-data-lineage-tracking",
              title: "What Is Data Lineage Tracking",
              order: 1,
            },
            {
              lesson: "lineage-granularity-levels-table-vs-column",
              title: "Lineage Granularity Levels Table Vs Column",
              order: 2,
            },
            {
              lesson: "production-lineage-at-faang-scale",
              title: "Production Lineage At Faang Scale",
              order: 3,
            },
            {
              lesson: "lineage-trade-offs-when-to-go-deep",
              title: "Lineage Trade Offs When To Go Deep",
              order: 4,
            },
            {
              lesson: "lineage-failure-modes-and-edge-cases",
              title: "Lineage Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-masking-anonymization",
          title: "Data Masking Anonymization",
          lessons: [
            {
              lesson: "what-is-data-masking-anonymization",
              title: "What Is Data Masking Anonymization",
              order: 1,
            },
            {
              lesson: "how-masking-works-classification-to-enforcement",
              title: "How Masking Works Classification To Enforcement",
              order: 2,
            },
            {
              lesson: "production-scale-the-full-data-lifecycle",
              title: "Production Scale The Full Data Lifecycle",
              order: 3,
            },
            {
              lesson: "trade-offs-privacy-vs-utility-and-performance",
              title: "Trade Offs Privacy Vs Utility And Performance",
              order: 4,
            },
            {
              lesson: "failure-modes-re-identification-and-operational-risks",
              title: "Failure Modes Re Identification And Operational Risks",
              order: 5,
            },
          ],
        },
        {
          subsection: "gdpr-compliance",
          title: "Gdpr Compliance",
          lessons: [
            {
              lesson: "what-is-gdpr-data-privacy-compliance",
              title: "What Is Gdpr Data Privacy Compliance",
              order: 1,
            },
            {
              lesson: "gdpr-in-distributed-data-pipelines",
              title: "Gdpr In Distributed Data Pipelines",
              order: 2,
            },
            {
              lesson: "privacy-trade-offs-utility-vs-protection",
              title: "Privacy Trade Offs Utility Vs Protection",
              order: 3,
            },
            {
              lesson: "deletion-at-scale-the-right-to-be-forgotten",
              title: "Deletion At Scale The Right To Be Forgotten",
              order: 4,
            },
            {
              lesson: "implementation-patterns-privacy-by-design",
              title: "Implementation Patterns Privacy By Design",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-integration-patterns",
      title: "Data Integration Patterns",
      subsections: [
        {
          subsection: "api-data-ingestion",
          title: "API Data Ingestion",
          lessons: [
            {
              lesson: "what-is-api-based-data-ingestion",
              title: "What Is API Based Data Ingestion",
              order: 1,
            },
            {
              lesson: "four-core-api-ingestion-patterns",
              title: "Four Core API Ingestion Patterns",
              order: 2,
            },
            {
              lesson: "api-ingestion-at-scale-production-reality",
              title: "API Ingestion At Scale Production Reality",
              order: 3,
            },
            {
              lesson:
                "choosing-your-ingestion-pattern-trade-offs-and-decision-criteria",
              title:
                "Choosing Your Ingestion Pattern Trade Offs And Decision Criteria",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-api-ingestion",
              title: "Failure Modes And Edge Cases In API Ingestion",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-federation",
          title: "Data Federation",
          lessons: [
            {
              lesson: "what-is-data-federation",
              title: "What Is Data Federation",
              order: 1,
            },
            {
              lesson: "how-federation-engines-execute-queries",
              title: "How Federation Engines Execute Queries",
              order: 2,
            },
            {
              lesson: "federation-at-production-scale",
              title: "Federation At Production Scale",
              order: 3,
            },
            {
              lesson: "when-to-use-federation-vs-alternatives",
              title: "When To Use Federation Vs Alternatives",
              order: 4,
            },
            {
              lesson: "federation-failure-modes-and-edge-cases",
              title: "Federation Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-mesh-architecture",
          title: "Data Mesh Architecture",
          lessons: [
            {
              lesson: "what-is-data-mesh-architecture",
              title: "What Is Data Mesh Architecture",
              order: 1,
            },
            {
              lesson: "data-products-the-core-building-block",
              title: "Data Products The Core Building Block",
              order: 2,
            },
            {
              lesson:
                "self-serve-platform-standardized-infrastructure-at-scale",
              title: "Self Serve Platform Standardized Infrastructure At Scale",
              order: 3,
            },
            {
              lesson: "when-to-use-data-mesh-vs-alternatives",
              title: "When To Use Data Mesh Vs Alternatives",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-data-mesh",
              title: "Failure Modes And Edge Cases In Data Mesh",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-virtualization",
          title: "Data Virtualization",
          lessons: [
            {
              lesson: "what-is-data-virtualization",
              title: "What Is Data Virtualization",
              order: 1,
            },
            {
              lesson: "how-data-virtualization-works-query-execution",
              title: "How Data Virtualization Works Query Execution",
              order: 2,
            },
            {
              lesson: "data-virtualization-at-scale-production-architecture",
              title: "Data Virtualization At Scale Production Architecture",
              order: 3,
            },
            {
              lesson: "when-to-use-data-virtualization-vs-etl",
              title: "When To Use Data Virtualization Vs ETL",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "multi-cloud-integration",
          title: "Multi Cloud Integration",
          lessons: [
            {
              lesson: "what-is-multi-cloud-data-integration",
              title: "What Is Multi Cloud Data Integration",
              order: 1,
            },
            {
              lesson: "how-multi-cloud-data-integration-actually-works",
              title: "How Multi Cloud Data Integration Actually Works",
              order: 2,
            },
            {
              lesson: "multi-cloud-at-scale-costs-latency-and-real-numbers",
              title: "Multi Cloud At Scale Costs Latency And Real Numbers",
              order: 3,
            },
            {
              lesson: "choosing-multi-cloud-vs-alternatives-decision-framework",
              title: "Choosing Multi Cloud Vs Alternatives Decision Framework",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-multi-cloud-integration",
              title: "Failure Modes And Edge Cases In Multi Cloud Integration",
              order: 5,
            },
          ],
        },
        {
          subsection: "reverse-etl",
          title: "Reverse ETL",
          lessons: [
            {
              lesson: "what-is-reverse-etl",
              title: "What Is Reverse ETL",
              order: 1,
            },
            {
              lesson: "how-reverse-etl-works-the-three-phase-pipeline",
              title: "How Reverse ETL Works The Three Phase Pipeline",
              order: 2,
            },
            {
              lesson: "reverse-etl-at-scale-production-architecture",
              title: "Reverse ETL At Scale Production Architecture",
              order: 3,
            },
            {
              lesson: "when-to-use-reverse-etl-vs-alternatives",
              title: "When To Use Reverse ETL Vs Alternatives",
              order: 4,
            },
            {
              lesson: "reverse-etl-failure-modes-and-edge-cases",
              title: "Reverse ETL Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-lakes-lakehouses",
      title: "Data Lakes Lakehouses",
      subsections: [
        {
          subsection: "data-discovery",
          title: "Data Discovery",
          lessons: [
            {
              lesson: "what-is-data-discovery-search",
              title: "What Is Data Discovery Search",
              order: 1,
            },
            {
              lesson: "metadata-ingestion-and-the-universal-catalog",
              title: "Metadata Ingestion And The Universal Catalog",
              order: 2,
            },
            {
              lesson: "search-indexing-and-serving-at-scale",
              title: "Search Indexing And Serving At Scale",
              order: 3,
            },
            {
              lesson:
                "centralized-vs-federated-catalog-architecture-trade-offs",
              title: "Centralized Vs Federated Catalog Architecture Trade Offs",
              order: 4,
            },
            {
              lesson: "failure-modes-when-discovery-breaks-down",
              title: "Failure Modes When Discovery Breaks Down",
              order: 5,
            },
            {
              lesson: "manual-curation-vs-ai-automation-at-scale",
              title: "Manual Curation Vs Ai Automation At Scale",
              order: 6,
            },
          ],
        },
        {
          subsection: "data-lake-architecture",
          title: "Data Lake Architecture",
          lessons: [
            {
              lesson: "what-is-data-lake-architecture",
              title: "What Is Data Lake Architecture",
              order: 1,
            },
            {
              lesson: "multi-zone-data-lake-patterns-raw-to-curated",
              title: "Multi Zone Data Lake Patterns Raw To Curated",
              order: 2,
            },
            {
              lesson:
                "organizational-patterns-centralized-vs-decentralized-lakes",
              title:
                "Organizational Patterns Centralized Vs Decentralized Lakes",
              order: 3,
            },
            {
              lesson: "when-to-choose-data-lake-vs-data-warehouse-vs-lakehouse",
              title: "When To Choose Data Lake Vs Data Warehouse Vs Lakehouse",
              order: 4,
            },
            {
              lesson:
                "failure-modes-small-file-explosion-and-metadata-overhead",
              title: "Failure Modes Small File Explosion And Metadata Overhead",
              order: 5,
            },
          ],
        },
        {
          subsection: "delta-lake-internals",
          title: "Delta Lake Internals",
          lessons: [
            {
              lesson:
                "what-is-delta-lake-the-transaction-problem-in-data-lakes",
              title: "What Is Delta Lake The Transaction Problem In Data Lakes",
              order: 1,
            },
            {
              lesson: "the-transaction-log-how-delta-lake-tracks-changes",
              title: "The Transaction Log How Delta Lake Tracks Changes",
              order: 2,
            },
            {
              lesson: "optimistic-concurrency-how-multiple-writers-stay-safe",
              title: "Optimistic Concurrency How Multiple Writers Stay Safe",
              order: 3,
            },
            {
              lesson: "delta-lake-vs-alternatives-when-to-choose-what",
              title: "Delta Lake Vs Alternatives When To Choose What",
              order: 4,
            },
            {
              lesson: "failure-modes-and-metadata-management-at-scale",
              title: "Failure Modes And Metadata Management At Scale",
              order: 5,
            },
          ],
        },
        {
          subsection: "hudi-table-format",
          title: "Hudi Table Format",
          lessons: [
            {
              lesson: "what-is-apache-hudi",
              title: "What Is Apache Hudi",
              order: 1,
            },
            {
              lesson: "copy-on-write-vs-merge-on-read-storage",
              title: "Copy On Write Vs Merge On Read Storage",
              order: 2,
            },
            {
              lesson: "the-timeline-and-incremental-queries",
              title: "The Timeline And Incremental Queries",
              order: 3,
            },
            {
              lesson: "when-to-use-hudi-vs-alternatives",
              title: "When To Use Hudi Vs Alternatives",
              order: 4,
            },
            {
              lesson: "failure-modes-and-production-challenges",
              title: "Failure Modes And Production Challenges",
              order: 5,
            },
          ],
        },
        {
          subsection: "iceberg-table-format",
          title: "Iceberg Table Format",
          lessons: [
            {
              lesson: "what-is-apache-iceberg",
              title: "What Is Apache Iceberg",
              order: 1,
            },
            {
              lesson: "how-iceberg-commits-work-snapshot-isolation-mechanics",
              title: "How Iceberg Commits Work Snapshot Isolation Mechanics",
              order: 2,
            },
            {
              lesson: "query-planning-how-metadata-pruning-accelerates-reads",
              title: "Query Planning How Metadata Pruning Accelerates Reads",
              order: 3,
            },
            {
              lesson:
                "iceberg-vs-delta-lake-vs-hudi-choosing-the-right-table-format",
              title:
                "Iceberg Vs Delta Lake Vs Hudi Choosing The Right Table Format",
              order: 4,
            },
            {
              lesson:
                "failure-modes-and-operational-pitfalls-at-petabyte-scale",
              title: "Failure Modes And Operational Pitfalls At Petabyte Scale",
              order: 5,
            },
          ],
        },
        {
          subsection: "lakehouse-architecture",
          title: "Lakehouse Architecture",
          lessons: [
            {
              lesson: "what-is-lakehouse-architecture",
              title: "What Is Lakehouse Architecture",
              order: 1,
            },
            {
              lesson: "how-table-formats-provide-acid-guarantees",
              title: "How Table Formats Provide Acid Guarantees",
              order: 2,
            },
            {
              lesson: "production-scale-partitioning-and-small-file-problem",
              title: "Production Scale Partitioning And Small File Problem",
              order: 3,
            },
            {
              lesson: "choosing-between-delta-iceberg-and-hudi",
              title: "Choosing Between Delta Iceberg And Hudi",
              order: 4,
            },
            {
              lesson: "failure-modes-metadata-concurrency-and-catalog-risks",
              title: "Failure Modes Metadata Concurrency And Catalog Risks",
              order: 5,
            },
          ],
        },
        {
          subsection: "metadata-management",
          title: "Metadata Management",
          lessons: [
            {
              lesson: "what-is-metadata-management-in-data-systems",
              title: "What Is Metadata Management In Data Systems",
              order: 1,
            },
            {
              lesson: "how-metadata-flows-through-the-data-platform",
              title: "How Metadata Flows Through The Data Platform",
              order: 2,
            },
            {
              lesson: "centralized-vs-federated-metadata-the-trade-off",
              title: "Centralized Vs Federated Metadata The Trade Off",
              order: 3,
            },
            {
              lesson: "metadata-catalog-implementation-architecture",
              title: "Metadata Catalog Implementation Architecture",
              order: 4,
            },
            {
              lesson: "metadata-catalog-failure-modes-and-edge-cases",
              title: "Metadata Catalog Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-modeling-schema",
      title: "Data Modeling Schema",
      subsections: [
        {
          subsection: "dimensional-modeling",
          title: "Dimensional Modeling",
          lessons: [
            {
              lesson: "what-is-dimensional-modeling",
              title: "What Is Dimensional Modeling",
              order: 1,
            },
            {
              lesson: "star-schema-vs-snowflake-schema",
              title: "Star Schema Vs Snowflake Schema",
              order: 2,
            },
            {
              lesson: "choosing-the-right-grain-for-fact-tables",
              title: "Choosing The Right Grain For Fact Tables",
              order: 3,
            },
            {
              lesson: "slowly-changing-dimensions-scd",
              title: "Slowly Changing Dimensions Scd",
              order: 4,
            },
            {
              lesson: "common-failure-modes-in-dimensional-models",
              title: "Common Failure Modes In Dimensional Models",
              order: 5,
            },
            {
              lesson: "implementing-dimensional-models-at-scale",
              title: "Implementing Dimensional Models At Scale",
              order: 6,
            },
          ],
        },
        {
          subsection: "event-data-modeling",
          title: "Event Data Modeling",
          lessons: [
            {
              lesson: "what-is-event-data-modeling",
              title: "What Is Event Data Modeling",
              order: 1,
            },
            {
              lesson: "end-to-end-event-data-pipeline-architecture",
              title: "End To End Event Data Pipeline Architecture",
              order: 2,
            },
            {
              lesson: "event-model-schema-design-and-governance",
              title: "Event Model Schema Design And Governance",
              order: 3,
            },
            {
              lesson: "identity-resolution-in-event-models",
              title: "Identity Resolution In Event Models",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-event-data-modeling",
              title: "Failure Modes And Edge Cases In Event Data Modeling",
              order: 5,
            },
            {
              lesson: "storage-and-query-optimization-for-event-models",
              title: "Storage And Query Optimization For Event Models",
              order: 6,
            },
          ],
        },
        {
          subsection: "normalization-denormalization",
          title: "Normalization Denormalization",
          lessons: [
            {
              lesson: "what-is-normalization-and-why-does-it-matter",
              title: "What Is Normalization And Why Does It Matter",
              order: 1,
            },
            {
              lesson: "what-is-denormalization-and-when-do-you-need-it",
              title: "What Is Denormalization And When Do You Need It",
              order: 2,
            },
            {
              lesson:
                "the-cqrs-pattern-bridging-normalized-writes-and-denormalized-reads",
              title:
                "The Cqrs Pattern Bridging Normalized Writes And Denormalized Reads",
              order: 3,
            },
            {
              lesson: "failure-modes-when-denormalization-goes-wrong",
              title: "Failure Modes When Denormalization Goes Wrong",
              order: 4,
            },
            {
              lesson:
                "practical-decision-framework-when-to-normalize-vs-denormalize",
              title:
                "Practical Decision Framework When To Normalize Vs Denormalize",
              order: 5,
            },
          ],
        },
        {
          subsection: "schema-evolution",
          title: "Schema Evolution",
          lessons: [
            {
              lesson: "what-is-schema-evolution-and-why-does-it-matter",
              title: "What Is Schema Evolution And Why Does It Matter",
              order: 1,
            },
            {
              lesson:
                "understanding-compatibility-modes-backward-forward-and-full",
              title:
                "Understanding Compatibility Modes Backward Forward And Full",
              order: 2,
            },
            {
              lesson:
                "schema-registry-centralized-governance-and-version-control",
              title:
                "Schema Registry Centralized Governance And Version Control",
              order: 3,
            },
            {
              lesson:
                "schema-evolution-in-data-lakes-delta-lake-and-iceberg-approaches",
              title:
                "Schema Evolution In Data Lakes Delta Lake And Iceberg Approaches",
              order: 4,
            },
            {
              lesson: "common-failure-modes-and-edge-cases-in-schema-evolution",
              title: "Common Failure Modes And Edge Cases In Schema Evolution",
              order: 5,
            },
            {
              lesson: "expand-and-contract-pattern-for-safe-schema-evolution",
              title: "Expand And Contract Pattern For Safe Schema Evolution",
              order: 6,
            },
          ],
        },
        {
          subsection: "slowly-changing-dimensions",
          title: "Slowly Changing Dimensions",
          lessons: [
            {
              lesson: "what-are-slowly-changing-dimensions-scd",
              title: "What Are Slowly Changing Dimensions Scd",
              order: 1,
            },
            {
              lesson: "scd-type-1-vs-type-2-the-storage-vs-history-tradeoff",
              title: "Scd Type 1 Vs Type 2 The Storage Vs History Tradeoff",
              order: 2,
            },
            {
              lesson: "production-scale-scd-change-detection-and-processing",
              title: "Production Scale Scd Change Detection And Processing",
              order: 3,
            },
            {
              lesson: "scd-failure-modes-overlapping-periods-and-late-facts",
              title: "Scd Failure Modes Overlapping Periods And Late Facts",
              order: 4,
            },
            {
              lesson: "alternative-scd-types-type-3-type-4-and-hybrid-patterns",
              title: "Alternative Scd Types Type 3 Type 4 And Hybrid Patterns",
              order: 5,
            },
          ],
        },
        {
          subsection: "time-series-modeling",
          title: "Time Series Modeling",
          lessons: [
            {
              lesson:
                "what-is-time-series-data-and-why-does-it-need-special-modeling",
              title:
                "What Is Time Series Data And Why Does It Need Special Modeling",
              order: 1,
            },
            {
              lesson:
                "time-partitioning-and-storage-tiers-how-systems-scale-billions-of-points",
              title:
                "Time Partitioning And Storage Tiers How Systems Scale Billions Of Points",
              order: 2,
            },
            {
              lesson:
                "cardinality-explosion-the-silent-killer-of-time-series-systems",
              title:
                "Cardinality Explosion The Silent Killer Of Time Series Systems",
              order: 3,
            },
            {
              lesson:
                "downsampling-and-rollups-balancing-resolution-storage-and-query-performance",
              title:
                "Downsampling And Rollups Balancing Resolution Storage And Query Performance",
              order: 4,
            },
            {
              lesson:
                "out-of-order-and-late-arriving-data-handling-time-series-reality",
              title:
                "Out Of Order And Late Arriving Data Handling Time Series Reality",
              order: 5,
            },
            {
              lesson:
                "retention-policies-and-data-lifecycle-balancing-cost-compliance-and-query-needs",
              title:
                "Retention Policies And Data Lifecycle Balancing Cost Compliance And Query Needs",
              order: 6,
            },
          ],
        },
      ],
    },
    {
      category: "data-pipelines-orchestration",
      title: "Data Pipelines Orchestration",
      subsections: [
        {
          subsection: "backfill-strategies",
          title: "Backfill Strategies",
          lessons: [
            {
              lesson: "what-is-backfill-reprocessing",
              title: "What Is Backfill Reprocessing",
              order: 1,
            },
            {
              lesson: "how-backfill-reprocessing-work",
              title: "How Backfill Reprocessing Work",
              order: 2,
            },
            {
              lesson: "production-reality-scale-validation",
              title: "Production Reality Scale Validation",
              order: 3,
            },
            {
              lesson: "trade-offs-full-vs-incremental-backfill",
              title: "Trade Offs Full Vs Incremental Backfill",
              order: 4,
            },
            {
              lesson: "failure-modes-idempotency",
              title: "Failure Modes Idempotency",
              order: 5,
            },
            {
              lesson: "advanced-incremental-state-dependency-management",
              title: "Advanced Incremental State Dependency Management",
              order: 6,
            },
          ],
        },
        {
          subsection: "dag-orchestration",
          title: "Dag Orchestration",
          lessons: [
            {
              lesson: "what-is-dag-based-orchestration",
              title: "What Is Dag Based Orchestration",
              order: 1,
            },
            {
              lesson: "how-dag-orchestrators-execute-tasks",
              title: "How Dag Orchestrators Execute Tasks",
              order: 2,
            },
            {
              lesson: "dag-orchestration-at-production-scale",
              title: "Dag Orchestration At Production Scale",
              order: 3,
            },
            {
              lesson: "choosing-dag-orchestration-vs-alternatives",
              title: "Choosing Dag Orchestration Vs Alternatives",
              order: 4,
            },
            {
              lesson: "dag-orchestration-failure-modes",
              title: "Dag Orchestration Failure Modes",
              order: 5,
            },
            {
              lesson: "advanced-dag-patterns-and-optimizations",
              title: "Advanced Dag Patterns And Optimizations",
              order: 6,
            },
          ],
        },
        {
          subsection: "dependency-management",
          title: "Dependency Management",
          lessons: [
            {
              lesson: "what-is-cross-pipeline-dependency-management",
              title: "What Is Cross Pipeline Dependency Management",
              order: 1,
            },
            {
              lesson: "how-dependency-resolution-works-polling-vs-event-driven",
              title: "How Dependency Resolution Works Polling Vs Event Driven",
              order: 2,
            },
            {
              lesson: "production-scale-metadata-stores-and-dataset-tracking",
              title: "Production Scale Metadata Stores And Dataset Tracking",
              order: 3,
            },
            {
              lesson: "trade-offs-tight-vs-loose-coupling",
              title: "Trade Offs Tight Vs Loose Coupling",
              order: 4,
            },
            {
              lesson:
                "failure-modes-upstream-delays-and-cascading-sla-violations",
              title:
                "Failure Modes Upstream Delays And Cascading Sla Violations",
              order: 5,
            },
            {
              lesson: "advanced-patterns-dataset-aware-orchestration",
              title: "Advanced Patterns Dataset Aware Orchestration",
              order: 6,
            },
          ],
        },
        {
          subsection: "pipeline-architecture-patterns",
          title: "Pipeline Architecture Patterns",
          lessons: [
            {
              lesson: "what-is-pipeline-architecture",
              title: "What Is Pipeline Architecture",
              order: 1,
            },
            {
              lesson: "pipeline-stage-design-and-contracts",
              title: "Pipeline Stage Design And Contracts",
              order: 2,
            },
            {
              lesson: "production-pipeline-at-scale",
              title: "Production Pipeline At Scale",
              order: 3,
            },
            {
              lesson: "pipeline-architecture-trade-offs-and-alternatives",
              title: "Pipeline Architecture Trade Offs And Alternatives",
              order: 4,
            },
            {
              lesson: "pipeline-failure-modes-and-edge-cases",
              title: "Pipeline Failure Modes And Edge Cases",
              order: 5,
            },
            {
              lesson: "advanced-pipeline-patterns-and-observability",
              title: "Advanced Pipeline Patterns And Observability",
              order: 6,
            },
          ],
        },
        {
          subsection: "pipeline-idempotency",
          title: "Pipeline Idempotency",
          lessons: [
            {
              lesson: "what-is-idempotency-in-data-pipelines",
              title: "What Is Idempotency In Data Pipelines",
              order: 1,
            },
            {
              lesson: "how-idempotency-works-keys-and-upserts",
              title: "How Idempotency Works Keys And Upserts",
              order: 2,
            },
            {
              lesson: "idempotency-at-production-scale",
              title: "Idempotency At Production Scale",
              order: 3,
            },
            {
              lesson: "trade-offs-append-only-vs-idempotent-upserts",
              title: "Trade Offs Append Only Vs Idempotent Upserts",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-idempotent-pipelines",
              title: "Failure Modes And Edge Cases In Idempotent Pipelines",
              order: 5,
            },
          ],
        },
        {
          subsection: "pipeline-monitoring-alerting",
          title: "Pipeline Monitoring Alerting",
          lessons: [
            {
              lesson: "what-is-pipeline-monitoring-alerting",
              title: "What Is Pipeline Monitoring Alerting",
              order: 1,
            },
            {
              lesson: "how-pipeline-monitoring-works-end-to-end",
              title: "How Pipeline Monitoring Works End To End",
              order: 2,
            },
            {
              lesson: "production-scale-monitoring-challenges",
              title: "Production Scale Monitoring Challenges",
              order: 3,
            },
            {
              lesson: "monitoring-trade-offs-when-to-choose-what",
              title: "Monitoring Trade Offs When To Choose What",
              order: 4,
            },
            {
              lesson: "failure-modes-when-monitoring-breaks-down",
              title: "Failure Modes When Monitoring Breaks Down",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-processing",
      title: "Data Processing",
      subsections: [
        {
          subsection: "change-data-capture",
          title: "Change Data Capture",
          lessons: [
            {
              lesson: "what-is-change-data-capture-cdc",
              title: "What Is Change Data Capture Cdc",
              order: 1,
            },
            {
              lesson: "cdc-event-structure-and-delivery-guarantees",
              title: "Cdc Event Structure And Delivery Guarantees",
              order: 2,
            },
            {
              lesson: "cdc-capacity-planning-and-flow-control",
              title: "Cdc Capacity Planning And Flow Control",
              order: 3,
            },
            {
              lesson: "cdc-failure-modes-and-edge-cases",
              title: "Cdc Failure Modes And Edge Cases",
              order: 4,
            },
          ],
        },
        {
          subsection: "data-warehousing",
          title: "Data Warehousing",
          lessons: [
            {
              lesson: "what-is-data-warehouse-architecture",
              title: "What Is Data Warehouse Architecture",
              order: 1,
            },
            {
              lesson: "kimball-vs-inmon-two-design-philosophies",
              title: "Kimball Vs Inmon Two Design Philosophies",
              order: 2,
            },
            {
              lesson: "etl-vs-elt-where-to-transform-data",
              title: "ETL Vs Elt Where To Transform Data",
              order: 3,
            },
            {
              lesson: "dimensional-modeling-star-and-snowflake-schemas",
              title: "Dimensional Modeling Star And Snowflake Schemas",
              order: 4,
            },
            {
              lesson: "cost-blow-ups-and-performance-pathologies",
              title: "Cost Blow Ups And Performance Pathologies",
              order: 5,
            },
            {
              lesson: "production-implementation-patterns",
              title: "Production Implementation Patterns",
              order: 6,
            },
          ],
        },
        {
          subsection: "etl-pipelines",
          title: "ETL Pipelines",
          lessons: [
            {
              lesson:
                "extract-transform-load-etl-vs-extract-load-transform-elt-timing-and-trade-offs",
              title:
                "Extract Transform Load ETL Vs Extract Load Transform Elt Timing And Trade Offs",
              order: 1,
            },
            {
              lesson:
                "batch-vs-streaming-latency-cost-and-operational-complexity",
              title:
                "Batch Vs Streaming Latency Cost And Operational Complexity",
              order: 2,
            },
            {
              lesson:
                "change-data-capture-cdc-capturing-deltas-with-log-sequence-numbers-and-idempotency",
              title:
                "Change Data Capture Cdc Capturing Deltas With Log Sequence Numbers And Idempotency",
              order: 3,
            },
            {
              lesson:
                "storage-layout-and-compaction-file-sizing-partitioning-and-the-small-files-problem",
              title:
                "Storage Layout And Compaction File Sizing Partitioning And The Small Files Problem",
              order: 4,
            },
            {
              lesson:
                "idempotency-deduplication-and-exactly-once-illusions-in-distributed-pipelines",
              title:
                "Idempotency Deduplication And Exactly Once Illusions In Distributed Pipelines",
              order: 5,
            },
            {
              lesson:
                "orchestration-backfills-and-failure-handling-dags-retries-and-priority-queues",
              title:
                "Orchestration Backfills And Failure Handling Dags Retries And Priority Queues",
              order: 6,
            },
          ],
        },
        {
          subsection: "mapreduce",
          title: "Mapreduce",
          lessons: [
            {
              lesson: "what-is-mapreduce-core-model-and-execution-flow",
              title: "What Is Mapreduce Core Model And Execution Flow",
              order: 1,
            },
            {
              lesson:
                "batch-processing-performance-model-io-bounds-and-capacity-planning",
              title:
                "Batch Processing Performance Model Io Bounds And Capacity Planning",
              order: 2,
            },
            {
              lesson:
                "cloud-era-mapreduce-disaggregated-storage-and-elastic-compute",
              title:
                "Cloud Era Mapreduce Disaggregated Storage And Elastic Compute",
              order: 3,
            },
            {
              lesson:
                "mapreduce-failure-modes-stragglers-skew-and-shuffle-blowup",
              title:
                "Mapreduce Failure Modes Stragglers Skew And Shuffle Blowup",
              order: 4,
            },
            {
              lesson:
                "when-not-to-use-mapreduce-latency-iteration-and-architectural-alternatives",
              title:
                "When Not To Use Mapreduce Latency Iteration And Architectural Alternatives",
              order: 5,
            },
            {
              lesson:
                "mapreduce-implementation-deep-dive-combiners-partitioners-and-skew-handling",
              title:
                "Mapreduce Implementation Deep Dive Combiners Partitioners And Skew Handling",
              order: 6,
            },
          ],
        },
        {
          subsection: "newsfeed-timeline",
          title: "Newsfeed Timeline",
          lessons: [
            {
              lesson: "fanout-on-write-push-pattern-for-timeline-generation",
              title: "Fanout On Write Push Pattern For Timeline Generation",
              order: 1,
            },
            {
              lesson: "fanout-on-read-pull-pattern-for-timeline-generation",
              title: "Fanout On Read Pull Pattern For Timeline Generation",
              order: 2,
            },
            {
              lesson:
                "hybrid-push-pull-pattern-for-celebrity-hotspot-mitigation",
              title:
                "Hybrid Push Pull Pattern For Celebrity Hotspot Mitigation",
              order: 3,
            },
            {
              lesson: "timeline-storage-caching-and-slo-management",
              title: "Timeline Storage Caching And Slo Management",
              order: 4,
            },
            {
              lesson: "ranking-personalization-and-merge-strategies",
              title: "Ranking Personalization And Merge Strategies",
              order: 5,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-timeline-systems",
              title: "Failure Modes And Edge Cases In Timeline Systems",
              order: 6,
            },
          ],
        },
        {
          subsection: "oltp-vs-olap",
          title: "Oltp Vs Olap",
          lessons: [
            {
              lesson:
                "what-are-oltp-and-olap-core-characteristics-and-workload-shapes",
              title:
                "What Are Oltp And Olap Core Characteristics And Workload Shapes",
              order: 1,
            },
            {
              lesson:
                "production-architecture-how-companies-separate-oltp-from-olap",
              title:
                "Production Architecture How Companies Separate Oltp From Olap",
              order: 2,
            },
            {
              lesson:
                "storage-and-access-optimization-row-vs-column-indexes-and-partitioning",
              title:
                "Storage And Access Optimization Row Vs Column Indexes And Partitioning",
              order: 3,
            },
            {
              lesson:
                "key-tradeoffs-normalization-consistency-freshness-and-cost-models",
              title:
                "Key Tradeoffs Normalization Consistency Freshness And Cost Models",
              order: 4,
            },
            {
              lesson:
                "failure-modes-replication-lag-cdc-gaps-schema-drift-and-runaway-costs",
              title:
                "Failure Modes Replication Lag Cdc Gaps Schema Drift And Runaway Costs",
              order: 5,
            },
            {
              lesson:
                "implementation-streaming-cdc-scd-modeling-query-guardrails-and-observability",
              title:
                "Implementation Streaming Cdc Scd Modeling Query Guardrails And Observability",
              order: 6,
            },
          ],
        },
        {
          subsection: "stream-processing",
          title: "Stream Processing",
          lessons: [
            {
              lesson:
                "stream-processing-core-model-unbounded-logs-partitions-and-event-time",
              title:
                "Stream Processing Core Model Unbounded Logs Partitions And Event Time",
              order: 1,
            },
            {
              lesson:
                "stateful-stream-processing-local-state-checkpoints-and-fault-tolerance",
              title:
                "Stateful Stream Processing Local State Checkpoints And Fault Tolerance",
              order: 2,
            },
            {
              lesson:
                "embedded-library-vs-dedicated-engine-kafka-streams-vs-flink-trade-offs",
              title:
                "Embedded Library Vs Dedicated Engine Kafka Streams Vs Flink Trade Offs",
              order: 3,
            },
            {
              lesson:
                "stream-processing-failure-modes-backpressure-hot-keys-and-checkpoint-stalls",
              title:
                "Stream Processing Failure Modes Backpressure Hot Keys And Checkpoint Stalls",
              order: 4,
            },
            {
              lesson:
                "production-patterns-multi-cluster-ha-exactly-once-sinks-and-capacity-planning",
              title:
                "Production Patterns Multi Cluster Ha Exactly Once Sinks And Capacity Planning",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-quality-validation",
      title: "Data Quality Validation",
      subsections: [
        {
          subsection: "anomaly-detection-data",
          title: "Anomaly Detection Data",
          lessons: [
            {
              lesson: "what-is-data-anomaly-detection",
              title: "What Is Data Anomaly Detection",
              order: 1,
            },
            {
              lesson: "how-anomaly-detection-works-rules-vs-models",
              title: "How Anomaly Detection Works Rules Vs Models",
              order: 2,
            },
            {
              lesson: "production-scale-detection-architecture",
              title: "Production Scale Detection Architecture",
              order: 3,
            },
            {
              lesson: "choosing-detection-strategies-when-to-use-what",
              title: "Choosing Detection Strategies When To Use What",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-contracts",
          title: "Data Contracts",
          lessons: [
            {
              lesson: "what-are-data-contracts-and-slas",
              title: "What Are Data Contracts And Slas",
              order: 1,
            },
            {
              lesson: "how-data-contracts-work-at-scale",
              title: "How Data Contracts Work At Scale",
              order: 2,
            },
            {
              lesson: "implementation-building-the-contract-infrastructure",
              title: "Implementation Building The Contract Infrastructure",
              order: 3,
            },
            {
              lesson: "trade-offs-strict-vs-flexible-contracts",
              title: "Trade Offs Strict Vs Flexible Contracts",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-profiling",
          title: "Data Profiling",
          lessons: [
            {
              lesson: "what-is-data-profiling",
              title: "What Is Data Profiling",
              order: 1,
            },
            {
              lesson: "how-data-profiling-works-at-scale",
              title: "How Data Profiling Works At Scale",
              order: 2,
            },
            {
              lesson: "production-integration-and-workflow",
              title: "Production Integration And Workflow",
              order: 3,
            },
            {
              lesson: "full-scan-vs-sampling-trade-offs",
              title: "Full Scan Vs Sampling Trade Offs",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-quality-dimensions",
          title: "Data Quality Dimensions",
          lessons: [
            {
              lesson: "what-are-data-quality-dimensions",
              title: "What Are Data Quality Dimensions",
              order: 1,
            },
            {
              lesson: "how-data-quality-dimensions-work-across-the-pipeline",
              title: "How Data Quality Dimensions Work Across The Pipeline",
              order: 2,
            },
            {
              lesson: "production-reality-quality-at-netflix-and-uber-scale",
              title: "Production Reality Quality At Netflix And Uber Scale",
              order: 3,
            },
            {
              lesson: "trade-offs-when-to-enforce-strict-vs-eventual-quality",
              title: "Trade Offs When To Enforce Strict Vs Eventual Quality",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-data-quality",
              title: "Failure Modes And Edge Cases In Data Quality",
              order: 5,
            },
          ],
        },
        {
          subsection: "data-reconciliation",
          title: "Data Reconciliation",
          lessons: [
            {
              lesson: "what-is-data-reconciliation",
              title: "What Is Data Reconciliation",
              order: 1,
            },
            {
              lesson: "how-reconciliation-works-at-scale",
              title: "How Reconciliation Works At Scale",
              order: 2,
            },
            {
              lesson: "completeness-vs-cost-the-reconciliation-trade-off",
              title: "Completeness Vs Cost The Reconciliation Trade Off",
              order: 3,
            },
            {
              lesson: "key-mismatch-failures-and-sampling-pitfalls",
              title: "Key Mismatch Failures And Sampling Pitfalls",
              order: 4,
            },
          ],
        },
        {
          subsection: "schema-validation",
          title: "Schema Validation",
          lessons: [
            {
              lesson: "what-is-schema-validation-enforcement",
              title: "What Is Schema Validation Enforcement",
              order: 1,
            },
            {
              lesson: "end-to-end-schema-validation-architecture",
              title: "End To End Schema Validation Architecture",
              order: 2,
            },
            {
              lesson: "schema-validation-trade-offs-flexibility-vs-safety",
              title: "Schema Validation Trade Offs Flexibility Vs Safety",
              order: 3,
            },
            {
              lesson: "schema-enforcement-modes-and-evolution-policies",
              title: "Schema Enforcement Modes And Evolution Policies",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-at-scale",
              title: "Failure Modes And Edge Cases At Scale",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-storage-formats",
      title: "Data Storage Formats",
      subsections: [
        {
          subsection: "avro-schema-registry",
          title: "Avro Schema Registry",
          lessons: [
            {
              lesson: "what-is-avro-schema-registry",
              title: "What Is Avro Schema Registry",
              order: 1,
            },
            {
              lesson: "how-avro-schema-resolution-works",
              title: "How Avro Schema Resolution Works",
              order: 2,
            },
            {
              lesson: "avro-in-production-data-pipelines",
              title: "Avro In Production Data Pipelines",
              order: 3,
            },
            {
              lesson: "avro-vs-alternatives-when-to-choose-what",
              title: "Avro Vs Alternatives When To Choose What",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "compression-algorithms",
          title: "Compression Algorithms",
          lessons: [
            {
              lesson: "what-is-compression-and-why-does-it-matter-at-scale",
              title: "What Is Compression And Why Does It Matter At Scale",
              order: 1,
            },
            {
              lesson:
                "how-compression-algorithms-work-building-blocks-and-common-codecs",
              title:
                "How Compression Algorithms Work Building Blocks And Common Codecs",
              order: 2,
            },
            {
              lesson:
                "production-compression-in-data-pipelines-layered-optimization",
              title:
                "Production Compression In Data Pipelines Layered Optimization",
              order: 3,
            },
            {
              lesson:
                "choosing-the-right-codec-trade-offs-and-decision-framework",
              title:
                "Choosing The Right Codec Trade Offs And Decision Framework",
              order: 4,
            },
            {
              lesson: "failure-modes-and-advanced-implementation-patterns",
              title: "Failure Modes And Advanced Implementation Patterns",
              order: 5,
            },
          ],
        },
        {
          subsection: "encoding-strategies",
          title: "Encoding Strategies",
          lessons: [
            {
              lesson:
                "understanding-encoding-strategies-dictionary-rle-and-delta",
              title:
                "Understanding Encoding Strategies Dictionary Rle And Delta",
              order: 1,
            },
            {
              lesson: "how-dictionary-and-rle-encoding-work-at-scale",
              title: "How Dictionary And Rle Encoding Work At Scale",
              order: 2,
            },
            {
              lesson:
                "production-scale-bigquery-snowflake-and-data-lake-encoding",
              title:
                "Production Scale Bigquery Snowflake And Data Lake Encoding",
              order: 3,
            },
            {
              lesson: "choosing-encoding-strategies-when-to-use-what",
              title: "Choosing Encoding Strategies When To Use What",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases-in-encoding-strategies",
              title: "Failure Modes And Edge Cases In Encoding Strategies",
              order: 5,
            },
          ],
        },
        {
          subsection: "file-partitioning",
          title: "File Partitioning",
          lessons: [
            {
              lesson: "what-is-file-level-partitioning",
              title: "What Is File Level Partitioning",
              order: 1,
            },
            {
              lesson: "partition-strategies-and-directory-layout",
              title: "Partition Strategies And Directory Layout",
              order: 2,
            },
            {
              lesson: "the-small-file-problem-and-compaction",
              title: "The Small File Problem And Compaction",
              order: 3,
            },
            {
              lesson: "choosing-partitions-trade-offs-and-decision-framework",
              title: "Choosing Partitions Trade Offs And Decision Framework",
              order: 4,
            },
            {
              lesson: "failure-modes-skew-late-data-and-evolution",
              title: "Failure Modes Skew Late Data And Evolution",
              order: 5,
            },
          ],
        },
        {
          subsection: "orc-format",
          title: "Orc Format",
          lessons: [
            {
              lesson: "what-is-orc-format",
              title: "What Is Orc Format",
              order: 1,
            },
            {
              lesson: "how-orc-stripe-architecture-works",
              title: "How Orc Stripe Architecture Works",
              order: 2,
            },
            {
              lesson: "orc-in-production-data-pipelines",
              title: "Orc In Production Data Pipelines",
              order: 3,
            },
            {
              lesson: "orc-vs-parquet-vs-avro-trade-offs",
              title: "Orc Vs Parquet Vs Avro Trade Offs",
              order: 4,
            },
            {
              lesson: "orc-failure-modes-and-edge-cases",
              title: "Orc Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "parquet-internals",
          title: "Parquet Internals",
          lessons: [
            {
              lesson: "what-is-parquet-format",
              title: "What Is Parquet Format",
              order: 1,
            },
            {
              lesson: "parquet-file-structure-and-metadata",
              title: "Parquet File Structure And Metadata",
              order: 2,
            },
            {
              lesson: "parquet-in-production-at-scale",
              title: "Parquet In Production At Scale",
              order: 3,
            },
            {
              lesson: "when-to-use-parquet-vs-alternatives",
              title: "When To Use Parquet Vs Alternatives",
              order: 4,
            },
            {
              lesson: "parquet-failure-modes-and-edge-cases",
              title: "Parquet Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "row-vs-columnar",
          title: "Row Vs Columnar",
          lessons: [
            {
              lesson: "what-is-row-vs-columnar-storage",
              title: "What Is Row Vs Columnar Storage",
              order: 1,
            },
            {
              lesson: "how-row-and-columnar-formats-actually-work",
              title: "How Row And Columnar Formats Actually Work",
              order: 2,
            },
            {
              lesson: "production-architecture-oltp-and-olap-together",
              title: "Production Architecture Oltp And Olap Together",
              order: 3,
            },
            {
              lesson:
                "choosing-between-row-and-columnar-trade-offs-and-decision-criteria",
              title:
                "Choosing Between Row And Columnar Trade Offs And Decision Criteria",
              order: 4,
            },
            {
              lesson: "failure-modes-and-edge-cases",
              title: "Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
      ],
    },
    {
      category: "data-warehousing",
      title: "Data Warehousing",
      subsections: [
        {
          subsection: "dw-columnar-storage",
          title: "Dw Columnar Storage",
          lessons: [
            {
              lesson: "what-is-columnar-storage",
              title: "What Is Columnar Storage",
              order: 1,
            },
            {
              lesson: "columnar-storage-internal-architecture",
              title: "Columnar Storage Internal Architecture",
              order: 2,
            },
            {
              lesson: "columnar-storage-at-production-scale",
              title: "Columnar Storage At Production Scale",
              order: 3,
            },
            {
              lesson: "when-to-use-columnar-vs-row-storage",
              title: "When To Use Columnar Vs Row Storage",
              order: 4,
            },
            {
              lesson: "columnar-storage-failure-modes-and-edge-cases",
              title: "Columnar Storage Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "dw-query-optimization",
          title: "Dw Query Optimization",
          lessons: [
            {
              lesson: "what-is-query-optimization",
              title: "What Is Query Optimization",
              order: 1,
            },
            {
              lesson: "how-query-optimizers-choose-execution-plans",
              title: "How Query Optimizers Choose Execution Plans",
              order: 2,
            },
            {
              lesson: "query-optimization-at-warehouse-scale",
              title: "Query Optimization At Warehouse Scale",
              order: 3,
            },
            {
              lesson: "when-to-precompute-vs-optimize-ad-hoc-queries",
              title: "When To Precompute Vs Optimize Ad Hoc Queries",
              order: 4,
            },
            {
              lesson: "query-optimizer-failure-modes-and-edge-cases",
              title: "Query Optimizer Failure Modes And Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "materialized-views",
          title: "Materialized Views",
          lessons: [
            {
              lesson: "what-are-materialized-views",
              title: "What Are Materialized Views",
              order: 1,
            },
            {
              lesson: "layered-aggregation-architecture",
              title: "Layered Aggregation Architecture",
              order: 2,
            },
            {
              lesson: "freshness-vs-latency-trade-offs",
              title: "Freshness Vs Latency Trade Offs",
              order: 3,
            },
            {
              lesson: "refresh-strategies-and-maintenance-patterns",
              title: "Refresh Strategies And Maintenance Patterns",
              order: 4,
            },
            {
              lesson: "failure-modes-and-production-edge-cases",
              title: "Failure Modes And Production Edge Cases",
              order: 5,
            },
          ],
        },
        {
          subsection: "warehouse-architecture",
          title: "Warehouse Architecture",
          lessons: [
            {
              lesson: "what-is-a-modern-data-warehouse",
              title: "What Is A Modern Data Warehouse",
              order: 1,
            },
            {
              lesson: "how-modern-warehouse-architecture-works-at-scale",
              title: "How Modern Warehouse Architecture Works At Scale",
              order: 2,
            },
            {
              lesson:
                "production-reality-concurrency-governance-and-operational-limits",
              title:
                "Production Reality Concurrency Governance And Operational Limits",
              order: 3,
            },
            {
              lesson: "trade-offs-data-warehouse-vs-lake-vs-lakehouse",
              title: "Trade Offs Data Warehouse Vs Lake Vs Lakehouse",
              order: 4,
            },
            {
              lesson: "failure-modes-what-breaks-at-10x-scale",
              title: "Failure Modes What Breaks At 10X Scale",
              order: 5,
            },
            {
              lesson: "advanced-pattern-separation-of-storage-and-compute",
              title: "Advanced Pattern Separation Of Storage And Compute",
              order: 6,
            },
          ],
        },
        {
          subsection: "warehouse-cost-optimization",
          title: "Warehouse Cost Optimization",
          lessons: [
            {
              lesson: "what-is-cost-optimization-in-data-engineering",
              title: "What Is Cost Optimization In Data Engineering",
              order: 1,
            },
            {
              lesson: "how-data-layout-reduces-query-costs",
              title: "How Data Layout Reduces Query Costs",
              order: 2,
            },
            {
              lesson: "workload-isolation-and-right-sizing-compute",
              title: "Workload Isolation And Right Sizing Compute",
              order: 3,
            },
            {
              lesson:
                "cost-optimization-trade-offs-when-to-optimize-vs-accept-higher-costs",
              title:
                "Cost Optimization Trade Offs When To Optimize Vs Accept Higher Costs",
              order: 4,
            },
            {
              lesson: "failure-modes-and-cost-monitoring-at-scale",
              title: "Failure Modes And Cost Monitoring At Scale",
              order: 5,
            },
          ],
        },
        {
          subsection: "warehouse-partitioning-clustering",
          title: "Warehouse Partitioning Clustering",
          lessons: [
            {
              lesson: "what-is-partitioning-and-clustering",
              title: "What Is Partitioning And Clustering",
              order: 1,
            },
            {
              lesson: "how-partition-pruning-and-data-skipping-work",
              title: "How Partition Pruning And Data Skipping Work",
              order: 2,
            },
            {
              lesson:
                "production-scale-partitioning-at-400-billion-events-per-day",
              title:
                "Production Scale Partitioning At 400 Billion Events Per Day",
              order: 3,
            },
            {
              lesson: "when-to-use-partitioning-vs-alternatives",
              title: "When To Use Partitioning Vs Alternatives",
              order: 4,
            },
            {
              lesson: "failure-modes-hot-partitions-and-clustering-degradation",
              title: "Failure Modes Hot Partitions And Clustering Degradation",
              order: 5,
            },
          ],
        },
      ],
    },
  ],
};

export default course;
