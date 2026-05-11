import type { Component } from "solid-js";

const LessonCvEvaluationWhatIsIntersectionOverUnionIouAndWhyDoesItMatter: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Intersection over Union (IoU) and Why Does It Matter?
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
                <strong>Intersection over Union (IoU)</strong> measures how well
                a predicted bounding box matches the ground truth box. It is the
                area of overlap divided by the area of union:{" "}
                <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                  IoU = (Area of Overlap) / (Area of Union)
                </code>
                . IoU ranges from 0 (no overlap) to 1 (perfect match).
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY SIMPLE METRICS FAIL
            </p>
            <p style="margin-top: 0">
              You cannot evaluate detection by counting "correct" predictions
              alone. A box that overlaps 10% of a car is technically a
              detection, but useless. A box twice the size of the object is also
              a detection, but wasteful. IoU quantifies localization quality,
              not just presence.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              IOU THRESHOLDS
            </p>
            <p style="margin-top: 0">
              A detection is considered "correct" if IoU exceeds a threshold.{" "}
              <strong>IoU=0.5:</strong> The PASCAL VOC standard. Lenient; allows
              boxes 50% off. <strong>IoU=0.75:</strong> Stricter; requires tight
              localization. <strong>IoU=0.5:0.95:</strong> The COCO standard
              averages across 10 thresholds (0.5, 0.55, ..., 0.95) to reward
              both detection and precise localization.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> COCO mAP (averaging 0.5:0.95) is
              roughly half of PASCAL mAP (0.5 only) for the same model. Always
              specify which protocol you are using.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CALCULATING IOU
            </p>
            <p style="margin-top: 0">
              Given two boxes with corners (x1, y1, x2, y2): find intersection
              area = max(0, min(x2a, x2b) - max(x1a, x1b)) × max(0, min(y2a,
              y2b) - max(y1a, y1b)). Union area = area_a + area_b -
              intersection. Computationally cheap: 10-20 operations per pair.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 480px">
              <div style="display: flex; flex-direction: column; gap: 14px">
                <div style="border: 2px solid; padding: 14px; border-radius: 6px">
                  <strong style="font-size: 15px">IoU Calculation</strong>
                  <div style="margin-top: 8px; font-size: 13px">
                    Intersection Area ÷ Union Area
                  </div>
                </div>
                <div style="display: flex; gap: 12px; justify-content: space-around">
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 14px">IoU = 0.5</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      PASCAL VOC
                      <br />
                      Lenient match
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center; flex: 1">
                    <strong style="font-size: 14px">IoU = 0.75</strong>
                    <div style="margin-top: 6px; font-size: 12px">
                      Tight alignment
                      <br />
                      Robotics tasks
                    </div>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; font-size: 13px">
                  <strong>Impact:</strong> AP drops 15 to 30 points moving from
                  IoU 0.5 to 0.75
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
                  IoU = overlap area / union area; ranges 0 (no overlap) to 1
                  (perfect match)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IoU thresholds: 0.5 (PASCAL, lenient), 0.75 (strict), 0.5:0.95
                  (COCO, comprehensive)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  COCO mAP is roughly half of PASCAL mAP for the same model due
                  to stricter thresholds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IoU computation is cheap: 10-20 operations per box pair
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
                  When explaining IoU, draw two overlapping boxes and calculate
                  overlap/union areas step by step
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Clarify the threshold difference: PASCAL 0.5 is lenient, COCO
                  0.5:0.95 rewards precise localization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention that COCO mAP ≈ 0.5 × PASCAL mAP to avoid comparing
                  apples to oranges
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvEvaluationWhatIsIntersectionOverUnionIouAndWhyDoesItMatter;
