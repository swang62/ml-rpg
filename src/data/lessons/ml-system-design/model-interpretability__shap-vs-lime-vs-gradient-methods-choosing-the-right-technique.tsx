import type { Component } from "solid-js";

const LessonModelInterpretabilityShapVsLimeVsGradientMethodsChoosingTheRightTechnique: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            SHAP vs LIME vs Gradient Methods: Choosing the Right Technique
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              SHAP Strengths and Weaknesses
            </p>
            <p style="margin-top: 0">
              <strong>Strengths:</strong> Theoretically sound (Shapley values).
              Consistent: identical features get identical attributions.
              Additive: contributions sum to prediction minus baseline. TreeSHAP
              is exact and fast (10-50ms) for tree models.{" "}
              <strong>Weaknesses:</strong> Computationally expensive for
              non-tree models. KernelSHAP approximation can be unstable. Assumes
              feature independence, which rarely holds.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              LIME Strengths and Weaknesses
            </p>
            <p style="margin-top: 0">
              <strong>Strengths:</strong> Model-agnostic. Faster than SHAP
              (10-50ms). Intuitive output (linear coefficients). Works for
              tabular, text, and images. <strong>Weaknesses:</strong>{" "}
              Inconsistent: similar inputs may get different feature rankings.
              Depends on perturbation strategy. No theoretical correctness
              guarantee. Can miss non-linear boundaries.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gradient-Based Methods
            </p>
            <p style="margin-top: 0">
              For neural networks, compute how each input affects output via
              partial derivatives. <strong>Integrated Gradients:</strong>{" "}
              Accumulates gradients along path from baseline to input. Satisfies
              completeness. Fast (single forward/backward pass, 5-20ms).{" "}
              <strong>Saliency maps:</strong> Gradient magnitude. Very fast but
              noisy. Best for deep learning where SHAP/LIME are too slow.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Decision Framework
            </p>
            <p style="margin-top: 0">
              <strong>Tree models:</strong> TreeSHAP (fast, exact).{" "}
              <strong>Regulatory requirements:</strong> SHAP for theoretical
              soundness. <strong>Real-time latency:</strong> LIME or gradients.{" "}
              <strong>Neural networks:</strong> Integrated Gradients.{" "}
              <strong>Need consistency:</strong> Avoid LIME.{" "}
              <strong>Need speed:</strong> LIME or distilled models.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> No method is universally best.
              SHAP for correctness, LIME for speed, gradients for neural
              networks. Match method to model type and requirements.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 580px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="display: grid; grid-template-columns: 140px 1fr 1fr 1fr; gap: 8px; align-items: center; font-size: 11px">
                  <div style="font-weight: bold; text-align: center"></div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold">
                    SHAP
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold">
                    LIME
                  </div>
                  <div style="border: 2px solid; padding: 8px; border-radius: 6px; text-align: center; font-weight: bold">
                    Integrated Gradients
                  </div>
                  <div style="font-weight: bold; padding: 4px">
                    Latency (trees)
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    2-5ms
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    500-2000ms
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    N/A
                  </div>
                  <div style="font-weight: bold; padding: 4px">
                    Latency (neural)
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    10-30ms GPU
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    500-2000ms
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    10-30ms GPU
                  </div>
                  <div style="font-weight: bold; padding: 4px">Stability</div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    High
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Low
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    High
                  </div>
                  <div style="font-weight: bold; padding: 4px">Guarantees</div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Local accuracy
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Local fidelity
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Completeness
                  </div>
                  <div style="font-weight: bold; padding: 4px">
                    Best use case
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Compliance
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Debugging
                  </div>
                  <div style="border: 2px solid; padding: 6px; border-radius: 4px; text-align: center">
                    Neural nets
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
                  SHAP: theoretically sound, consistent, additive; but slow and
                  assumes independence
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  TreeSHAP is exact and fast (10-50ms) for tree-based models
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  LIME: model-agnostic and fast; but inconsistent and depends on
                  perturbation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient methods: fast (5-20ms) for neural networks,
                  Integrated Gradients preferred
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Decision: TreeSHAP for trees, SHAP for regulation, LIME for
                  speed, gradients for NNs
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
                  Provide decision matrix: model type to explanation method
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Note LIME consistency problem: similar inputs may get
                  different rankings
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelInterpretabilityShapVsLimeVsGradientMethodsChoosingTheRightTechnique;
