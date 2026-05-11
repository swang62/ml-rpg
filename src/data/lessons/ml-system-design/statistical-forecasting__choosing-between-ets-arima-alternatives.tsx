import type { Component } from "solid-js";

const LessonStatisticalForecastingChoosingBetweenEtsArimaAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Between ETS, ARIMA, and Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Decision Framework
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Choose <strong>ETS</strong> for clear visual trend/seasonality.
                Choose <strong>ARIMA</strong> for subtle autocorrelation
                patterns that statistical tests detect but you cannot see by
                eye.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ETS STRENGTHS
            </p>
            <p style="margin-top: 0">
              Simple to explain ("recent data weighted more"). Handles missing
              values gracefully. Works with limited data (2 seasonal cycles).
              Interpretable components—plot level, trend, seasonal separately.
              Faster to fit.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ARIMA STRENGTHS
            </p>
            <p style="margin-top: 0">
              Captures complex autocorrelation ETS misses. Better when today
              strongly depends on past values or past shocks. More
              flexible—models patterns ETS cannot. SARIMA handles multiple
              seasonalities.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> ETS and ARIMA often produce similar
              forecasts. The choice matters for edge cases. When unsure, fit
              both and compare cross-validation error.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHEN TO USE DEEP LEARNING
            </p>
            <p style="margin-top: 0">
              Neural networks shine when: many related series (patterns
              transfer), external features matter (weather, promotions),
              patterns are nonlinear. Need thousands of points and hours to
              train. For single univariate series, statistical models usually
              win.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ALWAYS BENCHMARK BASELINES
            </p>
            <p style="margin-top: 0">
              <strong>Naive:</strong> tomorrow = today.{" "}
              <strong>Seasonal naive:</strong> tomorrow = same day last year. If
              fancy models do not beat these, something is wrong. Baselines are
              surprisingly hard to beat on noisy data.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> Do not pick models by in-sample fit.
              Use out-of-sample cross-validation—train on past, test on unseen
              future.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 15px; margin-bottom: 6px">
                  Common Failure Modes
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Structural Break</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Policy change drops demand 50%
                    <br />
                    ETS lags for weeks (alpha=0.1 to 0.3)
                    <br />
                    Mitigation: CUSUM detection, state reset at 3 sigma
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Promotion Spike</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Holiday sales 3x normal
                    <br />
                    Multiplicative error explodes, intervals undercover 10 to
                    20%
                    <br />
                    Mitigation: Event calendar, widen intervals 50 to 100%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">DST Misalignment</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    23 or 25 hour days twice yearly
                    <br />
                    Weekly seasonality drifts 1 hour
                    <br />
                    Mitigation: UTC normalization, adjust seasonal indices
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Backfill</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    History revised, state corrupted
                    <br />
                    Over 10% backfill requires refit
                    <br />
                    Mitigation: Version state, 5 min rollback capability
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
                  ETS for clear visual trend/seasonality; ARIMA for complex
                  autocorrelation patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ETS is simpler, handles missing values, needs less data; ARIMA
                  is more flexible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Deep learning needs thousands of points, hours to train—wins
                  only with many related series
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always benchmark against naive baselines; if you cannot beat
                  them, something is wrong
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use out-of-sample cross-validation, not in-sample fit, to
                  select models
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
                  When unsure between ETS and ARIMA, fit both and compare
                  cross-validation error
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that naive baselines are surprisingly hard to beat on
                  noisy data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingChoosingBetweenEtsArimaAlternatives;
