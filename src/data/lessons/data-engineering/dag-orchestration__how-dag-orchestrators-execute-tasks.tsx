import type { Component } from "solid-js";

const LessonDagOrchestrationHowDagOrchestratorsExecuteTasks: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          How DAG Orchestrators Execute Tasks
        </h1>
        <div
          class="card-content-area"
          style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
        >
          <strong>The Architecture:</strong> DAG orchestrators follow a control
          plane plus execution plane pattern. The control plane consists of a
          scheduler (decides what runs when), a metadata store (tracks task
          states and history), and a UI or API (for monitoring and manual
          triggers). The execution plane consists of worker processes that pull
          tasks from a queue and execute your code. Here's the execution flow in
          detail:
          <div style="margin: 12px 0">
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                1
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Scheduler reads DAG definitions:</strong> Every few
                seconds, the scheduler scans for DAGs and evaluates which tasks
                are ready to run based on schedule ("run daily at 1:00 AM") and
                dependency completion.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                2
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Tasks enqueued:</strong> Ready tasks are placed in a
                task queue (often Redis or RabbitMQ). At moderate scale, a
                single scheduler node can enqueue 1,000 to 3,000 tasks per
                minute with subsecond latency.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                3
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>Workers execute:</strong> Worker processes pull tasks,
                run your code, and send heartbeats every 10 to 30 seconds to
                prove they're alive.
              </div>
            </div>
            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 8px">
              <div style="width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; flex-shrink: 0">
                4
              </div>
              <div style="flex: 1; padding-top: 4px">
                <strong>State tracking:</strong> Every state change (queued,
                running, success, failed, retry) is written to the metadata
                database, creating an audit trail.
              </div>
            </div>
          </div>
          <strong>The Metadata Store Under Load:</strong> This database is on
          the critical path. Consider a large deployment running 100,000 tasks
          per day. Each task changes state 5 to 10 times (scheduled, queued,
          running, success/failed, plus potential retries). That's 500,000 to
          1,000,000 writes per day, or roughly 6 to 12 writes per second
          average, with peak loads 3x to 5x higher during batch windows. To hit
          99.9% availability, teams typically run the metadata store on a
          replicated PostgreSQL or MySQL instance with synchronous replication
          within a region. The write amplification matters: if your orchestrator
          manages 50 active DAGs with 2,000 total tasks, and you query task
          history frequently in the UI, you need to index on <code>dag_id</code>
          , <code>task_id</code>, <code>execution_date</code>, and{" "}
          <code>state</code> to keep query latency under 100ms.
          <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
              Scheduler Throughput
            </div>
            <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">3,000</div>
                <div style="font-size: 10px; font-weight: 600">TASKS/MIN</div>
              </div>
              <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                <div style="font-size: 18px; font-weight: 800">&lt;1s</div>
                <div style="font-size: 10px; font-weight: 600">
                  ENQUEUE TIME
                </div>
              </div>
            </div>
          </div>
          <strong>Concurrency Controls:</strong> Orchestrators enforce limits at
          multiple levels. At the DAG level, you might set{" "}
          <code>max_active_runs=1</code> to ensure only one instance of a
          pipeline runs at a time, preventing data races when multiple runs
          write to the same tables. At the task level, you define pools that
          limit concurrent external API calls to respect rate limits (for
          example, max 100 concurrent tasks calling a third party API limited to
          100 queries per second).
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The scheduler evaluates DAG readiness every few seconds and can
                enqueue 1,000 to 3,000 tasks per minute on a single node
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Metadata store handles 6 to 12 writes per second on average for
                100,000 daily tasks, with 3x to 5x peaks during batch windows
                requiring indexed queries under 100ms
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Workers send heartbeats every 10 to 30 seconds; missed
                heartbeats trigger automatic task rescheduling to handle worker
                crashes
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Concurrency controls prevent resource exhaustion and rate limit
                violations through DAG level max runs and task level pool limits
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
                Airflow deployment at Airbnb: tens of thousands of tasks per day
                coordinated through central metadata database with distributed
                Celery executors for horizontal worker scaling
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Task pool limiting external API calls: setting pool size to 100
                ensures your pipeline respects third party rate limit of 100 QPS
                even when 500 tasks are ready to run
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDagOrchestrationHowDagOrchestratorsExecuteTasks;
