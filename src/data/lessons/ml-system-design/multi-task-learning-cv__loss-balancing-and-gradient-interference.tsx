import type { Component } from "solid-js";

const LessonMultiTaskLearningCvLossBalancingAndGradientInterference: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Loss Balancing and Gradient Interference
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Loss Balancing Problem
            </p>
            <p style="margin-top: 0">
              Each task has its own loss function. Classification uses
              cross-entropy. Regression uses mean squared error. Detection uses
              a combination of localization and classification losses. These
              losses have different scales and gradients.
            </p>
            <p>
              <strong>The problem:</strong> If detection loss is 100x larger
              than classification loss, the model optimizes almost entirely for
              detection. Classification performance suffers because its
              gradients get overwhelmed.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Manual Loss Weighting
            </p>
            <p style="margin-top: 0">
              The simplest approach: multiply each loss by a weight. Total loss
              = w1 × loss1 + w2 × loss2 + w3 × loss3. Tune weights manually
              until all tasks perform acceptably.
            </p>
            <p>
              <strong>Practical approach:</strong> Start with weights that
              normalize loss magnitudes. If one loss averages 10 and another
              averages 0.1, use weights of 0.01 and 1.0 respectively. Then
              adjust based on validation performance.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Gradient Interference
            </p>
            <p style="margin-top: 0">
              Even with balanced losses, task gradients can conflict. Task A
              wants to increase a weight; Task B wants to decrease it. The net
              gradient is small, but both tasks suffer. This is called
              destructive interference.
            </p>
            <p>
              <strong>Detection:</strong> Monitor individual task losses during
              training. If one task improves while another degrades, gradient
              interference is likely occurring in shared layers.
            </p>
            <p>
              <strong>Mitigation:</strong> Gradient surgery techniques modify
              conflicting gradients before applying them. Project each task
              gradient to remove components that conflict with other tasks. This
              preserves beneficial updates while eliminating destructive ones.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Dynamic Loss Weighting
            </p>
            <p style="margin-top: 0">
              Instead of fixed weights, adjust weights during training based on
              task difficulty or progress. Tasks that are learning slowly get
              higher weights; tasks that have converged get lower weights. This
              keeps all tasks improving throughout training.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Different loss scales cause imbalanced optimization - larger
                  losses dominate gradient updates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Manual weighting normalizes loss magnitudes: if losses differ
                  100x, weights should differ 100x inversely
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient interference: conflicting task gradients cancel out,
                  harming both tasks despite balanced losses
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Dynamic weighting adjusts task importance during training
                  based on learning progress
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
                  Interview Tip: Explain loss balancing as a practical first
                  step - normalize magnitudes, then tune on validation
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention gradient interference as a deeper issue
                  that loss balancing alone cannot solve
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMultiTaskLearningCvLossBalancingAndGradientInterference;
