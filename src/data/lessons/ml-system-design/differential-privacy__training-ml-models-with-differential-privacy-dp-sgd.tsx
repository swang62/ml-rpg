import type { Component } from "solid-js";

const LessonDifferentialPrivacyTrainingMlModelsWithDifferentialPrivacyDpSgd: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training ML Models with Differential Privacy (DP-SGD)
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>
                DP-SGD (Differentially Private Stochastic Gradient Descent):
              </strong>{" "}
              A modified training algorithm that adds noise to gradients during
              each optimization step. The trained model satisfies differential
              privacy, meaning an attacker cannot determine if any specific
              example was in the training data by examining the model.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Standard Training Leaks Privacy
            </p>
            <p>
              Neural networks memorize training data. Language models reproduce
              verbatim text from training corpora. Image classifiers reveal
              whether specific photos were used. Membership inference attacks
              can determine with high accuracy whether a particular record was
              in training data. Even without explicit memorization, model
              parameters encode information about individual examples. DP-SGD
              prevents this by ensuring the model would look nearly identical
              whether or not any single training example was included.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How DP-SGD Works
            </p>
            <p>
              Three modifications to standard SGD:{" "}
              <strong>Per-example gradients:</strong> Compute gradient for each
              example separately (instead of batch average).{" "}
              <strong>Gradient clipping:</strong> Bound each gradient to maximum
              norm C. This limits how much any single example can influence the
              update. <strong>Noise addition:</strong> Add Gaussian noise
              calibrated to C and epsilon to the clipped gradient sum. The
              clipping ensures bounded sensitivity; the noise provides privacy.
              The model trains slowly and less accurately, but the final
              parameters satisfy differential privacy.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Privacy-Utility Trade-off
            </p>
            <p>
              DP training significantly degrades model accuracy. On standard
              benchmarks like CIFAR-10, non-private models achieve 95%+
              accuracy; DP models with epsilon=1 achieve 60-70%. The gap narrows
              with more data and compute but never closes. Practical epsilon
              values for production (epsilon between 1 and 10) typically reduce
              accuracy by 5-30% compared to non-private training. The acceptable
              accuracy loss depends on your privacy requirements and legal
              constraints.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Composition Warning:</strong> Each training epoch consumes
              privacy budget. Training for 100 epochs costs 100x the
              single-epoch privacy cost. Use privacy accounting (moments
              accountant) to track cumulative epsilon across all epochs.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Batch of Examples (B=256)
                  </strong>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Compute Per Example Gradients
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    g₁, g₂, ..., g₂₅₆
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Clip Each Gradient to Norm C
                  </strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    gᵢ_clipped = gᵢ × min(1, C/||gᵢ||₂)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Aggregate + Add Noise</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Σ gᵢ_clipped + Gaussian(0, σ²C²I)
                  </div>
                </div>
                <div style="font-size: 20px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Update Model Weights</strong>
                  <div style="font-size: 11px; margin-top: 4px">
                    Track privacy via accountant → ε at δ=1e-5
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
                  DP-SGD clips per-example gradients and adds calibrated noise
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Privacy-utility trade-off: epsilon=1 on CIFAR-10 drops
                  accuracy from 95% to 60-70%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Each training epoch consumes privacy budget; use privacy
                  accounting to track cumulative epsilon
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
                  Practical epsilon (1-10) reduces accuracy 5-30% vs non-private
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient clipping bounds how much one example can influence
                  the model
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonDifferentialPrivacyTrainingMlModelsWithDifferentialPrivacyDpSgd;
