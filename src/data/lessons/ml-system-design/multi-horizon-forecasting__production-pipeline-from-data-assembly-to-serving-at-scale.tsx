import type { Component } from "solid-js";

const LessonMultiHorizonForecastingProductionPipelineFromDataAssemblyToServingAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Pipeline: From Data Assembly to Serving at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Assembly Pipeline
            </p>
            <p>
              Multi-horizon models require aligned inputs across time. Build
              feature tables with: historical targets (observed), known future
              features (calendar, promotions), static attributes. Ensure
              temporal alignment—features at time t should only use information
              available at t. Precompute rolling aggregations (7-day average,
              30-day max) and cache in feature store.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Pipeline Structure:</strong> Raw data → temporal alignment
              → feature computation → train/test split (time-based) → model
              training → forecast generation → serving layer. Each stage runs on
              schedule; failures trigger alerts and fallbacks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training at Scale
            </p>
            <p>
              For millions of series, global models (one model for all series)
              are more practical than per-series models. Use static covariates
              to differentiate series. Distributed training (data parallel)
              across GPU cluster. Training completes in hours even for large
              datasets when properly parallelized. Checkpoint frequently to
              enable recovery from failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Batch Forecast Generation
            </p>
            <p>
              Generate forecasts for all series on a schedule (daily, hourly).
              Parallelize inference across series. Store forecasts in
              time-indexed tables: (series_id, forecast_date, horizon, value,
              lower_bound, upper_bound). Serving layer queries by series and
              horizon, returning pre-computed values in milliseconds.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Serving Pattern:</strong> Pre-compute forecasts during
              batch and cache. Real-time requests become lookups. For truly
              real-time needs, deploy model for online inference with latency
              budget of 50-200ms.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Refresh Strategy
            </p>
            <p>
              Forecasts become stale as new observations arrive. Refresh
              frequency depends on horizon granularity: hourly forecasts need
              hourly refresh, daily forecasts need daily refresh. Balance
              freshness against compute cost.
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
                  Global models (one model for all series) scale better than
                  per-series models—use static covariates to differentiate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store forecasts in time-indexed tables: (series_id,
                  forecast_date, horizon, value, bounds) for millisecond lookups
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pre-compute forecasts in batch; real-time becomes simple
                  lookups with optional online inference for fresh data
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
                  Pipeline: raw data → temporal alignment → feature computation
                  → time-based split → training → serving layer
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Refresh frequency matches horizon granularity: hourly
                  forecasts need hourly refresh, daily need daily
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiHorizonForecastingProductionPipelineFromDataAssemblyToServingAtScale;
