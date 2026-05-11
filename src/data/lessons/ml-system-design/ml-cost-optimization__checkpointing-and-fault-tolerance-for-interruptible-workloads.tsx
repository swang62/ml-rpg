import type { Component } from "solid-js";

const LessonMlCostOptimizationCheckpointingAndFaultToleranceForInterruptibleWorkloads: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Checkpointing and Fault Tolerance for Interruptible Workloads
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Checkpointing:</strong> Periodically saving training state
              (model weights, optimizer state, epoch progress) to durable
              storage so training can resume after interruption. Without
              checkpointing, spot instance termination means losing all progress
              since the last checkpoint—potentially hours of GPU time.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Checkpoint Frequency Trade-offs
            </p>
            <p>
              Frequent checkpoints (every 5 minutes) minimize lost work but add
              overhead: saving a 10GB model to cloud storage takes time and
              network bandwidth. Infrequent checkpoints (every hour) minimize
              overhead but risk losing significant progress on interruption. The
              optimal frequency depends on: interruption probability (higher
              probability = more frequent), checkpoint size (larger models =
              longer save time), and training cost (expensive GPUs = higher cost
              of lost work). A common starting point: checkpoint every 15-30
              minutes for training jobs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              What to Checkpoint
            </p>
            <p>
              <strong>Model weights:</strong> The trained parameters. Required
              to resume training. <strong>Optimizer state:</strong> Momentum,
              adaptive learning rate accumulators. Without this, optimizer
              restarts cold and training may diverge.{" "}
              <strong>Training state:</strong> Current epoch, batch index,
              learning rate schedule position. Enables resuming exactly where
              you stopped. <strong>Random state:</strong> RNG seeds for
              reproducibility. Ensures resumed training matches what would have
              happened without interruption. Missing any component degrades
              resume quality.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Interruption Handling
            </p>
            <p>
              Cloud providers give 2-minute warning before spot termination. Use
              this time to: save a final checkpoint (even if not scheduled),
              gracefully stop training (finish current batch), and clean up
              resources. Implement termination notice handlers that trigger
              emergency checkpoint on warning signal. For distributed training,
              coordinate checkpoint across all workers—a partial checkpoint is
              useless if some workers saved and others did not.
            </p>
            <p style="margin: 16px 0; padding: 12px 16px; border-left: 4px solid; font-size: 14px">
              <strong>Resume Verification:</strong> After implementing
              checkpointing, verify it works: intentionally kill a training job,
              resume from checkpoint, and confirm loss curve continues smoothly
              without regression.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Training Start: Epoch 0
                  </strong>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ 5 minutes ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Checkpoint: Epoch 3 → S3
                  </strong>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ 5 minutes ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">
                    Checkpoint: Epoch 6 → S3
                  </strong>
                </div>
                <div style="font-size: 18px; font-weight: bold; text-align: center">
                  ↓ Interruption ↓
                </div>
                <div style="border: 2px solid; padding: 10px; border-radius: 6px; text-align: center">
                  <strong style="font-size: 13px">Resume from Epoch 6</strong>
                  <div style="margin-top: 6px; font-size: 11px">
                    Wasted: ~2.5 minutes avg
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
                  Checkpoint model weights, optimizer state, training state, and
                  random seeds
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Optimal frequency: checkpoint every 15-30 minutes for typical
                  training jobs
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Use 2-minute termination warning to save emergency checkpoint
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
                  10GB model checkpoint to cloud storage takes significant time
                  and bandwidth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Test checkpointing: kill job intentionally, resume, verify
                  loss curve continues
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonMlCostOptimizationCheckpointingAndFaultToleranceForInterruptibleWorkloads;
