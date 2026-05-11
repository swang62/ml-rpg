import type { Component } from "solid-js";

const LessonKnowledgeDistillationValidationAndMonitoringBeyondAccuracyToCalibrationAndDrift: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Validation and Monitoring: Beyond Accuracy to Calibration and Drift
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
                <strong>Calibration</strong> measures whether predicted
                probabilities match actual outcomes. A calibrated model
                predicting 70% confidence should be correct 70% of the time.
                Distilled students often lose calibration even when accuracy is
                preserved.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Calibration Degrades
            </p>
            <p style="margin-top: 0">
              Soft labels at high temperature compress the probability range. A
              teacher confident at 0.95 becomes 0.65 after softening. The
              student learns to output values in this compressed range. At
              inference (T=1), predictions cluster around 0.6-0.8 rather than
              spanning 0.1-0.99. Result: the student is overconfident on
              uncertain examples and underconfident on clear ones. This matters
              for downstream decisions: a recommendation system using "show if
              confidence &gt; 0.7" behaves incorrectly.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Monitoring Beyond Accuracy
            </p>
            <p style="margin-top: 0">
              Track these metrics alongside accuracy:{" "}
              <strong>Expected Calibration Error (ECE):</strong> bin predictions
              by confidence, measure gap between confidence and accuracy per
              bin. ECE below 0.05 is well-calibrated.{" "}
              <strong>Brier score:</strong> mean squared error of probability
              predictions. Lower is better; compare to teacher"s score.{" "}
              <strong>Agreement rate:</strong> how often student and teacher
              predictions match. Below 90% suggests capacity or training issues.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Calibration Recovery
            </p>
            <p style="margin-top: 0">
              Post-hoc calibration fixes the problem without retraining.{" "}
              <strong>Temperature scaling:</strong> learn a single T value on
              validation data that minimizes calibration error. Apply T to
              logits before softmax at inference.{" "}
              <strong>Platt scaling:</strong> fit a logistic regression on
              validation predictions. Both add negligible latency (one multiply
              or small linear layer). Always evaluate calibration on a held-out
              set separate from the scaling validation set.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Production Check:</strong> Run calibration analysis
              before deploying any distilled model. Temperature scaling takes
              minutes and prevents confidence-based decision failures.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Calibration: Expected Calibration Error
                  </strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Good: ECE &lt; 0.05, Acceptable: 0.05-0.10
                  </div>
                  <div style="font-size: 11px">
                    Fix: Temperature scaling on held out set
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Tail Performance</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Track bottom 100 classes by frequency
                  </div>
                  <div style="font-size: 11px">
                    Student often 10-20% worse on rare inputs
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 13px">Drift Monitoring</strong>
                  <div style="font-size: 11px; margin-top: 6px">
                    Daily: Sample 10K queries, measure KL divergence
                  </div>
                  <div style="font-size: 11px">
                    Alert: &gt;20% divergence increase triggers redistill
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
                  Calibration measures if predicted probabilities match actual
                  outcomes; distilled students often lose it
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  High-temperature training compresses probability range,
                  causing over/underconfidence at inference
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Track ECE (below 0.05 is good), Brier score, and
                  student-teacher agreement rate (above 90%)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Temperature scaling and Platt scaling recover calibration
                  post-hoc with negligible latency cost
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Always validate calibration on held-out data separate from the
                  scaling validation set
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
                  Explain why calibration degrades (probability compression from
                  temperature) - shows deep understanding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention ECE threshold of 0.05 and how to compute it - specific
                  metrics impress interviewers
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe temperature scaling as a post-hoc fix that takes
                  minutes - practical production knowledge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonKnowledgeDistillationValidationAndMonitoringBeyondAccuracyToCalibrationAndDrift;
