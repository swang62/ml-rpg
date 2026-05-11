import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringOnlineAndOfflineFeatureComputationArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Online and Offline Feature Computation Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Two-Pipeline Architecture
            </p>
            <p>
              Temporal features require different computation strategies based
              on freshness requirements. Offline pipelines (batch) compute
              features over large windows (30-day averages, historical
              aggregations) on a schedule. Online pipelines (streaming) compute
              features in real-time from event streams. The feature store serves
              both, providing unified access regardless of computation path.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Architecture Pattern:</strong> Batch pipeline computes
              historical baselines nightly. Streaming pipeline updates
              short-window aggregations (hourly counts) in real-time. Serving
              layer joins both at inference time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Pipeline
            </p>
            <p>
              Batch jobs run on data warehouses (Spark, BigQuery) processing
              full historical data. Compute 30-day averages, 90-day maximums,
              lifetime statistics. Output writes to feature store. Runs daily or
              hourly depending on freshness needs. Advantages: full data access,
              complex computations, no latency constraints. Disadvantages:
              features are stale until next batch run.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Online Pipeline
            </p>
            <p>
              Streaming jobs process events in real-time (Kafka, Flink, Spark
              Streaming). Maintain sliding window state: increment counts on new
              events, decrement when events age out. Advantages: features
              reflect activity from seconds ago. Disadvantages: limited to
              incremental computations, state management complexity, higher
              operational cost.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Hybrid Strategy:</strong> Use batch for stable baseline
              features (30-day average). Use streaming for recent activity
              (1-hour count). At inference, fetch both and compute ratios
              (current_hour / baseline_30d) for velocity detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Consistency Challenges
            </p>
            <p>
              Ensure batch and streaming compute features identically. Code
              divergence causes training-serving skew. Solutions: shared feature
              definitions, unit tests validating equivalence, periodic
              reconciliation comparing batch-computed and streaming-computed
              values for the same time windows.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 4px">
                  Hybrid Online Offline Architecture
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Online Path (Real Time)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Stream Processor → 1min, 5min windows
                    <br />
                    Per key state in memory
                    <br />
                    Write to Redis: p95 = 3ms
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Batch Path (Hourly/Daily)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Replay events → 24hr, 7day windows
                    <br />
                    Point in time joins for training
                    <br />
                    Snapshot to feature store
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Feature Store (Unified)
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px">
                    Inference: merge online + batch features
                    <br />
                    Training: point in time historical access
                    <br />
                    Shared definitions prevent skew
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
                  Batch pipelines compute historical baselines (30-day
                  averages); streaming pipelines update short-window
                  aggregations in real-time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid strategy: batch for stable baselines, streaming for
                  recent activity, compute ratios at inference time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Ensure batch and streaming compute features identically—code
                  divergence causes training-serving skew
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
                  Use Spark/BigQuery for batch (full data, complex
                  computations), Kafka/Flink for streaming (incremental,
                  real-time)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Periodic reconciliation compares batch-computed and
                  streaming-computed values to detect implementation drift
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringOnlineAndOfflineFeatureComputationArchitecture;
