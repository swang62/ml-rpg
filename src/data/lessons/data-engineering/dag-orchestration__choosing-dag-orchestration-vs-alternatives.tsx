import type { Component } from "solid-js";

const LessonDagOrchestrationChoosingDagOrchestrationVsAlternatives: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing DAG Orchestration vs Alternatives
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <strong>The Decision Framework:</strong> DAG-based orchestration is
            powerful but not universal. The choice depends on latency
            requirements, workflow predictability, and coordination complexity.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  DAG Orchestration
                </div>
                <div style="font-size: 12px">
                  Batch workflows, minute-level scheduling, strong observability
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Streaming Pipelines
                </div>
                <div style="font-size: 12px">
                  Continuous processing, sub 100ms latency, event driven
                </div>
              </div>
            </div>
            <strong>When DAG Orchestration Wins:</strong> Use DAG orchestrators
            for batch workloads with clear time boundaries. Nightly ETL that
            loads 2 TB of transaction data, runs 30 minutes of transformations,
            and publishes to a data warehouse is ideal. The workflow has well
            defined stages, tolerates minute-level scheduling resolution, and
            benefits from explicit dependency management and retry logic.
            Similarly, complex multi-step ML pipelines fit perfectly. A training
            workflow might extract features from 1 billion events (20 minutes),
            train 10 models in parallel (2 hours each with GPU clusters),
            evaluate results (10 minutes), and deploy the winner (5 minutes).
            The orchestrator ensures each stage completes before the next
            begins, retries GPU-related failures (which are common), and
            provides lineage for model governance.
            <strong>When Alternatives Are Better:</strong> For low latency event
            processing at p99 under 100ms, streaming engines like Flink or Kafka
            Streams are superior. DAG orchestrators operate at minute-level
            scheduling resolution. If you need to process click events and
            update user profiles within 50ms, orchestration overhead dominates
            and you need a different architecture. For very simple sequential
            jobs, cron plus monitoring might suffice. If you have 5 independent
            daily jobs with no dependencies and basic retry needs, introducing
            an orchestrator adds complexity without proportional benefit. The
            threshold is typically around 10 to 15 interdependent tasks before
            orchestration pays for itself.
            <strong>Static vs Dynamic DAGs:</strong> This trade-off matters
            within orchestration tools.
            <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; margin: 12px 0; align-items: stretch">
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Airflow Static DAGs
                </div>
                <div style="font-size: 12px">
                  Predictable structure, easy reasoning, best for 200
                  standardized pipelines
                </div>
              </div>
              <div style="display: flex; align-items: center; font-weight: 800; font-size: 18px">
                vs
              </div>
              <div style="padding: 12px; border: 2px solid; border-radius: 6px">
                <div style="font-weight: 700; margin-bottom: 4px; font-size: 13px">
                  Prefect Dynamic Flows
                </div>
                <div style="font-size: 12px">
                  Programmatic generation, flexible branching, user driven
                  workflows
                </div>
              </div>
            </div>
            Airflow-style static DAGs are parsed at definition time. The graph
            structure is known before execution. This makes visualization,
            testing, and debugging straightforward. Use static DAGs when your
            workflows are predetermined: daily ingestion from 50 known sources,
            hourly aggregation of 20 metric types, weekly model retraining on
            fixed datasets. Prefect-style dynamic flows are evaluated at
            runtime. A single flow definition can generate different graph
            shapes based on input parameters or data discovery. Use dynamic
            flows when you need conditional branches ("if data quality check
            fails, run remediation pipeline"), parallel mapping over variable
            lists ("train a model for each of N countries, where N is discovered
            at runtime"), or user customizable workflows ("customer uploads data
            and configures transformations through UI"). The trade-off is
            predictability versus flexibility. Dynamic flows can surprise you if
            the graph shape changes unexpectedly, making capacity planning
            harder. At 10,000 tasks per run instead of expected 100, you might
            exhaust worker capacity.
            <div style="padding: 14px 16px; border-left: 4px solid; border-radius: 0 6px 6px 0; margin: 12px 0; font-style: italic">
              <div style="font-size: 14px; line-height: 1.5">
                "The decision isn't 'use orchestration everywhere.' It's: do I
                have 10+ interdependent batch tasks with minute-level latency
                tolerance?"
              </div>
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
                  Use DAG orchestration for batch workflows with clear time
                  boundaries, 10+ interdependent tasks, and minute-level
                  scheduling tolerance (not sub 100ms event processing)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Static DAGs (Airflow style) excel for predictable workflows
                  with 200 standardized pipelines; dynamic flows (Prefect style)
                  excel for conditional branching and runtime variability
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Streaming engines replace DAG orchestration when you need p99
                  latency under 100ms for continuous event processing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Simple sequential jobs with under 10 tasks and no complex
                  dependencies may not justify orchestration overhead; plain
                  cron plus monitoring can suffice
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
                  Choose DAG: Nightly ETL loading 2 TB, transforming for 30
                  minutes, publishing to warehouse. Clear stages, minute-level
                  timing, complex dependencies.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose streaming: Click event processing updating user
                  profiles in under 50ms. Continuous flow, millisecond latency
                  requirement, event driven.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose dynamic DAG: Customer onboarding workflow that
                  generates different task graphs based on customer tier
                  (enterprise gets 20 setup tasks, starter gets 5)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDagOrchestrationChoosingDagOrchestrationVsAlternatives;
