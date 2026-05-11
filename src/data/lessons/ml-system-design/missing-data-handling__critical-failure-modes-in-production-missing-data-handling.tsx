import type { Component } from "solid-js";

const LessonMissingDataHandlingCriticalFailureModesInProductionMissingDataHandling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Critical Failure Modes in Production Missing Data Handling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Missing data handling in production machine learning systems fails
            in predictable ways that are often invisible until they cause
            revenue loss or service degradation. Understanding these failure
            modes and their mitigation strategies is essential for building
            robust systems at scale. Training serving skew from imputation
            mismatches is the most common silent killer. Training uses forward
            fill to handle gaps in time series features, but serving uses zeros
            after a 5 millisecond timeout to meet latency budgets. The model
            learns patterns from filled data that do not exist at inference.
            Offline Area Under Curve (AUC) is 0.85, online AUC drops to 0.78.
            The 7 point gap translates to millions in lost revenue for a large
            e-commerce platform. Mitigation requires implementing the same
            imputation operators in both offline and online pipelines, storing
            the logic and statistics in a feature registry, and running replay
            tests that compare feature values from offline materialization
            against online retrieval for the same entity and timestamp. Drift in
            missingness rates often goes undetected until a major incident. A
            client release changes a payload field name. Missingness jumps from
            0.5% to 40% for a key feature like user location or recent purchase
            history. If you do not alert on this, the model silently degrades.
            Click Through Rate (CTR) might drop 10% over two days before anyone
            notices. The solution is data validation with enforced minimum
            completeness constraints. Google's TFX approach computes statistics
            on incoming data, compares against a schema with expected ranges,
            and automatically rolls back or gates deployments when violated. In
            practice, set per feature thresholds: alert when missingness exceeds
            2x the trailing 7 day mean or an absolute threshold like 5% for high
            importance features. Missing Not At Random (MNAR) bias creates
            systematic underperformance in valuable segments. If high spenders
            are 3x more likely to block tracking, and you impute their missing
            signals as population means, you will underserve a cohort worth 20%
            of revenue. The model's calibration drifts for that segment, lift
            from interventions degrades, and marketing spend is misdirected.
            Detection requires sensitivity analysis: check if model performance
            varies significantly across segments with different missingness
            rates. If precision drops from 0.80 to 0.65 for users with more than
            30% missing features, that is a red flag. Mitigation involves adding
            explicit binary missingness indicators as features, using segment
            specific defaults instead of global means, and training separate
            models or calibration layers for high missingness cohorts. Cascading
            timeouts under load can collapse model output variance. When the
            system is under stress, feature services hit 99th percentile latency
            of 30 milliseconds instead of the usual 10 milliseconds. Callers
            exhaust their request budgets and return default values for many
            features simultaneously. Suddenly 20% of requests have 8 out of 10
            features defaulted. Model output variance collapses because all
            these requests look identical. This can trip downstream anomaly
            detection systems that flag the sudden uniformity. The fix is per
            call timeouts with bulkheads to isolate failures, and monitoring the
            fraction of requests with more than K defaulted features (for
            example, alert when more than 5% of requests have more than 3
            features defaulted).<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Training-Serving Skew</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Train: forward fill | Serve: zeros → AUC 0.85 offline, 0.78
                    online
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Missingness Drift</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Client bug: 0.5% → 40% missing location → 10% CTR drop over
                    2 days
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">MNAR Bias</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    High spenders hide data → mean impute → precision 0.80 →
                    0.65 for that segment
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Cascading Timeouts</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Load spike: p99 10ms → 30ms → 20% of requests default 8/10
                    features → collapsed variance
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; margin-top: 6px">
                  <strong style="font-size: 12px">
                    Mitigations: Unified imputation, schema validation,
                    missingness indicators, per-call timeouts
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
                  Training serving skew from different imputation methods causes
                  7 to 10 point AUC drops (0.85 offline to 0.78 online), costing
                  millions in revenue for large platforms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missingness drift from client bugs or schema changes goes
                  undetected without data validation: 0.5% to 40% missing can
                  cause 10% CTR drop over 2 days before manual detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MNAR bias systematically underserves high value segments: if
                  top 20% of revenue users hide tracking, mean imputation
                  reduces precision from 0.80 to 0.65 for that cohort
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cascading timeouts under load cause 20% of requests to default
                  8 out of 10 features simultaneously, collapsing model output
                  variance and triggering false anomaly alerts
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Leakage during imputation: KNN fitted on full dataset uses
                  future session neighbors, inflating offline metrics by 5 to 10
                  points that disappear in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Join induced sparsity can drop 60% of rows when user, session,
                  and item tables have missing keys, biasing the target
                  distribution if you blindly delete incomplete rows
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
                  Amazon product search: Training used forward fill for price
                  time series across promotion periods, creating synthetic
                  prices. Serving used last known price. Model learned to
                  predict promotions that did not exist, causing 12% error in
                  price sensitive queries. Fixed by capping interpolation and
                  adding promotion flag.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber trip ETA: Client version 3.2 stopped sending GPS accuracy
                  field due to a payload format change. Missingness jumped from
                  1% to 35%. ETA Mean Absolute Error increased from 90 seconds
                  to 140 seconds. Caught by data validation alert on missingness
                  &gt;5x baseline. Rolled back client release within 2 hours.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Ads CTR prediction: Added binary missingness indicators
                  for 5 sparse features (device ID, referrer URL, campaign tag).
                  Trained model with indicators plus unknown tokens. Prevented 3
                  point AUC drop when feature service latency spike caused 15%
                  of requests to timeout and default those features.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMissingDataHandlingCriticalFailureModesInProductionMissingDataHandling;
