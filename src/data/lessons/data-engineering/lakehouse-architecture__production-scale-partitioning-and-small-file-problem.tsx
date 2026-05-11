import type { Component } from "solid-js";

const LessonLakehouseArchitectureProductionScalePartitioningAndSmallFileProblem: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale: Partitioning and Small File Problem
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Small File Explosion:</strong>
            When you ingest data continuously, you naturally create many small
            files. A streaming job writing every 5 minutes generates 288 batches
            per day. If each batch creates 10 files, you have 2,880 files daily,
            or 1 million files per year for a single table. Object storage
            handles this fine, but query planning suffers. Reading metadata for
            1 million files can take 5 to 30 seconds, pushing your dashboard
            query p99 latency from 2 seconds to 20+ seconds. Columnar formats
            like Parquet also perform poorly with small files. Parquet uses row
            groups (typically 128 MB to 1 GB uncompressed) for efficient column
            scanning. A 10 MB file has minimal row groups, reducing compression
            ratios and increasing scan overhead. At query time, opening 1,000
            small files means 1,000 S3 API calls and context switches, vs
            opening 10 large files.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Query Planning Performance
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    1M SMALL FILES
                  </div>
                  <div style="font-size: 16px; font-weight: 800">20 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    10K OPTIMIZED FILES
                  </div>
                  <div style="font-size: 16px; font-weight: 800">800 ms</div>
                </div>
              </div>
            </div>
            <strong>Compaction Strategy:</strong>
            All three formats provide compaction or optimization commands. Delta
            Lake has{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              OPTIMIZE
            </code>{" "}
            which rewrites small files into larger ones, targeting 512 MB to 1
            GB per file. Iceberg and Hudi have similar compaction jobs. You
            typically run these on a schedule: hourly for hot partitions, daily
            for warm partitions, weekly for cold data. The trade off is cost.
            Compaction reads and rewrites data, consuming compute. For a 100 TB
            table with 50% daily churn, you might rewrite 50 TB per day. At 10
            cents per TB scanned and written, that's 10 dollars daily. But this
            keeps query performance acceptable, which may save you 100 dollars
            in dashboard query costs and engineer time debugging slow queries.
            <strong>Partitioning Design:</strong>
            Partitioning determines how data is physically organized. A poorly
            designed partition scheme amplifies the small file problem.
            Partitioning by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              user_id
            </code>{" "}
            for 10 million users means 10 million partition directories, each
            with potentially small files. This makes metadata operations slow
            and query planning expensive. Better partition schemes align with
            query patterns. For time series data, partition by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date
            </code>{" "}
            or{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              hour
            </code>
            . Queries filtering by date skip entire partitions. For multi
            dimensional queries, consider composite partitions like{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              region
            </code>{" "}
            and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              date
            </code>
            , or use techniques like Z ordering (Delta) or hidden partitioning
            (Iceberg) where the format manages partition transforms internally.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Over partitioning creates more
              problems than it solves. Aim for partitions with at least 1 GB of
              data each. If your daily data volume is 100 GB, partitioning by
              hour (24 partitions, 4 GB each) is reasonable. Partitioning by
              minute (1,440 partitions, 70 MB each) guarantees small file chaos.
            </div>
            <strong>Hidden Partitioning (Iceberg):</strong>
            Iceberg supports partition evolution, meaning you can change
            partition schemes without rewriting data. If you initially partition
            by{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              day
            </code>{" "}
            but later realize{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              hour
            </code>{" "}
            is better, Iceberg can apply the new transform to future writes
            while old data remains in daily partitions. Queries work
            transparently because partition logic lives in metadata, not
            hardcoded in file paths.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming ingestion creates small files: 288 daily batches ×
                  10 files each = 2,880 files daily, leading to 1 million+ files
                  per year and query planning times of 5 to 30 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compaction rewrites small files into 512 MB to 1 GB files,
                  improving query planning from 20 seconds to under 1 second,
                  but costs compute to rewrite data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over partitioning (e.g., by high cardinality columns like
                  &lt;code style="padding: 2px 6px; background: #f5f5f5; border:
                  1px solid #ddd; border-radius: 3px; font-family: monospace;
                  font-size: 0.9em;"&gt;user_id&lt;/code&gt;) creates millions
                  of small partitions; aim for 1+ GB per partition for optimal
                  performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg supports partition evolution: change partition schemes
                  without rewriting data, with transforms stored in metadata
                  rather than hardcoded file paths
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
                  A 100 TB table with 50% daily churn requires rewriting 50 TB
                  per day for compaction. At 10 cents per TB, that is 10 dollars
                  daily in compute, but saves 100 dollars in slow query costs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partitioning a 100 GB daily dataset by hour creates 24
                  partitions at 4 GB each (good). Partitioning by minute creates
                  1,440 partitions at 70 MB each (bad, guarantees small files)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber uses Hudi compaction on a schedule: hourly for hot
                  partitions seeing constant updates, daily for warm data,
                  weekly for cold archives
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLakehouseArchitectureProductionScalePartitioningAndSmallFileProblem;
