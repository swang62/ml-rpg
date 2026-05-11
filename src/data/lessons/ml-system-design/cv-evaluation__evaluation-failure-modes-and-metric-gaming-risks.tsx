import type { Component } from "solid-js";

const LessonCvEvaluationEvaluationFailureModesAndMetricGamingRisks: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Evaluation Failure Modes and Metric Gaming Risks
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p>
              Evaluation metrics can mislead you if you do not understand their
              failure modes. Models can score well on benchmarks while failing
              badly in production, and teams can inadvertently game metrics
              without improving real performance.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🎭 METRIC GAMING RISKS
            </h3>
            <p>
              <strong>Benchmark overfitting:</strong> When you repeatedly
              evaluate on the same test set, model improvements start fitting to
              that specific data. The model learns the quirks of your benchmark
              rather than general detection ability. Solution: Hold out a final
              test set that you never touch during development.
            </p>
            <p>
              <strong>Class weighting manipulation:</strong> mAP weights all
              classes equally, but your application might care more about some
              classes. A model optimized for mAP might sacrifice
              rare-but-critical classes for easy gains on common classes.
              Solution: Report per-class AP and define importance-weighted
              metrics.
            </p>
            <p>
              <strong>Threshold tuning on test data:</strong> Choosing your
              confidence threshold by looking at test set performance inflates
              your numbers. The threshold that works best on your test set might
              not generalize. Solution: Use a separate validation set for
              threshold selection.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              ⚠️ EVALUATION BLIND SPOTS
            </h3>
            <p>
              <strong>Distribution shift:</strong> Your test set might not
              represent production data. Benchmark images are often curated,
              well-lit, and clearly composed. Production images include motion
              blur, occlusion, unusual angles, and edge cases nobody thought to
              include in the test set.
            </p>
            <p>
              <strong>Temporal correlation:</strong> If training and test images
              come from the same video sequences, the model might recognize
              backgrounds rather than objects. Always split by video or
              recording session, not by individual frames.
            </p>
            <p>
              <strong>Label noise:</strong> Ground truth is not actually ground
              truth - it is human annotation with errors. Inter-annotator
              disagreement of 5-10% is common for detection tasks. A model that
              disagrees with noisy labels might actually be correct.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🔍 HIDDEN FAILURE MODES
            </h3>
            <p>
              <strong>Small object collapse:</strong> mAP averages over all
              object sizes, but small objects are much harder to detect. High
              overall mAP can hide terrible small-object performance. Report AP
              by object size bucket.
            </p>
            <p>
              <strong>Confidence miscalibration:</strong> A model might rank
              detections correctly (good mAP) while having poorly calibrated
              confidence scores. A 0.9 confidence detection should be correct
              90% of the time - but many models are overconfident.
            </p>
            <div style="border-left: 4px solid; padding: 16px; border-radius: 8px; margin: 16px 0">
              <strong>🚨 Critical Warning:</strong> Never celebrate a metric
              improvement without understanding where it came from. A 2% mAP
              gain from better small-object detection is more valuable than a 5%
              gain from overfitting to your benchmark.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 15px">
                    Common Evaluation Failure Modes
                  </strong>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Small Objects</strong>
                    <div style="margin-top: 4px">
                      AP drops from 0.50 to 0.30
                      <br />
                      2px shift = IoU 0.7→0.4
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Weak NMS</strong>
                    <div style="margin-top: 4px">
                      3 boxes per object
                      <br />
                      Precision drops 40%
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Score Calibration</strong>
                    <div style="margin-top: 4px">
                      Overconfident scores
                      <br />
                      AP unchanged but P@R fails
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px">
                    <strong>Domain Shift</strong>
                    <div style="margin-top: 4px">
                      mAP 0.55→0.35
                      <br />
                      Night/blur/occlusion
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 13px; text-align: center">
                  <strong>Mitigation:</strong> Report AP@0.5, AP@0.75, per
                  class, per size, + inspect PR curves and failure galleries
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
                  Benchmark overfitting inflates numbers - hold out a final test
                  set you never touch during development
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  mAP equal class weighting can hide failures on
                  rare-but-critical classes; report per-class AP separately
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Distribution shift between benchmark and production data is
                  the most common source of deployment surprises
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Small object performance often hidden in overall mAP; always
                  report metrics by object size bucket
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
                  Interview Tip: When discussing evaluation, mention temporal
                  correlation as a common data leakage source - splitting by
                  frames instead of videos inflates scores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain confidence calibration as separate from
                  ranking quality - mAP measures ranking, but calibration
                  matters for downstream decision-making
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationEvaluationFailureModesAndMetricGamingRisks;
