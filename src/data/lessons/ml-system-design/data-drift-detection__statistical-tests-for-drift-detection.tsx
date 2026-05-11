import type { Component } from "solid-js";

const LessonDataDriftDetectionStatisticalTestsForDriftDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Statistical Tests for Drift Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              POPULATION STABILITY INDEX (PSI)
            </p>
            <p>
              PSI measures drift by binning feature values and comparing bin
              frequencies between baseline and current distributions. Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                PSI = Σ (current% - baseline%) × ln(current% / baseline%)
              </code>
            </p>
            <p>
              Interpretation: PSI &lt; 0.1 indicates negligible drift. PSI
              0.1-0.25 indicates moderate drift worth investigating. PSI &gt;
              0.25 indicates significant drift requiring action. These
              thresholds are industry conventions; calibrate for your domain.
            </p>
            <p>
              Advantages: intuitive, interpretable, works for any distribution.
              Disadvantages: requires binning decisions, sensitive to bin
              boundaries, does not work well with sparse data.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              KOLMOGOROV-SMIRNOV (K-S) TEST
            </p>
            <p>
              K-S measures the maximum distance between cumulative distribution
              functions of two samples. Produces a test statistic D and p-value.
              P-value &lt; 0.05 suggests statistically significant difference.
            </p>
            <p>
              Advantages: no binning required, works for continuous
              distributions. Disadvantages: sensitive to sample size (large
              samples detect trivial differences), does not quantify drift
              magnitude well.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHI-SQUARED TEST
            </p>
            <p>
              For categorical features. Compares observed frequencies against
              expected frequencies. Produces chi-squared statistic and p-value.
              P-value &lt; 0.05 indicates significant drift.
            </p>
            <p>
              Advantages: standard statistical test, well understood.
              Disadvantages: requires sufficient samples per category, does not
              handle new categories (treats as zero expected frequency).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              JENSEN-SHANNON DIVERGENCE
            </p>
            <p>
              Symmetric measure of similarity between distributions. Bounded
              between 0 (identical) and 1 (completely different). More robust
              than KL divergence because it handles zero probabilities
              gracefully.
            </p>
            <p>
              Use cases: comparing embedding distributions, multi-modal
              features. Interpretation thresholds vary by domain—establish
              baselines empirically.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>When To Use:</strong> PSI for quick interpretation with
              business stakeholders. K-S for continuous features when you need
              statistical significance. Chi-squared for categorical features. JS
              divergence for embedding-like features.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Continuous Features</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    KS Test (p &lt; 0.01) | Wasserstein &gt; 0.1×IQR | PSI &gt;
                    0.25
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Categorical Features</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Chi-square (p &lt; 0.01) | PSI on binned categories | Top K
                    + Other bucket
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Multivariate / Joint Shifts
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    MMD with RBF kernel | Adversarial validation AUC &gt; 0.7
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Multiple Testing Control
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Benjamini Hochberg FDR at 5% | Require 2+ consecutive
                    windows | Effect size thresholds
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
                  significant; requires binning, intuitive interpretation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  K-S test: measures max CDF distance, no binning needed;
                  sensitive to sample size, p&lt;0.05 threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Chi-squared for categorical, JS divergence for embeddings;
                  each test has domain-specific tradeoffs
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
                  Interview Tip: Walk through PSI calculation steps and explain
                  threshold interpretation.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Know when to use each test—PSI for business
                  communication, K-S for continuous, chi-squared for
                  categorical.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDataDriftDetectionStatisticalTestsForDriftDetection;
