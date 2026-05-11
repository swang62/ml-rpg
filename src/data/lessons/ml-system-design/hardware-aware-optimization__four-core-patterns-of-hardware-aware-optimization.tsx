import type { Component } from "solid-js";

const LessonHardwareAwareOptimizationFourCorePatternsOfHardwareAwareOptimization: Component =
  () => (
    <div class="lesson-content">
      <div style="flex:1;min-width:0;max-width:800px;margin:0 auto">
        <div class="mb-4 p-4">
          <h1 style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 24px; font-weight: 700; margin-bottom: 20px'>
            Four Core Patterns of Hardware Aware Optimization
          </h1>
          <div
            class="card-content-area"
            style='font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", sans-serif; font-size: 15px; line-height: 1.6; font-weight: 400; margin-bottom: 24px; white-space: pre-wrap'
          >
            <p style="margin-top: 0; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pattern 1: Memory-Efficient Architectures
            </p>
            <p style="margin-top: 0">
              Depthwise separable convolutions replace standard convolutions:
              instead of one 3×3×C filter, use one 3×3×1 per channel then 1×1×C
              to combine. Reduces parameters 8-9x and compute proportionally.
              Grouped convolutions split channels into groups processed
              independently. Inverted residuals (expand → depthwise → project)
              reduce peak memory by keeping narrow bottlenecks. MobileNets use
              all three; V3 achieves ImageNet accuracy with 5.4M parameters
              versus ResNet"s 25M.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pattern 2: Latency-Optimized Operations
            </p>
            <p style="margin-top: 0">
              Some operations have high theoretical efficiency but poor hardware
              utilization. Batch normalization requires per-batch statistics
              that serialize computation. Fuse BN into preceding conv at
              inference (absorb mean/variance into weights). Avoid operations
              with irregular memory access: gather, scatter, dynamic indexing.
              Prefer operations that map to hardware primitives: matmul, conv
              (which have dedicated tensor cores).
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pattern 3: Compute-Precision Matching
            </p>
            <p style="margin-top: 0">
              Modern GPUs have tensor cores optimized for specific precisions.
              A100s: FP16 and INT8 tensor cores. Older GPUs: FP32 only. Design
              models knowing target precision: channels divisible by 8 or 16
              align with tensor core requirements; mixed-precision training from
              start avoids accuracy loss during quantization; some operations
              (softmax, layer norm) need FP32 even on INT8 models.
            </p>
            <p style="margin-top: 20px; margin-bottom: 6px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px">
              Pattern 4: Parallelism-Friendly Design
            </p>
            <p style="margin-top: 0">
              Sequential dependencies block parallelism. Recurrent layers (LSTM,
              GRU) process time steps serially. Transformers process all
              positions in parallel but have quadratic attention complexity.
              Design for your parallelism budget: replace RNNs with 1D
              convolutions or Transformers when hardware supports parallel
              compute; use local attention (window-based) for long sequences on
              memory-limited devices.
            </p>
          </div>
          <div
            class="card-diagram"
            style="margin-bottom: 24px; display: flex; justify-content: center"
          >
            <div style="padding: 16px; border: 2px solid; border-radius: 8px; margin: 16px 0; max-width: 500px">
              <div style="display: flex; flex-direction: column; gap: 10px">
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    1. Architecture Search
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    NAS with latency lookup tables
                    <br />
                    Pruning and distillation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    2. Hardware Aware Quantization
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Parallel INT8 path during training
                    <br />
                    Real device rounding and saturation
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">
                    3. Compilation and Fusion
                  </strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    Kernel fusion, tile size matching
                    <br />2 to 12x speedups from reduced memory traffic
                  </div>
                </div>
                <div style="border: 2px solid; padding: 12px; border-radius: 6px">
                  <strong style="font-size: 14px">4. Adaptive Compute</strong>
                  <div style="font-size: 13px; margin-top: 6px">
                    2:4 sparsity, expert routing
                    <br />
                    40 to 70% compute reduction
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
                  Depthwise separable convolutions reduce parameters 8-9x
                  (MobileNet: 5.4M vs ResNet: 25M)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Fuse batch normalization into preceding conv at inference to
                  avoid serialization
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Avoid irregular memory access (gather, scatter); prefer tensor
                  core primitives (matmul, conv)
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Design channels divisible by 8 or 16 to align with tensor core
                  requirements
                </span>
              </div>
              <div class="d-flex align-items-center Learn_keyTakeawaysItem">
                <span class="Learn_keyTakeawaysBullet me-3">✓</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Replace RNNs with parallel alternatives (1D conv,
                  Transformers) when hardware supports it
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
                  Describe depthwise separable convolutions with specific
                  parameter reduction (8-9x) for technical depth
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">2</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Mention BN fusion as inference optimization - shows practical
                  deployment knowledge
                </span>
              </div>
              <div class="d-flex align-items-center Learn_exampleItem">
                <span class="Learn_exampleNumber me-3">3</span>
                <span class="flex-grow-1 Learn_cardContent">
                  Explain channel alignment (divisible by 8/16) for tensor cores
                  - a detail that impresses interviewers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
export default LessonHardwareAwareOptimizationFourCorePatternsOfHardwareAwareOptimization;
