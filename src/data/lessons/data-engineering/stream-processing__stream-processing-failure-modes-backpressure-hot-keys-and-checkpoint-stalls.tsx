import type { Component } from "solid-js";

const LessonStreamProcessingStreamProcessingFailureModesBackpressureHotKeysAndCheckpointStalls: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Stream Processing Failure Modes: Backpressure, Hot Keys, and
            Checkpoint Stalls
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Backpressure occurs when a slow sink or downstream operator cannot
            keep up with incoming data rate. Buffers fill, upstream operators
            stall, and end to end latency balloons from milliseconds to seconds
            or minutes. Symptoms include increasing consumer lag, growing
            in-memory buffers, and missed Service Level Agreements (SLAs). Hot
            keys amplify this: if 10 percent of traffic hashes to one partition,
            that task saturates CPU while others idle. Mitigations include key
            salting (appending a small deterministic suffix to spread load),
            rate limiting at ingestion, and autoscaling based on consumer lag
            and operator busy time metrics rather than CPU alone. Checkpoint
            stalls happen when state size or storage bandwidth causes checkpoint
            durations to exceed targets. Barrier alignment in Flink halts fast
            sources until slow operators complete their snapshots, compounding
            latency. A job with 200 GB state per task checkpointing to network
            storage might take 30 to 60 seconds at p99, during which sources
            pause. On failure, rebuilding state from changelogs can take minutes
            to hours depending on state size and replay rate. During recovery,
            consumer lag accrues and violates latency SLAs. Mitigations include
            incremental checkpoints, faster storage like Solid State Drives
            (SSDs) or object stores with high bandwidth, state compaction via
            Time to Live (TTL), and standby replicas that maintain warm local
            state for sub-second failover. Late data and out of order arrivals
            break correctness when events arrive after watermarks close windows.
            Clock skew at producers, network partitions, or mobile offline
            queues cause arrivals minutes to hours late. Without late data
            handling, you silently drop events or mis-aggregate. Allowed
            lateness extends windows beyond watermark, side outputs route late
            events to correction streams, and retractions or upserts fix
            previously emitted results. Production systems calibrate allowed
            lateness to empirical skew (commonly seconds to a few minutes) and
            design sinks that support updates or idempotent writes keyed by
            deterministic event IDs.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backpressure from slow sinks stalls upstream operators and
                  increases end to end latency from milliseconds to seconds; hot
                  keys (10 percent of keys causing 50 percent of load) saturate
                  tasks while others idle
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoint stalls occur when 200 GB state takes 30 to 60
                  seconds to snapshot; barrier alignment pauses sources, and
                  recovery from failure can take minutes to hours accruing
                  consumer lag
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late data beyond watermarks causes silent drops or incorrect
                  aggregates; clock skew and mobile offline queues produce
                  arrivals minutes to hours late requiring allowed lateness
                  windows or side outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Key salting spreads hot keys by appending deterministic suffix
                  (for example user_123 becomes user_123_0, user_123_1) and
                  re-aggregating downstream; reduces single task saturation by
                  factor of salt cardinality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental checkpoints and standby replicas reduce recovery
                  time from minutes to seconds; faster Solid State Drive (SSD)
                  storage cuts checkpoint duration from 60 seconds to under 10
                  seconds at same state size
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
                  A fraud detection pipeline with a hot merchant ID consuming 40
                  percent of traffic salts the key with hash(merchant_id) mod 4,
                  distributing load across 4 tasks and reducing p99 latency from
                  800ms to 120ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  An analytics job with 150 GB local state switches from 60
                  second checkpoints on Hard Disk Drive (HDD) to incremental
                  snapshots on SSD, cutting checkpoint time to 8 seconds and
                  recovery time from 12 minutes to 90 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStreamProcessingStreamProcessingFailureModesBackpressureHotKeysAndCheckpointStalls;
