import type { Component } from "solid-js";

const LessonHudiTableFormatWhenToUseHudiVsAlternatives: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          When to Use Hudi vs Alternatives
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Decision Framework:</strong> Choosing Apache Hudi over
          alternatives like plain Parquet, Delta Lake, Iceberg, or a cloud data
          warehouse depends on specific trade offs around scale, cost, control,
          and operational complexity.
          <strong>Hudi vs Plain Parquet on S3:</strong> If your datasets are
          under a few hundred gigabytes and you can tolerate daily batch windows
          of 12 to 24 hours, plain Parquet with full table scans is simpler. No
          indexes to maintain, no compaction to tune, no timeline metadata to
          manage. Hudi becomes compelling when data volumes reach tens of
          terabytes and only a small fraction changes daily. The math is clear:
          processing 5 percent of 10 TB (500 GB) with Hudi is 20x less data than
          rescanning all 10 TB. At 2 GB per second scan rate, that's 4 minutes
          versus 83 minutes, and compute cost drops proportionally. Uber Eats
          provides the concrete example: moving from full scans to Hudi
          incremental processing cut pipeline time from 12+ hours to under 4
          hours while reducing compute cost by 50 percent.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Plain Parquet
              </div>
              <div style="font-size: 12px">
                Simpler ops, full scans. Good under 500 GB or daily batch OK
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Apache Hudi
              </div>
              <div style="font-size: 12px">
                Incremental processing. Worth it at multi TB scale, minute to
                hour freshness
              </div>
            </div>
          </div>
          <strong>Hudi vs Cloud Data Warehouse:</strong> Systems like BigQuery,
          Snowflake, or Redshift natively support updates, deletes, and change
          tracking with simpler operational models. You pay for convenience with
          higher storage costs (often 3 to 5x more than S3) and less control
          over file layout and query engines. Hudi offers lower storage cost and
          flexibility to use any compute engine (Spark, Presto, Trino, Flink).
          But you own the operational complexity: you must tune compaction,
          manage clustering, and operate table services. For teams that already
          run Spark or Flink at scale, this trade off can be acceptable for the
          cost savings and control. The decision criteria: if your organization
          already has mature data lake infrastructure and Spark expertise, Hudi
          can save 40 to 60 percent on storage plus compute compared to a
          warehouse. If you're starting fresh or lack those capabilities, a
          managed warehouse may be simpler despite higher cost.
          <strong>Hudi vs Delta Lake vs Iceberg:</strong> These three systems
          solve similar problems with different philosophies. Delta Lake has
          strong integration with a specific commercial platform and focuses on
          simplicity. Iceberg prioritizes multi engine compatibility and hidden
          partitioning. Hudi emphasizes incremental pull based processing and
          streaming first design. Choose Hudi when incremental queries are a
          first class requirement, when you need fine grained control over
          indexing strategies, or when your workload is write heavy streaming
          ingestion at tens of thousands of records per second. Hudi's Merge on
          Read mode and built in streaming patterns excel here. Choose Iceberg
          if you need strong multi engine guarantees and hidden partitioning to
          avoid user errors. Choose Delta if you're heavily invested in a
          particular ecosystem and want tighter integration.
          <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
            <div style="font-size: 14px; line-height: 1.5">
              "The decision isn't about which technology is 'better.' It's about
              matching your scale, change rate, freshness requirements, and team
              capabilities to the right tool."
            </div>
          </div>
          <strong>Failure Scenario:</strong> A team adopts Hudi for a 200 GB
          dataset with 50 percent daily changes. The overhead of managing
          indexes, compaction, and timeline metadata outweighs the benefit. Full
          Parquet scans would be simpler and faster. Hudi shines at large scale
          with low change rates, not small datasets with high churn.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Choose plain Parquet for datasets under 500 GB or when daily
                batch windows are acceptable. Hudi adds unnecessary complexity
                at that scale
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Hudi becomes compelling at tens of TB scale when only 5 to 10
                percent changes daily. Processing 500 GB vs 10 TB cuts time from
                83 minutes to 4 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cloud data warehouses offer simpler operations but cost 3 to 5x
                more for storage. Hudi saves 40 to 60 percent on total cost if
                you have Spark or Flink expertise
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Compared to Delta and Iceberg, Hudi excels for incremental pull
                processing and write heavy streaming workloads at 10k+ records
                per second
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Anti pattern: using Hudi for small datasets with high change
                rates. A 200 GB table with 50 percent daily churn is better
                served by simpler tools or a warehouse
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
                E commerce order table: 8 TB total, 400 GB daily changes (5%).
                Hudi incremental processing runs in 20 minutes vs 3+ hours for
                full scans
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Real time analytics requiring minute latency on 50k writes per
                second CDC stream: Hudi MOR mode writes deltas efficiently while
                providing fresh snapshot queries
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Startup with 100 GB dataset considering Hudi: operational
                overhead outweighs benefits, plain Parquet or managed warehouse
                is simpler and sufficient
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonHudiTableFormatWhenToUseHudiVsAlternatives;
