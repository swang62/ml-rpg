import type { Component } from "solid-js";

const LessonTimeseriesFeatureEngineeringPointInTimeCorrectnessAndPreventingLeakage: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Point in Time Correctness and Preventing Leakage
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Point-in-Time Problem
            </p>
            <p>
              When training on historical data, features must reflect only
              information available at prediction time. If you compute "30-day
              rolling mean" for a prediction made January 15, 2024, you must use
              data from December 16, 2023 to January 14, 2024—not data that
              includes January 15 or later. Using future information is called
              data leakage and inflates offline metrics while failing in
              production.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Warning:</strong> Leakage often produces models with 95%+
              accuracy offline that perform at 50% in production. The gap is
              diagnostic: if production metrics are dramatically worse than
              offline, audit for leakage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Common Leakage Sources
            </p>
            <p>
              Lag features using unavailable lags: lag-1 is unavailable for
              7-day ahead forecast. Rolling statistics including the prediction
              day. Target encoding computed on the entire dataset (including
              test rows). Shuffle splitting that mixes time periods.
              Late-arriving data: revenue finalized days after transaction but
              used as if immediately available.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Prevention Strategies
            </p>
            <p>
              Always use time-based splits, not random splits. Define a cutoff
              timestamp for each prediction. Filter features to only include
              data before cutoff. Build feature pipelines that take
              prediction_time as explicit parameter. Unit test features by
              verifying no future data is accessed.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Validation Pattern:</strong> For each training example at
              time t with horizon h, verify all features use only data from time
              &lt; t. Log serving-time features and compare to batch-computed
              features for same prediction—divergence indicates leakage.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Store Considerations
            </p>
            <p>
              Feature stores must support point-in-time queries: "give me
              features as they would have been at time T." Without this,
              training features differ from serving features. Production feature
              values reflect current state; training needs historical state.
              Time-travel capability is essential for correct backtesting.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="margin-bottom: 12px; text-align: center">
                <strong style="font-size: 15px">
                  Leakage vs Correct Windowing
                </strong>
              </div>
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    ❌ Leakage: Window Includes Label Time
                  </div>
                  <div style="font-size: 12px">
                    Predict sales at <strong>Day 7 EOD</strong>
                    <br />
                    Rolling 7d mean: Days 1–7 (includes Day 7!)
                    <br />
                    Model sees future → Training accuracy 95% → Production
                    accuracy 60%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 13px; margin-bottom: 6px">
                    ✓ Correct: Window Ends Before Label
                  </div>
                  <div style="font-size: 12px">
                    Predict sales at <strong>Day 7 EOD</strong>
                    <br />
                    Rolling 7d mean: Days 0–6 (cutoff at Day 7 SOD)
                    <br />
                    Model uses only past → Training accuracy 78% → Production
                    accuracy 77%
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 11px">
                  <strong>Key Rule:</strong> Feature timestamp &lt; Label
                  timestamp. Enforce with point in time joins and validate with
                  synthetic spike tests.
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
                  Features must reflect only information available at prediction
                  time—future data causes leakage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Leakage produces 95%+ offline accuracy that drops to 50% in
                  production—the gap is diagnostic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature stores must support point-in-time queries for correct
                  backtesting and training
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
                  Common leakage: lag-1 unavailable for 7-day forecast, rolling
                  stats including prediction day, shuffle splits
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Verify each training example at time t uses only data from
                  time &lt; t; log and compare serving vs batch features
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTimeseriesFeatureEngineeringPointInTimeCorrectnessAndPreventingLeakage;
