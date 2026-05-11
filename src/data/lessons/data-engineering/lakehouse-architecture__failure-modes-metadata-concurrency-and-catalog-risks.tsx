import type { Component } from "solid-js";

const LessonLakehouseArchitectureFailureModesMetadataConcurrencyAndCatalogRisks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Metadata, Concurrency, and Catalog Risks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Metadata Explosion and Planning Overhead:</strong>
            The most common production failure in lakehouse systems is metadata
            bloat leading to slow query planning. When a table has millions of
            data files, even reading metadata becomes expensive. Delta Lake must
            replay transaction log entries (or read checkpoint files), Iceberg
            must traverse the metadata tree (manifest lists and manifests), and
            Hudi must scan timeline files. If metadata grows unchecked, query
            planning can degrade from milliseconds to tens of seconds. For
            example, a table ingesting 100 batches daily for 3 years accumulates
            over 100,000 commits. If each commit references 50 files, you have 5
            million file references in metadata. Delta checkpoints every 10
            commits by default, but if checkpointing falls behind, replaying
            thousands of log entries can take 10 to 30 seconds. Iceberg
            mitigates this with manifest caching, but if manifests are not
            compacted, you can end up with tens of thousands of small manifest
            files, each requiring an S3 read.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Automated Cleanup Jobs:</strong> Schedule regular jobs
                  to expire old snapshots, vacuum deleted files, and compact
                  metadata. For Delta, run{" "}
                  <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                    VACUUM
                  </code>{" "}
                  weekly. For Iceberg, configure snapshot expiration and
                  metadata compaction. Balance retention (for time travel)
                  against metadata size.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Monitor Planning Metrics:</strong> Track query
                  planning time as a key metric. If p99 planning time exceeds 2
                  to 3 seconds, investigate metadata size. Use query profiling
                  tools to identify tables with excessive file counts.
                </div>
              </div>
            </div>
            <strong>Concurrency Conflicts and Write Contention:</strong>
            Optimistic concurrency in Delta Lake works well at moderate
            concurrency, but breaks down under heavy contention. If 50 writers
            simultaneously update the same partition, many will conflict and
            retry. Each retry reads the new log state and attempts another
            commit. At high conflict rates (over 30% retries), latency spikes
            from 500ms to 3+ seconds, and some writes may fail after exhausting
            retry limits. Iceberg uses snapshot isolation with similar
            concurrency patterns. The difference is in partition design. If your
            partition scheme creates natural boundaries (e.g., writers touch
            different date partitions), conflicts are rare. But if all writers
            update a single hot partition, you face the same contention. Hudi
            handles concurrency differently depending on table type: Copy On
            Write has similar contention issues, while Merge On Read appends to
            log files with less conflict but requires more complex read paths.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Partition design is not just about
              query performance. It also determines write concurrency. Partition
              by dimensions that naturally distribute writes (like date or
              region) to avoid hot spots.
            </div>
            <strong>Catalog Availability as Single Point of Failure:</strong>
            All three formats depend on an external catalog (Hive Metastore, AWS
            Glue, Databricks Unity Catalog, or custom) to store table
            definitions and locate metadata files. If the catalog becomes
            unavailable, your entire lakehouse is offline, even though the
            underlying S3 data is perfectly intact. At production scale, catalog
            reliability is critical. A catalog outage at Netflix or Uber would
            halt analytics, ML training, and product features. This requires
            treating the catalog as a Tier 1 service with high availability,
            monitoring, and failover. Some teams implement catalog replication
            or caching layers to mitigate this risk. Nessie, an open source
            catalog, provides Git like versioning and multi cluster replication,
            addressing some of these concerns. Another catalog issue is metadata
            consistency. If a writer commits data files to S3 but the catalog
            update fails (network partition, timeout), you have orphaned files.
            Delta and Iceberg handle this differently: Delta's transaction log
            is the source of truth (catalog is secondary), while Iceberg relies
            more heavily on catalog state. Implement idempotent write patterns
            and reconciliation jobs to detect and clean orphaned files.
            <strong>Schema Evolution Breaking Downstream Jobs:</strong>
            Lakehouse formats allow schema evolution (adding columns, changing
            types), which is powerful but risky. If a team changes a column type
            from integer to string without coordinating with downstream
            consumers, feature pipelines and ML models can silently break. The
            data is still readable (formats handle schema evolution gracefully),
            but business logic may produce incorrect results. Time travel makes
            this worse. Different jobs may pin different snapshots, so some see
            the old schema and others see the new schema. Debugging these issues
            is painful because everything appears to work until you notice
            incorrect predictions or metrics days later. Enforce schema
            governance policies: require schema changes to go through approval,
            document schema migrations, and test downstream impact before
            deploying.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata bloat from millions of files degrades query planning
                  from milliseconds to 10 to 30 seconds; requires automated
                  snapshot expiration, vacuuming, and metadata compaction on
                  weekly schedules
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High write concurrency (50+ writers on same partition) causes
                  30%+ retry rates in Delta Lake, spiking latency from 500ms to
                  3+ seconds; mitigate with partition designs that distribute
                  writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalog (Hive Metastore, AWS Glue) is single point of failure:
                  if unavailable, lakehouse is offline even though S3 data is
                  intact; requires high availability, monitoring, and failover
                  strategies
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution without coordination breaks downstream jobs
                  silently; time travel makes debugging harder as different jobs
                  pin different snapshots with incompatible schemas
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
                  A table with 100 daily batches over 3 years has 100k+ commits
                  and 5 million file references. Without regular checkpointing,
                  Delta planning time grows from 200ms to 20+ seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High concurrency scenario: 50 Spark jobs updating the same
                  daily partition in Delta Lake see 40% conflicts, with median
                  latency jumping from 600ms to 4 seconds and 5% timeout
                  failures
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Catalog outage at a major company halts all lakehouse queries
                  for 45 minutes until Hive Metastore is restored, even though
                  all S3 data remains accessible
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLakehouseArchitectureFailureModesMetadataConcurrencyAndCatalogRisks;
