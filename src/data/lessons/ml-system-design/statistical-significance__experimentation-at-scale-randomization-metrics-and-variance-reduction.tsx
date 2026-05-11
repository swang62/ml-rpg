import type { Component } from "solid-js";

const LessonStatisticalSignificanceExperimentationAtScaleRandomizationMetricsAndVarianceReduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Experimentation at Scale: Randomization, Metrics, and Variance
            Reduction
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RANDOMIZATION MECHANICS
            </p>
            <p style="margin-top: 0">
              Use deterministic hashing for assignment:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                hash(user_id + salt) mod 100
              </code>
              . This ensures consistent assignment across sessions and devices.
              The salt changes per experiment to decorrelate overlapping
              experiments. Without deterministic hashing, the same user might
              flip between treatment and control, contaminating both arms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CUPED: VARIANCE REDUCTION
            </p>
            <p style="margin-top: 0">
              CUPED (Controlled-experiment Using Pre-Experiment Data) reduces
              variance by 10-40% by subtracting the regression on pre-period
              behavior. If a user had high engagement before the experiment, we
              expect high engagement during, regardless of treatment. Adjusting
              for pre-period behavior removes this source of variance, turning a
              14-day test into 9-10 days with the same power.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SAMPLE RATIO MISMATCH (SRM)
            </p>
            <p style="margin-top: 0">
              SRM checks verify that traffic splits match expectations. If you
              expect 50/50 but observe 53/47, something is wrong: client bugs
              dropping events, biased filtering, or assignment bugs. Use
              chi-squared test with p &lt; 0.001 to alarm. SRM invalidates all
              results because the observed difference may come from selection
              bias, not treatment effect.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Streaming metrics (30-60 second
              latency) provide operational visibility but cannot show
              significance early. Store per-user aggregates to enable bootstrap
              resampling without reprocessing petabytes.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SCALE CONSIDERATIONS
            </p>
            <p style="margin-top: 0">
              Large-scale experiments process tens of billions of events daily.
              Stream aggregation pipelines compute running statistics. Store
              per-arm per-user aggregates for efficient bootstrap. With 20M
              daily users, 1.6M per arm reaches 80% power for 5% CTR lift in
              hours.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">User Events</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Millions per second
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Hash(user_id) % 100</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Deterministic assignment
                  </div>
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Control</strong>
                    <div style="font-size: 12px; margin-top: 4px">0 to 49</div>
                    <div style="font-size: 11px; margin-top: 4px">
                      Baseline model
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">Treatment</strong>
                    <div style="font-size: 12px; margin-top: 4px">50 to 99</div>
                    <div style="font-size: 11px; margin-top: 4px">
                      New model
                    </div>
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-size: 13px; font-weight: bold; margin-bottom: 8px">
                    Streaming Aggregator
                  </div>
                  <div style="font-size: 11px; line-height: 1.4">
                    Per arm: users, clicks, impressions
                    <br />
                    Latency: 5 to 60 seconds
                    <br />
                    Output: CTR, CI [lower, upper]
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    CUPED Variance Reduction
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    10 to 40% variance drop
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
                  Deterministic hashing: hash(user_id + salt) mod 100 ensures
                  consistent assignment across sessions and devices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CUPED reduces variance 10-40% by adjusting for pre-period
                  behavior, shortening tests from 14 days to 9-10 days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SRM (Sample Ratio Mismatch) checks verify traffic splits;
                  53/47 instead of 50/50 invalidates all results
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store per-user aggregates for efficient bootstrap without
                  reprocessing petabytes of raw events
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
                  Explain why deterministic hashing matters: without it, users
                  flip between arms, contaminating both
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe CUPED: subtracting regression on pre-period removes
                  variance, accelerating experiments by 30-40%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention SRM as an automatic quality check: chi-squared test
                  with p&lt;0.001 triggers alarm and pause
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalSignificanceExperimentationAtScaleRandomizationMetricsAndVarianceReduction;
