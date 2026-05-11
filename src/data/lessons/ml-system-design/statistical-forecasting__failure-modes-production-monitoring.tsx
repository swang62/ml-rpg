import type { Component } from "solid-js";

const LessonStatisticalForecastingFailureModesProductionMonitoring: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Monitoring
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Challenge
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Statistical models assume the future resembles the past. When
                this breaks—new competitors, pandemics, policy changes—forecasts
                fail. Monitoring detects failures early.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STRUCTURAL BREAKS
            </p>
            <p style="margin-top: 0">
              Permanent shifts in level, trend, or seasonality. Models trained
              on pre-break data produce systematically wrong forecasts.
              Detection: sustained bias (consistently over/under-forecasting).
              Fix: retrain on post-break data only.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PROMOTIONS AND EVENTS
            </p>
            <p style="margin-top: 0">
              Sales spikes look like outliers. Models either ignore them or
              learn elevated baseline. Fix: indicator variables marking
              promotional days, or separate models for promotional vs normal
              periods.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Missing data breaks ARIMA—cannot use
              yesterday if missing. Impute first: linear interpolation, same
              period last year, or model-based fill.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MONITORING IN PRODUCTION
            </p>
            <p style="margin-top: 0">
              Track forecast error over time. MAE = average absolute error. MAPE
              = average percentage error. Alert when error exceeds baseline or
              trends upward. Compare to naive—if model loses to "predict
              yesterday," investigate immediately.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              RESIDUAL DIAGNOSTICS
            </p>
            <p style="margin-top: 0">
              Residuals (actual minus forecast) should look random: no patterns,
              centered at zero. Patterns (rising, Monday spikes) mean model is
              missing something. Plot residuals after retraining to catch
              degradation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Retraining Triggers:</strong> Accuracy drops below
              threshold, residuals show patterns, external event occurs. Weekly
              or monthly retraining suffices for stable series.
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
                  Structural breaks (permanent shifts) cause systematic forecast
                  errors; retrain on post-break data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Promotions and events look like outliers; use indicator
                  variables or separate models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Missing data breaks ARIMA—impute with interpolation or
                  same-period-last-year
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor MAE/MAPE over time; alert when error exceeds baseline
                  or trends upward
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Residuals should look random; patterns indicate the model is
                  missing something
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
                  If model loses to naive baseline, investigate
                  immediately—something is broken
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Watch for sustained bias (consistently over or
                  under-forecasting) to detect structural breaks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingFailureModesProductionMonitoring;
