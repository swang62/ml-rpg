import type { Component } from "solid-js";

const LessonIcebergTableFormatHowIcebergCommitsWorkSnapshotIsolationMechanics: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Iceberg Commits Work: Snapshot Isolation Mechanics
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Commit Challenge:</strong>
            When multiple writers try to modify a table on object storage, you
            face a fundamental problem: object stores like S3 provide no built
            in locking or transactions. Files are eventually consistent. Two
            processes can both read the current state, make changes, and
            overwrite each other's work without even knowing. Iceberg solves
            this through optimistic concurrency control combined with atomic
            catalog updates.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Five Step Commit Process:
            </div>
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Read current metadata:</strong> Writer loads the table
                  metadata file to get current snapshot ID, schema version, and
                  partition spec. This takes 10 to 50 milliseconds to fetch one
                  small JSON file from object storage.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Write data files:</strong> Writer outputs new Parquet
                  files to object storage. These are typically 512 MB to 1 GB
                  each to balance parallelism and file count. At 100 MB/sec
                  write speed per worker, a 1 GB file takes 10 seconds.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Build manifest entries:</strong> For each data file,
                  writer computes statistics (row count, column min/max values,
                  null counts) and creates a manifest entry. These entries get
                  written to new manifest files.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Write new table metadata:</strong> Writer creates a
                  new snapshot pointing to the manifest list, generates a new
                  table metadata file with incremented version, and writes it to
                  object storage. Critical: the old metadata file remains
                  unchanged.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  5
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Atomic catalog update:</strong> Writer calls the
                  catalog API (Hive Metastore, AWS Glue, REST catalog) to update
                  the table pointer from the old metadata file to the new one,
                  but ONLY if the current pointer still matches what the writer
                  originally read. This compare and swap operation is the
                  critical atomic step.
                </div>
              </div>
            </div>
            <strong>When Conflicts Happen:</strong>
            If two writers both start from snapshot 42, both create new files
            and metadata, and both try to update the catalog, the first succeeds
            and moves the pointer to snapshot 43. The second writer's compare
            and swap fails because the current snapshot is now 43, not 42.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Commit Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">START</div>
                  <div style="font-size: 16px; font-weight: 800">Snap 42</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">WRITER 1</div>
                  <div style="font-size: 16px; font-weight: 800">Snap 43</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WRITER 2 RETRIES
                  </div>
                  <div style="font-size: 16px; font-weight: 800">Snap 44</div>
                </div>
              </div>
            </div>
            The losing writer must retry. It reads the new current snapshot
            (43), potentially merges or validates its changes against what just
            got committed, creates a new snapshot (44) building on top of 43,
            and attempts the commit again. Properly implemented writers handle
            this automatically, but if retries are not implemented, the job
            fails and data is lost.
            <strong>The Performance Story:</strong>
            The beauty is that the expensive part (writing gigabytes of data
            files) happens in parallel without coordination. Only the final
            metadata commit needs coordination, and that operates on kilobyte
            sized files. Catalog updates typically complete in 50 to 300
            milliseconds, so commit latency remains low even at high
            concurrency. Netflix reports handling thousands of commits per day
            across thousands of tables with this pattern.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimistic concurrency allows writers to work in parallel
                  writing data files without coordination. Only the final
                  catalog update requires an atomic compare and swap operation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  The catalog stores just a pointer to the current metadata
                  file. All actual data and metadata live in object storage.
                  This keeps the catalog lightweight and highly available.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Commits fail fast when conflicts occur. A writer detects the
                  conflict in milliseconds during the catalog update, not after
                  writing gigabytes of data, because data writes happen before
                  attempting the commit.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Snapshot isolation means readers always see a consistent view.
                  A query that starts on snapshot 42 continues reading snapshot
                  42 even if writers commit snapshots 43, 44, and 45 during the
                  query execution.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical commit latency is 50 to 300 milliseconds for the
                  metadata operations, but the overall write job takes seconds
                  to minutes depending on data volume, since writing data files
                  dominates the time.
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
                  A streaming job writes 5 GB of new data every minute. It
                  buffers events, writes 10 files of 512 MB each to S3 (about 50
                  seconds at 100 MB/sec per file in parallel), then commits by
                  updating one metadata pointer. The commit itself takes 150
                  milliseconds, but the end to end cycle is 60 seconds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two batch jobs both read snapshot 100 at midnight, spend 30
                  minutes processing, and try to commit at 12:30 AM. The first
                  commits snapshot 101 successfully. The second gets a conflict,
                  re reads snapshot 101, verifies its new data does not overlap,
                  creates snapshot 102, and commits successfully 200
                  milliseconds later.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonIcebergTableFormatHowIcebergCommitsWorkSnapshotIsolationMechanics;
