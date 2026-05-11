import type { Component } from "solid-js";

const LessonDiversityExplorationCoreBanditAlgorithmsEpsilonGreedyUcbAndThompsonSampling: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Core Bandit Algorithms: Epsilon Greedy, UCB, and Thompson Sampling
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Epsilon-greedy</strong> is the simplest exploration
                strategy: with probability epsilon, show a random item;
                otherwise show the best predicted item. Easy to implement, easy
                to tune, but exploration is untargeted.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Epsilon-Greedy Works
            </p>
            <p style="margin-top: 0">
              For each recommendation slot: generate random number between 0 and
              1. If below epsilon (say 0.1), pick a random item from the
              catalog. If above epsilon, pick the highest-scoring item from your
              model. Typical epsilon values: 0.05 to 0.15 depending on how much
              exploration you can afford.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              UCB: Upper Confidence Bound
            </p>
            <p style="margin-top: 0">
              UCB adds optimism to uncertainty. For each item, compute{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                score = predicted_value + exploration_bonus
              </code>
              . The bonus is larger for items with fewer observations. Items
              that have been shown rarely get higher bonuses, encouraging
              exploration. As observations accumulate, bonus shrinks and
              exploitation dominates.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Thompson Sampling
            </p>
            <p style="margin-top: 0">
              Model uncertainty as a probability distribution over the true
              reward. For each item, sample from its distribution and pick the
              item with highest sampled value. Items with high variance
              (uncertainty) occasionally sample high and get selected. Natural
              exploration without explicit exploration term. Often outperforms
              UCB in practice.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Interview Pattern:</strong> When asked about
              exploration, explain epsilon-greedy first (simple baseline), then
              UCB (adds optimism to uncertainty), then Thompson Sampling
              (probabilistic, state of the art). Show you understand the
              progression from simple to sophisticated.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Epsilon Greedy (ε=0.1)
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Random arm with 10% probability
                    <br />
                    Best mean arm with 90% probability
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Upper Confidence Bound
                  </strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Pick arm with max: mean + sqrt(2×log(T)/n)
                    <br />
                    Uncertainty bonus shrinks with samples
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px">
                  <strong style="font-size: 13px">Thompson Sampling</strong>
                  <div style="margin-top: 6px; font-size: 12px">
                    Sample from Beta(clicks+α, misses+β)
                    <br />
                    Pick arm with highest sample value
                    <br />
                    <span style="font-weight: bold">
                      Production choice (Udemy, Expedia)
                    </span>
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
                  Epsilon-greedy is simplest (explore with probability ε,
                  typically 5-10%) but inefficient because it explores uniformly
                  even when some arms are clearly inferior.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  UCB (Upper Confidence Bound) selects the arm with highest
                  upper confidence bound, providing principled exploration that
                  decreases as observations accumulate.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thompson Sampling maintains posterior distributions over arm
                  rewards, samples from each, and picks the arm with highest
                  sample. Naturally balances exploration with uncertainty.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Thompson Sampling empirically outperforms other algorithms in
                  practice and is the production standard. It naturally
                  transitions from exploration to exploitation as posteriors
                  sharpen.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  All algorithms eventually converge to the optimal arm; the
                  difference is regret accumulated during learning. Thompson
                  Sampling typically achieves near-optimal regret bounds.
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
                  When explaining Thompson Sampling: describe Beta(successes+1,
                  failures+1) posteriors for binary outcomes; sample from each
                  arm, pick the highest sample; natural exploration from
                  uncertainty.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For interview depth: mention that TS is Bayes-optimal for
                  single-period decisions and achieves near-optimal regret
                  bounds without explicit exploration parameters to tune.
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked about convergence: explain that TS naturally
                  reduces exploration as posteriors sharpen; arms with 1000
                  observations have tight distributions, rarely sampled if
                  behind.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDiversityExplorationCoreBanditAlgorithmsEpsilonGreedyUcbAndThompsonSampling;
