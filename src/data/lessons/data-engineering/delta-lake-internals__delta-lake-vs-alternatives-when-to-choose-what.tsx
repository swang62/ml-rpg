import type { Component } from "solid-js";

const LessonDeltaLakeInternalsDeltaLakeVsAlternativesWhenToChooseWhat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Delta Lake vs Alternatives: When to Choose What
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Lakehouse Format Landscape:</strong> Delta Lake competes
            with Apache Iceberg and Apache Hudi for the lakehouse transaction
            layer, and indirectly with cloud data warehouses like Snowflake or
            BigQuery. The choice depends on your workload characteristics, team
            expertise, and architectural constraints.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Delta Lake
                </div>
                <div style="font-size: 12px">
                  Simple log, strong Spark integration, streaming focus
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Apache Iceberg
                </div>
                <div style="font-size: 12px">
                  Manifest trees, partition evolution, multi-engine
                </div>
              </div>
            </div>
            <strong>Delta Lake Strengths:</strong> Optimized for Apache Spark
            workloads with tight integration into Databricks. The append only
            log design is conceptually simple and performs well for streaming
            ingestion and time travel queries. Conflict resolution is
            straightforward with optimistic concurrency. Delta handles streaming
            upserts (MERGE operations) reasonably well for moderate update rates
            (thousands of updates per second). It excels when you need exactly
            once streaming semantics and want to avoid managing separate
            streaming and batch pipelines.
            <strong>Apache Iceberg Strengths:</strong> Better partition
            evolution and schema evolution support. Iceberg uses a manifest tree
            structure where metadata points to manifest files that point to data
            files. This adds indirection but enables safer partition changes.
            Iceberg has broader engine support (Spark, Flink, Trino, Presto)
            with less vendor lock in to Databricks. For workloads needing
            complex partition rewrites or multi-region table replication,
            Iceberg's architecture is more flexible. However, this comes at the
            cost of increased metadata complexity and potentially slower
            snapshot reconstruction for very wide tables.
            <strong>Apache Hudi Strengths:</strong> Hudi focuses on high
            throughput upserts and record level indexing. It maintains a Bloom
            filter or HBase index to locate existing records quickly, making it
            ideal for Change Data Capture (CDC) workloads updating millions of
            records per hour. Hudi's copy on write and merge on read storage
            types give fine grained control over read versus write optimization.
            Choose Hudi when your workload is upsert dominated (over 50% of
            operations are updates rather than inserts) and you can afford the
            operational complexity of maintaining indexes.
            <strong>Cloud Data Warehouses:</strong> Snowflake and BigQuery
            provide managed ACID transactions, aggressive query optimization,
            and seamless scaling without tuning file sizes or compaction. They
            typically deliver better out of the box performance for complex
            analytical queries (100ms to 1 second for aggregations over
            terabytes). The trade off is cost and lock in. Snowflake charges per
            second of compute and per TB of storage, which can be 3x to 5x more
            expensive than object storage plus compute for Delta Lake. You also
            lose direct file access for machine learning pipelines.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Choose Delta Lake for Spark heavy pipelines with streaming and
                batch unification. Choose Iceberg for multi-engine access and
                partition evolution. Choose Hudi for upsert heavy CDC workloads.
                Choose cloud warehouses when you need zero operational overhead
                and can afford higher costs."
              </div>
            </div>
            <strong>Decision Criteria:</strong> If over 80% of your data
            engineering team uses Spark and you have streaming workloads
            requiring exactly once semantics, Delta Lake is the default choice.
            If you need Trino or Flink query engines, or plan to change
            partitioning schemes frequently, Iceberg is safer. If you are
            ingesting CDC streams with high update rates (over 100k
            updates/sec), Hudi's indexes provide a significant performance
            advantage.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta Lake is optimized for Spark and streaming workloads,
                  with a simple append only log and strong exactly once
                  semantics, but less flexible for multi-engine access
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Apache Iceberg offers better partition evolution and broader
                  engine support (Spark, Flink, Trino), at the cost of more
                  complex metadata structures and potential snapshot
                  reconstruction overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Apache Hudi excels at high throughput upserts (over 100k
                  updates/sec) using record level indexes (Bloom filters or
                  HBase), ideal for Change Data Capture (CDC) workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cloud data warehouses (Snowflake, BigQuery) provide better
                  query performance (100ms to 1 second for TB scale
                  aggregations) and zero operational overhead, but cost 3x to 5x
                  more and create vendor lock in
                </span>
              </div>
            </div>
          </div>
          <div class="Learn_examplesSection p-4 mb-4">
            <div class="Learn_examplesHeader mb-3 pb-3">📌 Interview Tips</div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">1</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming ingestion at 200k events/sec with exactly once
                  semantics: Delta Lake provides native support. Iceberg
                  requires additional coordination. Hudi is overkill unless you
                  also have heavy upserts.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CDC workload updating 500k records per hour: Hudi's Bloom
                  filter index reduces file scans by 90%. Delta Lake would scan
                  many files per update. Iceberg similar to Delta.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-engine analytics (Spark for ETL, Trino for ad hoc
                  queries): Iceberg has native connectors for both. Delta Lake
                  requires compatibility layers that may lag behind feature
                  releases.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeltaLakeInternalsDeltaLakeVsAlternativesWhenToChooseWhat;
