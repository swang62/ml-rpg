import type { Component } from "solid-js";

const LessonModelInterpretabilityFailureModesAndEdgeCasesInModelExplanations: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Model Explanations
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Explanation Instability
            </p>
            <p style="margin-top: 0">
              LIME explanations can change with small input perturbations.
              Change one feature by 0.1% and top features might reorder
              completely. This undermines trust: "Why did income matter more for
              my application but credit score for my neighbor?" SHAP is more
              stable but not immune. Solution: report confidence intervals. If
              "income importance: 0.3 ± 0.2," users understand uncertainty.
              Requires 3-5x explanation rounds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Feature Correlation Problems
            </p>
            <p style="margin-top: 0">
              SHAP and LIME assume feature independence. If income and education
              are highly correlated (0.8), attribution between them becomes
              arbitrary. Removing one correlated feature is misleading because
              you implicitly change correlated ones. Detection: flag pairs above
              0.7 correlation as unreliable for individual attribution.
              Mitigation: group correlated features and explain group importance
              instead.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Adversarial Explanations
            </p>
            <p style="margin-top: 0">
              Explanations can be manipulated. Attackers craft inputs producing
              misleading explanations while maintaining predictions. The model
              makes biased decisions but explanations hide bias by attributing
              to innocuous features. Detection: compare explanations for
              protected vs unprotected groups. If explanations differ
              dramatically while predictions are similar, investigate.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Out of Distribution Inputs
            </p>
            <p style="margin-top: 0">
              Explanations are unreliable outside training distribution. The
              model extrapolates unpredictably, and LIME/SHAP become
              meaningless. A model trained on K-K incomes produces nonsense for
              M. Detection: flag inputs far from training centroid. Warn or
              refuse to explain entirely.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> All methods have failure modes.
              Report uncertainty, flag unreliable scenarios, never treat
              explanations as ground truth.
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
                  LIME explanations can reorder with tiny changes, undermining
                  user trust
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Correlated features (above 0.7) get arbitrary attribution,
                  group them instead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial explanations can hide model bias by attributing to
                  innocuous features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Out-of-distribution inputs produce meaningless explanations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Report confidence intervals and flag unreliable scenarios
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
                  Mention confidence intervals: run 3-5 explanation rounds for
                  uncertainty
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Correlation flag: features with r&gt;0.7 should be grouped for
                  attribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelInterpretabilityFailureModesAndEdgeCasesInModelExplanations;
