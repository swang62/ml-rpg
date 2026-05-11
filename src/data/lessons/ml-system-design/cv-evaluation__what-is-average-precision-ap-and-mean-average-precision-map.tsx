import type { Component } from "solid-js";

const LessonCvEvaluationWhatIsAveragePrecisionApAndMeanAveragePrecisionMap: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Average Precision (AP) and Mean Average Precision (mAP)?
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p>
              Average Precision and Mean Average Precision are the standard
              metrics for comparing detection models. Understanding how they
              work helps you interpret benchmark results and choose the right
              model for your application.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              📊 AVERAGE PRECISION (AP): SINGLE-CLASS SUMMARY
            </h3>
            <p>
              Average Precision summarizes the entire PR curve into a single
              number. It measures the area under the Precision-Recall curve -
              the larger the area, the better the model performs across all
              operating points.
            </p>
            <p>
              The calculation ranks all detections by confidence, then computes
              precision at each recall level where a new true positive appears.
              AP averages these precision values, weighting each by the increase
              in recall it represents.
            </p>
            <p>
              <strong>Example:</strong> Imagine your model outputs 10 ranked
              detections for the "car" class. As you walk down this list, some
              are true positives (actual cars) and some are false positives. AP
              rewards a model that puts true positives at the top of this ranked
              list - high-confidence detections should be correct ones.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              🎯 MEAN AVERAGE PRECISION (mAP): CROSS-CLASS SCORE
            </h3>
            <p>
              mAP extends AP across multiple object classes. Calculate AP
              separately for each class (cars, pedestrians, trucks, etc.), then
              average them together.
            </p>
            <p>
              <strong>
                mAP = (AP_cars + AP_pedestrians + AP_trucks + ...) /
                number_of_classes
              </strong>
            </p>
            <p>
              This averaging treats all classes equally, regardless of how many
              instances each class has. A model that excels at detecting common
              objects but fails on rare ones will show it in the per-class AP
              breakdown.
            </p>
            <h3 style="font-weight: 600; margin: 24px 0 12px 0; font-size: 1.1rem">
              ⚙️ IOU THRESHOLDS IN MAP
            </h3>
            <p>
              A detection counts as a true positive only if its IoU with the
              ground truth exceeds a threshold. Different thresholds test
              different precision levels:
            </p>
            <ul style="margin: 12px 0; padding-left: 24px">
              <li style="margin: 8px 0">
                <strong>mAP@0.5:</strong> Lenient threshold. Box needs 50%
                overlap to count as correct. Tests if the model roughly finds
                objects.
              </li>
              <li style="margin: 8px 0">
                <strong>mAP@0.75:</strong> Strict threshold. Requires 75%
                overlap. Tests localization precision.
              </li>
              <li style="margin: 8px 0">
                <strong>mAP@[0.5:0.95]:</strong> COCO standard. Averages mAP
                across thresholds from 0.5 to 0.95 in steps of 0.05.
                Comprehensive score that rewards both detection and precise
                localization.
              </li>
            </ul>
            <div style="border-left: 4px solid; padding: 16px; border-radius: 8px; margin: 16px 0">
              <strong>💡 Key Insight:</strong> Two models with similar mAP@0.5
              can have very different mAP@0.75 scores. The model with better
              localization maintains performance at stricter thresholds. Always
              check the full threshold range when comparing models.
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
                    Computing Average Precision (AP)
                  </strong>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 13px">
                  1. Sort predictions by confidence (descending)
                  <br />
                  2. Match to ground truth using IoU threshold
                  <br />
                  3. Compute precision and recall at each point
                  <br />
                  4. Interpolate precision at each recall level
                  <br />
                  5. Area under curve = AP
                </div>
                <div style="display: flex; gap: 10px">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>AP@0.5</strong>
                    <div style="margin-top: 6px">
                      VOC style
                      <br />
                      0.75 typical
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; flex: 1; text-align: center; font-size: 13px">
                    <strong>AP@[.5:.95]</strong>
                    <div style="margin-top: 6px">
                      COCO style
                      <br />
                      0.45 to 0.55
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; font-size: 12px; text-align: center">
                  <strong>mAP:</strong> Average AP across classes or IoU
                  thresholds
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
                  AP = area under PR curve; summarizes model performance across
                  all confidence thresholds into one number
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  mAP averages AP across all classes, treating each class
                  equally regardless of instance count
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IoU threshold determines what counts as correct: 0.5 is
                  lenient, 0.75 is strict, 0.5:0.95 is comprehensive
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Per-class AP breakdown reveals class imbalance issues that mAP
                  average can hide
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
                  Interview Tip: When discussing benchmarks, always ask what IoU
                  threshold was used - mAP@0.5 vs mAP@0.75 can differ by 20+
                  points for the same model
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain that mAP rewards ranking quality - a
                  model that puts true positives at the top of its
                  confidence-sorted list scores higher
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationWhatIsAveragePrecisionApAndMeanAveragePrecisionMap;
