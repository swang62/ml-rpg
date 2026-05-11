import type { Component } from "solid-js";

const LessonLakehouseArchitectureChoosingBetweenDeltaIcebergAndHudi: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Between Delta, Iceberg, and Hudi
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Decision Framework:</strong>
            All three formats solve the lakehouse problem, but each optimizes
            for different workloads. Your choice depends on three factors: your
            primary use case (batch analytics, streaming, or high frequency
            updates), your engine ecosystem (are you locked into one vendor or
            need multi engine support?), and your operational maturity (how much
            tuning and maintenance can you handle?).
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Delta Lake
                </div>
                <div style="font-size: 12px">
                  Best for Databricks ecosystem, unified batch and streaming
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Iceberg
                </div>
                <div style="font-size: 12px">
                  Best for multi engine support, large scale metadata management
                </div>
              </div>
            </div>
            <strong>Delta Lake: Databricks First, Streaming Native:</strong>
            Delta excels when you are heavily invested in Databricks or Apache
            Spark. It provides tight integration with Databricks SQL and makes
            unifying batch and streaming simple through Structured Streaming.
            You write streaming pipelines that incrementally update tables with
            exactly once semantics. For companies running primarily on
            Databricks, this is the path of least resistance. The trade off is
            engine lock in. While Delta is open source and other engines (Trino,
            Flink) are adding support, the best experience remains in the
            Databricks ecosystem. If you anticipate needing strong multi engine
            support (using Spark for ETL, Trino for ad hoc queries, Flink for
            real time, and custom services for specific workloads), Delta may
            force you into suboptimal engine choices or version compatibility
            issues. Delta's transaction log is simple and performant for
            moderate scale. At very large scale (millions of commits, complex
            partition evolution), the log can become unwieldy. Checkpoint files
            help, but operational complexity increases. For teams with limited
            data engineering resources, Delta offers a simpler operational model
            than Iceberg or Hudi.
            <strong>Iceberg: Multi Engine, Enterprise Scale:</strong>
            Iceberg is preferred when you need strong multi engine compatibility
            and plan to operate at very large scale. Companies like Netflix,
            Apple, and Adobe use Iceberg because they run heterogeneous engine
            environments: Spark for batch ETL, Flink for streaming, Trino and
            Presto for interactive queries, and custom query services for
            specific products. Iceberg's metadata tree architecture scales
            better than Delta's log for complex scenarios. With millions of data
            files, Iceberg's manifest structure keeps query planning fast
            through aggressive metadata caching and pruning. Partition evolution
            (changing partition schemes without data rewrites) and hidden
            partitioning (partition transforms in metadata, not file paths) are
            first class features, making schema evolution and query optimization
            easier over time. The trade off is operational complexity. Iceberg
            requires a robust catalog implementation (Hive Metastore, AWS Glue,
            Nessie, or custom). Catalog availability becomes a single point of
            failure: if the catalog is down, your lakehouse is unavailable even
            though data files are intact. You also need to carefully manage
            snapshot expiration and metadata cleanup to prevent metadata bloat.
            At Netflix scale, this means investing in catalog infrastructure and
            monitoring.
            <strong>Hudi: Upsert Heavy, CDC Focused:</strong>
            Hudi is the best choice for workloads dominated by high frequency
            upserts and change data capture. If you are ingesting 100k+ events
            per second from transactional databases via Debezium or similar
            tools, Hudi's indexing and Merge On Read tables minimize write
            amplification. Hudi also excels at incremental query semantics:
            downstream jobs can read only new commits since a checkpoint,
            enabling efficient incremental processing. Hudi offers two table
            types: Copy On Write rewrites full data files on update (simpler
            reads, higher write cost), while Merge On Read appends updates to
            log files (faster writes, more complex reads requiring log merge at
            query time). This flexibility lets you tune for your read/write
            ratio. For a table with 90% writes and 10% reads (like event logs),
            MOR is ideal. For 90% reads (like dimension tables), COW is simpler.
            The trade off is a steeper learning curve. Hudi has more knobs to
            tune: index types (bloom filter, HBase, simple), compaction
            strategies, clustering, and cleaning policies. Engine support is
            also less mature than Iceberg. Spark and Flink have good support,
            but other engines may lag. For teams without deep Hudi expertise,
            the operational burden can be significant.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The question is not which format is best, but which format fits
                your workload and team. If you are on Databricks and need simple
                streaming, choose Delta. If you need multi engine support at
                Netflix scale, choose Iceberg. If you are ingesting CDC streams
                at high throughput, choose Hudi."
              </div>
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; font-weight: 700; font-size: 14px; text-align: center">
                Decision Tree
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    On Databricks? Unified batch/streaming?
                  </div>
                  <div style="font-size: 12px">
                    → <strong>Delta Lake</strong> (simple, native integration)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Multi engine? Large scale metadata?
                  </div>
                  <div style="font-size: 12px">
                    → <strong>Iceberg</strong> (Spark + Trino + Flink + custom)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    High frequency upserts? CDC streams?
                  </div>
                  <div style="font-size: 12px">
                    → <strong>Hudi</strong> (100k+ events/sec, MOR tables)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta Lake optimizes for Databricks ecosystem with simple
                  streaming and batch unification, but trades engine
                  independence (best support in Databricks/Spark only)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg provides strong multi engine support (Spark, Flink,
                  Trino, custom) and scales metadata better for millions of
                  files, but requires robust catalog infrastructure and
                  operational maturity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hudi excels at high frequency upserts (100k+ events/sec) with
                  Merge On Read tables and incremental query semantics, but has
                  steeper learning curve with more tuning knobs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose based on workload: Delta for Databricks streaming (end
                  to end latency 5 to 15 min), Iceberg for multi engine
                  analytics (p95 queries 1 to 10 sec at PB scale), Hudi for CDC
                  ingestion (200k+ updates/sec)
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
                  Netflix uses Iceberg with Spark for ETL, Trino for ad hoc
                  queries, and custom engines for product features, managing 10+
                  petabytes with sub second query planning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber uses Hudi to ingest CDC streams from transactional
                  databases at 200k+ events per second, with Merge On Read
                  tables keeping write latency under 100ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  A Databricks customer uses Delta Lake for unified batch and
                  streaming ETL, achieving 5 to 15 minute end to end latency
                  from Kafka to BI dashboards with exactly once semantics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLakehouseArchitectureChoosingBetweenDeltaIcebergAndHudi;
