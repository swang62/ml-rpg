import type { Component } from "solid-js";

const LessonTrainingOrchestrationTrainingOrchestrationCoordinatingTheMlPipelineAsADag: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Orchestration: Coordinating the ML Pipeline as a DAG
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
                <strong>Training orchestration</strong> manages the complete ML
                training lifecycle as a directed acyclic graph (DAG) of tasks.
                Each node represents a distinct operation like data preparation,
                feature computation, model training, evaluation, or model
                registration. The orchestrator schedules tasks in dependency
                order, handles retries, propagates metadata, and enables resume
                from checkpoints.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Control Plane vs Data Plane
            </p>
            <p style="margin-top: 0">
              The core design principle is separating concerns into two planes.
              The control plane handles orchestration logic: scheduling
              decisions, retry policies, timeout enforcement, and metadata
              tracking. The data plane executes the actual compute intensive
              work: reading gigabytes of training data, computing features
              across millions of rows, running gradient descent for hours on
              GPUs. This separation lets you scale compute independently from
              orchestration and swap out backends without rewriting pipeline
              logic.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Flow Pattern
            </p>
            <p style="margin-top: 0">
              In production, this typically flows as: orchestrator triggers a
              training run with specific parameters on a compute backend like
              Kubernetes, the training job logs metrics and parameters to an
              experiment tracker like MLflow, artifacts get written to object
              storage with versioned paths, and on successful validation the
              orchestrator promotes the model in a registry and triggers
              downstream inference pipelines.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Integration Architecture
            </p>
            <p style="margin-top: 0">
              The production pattern integrates workflow orchestrators (Airflow,
              Kubeflow Pipelines), compute backends (Kubernetes, Spark), and
              experiment trackers (MLflow) into a cohesive system where each
              component handles its specialty while metadata flows seamlessly
              between stages.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px; align-items: center">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Data Preparation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Validate schema, partition
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Feature Computation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Transform, aggregate
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">Model Training</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    GPU compute, checkpointing
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 13px">
                    Evaluation &amp; Registration
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Validate metrics, promote
                  </div>
                </div>
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
                  Control plane manages scheduling, retries, and metadata
                  tracking while data plane handles compute intensive operations
                  like feature generation and model training on separate
                  backends
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Steps must be idempotent and deterministic with explicit
                  versioned inputs and outputs stored in durable storage to
                  enable safe retries and backfills without data corruption
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Orchestrator triggers compute jobs asynchronously and polls
                  for completion rather than running compute directly, isolating
                  control plane load from data plane resource spikes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TheFork production pattern: Airflow orchestrates daily DAGs
                  with data freshness checks, batch backend executes training,
                  MLflow tracks experiments and manages model promotion through
                  registry
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pass artifact references like object storage uniform resource
                  identifiers (URIs) or database identifiers (IDs) between steps
                  instead of large payloads to avoid memory bottlenecks and
                  enable parallel execution
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
                  Netflix training pipeline: Airflow DAG validates that previous
                  24 hours of user interaction data arrived (freshness check),
                  triggers Spark job to compute user and item embeddings across
                  200M interactions, launches distributed TensorFlow training on
                  Kubernetes with 8 GPU nodes, logs metrics to internal
                  registry, and on Area Under the Curve (AUC) &gt; 0.82 promotes
                  model to staging
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber demand forecasting: Orchestrator checks that ride
                  completion events for target date exist in data warehouse,
                  runs feature computation across 50M trips with 200 features
                  per city, trains gradient boosting model per metropolitan area
                  in parallel, validates Mean Absolute Percentage Error (MAPE)
                  &lt; 15% threshold, registers models with metadata linking to
                  exact data snapshot and code commit for audit compliance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationTrainingOrchestrationCoordinatingTheMlPipelineAsADag;
