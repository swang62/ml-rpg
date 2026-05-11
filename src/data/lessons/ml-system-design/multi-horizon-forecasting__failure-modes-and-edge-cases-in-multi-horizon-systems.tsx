import type { Component } from "solid-js";

const LessonMultiHorizonForecastingFailureModesAndEdgeCasesInMultiHorizonSystems: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Multi-Horizon Systems
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Horizon-Specific Bias
            </p>
            <p>
              Models may learn biases that differ by horizon—systematically
              underforecasting at 7 days while overforecasting at 30 days. This
              happens when training loss weights all horizons equally despite
              different business importance. Solution: weight loss by horizon
              importance or train separate heads with horizon-specific losses.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Aggregate metrics (average across
              horizons) hide horizon-specific failures. Always report metrics
              per horizon to catch problems before they affect downstream
              decisions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Temporal Misalignment
            </p>
            <p>
              Forecast timestamps must align with decision timestamps. If
              inventory decisions happen Monday morning but forecasts are
              generated Sunday night, the effective horizon is shifted. Ensure
              forecast generation timing matches consumption patterns. Daylight
              saving time and timezone handling cause subtle misalignments.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Covariate Timing Errors
            </p>
            <p>
              Using future observed values as inputs creates data leakage that
              inflates offline metrics but fails in production. Common mistake:
              including the target series lag that is not yet available at
              forecast time. Audit feature pipelines to verify all inputs are
              available at prediction time for all horizons.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Audit Strategy:</strong> For each feature, verify: "At the
              moment I make forecast for horizon H, is this feature value
              known?" Any uncertainty means potential leakage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cold Start Horizons
            </p>
            <p>
              New series lack sufficient history for long-horizon patterns. A
              series with 30 days of data cannot learn yearly seasonality. Fall
              back to simpler models or borrow patterns from similar established
              series. Gradually enable longer horizons as history accumulates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Inconsistent Forecasts
            </p>
            <p>
              When horizons are forecast independently, results may be
              inconsistent: daily forecasts might not sum to weekly.
              Reconciliation methods adjust forecasts to ensure coherence across
              temporal hierarchies.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Leakage</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Promo decided day 10 used in day 5 forecast
                    <br />
                    Backtest: 3% error → Production: 22% error
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Regime Shift</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Pandemic, stockout, policy change
                    <br />
                    h1 MAPE: 8% → 16%, Quantile coverage: 90% → 65%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Intermittent Demand</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Series: [0,0,0,15,0,0,22,0]
                    <br />
                    Model predicts near 0 always, misses spikes
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Miscalibrated Quantiles
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    p90 forecast covers only 70% of actuals
                    <br />
                    Causes stockouts or surge pricing failures
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
                  Report metrics per horizon—aggregate metrics hide
                  horizon-specific biases that affect decisions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Audit features: at forecast time for horizon H, is this
                  feature value actually known? Uncertainty means leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  New series cannot learn long-horizon patterns—fall back to
                  simpler models or borrow from similar series
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
                  Forecast timing must match decision timing: Sunday night
                  forecasts for Monday decisions have shifted effective horizon
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Weight loss by horizon importance if business priorities
                  differ across horizons
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingFailureModesAndEdgeCasesInMultiHorizonSystems;
