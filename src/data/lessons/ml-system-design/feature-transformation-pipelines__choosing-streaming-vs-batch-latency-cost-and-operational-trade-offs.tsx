import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesChoosingStreamingVsBatchLatencyCostAndOperationalTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Streaming vs Batch: Latency, Cost, and Operational
            Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exactly Once Semantics
            </p>
            <p style="margin-top: 0">
              Guarantees each event is processed exactly once, even with
              failures and retries. Flink achieves this through coordinated
              checkpointing: periodically snapshot operator state to durable
              storage, and on failure, restart from last checkpoint and replay
              events. Combined with idempotent sinks (upsert to key value store
              keyed by entity plus window), reprocessed events produce identical
              outputs. Without exactly once, aggregations like "total purchases"
              can over or undercount by the number of reprocessed events.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Idempotent Writes
            </p>
            <p style="margin-top: 0">
              The sink must handle duplicate writes without corrupting state.
              For a "purchase count in last hour" feature, writing to Redis with
              INCR (increment) is not idempotent since replayed events increment
              again. Instead, use HSET with entity plus window hash plus event
              ID as field, counting distinct fields. Or maintain append only
              event log and compute aggregates on read. DynamoDB conditional
              updates with version numbers provide idempotent upsert semantics.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Deduplication
            </p>
            <p style="margin-top: 0">
              Upstream event sources may send duplicates due to at least once
              delivery, producer retries, or application bugs. Deduplication
              uses event IDs stored in a short term cache (Redis with 1 hour
              TTL) to filter seen events. For high volume streams, bloom filters
              provide probabilistic deduplication with controlled false positive
              rate. Without deduplication, a 1 percent duplicate rate in click
              events inflates click counts by 1 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Checkpoint Tuning
            </p>
            <p style="margin-top: 0">
              Frequent checkpoints (every 10 seconds) minimize data loss on
              failure but add overhead. Infrequent checkpoints (every 5 minutes)
              reduce overhead but require reprocessing more events on recovery.
              Balance based on event volume and acceptable recovery time. At
              10,000 events per second, a 60 second checkpoint interval means
              replaying 600,000 events on failure.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming achieves sub-500ms latency with always on clusters
                  costing $15k per month for 100M events per day, versus batch
                  at $3k per month with minute level latency scaling to zero
                  between runs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use streaming for fraud detection, real time ranking, and ads
                  bidding where sub-second freshness is required. Use batch for
                  training backfills, daily aggregations, and weekly model
                  retraining where hours of staleness is acceptable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Micro-batch provides 1 to 10 second latency with simpler
                  operations than stateful streaming, bridging the gap for near
                  real time use cases like content recommendations with 5 second
                  freshness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming operational overhead includes checkpoint management
                  (10 to 60 second intervals, 1 to 5 minute recovery),
                  backpressure monitoring, and state growth management. Batch
                  has simpler failure recovery: rerun failed partitions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time correctness with watermarks in streaming handles
                  out of order data precisely for temporal features. Batch
                  approximates with processing time and partition boundaries,
                  acceptable for coarse grained features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost scales differently: streaming pays for steady state
                  capacity regardless of volume, batch pays per job execution.
                  For bursty workloads (10x daily peaks), batch can be 5x
                  cheaper than provisioning streaming for peak capacity
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
                  Uber real time pricing: Streaming pipeline computes supply and
                  demand features (drivers available in area, ride requests in
                  last 10 minutes) with 300ms P99 latency. Always on Flink
                  cluster. Switching to batch would miss surge pricing windows.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb search ranking training: Daily Spark batch jobs
                  generate 6 months of historical features for model retraining.
                  Processes 50TB of listing views and bookings across 8k cores
                  in 4 hours. Cost: $800 per day vs $25k per month for
                  equivalent streaming cluster.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LinkedIn feed ranking: Micro-batch with 10 second intervals
                  computes engagement features (likes and comments on recent
                  posts). Simpler than stateful streaming for this latency
                  requirement. Reduces ops cost by 40% versus continuous
                  streaming.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">4</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation backfills: Monthly full historical
                  recompute of all user features over 2 years of viewing data.
                  Spark batch across 12k cores, 200TB shuffle. Cost: $15k one
                  time job. Streaming equivalent would cost $180k per month for
                  unused capacity.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesChoosingStreamingVsBatchLatencyCostAndOperationalTradeOffs;
