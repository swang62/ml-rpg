import type { Component } from "solid-js";

const LessonAdversarialRobustnessAdversarialTrainingTheCoreDefenseWithRealCostTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Adversarial Training: The Core Defense with Real Cost Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Adversarial Training Works
            </p>
            <p>
              Adversarial training augments training data with adversarial
              examples—inputs specifically crafted to fool the model. Generate
              perturbations that maximize model error while staying within
              realistic bounds, then train the model to correctly classify both
              original and perturbed examples. The model learns to be robust to
              the types of manipulation attackers might use.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Core Method:</strong> For each training example, compute
              the gradient of loss with respect to input features, then perturb
              features in the direction that increases loss. Add these
              adversarial examples to training with correct labels. The model
              learns smoother decision boundaries less susceptible to small
              input changes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Accuracy Trade-off
            </p>
            <p>
              Adversarial training typically reduces accuracy on clean
              (non-adversarial) data by 2-5%. The model becomes more
              conservative, trading precision for robustness. This trade-off is
              often acceptable: a 3% accuracy drop that prevents 80% of
              adversarial attacks may be net positive for fraud detection where
              attack success costs more than false positives.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Computational Cost
            </p>
            <p>
              Generating adversarial examples requires computing gradients for
              each training sample—typically 2-10x training time increase. Fast
              methods (FGSM - Fast Gradient Sign Method) are cheaper but less
              effective than iterative methods (PGD - Projected Gradient
              Descent). Balance computational budget against robustness
              requirements.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Production Insight:</strong> Apply adversarial training
              selectively to high-value models where attack risk is high. Not
              every model needs robustness—the computational cost may not be
              justified for low-stakes predictions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Perturbation Bounds
            </p>
            <p>
              Define realistic perturbation bounds based on what attackers can
              actually control. Fraudsters cannot change account age but can
              change transaction timing. Constrain adversarial perturbations to
              controllable features within realistic ranges.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Adversarial Training: Min Max Optimization
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Outer Loop (Minimize)</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Update model parameters θ to minimize loss on hardest
                    examples
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↕
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Inner Loop (Maximize)</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Find worst perturbation δ within constraint (5-10 PGD steps)
                  </div>
                </div>
                <div style="text-align: center; font-size: 20px; font-weight: bold">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong>Result</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Model learns stable boundaries but costs 3-7x training time
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
                  Adversarial training perturbs inputs in the direction that
                  increases loss, then trains model to classify correctly anyway
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Expect 2-5% accuracy drop on clean data—trade precision for
                  robustness, often net positive for fraud detection
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Constrain perturbations to features attackers can actually
                  control (timing, amounts) not immutable features (account age)
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
                  FGSM (Fast Gradient Sign Method) is cheaper, PGD (Projected
                  Gradient Descent) more effective—balance cost vs robustness
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Apply selectively to high-value models where attack risk
                  justifies 2-10x training time increase
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonAdversarialRobustnessAdversarialTrainingTheCoreDefenseWithRealCostTradeOffs;
