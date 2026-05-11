import type { Component } from "solid-js";

const LessonHudiTableFormatCopyOnWriteVsMergeOnReadStorage: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Copy on Write vs Merge on Read Storage
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Storage Layout Choice:</strong> Hudi offers two
          fundamentally different ways to handle updates, each trading read
          performance for write efficiency. Understanding this trade off is
          critical because it affects latency, cost, and operational complexity.
          <strong>Copy on Write (COW):</strong> When an update arrives, Hudi
          reads the entire Parquet file containing that record, merges in the
          new version, and writes a completely new file. The old file is marked
          for deletion. The advantage is simple, fast reads. Query engines just
          scan Parquet files with standard columnar optimizations. There are no
          log files to merge, no complex readers needed. Read latency is
          predictable and optimized. The cost is write amplification. Updating
          one record in a 128 MB Parquet file means rewriting all 128 MB. For a
          table receiving 100k updates per second spread across 1000 files, you
          might rewrite 12.8 GB every minute, generating significant compute
          load and temporary storage.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Write Amplification Impact
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">1 KB</div>
                <div style="font-size: 10px; font-weight: 600">UPDATE SIZE</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">128 MB</div>
                <div style="font-size: 10px; font-weight: 600">
                  FILE REWRITTEN
                </div>
              </div>
            </div>
          </div>
          <strong>Merge on Read (MOR):</strong> Updates get appended to small
          log files stored alongside base Parquet files. A base file might be{" "}
          <code>partition_x_file_1.parquet</code> with logs like{" "}
          <code>partition_x_file_1.log.1</code>,{" "}
          <code>partition_x_file_1.log.2</code>. Writes become much cheaper
          because you only append deltas, not rewrite entire files. That same
          100k updates per second might generate only 100 MB of log files per
          minute instead of 12.8 GB of rewrites. The trade off hits at read
          time. Queries must merge base Parquet with all delta logs to get the
          current view. If compaction falls behind and 50 log files accumulate
          per base file, query latency can balloon from seconds to minutes as
          readers stitch everything together.
          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Copy on Write
              </div>
              <div style="font-size: 12px">
                Fast reads, write heavy. Best for 90% reads, 10% writes
              </div>
            </div>
            <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
              vs
            </div>
            <div style="padding: 12px; border: 2px solid; border-radius: 6px">
              <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                Merge on Read
              </div>
              <div style="font-size: 12px">
                Fast writes, read overhead. Needs aggressive compaction tuning
              </div>
            </div>
          </div>
          <strong>Background Compaction:</strong> MOR requires a separate
          process that periodically reads base files plus logs, merges them, and
          writes new compacted base files. This must be scheduled carefully. Too
          infrequent and reads suffer. Too aggressive and compaction starves
          ingestion resources.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
              <div style="text-align: center">
                <div style="font-weight: 700; margin-bottom: 8px; font-size: 13px">
                  Copy on Write
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-bottom: 6px">
                  <div style="font-size: 12px; font-weight: 600">
                    file_1.parquet
                  </div>
                  <div style="font-size: 10px">128 MB</div>
                </div>
                <div style="font-size: 20px; margin: 4px 0">↓ update</div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-size: 12px; font-weight: 600">
                    file_1_new.parquet
                  </div>
                  <div style="font-size: 10px">128 MB rewritten</div>
                </div>
              </div>
              <div style="text-align: center">
                <div style="font-weight: 700; margin-bottom: 8px; font-size: 13px">
                  Merge on Read
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-bottom: 6px">
                  <div style="font-size: 12px; font-weight: 600">
                    file_1.parquet
                  </div>
                  <div style="font-size: 10px">128 MB base</div>
                </div>
                <div style="font-size: 20px; margin: 4px 0">+ updates</div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-size: 12px; font-weight: 600">
                    file_1.log.1
                  </div>
                  <div style="font-size: 10px">2 MB appended</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Copy on Write rewrites entire Parquet files on updates, giving
                simple fast reads but high write amplification. One 1 KB update
                rewrites a 128 MB file
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Merge on Read appends updates to log files, reducing writes
                dramatically but requiring readers to merge base plus logs at
                query time
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                MOR requires aggressive compaction scheduling. If 50 log files
                accumulate, query latency can increase from seconds to minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Choose COW for read heavy workloads with 90% reads and moderate
                update rates. Choose MOR for write intensive streaming ingestion
                at 100k+ updates per second
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Recent Hudi improvements achieved 17x better index lookup
                latency, critical for high throughput upsert workloads
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
                Systems with 90% analytical reads and 10% updates: COW provides
                predictable query performance without complex compaction tuning
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Streaming CDC ingestion at 100k updates/sec: MOR appends 100
                MB/min of logs vs COW rewriting 12.8 GB/min of Parquet files
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                If compaction lags on MOR tables, a query that normally scans
                base Parquet in 5 seconds might take 3 minutes merging 50 delta
                logs
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonHudiTableFormatCopyOnWriteVsMergeOnReadStorage;
