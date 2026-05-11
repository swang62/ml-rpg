import type { Component } from "solid-js";

const LessonEtlPipelinesOrchestrationBackfillsAndFailureHandlingDagsRetriesAndPriorityQueues: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Orchestration, Backfills, and Failure Handling: DAGs, Retries, and
            Priority Queues
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            Orchestration coordinates data pipeline workflows as Directed
            Acyclic Graphs (DAGs) with explicit dependencies, retries, and
            failure handling. At scale, the challenge is managing thousands of
            concurrent tasks, backfill storms, and ensuring fresh data takes
            priority over historical reprocessing. Model each pipeline as a DAG
            where nodes are tasks (extract, transform, load) and edges represent
            data dependencies. Tasks are idempotent and checkpointed: they
            record source offsets, watermark state, and versioned input datasets
            so retries do not cause duplicate writes or skip data. Large
            organizations like Airbnb publicly report tens of thousands of daily
            task runs and thousands of concurrent tasks, requiring robust
            scheduling, priority queues, and resource quotas. Backfills are a
            common failure mode. Reprocessing months of historical data can
            overwhelm real-time pipelines, causing cascading lag. Separate
            backfill jobs into a lower priority service class with concurrency
            limits and throttled write rates. For example, Amazon teams throttle
            backfills to 100 to 200 megabytes per second per table while
            reserving higher throughput for fresh data to protect
            customer-facing Service Level Agreements (SLAs). Implement a
            recompute window control that bounds how far back regular jobs scan
            (e.g., rolling 48 hours) with periodic deep compactions running
            offline. Retries need exponential backoff and jitter to avoid
            thundering herds when upstream failures recover. Implement circuit
            breakers that trip after N consecutive failures and half-open after
            a cooldown period. Monitor DAG completion time, task failure rates,
            and queue depth. Alert on anomalies like sudden spikes in retry
            rates or long-tail tasks blocking downstream dependencies. Use
            lineage tracking to record which upstream dataset versions produced
            which downstream artifacts, enabling root cause analysis and
            targeted reruns when bugs are discovered.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Model pipelines as Directed Acyclic Graphs (DAGs) with
                  idempotent, checkpointed tasks recording source offsets and
                  watermark state for safe retries.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large enterprises run tens of thousands of daily tasks and
                  thousands concurrently (Airbnb reference), requiring priority
                  queues, resource quotas, and scheduling coordination.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Separate backfills into lower priority classes with throttled
                  write rates (e.g., 100 to 200 MB/s per table) to avoid
                  overwhelming real-time pipelines during large reprocessing
                  jobs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Implement exponential backoff, jitter, and circuit breakers
                  for retries. Monitor DAG completion time, task failure rates,
                  and queue depth; alert on anomalies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use lineage tracking to record dataset versions and
                  dependencies, enabling root cause analysis and targeted reruns
                  when bugs or data quality issues are discovered.
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
                  Amazon backfill throttling: during a 6 month reprocess, limit
                  writes to 150 MB/s per table while fresh micro-batches use up
                  to 500 MB/s, protecting customer-facing dashboard SLAs.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Circuit breaker: after 5 consecutive task failures, trip to
                  OPEN state for 10 minutes. After cooldown, enter HALF_OPEN and
                  attempt one retry. On success, return to CLOSED; on failure,
                  return to OPEN for exponentially longer cooldown.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonEtlPipelinesOrchestrationBackfillsAndFailureHandlingDagsRetriesAndPriorityQueues;
