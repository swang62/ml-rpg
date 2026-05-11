import type { Component } from "solid-js";

const LessonDagOrchestrationWhatIsDagBasedOrchestration: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is DAG-based Orchestration?
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
              <strong>DAG-based orchestration</strong> is a system for
              coordinating interdependent data tasks using a Directed Acyclic
              Graph (DAG), where nodes represent tasks and edges represent
              dependencies, ensuring tasks run in the correct order without
              circular loops.
            </div>
          </div>
          <strong>The Problem It Solves:</strong> Imagine you have 50 data tasks
          that must run every night. Task B needs data from Task A. Task C needs
          both A and B to finish. Task D can run in parallel with C. Managing
          this with cron jobs becomes a nightmare. If Task A fails at 2 AM, how
          do you prevent Task B from running on stale data? How do you retry
          just the failed parts? How do you track which tasks are stuck?
          DAG-based orchestrators like Apache Airflow and Prefect solve this by
          modeling your workflow as a graph. The "Directed" part means edges
          have direction (A flows to B). "Acyclic" means no loops (Task A cannot
          depend on Task C if Task C already depends on Task A). This guarantee
          prevents infinite execution cycles in production.
          <strong>How It Works:</strong> You define tasks and their dependencies
          in code. The orchestrator handles the execution mechanics: scheduling
          tasks when dependencies are met, retrying failed tasks (typically 3 to
          5 attempts with exponential backoff), tracking state in a metadata
          database, and providing a UI to monitor progress. Consider a daily
          analytics pipeline. At 1:00 AM, the orchestrator triggers a DAG with
          20 tasks. Three ingestion tasks run in parallel, pulling data from
          different APIs. When all three complete successfully, a transformation
          task processes the combined data. Finally, two tasks run in parallel:
          one publishes metrics to a dashboard, another trains a machine
          learning model. If the transformation task fails, the orchestrator
          automatically retries it without re-running the ingestion tasks.
          <strong>The Key Benefit:</strong> Separation of concerns. Your task
          code focuses on business logic ("transform this data"). The
          orchestrator handles coordination ("run this after that succeeds,
          retry on failure, alert on timeout"). This becomes critical when you
          scale from 20 tasks to 2,000 tasks across dozens of pipelines.
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="text-align: center; font-weight: 700; margin-bottom: 12px; font-size: 13px; text-transform: uppercase">
              Simple DAG Structure
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Ingest A</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Pull from API
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Ingest B</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    Pull from DB
                  </div>
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 13px">Transform</strong>
                <div style="font-size: 10px; margin-top: 4px">Joins A + B</div>
              </div>
              <div style="font-size: 20px; font-weight: bold">↓</div>
              <div style="display: flex; gap: 16px; justify-content: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Publish</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    To Dashboard
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 100px; text-align: center">
                  <strong style="font-size: 13px">Train Model</strong>
                  <div style="font-size: 10px; margin-top: 4px">
                    ML Pipeline
                  </div>
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
                A DAG (Directed Acyclic Graph) models workflow as nodes (tasks)
                and edges (dependencies), guaranteeing no circular dependencies
                that could cause infinite loops
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Orchestrators separate task logic from execution mechanics: you
                write what to do, the system handles when, where, retries, and
                monitoring
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical retry policies attempt 3 to 5 retries with exponential
                backoff (1 min, 2 min, 4 min) before marking a task as failed
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                The acyclic property is enforced at DAG definition time,
                preventing deployment of workflows with circular dependencies
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
                Daily ETL pipeline: Ingest customer data from 3 sources in
                parallel (10 minutes each), transform and join the data (30
                minutes), then publish to data warehouse and update BI
                dashboards
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                ML training workflow: Extract features from event logs,
                preprocess data in parallel for 5 models, train each model
                concurrently, evaluate results, and deploy the best performing
                model
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonDagOrchestrationWhatIsDagBasedOrchestration;
