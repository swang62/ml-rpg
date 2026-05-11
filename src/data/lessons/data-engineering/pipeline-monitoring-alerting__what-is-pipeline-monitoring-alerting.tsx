import type { Component } from "solid-js";

const LessonPipelineMonitoringAlertingWhatIsPipelineMonitoringAlerting: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Pipeline Monitoring &amp; Alerting?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Definition
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Pipeline Monitoring &amp; Alerting</strong> is the
                practice of continuously observing data pipelines to detect
                failures, performance degradation, and data quality issues, then
                automatically notifying teams when thresholds or Service Level
                Objectives (SLOs) are violated.
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              The Core Problem:
            </div>
            Data pipeline failures are often silent. Your web application still
            loads, users can browse products, and dashboards render without
            errors. But recommendations might be showing yesterday's data, A/B
            test results could be calculated on incomplete datasets, and finance
            reports might be off by 15 percent. Unlike API outages that trigger
            immediate user complaints, broken data pipelines can go undetected
            for hours or days.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              What You Actually Monitor:
            </div>
            Monitoring covers two distinct dimensions. First is{" "}
            <strong>pipeline health</strong>: job success rates, run duration,
            resource consumption (CPU, memory), throughput in rows per second,
            and end to end latency. For example, a daily batch job might have an
            SLO requiring completion by 06:00 UTC with 99.9 percent success
            rate. Second is <strong>data quality and freshness</strong>: row
            counts compared to historical baselines, null rates in critical
            columns, schema changes, business constraint violations like
            negative prices, and how far behind real time your data is. A
            streaming events table might require freshness within 5 minutes for
            99 percent of the day.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Why Alerting Matters:
            </div>
            Monitoring without alerting is just dashboards that nobody watches
            at 3 AM. Alerting translates threshold violations into actionable
            notifications. When your hourly user activity pipeline misses its 30
            minute SLA, an alert fires to the on call engineer with context:
            which job failed, what the error was, and a link to the runbook.
            This minimizes Mean Time To Detect (MTTD) from hours to minutes.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pipeline failures are silent: UI works fine while data is
                  stale, incomplete, or incorrect
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitor two dimensions: operational health (job status,
                  latency, throughput) and data quality (row counts, freshness,
                  schema, business rules)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Alerting converts metrics into action: routes notifications to
                  on call teams when SLOs are violated, reducing detection time
                  from hours to minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SLOs define concrete targets: daily batch completion by
                  specific UTC time, streaming lag under 5 minutes, failure rate
                  below 0.1 percent per week
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
                  Streaming SLO: Events table must be less than 5 minutes behind
                  real time for 99% of the day
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch SLO: Daily orders pipeline completes by 06:00 UTC with
                  p95 latency under 30 minutes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data quality check: Row count for daily_users table should not
                  drop more than 20% compared to 7 day average
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineMonitoringAlertingWhatIsPipelineMonitoringAlerting;
