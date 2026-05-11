import type { Component } from "solid-js";

const LessonMultiArmedBanditsProductionArchitectureServingBanditsAtScale: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Serving Bandits at Scale
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LATENCY BUDGET
            </p>
            <p style="margin-top: 0">
              In a 50ms p99 request budget, bandit decision should take under
              5ms. For Thompson Sampling with 10-20 arms: sampling Beta
              distributions and taking argmax is submillisecond. For UCB:
              computing the formula for each arm is similarly fast. The
              bottleneck is never the algorithm; it is fetching context features
              from external services.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              STATE MANAGEMENT
            </p>
            <p style="margin-top: 0">
              Non-contextual bandits need minimal state: for Thompson Sampling,
              two integers (α, β) per arm. Store in Redis or local memory.
              Updates can be eventual: a 1-5 minute lag between events and
              parameter updates is acceptable. For 100k QPS, use a streaming
              pipeline that aggregates events in micro-batches (e.g., every
              30-60 seconds) and pushes updated parameters to serving nodes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LOGGING FOR OFFLINE EVALUATION
            </p>
            <p style="margin-top: 0">
              Always log: (1) Action taken. (2) Probability of that action
              (propensity). (3) Reward observed. (4) Context features if
              contextual. This enables Off-Policy Evaluation (OPE) using Inverse
              Propensity Scoring. Without propensities logged, you cannot
              evaluate new policies offline before deploying them. OPE lets you
              estimate how a new policy would perform using historical data from
              the current policy.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Log action propensities for
              every decision. This enables offline policy evaluation and
              debugging without running live experiments.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COLD START AND MINIMUM TRAFFIC
            </p>
            <p style="margin-top: 0">
              New arms have no observations and wide uncertainty. To prevent
              them from being permanently ignored, set minimum traffic floors:
              each arm receives at least 2% of impressions during warmup. After
              an arm has 100-500 observations, remove the floor and let the
              bandit algorithm take over. This ensures fair evaluation before
              the bandit has enough data to make informed choices.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="text-align: center; margin-bottom: 8px">
                  <strong style="font-size: 15px">
                    Bandit Production Architecture
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Serving Tier (Hot Path)
                  </strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    120k req/s, 5ms budget, in-memory params
                  </div>
                  <div style="font-size: 13px">
                    Logs: choice, propensity, context, reward
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓ Event Stream ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    Update Pipeline (Warm Path)
                  </strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Processes 2M events/min, 1-5 min windows
                  </div>
                  <div style="font-size: 13px">
                    Exponential decay: 7 day half life
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↑ Push Updates (30-60s) ↑
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px">
                  <strong style="font-size: 14px">Distributed Cache</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Atomic parameter refresh, version tracking
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border-radius: 6px; font-size: 13px">
                  <strong>Safety Layer:</strong> OPE with IPS, 2% min traffic
                  per arm, kill switch to fixed split, staleness alerts
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
                  Budget 5ms for bandit decision within 50ms p99 latency;
                  algorithm is submillisecond, context fetching is the
                  bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  State is minimal: two integers per arm for Thompson; eventual
                  consistency with 30-60 second update lag is acceptable
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always log action propensities for Off-Policy Evaluation using
                  Inverse Propensity Scoring
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Enforce 2% minimum traffic per arm during warmup to prevent
                  cold start starvation
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
                  When discussing production, mention the latency breakdown:
                  algorithm &lt;1ms, context fetch 2-3ms, total &lt;5ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain the logging requirement: propensities enable Inverse
                  Propensity Scoring for offline evaluation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe cold start mitigation: 2% minimum traffic until
                  100-500 observations per arm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiArmedBanditsProductionArchitectureServingBanditsAtScale;
