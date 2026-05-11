import type { Component } from "solid-js";

const LessonIcebergTableFormatIcebergVsDeltaLakeVsHudiChoosingTheRightTableFormat: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Iceberg vs Delta Lake vs Hudi: Choosing the Right Table Format
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Landscape:</strong>
            Three open source table formats dominate the data lakehouse space:
            Apache Iceberg, Delta Lake, and Apache Hudi. All three bring ACID
            transactions and schema evolution to data lakes, but they differ in
            design philosophy, engine support, and optimization focus. The
            choice depends on your ecosystem, workload patterns, and operational
            preferences.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Iceberg Strength
                </div>
                <div style="font-size: 12px">
                  Engine agnostic design, clean format spec, strong multi engine
                  interoperability
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Delta Lake Strength
                </div>
                <div style="font-size: 12px">
                  Deep Spark integration, simpler operations if fully on
                  Databricks stack
                </div>
              </div>
            </div>
            <strong>Iceberg Characteristics:</strong>
            Iceberg emphasizes clean separation between format specification and
            compute engines. The format is well documented, engine neutral, and
            supports native reads and writes from Spark, Flink, Trino, Presto,
            Hive, Impala, and more. Metadata is based on immutable snapshots
            with explicit manifest files. Hidden partitioning allows partition
            evolution without rewriting data. Catalog abstraction supports Hive
            Metastore, AWS Glue, Nessie, REST catalogs, and custom
            implementations. Operationally, you run separate compaction and
            maintenance jobs. Performance scales well to petabytes and millions
            of files when properly tuned. Companies like Netflix, Apple, and
            Adobe use Iceberg for multi petabyte analytical workloads with
            dozens of different query engines accessing the same tables.
            <strong>Delta Lake Characteristics:</strong>
            Delta Lake integrates tightly with Apache Spark and the Databricks
            ecosystem. The transaction log uses JSON files that list file
            additions and removals per commit. Originally Databricks
            proprietary, it opened and now has a protocol spec, but Spark
            remains the primary engine with best support. Other engines can read
            Delta tables through connectors, but write support varies. Delta
            excels in environments where Spark is the dominant compute engine.
            It has mature tooling for streaming upserts, time travel, and schema
            enforcement within the Spark ecosystem. Databricks provides managed
            Delta Lake services with automatic optimization. If you are all in
            on Databricks or Spark centric, Delta can be simpler to operate than
            Iceberg.
            <strong>Hudi Characteristics:</strong>
            Apache Hudi optimizes for streaming upsert workloads and incremental
            processing. It supports two table types: Copy on Write (COW) for
            read heavy workloads and Merge on Read (MOR) for write heavy
            workloads with faster ingestion. Hudi tracks record level changes
            efficiently, making it strong for Change Data Capture (CDC) use
            cases. However, adoption is narrower than Iceberg or Delta, and
            engine support is more limited.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Decision Framework:
            </div>
            Choose Iceberg when you need strong multi engine interoperability.
            If your data is queried by Spark batch jobs, Flink streaming, Trino
            interactive queries, and AWS Athena, Iceberg provides the most
            consistent experience across all of them. It is also the best choice
            if you expect to evolve partitioning schemes or need advanced
            catalog features. Choose Delta Lake when you are heavily invested in
            the Spark or Databricks ecosystem and value tight integration over
            broad engine support. If 90% of your workload runs on Databricks and
            you want managed services handling optimization, Delta simplifies
            operations. Be aware that migrating away later may be harder due to
            ecosystem lock in. Choose Hudi when your primary use case is high
            frequency upserts from streaming pipelines, especially CDC
            scenarios. If you are ingesting database change logs and need
            efficient record level updates at scale, Hudi's MOR tables can
            outperform Iceberg or Delta. However, expect more operational
            complexity and narrower tooling support.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "Iceberg is the POSIX of table formats: a clean spec that many
                engines implement well. Delta is the iOS: great if you stay in
                the ecosystem. Hudi is the specialized tool: best at one thing
                (upserts) but harder everywhere else."
              </div>
            </div>
            <strong>Migration and Compatibility:</strong>
            All three support time travel and schema evolution, but the details
            differ. Iceberg uses column IDs for schema evolution, making it more
            flexible. Delta uses column names and positions, which can
            complicate some evolution scenarios. Hudi requires careful
            configuration of keys and table types upfront. Performance at scale
            depends heavily on tuning. Iceberg and Delta both handle petabytes
            well, but Iceberg has more production deployments at that scale
            across diverse engines. Hudi's MOR tables can have higher query
            latency because they require merging base files with log files at
            read time, though COW tables avoid this.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg optimizes for engine neutrality and clean
                  specification. Choose it when multiple diverse engines (Spark,
                  Flink, Trino, Presto) need to access the same tables with
                  equal capability.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta Lake optimizes for Spark ecosystem integration. Choose
                  it when you are fully committed to Databricks or Spark and
                  value managed services and tight integration over broad engine
                  support.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hudi optimizes for streaming upsert workloads and CDC
                  scenarios. Choose it when record level updates at high
                  frequency are your primary pattern, but expect narrower engine
                  support.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All three provide ACID guarantees and schema evolution, but
                  Iceberg has the most flexible schema evolution through stable
                  column IDs, while Delta relies on names and positions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Operational complexity varies. Delta in Databricks is simplest
                  due to managed services. Iceberg requires running your own
                  compaction and maintenance jobs. Hudi requires the most tuning
                  and expertise.
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
                  A large retailer uses Iceberg because their data lake is
                  accessed by Spark for ETL, Flink for real time aggregations,
                  Trino for analyst queries, and AWS Athena for ad hoc
                  exploration. Iceberg provides consistent ACID behavior across
                  all four engines.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A fintech startup on Databricks chooses Delta Lake because 95%
                  of workloads run in Databricks notebooks and Databricks SQL.
                  They value automatic optimization and managed Delta services,
                  accepting that external tool access is limited.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A SaaS company ingesting database change logs at 50,000
                  records per second chooses Hudi MOR tables for efficient
                  upserts. They accept higher query latency because most queries
                  are batch jobs that can tolerate compaction overhead.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIcebergTableFormatIcebergVsDeltaLakeVsHudiChoosingTheRightTableFormat;
