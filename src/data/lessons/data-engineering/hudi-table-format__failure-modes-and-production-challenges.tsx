import type { Component } from "solid-js";

const LessonHudiTableFormatFailureModesAndProductionChallenges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Challenges
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Compaction Falling Behind:</strong> The most common
            production failure with Merge on Read tables happens when compaction
            cannot keep pace with ingestion. Log files accumulate, and queries
            must merge dozens of deltas with base files. Concrete numbers: a
            query that normally scans base Parquet in 5 seconds might take 3
            minutes when merging 50 log files. Compute costs spike as readers
            burn cycles on merge operations instead of simple columnar scans.
            This happens when workloads scale 10x. A compaction schedule tuned
            for 2 TB per day might handle log accumulation fine, but at 20 TB
            per day it falls over without adjustments to parallelism, frequency,
            or resource allocation.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Compaction Lag Impact
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">5 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">10 LOGS</div>
                  <div style="font-size: 16px; font-weight: 800">30 sec</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">50 LOGS</div>
                  <div style="font-size: 16px; font-weight: 800">3 min</div>
                </div>
              </div>
            </div>
            <strong>Concurrency Conflicts:</strong> Hudi uses optimistic
            concurrency control with locking to coordinate multiple writers,
            compaction, and clustering. Misconfigured locks lead to write
            conflicts or partially applied operations. At high scale with
            multiple parallel writers ingesting 100k records per second, you
            need correct coordination. Common failure: two writers try to update
            the same file group simultaneously. Without proper locking, one
            write can be lost or you get corrupt timeline state. The solution
            requires distributed locking (often using DynamoDB, ZooKeeper, or
            Hive metastore) and careful serialization of conflicting operations.
            <strong>Checkpoint Loss and Reprocessing:</strong> Incremental
            queries depend on consumers storing their last processed commit
            instant. If that checkpoint is lost or corrupted, the consumer faces
            a dilemma: rewind to a safe old instant (reprocessing days or weeks
            of data, causing duplicates downstream) or skip ahead (potentially
            missing critical updates). Production systems store checkpoints in
            highly durable metadata stores like relational databases or DynamoDB
            with backup strategies. Downstream consumers must be designed for
            idempotent processing so that reprocessing the same commit multiple
            times produces correct results.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> A consumer that loses checkpoint and
              rewinds 1 week on a table with 10 GB daily changes will reprocess
              70 GB instead of 10 GB, potentially overwhelming downstream
              systems and creating duplicate aggregations.
            </div>
            <strong>Late Arriving Data:</strong> When events arrive out of order
            or late, Hudi's default last write wins merge strategy can produce
            incorrect results. If your correctness depends on event time, not
            processing time, you must configure custom merge logic. Example: An
            order update with event time 10:05 arrives after an update with
            event time 10:10. Default merging based on commit time would let the
            older event overwrite the newer one, producing stale data. Active
            active databases replicating across regions face this constantly.
            The solution requires application level conflict resolution
            policies, often using vector clocks or event time based merging.
            <strong>Metadata Bloat:</strong> Keeping long retention of
            historical commits enables time travel queries but can bloat
            metadata. Organizations sometimes set 30 or 90 day retention without
            realizing that listing commits or running cleanup operations slows
            dramatically. At very large scale, timeline operations that took
            milliseconds at 100 commits might take seconds at 10,000 commits.
            The fix is tuning retention policies to balance time travel needs
            against metadata performance.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="font-weight: 700; text-align: center; margin-bottom: 12px; font-size: 14px">
                Concurrency Conflict Scenario
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px">
                  <div style="padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 11px; font-weight: 600">
                    Writer A<br />
                    <span style="font-size: 10px">Updates file_1</span>
                  </div>
                  <div style="padding: 10px; border: 2px solid; border-radius: 6px; text-align: center; font-size: 11px; font-weight: 600">
                    Writer B<br />
                    <span style="font-size: 10px">Updates file_1</span>
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: 800">
                  ⚠
                </div>
                <div style="padding: 12px; border: 2px solid; border-radius: 6px; font-size: 12px; text-align: center">
                  <strong>Without Lock:</strong> Conflict, lost write or corrupt
                  timeline
                  <br />
                  <span style="font-size: 10px">
                    Need distributed locking (DynamoDB, ZooKeeper)
                  </span>
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
                  Compaction lag is the top MOR failure mode. Query latency
                  increases from 5 seconds to 3+ minutes when 50 log files
                  accumulate per base file
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Concurrency conflicts occur with multiple writers at high
                  scale. Requires distributed locking via DynamoDB, ZooKeeper,
                  or Hive metastore to prevent lost writes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoint loss forces consumers to reprocess historical data.
                  Losing 1 week of checkpoints means reprocessing 70 GB instead
                  of 10 GB daily delta
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving out of order events can produce incorrect
                  results with default last write wins. Requires custom event
                  time based merge logic or vector clocks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata bloat from long retention slows timeline operations.
                  10,000 commits can increase cleanup from milliseconds to
                  seconds, requiring retention policy tuning
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
                  Workload scales from 2 TB to 20 TB daily ingestion: existing
                  compaction schedule falls behind, log files accumulate, and
                  queries slow 36x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Two parallel writers update the same file group without locks:
                  one write is silently lost, causing missing records in
                  downstream analytics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consumer checkpoint corrupted during storage failure: system
                  rewinds to 7 day old instant, reprocessing 70 GB and creating
                  duplicate aggregations downstream
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHudiTableFormatFailureModesAndProductionChallenges;
