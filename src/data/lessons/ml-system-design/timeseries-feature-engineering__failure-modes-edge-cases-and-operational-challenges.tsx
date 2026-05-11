import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringFailureModesEdgeCasesAndOperationalChallenges: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes, Edge Cases, and Operational Challenges
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Missing Historical Data
            </p>
            <p>
              Lag features require historical values that may be missing: new
              products have no history, stockouts create zeros that are not true
              demand, data collection gaps leave holes. Imputation strategies:
              forward fill (use last known value), interpolation (estimate
              between known values), model-based imputation, or exclude affected
              rows from training.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Do not impute stockout zeros as true
              demand—this teaches the model that zero demand is normal when it
              actually reflects supply constraints. Flag stockouts separately
              and handle explicitly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transforms: uppercase; letter-spacing: 0.5px">
              Insufficient History for Long Lags
            </p>
            <p>
              Series with 60 days of history cannot compute lag-365. Cold start
              strategies: use category-level statistics, borrow from similar
              series, or use only available lags with regularization to prevent
              overfitting to short history. Gradually enable longer lags as
              history accumulates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calendar Feature Misalignment
            </p>
            <p>
              Holiday effects vary by region and year. Easter moves;
              Thanksgiving is fixed. Using wrong holiday calendar for a region
              causes systematic errors on those days. Maintain region-specific
              holiday lists. For floating holidays, encode as "days until
              holiday" rather than fixed calendar dates.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Debugging Tip:</strong> When forecasts fail on specific
              dates, check calendar alignment first. Missing or incorrect
              holiday flags cause large errors concentrated on predictable
              dates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Computation Delays
            </p>
            <p>
              Batch pipelines have latency: features computed overnight may not
              reflect yesterday evening. For high-frequency forecasts, this
              staleness degrades accuracy. Monitor feature freshness and alert
              when computation completes late. Consider streaming for features
              where staleness significantly impacts forecast quality.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Do not impute stockout zeros as true demand—flag them
                  separately to avoid teaching model supply constraints
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start: use category statistics, borrow from similar
                  series, or use only available lags with regularization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For floating holidays, encode as days until holiday rather
                  than fixed calendar dates
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
                  When forecasts fail on specific dates, check calendar
                  alignment first—missing holiday flags cause concentrated
                  errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor feature freshness; batch pipeline latency means
                  morning features may not reflect yesterday evening
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringFailureModesEdgeCasesAndOperationalChallenges;
