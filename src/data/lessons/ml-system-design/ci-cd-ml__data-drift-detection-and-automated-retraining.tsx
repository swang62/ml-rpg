import type { Component } from "solid-js";

const LessonCiCdMlDataDriftDetectionAndAutomatedRetraining: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Data Drift Detection and Automated Retraining
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
            <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
              Definitions
            </div>
            <div style="font-size: 15px; line-height: 1.5">
              <strong>Data drift:</strong> Input feature distributions shift,
              degrading performance because training data no longer reflects
              production. <strong>Concept drift:</strong> Feature distributions
              stay stable but the relationship between features and labels
              changes.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            DETECTING DATA DRIFT
          </p>
          <p style="margin-top: 0">
            PSI (Population Stability Index) compares feature distributions
            between baseline (last month) and current by bucketing values and
            computing weighted log ratio. PSI &gt; 0.2 signals significant
            drift. Example: fraud model sees PSI 0.25 on transaction amount
            during holiday shopping—may miss novel patterns never seen in
            training.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            DETECTING CONCEPT DRIFT
          </p>
          <p style="margin-top: 0">
            More insidious: features look stable but label relationship changes.
            Credit risk model sees stable income/debt features but defaults jump
            from predicted 5% to actual 12% during economic downturn. Detection
            requires monitoring calibration curves and ECE (Expected Calibration
            Error) with delay for label lag.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            AUTOMATED RETRAINING
          </p>
          <p style="margin-top: 0">
            Trigger training when drift exceeds thresholds: PSI &gt; 0.2 on 3
            key features for 2 consecutive days, or MAP drops &gt; 3% for 3 days
            → train on most recent 14-day window.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>⚠️ Warning:</strong> Retraining on every drift signal causes
            model thrash. New model must beat production by pre-agreed margin
            (AUC +0.5 points) and pass stability checks before deploying.
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            HANDLING SEASONALITY
          </p>
          <p style="margin-top: 0">
            Retail models see predictable PSI spikes every weekend and December.
            Use seasonal baselines (compare weekend to last 4 weekends),
            exponentially weighted moving averages, or statistical tests with
            correction for multiple comparisons. Compute drift per slice to
            catch localized shifts global metrics miss.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px">
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Drift Detection: Hourly</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  PSI on key features vs baseline
                  <br />
                  Alert: PSI &gt;0.2 on 3 features, 2 days
                  <br />
                  Check calibration: ECE, label lag 7d
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Threshold breach
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">Trigger Retraining</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Train on recent 14 day window
                  <br />
                  Produce candidate model
                  <br />
                  Compute metrics on validation set
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold; text-align: center">
                ↓ Promotion gate
              </div>
              <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                <strong style="font-size: 13px">
                  Deploy if: AUC +0.5, ECE &lt;0.02
                </strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Else: Keep current model
                  <br />
                  Avoid thrash from noise
                  <br />
                  Log decision for audit
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Population Stability Index (PSI) compares feature distributions
                across time periods, PSI greater than 0.2 signals significant
                drift requiring investigation, computed by bucketing values and
                summing weighted log ratios across buckets
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Concept drift changes feature to label relationships without
                shifting input distributions: A 2019 credit model sees stable
                income and debt features but default rate jumps from 5 percent
                to 12 percent in downturn, breaking calibration
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Automated retraining triggers on drift thresholds (PSI greater
                than 0.2 on 3 features for 2 days or MAP drop greater than 3
                percent for 3 days) but requires promotion gates to prevent
                model thrash from retraining on noise
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Promotion gates enforce improvement: Candidate must beat
                production model by AUC greater than 0.5 points, calibration
                slope within 0.02, no slice precision drop greater than 5
                percent before deploying to avoid unstable model churn
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Seasonality causes false positives: Retail models see
                predictable PSI spikes every weekend and December, require
                seasonal baselines (compare to last 4 weekends, not weekdays) or
                exponentially weighted moving averages to adapt
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Label lag delays concept drift detection: Fraud labels arrive 7
                days after prediction, credit defaults appear in 30 to 90 days,
                requires buffering performance metrics and using proxy signals
                (dispute rate, customer service calls) for faster feedback
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
                Uber fraud model drift: Monitors PSI on transaction_amount,
                merchant_category, and hour_of_day features hourly, triggers
                retraining if PSI greater than 0.25 on 2 features for 24 hours,
                retrains on last 14 days (8TB data), promotes only if AUC
                improves by 0.5 points on validation week
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Netflix recommendation concept drift: Pandemic shifts viewing
                patterns, PSI on genre features stays under 0.15 but watch time
                prediction Mean Absolute Error (MAE) climbs 15 percent, triggers
                retraining, new model trained on last 30 days improves MAE by 10
                percent and is promoted
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Google Search ranking seasonal handling: Black Friday queries
                show PSI of 0.4 on shopping related features, but this is
                expected annually, system uses historical quantile comparison
                (current Black Friday vs last 3 years) and suppresses drift
                alerts during known seasonal windows
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">4</span>
              <span class="flex-grow-1 Learn_cardContent">
                Meta ad ranking slice specific drift: Global PSI is 0.12
                (acceptable), but mobile iOS 16 users in Europe show PSI of 0.28
                on click probability features after OS update, slice level
                monitoring catches this, triggers targeted retraining for that
                segment
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonCiCdMlDataDriftDetectionAndAutomatedRetraining;
