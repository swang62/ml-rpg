import type { Component } from "solid-js";

const LessonForecastingEvaluationWhatIsRootMeanSquaredErrorRmseInTimeSeries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Root Mean Squared Error (RMSE) in Time Series?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> RMSE (Root Mean Squared Error)
              measures forecast accuracy in the same units as the target: RMSE =
              √[(1/n) × Σ(actual - forecast)²]. Squaring penalizes large errors
              more heavily than small errors. A forecast with one large miss is
              worse than a forecast with many small misses of equal total
              absolute error.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RMSE vs MAE
            </p>
            <p>
              MAE (Mean Absolute Error) treats all errors linearly: MAE = (1/n)
              × Σ|actual - forecast|. RMSE squares before averaging, then takes
              square root. Result: RMSE ≥ MAE always, with equality only when
              all errors are identical. The ratio RMSE/MAE indicates error
              distribution: ratio near 1 means uniform errors, ratio near √2
              indicates varied error magnitudes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Penalize Large Errors
            </p>
            <p>
              In many applications, large errors are disproportionately costly.
              Understocking by 1000 units is worse than understocking by 10
              units 100 times—customers experience stockouts, not aggregate
              shortage. RMSE aligns optimization with this business reality. If
              all errors are equally bad, use MAE instead.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Mathematical Advantage:</strong> RMSE is differentiable
              everywhere and convex, making it ideal for gradient-based
              optimization. Most ML models minimize squared error internally for
              this reason, even when MAPE is the reported metric.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RMSE Limitations
            </p>
            <p>
              RMSE is scale-dependent: RMSE of 100 for sales in units cannot
              compare to RMSE of 1000 for sales in dollars. Use RMSE within a
              single series over time, not across series with different scales.
              For cross-series comparison, use percentage metrics (MAPE) or
              scaled metrics (MASE).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Sensitivity to Outliers
            </p>
            <p>
              Squaring amplifies outlier impact. A single extreme error can
              dominate RMSE. If outliers represent data quality issues rather
              than true forecast failures, consider robust alternatives (median
              absolute error) or windsorize extreme values before computing
              RMSE.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">RMSE Formula</strong>
                  <div style="margin-top: 8px; font-family: monospace; font-size: 13px">
                    RMSE = √[(1/n) × Σ(yᵢ - ŷᵢ)²]
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Quadratic Penalty Comparison
                  </strong>
                  <div style="margin-top: 8px; font-size: 12px; line-height: 1.6">
                    Ten errors of 10 units each:
                    <br />
                    <strong>Contribution: 10 × 10² = 1,000</strong>
                    <br />
                    <br />
                    One error of 100 units:
                    <br />
                    <strong>Contribution: 1 × 100² = 10,000</strong>
                    <br />
                    <br />
                    Single large error dominates by 10×
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
                  RMSE squares errors before averaging, penalizing large errors
                  more than small—RMSE ≥ MAE always
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RMSE/MAE ratio indicates error distribution: near 1 = uniform
                  errors, near √2 = varied magnitudes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RMSE is scale-dependent: use within single series over time,
                  not across series with different scales
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
                  Large errors disproportionately costly: understocking 1000
                  once is worse than understocking 10 a hundred times
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RMSE is differentiable and convex—ideal for gradient-based
                  optimization even when reporting MAPE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationWhatIsRootMeanSquaredErrorRmseInTimeSeries;
