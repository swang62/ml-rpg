import type { Component } from "solid-js";

const LessonMultiArmedBanditsFailureModesDelayedRewardsAndNonstationarity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Delayed Rewards and Nonstationarity
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DELAYED REWARDS
            </p>
            <p style="margin-top: 0">
              Bandits assume rewards arrive quickly after decisions. But
              conversions may take hours or days. If you optimize for clicks
              (fast feedback), you may favor clickbait over high-quality content
              that converts later. The bandit sees the click, updates, and
              shifts traffic before the purchase (or lack thereof) arrives.
            </p>
            <p>
              <strong>Mitigation:</strong> Use proxy rewards that correlate with
              delayed outcomes. Dwell time &gt; 30 seconds predicts purchase
              intent. Add-to-cart predicts checkout. Train a model to estimate
              delayed reward from immediate signals, then use that estimate as
              the bandit reward. This converts a delayed reward problem into an
              immediate reward problem.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              NONSTATIONARITY
            </p>
            <p style="margin-top: 0">
              Arms change over time. Seasonal trends, breaking news, and
              inventory changes mean yesterday's winner may be today's loser.
              Standard bandits with unbounded memory lock onto stale winners
              because historical evidence drowns new signals.
            </p>
            <p>
              <strong>Mitigation:</strong> Use sliding windows (only consider
              last 7 days of data) or exponential decay (weight recent
              observations more heavily). For Thompson, multiply α and β by
              decay factor each day:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                α_new = 1 + decay × (α - 1)
              </code>
              . A 7-day half-life means observations from one week ago
              contribute half as much.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Shorter decay windows adapt
              faster to change but require more samples to converge. Balance
              based on how quickly your domain changes.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              HEAVY TAILED REWARDS
            </p>
            <p style="margin-top: 0">
              UCB assumes bounded rewards and well-behaved noise. If occasional
              outliers produce 100x normal reward, UCB overestimates that arm's
              mean and overcommits. <strong>Fix:</strong> Use robust mean
              estimators (median of means) or switch to Thompson Sampling with
              heavy-tailed priors that handle outliers gracefully. Another
              option is to clip rewards to a maximum value, accepting some bias
              to reduce variance.
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
                  Delayed rewards favor fast-feedback arms like clickbait; use
                  proxy rewards like dwell time that predict delayed conversions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Nonstationarity locks onto stale winners; use 7-day sliding
                  windows or exponential decay to forget old observations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Exponential decay formula for Thompson: α_new = 1 + decay × (α
                  - 1) with typical 7-day half-life
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Heavy tailed rewards break UCB mean estimates; use robust
                  estimators or Thompson with heavy-tailed priors
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
                  When discussing delayed rewards, explain the clickbait problem
                  and suggest proxy metrics like 30-second dwell time
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe exponential decay: 7-day half-life means week-old
                  observations contribute 50% weight
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For heavy-tailed rewards, recommend Thompson over UCB because
                  posteriors handle outliers more gracefully
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiArmedBanditsFailureModesDelayedRewardsAndNonstationarity;
