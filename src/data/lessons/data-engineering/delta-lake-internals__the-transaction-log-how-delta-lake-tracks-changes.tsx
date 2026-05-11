import type { Component } from "solid-js";

const LessonDeltaLakeInternalsTheTransactionLogHowDeltaLakeTracksChanges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            The Transaction Log: How Delta Lake Tracks Changes
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Mechanism:</strong> Delta Lake's transaction log lives
            in a dedicated{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              _delta_log
            </code>{" "}
            subdirectory inside the table folder. Each commit appends a new JSON
            file with a sequential version number:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              00000000000000000010.json
            </code>{" "}
            for version 10,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              00000000000000000011.json
            </code>{" "}
            for version 11, and so on. Each JSON file contains a sequence of
            action records that describe what changed. The most important
            actions are Add (declares a new Parquet file as part of the table)
            and Remove (tombstones a file, marking it as deleted). Other actions
            include Metadata (schema and partitioning), Protocol (feature
            versions), and SetTransaction (for idempotent streaming writes).
            <strong>Building a Snapshot:</strong> To read the table at version
            105, you reconstruct the snapshot by replaying the log. Start from
            the beginning, applying each Add and Remove action in order,
            building up a set of active files. By the time you reach version
            105, you know exactly which Parquet files are part of that snapshot.
            This is where checkpoints become critical. Replaying thousands of
            JSON files would be slow. Delta Lake periodically writes a
            checkpoint file (a Parquet file containing all active Add actions at
            that version). If checkpoints happen every 10 commits, a reader can
            load the checkpoint at version 100, then apply only JSON logs 101
            through 105. This keeps metadata read times under 500 milliseconds
            even for tables with millions of files.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Snapshot Reconstruction Performance
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITHOUT CHECKPOINT
                  </div>
                  <div style="font-size: 16px; font-weight: 800">10+ sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    WITH CHECKPOINT
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    &lt; 500ms
                  </div>
                </div>
              </div>
            </div>
            <strong>A Real Streaming Example:</strong> Consider a streaming job
            ingesting clickstream events at 200,000 events per second. Every 5
            seconds, it writes a microbatch as a new Delta commit. Each commit
            adds roughly 50 to 100 Parquet files totaling 2 to 3 GB. The job
            maintains a{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              SetTransaction
            </code>{" "}
            action in the log recording which Kafka offsets it has processed. If
            the job crashes and restarts, it reads the log to find the last
            committed offset, then resumes from there. This provides exactly
            once semantics: no duplicate events, no missed events, even across
            restarts.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Long running jobs can hold onto
              old snapshots. If a job starts at version 100 and runs for 2 hours
              while the table advances to version 2000, its commit may fail
              because the files it read have since been deleted. Structure
              pipelines into smaller incremental batches to avoid this.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Checkpoint v100</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    All active files
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">+</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">JSON Logs 101-105</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Add/Remove actions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 160px; text-align: center">
                  <strong style="font-size: 14px">Snapshot v105</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Read in &lt; 500ms
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
                  The transaction log is a sequence of JSON files numbered by
                  version (00000000000000000010.json for v10), each containing
                  Add, Remove, Metadata, and other action records
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoints are Parquet files written every N commits
                  (typically 10) that contain the full active file list at that
                  version, enabling fast snapshot reconstruction
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  To read version 105, load the checkpoint at version 100, then
                  apply JSON logs 101 through 105, keeping metadata reads under
                  500ms even for petabyte tables
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming jobs use SetTransaction actions to record processed
                  offsets, enabling exactly once semantics across restarts
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
                  A table at version 1000 with checkpoints every 10 commits:
                  readers load checkpoint at v1000 (contains all active files),
                  no additional JSON needed. Total metadata read: 200ms.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming ingestion at 200k events/sec writes microbatches
                  every 5 seconds. Each commit adds 50-100 Parquet files.
                  SetTransaction records Kafka offset 9876543, so on restart the
                  job resumes from that offset.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeltaLakeInternalsTheTransactionLogHowDeltaLakeTracksChanges;
