import type { Component } from "solid-js";

const LessonTrainingOrchestrationTrainingOrchestrationFailureModesInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Orchestration Failure Modes in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Backfill and Historical Rerun Failures
            </p>
            <p style="margin-top: 0">
              Backfills and historical reruns create the first major failure
              class. Kubeflow lacks native backfill support, forcing manual
              orchestration loops for reprocessing historical date ranges.
              Without proper idempotency and partitioning, concurrent backfill
              runs can double count training data or overwrite artifacts from
              other runs. When historical runs lack quota controls, they
              overwhelm clusters and starve daily production training jobs of
              resources. Organizations reprocessing 90 days of transaction data
              for model retraining have saturated their Kubernetes clusters,
              causing daily training SLA misses for hours until they added per
              namespace quotas and concurrency limits.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Environment Drift
            </p>
            <p style="margin-top: 0">
              Environment drift destroys reproducibility. Shared runtime
              orchestrators suffer works yesterday fails today when someone
              upgrades a shared library. Container based systems are not immune:
              base images that auto update without digest pinning create subtle
              behavior changes. One large recommendation system saw model
              quality drop 3 percent after an opencv library patch changed image
              preprocessing behavior, but the issue took days to debug because
              their container tags used latest instead of pinned digests.
              Missing dataset versioning in experiment tracking means audits and
              incident postmortems cannot exactly reproduce past runs because
              the underlying training data changed.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Resource Contention and Scheduling Failures
            </p>
            <p style="margin-top: 0">
              Resource contention and scheduling failures manifest differently
              by backend. GPU fragmentation happens when requested GPU shapes do
              not match node inventory: requesting 2 GPUs per job when nodes
              have 8 GPUs means 4 jobs per node, but if only 3 slots are free
              cluster wide, new jobs queue despite idle GPUs elsewhere.
              Distributed training stragglers from preemptions or slow nodes
              stretch training by 2 to 5 times without checkpointing and resume
              logic configured.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Freshness Failures
            </p>
            <p style="margin-top: 0">
              Data freshness failures occur when orchestrators lack strong
              sensors: training proceeds on partial partitions, downstream model
              metrics degrade silently, and the issue surfaces only when users
              notice recommendation quality dropped. Fail closed data quality
              gates are essential.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Backfill Failure</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    No concurrency limit → 50 parallel reruns → Cluster
                    saturation → Daily SLA miss
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Environment Drift</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Base image auto updates → Library patch changes behavior →
                    3% quality drop
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">GPU Fragmentation</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Request 2 GPU per job on 8 GPU nodes → 3 of 4 slots used →
                    Job queues despite idle GPUs
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Data Freshness</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Weak sensor → Train on partial partition → Silent quality
                    degradation in production
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
                  Backfills without native orchestrator support and concurrency
                  controls overwhelm clusters: one company saturated Kubernetes
                  for 6 hours when 90 day reprocessing starved daily training
                  SLAs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Environment drift from auto updating base images or shared
                  library upgrades breaks reproducibility: opencv patch caused
                  3% recommendation quality drop that took days to debug due to
                  lack of digest pinning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU fragmentation occurs when job requests do not align with
                  node inventory shapes, causing queue times despite idle GPU
                  capacity: requesting 2 GPUs per job on 8 GPU nodes wastes
                  capacity when only 3 slots used
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distributed training without checkpointing stretches training
                  duration 2 to 5 times on transient preemptions or stragglers,
                  turning 2 hour jobs into 10 hour failures without resume logic
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata race conditions in model registry from concurrent
                  promotions create drift between production tag and actually
                  deployed artifact, requiring atomic promotion policies with
                  optimistic locking
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
                  LinkedIn feed model: Weak data freshness sensor allowed
                  training on incomplete engagement partition with only 18 hours
                  of 24 hour data, model deployed with 8% lower NDCG, detected
                  only when online A/B test showed 4% drop in click through rate
                  (CTR), required emergency rollback and sensor enforcement
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Airbnb pricing pipeline: Concurrent backfill runs for 30
                  cities without idempotent partition keys caused duplicate
                  feature rows, gradient boosting model overfit on repeated
                  samples showing training loss 0.3 but validation loss 2.1,
                  required artifact cleanup and partition key redesign with city
                  plus date composite key
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonTrainingOrchestrationTrainingOrchestrationFailureModesInProduction;
