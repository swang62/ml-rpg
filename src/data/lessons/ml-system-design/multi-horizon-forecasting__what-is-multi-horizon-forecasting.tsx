import type { Component } from "solid-js";

const LessonMultiHorizonForecastingWhatIsMultiHorizonForecasting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Multi-Horizon Forecasting?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Multi-horizon forecasting predicts
              values at multiple future time points simultaneously—not just
              tomorrow, but tomorrow, next week, and next month in a single
              model pass. Different business decisions require different
              horizons: inventory needs 2-4 week forecasts, capacity planning
              needs 3-6 month forecasts.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Single-Horizon Falls Short
            </p>
            <p>
              Single-horizon models optimize for one specific lookahead. A model
              optimized for 1-day forecasts performs poorly at 7-day horizon
              because error patterns differ. Training separate models per
              horizon is expensive and creates inconsistencies—the 7-day
              forecast might exceed the sum of daily forecasts. Multi-horizon
              models produce coherent forecasts across all horizons.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Uncertainty Grows with Horizon
            </p>
            <p>
              Forecast accuracy degrades as horizon increases. 1-day forecasts
              might achieve 5% MAPE, 7-day forecasts 15%, 30-day forecasts 30%.
              Multi-horizon models should output uncertainty estimates
              (prediction intervals) that widen appropriately with horizon.
              Decision-makers need both point forecasts and confidence bounds.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Key Insight:</strong> Different horizons serve different
              decisions. Short-horizon high-accuracy forecasts drive operational
              decisions (staffing, logistics). Long-horizon lower-accuracy
              forecasts drive strategic decisions (capacity investment). One
              model serving both requires explicit multi-horizon design.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Business Applications
            </p>
            <p>
              Demand forecasting: retailers need 1-day (replenishment), 2-week
              (promotions), 3-month (seasonal ordering) forecasts. Energy:
              1-hour (dispatch), 1-day (scheduling), 1-week (maintenance)
              horizons. Finance: 1-day (trading), 1-month (budgeting), 1-year
              (planning) forecasts. Each application has natural horizon
              granularities matching decision cycles.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Historical Data (60 days)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Sales: [120, 135, 118, ...]
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Multi-Horizon Model</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Predict next 28 days
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Quantile Forecasts</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Day 1: [p10: 95, p50: 125, p90: 160]
                    <br />
                    Day 7: [p10: 88, p50: 130, p90: 180]
                    <br />
                    Day 28: [p10: 70, p50: 140, p90: 220]
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
                  Multi-horizon models predict multiple future time points
                  simultaneously, producing coherent forecasts across horizons
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Forecast accuracy degrades with horizon: 5% MAPE at 1-day may
                  become 30% at 30-day—output uncertainty estimates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Different horizons serve different decisions: short-horizon
                  for operations, long-horizon for strategic planning
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
                  Retail demand: 1-day (replenishment), 2-week (promotions),
                  3-month (seasonal ordering) in one model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Single-horizon models create inconsistencies: 7-day forecast
                  might exceed sum of daily forecasts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingWhatIsMultiHorizonForecasting;
