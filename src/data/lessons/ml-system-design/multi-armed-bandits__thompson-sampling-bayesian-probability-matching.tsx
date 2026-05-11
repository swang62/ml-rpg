import type { Component } from "solid-js";

const LessonMultiArmedBanditsThompsonSamplingBayesianProbabilityMatching: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Thompson Sampling: Bayesian Probability Matching
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE BAYESIAN APPROACH
            </p>
            <p style="margin-top: 0">
              Thompson Sampling maintains a probability distribution (posterior)
              over each arm's true reward rate. Instead of computing a single
              point estimate, it treats the reward rate as uncertain. For binary
              rewards (click/no-click), the Beta distribution is the natural
              choice. Each arm starts with Beta(1,1), which is uniform over
              [0,1], representing complete uncertainty.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HOW IT WORKS
            </p>
            <p style="margin-top: 0">
              At each decision: (1) Sample one value from each arm's Beta
              posterior. (2) Select the arm with the highest sample. (3) Observe
              the reward. (4) Update that arm's posterior:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                Beta(α, β) → Beta(α + success, β + failure)
              </code>
              . The posterior automatically balances exploration and
              exploitation. Arms with high uncertainty produce samples that
              sometimes beat the current leader, triggering exploration. As
              uncertainty shrinks, high-reward arms consistently win.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTATIONAL COST
            </p>
            <p style="margin-top: 0">
              Sampling from 10-20 Beta distributions takes under 1 millisecond.
              The argmax over samples is trivial. This fits easily in a 5-10ms
              latency budget at 100k+ QPS. Storage is minimal: two integers (α,
              β) per arm. The entire state for 20 arms fits in 160 bytes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Thompson Sampling has no
              exploration parameter to tune. The posterior uncertainty
              automatically drives exploration. This makes it more robust than
              UCB when you cannot tune parameters carefully.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              INFORMATIVE PRIORS
            </p>
            <p style="margin-top: 0">
              If you expect an arm to have ~10% click rate, start with Beta(3,
              27) instead of Beta(1,1). This encodes prior knowledge without
              requiring observations. Informative priors help when you have
              domain knowledge or historical data about similar arms.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; margin-bottom: 8px">
                  <strong style="font-size: 15px">
                    Thompson Sampling Decision Process
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Arm A: Beta(121, 879)</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Posterior mean = 0.121
                  </div>
                  <div style="font-size: 13px; font-weight: bold">
                    Sampled value = 0.115
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Arm B: Beta(6, 44)</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Posterior mean = 0.120
                  </div>
                  <div style="font-size: 13px; font-weight: bold">
                    Sampled value = 0.143 ← Selected!
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Arm C: Beta(56, 444)</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Posterior mean = 0.112
                  </div>
                  <div style="font-size: 13px; font-weight: bold">
                    Sampled value = 0.108
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border-radius: 6px; font-size: 13px">
                  <strong>Why B wins:</strong> Despite similar mean to A, B has
                  higher uncertainty (fewer observations). Wide posterior
                  occasionally samples high values, ensuring exploration.
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
                  Maintains Beta(α, β) posterior per arm; update rule is Beta(α
                  + success, β + failure)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Select arm by sampling from each posterior and taking argmax;
                  no exploration parameter needed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Submillisecond computation: 10-20 Beta samples plus argmax at
                  100k+ QPS
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Informative priors like Beta(3, 27) encode domain knowledge;
                  useful when you expect ~10% CTR
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
                  Explain the Bayesian update: after seeing a click, Beta(1,1)
                  becomes Beta(2,1); after seeing no-click, Beta(1,2)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  When asked why Thompson over UCB: no exploration parameter to
                  tune, posterior uncertainty handles exploration automatically
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention informative priors to show depth: if historical data
                  suggests 10% CTR, start with Beta(3, 27)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiArmedBanditsThompsonSamplingBayesianProbabilityMatching;
