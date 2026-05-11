import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringSeasonalityEncodingCalendarFeaturesAndFourierTerms: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Seasonality Encoding: Calendar Features and Fourier Terms
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calendar Features
            </p>
            <p>
              Extract temporal indicators from timestamps: day_of_week (0-6),
              month (1-12), day_of_month (1-31), week_of_year (1-52),
              is_weekend, is_holiday. These capture known cyclical patterns.
              Retail sales spike on weekends; restaurant demand dips on Mondays.
              Calendar features are known future covariates—available for any
              forecast horizon.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Encoding Strategy:</strong> Use cyclical encoding for
              ordinal calendar features. Day of week as sin/cos preserves
              circular relationship: Sunday (day 0) is adjacent to Saturday (day
              6). Linear encoding treats them as distant, which is incorrect.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Cyclical Encoding Formula
            </p>
            <p>
              For feature with period P: sin_feature = sin(2π × value / P),
              cos_feature = cos(2π × value / P). Day of week (P=7): sin(2π × day
              / 7), cos(2π × day / 7). Hour of day (P=24): sin(2π × hour / 24),
              cos(2π × hour / 24). Both sin and cos are needed to uniquely
              identify position in cycle.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fourier Terms for Complex Seasonality
            </p>
            <p>
              Multiple seasonal patterns (weekly + yearly) require multiple
              harmonics. Fourier terms decompose seasonality into sine-cosine
              pairs at different frequencies. For yearly seasonality: include
              sin(2πt/365), cos(2πt/365), sin(4πt/365), cos(4πt/365), etc. More
              terms capture sharper seasonal patterns but risk overfitting.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Practical Guidance:</strong> Start with 2-4 Fourier terms
              per seasonal period. More terms needed for sharp patterns (holiday
              spikes), fewer for smooth patterns (gradual summer increase).
              Cross-validate to select optimal number.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Holiday Features
            </p>
            <p>
              Create binary indicators for holidays. Different holidays have
              different effects—Christmas differs from Labor Day. Include
              lead/lag effects: is_day_before_holiday, is_day_after_holiday.
              Holiday calendars vary by region; use location-specific holiday
              lists for multi-region forecasting.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="margin-bottom: 14px; text-align: center">
                <strong style="font-size: 15px">
                  Seasonality Encoding Approaches
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px">
                    Calendar Features
                  </div>
                  <div style="font-size: 12px">
                    Hour: 0 to 23
                    <br />
                    Day of Week: Mon=1, Tue=2, ..., Sun=7
                    <br />
                    Holiday: 0 or 1<br />
                    <strong>Size:</strong> 24 + 7 + 1 = 32 features
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px">
                    Fourier Terms (2 harmonics)
                  </div>
                  <div style="font-size: 12px">
                    Weekly: sin(2πt/7), cos(2πt/7)
                    <br />
                    Weekly: sin(4πt/7), cos(4πt/7)
                    <br />
                    Daily: sin(2πt/24), cos(2πt/24)
                    <br />
                    <strong>Size:</strong> 6 features total
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 14px; margin-bottom: 6px">
                    Hybrid Approach
                  </div>
                  <div style="font-size: 12px">
                    Day of week (7) + Holiday (1) + Yearly Fourier (4)
                    <br />
                    <strong>Size:</strong> 12 features, captures both sharp and
                    smooth patterns
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
                  Cyclical encoding preserves circular relationships: Sunday is
                  adjacent to Saturday, not distant
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Both sin and cos needed for unique position: sin(2π × value /
                  P), cos(2π × value / P)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Start with 2-4 Fourier terms per seasonal period; more for
                  sharp patterns, fewer for smooth
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
                  Day of week encoding: sin(2π × day / 7), cos(2π × day / 7)
                  where P=7
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Include holiday lead/lag effects: is_day_before_holiday,
                  is_day_after_holiday for spillover
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringSeasonalityEncodingCalendarFeaturesAndFourierTerms;
