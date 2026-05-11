import type { Component } from "solid-js";

const LessonFraudFeatureEngineeringTemporalPatternsCapturingSeasonalityAndTimeBasedSignals: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Temporal Patterns: Capturing Seasonality and Time Based Signals
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Core Concept:</strong> Temporal features capture
              time-based patterns in user behavior. Fraud patterns differ by
              hour of day, day of week, and season. A transaction at 3 AM from
              an account that normally transacts during business hours is more
              suspicious than the same transaction at noon—temporal context
              transforms raw data into fraud signals.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cyclical Encoding
            </p>
            <p>
              Time features are cyclical: hour 23 is close to hour 0, December
              is close to January. Linear encoding treats these as distant
              values. Cyclical encoding uses sine and cosine transformations:
              hour_sin = sin(2π × hour/24), hour_cos = cos(2π × hour/24). This
              preserves the circular relationship—the model learns that midnight
              and 11 PM are neighbors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Time Since Events
            </p>
            <p>
              Elapsed time features measure recency: seconds since last login,
              hours since last transaction, days since account creation. These
              capture behavioral velocity without explicit aggregation. A
              purchase 30 seconds after login is more suspicious than one 30
              minutes after—the user had no time to browse.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Feature Insight:</strong> Combine absolute time (hour of
              day) with relative time (seconds since last action). Absolute time
              captures population-level patterns; relative time captures
              individual behavioral anomalies.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Seasonality Indicators
            </p>
            <p>
              Boolean flags for known patterns: is_weekend, is_holiday,
              is_business_hours, is_month_end. These simple features capture
              when normal behavior differs from baseline. Payroll fraud spikes
              at month-end; gift card fraud spikes during holidays. The model
              learns these correlations without manual rule creation.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              User-Specific Baselines
            </p>
            <p>
              Compare current time to the user's typical activity window. If a
              user normally transacts between 9 AM and 6 PM, a 2 AM transaction
              deviates from their personal baseline even if 2 AM is normal for
              the population. Features: is_outside_typical_hours,
              hours_from_typical_center.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Raw Timestamp</strong>
                  <div style="margin-top: 8px; font-family: monospace; font-size: 13px">
                    2024-01-15 14:30:00
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Transform
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Calendar</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      hour: 14
                      <br />
                      day_of_week: 0<br />
                      is_holiday: false
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                    <strong style="font-size: 12px">Cyclical</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      sin_hour: 0.26
                      <br />
                      cos_hour: 0.97
                      <br />
                      (preserves adjacency)
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
                  Cyclical encoding (sine/cosine) preserves circular
                  relationships—hour 23 and hour 0 become neighbors in feature
                  space
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Combine absolute time (hour of day) with relative time
                  (seconds since last action) to capture both population and
                  individual patterns
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compare to user-specific baselines: a 2 AM transaction may be
                  normal for population but anomalous for a 9-5 user
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
                  Explain cyclical encoding formula: hour_sin = sin(2π ×
                  hour/24), hour_cos = cos(2π × hour/24)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use elapsed time features: seconds since last login, hours
                  since last transaction, days since account creation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonFraudFeatureEngineeringTemporalPatternsCapturingSeasonalityAndTimeBasedSignals;
