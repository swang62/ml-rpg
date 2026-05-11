import type { Component } from "solid-js";

const LessonForecastingAtScaleProductionPipelineFromDataIngestionToOnlineServingAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Pipeline: From Data Ingestion to Online Serving at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            A production hierarchical forecasting system operates as a batch
            pipeline that runs daily or hourly. The pipeline has four stages:
            data ingestion and compaction, base forecasting, reconciliation, and
            online serving. Each stage has distinct scale and latency
            requirements. Data ingestion handles streaming sales or event data
            at 50,000 to 200,000 records per second. Raw events land in a write
            optimized store such as Apache Kafka or Amazon Kinesis. A daily
            snapshot task compacts the previous 90 days of data into pre
            aggregated panels at all hierarchy levels, reducing read
            Input/Output (I/O) during training. For 10 million SKU store
            combinations with 90 days of daily data, the compacted dataset
            contains roughly 900 million rows. Storing this in columnar format
            like Apache Parquet with compression yields roughly 50 to 100
            Gigabytes (GB), which fits on a single node and can be scanned in
            under 2 minutes on modern Solid State Drives (SSDs). Base
            forecasting runs on this compacted data. A global gradient boosted
            tree or neural model trains once across all series. Training a
            LightGBM model on 900 million rows with 50 features takes 2 to 4
            hours on a 64 core machine with 256 GB memory. After training,
            inference generates a 28 day forecast for 10 million leaves,
            producing 280 million prediction rows. At 10 microseconds per row, a
            64 vCPU node scores 6.4 million rows per second, completing the 280
            million rows in roughly 45 seconds. Fanning out across 10 nodes
            reduces this to under 10 minutes including coordination overhead.
            Reconciliation takes the base forecasts and enforces aggregation
            constraints. For diagonal covariance and subtree parallelism,
            reconciling 10 million nodes factors into 5,000 independent store
            level problems, each with roughly 2,000 nodes. On a 100 core
            cluster, each core handles 50 stores. Each store reconciliation
            solves in under 1 second, so total reconciliation completes in under
            2 minutes. Including matrix assembly and result serialization, end
            to end reconciliation stays within 5 to 10 minutes. Companies that
            run optimal covariance estimation weekly budget a few hours for that
            step, but daily operational forecasts use cached or diagonal
            covariance and finish in minutes. Online serving writes reconciled
            forecasts to a low latency cache such as Redis or DynamoDB.
            Downstream services such as pricing, inventory allocation, or
            capacity planning read forecasts with p99 latencies under 50
            milliseconds. Forecasts are keyed by series ID and horizon, with a
            typical read fetching a 28 day vector in a single lookup. For real
            time adjustments, incremental update systems run lightweight state
            space filters at the leaf level. A Kalman update for one series
            takes under 1 millisecond, so a single core can update tens of
            thousands of series per second. Incremental deltas propagate to
            ancestors using a fast proportional rule until the next batch
            recomputation. Monitoring tracks level weighted error across
            hierarchy levels, coherence gap between unreconciled sums and
            reconciled totals, and reconciliation runtime. Alerts fire on
            hierarchy changes, sudden shifts in allocation proportions, and
            covariance instability. Fallback policies switch a branch to top
            down allocation if standard deviation at leaves exceeds a threshold,
            preventing noise from destabilizing the entire hierarchy. Netflix
            and Meta capacity teams report running rolling forecasts across
            thousands of resource pools and regions with daily batch Service
            Level Agreements (SLAs) under one hour and online what if
            computation completing in a few seconds.<p></p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  Production Forecast Pipeline (Daily Batch)
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">1. Data Ingestion</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    50K–200K events/sec → Kafka → Daily snapshot (900M rows,
                    50–100GB Parquet)
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Time: 2 min scan
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">2. Base Forecasting</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Train global LightGBM (64 cores, 2–4 hrs) → Inference: 280M
                    rows on 10 nodes
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Time: &lt;10 min
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">3. Reconciliation</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    5,000 store subtrees, 100 cores → 50 stores per core, &lt;1
                    sec each
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Time: 5–10 min
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">4. Online Serving</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Write to Redis/DynamoDB → p99 read latency &lt;50ms,
                    incremental updates &lt;1ms/series
                  </div>
                  <div style="font-size: 12px; margin-top: 2px">
                    Total SLA: &lt;1 hour
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
                  Data ingestion streams 50,000 to 200,000 events per second,
                  daily snapshot compacts 90 days into 900 million rows and 50
                  to 100 GB Parquet files, scanned in under 2 minutes on SSDs
                  for training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Base forecasting trains global LightGBM on 900 million rows in
                  2 to 4 hours (64 cores, 256 GB memory), inference generates
                  280 million predictions in under 10 minutes on 10 node cluster
                  at 10 microseconds per row
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reconciliation with diagonal covariance and subtree
                  parallelism solves 5,000 independent store problems (2,000
                  nodes each) on 100 cores, each store under 1 second, total
                  reconciliation 5 to 10 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Online serving writes to Redis or DynamoDB with p99 read
                  latency under 50 milliseconds, incremental Kalman updates take
                  under 1 millisecond per series enabling real time adjustments
                  at tens of thousands of series per second per core
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring tracks level weighted error, coherence gap, and
                  runtime, with fallback policies switching to top down
                  allocation when leaf standard deviation exceeds threshold to
                  prevent noise destabilization
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
                  Amazon scale: 900 million row daily snapshot, 2 hour LightGBM
                  training, 10 minute inference across 10 nodes, 5 minute
                  reconciliation, total daily batch completes in under 3 hours
                  well within operational SLA
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix capacity planning: Daily rolling forecasts across
                  thousands of resource pools, batch SLA under one hour, online
                  what if scenario computation completes in a few seconds for
                  real time capacity decisions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand: Hourly batch pipeline, 30 minute data compaction,
                  15 minute inference, 5 minute reconciliation per city in
                  parallel, forecasts available for real time dispatch within
                  one hour of event stream
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonForecastingAtScaleProductionPipelineFromDataIngestionToOnlineServingAtScale;
