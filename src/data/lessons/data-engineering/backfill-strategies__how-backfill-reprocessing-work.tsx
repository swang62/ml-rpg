import type { Component } from "solid-js";

const LessonBackfillStrategiesHowBackfillReprocessingWork: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How Backfill &amp; Reprocessing Work
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Foundation: Immutable Raw Storage</strong>
          The entire strategy depends on one architectural principle: your raw
          data must be immutable and retained. Companies like LinkedIn and
          Netflix keep months or years of compressed event logs in object
          storage (S3, GCS, HDFS). This becomes your source of truth. When you
          need to backfill or reprocess, you always go back to these raw logs,
          never to live production databases. Why? Because production databases
          change. A user record today looks different than it did 6 months ago.
          But raw event logs capture exactly what happened at that moment in
          time.
          <strong>The Backfill Workflow:</strong>A typical backfill follows this
          pattern:
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Identify the range:</strong> Determine which date
                partitions need processing, for example{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  2024-01-01
                </code>{" "}
                to{" "}
                <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
                  2024-03-31
                </code>
                .
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Fan out tasks:</strong> Orchestrator (Airflow, Luigi, or
                internal scheduler) creates one job per partition for parallel
                processing.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Read raw data:</strong> Each task reads compressed logs
                from object storage for its date, decompresses, parses, applies
                transformations.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                4
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Write to staging:</strong> Results go to temporary
                storage, not directly to production tables.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                5
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Atomic swap:</strong> After validation, the partition is
                atomically replaced. Queries see either all old data or all new
                data, never a mix.
              </div>
            </div>
          </div>
          <strong>Real Numbers:</strong>
          At Uber scale, a single day partition might contain 500 GB to 2 TB of
          raw events. Processing 90 days in parallel across a cluster with 500
          workers, each handling 2 partitions per hour, completes in roughly 1
          hour of wall clock time. But you need throttling: running at 100
          percent cluster capacity starves production jobs. Most teams target 20
          to 30 percent of cluster resources for backfills, extending completion
          to 3 to 5 hours but maintaining production Service Level Agreements
          (SLAs).
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>⚠️ Common Pitfall:</strong> Never backfill by querying live
            production databases for months of historical data. This creates
            massive read spikes that can degrade user-facing latency from 50ms
            to 500ms or worse.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
            <div style="font-size: 12px; font-weight: 700; margin-bottom: 12px; text-align: center">
              BACKFILL WORKFLOW
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Raw Logs (S3)</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  2024-01-01 to 2024-03-31
                  <br />
                  500GB per day
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Orchestrator</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Fan out: 90 parallel jobs
                  <br />
                  Throttle: 30% cluster capacity
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Staging Tables</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Validate before swap
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                <strong style="font-size: 14px">Atomic Partition Swap</strong>
                <div style="font-size: 11px; margin-top: 4px">
                  Production table updated
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
                Always backfill from immutable raw storage (object storage
                logs), never from live production databases
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Fan out work by partition: 90 days becomes 90 parallel jobs for
                faster completion
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Throttle resource usage to 20 to 30 percent of cluster capacity
                to avoid impacting production SLAs
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Use atomic partition swaps: write to staging, validate, then
                replace production partitions in one operation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                At Uber scale, processing 500 GB to 2 TB per day across 90 days
                with 500 workers completes in 3 to 5 hours
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
                Airflow DAG with 90 tasks, one per date partition, each reading
                from S3 path
                &lt;code&gt;s3://events/date=2024-01-01/&lt;/code&gt; and
                writing to staging table
                &lt;code&gt;metrics_staging&lt;/code&gt;
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Validation step compares record counts: old partition has 1.2
                billion rows, new partition has 1.201 billion rows (0.08%
                difference, acceptable)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonBackfillStrategiesHowBackfillReprocessingWork;
