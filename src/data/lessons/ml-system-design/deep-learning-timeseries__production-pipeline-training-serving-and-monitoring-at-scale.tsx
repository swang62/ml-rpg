import type { Component } from "solid-js";

const LessonDeepLearningTimeseriesProductionPipelineTrainingServingAndMonitoringAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Pipeline: Training, Serving, and Monitoring at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            A production forecasting system has five critical components working
            in concert: data ingestion and feature generation, model training,
            validation and backtesting, serving, and decision integration. Each
            stage has specific scale requirements and failure modes that must be
            engineered carefully. Data ingestion collects measurements from
            upstream services at 1 to 15 minute cadence. For retail, this means
            millions of point of sale transactions flowing into a feature store
            that materializes rolling windows of lags, moving averages, and
            calendar features. At scale, this is hundreds of billions of data
            points representing 2 to 3 years of history. Computation is
            incremental and windowed: you update recent windows rather than
            recomputing everything, keeping costs bounded. Missing data and
            timestamp alignment issues are common: daylight saving jumps,
            irregular sensor cadences, and late arriving measurements break
            sequence consistency and must be handled with padding, masking, and
            canonical timeline alignment. Training happens nightly or every few
            hours using the global model approach. A 2 layer LSTM with 128
            hidden units processing context length 168 hours trains at about
            20,000 sequences per second on a single A100 GPU with mixed
            precision. For a dataset of 5 million series, training completes in
            roughly 4 to 6 hours including validation. Transformers train faster
            due to parallelism but require more memory management: bucketing
            sequences by length reduces padding waste and stabilizes training
            time variance. Gradient clipping, warmup schedules, and monitoring
            variance across seeds are essential. If Transformer Mean Absolute
            Percentage Error (MAPE) swings by more than 0.5 percentage points
            across runs, you may need to increase batch size, fix random seeds,
            or fall back to more stable LSTM architectures. Validation uses
            rolling origin backtests that mimic production. You simulate
            forecasting at multiple points in history, computing Weighted
            Absolute Percentage Error (WAPE), symmetric MAPE, pinball loss at
            P10/P50/P90 quantiles, and prediction interval coverage by horizon
            and cohort. Grid load forecasting operators target p95 absolute
            error under 2 to 3% for 1 to 2 hour horizons. Retailers look for
            aggregate WAPE under 15% at weekly horizon with head items under 5%.
            Drift monitors compare recent error distributions to training period
            using windowed Population Stability Index (PSI) or Kolmogorov
            Smirnov (KS) tests. Retraining triggers fire when error crosses
            thresholds or drift exceeds 0.15 PSI. Serving has two modes. Batch
            generation creates future trajectories for all entities nightly: 20
            million forecasts at 8 horizons each running on a distributed
            Central Processing Unit (CPU) pool at 50,000 forecasts per second
            for compact LSTMs, finishing in 7 minutes with 300 virtual CPUs.
            Online scoring handles requests where covariates change rapidly,
            like surge pricing. Latency Service Level Objectives (SLOs) are
            typically p99 under 50ms. Micro-batching groups 8 to 16 requests to
            amortize overhead without missing SLOs. Compact Transformers with
            length 192 and 4 heads can hit p99 under 20ms on CPU with careful
            optimization. The final stage is decision integration. Forecasts
            feed inventory replenishment, capacity planning, and dynamic pricing
            systems. Prediction intervals enable risk management: use P90 as
            planning quantity for 90% service level targets. Canary deployments
            score a subset of entities with the new model, comparing online
            error to offline backtests. If online error exceeds offline by more
            than 20%, or coverage drops below 80%, automatic fallback to
            baseline seasonal naive models prevents downstream impact.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="text-align: center; margin-bottom: 12px; font-weight: 700; font-size: 14px">
                Production Forecasting Pipeline
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">1. Data Ingestion</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Feature Store: Rolling windows, 1-15 min cadence
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    Millions of series × 2-3 years history
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">2. Training</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Nightly: 20k seq/sec on A100, 4-6 hours
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    Global model with embeddings, quantile loss
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    3. Validation &amp; Monitoring
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Rolling backtests: WAPE, coverage, drift (PSI)
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    Target: WAPE &lt;15%, coverage 80-90%
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">4. Serving</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Batch: 50k forecasts/sec on 300 vCPU
                  </div>
                  <div style="font-size: 12px">
                    Online: p99 &lt;50ms with micro-batching
                  </div>
                </div>
                <div style="text-align: center; font-size: 18px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    5. Decision Integration
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Inventory, capacity, pricing systems
                  </div>
                  <div style="font-size: 11px; margin-top: 2px">
                    Canary deploy, auto-fallback on drift
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
                  Data pipeline handles hundreds of billions of observations
                  with incremental windowed computation and masked padding for
                  missing data, aligning irregular timestamps to canonical
                  timeline to prevent sequence breaks
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training at scale: 5 million series train in 4 to 6 hours on
                  single A100 GPU at 20k sequences/sec for LSTM, with gradient
                  clipping and seed variance monitoring to ensure stable
                  convergence within 0.5 percentage point MAPE variance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Rolling origin backtests simulate production by forecasting at
                  multiple historical cutoffs, tracking Weighted Absolute
                  Percentage Error (WAPE), pinball loss, and coverage by cohort,
                  with drift detection using Population Stability Index (PSI)
                  under 0.15 triggering retraining
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Serving modes split by latency needs: batch generation at 50k
                  forecasts/sec on 300 vCPU pool completes 20M forecasts in 7
                  minutes; online scoring micro-batches 8 to 16 requests hitting
                  p99 under 50ms on CPU
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary deployments score subsets with new model, comparing
                  online error to offline; automatic fallback to seasonal naive
                  baseline if online error exceeds offline by 20% or coverage
                  drops below 80%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cost example: batch generation on CPU at $0.05 per vCPU hour
                  costs roughly $1.50 per daily run for 300 vCPU × 10 minutes,
                  while online scoring at 2000 QPS needs 2x to 3x average CPU
                  capacity for spike handling
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
                  Amazon retail pipeline: Nightly training on 20M SKU-store
                  pairs (4 hours on A100), batch generates 48 hour forecasts for
                  all entities in 7 minutes on 300 vCPU, feeds replenishment
                  with P90 quantiles for safety stock, monitors WAPE by category
                  with auto fallback
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand forecasting: Hourly retraining on 5000 zone series
                  (30 minutes on GPU), online scoring at 2000 QPS with p99 under
                  50ms using LSTM micro-batching of 8 requests, canary deploys
                  to 5% of zones with rollback if error degrades by 15%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Grid load forecasting: 15 minute retraining on 500 substation
                  series (10 minutes on CPU), validates p95 absolute error under
                  3% for 2 hour horizon, serves 100 QPS with p99 under 20ms,
                  alerts when Kolmogorov Smirnov (KS) drift exceeds 0.2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDeepLearningTimeseriesProductionPipelineTrainingServingAndMonitoringAtScale;
