import type { Component } from "solid-js";

const LessonCvDataAugmentationProductionImplementationAugmentationAsASystemComponent: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Production Implementation: Augmentation as a System Component
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              PERFORMANCE BUDGETING
            </p>
            <p style="margin-top: 0">
              Augmentation should not be a training bottleneck. Target: under 1
              millisecond per image for all transforms combined. Monitor GPU
              idle time; if it exceeds 5-10%, your data pipeline is too slow.
              Fixes: add more CPU workers, use faster libraries (GPU
              augmentation with DALI or Albumentations), or precompute some
              augmentations offline.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              DATA LOADING ARCHITECTURE
            </p>
            <p style="margin-top: 0">
              Use asynchronous prefetching: while the GPU processes batch N,
              CPUs prepare batches N+1, N+2, N+3. Pin memory for faster
              CPU-to-GPU transfer. Each worker process needs its own random seed
              to avoid correlation (same augmentation applied to all workers).
              Use 4-8 worker processes per GPU for typical workloads.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              POLICY VERSIONING AND GOVERNANCE
            </p>
            <p style="margin-top: 0">
              Store AutoAugment policies as structured configs (JSON/YAML) with
              links to discovery experiments. Version policies like code.
              Document limitations: "no heavy color jitter for medical imaging",
              "maximum rotation ±5° for text recognition". Require approval from
              ML leads before production use. Enable audit trails for debugging
              when model behavior changes.
            </p>
            <div style="padding: 12px; border-left: 4px solid; margin: 12px 0; border-radius: 4px">
              <strong>✅ Best Practice:</strong> Create stress test validation
              sets with augmented images (rotations, brightness extremes) to
              verify robustness before deployment.
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              MONITORING IN PRODUCTION
            </p>
            <p style="margin-top: 0">
              Track per-class recall on long-tail classes to ensure augmentation
              improves coverage rather than washing out rare signals. Create
              augmented validation sets exercising different invariances
              (rotation, brightness, scale). Compare accuracy on clean versus
              augmented validation; if the drop exceeds 10-15 percentage points,
              the model is not learning the invariances you are trying to teach.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 520px">
              <div style="display: flex; flex-direction: column; gap: 12px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Policy Registry</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Versioned AutoAugment policies, mixup configs, synthetic
                    datasets with lineage and approval gates
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Execution Engine</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Async data pipeline: Sharding, prefetch 2 to 4 batches,
                    pinned memory
                  </div>
                  <div style="font-size: 12px">
                    Target: &lt;1 ms per image, &lt;10% GPU idle
                  </div>
                </div>
                <div style="font-size: 24px; font-weight: bold; text-align: center">
                  ↓
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">Monitoring Dashboard</strong>
                  <div style="font-size: 12px; margin-top: 6px">
                    Validation accuracy, per class recall, stress tests
                  </div>
                  <div style="font-size: 12px">
                    Runtime: Augmentation mix, throughput, GPU idle
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
                  Performance budget: &lt;1ms per image for all transforms; GPU
                  idle &gt;5-10% indicates pipeline bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Prefetch 2-4 batches ahead with 4-8 worker processes per GPU;
                  each worker needs independent random seed
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Version policies as configs with limitations documented;
                  require approval before production use
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Create stress test validation sets with augmented images;
                  accuracy drop &gt;10-15% indicates robustness problems
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
                  Explain the performance monitoring: GPU idle time &gt;5% means
                  data pipeline is the bottleneck
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe policy governance: version policies, document
                  limitations, require ML lead approval
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention stress testing: compare accuracy on clean vs augmented
                  validation to measure learned invariances
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonCvDataAugmentationProductionImplementationAugmentationAsASystemComponent;
