import type { Component } from "solid-js";

const LessonConceptDriftDetectionStrategiesMonitoringDriftWithStatisticalSignals: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Detection Strategies: Monitoring Drift with Statistical Signals
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA DRIFT DETECTION
            </p>
            <p>
              Monitor input feature distributions over time. Compare current
              distribution to a reference (training data or recent production
              window). Statistical tests quantify divergence.
            </p>
            <p>
              <strong>Population Stability Index (PSI):</strong> Compares two
              distributions by binning values and measuring shift. PSI &lt; 0.1
              indicates negligible drift. PSI 0.1-0.25 indicates moderate drift.
              PSI &gt; 0.25 indicates significant drift requiring investigation.
            </p>
            <p>
              <strong>Kolmogorov-Smirnov test:</strong> Measures maximum
              distance between cumulative distributions. P-value &lt; 0.05
              suggests statistically significant drift. Works well for
              continuous features.
            </p>
            <p>
              <strong>Chi-squared test:</strong> For categorical features.
              Compares observed category frequencies against expected baseline.
              Sensitive to sample size—large samples detect even tiny shifts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PREDICTION DRIFT DETECTION
            </p>
            <p>
              Even without labels, you can monitor model outputs. If the
              distribution of predictions shifts significantly, something
              changed—either inputs drifted or the model changed.
            </p>
            <p>
              Track: prediction mean, standard deviation, percentiles (p10, p50,
              p90). Sudden shifts in these statistics indicate drift. Gradual
              shifts over weeks may indicate concept drift.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE DRIFT (REQUIRES LABELS)
            </p>
            <p>
              The most reliable signal but often delayed. Monitor accuracy,
              precision, recall, AUC on labeled data as labels arrive. Compare
              to baseline performance on training/validation data.
            </p>
            <p>
              Challenge: labels arrive with delay (fraud labels take 30+ days,
              conversion labels take 7+ days). By the time you detect
              performance drift, the model has been underperforming for weeks.
            </p>
            <p>
              Workaround: use early proxy metrics (click-through rate,
              engagement) that arrive faster than final labels. Proxy drift
              often precedes label drift.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Data drift detection is fast but
              indirect. Performance drift detection is definitive but delayed.
              Use both: data drift for early warning, performance drift for
              confirmation.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; margin-bottom: 8px">
                  Multi Signal Drift Detection
                </div>
                <div style="display: flex; gap: 12px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Feature Drift</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      PSI &gt; 0.3
                      <br />
                      for 30 min
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Performance</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      AUC drops
                      <br />5 to 10%
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Slice Error</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Critical slice
                      <br />
                      degrades
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center; margin: 8px 0">
                  ↓ At least 2 of 3 triggers
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Retraining Pipeline Activated
                  </strong>
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
                  PSI: &lt;0.1 negligible, 0.1-0.25 moderate, &gt;0.25
                  significant drift; K-S test for continuous, chi-squared for
                  categorical
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prediction drift (output distribution changes) provides signal
                  without labels—monitor mean, std, percentiles
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Performance drift is definitive but delayed by label latency;
                  use proxy metrics for early warning
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
                  Interview Tip: Walk through a PSI calculation and
                  interpretation thresholds.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain the label delay problem and how proxy
                  metrics provide early warning.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonConceptDriftDetectionStrategiesMonitoringDriftWithStatisticalSignals;
