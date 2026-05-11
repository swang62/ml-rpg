import type { Component } from "solid-js";

const LessonDeltaLakeInternalsOptimisticConcurrencyHowMultipleWritersStaySafe: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Optimistic Concurrency: How Multiple Writers Stay Safe
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Concurrency Challenge:</strong> In a production
            lakehouse, dozens of batch jobs and streaming pipelines write to the
            same Delta table simultaneously. How do you prevent conflicting
            updates without locking the table and destroying throughput? Delta
            Lake uses optimistic concurrency control (OCC). Writers assume
            conflicts are rare, perform their work independently, and validate
            only at commit time. This contrasts with pessimistic locking (like
            row locks in traditional databases), which would serialize all
            writes and kill performance.
            <strong>The Write Flow:</strong> Here is how a job commits a change:
            First, read the current table snapshot at version N and record which
            files you read (the read set). Second, perform your computation and
            stage new Parquet files. Third, construct a proposed commit with Add
            actions for new files and Remove actions for any files you logically
            delete. Fourth, attempt to write the next log entry (version N+1) to
            the transaction log. Before finalizing the commit, validate that
            none of the files in your read set have been removed or modified by
            concurrent writers. You do this by checking if any Remove actions
            appeared in log versions between N and the current latest version.
            If validation passes, your commit succeeds. If validation fails, you
            have a conflict.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Only one writer can successfully
              append version N+1. Object storage operations like atomic rename
              or conditional puts enforce this. The second writer trying to
              write version N+1 fails, detects a conflict, and must retry.
            </div>
            <strong>Conflict Resolution:</strong> When a conflict occurs, the
            job refreshes its snapshot to the latest version and retries. If Job
            A and Job B both start at version 100 and try to update different
            partitions, only one will win the race to write version 101. The
            loser refreshes to version 101, re-validates its changes against the
            new state, and writes version 102. In practice, partition level
            isolation helps reduce conflicts. If jobs update disjoint
            partitions, their commits typically succeed without conflict.
            However, for high contention scenarios (many writers updating the
            same partition), you see increased retry cycles.
            <strong>Real Numbers from Production:</strong> At a large streaming
            deployment ingesting 200,000 events per second across 10 concurrent
            writers, conflict rates stay under 2% because each writer targets a
            different time partition. Average end to end latency per microbatch
            is 6 to 8 seconds including commit. When conflicts occur, retry adds
            1 to 3 seconds. For batch workloads with 50 concurrent jobs writing
            to overlapping partitions, conflict rates can rise to 10 to 15%.
            Each conflict triggers a full recomputation of the affected
            partition, which may take minutes. This is why production systems
            carefully shard workloads and use incremental processing to minimize
            contention.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 12px; text-align: center; font-weight: 700; font-size: 13px">
                Concurrent Writers Committing
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 600; font-size: 12px">
                    Job A reads v100
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 600; font-size: 12px">
                    Writes v101 ✓
                  </div>
                </div>
                <div style="display: flex; gap: 12px; align-items: center">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 600; font-size: 12px">
                    Job B reads v100
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 600; font-size: 12px">
                    v101 conflict
                  </div>
                  <div style="font-size: 18px; font-weight: bold">→</div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; min-width: 100px; text-align: center; font-weight: 600; font-size: 12px">
                    Retry at v101
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
                  Optimistic concurrency control (OCC) assumes conflicts are
                  rare: writers perform work independently and validate only at
                  commit time, avoiding locks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Commit validation checks if any files in the read set were
                  removed by concurrent writers between the start version and
                  commit time, failing if conflicts exist
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition level isolation reduces conflicts: jobs updating
                  disjoint partitions (different date ranges or customer IDs)
                  commit without interference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High contention workloads (10 to 15% conflict rates) suffer
                  retry cycles that add 1 to 3 seconds per attempt, making
                  workload sharding critical for performance
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
                  Streaming workload with 10 writers, each targeting a different
                  hourly partition: conflict rate under 2%, average commit
                  latency 6 to 8 seconds including validation and log write.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch workload with 50 jobs updating overlapping partitions:
                  conflict rate 10 to 15%, with each conflict triggering a full
                  partition recomputation that takes minutes.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeltaLakeInternalsOptimisticConcurrencyHowMultipleWritersStaySafe;
