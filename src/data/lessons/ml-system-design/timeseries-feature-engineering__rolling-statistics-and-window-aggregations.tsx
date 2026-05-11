import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringRollingStatisticsAndWindowAggregations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Rolling Statistics and Window Aggregations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What Rolling Statistics Capture
            </p>
            <p>
              Rolling statistics summarize recent history: 7-day rolling mean
              captures the recent baseline level, 7-day rolling standard
              deviation captures recent volatility. Unlike point lags, rolling
              statistics smooth noise and extract persistent signals. A 30-day
              rolling mean is more stable than lag-30 alone because it averages
              30 observations rather than using just one.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Common Rolling Features:</strong> Mean (level), std
              (volatility), min/max (range), median (robust level), sum
              (volume), count (frequency). Each captures different aspects of
              recent behavior useful for forecasting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Window Size Selection
            </p>
            <p>
              Short windows (7 days) respond quickly to changes but are noisy.
              Long windows (90 days) are stable but slow to adapt. Use multiple
              window sizes to capture different scales: 7-day for recent trends,
              30-day for monthly patterns, 90-day for quarterly baseline.
              Compare current value to rolling statistics: ratio of today's
              value to 30-day mean indicates whether demand is above or below
              recent normal.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Expanding vs Rolling Windows
            </p>
            <p>
              Rolling windows have fixed size (last N days). Expanding windows
              grow over time (all history up to now). Rolling captures recent
              patterns; expanding captures lifetime patterns. Use expanding for
              cumulative metrics (lifetime purchases) and rolling for recent
              behavior (recent purchase frequency).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Implementation Tip:</strong> Compute rolling statistics
              with a gap to prevent leakage. For day-ahead forecasting, the
              7-day rolling mean should exclude today (use days t-7 to t-1, not
              t-6 to t). The window must end before the prediction point.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Exponentially Weighted Statistics
            </p>
            <p>
              Exponentially weighted moving averages (EWMA) assign more weight
              to recent observations without hard window cutoffs. Controlled by
              span or halflife parameter. EWMA responds faster to recent changes
              while maintaining smoothness. Useful when you want recency
              weighting without abrupt window boundaries.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="margin-bottom: 12px; text-align: center">
                <strong style="font-size: 15px">
                  7 Day Rolling Mean Computation
                </strong>
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; justify-content: center">
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 1</strong>
                  <div style="margin-top: 2px">120</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 2</strong>
                  <div style="margin-top: 2px">135</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 3</strong>
                  <div style="margin-top: 2px">110</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 4</strong>
                  <div style="margin-top: 2px">145</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 5</strong>
                  <div style="margin-top: 2px">128</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 6</strong>
                  <div style="margin-top: 2px">142</div>
                </div>
                <div style="border: 2px solid; padding: 8px 10px; border-radius: 6px; text-align: center; min-width: 50px; font-size: 12px">
                  <strong>Day 7</strong>
                  <div style="margin-top: 2px">138</div>
                </div>
              </div>
              <div style="text-align: center; font-size: 22px; font-weight: bold; margin: 8px 0">
                ↓
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                <strong style="font-size: 14px">Rolling Mean = 131</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  (120+135+110+145+128+142+138) / 7
                </div>
              </div>
              <div style="margin-top: 10px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px">
                <strong>Next Update:</strong> Drop Day 1 (120), Add Day 8,
                Recompute in O(1)
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
                  Rolling statistics smooth noise: 30-day mean averages 30
                  observations versus one point from lag-30
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use multiple window sizes: 7-day for recent, 30-day for
                  monthly, 90-day for quarterly baseline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Compute with gap to prevent leakage: 7-day mean should use
                  days t-7 to t-1, excluding prediction day
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
                  Compare current to rolling stats: ratio of today to 30-day
                  mean shows if demand is above/below recent normal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use expanding windows for lifetime metrics, rolling for recent
                  behavior patterns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringRollingStatisticsAndWindowAggregations;
