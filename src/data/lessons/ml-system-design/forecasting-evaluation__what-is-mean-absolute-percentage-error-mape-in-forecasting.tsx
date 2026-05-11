import type { Component } from "solid-js";

const LessonForecastingEvaluationWhatIsMeanAbsolutePercentageErrorMapeInForecasting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Mean Absolute Percentage Error (MAPE) in Forecasting?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> MAPE (Mean Absolute Percentage Error)
              measures forecast accuracy as a percentage of actual values: MAPE
              = (1/n) × Σ|actual - forecast| / |actual| × 100%. A MAPE of 10%
              means forecasts are off by 10% on average. The percentage scale
              makes MAPE interpretable across different magnitude series.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why MAPE is Popular
            </p>
            <p>
              MAPE provides intuitive interpretation: "forecasts are 15% off on
              average" is meaningful to business stakeholders without
              statistical background. It normalizes error by actual values,
              allowing comparison across series with different scales (units
              sold vs revenue dollars). MAPE is the most commonly reported
              forecast accuracy metric in industry.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MAPE Limitations
            </p>
            <p>
              MAPE has critical flaws. Division by actual causes problems: when
              actual is zero, MAPE is undefined; when actual is small, MAPE
              explodes. A forecast of 5 vs actual of 1 produces 400% error,
              while forecast of 105 vs actual of 100 produces only 5%—same
              absolute error, vastly different MAPE. MAPE penalizes
              over-forecasts more than under-forecasts of equal magnitude.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> MAPE is asymmetric: over-forecast of
              100% (forecast 200, actual 100) contributes 100%, but
              under-forecast of 100% (forecast 0, actual 100) contributes
              100%—yet these feel very different. Use symmetric MAPE (sMAPE) for
              balanced treatment.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use MAPE
            </p>
            <p>
              Use MAPE when: values are always positive and never near zero,
              stakeholders need intuitive percentage interpretation, comparing
              accuracy across different-scale series. Avoid MAPE when: data
              contains zeros or near-zeros, symmetric treatment of errors
              matters, or you need mathematically sound optimization (MAPE is
              not convex).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Industry Benchmarks
            </p>
            <p>
              Typical MAPE ranges: 5-10% is excellent for stable demand, 15-25%
              is acceptable for variable demand, 30%+ indicates poor forecasting
              or inherently unpredictable series. Compare against naive
              forecasts (use last period value) to assess model value-add.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">MAPE Formula</strong>
                  <div style="margin-top: 8px; font-family: monospace; font-size: 13px">
                    MAPE = (1/n) × Σ |yᵢ - ŷᵢ| / |yᵢ| × 100%
                  </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">Good Performance</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      High volume SKU
                      <br />
                      Actual: 1000
                      <br />
                      Forecast: 920
                      <br />
                      <strong>Error: 8%</strong>
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">MAPE Breaks</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Long tail SKU
                      <br />
                      Actual: 1<br />
                      Forecast: 5<br />
                      <strong>Error: 400%</strong>
                    </div>
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
                  MAPE formula: (1/n) × Σ|actual - forecast| / |actual| ×
                  100%—interpretable percentage scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Division by actual causes problems: undefined at zero,
                  explodes near zero, asymmetric penalties
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Industry benchmarks: 5-10% excellent, 15-25% acceptable, 30%+
                  poor for variable demand
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
                  Same absolute error, different MAPE: forecast 5 vs actual 1 =
                  400%, forecast 105 vs actual 100 = 5%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use sMAPE for symmetric treatment; avoid MAPE when data
                  contains zeros or near-zeros
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingEvaluationWhatIsMeanAbsolutePercentageErrorMapeInForecasting;
