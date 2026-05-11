import type { Component } from "solid-js";

const LessonModelPerformanceDegradationStatisticalMethodsForDriftDetectionAndAlerting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Statistical Methods for Drift Detection and Alerting
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THRESHOLD-BASED ALERTING
            </p>
            <p>
              The simplest approach: alert when a metric crosses a fixed
              threshold. Accuracy &lt; 85%, alert. P99 latency &gt; 100ms,
              alert.
            </p>
            <p>
              <strong>Advantages:</strong> Easy to understand, easy to
              implement, fast to evaluate.
            </p>
            <p>
              <strong>Disadvantages:</strong> Does not account for normal
              variation. A metric fluctuating between 87-90% should not alert at
              87%. Requires careful threshold tuning per metric.
            </p>
            <p>
              Improvement: use percentile-based thresholds. Alert when metric is
              below 5th percentile of historical values rather than a fixed
              number. Adapts to natural variation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STATISTICAL PROCESS CONTROL
            </p>
            <p>
              Apply statistical methods to detect when metrics deviate from
              expected behavior.
            </p>
            <p>
              <strong>Control charts:</strong> Track metric mean and standard
              deviation. Alert when value exceeds mean ± 3σ. Established
              industrial quality control method.
            </p>
            <p>
              <strong>CUSUM (Cumulative Sum):</strong> Detects small sustained
              shifts that single-point thresholds miss. Accumulates deviations
              from target; alerts when cumulative sum exceeds threshold. Good
              for gradual degradation.
            </p>
            <p>
              <strong>Page-Hinkley test:</strong> Similar to CUSUM but with
              adaptive detection threshold. Better for varying drift rates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ANOMALY DETECTION FOR ALERTS
            </p>
            <p>
              Train a model on historical metric values. Flag current values
              that are anomalous given history. More sophisticated than fixed
              thresholds.
            </p>
            <p>
              Approaches: Isolation Forest on metric vectors, autoencoder
              reconstruction error, Prophet for time series with seasonality.
            </p>
            <p>
              <strong>Trade-off:</strong> More sophisticated detection catches
              more issues but produces more complex alerts. Start simple, add
              complexity when simple methods miss real problems.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Sensitive alerting catches
              problems early but creates alert fatigue. Loose alerting misses
              problems. Tune based on cost of false positives vs false negatives
              in your domain.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    PSI (Population Stability Index)
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5; font-family: monospace; padding: 6px; border-radius: 4px; margin-top: 6px">
                    PSI &lt; 0.1 → No shift
                    <br />
                    0.1 to 0.25 → Review
                    <br />
                    PSI &gt; 0.25 → Action required
                  </div>
                  <span style="font-size: 11px; margin-top: 4px; display: block">
                    Use: Categorical, binned numeric features
                  </span>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    KS Test (Kolmogorov Smirnov)
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5; font-family: monospace; padding: 6px; border-radius: 4px; margin-top: 6px">
                    p &lt; 0.05 AND distance &gt; 0.1
                    <br />→ Significant drift
                    <br />
                    Min sample: 5K to 50K
                  </div>
                  <span style="font-size: 11px; margin-top: 4px; display: block">
                    Use: Continuous distributions, scores
                  </span>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 6px">
                    JSD (Jensen Shannon Divergence)
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5; font-family: monospace; padding: 6px; border-radius: 4px; margin-top: 6px">
                    JSD 0 to 1 scale
                    <br />
                    0.15 → Warn, 0.3 → Critical
                    <br />
                    Symmetric, bounded
                  </div>
                  <span style="font-size: 11px; margin-top: 4px; display: block">
                    Use: Histograms, probability distributions
                  </span>
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
                  Threshold alerts: simple but ignore normal variation; use
                  percentile-based thresholds (5th percentile) to adapt
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical process control: control charts (mean ± 3σ), CUSUM
                  for gradual drift, Page-Hinkley for adaptive detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anomaly detection: Isolation Forest, autoencoders, Prophet;
                  more sophisticated but more complex to interpret
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
                  Interview Tip: Explain CUSUM—accumulates small deviations to
                  detect gradual degradation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe alert tuning tradeoff: sensitive =
                  early detection + fatigue; loose = missed problems.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPerformanceDegradationStatisticalMethodsForDriftDetectionAndAlerting;
