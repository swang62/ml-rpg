import type { Component } from "solid-js";

const LessonModelPruningPruningToolingAndPracticalWorkflow: Component = () => (
  <div class="lesson-content">
    <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
      <div class="mb-4 p-4">
        <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
          Pruning Tooling and Practical Workflow
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
              <strong>Pruning during training</strong> (also called dynamic or
              gradual pruning) integrates pruning into the training loop rather
              than treating it as a post-hoc optimization. Weights are
              progressively zeroed based on importance scores computed each
              epoch.
            </div>
          </div>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Gradual Pruning Schedule
          </p>
          <p style="margin-top: 0">
            Start training dense. After warmup (10-20% of training), begin
            zeroing weights at each epoch. Use a cubic schedule: prune slowly at
            first, accelerate in the middle, slow down near target. For 90%
            final sparsity over 100 epochs: epoch 20 is 10% sparse, epoch 50 is
            60% sparse, epoch 80 is 85% sparse. The cubic shape matches how
            accuracy recovers: the network adapts quickly to small changes,
            needs time to adjust to large changes.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Framework Support
          </p>
          <p style="margin-top: 0">
            <strong>PyTorch:</strong> torch.nn.utils.prune provides magnitude
            pruning utilities. Combine with custom training loops for gradual
            schedules. <strong>TensorFlow:</strong>{" "}
            tensorflow_model_optimization toolkit includes PolynomialDecay
            pruning schedules. Both support structured and unstructured. For
            production, export pruned models to ONNX and apply
            framework-agnostic optimizations. Key check: verify sparse
            representation after export since some formats densify for
            compatibility.
          </p>
          <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
            Validation Protocol
          </p>
          <p style="margin-top: 0">
            Compare pruned model against baseline on: accuracy (within 1-2%),
            latency on target hardware (actual speedup, not theoretical), memory
            footprint (both disk and runtime). Test on edge cases: inputs that
            originally scored near decision boundaries often degrade first. A/B
            test in production before full rollout since aggregate accuracy may
            hide per-segment degradation.
          </p>
        </div>
        <div class="Learn_keyTakeaways p-4 mb-4">
          <div class="Learn_keyTakeawaysHeader mb-3 pb-3">💡 Key Takeaways</div>
          <div class="d-flex flex-column gap-2">
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Gradual pruning during training outperforms post-hoc pruning by
                allowing continuous adaptation
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Cubic schedule: slow start, accelerate mid-training, slow
                finish; matches accuracy recovery dynamics
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                PyTorch uses torch.nn.utils.prune; TensorFlow uses
                tensorflow_model_optimization toolkit
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Always verify sparse representation after ONNX export - some
                formats densify for compatibility
              </span>
            </div>
            <div class="d-flex align-items-center Learn_keyTakeawaysItem">
              <span class="Learn_keyTakeawaysBullet me-3">✓</span>
              <span class="flex-grow-1 Learn_cardContent">
                Test pruned models on edge cases near decision boundaries; they
                degrade first
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
                Describe cubic pruning schedule with specific milestones
                (20/50/80% of training = 10/60/85% sparsity)
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">2</span>
              <span class="flex-grow-1 Learn_cardContent">
                Mention verifying sparsity after ONNX export - a common
                production gotcha
              </span>
            </div>
            <div class="d-flex align-items-center Learn_exampleItem">
              <span class="Learn_exampleNumber me-3">3</span>
              <span class="flex-grow-1 Learn_cardContent">
                Recommend A/B testing before full rollout to catch
                segment-specific degradation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LessonModelPruningPruningToolingAndPracticalWorkflow;
