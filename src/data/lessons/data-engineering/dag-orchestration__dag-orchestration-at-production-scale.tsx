import type { Component } from "solid-js";

const LessonDagOrchestrationDagOrchestrationAtProductionScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            DAG Orchestration at Production Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Scale Challenge:</strong> In a FAANG-scale data
            platform, orchestration isn't managing 10 tasks. It's coordinating
            thousands of DAG runs per day, each with 20 to 200 tasks, processing
            tens of terabytes of data, and hitting strict Service Level
            Agreements (SLAs). Consider a typical large company pipeline. At
            1:00 AM UTC, the scheduler triggers 300 daily DAG runs. Ingestion
            tasks pull from 50 to 200 upstream sources, with each task moving
            100 GB to 2 TB into cloud storage in 10 to 30 minutes at p95
            latency. Transform tasks execute Spark jobs or warehouse queries,
            running 5 to 60 minutes each, often bottlenecked by cluster
            capacity. The orchestrator must complete all critical DAGs by 6:00
            AM UTC so business users in multiple time zones see fresh dashboards
            by 9:00 AM local time.
            <strong>Scheduler Latency Becomes Critical:</strong> At this scale,
            p99 scheduler latency (the time between when a task should start and
            when it actually starts) matters tremendously. If scheduler latency
            exceeds 2 to 3 minutes, cascading delays occur. A DAG with 50
            sequential stages and 3 minute delays per stage adds 150 minutes of
            pure overhead, causing SLA misses even when all tasks succeed.
            Airbnb's public architecture showed tens of thousands of tasks per
            day orchestrated through Airflow. The bottleneck shifted from task
            execution to control plane capacity. Modern orchestrators like
            Prefect address this by pushing computation to distributed agents
            that sit closer to user infrastructure, keeping the control plane
            lightweight. This enables scaling to hundreds of thousands of tasks
            per day with horizontal autoscaling on the execution layer.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Production Pipeline Metrics
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">300</div>
                  <div style="font-size: 10px; font-weight: 600">
                    DAILY DAGS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">10-30m</div>
                  <div style="font-size: 10px; font-weight: 600">
                    P95 INGEST
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">&lt;3m</div>
                  <div style="font-size: 10px; font-weight: 600">
                    SCHED LATENCY
                  </div>
                </div>
              </div>
            </div>
            <strong>Reliability Requirements:</strong> A single missed DAG run
            can delay revenue reporting or model retraining, directly impacting
            business. Production orchestrators must guarantee: First, 99.9%
            control plane availability. The scheduler and metadata database must
            handle regional failures gracefully, often through cross region
            async replication and automated failover within 60 seconds. Second,
            less than 0.1% task misfire rate across a month. Misfires occur when
            tasks start incorrectly due to state corruption or race conditions.
            At 100,000 tasks per day, that's a budget of 30 misfires per month.
            Third, automatic recovery from crashed workers in under 60 seconds.
            When a worker dies mid task, the orchestrator detects the missed
            heartbeat and reschedules the task to another worker without manual
            intervention.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>✓ In Practice:</strong> Companies like Lyft and Reddit run
              multi-tenant orchestration platforms where hundreds of teams share
              infrastructure. They enforce resource quotas (max 50 concurrent
              tasks per team), priority queues (production DAGs preempt
              development runs), and cost attribution (tracking compute hours
              per business unit) to prevent noisy neighbor problems.
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
                  At FAANG scale, 300 daily DAGs with 20 to 200 tasks each
                  process tens of terabytes, requiring completion within 5 hour
                  SLA windows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Scheduler p99 latency above 2 to 3 minutes causes cascading
                  delays: a 50 stage DAG accumulates 150 minutes of overhead
                  with 3 minute per stage latency
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production orchestrators target 99.9% control plane
                  availability, under 0.1% task misfire rate (30 misfires per
                  month at 100k daily tasks), and 60 second worker failure
                  recovery
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi-tenant platforms enforce per team resource quotas,
                  priority queues, and cost attribution to prevent noisy
                  neighbor problems in shared infrastructure
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
                  Airbnb Airflow deployment: tens of thousands of tasks daily
                  with distributed executors, where control plane latency became
                  the bottleneck before task execution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Nightly analytics SLA: 300 DAGs triggered at 1:00 AM UTC must
                  complete by 6:00 AM UTC (5 hours) for dashboards to refresh
                  before 9:00 AM in multiple time zones
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDagOrchestrationDagOrchestrationAtProductionScale;
