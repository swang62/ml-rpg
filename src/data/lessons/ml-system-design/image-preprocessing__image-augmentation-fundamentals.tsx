import type { Component } from "solid-js";

const LessonImagePreprocessingImageAugmentationFundamentals: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Image Augmentation Fundamentals
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
              <strong>Image Augmentation</strong> is the practice of applying
              random transformations to training images to artificially expand
              dataset diversity. By showing the model variations of each image,
              augmentation prevents overfitting and improves generalization to
              unseen data.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Why Augmentation Works
          </p>
          <p style="margin-top: 0">
            Neural networks learn from examples. With 10,000 training images,
            the model sees each image hundreds of times during training. It
            starts memorizing specific pixel patterns rather than learning
            general features. Augmentation breaks this memorization by ensuring
            no two presentations of an image are identical.
          </p>
          <p>
            <strong>The multiplier effect:</strong> Apply random crops, flips,
            and color changes, and your 10,000 images become effectively
            100,000+ unique training examples. The model cannot memorize what
            keeps changing.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Core Augmentation Techniques
          </p>
          <p style="margin-top: 0">
            <strong>Geometric transforms:</strong> Random cropping, horizontal
            flipping, rotation, scaling. These teach the model that objects
            remain the same regardless of position or orientation.
          </p>
          <p>
            <strong>Color transforms:</strong> Brightness, contrast, saturation,
            hue adjustments. These teach robustness to lighting conditions.
          </p>
          <p>
            <strong>Noise and blur:</strong> Gaussian noise, motion blur,
            compression artifacts. These prepare the model for imperfect
            real-world images.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Impact on Model Performance
          </p>
          <p style="margin-top: 0">
            Without augmentation, models overfit within 10-20 epochs on small
            datasets. With proper augmentation, the same model continues
            improving for 100+ epochs. Typical accuracy gains range from 5-15%
            on held-out test data.
          </p>
        </div>
        <div
          class="card-diagram"
          style="margin-bottom: 24px; display: flex; justify-content: center"
        >
          <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                  Geometric
                </strong>
                <div style="font-size: 12px; line-height: 1.5">
                  Crop, Flip, Rotate ±10°
                  <br />
                  Translate ±20%, Scale 0.8–1.2x
                  <br />
                  Perspective warp
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                  Photometric
                </strong>
                <div style="font-size: 12px; line-height: 1.5">
                  Brightness ±0.3
                  <br />
                  Contrast ±0.3, Saturation ±0.3
                  <br />
                  Hue shift ±18°
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                  Noise Based
                </strong>
                <div style="font-size: 12px; line-height: 1.5">
                  Gaussian noise σ=0.01
                  <br />
                  JPEG quality 70–100
                  <br />
                  Motion blur 3x3 kernel
                </div>
              </div>
              <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                <strong style="font-size: 13px; display: block; margin-bottom: 8px">
                  Sample Mixing
                </strong>
                <div style="font-size: 12px; line-height: 1.5">
                  MixUp: blend 2 images
                  <br />
                  CutMix: paste regions
                  <br />
                  Linear label interpolation
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Augmentation prevents memorization by ensuring no two
                presentations of an image are identical during training
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Random transforms effectively multiply dataset size 10x or more
                without collecting new data
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Geometric transforms teach position/orientation invariance;
                color transforms teach lighting robustness
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Typical accuracy gains from proper augmentation are 5-15% on
                held-out test data
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
                Interview Tip: Explain augmentation as regularization - it
                prevents overfitting by adding noise to the training signal
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Interview Tip: Mention the multiplier effect - with 5
                augmentation types, each image effectively becomes 32+ unique
                samples
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonImagePreprocessingImageAugmentationFundamentals;
