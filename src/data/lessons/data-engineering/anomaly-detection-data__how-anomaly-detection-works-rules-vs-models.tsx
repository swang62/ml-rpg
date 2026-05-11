import type { Component } from "solid-js";

const LessonAnomalyDetectionDataHowAnomalyDetectionWorksRulesVsModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Anomaly Detection Works: Rules vs Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Two Approaches:</strong> Data anomaly detection uses
            either static rule based checks or dynamic model based approaches.
            Understanding when to use each is critical for building reliable
            detection systems.
            <strong>Rule Based Detection:</strong> You define explicit
            thresholds for each metric. For example, "alert if row count is
            below 4 million or above 7 million" or "flag if <code>user_id</code>{" "}
            null ratio exceeds 0.5%". These rules are deterministic and easy to
            explain to stakeholders. When an alert fires, you can point to the
            exact threshold that was violated. The problem is that data evolves.
            Your daily row count might grow from 5 million to 15 million over
            six months due to product growth. Now your upper threshold of 7
            million triggers false positives constantly, requiring manual
            updates to every rule.
            <strong>Model Based Detection:</strong> Instead of fixed thresholds,
            the system learns what normal looks like from historical data. For
            example, AWS Glue Data Quality analyzes past runs to build
            baselines, then predicts an expected range for the next batch. If
            your row count has been growing 2% per week for the last 30 days,
            the model expects next week's count to be around 5.1 million, not
            the static 5 million from a month ago. It automatically adapts to
            trends and seasonality.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Detection Latency Comparison
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 5 min
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    BATCH DETECTION
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">
                    &lt; 2 min
                  </div>
                  <div style="font-size: 10px; font-weight: 600">
                    STREAMING DETECTION
                  </div>
                </div>
              </div>
            </div>
            <strong>The Learning Process:</strong> Model based systems require a
            warmup period. AWS Glue needs at least three historical data points
            before it can start predicting, but accuracy improves significantly
            with more history. A typical setup uses 30 to 90 days of past
            metrics to establish baselines. The system captures patterns like
            weekday versus weekend traffic (which might vary by 40%), monthly
            payment cycles, or gradual growth trends. When a new metric falls
            outside the predicted bounds, it triggers an anomaly.
            <strong>Handling Seasonality:</strong> This is where models shine.
            An e-commerce site might see 10x traffic during Black Friday. A
            static rule would either miss real anomalies during normal periods
            (if set too loose) or trigger constant false alarms during peak
            events (if set too tight). A model trained on full year cycles
            learns that November spikes are normal and adjusts expected ranges
            accordingly.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rule based detection uses fixed thresholds (row count between
                  4M and 7M) that are easy to explain but require manual updates
                  as data evolves
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model based detection learns from 30 to 90 days of history,
                  automatically adapting to growth trends (2% weekly increase)
                  and seasonality (weekday vs weekend patterns)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AWS Glue requires minimum 3 historical runs to start
                  predictions, improving accuracy with more data points over
                  time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detection latency varies: batch systems check after each job
                  (under 5 minutes), streaming systems detect within 1 to 2
                  minutes at 10k to 100k events per second
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
                  A retail pipeline writes 5M rows daily during normal weeks but
                  50M during Black Friday. Rule based detection with a fixed 7M
                  upper bound would fail. Model based detection trained on
                  yearly data recognizes November spikes as normal.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  User signups grow 15% month over month. A static rule flagging
                  row counts above 1.2M becomes obsolete in three months. An
                  adaptive model automatically adjusts the expected range from
                  1.2M to 1.8M.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weekend traffic drops 40% compared to weekdays. Model based
                  detection learns this pattern and expects 3M rows on Saturday
                  versus 5M on Tuesday, avoiding false positives.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAnomalyDetectionDataHowAnomalyDetectionWorksRulesVsModels;
