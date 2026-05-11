import type { Component } from "solid-js";

const LessonForecastingEvaluationWhatAreTheKeyFailureModesInForecastEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What Are the Key Failure Modes in Forecast Evaluation?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Evaluation on Wrong Distribution
            </p>
            <p>
              Models evaluated on artificially balanced data or filtered subsets
              show inflated accuracy. Evaluation must use the same distribution
              the model will encounter in production. If 20% of products have
              sparse history, include them in evaluation even if they drag down
              metrics. Excluding hard cases creates false confidence.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Random train-test splits leak temporal
              information. A model that sees December test data during training
              implicitly learns December patterns. Always use time-based splits:
              train on past, test on future.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metric-Model Mismatch
            </p>
            <p>
              Models optimized for RMSE may show poor MAPE because RMSE ignores
              percentage scale. Models optimized for MAPE may underperform on
              business metrics that care about absolute error. Align training
              objective with evaluation metric, or accept the mismatch and tune
              hyperparameters on the metric that matters.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Ignoring Uncertainty
            </p>
            <p>
              Point forecast metrics (MAPE, RMSE) do not evaluate prediction
              intervals. A model may have good point accuracy but produce
              intervals that are too narrow (overconfident) or too wide
              (uninformative). Evaluate interval coverage: do 90% prediction
              intervals actually contain 90% of actuals? Calibration matters for
              decision-making under uncertainty.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Coverage Test:</strong> For each confidence level (50%,
              80%, 90%), compute what percentage of actuals fall within the
              predicted interval. Well-calibrated intervals show actual coverage
              matching stated confidence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Survivorship Bias
            </p>
            <p>
              Products that fail quickly disappear from evaluation datasets.
              Remaining products are inherently more predictable (they
              survived). This biases accuracy metrics upward. Include
              discontinued products in evaluation, or at least acknowledge the
              bias when reporting metrics.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Forecast Evaluation Failure Modes
                  </strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">
                      Zero Actuals Break MAPE
                    </strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Actual: 1, Forecast: 5<br />
                      <strong>MAPE: 400%</strong>
                      <br />
                      Dominates aggregate
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Bias Cancellation</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      +100 and -100 errors
                      <br />
                      <strong>Bias: 0%</strong>
                      <br />
                      Total error: 10K units
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Metric Gaming</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Clip high forecasts
                      <br />
                      <strong>MAPE: 22%→18%</strong>
                      <br />
                      Fill rate: -3 pp
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Outlier Sensitivity</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      0.1% bad data
                      <br />
                      <strong>RMSE: 45→78</strong>
                      <br />
                      +73% from tiny fraction
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">Prevention Strategy</strong>
                  <div style="margin-top: 6px; font-size: 11px; line-height: 1.6">
                    Use WAPE for zeros → Pair bias with dispersion metrics →
                    Require metric bundles for promotion → Investigate outliers
                    separately
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
                  Always use time-based splits (train on past, test on
                  future)—random splits leak temporal information
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Evaluate prediction interval calibration: do 90% intervals
                  actually contain 90% of actuals?
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Include hard cases (sparse history, discontinued products) to
                  avoid survivorship bias
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
                  Models optimized for RMSE may show poor MAPE—align training
                  objective with evaluation metric
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Coverage test: for each confidence level, compute what
                  percentage of actuals fall within predicted interval
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationWhatAreTheKeyFailureModesInForecastEvaluation;
