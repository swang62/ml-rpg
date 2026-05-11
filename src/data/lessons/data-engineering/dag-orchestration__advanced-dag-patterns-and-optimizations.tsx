import type { Component } from "solid-js";

const LessonDagOrchestrationAdvancedDagPatternsAndOptimizations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Advanced DAG Patterns and Optimizations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>Task Grouping and SubDAGs:</strong> When a DAG grows to 200+
            tasks, visualization becomes unwieldy and performance degrades. The
            solution is hierarchical composition. Task groups visually collapse
            related tasks in the UI without changing execution semantics.
            SubDAGs go further: a parent DAG delegates entire workflow segments
            to child DAGs that can be tested and versioned independently. For
            example, a daily marketing analytics DAG might have 15 ingestion
            tasks, 80 transformation tasks, and 30 publishing tasks. Grouping
            transforms by domain (customer metrics, revenue metrics, engagement
            metrics) makes the graph navigable. SubDAGs take this further: the
            transformation logic becomes a reusable component called by multiple
            parent DAGs, enforcing consistency across teams. The performance
            benefit is real. Airflow parses DAG files every 30 to 60 seconds. A
            200 task flat DAG takes 2 to 5 seconds to parse. Splitting into 5
            SubDAGs of 40 tasks each reduces parse time to 0.5 to 1 second per
            SubDAG, improving scheduler responsiveness.
            <strong>Dynamic Task Mapping:</strong> Modern orchestrators support
            mapping a single task definition across a list of inputs, generating
            tasks at runtime. Consider feature engineering for 50 countries.
            Instead of defining 50 hardcoded tasks, you map one task definition
            across a list of country codes. This is powerful but requires
            careful resource management. If you map across 1,000 items, you
            generate 1,000 tasks. To prevent overwhelming the worker pool, you
            must configure concurrency limits: allow 50 mapped tasks to run
            concurrently, queuing the rest. This requires tuning based on task
            duration and cluster capacity. At 5 minutes per task, 50 concurrent
            tasks complete 1,000 items in roughly 100 minutes. Doubling
            concurrency to 100 might halve duration but risks memory exhaustion
            if each task uses 8 GB and your cluster has 1 TB total.
            <div style="padding: 12px; border-left: 4px solid; margin: 8px 0; border-radius: 4px">
              <strong>⚠️ Common Pitfall:</strong> Dynamic mapping over database
              query results seems elegant but creates hidden coupling. If the
              query returns different row counts on each run, your DAG structure
              changes, breaking downstream assumptions. Defensive patterns
              include capping result counts, pre-flight validation, and failing
              fast on unexpected cardinality.
            </div>
            <strong>Data Aware Scheduling:</strong> Traditional schedulers
            trigger DAGs on time-based cron expressions. Data aware scheduling
            triggers based on data availability. A DAG waiting for 20 upstream
            files starts when all 20 arrive, not at a fixed time. This prevents
            unnecessary runs and reduces latency. If upstream data arrives at
            1:15 AM instead of 1:00 AM, your time-triggered DAG wastes 15
            minutes waiting or fails checking for missing files. Data sensors
            poll for file existence or database row counts, typically every 30
            to 60 seconds, and trigger downstream tasks immediately upon
            detection. The trade-off is complexity. Sensors hold worker slots
            while polling, reducing capacity for actual work. If you have 500
            worker slots and 100 sensors polling every 60 seconds, you've lost
            20% capacity to sensing overhead. Smart sensors (Airflow 2.0+) run
            in a centralized process to avoid this, but require separate
            deployment and monitoring.
            <strong>Exactly Once Semantics:</strong> Ensuring each task runs
            exactly once despite failures is hard. Orchestrators guarantee at
            least once execution through retries. They cannot guarantee exactly
            once without cooperation from task code. The pattern is
            transactional writes with idempotency keys. Each task writes an
            idempotency token (<code>dag_id</code>, <code>task_id</code>,{" "}
            <code>execution_date</code>) alongside its output. On retry, the
            task checks if the token exists. If yes, skip the work. If no,
            execute and write token atomically. This requires storage with
            transaction support. Writing to S3 doesn't help because S3 lacks
            transactions. Writing to a database table or a lakehouse with ACID
            support (Delta Lake, Iceberg) enables the pattern. Without this,
            duplicate runs create duplicate data. A task that writes 1 million
            rows and retries 3 times writes 4 million rows total, corrupting
            downstream aggregates.
            <div style="margin: 8px 0; display: flex; flex-direction: column; align-items: center">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; margin-bottom: 6px">
                Dynamic Mapping Resource Impact
              </div>
              <div style="display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center">
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">1,000</div>
                  <div style="font-size: 10px; font-weight: 600">
                    MAPPED TASKS
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">50</div>
                  <div style="font-size: 10px; font-weight: 600">
                    CONCURRENCY
                  </div>
                </div>
                <div style="padding: 8px 12px; border: 2px solid; border-radius: 4px; text-align: center">
                  <div style="font-size: 18px; font-weight: 800">100m</div>
                  <div style="font-size: 10px; font-weight: 600">
                    COMPLETION
                  </div>
                </div>
              </div>
            </div>
            <strong>Cross DAG Dependencies:</strong> Real platforms have DAGs
            that depend on other DAGs. Marketing analytics depends on user
            attribution DAG. Revenue reporting depends on payment processing
            DAG. Orchestrators support sensors that wait for external DAG
            completion before proceeding. The challenge is avoiding tight
            coupling. If DAG A uses a sensor to wait for DAG B, and DAG B is
            delayed or fails, DAG A is blocked. This creates cascading delays. A
            better pattern is event driven triggering: DAG B publishes an event
            on completion. DAG A subscribes to that event. This decouples timing
            and allows DAG A to process events from multiple sources. At very
            large scale, companies build metadata services that track dataset
            freshness. Instead of DAG-to-DAG dependencies, you depend on
            datasets. "Run when customer_events table has data for yesterday."
            This isolates producer and consumer DAGs, enabling independent
            evolution and testing.
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Task grouping and SubDAGs improve DAG parsing from 2 to 5
                  seconds for 200 task flat DAG to 0.5 to 1 second per SubDAG,
                  reducing scheduler load and improving UI performance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic mapping over 1,000 items with 50 concurrency and 5
                  minute tasks completes in 100 minutes; doubling to 100
                  concurrency risks memory exhaustion at 8 GB per task on 1 TB
                  cluster
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data aware sensors reduce latency but consume 20% worker
                  capacity if 100 sensors hold slots on 500 worker pool; smart
                  sensors centralize polling to avoid this overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exactly once semantics require idempotency keys written
                  atomically with task output; without this, 3 retries write 4x
                  data (original plus 3 duplicates), corrupting aggregates
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
                  Marketing analytics DAG with 125 tasks: splitting into SubDAGs
                  for ingestion, transformation, and publishing reduces parse
                  time from 4 seconds to 1 second per component, improving
                  scheduler responsiveness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Feature engineering mapped over 50 countries: each task uses 8
                  GB and runs 5 minutes; concurrency of 50 completes in 1.7
                  hours, concurrency of 100 completes in 50 minutes but risks
                  exceeding 1 TB cluster memory
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDagOrchestrationAdvancedDagPatternsAndOptimizations;
