import type { Component } from "solid-js";

const LessonDataProfilingProductionIntegrationAndWorkflow: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Production Integration and Workflow
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Where Profiling Fits:</strong>
          Data profiling is not a side tool you run occasionally. It sits in the
          critical path of production data pipelines, integrated at multiple
          stages from raw ingestion through to analytics and Machine Learning
          (ML) serving.
          <strong>Real Time Monitoring During Ingestion:</strong>
          As events stream into a log store or land in a data lake, inline
          profiling samples 0.1 to 1 percent of records. This lightweight check
          validates schema conformance, tracks null rates in critical fields
          like{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            user_id
          </code>{" "}
          or{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            transaction_amount
          </code>
          , and monitors distinct counts per time window. If a field that should
          be 99.9 percent non null suddenly drops to 80 percent, the system
          alerts within 5 to 10 minutes, not hours later when daily reports
          fail. For a system processing 10 billion events daily with p50 end to
          end latency of 5 to 10 minutes and p99 under 30 minutes, catching
          schema breaks early prevents cascading failures in downstream jobs.
          <strong>Batch Profiling in the Warehouse:</strong>
          Once data lands in a partitioned warehouse table, heavier daily
          profiling runs. This computes comprehensive statistics: row counts,
          distinct counts (approximate), top N values, histograms, min and max,
          quantiles, null percentages, and referential integrity checks across
          tables. For a company maintaining a 100 TB warehouse with 5 TB of new
          data daily, profiling new partitions completes in 10 to 20 minutes
          using 100 to 200 distributed workers.
          <strong>Quality Gates and Automation:</strong>
          Profiling results feed directly into orchestration logic. Pipelines
          can implement quality gates that block or mark downstream Extract
          Transform Load (ETL) jobs when statistics fall outside bounds. For
          example, if{" "}
          <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
            orders_per_day
          </code>{" "}
          drops more than 20 percent from a 7 day moving average, the pipeline
          pauses and alerts on call engineers before corrupting dashboards or
          triggering incorrect ML retraining.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Adding profiling without capacity
            planning can saturate compute clusters. Heavyweight profiling of a
            50 TB partition during peak hours can slow ETL jobs by increasing
            read Input/Output Operations Per Second (IOPS), pushing end to end
            latency beyond Service Level Objectives (SLOs).
          </div>
          <strong>Query Optimization and ML Drift Detection:</strong>
          At companies like Netflix and Meta, profiling statistics directly
          improve system performance. Query optimizers read table and column
          cardinality to choose efficient join orders, potentially changing
          query latency from minutes to seconds. In ML feature stores, profiling
          compares training and serving distributions: if Kullback Leibler (KL)
          divergence exceeds a threshold, it indicates data drift that could
          degrade model accuracy.
          <strong>Metadata Catalog and Observability:</strong>
          All profiling results live in a metadata catalog, queryable by data
          consumers deciding whether a table is stable enough for a new
          dashboard or feature. Metrics export to monitoring dashboards,
          creating time series for completeness, validity, and consistency that
          teams track just like application latency or error rates.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
            <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
              <div style="display: flex; gap: 10px; align-items: center; width: 100%">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                  <strong>Raw Events</strong>
                  <div style="font-size: 11px">10B/day</div>
                </div>
                <div style="font-size: 20px; font-weight: bold">→</div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                  <strong>Light Profile</strong>
                  <div style="font-size: 11px">0.1% sample</div>
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 80%; text-align: center; font-size: 13px">
                <strong>Warehouse Partition</strong>
                <div style="font-size: 11px">5 TB daily</div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; width: 80%; text-align: center; font-size: 13px">
                <strong>Heavy Profile</strong>
                <div style="font-size: 11px">Full stats, 10-20 min</div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 10px; width: 100%">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                  <strong>Quality Gates</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                  <strong>Metadata Catalog</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Profiling integrates at multiple stages: lightweight sampling
                during ingestion for 5 to 10 minute alerts, comprehensive batch
                profiling on warehouse partitions in 10 to 20 minutes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Quality gates block downstream ETL jobs when statistics violate
                bounds, preventing cascade failures before they corrupt
                dashboards or ML models
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Query optimizers use cardinality and distribution statistics to
                choose join orders, changing query latency from minutes to
                seconds
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Capacity planning is critical: profiling 50 TB during peak hours
                can saturate clusters and push ETL latency beyond SLOs without
                proper isolation
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
                A null rate spike from 0.1% to 80% in
                &lt;code&gt;user_id&lt;/code&gt; field triggers alert within 10
                minutes during ingestion, caught by sampling 0.1% of 10 billion
                daily events
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                ML feature store detects training vs serving drift when KL
                divergence of &lt;code&gt;click_rate&lt;/code&gt; distribution
                exceeds 0.05 threshold, preventing model degradation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDataProfilingProductionIntegrationAndWorkflow;
