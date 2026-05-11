import type { Component } from "solid-js";

const LessonPipelineMonitoringAlertingFailureModesWhenMonitoringBreaksDown: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: When Monitoring Breaks Down
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Silent Data Corruption:
            </div>
            The most insidious failure mode is when all technical metrics are
            green but the data is wrong. Jobs complete successfully, latency is
            within SLO, row counts look normal. But a schema change upstream
            added a new enum value that your parser doesn't handle, causing 8
            percent of events to land in a dead letter queue silently. Or a
            timezone bug shifts timestamps by 8 hours, so yesterday's data
            appears to be today's, passing freshness checks while actually being
            stale. This happens because operational health monitoring (job
            success, duration) is decoupled from semantic correctness. The job
            "succeeded" from an execution standpoint. Detecting silent
            corruption requires business level invariants: "conversion rate must
            be between 0.01 and 0.15" or "sum of regional sales should equal
            total sales within 0.1 percent." These checks catch logic bugs that
            pass unit tests but fail on production data distributions.
            <div style="margin: 12px 0">
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  1
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Schema evolves:</strong> Upstream service adds new
                  event_type enum value 'subscription_renewed'
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  2
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Parser fails:</strong> Your Spark job expects only 5
                  known values, sends unknown events to dead letter queue
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  3
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>All metrics green:</strong> Job succeeds, 2.4M rows
                  processed (normal), latency 18 minutes (within SLO)
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; gap: 12px">
                <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                  4
                </div>
                <div style="flex: 1; padding-top: 4px">
                  <strong>Silent loss:</strong> 200k subscription events missing
                  (8%), causing revenue reports to be off by $450k
                </div>
              </div>
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Partial Failures in Partitioned Data:
            </div>
            In systems processing partitioned data, you can have 95 percent
            success that looks like 100 percent success. A daily job processes
            20 geographic regions. Nineteen succeed, but the Asia Pacific
            partition fails due to a locale specific parsing issue. The
            orchestrator marks the overall job as "success" because most
            partitions completed. Downstream queries on the AP region return
            zero rows, but nobody notices for three days until a regional
            dashboard is checked. The fix requires partition level completeness
            tracking. Don't just emit "job succeeded." Emit "job processed 20/20
            expected partitions" or "19/20 partitions succeeded, AP failed."
            Alert when any expected partition is missing.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Monitoring System Failures:
            </div>
            A subtle failure mode: your metrics pipeline itself breaks. Logs
            stop flowing to your observability backend, or the metrics ingestion
            service is backlogged by 45 minutes. Your dashboards show the last
            successfully ingested data point from an hour ago. If you interpret
            missing recent data as "no new data produced, therefore nothing is
            running," you might miss that both production and monitoring are
            broken.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Implement heartbeat signals.
              Critical jobs must emit a health pulse every N minutes. If no
              heartbeat received in 2N minutes, trigger a "monitoring silence"
              alert. This detects both job failures AND monitoring pipeline
              failures.
            </div>
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Backfill Context Problems:
            </div>
            Backfills break naive monitoring. You're reprocessing two years of
            historical data to populate a new feature. Your daily jobs suddenly
            write 730 partitions instead of one, causing volume to spike 730x.
            Anomaly detection screams. Or you write partitions with old dates,
            and freshness checks expect "latest partition should be yesterday,"
            so they fire constantly. Production systems solve this with backfill
            metadata. When starting a backfill, register it in a metadata store:{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              table_name
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              start_date
            </code>
            ,{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              end_date
            </code>
            . Monitoring systems check this registry and suppress volume and
            freshness anomalies for tables actively under backfill. When the
            backfill completes, monitoring resumes normal validation.
            <div style="font-weight: 700; margin-top: 16px; margin-bottom: 6px">
              Cost as a Failure Mode:
            </div>
            At high scale, monitoring cost can become prohibitive, causing teams
            to reduce instrumentation granularity until blind spots appear. If
            detailed metrics cost $50,000 per month for a data platform, teams
            might sample to 10 percent of jobs or reduce retention from 90 days
            to 7 days. This saves money but means you can't debug incidents that
            happened two weeks ago or investigate patterns across low frequency
            jobs. The solution is tiered monitoring: comprehensive for tier 1
            critical data products, sampled for tier 2 internal analytics,
            minimal for tier 3 experimental pipelines. Explicit cost budgets per
            tier prevent both overspending and dangerous under monitoring.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Silent corruption: all operational metrics green (job
                  succeeded, latency normal, row count expected) but data is
                  semantically wrong due to schema changes, timezone bugs, or
                  logic errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partial partition failures: 19 of 20 regions process
                  successfully, orchestrator reports success, but Asia Pacific
                  region has zero rows for three days before anyone notices
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Monitoring pipeline failures create blind spots: metrics
                  ingestion backlogged 45 minutes, dashboards show stale data,
                  both production and monitoring are broken but appear quiet
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Backfill context required: reprocessing 730 days of history
                  triggers 730x volume spike. Without backfill metadata
                  registry, anomaly detection fires constantly and creates alert
                  fatigue
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
                  Business invariant check: conversion_rate = purchases /
                  visits. Must be between 0.01 and 0.15. Value of 0.003
                  indicates undercounting purchases even if row counts look
                  normal.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Partition completeness: daily_orders partitioned by region.
                  Expected 20 regions. Alert 'Only 19/20 partitions present,
                  missing: AP' instead of generic 'job succeeded'.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heartbeat monitoring: streaming_processor should emit health
                  metric every 120 seconds. If no metric in 300 seconds, alert
                  'Heartbeat missing for streaming_processor, possible
                  monitoring outage or job failure'.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonPipelineMonitoringAlertingFailureModesWhenMonitoringBreaksDown;
