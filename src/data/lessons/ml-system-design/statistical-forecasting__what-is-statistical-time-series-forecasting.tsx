import type { Component } from "solid-js";

const LessonStatisticalForecastingWhatIsStatisticalTimeSeriesForecasting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Statistical Time Series Forecasting?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Statistical time series forecasting</strong> predicts
                future values using mathematical formulas that capture patterns
                in historical data—trends, cycles, and momentum that will likely
                continue.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE PROBLEM IT SOLVES
            </p>
            <p style="margin-top: 0">
              Businesses need predictions: next month sales, tomorrow server
              load, next quarter inventory. The simplest approach—use last month
              value—fails when data has trends or seasonal patterns. Statistical
              models capture these patterns mathematically, enabling forecasts
              that adapt to growth and cycles.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY STATISTICAL MODELS STILL MATTER
            </p>
            <p style="margin-top: 0">
              Despite deep learning hype, statistical models dominate
              production. They train in milliseconds (vs hours for neural
              networks), need minimal data (20-50 points vs thousands), produce
              interpretable outputs, and often outperform complex models on
              single time series. For millions of SKUs or servers, speed and
              simplicity win.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Statistical models are the right tool
              for fast, interpretable forecasts at scale. Deep learning shines
              with complex multivariate data; statistical models shine with
              millions of univariate series.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              TWO MAIN APPROACHES
            </p>
            <p style="margin-top: 0">
              <strong>Exponential Smoothing (ETS):</strong> Averages past
              values, weighting recent observations more heavily. Best when data
              has clear trend and seasonal patterns. <strong>ARIMA:</strong>{" "}
              Models how each value relates to previous values (momentum) and
              previous errors (shocks). Best when knowing yesterday strongly
              helps predict today.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PREDICTION INTERVALS
            </p>
            <p style="margin-top: 0">
              Both produce point forecasts (single value) and prediction
              intervals (uncertainty range). A 95% interval means the true value
              falls in this range 95% of the time. Wider intervals = more
              uncertainty. As horizon extends, intervals widen because
              uncertainty compounds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Simple ETS</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Level only
                    <br />
                    Update: O(1) time
                    <br />
                    Use: Stable demand
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Holt (Double ETS)</strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Level + Trend
                    <br />
                    Update: O(1) time
                    <br />
                    Use: Growing demand
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Holt Winters (Triple ETS)
                  </strong>
                  <div style="margin-top: 6px; font-size: 13px">
                    Level + Trend + Seasonality
                    <br />
                    Additive or Multiplicative
                    <br />
                    Use: Seasonal patterns
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
                  Statistical models predict future values using mathematical
                  formulas that capture patterns in historical data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  They train in milliseconds, need minimal data (20-50 points),
                  and produce interpretable outputs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ETS averages past values with recent data weighted more; ARIMA
                  models momentum and shock patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Both produce point forecasts plus prediction intervals showing
                  uncertainty
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Statistical models often outperform deep learning on single
                  univariate time series
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
                  When asked about forecasting approach, explain why statistical
                  models are often preferred over deep learning at scale
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the interpretability advantage—you can explain WHY the
                  forecast is a specific value
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingWhatIsStatisticalTimeSeriesForecasting;
