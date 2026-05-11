import type { Component } from "solid-js";

const LessonImageClassificationScaleModelVersioningRolloutAndGovernance: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Model Versioning, Rollout, and Governance
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Model Versioning
            </p>
            <p style="margin-top: 0">
              Production systems run multiple model versions simultaneously
              during rollouts, A/B tests, and rollbacks. Without careful
              versioning, you lose reproducibility and the ability to compare
              results across time.
            </p>
            <p>
              <strong>Version artifacts:</strong> Track model weights, training
              data version, preprocessing code, and hyperparameters together. A
              model is only reproducible if you can recreate its exact training
              environment.
            </p>
            <p>
              <strong>Storage:</strong> Model weights range from 50MB to 5GB.
              Store in versioned object storage with immutable identifiers.
              Never overwrite existing versions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Safe Rollout Strategies
            </p>
            <p style="margin-top: 0">
              <strong>Canary deployment:</strong> Route 1-5% of traffic to the
              new model. Monitor accuracy and latency metrics. If degradation
              exceeds thresholds, automatically rollback. Gradually increase
              traffic over hours or days.
            </p>
            <p>
              <strong>Shadow mode:</strong> Run new model in parallel without
              affecting users. Compare predictions against the current model.
              Identify disagreements for human review before any traffic switch.
            </p>
            <p>
              <strong>Feature flags:</strong> Enable new model per user segment,
              geography, or content type. Test on low-risk segments first.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Governance and Compliance
            </p>
            <p style="margin-top: 0">
              <strong>Audit trails:</strong> Log which model version produced
              each prediction. Required for debugging, compliance, and legal
              discovery.
            </p>
            <p>
              <strong>Model cards:</strong> Document intended use, known
              limitations, and evaluation results. Critical for handoffs between
              teams and regulatory review.
            </p>
            <p>
              <strong>Bias monitoring:</strong> Track accuracy across
              demographic groups if available. Unequal performance across groups
              indicates fairness issues requiring investigation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Key Insight:</strong> Model governance is not optional
              overhead. It is the difference between systems you can debug,
              explain, and improve versus systems that become unmaintainable
              black boxes within months.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">New Model Candidate</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Bundle: weights + preprocessing + taxonomy
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Shadow Inference</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10% traffic, no user impact, compare distributions
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Canary Deployment</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1 to 5% user traffic, monitor latency and errors
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="display: flex; gap: 12px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Success</strong>
                    <div style="margin-top: 4px">Full rollout</div>
                    <div>Update cache keys</div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center; font-size: 12px">
                    <strong>Regression</strong>
                    <div style="margin-top: 4px">Instant rollback</div>
                    <div>Revert cache keys</div>
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
                  Version all artifacts together: weights, training data,
                  preprocessing code, and hyperparameters
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Canary deployment with 1-5% traffic catches regressions before
                  full rollout
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Shadow mode compares new vs old predictions without user
                  impact - review disagreements before switching
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Audit trails linking predictions to model versions are
                  required for debugging and compliance
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
                  Interview Tip: Explain canary metrics - monitor both accuracy
                  (correctness) and latency (performance) with automatic
                  rollback thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention model cards as documentation practice -
                  shows awareness of responsible ML practices expected at senior
                  levels
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleModelVersioningRolloutAndGovernance;
