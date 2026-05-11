import type { Component } from "solid-js";

const LessonDagOrchestrationDagOrchestrationFailureModes: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          DAG Orchestration Failure Modes
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>Control Plane Outage:</strong> The most severe failure is
          scheduler or metadata database downtime during the batch window. If
          your control plane fails for 30 minutes starting at 2:00 AM and your
          daily batch runs from 1:00 AM to 6:00 AM, the impact cascades.
          Scheduled tasks don't start. Running tasks continue but their
          heartbeats are not recorded. When the control plane recovers, tasks
          that finished during the outage might be marked as failed or "zombie"
          (running but orphaned). At Airbnb scale with thousands of concurrent
          tasks, recovery requires reconciling state: querying actual task
          status from logs, identifying which tasks need rerunning, and
          reconstructing dependency chains. Manual intervention often takes 1 to
          3 hours, causing widespread SLA misses.
          <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
            <strong>❗ Remember:</strong> Replicated metadata databases help but
            introduce new failure modes. If the primary fails and you promote a
            replica with 10 seconds of replication lag, you lose task state
            updates from that window. Some tasks marked as running may have
            actually completed, creating duplicate runs when the orchestrator
            retries them.
          </div>
          <strong>Dependency Misconfiguration:</strong> This is subtle and
          dangerous because DAGs appear healthy. Consider a metrics publishing
          workflow. The correct dependency chain is: load raw data, compute
          aggregates, publish metrics. If you accidentally omit the edge from
          "compute aggregates" to "publish metrics", both tasks run in parallel.
          Publish metrics executes first using stale aggregates from yesterday.
          The DAG shows all green checkmarks, but your dashboard displays
          incorrect numbers with fresh timestamps, misleading business
          decisions. This happens in practice when teams modify DAGs
          incrementally and test individual tasks but not the full dependency
          graph. Code review catches obvious errors but subtle timing
          assumptions slip through.
          <strong>Backfill Catastrophes:</strong> Your pipeline was down for 3
          days due to an upstream API outage. Now you must backfill. Each daily
          run processes 2 TB and takes 3 hours. Do you run 3 days sequentially
          (9 hours total, missing today's SLA) or in parallel (6 TB and
          potentially exceeding cluster capacity)?
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Backfill Disaster Timeline
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">NORMAL</div>
                <div style="font-size: 16px; font-weight: 800">2 TB/day</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  3 DAY OUTAGE
                </div>
                <div style="font-size: 16px; font-weight: 800">0 TB</div>
              </div>
              <div style="font-size: 18px; font-weight: 800">→</div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 10px; font-weight: 600">
                  PARALLEL BACKFILL
                </div>
                <div style="font-size: 16px; font-weight: 800">6 TB spike</div>
              </div>
            </div>
          </div>
          Most teams choose parallel backfill and discover that 3x load exhausts
          memory on Spark clusters, causing out-of-memory errors and failed
          runs. The correct approach requires resource-aware backfill: run 2
          days in parallel (4 TB, within capacity) then the third day, but this
          logic must be built into your orchestrator or handled with manual
          scheduling. Idempotency becomes critical here. If a backfill run
          partially completes (wrote 800 GB of 2 TB before crashing), rerunning
          must either overwrite cleanly or skip already written partitions.
          Non-idempotent tasks create data duplication or corruption during
          backfills.
          <strong>Dynamic DAG Edge Cases:</strong> Prefect-style dynamic flows
          introduce runtime surprises. Imagine a flow that discovers customer
          IDs from a database and spawns one task per customer. Normally you
          have 100 customers and 100 tasks. A new enterprise customer onboards
          with 10,000 sub accounts. Your flow now generates 10,100 tasks in a
          single run. The worker pool, sized for 500 concurrent tasks, is
          overwhelmed. The control plane tries to enqueue 10,100 tasks,
          exhausting queue capacity. The metadata database sees 50,000 state
          writes (10,100 tasks times 5 state changes each) in 30 minutes instead
          of the usual 2,500, causing write latency to spike from 5ms to 200ms
          and creating a cascading slowdown across all DAGs. Preventing this
          requires defensive coding: capping generated task counts, pre-flight
          checking data cardinality, and failing fast with clear errors rather
          than attempting impossible workloads.
          <strong>Monitoring Blind Spots:</strong> Alerting on DAG failure is
          table stakes. The dangerous blind spot is alerting only on failure and
          not on duration anomalies. Consider 50 critical DAGs normally
          completing in 1 hour. Due to cluster resource contention, p99 duration
          increases to 1.5 hours but all tasks still succeed. Your alerts stay
          silent because nothing failed. Meanwhile, downstream reporting misses
          SLAs. Users see stale data at 9:00 AM when they expect fresh results.
          This causes business impact despite zero task failures. Robust
          monitoring requires duration percentile tracking and alerting on
          regressions: p99 duration exceeds baseline by 25% for 3 consecutive
          days triggers investigation.
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Control plane outages during batch windows leave tasks in zombie
                state; recovery at Airbnb scale requires 1 to 3 hours of manual
                state reconciliation affecting thousands of tasks
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dependency misconfiguration causes silent data corruption: tasks
                show success but execute with wrong dependencies, publishing
                stale metrics with fresh timestamps
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Backfills amplify resource usage: 3 day backfill of 2 TB per day
                pipelines creates 6 TB spike, often exceeding cluster capacity
                and requiring resource aware scheduling
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dynamic DAG cardinality spikes (100 to 10,000 tasks) overwhelm
                worker pools and cause metadata database write latency to spike
                from 5ms to 200ms, cascading across all DAGs
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
                Zombie task recovery: Scheduler outage from 2:00 to 2:30 AM
                leaves 500 running tasks untracked; recovery requires querying
                logs, identifying completed tasks, and manually marking them to
                prevent duplicate reruns
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Dynamic task explosion: Customer discovery flow normally
                generates 100 tasks; new enterprise customer adds 10,000 sub
                accounts, generating 10,100 tasks that exhaust queue and triple
                metadata write latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDagOrchestrationDagOrchestrationFailureModes;
