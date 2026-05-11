import type { Component } from "solid-js";

const LessonCvDataAugmentationMixupLinearInterpolationForRegularization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Mixup: Linear Interpolation for Regularization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              WHAT MIXUP DOES
            </p>
            <p style="margin-top: 0">
              Mixup blends pairs of training images and their labels using
              linear interpolation. If image A is a cat (label [1,0]) and image
              B is a dog (label [0,1]), with mixing coefficient λ=0.7, the
              blended image is{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                0.7×A + 0.3×B
              </code>{" "}
              and the label becomes{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                [0.7, 0.3]
              </code>
              . This soft labeling acts as a regularizer, preventing the model
              from being overconfident.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              THE MIXING COEFFICIENT
            </p>
            <p style="margin-top: 0">
              Sample λ from a Beta distribution:{" "}
              <code style="padding: 2px 6px; border-radius: 3px; font-family: monospace">
                λ ~ Beta(α, α)
              </code>
              . The hyperparameter α controls mixing strength. α=0.2 produces λ
              values concentrated near 0 or 1 (most images are nearly unmixed).
              α=0.4 allows more blending. Higher α (&gt;0.5) creates stronger
              regularization but risks underfitting. Start with α=0.2-0.4 for
              most classification tasks.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              CALIBRATION BENEFITS
            </p>
            <p style="margin-top: 0">
              Beyond accuracy, Mixup improves model calibration. Standard
              training produces overconfident predictions: the model outputs
              0.99 probability for classes it only gets right 85% of the time.
              Mixup reduces Expected Calibration Error (ECE) by 2-5 percentage
              points, making confidence scores more reliable for downstream
              decision systems.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Key Insight:</strong> Mixup is particularly effective
              for Vision Transformers, which are more prone to overfitting than
              CNNs on medium sized datasets.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              COMPUTATIONAL OVERHEAD
            </p>
            <p style="margin-top: 0">
              Mixup adds negligible overhead: less than 0.5 milliseconds per
              image for blending on CPU. The operation is a simple weighted
              average of pixel values. With proper pipelining, GPU utilization
              is unaffected. Typical accuracy improvement: 0.5-2 percentage
              points on top-1 accuracy for models without heavy baseline
              regularization.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="display: flex; gap: 12px; justify-content: center">
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Image A</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Label: Cat (1.0)
                    </div>
                  </div>
                  <div style="border: 2px solid; padding: 10px; border-radius: 6px; flex: 1; text-align: center">
                    <strong style="font-size: 13px">Image B</strong>
                    <div style="font-size: 12px; margin-top: 4px">
                      Label: Dog (1.0)
                    </div>
                  </div>
                </div>
                <div style="text-align: center; font-size: 13px; font-weight: bold">
                  Lambda = 0.7 from Beta(0.4, 0.4)
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Mixed Image</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Pixels: 0.7 × A + 0.3 × B
                  </div>
                  <div style="font-size: 12px">Label: 0.7 Cat + 0.3 Dog</div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Training Result</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Smoother decision boundary
                  </div>
                  <div style="font-size: 12px">Better calibration</div>
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
                  Mixup blends pairs of images and labels: 0.7×A + 0.3×B with
                  soft label [0.7, 0.3]
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mixing coefficient λ ~ Beta(α, α) with α=0.2-0.4 typical;
                  higher α means stronger regularization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Improves calibration: reduces Expected Calibration Error by
                  2-5 percentage points for more reliable confidence scores
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Particularly effective for Vision Transformers; negligible
                  compute overhead (&lt;0.5ms per image)
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
                  Explain the Beta distribution: α=0.2 keeps most images nearly
                  unmixed, α=0.4 allows more blending
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention calibration benefit: predictions become more reliable,
                  not just more accurate
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Warn about underfitting: α&gt;0.5 combined with label
                  smoothing and strong color jitter can slow convergence
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationMixupLinearInterpolationForRegularization;
