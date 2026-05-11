import type { Component } from "solid-js";

const LessonCvEvaluationUnderstandingPrecisionRecallAndThePrecisionRecallCurve: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Understanding Precision, Recall, and the Precision Recall Curve
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p>
              Precision and recall are the fundamental metrics for understanding
              detection system behavior. These metrics reveal different failure
              modes and help you choose the right operating point for your
              specific use case.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              📐 PRECISION: HOW ACCURATE ARE YOUR DETECTIONS?
            </h3>
            <p>
              Precision answers: "Of all the boxes my model drew, how many
              actually contained objects?"
            </p>
            <p>
              <strong>
                Precision = True Positives / (True Positives + False Positives)
              </strong>
            </p>
            <p>
              A model with 90% precision means 9 out of 10 detections are
              correct. The remaining 10% are false alarms - boxes drawn where no
              object exists. Low precision creates noise: users see phantom
              detections everywhere, downstream systems waste resources
              processing fake objects.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🎯 RECALL: HOW COMPLETE IS YOUR COVERAGE?
            </h3>
            <p>
              Recall answers: "Of all the real objects in the image, how many
              did my model find?"
            </p>
            <p>
              <strong>
                Recall = True Positives / (True Positives + False Negatives)
              </strong>
            </p>
            <p>
              A model with 80% recall finds 8 out of 10 actual objects. The
              missing 20% are objects the model completely missed. Low recall
              means safety gaps: obstacles go undetected, defects slip past
              inspection, critical information gets lost.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              ⚖️ THE PRECISION-RECALL TRADE-OFF
            </h3>
            <p>
              Every detection model outputs confidence scores. By changing your
              confidence threshold, you trade precision for recall:
            </p>
            <ul style="margin: 12px 0; padding-left: 24px">
              <li style="margin: 8px 0">
                <strong>High threshold (0.9):</strong> Only keep very confident
                detections. Precision goes up (fewer false positives), recall
                goes down (more missed objects)
              </li>
              <li style="margin: 8px 0">
                <strong>Low threshold (0.3):</strong> Keep uncertain detections
                too. Recall goes up (find more objects), precision goes down
                (more false alarms)
              </li>
            </ul>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              📈 READING THE PR CURVE
            </h3>
            <p>
              The Precision-Recall curve plots precision (y-axis) against recall
              (x-axis) as you sweep through all confidence thresholds. A perfect
              model hugs the top-right corner (100% precision at 100% recall).
              Real models show a downward slope - gaining recall costs
              precision.
            </p>
            <p>
              The curve shape tells you about model quality. A curve that stays
              high before dropping indicates a model with good discrimination -
              it finds most true positives before false positives start
              appearing. A curve that drops immediately suggests the model
              struggles to separate real objects from background.
            </p>
            <div style="border-left: 4px solid; padding: 16px; border-radius: 8px; margin: 16px 0">
              <strong>⚠️ Key Insight:</strong> Different applications need
              different operating points on the same PR curve. Safety-critical
              systems prioritize recall (catch everything, tolerate false
              alarms). User-facing features often prioritize precision (show
              only confident results, accept missing some).
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 15px">
                    Confidence Threshold Trade Off
                  </strong>
                </div>
                <div style="display: flex; gap: 10px; align-items: center">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>High Threshold</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      98% Precision
                      <br />
                      60% Recall
                      <br />
                      <em>Content moderation</em>
                    </div>
                  </div>
                  <div style="font-size: 20px; font-weight: bold">↔</div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center">
                    <strong>Low Threshold</strong>
                    <div style="margin-top: 8px; font-size: 13px">
                      70% Precision
                      <br />
                      95% Recall
                      <br />
                      <em>Warehouse counting</em>
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 13px; text-align: center">
                  <strong>Area under PR curve = Average Precision (AP)</strong>
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
                  Precision = TP/(TP+FP) measures detection accuracy; low
                  precision floods system with false alarms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recall = TP/(TP+FN) measures coverage completeness; low recall
                  creates dangerous blind spots
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Confidence threshold controls the trade-off: raise threshold
                  for precision, lower for recall
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  PR curve shape reveals model quality - curves staying high
                  longer indicate better discrimination
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
                  Interview Tip: When asked about metric choice, tie it to
                  business impact - medical screening needs high recall (catch
                  all cases), spam filters need high precision (avoid blocking
                  good email)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain that a single precision or recall
                  number is meaningless without knowing the operating threshold
                  - always discuss the full PR curve
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationUnderstandingPrecisionRecallAndThePrecisionRecallCurve;
