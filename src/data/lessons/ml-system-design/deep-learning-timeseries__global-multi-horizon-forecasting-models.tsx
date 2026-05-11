import type { Component } from "solid-js";

const LessonDeepLearningTimeseriesGlobalMultiHorizonForecastingModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Global Multi-Horizon Forecasting Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Traditional time series approaches train one model per series. At
            scale, this becomes intractable: a retailer with 5 million Store
            Keeping Unit (SKU) store combinations cannot maintain 5 million
            separate models. Global models solve this by training a single
            neural network across all entities simultaneously, using embeddings
            to distinguish between them. The architecture adds entity identifier
            embeddings to the input. Each item, store, and category gets a
            learned vector representation that captures its characteristics.
            These embeddings are concatenated with the time series values and
            fed into the LSTM or Transformer. The model learns shared temporal
            patterns (weekly seasonality, holiday effects, trend dynamics) while
            the embeddings allow it to specialize predictions per entity. This
            sharing of statistical strength is powerful: sparse series with only
            a few months of data benefit from patterns learned on millions of
            other series. Multi-horizon forecasting extends this further by
            predicting multiple future time steps simultaneously rather than
            just the next step. Instead of one output neuron, you have 48 or 168
            output neurons corresponding to the next 48 hours or 7 days. This
            direct multi-horizon approach avoids error accumulation that happens
            when you recursively predict one step, feed it back, predict again,
            and so on. Amazon retail systems commonly use 48 hour horizons for
            replenishment planning, while Uber demand forecasting targets 2 to 4
            hour horizons for driver allocation. Production systems output
            probabilistic forecasts using quantile regression. Instead of
            predicting a single point value, the model outputs P10, P50
            (median), and P90 quantiles. This captures forecast uncertainty and
            enables risk based decisions. For example, inventory planning uses
            P90 to set safety stock when the cost of stockouts exceeds the cost
            of overstock. The loss function is pinball loss, which penalizes
            under-prediction and over-prediction asymmetrically based on the
            quantile. The challenge is maintaining forecast quality across the
            entire distribution of entities. Head SKUs with abundant data and
            stable demand might achieve Weighted Absolute Percentage Error
            (WAPE) under 5%, while long tail items with intermittent demand may
            only reach 15 to 20% WAPE. Large retailers target aggregate WAPE
            under 15% at weekly horizons. Monitoring must track metrics by
            cohort (head vs tail, category, region) and trigger retraining or
            fallback rules when specific segments degrade.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Global Multi-Horizon Architecture
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; max-width: 100%">
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; font-size: 12px; min-width: 80px">
                    <strong>Time Series</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      168 steps
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; font-size: 12px; min-width: 80px">
                    <strong>Item Embed</strong>
                    <div style="font-size: 11px; margin-top: 4px">Dim 32</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; font-size: 12px; min-width: 80px">
                    <strong>Store Embed</strong>
                    <div style="font-size: 11px; margin-top: 4px">Dim 16</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; text-align: center; font-size: 12px; min-width: 80px">
                    <strong>Calendar</strong>
                    <div style="font-size: 11px; margin-top: 4px">
                      Day, Holiday
                    </div>
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 80%; text-align: center">
                  <strong style="font-size: 13px">
                    LSTM / Transformer Encoder
                  </strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    128 hidden units, 2 layers
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; width: 80%">
                  <div style="text-align: center; font-weight: 700; font-size: 13px; margin-bottom: 6px">
                    Multi-Horizon Outputs (48 steps)
                  </div>
                  <div style="font-size: 12px; line-height: 1.5">
                    P10 quantile: 48 values
                    <br />
                    P50 quantile: 48 values
                    <br />
                    P90 quantile: 48 values
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
                  Global models train a single network across millions of
                  entities using learned embeddings (32 to 64 dimensions) for
                  item ID, store, and category, sharing statistical strength and
                  reducing model count from millions to one
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Direct multi-horizon outputs predict all H future steps
                  simultaneously (commonly 48 to 168 steps) avoiding recursive
                  error accumulation that can double Mean Absolute Percentage
                  Error (MAPE) from H+1 to H+24
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Probabilistic forecasting with quantile regression outputs
                  P10, P50, P90 via pinball loss, enabling risk based decisions
                  like using P90 for 90% service level inventory planning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production targets: Weighted Absolute Percentage Error (WAPE)
                  under 15% at weekly horizon for long tail SKUs, under 5% for
                  head items, with coverage of 80 to 90% for P10 to P90
                  intervals
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start advantage: new products or stores leverage
                  embeddings mapped to similar categories, achieving reasonable
                  forecasts from day one instead of requiring months of history
                  for local models
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
                  Amazon retail replenishment: Global model across 20 million
                  SKU-store pairs with 48 hour multi-horizon, item and store
                  embeddings (dim 32), predicts P10/P50/P90 quantiles, nightly
                  batch of 20M forecasts in under 10 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand allocation: Global LSTM with city and zone
                  embeddings forecasts 2 hour demand across 5000 zones in 50
                  cities, online scoring at 2000 QPS with p99 under 50ms using
                  micro-batching of 8 requests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retail planning system: 168 step multi-horizon model outputs
                  used directly for weekly replenishment, P90 quantile sets
                  safety stock achieving 92% service level vs 85% with point
                  forecasts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeepLearningTimeseriesGlobalMultiHorizonForecastingModels;
