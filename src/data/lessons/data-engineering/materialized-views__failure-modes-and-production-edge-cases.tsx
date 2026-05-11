import type { Component } from "solid-js";

const LessonMaterializedViewsFailureModesAndProductionEdgeCases: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Edge Cases
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>When Reality Gets Messy:</strong> Materialized views work
            well in theory, but production systems encounter several common
            failure modes that you must design for.
            <strong>Staleness and Lag Explosions:</strong> If refresh jobs fall
            behind due to load spikes or infrastructure issues, materialized
            views can become hours out of date. Imagine your pipeline expects 1
            million events per second but a viral marketing campaign pushes
            traffic to 3 million events per second. The refresh job saturates
            available compute and falls further behind each cycle. Dashboards
            showing stale data are dangerous for operational monitoring.
            Engineers might miss ongoing incidents because metrics show
            everything normal from 2 hours ago. You need clear Service Level
            Indicators (SLIs) for freshness lag: track "time from event
            ingestion to appearance in aggregate table" and alert when p99
            exceeds thresholds like 10 minutes.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Staleness Incident Timeline
              </div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                  <div style="font-size: 16px; font-weight: 800">2 min lag</div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">
                    TRAFFIC SPIKE
                  </div>
                  <div style="font-size: 16px; font-weight: 800">
                    3x events/sec
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: 800">→</div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 10px; font-weight: 600">LAG GROWS</div>
                  <div style="font-size: 16px; font-weight: 800">
                    120 min lag
                  </div>
                </div>
              </div>
            </div>
            <strong>Consistency Bugs:</strong> If a refresh job partially fails
            or retries incorrectly, you can get duplicate aggregates, missing
            rows, or mismatched counts. A batch job might process a time window
            twice due to an off by one bug in window boundaries, leading to
            exactly doubled counts for that window. Or a streaming job with at
            least once delivery might reapply updates without idempotence. If
            your code does{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              UPDATE SET count = count + delta
            </code>{" "}
            instead of{" "}
            <code style="padding: 2px 6px; border: 1px solid; border-radius: 3px; font-family: monospace; font-size: 0.9em">
              INSERT ON CONFLICT UPDATE
            </code>{" "}
            with unique keys, replayed messages cause over counting.
            <strong>Late Arriving and Corrected Data:</strong> In real systems,
            events often arrive minutes or hours late due to mobile device
            connectivity or batch upload delays. If your materialized views only
            look at the current time window, late events never appear in
            historical aggregates. Your daily active user count for last Tuesday
            will be permanently understated. Handling this requires lookback
            windows in refresh logic. A common pattern is to recompute the past
            7 days of aggregates on each run, allowing up to 7 days of late
            arrival. Older data becomes immutable. The trade off is higher
            compute cost: you reprocess some data repeatedly. GDPR deletions or
            data correction backfills add more complexity. Deleting a user means
            finding and updating all affected aggregate partitions. For systems
            at Uber or Meta scale with years of historical aggregates across
            hundreds of tables, this can require sophisticated lineage tracking
            and coordinated multi table updates.
            <strong>Schema Evolution:</strong> Adding a new dimension like user
            segment or pricing tier can invalidate past aggregates. If you need
            historical data with the new dimension, you must backfill months or
            years. For large datasets, full backfills can take days of cluster
            time and cost hundreds of thousands of dollars in compute.
            Mitigations include planning aggregation schemas carefully upfront,
            versioning aggregation tables to keep old and new side by side, and
            using semi structured columns (JSON, Variant types) for flexible
            dimensions that might change.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>❗ Remember:</strong> Resource contention between refresh
              jobs and interactive queries is common. Naive schedules running
              expensive full refresh at 9 AM when users log in to dashboards
              degrade both. Stagger refreshes, throttle background jobs, and
              isolate compute pools.
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
                  Staleness lag can explode during traffic spikes: 1M to 3M
                  events per second surge can push lag from 2 minutes to over
                  120 minutes, making dashboards dangerously outdated for
                  operational monitoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Consistency bugs from partial failures or non idempotent
                  retries cause duplicate counts: streaming jobs with at least
                  once delivery must use idempotent writes or transactional
                  semantics to prevent over counting
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Late arriving events (minutes to hours delayed) require
                  lookback windows: recomputing past 7 days on each refresh
                  allows late data to appear, trading higher compute cost for
                  correctness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Schema evolution and backfills are expensive: adding new
                  dimensions to historical aggregates can require days of
                  cluster time at companies operating at Uber or Meta scale,
                  costing hundreds of thousands in compute
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
                  Viral marketing campaign increases event rate from 1M to 3M
                  per second; refresh job saturates compute and aggregate
                  staleness grows from 2 minutes to 120 minutes before
                  autoscaling catches up
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming aggregation job with at least once Kafka delivery
                  uses non idempotent SQL updates; message replay during failure
                  recovery causes daily active user counts to be exactly 2x
                  actual for affected days
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GDPR user deletion request requires finding and updating all
                  aggregate partitions containing that user across 200 different
                  materialized views spanning 3 years of historical data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMaterializedViewsFailureModesAndProductionEdgeCases;
