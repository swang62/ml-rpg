import type { Component } from "solid-js";

const LessonRealtimePersonalizationFailureModesFeedbackLoopsPositionBiasAndDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes: Feedback Loops, Position Bias, and Drift
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              FEEDBACK LOOP COLLAPSE
            </p>
            <p style="margin-top: 0">
              When the system only shows high-confidence items, it never gathers
              data on alternatives. Items that were good become the only items
              with enough data to seem good. New items never get shown, never
              get clicks, never seem worth showing. The system converges to a
              tiny subset of the catalog. Fix by enforcing minimum exploration
              rates and diversity constraints.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              POSITION BIAS IN TRAINING
            </p>
            <p style="margin-top: 0">
              Items shown in position 1 get 5 to 10 times more clicks than
              position 5, regardless of relevance. If you train on raw click
              data, the model learns that position 1 items are better. When you
              deploy, it ranks those items higher because they were clicked
              more, not because they were more relevant. Debias by logging
              position and using inverse propensity scoring (weighting clicks by
              1 / probability of being shown in that position).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Warning:</strong> Without propensity logging, you cannot
              evaluate new policies offline. Always log the probability that
              each item was shown in each position.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DELAYED FEEDBACK
            </p>
            <p style="margin-top: 0">
              Clicks happen in seconds, but purchases happen in hours or days.
              If you optimize for clicks, you might surface items that get
              clicked but rarely purchased. If you wait for purchase signals,
              you react too slowly. Common solution: use click as immediate
              signal, then retroactively adjust when purchase data arrives.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CONTEXT DRIFT
            </p>
            <p style="margin-top: 0">
              The relationship between context and reward changes over time.
              Holiday shopping behavior differs from regular browsing. A model
              trained in November fails in February. Detect drift by monitoring
              prediction accuracy over time. Retrain or use sliding window
              training to adapt.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 8px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px">
                    Failure: Broken Propensities
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Quantized p or version mismatch → Biased IPS → Bad OPE
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px">
                    Failure: Non-Stationarity
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Preferences drift hourly/daily → Stale model decays → Regret
                    spike
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px">
                    Failure: Feedback Loop
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    Recommend popular → More clicks → Higher confidence → Less
                    diversity
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <div style="font-weight: bold; font-size: 12px">
                    Safeguard: Exploration Floor + Guardrails
                  </div>
                  <div style="font-size: 11px; margin-top: 4px">
                    ε ≥ 0.01, 5–10% baseline holdout, circuit breaker on KPI
                    drop
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
                  Feedback loop collapse: showing only high-confidence items
                  means never learning about alternatives
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Position 1 gets 5-10x more clicks than position 5; train on
                  raw clicks and you learn position, not relevance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always log probability each item was shown in each position
                  for offline policy evaluation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Delayed feedback: optimize for clicks and miss purchase
                  intent; wait for purchases and react too slowly
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Context drift: November model fails in February; use sliding
                  window training to adapt
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
                  Describe collapse: new items never shown → never clicked →
                  never seem worth showing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain propensity logging: weight clicks by 1/P(shown in that
                  position) to debias
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Discuss holiday drift: shopping behavior changes seasonally,
                  models need retraining
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonRealtimePersonalizationFailureModesFeedbackLoopsPositionBiasAndDrift;
