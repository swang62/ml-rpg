import type { Component } from "solid-js";

const LessonBatchThroughputTuningTrainingBatchSizeMemoryConvergenceAndThroughputTradeOffs: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Training Batch Size: Memory, Convergence, and Throughput Trade-offs
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Memory Constraints
            </p>
            <p style="margin-top: 0">
              Training memory consists of: model parameters, gradients (same
              size as parameters), optimizer state (2x parameters for Adam), and
              activations (proportional to batch size and model depth). A 1B
              parameter model needs ~12GB just for parameters, gradients, and
              optimizer. Activations for batch size 32 might add 20GB. Maximum
              batch size is constrained by GPU memory; if you run out, the
              options are: gradient checkpointing (recompute activations, trade
              compute for memory), gradient accumulation (simulate larger
              batches), or model parallelism.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Convergence Effects
            </p>
            <p style="margin-top: 0">
              Batch size affects gradient noise. Small batches (8-32) have noisy
              gradients that can escape local minima but may not converge
              smoothly. Large batches (512-4096) have stable gradients but can
              converge to sharp minima that generalize poorly. The learning rate
              must scale with batch size: linear scaling rule says if you double
              batch size, double learning rate. However, this breaks above
              certain thresholds (2048-8192 depending on model). Large-batch
              training requires warmup and careful hyperparameter tuning.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Throughput Optimization
            </p>
            <p style="margin-top: 0">
              Larger batches improve GPU utilization: more parallel compute,
              better memory bandwidth utilization, fewer gradient
              synchronization steps in distributed training. A batch of 256
              might train 10x faster per epoch than a batch of 16, but converge
              to worse accuracy. The goal: find the largest batch size that
              still converges well, then tune learning rate and warmup
              accordingly. Typical approach: start with published batch sizes,
              increase gradually while monitoring validation loss.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>💡 Practical Rule:</strong> Use gradient accumulation to
              simulate larger batches when memory-constrained. Accumulate
              gradients over 4-8 steps, update once. Equivalent to 4-8x batch
              size.
            </div>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 540px">
              <div style="display: flex; justify-content: space-around; gap: 20px">
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 8px; font-size: 14px">
                    Small Batch: 32
                  </div>
                  <div style="font-size: 13px; margin-bottom: 8px">
                    <strong>Memory:</strong> Low
                    <br />
                    <strong>Gradients:</strong> Noisy
                    <br />
                    <strong>Updates:</strong> Frequent
                  </div>
                  <div style="padding: 8px; border-radius: 4px; font-size: 12px; margin-bottom: 6px">
                    <strong>✓</strong> Better generalization
                  </div>
                  <div style="padding: 8px; border-radius: 4px; font-size: 12px">
                    <strong>✗</strong> Slower throughput
                    <br />
                    <strong>✗</strong> More steps needed
                  </div>
                </div>
                <div style="flex: 1; border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: 700; text-align: center; margin-bottom: 8px; font-size: 14px">
                    Large Batch: 512
                  </div>
                  <div style="font-size: 13px; margin-bottom: 8px">
                    <strong>Memory:</strong> High
                    <br />
                    <strong>Gradients:</strong> Stable
                    <br />
                    <strong>Updates:</strong> Infrequent
                  </div>
                  <div style="padding: 8px; border-radius: 4px; font-size: 12px; margin-bottom: 6px">
                    <strong>✓</strong> Higher throughput
                    <br />
                    <strong>✓</strong> Better GPU usage
                  </div>
                  <div style="padding: 8px; border-radius: 4px; font-size: 12px">
                    <strong>✗</strong> May hurt accuracy
                    <br />
                    <strong>✗</strong> Needs LR tuning
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
                  Training memory: params + gradients + optimizer (4x for Adam)
                  + activations (scales with batch)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  1B parameter model needs ~12GB for weights/gradients/optimizer
                  before activations
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Linear scaling rule: double batch size → double learning rate;
                  breaks above 2048-8192
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Large batches can converge to sharp minima with poor
                  generalization despite faster training
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Gradient accumulation simulates larger batches when
                  memory-constrained
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
                  Break down training memory components (params, gradients,
                  optimizer, activations) to show depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention linear scaling rule and its breakdown threshold
                  (2048-8192) for learning rate tuning
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Recommend gradient accumulation as memory-saving technique
                  with specific step counts (4-8)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonBatchThroughputTuningTrainingBatchSizeMemoryConvergenceAndThroughputTradeOffs;
