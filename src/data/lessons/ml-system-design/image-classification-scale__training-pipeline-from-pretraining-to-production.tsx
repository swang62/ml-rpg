import type { Component } from "solid-js";

const LessonImageClassificationScaleTrainingPipelineFromPretrainingToProduction: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Pipeline: From Pretraining to Production
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              The Training Pipeline
            </p>
            <p style="margin-top: 0">
              Training a classifier at scale requires careful orchestration of
              data, compute, and validation. The pipeline typically spans weeks
              of experimentation before any model reaches production.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pretraining Foundation
            </p>
            <p style="margin-top: 0">
              Most production classifiers start from a pretrained backbone like
              ResNet, EfficientNet, or Vision Transformer. These models learned
              general visual features from millions of images. Pretraining
              provides a massive head start: instead of learning edges and
              textures from scratch, your model already understands visual
              primitives.
            </p>
            <p>
              <strong>Why this matters:</strong> Training from scratch on 1
              million images might achieve 70% accuracy. Fine-tuning a
              pretrained model on the same data reaches 90%+ because the early
              layers already extract useful features.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Fine-tuning Strategy
            </p>
            <p style="margin-top: 0">
              <strong>Learning rate schedule:</strong> Start low (1e-5 to 1e-4)
              for pretrained layers to avoid destroying learned features. Use
              higher rates for new classification layers. Gradually unfreeze
              deeper layers as training progresses.
            </p>
            <p>
              <strong>Data augmentation:</strong> Random crops, flips, color
              jitter, and mixup expand your effective dataset size 10-100x.
              Without augmentation, models memorize training images rather than
              learning generalizable features.
            </p>
            <p>
              <strong>Validation strategy:</strong> Hold out 10-20% of data that
              never touches training. Monitor validation loss to catch
              overfitting. If validation loss rises while training loss falls,
              stop training.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Distributed Training
            </p>
            <p style="margin-top: 0">
              Large datasets require multiple GPUs. Data parallelism splits
              batches across GPUs: each GPU computes gradients on its portion,
              then gradients are averaged. With 8 GPUs, you can train on 8x
              larger batches or finish 8x faster. Communication overhead limits
              scaling beyond 32-64 GPUs for most workloads.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Pretraining Phase</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    100M+ images, 64 to 512 GPUs, 1 to 10 days
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Fine Tuning Phase</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    10M+ task images, batch 2K to 8K
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">
                    Validation on Production Split
                  </strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Include rare classes and hard examples
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px 16px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 14px">Checkpoint Bundle</strong>
                  <div style="font-size: 12px; margin-top: 4px">
                    Model + preprocessing + taxonomy + metrics
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
                  Pretrained backbones provide massive head start - fine-tuning
                  reaches 90%+ vs 70% training from scratch
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use low learning rates (1e-5 to 1e-4) for pretrained layers to
                  preserve learned features
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data augmentation expands effective dataset 10-100x and
                  prevents memorization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Data parallelism across 8-32 GPUs is practical; communication
                  overhead limits further scaling
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
                  Interview Tip: Explain transfer learning as leverage -
                  pretrained features reduce data requirements by 10x or more
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Interview Tip: Mention learning rate scheduling as critical
                  for fine-tuning - wrong rates destroy pretrained knowledge
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonImageClassificationScaleTrainingPipelineFromPretrainingToProduction;
