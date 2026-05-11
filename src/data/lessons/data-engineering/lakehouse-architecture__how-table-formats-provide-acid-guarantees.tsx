import type { Component } from "solid-js";

const LessonLakehouseArchitectureHowTableFormatsProvideAcidGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Table Formats Provide ACID Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Challenge:</strong>
            Object storage like S3 is eventually consistent and has no concept
            of transactions. If you write 10 files for a new partition and your
            job crashes after writing 5, readers might see partial data. If two
            writers update the same table simultaneously, they could create
            conflicting file sets with no way to merge changes. Traditional
            databases solve this with transaction logs and locks, but object
            storage has no such mechanism built in.
            <strong>The Transaction Log Approach (Delta Lake):</strong>
            Delta Lake maintains an append only transaction log stored as JSON
            files alongside your data in S3. Each commit writes a new log entry
            (numbered sequentially: 00000.json, 00001.json, etc.) that describes
            which data files were added or removed, schema changes, and metadata
            updates. Readers replay log entries to compute the current table
            state.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Optimistic Concurrency Example
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    Version 42
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    WRITER A READS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    Version 43
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    WRITER B COMMITS FIRST
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">RETRY</div>
                  <div style="font-size: 10px; font-weight: 600">
                    WRITER A DETECTS CONFLICT
                  </div>
                </div>
              </div>
            </div>
            When Writer A tries to commit version 43, it sees that version
            already exists. It retries by reading the new state (version 43) and
            attempting version 44. This optimistic concurrency control ensures
            atomicity without distributed locks. Under high write contention
            (50+ concurrent writers on the same partition), you may see 10 to
            20% of commits retry, adding 200 to 500 milliseconds of latency.
            <strong>The Metadata Tree Approach (Iceberg):</strong>
            Iceberg uses a layered metadata structure. The top level table
            metadata file (a JSON file) points to the current snapshot. Each
            snapshot references manifest list files, which reference manifest
            files, which contain details about data files (path, partition
            values, row counts, column statistics). This tree structure enables
            efficient metadata caching and parallel planning. At Netflix scale
            (10+ petabytes, millions of files), query planning reads only the
            metadata tree (a few hundred KB to a few MB) instead of listing all
            files, keeping planning time under 1 second.
            <strong>The Timeline Approach (Hudi):</strong>
            Hudi maintains a timeline of commits as a sequence of files in the{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              .hoodie
            </code>{" "}
            directory. Each commit file contains metadata about the operation
            (insert, update, delete) and affected files. Hudi supports two table
            types: Copy On Write (COW), where updates rewrite full data files,
            and Merge On Read (MOR), where updates go to delta log files that
            are later compacted. MOR enables high frequency upserts (100k+
            events per second from Change Data Capture streams) with minimal
            write amplification.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Delta Lake Transaction Log
                </div>
                <div style="display: flex; align-items: center; gap: 8px">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>00042.json</strong>
                    <div style="font-size: 10px">Added: file_a.parquet</div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>00043.json</strong>
                    <div style="font-size: 10px">Added: file_b.parquet</div>
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>00044.json</strong>
                    <div style="font-size: 10px">Removed: file_a.parquet</div>
                  </div>
                </div>
                <div style="padding: 12px; border-left: 4px solid; margin-top: 8px; font-size: 11px; font-style: italic">
                  Readers replay entries 42→43→44 to see current state
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
                  Delta Lake uses append only transaction logs with optimistic
                  concurrency: writers read current version, make changes, then
                  atomically commit the next version or retry if conflict
                  detected
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg uses a metadata tree (table metadata → manifest lists
                  → manifests → data files) that enables sub second query
                  planning even with millions of files by caching and pruning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hudi maintains a timeline of commits with Copy On Write
                  (rewrite full files) or Merge On Read (delta logs) table
                  types, optimizing for different write patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  At high write concurrency (50+ writers), Delta may see 10 to
                  20% commit retries adding 200 to 500ms latency, requiring
                  partition design that minimizes contention
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
                  Delta Lake transaction log: commit 00042.json adds 3 files,
                  commit 00043.json removes 1 file and adds 2 more. Reader
                  replays both to compute current file set atomically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Iceberg at Netflix: with 10 million data files, metadata tree
                  is only 50 MB, enabling query planning in under 1 second vs
                  scanning file listings which could take minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hudi MOR table ingests 200k CDC events per second into delta
                  logs, runs compaction every 30 minutes to merge logs into base
                  files, keeping read query latency under 3 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonLakehouseArchitectureHowTableFormatsProvideAcidGuarantees;
