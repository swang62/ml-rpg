import type { Component } from "solid-js";

const LessonImagePreprocessingCommonPreprocessingFailureModesInProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Common Preprocessing Failure Modes in Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Training-Serving Skew
            </p>
            <p style="margin-top: 0">
              The most common preprocessing failure: training and serving use
              different preprocessing code. Accuracy drops 10-30% with no
              obvious error. The model runs, predictions come out, but they are
              wrong.
            </p>
            <p>
              <strong>Common causes:</strong> Different image libraries (PIL vs
              OpenCV). Different resize interpolation methods. Normalization
              values hardcoded differently in training and serving code. RGB vs
              BGR channel order mismatch.
            </p>
            <p>
              <strong>Prevention:</strong> Share a single preprocessing function
              between training and serving. Package preprocessing code with the
              model artifact. Test that training and serving produce identical
              tensors for the same input image.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Silent Data Corruption
            </p>
            <p style="margin-top: 0">
              <strong>Truncated images:</strong> Partial downloads or disk
              errors produce incomplete JPEG files. Some decoders crash, others
              return partial images. Neither behavior is correct for production.
            </p>
            <p>
              <strong>Color profile mismatches:</strong> Images with embedded
              ICC profiles decode differently across libraries. A calibrated
              photo might render with shifted colors.
            </p>
            <p>
              <strong>Detection:</strong> Validate image dimensions after
              loading. Check for unusual pixel value distributions. Log decode
              failures separately from inference failures.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Augmentation Bugs
            </p>
            <p style="margin-top: 0">
              <strong>Label-breaking transforms:</strong> Horizontal flip is
              safe for object detection but breaks text recognition. Rotation is
              safe for single objects but breaks multi-object relationships.
              Verify augmentations preserve label validity.
            </p>
            <p>
              <strong>Distribution shift:</strong> Aggressive augmentation can
              push images out of natural distribution. Over-rotated,
              over-blurred images may harm performance. Monitor validation
              accuracy as you add augmentations.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Key Warning:</strong> Preprocessing bugs produce no errors
              - just wrong predictions. Always verify tensor equality between
              training and serving pipelines with test images.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="font-weight: bold; font-size: 14px; margin-bottom: 12px; text-align: center">
                Training vs Inference Mismatch
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                    Training
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    Pixels / 255
                    <br />
                    (x − 0.485) / 0.229
                    <br />
                    RGB order
                    <br />
                    Range: [−2.1, 2.6]
                  </div>
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px">
                  <strong style="font-size: 12px; display: block; margin-bottom: 6px">
                    Inference (Wrong)
                  </strong>
                  <div style="font-size: 11px; line-height: 1.5">
                    Pixels in [0, 255]
                    <br />
                    No normalization
                    <br />
                    BGR order
                    <br />
                    <strong>Accuracy: 72% → 64%</strong>
                  </div>
                </div>
              </div>
              <div style="margin-top: 12px; padding: 10px; border: 2px solid; border-radius: 6px">
                <strong style="font-size: 11px">Impact:</strong>
                <div style="font-size: 10px; margin-top: 4px; line-height: 1.4">
                  Distribution shift: mean changes from ~0 to ~127. First layer
                  weights optimized for normalized inputs see out of
                  distribution data. Result: 8 point accuracy drop in
                  production.
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
                  Training-serving skew from different preprocessing code causes
                  10-30% accuracy drops with no errors
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Share single preprocessing function between training and
                  serving to prevent skew
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Truncated images and color profile mismatches cause silent
                  data corruption
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Some augmentations break labels (horizontal flip breaks text,
                  rotation breaks relationships)
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
                  Interview Tip: Mention training-serving skew as a top
                  production ML bug - it produces no errors, just wrong
                  predictions
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Describe prevention strategy: package
                  preprocessing code with model, test tensor equality on sample
                  images
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImagePreprocessingCommonPreprocessingFailureModesInProduction;
