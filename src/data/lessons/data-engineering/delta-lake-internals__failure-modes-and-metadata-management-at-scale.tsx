import type { Component } from "solid-js";

const LessonDeltaLakeInternalsFailureModesAndMetadataManagementAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Metadata Management at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Orphaned Files:</strong> A writer uploads 100 Parquet files
            to object storage, then crashes before appending the transaction log
            entry. These files are invisible to readers (the log is the source
            of truth), but they consume storage. Over time, tables accumulate
            gigabytes to terabytes of orphaned data. Delta Lake's VACUUM command
            identifies files not referenced by any log entry older than the
            retention threshold (default 7 days) and deletes them. Running
            VACUUM too aggressively breaks time travel: a query trying to read
            version N-500 fails if VACUUM deleted the files for that version.
            Production systems typically retain 7 to 30 days of history,
            balancing storage cost against time travel needs.
            <strong>Metadata Growth:</strong> For very large tables with
            millions of files and thousands of commits, the transaction log can
            grow to hundreds of MB or GB. Without checkpoints, reconstructing a
            snapshot requires reading thousands of JSON files, each a separate
            object storage GET request. At 50ms per GET, 5000 JSON files take
            250 seconds just for metadata. Checkpointing solves this by writing
            a single Parquet file containing all active Add actions at a given
            version. Readers load the checkpoint, then apply only incremental
            JSON logs since the checkpoint. The trade off is write
            amplification: writing a checkpoint for a table with 10 million
            files can take 30 to 60 seconds and generate a 500 MB Parquet file.
            Operators tune checkpoint intervals (every 10 commits, every 100
            commits) based on query latency needs versus write cost.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Metadata Read Performance
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">250 sec</div>
                  <div style="font-size: 10px; font-weight: 600">
                    NO CHECKPOINT (5000 JSONs)
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 500ms
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    WITH CHECKPOINT
                  </div>
                </div>
              </div>
            </div>
            <strong>Long Running Jobs:</strong> A machine learning training job
            reads table version 100, trains for 3 hours, then writes results
            back. By that time, the table is at version 5000. If intermediate
            commits removed or modified files the job read, the commit
            validation fails. The job must now refresh to version 5000 and
            rerun, wasting 3 hours of compute. Production systems mitigate this
            by structuring pipelines into smaller incremental batches
            (processing 1 hour of data per job instead of 24 hours) and using
            streaming micro batches with frequent commits (every 5 to 30
            seconds).
            <strong>High Contention Partitions:</strong> A table partitioned by
            date receives 100 concurrent writers all updating today's partition.
            With optimistic concurrency, only one writer succeeds per commit
            cycle. The other 99 detect conflicts, retry, and queue up for the
            next cycle. At 15% conflict rate, average commit latency increases
            from 8 seconds to 15 seconds as jobs burn cycles in retry loops. The
            solution is finer grained partitioning (hourly instead of daily) or
            sharding writes by additional dimensions (user ID ranges, geographic
            region) to spread contention.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Setting VACUUM retention too
              low (under 7 days) can break running jobs that started before the
              retention window. A job that started 10 days ago fails when it
              tries to commit because VACUUM deleted its read files.
            </div>
            <strong>Small File Problem:</strong> Streaming ingestion writing
            micro batches every 5 seconds generates thousands of small files (1
            to 10 MB each). Object storage charges per API call and per object.
            A table with 10 million small files costs more to list and scan than
            a table with 10,000 large files (1 GB each), even if total data size
            is identical. Compaction jobs rewrite small files into larger ones.
            A typical compaction run targets files under 100 MB, grouping them
            into 1 GB files. This is itself a Delta transaction that adds the
            new large files and removes the old small ones. Compaction is
            scheduled periodically (nightly or weekly) based on query
            performance impact. Over aggressive compaction increases write
            amplification and cluster cost.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Orphaned files accumulate when writers crash before committing
                  to the log; VACUUM deletes files not referenced within
                  retention window (default 7 days), but aggressive vacuuming
                  breaks time travel
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata growth for tables with millions of files requires
                  checkpointing every N commits (typically 10 to 100) to keep
                  snapshot reconstruction under 500ms instead of 250+ seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Long running jobs (over 3 hours) risk commit failures if the
                  table advances thousands of versions and files they read are
                  deleted; structure pipelines into smaller incremental batches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High contention (100 concurrent writers on one partition)
                  causes 15% conflict rates and 2x latency increase; mitigate
                  with finer grained partitioning or sharding by additional
                  dimensions
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
                  A table with 5000 commits and no checkpoint takes 250 seconds
                  to reconstruct metadata (50ms per JSON file GET). Adding
                  checkpoints every 10 commits reduces this to under 500ms.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming job writing 5 second microbatches generates 17,280
                  files per day. After 30 days, 500k+ small files exist. Nightly
                  compaction rewrites them into 500 large files, reducing
                  listing time from 30 seconds to 2 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ML training job reads v100, runs 3 hours, table advances to
                  v5000. Commit fails because intermediate operations deleted
                  files. Rerunning costs 3 hours. Solution: process 1 hour
                  batches instead of full dataset.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeltaLakeInternalsFailureModesAndMetadataManagementAtScale;
