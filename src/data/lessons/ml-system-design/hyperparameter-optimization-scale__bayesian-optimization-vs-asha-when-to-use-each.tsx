import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleBayesianOptimizationVsAshaWhenToUseEach: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Bayesian Optimization vs ASHA: When to Use Each
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use Bayesian Optimization
            </p>
            <p style="margin-top: 0">
              Bayesian Optimization excels when each evaluation is expensive
              (minutes to hours), search spaces are modestly sized at 50 or
              fewer effective dimensions, and you can run parallel batches of 8
              to 64 trials. BO builds a surrogate model (commonly Gaussian
              Process or random forest) that learns which regions of
              hyperparameter space are promising, then uses acquisition
              functions to balance exploration and exploitation. Meta's Ax
              commonly seeds with 20 to 50 Sobol quasi random points, then
              iterates with batches of 8 to 64. The limitation is that BO
              struggles above 64 parallel workers because batch acquisition
              quality degrades without sophisticated penalization.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              When to Use ASHA
            </p>
            <p style="margin-top: 0">
              ASHA works best when you can define a meaningful fidelity axis
              like epochs, gradient steps, or data fraction, and you need to
              scale to hundreds or thousands of workers. ASHA allocates small
              budgets to many configs and promotes only the top 20 to 30 percent
              at each rung based on intermediate metrics. Production deployments
              commonly see 70 to 95 percent of trials pruned after consuming 10
              to 30 percent of their full budget, cutting costs by 60 to 70
              percent. ASHA achieves near linear wall clock speedup with
              concurrency and maintains over 80 percent GPU utilization.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Population Based Training
            </p>
            <p style="margin-top: 0">
              For nonstationary settings where optimal hyperparameters change
              during training (learning rate schedules, data augmentation
              intensity), Population Based Training (PBT) offers continuous
              adaptation. PBT co trains a population of 20 to 80 models,
              periodically copying weights from top performers and perturbing
              hyperparameters. DeepMind reported 1.5 to 3 times wall clock
              speedup on reinforcement learning and language modeling.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              ASHA Trade-off
            </p>
            <p style="margin-top: 0">
              The tradeoff with ASHA is that it can prune late bloomers if the
              fidelity proxy (performance at 10 percent budget) correlates
              weakly with final performance (correlation under 0.6 makes pruning
              unreliable).
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
                  Use Bayesian Optimization when trials cost 30 minutes to 8
                  hours each and you run 8 to 64 concurrent workers; expect 3 to
                  10x fewer full budget trials than random search for similar
                  quality
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose ASHA when you can define fidelity axis (epochs, steps,
                  tokens) and need to scale to 100+ workers; ASHA prunes 70 to
                  95% of configs after 10 to 30% budget and achieves 80%+ GPU
                  utilization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bayesian Optimization batch quality degrades above 64 parallel
                  workers unless using trust regions or strong penalization
                  around pending points; large batches revert toward random
                  exploration
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ASHA requires fidelity proxy (performance at 10% budget) to
                  correlate above 0.6 with final performance; weak correlation
                  causes pruning of late bloomers that start slow but converge
                  best
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Population Based Training suits nonstationary problems where
                  optimal hyperparameters shift during training (learning rate
                  decay, augmentation schedules); achieves 1.5 to 3x wall clock
                  speedup but requires full population running simultaneously
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi objective constraints (maximize accuracy subject to
                  latency under 100 milliseconds or memory under 4 gigabytes)
                  require constrained Bayesian Optimization or Pareto methods;
                  expect to need 50 to 100 initial seeds to model feasible
                  regions
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
                  Meta Ax uses batch Bayesian Optimization with 8 to 64
                  concurrent trials for ranking models where single trial takes
                  2 to 8 GPU hours; 100 trial campaign completes in under 24
                  hours on 256 GPU pool with early stopping
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Vizier combines Bayesian Optimization with median
                  stopping to prune 60 to 90% of trials; for expensive deep
                  models, this reduces full fidelity evaluations by 3 to 10x
                  versus random baseline
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capital One parallelized GAN training with hundreds of trials
                  using bandit based scheduler, reducing tuning from weeks to
                  under 1 day and achieving 30% higher success rate than manual
                  tuning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleBayesianOptimizationVsAshaWhenToUseEach;
