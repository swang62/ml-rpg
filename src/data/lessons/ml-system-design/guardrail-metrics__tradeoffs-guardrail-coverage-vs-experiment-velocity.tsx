import type { Component } from "solid-js";

const LessonGuardrailMetricsTradeoffsGuardrailCoverageVsExperimentVelocity: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Tradeoffs: Guardrail Coverage vs Experiment Velocity
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
                The <strong>coverage-velocity trade-off</strong> balances
                comprehensive safety checking against experiment speed. More
                guardrails slow iteration; fewer guardrails risk harm.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Math of Coverage
            </p>
            <p style="margin-top: 0">
              Each guardrail has false positive probability p. With n
              independent guardrails, probability of at least one false positive
              is{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                1 - (1-p)^n
              </code>
              . At p=5% with 10 guardrails, 40% of experiments get blocked by
              noise alone. At 20 guardrails, it rises to 64%.
            </p>
            <p>
              This creates a ceiling on useful guardrail count. Beyond 10-15
              guardrails, diminishing returns: each additional guardrail blocks
              more valid experiments than it catches harmful ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Velocity Impact
            </p>
            <p style="margin-top: 0">
              Each blocked experiment requires investigation (hours to days).
              False positives consume engineering time and erode trust. Teams
              with high false positive rates start ignoring guardrails or
              finding workarounds, defeating the purpose.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Risk-tiered guardrails help:
              strict coverage for high-risk changes (payment, auth), minimal
              guardrails for low-risk changes (copy, colors). Match coverage to
              risk level.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Optimizing the Trade-off
            </p>
            <p style="margin-top: 0">
              Strategies: (1) correlate guardrails and remove redundant ones,
              (2) use hierarchical testing (broad guardrail first, then
              specific), (3) tier by experiment risk, (4) set aside velocity
              budget for low-risk experiments with minimal guardrails.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    High Guardrail Coverage
                  </strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Protection: 15 guardrails, T=0.3%
                    <br />
                    Cost: 3 week runtime, 25 escalations/month
                    <br />
                    False positive: 80%, 50 engineer hours/month
                    <br />
                    When: Mature product, 100M DAU, high risk
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px">Moderate Coverage</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Protection: 7 guardrails, T=0.8%
                    <br />
                    Cost: 1 week runtime, 10 escalations/month
                    <br />
                    False positive: 60%, 20 engineer hours/month
                    <br />
                    When: Growth product, 10M DAU, balanced
                  </div>
                </div>
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 14px">Minimal Coverage</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Protection: 3 guardrails, manual review
                    <br />
                    Cost: 3 days runtime, 2 escalations/month
                    <br />
                    False positive: 40%, 5 engineer hours/month
                    <br />
                    When: Early stage, 500K DAU, fast iteration
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
                  10 guardrails at 5% FPR blocks 40% of experiments; 20
                  guardrails blocks 64%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Beyond 10-15 guardrails, each additional one blocks more valid
                  experiments than harmful ones
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High false positive rates erode trust, leading to workarounds
                  that defeat the purpose
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Risk-tier coverage: strict for high-risk (payment), minimal
                  for low-risk (copy changes)
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
                  When discussing math: calculate 1-(1-0.05)^10 = 40% false
                  positive rate with 10 guardrails
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  For optimization: describe tiering by risk level and removing
                  correlated redundant guardrails
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonGuardrailMetricsTradeoffsGuardrailCoverageVsExperimentVelocity;
