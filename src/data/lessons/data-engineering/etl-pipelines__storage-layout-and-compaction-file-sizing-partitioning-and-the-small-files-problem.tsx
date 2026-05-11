import type { Component } from "solid-js";

const LessonEtlPipelinesStorageLayoutAndCompactionFileSizingPartitioningAndTheSmallFilesProblem: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Storage Layout and Compaction: File Sizing, Partitioning, and the
            Small Files Problem
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Storage layout directly impacts query performance and cost at scale.
            The goal is to write large, columnar, compressed files in
            well-partitioned directories while avoiding the small files problem
            that degrades metadata operations and query planning. Columnar
            formats like Parquet store each column separately, enabling
            projection pruning. If analysts query 10 out of 200 columns,
            columnar layouts reduce Input/Output (I/O) by 90 to 95 percent
            compared to row-oriented formats. Combine this with compression
            (Snappy or Zstd) and you achieve 5 to 10 times size reduction from
            raw JSON. Partitioning directories by date, hour, and
            high-cardinality business dimensions (e.g., hashed tenant or region)
            spreads load and enables partition pruning. For example, querying
            last 24 hours with hourly partitions scans 24 directories instead of
            months of data, cutting scan costs proportionally. File sizing is
            critical. Writing thousands of sub-10 megabyte files per partition
            causes the small files problem: query engines spend more time
            listing and opening files than reading data. Metadata overhead
            explodes and BI queries scan millions of objects, each with per-file
            open latency. Aim for 128 to 512 megabyte files. If a micro-batch
            receives 30 million events over 5 minutes at 100,000 events per
            second, that is 30 gigabytes raw. After 8x compression to Parquet,
            you write 3 to 4 gigabytes. With 256 megabyte target file size, that
            yields 12 to 16 files per partition per window, which is healthy.
            Compaction merges small files into larger ones. Run compaction every
            few hours or daily depending on write rate. Modern table formats
            like Apache Iceberg, Hudi, and Delta provide transaction logs and
            atomic commits, allowing compaction to run concurrently with reads
            and writes without corrupting snapshots. They also support snapshot
            isolation, time travel, and schema evolution. Without these,
            coordinating writers and managing partial failures is brittle. In
            practice, Amazon teams land raw data to a bronze zone as small
            append-only files, then compact to silver as columnar Parquet with
            target file sizes of 256 to 512 megabytes. Gold zones pre-aggregate
            or denormalize for serving. Periodic compaction keeps file counts
            low and query latency predictable, even under bursty write patterns
            during peak traffic.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Bronze: Raw append (many small files)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    1000 files × 5 MB = slow metadata ops
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ compaction every 5-15 min
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Silver: Columnar Parquet
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    16 files × 256 MB, partitioned by date/hour/shard
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ nightly aggregation
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Gold: Pre-aggregated serving tables
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    fast BI queries, minimal scan
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
                  Columnar formats with projection pruning reduce I/O by 90 to
                  95 percent when querying a subset of columns. Combine with
                  compression for 5 to 10 times size reduction from raw JSON.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition by date, hour, and high-cardinality dimensions
                  (e.g., hashed tenant mod 64) to spread load and enable
                  partition pruning, cutting scan costs proportionally.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Target 128 to 512 MB file sizes. Thousands of sub-10 MB files
                  cause the small files problem: metadata overhead and per-file
                  open latency dominate, degrading query performance.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Modern table formats like Apache Iceberg, Hudi, and Delta
                  provide transaction logs and atomic commits, enabling
                  concurrent compaction, snapshot isolation, and schema
                  evolution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon pattern: land raw to bronze as append-only files,
                  compact to silver Parquet every 5 to 15 minutes with 256 to
                  512 MB targets, and aggregate to gold for serving.
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
                  Micro-batch sizing: 100k events/s × 300 seconds = 30M events
                  at 1 KB raw = 30 GB. After 8x Parquet compression, write 3.75
                  GB. With 256 MB target, produce 15 files per partition per 5
                  minute window.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Query efficiency: scanning 10 columns out of 200 with columnar
                  layout cuts I/O by ~95%. Partition pruning on last 24 hours
                  (24 partitions) instead of months reduces scan by 10 to 100
                  times, saving dollars per query at scale.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesStorageLayoutAndCompactionFileSizingPartitioningAndTheSmallFilesProblem;
