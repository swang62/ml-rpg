import type { Component } from "solid-js";

const LessonModelPruningHardwareEfficiencyAndSpeedupCharacteristics: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Hardware Efficiency and Speedup Characteristics
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <div style="padding: 14px 16px; border: 2px solid; border-left: 4px solid; border-radius: 6px; margin: 0">
              <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px">
                Core Concept
              </div>
              <div style="font-size: 15px; line-height: 1.5">
                <strong>Magnitude pruning</strong> is the simplest and most
                common technique: remove weights closest to zero. The intuition:
                small weights contribute little to outputs, so removing them
                minimally affects predictions.
              </div>
            </div>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              How Magnitude Pruning Works
            </p>
            <p style="margin-top: 0">
              After training, rank all weights by absolute value. Set the
              smallest X% to zero permanently. For structured pruning, compute
              an importance score per channel (L1 norm of channel weights is
              common) and remove lowest-scoring channels. The process: train →
              rank → prune → fine-tune. Fine-tuning is essential; accuracy drops
              5-15% immediately after pruning but recovers to within 1-2% of
              original after 10-20% of original training epochs.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Why GPUs Don"t Speed Up Sparse Matrices
            </p>
            <p style="margin-top: 0">
              GPUs achieve speed through parallelism: computing thousands of
              multiply-adds simultaneously. Sparse matrices break this pattern.
              To multiply a sparse matrix, the GPU must: identify non-zero
              positions, gather those values, compute products, scatter results
              back. This coordination overhead often exceeds the compute
              savings. A 90% sparse matrix multiplication can run slower than
              dense. Only specialized sparse tensor cores (available on newer
              hardware) handle sparsity efficiently.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Structured Pruning Speedups
            </p>
            <p style="margin-top: 0">
              Removing channels physically reduces matrix dimensions. A
              256-channel layer pruned to 128 channels uses matrices half the
              size. Standard GEMM operations run faster with smaller matrices,
              no special hardware needed. Speedup scales roughly linearly: 50%
              channels removed yields ~50% faster inference.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 600px">
              <div style="display: flex; flex-direction: column; gap: 16px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                    CPU (Batch Size 1)
                  </div>
                  <div style="font-size: 13px">
                    <strong>Structured:</strong> 12ms → 7ms{" "}
                    <span style="padding: 2px 6px; border: 1px solid; border-radius: 4px; font-weight: bold">
                      ✓ 1.7x faster
                    </span>
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    <strong>Unstructured 80%:</strong> 12ms → 11ms{" "}
                    <span style="padding: 2px 6px; border: 1px solid; border-radius: 4px; font-weight: bold">
                      ✗ No gain
                    </span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                    GPU (Batch Size 8, NVIDIA A10)
                  </div>
                  <div style="font-size: 13px">
                    <strong>Structured:</strong> 18ms → 12ms{" "}
                    <span style="padding: 2px 6px; border: 1px solid; border-radius: 4px; font-weight: bold">
                      ✓ 1.5x faster
                    </span>
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    <strong>N:M 2:4 sparsity:</strong> 18ms → 11ms{" "}
                    <span style="padding: 2px 6px; border: 1px solid; border-radius: 4px; font-weight: bold">
                      ✓ 1.6x faster
                    </span>
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <div style="font-weight: bold; margin-bottom: 8px; font-size: 14px">
                    Mobile (Apple Neural Engine)
                  </div>
                  <div style="font-size: 13px">
                    <strong>Structured + INT8:</strong> 22ms → 12ms{" "}
                    <span style="padding: 2px 6px; border: 1px solid; border-radius: 4px; font-weight: bold">
                      ✓ 1.8x faster
                    </span>
                  </div>
                  <div style="font-size: 13px; margin-top: 4px">
                    <strong>Unstructured:</strong> Not accelerated
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
                  Magnitude pruning removes weights closest to zero; for
                  structured, use L1 norm per channel
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Process: train → rank → prune → fine-tune; accuracy drops
                  5-15% then recovers to within 1-2%
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fine-tuning typically needs 10-20% of original training epochs
                  to recover accuracy
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Sparse matrices don"t speed up standard GPUs due to
                  gather/scatter overhead exceeding compute savings
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Structured pruning shrinks matrix dimensions directly; 50%
                  channels removed ≈ 50% faster inference
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
                  Explain the train-prune-fine-tune pipeline with specific
                  recovery expectations (1-2% accuracy gap)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Describe why sparse matrices don"t help standard GPUs - shows
                  deep hardware understanding
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention L1 norm for channel importance scoring - a practical
                  detail that demonstrates hands-on experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonModelPruningHardwareEfficiencyAndSpeedupCharacteristics;
