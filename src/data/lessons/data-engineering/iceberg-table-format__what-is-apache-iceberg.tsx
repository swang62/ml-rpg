import type { Component } from "solid-js";

const LessonIcebergTableFormatWhatIsApacheIceberg: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Apache Iceberg?
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
              <strong>Apache Iceberg</strong> is a table format that brings
              database level semantics (transactions, schema evolution, time
              travel) to data lakes sitting on object storage like Amazon S3 or
              Google Cloud Storage.
            </div>
          </div>
          <strong>The Core Problem:</strong>
          Traditional data lakes act like giant file systems. You store
          terabytes or petabytes of Parquet or ORC files in S3, organized into
          directories like <code>year=2024/month=01/day=15/</code>. This is
          cheap and scales well, but it behaves nothing like a database. What
          breaks? First, concurrent writes corrupt your data. If two Spark jobs
          both try to add files to the same table at the same time, one might
          overwrite the other's changes. Second, schema evolution is a
          nightmare. Adding a column means either rewriting all files
          (expensive) or having inconsistent schemas across files (confusing).
          Third, no time travel. Once you delete or modify data, it's gone
          forever. Fourth, slow queries because engines must list directories
          and scan file metadata for every query.
          <strong>How Iceberg Fixes This:</strong>
          Iceberg introduces a metadata layer that tracks exactly which files
          belong to your table at any point in time. Instead of relying on
          directory structure, Iceberg maintains three levels of metadata.
          First, <strong>data files</strong> contain your actual rows in formats
          like Parquet. Second, <strong>manifest files</strong> list batches of
          data files along with statistics like row count, minimum and maximum
          values per column. Third, a <strong>table metadata file</strong>{" "}
          defines your schema, partitioning strategy, and which manifests make
          up the current snapshot.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>✓ In Practice:</strong> When you query an Iceberg table,
            your engine reads one small metadata file (a few kilobytes) to
            discover the schema and current snapshot. It then reads manifest
            files (megabytes total) to find relevant data files, using
            statistics to skip 95% or more of files that don't match your query
            filters. Only then does it read actual data files from object
            storage.
          </div>
          This design enables ACID transactions through atomic metadata updates,
          snapshot isolation for consistent reads, and time travel by keeping
          old metadata around. All of this works on the same cheap object
          storage you already use, accessible from Spark, Flink, Trino, Presto,
          and other engines.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Table Metadata File</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Schema + Current Snapshot
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Manifest List</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Points to Manifests
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Manifest Files</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  List Data Files + Stats
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                <strong style="font-size: 14px">Data Files (Parquet)</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Actual Table Rows
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
                Iceberg is a table format, not a storage system. It works on top
                of your existing object storage (S3, GCS, Azure Blob) and makes
                it behave like a transactional database.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Three metadata layers create the magic: table metadata defines
                schema and snapshots, manifest files track collections of data
                files with statistics, data files contain actual rows in Parquet
                or ORC.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Atomic commits happen by updating a single pointer in a catalog
                (like Hive Metastore) from old metadata file to new metadata
                file, providing snapshot isolation and preventing concurrent
                write conflicts.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                All engines (Spark, Flink, Trino, Presto) can read and write the
                same Iceberg table correctly because the format is standardized
                and engine agnostic.
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
                Your data lake has 50,000 Parquet files totaling 10 TB. Without
                Iceberg, adding a column means either rewriting all files or
                documenting that files created after a certain date have the new
                column. With Iceberg, you update the schema in one metadata file
                commit, and readers automatically handle the difference using
                stable column IDs.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Two Spark jobs simultaneously try to append data. Without
                Iceberg, both might succeed but one overwrites files from the
                other, causing data loss. With Iceberg, each creates a new
                snapshot from the current state. The first commit succeeds, the
                second detects the conflict, rebases on the new snapshot, and
                retries, ensuring both datasets are preserved.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonIcebergTableFormatWhatIsApacheIceberg;
