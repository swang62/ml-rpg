import type { Component } from "solid-js";

const LessonPredictionDriftStatisticalMetricsForPredictionDriftDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Statistical Metrics for Prediction Drift Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DISTRIBUTIONAL DISTANCE METRICS
            </p>
            <p>
              <strong>PSI (Population Stability Index):</strong> Same metric
              used for data drift. Compare baseline prediction distribution to
              current distribution. PSI &gt; 0.25 indicates significant
              prediction drift. Works well because it is interpretable and has
              established thresholds.
            </p>
            <p>
              <strong>Jensen-Shannon Divergence:</strong> Symmetric measure of
              similarity between distributions. Bounded between 0 (identical)
              and 1 (completely different). More sensitive to tail changes than
              PSI. Useful when extreme predictions matter.
            </p>
            <p>
              <strong>Wasserstein Distance:</strong> Measures the minimum cost
              to transform one distribution into another. Captures shape changes
              that PSI might miss. More computationally expensive.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SUMMARY STATISTICS
            </p>
            <p>Simpler than full distributional metrics but less sensitive:</p>
            <p>
              <strong>Mean shift:</strong> Track prediction mean over time.
              Alert on significant deviation. Simple and fast but misses
              distribution shape changes.
            </p>
            <p>
              <strong>Variance change:</strong> Track prediction variance.
              Narrowing variance may indicate model is over-confident. Widening
              may indicate uncertainty.
            </p>
            <p>
              <strong>Percentile monitoring:</strong> Track p10, p50, p90
              separately. Captures both central tendency and tail behavior.
              Alert when any percentile shifts beyond threshold.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING METRICS
            </p>
            <p>
              Start with PSI for its interpretability. Add percentile monitoring
              for tail sensitivity. Use JS divergence or Wasserstein only if
              simpler metrics miss important drift in your domain.
            </p>
            <p>
              Multi-metric monitoring provides defense in depth. Different
              metrics catch different types of drift. Use 2-3 complementary
              metrics rather than relying on one.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> PSI for standard monitoring and
              reporting. JS divergence when tails matter (rare events).
              Wasserstein for shape-sensitive detection. Percentiles for
              interpretable alerting.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Continuous Predictions
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px; line-height: 1.4">
                    Kolmogorov Smirnov: max CDF distance
                    <br />
                    Wasserstein: probability mass movement
                    <br />
                    Use case: regression, ranking scores
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Binned or Discrete</strong>
                  <div style="font-size: 12px; margin-top: 6px; line-height: 1.4">
                    Jensen Shannon: symmetric, 0 to 1<br />
                    KL Divergence: asymmetric
                    <br />
                    PSI: credit risk standard
                  </div>
                </div>
                <div style="grid-column: 1 / -1; border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Typical Thresholds</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    JS divergence &gt; 0.1 | PSI: 0.1 to 0.25 moderate, &gt;
                    0.25 severe | KS p value &lt; 0.01
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
                  PSI: interpretable, established thresholds (&gt;0.25); JS
                  divergence: tail-sensitive, bounded 0-1; Wasserstein:
                  shape-sensitive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Summary stats: mean shift (simple), variance change
                  (confidence signals), percentile monitoring (tail behavior)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use 2-3 complementary metrics for defense in depth; different
                  metrics catch different drift types
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
                  Interview Tip: Compare PSI vs JS divergence: PSI for standard
                  cases, JS when extreme predictions matter.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain percentile monitoring: tracking
                  p10/p50/p90 captures both center and tails.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPredictionDriftStatisticalMetricsForPredictionDriftDetection;
