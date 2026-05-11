import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleWarmStartTransferLearningAndMultiObjectiveHpo: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Warm Start, Transfer Learning, and Multi Objective HPO
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Warm Starting
            </p>
            <p style="margin-top: 0">
              Warm starting from prior experiments on similar data or models can
              cut required trials by 2 to 5 times in practice. The idea is to
              initialize the search using historical knowledge: set priors for
              hyperparameter ranges based on distributions of past successful
              configs, anchor the initial design around known good regions, or
              directly transfer the best config from a related task as the
              starting point. The risk is bias when task drift is significant;
              if the data distribution or architecture changed substantially,
              the prior can trap search in a suboptimal basin.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Transfer Learning for HPO
            </p>
            <p style="margin-top: 0">
              Transfer learning for HPO often uses meta features like dataset
              statistics (number of examples, feature dimensionality, class
              balance) or model characteristics (layer count, parameter count)
              to gate whether to apply a prior. Systems at Google Vizier and
              Meta Ax maintain registries of prior studies with their configs
              and outcomes. When starting a new study, they compute similarity
              scores and blend the most relevant priors with exploration.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Multi Objective Optimization
            </p>
            <p style="margin-top: 0">
              Multi objective and constrained optimization handles real
              production requirements like maximizing accuracy subject to
              inference latency under 100 milliseconds or model size under 500
              megabytes for mobile deployment. Constrained Bayesian Optimization
              models both the objective and constraint surfaces, selecting
              candidates that maximize expected improvement while staying
              feasible. Pareto optimization maintains a frontier of non
              dominated solutions.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Requirements
            </p>
            <p style="margin-top: 0">
              In practice, multi objective search needs larger initial designs
              (50 to 100 quasi random seeds) to adequately sample the feasible
              region. Netflix and Uber commonly use constrained BO to tune
              models that must meet SLAs on latency percentiles and throughput
              while maximizing model quality metrics.
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
                  Warm start from prior tasks cuts trials by 2 to 5x by seeding
                  30 to 50% of initial design around historical best configs and
                  using priors to narrow hyperparameter ranges based on past
                  distributions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Transfer learning risk is bias when task drift is significant
                  (new data distribution, different architecture); use meta
                  features (dataset size, class balance) to compute similarity
                  and gate whether to apply prior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi objective constrained search (maximize accuracy with
                  latency under 100 milliseconds) requires larger initial design
                  of 50 to 100 seeds to model feasible region and constraint
                  boundaries accurately
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pareto optimization maintains frontier of non dominated
                  solutions; for accuracy vs latency, might find 10 to 20
                  configs spanning trade off from 80% accuracy at 50
                  milliseconds to 85% accuracy at 150 milliseconds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems like Uber Michelangelo and Netflix use
                  constrained Bayesian Optimization to meet service level
                  agreements (p99 latency, minimum throughput) while maximizing
                  business metrics (NDCG, CTR)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warm start metadata registry at Google Vizier and Meta Ax
                  stores prior studies with configs, outcomes, and context
                  (dataset version, model architecture); new studies query
                  registry by similarity to retrieve relevant priors
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
                  Uber Michelangelo AutoTune warm start API lets teams inject
                  best configs from previous model versions, then refine with 50
                  to 100 additional trials exploring nearby regions for 2 to 3x
                  faster convergence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Netflix tunes recommendation models with constrained Bayesian
                  Optimization: maximize Normalized Discounted Cumulative Gain
                  (NDCG) subject to p99 inference latency under 150 milliseconds
                  and model size under 500 megabytes for edge deployment
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Meta Ax maintains study registry with metadata tags (model
                  family, task type, dataset characteristics); when starting new
                  ranking model tuning, it retrieves top 3 similar studies and
                  seeds initial design with their Pareto optimal configs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleWarmStartTransferLearningAndMultiObjectiveHpo;
