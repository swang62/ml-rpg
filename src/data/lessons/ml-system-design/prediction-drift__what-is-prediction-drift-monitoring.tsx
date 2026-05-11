import type { Component } from "solid-js";

const LessonPredictionDriftWhatIsPredictionDriftMonitoring: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          What is Prediction Drift Monitoring?
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
              <strong>Prediction drift monitoring</strong> tracks changes in the
              distribution of model outputs over time, detecting when
              predictions shift even if the model itself has not changed.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHY MONITOR PREDICTIONS
          </p>
          <p>
            Prediction drift provides a signal without waiting for labels. If
            the distribution of model outputs changes significantly—more
            high-confidence predictions, shift toward certain classes, different
            score ranges—something has changed. This might indicate data drift,
            concept drift, or upstream issues.
          </p>
          <p>
            Prediction drift is observable immediately. Unlike performance
            metrics that require ground truth, you can compute prediction
            statistics in real-time. This makes prediction drift a valuable
            early warning signal.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            WHAT TO TRACK
          </p>
          <p>
            <strong>Score distribution:</strong> For classifiers, track
            predicted probability distribution. Mean, std, percentiles (p10,
            p50, p90). A shift in mean score or narrowing of distribution
            indicates change.
          </p>
          <p>
            <strong>Class distribution:</strong> Track fraction predicted to
            each class. If a binary classifier suddenly predicts 80% positive
            when it was 50%, something changed.
          </p>
          <p>
            <strong>Confidence distribution:</strong> Track how confident the
            model is. A drop in confidence (more predictions near 0.5) suggests
            the model is encountering unfamiliar data.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            RELATIONSHIP TO OTHER DRIFT TYPES
          </p>
          <p>
            Prediction drift is downstream of data drift. Data drift (inputs
            change) typically causes prediction drift (outputs change). But
            prediction drift can occur without measurable data drift if feature
            interactions change in ways not captured by univariate monitoring.
          </p>
          <p>
            Prediction drift is not the same as performance drift. Predictions
            can shift while performance remains stable (if the ground truth also
            shifted proportionally). Performance drift requires labels to
            measure.
          </p>
          <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
            <strong>💡 Key Insight:</strong> Prediction drift is your fastest
            feedback signal. It does not require labels and reflects how the
            model responds to changing inputs.
          </div>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
            <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Baseline Distribution</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Training or Rolling Window
                </div>
              </div>
              <div style="font-size: 20px; font-weight: bold">
                Compare Using
                <br />
                JS Divergence or KS Test
              </div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">Current Window</strong>
                <div style="font-size: 12px; margin-top: 4px">
                  Last 5 to 15 minutes
                </div>
              </div>
              <div style="font-size: 24px; font-weight: bold">↓</div>
              <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 140px; text-align: center">
                <strong style="font-size: 14px">
                  Alert if Divergence &gt; 0.1
                </strong>
                <div style="font-size: 12px; margin-top: 4px">
                  3 consecutive windows
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Prediction drift: changes in model output distribution;
                observable immediately without labels
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Track: score distribution (mean, std, percentiles), class
                distribution (fraction per class), confidence distribution
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Prediction drift is downstream of data drift; can occur without
                measurable univariate data drift due to interactions
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
                Interview Tip: Explain why prediction drift is faster signal
                than performance drift—no labels needed.
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Give example: binary classifier suddenly
                predicting 80% positive when baseline was 50%.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonPredictionDriftWhatIsPredictionDriftMonitoring;
