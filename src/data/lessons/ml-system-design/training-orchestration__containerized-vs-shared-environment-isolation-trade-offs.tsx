import type { Component } from "solid-js";

const LessonTrainingOrchestrationContainerizedVsSharedEnvironmentIsolationTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Containerized vs Shared Environment: Isolation Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Shared Environment Orchestrators
            </p>
            <p style="margin-top: 0">
              Two deployment models dominate with fundamentally different
              trade-offs. Shared environment orchestrators like traditional
              Airflow run all tasks in the same Python runtime on shared worker
              nodes. This enables fast iteration because there are no container
              image builds, developers can test locally with the same
              environment, and task startup latency is milliseconds. The cost is
              weaker isolation: dependency conflicts arise when different
              pipelines need incompatible library versions, one pipeline's
              memory leak can crash unrelated tasks, and reproducing exact
              environments months later becomes difficult without careful
              dependency pinning.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Containerized Orchestrators
            </p>
            <p style="margin-top: 0">
              Containerized orchestrators like Kubeflow Pipelines run each
              pipeline step in its own Docker container on Kubernetes. Every
              step declares its dependencies in a Dockerfile, gets its own
              isolated filesystem and process space, and can request specific
              hardware like 4 GPUs or 32 GB of memory. This strong isolation
              enables heterogeneous runtimes where one step uses TensorFlow 2.x
              with GPUs while the next uses PyTorch 1.x with only CPUs, supports
              strict multi-tenancy where team A cannot interfere with team B,
              and makes reproduction trivial by referencing exact container
              digests.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Build Time Cost
            </p>
            <p style="margin-top: 0">
              The significant cost is iteration speed: organizations report
              approximately 10 minutes of overhead per pipeline change for
              building Docker images and deploying to Kubeflow before they can
              even test the new version. Using slim base images, layer caching,
              and pre-built dependency images cuts this to under 2 minutes.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Criteria
            </p>
            <p style="margin-top: 0">
              The choice depends on your constraints. Kubernetes first
              organizations with existing cluster operations expertise and GPU
              intensive distributed training workloads favor containerized
              orchestration despite the DevOps overhead because GPU scheduling,
              autoscaling, and isolation are first class. Teams with primarily
              CPU bound feature engineering, strong backfill requirements, and
              rapid iteration needs favor shared environment orchestrators and
              manage isolation through virtual environments and testing
              discipline.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Shared Environment
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <div style="margin-bottom: 4px">
                      ✓ Task start: <strong>&lt;100ms</strong>
                    </div>
                    <div style="margin-bottom: 4px">✓ No image builds</div>
                    <div style="margin-bottom: 4px">✓ Fast local debug</div>
                    <div style="margin-bottom: 4px">✗ Dependency conflicts</div>
                    <div>✗ Weak isolation</div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                    Containerized
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    <div style="margin-bottom: 4px">✓ Strong isolation</div>
                    <div style="margin-bottom: 4px">✓ GPU scheduling</div>
                    <div style="margin-bottom: 4px">✓ Reproducible</div>
                    <div style="margin-bottom: 4px">
                      ✗ Build time: <strong>~10min</strong>
                    </div>
                    <div>✗ Cold start overhead</div>
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
                  Shared environment Airflow provides sub 100 millisecond task
                  startup and zero image build overhead but risks dependency
                  conflicts when pipelines need incompatible library versions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Containerized Kubeflow Pipelines enables heterogeneous
                  runtimes with GPU scheduling and strict multi-tenancy but adds
                  approximately 10 minutes of Docker build and deploy time per
                  iteration as observed at Exness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reproducibility differs: containers guarantee exact
                  environment via image digests, shared environments require
                  discipline with pinned requirements files and virtual
                  environment snapshots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Kubernetes native orchestration scales horizontally with pod
                  autoscaling and supports distributed training frameworks but
                  requires platform engineering for image lifecycle, node pools,
                  and quota management
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Hybrid approach works: use shared environment for fast
                  iterating feature pipelines with CPU workloads, containerized
                  execution for GPU intensive training and strict isolation
                  needs, unified by single experiment tracker
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
                  Uber experimentation platform: Uses shared Airflow environment
                  for daily feature computation DAGs processing 100M events with
                  Python workers, switches to containerized Kubernetes jobs for
                  deep learning model training requiring 8 Tesla V100 GPUs per
                  run, both log to central MLflow instance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix recommendation training: Containerized pipeline builds
                  custom image with TensorFlow, CUDA libraries, and internal
                  feature store client taking 8 minutes, enables reproducible
                  runs by pinning image digest in metadata, trades iteration
                  speed for guarantee that model trained 6 months ago can be
                  exactly rebuilt for audit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationContainerizedVsSharedEnvironmentIsolationTradeOffs;
