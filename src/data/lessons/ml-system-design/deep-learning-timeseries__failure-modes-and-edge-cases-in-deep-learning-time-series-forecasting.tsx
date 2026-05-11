import type { Component } from "solid-js";

const LessonDeepLearningTimeseriesFailureModesAndEdgeCasesInDeepLearningTimeSeriesForecasting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Deep Learning Time Series
            Forecasting
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Production time series forecasting systems face several critical
            failure modes that can silently degrade performance or cause
            catastrophic errors. Understanding these edge cases is essential for
            building robust systems that handle real world messiness. Regime
            shifts and concept drift are the most dangerous. A promotion, supply
            shock, policy change, or external event like a pandemic can
            invalidate learned dynamics overnight. Models trained on pre shift
            data will produce optimistic intervals that miss by multiples. For
            example, a retail demand model trained through 2019 might predict
            intervals that are 3x too narrow during 2020 supply disruptions,
            leading to severe stockouts. Drift detectors must watch both error
            distributions and covariate distributions. If recent 7 day Weighted
            Absolute Percentage Error (WAPE) exceeds training WAPE by more than
            50%, or Population Stability Index (PSI) on input features crosses
            0.15, trigger immediate retraining or failover to adaptive baselines
            like exponential smoothing that react faster. Intermittent and
            sparse demand breaks standard losses. Many Store Keeping Units
            (SKUs) have long zero runs punctuated by occasional spikes. Training
            with Mean Squared Error (MSE) on these series causes models to
            predict a constant near zero mean, which gives low training loss but
            terrible service levels. The solution is intermittent aware losses
            like Tweedie or zero inflated distributions, hierarchical
            aggregation to smooth sparsity, and global models with item
            embeddings that borrow strength. Critically, do not evaluate with
            Mean Absolute Percentage Error (MAPE), which explodes when actuals
            are zero. Instead use forecast bias (mean error) and service level
            metrics like fill rate at P90. Attention scaling limits hit hard at
            length beyond 512. For context 1024 with batch 32 and 8 heads, a
            single Transformer attention layer requires roughly 1 gigabyte for
            attention weight storage. Without sparsity or local attention,
            serving on Central Processing Unit (CPU) becomes infeasible. Even
            with Graphics Processing Units (GPUs), Out Of Memory (OOM) errors
            during training are common. The fix is to cap practical context at
            192 to 336, use block or local attention, and downsample distant
            history using moving averages, keeping only recent steps at full
            resolution. Exposure bias occurs when training with teacher forcing
            (feeding ground truth at each step) but serving autoregressively
            (feeding predictions). The model never sees its own errors during
            training, so mistakes compound during multi-step generation. This
            manifests as MAPE doubling from horizon 1 to horizon 24. Use
            scheduled sampling during training to gradually mix in model
            predictions, or prefer direct multi-horizon outputs that avoid
            autoregressive cascading entirely. Data leakage is insidious. Using
            future information that would not be available at prediction time
            yields optimistic backtests that collapse in production. Calendar
            features like day of week are safe, but promotional schedules,
            weather forecasts, or future covariate values must be restricted to
            what is truly known ahead. Always validate by simulating the exact
            information set available at decision time. A common leak is using
            normalized series statistics computed on the full dataset including
            future, rather than only on history up to the forecast origin.
            <p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Exposure Bias: Training vs Serving Mismatch
              </div>
              <div style="display: flex; gap: 16px; justify-content: space-around">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 8px; text-align: center; font-size: 13px">
                    Training (Teacher Forcing)
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    <div style="margin-bottom: 4px">
                      Step 1: Use y(t) actual → predict y(t+1)
                    </div>
                    <div style="margin-bottom: 4px">
                      Step 2: Use y(t+1) actual → predict y(t+2)
                    </div>
                    <div style="margin-bottom: 4px">
                      Step 3: Use y(t+2) actual → predict y(t+3)
                    </div>
                    <div style="margin-top: 8px; font-weight: 700">
                      Never sees own errors
                    </div>
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; margin-bottom: 8px; text-align: center; font-size: 13px">
                    Serving (Autoregressive)
                  </div>
                  <div style="font-size: 11px; line-height: 1.6">
                    <div style="margin-bottom: 4px">
                      Step 1: Use y(t) actual → predict y(t+1)
                    </div>
                    <div style="margin-bottom: 4px">
                      Step 2: Use y(t+1) <strong>predicted</strong> → predict
                      y(t+2)
                    </div>
                    <div style="margin-bottom: 4px">
                      Step 3: Use y(t+2) <strong>predicted</strong> → predict
                      y(t+3)
                    </div>
                    <div style="margin-top: 8px; font-weight: 700">
                      Errors compound
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 10px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 12px; text-align: center">
                <strong>Result:</strong> MAPE doubles from H+1 (3%) to H+24 (6%)
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
                  Regime shifts from promotions, supply shocks, or external
                  events invalidate learned patterns overnight; model intervals
                  can miss by 3x, requiring drift detection with Population
                  Stability Index (PSI) thresholds at 0.15 and auto failover to
                  adaptive baselines
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intermittent demand with long zero runs breaks Mean Squared
                  Error (MSE) training; use Tweedie loss, hierarchical
                  aggregation, and avoid Mean Absolute Percentage Error (MAPE)
                  evaluation (explodes on zeros), instead track forecast bias
                  and service level fill rate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Attention memory scaling hits Out Of Memory (OOM) at length
                  1024: single layer needs 1 GB for batch 32 and 8 heads, making
                  CPU serving infeasible; cap context at 192 to 336 with local
                  attention and downsample distant history
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exposure bias from teacher forcing training vs autoregressive
                  serving causes error compounding: MAPE can double from horizon
                  1 to horizon 24; use scheduled sampling or direct
                  multi-horizon outputs to avoid cascading mistakes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data leakage from future information (promotional calendars,
                  weather forecasts known only later) yields optimistic
                  backtests that fail in production; always validate with exact
                  information set available at decision time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Retraining instability: Transformers show higher seed variance
                  on small datasets (MAPE swinging 2.4% to 3%+), impacting
                  Service Level Agreements (SLAs); fix seeds, increase batch
                  size, or fall back to stable LSTMs
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
                  Retail stockout from regime shift: COVID demand surge in March
                  2020 caused models trained on 2019 data to under predict by
                  200 to 400%, triggering emergency retraining with recent 30
                  day windows and safety stock overrides at 2x P90
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intermittent SKU failure: Long tail item with 90% zero demand
                  trained with MSE predicts constant 0.5 units, achieving low
                  loss but 60% service level; switching to Tweedie loss and
                  global model with category embedding improves to 85% service
                  level
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transformer OOM in production: Increasing context from 336 to
                  768 to capture longer seasonality caused 4 GB memory spike per
                  batch, triggering OOM during peak load; fixed by capping at
                  384 and using dilated convolutions for distant history
                  downsampling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeepLearningTimeseriesFailureModesAndEdgeCasesInDeepLearningTimeSeriesForecasting;
