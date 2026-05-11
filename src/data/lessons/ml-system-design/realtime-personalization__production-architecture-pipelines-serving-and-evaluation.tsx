import type { Component } from "solid-js";

const LessonRealtimePersonalizationProductionArchitecturePipelinesServingAndEvaluation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Architecture: Pipelines, Serving, and Evaluation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              REAL-TIME FEATURE PIPELINE
            </p>
            <p style="margin-top: 0">
              Session features must be computed and served within the latency
              budget. A typical architecture streams user events to a feature
              store, computes aggregates (last 5 viewed categories, time since
              last click, session length), and serves them with single digit
              millisecond latency. The feature store keeps a sliding window of
              recent events per user, typically the last 50 to 100 actions or
              last 30 minutes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MODEL SERVING ARCHITECTURE
            </p>
            <p style="margin-top: 0">
              For session models, inference happens on every action. Keep the
              model hot in memory, use batch prediction for candidates, and
              cache embeddings aggressively. For bandits, maintain a context to
              action mapping that updates after every reward signal. Thompson
              Sampling requires sampling from posterior distributions;
              precompute samples for common contexts to reduce latency.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Log everything needed for
              offline evaluation: context features, action taken, position
              shown, propensity score, and eventual reward. Without complete
              logs, you cannot improve the system.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OFFLINE POLICY EVALUATION
            </p>
            <p style="margin-top: 0">
              Before deploying a new policy, estimate its performance using
              historical logs. Inverse propensity scoring reweights past rewards
              by how likely the new policy would have taken the same action. If
              the new policy would have shown item X in 50% of cases but the old
              policy showed it in 10%, multiply the reward by 5. This gives
              unbiased estimates without running A/B tests.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              GRADUAL ROLLOUT
            </p>
            <p style="margin-top: 0">
              Deploy new policies to 1% of traffic first. Monitor click through
              rate, conversion, and revenue per session. If metrics are stable
              after 24 hours, increase to 10%, then 50%, then 100%. This limits
              damage from bugs or unexpected behavior.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 12px">Candidate Generator</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    CF + embeddings → 50 eligible actions
                  </div>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">
                    Bandit Policy Service (5–20ms p95)
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Context assembly + Linear scorer + ε-greedy → (a, p)
                  </div>
                </div>
                <div style="display: flex; gap: 10px; justify-content: space-between">
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 11px">Logging</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      (x, a, p, r) → Kafka
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 11px">Online Learning</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      5–15min updates
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 11px">OPE</strong>
                    <div style="font-size: 10px; margin-top: 4px">
                      Daily IPS/DR
                    </div>
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
                  Stream events to feature store, compute aggregates (last 5
                  categories, session length), serve in single-digit ms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Keep models hot in memory, batch predict candidates, cache
                  embeddings for session models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Log context, action, position, propensity, and reward -
                  incomplete logs make improvement impossible
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Offline policy evaluation with inverse propensity scoring
                  estimates new policy performance without A/B tests
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradual rollout: 1% → 10% → 50% → 100% over 24-hour intervals
                  to limit damage from bugs
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
                  Describe feature pipeline: sliding window of last 50-100
                  actions or 30 minutes per user
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain propensity reweighting: new policy 50% vs old policy
                  10% means multiply reward by 5
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Walk through gradual rollout: 1% for 24 hours, check CTR and
                  revenue, then expand
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimePersonalizationProductionArchitecturePipelinesServingAndEvaluation;
