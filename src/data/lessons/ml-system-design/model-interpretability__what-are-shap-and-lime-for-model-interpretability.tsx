import type { Component } from "solid-js";

const LessonModelInterpretabilityWhatAreShapAndLimeForModelInterpretability: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What are SHAP and LIME for Model Interpretability?
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
                <strong>Model interpretability</strong> techniques like SHAP and
                LIME answer why the model made a prediction by assigning
                importance scores to each feature. SHAP uses game theory to
                distribute credit fairly. LIME approximates the model locally
                with a simple linear model.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Interpretability Matters
            </p>
            <p style="margin-top: 0">
              A loan application is rejected. The applicant asks why. "The model
              said so" is unacceptable. Regulations require explanations (GDPR
              Article 22, ECOA). Beyond compliance, interpretability enables
              debugging: if the model learned that employment at a bankrupt
              company predicts default, you catch this before deployment.
              Production ML needs explanations for users, regulators, and
              engineers.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How SHAP Works
            </p>
            <p style="margin-top: 0">
              SHAP borrows from cooperative game theory. Each feature is a
              "player" contributing to the prediction "payout." The Shapley
              value calculates each contribution by averaging marginal
              contributions across all possible feature combinations. If income
              alone predicts 0.3, and income + age predicts 0.5, age contributed
              0.2. Average across all combinations. Each feature gets fair
              credit for pushing prediction from baseline to final value.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How LIME Works
            </p>
            <p style="margin-top: 0">
              LIME generates thousands of perturbed versions of the input
              (randomly changing features). It runs the model on all samples,
              then fits a simple linear model to approximate the decision
              boundary near that point. Linear model coefficients become
              importances. The intuition: even complex models behave roughly
              linearly in local neighborhoods.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> SHAP gives theoretically
              grounded, consistent attributions. LIME is faster and
              model-agnostic but can give inconsistent explanations for similar
              inputs.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 16px; align-items: stretch">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">SHAP</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Input:</strong> Instance + Background dataset
                    (500-2000 samples)
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Method:</strong> Compute Shapley values via
                    coalitions
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Output:</strong> Attributions sum to prediction
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Cost:</strong> 2-5ms (trees)
                    <br />
                    10-30ms (deep models)
                  </div>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column; gap: 8px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                    <strong style="font-size: 13px">LIME</strong>
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Input:</strong> Instance + Perturbation budget
                    (500-2000)
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Method:</strong> Perturb, query, fit linear
                    surrogate
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Output:</strong> Linear coefficients as explanations
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; font-size: 11px">
                    <strong>Cost:</strong> 0.5-2 seconds
                    <br />
                    (too slow for sync)
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
                  SHAP uses Shapley values from game theory to fairly distribute
                  prediction credit among features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LIME fits simple linear model to approximate complex model
                  locally
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interpretability required for compliance (GDPR, ECOA) and
                  debugging model behavior
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  SHAP is theoretically grounded but computationally expensive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LIME is faster and model-agnostic but can give inconsistent
                  explanations
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
                  Explain SHAP as game theory: each feature is player,
                  prediction is payout to distribute
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain LIME as local approximation: complex model simplified
                  near each point
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelInterpretabilityWhatAreShapAndLimeForModelInterpretability;
