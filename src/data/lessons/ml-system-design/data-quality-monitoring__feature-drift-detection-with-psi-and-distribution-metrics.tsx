import type { Component } from "solid-js";

const LessonDataQualityMonitoringFeatureDriftDetectionWithPsiAndDistributionMetrics: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Feature Drift Detection with PSI and Distribution Metrics
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PSI FOR FEATURE DRIFT
            </p>
            <p>
              Population Stability Index (PSI) compares feature distributions
              between baseline and current data. It quantifies how much
              distributions have shifted.
            </p>
            <p>
              Calculation: bin feature values, compute percentage in each bin
              for baseline and current, sum{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                (current% - baseline%) × ln(current% / baseline%)
              </code>{" "}
              across bins.
            </p>
            <p>
              <strong>Interpretation:</strong> PSI &lt; 0.1 means negligible
              shift. PSI 0.1-0.25 means moderate shift worth investigating. PSI
              &gt; 0.25 means significant shift requiring action.
            </p>
            <p>
              PSI is symmetric and works for any distribution type. It is the
              most widely used metric for production drift detection because it
              is interpretable and comparable across features.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OTHER DISTRIBUTION METRICS
            </p>
            <p>
              <strong>Wasserstein distance:</strong> Also called Earth Mover
              Distance. Measures the minimum cost to transform one distribution
              into another. More sensitive to shape differences than PSI. No
              binning required.
            </p>
            <p>
              <strong>KL divergence:</strong> Measures information lost when one
              distribution approximates another. Asymmetric (order matters).
              Undefined when baseline has zero probability. Use Jensen-Shannon
              divergence for symmetric version.
            </p>
            <p>
              <strong>K-S statistic:</strong> Maximum difference between
              cumulative distributions. Good for detecting any type of shift.
              Returns p-value for significance testing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING METRICS
            </p>
            <p>
              PSI for business reporting and cross-feature comparison. K-S when
              you need statistical significance. Wasserstein when shape changes
              matter (e.g., bimodal to unimodal shifts). Jensen-Shannon for
              embedding comparisons.
            </p>
            <p>
              Track multiple metrics. Each captures different aspects of drift.
              PSI might miss certain shape changes that Wasserstein catches.
              Using multiple metrics provides defense in depth.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Simple metrics (PSI) are easier
              to operationalize but miss subtle shifts. Complex metrics catch
              more but are harder to interpret and threshold.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Reference (Training)</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Bin 1: 15% | Bin 2: 35% | Bin 3: 28%
                    <br />
                    Bin 4: 12% | Bin 5: 10%
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  PSI = Σ (C% − R%) × ln(C% / R%)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Comparison (Production)
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Bin 1: 18% | Bin 2: 30% | Bin 3: 25%
                    <br />
                    Bin 4: 15% | Bin 5: 12%
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: center; margin-top: 4px">
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>PSI &lt; 0.1</strong>
                    <br />✓ Stable
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>0.1 to 0.2</strong>
                    <br />⚠ Warn
                  </div>
                  <div style="border: 2px solid; padding: 8px 12px; border-radius: 6px; font-size: 11px; text-align: center">
                    <strong>PSI &gt; 0.2</strong>
                    <br />🚨 Critical
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
                  PSI: &lt;0.1 negligible, 0.1-0.25 moderate, &gt;0.25
                  significant; symmetric, interpretable, most widely used
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alternatives: Wasserstein for shape sensitivity, K-S for
                  significance testing, Jensen-Shannon for embeddings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use multiple metrics for defense in depth—each captures
                  different aspects of distribution shift
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
                  Interview Tip: Walk through PSI calculation and explain why
                  thresholds (0.1, 0.25) are industry conventions.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain when Wasserstein is better than
                  PSI—detecting shape changes like bimodal to unimodal.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataQualityMonitoringFeatureDriftDetectionWithPsiAndDistributionMetrics;
