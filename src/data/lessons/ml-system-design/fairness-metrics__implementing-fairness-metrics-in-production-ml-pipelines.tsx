import type { Component } from "solid-js";

const LessonFairnessMetricsImplementingFairnessMetricsInProductionMlPipelines: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Implementing Fairness Metrics in Production ML Pipelines
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Where to Compute Fairness Metrics
            </p>
            <p style="margin-top: 0">
              Compute at multiple stages. <strong>During training:</strong>{" "}
              Monitor on validation set by group. If demographic parity ratio
              drops below 0.8, the model may face legal scrutiny.{" "}
              <strong>Before deployment:</strong> Compute on held-out test set.{" "}
              <strong>In production:</strong> Continuously monitor on live
              predictions. A fair model at deployment can drift as population
              changes. Typical frequency: daily checks, weekly deep-dives into
              subgroups.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Implementation Architecture
            </p>
            <p style="margin-top: 0">
              Store predictions with protected attributes in a separate auditing
              table, not the main prediction path. This isolates sensitive data
              with stricter access. Compute metrics asynchronously in batch, not
              real-time. Pipeline: predictions to Kafka, consumer writes to
              audit table with encrypted demographics, nightly batch computes
              metrics for dashboard. Alerts: demographic parity ratio below 0.8,
              equalized odds difference above 0.1.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sample Size Requirements
            </p>
            <p style="margin-top: 0">
              Metrics require sufficient samples per group. With 1,000
              predictions but only 50 in the minority group, error bars are
              huge. A 5% false positive rate with 50 samples could be 0% to 15%.
              Need at least 200-300 samples per group for meaningful
              differences. For rare groups, aggregate across time windows or use
              Bayesian methods that handle smaller samples.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Handling Missing Demographics
            </p>
            <p style="margin-top: 0">
              Often you lack demographic labels. Options: proxy variables (zip
              code correlates with race, but problematic), voluntary
              self-reporting (biased toward engaged users), probabilistic
              inference (BISG estimates race from name and geography at 70-90%
              accuracy). Missing data is not random: users who opt out may
              differ systematically.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Granular demographic breakdowns
              reveal more bias but need more data. With 5 groups and 4 subgroups
              each, you need 20x more samples for reliable metrics.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Online: Score + Log</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    20 to 50ms P95, 5000 req/hr
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Streaming Monitor</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Parity ratio, 100K window, 1min update
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Delayed Labels Join</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    30 to 90 day delay, nightly batch
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Offline EO Computation
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    TPR and FPR per cohort, weekly
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
                  Compute metrics during training, before deployment, and
                  continuously in production
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store predictions with demographics in separate auditing table
                  with stricter access
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alert thresholds: demographic parity ratio below 0.8,
                  equalized odds difference above 0.1
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Need 200-300 samples per group for statistically meaningful
                  fairness measurements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missing demographics: use proxies, self-reporting, or
                  probabilistic inference (each has trade-offs)
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
                  Mention 80% rule: demographic parity ratio below 0.8 may face
                  legal scrutiny
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain sample size: 50 minority samples means huge error bars
                  (0% to 15%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFairnessMetricsImplementingFairnessMetricsInProductionMlPipelines;
