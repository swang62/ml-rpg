import type { Component } from "solid-js";

const LessonHyperparameterOptimizationScaleWhatIsHyperparameterOptimizationAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Hyperparameter Optimization at Scale?
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
                <strong>Hyperparameter Optimization (HPO) at scale</strong>{" "}
                searches large, high dimensional configuration spaces to find
                model settings that maximize an objective like AUC or RMSE when
                each evaluation costs real money and time. The objective behaves
                as a black box with noisy, nonconvex, and occasionally
                nonstationary behavior.
              </div>
            </div>
            <p style="margin-top: 16px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Economic Reality
            </p>
            <p style="margin-top: 0">
              A single deep model trial can consume 8 GPUs for 3 hours, which
              equals 24 GPU hours. At $2 to $4 per GPU hour, that single trial
              costs $48 to $96. A 200 trial campaign without any optimization
              would cost $10,000 to $20,000. This economic reality drives
              production systems toward asynchronous, multi fidelity, and cost
              aware search strategies that can prune 70 to 95 percent of trials
              early while maintaining high cluster utilization above 80 percent.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              System Requirements
            </p>
            <p style="margin-top: 0">
              The system must maintain reproducibility across experiments,
              fairness across teams competing for resources, and robust failure
              handling when spot instances get preempted or trials diverge.
            </p>
            <p style="margin-top: 14px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Production Scale
            </p>
            <p style="margin-top: 0">
              Production HPO services at companies like Google (Vizier), Meta
              (Ax), and Netflix coordinate hundreds to thousands of concurrent
              workers, manage checkpointing every 2 to 10 minutes to survive
              failures, and track lineage connecting every model back to its
              exact hyperparameters, dataset version, and code commit.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Search Space</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    10⁵⁰ possible configs
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">HPO System</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    256 parallel workers
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 200px; text-align: center">
                  <strong style="font-size: 14px">Best Config Found</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    200 trials, $2K cost
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
                  Single deep model trial costs $48 to $96 (8 GPUs × 3 hours ×
                  $2 to $4/hour), making naive search prohibitively expensive at
                  200 trials costing $10,000 to $20,000
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Multi fidelity pruning drops 70 to 95% of trials after
                  consuming only 10 to 30% of their full budget, reducing total
                  spend by 60 to 70% while finding similar quality solutions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Production systems coordinate 100 to 1,000 trials per study
                  with 16 to 512 concurrent workers, achieving near linear wall
                  clock speedup and over 80% GPU utilization despite stragglers
                  and preemptions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Objective behaves as noisy black box because training has
                  stochastic gradient descent randomness, data shuffling, and
                  hardware nondeterminism that cause 2 to 5% metric variance
                  between identical configs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  System must handle spot instance preemptions by checkpointing
                  every 2 to 10 minutes, balancing checkpoint overhead (storage
                  I/O cost) against risk of losing partial trial progress
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Reproducibility requires capturing all metadata including
                  random seeds, dataset versions, feature snapshots, code
                  commits, and hardware types to enable audit and comparison
                  across experiments
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
                  Netflix runs thousands of parallel HPO tasks via workflow
                  engine on elastic cloud compute, using early stopping to cut
                  spend and checkpointing to survive spot preemptions that can
                  terminate 50 to 70% of instances within 2 hours
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Google Vizier handles concurrent studies across product teams,
                  with Bayesian optimization batches of 8 to 32 parallel trials
                  reducing high fidelity evaluations by 3 to 10x compared to
                  random search for expensive deep models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Capital One reduced GAN training tuning from weeks or months
                  to under 1 day by parallelizing dozens to hundreds of trials
                  with centralized orchestration, achieving 30% higher success
                  rate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHyperparameterOptimizationScaleWhatIsHyperparameterOptimizationAtScale;
