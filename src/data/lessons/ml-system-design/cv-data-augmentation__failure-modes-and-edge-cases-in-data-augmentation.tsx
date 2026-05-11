import type { Component } from "solid-js";

const LessonCvDataAugmentationFailureModesAndEdgeCasesInDataAugmentation: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Failure Modes and Edge Cases in Data Augmentation
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MIXUP BREAKS OBJECT DETECTION
            </p>
            <p style="margin-top: 0">
              Naive Mixup blends two images, creating overlapping objects with
              contradictory bounding boxes. If image A has a car at
              [10,20,100,80] and image B has a truck at [50,30,150,100], the
              blended image has neither object correctly located. IoU
              (Intersection over Union) drops 5-15 percentage points.{" "}
              <strong>Fix:</strong> Use CutMix instead, which pastes a
              rectangular patch from one image onto another, keeping bounding
              boxes intact for the unoccluded regions.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              OVER-REGULARIZATION SYMPTOMS
            </p>
            <p style="margin-top: 0">
              Combining strong augmentation with other regularizers (Mixup
              α&gt;0.4 + label smoothing + heavy RandAugment + dropout) can
              prevent learning. Symptoms: training accuracy plateaus below
              validation accuracy, convergence slows 50-100%, final accuracy is
              1-3 percentage points lower than optimal. <strong>Fix:</strong>{" "}
              Reduce augmentation strength. If training accuracy is
              significantly below validation, you are over-regularizing.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DOMAIN-SPECIFIC FAILURES
            </p>
            <p style="margin-top: 0">
              <strong>Medical imaging:</strong> Color carries diagnostic signal
              (skin lesion redness indicates inflammation). Heavy color jitter
              destroys this information.
              <br />
              <strong>Text recognition:</strong> Rotation beyond ±5° makes
              characters unreadable.
              <br />
              <strong>Audio spectrograms:</strong> Time stretching distorts
              frequency relationships.
              <br />
              Always validate augmentation effects on domain experts before
              deploying.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>⚠️ Key Trade-off:</strong> Augmentations that help natural
              image classification may actively hurt specialized domains. No
              policy is universally correct.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              AUTOAUGMENT PROXY OVERFITTING
            </p>
            <p style="margin-top: 0">
              Policies discovered on 10% data subsets or small proxy models (5
              epochs) may not transfer to full-scale training. A policy showing
              2% improvement on proxy might show 0% or negative transfer at full
              scale. Always validate discovered policies on held-out data slices
              at full training scale before production use.
            </p>
          </div>
          <div class="Learn_keyTakeaways p-4 mb-4">
            <div class="Learn_keyTakeawaysHeader mb-3 pb-3">
              💡 Key Takeaways
            </div>
            <div class="d-flex flex-column gap-2">
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Naive Mixup breaks detection: overlapping objects with
                  contradictory boxes drop IoU 5-15 percentage points; use
                  CutMix instead
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Over-regularization: training accuracy below validation, slow
                  convergence, 1-3 percentage points accuracy loss
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Domain-specific failures: color jitter hurts medical imaging,
                  rotation breaks text recognition
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  AutoAugment proxy overfitting: policies from small subsets may
                  show zero or negative transfer at full scale
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
                  Describe the Mixup detection problem: blended bounding boxes
                  are invalid; CutMix preserves boxes in unoccluded regions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain over-regularization diagnosis: if training accuracy is
                  below validation, reduce augmentation strength
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention domain-specific considerations: color matters in
                  medical, rotation limits for text, validate with domain
                  experts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationFailureModesAndEdgeCasesInDataAugmentation;
