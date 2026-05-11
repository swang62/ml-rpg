import type { Component } from "solid-js";

const LessonTrainingOrchestrationChoosingYourOrchestrationStackDecisionFramework: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Choosing Your Orchestration Stack: Decision Framework
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Airflow-Style Orchestrators
            </p>
            <p style="margin-top: 0">
              The orchestration decision reduces to matching tool strengths with
              your constraints. Airflow style general purpose orchestrators
              excel when you have diverse data plus ML workflows spanning ETL,
              feature engineering, and training; strong requirements for
              backfilling historical date ranges; non containerized or rapidly
              iterating codebases where 10 minute image build cycles kill
              productivity; and need for a large ecosystem of integrations with
              databases, cloud services, and monitoring tools. Thousands of
              enterprises run Airflow at scale precisely because it unifies
              heterogeneous workflows under one scheduler with mature
              operational patterns.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Choose Kubeflow Pipelines
            </p>
            <p style="margin-top: 0">
              Kubeflow Pipelines and Kubernetes native orchestration make sense
              when your organization is already Kubernetes first with existing
              cluster operations expertise; you have heavy distributed training
              workloads requiring GPU scheduling and autoscaling across dozens
              of nodes; strict isolation and multi tenancy are mandatory for
              regulatory or security reasons; and you can invest platform
              engineering resources into managing image lifecycles, node pools,
              quotas, and observability. The cost is higher operational
              complexity and longer feedback loops, but the payoff is first
              class support for GPU scheduling, heterogeneous runtimes, and
              horizontal scaling.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MLflow as Universal Tracker
            </p>
            <p style="margin-top: 0">
              MLflow serves as the universal experiment tracker and model
              registry regardless of orchestration choice. It tracks parameters,
              metrics, artifacts, and environment manifests for every run;
              manages model promotion lifecycle with staging and production
              tags; and provides lineage from raw data through features to
              deployed model.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Pragmatic Production Pattern
            </p>
            <p style="margin-top: 0">
              The pragmatic production pattern is: choose orchestrator based on
              workflow characteristics as described above, choose compute
              backend based on scaling and cost requirements, but use MLflow
              universally for experiment tracking and model governance. This
              separation means you can migrate orchestrators without losing
              historical run data or rewriting promotion policies.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose Airflow for diverse data plus ML workflows with strong
                  backfill needs, non containerized codebases avoiding 10 minute
                  build cycles, and large ecosystem integration requirements
                  spanning hundreds of data sources
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose Kubeflow for Kubernetes first organizations with
                  distributed GPU training at scale, strict multi-tenancy
                  isolation needs, and platform engineering capacity to manage
                  image lifecycles and cluster operations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MLflow provides universal experiment tracking and model
                  registry independent of orchestration choice, enabling
                  orchestrator migration without losing run history or rewriting
                  promotion workflows
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid pattern in production: general purpose orchestrator for
                  CPU intensive feature engineering with fast iteration,
                  containerized execution for GPU training with isolation,
                  unified experiment tracker for lineage
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Trade-offs are concrete: Airflow gains iteration speed and
                  backfill maturity but loses GPU scheduling and strict
                  isolation, Kubeflow gains Kubernetes native scaling but adds
                  approximately 10 minutes per iteration overhead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Team fit matters: small ML teams favor shared environment
                  simplicity and rapid iteration, large platform teams with 10
                  plus ML engineers benefit from containerized isolation despite
                  DevOps investment
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
                  LinkedIn uses Airflow for orchestrating thousands of daily ETL
                  and feature computation DAGs across diverse data sources due
                  to mature backfill support and operator ecosystem, switches to
                  Kubernetes Jobs for GPU intensive ranking model training,
                  unified by central experiment tracking system
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Startup with 3 person ML team chose shared Airflow environment
                  to minimize DevOps overhead and enable sub minute iteration
                  cycles, plans migration to containerized orchestration only
                  after reaching 10 engineers when isolation benefits outweigh
                  operational complexity
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationChoosingYourOrchestrationStackDecisionFramework;
