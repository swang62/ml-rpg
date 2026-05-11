import type { Component } from "solid-js";

const LessonImagePreprocessingOfflineVsOnTheFlyAugmentationTradeoffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Offline vs On the Fly Augmentation Tradeoffs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Two Augmentation Strategies
            </p>
            <p style="margin-top: 0">
              Augmentation can happen before training (offline) or during
              training (on the fly). Each approach has distinct advantages for
              different scenarios.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Offline Augmentation
            </p>
            <p style="margin-top: 0">
              <strong>How it works:</strong> Generate augmented copies of each
              image before training starts. Store all variations on disk.
              Training reads pre-augmented images directly.
            </p>
            <p>
              <strong>Advantages:</strong> No CPU overhead during training.
              Training runs at maximum speed. Useful when training is the
              bottleneck or when augmentations are computationally expensive.
            </p>
            <p>
              <strong>Disadvantages:</strong> Fixed augmentations - the model
              sees the same variations every epoch. Storage multiplies by
              augmentation factor (10 augmentations = 10x storage). Changing
              augmentation strategy requires regenerating the entire dataset.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              On the Fly Augmentation
            </p>
            <p style="margin-top: 0">
              <strong>How it works:</strong> Apply random augmentations to each
              image as it loads during training. Every epoch sees different
              variations of the same image.
            </p>
            <p>
              <strong>Advantages:</strong> Infinite variation - the model never
              sees identical images twice. No additional storage. Easy to modify
              augmentation strategy mid-training.
            </p>
            <p>
              <strong>Disadvantages:</strong> CPU overhead during training. Can
              become bottleneck if augmentations are complex or CPU is limited.
              Requires careful parallelization.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Choosing Your Strategy
            </p>
            <p style="margin-top: 0">
              <strong>Use offline when:</strong> Augmentations are expensive
              (neural style transfer, GANs). Storage is cheap. Training
              throughput is critical.
            </p>
            <p>
              <strong>Use on the fly when:</strong> Augmentations are simple
              (flips, crops). Dataset is large and storage is limited. You want
              maximum variation.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>Key Trade-off:</strong> On the fly augmentation provides
              more variation but requires CPU capacity. Offline augmentation is
              faster but provides fixed variations and multiplies storage.
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
                  Offline augmentation eliminates CPU overhead but fixes
                  variations and multiplies storage 10x
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  On the fly augmentation provides infinite variation but
                  requires CPU capacity during training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use offline for expensive augmentations (GANs, style transfer)
                  where generation cost dominates
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use on the fly for simple augmentations (flips, crops) where
                  variation matters most
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
                  Interview Tip: Frame the choice as a resource trade-off - CPU
                  time vs storage space vs variation diversity
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention hybrid approaches - offline for
                  expensive augmentations, on the fly for cheap ones
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImagePreprocessingOfflineVsOnTheFlyAugmentationTradeoffs;
