import type { Component } from "solid-js";

const LessonBiasDetectionMitigationBiasMitigationPreInAndPostProcessingTechniques: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Bias Mitigation: Pre, In, and Post Processing Techniques
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pre-Processing Techniques
            </p>
            <p style="margin-top: 0">
              Fix bias before training. <strong>Resampling:</strong> Oversample
              underrepresented groups or undersample overrepresented ones. If
              Group B has 10% of training data, duplicate Group B examples until
              balanced. Risk: overfitting to duplicates.{" "}
              <strong>Reweighting:</strong> Assign higher weights to
              underrepresented samples during training. Group B samples count
              10x more than Group A. Less prone to overfitting than resampling.{" "}
              <strong>Representation editing:</strong> Transform features to
              remove protected attribute information. Project embeddings to be
              orthogonal to protected attribute direction. Risk: losing
              predictive signal that correlates with but is not caused by
              protected attributes.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              In-Processing Techniques
            </p>
            <p style="margin-top: 0">
              Add fairness constraints during training.{" "}
              <strong>Adversarial debiasing:</strong> Train model alongside an
              adversary that tries to predict protected attribute from model
              output. Main model is penalized if adversary succeeds. Forces
              model to make predictions uninformative about group membership.{" "}
              <strong>Constrained optimization:</strong> Add fairness constraint
              directly to loss function. Minimize prediction error subject to
              demographic parity ratio above 0.8. Lagrangian relaxation converts
              hard constraints to soft penalties.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Post-Processing Techniques
            </p>
            <p style="margin-top: 0">
              Adjust predictions after model is trained.{" "}
              <strong>Threshold optimization:</strong> Different decision
              thresholds per group. If Group A threshold is 0.5, Group B might
              use 0.4 to equalize rates. Simple, interpretable, but treats
              symptoms not causes. <strong>Calibration:</strong> Fit separate
              probability mappings per group. If model says 70% for Group A but
              actual rate is 50%, recalibrate Group A predictions downward. Does
              not fix underlying bias but produces fair probabilities.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Pre-processing works when you
              have access to training data. In-processing works when you control
              model training. Post-processing works when you only have model
              outputs. Choose based on your access level.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 560px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="text-align: center; font-weight: 700; margin-bottom: 8px; font-size: 15px">
                  Mitigation Stages: Accuracy vs Complexity
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Preprocessing</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Reweight/resample training data
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Accuracy cost: 3 to 5 pts | Easy to audit | Model agnostic
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">In Processing</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Add fairness constraints to training loss
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Accuracy cost: 1 to 2 pts | Best Pareto frontier | Complex
                    tuning
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Post Processing</strong>
                  <div style="font-size: 13px; margin-top: 4px">
                    Adjust thresholds or flip predictions
                  </div>
                  <div style="font-size: 12px; margin-top: 4px">
                    Fast deployment | Breaks calibration | May be illegal in
                    some jurisdictions
                  </div>
                </div>
                <div style="margin-top: 8px; padding: 10px; border: 2px solid; border-radius: 6px; font-size: 13px; text-align: center">
                  <strong>Production:</strong> Combine all three for best
                  results
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
                  Pre-processing: resampling, reweighting, representation
                  editing before training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  In-processing: adversarial debiasing, constrained optimization
                  during training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Post-processing: threshold optimization, calibration after
                  model is trained
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Adversarial debiasing trains model to make predictions
                  uninformative about group
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Choose technique based on access level: data, training, or
                  only outputs
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
                  Explain all three stages with specific technique names and
                  trade-offs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention constrained optimization uses Lagrangian relaxation
                  for soft fairness penalties
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBiasDetectionMitigationBiasMitigationPreInAndPostProcessingTechniques;
