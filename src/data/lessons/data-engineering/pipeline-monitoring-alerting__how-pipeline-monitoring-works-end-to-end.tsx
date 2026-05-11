import type { Component } from "solid-js";

const LessonPipelineMonitoringAlertingHowPipelineMonitoringWorksEndToEnd: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            How Pipeline Monitoring Works End to End
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Complete Flow:
            </div>
            Pipeline monitoring operates in layers, starting from raw event
            ingestion through to final serving tables. Imagine a typical large
            scale data platform: mobile and web clients send 500,000 events per
            second to an API gateway, which publishes to Kafka. A streaming
            layer (Flink or Spark Structured Streaming) processes these events,
            enriches them with user profile data, and writes to a real time
            store. Simultaneously, batch orchestration (Airflow, Argo) runs
            3,000 daily jobs that read raw events, join with OLTP database
            snapshots, and produce dimensional models in a warehouse.
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Ingestion Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Kafka lag, drop rate
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Streaming Layer</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Processing latency, throughput
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Batch Orchestration</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Job status, duration, row counts
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                  <strong style="font-size: 14px">Data Quality Checks</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Volume anomalies, freshness
                  </div>
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Instrumentation at Each Layer:
            </div>
            At the ingestion edge, monitor Kafka consumer lag in both time and
            message count. Netflix monitors when lag exceeds 5 minutes or 1
            million messages per partition. For streaming, track the gap between
            event time (when the event occurred) and processing time (when it
            was processed). A typical SLO: p99 end to end latency under 60
            seconds at 200,000 events per second. Batch orchestrators emit
            standardized metrics per DAG run:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              pipeline_status
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              duration_seconds
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              input_row_count
            </code>
            , and{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              output_row_count
            </code>
            . These flow into a time series database like Prometheus or Datadog.
            Within individual Spark jobs, instrument key stages: input rows
            read, output rows written, records dropped due to validation
            failures, and errors sent to dead letter queues.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Data Quality Layer:
            </div>
            Modern observability systems add continuous data profiling on top of
            operational metrics. They compute statistical profiles for thousands
            of tables: row count trends, distribution of numeric columns, null
            fractions, and schema evolution. When daily orders volume drops 40
            percent compared to a 14 day baseline, an anomaly alert triggers.
            Companies like Uber and Meta have internal systems that profile
            critical tables every 15 to 60 minutes and route alerts to the
            owning team's Slack channel.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Typical Streaming SLO
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">60s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P99 LATENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">200k/s</div>
                  <div style="font-size: 10px; font-weight: 600">
                    THROUGHPUT
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
                  Ingestion monitoring: Kafka consumer lag tracked in seconds
                  and message count, with alerts when lag exceeds 5 minutes or 1
                  million messages
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming SLO example: p99 end to end latency under 60 seconds
                  while processing 200,000 events per second
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch orchestration emits standard metrics: pipeline status,
                  duration, input/output row counts, and error counts at each
                  stage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data quality profiling: continuous monitoring of row count
                  trends, null fractions, and schema changes across thousands of
                  tables with 15 to 60 minute intervals
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
                  Within a Spark job: log input_rows=10M, output_rows=9.8M,
                  dropped_rows=200k (validation failures), errors_to_dlq=50
                  (parse failures)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming latency calculation: event occurs at T=0, reaches
                  Kafka at T+2s, processed by Flink at T+8s, written to serving
                  table at T+12s. End to end latency: 12 seconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anomaly detection: daily_orders table averages 2.5M rows over
                  14 days. Today it has 1.5M rows (40% drop). Alert fires to
                  owning team's Slack channel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineMonitoringAlertingHowPipelineMonitoringWorksEndToEnd;
