import type { Component } from "solid-js";

const LessonFeatureTransformationPipelinesTrainingServingSkewAchievingFeatureParityAcrossPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Serving Skew: Achieving Feature Parity Across Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Event Time Windows
            </p>
            <p style="margin-top: 0">
              Windowed aggregations are the foundation of temporal features.
              Tumbling windows divide time into fixed non overlapping intervals
              (hourly buckets). Sliding windows overlap by a slide interval (30
              minute window sliding every 5 minutes for fresher updates).
              Session windows group events by activity gaps (user session ending
              after 30 minutes of inactivity). The window type determines
              freshness: tumbling windows update once per interval, sliding
              windows update more frequently.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Late Event Handling
            </p>
            <p style="margin-top: 0">
              Real world events arrive out of order due to network delays,
              mobile offline sync, and distributed system clocks. Watermarks
              define how long to wait for late events before closing windows. A
              watermark of 10 minutes means windows wait 10 minutes past event
              time before finalizing. Events arriving after watermark are either
              dropped (losing accuracy) or trigger recomputation (adding
              complexity). Flink supports allowed lateness to continue updating
              closed windows for a grace period.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              State Management
            </p>
            <p style="margin-top: 0">
              Streaming aggregations maintain state per entity per window. For
              10 million users with 5 minute sliding windows and 1 hour
              lookback, you maintain 12 window states per user equals 120
              million state entries. State size grows with entity count, window
              granularity, and feature complexity. Flink checkpoints state to
              durable storage every few seconds for fault tolerance, with
              checkpoint intervals balancing recovery speed against checkpoint
              overhead.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backpressure Handling
            </p>
            <p style="margin-top: 0">
              When upstream event rate exceeds processing capacity, pipelines
              must slow down or drop events gracefully. Flink uses backpressure
              propagation to slow Kafka consumers. Without proper handling,
              buffer overflow causes out of memory errors or uncontrolled event
              loss.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Shared Feature Definition
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px; font-family: monospace">
                    user_clicks_30min = COUNT(clicks)
                    <br />
                    WHERE event_time &gt; now() - 30min
                    <br />
                    GROUP BY user_id
                  </div>
                </div>
                <div style="display: flex; gap: 16px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">
                      Offline Path (Training)
                    </strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      → Spark batch job
                      <br />→ Compute over historical partitions
                      <br />→ Output: training dataset
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">
                      Online Path (Serving)
                    </strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      → Flink streaming job
                      <br />→ 30-min sliding window
                      <br />→ Output: online feature store
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Validation: Replay test
                  </strong>
                  <div style="margin-top: 4px; font-size: 12px">
                    Compare offline vs online over same time range
                    <br />
                    Alert if difference &gt; 1%
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
                  Training serving skew causes 10 to 30% accuracy drops when
                  offline batch features for training differ from online
                  streaming features at inference due to separate code paths or
                  time semantics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature stores consolidate logic into shared declarative specs
                  compiled to both Spark batch (for training) and Flink
                  streaming (for serving), ensuring identical transformation
                  logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replay validation replays historical events through streaming
                  pipeline and compares against batch computed features over
                  same time range, catching skew from watermark bugs or null
                  handling differences
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Continuous monitoring compares streaming aggregates against
                  batch recomputes with alerts on 1% threshold exceeded,
                  detecting drift from code changes or configuration mismatches
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reference data versioning uses point in time lookups at event
                  time to match training's historical join semantics, preventing
                  skew from profile or catalog updates between training and
                  serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Event time vs processing time inconsistencies are a top skew
                  source: training on processing time windows but serving with
                  event time windows shifts feature boundaries by minutes to
                  hours
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
                  Airbnb search ranking: Unified feature definitions in Python
                  deployed to both Spark for training dataset generation and
                  Flink for real time serving. Replay tests run nightly,
                  comparing 24 hour batches. Caught skew where offline used UTC
                  timestamps but online used local time zones, causing 15%
                  accuracy drop.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip ETA prediction: Per-driver features like completed
                  trips in last 7 days computed identically offline and online.
                  Point in time joins for driver profile (vehicle type, rating)
                  at trip event time. Continuous validation monitors hourly
                  aggregates with 0.5% tolerance, alerting on schema evolution
                  bugs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation model: Feature store compiles feature
                  definitions to Spark SQL for backfills and Flink SQL for
                  streaming. Automated integration tests replay 1 week of
                  production traffic monthly, comparing outputs. Prevented
                  serving time skew when streaming pipeline had different null
                  handling for missing user profiles.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureTransformationPipelinesTrainingServingSkewAchievingFeatureParityAcrossPipelines;
