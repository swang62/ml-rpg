import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleHpoFailureModesAndProductionMitigations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            HPO Failure Modes and Production Mitigations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Validation Overfitting
            </p>
            <p style="margin-top: 0">
              Validation overfitting occurs when repeatedly evaluating the same
              validation set inflates metrics artificially. A hyperparameter
              search might try 200 configurations all evaluated on the same
              10,000 examples, effectively doing statistical multiple testing
              without correction. Symptoms include models showing 2 to 5 percent
              better validation metrics but large drops on holdout test sets.
              Mitigations include nested validation where each trial uses a
              different validation fold, maintaining a final unseen test set, or
              using repeated K fold cross validation.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Noisy Objectives
            </p>
            <p style="margin-top: 0">
              Noisy or nonstationary objectives break both Bayesian Optimization
              and early stopping assumptions. Training with stochastic gradient
              descent, data shuffling, and hardware nondeterminism causes 2 to 5
              percent metric variance between identical configs. Early stopping
              can prune late bloomers whose validation loss oscillates early but
              converges better after 50 percent budget. BO surrogates overfit
              the noise, predicting improvements that never materialize.
              Mitigations include quantile based promotions in ASHA, replicating
              promising configs 2 to 3 times and averaging results, and
              smoothing metrics over windows.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Runtime Skew
            </p>
            <p style="margin-top: 0">
              Runtime skew from heterogeneous resources causes unfair pruning.
              Larger models or slower GPU types run behind schedule and get
              pruned in time based rungs despite having better loss
              trajectories. A trial on a V100 GPU might reach step 5000 in 2
              hours while the same config on an A100 reaches it in 1 hour; time
              based early stopping would prune the V100 trial unfairly.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Mitigations
            </p>
            <p style="margin-top: 0">
              Define fidelity by fixed steps or epochs rather than wall clock
              time, normalize progress by tokens seen or gradient steps, record
              hardware metadata to compare like with like, and explicitly
              optimize objective per unit time when hardware cost matters.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Validation Overfitting
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    200 trials on same 10K examples
                  </div>
                  <div style="font-size: 11px">
                    Val: 0.85 AUC → Test: 0.80 AUC
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Noisy Objectives</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Same config: 0.82 to 0.86 AUC
                  </div>
                  <div style="font-size: 11px">BO surrogate overfits noise</div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Runtime Skew</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    V100: 5K steps in 2 hrs
                  </div>
                  <div style="font-size: 11px">A100: 5K steps in 1 hr</div>
                  <div style="font-size: 11px">Time based pruning unfair</div>
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
                  Validation overfitting from 200 trials on same validation set
                  causes 2 to 5% inflated metrics versus true holdout; mitigate
                  with nested validation or final unseen test set approval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Noisy objectives with 2 to 5% variance between identical
                  configs cause Bayesian Optimization surrogates to overfit and
                  early stopping to prune late bloomers; smooth metrics over 500
                  step windows and use quantile based promotions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Runtime skew from heterogeneous GPUs (V100 vs A100) causes
                  unfair time based pruning; define fidelity by gradient steps
                  or epochs not wall clock time, and record hardware metadata
                  for fair comparison
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Spot preemptions terminate 50 to 70% of instances within 2
                  hours; without checkpointing every 2 to 10 minutes, you lose
                  partial progress and bias results toward faster configs that
                  finish before preemption
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mis specified search spaces with overly wide ranges or ignored
                  conditional dependencies waste budget; after 50 to 100 trials
                  compute hyperparameter importance and shrink ranges, often
                  halving remaining budget needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Central optimizer becomes throughput bottleneck above 1000
                  workers (queueing, increased tail latencies, underutilized
                  GPUs); shard suggest and evaluate services or use eventual
                  consistency for non critical telemetry
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
                  Google and Meta enforce holdout discipline by snapshotting
                  validation data at study start and requiring final model
                  approval on separate test set to catch validation overfitting
                  before production deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix checkpoints every 2 to 10 minutes to survive spot
                  preemptions affecting 50 to 70% of instances; checkpoint
                  overhead kept under 5% of training time by tuning checkpoint
                  frequency and storage backend
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems record hardware metadata (GPU type, driver
                  version, CUDA version) for every trial to enable fair
                  comparison and detect when runtime skew causes systematic bias
                  in early stopping decisions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleHpoFailureModesAndProductionMitigations;
