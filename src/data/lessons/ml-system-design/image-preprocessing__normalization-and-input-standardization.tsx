import type { Component } from "solid-js";

const LessonImagePreprocessingNormalizationAndInputStandardization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Normalization and Input Standardization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why Normalization Matters
            </p>
            <p style="margin-top: 0">
              Raw pixel values range from 0-255. Neural networks learn faster
              and more stably when inputs have zero mean and unit variance.
              Without normalization, gradients explode or vanish, training
              becomes unstable, and convergence takes 2-10x longer.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Standard Normalization Approaches
            </p>
            <p style="margin-top: 0">
              <strong>Simple scaling:</strong> Divide pixels by 255 to get 0-1
              range. Fast but suboptimal because the distribution is not
              centered.
            </p>
            <p>
              <strong>Mean subtraction:</strong> Subtract dataset mean from each
              pixel. Centers the distribution around zero. Compute mean once on
              training data and apply to all images.
            </p>
            <p>
              <strong>Full standardization:</strong> Subtract mean and divide by
              standard deviation. Produces zero mean and unit variance. This is
              the standard approach for pretrained models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pretrained Model Requirements
            </p>
            <p style="margin-top: 0">
              Pretrained models expect specific normalization. ImageNet models
              expect RGB values normalized with mean=[0.485, 0.456, 0.406] and
              std=[0.229, 0.224, 0.225]. Using wrong normalization with
              pretrained weights degrades accuracy by 10-30%.
            </p>
            <p>
              <strong>Critical rule:</strong> Always use the same normalization
              for training and inference. If you train with ImageNet
              normalization, you must apply ImageNet normalization at serving
              time. Mismatches cause silent accuracy drops.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Channel Order and Color Space
            </p>
            <p style="margin-top: 0">
              <strong>RGB vs BGR:</strong> Some frameworks use RGB, others use
              BGR. OpenCV loads images in BGR by default. Mixing up channel
              order flips red and blue, causing accuracy drops of 5-15%.
            </p>
            <p>
              <strong>Grayscale conversion:</strong> For models expecting
              single-channel input, convert using the luminance formula: Y =
              0.299R + 0.587G + 0.114B. Simple averaging produces inferior
              results.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Raw RGB Pixels</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Range: [0, 255] per channel
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ Divide by 255
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Scaled to [0, 1]</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Float representation
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓ (x − μ) / σ
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Normalized Tensor</strong>
                  <div style="font-size: 11px; margin-top: 8px; line-height: 1.4">
                    R: (x − 0.485) / 0.229
                    <br />
                    G: (x − 0.456) / 0.224
                    <br />
                    B: (x − 0.406) / 0.225
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
                  Normalization speeds training 2-10x by preventing gradient
                  explosion and vanishing
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Pretrained ImageNet models require specific normalization:
                  mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Training and inference must use identical normalization -
                  mismatches cause silent accuracy drops of 10-30%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  RGB vs BGR channel order matters - mixing them up drops
                  accuracy 5-15%
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
                  Interview Tip: Mention training-serving skew from
                  normalization mismatch as a common production bug
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Explain that pretrained model documentation
                  specifies required normalization - always check before
                  fine-tuning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImagePreprocessingNormalizationAndInputStandardization;
