import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesExactlyOnceSemanticsIdempotencyCheckpointsAndSinkGuarantees: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Exactly Once Semantics: Idempotency, Checkpoints, and Sink
            Guarantees
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Spark Cost
            </p>
            <p style="margin-top: 0">
              Spot instances reduce Spark costs by 60 to 80 percent. A 100 node
              Spark cluster processing 1 terabyte takes 30 minutes at roughly
              $50 on demand or $10 to $20 on spot. Incremental processing with
              Delta Lake reads only changed partitions, cutting compute by 10 to
              100x for daily jobs with 1 to 5 percent data change. Auto scaling
              clusters start small and grow based on shuffle data size, avoiding
              over provisioning.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Streaming Flink Cost
            </p>
            <p style="margin-top: 0">
              Always on infrastructure costs 2 to 5x more than equivalent batch
              capacity. A Flink cluster processing 10,000 events per second with
              1 hour state retention runs continuously at roughly $500 to $1,000
              per month. Right sizing task parallelism to match throughput
              prevents over provisioning: if each task handles 1,000 events per
              second, 10,000 events per second needs 10 tasks plus 50 percent
              headroom.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Materialization Strategy
            </p>
            <p style="margin-top: 0">
              Not all features need streaming. Analyze feature freshness
              sensitivity: if a feature shows no quality degradation with 1 hour
              staleness, use batch instead of streaming and save 80 percent
              cost. Reserve streaming for the 10 to 20 percent of features where
              freshness materially impacts model performance. Teams often move
              30 or more features from streaming to batch after sensitivity
              analysis shows no measurable CTR difference.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Capacity Planning
            </p>
            <p style="margin-top: 0">
              Size streaming clusters for peak plus headroom, not average. Black
              Friday traffic at 10x normal requires 10x streaming capacity or
              aggressive load shedding. Pre scale before known peaks. Monitor
              backpressure and consumer lag to detect under provisioning before
              it impacts freshness SLAs.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Stream with Barriers</strong>
                  <div style="margin-top: 6px; font-size: 12px; font-family: monospace">
                    event1 → event2 → [BARRIER-5] → event3
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Operator State Snapshot
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    On barrier: pause, write state to S3
                    <br />
                    State: &#123;user_42: count=10, user_99: count=3&#125;
                    <br />
                    Duration: 30s for 500GB state
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ✗ FAILURE
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Recovery from Checkpoint 5
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Restore state: &#123;user_42: count=10, ...&#125;
                    <br />
                    Replay from barrier 5: event3 onwards
                    <br />
                    Idempotent sink: upsert count=10 (no duplicate)
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
                  Exactly once requires coordinated checkpoints every 10 to 60
                  seconds plus idempotent or transactional sinks. Without both,
                  failures cause duplicate or missing feature updates that
                  degrade model accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoint barriers injected into streams ensure consistent
                  global snapshots: all operators checkpoint at the same logical
                  stream position. With 500GB state, full checkpoint writes 130
                  MB per second to remote storage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Idempotent sinks like key value upserts (user_42 count = 10)
                  produce same result on replay. Non-idempotent sinks like
                  append or increment (count += 1) break exactly once, causing
                  duplicates on recovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly once adds 5 to 15% throughput overhead from checkpoint
                  coordination and pauses. At least once is simpler and faster
                  but requires downstream dedup or tolerates approximate
                  features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Incremental checkpoints only write changed state, reducing
                  checkpoint time from 5 minutes to under 1 minute for 500GB
                  state with 20% change rate per interval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transactional sinks use two-phase commit: pre-commit during
                  checkpoint, commit after checkpoint completes. Kafka
                  transactional producer example: writes visible only after
                  checkpoint barrier
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
                  Uber trip features: Exactly once pipeline writes per-driver
                  rolling features to Cassandra with upsert (idempotent).
                  Checkpoint every 30 seconds. Recovery replays from last
                  checkpoint without duplicate counts. Overhead: 8% throughput
                  vs at least once.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn activity counts: At least once pipeline for
                  approximate engagement counts. Accepts 0.1% overcount from
                  duplicates after failures. Simpler ops, 15% higher throughput,
                  no checkpoint coordination overhead.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix viewing aggregates: Exactly once with incremental
                  checkpoints to S3. State: 400GB. Full checkpoint: 4 minutes.
                  Incremental: 50 seconds (15% state change per interval).
                  Recovery time: 2 minutes. Transactional writes to Delta Lake
                  ensure atomic commits.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb booking features: Pipeline failure during peak caused
                  2x click counts with at least once mode, biasing Click Through
                  Rate (CTR) model training by 5%. Switched to exactly once with
                  idempotent Redis upserts. Overhead: 10% throughput, eliminated
                  training data corruption.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesExactlyOnceSemanticsIdempotencyCheckpointsAndSinkGuarantees;
