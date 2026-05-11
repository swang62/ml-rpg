import type { Component } from "solid-js";

const LessonTrainingOrchestrationThreeOrchestrationToolsAirflowKubeflowPipelinesAndMlflowRoles: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Three Orchestration Tools: Airflow, Kubeflow Pipelines, and MLflow
            Roles
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Three Distinct Tool Categories
            </p>
            <p style="margin-top: 0">
              Three distinct tool categories are often conflated but serve
              different roles. Workflow orchestrators like Airflow, Kubeflow
              Pipelines, Prefect, and AWS Step Functions manage DAG execution:
              they schedule tasks based on dependencies and time triggers,
              handle retries with exponential backoff, track task state, and
              provide user interfaces for monitoring. Training backends like
              Kubernetes, AWS Batch, Apache Spark, or Ray actually execute the
              compute intensive work: they allocate CPUs and GPUs, run
              containers or processes, handle distributed communication, and
              report job status back to the orchestrator.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Experiment and Model Lifecycle Managers
            </p>
            <p style="margin-top: 0">
              Experiment and model lifecycle managers like MLflow or internal
              registries track what happened during each run: parameters like
              learning rate and batch size, metrics like accuracy and loss
              curves, artifacts like trained model files, and governance state
              like which model version is approved for production.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Integration Pattern
            </p>
            <p style="margin-top: 0">
              The production pattern is integration across all three. The
              orchestrator parametrizes and triggers a training run on a compute
              backend by submitting a Kubernetes Job specification or Batch API
              call. The training code running on that backend logs parameters
              and metrics to the experiment tracker throughout execution and
              writes model artifacts to object storage with versioned paths. On
              successful completion, the orchestrator receives a success signal,
              validates output artifacts exist, and calls the model registry API
              to promote the model from candidate to production status.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Separation of Concerns Benefit
            </p>
            <p style="margin-top: 0">
              This separation of concerns means you can swap Airflow for
              Kubeflow Pipelines without changing your MLflow tracking code, or
              migrate from one cloud batch service to another without rewriting
              orchestration logic. Each layer evolves independently while
              maintaining the contract through versioned APIs and artifact
              references.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Workflow Orchestrator</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Airflow, Kubeflow, Prefect
                  </div>
                  <div style="font-size: 10px; margin-top: 4px">
                    Schedules, retries, monitors
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Training Backend</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Kubernetes, Batch, Ray
                  </div>
                  <div style="font-size: 10px; margin-top: 4px">
                    Executes compute, allocates GPU
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Experiment Tracker</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    MLflow, Registry
                  </div>
                  <div style="font-size: 10px; margin-top: 4px">
                    Logs metrics, manages lifecycle
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 11px">
                <strong>Flow:</strong> Orchestrator triggers → Backend executes
                &amp; logs to Tracker → Orchestrator promotes in Registry
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
                  Workflow orchestrators handle when and how to run tasks with
                  scheduling and retry logic, training backends execute the
                  actual compute with CPU and GPU allocation, experiment
                  trackers record what happened with parameters and metrics
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airflow excels at heterogeneous data workflows with thousands
                  of scheduled DAGs, rich operator ecosystem, and mature
                  backfill support for reprocessing historical date ranges
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kubeflow Pipelines integrates tightly with Kubernetes for GPU
                  scheduling, distributed training, and autoscaling but adds
                  platform complexity and longer feedback cycles due to
                  container image builds taking approximately 10 minutes per
                  iteration as observed at Exness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  MLflow provides universal experiment tracking and model
                  registry capabilities that complement any orchestrator choice,
                  storing run metadata, artifacts, and promotion state
                  independently
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production pattern at scale: orchestrator validates data
                  freshness and triggers backend job, training code logs to
                  tracker during execution, orchestrator promotes model in
                  registry on success and notifies inference systems
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
                  LinkedIn feed ranking: Airflow DAG scheduled daily at 2am
                  checks previous day engagement data completeness in Hadoop,
                  triggers distributed training job on Kubernetes cluster with
                  16 GPU nodes, training code logs precision at k and normalized
                  discounted cumulative gain (NDCG) metrics to MLflow every
                  epoch, on NDCG &gt; 0.78 Airflow calls registry API to promote
                  model and trigger serving pipeline rebuild
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing model: Prefect orchestrator monitors S3 for new
                  booking data partition, launches AWS Batch job with 64 CPU
                  cores for feature computation across 5M listings, training
                  container logs feature importance and Mean Absolute Error
                  (MAE) to MLflow with link to data snapshot, promotes to
                  production registry when MAE &lt; $12 and model size &lt;
                  200MB for mobile deployment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationThreeOrchestrationToolsAirflowKubeflowPipelinesAndMlflowRoles;
