import type { Component } from "solid-js";

const LessonDataDriftDetectionBaselineSelectionAndWindowingStrategy: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Baseline Selection and Windowing Strategy
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BASELINE SELECTION
            </p>
            <p>
              What distribution should current data be compared against? The
              choice fundamentally affects what you detect.
            </p>
            <p>
              <strong>Training data baseline:</strong> Compare production to
              training distribution. Detects when production diverges from what
              the model learned. Problem: training data may be old, and some
              divergence is expected as the world changes.
            </p>
            <p>
              <strong>Recent production baseline:</strong> Compare current
              window to recent past (e.g., last 30 days). Detects sudden
              changes. Does not detect gradual drift that happens slowly over
              months.
            </p>
            <p>
              <strong>Rolling baseline:</strong> Continuously update baseline as
              new data arrives. Adapts to expected change but may miss sustained
              drift that happens gradually.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WINDOWING STRATEGIES
            </p>
            <p>
              <strong>Fixed windows:</strong> Compare daily, weekly, or monthly
              aggregates. Simple to implement. Window size affects sensitivity:
              smaller windows detect faster but have more noise; larger windows
              are more stable but slower to detect.
            </p>
            <p>
              <strong>Sliding windows:</strong> Continuously compare last N
              hours/days to baseline. More responsive than fixed windows.
              Requires more compute as you recalculate continuously.
            </p>
            <p>
              <strong>Exponentially weighted:</strong> Recent samples weighted
              more heavily. Balances responsiveness and stability. Decay
              parameter controls the tradeoff.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PRACTICAL GUIDELINES
            </p>
            <p>
              For high-velocity domains (real-time bidding, fraud), use hourly
              windows with rolling baselines. For stable domains (document
              classification), use weekly windows with training baselines.
            </p>
            <p>
              Sample size matters: statistical tests require sufficient samples.
              If you have only 100 samples per window, you cannot reliably
              detect small drifts. Minimum 1000 samples per window is a common
              rule of thumb.
            </p>
            <p>
              Multi-resolution monitoring: track drift at multiple window sizes
              simultaneously. Hourly windows catch sudden changes; monthly
              windows catch gradual drift.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Shorter windows detect faster
              but produce more false alarms. Longer windows are more stable but
              miss rapid changes. Use multiple window sizes for defense in
              depth.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; align-items: stretch">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">
                      Static Training Baseline
                    </strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      ✓ Catches long term decay
                      <br />✗ Over-alerts on seasonality
                      <br />
                      Use: Retraining decisions
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1">
                    <strong style="font-size: 13px">Rolling Baseline</strong>
                    <div style="font-size: 11px; margin-top: 6px">
                      ✓ Adapts to seasonality
                      <br />✗ Can mask slow drift
                      <br />
                      Use: Incident detection
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 3px; border-radius: 6px">
                  <div style="font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; margin-bottom: 3px">
                    Tumbling Windows (hourly)
                  </div>
                  <div style="display: flex; gap: 2px; padding: 4px">
                    <div style="border: 1px solid; padding: 8px 4px; flex: 1; text-align: center; font-size: 10px">
                      00:00
                      <br />
                      to
                      <br />
                      01:00
                    </div>
                    <div style="border: 1px solid; padding: 8px 4px; flex: 1; text-align: center; font-size: 10px">
                      01:00
                      <br />
                      to
                      <br />
                      02:00
                    </div>
                    <div style="border: 1px solid; padding: 8px 4px; flex: 1; text-align: center; font-size: 10px">
                      02:00
                      <br />
                      to
                      <br />
                      03:00
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 3px; border-radius: 6px">
                  <div style="font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; margin-bottom: 3px">
                    Sliding Windows (30 min, step 5 min)
                  </div>
                  <div style="display: flex; gap: 1px; padding: 4px; position: relative">
                    <div style="border: 1px solid; padding: 8px 2px; flex: 1; text-align: center; font-size: 9px">
                      00:00
                    </div>
                    <div style="border: 1px solid; padding: 8px 2px; flex: 1; text-align: center; font-size: 9px">
                      00:05
                    </div>
                    <div style="border: 1px solid; padding: 8px 2px; flex: 1; text-align: center; font-size: 9px">
                      00:10
                    </div>
                    <div style="border: 1px solid; padding: 8px 2px; flex: 1; text-align: center; font-size: 9px">
                      00:15
                    </div>
                    <div style="border: 1px solid; padding: 8px 2px; flex: 1; text-align: center; font-size: 9px">
                      00:20
                    </div>
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
                  Baseline options: training data (detects divergence from
                  learned), recent production (detects sudden changes), rolling
                  (adapts to expected change)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Window size tradeoff: smaller = faster detection + more noise;
                  larger = stable + slower; use multiple resolutions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Minimum 1000 samples per window for reliable statistical
                  tests; high-velocity domains need hourly windows
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
                  Interview Tip: Explain baseline selection tradeoffs—training
                  baseline vs rolling baseline.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe multi-resolution monitoring: hourly
                  for sudden changes, monthly for gradual drift.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDriftDetectionBaselineSelectionAndWindowingStrategy;
