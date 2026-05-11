import type { Component } from "solid-js";

const LessonCvDataAugmentationWhatIsDataAugmentationInComputerVision: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            What is Data Augmentation in Computer Vision?
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
                <strong>Data augmentation</strong> artificially expands your
                training dataset by applying transformations (rotation,
                cropping, color changes) to existing images. This teaches the
                model that a cat rotated 15 degrees is still a cat, improving
                generalization without collecting more real data.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHY AUGMENTATION MATTERS
            </p>
            <p style="margin-top: 0">
              Deep neural networks have millions of parameters and easily
              memorize training data. Without augmentation, a model trained on
              10,000 images might achieve 99% training accuracy but only 70% on
              new images. Augmentation forces the model to learn invariant
              features ("cat" = cat regardless of position, lighting, or angle)
              rather than memorizing specific pixel patterns.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMMON TRANSFORMATIONS
            </p>
            <p style="margin-top: 0">
              <strong>Geometric:</strong> Random crops (224x224 from 256x256),
              horizontal flips (50% probability), rotations (±15 degrees),
              scaling (0.8-1.2x).
              <br />
              <strong>Photometric:</strong> Brightness adjustment (±0.4),
              contrast changes, saturation shifts, Gaussian blur.
              <br />
              <strong>Regularization:</strong> Cutout (mask random patches),
              Mixup (blend two images), CutMix (paste patch from one image onto
              another).
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Augmentation is essentially free
              data. Adding random crops and flips typically improves accuracy
              1-3 percentage points with negligible training cost increase.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE REQUIREMENTS
            </p>
            <p style="margin-top: 0">
              Online augmentation (during training) must not become a
              bottleneck. Target: 2,000-3,000 images per second to saturate 8
              GPUs. Budget: 1-2 milliseconds per image for all transforms
              combined. Allocate 4-8 CPU cores per GPU to avoid data loading
              bottlenecks.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px; align-items: center">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Original Image</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    1,000 samples
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Augmentation Pipeline</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Flip + Crop + Color Jitter
                  </div>
                  <div style="font-size: 12px">1 to 2 ms per image</div>
                </div>
                <div style="font-size: 24px; font-weight: bold">↓</div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; min-width: 180px; text-align: center">
                  <strong style="font-size: 14px">Training Data</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Effectively 10,000+ variations
                  </div>
                  <div style="font-size: 12px">per epoch</div>
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
                  Augmentation creates virtual training data by applying
                  transformations, improving generalization without collecting
                  more real data
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Common transforms: random crops, horizontal flips, rotation
                  (±15°), brightness/contrast changes, and regularization
                  techniques
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Throughput target: 2,000-3,000 images/second for 8 GPU
                  training; budget 1-2ms per image for all transforms
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Typical accuracy improvement: 1-3 percentage points on image
                  classification benchmarks
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
                  When explaining data augmentation, cover both geometric
                  transforms (crops, flips, rotations) and photometric
                  transforms (brightness, contrast, color)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention the throughput requirement: 4-8 CPU cores per GPU to
                  avoid becoming a data loading bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Emphasize that augmentation is essentially free data,
                  providing accuracy gains with minimal compute overhead
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationWhatIsDataAugmentationInComputerVision;
