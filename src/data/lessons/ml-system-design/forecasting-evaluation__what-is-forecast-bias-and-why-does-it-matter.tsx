import type { Component } from "solid-js";

const LessonForecastingEvaluationWhatIsForecastBiasAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Forecast Bias and Why Does It Matter?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Forecast bias measures systematic
              over- or under-forecasting: Bias = (1/n) × Σ(forecast - actual).
              Positive bias means consistently forecasting too high; negative
              bias means consistently forecasting too low. Unlike MAPE and RMSE
              which measure error magnitude, bias measures error direction.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Bias Matters
            </p>
            <p>
              Unbiased forecasts have errors that cancel out over time—sometimes
              high, sometimes low, averaging to zero. Biased forecasts
              systematically miss in one direction, causing cumulative business
              impact. Persistent over-forecasting leads to excess inventory;
              persistent under-forecasting causes stockouts. Bias compounds
              while random errors average out.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bias vs Variance Trade-off
            </p>
            <p>
              A model can have low RMSE but high bias (consistently off by small
              amounts in same direction), or zero bias but high RMSE (large
              errors that happen to cancel). Optimal forecasts minimize both. If
              forced to choose, bias may matter more for inventory planning
              where systematic errors accumulate, while variance may matter more
              for pricing where errors do not compound.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Detection Method:</strong> Plot cumulative sum of errors
              over time. Upward slope indicates positive bias
              (over-forecasting); downward slope indicates negative bias. Flat
              line with oscillation indicates unbiased forecasts with random
              errors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sources of Bias
            </p>
            <p>
              Structural model limitations: linear models underforecast
              exponential growth. Stale training data: model trained on
              pre-promotion data under-forecasts promotional periods. Incentive
              misalignment: sales teams over-forecast to secure inventory
              allocation. Identify and address root causes rather than just
              adjusting forecasts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bias Adjustment
            </p>
            <p>
              If bias is consistent and predictable, adjust forecasts:
              corrected_forecast = forecast - measured_bias. But this is a
              band-aid. Investigate why the model is biased and fix the
              underlying issue. Persistent bias often indicates missing
              features, model misspecification, or data quality problems.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Forecast Bias = Mean(Forecast - Actual)
                  </strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Under Forecast</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Bias: <strong>-8%</strong>
                      <br />→ Stockouts
                      <br />→ Lost revenue
                      <br />→ Poor service
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Balanced</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Bias: <strong>+0.5%</strong>
                      <br />→ Healthy ops
                      <br />→ Good service
                      <br />→ Capital efficient
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Over Forecast</strong>
                    <div style="margin-top: 6px; font-size: 11px">
                      Bias: <strong>+12%</strong>
                      <br />→ Excess inventory
                      <br />→ Capital tied up
                      <br />→ Waste risk
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; margin-top: 8px">
                  <strong style="font-size: 12px">
                    Bias Can Mask Poor Accuracy
                  </strong>
                  <div style="margin-top: 6px; font-size: 11px; line-height: 1.5">
                    50 forecasts: +100 error each
                    <br />
                    50 forecasts: -100 error each
                    <br />
                    <strong>Bias: 0% (perfect!)</strong>
                    <br />
                    <strong>Total error: 10,000 units (terrible!)</strong>
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
                  Bias measures systematic directional error: positive =
                  over-forecasting, negative = under-forecasting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bias compounds while random errors average out—critical for
                  inventory where systematic errors accumulate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Plot cumulative sum of errors: upward slope = positive bias,
                  downward = negative, flat = unbiased
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
                  A model can have low RMSE but high bias (consistently small
                  errors in same direction)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common bias sources: structural model limitations, stale
                  training data, incentive misalignment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationWhatIsForecastBiasAndWhyDoesItMatter;
