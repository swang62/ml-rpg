import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesStatefulStreamingKeyedStateManagementAndWindowing: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Stateful Streaming: Keyed State Management and Windowing
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Spark for Batch
            </p>
            <p style="margin-top: 0">
              Apache Spark dominates batch feature engineering with DataFrame
              and SQL APIs that scale to petabyte datasets. Key operations
              include window functions for rolling aggregates (sum of purchases
              in last 30 days), joins across multiple tables (user profile
              joined to transaction history), and user defined functions for
              custom transformations. Spark excels at throughput: 1 billion row
              aggregation completing in 10 to 30 minutes on a 50 node cluster.
              Incremental processing with Delta Lake or Hudi enables processing
              only new data since last run, cutting compute by 10 to 100x.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Flink for Streaming
            </p>
            <p style="margin-top: 0">
              Apache Flink provides true event time processing with watermarks
              for handling late data, exactly once semantics through
              checkpointing, and low latency windowed aggregations. For a
              "purchases in last 5 minutes" feature, Flink maintains per entity
              state, updates on each event, and emits results as windows close.
              Latency from event to feature availability is typically 1 to 30
              seconds. Uber and Alibaba run Flink at millions of events per
              second for real time ML features.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Kafka Streams Alternative
            </p>
            <p style="margin-top: 0">
              For simpler streaming needs, Kafka Streams offers a lightweight
              library (no separate cluster) that processes data directly from
              Kafka. Suitable for stateless transformations, simple
              aggregations, and teams already operating Kafka. Trades off Flink
              power features like complex event processing and sophisticated
              windowing for operational simplicity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Orchestration
            </p>
            <p style="margin-top: 0">
              Airflow or Dagster schedule batch pipelines with dependency
              management and retry logic. Feature freshness SLAs drive
              scheduling: a 1 hour freshness requirement means hourly job runs
              with 15 minute buffer for compute time and retries.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 550px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Event Stream (user_id, action, timestamp)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                    user_42, click, 10:00:03
                    <br />
                    user_42, view, 10:00:07
                    <br />
                    user_99, click, 10:00:05
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Keyed by user_id
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Stateful Operator: 5-min Tumbling Window
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    <strong>State per key:</strong> count, last_seen
                    <br />
                    <strong>Watermark:</strong> 10:04:00 (emit 10:00-10:05)
                    <br />
                    <strong>TTL:</strong> 1 hour (drop old keys)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Checkpoint every 30s
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Output: (user_id, window_start, count)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px; font-family: monospace">
                    user_42, 10:00:00, 2<br />
                    user_99, 10:00:00, 1
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
                  Keyed state partitions by entity ID, co-locating all events
                  for a user or item to enable rolling features without external
                  lookups, scaling to multi-terabyte state across clusters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watermarks signal event time progress and trigger window
                  emission. Calibrate watermark lag to observed P99
                  inter-arrival times: too tight drops late data, too loose
                  delays outputs and inflates memory
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Checkpoints snapshot state every 10 to 60 seconds for exactly
                  once recovery. With 500GB state, full checkpoints take 3 to 5
                  minutes; incremental checkpoints reduce this to under 1 minute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  State TTL aligned to feature horizon prevents unbounded
                  growth. For 7 day rolling features, set TTL to 7 days plus
                  watermark lag to evict old keys automatically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Approximate aggregations like HyperLogLog for cardinality
                  (1.5% error with 12KB per key) or Count-Min Sketch for
                  frequency keep state sub-linear for billion key workloads
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data skew on hot keys (super-active users) causes partition
                  imbalance. Mitigate with key salting or local pre-aggregation
                  before global aggregation to distribute load
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
                  LinkedIn feed ranking: Flink pipeline maintains per-member
                  rolling engagement features (likes, comments, shares over 30
                  minutes) with 10 minute session windows. State size: 800GB
                  across 200 task slots. Checkpoint interval: 45 seconds.
                  Recovery time: 2 minutes with incremental checkpoints.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber real-time ETL: Stateful deduplication within 5 minute
                  windows per trip ID to handle retry storms. State pruned with
                  TTL equal to window size plus 2 minute watermark lag. Prevents
                  duplicate fare calculations.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix viewing features: Per-user rolling count of genres
                  watched in last 24 hours using sliding 1 hour windows. State
                  compaction with approximate counting (lossy counting
                  algorithm) keeps per-user state under 5KB while tracking
                  thousands of genre interactions.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesStatefulStreamingKeyedStateManagementAndWindowing;
