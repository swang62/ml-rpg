import type { Component } from "solid-js";

const LessonAnomalyDetectionDataProductionScaleDetectionArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Scale Detection Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The System Landscape:</strong> At large scale companies,
            data flows from user facing services generating 100,000 events per
            second at peak, through streaming and batch pipelines, into data
            lakes storing terabytes daily. Downstream, hundreds of dashboards
            and dozens of machine learning models depend on this data with
            strict Service Level Agreements (SLAs): 15 minute latency for
            operational analytics, 1 hour for core ML features. Anomaly
            detection sits as an observability layer across this entire flow.
            <strong>Three Layer Architecture:</strong> Production systems
            typically implement detection in three stages. First, a metrics
            collection layer runs lightweight profiling jobs that compute row
            counts, null ratios, distinct counts, and distribution statistics.
            These profilers execute immediately after each pipeline step, adding
            30 to 90 seconds of overhead. Second, a feature store maintains
            historical metrics as time series, storing 90 to 365 days of data.
            Third, detection algorithms (rules, statistical models, or ML
            services) consume these time series and emit anomaly decisions.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Ingest Layer:</strong> Monitor event rates per topic,
                  schema versions, parsing errors. Catch upstream bugs within
                  minutes using streaming detection at p95 latency under 2
                  minutes.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Transformation Layer:</strong> Profile intermediate
                  tables for row counts, join drop rates, distribution shifts.
                  Detect when a join unexpectedly drops 30% of keys due to logic
                  bugs.
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Warehouse Layer:</strong> Monitor business aggregates
                  like daily revenue, order conversion rate, active devices.
                  Alert on metric shifts that indicate real business problems.
                </div>
              </div>
            </div>
            <strong>Real World Example:</strong> An e-commerce company runs
            hourly batch jobs aggregating orders per store into a fact table,
            typically writing 5 to 6 million rows per hour. Immediately after
            each batch completes, a profiling job computes row count, distinct
            store count, average order value, and 95th percentile order value,
            completing in under 60 seconds. Using 30 days of history, the
            detector predicts row count should be between 4.8 and 6.2 million.
            When a deployment bug excludes one country and row count drops to
            3.5 million, detection fires within 5 minutes and automatically
            halts dependent jobs, preventing corrupt aggregates from reaching
            dashboards and ML models.
            <strong>Streaming vs Batch Trade-off:</strong> Salesforce moved from
            batch based checks (finding problems in days) to streaming detection
            (alerts in minutes) by building detectors on top of their log
            pipeline. They process metrics with p99 latency below 2 minutes,
            enabling SRE style response times. However, streaming requires
            stateful processing, careful backpressure management, and 3x to 5x
            more infrastructure cost compared to batch detection that runs once
            per hour.
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">ETL Job Completes</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    5.8M rows written
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Profiler Job</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Compute metrics (60s)
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Metric Store</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    30 days history
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Detector</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Expected: 4.8M to 6.2M
                  </div>
                  <div style="font-size: 11px; margin-top: 2px; font-weight: 600">
                    Result: ✓ Normal
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
                  Three layer architecture separates concerns: metrics
                  collection (30 to 90s overhead per job), historical storage
                  (90 to 365 days), and detection algorithms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Detection spans ingest (event rates, schemas), transformation
                  (row counts, join quality), and warehouse (business metrics),
                  each with different latency requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming detection enables under 2 minute alerts at 100k
                  events/sec but costs 3x to 5x more than batch detection that
                  runs once per hour
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems add 30 to 90 seconds of profiling overhead
                  per batch, writing metrics to time series stores for model
                  training and anomaly comparison
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
                  E-commerce hourly jobs write 5 to 6M rows per store
                  aggregation. Profiler computes metrics in under 60 seconds.
                  Detector compares against 30 day baseline (4.8M to 6.2M
                  expected range). When bug drops count to 3.5M, alert fires
                  within 5 minutes total.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Salesforce streams metrics from log pipeline with p99 latency
                  under 2 minutes, enabling operational response. They batch
                  requests to ML model service and use horizontal scaling behind
                  load balancers to handle metric volume.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IoT system splits work: Raspberry Pi devices run simple range
                  checks locally with millisecond response, forward summarized
                  metrics to cloud for heavy models analyzing trends over
                  hundreds of devices.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAnomalyDetectionDataProductionScaleDetectionArchitecture;
