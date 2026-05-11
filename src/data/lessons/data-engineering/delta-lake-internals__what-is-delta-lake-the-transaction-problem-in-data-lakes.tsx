import type { Component } from "solid-js";

const LessonDeltaLakeInternalsWhatIsDeltaLakeTheTransactionProblemInDataLakes: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Delta Lake? The Transaction Problem in Data Lakes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Delta Lake</strong> is a transaction layer that sits on
                top of data lake storage (like Amazon S3 or Azure Data Lake
                Storage), providing ACID (Atomicity, Consistency, Isolation,
                Durability) guarantees for big data workloads.
              </div>
            </div>
            <strong>The Core Problem:</strong> Traditional data lakes store
            files (typically Parquet format) in folders on object storage. You
            write files, register them in a metastore, and hope readers never
            see incomplete data. But this breaks down at scale. Imagine an
            ecommerce company with 100 concurrent jobs writing clickstream data
            to the same table. Job A writes 50 files at 10:00am. Job B starts
            reading at 10:00:05am while Job A is still uploading files 30
            through 50. Job B might see only the first 29 files, producing
            incorrect analytics. Even worse, if Job A crashes after writing 40
            files, those orphaned files create data corruption that spreads to
            downstream reports.
            <strong>How Delta Lake Solves This:</strong> Delta Lake introduces a
            transaction log, a special folder of JSON files that records every
            change to the table. When Job A commits its 50 files, it writes a
            single JSON entry to the log listing all 50 files as one atomic
            unit. Job B reconstructs the table state by reading the log, not by
            listing files in the folder. If Job A crashes before committing,
            those 40 files simply do not appear in the log, so they are
            invisible to readers. No corruption. The transaction log becomes the
            source of truth. Readers and writers coordinate through this log,
            enabling multiple jobs to safely read and write the same table
            simultaneously.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Delta Lake is the default storage
              format in Databricks and is used by companies like Netflix and
              Uber to manage petabyte scale data lakes with hundreds of
              concurrent jobs.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Data Files</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    file1.parquet, file2.parquet
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">+</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Transaction Log</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    000000010.json
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">
                    Consistent Table Snapshot
                  </strong>
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
                  Traditional data lakes lack transactions, leading to race
                  conditions when multiple jobs write concurrently or readers
                  see partial writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delta Lake adds a transaction log (sequence of JSON files)
                  that records every change atomically, becoming the source of
                  truth for table state
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ACID properties mean Atomicity (all or nothing commits),
                  Consistency (valid states only), Isolation (readers see
                  snapshots), Durability (commits survive failures)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Readers reconstruct table state by replaying the log instead
                  of listing files, guaranteeing they never see incomplete or
                  inconsistent data
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
                  Without Delta Lake: 100 concurrent writers to a Parquet table
                  create race conditions. A reader listing files during writes
                  might see 40 of 50 files from one job, causing aggregate
                  queries to return incorrect totals.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  With Delta Lake: Same 100 writers each commit atomically via
                  the log. A reader starting at 10:00:05am replays log entries
                  up to that time, seeing only complete commits. Incomplete
                  writes are invisible.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeltaLakeInternalsWhatIsDeltaLakeTheTransactionProblemInDataLakes;
