import type { Component } from "solid-js";

const LessonPredictionDriftPredictionDriftFailureModesAndMitigation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Prediction Drift Failure Modes and Mitigation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FALSE ALARMS FROM EXPECTED VARIATION
            </p>
            <p>
              The most common failure: alerting on normal variation. Prediction
              distributions fluctuate naturally due to traffic patterns,
              seasonality, and random sampling. Without accounting for expected
              variation, you get alert fatigue.
            </p>
            <p>
              <strong>Detection:</strong> Track drift metrics over time.
              Establish historical percentiles. A drift value that would be 90th
              percentile historically is not alarming; 99th percentile is.
            </p>
            <p>
              <strong>Mitigation:</strong> Set thresholds based on historical
              variability, not fixed values. Require drift to persist across
              multiple time windows before alerting. Use seasonally-adjusted
              baselines.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DRIFT WITHOUT PERFORMANCE IMPACT
            </p>
            <p>
              Prediction distribution can shift without affecting model
              performance. If ground truth also shifts proportionally, accuracy
              remains stable despite prediction drift.
            </p>
            <p>
              <strong>Example:</strong> Fraud rate increases from 1% to 2% in
              reality. Model predictions shift to predict more fraud. Prediction
              drift detected. But accuracy is unchanged because the model
              correctly reflects the new reality.
            </p>
            <p>
              <strong>Response:</strong> Investigate but do not automatically
              assume problem. Cross-check with performance metrics when labels
              arrive. If performance is stable, drift may be acceptable.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MISSED DRIFT DUE TO OFFSETTING CHANGES
            </p>
            <p>
              Different segments may drift in opposite directions, canceling out
              in aggregate. Segment A predictions increase while Segment B
              predictions decrease. Aggregate looks stable but both segments
              changed significantly.
            </p>
            <p>
              <strong>Detection:</strong> Monitor slice-level drift, not just
              aggregate. Even if aggregate is stable, alert if any high-priority
              slice shows significant drift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BASELINE STALENESS
            </p>
            <p>
              If baseline becomes too old, drift detection becomes meaningless.
              Everything looks different from a 6-month-old baseline.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Prediction drift is a signal, not
              a problem. Investigate to understand cause. The drift might be
              acceptable, might indicate a problem, or might reflect real-world
              changes.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Label Shift Blind Spot
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Stable predictions, degraded outcomes
                    <br />
                    Mitigation: Delayed label checks + prevalence monitoring
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Seasonal False Alarms</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Daily and weekly cycles trigger constantly
                    <br />
                    Mitigation: Seasonal baselines, same hour-of-day comparison
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Retraining Oscillations
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Automated retraining shifts distribution repeatedly
                    <br />
                    Mitigation: 24 to 48 hour cool-down, change budgets
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Silent Slice Failures</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Global metrics healthy, key segment broken
                    <br />
                    Mitigation: 5k+ events per slice, hierarchical alerting
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
                  False alarms from expected variation; set thresholds based on
                  historical percentiles, require persistence across windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Drift without performance impact: predictions shift but
                  accuracy stable because ground truth also shifted
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offsetting drift: segments drift opposite directions,
                  aggregate looks stable; monitor slice-level to catch
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
                  Interview Tip: Explain when prediction drift is acceptable:
                  ground truth shifted proportionally.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe offsetting drift: Segment A up,
                  Segment B down, aggregate stable but both changed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPredictionDriftPredictionDriftFailureModesAndMitigation;
