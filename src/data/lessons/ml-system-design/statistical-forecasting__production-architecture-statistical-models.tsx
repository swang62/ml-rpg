import type { Component } from "solid-js";

const LessonStatisticalForecastingProductionArchitectureStatisticalModels: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture for Statistical Models
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Key Point
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                Statistical models are <strong>embarrassingly parallel</strong>
                —each series fits independently. Millions of series can be
                forecast by distributing work across machines.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              BATCH TRAINING PIPELINE
            </p>
            <p style="margin-top: 0">
              Flow: ingest data daily → fit one model per series → store
              parameters and forecasts. Fitting one model: 10-100ms. For 1M
              series on 100 workers: ~20 minutes total. Bottleneck is data I/O,
              not model fitting.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL STORAGE
            </p>
            <p style="margin-top: 0">
              Store parameters, not raw data. ETS needs ~50 bytes/series. For
              10M series, storage is ~500MB. Pre-compute forecasts for next N
              periods; store in key-value store for sub-millisecond serving.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Insight:</strong> Pre-computed forecasts turn
              prediction into a lookup. At serving time, just fetch from
              cache—no inference needed. Latency: &lt;1ms.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FRESHNESS VS COST
            </p>
            <p style="margin-top: 0">
              Pre-computed forecasts get stale as new data arrives. Daily
              retraining is typical. Hourly costs 24x more. Some retrain only
              when drift detected (accuracy drops below threshold).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUTO MODEL SELECTION
            </p>
            <p style="margin-top: 0">
              Not all series need the same model. Per-series selection: fit ETS,
              ARIMA, baseline. Pick winner by cross-validation error.
              Unpredictable series fall back to baseline when complex models do
              not help.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Trade-off:</strong> Auto-selection adds 3x compute but
              improves accuracy 5-15% on average. Worth it for high-value
              forecasts; skip for low-stakes.
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
                  Statistical models are embarrassingly parallel—each series
                  fits independently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fitting takes 10-100ms per series; 1M series on 100 workers =
                  15-30 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Store parameters (~50 bytes/series), not raw data; pre-compute
                  forecasts for &lt;1ms serving
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Daily retraining balances freshness and cost; hourly costs 24x
                  more
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Auto-selection (ETS vs ARIMA vs baseline) improves accuracy
                  5-15%
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
                  Explain that pre-computed forecasts turn inference into a
                  cache lookup
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss freshness vs cost tradeoff: daily retraining is
                  typical, hourly is expensive
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonStatisticalForecastingProductionArchitectureStatisticalModels;
