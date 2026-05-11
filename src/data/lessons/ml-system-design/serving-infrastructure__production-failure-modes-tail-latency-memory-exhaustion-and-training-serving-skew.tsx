import type { Component } from "solid-js";

const LessonServingInfrastructureProductionFailureModesTailLatencyMemoryExhaustionAndTrainingServingSkew: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Failure Modes: Tail Latency, Memory Exhaustion, and
            Training Serving Skew
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Tail Latency Blowups
            </p>
            <p style="margin-top: 0">
              The most common production failure is tail latency blowups from
              dynamic batching under spiky traffic: your p50 latency looks great
              at 15 milliseconds, GPU utilization hovers at 40%, yet p95 latency
              violates SLOs at 200 milliseconds. This happens when batch
              formation windows wait for requests that arrive slowly during
              traffic valleys. Requests sit in queue burning latency budget
              before any computation starts. The fix is counterintuitive: reduce
              batch window timeouts or disable batching entirely for low QPS
              periods, accepting lower device utilization to meet tail latency
              commitments.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Exhaustion
            </p>
            <p style="margin-top: 0">
              Device memory exhaustion crashes services silently or causes
              unpredictable evictions. A model that fits comfortably in GPU
              memory during development can exceed capacity in production when
              batching, concurrency, and multiple model versions combine. For
              example, a 2 GB model with batch size 32 and activation memory of
              4 GB per batch running with concurrency 2 needs 2 GB plus 2 times
              4 GB equals 10 GB minimum, exceeding many GPU budgets. Teams
              enforce per model memory budgets at deploy time: batch size
              multiplied by activation footprint multiplied by concurrency must
              be under device capacity with 20% headroom. Violating this causes
              OOM errors mid request, returning cryptic failures to clients.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training Serving Skew
            </p>
            <p style="margin-top: 0">
              This creates silent accuracy degradation that only appears in
              production. Models trained on batch computed features but served
              with real time features can experience 10% to 20% accuracy drops.
              A ranking model trained on user embeddings computed daily but
              served with embeddings computed on demand per request will see
              distribution shift if the computation differs slightly (different
              aggregation windows, missing features, ordering changes).
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigation Strategy
            </p>
            <p style="margin-top: 0">
              Combat training serving skew with feature store abstractions that
              guarantee identical computation offline and online, and automated
              validation that compares training feature distributions against
              serving feature distributions in shadow mode before rollout.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 4px">
                  GPU Memory Exhaustion Example
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    GPU Memory Budget: 16 GB
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 12px">Model weights: 2 GB</strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Batch 32 activations: 4 GB
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Concurrency 2: 2 × 4 GB = 8 GB
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 12px">Total: 2 + 8 = 10 GB</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    No headroom → OOM risk
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
                  Tail latency from batching under spiky traffic: p50 at 15
                  milliseconds and 40% GPU utilization but p95 at 200
                  milliseconds because batch windows wait for slow arriving
                  requests, consuming latency budget in queue before computation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  GPU memory exhaustion formula: model weights plus batch size
                  multiplied by activation memory multiplied by concurrency must
                  stay under device capacity with 20% headroom to avoid out of
                  memory crashes
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training serving skew causes silent accuracy drops of 10% to
                  20% when models trained on batch computed features are served
                  with real time features that differ in aggregation windows,
                  missing values, or computation order
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Cold start and version thrash: loading multiple large model
                  versions causes memory churn and long warmup times during
                  rollouts, mitigation is limiting active versions to under 2 on
                  memory constrained GPUs and prewarm before traffic shift
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  CPU bound preprocessing hides GPU underutilization: heavy
                  decode, resize, or augmentation steps saturate CPUs while GPUs
                  idle, appearing as low device utilization despite saturated
                  service
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Noisy neighbor in multi tenant GPU: hot model soaks scheduler
                  causing head of line blocking for other models, requires per
                  model queues and weighted fair sharing or device pinning for
                  isolation
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
                  Uber ride matching service disabled dynamic batching during
                  low QPS overnight hours (under 100 requests per second) after
                  observing p99 latency spike from 50 milliseconds to 180
                  milliseconds, accepting 30% lower GPU utilization to maintain
                  SLO
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Medical imaging service hit OOM errors after adding second
                  model version for A/B test: each 3 GB model with batch 8 and
                  activations 5 GB needed 3 plus 8 times 5 equals 43 GB per
                  version, exceeding 16 GB V100 capacity, fixed by limiting
                  batch size to 4
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pinterest recommendation model showed 15% precision drop in
                  production versus offline validation due to training serving
                  skew: training used 7 day user embedding aggregation, serving
                  used 1 day due to data pipeline lag, fixed with feature store
                  guaranteeing identical windows
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonServingInfrastructureProductionFailureModesTailLatencyMemoryExhaustionAndTrainingServingSkew;
