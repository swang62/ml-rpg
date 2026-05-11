import type { Component } from "solid-js";

const LessonContinuousTrainingDriftDetectionAndStalenessBudgets: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Drift Detection and Staleness Budgets
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Types of Drift
            </p>
            <p style="margin-top: 0">
              Drift detection is the monitoring system that decides when to
              retrain. Three types of drift matter in production. Data drift
              occurs when input feature distributions shift (users start
              browsing on mobile instead of desktop, new product categories
              launch). Concept drift happens when the relationship between
              features and labels changes (click through rates drop during
              economic downturns even with same content). Label shift means the
              distribution of outcomes changes (fraud attacks concentrate on
              high value transactions).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Staleness Budgets
            </p>
            <p style="margin-top: 0">
              Staleness budgets formalize acceptable delays. Define SLOs like
              "features updated within 5 minutes," "model trained on last 14
              days of data," and "refreshed every 24 hours." Uber enforces these
              budgets across thousands of models: real time ride matching
              features must update within minutes, while pricing models can
              tolerate daily refreshes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Population Stability Index
            </p>
            <p style="margin-top: 0">
              The key metric is Population Stability Index (PSI), which measures
              distribution shift. PSI values above 0.1 indicate minor drift,
              above 0.2 significant drift requiring investigation, and above
              0.25 major drift triggering automatic retrain. Set thresholds with
              hysteresis to avoid false positives from transient spikes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Signal Monitoring
            </p>
            <p style="margin-top: 0">
              In practice, require drift sustained over sufficient sample size
              before triggering retrain, preventing "retraining storms" from
              temporary traffic anomalies. Netflix monitors multiple signals
              simultaneously: feature distributions via KS tests, prediction
              calibration error, and business metrics. Only trigger when
              multiple signals align and effect size exceeds thresholds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Data Drift</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Input distribution shifts
                    <br />
                    PSI &gt; 0.2 on key features
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Concept Drift</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Feature to label relationship changes
                    <br />
                    AUC ROC drop &gt; 0.02 sustained
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Label Shift</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Outcome distribution changes
                    <br />
                    Calibration error +0.01
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px">
                  <strong>Trigger Retrain</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    When 2+ signals breach for &gt;100k samples
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
                  Population Stability Index (PSI) quantifies distribution
                  shift: PSI between 0.1 and 0.2 indicates minor drift, above
                  0.2 signals significant drift requiring action, and above 0.25
                  triggers automatic retrain in most production systems
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hysteresis prevents retraining storms: Airbnb requires drift
                  sustained over 100,000 impressions before triggering,
                  filtering out transient traffic spikes from product launches
                  or marketing campaigns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi signal monitoring catches different failure modes:
                  Netflix tracks feature distributions via Kolmogorov Smirnov
                  tests, prediction calibration error (threshold 0.01), and
                  business metrics like play start rate simultaneously
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Staleness budgets formalize acceptable delays: streaming
                  features updated within 1 to 15 minutes for behavioral
                  signals, batch features within 24 hours for long horizon
                  aggregates, models retrained when data age exceeds 7 to 28
                  days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  False negatives are more dangerous than false positives:
                  silent performance degradation loses revenue, so set
                  conservative thresholds and monitor multiple metrics rather
                  than relying on a single signal
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
                  Uber fraud detection monitors transaction PSI, velocity
                  features, and conversion rates with 15 minute windows,
                  triggering retrain when PSI exceeds 0.25 or fraud rate spikes
                  by 50% sustained over 2 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta ad ranking tracks per advertiser segment drift separately
                  because global metrics can hide tail regressions, enforcing
                  per segment AUC ROC thresholds and triggering segmented
                  retrains
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonContinuousTrainingDriftDetectionAndStalenessBudgets;
