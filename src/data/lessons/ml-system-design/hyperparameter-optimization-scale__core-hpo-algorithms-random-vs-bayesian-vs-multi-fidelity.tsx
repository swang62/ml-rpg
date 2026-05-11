import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleCoreHpoAlgorithmsRandomVsBayesianVsMultiFidelity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Core HPO Algorithms: Random vs Bayesian vs Multi Fidelity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Random and Grid Search
            </p>
            <p style="margin-top: 0">
              Random and grid search serve as robust baselines that are
              embarrassingly parallel but inefficient. Grid search scales
              exponentially with dimensions (10 values across 5 hyperparameters
              requires 100,000 trials), making it impractical beyond 3 to 4
              dimensions. Random search finds good regions faster by sampling
              the space uniformly, but without pruning it wastes budget
              evaluating unpromising configurations to full fidelity.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Bayesian Optimization
            </p>
            <p style="margin-top: 0">
              Bayesian Optimization (BO) builds a surrogate model of the
              objective using Gaussian Processes, Tree structured Parzen
              Estimators, or random forest surrogates, then selects new points
              via acquisition functions like Expected Improvement. BO shines
              when each evaluation is expensive (minutes to hours) and
              parallelism is moderate at 8 to 64 concurrent trials. In practice,
              BO requires 3 to 10 times fewer full budget trials than random
              search to reach similar quality. The tradeoff is that BO requires
              careful handling of categorical and conditional spaces.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi Fidelity Methods
            </p>
            <p style="margin-top: 0">
              Bandit based multi fidelity methods like Successive Halving,
              Hyperband, and ASHA allocate small budgets (a fraction of epochs
              or subset of data) to many configs, then promote only the top
              quantiles to larger budgets. ASHA typically defines 3 to 5 rungs
              with downsampling factor of 3 to 5 per rung, promoting the top 20
              to 30 percent at each checkpoint. This approach prunes 70 to 95
              percent of trials after they consume only 10 to 30 percent of
              their full budget.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Trade-offs
            </p>
            <p style="margin-top: 0">
              Multi fidelity scales to hundreds of workers and achieves near
              linear wall clock speedup. The limitation is that it requires a
              meaningful fidelity axis and can occasionally prune late bloomers
              that start slow but converge better.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 12px; justify-content: space-around">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Random Search</strong>
                  <div style="font-size: 11px; margin-top: 8px">200 trials</div>
                  <div style="font-size: 11px">100% to completion</div>
                  <div style="font-size: 11px; margin-top: 4px">Cost: $20K</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">Bayesian Opt</strong>
                  <div style="font-size: 11px; margin-top: 8px">60 trials</div>
                  <div style="font-size: 11px">3x fewer evals</div>
                  <div style="font-size: 11px; margin-top: 4px">Cost: $6K</div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                  <strong style="font-size: 13px">ASHA</strong>
                  <div style="font-size: 11px; margin-top: 8px">200 trials</div>
                  <div style="font-size: 11px">80% pruned early</div>
                  <div style="font-size: 11px; margin-top: 4px">Cost: $6K</div>
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
                  Bayesian Optimization reduces full fidelity evaluations by 3
                  to 10x compared to random search but only effective with 8 to
                  64 concurrent workers; larger batches degrade suggestion
                  quality unless using trust regions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  ASHA prunes 70 to 95% of configs after 10 to 30% budget by
                  promoting only top 20 to 30% at each rung, cutting costs by 60
                  to 70% while scaling to hundreds of workers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Grid search becomes impractical beyond 3 to 4 dimensions
                  because trials grow exponentially; 10 values per dimension
                  across 5 hyperparameters requires 100,000 evaluations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi fidelity requires meaningful correlation between cheap
                  proxy (10% of epochs) and expensive full evaluation; if
                  correlation is weak below 0.6, pruning decisions become
                  unreliable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Bayesian Optimization can overfit noisy objectives; symptoms
                  include surrogate model predicting improvements that do not
                  materialize, requiring robustness aware acquisitions and
                  metric smoothing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Random search remains competitive when search space is under 4
                  dimensions or evaluation is cheap (under 5 minutes), because
                  BO overhead for surrogate modeling exceeds savings
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
                  Meta Ax uses batch acquisitions with q Expected Improvement
                  for 8 to 64 concurrent trials; for a ranking model taking 2 to
                  8 GPU hours per trial, 100 trial campaign completes in under
                  24 hours on 256 GPU pool
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Vizier applies median stopping rule that prunes trials
                  performing worse than median at 10%, 30%, 50% progress
                  checkpoints, eliminating 60 to 90% of trials before full
                  budget
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  DeepMind published Population Based Training with population
                  size 20 to 80, exploiting and exploring every 1 to 5 epochs,
                  achieving 1.5 to 3x wall clock speedup on reinforcement
                  learning and language modeling tasks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleCoreHpoAlgorithmsRandomVsBayesianVsMultiFidelity;
