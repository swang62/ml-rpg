import type { Component } from "solid-js";

const LessonObjectDetectionFailureModesAndEdgeCasesInProductionObjectDetection: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Production Object Detection
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Small Object Detection Failures
            </p>
            <p style="margin-top: 0">
              Objects smaller than 32x32 pixels are notoriously difficult to
              detect. At low resolution feature maps, small objects occupy just
              a few pixels, providing insufficient signal for reliable
              detection. Accuracy on small objects can be 20-30% lower than
              large objects.
            </p>
            <p>
              <strong>Symptoms:</strong> High recall on large objects,
              dramatically lower recall on small objects. Bounding boxes on
              small detections are imprecise.
            </p>
            <p>
              <strong>Mitigation:</strong> Use higher resolution input images.
              Add detection heads at earlier (higher resolution) feature map
              stages. Apply multi-scale testing at inference time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Occlusion and Truncation
            </p>
            <p style="margin-top: 0">
              Partially visible objects confuse detectors. A person half-hidden
              behind a car may not be detected at all. Truncated objects at
              image borders often receive incorrect bounding boxes or are missed
              entirely.
            </p>
            <p>
              <strong>Symptoms:</strong> Low recall in crowded scenes. False
              negatives concentrated near scene edges and behind obstacles.
            </p>
            <p>
              <strong>Mitigation:</strong> Include heavily occluded examples in
              training data with appropriate labels. Use soft labels for
              ambiguous cases. Apply specialized loss functions that handle
              partial visibility.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Class Imbalance
            </p>
            <p style="margin-top: 0">
              Background regions vastly outnumber object regions. In a typical
              image, 99%+ of anchor boxes are background. Without correction,
              the model learns to predict everything as background.
            </p>
            <p>
              <strong>Mitigation:</strong> Focal loss down-weights easy
              negatives (confident background predictions) and focuses learning
              on hard examples. Hard negative mining explicitly samples
              difficult background regions. Both techniques are standard in
              modern detectors.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Domain Shift
            </p>
            <p style="margin-top: 0">
              Models trained on curated datasets struggle with real-world
              messiness. Rain, fog, motion blur, unusual camera angles, and
              lighting conditions absent from training data cause silent
              accuracy drops of 10-30%.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="font-weight: bold; margin-bottom: 12px; text-align: center; font-size: 15px">
                Common Failure Modes
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Crowded Scenes</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    NMS suppresses true positives, spikes to 30% latency
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Small Objects (8×8 px)
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Below receptive field, missed by stride 32 features
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">
                    Motion Blur / Low Light
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10–20% recall drop at night, false positives on glare
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px 12px; border-radius: 6px">
                  <strong style="font-size: 13px">Domain Shift</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Miscalibrated confidence on new cameras or geography
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
                  Small object accuracy can be 20-30% lower than large objects
                  due to insufficient feature resolution
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Occlusion and truncation cause missed detections - include
                  partially visible examples in training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  99%+ of anchor boxes are background - focal loss and hard
                  negative mining address this imbalance
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain shift from training data to production causes 10-30%
                  accuracy drops silently
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
                  Interview Tip: When discussing failure modes, mention small
                  objects first - this is where most detectors struggle
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain focal loss as attention redistribution
                  - it makes the model focus on hard examples
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionFailureModesAndEdgeCasesInProductionObjectDetection;
