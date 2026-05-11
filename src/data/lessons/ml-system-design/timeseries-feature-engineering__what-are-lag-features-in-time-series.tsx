import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringWhatAreLagFeaturesInTimeSeries: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are Lag Features in Time Series?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Definition:</strong> Lag features are past values of the
              target variable used as inputs to predict future values. Lag-1 is
              yesterday's value, lag-7 is last week's value, lag-365 is last
              year's value. They capture autoregressive patterns—the tendency
              for time series to correlate with their own past values.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Lags Matter
            </p>
            <p>
              Many time series exhibit momentum: if sales were high yesterday,
              they tend to be high today. Lag features encode this directly. For
              daily sales forecasting, lag-1 captures day-to-day momentum, lag-7
              captures weekly patterns (same day last week), lag-365 captures
              yearly seasonality (same day last year). Different lags capture
              different temporal patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Selecting Lag Orders
            </p>
            <p>
              Use autocorrelation function (ACF) to identify significant lags.
              Spikes at lag 7 and 14 indicate weekly seasonality. Spikes at lag
              365 indicate yearly patterns. Include lags where ACF exceeds
              significance threshold (typically 2/√n). Too few lags miss
              patterns; too many cause overfitting and multicollinearity.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Practical Guidance:</strong> Start with domain-relevant
              lags: lag-1 (yesterday), lag-7 (weekly), lag-28 or lag-30
              (monthly), lag-365 (yearly). Add intermediate lags if ACF shows
              significance. Remove lags with near-zero feature importance after
              initial training.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Horizon Constraints
            </p>
            <p>
              Lag features must be available at prediction time. For 7-day ahead
              forecasts, lag-1 through lag-6 are unavailable—you do not know
              tomorrow's value when predicting next week. Use only lags &gt;=
              forecast horizon, or use predicted values (recursive forecasting)
              for unavailable lags. This constraint is critical and commonly
              violated.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi-Series Considerations
            </p>
            <p>
              For panel data (multiple related series), include both own-series
              lags and cross-series lags. A product's sales might correlate with
              competitor product sales from last week. Cross-lags capture
              spillover effects invisible to single-series analysis.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; text-align: center">
                <strong style="font-size: 15px">
                  Predicting Sales at Time t
                </strong>
              </div>
              <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 90px">
                  <div style="font-size: 13px; font-weight: bold">Lag 1</div>
                  <div style="font-size: 12px; margin-top: 4px">t − 1</div>
                  <div style="font-size: 11px; margin-top: 2px">Yesterday</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 90px">
                  <div style="font-size: 13px; font-weight: bold">Lag 7</div>
                  <div style="font-size: 12px; margin-top: 4px">t − 7</div>
                  <div style="font-size: 11px; margin-top: 2px">Last Week</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center; min-width: 90px">
                  <div style="font-size: 13px; font-weight: bold">Lag 28</div>
                  <div style="font-size: 12px; margin-top: 4px">t − 28</div>
                  <div style="font-size: 11px; margin-top: 2px">
                    4 Weeks Ago
                  </div>
                </div>
              </div>
              <div style="margin-top: 14px; text-align: center; font-size: 24px; font-weight: bold">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; margin-top: 8px">
                <strong style="font-size: 14px">Prediction at time t</strong>
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
                  Lag features encode autoregressive patterns: lag-1 for
                  momentum, lag-7 for weekly, lag-365 for yearly seasonality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use ACF to identify significant lags; include where ACF
                  exceeds 2/√n significance threshold
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For H-step forecasts, only lags &gt;= H are available—using
                  shorter lags causes data leakage
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
                  Start with domain-relevant lags: 1 (yesterday), 7 (weekly),
                  28-30 (monthly), 365 (yearly)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cross-series lags capture spillover effects: product sales may
                  correlate with competitor sales from last week
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringWhatAreLagFeaturesInTimeSeries;
