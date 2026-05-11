import type { Component } from "solid-js";

const LessonMultiHorizonForecastingInputTypesForMultiHorizonModelsStaticKnownFutureAndObservedCovariates: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Input Types for Multi-Horizon Models: Static, Known Future, and
            Observed Covariates
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Input Categories
            </p>
            <p>
              Multi-horizon models distinguish three input types based on
              availability at forecast time. Static covariates are constant for
              the series (product category, store location). Known future
              covariates are available for all forecast horizons (calendar
              features, scheduled promotions). Observed covariates are only
              available up to the current time (past sales, weather actuals).
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Critical Distinction:</strong> Mixing input types
              incorrectly causes data leakage. Using future weather (observed
              covariate) to predict future demand leaks information unavailable
              at forecast time. Use weather forecasts (known future) or
              historical weather patterns instead.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Static Covariates
            </p>
            <p>
              Encode time-invariant properties: product attributes, location
              demographics, category hierarchies. Enable transfer learning
              across series—a new product can leverage patterns from similar
              products. Embed static features and condition the forecast on
              them, allowing one model to serve many series with different
              characteristics.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Known Future Covariates
            </p>
            <p>
              Calendar features: day of week, month, holidays. Planned events:
              promotions, marketing campaigns, price changes. These are
              deterministic—you know them at forecast time for all future
              horizons. Encode as inputs to each forecast step. Holiday effects
              often dominate other signals; missing them causes systematic
              errors.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Implementation Tip:</strong> For external factors like
              weather, use forecasted values as known future inputs rather than
              excluding them. Weather forecast accuracy degrades with horizon,
              but even imperfect forecasts add signal.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Observed Covariates
            </p>
            <p>
              Historical target values and correlated time series available only
              up to now. The model must learn to propagate information from
              observed history into future predictions without directly
              accessing future values. Architectures like encoder-decoder
              naturally handle this separation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Static Covariates</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Store type, region, SKU category
                    <br />
                    Available: All horizons
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Known Future Covariates
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Holidays, scheduled promotions, committed price
                    <br />
                    Available: Aligned with horizon (next 28 days)
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Observed Covariates</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Sales history (last 60 days), stock levels, competitor price
                    <br />
                    Available: Only up to forecast creation time T
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 8px; border: 2px solid; border-radius: 6px">
                  <strong style="font-size: 12px">⚠ Leakage Risk:</strong>
                  <div style="font-size: 11px; margin-top: 2px">
                    Using promotion decided at T+10 in forecast at T → Backtest
                    looks great, production fails
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
                  Three input types: static (constant), known future (calendar,
                  promotions), observed (only up to current time)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixing input types incorrectly causes data leakage—never use
                  future observed values to predict
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Static covariates enable transfer learning: new products
                  leverage patterns from similar existing products
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
                  Use weather forecasts (known future) not weather actuals
                  (observed) for future horizons—even imperfect forecasts add
                  signal
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Calendar and holiday features are known future covariates;
                  missing them causes systematic forecast errors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingInputTypesForMultiHorizonModelsStaticKnownFutureAndObservedCovariates;
