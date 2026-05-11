import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleProductionHpoSystemArchitecture: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production HPO System Architecture
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Control Plane
            </p>
            <p style="margin-top: 0">
              A production HPO system splits into control plane and data plane.
              The control plane contains the suggestion service that maintains
              study state, search algorithm logic, and acquisition decisions.
              For Bayesian Optimization, this implements batch acquisitions like
              q Expected Improvement with penalization around pending and
              evaluated points to avoid redundant exploration. For categorical
              and conditional spaces, it uses tree structured or mixed surrogate
              models. The suggestion service must support asynchronous requests
              where workers pull suggestions without waiting for others.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Scheduler and Early Stopping
            </p>
            <p style="margin-top: 0">
              The scheduler places trials on compute using bin packing for multi
              GPU trials, enforces quotas for multi tenant fairness, and
              implements preemption policies. At scale with 256 to 512 workers,
              the scheduler becomes a throughput bottleneck if centralized.
              Production systems shard the suggest and evaluate services. The
              early stopping service consumes partial metrics streamed from
              workers and applies pruning rules. For ASHA, it maintains rungs at
              increasing fidelities and promotes top 20 to 30 percent based on
              intermediate objective.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Data Plane
            </p>
            <p style="margin-top: 0">
              The data plane consists of workers that pull suggestions, run
              training with periodic metric reporting every N steps (typically
              every 100 to 500 gradient steps), checkpoint frequently to survive
              spot preemptions, and expose health signals like loss divergence
              or out of memory errors.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Metadata and Lineage
            </p>
            <p style="margin-top: 0">
              The metadata store persists search spaces, seeds, suggestions,
              intermediate metrics, checkpoints, and final artifacts with full
              lineage connecting model to hyperparameters, dataset version, and
              code commit. This lineage is critical for reproducibility and
              auditability when debugging production model quality degradation.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Control Plane</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Suggestion Service (BO/ASHA)
                  </div>
                  <div style="font-size: 11px">
                    Scheduler (bin pack 256 GPUs)
                  </div>
                  <div style="font-size: 11px">
                    Early Stop (prune 80% at rung 1)
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Metadata Store</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Lineage: config + data + code
                  </div>
                  <div style="font-size: 11px">Checkpoints every 5 min</div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Data Plane</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    512 Workers (8 GPUs each)
                  </div>
                  <div style="font-size: 11px">
                    Report metrics every 100 steps
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
                  Suggestion service becomes throughput bottleneck above 1000
                  workers sending metric updates and requesting new configs;
                  sharding or eventual consistency required to avoid queueing
                  and GPU underutilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ASHA maintains 3 to 5 rungs at increasing fidelity with
                  downsampling factor 3 to 5 per rung; promoting top 20 to 30%
                  at each checkpoint achieves 70 to 95% pruning after 10 to 30%
                  budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Workers checkpoint every 2 to 10 minutes to survive spot
                  preemptions; checkpoint overhead (storage I/O) must stay under
                  5% of training time or it degrades throughput
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Metadata store must capture full lineage including random
                  seeds, dataset snapshots, feature versions, and code commits;
                  without this, debugging 2 to 5% metric variance between runs
                  becomes impossible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Batch acquisition for Bayesian Optimization penalizes regions
                  around pending points to avoid redundant exploration; without
                  penalization, parallel workers often evaluate near identical
                  configs wasting budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Early stopping service needs to handle noisy metrics by
                  smoothing over windows (moving average of last 500 steps) or
                  using quantile based promotions to avoid pruning late bloomers
                  that converge slowly
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
                  Google Vizier implements asynchronous suggestions with median
                  stopping rule; for expensive deep models, batches of 8 to 32
                  parallel trials reduce full fidelity evaluations by 3 to 10x
                  versus random search
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Uber Michelangelo AutoTune provides study level APIs to define
                  search spaces and objectives, supporting warm start from
                  historical metadata and cost aware scheduling across
                  heterogeneous CPU and GPU pools
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix workflow engine orchestrates thousands of parallel
                  tasks on elastic cloud with checkpointing to survive spot
                  preemptions affecting 50 to 70% of instances within 2 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleProductionHpoSystemArchitecture;
