import type { Component } from "solid-js";

const LessonStatisticalForecastingExponentialSmoothingWeightedAverages: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Exponential Smoothing: Weighted Averages of the Past
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Idea
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Exponential smoothing</strong> forecasts using a
                weighted average of past values—recent values count more,
                weights decrease exponentially going back in time.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE INTUITION
            </p>
            <p style="margin-top: 0">
              Predicting tomorrow temperature: yesterday matters most, last week
              some, last month barely. Formula:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                forecast = α × latest + (1-α) × previous_forecast
              </code>
              . Alpha (0-1) controls weight on latest. α=0.3 means 30% on
              latest, 70% on accumulated past.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CHOOSING ALPHA
            </p>
            <p style="margin-top: 0">
              High α (0.7-0.9): Reacts quickly, forgets fast. Good for volatile
              data. Low α (0.1-0.3): Stable forecasts, slow to react. Good for
              steady data. Optimize by testing which minimizes forecast error on
              historical data.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Simple smoothing predicts flat
              forecasts—tomorrow equals today, forever. Works when data
              fluctuates around stable mean, fails for trending or seasonal
              data.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ADDING TREND
            </p>
            <p style="margin-top: 0">
              Real data often trends. Holt method adds a component tracking rate
              of change. Forecast extends current level along slope. Damped
              variant gradually flattens—useful because most trends do not
              continue forever.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ADDING SEASONALITY
            </p>
            <p style="margin-top: 0">
              Many series repeat: retail spikes in December, traffic drops on
              weekends. Holt-Winters learns seasonal factors (12 monthly
              multipliers for yearly patterns). Needs 2+ complete cycles of
              history.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> More components = more parameters =
              more data needed. Start simple, add trend if data grows, add
              seasonality only with clear patterns and sufficient history.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  ARIMA(p, d, q) Components
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">AR(p)</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Autoregressive
                      <br />
                      Uses p past values
                      <br />
                      Example: p=2
                      <br />
                      y(t) = φ₁y(t-1) + φ₂y(t-2)
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">I(d)</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Integrated
                      <br />
                      Differences d times
                      <br />
                      Example: d=1
                      <br />
                      Δy(t) = y(t) - y(t-1)
                    </div>
                  </div>
                  <div style="flex: 1; border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 13px">MA(q)</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Moving Average
                      <br />
                      Uses q past errors
                      <br />
                      Example: q=1
                      <br />
                      ε(t) = θ₁ε(t-1)
                    </div>
                  </div>
                </div>
                <div style="margin-top: 8px; border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    SARIMA adds seasonal terms (P, D, Q)m
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    m=7 for daily with weekly pattern
                    <br />
                    m=24 for hourly with daily pattern
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
                  Exponential smoothing forecasts using weighted average of past
                  values—recent values weighted more
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alpha parameter (0-1) controls how fast old data is forgotten;
                  optimize by minimizing historical error
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Simple smoothing produces flat forecasts; add trend component
                  for growing/shrinking data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Holt-Winters adds seasonal factors for repeating patterns
                  (requires 2+ cycles of history)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  More components need more parameters and more data—start
                  simple, add complexity only if needed
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
                  Explain the intuition: recent data matters more than old data,
                  weights decay exponentially
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Know when to add components: flat data = simple, trending =
                  Holt, seasonal = Holt-Winters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingExponentialSmoothingWeightedAverages;
