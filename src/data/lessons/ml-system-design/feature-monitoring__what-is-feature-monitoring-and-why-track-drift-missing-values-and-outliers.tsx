import type { Component } from "solid-js";

const LessonFeatureMonitoringWhatIsFeatureMonitoringAndWhyTrackDriftMissingValuesAndOutliers: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Feature Monitoring and Why Track Drift, Missing Values, and
            Outliers?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Feature monitoring</strong> tracks the health of model
                inputs and outputs in production along three critical axes:
                drift detection (distribution shifts from training baseline),
                missing value tracking (upstream data quality issues), and
                outlier monitoring (extreme values indicating data corruption or
                attacks).
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why These Three Axes Matter
            </p>
            <p style="margin-top: 0">
              Drift detection identifies when feature distributions shift from
              their training baseline, potentially degrading model performance.
              Missing value tracking catches upstream data quality issues or
              pipeline failures that could break predictions. Outlier monitoring
              flags extreme values that may indicate data corruption, edge case
              inputs, or adversarial attacks requiring special handling.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Silent Degradation Problem
            </p>
            <p style="margin-top: 0">
              Without feature monitoring, model degradation goes unnoticed until
              business metrics decline. A gradual drift in user behavior causes
              recommendation quality to drop 3 to 5 percent over weeks. By the
              time product teams notice lower engagement, months of revenue have
              been lost. Proactive monitoring catches drift early, enabling
              retraining before user impact.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Implementation
            </p>
            <p style="margin-top: 0">
              Production feature monitoring computes statistical summaries
              (mean, variance, quantiles, null rate) over sliding time windows,
              comparing against baseline distributions. Population Stability
              Index (PSI) and Kolmogorov Smirnov (K-S) tests quantify drift
              magnitude. Alerting triggers when metrics exceed thresholds
              sustained for configurable durations, balancing sensitivity
              against alert fatigue.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Coverage Strategy
            </p>
            <p style="margin-top: 0">
              Monitor all features feeding high value models. For large feature
              spaces (hundreds of features), prioritize based on feature
              importance scores from model interpretation. Critical features
              with high SHAP values warrant tighter thresholds and faster
              detection windows than low importance features.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Training Baseline</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    mean=42.3, p50=38.1, p99=127.4
                    <br />
                    150 features × 10M examples
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Live Traffic Window</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5min: 750K predictions
                    <br />
                    rolling aggregation per feature
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Statistical Comparison
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    PSI=0.23 (threshold 0.2)
                    <br />
                    K-S test p=0.001 → ALERT
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
                  Three monitoring axes: drift (distribution shifts from
                  training), missing values (data quality issues), and outliers
                  (extreme values indicating corruption or edge cases)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Baseline capture at training time includes count, missing
                  rate, mean, variance, quantiles (1/5/50/95/99), histograms for
                  numerical features; top K frequencies, entropy, cardinality
                  for categorical features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical tests for comparison: Population Stability Index
                  (PSI, threshold 0.1 slight, 0.2 significant), Kolmogorov
                  Smirnov (K-S) for continuous distributions, Wasserstein for
                  shape sensitive shifts, Statistical Process Control (SPC)
                  rules like 1 point beyond 3 sigma
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scale example: 25k QPS system with 150 features processes 375k
                  updates per second at 1:10 sampling, uses 30 MB memory per
                  model with approximate algorithms (t-digest, HyperLogLog)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Time aware monitoring uses multiple windows: 5 minute for near
                  real time alerts (60 to 180 second latency), 1 to 24 hour for
                  trend analysis and seasonality detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Segment aware slicing by country, platform, or cohort prevents
                  Simpson's paradox; Netflix uses seasonality aware baselines to
                  reduce false positives by over 70% versus static training
                  baselines
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
                  Netflix recommendations: dimensional metrics with high
                  cardinality tags, control chart alerting, dynamic 7 day
                  rolling baselines by hour of day to handle 5 to 8% oscillation
                  in acceptance rate across time zones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber fraud detection at 5k transactions per second: robust
                  metrics (median, Median Absolute Deviation) for heavy tailed
                  features, tail exceedance rate monitoring (target P(X &gt;
                  Q99.9) &lt; 0.05%), circuit breakers when card_country null
                  rate exceeds 2%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb Zipline: stores training time feature distributions
                  alongside features, validates serving distributions against
                  baselines during deployment, feature level data contracts
                  prevent schema drift from silently propagating
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFeatureMonitoringWhatIsFeatureMonitoringAndWhyTrackDriftMissingValuesAndOutliers;
