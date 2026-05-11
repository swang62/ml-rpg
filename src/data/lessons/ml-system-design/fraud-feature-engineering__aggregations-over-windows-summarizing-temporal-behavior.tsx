import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringAggregationsOverWindowsSummarizingTemporalBehavior: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Aggregations Over Windows: Summarizing Temporal Behavior
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Window-Based Aggregations
            </p>
            <p>
              Aggregations summarize behavior over time windows: count of
              transactions in last hour, sum of amounts in last 24 hours,
              average transaction size in last 7 days. These features compress
              temporal sequences into single values the model can process.
              Multiple window sizes capture different behavioral scales—hourly
              bursts versus weekly patterns.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Common Aggregations:</strong> COUNT (frequency), SUM
              (volume), AVG (typical size), MAX (largest event), MIN (smallest
              event), STDDEV (variability), DISTINCT_COUNT (diversity of
              merchants/devices).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Window Size Selection
            </p>
            <p>
              Short windows (1 hour, 1 day) capture recent behavioral spikes.
              Long windows (30 days, 90 days) capture baseline behavior. Use
              both: compare current velocity to historical baseline. A user with
              10 transactions in the last hour is suspicious if their 30-day
              average is 2 per day, but normal if their average is 50 per day.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sliding vs Tumbling Windows
            </p>
            <p>
              Sliding windows update continuously—the 1-hour count changes with
              every new event. Tumbling windows reset at fixed intervals—the
              daily count resets at midnight. Sliding windows provide smoother
              signals but require more computation. Tumbling windows are cheaper
              but create boundary artifacts (behavior at 11:59 PM is
              disconnected from 12:01 AM).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Implementation Tip:</strong> Pre-compute tumbling window
              aggregations in batch pipelines (hourly, daily). Compute sliding
              window approximations in real-time by combining tumbling windows
              with partial current-window counts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Group-By Dimensions
            </p>
            <p>
              Aggregate by different dimensions: per-user, per-device,
              per-merchant, per-IP address. A user with normal overall velocity
              but 5 transactions to the same merchant in 10 minutes shows
              suspicious per-merchant concentration. Multi-dimensional
              aggregations reveal patterns invisible in single-dimension views.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; font-weight: 700; font-size: 14px; margin-bottom: 8px">
                  Multi Window Strategy for Card Velocity
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">1 min</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      count: 3<br />
                      Use: velocity attack
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">1 hour</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      count: 8<br />
                      Use: session pattern
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">7 day</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      count: 45
                      <br />
                      Use: baseline
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 13px">Decision Logic</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    If 1min &gt; 20: block (velocity attack)
                    <br />
                    If 1hour / 7day_avg &gt; 5: review (anomaly)
                    <br />
                    Model learns feature weights from training data
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
                  Multiple window sizes capture different scales: short windows
                  (1hr, 1d) for spikes, long windows (30d, 90d) for baseline
                  comparison
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sliding windows update continuously but cost more; tumbling
                  windows are cheaper but create boundary artifacts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Aggregate by multiple dimensions (user, device, merchant, IP)
                  to reveal patterns invisible in single-dimension views
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
                  Common aggregations: COUNT (frequency), SUM (volume), AVG
                  (typical size), STDDEV (variability), DISTINCT_COUNT
                  (diversity)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare current to baseline: 10 transactions in last hour is
                  suspicious if 30-day average is 2/day, normal if 50/day
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringAggregationsOverWindowsSummarizingTemporalBehavior;
