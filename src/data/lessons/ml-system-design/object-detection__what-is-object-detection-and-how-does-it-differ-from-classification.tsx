import type { Component } from "solid-js";

const LessonObjectDetectionWhatIsObjectDetectionAndHowDoesItDifferFromClassification: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Object Detection and How Does It Differ From Classification?
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
                <strong>Object Detection</strong> locates and identifies
                multiple objects in an image by predicting both bounding boxes
                (where objects are) and class labels (what objects are). Unlike
                classification which outputs one label per image, detection
                outputs multiple boxes with labels and confidence scores.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Classification vs Detection
            </p>
            <p style="margin-top: 0">
              <strong>Classification:</strong> Input is an image, output is a
              single label. Is this a cat or a dog? The model assumes one
              primary object fills the frame.
            </p>
            <p>
              <strong>Detection:</strong> Input is an image, output is a list of
              (box, label, confidence) tuples. Where are all the cars,
              pedestrians, and traffic signs? Each object gets its own bounding
              box, class prediction, and confidence score.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Detection Pipeline
            </p>
            <p style="margin-top: 0">
              Every detector must solve two problems: localization (where is the
              object?) and classification (what is it?). The core challenge is
              handling an unknown number of objects at unknown locations without
              exhaustively checking every possible box.
            </p>
            <p>
              <strong>Anchor boxes:</strong> Most detectors pre-define a grid of
              reference boxes at multiple scales and aspect ratios. The model
              predicts adjustments to these anchors rather than raw coordinates.
              A 416x416 image might have 10,000+ anchor boxes, each a potential
              detection.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Key Metrics
            </p>
            <p style="margin-top: 0">
              <strong>IoU (Intersection over Union):</strong> Measures how well
              a predicted box overlaps with the ground truth. IoU of 0.5 means
              50% overlap, typically the minimum for a correct detection.
            </p>
            <p>
              <strong>mAP (mean Average Precision):</strong> Summarizes
              precision and recall across all classes and confidence thresholds.
              mAP@0.5 uses 50% IoU threshold; mAP@[0.5:0.95] averages across
              stricter thresholds.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; gap: 20px; align-items: center; justify-content: center">
                <div style="border: 2px solid; padding: 16px; border-radius: 6px; min-width: 220px">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center">
                    Classification
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    Input: Image
                    <br />
                    Output: <strong>"street scene"</strong>
                    <br />
                    Single label for whole image
                  </div>
                </div>
                <div style="font-size: 28px; font-weight: bold">→</div>
                <div style="border: 2px solid; padding: 16px; border-radius: 6px; min-width: 220px">
                  <div style="font-weight: bold; margin-bottom: 8px; text-align: center">
                    Detection
                  </div>
                  <div style="font-size: 13px; line-height: 1.5">
                    Input: Image
                    <br />
                    Output:{" "}
                    <strong>
                      5 cars + boxes
                      <br />3 pedestrians + boxes
                      <br />2 traffic lights + boxes
                    </strong>
                    <br />
                    Multiple localized objects
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
                  Detection outputs (box, label, confidence) tuples for multiple
                  objects; classification outputs one label per image
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Anchor boxes pre-define candidate locations - a typical image
                  has 10,000+ anchors to evaluate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  IoU measures box overlap quality; 0.5 is minimum acceptable,
                  0.75+ indicates precise localization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  mAP summarizes detection quality across classes and thresholds
                  - the standard benchmark metric
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
                  Interview Tip: Clarify whether the task needs detection or
                  classification first - the architectures and compute
                  requirements differ by 10x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention IoU threshold when discussing accuracy
                  - mAP@0.5 vs mAP@0.75 can differ by 20+ points
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonObjectDetectionWhatIsObjectDetectionAndHowDoesItDifferFromClassification;
