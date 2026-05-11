import type { Component } from "solid-js";

const LessonStreamProcessingStatefulStreamProcessingLocalStateCheckpointsAndFaultTolerance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Stateful Stream Processing: Local State, Checkpoints, and Fault
            Tolerance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Stateful stream processing maintains per-key or per-operator state
            co-located with the compute that processes those keys. This enables
            aggregations, joins, deduplication, and temporal pattern detection
            without remote database lookups. An embedded key value store keeps
            state local, achieving operator latencies of 10 to 100 milliseconds
            even with hundreds of gigabytes of state per task. State is
            partitioned alongside the data stream, so all events for user_123
            and all state for user_123 live on the same worker. Fault tolerance
            comes from periodic consistent snapshots called checkpoints. The
            system captures in-flight stream positions (offsets) plus a snapshot
            of all operator state atomically, writing to durable storage. On
            failure, jobs restart from the last completed checkpoint, replaying
            from those offsets. Typical production checkpoint intervals are 30
            to 300 seconds. State is also backed by durable changelogs
            (compacted Kafka topics in Kafka Streams or RocksDB snapshots in
            Flink), enabling fast local recovery by replaying recent changes
            instead of downloading full snapshots. Exactly once end to end
            semantics require coupling checkpoint barriers with transactional or
            idempotent sink writes. The checkpoint barrier flows through the
            pipeline; only after all operators snapshot their state and the sink
            transaction commits does the checkpoint complete. Without
            transactional sinks, you have at least once delivery and must design
            idempotent handlers with deduplication keys. Two phase commit adds
            latency and can reduce throughput under contention, so many
            production systems accept at least once to fast sinks like metrics
            or notifications and handle duplicates downstream.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Operator State</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    user_123 → count: 47
                    <br />
                    user_456 → count: 89
                    <br />
                    Offset: partition_0 @ 12,450
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Checkpoint Barrier
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Durable Storage</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Snapshot #47 (t=90s)
                    <br />
                    State: 2.3 GB
                    <br />
                    Duration: 8.2s
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ On Failure
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Restore &amp; Replay</strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Load snapshot #47
                    <br />
                    Replay from offset 12,450
                    <br />
                    Recovery time: 45s
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
                  Local state co-location eliminates remote lookups; typical
                  production jobs maintain hundreds of gigabytes to
                  multi-terabyte state per job with p99 operator latency of 10
                  to 100 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoints provide fault tolerance by snapshotting stream
                  positions and operator state every 30 to 300 seconds; recovery
                  replays from last checkpoint, trading frequency against
                  overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly once end to end requires transactional sinks or two
                  phase commit; otherwise use at least once with idempotent
                  writes and deduplication keys like event IDs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large state slows checkpoints and recovery; a job with 100 GB
                  state per task can take 1 to 30 seconds to checkpoint and
                  minutes to recover, accruing consumer lag during downtime
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Changelogs enable fast recovery by replaying recent changes
                  instead of downloading full snapshots; Kafka Streams uses
                  compacted topics, Flink uses RocksDB incremental snapshots
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
                  OpenAI's Flink platform stores durable state in blob storage
                  decoupled from compute; jobs automatically restart on healthy
                  clusters during outages with checkpoint intervals tuned to
                  balance recovery time and overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Amazon Kinesis Data Analytics targets checkpoint durations
                  under 30 seconds at p99 for production workloads processing
                  billions of events per hour, using incremental checkpoints for
                  large state
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStreamProcessingStatefulStreamProcessingLocalStateCheckpointsAndFaultTolerance;
