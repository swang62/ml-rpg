import type { Component } from "solid-js";

const LessonQueryUnderstandingFailureModesAndProductionGuardrails: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Production Guardrails
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Over-Correction and User Frustration
            </p>
            <p style="margin-top: 0">
              Aggressive spell correction changes valid queries. "Golang"
              corrects to "goal" in a general-purpose search. Brand names,
              technical terms, and proper nouns are especially vulnerable. Users
              who repeatedly see wrong corrections lose trust. Prevention:
              maintain allowlists of valid terms by domain, require higher
              confidence for corrections on capitalized words, and always
              provide "search instead for [original]" option.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Expansion Drift
            </p>
            <p style="margin-top: 0">
              Query expansion adds semantically similar but contextually wrong
              terms. "Python book" expands to include "snake" in a programming
              context. "Apple stock" expands to "fruit" when user wants
              financial data. Drift compounds: each expansion term can trigger
              further expansions. Prevention: use entity linking to constrain
              expansions ("Python" linked to programming language excludes
              animal expansions), limit expansion depth, validate expansions
              against user click patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Intent Misclassification Cascades
            </p>
            <p style="margin-top: 0">
              Wrong intent routes to wrong backend, returning completely
              irrelevant results. A transactional query hitting an informational
              index returns articles instead of products. User abandons search.
              Unlike ranking errors (wrong order of good results), intent errors
              return the wrong result set entirely. Mitigation: use confidence
              thresholds for routing; if intent classifier is uncertain (&lt;70%
              confidence), query multiple backends and blend results.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Guardrail:</strong> Monitor query understanding changes
              through A/B tests before full rollout. Track: zero-result rate,
              click-through rate, search abandonment, "did you mean" acceptance
              rate. Regressions indicate failure modes.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 6px">
                  Filter Relaxation Strategy
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Initial Parse</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    product_type: Office Desk (conf: 0.91)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    material: Wood (conf: 0.73)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    size: Large (conf: 0.52)
                  </div>
                  <div style="font-size: 11px; margin-top: 6px; font-weight: bold">
                    Result count: 0 ✗
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Relaxation Step 1</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Drop lowest confidence: size (0.52)
                  </div>
                  <div style="font-size: 11px; margin-top: 6px">
                    product_type: Office Desk (conf: 0.91)
                  </div>
                  <div style="font-size: 11px; margin-top: 3px">
                    material: Wood (conf: 0.73)
                  </div>
                  <div style="font-size: 11px; margin-top: 6px; font-weight: bold">
                    Result count: 3 ✗ (below threshold 10)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px">Relaxation Step 2</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Drop next lowest: material (0.73)
                  </div>
                  <div style="font-size: 11px; margin-top: 6px">
                    product_type: Office Desk (conf: 0.91)
                  </div>
                  <div style="font-size: 11px; margin-top: 6px; font-weight: bold">
                    Result count: 127 ✓
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
                  Over-correction changes valid queries (Golang → goal); use
                  allowlists and confidence thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always provide "search instead for [original]" option to
                  recover from bad corrections
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Expansion drift: Python (programming) expands to snake; use
                  entity linking to constrain
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Intent misclassification returns wrong result set entirely,
                  not just wrong order
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Route to multiple backends when intent confidence &lt; 70%;
                  blend results
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
                  Describe over-correction problem with technical terms (Golang,
                  brand names) and allowlist solution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain expansion drift with Python example and entity-linking
                  constraint
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend multi-backend routing when intent confidence is low
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonQueryUnderstandingFailureModesAndProductionGuardrails;
